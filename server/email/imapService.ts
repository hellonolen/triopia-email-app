import imaps from "imap-simple";
import { simpleParser } from "mailparser";
import { getAuthenticatedGmailClient } from "./gmailAuth";
import type { EmailAccount } from "../../drizzle/schema";

export interface FetchedEmail {
  messageId: string;
  threadId?: string;
  subject?: string;
  from: string;
  fromName?: string;
  to?: string[];
  cc?: string[];
  bcc?: string[];
  body?: string;
  bodyHtml?: string;
  snippet?: string;
  hasAttachments: boolean;
  attachments?: Array<{
    filename: string;
    contentType: string;
    size: number;
    data?: Buffer;
  }>;
  sentAt?: Date;
  receivedAt?: Date;
  isRead: boolean;
  isStarred: boolean;
  folder: string;
}

/**
 * Fetch emails from Gmail using Gmail API
 */
export async function fetchGmailEmails(
  account: EmailAccount,
  maxResults = 50
): Promise<FetchedEmail[]> {
  if (!account.accessToken || !account.refreshToken) {
    throw new Error("Missing Gmail access or refresh token");
  }

  const gmail = getAuthenticatedGmailClient(account.accessToken, account.refreshToken);

  // Fetch message list
  const response = await gmail.users.messages.list({
    userId: "me",
    maxResults,
    labelIds: ["INBOX"],
  });

  const messages = response.data.messages || [];
  const fetchedEmails: FetchedEmail[] = [];

  // Fetch full message details for each message
  for (const message of messages) {
    if (!message.id) continue;

    const fullMessage = await gmail.users.messages.get({
      userId: "me",
      id: message.id,
      format: "full",
    });

    const headers = fullMessage.data.payload?.headers || [];
    const getHeader = (name: string) =>
      headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value;

    const subject = getHeader("Subject");
    const from = getHeader("From") || "";
    const to = getHeader("To")?.split(",").map((e) => e.trim());
    const cc = getHeader("Cc")?.split(",").map((e) => e.trim());
    const date = getHeader("Date");

    // Extract body
    let body = "";
    let bodyHtml = "";
    const parts = fullMessage.data.payload?.parts || [];
    
    for (const part of parts) {
      if (part.mimeType === "text/plain" && part.body?.data) {
        body = Buffer.from(part.body.data, "base64").toString("utf-8");
      }
      if (part.mimeType === "text/html" && part.body?.data) {
        bodyHtml = Buffer.from(part.body.data, "base64").toString("utf-8");
      }
    }

    // If no parts, check main body
    if (!body && fullMessage.data.payload?.body?.data) {
      body = Buffer.from(fullMessage.data.payload.body.data, "base64").toString("utf-8");
    }

    const snippet = fullMessage.data.snippet || body.substring(0, 200);

    // Check for attachments
    const hasAttachments = parts.some((p) => p.filename && p.filename.length > 0);

    // Check labels for read/starred status
    const labels = fullMessage.data.labelIds || [];
    const isRead = !labels.includes("UNREAD");
    const isStarred = labels.includes("STARRED");

    fetchedEmails.push({
      messageId: message.id,
      threadId: fullMessage.data.threadId || undefined,
      subject: subject || undefined,
      from,
      fromName: from.split("<")[0].trim(),
      to,
      cc,
      body: body || undefined,
      bodyHtml: bodyHtml || undefined,
      snippet,
      hasAttachments,
      sentAt: date ? new Date(date) : undefined,
      receivedAt: new Date(parseInt(fullMessage.data.internalDate || "0")),
      isRead,
      isStarred,
      folder: "inbox",
    });
  }

  return fetchedEmails;
}

/**
 * Fetch emails from IMAP server (for generic IMAP accounts)
 */
