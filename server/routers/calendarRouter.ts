import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getEmailAccountById } from "../db/emailAccountHelpers";
import {
  fetchGoogleCalendarEvents,
  createGoogleCalendarEvent,
  updateGoogleCalendarEvent,
  deleteGoogleCalendarEvent,
} from "../calendar/googleCalendar";
import {
  fetchOutlookCalendarEvents,
  createOutlookCalendarEvent,
  updateOutlookCalendarEvent,
  deleteOutlookCalendarEvent,
} from "../calendar/outlookCalendar";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = process.env.EMAIL_ENCRYPTION_KEY || "default-encryption-key-change-in-production";

function decryptToken(encryptedToken: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export const calendarRouter = router({
  // Fetch calendar events
  getEvents: protectedProcedure
    .input(z.object({
      accountId: z.number(),
      timeMin: z.date().optional(),
      timeMax: z.date().optional(),
    }))
    .query(async ({ input, ctx }) => {
      const account = await getEmailAccountById(input.accountId);
      
      if (!account || account.userId !== ctx.user.id) {
        throw new Error("Account not found or unauthorized");
      }

      const accessToken = account.accessToken ? decryptToken(account.accessToken) : "";
      const refreshToken = account.refreshToken ? decryptToken(account.refreshToken) : "";

      let events: any[] = [];

      if (account.provider === "gmail") {
        events = await fetchGoogleCalendarEvents(accessToken, refreshToken, input.timeMin, input.timeMax);
      } else if (account.provider === "outlook") {
        events = await fetchOutlookCalendarEvents(accessToken, input.timeMin, input.timeMax);
      } else {
        throw new Error("Calendar not supported for this provider");
      }

      return events;
    }),

  // Create calendar event
  createEvent: protectedProcedure
    .input(z.object({
      accountId: z.number(),
      summary: z.string(),
      description: z.string().optional(),
      start: z.date(),
      end: z.date(),
      attendees: z.array(z.string()).optional(),
      location: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const account = await getEmailAccountById(input.accountId);
      
      if (!account || account.userId !== ctx.user.id) {
        throw new Error("Account not found or unauthorized");
      }

      const accessToken = account.accessToken ? decryptToken(account.accessToken) : "";
      const refreshToken = account.refreshToken ? decryptToken(account.refreshToken) : "";

      let event: any;

      if (account.provider === "gmail") {
        event = await createGoogleCalendarEvent(accessToken, refreshToken, {
          summary: input.summary,
          description: input.description,
          start: input.start,
          end: input.end,
          attendees: input.attendees,
          location: input.location,
        });
      } else if (account.provider === "outlook") {
        event = await createOutlookCalendarEvent(accessToken, {
          subject: input.summary,
          body: input.description,
          start: input.start,
          end: input.end,
          attendees: input.attendees,
          location: input.location,
        });
      } else {
        throw new Error("Calendar not supported for this provider");
      }

      return { success: true, event };
    }),

  // Update calendar event
  updateEvent: protectedProcedure
    .input(z.object({
      accountId: z.number(),
      eventId: z.string(),
      summary: z.string().optional(),
      description: z.string().optional(),
      start: z.date().optional(),
      end: z.date().optional(),
      attendees: z.array(z.string()).optional(),
      location: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const account = await getEmailAccountById(input.accountId);
      
      if (!account || account.userId !== ctx.user.id) {
        throw new Error("Account not found or unauthorized");
      }

      const accessToken = account.accessToken ? decryptToken(account.accessToken) : "";
      const refreshToken = account.refreshToken ? decryptToken(account.refreshToken) : "";

      let event: any;

      if (account.provider === "gmail") {
        event = await updateGoogleCalendarEvent(accessToken, refreshToken, input.eventId, {
          summary: input.summary,
          description: input.description,
          start: input.start,
          end: input.end,
          attendees: input.attendees,
          location: input.location,
        });
      } else if (account.provider === "outlook") {
        event = await updateOutlookCalendarEvent(accessToken, input.eventId, {
          subject: input.summary,
          body: input.description,
          start: input.start,
          end: input.end,
          attendees: input.attendees,
          location: input.location,
        });
      } else {
        throw new Error("Calendar not supported for this provider");
      }

      return { success: true, event };
    }),

  // Delete calendar event
  deleteEvent: protectedProcedure
    .input(z.object({
      accountId: z.number(),
      eventId: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const account = await getEmailAccountById(input.accountId);
      
      if (!account || account.userId !== ctx.user.id) {
        throw new Error("Account not found or unauthorized");
      }

      const accessToken = account.accessToken ? decryptToken(account.accessToken) : "";
      const refreshToken = account.refreshToken ? decryptToken(account.refreshToken) : "";

      if (account.provider === "gmail") {
        await deleteGoogleCalendarEvent(accessToken, refreshToken, input.eventId);
      } else if (account.provider === "outlook") {
        await deleteOutlookCalendarEvent(accessToken, input.eventId);
      } else {
        throw new Error("Calendar not supported for this provider");
      }

      return { success: true };
    }),
});
