import { useState } from 'react';
import { Send, ThumbsUp, Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickReplyProps {
  onSend: (message: string) => void;
  onClose: () => void;
}

export default function QuickReply({ onSend, onClose }: QuickReplyProps) {
  const [selectedTone, setSelectedTone] = useState<'professional' | 'friendly' | 'brief'>('professional');
  const [customMessage, setCustomMessage] = useState('');

  const suggestedReplies = {
    professional: [
      "Thank you for reaching out. I'll review this and get back to you by end of day.",
      "I appreciate you sharing this information. Let's schedule a meeting to discuss further.",
      "I've received your email and will respond with detailed feedback shortly.",
    ],
    friendly: [
      "Thanks for the update! This looks great. Let me know if you need anything else.",
      "Sounds good! I'm available for a quick chat whenever works for you.",
      "Appreciate you keeping me in the loop. Looking forward to connecting soon!",
    ],
    brief: [
      "Acknowledged. Will follow up soon.",
      "Thanks. Reviewing now.",
      "Got it. Let's discuss.",
    ],
  };

  const quickActions = [
    { icon: ThumbsUp, label: 'Looks good!', message: 'This looks great. Approved!' },
    { icon: Calendar, label: 'Schedule meeting', message: "Let's schedule a meeting to discuss this further. When works for you?" },
    { icon: Send, label: 'Will review', message: "I'll review this and get back to you shortly." },
  ];

  return (
    <div className="border-t border-border bg-card p-6 space-y-4 animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Quick Reply</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted rounded transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tone Selector */}
      <div className="flex gap-2">
        {(['professional', 'friendly', 'brief'] as const).map((tone) => (
          <button
            key={tone}
            onClick={() => setSelectedTone(tone)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${selectedTone === tone
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted hover:bg-muted/80'
              }
            `}
          >
            {tone.charAt(0).toUpperCase() + tone.slice(1)}
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => onSend(action.message)}
              className="flex flex-col items-center gap-2 p-3 bg-muted/50 hover:bg-muted rounded-lg transition-all duration-200 hover:scale-105"
            >
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium text-center">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Suggested Replies */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Suggested replies:</p>
        {suggestedReplies[selectedTone].map((reply, index) => (
          <button
            key={index}
            onClick={() => setCustomMessage(reply)}
            className="w-full p-3 text-left bg-muted/30 hover:bg-muted rounded-lg text-sm transition-all duration-200 hover:scale-[1.02]"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Custom Message */}
      <div className="space-y-2">
        <textarea
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Or write your own reply..."
          className="w-full p-3 bg-muted/50 border border-border rounded-lg text-sm resize-none
                   focus:bg-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                   transition-all duration-200"
          rows={3}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (customMessage.trim()) {
                onSend(customMessage);
                setCustomMessage('');
              }
            }}
            disabled={!customMessage.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Reply
          </Button>
        </div>
      </div>
    </div>
  );
}
