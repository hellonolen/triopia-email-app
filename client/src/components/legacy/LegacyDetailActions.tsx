import { Reply, Forward, Archive, Trash2, Printer, MoreHorizontal } from 'lucide-react';

export type LegacyDetailActionsProps = {
  onReply?: () => void;
  onForward?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  onPrint?: () => void;
  onMore?: () => void;
};

export function LegacyDetailActions({
  onReply,
  onForward,
  onArchive,
  onDelete,
  onPrint,
  onMore,
}: LegacyDetailActionsProps) {
  return (
    <div className="flex items-center gap-1 py-3 border-b border-triopia-cream" data-testid="detail-actions">
      <button
        onClick={onReply}
        data-testid="detail-action-reply"
        className="px-3 py-1.5 hover:bg-triopia-peach/20 rounded transition-colors flex items-center gap-1.5"
        title="Reply"
      >
        <Reply className="w-4 h-4 text-triopia-dark/60" />
        <span className="text-sm text-triopia-dark/70">Reply</span>
      </button>
      <button
        onClick={onForward}
        data-testid="detail-action-forward"
        className="px-3 py-1.5 hover:bg-triopia-peach/20 rounded transition-colors flex items-center gap-1.5"
        title="Forward"
      >
        <Forward className="w-4 h-4 text-triopia-dark/60" />
        <span className="text-sm text-triopia-dark/70">Forward</span>
      </button>
      <button
        onClick={onArchive}
        data-testid="detail-action-archive"
        className="px-3 py-1.5 hover:bg-triopia-peach/20 rounded transition-colors flex items-center gap-1.5"
        title="Archive"
      >
        <Archive className="w-4 h-4 text-triopia-dark/60" />
        <span className="text-sm text-triopia-dark/70">Archive</span>
      </button>
      <button
        onClick={onDelete}
        data-testid="detail-action-delete"
        className="px-3 py-1.5 hover:bg-triopia-peach/20 rounded transition-colors flex items-center gap-1.5"
        title="Delete"
      >
        <Trash2 className="w-4 h-4 text-triopia-dark/60" />
        <span className="text-sm text-triopia-dark/70">Delete</span>
      </button>
      <button
        onClick={onPrint}
        data-testid="detail-action-print"
        className="px-3 py-1.5 hover:bg-triopia-peach/20 rounded transition-colors"
        title="Print"
      >
        <Printer className="w-4 h-4 text-triopia-dark/60" />
      </button>
      <button
        onClick={onMore}
        data-testid="detail-action-more"
        className="px-3 py-1.5 hover:bg-triopia-peach/20 rounded transition-colors"
        title="More actions"
      >
        <MoreHorizontal className="w-4 h-4 text-triopia-dark/60" />
      </button>
    </div>
  );
}
