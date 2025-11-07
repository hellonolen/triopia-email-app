import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Mail, Send, Archive, Trash2, Star, Clock, CheckCircle2, Pause, Home, Inbox, Calendar, Users, Settings, Plus, UserPlus, Search, Zap, Check, Pencil, ChevronDown, ChevronRight, Pin, Info, FileText, HardDrive, BarChart3, Palette, AlertCircle, FilePen, Reply, Forward, Bot, User, Shield } from "lucide-react";

/**
 * Claude AI - DRAMATICALLY Refined
 * 
 * OVERT REFINEMENT: 40-50% reduction in all spacing/sizing
 * Colors: Muted Coral (#D89880), Cream (#FFFBF7)
 * Typography: Ultra-light (200-300), TIGHT spacing
 * Details: Minimal padding, compact layout, executive density
 */

const mockEmails = [
  { id: 1, from: "Sarah Johnson", email: "sarah@startup.com", subject: "Welcome to your new chapter", preview: "Excited to have you on board! Let's schedule a kickoff call...", time: "Nov 6, 2:30 PM", unread: true, starred: false },
  { id: 2, from: "David Chen", email: "david@company.com", subject: "Q4 Marketing Strategy Review", preview: "I wanted to share the preliminary results from our Q4 marketing campaign...", time: "Nov 6, 1:15 PM", unread: true, starred: true },
  { id: 3, from: "Emily Rodriguez", email: "emily@agency.co", subject: "Project Update", preview: "Let me know if this works for you. Looking forward to our meeting...", time: "Nov 6, 12:48 PM", unread: false, starred: false },
];

const mockAccounts = [
  { id: 1, email: "work@company.com", unread: 5, color: "#D89880" },
  { id: 2, email: "personal@gmail.com", unread: 3, color: "#8B9DC3" },
  { id: 3, email: "startup@venture.io", unread: 2, color: "#C9ADA7" },
  { id: 4, email: "consulting@freelance.com", unread: 1, color: "#9A8C98" },
  { id: 5, email: "side@project.dev", unread: 1, color: "#B5838D" },
];

