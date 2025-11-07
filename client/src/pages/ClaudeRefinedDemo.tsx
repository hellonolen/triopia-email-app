import { useState } from 'react';
import { Star, Archive, Trash2, Send, Inbox, Mail, Clock, AlertCircle, CheckCircle2, Pause, Users, Calendar, Settings, Home, UserPlus } from 'lucide-react';

/**
 * Claude AI Aesthetic - Complete Interface
 * Colors: Warm Orange (#E07B53), Coral (#F4A582), Cream (#FFF8F0)
 * Typography: Pure black text, light weights
 * All original EmailApp features with Claude aesthetic
 */

interface Email {
  id: number;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  isStarred: boolean;
  isRead: boolean;
  isPaused?: boolean;
  isComplete?: boolean;
}

const mockEmails: Email[] = [
  { 
    id: 1, 
    sender: "Sarah Johnson", 
    senderEmail: "sarah@startup.com", 
    subject: "Welcome to your new chapter", 
    preview: "Excited to have you on board! Let's schedule a kickoff call...", 
    date: "Nov 6, 2:30 PM", 
    isStarred: true, 
    isRead: false,
    body: "Hi! Welcome to your new journey. Let's connect soon to discuss your goals and how we can help you succeed in this new chapter."
  },
  { 
    id: 2, 
    sender: "David Chen", 
    senderEmail: "david@company.com", 
    subject: "Q4 Marketing Strategy Review", 
    preview: "I wanted to share the preliminary results from our Q4 marketing campaign...", 
    date: "Nov 6, 1:15 PM", 
    isStarred: true, 
    isRead: true,
    body: "Here are the Q4 results. Overall performance exceeded expectations with a 23% increase in engagement."
  },
  { 
    id: 3, 
    sender: "Emily Rodriguez", 
    senderEmail: "emily@agency.co", 
    subject: "Project Update", 
    preview: "Let me know if this works for you. Looking forward to our meeting...", 
    date: "Nov 6, 12:48 PM", 
    isStarred: false, 
    isRead: false,
    body: "Quick update on the project timeline. We're on track for the November 15th deadline."
  },
];

