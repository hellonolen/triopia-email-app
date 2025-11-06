import { useState } from 'react';
import { Archive, Star, MoreVertical, Trash2, Mail, Loader2, Clock, Info, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Email } from './EmailApp';
import ContextSidebar from './ContextSidebar';
import QuickReply from './QuickReply';

interface EmailDetailProps {
  email: Email | null;
  onArchive: (emailId: number) => void;
  onDelete: (emailId: number) => void;
  onStarToggle: (emailId: number) => void;
}

export default function EmailDetail({ email, onArchive, onDelete, onStarToggle }: EmailDetailProps) {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [showQuickReply, setShowQuickReply] = useState(false);

  if (!email) {
    return (
      <div className="flex-1 bg-card flex flex-col items-center justify-center p-12 text-center">
        <Mail className="w-20 h-20 text-muted-foreground/40 mb-6" />
        <h3 className="text-xl font-semibold mb-2">Select an email to read</h3>
        <p className="text-muted-foreground">Choose an email from the list to view its contents</p>
      </div>
    );
  }

  const handleSummarize = () => {
    setIsSummarizing(true);
    setTimeout(() => {
      setIsSummarizing(false);
      setShowSummary(true);
    }, 1500);
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
            <Star className={`w-5 h-5 ${email.isStarred ? 'fill-yellow-400' : 'text-muted-foreground'}`} />
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
            className="p-2 hover:bg-destructive/10 rounded-lg transition-all duration-200 hover:scale-110"
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

          <Button
            onClick={handleSummarize}
            disabled={isSummarizing}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            {isSummarizing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Summarizing...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h10" />
                </svg>
                Summarize
              </>
            )}
          </Button>
        </div>

        <div className="text-sm text-muted-foreground mb-8">{email.date}</div>

        {showSummary && (
          <div className="mb-8 p-6 bg-muted/50 border-l-4 border-primary rounded-lg animate-in fade-in-down duration-500">
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

        {/* Reply Button */}
        {!showQuickReply && (
          <div className="mt-8 pt-6 border-t border-border">
            <Button
              onClick={() => setShowQuickReply(true)}
              className="bg-primary hover:bg-primary/90"
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
