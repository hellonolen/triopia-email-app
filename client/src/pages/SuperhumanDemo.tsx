import { useState } from "react";
import { Mail, Send, Archive, Trash2, Star, Clock, CheckCircle2, Pause, Home, Inbox, Calendar, Users, Settings, Plus, UserPlus } from "lucide-react";

/**
 * Superhuman Refined Design
 * 
 * Colors: Deep Blue (#0A2540), Bright Blue (#00A4FF), White, Light Gray (#F6F8FA)
 * Typography: Medium weights (400-500), crisp and clean
 * Details: Subtle animations, keyboard-first aesthetic, speed-focused
 */

const mockEmails = [
  { id: 1, from: "Sarah Johnson", email: "sarah@startup.com", subject: "Welcome to your new chapter", preview: "Excited to have you on board! Let's schedule a kickoff call...", time: "2:30 PM", unread: true, starred: false },
  { id: 2, from: "David Chen", email: "david@company.com", subject: "Q4 Marketing Strategy Review", preview: "I wanted to share the preliminary results from our Q4 marketing campaign...", time: "1h", unread: true, starred: true },
  { id: 3, from: "Emily Rodriguez", email: "emily@agency.co", subject: "Project Update", preview: "Let me know if this works for you. Looking forward to our meeting...", time: "27m", unread: false, starred: false },
];

