import { z } from 'zod';
import { router, publicProcedure } from '../_core/trpc';
import { getDb } from '../db';
import { featureFlags, apiTokens, webhooks } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

export const systemRouter = router({
  // Feature Flags
  listFlags: publicProcedure.query(async () => {
    const db = getDb();
    return await db.select().from(featureFlags);
  }),

  createFlag: publicProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().optional(),
      enabled: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(featureFlags).values(input);
      return { id: Number(result.insertId) };
    }),

  toggleFlag: publicProcedure
    .input(z.object({ id: z.number(), enabled: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(featureFlags)
        .set({ enabled: input.enabled })
        .where(eq(featureFlags.id, input.id));
      return { success: true };
    }),

  // API Tokens
  listTokens: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return await db.select().from(apiTokens).where(eq(apiTokens.userId, input.userId));
    }),

  createToken: publicProcedure
    .input(z.object({
      userId: z.string(),
      name: z.string(),
      scopes: z.array(z.string()).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const token = `tk_${crypto.randomBytes(32).toString('hex')}`;
      const result = await db.insert(apiTokens).values({
        userId: input.userId,
        name: input.name,
        token,
        scopes: input.scopes || [],
      });
      return { id: Number(result.insertId), token };
    }),

  revokeToken: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(apiTokens).where(eq(apiTokens.id, input.id));
      return { success: true };
    }),

  // Webhooks
  listWebhooks: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return await db.select().from(webhooks).where(eq(webhooks.userId, input.userId));
    }),

  createWebhook: publicProcedure
    .input(z.object({
      userId: z.string(),
      url: z.string().url(),
      events: z.array(z.string()),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const secret = `whsec_${crypto.randomBytes(32).toString('hex')}`;
      const result = await db.insert(webhooks).values({
        userId: input.userId,
        url: input.url,
        events: input.events,
        secret,
      });
      return { id: Number(result.insertId), secret };
    }),

  deleteWebhook: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(webhooks).where(eq(webhooks.id, input.id));
      return { success: true };
    }),
});
