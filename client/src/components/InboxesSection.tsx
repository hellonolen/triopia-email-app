import { useState } from 'react';
import { ChevronDown, ChevronRight, Mail } from 'lucide-react';

interface EmailAccount {
  id: string;
  name: string;
  email: string;
  unreadCount: number;
  provider: 'gmail' | 'outlook' | 'imap' | 'custom';
}

interface InboxesSectionProps {
  accounts: EmailAccount[];
  selectedInbox: string | null;
  onSelectInbox: (accountId: string) => void;
}

export default function InboxesSection({ accounts, selectedInbox, onSelectInbox }: InboxesSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const totalUnread = accounts.reduce((sum, account) => sum + account.unreadCount, 0);

  return (
    <div className="space-y-1">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform duration-200" />
          )}
          <Mail className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium">Inboxes</span>
        </div>
        {totalUnread > 0 && (
          <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full min-w-[24px] text-center">
            {totalUnread}
          </span>
        )}
      </button>

      {/* Expanded Accounts List */}
      {isExpanded && (
        <div className="ml-4 space-y-0.5 animate-in slide-in-from-top-2 fade-in duration-200">
          {accounts.map((account) => {
            const isActive = selectedInbox === account.id;
            return (
              <button
                key={account.id}
                onClick={() => onSelectInbox(account.id)}
                className={`
                  w-full flex items-center justify-between px-3 py-1.5 rounded-lg
                  transition-all duration-200 text-left
                  ${isActive 
                    ? 'bg-muted font-medium' 
                    : 'hover:bg-muted'
                  }
                `}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{account.name}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{account.email}</div>
                </div>
                {account.unreadCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-[10px] font-medium px-1.5 py-0.5 rounded-full ml-2">
                    {account.unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
