import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, datetime, boolean, json } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Email accounts table - stores connected email accounts (Gmail, Outlook, IMAP)
 */
export const emailAccounts = mysqlTable("emailAccounts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  provider: mysqlEnum("provider", ["gmail", "outlook", "imap"]).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  displayName: varchar("displayName", { length: 255 }),
  // Encrypted credentials
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  imapHost: varchar("imapHost", { length: 255 }),
  imapPort: int("imapPort"),
  smtpHost: varchar("smtpHost", { length: 255 }),
  smtpPort: int("smtpPort"),
  imapUsername: varchar("imapUsername", { length: 255 }),
  imapPassword: text("imapPassword"), // Encrypted
  smtpUsername: varchar("smtpUsername", { length: 255 }),
  smtpPassword: text("smtpPassword"), // Encrypted
  lastSyncedAt: timestamp("lastSyncedAt"),
  isActive: int("isActive").default(1).notNull(), // 1 = active, 0 = inactive
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailAccount = typeof emailAccounts.$inferSelect;
export type InsertEmailAccount = typeof emailAccounts.$inferInsert;

/**
 * Emails table - stores all emails from all accounts
 */
export const emails = mysqlTable("emails", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  accountId: int("accountId").notNull(),
  messageId: varchar("messageId", { length: 255 }).notNull(), // Unique email ID from provider
  threadId: varchar("threadId", { length: 255 }),
  subject: text("subject"),
  from: varchar("from", { length: 320 }).notNull(),
  fromName: varchar("fromName", { length: 255 }),
  to: text("to"), // JSON array of recipients
  cc: text("cc"), // JSON array
  bcc: text("bcc"), // JSON array
  replyTo: varchar("replyTo", { length: 320 }),
  body: text("body"),
  bodyHtml: text("bodyHtml"),
  snippet: text("snippet"), // First 200 chars for preview
  hasAttachments: int("hasAttachments").default(0).notNull(),
  attachments: text("attachments"), // JSON array of attachment metadata
  folder: varchar("folder", { length: 50 }).default("inbox").notNull(), // inbox, sent, drafts, archive, spam, trash
  isRead: int("isRead").default(0).notNull(),
  isStarred: int("isStarred").default(0).notNull(),
  isPinned: int("isPinned").default(0).notNull(),
  priority: mysqlEnum("priority", ["urgent", "high", "normal", "low"]).default("normal"),
  aiSummary: text("aiSummary"), // AI-generated summary
  aiCategory: varchar("aiCategory", { length: 50 }), // AI-assigned category
  sentAt: timestamp("sentAt"),
  receivedAt: timestamp("receivedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Email = typeof emails.$inferSelect;
export type InsertEmail = typeof emails.$inferInsert;

/**
 * Contacts table - stores email contacts
 */
export const contacts = mysqlTable("contacts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }),
  company: varchar("company", { length: 255 }),
  jobTitle: varchar("jobTitle", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  notes: text("notes"),
  avatar: varchar("avatar", { length: 500 }), // URL to avatar image
  tags: text("tags"), // JSON array of tags
  lastEmailedAt: timestamp("lastEmailedAt"),
  emailCount: int("emailCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

/**
 * Calendar events table
 */
export const calendarEvents = mysqlTable("calendarEvents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 500 }),
  startTime: timestamp("startTime").notNull(),
  endTime: timestamp("endTime").notNull(),
  attendees: text("attendees"), // JSON array of email addresses
  organizer: varchar("organizer", { length: 320 }),
  isAllDay: int("isAllDay").default(0).notNull(),
  recurrence: text("recurrence"), // JSON for recurrence rules
  reminders: text("reminders"), // JSON array of reminder times
  externalId: varchar("externalId", { length: 255 }), // ID from Google/Outlook
  externalProvider: varchar("externalProvider", { length: 50 }), // google, outlook
  status: mysqlEnum("status", ["confirmed", "tentative", "cancelled"]).default("confirmed"),
  sharedNoteId: int("sharedNoteId"), // Link to shared note
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CalendarEvent = typeof calendarEvents.$inferSelect;
export type InsertCalendarEvent = typeof calendarEvents.$inferInsert;

/**
 * Notes table - for user notes and meeting notes
 */
export const notes = mysqlTable("notes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 500 }),
  content: text("content"),
  drawingData: text("drawingData"), // JSON for drawing canvas data
  tags: text("tags"), // JSON array
  isShared: int("isShared").default(0).notNull(),
  sharedWith: text("sharedWith"), // JSON array of user IDs or emails
  linkedEventId: int("linkedEventId"), // Link to calendar event
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Note = typeof notes.$inferSelect;
export type InsertNote = typeof notes.$inferInsert;

/**
 * Email sync status - tracks last sync for each account
 */
export const emailSyncStatus = mysqlTable("emailSyncStatus", {
  id: int("id").autoincrement().primaryKey(),
  accountId: int("accountId").notNull().unique(),
  lastSyncedMessageId: varchar("lastSyncedMessageId", { length: 255 }),
  lastSyncedAt: timestamp("lastSyncedAt"),
  syncStatus: mysqlEnum("syncStatus", ["idle", "syncing", "error"]).default("idle"),
  errorMessage: text("errorMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailSyncStatus = typeof emailSyncStatus.$inferSelect;
export type InsertEmailSyncStatus = typeof emailSyncStatus.$inferInsert;

/**
 * Email templates - user-created custom email templates
 */
export const emailTemplates = mysqlTable("emailTemplates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 500 }),
  body: text("body").notNull(),
  category: varchar("category", { length: 100 }), // e.g., "work", "personal", "sales"
  isDefault: int("isDefault").default(0).notNull(), // 1 = default template
  usageCount: int("usageCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailTemplate = typeof emailTemplates.$inferSelect;
export type InsertEmailTemplate = typeof emailTemplates.$inferInsert;

/**
 * User preferences - notification settings and preferences
 */
export const userPreferences = mysqlTable("userPreferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  // Notification preferences
  emailNotifications: int("emailNotifications").default(1).notNull(),
  desktopNotifications: int("desktopNotifications").default(1).notNull(),
  soundEnabled: int("soundEnabled").default(1).notNull(),
  notifyOnImportant: int("notifyOnImportant").default(1).notNull(),
  notifyOnMentions: int("notifyOnMentions").default(1).notNull(),
  // Display preferences
  theme: mysqlEnum("theme", ["light", "dark", "auto"]).default("light"),
  emailsPerPage: int("emailsPerPage").default(50).notNull(),
  showPreview: int("showPreview").default(1).notNull(),
  compactView: int("compactView").default(0).notNull(),
  // Privacy preferences
  readReceipts: int("readReceipts").default(0).notNull(),
  allowTracking: int("allowTracking").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserPreference = typeof userPreferences.$inferSelect;
export type InsertUserPreference = typeof userPreferences.$inferInsert;

/**
 * Snoozed emails - emails that are temporarily hidden and will reappear
 */
export const snoozedEmails = mysqlTable("snoozedEmails", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  emailId: int("emailId").notNull(),
  snoozeUntil: timestamp("snoozeUntil").notNull(),
  reminderSent: int("reminderSent").default(0).notNull(), // 1 = reminder sent
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SnoozedEmail = typeof snoozedEmails.$inferSelect;
export type InsertSnoozedEmail = typeof snoozedEmails.$inferInsert;

// ============================================
// 12-AGENT SAAS CORE SCHEMA (ADDITIVE)
// ============================================

// RBAC & Admin
export const roles = mysqlTable('roles', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: text('description'),
  permissions: json('permissions').$type<string[]>(),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const userRoles = mysqlTable('user_roles', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  roleId: int('role_id').notNull(),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Billing
export const subscriptions = mysqlTable('subscriptions', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  planId: varchar('plan_id', { length: 100 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(), // active, canceled, past_due
  currentPeriodStart: datetime('current_period_start'),
  currentPeriodEnd: datetime('current_period_end'),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const invoices = mysqlTable('invoices', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  subscriptionId: int('subscription_id'),
  amount: int('amount').notNull(),
  currency: varchar('currency', { length: 3 }).default('USD'),
  status: varchar('status', { length: 50 }).notNull(), // paid, pending, failed
  paidAt: datetime('paid_at'),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Notifications
export const notifications = mysqlTable('notifications', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false),
  actionUrl: varchar('action_url', { length: 500 }),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const notificationPreferences = mysqlTable('notification_preferences', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull().unique(),
  emailEnabled: boolean('email_enabled').default(true),
  pushEnabled: boolean('push_enabled').default(true),
  inAppEnabled: boolean('in_app_enabled').default(true),
  preferences: json('preferences').$type<Record<string, boolean>>(),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// Support
export const tickets = mysqlTable('tickets', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 255 }).notNull(),
  description: text('description').notNull(),
  status: varchar('status', { length: 50 }).default('open'), // open, in_progress, resolved, closed
  priority: varchar('priority', { length: 50 }).default('medium'),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const feedback = mysqlTable('feedback', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }),
  type: varchar('type', { length: 50 }).notNull(), // bug, feature, improvement
  message: text('message').notNull(),
  rating: int('rating'),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Activity Log
export const activityLog = mysqlTable('activity_log', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  action: varchar('action', { length: 100 }).notNull(),
  resource: varchar('resource', { length: 100 }),
  resourceId: varchar('resource_id', { length: 255 }),
  metadata: json('metadata').$type<Record<string, any>>(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: varchar('user_agent', { length: 500 }),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Feature Flags
export const featureFlags = mysqlTable('feature_flags', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  enabled: boolean('enabled').default(false),
  rolloutPercentage: int('rollout_percentage').default(0),
  conditions: json('conditions').$type<Record<string, any>>(),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

// API Tokens
export const apiTokens = mysqlTable('api_tokens', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  scopes: json('scopes').$type<string[]>(),
  lastUsedAt: datetime('last_used_at'),
  expiresAt: datetime('expires_at'),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Webhooks
export const webhooks = mysqlTable('webhooks', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  events: json('events').$type<string[]>(),
  secret: varchar('secret', { length: 255 }).notNull(),
  enabled: boolean('enabled').default(true),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Consent & Compliance
export const userConsents = mysqlTable('user_consents', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  consentType: varchar('consent_type', { length: 100 }).notNull(),
  granted: boolean('granted').notNull(),
  version: varchar('version', { length: 50 }),
  createdAt: datetime('created_at').default(sql`CURRENT_TIMESTAMP`),
});

