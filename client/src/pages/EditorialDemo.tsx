import { useState } from "react";
import { Mail, Send, Archive, Trash2, Star, Clock, CheckCircle2, Pause, Home, Inbox, Calendar, Users, Settings, Plus, UserPlus } from "lucide-react";

/**
 * Editorial Fashion Design
 * 
 * Colors: Black (#000), White (#FFF), Red Accent (#E63946)
 * Typography: Bold, high contrast, magazine-quality
 * Details: Animated underlines, editorial layout, fashion-forward
 */

const mockEmails = [
  { id: 1, from: "Sarah Johnson", email: "sarah@startup.com", subject: "Welcome to your new chapter", preview: "Excited to have you on board! Let's schedule a kickoff call...", time: "2:30 PM", unread: true, starred: false },
  { id: 2, from: "David Chen", email: "david@company.com", subject: "Q4 Marketing Strategy Review", preview: "I wanted to share the preliminary results from our Q4 marketing campaign...", time: "1h", unread: true, starred: true },
  { id: 3, from: "Emily Rodriguez", email: "emily@agency.co", subject: "Project Update", preview: "Let me know if this works for you. Looking forward to our meeting...", time: "27m", unread: false, starred: false },
];

export default function EditorialDemo() {
  const [selectedEmail, setSelectedEmail] = useState(mockEmails[0]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "white",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Header */}
      <div style={{ 
        background: "black",
        padding: "20px 40px",
        borderBottom: "3px solid #E63946"
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <h1 style={{ 
              fontSize: "24px", 
              fontWeight: 700,
              color: "white",
              letterSpacing: "0.05em"
            }}>
              TRIOPIA
            </h1>
          </div>
          <div style={{
            fontSize: "10px",
            fontWeight: 700,
            color: "#E63946",
            letterSpacing: "0.15em"
          }}>
            EDITORIAL
          </div>
        </div>
      </div>

      <div className="flex" style={{ height: "calc(100vh - 67px)" }}>
        {/* Sidebar */}
        <div style={{ 
          width: "260px",
          background: "#FAFAFA",
          borderRight: "1px solid #E0E0E0",
          padding: "28px 0"
        }}>
          <div style={{ padding: "0 24px", marginBottom: "28px" }}>
            <button style={{
              width: "100%",
              background: "black",
              border: "none",
              color: "white",
              padding: "14px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#E63946";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "black";
            }}>
              <Plus className="inline" style={{ width: "16px", height: "16px", marginRight: "8px" }} />
              COMPOSE
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
                  padding: "14px 24px",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.2s ease",
                  background: item.label === "Inbox" ? "white" : "transparent"
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon style={{ 
                      width: "18px", 
                      height: "18px",
                      color: item.label === "Inbox" ? "#E63946" : "#666"
                    }} />
                    <span style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: item.label === "Inbox" ? "black" : "#666",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase"
                    }}>
                      {item.label}
                    </span>
                  </div>
                  {item.count && (
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#E63946",
                      background: "white",
                      padding: "2px 8px",
                      borderRadius: "10px"
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
                  height: "2px",
                  background: "#E63946",
                  transform: hoveredItem === item.label ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: "28px", padding: "24px", borderTop: "1px solid #E0E0E0" }}>
            {[
              { icon: Calendar, label: "Calendar" },
              { icon: Users, label: "Contacts" },
              { icon: Settings, label: "Settings" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3"
                style={{
                  padding: "12px 0",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  const span = e.currentTarget.querySelector("span");
                  if (span) span.style.color = "black";
                }}
                onMouseLeave={(e) => {
                  const span = e.currentTarget.querySelector("span");
                  if (span) span.style.color = "#666";
                }}
              >
                <item.icon style={{ width: "18px", height: "18px", color: "#666" }} />
                <span style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#666",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
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
          width: "420px",
          background: "white",
          borderRight: "1px solid #E0E0E0"
        }}>
          <div style={{ 
            padding: "32px 28px 20px",
            borderBottom: "2px solid black"
          }}>
            <h2 style={{ 
              fontSize: "32px", 
              fontWeight: 700,
              color: "black",
              letterSpacing: "-0.02em",
              marginBottom: "6px"
            }}>
              INBOX
            </h2>
            <p style={{ 
              fontSize: "12px", 
              fontWeight: 600,
              color: "#666",
              letterSpacing: "0.05em",
              textTransform: "uppercase"
            }}>
              12 Unread Messages
            </p>
          </div>

          <div>
            {mockEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                style={{
                  padding: "24px 28px",
                  borderBottom: "1px solid #F0F0F0",
                  background: selectedEmail.id === email.id ? "#FAFAFA" : "white",
                  borderLeft: selectedEmail.id === email.id ? "4px solid #E63946" : "4px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
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
                      fontSize: "13px", 
                      fontWeight: 700,
                      color: "black",
                      marginBottom: "3px",
                      letterSpacing: "0.02em",
                      textTransform: "uppercase"
                    }}>
                      {email.from}
                    </div>
                    <div style={{ 
                      fontSize: "12px", 
                      fontWeight: 400,
                      color: "#666"
                    }}>
                      {email.email}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {email.starred && <Star style={{ width: "16px", height: "16px", color: "#E63946", fill: "#E63946" }} />}
                    <span style={{ fontSize: "11px", color: "#999", fontWeight: 600 }}>
                      {email.time}
                    </span>
                  </div>
                </div>
                <div style={{ 
                  fontSize: "15px", 
                  fontWeight: email.unread ? 600 : 400,
                  color: "black",
                  marginBottom: "8px",
                  lineHeight: "1.4"
                }}>
                  {email.subject}
                </div>
                <div style={{ 
                  fontSize: "13px", 
                  fontWeight: 400,
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
          background: "white",
          overflowY: "auto",
          padding: "48px 64px"
        }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                {[
                  { icon: Archive, label: "Archive" },
                  { icon: Trash2, label: "Delete" },
                ].map((action) => (
                  <button
                    key={action.label}
                    style={{
                      padding: "10px 20px",
                      background: "white",
                      border: "2px solid black",
                      color: "black",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "black";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "white";
                      e.currentTarget.style.color = "black";
                    }}
                  >
                    <action.icon className="inline" style={{ width: "14px", height: "14px", marginRight: "6px" }} />
                    {action.label.toUpperCase()}
                  </button>
                ))}
              </div>
              <button style={{
                padding: "10px 28px",
                background: "#E63946",
                border: "none",
                color: "white",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D62839";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#E63946";
              }}>
                REPLY
              </button>
            </div>

            <h1 style={{ 
              fontSize: "42px", 
              fontWeight: 700,
              color: "black",
              lineHeight: "1.2",
              marginBottom: "32px",
              letterSpacing: "-0.02em"
            }}>
              {selectedEmail.subject}
            </h1>

            <div className="flex items-center gap-5 mb-12 pb-10" style={{ borderBottom: "2px solid black" }}>
              <div style={{
                width: "60px",
                height: "60px",
                background: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 700,
                color: "white"
              }}>
                {selectedEmail.from.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "black", letterSpacing: "0.02em" }}>
                  {selectedEmail.from.toUpperCase()}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 400, color: "#666" }}>
                  {selectedEmail.email}
                </div>
              </div>
              <div className="ml-auto" style={{ fontSize: "12px", color: "#666", fontWeight: 600 }}>
                {selectedEmail.time}
              </div>
            </div>

            <div style={{ 
              fontSize: "16px", 
              fontWeight: 400,
              color: "#333",
              lineHeight: "1.8",
              letterSpacing: "0.01em"
            }}>
              <p style={{ marginBottom: "24px" }}>
                {selectedEmail.preview}
              </p>
              <p style={{ marginBottom: "24px" }}>
                I hope this message finds you well. I wanted to reach out to discuss the exciting opportunities that lie ahead as you begin this new chapter in your journey.
              </p>
              <p style={{ marginBottom: "24px" }}>
                Our team has been working diligently to ensure that your transition is as smooth as possible. We understand that starting something new can be both exciting and challenging, which is why we're committed to providing you with all the support and resources you need.
              </p>
              <p style={{ marginBottom: "24px" }}>
                Looking forward to collaborating with you and seeing all the amazing things you'll accomplish.
              </p>
              <p style={{ fontWeight: 600, marginTop: "32px" }}>
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
