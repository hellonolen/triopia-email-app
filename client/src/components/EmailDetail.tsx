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
              This email is a meeting request for a Q4 marketing strategy review. Sarah is asking about availability 
              for October 15th in the afternoon and requests confirmation or alternative time suggestions.
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

        {/* Reply Button */}
        {!showQuickReply && (
          <div className="mt-8 pt-6 border-t border-border">
            <Button
              onClick={() => setShowQuickReply(true)}
              className="bg-primary hover:bg-primary"
            >
              <Reply className="w-4 h-4 mr-2" />
              Reply
            </Button>
          </div>
        )}
      </div>

      {/* Quick Reply Section */}
      {showQuickReply && (
        <QuickReply
          onSend={(message) => {
            console.log('Sending reply:', message);
            setShowQuickReply(false);
          }}
          onClose={() => setShowQuickReply(false)}
        />
      )}
    </div>
    <ContextSidebar email={email} isOpen={isContextOpen} onClose={() => setIsContextOpen(false)} />
    </>
  );
}
