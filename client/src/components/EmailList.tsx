import { useState } from 'react';
import { Search, Filter, RefreshCw, Star, Mail } from 'lucide-react';
import type { Email } from './EmailApp';

interface EmailListProps {
  emails: Email[];
  selectedEmail: Email | null;
  onEmailSelect: (email: Email) => void;
  onStarToggle: (emailId: number) => void;
}

export default function EmailList({ emails, selectedEmail, onEmailSelect, onStarToggle }: EmailListProps) {
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
          <h2 className="text-xl font-semibold">Inbox</h2>
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
          <ul className="divide-y divide-border">
            {filteredEmails.map((email) => (
              <li
                key={email.id}
                onClick={() => onEmailSelect(email)}
                className={`
                  relative px-6 py-5 cursor-pointer transition-all duration-200
                  hover:bg-muted/50
                  ${selectedEmail?.id === email.id ? 'bg-muted border-l-4 border-primary' : ''}
                  ${!email.isRead ? 'bg-card' : ''}
                  animate-in fade-in slide-in-from-top-2 duration-300
                `}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded border-2 border-muted-foreground/30 
                             hover:border-primary transition-colors duration-200
                             opacity-0 hover:opacity-100 focus:opacity-100"
                    onClick={(e) => e.stopPropagation()}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${!email.isRead ? 'font-semibold' : 'font-medium'}`}>
                        {email.sender}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{email.timestamp}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onStarToggle(email.id);
                          }}
                          className={`
                            p-1 transition-all duration-200
                            ${email.isStarred ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                            hover:scale-125
                          `}
                        >
                          <Star 
                            className={`w-4 h-4 ${email.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                          />
                        </button>
                      </div>
                    </div>

                    <h3 className={`text-sm mb-1 ${!email.isRead ? 'font-semibold' : 'font-medium'}`}>
                      {email.subject}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {email.preview}
                    </p>
                  </div>
                </div>

                {!email.isRead && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-primary rounded-r" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
