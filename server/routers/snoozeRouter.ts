import { z } from 'zod';
import { protectedProcedure, router } from '../_core/trpc';
import { getDb } from '../db';
import { snoozedEmails } from '../../drizzle/schema';
import { eq, and, lte } from 'drizzle-orm';

export const snoozeRouter = router({
  // Snooze an email
  snooze: protectedProcedure
    .input(z.object({
      emailId: z.number(),
      snoozeUntil: z.string(), // ISO date string
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      await db.insert(snoozedEmails).values({
        userId: ctx.user.id,
        emailId: input.emailId,
        snoozeUntil: new Date(input.snoozeUntil),
        reminderSent: 0,
      });

      return { message: 'Email snoozed successfully' };
    }),

  // Unsnooze an email
  unsnooze: protectedProcedure
    .input(z.object({
      emailId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      await db
        .delete(snoozedEmails)
        .where(and(
          eq(snoozedEmails.emailId, input.emailId),
          eq(snoozedEmails.userId, ctx.user.id)
        ));

      return { message: 'Email unsnoozed successfully' };
    }),

  // List all snoozed emails for current user
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    
    const snoozed = await db
      .select()
      .from(snoozedEmails)
      .where(eq(snoozedEmails.userId, ctx.user.id));

    return snoozed;
  }),

  // Get emails that need to be unsnoozed (for background worker)
  getDue: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    
    const now = new Date();
    const dueEmails = await db
      .select()
      .from(snoozedEmails)
      .where(and(
        eq(snoozedEmails.userId, ctx.user.id),
        lte(snoozedEmails.snoozeUntil, now),
        eq(snoozedEmails.reminderSent, 0)
      ));

    return dueEmails;
  }),

  // Mark reminder as sent
  markReminderSent: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      await db
        .update(snoozedEmails)
        .set({ reminderSent: 1 })
        .where(and(
          eq(snoozedEmails.id, input.id),
          eq(snoozedEmails.userId, ctx.user.id)
        ));

      return { message: 'Reminder marked as sent' };
    }),
});
