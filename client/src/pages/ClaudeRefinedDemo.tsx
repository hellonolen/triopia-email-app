import { useState } from "react";
import { Mail, Send, Archive, Trash2, Star, Clock, CheckCircle2, Pause, Home, Inbox, Calendar, Users, Settings, Plus, UserPlus } from "lucide-react";

/**
 * Claude AI - DRAMATICALLY Refined
 * 
 * OVERT REFINEMENT: 40-50% reduction in all spacing/sizing
 * Colors: Muted Coral (#D89880), Cream (#FFFBF7)
 * Typography: Ultra-light (200-300), TIGHT spacing
 * Details: Minimal padding, compact layout, executive density
 */

const mockEmails = [
  { id: 1, from: "Sarah Johnson", email: "sarah@startup.com", subject: "Welcome to your new chapter", preview: "Excited to have you on board! Let's schedule a kickoff call...", time: "2:30 PM", unread: true, starred: false },
  { id: 2, from: "David Chen", email: "david@company.com", subject: "Q4 Marketing Strategy Review", preview: "I wanted to share the preliminary results from our Q4 marketing campaign...", time: "1h", unread: true, starred: true },
  { id: 3, from: "Emily Rodriguez", email: "emily@agency.co", subject: "Project Update", preview: "Let me know if this works for you. Looking forward to our meeting...", time: "27m", unread: false, starred: false },
];

export default function ClaudeRefinedDemo() {
  const [selectedEmail, setSelectedEmail] = useState(mockEmails[0]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "#FFFBF7",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Header - DRAMATICALLY COMPACT */}
      <div style={{ 
        background: "white",
        borderBottom: "1px solid #F0EBE6",
        padding: "12px 24px"
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{
              width: "24px",
              height: "24px",
              background: "#D89880",
              borderRadius: "50%"
            }} />
            <h1 style={{ 
              fontSize: "14px", 
              fontWeight: 300,
              color: "#2A2A2A",
              letterSpacing: "0.05em"
            }}>
              TRIOPIA
            </h1>
          </div>
          <div style={{
            fontSize: "9px",
            fontWeight: 300,
            color: "#999",
            letterSpacing: "0.15em",
            textTransform: "uppercase"
          }}>
            Claude Aesthetic
          </div>
        </div>
      </div>

      <div className="flex" style={{ height: "calc(100vh - 49px)" }}>
        {/* Sidebar - DRAMATICALLY NARROW */}
        <div style={{ 
          width: "220px",
          background: "white",
          borderRight: "1px solid #F0EBE6",
          padding: "16px 0"
        }}>
          <div style={{ padding: "0 16px", marginBottom: "16px" }}>
            <button style={{
              width: "100%",
              background: "#D89880",
              border: "none",
              color: "white",
              padding: "10px",
              borderRadius: "4px",
              fontSize: "10px",
              fontWeight: 300,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C88870";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#D89880";
            }}>
              <Plus className="inline" style={{ width: "12px", height: "12px", marginRight: "6px" }} />
              Compose
            </button>
          </div>

          <div>
            {[
              { icon: Home, label: "Fresh Start", count: null },
              { icon: Inbox, label: "Inbox", count: 12 },
              { icon: Star, label: "Starred", count: 3 },
              { icon: UserPlus, label: "New Connections", count: 5 },
              { icon: Pause, label: "Paused", count: 2 },
              { icon: CheckCircle2, label: "Complete", count: 8 },
              { icon: Send, label: "Sent", count: null },
              { icon: Archive, label: "Archive", count: null },
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

          <div style={{ marginTop: "16px", padding: "16px", borderTop: "1px solid #F0EBE6" }}>
            {[
              { icon: Calendar, label: "Calendar" },
              { icon: Users, label: "Contacts" },
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
          width: "380px",
          background: "white",
          borderRight: "1px solid #F0EBE6"
        }}>
          <div style={{ 
            padding: "20px 16px 14px",
            borderBottom: "1px solid #F0EBE6"
          }}>
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

          <div>
            {mockEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #F8F6F4",
                  background: selectedEmail.id === email.id ? "#FFFBF7" : "white",
                  cursor: "pointer",
                  transition: "background 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  if (selectedEmail.id !== email.id) {
                    e.currentTarget.style.background = "#FCFCFC";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedEmail.id !== email.id) {
                    e.currentTarget.style.background = "white";
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
                  letterSpacing: "0.005em"
                }}>
                  {email.preview}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Detail - DRAMATICALLY COMPACT */}
        <div style={{ 
          flex: 1,
          background: "#FFFBF7",
          overflowY: "auto",
          padding: "28px 36px"
        }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                {[
                  { icon: Archive, label: "Archive" },
                  { icon: Trash2, label: "Delete" },
                ].map((action) => (
                  <button
                    key={action.label}
                    style={{
                      padding: "8px 16px",
                      background: "white",
                      border: "1px solid #F0EBE6",
                      color: "#666",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: 300,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#D89880";
                      e.currentTarget.style.color = "#D89880";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#F0EBE6";
                      e.currentTarget.style.color = "#666";
                    }}
                  >
                    <action.icon className="inline" style={{ width: "12px", height: "12px", marginRight: "6px", strokeWidth: 1.5 }} />
                    {action.label}
                  </button>
                ))}
              </div>
              <button style={{
                padding: "8px 20px",
                background: "#D89880",
                border: "none",
                borderRadius: "4px",
                color: "white",
                fontSize: "10px",
                fontWeight: 300,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C88870";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#D89880";
              }}>
                Reply
              </button>
            </div>

            <h1 style={{ 
              fontSize: "32px", 
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
              fontSize: "14px", 
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
          </div>
        </div>
      </div>
    </div>
  );
}
