import { and, desc, eq, or, sql } from "drizzle-orm";
import {
  calendarEvents,
  contacts,
  emailAccounts,
  emails,
  emailSyncStatus,
  InsertCalendarEvent,
  InsertContact,
  InsertEmail,
  InsertEmailAccount,
  notes,
} from "../drizzle/schema";
import { getDb } from "./db";

/**
 * Email Accounts
 */
export async function createEmailAccount(account: InsertEmailAccount) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(emailAccounts).values(account) as any;
  return Number(result.insertId);
}

export async function getUserEmailAccounts(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(emailAccounts).where(eq(emailAccounts.userId, userId));
}

export async function getEmailAccountById(accountId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(emailAccounts).where(eq(emailAccounts.id, accountId)).limit(1);
  return result[0];
}

export async function updateEmailAccount(accountId: number, updates: Partial<InsertEmailAccount>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(emailAccounts).set(updates).where(eq(emailAccounts.id, accountId));
}

export async function deleteEmailAccount(accountId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(emailAccounts).where(eq(emailAccounts.id, accountId));
}

/**
 * Emails
 */
export async function createEmail(email: InsertEmail) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(emails).values(email) as any;
  return Number(result.insertId);
}

export async function getUserEmails(userId: number, folder?: string, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = [eq(emails.userId, userId)];
  if (folder) {
    conditions.push(eq(emails.folder, folder));
  }
  
  return db
    .select()
    .from(emails)
    .where(and(...conditions))
    .orderBy(desc(emails.receivedAt))
    .limit(limit);
}

export async function getEmailById(emailId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(emails).where(eq(emails.id, emailId)).limit(1);
  return result[0];
}

export async function updateEmail(emailId: number, updates: Partial<InsertEmail>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(emails).set(updates).where(eq(emails.id, emailId));
}

export async function deleteEmail(emailId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(emails).where(eq(emails.id, emailId));
}

export async function searchEmails(userId: number, query: string, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(emails)
    .where(
      and(
        eq(emails.userId, userId),
        or(
          sql`${emails.subject} LIKE ${`%${query}%`}`,
          sql`${emails.body} LIKE ${`%${query}%`}`,
          sql`${emails.from} LIKE ${`%${query}%`}`
        )
      )
    )
    .orderBy(desc(emails.receivedAt))
    .limit(limit);
}

export async function getPriorityEmails(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(emails)
    .where(
      and(
        eq(emails.userId, userId),
        or(
          eq(emails.priority, "urgent"),
          eq(emails.priority, "high")
        )
      )
    )
    .orderBy(desc(emails.receivedAt))
    .limit(50);
}

/**
 * Contacts
 */
export async function createContact(contact: InsertContact) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(contacts).values(contact) as any;
  return Number(result.insertId);
}

export async function getUserContacts(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(contacts).where(eq(contacts.userId, userId)).orderBy(desc(contacts.lastEmailedAt));
}

export async function getContactByEmail(userId: number, email: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(contacts)
    .where(and(eq(contacts.userId, userId), eq(contacts.email, email)))
    .limit(1);
  return result[0];
}

export async function updateContact(contactId: number, updates: Partial<InsertContact>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(contacts).set(updates).where(eq(contacts.id, contactId));
}

export async function deleteContact(contactId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(contacts).where(eq(contacts.id, contactId));
}

/**
 * Calendar Events
 */
export async function createCalendarEvent(event: InsertCalendarEvent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(calendarEvents).values(event) as any;
  return Number(result.insertId);
}

export async function getUserCalendarEvents(userId: number, startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = [eq(calendarEvents.userId, userId)];
  
  if (startDate) {
    conditions.push(sql`${calendarEvents.startTime} >= ${startDate}`);
  }
  if (endDate) {
    conditions.push(sql`${calendarEvents.endTime} <= ${endDate}`);
  }
  
  return db
    .select()
    .from(calendarEvents)
    .where(and(...conditions))
    .orderBy(calendarEvents.startTime);
}

export async function getCalendarEventById(eventId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(calendarEvents).where(eq(calendarEvents.id, eventId)).limit(1);
  return result[0];
}

export async function updateCalendarEvent(eventId: number, updates: Partial<InsertCalendarEvent>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(calendarEvents).set(updates).where(eq(calendarEvents.id, eventId));
}

export async function deleteCalendarEvent(eventId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(calendarEvents).where(eq(calendarEvents.id, eventId));
}

/**
 * Notes
 */
export async function createNote(note: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(notes).values(note) as any;
  return Number(result.insertId);
}

export async function getUserNotes(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(notes).where(eq(notes.userId, userId)).orderBy(desc(notes.updatedAt));
}

export async function getNoteById(noteId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(notes).where(eq(notes.id, noteId)).limit(1);
  return result[0];
}

export async function updateNote(noteId: number, updates: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(notes).set(updates).where(eq(notes.id, noteId));
}

export async function deleteNote(noteId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(notes).where(eq(notes.id, noteId));
}

/**
 * Email Sync Status
 */
export async function getEmailSyncStatus(accountId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(emailSyncStatus).where(eq(emailSyncStatus.accountId, accountId)).limit(1);
  return result[0];
}

export async function updateEmailSyncStatus(accountId: number, updates: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getEmailSyncStatus(accountId);
  
  if (existing) {
    await db.update(emailSyncStatus).set(updates).where(eq(emailSyncStatus.accountId, accountId));
  } else {
    await db.insert(emailSyncStatus).values({ accountId, ...updates });
  }
}
