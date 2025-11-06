import { eq } from "drizzle-orm";
import { getDb } from "../db";
import { emails, InsertEmail } from "../../drizzle/schema";

export async function createEmail(data: Omit<InsertEmail, "id" | "createdAt" | "updatedAt">) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(emails).values(data);
  
  // Get the inserted record - use the last insert ID
  const insertId = (result as any).insertId || (result as any)[0]?.insertId;
  const [email] = await db
    .select()
    .from(emails)
    .where(eq(emails.id, Number(insertId)))
    .limit(1);
  
  return email;
}

export async function getEmailById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [email] = await db
    .select()
    .from(emails)
    .where(eq(emails.id, id))
    .limit(1);
  
  return email;
}

export async function getEmailsByAccountId(accountId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const emailList = await db
    .select()
    .from(emails)
    .where(eq(emails.accountId, accountId));
  
  return emailList;
}

export async function updateEmail(
  id: number, 
  data: Partial<Omit<InsertEmail, "id" | "accountId" | "createdAt">>
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db
    .update(emails)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(emails.id, id));
  
  return getEmailById(id);
}

export async function deleteEmail(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(emails).where(eq(emails.id, id));
  
  return { success: true };
}
