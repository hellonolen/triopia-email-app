import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { getAuthenticatedGmailClient } from "./gmailAuth";
import type { EmailAccount } from "../../drizzle/schema";

export interface SendEmailParams {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  bodyHtml?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
  inReplyTo?: string;
  references?: string[];
}

/**
 * Send email via Gmail using Gmail API
 */
export async function sendGmailEmail(
  account: EmailAccount,
  params: SendEmailParams
): Promise<{ messageId: string }> {
  if (!account.accessToken || !account.refreshToken) {
    throw new Error("Missing Gmail access or refresh token");
  }

  const gmail = getAuthenticatedGmailClient(account.accessToken, account.refreshToken);

  // Build RFC 2822 formatted email
  const messageParts = [
    `From: ${account.email}`,
    `To: ${params.to.join(", ")}`,
  ];

  if (params.cc && params.cc.length > 0) {
    messageParts.push(`Cc: ${params.cc.join(", ")}`);
  }

  if (params.bcc && params.bcc.length > 0) {
    messageParts.push(`Bcc: ${params.bcc.join(", ")}`);
  }

  messageParts.push(`Subject: ${params.subject}`);

  if (params.inReplyTo) {
    messageParts.push(`In-Reply-To: ${params.inReplyTo}`);
  }

  if (params.references && params.references.length > 0) {
    messageParts.push(`References: ${params.references.join(" ")}`);
  }

  messageParts.push("MIME-Version: 1.0");
  messageParts.push('Content-Type: text/html; charset="UTF-8"');
  messageParts.push("");
  messageParts.push(params.bodyHtml || params.body);

  const message = messageParts.join("\r\n");

  // Encode in base64url format
  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const response = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
    },
  });

  return { messageId: response.data.id || "" };
}

/**
 * Send email via Outlook using Microsoft Graph API
 */
export async function sendOutlookEmail(
  account: EmailAccount,
  params: SendEmailParams
): Promise<{ messageId: string }> {
  if (!account.accessToken) {
    throw new Error("Missing Outlook access token");
  }

  const message = {
    subject: params.subject,
    body: {
      contentType: params.bodyHtml ? "HTML" : "Text",
      content: params.bodyHtml || params.body,
    },
    toRecipients: params.to.map((email) => ({
      emailAddress: { address: email },
    })),
    ccRecipients: params.cc?.map((email) => ({
      emailAddress: { address: email },
    })),
    bccRecipients: params.bcc?.map((email) => ({
      emailAddress: { address: email },
    })),
  };

  const response = await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${account.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, saveToSentItems: true }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send Outlook email: ${response.statusText}`);
  }

  // Microsoft Graph API doesn't return message ID on send
  // We'd need to fetch from sent items to get the ID
  return { messageId: `outlook-${Date.now()}` };
}

/**
 * Send email via SMTP (for generic IMAP accounts)
 */
export async function sendSmtpEmail(
  account: EmailAccount,
  params: SendEmailParams
): Promise<{ messageId: string }> {
  if (!account.smtpHost || !account.smtpPort || !account.smtpUsername || !account.smtpPassword) {
    throw new Error("Missing SMTP configuration");
  }

  const transporter: Transporter = nodemailer.createTransport({
    host: account.smtpHost,
    port: account.smtpPort,
    secure: account.smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: account.smtpUsername,
      pass: account.smtpPassword,
    },
  });

  const mailOptions = {
    from: account.email,
    to: params.to.join(", "),
    cc: params.cc?.join(", "),
    bcc: params.bcc?.join(", "),
    subject: params.subject,
    text: params.body,
    html: params.bodyHtml,
    attachments: params.attachments,
    inReplyTo: params.inReplyTo,
    references: params.references,
  };

  const info = await transporter.sendMail(mailOptions);
  return { messageId: info.messageId };
}

/**
 * Universal email sender - routes to correct provider
 */
export async function sendEmail(
  account: EmailAccount,
  params: SendEmailParams
): Promise<{ messageId: string }> {
  switch (account.provider) {
    case "gmail":
      return sendGmailEmail(account, params);
    case "outlook":
      return sendOutlookEmail(account, params);
    case "imap":
      return sendSmtpEmail(account, params);
    default:
      throw new Error(`Unsupported email provider: ${account.provider}`);
  }
}
