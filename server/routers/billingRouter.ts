import { z } from 'zod';
import { router, publicProcedure } from '../_core/trpc';
import { getDb } from '../db';
import { subscriptions, invoices } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

export const billingRouter = router({
  // Get user subscription
  getSubscription: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const subs = await db.select().from(subscriptions).where(eq(subscriptions.userId, input.userId));
      return subs[0] || null;
    }),

  // Create subscription
  createSubscription: publicProcedure
    .input(z.object({
      userId: z.string(),
      planId: z.string(),
      status: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(subscriptions).values({
        userId: input.userId,
        planId: input.planId,
        status: input.status,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });
      return { id: Number(result.insertId) };
    }),

  // Cancel subscription
  cancelSubscription: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(subscriptions)
        .set({ cancelAtPeriodEnd: true })
        .where(eq(subscriptions.userId, input.userId));
      return { success: true };
    }),

  // List invoices
  listInvoices: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return await db.select().from(invoices).where(eq(invoices.userId, input.userId));
    }),

  // Create invoice
  createInvoice: publicProcedure
    .input(z.object({
      userId: z.string(),
      amount: z.number(),
      status: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(invoices).values({
        userId: input.userId,
        amount: input.amount,
        currency: 'USD',
        status: input.status,
      });
      return { id: Number(result.insertId) };
    }),
});
