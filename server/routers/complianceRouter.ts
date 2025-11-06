import { z } from 'zod';
import { router, publicProcedure } from '../_core/trpc';
import { getDb } from '../db';
import { userConsents } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

export const complianceRouter = router({
  // Record consent
  recordConsent: publicProcedure
    .input(z.object({
      userId: z.string(),
      consentType: z.string(),
      granted: z.boolean(),
      version: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(userConsents).values(input);
      return { id: Number(result.insertId) };
    }),

  // Get user consents
  getConsents: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return await db.select().from(userConsents).where(eq(userConsents.userId, input.userId));
    }),

  // Export user data
  exportData: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      // In production, this would gather all user data from all tables
      return {
        userId: input.userId,
        exportDate: new Date().toISOString(),
        data: {
          // Would include: profile, emails, templates, preferences, etc.
          message: 'User data export - implement full data aggregation in production',
        },
      };
    }),

  // Delete user data
  deleteData: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      // In production, this would delete user data from all tables
      // Following GDPR right to be forgotten
      return {
        success: true,
        message: 'User data deletion request received - implement full data deletion in production',
      };
    }),
});
