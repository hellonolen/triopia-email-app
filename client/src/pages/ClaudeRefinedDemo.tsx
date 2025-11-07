import { useState, useEffect } from "react";
import { Mail, Send, Archive, Trash2, Star, Clock, CheckCircle2, Pause, Home, Inbox, Calendar, Users, Settings, Plus, UserPlus, Search, Zap, Check, Pencil, ChevronDown, ChevronRight, Pin, Info, FileText, HardDrive, BarChart3, Palette, AlertCircle, FilePen } from "lucide-react";

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
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.3s ease",
                  background: item.label === "Inbox" ? "#FFFBF7" : "transparent"
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon style={{ 
                      width: "14px", 
                      height: "14px",
                      color: item.label === "Inbox" ? "#D89880" : "#999",
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
                {/* Animated underline */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: "16px",
                  right: "16px",
                  height: "1px",
                  background: "#D89880",
                  transform: hoveredItem === item.label ? "scaleX(1)" : "scaleX(0)",
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
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3"
                style={{
                  padding: "8px 0",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  const span = e.currentTarget.querySelector("span");
                  if (span) span.style.color = "#2A2A2A";
                }}
                onMouseLeave={(e) => {
                  const span = e.currentTarget.querySelector("span");
                  if (span) span.style.color = "#666";
                }}
              >
                <item.icon style={{ width: "14px", height: "14px", color: "#999", strokeWidth: 1.5 }} />
                <span style={{
                  fontSize: "11px",
                  fontWeight: 300,
                  color: "#666",
                  letterSpacing: "0.02em",
                  transition: "color 0.3s ease"
                }}>
                  {item.label}
                </span>
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
              <div>
                <h2 style={{ 
                  fontSize: "22px", 
                  fontWeight: 200,
                  color: "#2A2A2A",
                  letterSpacing: "-0.02em",
                  marginBottom: "6px"
                }}>
                  Inbox
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
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0
                  }}
                >
                  <Search style={{ width: "14px", height: "14px", color: "#666", strokeWidth: 1.5 }} />
                </button>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0
                  }}
                >
                  <Pencil style={{ width: "14px", height: "14px", color: "#666", strokeWidth: 1.5 }} />
                </button>
              </div>
            </div>
          </div>

          <div>
            {mockEmails.map((email) => (
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
                    { icon: Send, label: "Reply" },
                    { icon: Mail, label: "Forward" },
                    { icon: Archive, label: "Archive" },
                    { icon: AlertCircle, label: "Spam" },
                    { icon: Trash2, label: "Delete" },
                    { icon: Pin, label: "Pin" },
                  ].map((action) => (
                    <button
                      key={action.label}
                      title={action.label}
                      onClick={(e) => { e.stopPropagation(); }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        const icon = e.currentTarget.querySelector('svg') as any;
                        if (icon) icon.style.color = "#D89880";
                      }}
                      onMouseLeave={(e) => {
                        const icon = e.currentTarget.querySelector('svg') as any;
                        if (icon) icon.style.color = "#999";
                      }}
                    >
                      <action.icon style={{ width: "14px", height: "14px", color: "#999", strokeWidth: 1.5, transition: "color 0.2s ease" }} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Detail - DRAMATICALLY COMPACT */}
        <div style={{ 
          flex: 1,
          maxWidth: "650px",
          background: "#FFFBF7",
          overflowY: "auto",
          padding: "28px 36px"
        }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
              {[
                { icon: Send, label: "Reply" },
                { icon: Mail, label: "Forward" },
                { icon: Archive, label: "Archive" },
                { icon: AlertCircle, label: "Spam" },
                { icon: Trash2, label: "Delete" },
                { icon: Pin, label: "Pin" },
              ].map((action) => (
                <button
                  key={action.label}
                  title={action.label}
                  style={{
                    padding: 0,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    const icon = e.currentTarget.querySelector('svg') as any;
                    if (icon) icon.style.color = "#D89880";
                  }}
                  onMouseLeave={(e) => {
                    const icon = e.currentTarget.querySelector('svg') as any;
                    if (icon) icon.style.color = "#999";
                  }}
                >
                  <action.icon style={{ width: "16px", height: "16px", color: "#999", strokeWidth: 1.5, transition: "color 0.2s ease" }} />
                </button>
              ))}
              </div>
              
              {/* Font Size Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEmailFontSize('small')}
                  style={{
                    padding: "3px 6px",
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
                    padding: "3px 6px",
                    background: emailFontSize === 'medium' ? "#FFFBF7" : "transparent",
                    border: "1px solid",
                    borderColor: emailFontSize === 'medium' ? "#D89880" : "#F0EBE6",
                    color: emailFontSize === 'medium' ? "#D89880" : "#999",
                    fontSize: "10px",
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
                    padding: "3px 6px",
                    background: emailFontSize === 'large' ? "#FFFBF7" : "transparent",
                    border: "1px solid",
                    borderColor: emailFontSize === 'large' ? "#D89880" : "#F0EBE6",
                    color: emailFontSize === 'large' ? "#D89880" : "#999",
                    fontSize: "11px",
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
                { icon: Send, label: "Reply" },
                { icon: Mail, label: "Forward" },
                { icon: Archive, label: "Archive" },
                { icon: AlertCircle, label: "Spam" },
                { icon: Trash2, label: "Delete" },
                { icon: Pin, label: "Pin" },
              ].map((action) => (
                <button
                  key={action.label}
                  title={action.label}
                  style={{
                    padding: 0,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    const icon = e.currentTarget.querySelector('svg') as any;
                    if (icon) icon.style.color = "#D89880";
                  }}
                  onMouseLeave={(e) => {
                    const icon = e.currentTarget.querySelector('svg') as any;
                    if (icon) icon.style.color = "#999";
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
    </div>
  );
}
