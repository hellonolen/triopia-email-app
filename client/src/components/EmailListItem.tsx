import { useState } from 'react';
import { Star, Archive, Trash2, Pin, Mail, MailOpen, AlertOctagon } from 'lucide-react';
import type { Email } from './EmailApp';
import PriorityBadge from './PriorityBadge';

interface EmailListItemProps {
  email: Email;
  isSelected: boolean;
  onSelect: (email: Email) => void;
  onStarToggle: (emailId: number) => void;
  onArchive?: (emailId: number) => void;
  onDelete?: (emailId: number) => void;
  onPin?: (emailId: number) => void;
  onMarkAsSpam?: (emailId: number) => void;
  onToggleRead?: (emailId: number) => void;
}

export default function EmailListItem({ 
  email, 
  isSelected, 
  onSelect, 
  onStarToggle,
  onArchive,
  onDelete,
  onPin,
  onMarkAsSpam,
  onToggleRead
}: EmailListItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(email));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <li
      draggable
      onDragStart={handleDragStart}
      onClick={() => onSelect(email)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative px-6 py-4 cursor-pointer transition-all duration-200
        hover:bg-muted border-b border-border
        ${isSelected ? 'bg-muted border-l-4 border-primary' : ''}
        ${!email.isRead ? 'bg-card' : ''}
        animate-in fade-in slide-in-from-top-2 duration-300
      `}
    >
      <div className="flex items-start gap-3">
        {/* Avatar and Star */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
            {email.sender.charAt(0).toUpperCase()}
          </div>
          <button
            onClick={(e) => handleAction(e, () => onStarToggle(email.id))}
            className="p-0.5 rounded transition-all duration-200 hover:scale-110"
            title="Star"
          >
            <Star className={`w-3.5 h-3.5 ${email.isStarred ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
          </button>
        </div>

        {/* Email Content */}
        <div className="flex-1 min-w-0">
          {/* Header: Priority, From, Time, Actions */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className={`text-xs truncate ${!email.isRead ? 'font-semibold' : 'font-medium'}`}>
                {email.sender}
              </span>
              <span className="text-[11px] text-muted-foreground flex-shrink-0">
                {email.senderEmail}
              </span>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              <span className="text-[11px] text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span className="text-[11px] text-muted-foreground">{email.timestamp}</span>
            </div>
          </div>

          {/* Subject */}
          <h3 className={`text-sm mb-1 truncate ${!email.isRead ? 'font-semibold' : 'font-medium'}`}>
            {email.subject}
          </h3>

          {/* Preview */}
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {email.preview}
          </p>

          {/* Inline Action Bar (appears on hover) - Icon Only */}
          {isHovered && (
            <div className="flex items-center gap-0.5 pt-2 border-t border-border/50 animate-in fade-in slide-in-from-bottom-1 duration-200">
              <button
                onClick={(e) => handleAction(e, () => onToggleRead?.(email.id))}
                className="p-1.5 rounded-md bg-muted hover:bg-muted transition-all duration-200 hover:scale-110"
                title={email.isRead ? 'Mark as unread' : 'Mark as read'}
              >
                {email.isRead ? <Mail className="w-3.5 h-3.5" /> : <MailOpen className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={(e) => handleAction(e, () => {
                  setIsPinned(!isPinned);
                  onPin?.(email.id);
                })}
                className={`p-1.5 rounded-md transition-all duration-200 hover:scale-110
                         ${isPinned ? 'bg-primary text-primary' : 'bg-muted hover:bg-muted'}`}
                title="Pin"
              >
                <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={(e) => handleAction(e, () => onArchive?.(email.id))}
                className="p-1.5 rounded-md bg-muted hover:bg-muted transition-all duration-200 hover:scale-110"
                title="Archive"
              >
                <Archive className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={(e) => handleAction(e, () => onMarkAsSpam?.(email.id))}
                className="p-1.5 rounded-md bg-muted hover:bg-muted hover:text-destructive transition-all duration-200 hover:scale-110"
                title="Mark as spam"
              >
                <AlertOctagon className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={(e) => handleAction(e, () => onDelete?.(email.id))}
                className="p-1.5 rounded-md bg-muted hover:bg-muted hover:text-destructive transition-all duration-200 hover:scale-110"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Unread Indicator */}
      {!email.isRead && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary rounded-r" />
      )}

      {/* Pin Indicator */}
      {isPinned && (
        <div className="absolute top-2 right-2">
          <Pin className="w-3 h-3 text-primary fill-current" />
        </div>
      )}
    </li>
  );
}
