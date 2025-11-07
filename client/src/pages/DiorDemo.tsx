import { useState } from "react";
import { Mail, Send, Archive, Trash2, Star, Clock, CheckCircle2, Pause, Home, Inbox, Calendar, Users, Settings, Plus, UserPlus } from "lucide-react";

/**
 * Dior Elegance Design
 * 
 * Colors: Soft Grays (#F7F7F7, #E5E5E5), Charcoal (#333), Subtle Blue Accent (#8B9DC3)
 * Typography: Ultra-light weights (200-300), generous spacing
 * Details: Animated underlines, minimal design, sophisticated elegance
 */

const mockEmails = [
  { id: 1, from: "Sarah Johnson", email: "sarah@startup.com", subject: "Welcome to your new chapter", preview: "Excited to have you on board! Let's schedule a kickoff call...", time: "2:30 PM", unread: true, starred: false },
  { id: 2, from: "David Chen", email: "david@company.com", subject: "Q4 Marketing Strategy Review", preview: "I wanted to share the preliminary results from our Q4 marketing campaign...", time: "1h", unread: true, starred: true },
  { id: 3, from: "Emily Rodriguez", email: "emily@agency.co", subject: "Project Update", preview: "Let me know if this works for you. Looking forward to our meeting...", time: "27m", unread: false, starred: false },
];

