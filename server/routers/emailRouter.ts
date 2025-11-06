import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { 
  getGmailAuthUrl, 
  getGmailTokens, 
  refreshGmailToken,
  getGmailProfile 
} from "../email/gmailAuth";
import { 
  getOutlookAuthUrl, 
  getOutlookTokens, 
  refreshOutlookToken,
  getOutlookProfile 
} from "../email/outlookAuth";
import { fetchEmails } from "../email/imapService";
import { sendEmail } from "../email/smtpService";
import { 
  createEmailAccount, 
  getEmailAccountsByUserId, 
  updateEmailAccount,
  deleteEmailAccount,
  getEmailAccountById
} from "../db/emailAccountHelpers";
import { 
  createEmail, 
  getEmailsByAccountId, 
  updateEmail,
  deleteEmail,
  getEmailById
} from "../db/emailHelpers";
import CryptoJS from "crypto-js";

// Encryption key from environment (should be a strong secret)
const ENCRYPTION_KEY = process.env.EMAIL_ENCRYPTION_KEY || "default-encryption-key-change-in-production";

function encryptToken(token: string): string {
  return CryptoJS.AES.encrypt(token, ENCRYPTION_KEY).toString();
}

function decryptToken(encryptedToken: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export const emailRouter = router({
  // Gmail OAuth flow
  getGmailAuthUrl: protectedProcedure
    .query(async () => {
      const authUrl = getGmailAuthUrl();
      return { authUrl };
    }),

  connectGmailAccount: protectedProcedure
    .input(z.object({ 
      code: z.string(),
      redirectUri: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      // Exchange code for tokens
      const tokens = await getGmailTokens(input.code);
      
      // Get user profile
      const profile = await getGmailProfile(tokens.access_token || "", tokens.refresh_token || "");
      
      // Encrypt tokens before storing
      const encryptedAccessToken = encryptToken(tokens.access_token || "");
      const encryptedRefreshToken = tokens.refresh_token ? encryptToken(tokens.refresh_token) : null;
      
      // Create email account record
      const account = await createEmailAccount({
        userId: ctx.user.id,
        email: profile.emailAddress || "",
        provider: "gmail",
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken || undefined,
        imapHost: "imap.gmail.com",
        imapPort: 993,
        smtpHost: "smtp.gmail.com",
        smtpPort: 465,
        lastSyncedAt: null
      });
      
      return { success: true, accountId: account.id };
    }),

  // Outlook OAuth flow
  getOutlookAuthUrl: protectedProcedure
    .query(async () => {
      const authUrl = await getOutlookAuthUrl();
      return { authUrl };
    }),

  connectOutlookAccount: protectedProcedure
    .input(z.object({ 
      code: z.string(),
      redirectUri: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      // Exchange code for tokens
      const tokens = await getOutlookTokens(input.code);
      
      // Get user profile
      const profile = await getOutlookProfile(tokens.accessToken);
      
      // Encrypt tokens before storing
      const encryptedAccessToken = encryptToken(tokens.accessToken);
      const encryptedRefreshToken = tokens.refreshToken ? encryptToken(tokens.refreshToken) : null;
      
      // Create email account record
      const account = await createEmailAccount({
        userId: ctx.user.id,
        email: profile.mail || profile.userPrincipalName || "",
        provider: "outlook",
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken || undefined,
        imapHost: "outlook.office365.com",
        imapPort: 993,
        smtpHost: "smtp.office365.com",
        smtpPort: 587,
        lastSyncedAt: null
      });
      
      return { success: true, accountId: account.id };
    }),

  // Generic IMAP/SMTP account connection
  connectCustomAccount: protectedProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
      imapHost: z.string(),
      imapPort: z.number(),
      smtpHost: z.string(),
      smtpPort: z.number()
    }))
    .mutation(async ({ input, ctx }) => {
      // Encrypt password
      const encryptedPassword = encryptToken(input.password);
      
      // Create email account record
      const account = await createEmailAccount({
        userId: ctx.user.id,
        email: input.email,
        provider: "imap",
        accessToken: encryptedPassword, // Store password as accessToken for custom accounts
        refreshToken: null,
        imapHost: input.imapHost,
        imapPort: input.imapPort,
        smtpHost: input.smtpHost,
        smtpPort: input.smtpPort,
        lastSyncedAt: null
      });
      
      return { success: true, accountId: account.id };
    }),

  // List all email accounts for current user
  listAccounts: protectedProcedure
    .query(async ({ ctx }) => {
      const accounts = await getEmailAccountsByUserId(ctx.user.id);
      
      // Remove sensitive data before returning
      return accounts.map(account => ({
        id: account.id,
        email: account.email,
        provider: account.provider,
        lastSyncedAt: account.lastSyncedAt,
        createdAt: account.createdAt
      }));
    }),

  // Delete email account
  deleteAccount: protectedProcedure
    .input(z.object({ accountId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      // Verify account belongs to user
      const account = await getEmailAccountById(input.accountId);
      if (!account || account.userId !== ctx.user.id) {
        throw new Error("Account not found or unauthorized");
      }
      
      await deleteEmailAccount(input.accountId);
      return { success: true };
    }),

  // Sync emails for an account (manual trigger)
  syncAccount: protectedProcedure
    .input(z.object({ accountId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      // Verify account belongs to user
      const account = await getEmailAccountById(input.accountId);
      if (!account || account.userId !== ctx.user.id) {
        throw new Error("Account not found or unauthorized");
      }
      
      // Decrypt tokens
      const accessToken = account.accessToken ? decryptToken(account.accessToken) : "";
      const refreshToken = account.refreshToken ? decryptToken(account.refreshToken) : undefined;
      
      // Fetch emails using IMAP service
      const emails = await fetchEmails(account);
      
      // Store emails in database
      for (const email of emails) {
        await createEmail({
          userId: ctx.user.id,
          accountId: account.id,
          messageId: email.messageId,
          threadId: email.threadId || null,
          subject: email.subject,
          from: email.from,
          to: JSON.stringify([email.to]),
          cc: email.cc ? JSON.stringify([email.cc]) : null,
          bcc: email.bcc ? JSON.stringify([email.bcc]) : null,
          body: email.body,
          bodyHtml: email.bodyHtml || null,
          receivedAt: email.receivedAt,
          isRead: email.isRead ? 1 : 0,
          isStarred: 0,
          hasAttachments: email.attachments && email.attachments.length > 0 ? 1 : 0,
          attachments: email.attachments ? JSON.stringify(email.attachments) : null
        });
      }
      
      // Update last synced timestamp
      await updateEmailAccount(account.id, {
        lastSyncedAt: new Date()
      });
      
      return { success: true, emailCount: emails.length };
    }),

  // Get emails for an account
  getEmails: protectedProcedure
    .input(z.object({ 
      accountId: z.number(),
      folder: z.enum(["inbox", "sent", "drafts", "archive", "trash", "spam"]).optional()
    }))
    .query(async ({ input, ctx }) => {
      // Verify account belongs to user
      const account = await getEmailAccountById(input.accountId);
      if (!account || account.userId !== ctx.user.id) {
        throw new Error("Account not found or unauthorized");
      }
      
      const emails = await getEmailsByAccountId(input.accountId);
      
      // Filter by folder if specified
      // TODO: Implement folder filtering based on labels/flags
      
      return emails;
    }),

  // Send email
  send: protectedProcedure
    .input(z.object({
      accountId: z.number(),
      to: z.string(),
      cc: z.string().optional(),
      bcc: z.string().optional(),
      subject: z.string(),
      body: z.string(),
      bodyHtml: z.string().optional(),
      attachments: z.array(z.object({
        filename: z.string(),
        content: z.string(), // Base64 encoded
        contentType: z.string()
      })).optional()
    }))
    .mutation(async ({ input, ctx }) => {
      // Verify account belongs to user
      const account = await getEmailAccountById(input.accountId);
      if (!account || account.userId !== ctx.user.id) {
        throw new Error("Account not found or unauthorized");
      }
      
      // Decrypt tokens
      const accessToken = account.accessToken ? decryptToken(account.accessToken) : "";
      const refreshToken = account.refreshToken ? decryptToken(account.refreshToken) : undefined;
      
      // Send email using SMTP service
      const result = await sendEmail(account, {
        to: [input.to],
        cc: input.cc ? [input.cc] : undefined,
        bcc: input.bcc ? [input.bcc] : undefined,
        subject: input.subject,
        body: input.body,
        bodyHtml: input.bodyHtml,
        attachments: input.attachments?.map(att => ({
          filename: att.filename,
          content: Buffer.from(att.content, "base64"),
          contentType: att.contentType
        }))
      });
      
      // Store sent email in database
      await createEmail({
        userId: ctx.user.id,
        accountId: account.id,
        messageId: result.messageId,
        threadId: null,
        subject: input.subject,
        from: account.email,
        to: JSON.stringify([input.to]),
        cc: input.cc ? JSON.stringify([input.cc]) : null,
        bcc: input.bcc ? JSON.stringify([input.bcc]) : null,
        body: input.body,
        bodyHtml: input.bodyHtml || null,
        folder: "sent",
        sentAt: new Date(),
        receivedAt: new Date(),
        isRead: 1,
        isStarred: 0,
        hasAttachments: input.attachments && input.attachments.length > 0 ? 1 : 0,
        attachments: input.attachments ? JSON.stringify(input.attachments) : null
      });
      
      return { success: true, messageId: result.messageId };
    }),

  // Update email (mark as read, star, etc.)
  updateEmail: protectedProcedure
    .input(z.object({
      emailId: z.number(),
      isRead: z.boolean().optional(),
      isStarred: z.boolean().optional(),
      labels: z.array(z.string()).optional()
    }))
    .mutation(async ({ input, ctx }) => {
      // Verify email belongs to user's account
      const email = await getEmailById(input.emailId);
      if (!email) {
        throw new Error("Email not found");
      }
      
      const account = await getEmailAccountById(email.accountId);
      if (!account || account.userId !== ctx.user.id) {
        throw new Error("Unauthorized");
      }
      
      await updateEmail(input.emailId, {
        isRead: input.isRead !== undefined ? (input.isRead ? 1 : 0) : undefined,
        isStarred: input.isStarred !== undefined ? (input.isStarred ? 1 : 0) : undefined
      });
      
      return { success: true };
    }),

  // Delete email
  deleteEmail: protectedProcedure
    .input(z.object({ emailId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      // Verify email belongs to user's account
      const email = await getEmailById(input.emailId);
      if (!email) {
        throw new Error("Email not found");
      }
      
      const account = await getEmailAccountById(email.accountId);
      if (!account || account.userId !== ctx.user.id) {
        throw new Error("Unauthorized");
      }
      
      await deleteEmail(input.emailId);
      return { success: true };
    })
});
