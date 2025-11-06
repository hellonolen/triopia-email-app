import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { toast } from "sonner";

export default function Calendar() {
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  
  const { data: accounts } = trpc.email.listAccounts.useQuery();
  const { data: events, refetch } = trpc.calendarNew.getEvents.useQuery(
    { 
      accountId: selectedAccount!,
      timeMin: new Date(),
    },
    { enabled: !!selectedAccount }
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Account Sidebar */}
      <div className="w-64 border-r border-border bg-sidebar p-4">
        <h2 className="text-lg font-semibold mb-4">Calendar Accounts</h2>
        
        <div className="space-y-2">
          {accounts?.filter(acc => acc.provider === "gmail" || acc.provider === "outlook").map((account) => (
            <button
              key={account.id}
              onClick={() => setSelectedAccount(account.id)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedAccount === account.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-muted border-border"
              }`}
            >
              <div className="font-medium truncate">{account.email}</div>
              <div className="text-xs text-muted-foreground capitalize">{account.provider}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      <div className="flex-1 flex flex-col">
        {selectedAccount ? (
          <>
            <div className="border-b p-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Calendar</h1>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Event
              </Button>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {events && events.length > 0 ? (
                <div className="space-y-2">
                  {events.map((event: any) => (
                    <div
                      key={event.id}
                      className="p-4 border rounded-lg hover:bg-muted/50"
                    >
                      <div className="font-semibold">{event.summary || event.subject}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {event.start?.dateTime && formatDate(event.start.dateTime)}
                        {event.end?.dateTime && ` - ${formatDate(event.end.dateTime)}`}
                      </div>
                      {event.location?.displayName && (
                        <div className="text-sm text-muted-foreground mt-1">
                          📍 {event.location.displayName}
                        </div>
                      )}
                      {event.attendees && event.attendees.length > 0 && (
                        <div className="text-sm text-muted-foreground mt-1">
                          👥 {event.attendees.length} attendees
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <CalendarIcon className="w-16 h-16 mb-4" />
                  <p>No upcoming events</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <CalendarIcon className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">Select an account to view calendar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