export default function DiorDemo() {
  const [selectedEmail, setSelectedEmail] = useState(mockEmails[0]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "#FAFAFA",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Header */}
      <div style={{ 
        background: "white",
        borderBottom: "1px solid #E8E8E8",
        padding: "24px 40px"
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div style={{
              width: "32px",
              height: "32px",
              border: "1px solid #333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Mail style={{ width: "16px", height: "16px", color: "#333" }} />
            </div>
            <h1 style={{ 
              fontSize: "18px", 
              fontWeight: 200,
              color: "#333",
              letterSpacing: "0.15em",
              textTransform: "uppercase"
            }}>
              Triopia
            </h1>
          </div>
          <div style={{
            fontSize: "10px",
            fontWeight: 300,
            color: "#8B9DC3",
            letterSpacing: "0.2em",
            textTransform: "uppercase"
          }}>
            Dior Elegance
          </div>
        </div>
      </div>

      <div className="flex" style={{ height: "calc(100vh - 89px)" }}>
        {/* Sidebar */}
        <div style={{ 
          width: "220px",
          background: "white",
          borderRight: "1px solid #E8E8E8",
          padding: "32px 0"
        }}>
          <div style={{ padding: "0 24px", marginBottom: "32px" }}>
            <button style={{
              width: "100%",
              background: "#333",
              border: "none",
              color: "white",
              padding: "14px",
              fontSize: "11px",
              fontWeight: 300,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#222";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#333";
            }}>
              <Plus className="inline" style={{ width: "14px", height: "14px", marginRight: "8px" }} />
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
                  padding: "16px 24px",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.2s ease"
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon style={{ 
                      width: "16px", 
                      height: "16px",
                      color: item.label === "Inbox" ? "#8B9DC3" : "#999"
                    }} />
                    <span style={{
                      fontSize: "13px",
                      fontWeight: 300,
                      color: item.label === "Inbox" ? "#333" : "#666",
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
                  left: "24px",
                  right: "24px",
                  height: "1px",
                  background: "#8B9DC3",
                  transform: hoveredItem === item.label ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                }} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: "32px", padding: "24px", borderTop: "1px solid #E8E8E8" }}>
            {[
              { icon: Calendar, label: "Calendar" },
              { icon: Users, label: "Contacts" },
              { icon: Settings, label: "Settings" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3"
                style={{
                  padding: "14px 0",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  const span = e.currentTarget.querySelector("span");
                  if (span) span.style.color = "#333";
                }}
                onMouseLeave={(e) => {
                  const span = e.currentTarget.querySelector("span");
                  if (span) span.style.color = "#666";
                }}
              >
                <item.icon style={{ width: "16px", height: "16px", color: "#999" }} />
                <span style={{
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "#666",
                  letterSpacing: "0.02em",
                  transition: "color 0.2s ease"
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Email List */}
        <div style={{ 
          width: "360px",
          background: "white",
          borderRight: "1px solid #E8E8E8"
        }}>
          <div style={{ 
            padding: "36px 28px 24px",
            borderBottom: "1px solid #E8E8E8"
          }}>
            <h2 style={{ 
              fontSize: "26px", 
              fontWeight: 200,
              color: "#333",
              letterSpacing: "-0.01em",
              marginBottom: "8px"
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
                  padding: "24px 28px",
                  borderBottom: "1px solid #F5F5F5",
                  background: selectedEmail.id === email.id ? "#FAFAFA" : "white",
                  cursor: "pointer",
                  transition: "background 0.2s ease"
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
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div style={{ 
                      fontSize: "14px", 
                      fontWeight: email.unread ? 400 : 300,
                      color: "#333",
                      marginBottom: "3px"
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
                  <div className="flex items-center gap-2">
                    {email.starred && <Star style={{ width: "14px", height: "14px", color: "#8B9DC3", fill: "#8B9DC3" }} />}
                    <span style={{ fontSize: "11px", color: "#999", fontWeight: 300 }}>
                      {email.time}
                    </span>
                  </div>
                </div>
                <div style={{ 
                  fontSize: "14px", 
                  fontWeight: email.unread ? 400 : 300,
                  color: "#333",
                  marginBottom: "8px"
                }}>
                  {email.subject}
                </div>
                <div style={{ 
                  fontSize: "13px", 
                  fontWeight: 300,
                  color: "#666",
                  lineHeight: "1.6"
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
          background: "#FAFAFA",
          overflowY: "auto",
          padding: "56px 72px"
        }}>
          <div style={{ maxWidth: "640px", margin: "0 auto" }}>
            <div className="flex items-center justify-between mb-14">
              <div className="flex items-center gap-3">
                {[
                  { icon: Archive, label: "Archive" },
                  { icon: Trash2, label: "Delete" },
                ].map((action) => (
                  <button
                    key={action.label}
                    style={{
                      padding: "12px 22px",
                      background: "white",
                      border: "1px solid #E8E8E8",
                      color: "#666",
                      fontSize: "11px",
                      fontWeight: 300,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#333";
                      e.currentTarget.style.color = "#333";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#E8E8E8";
                      e.currentTarget.style.color = "#666";
                    }}
                  >
                    <action.icon className="inline" style={{ width: "14px", height: "14px", marginRight: "8px" }} />
                    {action.label}
                  </button>
                ))}
              </div>
              <button style={{
                padding: "12px 28px",
                background: "#333",
                border: "none",
                color: "white",
                fontSize: "11px",
                fontWeight: 300,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#222";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#333";
              }}>
                Reply
              </button>
            </div>

            <h1 style={{ 
              fontSize: "38px", 
              fontWeight: 200,
              color: "#333",
              lineHeight: "1.3",
              marginBottom: "36px",
              letterSpacing: "-0.02em"
            }}>
              {selectedEmail.subject}
            </h1>

            <div className="flex items-center gap-5 mb-12 pb-10" style={{ borderBottom: "1px solid #E8E8E8" }}>
              <div style={{
                width: "56px",
                height: "56px",
                border: "1px solid #E8E8E8",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: 300,
                color: "#666"
              }}>
                {selectedEmail.from.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 300, color: "#333" }}>
                  {selectedEmail.from}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 300, color: "#999" }}>
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
              color: "#333",
              lineHeight: "1.9",
              letterSpacing: "0.01em"
            }}>
              <p style={{ marginBottom: "28px" }}>
                {selectedEmail.preview}
              </p>
              <p style={{ marginBottom: "28px" }}>
                I hope this message finds you well. I wanted to reach out to discuss the exciting opportunities that lie ahead as you begin this new chapter in your journey.
              </p>
              <p style={{ marginBottom: "28px" }}>
                Our team has been working diligently to ensure that your transition is as smooth as possible. We understand that starting something new can be both exciting and challenging, which is why we're committed to providing you with all the support and resources you need.
              </p>
              <p style={{ marginBottom: "28px" }}>
                Looking forward to collaborating with you and seeing all the amazing things you'll accomplish.
              </p>
              <p style={{ fontWeight: 300, marginTop: "36px" }}>
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
