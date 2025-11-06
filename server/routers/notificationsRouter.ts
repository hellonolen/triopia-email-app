import { z } from 'zod';
import { router, publicProcedure } from '../_core/trpc';
import { getDb } from '../db';
import { notifications, notificationPreferences } from '../../drizzle/schema';
import { eq, desc } from 'drizzle-orm';

export const notificationsRouter = router({
  // List notifications
  list: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return await db.select().from(notifications)
        .where(eq(notifications.userId, input.userId))
        .orderBy(desc(notifications.createdAt));
    }),

  // Mark as read
  markAsRead: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(notifications)
        .set({ isRead: true })
        .where(eq(notifications.id, input.id));
      return { success: true };
    }),

  // Create notification
  create: publicProcedure
    .input(z.object({
      userId: z.string(),
      type: z.string(),
      title: z.string(),
      message: z.string(),
      actionUrl: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(notifications).values(input);
      return { id: Number(result.insertId) };
    }),

  // Get preferences
  getPreferences: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const prefs = await db.select().from(notificationPreferences)
        .where(eq(notificationPreferences.userId, input.userId));
      return prefs[0] || null;
    }),

  // Update preferences
  updatePreferences: publicProcedure
    .input(z.object({
      userId: z.string(),
      emailEnabled: z.boolean().optional(),
      pushEnabled: z.boolean().optional(),
      inAppEnabled: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const existing = await db.select().from(notificationPreferences)
        .where(eq(notificationPreferences.userId, input.userId));
      
      if (existing.length === 0) {
        await db.insert(notificationPreferences).values({
          userId: input.userId,
          emailEnabled: input.emailEnabled ?? true,
          pushEnabled: input.pushEnabled ?? true,
          inAppEnabled: input.inAppEnabled ?? true,
        });
      } else {
        await db.update(notificationPreferences)
          .set(input)
          .where(eq(notificationPreferences.userId, input.userId));
      }
      return { success: true };
    }),
});
