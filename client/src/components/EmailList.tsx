import { useState } from 'react';
import { Search, Filter, RefreshCw, Mail } from 'lucide-react';
import type { Email } from './EmailApp';
import EmailListItem from './EmailListItem';

interface EmailListProps {
  emails: Email[];
  selectedEmail: Email | null;
  folderName?: string;
  onEmailSelect: (email: Email) => void;
  onStarToggle: (emailId: number) => void;
  onArchive?: (emailId: number) => void;
  onDelete?: (emailId: number) => void;
  onPin?: (emailId: number) => void;
  onMarkAsSpam?: (emailId: number) => void;
  onToggleRead?: (emailId: number) => void;
}

export default function EmailList({ 
  emails, 
  selectedEmail,
  folderName = 'inbox',
  onEmailSelect, 
  onStarToggle,
  onArchive,
  onDelete,
  onPin,
  onMarkAsSpam,
  onToggleRead
}: EmailListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmails = emails.filter(email =>
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[420px] bg-card border-r border-border flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-transparent rounded-lg text-sm
                     focus:bg-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                     transition-all duration-200"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-muted rounded-md transition-all duration-200 hover:scale-105">
            <Filter className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold capitalize">{folderName}</h2>
          <button className="p-2 hover:bg-muted rounded-lg transition-all duration-200 hover:rotate-90">
            <RefreshCw className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredEmails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Mail className="w-16 h-16 text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground">No emails found</p>
          </div>
        ) : (
          <ul>
            {filteredEmails.map((email) => (
              <EmailListItem
                key={email.id}
                email={email}
                isSelected={selectedEmail?.id === email.id}
                onSelect={onEmailSelect}
                onStarToggle={onStarToggle}
                onArchive={onArchive}
                onDelete={onDelete}
                onPin={onPin}
                onMarkAsSpam={onMarkAsSpam}
                onToggleRead={onToggleRead}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
