import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Home, Inbox, Star, UserPlus, Pause, CheckCircle2, Send, FilePen,
  Archive, AlertCircle, Trash2, HardDrive, FileText, Calendar, Users,
  BarChart3, Palette, Settings, User, Shield, ChevronDown, ChevronRight,
  Plus, Search
} from 'lucide-react';

export type InboxSource = {
  id: string;
  label: string;
  type: 'email' | 'domain';
  unread: number;
  icon?: React.ReactNode;
};

export type SidebarModel = {
  core: string[];
  inboxes: InboxSource[];
  tools: string[];
  settings: string[];
};

type SidebarNavProps = {
  model: SidebarModel;
  onAddSource?: () => void;
};

const STORAGE_KEY_EXPANDED = 'triopia:sidebar:v1:expanded';
const STORAGE_KEY_LAST = 'triopia:sidebar:v1:last';

const coreIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Fresh Start': Home,
  'Inbox': Inbox,
  'Starred': Star,
  'New Connections': UserPlus,
  'Paused': Pause,
  'Complete': CheckCircle2,
  'Sent': Send,
  'Drafts': FilePen,
  'Archive': Archive,
  'Spam': AlertCircle,
  'Trash': Trash2,
  'Storage': HardDrive,
};

const toolIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Notes': FileText,
  'Calendar': Calendar,
  'Contacts': Users,
};

const settingsIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Analytics': BarChart3,
  'Appearance': Palette,
  'Settings': Settings,
  'Profile': User,
  'Admin': Shield,
};

const childRoutes = ['inbox', 'starred', 'sent', 'drafts', 'archive', 'spam', 'trash', 'storage'];

