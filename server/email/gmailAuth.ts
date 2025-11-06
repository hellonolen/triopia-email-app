import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID || "";
const GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET || "";
const GMAIL_REDIRECT_URI = process.env.GMAIL_REDIRECT_URI || "http://localhost:3000/api/auth/gmail/callback";

/**
 * Create Gmail OAuth2 client
 */
export function createGmailOAuth2Client(): OAuth2Client {
  return new google.auth.OAuth2(
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    GMAIL_REDIRECT_URI
  );
}

/**
 * Generate Gmail OAuth2 authorization URL
 */
export function getGmailAuthUrl(): string {
  const oauth2Client = createGmailOAuth2Client();
  
  const scopes = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/gmail.labels",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent", // Force consent screen to get refresh token
  });
}

/**
 * Exchange authorization code for tokens
 */
export async function getGmailTokens(code: string) {
  const oauth2Client = createGmailOAuth2Client();
  
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

/**
 * Refresh Gmail access token
 */
export async function refreshGmailToken(refreshToken: string) {
  const oauth2Client = createGmailOAuth2Client();
  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  const { credentials } = await oauth2Client.refreshAccessToken();
  return credentials;
}

/**
 * Get authenticated Gmail client
 */
export function getAuthenticatedGmailClient(accessToken: string, refreshToken: string) {
  const oauth2Client = createGmailOAuth2Client();
  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  return google.gmail({ version: "v1", auth: oauth2Client });
}

/**
 * Get user's Gmail profile
 */
export async function getGmailProfile(accessToken: string, refreshToken: string) {
  const gmail = getAuthenticatedGmailClient(accessToken, refreshToken);
  
  const profile = await gmail.users.getProfile({ userId: "me" });
  return profile.data;
}
