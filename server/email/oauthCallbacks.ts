import { Express, Request, Response } from "express";
import { getGmailTokens, getGmailProfile } from "./gmailAuth";
import { getOutlookTokens, getOutlookProfile } from "./outlookAuth";
import { createEmailAccount } from "../db/emailAccountHelpers";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = process.env.EMAIL_ENCRYPTION_KEY || "default-encryption-key-change-in-production";

function encryptToken(token: string): string {
  return CryptoJS.AES.encrypt(token, ENCRYPTION_KEY).toString();
}

/**
 * Register OAuth callback routes for Gmail and Outlook
 */
export function registerEmailOAuthCallbacks(app: Express) {
  // Gmail OAuth callback
  app.get("/api/auth/gmail/callback", async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const error = req.query.error as string;

    if (error) {
      console.error("[Gmail OAuth] Error:", error);
      return res.redirect(`/settings?error=${encodeURIComponent(error)}`);
    }

    if (!code) {
      return res.redirect("/settings?error=no_code");
    }

    try {
      // Exchange code for tokens
      const tokens = await getGmailTokens(code);
      
      // Get user profile
      const profile = await getGmailProfile(tokens.access_token || "", tokens.refresh_token || "");
      
      // Encrypt tokens before storing
      const encryptedAccessToken = encryptToken(tokens.access_token || "");
      const encryptedRefreshToken = tokens.refresh_token ? encryptToken(tokens.refresh_token) : null;
      
      // TODO: Get actual user ID from session
      // For now, using a placeholder - this needs to be connected to auth system
      const userId = 1;
      
      // Create email account record
      await createEmailAccount({
        userId,
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
      
      // Redirect back to settings with success message
      res.redirect("/settings?success=gmail_connected");
    } catch (error) {
      console.error("[Gmail OAuth] Callback error:", error);
      res.redirect("/settings?error=gmail_failed");
    }
  });

  // Outlook OAuth callback
  app.get("/api/auth/outlook/callback", async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const error = req.query.error as string;

    if (error) {
      console.error("[Outlook OAuth] Error:", error);
      return res.redirect(`/settings?error=${encodeURIComponent(error)}`);
    }

    if (!code) {
      return res.redirect("/settings?error=no_code");
    }

    try {
      // Exchange code for tokens
      const tokens = await getOutlookTokens(code);
      
      // Get user profile
      const profile = await getOutlookProfile(tokens.accessToken);
      
      // Encrypt tokens before storing
      const encryptedAccessToken = encryptToken(tokens.accessToken);
      const encryptedRefreshToken = tokens.refreshToken ? encryptToken(tokens.refreshToken) : null;
      
      // TODO: Get actual user ID from session
      // For now, using a placeholder - this needs to be connected to auth system
      const userId = 1;
      
      // Create email account record
      await createEmailAccount({
        userId,
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
      
      // Redirect back to settings with success message
      res.redirect("/settings?success=outlook_connected");
    } catch (error) {
      console.error("[Outlook OAuth] Callback error:", error);
      res.redirect("/settings?error=outlook_failed");
    }
  });
}
