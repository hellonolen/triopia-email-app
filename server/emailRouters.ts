import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import * as emailDb from "./emailDb";

/**
 * Email Accounts Router
 */
export const emailAccountsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return emailDb.getUserEmailAccounts(ctx.user.id);
  }),

  create: protectedProcedure
    .input(
      z.object({
        provider: z.enum(["gmail", "outlook", "imap"]),
        email: z.string().email(),
        displayName: z.string().optional(),
        accessToken: z.string().optional(),
        refreshToken: z.string().optional(),
        imapHost: z.string().optional(),
        imapPort: z.number().optional(),
        smtpHost: z.string().optional(),
        smtpPort: z.number().optional(),
        imapUsername: z.string().optional(),
        imapPassword: z.string().optional(),
        smtpUsername: z.string().optional(),
        smtpPassword: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const accountId = await emailDb.createEmailAccount({
        userId: ctx.user.id,
        ...input,
      });
      return { accountId };
    }),

  update: protectedProcedure
    .input(
      z.object({
        accountId: z.number(),
        displayName: z.string().optional(),
        isActive: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      await emailDb.updateEmailAccount(input.accountId, {
        displayName: input.displayName,
        isActive: input.isActive,
      });
      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ accountId: z.number() }))
    .mutation(async ({ input }) => {
      await emailDb.deleteEmailAccount(input.accountId);
      return { success: true };
    }),
});

/**
 * Emails Router
 */
export const emailsRouter = router({
  list: protectedProcedure
    .input(
      z.object({
        folder: z.string().optional(),
        limit: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return emailDb.getUserEmails(ctx.user.id, input.folder, input.limit);
    }),

  priority: protectedProcedure.query(async ({ ctx }) => {
    return emailDb.getPriorityEmails(ctx.user.id);
  }),

  get: protectedProcedure
    .input(z.object({ emailId: z.number() }))
    .query(async ({ input }) => {
      return emailDb.getEmailById(input.emailId);
    }),

  search: protectedProcedure
    .input(
      z.object({
        query: z.string(),
        limit: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return emailDb.searchEmails(ctx.user.id, input.query, input.limit);
    }),

  create: protectedProcedure
    .input(
      z.object({
        accountId: z.number(),
        messageId: z.string(),
        threadId: z.string().optional(),
        subject: z.string().optional(),
        from: z.string(),
        fromName: z.string().optional(),
        to: z.string().optional(),
        cc: z.string().optional(),
        bcc: z.string().optional(),
        body: z.string().optional(),
        bodyHtml: z.string().optional(),
        snippet: z.string().optional(),
        hasAttachments: z.number().optional(),
        attachments: z.string().optional(),
        folder: z.string().optional(),
        sentAt: z.date().optional(),
        receivedAt: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const emailId = await emailDb.createEmail({
        userId: ctx.user.id,
        ...input,
      });
      return { emailId };
    }),

  update: protectedProcedure
    .input(
      z.object({
        emailId: z.number(),
        folder: z.string().optional(),
        isRead: z.number().optional(),
        isStarred: z.number().optional(),
        isPinned: z.number().optional(),
        priority: z.enum(["urgent", "high", "normal", "low"]).optional(),
        aiSummary: z.string().optional(),
        aiCategory: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { emailId, ...updates } = input;
      await emailDb.updateEmail(emailId, updates);
      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ emailId: z.number() }))
    .mutation(async ({ input }) => {
      await emailDb.deleteEmail(input.emailId);
      return { success: true };
    }),
});

/**
 * Contacts Router
 */
export const contactsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return emailDb.getUserContacts(ctx.user.id);
  }),

  get: protectedProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      return emailDb.getContactByEmail(ctx.user.id, input.email);
    }),

  create: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().optional(),
        company: z.string().optional(),
        jobTitle: z.string().optional(),
        phone: z.string().optional(),
        notes: z.string().optional(),
        avatar: z.string().optional(),
        tags: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const contactId = await emailDb.createContact({
        userId: ctx.user.id,
        ...input,
      });
      return { contactId };
    }),

  update: protectedProcedure
    .input(
      z.object({
        contactId: z.number(),
        name: z.string().optional(),
        company: z.string().optional(),
        jobTitle: z.string().optional(),
        phone: z.string().optional(),
        notes: z.string().optional(),
        avatar: z.string().optional(),
        tags: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { contactId, ...updates } = input;
      await emailDb.updateContact(contactId, updates);
      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ contactId: z.number() }))
    .mutation(async ({ input }) => {
      await emailDb.deleteContact(input.contactId);
      return { success: true };
    }),
});

/**
 * Calendar Router
 */
export const calendarRouter = router({
  list: protectedProcedure
    .input(
      z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return emailDb.getUserCalendarEvents(ctx.user.id, input.startDate, input.endDate);
    }),

  get: protectedProcedure
    .input(z.object({ eventId: z.number() }))
    .query(async ({ input }) => {
      return emailDb.getCalendarEventById(input.eventId);
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        location: z.string().optional(),
        startTime: z.date(),
        endTime: z.date(),
        attendees: z.string().optional(),
        organizer: z.string().optional(),
        isAllDay: z.number().optional(),
        recurrence: z.string().optional(),
        reminders: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const eventId = await emailDb.createCalendarEvent({
        userId: ctx.user.id,
        ...input,
      });
      return { eventId };
    }),

  update: protectedProcedure
    .input(
      z.object({
        eventId: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        location: z.string().optional(),
        startTime: z.date().optional(),
        endTime: z.date().optional(),
        attendees: z.string().optional(),
        status: z.enum(["confirmed", "tentative", "cancelled"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { eventId, ...updates } = input;
      await emailDb.updateCalendarEvent(eventId, updates);
      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ eventId: z.number() }))
    .mutation(async ({ input }) => {
      await emailDb.deleteCalendarEvent(input.eventId);
      return { success: true };
    }),
});

/**
 * Notes Router
 */
export const notesRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return emailDb.getUserNotes(ctx.user.id);
  }),

  get: protectedProcedure
    .input(z.object({ noteId: z.number() }))
    .query(async ({ input }) => {
      return emailDb.getNoteById(input.noteId);
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        drawingData: z.string().optional(),
        tags: z.string().optional(),
        isShared: z.number().optional(),
        sharedWith: z.string().optional(),
        linkedEventId: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const noteId = await emailDb.createNote({
        userId: ctx.user.id,
        ...input,
      });
      return { noteId };
    }),

  update: protectedProcedure
    .input(
      z.object({
        noteId: z.number(),
        title: z.string().optional(),
        content: z.string().optional(),
        drawingData: z.string().optional(),
        tags: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { noteId, ...updates } = input;
      await emailDb.updateNote(noteId, updates);
      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ noteId: z.number() }))
    .mutation(async ({ input }) => {
      await emailDb.deleteNote(input.noteId);
      return { success: true };
    }),
});
