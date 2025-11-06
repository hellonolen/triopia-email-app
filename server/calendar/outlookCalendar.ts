/**
 * Fetch calendar events from Outlook Calendar via Microsoft Graph
 */
export async function fetchOutlookCalendarEvents(
  accessToken: string,
  timeMin?: Date,
  timeMax?: Date
) {
  const startDateTime = timeMin?.toISOString() || new Date().toISOString();
  const endDateTime = timeMax?.toISOString() || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/me/calendarview?startDateTime=${startDateTime}&endDateTime=${endDateTime}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Outlook calendar events: ${response.statusText}`);
  }

  const data = await response.json();
  return data.value || [];
}

/**
 * Create event in Outlook Calendar
 */
export async function createOutlookCalendarEvent(
  accessToken: string,
  event: {
    subject: string;
    body?: string;
    start: Date;
    end: Date;
    attendees?: string[];
    location?: string;
  }
) {
  const response = await fetch("https://graph.microsoft.com/v1.0/me/events", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: event.subject,
      body: {
        contentType: "HTML",
        content: event.body || "",
      },
      start: {
        dateTime: event.start.toISOString(),
        timeZone: "UTC",
      },
      end: {
        dateTime: event.end.toISOString(),
        timeZone: "UTC",
      },
      location: {
        displayName: event.location || "",
      },
      attendees: event.attendees?.map(email => ({
        emailAddress: {
          address: email,
        },
        type: "required",
      })),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create Outlook calendar event: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update event in Outlook Calendar
 */
export async function updateOutlookCalendarEvent(
  accessToken: string,
  eventId: string,
  updates: {
    subject?: string;
    body?: string;
    start?: Date;
    end?: Date;
    attendees?: string[];
    location?: string;
  }
) {
  const response = await fetch(`https://graph.microsoft.com/v1.0/me/events/${eventId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: updates.subject,
      body: updates.body ? {
        contentType: "HTML",
        content: updates.body,
      } : undefined,
      start: updates.start ? {
        dateTime: updates.start.toISOString(),
        timeZone: "UTC",
      } : undefined,
      end: updates.end ? {
        dateTime: updates.end.toISOString(),
        timeZone: "UTC",
      } : undefined,
      location: updates.location ? {
        displayName: updates.location,
      } : undefined,
      attendees: updates.attendees?.map(email => ({
        emailAddress: {
          address: email,
        },
        type: "required",
      })),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update Outlook calendar event: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Delete event from Outlook Calendar
 */
export async function deleteOutlookCalendarEvent(
  accessToken: string,
  eventId: string
) {
  const response = await fetch(`https://graph.microsoft.com/v1.0/me/events/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete Outlook calendar event: ${response.statusText}`);
  }
}
