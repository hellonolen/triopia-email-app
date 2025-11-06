import { eq } from "drizzle-orm";
import { getDb } from "../db";
import { emailAccounts, InsertEmailAccount } from "../../drizzle/schema";

export async function createEmailAccount(data: Omit<InsertEmailAccount, "id" | "createdAt" | "updatedAt">) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(emailAccounts).values(data);
  
  // Get the inserted record - use the last insert ID
  const insertId = (result as any).insertId || (result as any)[0]?.insertId;
  const [account] = await db
    .select()
    .from(emailAccounts)
    .where(eq(emailAccounts.id, Number(insertId)))
    .limit(1);
  
  return account;
}

export async function getEmailAccountById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [account] = await db
    .select()
    .from(emailAccounts)
    .where(eq(emailAccounts.id, id))
    .limit(1);
  
  return account;
}

export async function getEmailAccountsByUserId(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const accounts = await db
    .select()
    .from(emailAccounts)
    .where(eq(emailAccounts.userId, userId));
  
  return accounts;
}

export async function updateEmailAccount(
  id: number, 
  data: Partial<Omit<InsertEmailAccount, "id" | "userId" | "createdAt">>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(emailAccounts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(emailAccounts.id, id));
  
  return getEmailAccountById(id);
}

export async function deleteEmailAccount(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(emailAccounts).where(eq(emailAccounts.id, id));
  
  return { success: true };
}
