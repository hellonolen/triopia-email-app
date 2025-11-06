import { z } from 'zod';
import { router, publicProcedure } from '../_core/trpc';
import { getDb } from '../db';
import { activityLog } from '../../drizzle/schema';
import { eq, desc } from 'drizzle-orm';

export const activityRouter = router({
  // List activity
  list: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return await db.select().from(activityLog)
        .where(eq(activityLog.userId, input.userId))
        .orderBy(desc(activityLog.createdAt))
        .limit(100);
    }),

  // Log activity
  log: publicProcedure
    .input(z.object({
      userId: z.string(),
      action: z.string(),
      resource: z.string().optional(),
      resourceId: z.string().optional(),
      metadata: z.record(z.any()).optional(),
      ipAddress: z.string().optional(),
      userAgent: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(activityLog).values(input);
      return { id: Number(result.insertId) };
    }),
});
