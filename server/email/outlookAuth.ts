import { ConfidentialClientApplication, AuthorizationUrlRequest, AuthorizationCodeRequest } from "@azure/msal-node";

const OUTLOOK_CLIENT_ID = process.env.OUTLOOK_CLIENT_ID || "";
const OUTLOOK_CLIENT_SECRET = process.env.OUTLOOK_CLIENT_SECRET || "";
const OUTLOOK_TENANT_ID = process.env.OUTLOOK_TENANT_ID || "common";
const OUTLOOK_REDIRECT_URI = process.env.OUTLOOK_REDIRECT_URI || "http://localhost:3000/api/auth/outlook/callback";

const msalConfig = {
  auth: {
    clientId: OUTLOOK_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${OUTLOOK_TENANT_ID}`,
    clientSecret: OUTLOOK_CLIENT_SECRET,
  },
};

const scopes = [
  "https://graph.microsoft.com/Mail.Read",
  "https://graph.microsoft.com/Mail.Send",
  "https://graph.microsoft.com/Mail.ReadWrite",
  "https://graph.microsoft.com/User.Read",
  "https://graph.microsoft.com/Calendars.ReadWrite",
  "offline_access",
];

/**
 * Create Outlook MSAL client
 */
export function createOutlookMsalClient(): ConfidentialClientApplication {
  return new ConfidentialClientApplication(msalConfig);
}

/**
 * Generate Outlook OAuth2 authorization URL
 */
export async function getOutlookAuthUrl(): Promise<string> {
  const msalClient = createOutlookMsalClient();

  const authCodeUrlParameters: AuthorizationUrlRequest = {
    scopes,
    redirectUri: OUTLOOK_REDIRECT_URI,
  };

  return msalClient.getAuthCodeUrl(authCodeUrlParameters);
}

/**
 * Exchange authorization code for tokens
 */
export async function getOutlookTokens(code: string) {
  const msalClient = createOutlookMsalClient();

  const tokenRequest: AuthorizationCodeRequest = {
    code,
    scopes,
    redirectUri: OUTLOOK_REDIRECT_URI,
  };

  const response = await msalClient.acquireTokenByCode(tokenRequest);
  return {
    accessToken: response?.accessToken,
    refreshToken: response?.account?.homeAccountId, // Store account ID for token refresh
    expiresOn: response?.expiresOn,
  };
}

/**
 * Refresh Outlook access token
 */
export async function refreshOutlookToken(refreshToken: string) {
  const msalClient = createOutlookMsalClient();

  const refreshTokenRequest = {
    refreshToken,
    scopes,
  };

  const response = await msalClient.acquireTokenByRefreshToken(refreshTokenRequest);
  return {
    accessToken: response?.accessToken,
    refreshToken: response?.account?.homeAccountId || refreshToken,
    expiresOn: response?.expiresOn,
  };
}

/**
 * Get user's Outlook profile
 */
export async function getOutlookProfile(accessToken: string) {
  const response = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Outlook profile: ${response.statusText}`);
  }

  return response.json();
}
