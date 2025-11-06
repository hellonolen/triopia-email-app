import { z } from 'zod';
import { protectedProcedure, router } from '../_core/trpc';
import { getDb } from '../db';
import { userPreferences } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

export const preferencesRouter = router({
  // Get user preferences
  get: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    
    const prefs = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, ctx.user.id))
      .limit(1);

    // Return defaults if no preferences exist
    if (!prefs[0]) {
      return {
        emailNotifications: 1,
        desktopNotifications: 1,
        soundEnabled: 1,
        notifyOnImportant: 1,
        notifyOnMentions: 1,
        theme: 'light' as const,
        emailsPerPage: 50,
        showPreview: 1,
        compactView: 0,
        readReceipts: 0,
        allowTracking: 0,
      };
    }

    return prefs[0];
  }),

  // Update user preferences
  update: protectedProcedure
    .input(z.object({
      emailNotifications: z.number().min(0).max(1).optional(),
      desktopNotifications: z.number().min(0).max(1).optional(),
      soundEnabled: z.number().min(0).max(1).optional(),
      notifyOnImportant: z.number().min(0).max(1).optional(),
      notifyOnMentions: z.number().min(0).max(1).optional(),
      theme: z.enum(['light', 'dark', 'auto']).optional(),
      emailsPerPage: z.number().min(10).max(200).optional(),
      showPreview: z.number().min(0).max(1).optional(),
      compactView: z.number().min(0).max(1).optional(),
      readReceipts: z.number().min(0).max(1).optional(),
      allowTracking: z.number().min(0).max(1).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Check if preferences exist
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const existing = await db
        .select()
        .from(userPreferences)
        .where(eq(userPreferences.userId, ctx.user.id))
        .limit(1);

      if (existing[0]) {
        // Update existing preferences
        await db
          .update(userPreferences)
          .set(input)
          .where(eq(userPreferences.userId, ctx.user.id));
      } else {
        // Create new preferences
        await db.insert(userPreferences).values({
          userId: ctx.user.id,
          ...input,
        });
      }

      return { message: 'Preferences updated successfully' };
    }),
});
