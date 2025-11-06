import { z } from 'zod';
import { router, publicProcedure } from '../_core/trpc';
import { getDb } from '../db';
import { tickets, feedback } from '../../drizzle/schema';
import { eq, desc } from 'drizzle-orm';

export const supportRouter = router({
  // List tickets
  listTickets: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return await db.select().from(tickets)
        .where(eq(tickets.userId, input.userId))
        .orderBy(desc(tickets.createdAt));
    }),

  // Create ticket
  createTicket: publicProcedure
    .input(z.object({
      userId: z.string(),
      subject: z.string(),
      description: z.string(),
      priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(tickets).values({
        userId: input.userId,
        subject: input.subject,
        description: input.description,
        priority: input.priority || 'medium',
        status: 'open',
      });
      return { id: Number(result.insertId) };
    }),

  // Update ticket status
  updateTicketStatus: publicProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(['open', 'in_progress', 'resolved', 'closed']),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(tickets)
        .set({ status: input.status })
        .where(eq(tickets.id, input.id));
      return { success: true };
    }),

  // Submit feedback
  submitFeedback: publicProcedure
    .input(z.object({
      userId: z.string().optional(),
      type: z.enum(['bug', 'feature', 'improvement']),
      message: z.string(),
      rating: z.number().min(1).max(5).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(feedback).values(input);
      return { id: Number(result.insertId) };
    }),

  // List feedback
  listFeedback: publicProcedure
    .query(async () => {
      const db = getDb();
      return await db.select().from(feedback).orderBy(desc(feedback.createdAt));
    }),
});
