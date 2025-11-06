import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, HelpCircle, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface CalendarInviteActionsProps {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  organizer: string;
  onRespond: (response: 'accepted' | 'declined' | 'maybe') => void;
}

export default function CalendarInviteActions({
  eventTitle,
  eventDate,
  eventTime,
  organizer,
  onRespond
}: CalendarInviteActionsProps) {
  const [response, setResponse] = useState<'accepted' | 'declined' | 'maybe' | null>(null);

  const handleResponse = (responseType: 'accepted' | 'declined' | 'maybe') => {
    setResponse(responseType);
    onRespond(responseType);
    
    const messages = {
      accepted: `Event accepted and added to your calendar`,
      declined: `Event declined. ${organizer} will be notified.`,
      maybe: `Marked as "Maybe". ${organizer} will be notified.`
    };
    
    toast.success(messages[responseType], {
      description: `${eventTitle} on ${eventDate} at ${eventTime}`
    });
  };

  if (response) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 my-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${
            response === 'accepted' ? 'bg-green-100' :
            response === 'declined' ? 'bg-red-100' :
            'bg-yellow-100'
          }`}>
            {response === 'accepted' && <Check className="w-5 h-5 text-green-600" />}
            {response === 'declined' && <X className="w-5 h-5 text-red-600" />}
            {response === 'maybe' && <HelpCircle className="w-5 h-5 text-yellow-600" />}
          </div>
          <div>
            <p className="font-medium">
              {response === 'accepted' && 'You accepted this event'}
              {response === 'declined' && 'You declined this event'}
              {response === 'maybe' && 'You marked this as "Maybe"'}
            </p>
            <p className="text-sm text-muted-foreground">
              {organizer} has been notified of your response
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-primary/20 rounded-lg p-4 my-4">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-1">Calendar Invite</h4>
          <p className="text-sm text-muted-foreground mb-1">
            <strong>{eventTitle}</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            {eventDate} at {eventTime}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            From: {organizer}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => handleResponse('accepted')}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          size="sm"
        >
          <Check className="w-4 h-4 mr-2" />
          Accept
        </Button>
        <Button
          onClick={() => handleResponse('maybe')}
          variant="outline"
          className="flex-1"
          size="sm"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Maybe
        </Button>
        <Button
          onClick={() => handleResponse('declined')}
          variant="outline"
          className="flex-1 hover:bg-red-50"
          size="sm"
        >
          <X className="w-4 h-4 mr-2" />
          Decline
        </Button>
      </div>
    </div>
  );
}