export function SidebarNav({ model, onAddSource }: SidebarNavProps) {
  const [location] = useLocation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const inboxesRef = useRef<HTMLDivElement>(null);

  // Load expanded state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY_EXPANDED);
    if (stored) {
      try {
        setExpanded(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // Save expanded state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_EXPANDED, JSON.stringify(expanded));
  }, [expanded]);

  // Save last selected source
  const saveLastSource = (sourceId: string) => {
    localStorage.setItem(STORAGE_KEY_LAST, sourceId);
  };

  const toggleExpanded = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredInboxes = model.inboxes.filter(inbox =>
    inbox.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simple virtualization: only render visible items when >20
  const shouldVirtualize = filteredInboxes.length > 20;
  const visibleInboxes = shouldVirtualize ? filteredInboxes.slice(0, 30) : filteredInboxes;

  const renderNavItem = (label: string, icon: React.ComponentType<{ className?: string }>, path: string, testId: string, count?: number) => {
    const Icon = icon;
    const isActive = location === path;

    return (
      <Link
        key={label}
        href={path}
        className={`
          flex items-center justify-between px-3 py-2 rounded-md transition-colors relative
          ${isActive ? 'bg-triopia-peach/10' : 'hover:bg-triopia-cream/50'}
        `}
        data-testid={testId}
      >
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-triopia-peach" />
        )}
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-triopia-dark/60" />
          <span className="text-sm text-triopia-dark">{label}</span>
        </div>
        {count !== undefined && count > 0 && (
          <span className="text-xs text-triopia-peach font-medium">{count}</span>
        )}
      </Link>
    );
  };

  const renderRollup = (source: InboxSource) => {
    const isExpanded = expanded[source.id];
    const sourceId = source.id;

    return (
      <div key={source.id} data-testid={`sidebar-inbox-${source.id}`}>
        {/* Roll-up header */}
        <div
          className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-triopia-cream/50 rounded-md"
          onClick={() => toggleExpanded(source.id)}
          data-testid={`sidebar-toggle-${source.id}`}
        >
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-triopia-dark/40" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-triopia-dark/40" />
            )}
            <span className="text-sm text-triopia-dark">{source.label}</span>
          </div>
          {source.unread > 0 && (
            <span className="text-xs text-triopia-peach font-medium">{source.unread}</span>
          )}
        </div>

        {/* Child routes */}
        {isExpanded && (
          <div className="ml-6 mt-1 space-y-0.5">
            {childRoutes.map((child) => {
              const childPath = `/${child}/${sourceId}`;
              const isActive = location === childPath || location.includes(`sourceId=${sourceId}`);
              const Icon = coreIcons[child.charAt(0).toUpperCase() + child.slice(1)] || Inbox;

              return (
                <Link
                  key={child}
                  href={childPath}
                  onClick={() => saveLastSource(sourceId)}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors
                    ${isActive ? 'bg-triopia-peach/10 text-triopia-dark' : 'text-triopia-dark/70 hover:bg-triopia-cream/50'}
                  `}
                  data-testid={`sidebar-child-${source.id}-${child}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="capitalize">{child}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* CORE Group */}
      <div className="mb-4" data-testid="sidebar-group-core">
        <div className="px-3 mb-2">
          <span className="text-xs uppercase tracking-wide text-muted font-medium">Core</span>
        </div>
        <div className="space-y-0.5">
          {model.core.map((label) => {
            const icon = coreIcons[label] || Inbox;
            const path = `/${label.toLowerCase().replace(/\s+/g, '-')}`;
            return renderNavItem(label, icon, path, `sidebar-link-${label.toLowerCase().replace(/\s+/g, '-')}`);
          })}
        </div>
      </div>

      <div className="border-t border-[var(--border)] my-2" />

      {/* INBOXES Group */}
      <div className="flex-1 overflow-hidden" data-testid="sidebar-group-inboxes">
        <div className="px-3 mb-2">
          <span className="text-xs uppercase tracking-wide text-muted font-medium">Inboxes</span>
        </div>

        {/* Search */}
        {model.inboxes.length > 5 && (
          <div className="px-3 mb-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
              <input
                type="text"
                placeholder="Search inboxes…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-[var(--border)] rounded-md focus:outline-none focus:ring-1 focus:ring-triopia-peach/40"
                data-testid="sidebar-inboxes-search"
              />
            </div>
          </div>
        )}

        {/* Virtualized list */}
        <div ref={inboxesRef} className="overflow-y-auto max-h-96 space-y-0.5 px-3">
          {visibleInboxes.map(renderRollup)}
        </div>

        {/* Add Source CTA */}
        <div className="px-3 mt-2">
          <button
            onClick={onAddSource || (() => window.location.href = '/settings')}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-triopia-dark/70 hover:bg-triopia-peach/10 rounded-md transition-colors"
            data-testid="sidebar-add-source"
          >
            <Plus className="w-4 h-4" />
            <span>Add Inbox or Domain</span>
          </button>
        </div>
      </div>

      <div className="border-t border-[var(--border)] my-2" />

      {/* TOOLS Group */}
      <div className="mb-4" data-testid="sidebar-group-tools">
        <div className="px-3 mb-2">
          <span className="text-xs uppercase tracking-wide text-muted font-medium">Tools</span>
        </div>
        <div className="space-y-0.5">
          {model.tools.map((label) => {
            const icon = toolIcons[label] || FileText;
            const path = `/${label.toLowerCase()}`;
            return renderNavItem(label, icon, path, `sidebar-link-${label.toLowerCase()}`);
          })}
        </div>
      </div>

      <div className="border-t border-[var(--border)] my-2" />

      {/* SETTINGS Group */}
      <div data-testid="sidebar-group-settings">
        <div className="px-3 mb-2">
          <span className="text-xs uppercase tracking-wide text-muted font-medium">Settings</span>
        </div>
        <div className="space-y-0.5">
          {model.settings.map((label) => {
            const icon = settingsIcons[label] || Settings;
            const path = `/${label.toLowerCase()}`;
            return renderNavItem(label, icon, path, `sidebar-link-${label.toLowerCase()}`);
          })}
        </div>
      </div>
    </div>
  );
}
