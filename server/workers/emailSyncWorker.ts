import { Worker, Queue, Job } from "bullmq";
import { Redis } from "ioredis";
import { getEmailAccountsByUserId, updateEmailAccount } from "../db/emailAccountHelpers";
import { createEmail } from "../db/emailHelpers";
import { fetchEmails } from "../email/imapService";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = process.env.EMAIL_ENCRYPTION_KEY || "default-encryption-key-change-in-production";

function decryptToken(encryptedToken: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Redis connection - optional, gracefully handle if not available
let redisConnection: Redis | null = null;
let emailSyncQueue: Queue | null = null;
let emailSyncWorker: Worker | null = null;

// Job data interface
interface EmailSyncJobData {
  userId: number;
  accountId?: number; // Optional: sync specific account only
}

// Initialize Redis connection and workers
async function initializeRedis() {
  try {
    redisConnection = new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: parseInt(process.env.REDIS_PORT || "6379"),
      maxRetriesPerRequest: null,
      lazyConnect: true,
      retryStrategy: () => null, // Don't retry if connection fails
    });
    await redisConnection.connect().catch(() => {
      console.warn("[EmailSyncWorker] Redis not available - background sync disabled");
      redisConnection = null;
    });
  } catch (error) {
    console.warn("[EmailSyncWorker] Redis connection failed - background sync disabled");
    redisConnection = null;
  }

  if (!redisConnection) {
    console.warn("[EmailSyncWorker] Background sync disabled - Redis not configured");
    return;
  }

  // Create queue
  emailSyncQueue = new Queue("email-sync", {
    connection: redisConnection,
  });

  // Create worker
  emailSyncWorker = new Worker<EmailSyncJobData>(
  "email-sync",
  async (job: Job<EmailSyncJobData>) => {
    const { userId, accountId } = job.data;

    console.log(`[EmailSyncWorker] Starting sync for user ${userId}${accountId ? `, account ${accountId}` : ""}`);

    try {
      // Get accounts to sync
      const accounts = await getEmailAccountsByUserId(userId);
      const accountsToSync = accountId
        ? accounts.filter(acc => acc.id === accountId)
        : accounts;

      let totalEmailsSynced = 0;

      for (const account of accountsToSync) {
        try {
          console.log(`[EmailSyncWorker] Syncing account ${account.id} (${account.email})`);

          // Decrypt tokens
          const accessToken = account.accessToken ? decryptToken(account.accessToken) : "";
          const refreshToken = account.refreshToken ? decryptToken(account.refreshToken) : undefined;

          // Update account with decrypted tokens for fetching
          const accountWithTokens = {
            ...account,
            accessToken,
            refreshToken,
          };

          // Fetch emails
          const emails = await fetchEmails(accountWithTokens as any);

          console.log(`[EmailSyncWorker] Fetched ${emails.length} emails for account ${account.id}`);

          // Store emails in database
          for (const email of emails) {
            try {
              await createEmail({
                userId,
                accountId: account.id,
                messageId: email.messageId,
                threadId: email.threadId || null,
                subject: email.subject || null,
                from: email.from,
                fromName: email.fromName || null,
                to: email.to ? JSON.stringify(email.to) : null,
                cc: email.cc ? JSON.stringify(email.cc) : null,
                bcc: email.bcc ? JSON.stringify(email.bcc) : null,
                body: email.body || null,
                bodyHtml: email.bodyHtml || null,
                snippet: email.snippet || null,
                folder: email.folder || "inbox",
                sentAt: email.sentAt || null,
                receivedAt: email.receivedAt || new Date(),
                isRead: email.isRead ? 1 : 0,
                isStarred: email.isStarred ? 1 : 0,
                hasAttachments: email.hasAttachments ? 1 : 0,
                attachments: email.attachments ? JSON.stringify(email.attachments) : null,
              });
              totalEmailsSynced++;
            } catch (emailError: any) {
              // Skip duplicate emails (unique constraint on messageId)
              if (!emailError.message?.includes("Duplicate")) {
                console.error(`[EmailSyncWorker] Error storing email ${email.messageId}:`, emailError);
              }
            }
          }

          // Update last synced timestamp
          await updateEmailAccount(account.id, {
            lastSyncedAt: new Date(),
          });

          console.log(`[EmailSyncWorker] Successfully synced account ${account.id}`);
        } catch (accountError) {
          console.error(`[EmailSyncWorker] Error syncing account ${account.id}:`, accountError);
          // Continue with next account
        }
      }

      console.log(`[EmailSyncWorker] Sync complete for user ${userId}. Total emails synced: ${totalEmailsSynced}`);

      return {
        success: true,
        accountsSynced: accountsToSync.length,
        emailsSynced: totalEmailsSynced,
      };
    } catch (error) {
      console.error(`[EmailSyncWorker] Fatal error syncing user ${userId}:`, error);
      throw error;
    }
  },
    {
      connection: redisConnection,
      concurrency: 5, // Process up to 5 sync jobs concurrently
    }
  );

  // Worker event listeners
  emailSyncWorker.on("completed", (job) => {
    console.log(`[EmailSyncWorker] Job ${job.id} completed successfully`);
  });

  emailSyncWorker.on("failed", (job, err) => {
    console.error(`[EmailSyncWorker] Job ${job?.id} failed:`, err);
  });

  emailSyncWorker.on("error", (err) => {
    console.error("[EmailSyncWorker] Worker error:", err);
  });

  console.log("[EmailSyncWorker] Email sync worker started");
}

// Initialize on module load
initializeRedis().catch(console.error);

export { emailSyncQueue, emailSyncWorker };

// Schedule periodic sync for all users
export async function schedulePeriodicSync(userId: number, intervalMinutes = 15) {
  if (!emailSyncQueue) {
    console.warn("[EmailSyncWorker] Cannot schedule sync - Redis not available");
    return;
  }
  await emailSyncQueue.add(
    `periodic-sync-user-${userId}`,
    { userId },
    {
      repeat: {
        every: intervalMinutes * 60 * 1000, // Convert to milliseconds
      },
    }
  );
  console.log(`[EmailSyncWorker] Scheduled periodic sync for user ${userId} every ${intervalMinutes} minutes`);
}

// Trigger immediate sync
export async function triggerImmediateSync(userId: number, accountId?: number) {
  if (!emailSyncQueue) {
    console.warn("[EmailSyncWorker] Cannot trigger sync - Redis not available");
    return;
  }
  await emailSyncQueue.add(
    `immediate-sync-user-${userId}${accountId ? `-account-${accountId}` : ""}`,
    { userId, accountId }
  );
  console.log(`[EmailSyncWorker] Triggered immediate sync for user ${userId}${accountId ? `, account ${accountId}` : ""}`);
}


