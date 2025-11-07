import { useState } from "react";
import { Mail, Send, Archive, Trash2, Star, Clock, CheckCircle2, Pause, Home, Inbox, Calendar, Users, Settings, Plus, UserPlus } from "lucide-react";

/**
 * Claude AI Aesthetic Design
 * 
 * Colors: Warm Orange (#E07B53), Coral (#F4A582), Cream (#FFF8F0), Soft Gray (#F5F3F0)
 * Typography: Clean, refined, light weights
 * Details: Animated underlines, minimal borders, warm and inviting
 */

const mockEmails = [
  { id: 1, from: "Sarah Johnson", email: "sarah@startup.com", subject: "Welcome to your new chapter", preview: "Excited to have you on board! Let's schedule a kickoff call...", time: "2:30 PM", unread: true, starred: false },
  { id: 2, from: "David Chen", email: "david@company.com", subject: "Q4 Marketing Strategy Review", preview: "I wanted to share the preliminary results from our Q4 marketing campaign...", time: "1h", unread: true, starred: true },
  { id: 3, from: "Emily Rodriguez", email: "emily@agency.co", subject: "Project Update", preview: "Let me know if this works for you. Looking forward to our meeting...", time: "27m", unread: false, starred: false },
];

export default function TomFordDemo() {
  const [selectedEmail, setSelectedEmail] = useState(mockEmails[0]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "#FFF8F0",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Header */}
      <div style={{ 
        background: "white",
        borderBottom: "1px solid #F0E8E0",
        padding: "20px 32px"
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #E07B53 0%, #F4A582 100%)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Mail style={{ width: "20px", height: "20px", color: "white" }} />
            </div>
            <h1 style={{ 
              fontSize: "22px", 
              fontWeight: 400,
              color: "#2A2A2A",
              letterSpacing: "-0.01em"
            }}>
              Triopia
            </h1>
          </div>
          <div style={{
            fontSize: "12px",
            fontWeight: 400,
            color: "#E07B53",
            background: "#FFF3ED",
            padding: "6px 14px",
            borderRadius: "16px"
          }}>
            Claude Aesthetic
          </div>
        </div>
      </div>

      <div className="flex" style={{ height: "calc(100vh - 77px)" }}>
        {/* Sidebar */}
        <div style={{ 
          width: "240px",
          background: "white",
          borderRight: "1px solid #F0E8E0",
          padding: "24px 0"
        }}>
          <div style={{ padding: "0 20px", marginBottom: "24px" }}>
            <button style={{
              width: "100%",
              background: "linear-gradient(135deg, #E07B53 0%, #F4A582 100%)",
              border: "none",
              color: "white",
              padding: "12px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 400,
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 8px rgba(224, 123, 83, 0.2)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(224, 123, 83, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(224, 123, 83, 0.2)";
            }}>
              <Plus className="inline" style={{ width: "16px", height: "16px", marginRight: "8px" }} />
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
                  padding: "12px 20px",
                  cursor: "pointer",
                  position: "relative",
                  transition: "all 0.2s ease",
                  background: item.label === "Inbox" ? "#FFF3ED" : "transparent"
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon style={{ 
                      width: "18px", 
                      height: "18px",
                      color: item.label === "Inbox" ? "#E07B53" : "#999"
                    }} />
                    <span style={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: item.label === "Inbox" ? "#E07B53" : "#666"
                    }}>
                      {item.label}
                    </span>
                  </div>
                  {item.count && (
                    <span style={{
                      fontSize: "12px",
                      fontWeight: 400,
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
                  left: "20px",
                  right: "20px",
                  height: "2px",
                  background: "linear-gradient(90deg, #E07B53 0%, #F4A582 100%)",
                  transform: hoveredItem === item.label ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: "24px", padding: "20px", borderTop: "1px solid #F0E8E0" }}>
            {[
              { icon: Calendar, label: "Calendar" },
              { icon: Users, label: "Contacts" },
              { icon: Settings, label: "Settings" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3"
                style={{
                  padding: "10px 0",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  const span = e.currentTarget.querySelector("span");
                  if (span) span.style.color = "#E07B53";
                }}
                onMouseLeave={(e) => {
                  const span = e.currentTarget.querySelector("span");
                  if (span) span.style.color = "#666";
                }}
              >
                <item.icon style={{ width: "18px", height: "18px", color: "#999" }} />
                <span style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#666",
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
          width: "380px",
          background: "white",
          borderRight: "1px solid #F0E8E0"
        }}>
          <div style={{ 
            padding: "28px 24px 20px",
            borderBottom: "1px solid #F0E8E0"
          }}>
            <h2 style={{ 
              fontSize: "28px", 
              fontWeight: 300,
              color: "#2A2A2A",
              letterSpacing: "-0.02em",
              marginBottom: "6px"
            }}>
              Inbox
            </h2>
            <p style={{ 
              fontSize: "13px", 
              fontWeight: 400,
              color: "#999"
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
                  padding: "18px 24px",
                  borderBottom: "1px solid #F8F6F4",
                  background: selectedEmail.id === email.id ? "#FFF8F0" : "white",
                  cursor: "pointer",
                  transition: "background 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  if (selectedEmail.id !== email.id) {
                    e.currentTarget.style.background = "#FFFCF8";
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
                      fontSize: "14px", 
                      fontWeight: email.unread ? 500 : 400,
                      color: "#2A2A2A",
                      marginBottom: "2px"
                    }}>
                      {email.from}
                    </div>
                    <div style={{ 
                      fontSize: "12px", 
                      fontWeight: 400,
                      color: "#999"
                    }}>
                      {email.email}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {email.starred && <Star style={{ width: "16px", height: "16px", color: "#E07B53", fill: "#E07B53" }} />}
                    <span style={{ fontSize: "12px", color: "#999", fontWeight: 400 }}>
                      {email.time}
                    </span>
                  </div>
                </div>
                <div style={{ 
                  fontSize: "14px", 
                  fontWeight: email.unread ? 500 : 400,
                  color: "#2A2A2A",
                  marginBottom: "6px"
                }}>
                  {email.subject}
                </div>
                <div style={{ 
                  fontSize: "13px", 
                  fontWeight: 400,
                  color: "#666",
                  lineHeight: "1.5"
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
          background: "#FFF8F0",
          overflowY: "auto",
          padding: "40px 56px"
        }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-2">
                {[
                  { icon: Archive, label: "Archive" },
                  { icon: Trash2, label: "Delete" },
                ].map((action) => (
                  <button
                    key={action.label}
                    style={{
                      padding: "10px 18px",
                      background: "white",
                      border: "1px solid #F0E8E0",
                      color: "#666",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontWeight: 400,
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#E07B53";
                      e.currentTarget.style.color = "#E07B53";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#F0E8E0";
                      e.currentTarget.style.color = "#666";
                    }}
                  >
                    <action.icon className="inline" style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                    {action.label}
                  </button>
                ))}
              </div>
              <button style={{
                padding: "10px 24px",
                background: "linear-gradient(135deg, #E07B53 0%, #F4A582 100%)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                fontSize: "13px",
                fontWeight: 400,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(224, 123, 83, 0.2)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(224, 123, 83, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(224, 123, 83, 0.2)";
              }}>
                Reply
              </button>
            </div>

            <h1 style={{ 
              fontSize: "36px", 
              fontWeight: 300,
              color: "#2A2A2A",
              lineHeight: "1.3",
              marginBottom: "28px",
              letterSpacing: "-0.02em"
            }}>
              {selectedEmail.subject}
            </h1>

            <div className="flex items-center gap-4 mb-10 pb-8" style={{ borderBottom: "1px solid #F0E8E0" }}>
              <div style={{
                width: "52px",
                height: "52px",
                background: "linear-gradient(135deg, #E07B53 0%, #F4A582 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 400,
                color: "white"
              }}>
                {selectedEmail.from.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 400, color: "#2A2A2A" }}>
                  {selectedEmail.from}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 400, color: "#999" }}>
                  {selectedEmail.email}
                </div>
              </div>
              <div className="ml-auto" style={{ fontSize: "13px", color: "#999", fontWeight: 400 }}>
                {selectedEmail.time}
              </div>
            </div>

            <div style={{ 
              fontSize: "16px", 
              fontWeight: 400,
              color: "#2A2A2A",
              lineHeight: "1.7",
              letterSpacing: "0.01em"
            }}>
              <p style={{ marginBottom: "20px" }}>
                {selectedEmail.preview}
              </p>
              <p style={{ marginBottom: "20px" }}>
                I hope this message finds you well. I wanted to reach out to discuss the exciting opportunities that lie ahead as you begin this new chapter in your journey.
              </p>
              <p style={{ marginBottom: "20px" }}>
                Our team has been working diligently to ensure that your transition is as smooth as possible. We understand that starting something new can be both exciting and challenging, which is why we're committed to providing you with all the support and resources you need.
              </p>
              <p style={{ marginBottom: "20px" }}>
                Looking forward to collaborating with you and seeing all the amazing things you'll accomplish.
              </p>
              <p style={{ fontWeight: 400, marginTop: "28px" }}>
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