export default function ClaudeRefinedDemo() {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email>(mockEmails[0]);
  const [emails, setEmails] = useState(mockEmails);

  const handleStar = (id: number) => {
    setEmails(emails.map(e => e.id === id ? { ...e, isStarred: !e.isStarred } : e));
  };

  const handlePause = (id: number) => {
    setEmails(emails.map(e => e.id === id ? { ...e, isPaused: !e.isPaused } : e));
  };

  const handleComplete = (id: number) => {
    setEmails(emails.map(e => e.id === id ? { ...e, isComplete: !e.isComplete } : e));
  };

  const folders = [
    { id: 'home', icon: Home, label: 'Home', count: 0 },
    { id: 'new-connections', icon: UserPlus, label: 'New Connections', count: 3 },
    { id: 'paused', icon: Pause, label: 'Paused', count: 5 },
    { id: 'priority', icon: AlertCircle, label: 'Priority', count: 1 },
    { id: 'inbox', icon: Inbox, label: 'Inbox', count: 18 },
    { id: 'sent', icon: Send, label: 'Sent', count: 0 },
    { id: 'contacts', icon: Users, label: 'Contacts', count: 0 },
    { id: 'calendar', icon: Calendar, label: 'Calendar', count: 0 },
    { id: 'starred', icon: Star, label: 'Starred', count: 1 },
    { id: 'archive', icon: Archive, label: 'Archive', count: 0 },
    { id: 'trash', icon: Trash2, label: 'Trash', count: 0 },
  ];

  return (
    <div style={{ 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column",
      background: "#FFF8F0",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Header */}
      <div style={{
        background: "white",
        borderBottom: "1px solid #F0EBE6",
        padding: "12px 24px"
      }}>
        <div className="flex items-center justify-between">
          <h1 style={{ 
            fontSize: "14px", 
            fontWeight: 300,
            color: "#000000",
            letterSpacing: "0.05em"
          }}>
            TRIOPIA
          </h1>
          <div style={{
            fontSize: "9px",
            fontWeight: 300,
            color: "#000000",
            letterSpacing: "0.02em"
          }}>
            New Chapter, New Email
          </div>
        </div>
      </div>

      <div className="flex" style={{ flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ 
          width: "220px",
          background: "white",
          borderRight: "1px solid #F0EBE6",
          padding: "16px 0",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {folders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className="flex items-center justify-between"
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  background: selectedFolder === folder.id ? "#FFF8F0" : "transparent",
                  borderLeft: selectedFolder === folder.id ? "2px solid #E07B53" : "2px solid transparent"
                }}
              >
                <div className="flex items-center gap-2">
                  <folder.icon style={{ width: "14px", height: "14px", color: "#000000", strokeWidth: 1.5 }} />
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 300,
                    color: "#000000",
                    letterSpacing: "0.02em"
                  }}>
                    {folder.label}
                  </span>
                </div>
                {folder.count > 0 && (
                  <span style={{
                    fontSize: "10px",
                    fontWeight: 300,
                    color: "#666"
                  }}>
                    {folder.count}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "auto", padding: "16px", borderTop: "1px solid #F0EBE6" }}>
            <div style={{ 
              fontSize: "9px",
              fontWeight: 300,
              color: "#000000",
              letterSpacing: "0.02em"
            }}>
              © 2025 Triopia. All rights reserved.
            </div>
          </div>
        </div>

        {/* Email List */}
        <div style={{ 
          width: "380px",
          background: "white",
          borderRight: "1px solid #F0EBE6",
          overflowY: "auto"
        }}>
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid #F0EBE6",
                cursor: "pointer",
                background: selectedEmail.id === email.id ? "#FFF8F0" : "white"
              }}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStar(email.id);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0
                    }}
                  >
                    <Star 
                      style={{ 
                        width: "14px", 
                        height: "14px", 
                        color: email.isStarred ? "#E07B53" : "#999",
                        fill: email.isStarred ? "#E07B53" : "none",
                        strokeWidth: 1.5
                      }} 
                    />
                  </button>
                  <span style={{
                    fontSize: "12px",
                    fontWeight: email.isRead ? 300 : 500,
                    color: "#000000"
                  }}>
                    {email.sender}
                  </span>
                </div>
                <span style={{
                  fontSize: "10px",
                  fontWeight: 300,
                  color: "#666"
                }}>
                  {email.date}
                </span>
              </div>
              <div style={{
                fontSize: "11px",
                fontWeight: email.isRead ? 300 : 500,
                color: "#000000",
                marginBottom: "4px"
              }}>
                {email.subject}
              </div>
              <div style={{
                fontSize: "10px",
                fontWeight: 300,
                color: "#666",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}>
                {email.preview}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePause(email.id);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0
                  }}
                >
                  <Pause 
                    style={{ 
                      width: "12px", 
                      height: "12px", 
                      color: email.isPaused ? "#E07B53" : "#ccc",
                      strokeWidth: 1.5
                    }} 
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleComplete(email.id);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0
                  }}
                >
                  <CheckCircle2 
                    style={{ 
                      width: "12px", 
                      height: "12px", 
                      color: email.isComplete ? "#E07B53" : "#ccc",
                      fill: email.isComplete ? "#E07B53" : "none",
                      strokeWidth: 1.5
                    }} 
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Email Detail */}
        <div style={{ 
          flex: 1,
          background: "white",
          overflowY: "auto",
          padding: "28px 36px"
        }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div className="flex items-center gap-3 mb-10">
              {[
                { icon: Archive, label: "Archive" },
                { icon: Trash2, label: "Delete" },
                { icon: Send, label: "Reply" },
              ].map((action) => (
                <button
                  key={action.label}
                  style={{
                    padding: "0",
                    background: "transparent",
                    border: "none",
                    color: "#000000",
                    fontSize: "10px",
                    fontWeight: 300,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#E07B53";
                    const underline = e.currentTarget.querySelector(".underline") as HTMLElement;
                    if (underline) underline.style.transform = "scaleX(1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#000000";
                    const underline = e.currentTarget.querySelector(".underline") as HTMLElement;
                    if (underline) underline.style.transform = "scaleX(0)";
                  }}
                >
                  <action.icon style={{ width: "14px", height: "14px", strokeWidth: 1.5 }} />
                  <span>{action.label}</span>
                  <div 
                    className="underline"
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: "#E07B53",
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  />
                </button>
              ))}
            </div>

            <h1 style={{ 
              fontSize: "32px", 
              fontWeight: 200,
              color: "#000000",
              marginBottom: "24px",
              lineHeight: 1.4
            }}>
              {selectedEmail.subject}
            </h1>

            <div className="flex items-center gap-3 mb-8">
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#E07B53",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 300,
                color: "white"
              }}>
                {selectedEmail.sender.charAt(0)}
              </div>
              <div>
                <div style={{
                  fontSize: "12px",
                  fontWeight: 300,
                  color: "#000000",
                  marginBottom: "2px"
                }}>
                  {selectedEmail.sender}
                </div>
                <div style={{
                  fontSize: "10px",
                  fontWeight: 300,
                  color: "#666"
                }}>
                  {selectedEmail.senderEmail}
                </div>
              </div>
              <div style={{
                marginLeft: "auto",
                fontSize: "10px",
                fontWeight: 300,
                color: "#666"
              }}>
                {selectedEmail.date}
              </div>
            </div>

            <div style={{
              fontSize: "14px",
              fontWeight: 300,
              color: "#000000",
              lineHeight: 1.7,
              whiteSpace: "pre-wrap"
            }}>
              {selectedEmail.body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
