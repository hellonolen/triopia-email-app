import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import {
  summarizeEmail,
  categorizeEmail,
  prioritizeEmail,
  generateQuickReplies,
  generateEmailDraft,
  extractActionItems,
  detectUrgency,
  getBillionableInsights,
} from "../ai/emailAI";

export const aiRouter = router({
  // Summarize email
  summarizeEmail: protectedProcedure
    .input(z.object({
      subject: z.string(),
      from: z.string(),
      body: z.string(),
    }))
    .mutation(async ({ input }) => {
      const summary = await summarizeEmail(input);
      return { summary };
    }),

  // Categorize email
  categorizeEmail: protectedProcedure
    .input(z.object({
      subject: z.string(),
      from: z.string(),
      body: z.string(),
    }))
    .mutation(async ({ input }) => {
      const category = await categorizeEmail(input);
      return { category };
    }),

  // Prioritize email
  prioritizeEmail: protectedProcedure
    .input(z.object({
      subject: z.string(),
      from: z.string(),
      body: z.string(),
    }))
    .mutation(async ({ input }) => {
      const priority = await prioritizeEmail(input);
      return { priority };
    }),

  // Generate quick replies
  generateQuickReplies: protectedProcedure
    .input(z.object({
      subject: z.string(),
      from: z.string(),
      body: z.string(),
      tone: z.enum(["formal", "casual", "friendly", "professional"]).optional(),
    }))
    .mutation(async ({ input }) => {
      const replies = await generateQuickReplies(input);
      return { replies };
    }),

  // Generate email draft
  generateEmailDraft: protectedProcedure
    .input(z.object({
      context: z.string(),
      tone: z.enum(["formal", "casual", "friendly", "professional"]).optional(),
      length: z.enum(["brief", "medium", "detailed"]).optional(),
    }))
    .mutation(async ({ input }) => {
      const draft = await generateEmailDraft(input);
      return { draft };
    }),

  // Extract action items
  extractActionItems: protectedProcedure
    .input(z.object({
      subject: z.string(),
      body: z.string(),
    }))
    .mutation(async ({ input }) => {
      const actionItems = await extractActionItems(input);
      return { actionItems };
    }),

  // Detect urgency
  detectUrgency: protectedProcedure
    .input(z.object({
      subject: z.string(),
      from: z.string(),
      body: z.string(),
    }))
    .mutation(async ({ input }) => {
      const urgency = await detectUrgency(input);
      return urgency;
    }),

  // Billionable insights
  getBillionableInsights: protectedProcedure
    .input(z.object({
      subject: z.string(),
      from: z.string(),
      body: z.string(),
    }))
    .mutation(async ({ input }) => {
      const insights = await getBillionableInsights(input);
      return insights;
    }),

  // Batch process emails with AI
  batchProcessEmails: protectedProcedure
    .input(z.object({
      emails: z.array(z.object({
        id: z.number(),
        subject: z.string(),
        from: z.string(),
        body: z.string(),
      })),
    }))
    .mutation(async ({ input }) => {
      const results = await Promise.all(
        input.emails.map(async (email) => {
          const [summary, category, priority, urgency] = await Promise.all([
            summarizeEmail(email),
            categorizeEmail(email),
            prioritizeEmail(email),
            detectUrgency(email),
          ]);

          return {
            emailId: email.id,
            summary,
            category,
            priority,
            isUrgent: urgency.isUrgent,
            urgencyReason: urgency.reason,
          };
        })
      );

      return { results };
    }),
});
