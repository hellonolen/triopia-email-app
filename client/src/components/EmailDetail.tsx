import { useState } from 'react';
import { Archive, Star, MoreVertical, Trash2, Mail, Loader2, Clock, Info, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Email } from './EmailApp';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import ContextSidebar from './ContextSidebar';
import QuickReply from './QuickReply';
import CalendarInviteActions from './CalendarInviteActions';

interface EmailDetailProps {
  email: Email | null;
  onArchive: (emailId: number) => void;
  onDelete: (emailId: number) => void;
  onStarToggle: (emailId: number) => void;
}

export default function EmailDetail({ email, onArchive, onDelete, onStarToggle }: EmailDetailProps) {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState('');
  const [quickReplyText, setQuickReplyText] = useState('');
  
  // AI mutations
  const summarizeMutation = trpc.ai.summarizeEmail.useMutation();
  const quickReplyMutation = trpc.ai.generateQuickReply.useMutation();
  const categorizeMutation = trpc.ai.categorizeEmail.useMutation();
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [showQuickReply, setShowQuickReply] = useState(false);

  // Detect if email is a calendar invite
  const isCalendarInvite = email?.subject.toLowerCase().includes('meeting') || 
                           email?.subject.toLowerCase().includes('event') ||
                           email?.subject.toLowerCase().includes('invite') ||
                           email?.body.toLowerCase().includes('calendar invite');

  const handleCalendarResponse = (response: 'accepted' | 'declined' | 'maybe') => {
    console.log('Calendar invite response:', response, email);
    // In a real app, this would update the calendar and notify the organizer
  };

  if (!email) {
    return (
      <div className="flex-1 bg-card flex flex-col items-center justify-center p-12 text-center">
        <Mail className="w-20 h-20 text-muted-foreground/40 mb-6" />
        <h3 className="text-xl font-semibold mb-2">Select an email to read</h3>
        <p className="text-muted-foreground">Choose an email from the list to view its contents</p>
      </div>
    );
  }

  const handleSummarize = async () => {
    if (!email) return;
    setIsSummarizing(true);
    try {
      const result = await summarizeMutation.mutateAsync({
        emailId: email.id,
        style: 'executive'
      });
      setSummary(result.summary);
      setShowSummary(true);
      toast.success('Email summarized');
    } catch (error) {
      toast.error('Failed to summarize email');
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleQuickReply = async (tone: 'professional' | 'casual' | 'formal') => {
    if (!email) return;
    try {
      const result = await quickReplyMutation.mutateAsync({
        emailId: email.id,
        tone,
        context: ''
      });
      setQuickReplyText(result.reply);
      setShowQuickReply(true);
      toast.success('Quick reply generated');
    } catch (error) {
      toast.error('Failed to generate reply');
    }
  };

  const handleCategorize = async () => {
    if (!email) return;
    try {
      const result = await categorizeMutation.mutateAsync({
        emailId: email.id
      });
      toast.success(`Categorized as: ${result.category}`);
    } catch (error) {
      toast.error('Failed to categorize email');
    }
  };

  return (
    <>
    <div className="flex-1 bg-card flex flex-col h-full animate-in fade-in duration-500 relative">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{email.subject}</h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onArchive(email.id)}
            className="p-2 hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110"
            title="Archive"
          >
            <Archive className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => onStarToggle(email.id)}
            className={`p-2 hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110 ${email.isStarred ? 'text-yellow-400' : ''}`}
            title="Star"
          >
            <Star className={`w-5 h-5 ${email.isStarred ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
          </button>

          <button
            onClick={() => setShowSnoozeModal(true)}
            className="p-2 hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110"
            title="Snooze"
          >
            <AlarmClock className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            className="p-2 hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110"
            title="More"
          >

            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => setIsContextOpen(!isContextOpen)}
            className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
              isContextOpen ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
            title="Show context"
          >
            <Info className="w-5 h-5" />
          </button>

          <button
            onClick={() => onDelete(email.id)}
            className="p-2 hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110"
            title="Delete"
          >
            <Trash2 className="w-5 h-5 text-destructive" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-semibold text-lg">
              {email.sender.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold">{email.sender}</div>
              <div className="text-sm text-muted-foreground">{email.senderEmail}</div>
            </div>
          </div>

          <button
            onClick={handleSummarize}
            disabled={isSummarizing}
            className="p-2 hover:bg-primary rounded-lg transition-all duration-200 hover:scale-110"
            title="Summarize email"
          >
            {isSummarizing ? (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            ) : (
              <Mail className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>

        <div className="text-sm text-muted-foreground mb-8">{email.date}</div>

        {showSummary && (
          <div className="mb-8 p-6 bg-muted border-l-4 border-primary rounded-lg animate-in fade-in-down duration-500">
            <div className="flex items-center gap-2 mb-3 text-primary font-semibold text-sm uppercase tracking-wide">
              <Clock className="w-4 h-4" />
              Summary
            </div>
            <p className="text-sm leading-relaxed">
              {summary || 'Generating summary...'}
            </p>
          </div>
        )}

        <div className="prose prose-sm max-w-none">
          {email.body.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Calendar Invite Actions */}
        {isCalendarInvite && (
          <CalendarInviteActions
            eventTitle={email.subject}
            eventDate="October 15, 2024"
            eventTime="2:00 PM"
            organizer={email.senderEmail}
            onRespond={handleCalendarResponse}
          />
        )}

        {/* Reply Buttons with AI Options */}
        {!showQuickReply && (
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex gap-2">
              <Button
                onClick={() => setShowQuickReply(true)}
                className="bg-primary hover:bg-primary"
              >
                <Reply className="w-4 h-4 mr-2" />
                Reply
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickReply('professional')}
              >
                AI Reply (Professional)
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickReply('casual')}
              >
                AI Reply (Casual)
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Reply Section */}
      {showQuickReply && (
        <QuickReply
          initialMessage={quickReplyText}
          onSend={(message) => {
            console.log('Sending reply:', message);
            setShowQuickReply(false);
            setQuickReplyText('');
          }}
          onClose={() => {
            setShowQuickReply(false);
            setQuickReplyText('');
          }}
        />
      )}
    </div>
    <ContextSidebar email={email} isOpen={isContextOpen} onClose={() => setIsContextOpen(false)} />
    
    {/* Snooze Modal */}
    {showSnoozeModal && (
      <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
        <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Snooze Email</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Choose when you want this email to reappear in your inbox
          </p>
          
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                const date = new Date();
                date.setHours(date.getHours() + 3);
                setSnoozeDate(date.toISOString());
              }}
            >
              <Clock className="w-4 h-4 mr-2" />
              Later today (3 hours)
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                const date = new Date();
                date.setDate(date.getDate() + 1);
                date.setHours(9, 0, 0, 0);
                setSnoozeDate(date.toISOString());
              }}
            >
              <Clock className="w-4 h-4 mr-2" />
              Tomorrow morning (9 AM)
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                const date = new Date();
                date.setDate(date.getDate() + 2);
                date.setHours(9, 0, 0, 0);
                setSnoozeDate(date.toISOString());
              }}
            >
              <Clock className="w-4 h-4 mr-2" />
              In 2 days
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                const date = new Date();
                const dayOfWeek = date.getDay();
                const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
                date.setDate(date.getDate() + daysUntilMonday);
                date.setHours(9, 0, 0, 0);
                setSnoozeDate(date.toISOString());
              }}
            >
              <Clock className="w-4 h-4 mr-2" />
              Next Monday
            </Button>
            
            <div>
              <label className="block text-sm font-medium mb-2">Custom date & time</label>
              <input
                type="datetime-local"
                value={snoozeDate ? new Date(snoozeDate).toISOString().slice(0, 16) : ''}
                onChange={(e) => setSnoozeDate(new Date(e.target.value).toISOString())}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowSnoozeModal(false);
                setSnoozeDate('');
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!snoozeDate) {
                  toast.error('Please select a date and time');
                  return;
                }
                try {
                  await snoozeMutation.mutateAsync({
                    emailId: email.id,
                    snoozeUntil: snoozeDate
                  });
                  toast.success('Email snoozed');
                  setShowSnoozeModal(false);
                  setSnoozeDate('');
                  onArchive(email.id); // Archive the email from current view
                } catch (error) {
                  toast.error('Failed to snooze email');
                }
              }}
              className="flex-1"
            >
              Snooze
            </Button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
