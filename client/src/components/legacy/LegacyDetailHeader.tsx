import { Star, Paperclip } from 'lucide-react';

export type LegacyDetailHeaderProps = {
  subject: string;
  from: string;
  email: string;
  date: string;
  starred?: boolean;
  hasAttachment?: boolean;
  onStar?: () => void;
};

export function LegacyDetailHeader({
  subject,
  from,
  email,
  date,
  starred = false,
  hasAttachment = false,
  onStar,
}: LegacyDetailHeaderProps) {
  return (
    <div className="border-b border-triopia-cream pb-4" data-testid="detail-header">
      {/* Subject - Large Typography */}
      <div className="flex items-start justify-between mb-3">
        <h1 className="text-2xl font-light text-triopia-dark leading-tight flex-1">
          {subject}
        </h1>
        <button
          onClick={onStar}
          data-testid="detail-star"
          className="p-1 hover:bg-triopia-peach/20 rounded ml-2"
        >
          <Star
            className={`w-5 h-5 ${starred ? 'fill-triopia-peach text-triopia-peach' : 'text-triopia-dark/30'}`}
          />
        </button>
      </div>

      {/* Sender Info */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal text-triopia-dark">{from}</span>
            {hasAttachment && (
              <Paperclip className="w-3.5 h-3.5 text-triopia-dark/40" />
            )}
          </div>
          <span className="text-xs text-triopia-dark/50">{email}</span>
        </div>
        <span className="text-xs text-triopia-dark/50">{date}</span>
      </div>
    </div>
  );
}