export async function fetchImapEmails(
  account: EmailAccount,
  maxResults = 50
): Promise<FetchedEmail[]> {
  if (!account.imapHost || !account.imapPort || !account.imapUsername || !account.imapPassword) {
    throw new Error("Missing IMAP configuration");
  }

  const config = {
    imap: {
      user: account.imapUsername,
      password: account.imapPassword,
      host: account.imapHost,
      port: account.imapPort,
      tls: true,
      authTimeout: 10000,
    },
  };

  const connection = await imaps.connect(config);
  await connection.openBox("INBOX");

  // Search for recent emails
  const searchCriteria = ["ALL"];
  const fetchOptions = {
    bodies: ["HEADER", "TEXT", ""],
    markSeen: false,
  };

  const messages = await connection.search(searchCriteria, fetchOptions);
  const fetchedEmails: FetchedEmail[] = [];

  for (const item of messages.slice(0, maxResults)) {
    const all = item.parts.find((part: any) => part.which === "");
    if (!all || !all.body) continue;

    const parsed = await simpleParser(all.body);

    const attachments = parsed.attachments.map((att: any) => ({
      filename: att.filename || "unknown",
      contentType: att.contentType,
      size: att.size,
      data: att.content,
    }));

    fetchedEmails.push({
      messageId: parsed.messageId || `${Date.now()}-${Math.random()}`,
      threadId: parsed.inReplyTo,
      subject: parsed.subject,
      from: parsed.from?.value[0]?.address || "",
      fromName: parsed.from?.value[0]?.name,
      to: (parsed.to as any)?.value?.map((t: any) => t.address) || [],
      cc: (parsed.cc as any)?.value?.map((c: any) => c.address) || [],
      body: parsed.text,
      bodyHtml: parsed.html || undefined,
      snippet: parsed.text?.substring(0, 200),
      hasAttachments: attachments.length > 0,
      attachments,
      sentAt: parsed.date,
      receivedAt: parsed.date,
      isRead: item.attributes.flags.includes("\\Seen"),
      isStarred: item.attributes.flags.includes("\\Flagged"),
      folder: "inbox",
    });
  }

  connection.end();
  return fetchedEmails;
}

/**
 * Fetch emails from Outlook using Microsoft Graph API
 */
export async function fetchOutlookEmails(
  account: EmailAccount,
  maxResults = 50
): Promise<FetchedEmail[]> {
  if (!account.accessToken) {
    throw new Error("Missing Outlook access token");
  }

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/me/messages?$top=${maxResults}&$select=id,subject,from,toRecipients,ccRecipients,bodyPreview,body,hasAttachments,isRead,receivedDateTime,sentDateTime`,
    {
      headers: {
        Authorization: `Bearer ${account.accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Outlook emails: ${response.statusText}`);
  }

  const data = await response.json();
  const messages = data.value || [];

  return messages.map((msg: any) => ({
    messageId: msg.id,
    subject: msg.subject,
    from: msg.from?.emailAddress?.address || "",
    fromName: msg.from?.emailAddress?.name,
    to: msg.toRecipients?.map((r: any) => r.emailAddress.address),
    cc: msg.ccRecipients?.map((r: any) => r.emailAddress.address),
    body: msg.body?.content,
    bodyHtml: msg.body?.contentType === "html" ? msg.body?.content : undefined,
    snippet: msg.bodyPreview,
    hasAttachments: msg.hasAttachments || false,
    sentAt: new Date(msg.sentDateTime),
    receivedAt: new Date(msg.receivedDateTime),
    isRead: msg.isRead || false,
    isStarred: false, // Outlook doesn't have direct "starred" concept
    folder: "inbox",
  }));
}

/**
 * Universal email fetcher - routes to correct provider
 */
export async function fetchEmails(account: EmailAccount, maxResults = 50): Promise<FetchedEmail[]> {
  switch (account.provider) {
    case "gmail":
      return fetchGmailEmails(account, maxResults);
    case "outlook":
      return fetchOutlookEmails(account, maxResults);
    case "imap":
      return fetchImapEmails(account, maxResults);
    default:
      throw new Error(`Unsupported email provider: ${account.provider}`);
  }
}
