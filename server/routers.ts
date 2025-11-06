import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import {
  calendarRouter,
  contactsRouter,
  emailAccountsRouter,
  emailsRouter,
  notesRouter,
} from "./emailRouters";
import { emailRouter } from "./routers/emailRouter";
import { aiRouter } from "./routers/aiRouter";
import { calendarRouter as calendarRouterNew } from "./routers/calendarRouter";
import { templatesRouter } from "./routers/templatesRouter";
import { preferencesRouter } from "./routers/preferencesRouter";
import { snoozeRouter } from "./routers/snoozeRouter";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Email platform routers
  email: emailRouter,
  ai: aiRouter,
  calendarNew: calendarRouterNew,
  emailAccounts: emailAccountsRouter,
  emails: emailsRouter,
  contacts: contactsRouter,
  calendar: calendarRouter,
  notes: notesRouter,
  templates: templatesRouter,
  preferences: preferencesRouter,
  snooze: snoozeRouter,
});

export type AppRouter = typeof appRouter;