export default function SuperhumanDemo() {
  const [selectedEmail, setSelectedEmail] = useState(mockEmails[0]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div style={{ 
      minHeight: "100vh",
      background: "#F6F8FA",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Header */}
      <div style={{ 
        background: "#0A2540",
        padding: "16px 32px"
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div style={{
              width: "28px",
              height: "28px",
              background: "#00A4FF",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Mail style={{ width: "16px", height: "16px", color: "white" }} />
            </div>
            <h1 style={{ 
              fontSize: "18px", 
              fontWeight: 500,
              color: "white",
              letterSpacing: "-0.01em"
            }}>
              Triopia
            </h1>
          </div>
          <div style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "#00A4FF",
            background: "rgba(0, 164, 255, 0.1)",
            padding: "5px 12px",
            borderRadius: "12px"
          }}>
            Superhuman Refined
          </div>
        </div>
      </div>

      <div className="flex" style={{ height: "calc(100vh - 60px)" }}>
        {/* Sidebar */}
        <div style={{ 
          width: "240px",
          background: "white",
          borderRight: "1px solid #E1E4E8",
          padding: "20px 0"
        }}>
          <div style={{ padding: "0 16px", marginBottom: "20px" }}>
            <button style={{
              width: "100%",
              background: "#00A4FF",
              border: "none",
              color: "white",
              padding: "10px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0094E6";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#00A4FF";
              e.currentTarget.style.transform = "translateY(0)";
            }}>
              <Plus className="inline" style={{ width: "16px", height: "16px", marginRight: "6px" }} />
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
                  padding: "10px 16px",
                  cursor: "pointer",
                  background: item.label === "Inbox" ? "#F0F8FF" : "transparent",
                  borderLeft: item.label === "Inbox" ? "3px solid #00A4FF" : "3px solid transparent",
                  transition: "all 0.2s ease"
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon style={{ 
                      width: "18px", 
                      height: "18px",
                      color: item.label === "Inbox" ? "#00A4FF" : "#6A737D"
                    }} />
                    <span style={{
                      fontSize: "14px",
                      fontWeight: item.label === "Inbox" ? 500 : 400,
                      color: item.label === "Inbox" ? "#0A2540" : "#586069"
                    }}>
                      {item.label}
                    </span>
                  </div>
                  {item.count && (
                    <span style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#6A737D"
                    }}>
                      {item.count}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "20px", padding: "16px", borderTop: "1px solid #E1E4E8" }}>
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
                  if (span) span.style.color = "#0A2540";
                }}
                onMouseLeave={(e) => {
                  const span = e.currentTarget.querySelector("span");
                  if (span) span.style.color = "#586069";
                }}
              >
                <item.icon style={{ width: "18px", height: "18px", color: "#6A737D" }} />
                <span style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#586069",
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
          width: "400px",
          background: "white",
          borderRight: "1px solid #E1E4E8"
        }}>
          <div style={{ 
            padding: "24px 20px 16px",
            borderBottom: "1px solid #E1E4E8"
          }}>
            <h2 style={{ 
              fontSize: "24px", 
              fontWeight: 600,
              color: "#0A2540",
              marginBottom: "4px"
            }}>
              Inbox
            </h2>
            <p style={{ 
              fontSize: "13px", 
              fontWeight: 400,
              color: "#6A737D"
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
                  padding: "16px 20px",
                  borderBottom: "1px solid #F6F8FA",
                  background: selectedEmail.id === email.id ? "#F0F8FF" : "white",
                  borderLeft: selectedEmail.id === email.id ? "3px solid #00A4FF" : "3px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
                onMouseEnter={(e) => {
                  if (selectedEmail.id !== email.id) {
                    e.currentTarget.style.background = "#FAFBFC";
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
                      fontWeight: email.unread ? 600 : 400,
                      color: "#0A2540",
                      marginBottom: "2px"
                    }}>
                      {email.from}
                    </div>
                    <div style={{ 
                      fontSize: "12px", 
                      fontWeight: 400,
                      color: "#6A737D"
                    }}>
                      {email.email}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {email.starred && <Star style={{ width: "16px", height: "16px", color: "#00A4FF", fill: "#00A4FF" }} />}
                    <span style={{ fontSize: "12px", color: "#6A737D", fontWeight: 400 }}>
                      {email.time}
                    </span>
                  </div>
                </div>
                <div style={{ 
                  fontSize: "14px", 
                  fontWeight: email.unread ? 500 : 400,
                  color: "#0A2540",
                  marginBottom: "6px"
                }}>
                  {email.subject}
                </div>
                <div style={{ 
                  fontSize: "13px", 
                  fontWeight: 400,
                  color: "#586069",
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
          background: "#F6F8FA",
          overflowY: "auto",
          padding: "32px 48px"
        }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
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
                      border: "1px solid #E1E4E8",
                      borderRadius: "6px",
                      color: "#586069",
                      fontSize: "13px",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#0A2540";
                      e.currentTarget.style.color = "#0A2540";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#E1E4E8";
                      e.currentTarget.style.color = "#586069";
                    }}
                  >
                    <action.icon className="inline" style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                    {action.label}
                  </button>
                ))}
              </div>
              <button style={{
                padding: "8px 20px",
                background: "#00A4FF",
                border: "none",
                borderRadius: "6px",
                color: "white",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0094E6";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#00A4FF";
                e.currentTarget.style.transform = "translateY(0)";
              }}>
                Reply
              </button>
            </div>

            <h1 style={{ 
              fontSize: "32px", 
              fontWeight: 600,
              color: "#0A2540",
              lineHeight: "1.3",
              marginBottom: "24px"
            }}>
              {selectedEmail.subject}
            </h1>

            <div className="flex items-center gap-4 mb-8 pb-6" style={{ borderBottom: "1px solid #E1E4E8" }}>
              <div style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #00A4FF 0%, #0094E6 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: 500,
                color: "white"
              }}>
                {selectedEmail.from.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "#0A2540" }}>
                  {selectedEmail.from}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 400, color: "#6A737D" }}>
                  {selectedEmail.email}
                </div>
              </div>
              <div className="ml-auto" style={{ fontSize: "13px", color: "#6A737D", fontWeight: 400 }}>
                {selectedEmail.time}
              </div>
            </div>

            <div style={{ 
              fontSize: "15px", 
              fontWeight: 400,
              color: "#24292E",
              lineHeight: "1.7"
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
