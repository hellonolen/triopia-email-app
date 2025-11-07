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
const STORAGE_KEY_INBOXES_COLLAPSED = 'triopia:sidebar:v1:inboxes-collapsed';
const STORAGE_KEY_TOOLS_COLLAPSED = 'triopia:sidebar:v1:tools-collapsed';
const STORAGE_KEY_SETTINGS_COLLAPSED = 'triopia:sidebar:v1:settings-collapsed';

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
  const [inboxesCollapsed, setInboxesCollapsed] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY_INBOXES_COLLAPSED);
    return stored ? JSON.parse(stored) : true; // Collapsed by default
  });
  const [toolsCollapsed, setToolsCollapsed] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY_TOOLS_COLLAPSED);
    return stored ? JSON.parse(stored) : false; // Expanded by default
  });
  const [settingsCollapsed, setSettingsCollapsed] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY_SETTINGS_COLLAPSED);
    return stored ? JSON.parse(stored) : false; // Expanded by default
  });
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

  // Save group collapse states to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_INBOXES_COLLAPSED, JSON.stringify(inboxesCollapsed));
  }, [inboxesCollapsed]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TOOLS_COLLAPSED, JSON.stringify(toolsCollapsed));
  }, [toolsCollapsed]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SETTINGS_COLLAPSED, JSON.stringify(settingsCollapsed));
  }, [settingsCollapsed]);

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

  // Calculate total unread count across all inboxes
  const totalUnread = model.inboxes.reduce((sum, inbox) => sum + inbox.unread, 0);

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
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 8px',
          fontSize: '11px',
          fontWeight: 300,
          color: isActive ? '#D89880' : '#999',
          background: isActive ? '#FFFBF7' : 'transparent',
          borderRadius: '3px',
          textDecoration: 'none',
          transition: 'all 0.15s',
          position: 'relative'
        }}
        data-testid={testId}
        onMouseEnter={(e) => {
          if (!isActive) e.currentTarget.style.background = '#FAFAFA';
        }}
        onMouseLeave={(e) => {
          if (!isActive) e.currentTarget.style.background = 'transparent';
        }}
      >
        {isActive && (
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '2px',
            background: '#D89880'
          }} />
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingLeft: isActive ? '6px' : '0' }}>
          <Icon style={{ width: '14px', height: '14px', strokeWidth: 1.5, opacity: 0.6 }} />
          <span>{label}</span>
        </div>
        {count !== undefined && count > 0 && (
          <span style={{ fontSize: '10px', color: '#D89880', fontWeight: 400 }}>{count}</span>
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
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 8px',
            fontSize: '11px',
            fontWeight: 300,
            color: '#000',
            cursor: 'pointer',
            borderRadius: '3px',
            transition: 'background 0.15s'
          }}
          onClick={() => toggleExpanded(source.id)}
          data-testid={`sidebar-toggle-${source.id}`}
          onMouseEnter={(e) => e.currentTarget.style.background = '#FAFAFA'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {isExpanded ? (
              <ChevronDown style={{ width: '12px', height: '12px', opacity: 0.4, strokeWidth: 1.5 }} />
            ) : (
              <ChevronRight style={{ width: '12px', height: '12px', opacity: 0.4, strokeWidth: 1.5 }} />
            )}
            <span>{source.label}</span>
          </div>
          {source.unread > 0 && (
            <span style={{ fontSize: '10px', color: '#D89880', fontWeight: 400 }}>{source.unread}</span>
          )}
        </div>

        {/* Child routes */}
        {isExpanded && (
          <div style={{ marginLeft: '18px', marginTop: '2px' }}>
            {childRoutes.map((child) => {
              const childPath = `/${child}/${sourceId}`;
              const isActive = location === childPath || location.includes(`sourceId=${sourceId}`);
              const Icon = coreIcons[child.charAt(0).toUpperCase() + child.slice(1)] || Inbox;

              return (
                <Link
                  key={child}
                  href={childPath}
                  onClick={() => saveLastSource(sourceId)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 8px',
                    fontSize: '11px',
                    fontWeight: 300,
                    color: isActive ? '#D89880' : '#999',
                    background: isActive ? '#FFFBF7' : 'transparent',
                    borderRadius: '3px',
                    textDecoration: 'none',
                    transition: 'all 0.15s'
                  }}
                  data-testid={`sidebar-child-${source.id}-${child}`}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = '#FAFAFA';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <Icon style={{ width: '12px', height: '12px', strokeWidth: 1.5, opacity: 0.5 }} />
                  <span style={{ textTransform: 'capitalize' }}>{child}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontSize: '11px' }}>
      {/* CORE Group */}
      <div style={{ marginBottom: '12px' }} data-testid="sidebar-group-core">
        <div style={{ padding: '0 8px', marginBottom: '4px' }}>
          <span style={{
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#000',
            fontWeight: 600
          }}>Core</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {model.core.map((label) => {
            const icon = coreIcons[label] || Inbox;
            const path = `/${label.toLowerCase().replace(/\s+/g, '-')}`;
            return renderNavItem(label, icon, path, `sidebar-link-${label.toLowerCase().replace(/\s+/g, '-')}`);
          })}
        </div>
      </div>

      {/* INBOXES Group */}
      <div style={{ flex: 1, overflow: 'hidden', marginBottom: '12px' }} data-testid="sidebar-group-inboxes">
        <div 
          style={{ 
            padding: '0 8px', 
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
          onClick={() => setInboxesCollapsed(!inboxesCollapsed)}
        >
          {inboxesCollapsed ? (
            <ChevronRight style={{ width: '10px', height: '10px', color: '#000', strokeWidth: 1.5 }} />
          ) : (
            <ChevronDown style={{ width: '10px', height: '10px', color: '#000', strokeWidth: 1.5 }} />
          )}
          <span style={{
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#000',
            fontWeight: 600
          }}>Inboxes</span>
          {totalUnread > 0 && (
            <span style={{
              fontSize: '9px',
              fontWeight: 500,
              color: '#D89880', // Peach
              marginLeft: 'auto'
            }}>({totalUnread})</span>
          )}
        </div>

        {/* Search */}
        {!inboxesCollapsed && model.inboxes.length > 5 && (
          <div style={{ padding: '0 8px', marginBottom: '6px' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{
                position: 'absolute',
                left: '6px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '11px',
                height: '11px',
                color: '#000',
                strokeWidth: 1.5
              }} />
              <input
                type="text"
                placeholder="Search inboxes…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '24px',
                  paddingRight: '6px',
                  paddingTop: '3px',
                  paddingBottom: '3px',
                  fontSize: '10px',
                  fontWeight: 300,
                  border: '1px solid #F0F0F0',
                  borderRadius: '3px',
                  outline: 'none',
                  background: 'white',
                  color: '#666'
                }}
                data-testid="sidebar-inboxes-search"
              />
            </div>
          </div>
        )}

        {/* Virtualized list */}
        {!inboxesCollapsed && (
          <div ref={inboxesRef} style={{
            overflowY: 'auto',
            maxHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1px'
          }} className="inboxes-scrollbar">
            {visibleInboxes.map(renderRollup)}
          </div>
        )}

        {/* Add Source CTA */}
        {!inboxesCollapsed && (
          <div style={{ padding: '6px 8px 0' }}>
            <button
            onClick={onAddSource || (() => window.location.href = '/settings')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 8px',
              fontSize: '11px',
              fontWeight: 300,
              color: '#000',
              background: 'transparent',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              transition: 'background 0.15s'
            }}
            data-testid="sidebar-add-source"
            onMouseEnter={(e) => e.currentTarget.style.background = '#FAFAFA'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Plus style={{ width: '14px', height: '14px', strokeWidth: 1.5 }} />
            <span>Add Inbox or Domain</span>
            </button>
          </div>
        )}
      </div>

      {/* TOOLS Group */}
      <div style={{ marginBottom: '12px' }} data-testid="sidebar-group-tools">
        <div 
          style={{ 
            padding: '0 8px', 
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
          onClick={() => setToolsCollapsed(!toolsCollapsed)}
        >
          {toolsCollapsed ? (
            <ChevronRight style={{ width: '10px', height: '10px', color: '#000', strokeWidth: 1.5 }} />
          ) : (
            <ChevronDown style={{ width: '10px', height: '10px', color: '#000', strokeWidth: 1.5 }} />
          )}
          <span style={{
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#000',
            fontWeight: 600
          }}>Tools</span>
        </div>
        {!toolsCollapsed && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {model.tools.map((label) => {
              const icon = toolIcons[label] || FileText;
              const path = `/${label.toLowerCase()}`;
              return renderNavItem(label, icon, path, `sidebar-link-${label.toLowerCase()}`);
            })}
          </div>
        )}
      </div>

      {/* SETTINGS Group */}
      <div data-testid="sidebar-group-settings">
        <div 
          style={{ 
            padding: '0 8px', 
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
          onClick={() => setSettingsCollapsed(!settingsCollapsed)}
        >
          {settingsCollapsed ? (
            <ChevronRight style={{ width: '10px', height: '10px', color: '#000', strokeWidth: 1.5 }} />
          ) : (
            <ChevronDown style={{ width: '10px', height: '10px', color: '#000', strokeWidth: 1.5 }} />
          )}
          <span style={{
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#000',
            fontWeight: 600
          }}>Settings</span>
        </div>
        {!settingsCollapsed && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {model.settings.map((label) => {
              const icon = settingsIcons[label] || Settings;
              const path = `/${label.toLowerCase()}`;
              return renderNavItem(label, icon, path, `sidebar-link-${label.toLowerCase()}`);
            })}
          </div>
        )}
      </div>
    </div>
  );
}
