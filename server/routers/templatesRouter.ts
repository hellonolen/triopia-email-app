import { z } from 'zod';
import { protectedProcedure, router } from '../_core/trpc';
import { getDb } from '../db';
import { emailTemplates } from '../../drizzle/schema';
import { eq, and } from 'drizzle-orm';

export const templatesRouter = router({
  // List all templates for current user
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');
    
    const templates = await db
      .select()
      .from(emailTemplates)
      .where(eq(emailTemplates.userId, ctx.user.id));
    
    return templates;
  }),

  // Create new template
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1).max(255),
      subject: z.string().max(500).optional(),
      body: z.string().min(1),
      category: z.string().max(100).optional(),
      isDefault: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const result = await db.insert(emailTemplates).values({
        userId: ctx.user.id,
        name: input.name,
        subject: input.subject || '',
        body: input.body,
        category: input.category || 'general',
        isDefault: input.isDefault ? 1 : 0,
        usageCount: 0,
      });

      return { id: Number(result.insertId), message: 'Template created successfully' };
    }),

  // Update template
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().min(1).max(255).optional(),
      subject: z.string().max(500).optional(),
      body: z.string().min(1).optional(),
      category: z.string().max(100).optional(),
      isDefault: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;

      const updateData: any = {};
      if (updates.name) updateData.name = updates.name;
      if (updates.subject !== undefined) updateData.subject = updates.subject;
      if (updates.body) updateData.body = updates.body;
      if (updates.category) updateData.category = updates.category;
      if (updates.isDefault !== undefined) updateData.isDefault = updates.isDefault ? 1 : 0;

      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      await db
        .update(emailTemplates)
        .set(updateData)
        .where(and(
          eq(emailTemplates.id, id),
          eq(emailTemplates.userId, ctx.user.id)
        ));

      return { message: 'Template updated successfully' };
    }),

  // Delete template
  delete: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      await db
        .delete(emailTemplates)
        .where(and(
          eq(emailTemplates.id, input.id),
          eq(emailTemplates.userId, ctx.user.id)
        ));

      return { message: 'Template deleted successfully' };
    }),

  // Increment usage count
  incrementUsage: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const template = await db
        .select()
        .from(emailTemplates)
        .where(and(
          eq(emailTemplates.id, input.id),
          eq(emailTemplates.userId, ctx.user.id)
        ))
        .limit(1);

      if (template[0]) {
        await db
          .update(emailTemplates)
          .set({ usageCount: (template[0].usageCount || 0) + 1 })
          .where(eq(emailTemplates.id, input.id));
      }

      return { message: 'Usage count updated' };
    }),
});
