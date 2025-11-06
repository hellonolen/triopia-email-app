import { getEmailAccountsByUserId } from "../db/emailAccountHelpers";

export interface AccountHealth {
  accountId: number;
  email: string;
  status: "healthy" | "warning" | "error";
  lastSyncedAt: Date | null;
  syncStatus: "syncing" | "idle" | "failed" | "never_synced";
  errorMessage?: string;
  daysSinceLastSync?: number;
}

/**
 * Check health status of all user's email accounts
 */
export async function checkAccountsHealth(userId: number): Promise<AccountHealth[]> {
  const accounts = await getEmailAccountsByUserId(userId);
  
  const healthChecks = accounts.map(account => {
    const now = new Date();
    const lastSync = account.lastSyncedAt;
    
    let status: "healthy" | "warning" | "error" = "healthy";
    let syncStatus: "syncing" | "idle" | "failed" | "never_synced" = "idle";
    let daysSinceLastSync: number | undefined;
    
    if (!lastSync) {
      status = "warning";
      syncStatus = "never_synced";
    } else {
      const hoursSinceSync = (now.getTime() - lastSync.getTime()) / (1000 * 60 * 60);
      daysSinceLastSync = Math.floor(hoursSinceSync / 24);
      
      if (hoursSinceSync > 24) {
        status = "error";
        syncStatus = "failed";
      } else if (hoursSinceSync > 2) {
        status = "warning";
      }
    }
    
    return {
      accountId: account.id,
      email: account.email,
      status,
      lastSyncedAt: lastSync,
      syncStatus,
      daysSinceLastSync,
    };
  });
  
  return healthChecks;
}

/**
 * Get sync status for specific account
 */
export async function getAccountSyncStatus(accountId: number): Promise<{
  status: "syncing" | "idle" | "failed" | "never_synced";
  lastSyncedAt: Date | null;
  errorMessage?: string;
}> {
  // This will be enhanced with Redis queue status when available
  return {
    status: "idle",
    lastSyncedAt: null,
  };
}