export default function ClaudeRefinedDemo() {
  const [selectedEmail, setSelectedEmail] = useState(mockEmails[0]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [inboxesExpanded, setInboxesExpanded] = useState(false);
  const [emailFontSize, setEmailFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [emailListWidth, setEmailListWidth] = useState(420);
  const [isResizing, setIsResizing] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState<{label: string, x: number, y: number} | null>(null);
  const [emailDetailWidth, setEmailDetailWidth] = useState(1000);
  const [activeView, setActiveView] = useState('Inbox');
  const [emailFilter, setEmailFilter] = useState<'all' | 'unread' | 'starred'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);

  // Backend data hooks
  const { data: emailsData = [], refetch: refetchEmails } = trpc.emails.list.useQuery(
    { folder: activeView.toLowerCase(), limit: 100 },
    { enabled: ['Inbox', 'Starred', 'Sent', 'Drafts', 'Archive', 'Spam', 'Trash'].includes(activeView) }
  );
  const { data: notesData = [], refetch: refetchNotes } = trpc.notes.list.useQuery(undefined, { enabled: activeView === 'Notes' });
  const { data: contactsData = [], refetch: refetchContacts } = trpc.contacts.list.useQuery(undefined, { enabled: activeView === 'Contacts' });
  const { data: calendarData = [], refetch: refetchCalendar } = trpc.calendar.list.useQuery({}, { enabled: activeView === 'Calendar' });
  const updateEmailMutation = trpc.emails.update.useMutation({ onSuccess: () => refetchEmails() });
  const createNoteMutation = trpc.notes.create.useMutation({ onSuccess: () => refetchNotes() });
  const deleteNoteMutation = trpc.notes.delete.useMutation({ onSuccess: () => refetchNotes() });
  const createContactMutation = trpc.contacts.create.useMutation({ onSuccess: () => refetchContacts() });
  const createEventMutation = trpc.calendar.create.useMutation({ onSuccess: () => refetchCalendar() });
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [activeAITab, setActiveAITab] = useState<'chat' | 'triage' | 'quick-reply' | 'voice'>('chat');
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [selectedEmailIndex, setSelectedEmailIndex] = useState(0);

  // Email action handlers
  const handleReply = (emailId: number) => {
    console.log('Reply to email:', emailId);
    setShowComposeModal(true);
    // TODO: Pre-fill compose modal with reply data
  };

  const handleForward = (emailId: number) => {
    console.log('Forward email:', emailId);
    setShowComposeModal(true);
    // TODO: Pre-fill compose modal with forward data
  };

  const handleArchive = (emailId: number) => {
    updateEmailMutation.mutate({ id: emailId, folder: 'archive' });
  };

  const handleSpam = (emailId: number) => {
    updateEmailMutation.mutate({ id: emailId, folder: 'spam' });
  };

  const handleDelete = (emailId: number) => {
    updateEmailMutation.mutate({ id: emailId, folder: 'trash' });
  };

  const handlePin = (emailId: number) => {
    const email = emailsData.find(e => e.id === emailId);
    if (email) {
      updateEmailMutation.mutate({ id: emailId, pinned: !email.pinned });
    }
  };

  const handleStar = (emailId: number) => {
    const email = emailsData.find(e => e.id === emailId);
    if (email) {
      updateEmailMutation.mutate({ id: emailId, starred: !email.starred });
    }
  };

  // Bulk actions
  const handleBulkArchive = () => {
    selectedEmails.forEach(id => updateEmailMutation.mutate({ id, folder: 'archive' }));
    setSelectedEmails([]);
  };

  const handleBulkDelete = () => {
    selectedEmails.forEach(id => updateEmailMutation.mutate({ id, folder: 'trash' }));
    setSelectedEmails([]);
  };

  const toggleSelectAll = () => {
    if (selectedEmails.length === filteredEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredEmails.map(e => e.id));
    }
  };

  // Filter and search emails
  const filteredEmails = emailsData.filter(email => {
    if (emailFilter === 'unread' && email.read) return false;
    if (emailFilter === 'starred' && !email.starred) return false;
    if (searchQuery && !email.subject.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !email.from.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = e.clientX - 198; // Subtract sidebar width
        if (newWidth >= 300 && newWidth <= 600) {
          setEmailListWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const emailDetailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!emailDetailRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setEmailDetailWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(emailDetailRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // ? - Show keyboard shortcuts help
      if (e.key === '?' && e.shiftKey) {
        e.preventDefault();
        setShowKeyboardHelp(true);
        return;
      }

      // Esc - Close modals/panels
      if (e.key === 'Escape') {
        setShowComposeModal(false);
        setShowAIPanel(false);
        setShowKeyboardHelp(false);
        return;
      }

      // c - Compose new email
      if (e.key === 'c') {
        e.preventDefault();
        setShowComposeModal(true);
        return;
      }

      // Cmd/Ctrl+K - Open AI assistant
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowAIPanel(true);
        setActiveAITab('chat');
        return;
      }

      // Cmd/Ctrl+J - Quick reply AI
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        setShowAIPanel(true);
        setActiveAITab('quick-reply');
        return;
      }

      // r - Reply to email
      if (e.key === 'r') {
        e.preventDefault();
        handleReply(selectedEmailIndex);
        return;
      }

      // f - Forward email
      if (e.key === 'f') {
        e.preventDefault();
        handleForward(selectedEmailIndex);
        return;
      }

      // e - Archive email
      if (e.key === 'e') {
        e.preventDefault();
        handleArchive(selectedEmailIndex);
        return;
      }

      // # - Delete email
      if (e.key === '#' && e.shiftKey) {
        e.preventDefault();
        handleDelete(selectedEmailIndex);
        return;
      }

      // s - Star email
      if (e.key === 's') {
        e.preventDefault();
        handleStar(selectedEmailIndex);
        return;
      }

      // ! - Mark as spam
      if (e.key === '!' && e.shiftKey) {
        e.preventDefault();
        handleSpam(selectedEmailIndex);
        return;
      }

      // g+i - Go to Inbox
      if (e.key === 'g') {
        const handleSecondKey = (e2: KeyboardEvent) => {
          if (e2.key === 'i') setActiveView('Inbox');
          if (e2.key === 's') setActiveView('Starred');
          if (e2.key === 'd') setActiveView('Drafts');
          if (e2.key === 't') setActiveView('Sent');
          if (e2.key === 'a') setActiveView('Archive');
          document.removeEventListener('keydown', handleSecondKey);
        };
        document.addEventListener('keydown', handleSecondKey);
        setTimeout(() => document.removeEventListener('keydown', handleSecondKey), 2000);
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedEmailIndex]);

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "#FFFBF7",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header - DRAMATICALLY COMPACT */}
      <div style={{ 
        background: "white",
        borderBottom: "1px solid #F0EBE6",
        padding: "12px 24px"
      }}>
        <div className="flex items-center justify-between">
          <h1 style={{ 
            fontSize: "14px", 
            fontWeight: 300,
            color: "#2A2A2A",
            letterSpacing: "0.05em"
          }}>
            TRIOPIA
          </h1>

        </div>
      </div>

      <div className="flex" style={{ flex: 1, overflow: "hidden" }}>
        {/* Sidebar - DRAMATICALLY NARROW */}
        <div style={{ 
          width: "198px",
          background: "white",
          borderRight: "1px solid #F0EBE6",
          padding: "16px 0"
        }}>


          <div>
            {[
              { icon: Home, label: "Fresh Start", count: null },
              { icon: Inbox, label: "Inbox", count: 12 },
              { icon: Star, label: "Starred", count: 3 },
              { icon: UserPlus, label: "New Connections", count: 5 },
              { icon: Pause, label: "Paused", count: 2 },
              { icon: CheckCircle2, label: "Complete", count: 8 },
              { icon: Send, label: "Sent", count: null },
              { icon: FilePen, label: "Drafts", count: 2 },
              { icon: Archive, label: "Archive", count: null },
              { icon: AlertCircle, label: "Spam", count: null },
              { icon: Trash2, label: "Trash", count: null },
              { icon: HardDrive, label: "Storage", count: null },
            ].map((item) => (
              <div
                key={item.label}
                onClick={() => setActiveView(item.label)}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.3s ease",
                  background: item.label === activeView ? "#FFFBF7" : "transparent"
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon style={{ 
                      width: "14px", 
                      height: "14px",
                      color: item.label === activeView ? "#D89880" : "#999",
                      strokeWidth: 1.5
                    }} />
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 300,
                      color: item.label === "Inbox" ? "#2A2A2A" : "#666",
                      letterSpacing: "0.02em"
                    }}>
                      {item.label}
                    </span>
                  </div>
                  {item.count && (
                    <span style={{
                      fontSize: "9px",
                      fontWeight: 300,
                      color: "#999"
                    }}>
                      {item.count}
                    </span>
                  )}
                </div>
                {/* Animated underline - shows on active */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: "16px",
                  width: "auto",
                  right: item.count ? "50px" : "16px",
                  height: "1px",
                  background: "#D89880",
                  transform: item.label === activeView ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                }} />
              </div>
            ))}
          </div>

          {/* Multi-Inbox Section */}
          <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #F0EBE6" }}>
            <div
              onClick={() => setInboxesExpanded(!inboxesExpanded)}
              className="flex items-center justify-between"
              style={{
                padding: "8px 16px",
                cursor: "pointer"
              }}
            >
              <div className="flex items-center gap-2">
                {inboxesExpanded ? (
                  <ChevronDown style={{ width: "12px", height: "12px", color: "#999", strokeWidth: 1.5 }} />
                ) : (
                  <ChevronRight style={{ width: "12px", height: "12px", color: "#999", strokeWidth: 1.5 }} />
                )}
                <span style={{
                  fontSize: "10px",
                  fontWeight: 300,
                  color: "#666",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase"
                }}>
                  Inboxes
                </span>
              </div>
              <span style={{
                fontSize: "9px",
                fontWeight: 300,
                color: "#999"
              }}>
                {inboxesExpanded ? mockAccounts.length : mockAccounts.reduce((sum, acc) => sum + acc.unread, 0)}
              </span>
            </div>
            
            {inboxesExpanded && (
              <div style={{ marginTop: "4px" }}>
                {mockAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between"
                    style={{
                      padding: "6px 16px 6px 32px",
                      cursor: "pointer",
                      transition: "background 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#FFFBF7";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: account.color
                      }} />
                      <span style={{
                        fontSize: "10px",
                        fontWeight: 300,
                        color: "#666",
                        letterSpacing: "0.01em"
                      }}>
                        {account.email}
                      </span>
                    </div>
                    {account.unread > 0 && (
                      <span style={{
                        fontSize: "9px",
                        fontWeight: 300,
                        color: "#999"
                      }}>
                        {account.unread}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: "auto", padding: "16px", borderTop: "1px solid #F0EBE6" }}>
            {[
              { icon: FileText, label: "Notes" },
              { icon: Calendar, label: "Calendar" },
              { icon: Users, label: "Contacts" },
              { icon: BarChart3, label: "Analytics" },
              { icon: Palette, label: "Appearance" },
              { icon: Settings, label: "Settings" },
              { icon: User, label: "Profile" },
              { icon: Shield, label: "Admin Dashboard" },
            ].map((item) => (
              <div
                key={item.label}
                onClick={() => setActiveView(item.label)}
                className="flex items-center gap-3"
                style={{
                  padding: "8px 0",
                  cursor: "pointer",
                  position: "relative"
                }}
                onMouseEnter={(e) => {
                  const span = e.currentTarget.querySelector("span");
                  if (span) span.style.color = "#2A2A2A";
                }}
                onMouseLeave={(e) => {
                  const span = e.currentTarget.querySelector("span");
                  if (span && item.label !== activeView) span.style.color = "#666";
                }}
              >
                <item.icon style={{ width: "14px", height: "14px", color: item.label === activeView ? "#D89880" : "#999", strokeWidth: 1.5 }} />
                <span style={{
                  fontSize: "11px",
                  fontWeight: 300,
                  color: item.label === activeView ? "#D89880" : "#666",
                  letterSpacing: "0.02em",
                  transition: "color 0.3s ease"
                }}>
                  {item.label}
                </span>
                {/* Animated underline - shows on active */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: "#D89880",
                  transform: item.label === activeView ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* Email List - DRAMATICALLY COMPACT */}
        <div style={{ 
          width: `${emailListWidth}px`,
          background: "white",
          borderRight: "1px solid #F0EBE6",
          position: "relative",
          minWidth: "300px",
          maxWidth: "600px"
        }}>
          {/* Resize Handle */}
          <div
            onMouseDown={(e) => {
              setIsResizing(true);
              e.preventDefault();
            }}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "4px",
              cursor: "col-resize",
              background: isResizing ? "#D89880" : "transparent",
              transition: "background 0.2s",
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              if (!isResizing) e.currentTarget.style.background = "#F0EBE6";
            }}
            onMouseLeave={(e) => {
              if (!isResizing) e.currentTarget.style.background = "transparent";
            }}
          />
          <div style={{ 
            padding: "20px 16px 14px",
            borderBottom: "1px solid #F0EBE6"
          }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h2 style={{ 
                    fontSize: "22px", 
                    fontWeight: 200,
                    color: "#2A2A2A",
                    letterSpacing: "-0.02em",
                    marginBottom: "6px"
                  }}>
                    {activeView}
                  </h2>
                  <p style={{ 
                    fontSize: "10px", 
                    fontWeight: 300,
                    color: "#999",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase"
                  }}>
                    12 Unread
                  </p>
                </div>
                {/* Compose and Search next to Inbox */}
                <div className="flex items-center gap-2" style={{ marginTop: "-6px" }}>
                  <button
                    onClick={() => setShowComposeModal(true)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0
                    }}
                  >
                    <Mail style={{ width: "16px", height: "16px", color: "#666", strokeWidth: 1.5 }} />
                  </button>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0
                    }}
                  >
                    <Search style={{ width: "16px", height: "16px", color: "#666", strokeWidth: 1.5 }} />
                  </button>
                  <button
                    onClick={() => setShowAIPanel(true)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0
                    }}
                    onMouseEnter={(e) => setHoveredTooltip({ label: 'AI Assistant', x: e.clientX, y: e.clientY + 20 })}
                    onMouseLeave={() => setHoveredTooltip(null)}
                  >
                    <Bot style={{ width: "16px", height: "16px", color: "#666", strokeWidth: 1.5 }} />
                  </button>
                </div>
              </div>
              
              {/* Filter and Search Bar */}
              <div className="flex items-center gap-3" style={{ padding: "8px 16px", borderBottom: "1px solid #F0EBE6" }}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEmailFilter('all')}
                    style={{
                      padding: "4px 10px",
                      fontSize: "10px",
                      fontWeight: 300,
                      background: emailFilter === 'all' ? '#FFFBF7' : 'transparent',
                      border: emailFilter === 'all' ? '1px solid #D89880' : '1px solid #E5E5E5',
                      borderRadius: "4px",
                      color: emailFilter === 'all' ? '#D89880' : '#666',
                      cursor: "pointer"
                    }}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setEmailFilter('unread')}
                    style={{
                      padding: "4px 10px",
                      fontSize: "10px",
                      fontWeight: 300,
                      background: emailFilter === 'unread' ? '#FFFBF7' : 'transparent',
                      border: emailFilter === 'unread' ? '1px solid #D89880' : '1px solid #E5E5E5',
                      borderRadius: "4px",
                      color: emailFilter === 'unread' ? '#D89880' : '#666',
                      cursor: "pointer"
                    }}
                  >
                    Unread
                  </button>
                  <button
                    onClick={() => setEmailFilter('starred')}
                    style={{
                      padding: "4px 10px",
                      fontSize: "10px",
                      fontWeight: 300,
                      background: emailFilter === 'starred' ? '#FFFBF7' : 'transparent',
                      border: emailFilter === 'starred' ? '1px solid #D89880' : '1px solid #E5E5E5',
                      borderRadius: "4px",
                      color: emailFilter === 'starred' ? '#D89880' : '#666',
                      cursor: "pointer"
                    }}
                  >
                    Starred
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "4px 8px",
                    fontSize: "11px",
                    fontWeight: 300,
                    border: "1px solid #E5E5E5",
                    borderRadius: "4px",
                    outline: "none"
                  }}
                />
                {selectedEmails.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleBulkArchive}
                      style={{
                        padding: "4px 10px",
                        fontSize: "10px",
                        fontWeight: 300,
                        background: "#FFFBF7",
                        border: "1px solid #D89880",
                        borderRadius: "4px",
                        color: "#D89880",
                        cursor: "pointer"
                      }}
                    >
                      Archive ({selectedEmails.length})
                    </button>
                    <button
                      onClick={handleBulkDelete}
                      style={{
                        padding: "4px 10px",
                        fontSize: "10px",
                        fontWeight: 300,
                        background: "#FFFBF7",
                        border: "1px solid #D89880",
                        borderRadius: "4px",
                        color: "#D89880",
                        cursor: "pointer"
                      }}
                    >
                      Delete ({selectedEmails.length})
                    </button>
                  </div>
                )}
              </div>
              
              {/* Toggle and Zap on right */}
              <div className="flex items-center gap-3">
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "2px"
                  }}
                >
                  <Check style={{ width: "14px", height: "14px", color: "#666", strokeWidth: 1.5 }} />
                  <div style={{
                    width: "24px",
                    height: "12px",
                    borderRadius: "12px",
                    border: "1px solid #ccc",
                    background: "white",
                    position: "relative"
                  }}>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#666",
                      position: "absolute",
                      top: "1px",
                      left: "2px"
                    }} />
                  </div>
                </button>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "2px"
                  }}
                >
                  <Zap style={{ width: "14px", height: "14px", color: "#666", strokeWidth: 1.5 }} />
                </button>
              </div>
            </div>
          </div>

          <div>
            {/* Inbox View */}
            {activeView === 'Inbox' && filteredEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #F8F6F4",
                  borderLeft: selectedEmail.id === email.id ? "3px solid #D89880" : "3px solid transparent",
                  background: selectedEmail.id === email.id ? "#FFFBF7" : "white",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  if (selectedEmail.id !== email.id) {
                    e.currentTarget.style.background = "#FDF9F5";
                    e.currentTarget.style.borderLeft = "3px solid #F0E6DC";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedEmail.id !== email.id) {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.borderLeft = "3px solid transparent";
                  }
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div style={{ 
                      fontSize: "12px", 
                      fontWeight: email.unread ? 400 : 300,
                      color: "#2A2A2A",
                      marginBottom: "2px",
                      letterSpacing: "0.01em"
                    }}>
                      {email.from}
                    </div>
                    <div style={{ 
                      fontSize: "10px", 
                      fontWeight: 300,
                      color: "#999"
                    }}>
                      {email.email}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {email.starred && <Star style={{ width: "12px", height: "12px", color: "#D89880", fill: "#D89880", strokeWidth: 1.5 }} />}
                    <span style={{ fontSize: "9px", color: "#999", fontWeight: 300 }}>
                      {email.time}
                    </span>
                  </div>
                </div>
                <div style={{ 
                  fontSize: "13px", 
                  fontWeight: email.unread ? 400 : 300,
                  color: "#2A2A2A",
                  marginBottom: "6px",
                  lineHeight: "1.4",
                  letterSpacing: "0.005em"
                }}>
                  {email.subject}
                </div>
                <div style={{ 
                  fontSize: "11px", 
                  fontWeight: 300,
                  color: "#666",
                  lineHeight: "1.5",
                  letterSpacing: "0.005em",
                  marginBottom: "8px"
                }}>
                  {email.preview}
                </div>
                {/* Email action icons - consistent with top/bottom */}
                <div className="flex items-center gap-2">
                  {[
                    { icon: Reply, label: "Reply" },
                    { icon: Forward, label: "Forward" },
                    { icon: Archive, label: "Archive" },
                    { icon: AlertCircle, label: "Spam" },
                    { icon: Trash2, label: "Delete" },
                    { icon: Pin, label: "Pin" },
                    { icon: Star, label: "Star" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        if (action.label === 'Reply') handleReply(email.id);
                        else if (action.label === 'Forward') handleForward(email.id);
                        else if (action.label === 'Archive') handleArchive(email.id);
                        else if (action.label === 'Spam') handleSpam(email.id);
                        else if (action.label === 'Delete') handleDelete(email.id);
                        else if (action.label === 'Pin') handlePin(email.id);
                        else if (action.label === 'Star') handleStar(email.id);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "all 0.2s ease",
                        position: "relative"
                      }}
                      onMouseEnter={(e) => {
                        const icon = e.currentTarget.querySelector('svg') as any;
                        if (icon) icon.style.color = "#D89880";
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoveredTooltip({ label: action.label, x: rect.left + rect.width / 2, y: rect.bottom + 8 });
                      }}
                      onMouseLeave={(e) => {
                        const icon = e.currentTarget.querySelector('svg') as any;
                        if (icon) icon.style.color = "#999";
                        setHoveredTooltip(null);
                      }}
                    >
                      <action.icon style={{ width: "14px", height: "14px", color: "#999", strokeWidth: 1.5, transition: "color 0.2s ease" }} />
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Notes View */}
            {activeView === 'Notes' && (
              <div style={{ padding: "20px" }}>
                {/* Inline create note form */}
                <div style={{ marginBottom: "20px", padding: "16px", background: "#FFFBF7", border: "1px solid #F0EBE6", borderRadius: "8px" }}>
                  <input
                    type="text"
                    placeholder="Note title..."
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginBottom: "8px",
                      border: "1px solid #F0EBE6",
                      borderRadius: "4px",
                      fontSize: "13px",
                      background: "white"
                    }}
                  />
                  <textarea
                    placeholder="Note content..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginBottom: "8px",
                      border: "1px solid #F0EBE6",
                      borderRadius: "4px",
                      fontSize: "12px",
                      minHeight: "80px",
                      background: "white",
                      resize: "vertical"
                    }}
                  />
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Plus
                      size={16}
                      style={{ cursor: "pointer", color: "#D89880" }}
                      onClick={() => {
                        if (newNoteTitle || newNoteContent) {
                          createNoteMutation.mutate({
                            title: newNoteTitle,
                            content: newNoteContent
                          });
                          setNewNoteTitle('');
                          setNewNoteContent('');
                        }
                      }}
                      onMouseEnter={(e) => setHoveredTooltip({ label: 'Add Note', x: e.clientX, y: e.clientY })}
                      onMouseLeave={() => setHoveredTooltip(null)}
                    />
                  </div>
                </div>
                <div style={{ display: "grid", gap: "12px" }}>
                  {notesData.map(note => (
                    <div
                      key={note.id}
                      style={{
                        padding: "12px",
                        background: "white",
                        border: "1px solid #F0EBE6",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "#D89880"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = "#F0EBE6"}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "13px", fontWeight: 400, color: "#2A2A2A", marginBottom: "6px" }}>{note.title || 'Untitled Note'}</div>
                          <div style={{ fontSize: "11px", color: "#666", marginBottom: "8px" }}>{note.content || 'No content'}</div>
                          <div style={{ fontSize: "9px", color: "#999" }}>{new Date(note.updatedAt).toLocaleDateString()}</div>
                        </div>
                        <div style={{ display: "flex", gap: "8px", opacity: 0.6 }}>
                          <Trash2
                            size={14}
                            style={{ cursor: "pointer", color: "#D89880" }}
                            onClick={() => deleteNoteMutation.mutate({ noteId: note.id })}
                            onMouseEnter={(e) => setHoveredTooltip({ label: 'Delete', x: e.clientX, y: e.clientY })}
                            onMouseLeave={() => setHoveredTooltip(null)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contacts View */}
            {activeView === 'Contacts' && (
              <div style={{ padding: "20px" }}>
                <div style={{ marginBottom: "16px" }}>
                  <button
                    onClick={() => console.log('Add contact')}
                    style={{
                      padding: "8px 16px",
                      background: "#D89880",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: 400
                    }}
                  >
                    + Add Contact
                  </button>
                </div>
                <div style={{ display: "grid", gap: "8px" }}>
                  {contactsData.map(contact => (
                    <div
                      key={contact.id}
                      style={{
                        padding: "12px",
                        background: "white",
                        border: "1px solid #F0EBE6",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "#D89880"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = "#F0EBE6"}
                    >
                      <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "#D89880",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: 400
                      }}>
                        {(contact.name || contact.email).split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "13px", fontWeight: 400, color: "#2A2A2A" }}>{contact.name || 'No Name'}</div>
                        <div style={{ fontSize: "11px", color: "#666" }}>{contact.email}</div>
                        <div style={{ fontSize: "10px", color: "#999" }}>{contact.company || 'No Company'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar View */}
            {activeView === 'Calendar' && (
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: "13px", color: "#666" }}>Calendar integration - Coming soon</p>
              </div>
            )}

            {/* Analytics View */}
            {activeView === 'Analytics' && (
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: "13px", color: "#666" }}>Email analytics dashboard - Coming soon</p>
              </div>
            )}

            {/* Appearance View */}
            {activeView === 'Appearance' && (
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: "13px", color: "#666" }}>Theme customization - Coming soon</p>
              </div>
            )}

            {/* Settings View */}
            {activeView === 'Settings' && (
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: "13px", color: "#666" }}>User settings - Coming soon</p>
              </div>
            )}

            {/* Starred View */}
            {activeView === 'Starred' && (
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: "13px", color: "#666" }}>Starred emails - Coming soon</p>
              </div>
            )}

            {/* Drafts View */}
            {activeView === 'Drafts' && (
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: "13px", color: "#666" }}>Draft emails - Coming soon</p>
              </div>
            )}

            {/* Sent View */}
            {activeView === 'Sent' && (
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: "13px", color: "#666" }}>Sent emails - Coming soon</p>
              </div>
            )}

            {/* Archive View */}
            {activeView === 'Archive' && (
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: "13px", color: "#666" }}>Archived emails - Coming soon</p>
              </div>
            )}

            {/* Spam View */}
            {activeView === 'Spam' && (
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: "13px", color: "#666" }}>Spam emails - Coming soon</p>
              </div>
            )}

            {/* Trash View */}
            {activeView === 'Trash' && (
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: "13px", color: "#666" }}>Deleted emails - Coming soon</p>
              </div>
            )}

            {/* Storage View */}
            {activeView === 'Storage' && (
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: "13px", color: "#666" }}>Storage management - Coming soon</p>
              </div>
            )}

            {/* Profile View */}
            {activeView === 'Profile' && (
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: "13px", color: "#666" }}>User profile - Coming soon</p>
              </div>
            )}

            {/* Admin Dashboard View */}
            {activeView === 'Admin Dashboard' && (
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: "13px", color: "#666" }}>Admin dashboard - Coming soon</p>
              </div>
            )}
          </div>
        </div>

        {/* Email Detail - DRAMATICALLY COMPACT */}
        <div ref={emailDetailRef} style={{ 
          flex: 1,
          background: "#FFFBF7",
          overflowY: "auto",
          padding: "28px 36px"
        }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div className="flex items-center justify-between mb-10" style={{ flexWrap: "wrap", gap: "12px" }}>
              <div className="flex items-center gap-3">
              {[
                { icon: Reply, label: "Reply", alwaysShow: true },
                { icon: Forward, label: "Forward", alwaysShow: true },
                { icon: Archive, label: "Archive", alwaysShow: false },
                { icon: AlertCircle, label: "Spam", alwaysShow: false },
                { icon: Trash2, label: "Delete", alwaysShow: false },
                { icon: Pin, label: "Pin", alwaysShow: false },
                { icon: Star, label: "Star", alwaysShow: false },
              ].filter(action => action.alwaysShow || emailDetailWidth >= 700).map((action) => (
                <button
                  key={action.label}
                  onClick={() => {
                    if (action.label === 'Reply') handleReply(selectedEmail.id);
                    else if (action.label === 'Forward') handleForward(selectedEmail.id);
                    else if (action.label === 'Archive') handleArchive(selectedEmail.id);
                    else if (action.label === 'Spam') handleSpam(selectedEmail.id);
                    else if (action.label === 'Delete') handleDelete(selectedEmail.id);
                    else if (action.label === 'Pin') handlePin(selectedEmail.id);
                    else if (action.label === 'Star') handleStar(selectedEmail.id);
                  }}
                  style={{
                    padding: 0,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    const icon = e.currentTarget.querySelector('svg') as any;
                    if (icon) icon.style.color = "#D89880";
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredTooltip({ label: action.label, x: rect.left + rect.width / 2, y: rect.bottom + 8 });
                  }}
                  onMouseLeave={(e) => {
                    const icon = e.currentTarget.querySelector('svg') as any;
                    if (icon) icon.style.color = "#999";
                    setHoveredTooltip(null);
                  }}
                >
                  <action.icon style={{ width: "16px", height: "16px", color: "#999", strokeWidth: 1.5, transition: "color 0.2s ease" }} />
                </button>
              ))}
              </div>
              
              {/* Font Size Controls */}
              {emailDetailWidth >= 700 && (
              <div className="flex items-center gap-2" style={{ marginLeft: "auto" }}>
                <button
                  onClick={() => setEmailFontSize('small')}
                  style={{
                    padding: "3px 0",
                    width: "28px",
                    background: emailFontSize === 'small' ? "#FFFBF7" : "transparent",
                    border: "1px solid",
                    borderColor: emailFontSize === 'small' ? "#D89880" : "#F0EBE6",
                    color: emailFontSize === 'small' ? "#D89880" : "#999",
                    fontSize: "9px",
                    fontWeight: 300,
                    letterSpacing: "0.02em",
                    cursor: "pointer",
                    borderRadius: "4px",
                    transition: "all 0.2s ease"
                  }}
                >
                  A-
                </button>
                <button
                  onClick={() => setEmailFontSize('medium')}
                  style={{
                    padding: "3px 0",
                    width: "28px",
                    background: emailFontSize === 'medium' ? "#FFFBF7" : "transparent",
                    border: "1px solid",
                    borderColor: emailFontSize === 'medium' ? "#D89880" : "#F0EBE6",
                    color: emailFontSize === 'medium' ? "#D89880" : "#999",
                    fontSize: "9px",
                    fontWeight: 300,
                    letterSpacing: "0.02em",
                    cursor: "pointer",
                    borderRadius: "4px",
                    transition: "all 0.2s ease"
                  }}
                >
                  A
                </button>
                <button
                  onClick={() => setEmailFontSize('large')}
                  style={{
                    padding: "3px 0",
                    width: "28px",
                    background: emailFontSize === 'large' ? "#FFFBF7" : "transparent",
                    border: "1px solid",
                    borderColor: emailFontSize === 'large' ? "#D89880" : "#F0EBE6",
                    color: emailFontSize === 'large' ? "#D89880" : "#999",
                    fontSize: "9px",
                    fontWeight: 300,
                    letterSpacing: "0.02em",
                    cursor: "pointer",
                    borderRadius: "4px",
                    transition: "all 0.2s ease"
                  }}
                >
                  A+
                </button>
              </div>
              )}
            </div>

            <h1 style={{ 
              fontSize: emailFontSize === 'small' ? "24px" : emailFontSize === 'large' ? "40px" : "32px", 
              fontWeight: 200,
              color: "#2A2A2A",
              lineHeight: "1.3",
              marginBottom: "20px",
              letterSpacing: "-0.01em"
            }}>
              {selectedEmail.subject}
            </h1>

            <div className="flex items-center gap-3 mb-8 pb-6" style={{ borderBottom: "1px solid #F0EBE6" }}>
              <div style={{
                width: "32px",
                height: "32px",
                background: "#D89880",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: 300,
                color: "white"
              }}>
                {selectedEmail.from.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 300, color: "#2A2A2A", letterSpacing: "0.01em" }}>
                  {selectedEmail.from}
                </div>
                <div style={{ fontSize: "10px", fontWeight: 300, color: "#999", marginTop: "1px" }}>
                  {selectedEmail.email}
                </div>
              </div>
              <div className="ml-auto" style={{ fontSize: "10px", color: "#999", fontWeight: 300 }}>
                {selectedEmail.time}
              </div>
            </div>

            <div style={{ 
              fontSize: emailFontSize === 'small' ? "12px" : emailFontSize === 'large' ? "16px" : "14px", 
              fontWeight: 300,
              color: "#2A2A2A",
              lineHeight: "1.7",
              letterSpacing: "0.01em"
            }}>
              <p style={{ marginBottom: "16px" }}>
                {selectedEmail.preview}
              </p>
              <p style={{ marginBottom: "16px" }}>
                I hope this message finds you well. I wanted to reach out to discuss the exciting opportunities that lie ahead as you begin this new chapter in your journey.
              </p>
              <p style={{ marginBottom: "16px" }}>
                Our team has been working diligently to ensure that your transition is as smooth as possible. We understand that starting something new can be both exciting and challenging, which is why we're committed to providing you with all the support and resources you need.
              </p>
              <p style={{ marginBottom: "16px" }}>
                Looking forward to collaborating with you and seeing all the amazing things you'll accomplish.
              </p>
              <p style={{ fontWeight: 300, marginTop: "28px" }}>
                Best regards,<br />
                {selectedEmail.from}
              </p>
            </div>

            {/* Bottom Email Actions - Icon Only */}
            <div style={{
              marginTop: "32px",
              paddingTop: "20px",
              borderTop: "1px solid #F0EBE6",
              display: "flex",
              gap: "12px"
            }}>
              {[
                { icon: Reply, label: "Reply" },
                { icon: Forward, label: "Forward" },
                { icon: Archive, label: "Archive" },
                { icon: AlertCircle, label: "Spam" },
                { icon: Trash2, label: "Delete" },
                { icon: Pin, label: "Pin" },
                { icon: Star, label: "Star" },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => {
                    if (action.label === 'Reply') handleReply(selectedEmail.id);
                    else if (action.label === 'Forward') handleForward(selectedEmail.id);
                    else if (action.label === 'Archive') handleArchive(selectedEmail.id);
                    else if (action.label === 'Spam') handleSpam(selectedEmail.id);
                    else if (action.label === 'Delete') handleDelete(selectedEmail.id);
                    else if (action.label === 'Pin') handlePin(selectedEmail.id);
                    else if (action.label === 'Star') handleStar(selectedEmail.id);
                  }}
                  style={{
                    padding: 0,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    const icon = e.currentTarget.querySelector('svg') as any;
                    if (icon) icon.style.color = "#D89880";
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredTooltip({ label: action.label, x: rect.left + rect.width / 2, y: rect.bottom + 8 });
                  }}
                  onMouseLeave={(e) => {
                    const icon = e.currentTarget.querySelector('svg') as any;
                    if (icon) icon.style.color = "#999";
                    setHoveredTooltip(null);
                  }}
                >
                  <action.icon style={{ width: "16px", height: "16px", color: "#999", strokeWidth: 1.5, transition: "color 0.2s ease" }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Footer */}
      <div style={{
        background: "white",
        borderTop: "1px solid #F0EBE6",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{
          fontSize: "9px",
          fontWeight: 300,
          color: "#000000",
          letterSpacing: "0.02em"
        }}>
          © 2025 Triopia. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <a href="#" style={{
            fontSize: "9px",
            fontWeight: 300,
            color: "#000000",
            textDecoration: "none",
            letterSpacing: "0.02em"
          }}>
            Privacy Policy
          </a>
          <a href="#" style={{
            fontSize: "9px",
            fontWeight: 300,
            color: "#000000",
            textDecoration: "none",
            letterSpacing: "0.02em"
          }}>
            Terms of Service
          </a>
          <a href="#" style={{
            fontSize: "9px",
            fontWeight: 300,
            color: "#000000",
            textDecoration: "none",
            letterSpacing: "0.02em"
          }}>
            Contact
          </a>
        </div>
      </div>

      {/* Custom Tooltip */}
      {hoveredTooltip && (
        <div className="bg-tooltip-bg text-tooltip-foreground" style={{
          position: "fixed",
          left: `${hoveredTooltip.x}px`,
          top: `${hoveredTooltip.y}px`,
          transform: "translateX(-50%)",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "11px",
          fontWeight: 300,
          pointerEvents: "none",
          zIndex: 9999,
          whiteSpace: "nowrap"
        }}>
          {hoveredTooltip.label}
        </div>
      )}

      {/* Compose Email Slide-in Panel */}
      {showComposeModal && (
        <>
        {/* Overlay */}
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.2)",
          zIndex: 10000
        }} onClick={() => setShowComposeModal(false)} />
        {/* Slide-in Panel */}
        <div style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "500px",
          maxWidth: "90%",
          background: "white",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
          zIndex: 10001,
          display: "flex",
          flexDirection: "column",
          animation: "slideInRight 0.3s ease-out"
        }}>
            <div style={{
              padding: "20px",
              borderBottom: "1px solid #F0EBE6",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: 300, color: "#2A2A2A" }}>New Message</h3>
              <button onClick={() => setShowComposeModal(false)} style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "20px",
                color: "#999"
              }}>×</button>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ marginBottom: "16px" }}>
                <input type="text" placeholder="To" style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "2px solid #D89880",
                  borderRadius: "6px",
                  fontSize: "13px",
                  outline: "none"
                }} />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <input type="text" placeholder="Subject" style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "2px solid #D89880",
                  borderRadius: "6px",
                  fontSize: "13px",
                  outline: "none"
                }} />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <textarea placeholder="Compose email..." style={{
                  width: "100%",
                  padding: "14px",
                  border: "2px solid #D89880",
                  borderRadius: "6px",
                  fontSize: "13px",
                  minHeight: "250px",
                  fontFamily: "inherit",
                  resize: "vertical",
                  outline: "none"
                }} />
              </div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                <button onClick={() => setShowComposeModal(false)} style={{
                  padding: "8px 16px",
                  background: "transparent",
                  border: "1px solid #F0EBE6",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "#666"
                }}>Cancel</button>
                <button style={{
                  padding: "8px 16px",
                  background: "#D89880",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "white"
                }}>Send</button>
              </div>
            </div>
        </div>
        </>
      )}

      {/* AI Assistant Slide-in Panel */}
      {showAIPanel && (
        <>
        {/* Overlay */}
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.2)",
          zIndex: 10000
        }} onClick={() => setShowAIPanel(false)} />
        {/* Slide-in Panel */}
        <div style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "600px",
          maxWidth: "90%",
          background: "white",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
          zIndex: 10001,
          display: "flex",
          flexDirection: "column"
        }}>
          {/* Header */}
          <div style={{
            padding: "20px",
            borderBottom: "1px solid #F0EBE6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 300, color: "#2A2A2A" }}>AI Assistant</h3>
            <button onClick={() => setShowAIPanel(false)} style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              color: "#999"
            }}>×</button>
          </div>
          
          {/* Tabs */}
          <div style={{
            display: "flex",
            borderBottom: "1px solid #F0EBE6",
            padding: "0 20px"
          }}>
            {[
              { id: 'chat', label: 'Chat' },
              { id: 'triage', label: 'Smart Triage' },
              { id: 'quick-reply', label: 'Quick Reply' },
              { id: 'voice', label: 'Voice' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveAITab(tab.id as any)}
                style={{
                  padding: "12px 16px",
                  background: "none",
                  border: "none",
                  borderBottom: activeAITab === tab.id ? "2px solid #D89880" : "2px solid transparent",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: activeAITab === tab.id ? 400 : 300,
                  color: activeAITab === tab.id ? "#2A2A2A" : "#666",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
            {activeAITab === 'chat' && (
              <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ flex: 1, overflowY: "auto", marginBottom: "16px" }}>
                  <div style={{ padding: "12px", background: "#FFFBF7", borderRadius: "6px", marginBottom: "12px" }}>
                    <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>AI Assistant</p>
                    <p style={{ fontSize: "13px", color: "#2A2A2A" }}>How can I help you with your emails today?</p>
                  </div>
                </div>
                <div style={{ borderTop: "1px solid #F0EBE6", paddingTop: "12px" }}>
                  <textarea
                    placeholder="Ask AI anything about your emails..."
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #F0EBE6",
                      borderRadius: "6px",
                      fontSize: "13px",
                      minHeight: "80px",
                      resize: "vertical",
                      fontFamily: "inherit"
                    }}
                  />
                  <button style={{
                    marginTop: "8px",
                    padding: "8px 16px",
                    background: "#D89880",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "13px",
                    width: "100%"
                  }}>Send</button>
                </div>
              </div>
            )}
            {activeAITab === 'triage' && (
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: 400, color: "#2A2A2A", marginBottom: "16px" }}>Smart Email Triage</h4>
                <div style={{ display: "grid", gap: "12px" }}>
                  {['Urgent', 'VIP', 'Action Required', 'Opportunities'].map(category => (
                    <div key={category} style={{
                      padding: "12px",
                      background: "#FFFBF7",
                      border: "1px solid #F0EBE6",
                      borderRadius: "6px"
                    }}>
                      <div style={{ fontSize: "13px", fontWeight: 400, color: "#2A2A2A", marginBottom: "4px" }}>{category}</div>
                      <div style={{ fontSize: "11px", color: "#999" }}>0 emails</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeAITab === 'quick-reply' && (
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: 400, color: "#2A2A2A", marginBottom: "16px" }}>Quick Reply Suggestions</h4>
                <div style={{ display: "grid", gap: "8px" }}>
                  {['Thank you for reaching out', 'I\'ll get back to you soon', 'Let\'s schedule a call'].map(reply => (
                    <button key={reply} style={{
                      padding: "12px",
                      background: "#FFFBF7",
                      border: "1px solid #F0EBE6",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "12px",
                      color: "#2A2A2A",
                      textAlign: "left",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "#D89880"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "#F0EBE6"}
                    >{reply}</button>
                  ))}
                </div>
              </div>
            )}
            {activeAITab === 'voice' && (
              <div>
                <h4 style={{ fontSize: "14px", fontWeight: 400, color: "#2A2A2A", marginBottom: "16px" }}>Voice to Text</h4>
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "#FFFBF7",
                    border: "2px solid #D89880",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    cursor: "pointer"
                  }}>
                    <div style={{ fontSize: "32px" }}>🎤</div>
                  </div>
                  <p style={{ fontSize: "13px", color: "#666" }}>Click to start recording</p>
                </div>
              </div>
            )}
          </div>
        </div>
        </>
      )}
    </div>
  );
}
