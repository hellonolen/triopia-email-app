import { useState } from "react";
import { Mail, Send, Archive, Trash2, Star, Clock, CheckCircle2, Pause, Home, Inbox, Calendar, Users, Settings, Plus, UserPlus } from "lucide-react";

/**
 * Claude AI - Ultra-Premium Refinement
 * 
 * Fintech Investor Quality - Exit Package Level
 * Colors: Muted Coral (#D89880), Soft Cream (#FFFBF7), Warm Gray (#F8F6F4)
 * Typography: Ultra-light (300), generous spacing, refined kerning
 * Details: Maximum whitespace, subtle shadows, executive presence
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
      {/* Header */}
      <div style={{ 
        background: "white",
        borderBottom: "1px solid #F0EBE6",
        padding: "28px 48px"
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div style={{
              width: "32px",
              height: "32px",
              background: "#D89880",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Mail style={{ width: "18px", height: "18px", color: "white" }} />
            </div>
            <h1 style={{ 
              fontSize: "20px", 
              fontWeight: 300,
              color: "#2A2A2A",
              letterSpacing: "0.02em"
            }}>
              Triopia
            </h1>
          </div>
          <div style={{
            fontSize: "11px",
            fontWeight: 300,
            color: "#D89880",
            letterSpacing: "0.15em",
            textTransform: "uppercase"
          }}>
            Claude Refined
          </div>
        </div>
      </div>

      <div className="flex" style={{ height: "calc(100vh - 85px)" }}>
        {/* Sidebar */}
        <div style={{ 
          width: "260px",
          background: "white",
          borderRight: "1px solid #F0EBE6",
          padding: "36px 0"
        }}>
          <div style={{ padding: "0 28px", marginBottom: "36px" }}>
            <button style={{
              width: "100%",
              background: "#D89880",
              border: "none",
              color: "white",
              padding: "14px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 300,
              letterSpacing: "0.05em",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 1px 3px rgba(216, 152, 128, 0.12)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(216, 152, 128, 0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(216, 152, 128, 0.12)";
            }}>
              <Plus className="inline" style={{ width: "15px", height: "15px", marginRight: "8px" }} />
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
                  padding: "16px 28px",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.3s ease",
                  background: item.label === "Inbox" ? "#FFFBF7" : "transparent"
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <item.icon style={{ 
                      width: "17px", 
                      height: "17px",
                      color: item.label === "Inbox" ? "#D89880" : "#999",
                      strokeWidth: 1.5
                    }} />
                    <span style={{
                      fontSize: "13px",
                      fontWeight: 300,
                      color: item.label === "Inbox" ? "#D89880" : "#666",
                      letterSpacing: "0.02em"
                    }}>
                      {item.label}
                    </span>
                  </div>
                  {item.count && (
                    <span style={{
                      fontSize: "11px",
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
                  left: "28px",
                  right: "28px",
                  height: "1px",
                  background: "#D89880",
                  transform: hoveredItem === item.label ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                }} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: "36px", padding: "28px", borderTop: "1px solid #F0EBE6" }}>
            {[
              { icon: Calendar, label: "Calendar" },
              { icon: Users, label: "Contacts" },
              { icon: Settings, label: "Settings" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4"
                style={{
                  padding: "14px 0",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  const span = e.currentTarget.querySelector("span");
                  if (span) span.style.color = "#D89880";
                }}
                onMouseLeave={(e) => {
                  const span = e.currentTarget.querySelector("span");
                  if (span) span.style.color = "#666";
                }}
              >
                <item.icon style={{ width: "17px", height: "17px", color: "#999", strokeWidth: 1.5 }} />
                <span style={{
                  fontSize: "13px",
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

        {/* Email List */}
        <div style={{ 
          width: "420px",
          background: "white",
          borderRight: "1px solid #F0EBE6"
        }}>
          <div style={{ 
            padding: "40px 32px 28px",
            borderBottom: "1px solid #F0EBE6"
          }}>
            <h2 style={{ 
              fontSize: "32px", 
              fontWeight: 200,
              color: "#2A2A2A",
              letterSpacing: "-0.02em",
              marginBottom: "10px"
            }}>
              Inbox
            </h2>
            <p style={{ 
              fontSize: "12px", 
              fontWeight: 300,
              color: "#999",
              letterSpacing: "0.03em"
            }}>
              12 unread messages
            </p>
          </div>

          <div>
            {mockEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                style={{
                  padding: "28px 32px",
                  borderBottom: "1px solid #F8F6F4",
                  background: selectedEmail.id === email.id ? "#FFFBF7" : "white",
                  cursor: "pointer",
                  transition: "background 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  if (selectedEmail.id !== email.id) {
                    e.currentTarget.style.background = "#FFFEFA";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedEmail.id !== email.id) {
                    e.currentTarget.style.background = "white";
                  }
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div style={{ 
                      fontSize: "14px", 
                      fontWeight: email.unread ? 400 : 300,
                      color: "#2A2A2A",
                      marginBottom: "4px",
                      letterSpacing: "0.01em"
                    }}>
                      {email.from}
                    </div>
                    <div style={{ 
                      fontSize: "12px", 
                      fontWeight: 300,
                      color: "#999"
                    }}>
                      {email.email}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {email.starred && <Star style={{ width: "15px", height: "15px", color: "#D89880", fill: "#D89880", strokeWidth: 1.5 }} />}
                    <span style={{ fontSize: "11px", color: "#999", fontWeight: 300 }}>
                      {email.time}
                    </span>
                  </div>
                </div>
                <div style={{ 
                  fontSize: "14px", 
                  fontWeight: email.unread ? 400 : 300,
                  color: "#2A2A2A",
                  marginBottom: "10px",
                  lineHeight: "1.5",
                  letterSpacing: "0.01em"
                }}>
                  {email.subject}
                </div>
                <div style={{ 
                  fontSize: "13px", 
                  fontWeight: 300,
                  color: "#666",
                  lineHeight: "1.7",
                  letterSpacing: "0.01em"
                }}>
                  {email.preview}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Detail */}
        <div style={{ 
          flex: 1,
          background: "#FFFBF7",
          overflowY: "auto",
          padding: "56px 72px"
        }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center gap-3">
                {[
                  { icon: Archive, label: "Archive" },
                  { icon: Trash2, label: "Delete" },
                ].map((action) => (
                  <button
                    key={action.label}
                    style={{
                      padding: "12px 24px",
                      background: "white",
                      border: "1px solid #F0EBE6",
                      color: "#666",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 300,
                      letterSpacing: "0.05em",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#D89880";
                      e.currentTarget.style.color = "#D89880";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(216, 152, 128, 0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#F0EBE6";
                      e.currentTarget.style.color = "#666";
                      e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.04)";
                    }}
                  >
                    <action.icon className="inline" style={{ width: "15px", height: "15px", marginRight: "8px", strokeWidth: 1.5 }} />
                    {action.label}
                  </button>
                ))}
              </div>
              <button style={{
                padding: "12px 32px",
                background: "#D89880",
                border: "none",
                borderRadius: "8px",
                color: "white",
                fontSize: "12px",
                fontWeight: 300,
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 2px 8px rgba(216, 152, 128, 0.2)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(216, 152, 128, 0.28)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(216, 152, 128, 0.2)";
              }}>
                Reply
              </button>
            </div>

            <h1 style={{ 
              fontSize: "42px", 
              fontWeight: 200,
              color: "#2A2A2A",
              lineHeight: "1.3",
              marginBottom: "40px",
              letterSpacing: "-0.02em"
            }}>
              {selectedEmail.subject}
            </h1>

            <div className="flex items-center gap-5 mb-16 pb-12" style={{ borderBottom: "1px solid #F0EBE6" }}>
              <div style={{
                width: "56px",
                height: "56px",
                background: "#D89880",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "17px",
                fontWeight: 300,
                color: "white"
              }}>
                {selectedEmail.from.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 300, color: "#2A2A2A", letterSpacing: "0.01em" }}>
                  {selectedEmail.from}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 300, color: "#999", marginTop: "2px" }}>
                  {selectedEmail.email}
                </div>
              </div>
              <div className="ml-auto" style={{ fontSize: "12px", color: "#999", fontWeight: 300 }}>
                {selectedEmail.time}
              </div>
            </div>

            <div style={{ 
              fontSize: "16px", 
              fontWeight: 300,
              color: "#2A2A2A",
              lineHeight: "2",
              letterSpacing: "0.01em"
            }}>
              <p style={{ marginBottom: "32px" }}>
                {selectedEmail.preview}
              </p>
              <p style={{ marginBottom: "32px" }}>
                I hope this message finds you well. I wanted to reach out to discuss the exciting opportunities that lie ahead as you begin this new chapter in your journey.
              </p>
              <p style={{ marginBottom: "32px" }}>
                Our team has been working diligently to ensure that your transition is as smooth as possible. We understand that starting something new can be both exciting and challenging, which is why we're committed to providing you with all the support and resources you need.
              </p>
              <p style={{ marginBottom: "32px" }}>
                Looking forward to collaborating with you and seeing all the amazing things you'll accomplish.
              </p>
              <p style={{ fontWeight: 300, marginTop: "48px" }}>
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
