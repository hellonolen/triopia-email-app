import { google } from "googleapis";

/**
 * Get authenticated Google Calendar client
 */
export function getGoogleCalendarClient(accessToken: string, refreshToken: string) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  return google.calendar({ version: "v3", auth: oauth2Client });
}

/**
 * Fetch calendar events from Google Calendar
 */
export async function fetchGoogleCalendarEvents(
  accessToken: string,
  refreshToken: string,
  timeMin?: Date,
  timeMax?: Date
) {
  const calendar = getGoogleCalendarClient(accessToken, refreshToken);

  const response = await calendar.events.list({
    calendarId: "primary",
    timeMin: timeMin?.toISOString() || new Date().toISOString(),
    timeMax: timeMax?.toISOString(),
    maxResults: 100,
    singleEvents: true,
    orderBy: "startTime",
  });

  return response.data.items || [];
}

/**
 * Create event in Google Calendar
 */
export async function createGoogleCalendarEvent(
  accessToken: string,
  refreshToken: string,
  event: {
    summary: string;
    description?: string;
    start: Date;
    end: Date;
    attendees?: string[];
    location?: string;
  }
) {
  const calendar = getGoogleCalendarClient(accessToken, refreshToken);

  const response = await calendar.events.insert({
    calendarId: "primary",
    requestBody: {
      summary: event.summary,
      description: event.description,
      location: event.location,
      start: {
        dateTime: event.start.toISOString(),
        timeZone: "UTC",
      },
      end: {
        dateTime: event.end.toISOString(),
        timeZone: "UTC",
      },
      attendees: event.attendees?.map(email => ({ email })),
    },
  });

  return response.data;
}

/**
 * Update event in Google Calendar
 */
export async function updateGoogleCalendarEvent(
  accessToken: string,
  refreshToken: string,
  eventId: string,
  updates: {
    summary?: string;
    description?: string;
    start?: Date;
    end?: Date;
    attendees?: string[];
    location?: string;
  }
) {
  const calendar = getGoogleCalendarClient(accessToken, refreshToken);

  const response = await calendar.events.patch({
    calendarId: "primary",
    eventId,
    requestBody: {
      summary: updates.summary,
      description: updates.description,
      location: updates.location,
      start: updates.start ? {
        dateTime: updates.start.toISOString(),
        timeZone: "UTC",
      } : undefined,
      end: updates.end ? {
        dateTime: updates.end.toISOString(),
        timeZone: "UTC",
      } : undefined,
      attendees: updates.attendees?.map(email => ({ email })),
    },
  });

  return response.data;
}

/**
 * Delete event from Google Calendar
 */
export async function deleteGoogleCalendarEvent(
  accessToken: string,
  refreshToken: string,
  eventId: string
) {
  const calendar = getGoogleCalendarClient(accessToken, refreshToken);

  await calendar.events.delete({
    calendarId: "primary",
    eventId,
  });
}
