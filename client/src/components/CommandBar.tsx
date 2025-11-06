import { useState, useEffect, useRef } from 'react';
import { Search, Mail, Star, Send, FileText, Archive, Trash2, Calendar, Users, Settings, BarChart3, Inbox } from 'lucide-react';

interface Command {
  id: string;
  label: string;
  icon: React.ElementType;
  action: () => void;
  keywords?: string[];
}

interface CommandBarProps {
  onClose: () => void;
  onNavigate: (folder: string) => void;
  onAction: (action: string) => void;
}

export default function CommandBar({ onClose, onNavigate, onAction }: CommandBarProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    // Navigation
    { id: 'nav-inbox', label: 'Go to Inbox', icon: Inbox, action: () => onNavigate('inbox'), keywords: ['inbox', 'mail'] },
    { id: 'nav-starred', label: 'Go to Starred', icon: Star, action: () => onNavigate('starred'), keywords: ['starred', 'favorites'] },
    { id: 'nav-sent', label: 'Go to Sent', icon: Send, action: () => onNavigate('sent'), keywords: ['sent'] },
    { id: 'nav-drafts', label: 'Go to Drafts', icon: FileText, action: () => onNavigate('drafts'), keywords: ['drafts'] },
    { id: 'nav-archive', label: 'Go to Archive', icon: Archive, action: () => onNavigate('archive'), keywords: ['archive'] },
    { id: 'nav-trash', label: 'Go to Trash', icon: Trash2, action: () => onNavigate('trash'), keywords: ['trash', 'deleted'] },
    { id: 'nav-calendar', label: 'Go to Calendar', icon: Calendar, action: () => onNavigate('calendar'), keywords: ['calendar', 'events'] },
    { id: 'nav-contacts', label: 'Go to Contacts', icon: Users, action: () => onNavigate('contacts'), keywords: ['contacts', 'people'] },
    { id: 'nav-analytics', label: 'Go to Analytics', icon: BarChart3, action: () => onNavigate('analytics'), keywords: ['analytics', 'stats'] },
    { id: 'nav-settings', label: 'Go to Settings', icon: Settings, action: () => onNavigate('settings'), keywords: ['settings', 'preferences'] },
    
    // Actions
    { id: 'action-compose', label: 'Compose new email', icon: Mail, action: () => onAction('compose'), keywords: ['compose', 'new', 'write'] },
    { id: 'action-archive-all', label: 'Archive all selected', icon: Archive, action: () => onAction('archive-all'), keywords: ['archive', 'bulk'] },
    { id: 'action-mark-read', label: 'Mark all as read', icon: Mail, action: () => onAction('mark-read'), keywords: ['read', 'mark'] },
    { id: 'action-search', label: 'Search emails', icon: Search, action: () => onAction('search'), keywords: ['search', 'find'] },
  ];

  const filteredCommands = query
    ? commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        cmd.keywords?.some(kw => kw.toLowerCase().includes(query.toLowerCase()))
      )
    : commands;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleCommandSelect = (command: Command) => {
    command.action();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-[20vh] z-50 animate-in fade-in duration-200">
      <div className="bg-card rounded-lg shadow-2xl max-w-2xl w-full mx-4 overflow-hidden animate-in zoom-in-95 slide-in-from-top-4 duration-200">
        {/* Search Input */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="w-full pl-11 pr-4 py-3 bg-transparent text-lg focus:outline-none"
            />
          </div>
        </div>

        {/* Commands List */}
        <div className="max-h-[400px] overflow-y-auto">
          {filteredCommands.length > 0 ? (
            <div className="p-2">
              {filteredCommands.map((command) => {
                const Icon = command.icon;
                return (
                  <button
                    key={command.id}
                    onClick={() => handleCommandSelect(command)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-all duration-200 text-left"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-sm">{command.label}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-muted-foreground">No commands found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-muted flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex gap-4">
            <span>
              <kbd className="px-1.5 py-0.5 bg-card border border-border rounded font-mono">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-card border border-border rounded font-mono">Enter</kbd> Select
            </span>
          </div>
          <span>
            <kbd className="px-1.5 py-0.5 bg-card border border-border rounded font-mono">Esc</kbd> Close
          </span>
        </div>
      </div>
    </div>
  );
}
