import { Reply, Forward, Archive, Star, Trash, Check, MoreHorizontal, Paperclip } from 'lucide-react';

export type LegacyEmailListItemProps = {
  subject: string;
  preview: string;
  from: string;
  date: string;
  starred?: boolean;
  unread?: boolean;
  hasAttachment?: boolean;
  onReply?: () => void;
  onForward?: () => void;
  onArchive?: () => void;
  onStar?: () => void;
  onDelete?: () => void;
  onMark?: () => void;
  onMore?: () => void;
  onClick?: () => void;
};

export function LegacyEmailListItem({
  subject,
  preview,
  from,
  date,
  starred = false,
  unread = false,
  hasAttachment = false,
  onReply,
  onForward,
  onArchive,
  onStar,
  onDelete,
  onMark,
  onMore,
  onClick,
}: LegacyEmailListItemProps) {
  return (
    <div
      data-testid="email-row"
      className="border-b border-triopia-cream hover:bg-triopia-cream/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
      {/* Email Header: From, Date, Star */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <div className="flex items-center gap-2">
          <span className={`text-sm ${unread ? 'font-semibold text-triopia-dark' : 'font-normal text-triopia-dark/70'}`}>
            {from}
          </span>
          {hasAttachment && (
            <Paperclip className="w-3 h-3 text-triopia-dark/40" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-triopia-dark/50">{date}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStar?.();
            }}
            data-testid="action-star"
            className="p-0.5 hover:bg-triopia-peach/20 rounded"
          >
            <Star
              className={`w-4 h-4 ${starred ? 'fill-triopia-peach text-triopia-peach' : 'text-triopia-dark/30'}`}
            />
          </button>
        </div>
      </div>

      {/* Subject */}
      <div className="px-4 pb-1">
        <span className={`text-sm ${unread ? 'font-semibold text-triopia-dark' : 'font-normal text-triopia-dark'}`}>
          {subject}
        </span>
      </div>

      {/* Preview */}
      <div className="px-4 pb-2">
        <span className="text-xs text-triopia-dark/50 line-clamp-1">{preview}</span>
      </div>

      {/* 7 Action Icons Row */}
      <div className="flex items-center gap-1 px-4 pb-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReply?.();
          }}
          data-testid="action-reply"
          className="p-1.5 hover:bg-triopia-peach/20 rounded transition-colors"
          title="Reply"
        >
          <Reply className="w-3.5 h-3.5 text-triopia-dark/60" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onForward?.();
          }}
          data-testid="action-forward"
          className="p-1.5 hover:bg-triopia-peach/20 rounded transition-colors"
          title="Forward"
        >
          <Forward className="w-3.5 h-3.5 text-triopia-dark/60" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onArchive?.();
          }}
          data-testid="action-archive"
          className="p-1.5 hover:bg-triopia-peach/20 rounded transition-colors"
          title="Archive"
        >
          <Archive className="w-3.5 h-3.5 text-triopia-dark/60" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          data-testid="action-delete"
          className="p-1.5 hover:bg-triopia-peach/20 rounded transition-colors"
          title="Delete"
        >
          <Trash className="w-3.5 h-3.5 text-triopia-dark/60" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMark?.();
          }}
          data-testid="action-mark"
          className="p-1.5 hover:bg-triopia-peach/20 rounded transition-colors"
          title="Mark as read/unread"
        >
          <Check className="w-3.5 h-3.5 text-triopia-dark/60" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMore?.();
          }}
          data-testid="action-more"
          className="p-1.5 hover:bg-triopia-peach/20 rounded transition-colors"
          title="More actions"
        >
          <MoreHorizontal className="w-3.5 h-3.5 text-triopia-dark/60" />
        </button>
      </div>
    </div>
  );
}
