import { useState } from "react";
import { Mail, Send, Archive, Trash2, Star, Clock, CheckCircle2, Pause, Home, Inbox, Calendar, Users, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Premium Redesign Demo - "New Chapter, New Email"
 * 
 * Design principles:
 * - Warm, soft colors (cream backgrounds, muted accents)
 * - Light typography (300-400 weights)
 * - Generous spacing and breathing room
 * - Soft shadows instead of hard borders
 * - Rounded corners (16px)
 * - Elegant, calm, fresh start aesthetic
 */

const mockEmails = [
  {
    id: 1,
    from: "Sarah Johnson",
    email: "sarah@startup.com",
    subject: "Welcome to your new chapter",
    preview: "Excited to have you on board! Let's schedule a kickoff call...",
    time: "2:30 PM",
    unread: true,
    starred: false,
  },
  {
    id: 2,
    from: "David Chen",
    email: "david@company.com",
    subject: "Q4 Marketing Strategy Review",
    preview: "I wanted to share the preliminary results from our Q4 marketing campaign...",
    time: "1h",
    unread: true,
    starred: true,
  },
  {
    id: 3,
    from: "Emily Rodriguez",
    email: "emily@agency.co",
    subject: "Project Update - Planning Meeting",
    preview: "Let me know if works for you. Looking forward to our ccww meeting...",
    time: "27m",
    unread: false,
    starred: false,
  },
];

export default function PremiumDemo() {
  const [selectedEmail, setSelectedEmail] = useState(mockEmails[0]);

  return (
    <div className="min-h-screen" style={{ 
      background: "linear-gradient(to bottom, #FAF9F7 0%, #F5F3F0 100%)",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Header */}
      <div className="border-b" style={{ 
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        borderColor: "#E8E6E3"
      }}>
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
              background: "linear-gradient(135deg, #6B5CE7 0%, #8B7FE8 100%)",
              boxShadow: "0 4px 12px rgba(107, 92, 231, 0.2)"
            }}>
              <Mail className="w-5 h-5 text-white" />
            </div>
            <h1 style={{ 
              fontSize: "24px", 
              fontWeight: 300,
              color: "#2A2A2A",
              letterSpacing: "-0.01em"
            }}>
              Triopia
            </h1>
          </div>
          <div style={{
            fontSize: "14px",
            fontWeight: 400,
            color: "#6B5CE7",
            background: "#F5F2FF",
            padding: "6px 16px",
            borderRadius: "20px"
          }}>
            Premium Redesign Demo
          </div>
        </div>
      </div>

      <div className="flex" style={{ height: "calc(100vh - 73px)" }}>
        {/* Sidebar */}
        <div style={{ 
          width: "280px",
          background: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(12px)",
          borderRight: "1px solid #E8E6E3",
          padding: "24px 16px"
        }}>
          <Button 
            className="w-full justify-start mb-6" 
            style={{
              background: "linear-gradient(135deg, #6B5CE7 0%, #8B7FE8 100%)",
              color: "white",
              fontWeight: 400,
              padding: "12px 16px",
              borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(107, 92, 231, 0.25)",
              border: "none"
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Compose
          </Button>

          <div className="space-y-1">
            {[
              { icon: Home, label: "Fresh Start", count: null },
              { icon: Inbox, label: "Inbox", count: 12 },
              { icon: Star, label: "Starred", count: 3 },
              { icon: Send, label: "Sent", count: null },
              { icon: Archive, label: "Archive", count: null },
              { icon: Pause, label: "Paused", count: 2 },
              { icon: CheckCircle2, label: "Complete", count: 8 },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all"
                style={{
                  fontSize: "15px",
                  fontWeight: 400,
                  color: item.label === "Inbox" ? "#6B5CE7" : "#666",
                  background: item.label === "Inbox" ? "rgba(107, 92, 231, 0.08)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (item.label !== "Inbox") {
                    e.currentTarget.style.background = "rgba(0, 0, 0, 0.03)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (item.label !== "Inbox") {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#999"
                  }}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6" style={{ borderTop: "1px solid #E8E6E3" }}>
            <div style={{ fontSize: "12px", fontWeight: 500, color: "#999", marginBottom: "12px", paddingLeft: "16px" }}>
              MORE
            </div>
            {[
              { icon: Calendar, label: "Calendar" },
              { icon: Users, label: "Contacts" },
              { icon: Settings, label: "Settings" },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                style={{
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "#666",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0, 0, 0, 0.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Email List */}
        <div style={{ 
          width: "400px",
          background: "white",
          borderRight: "1px solid #E8E6E3",
          overflowY: "auto"
        }}>
          <div style={{ 
            padding: "24px 24px 16px",
            borderBottom: "1px solid #E8E6E3"
          }}>
            <h2 style={{ 
              fontSize: "28px", 
              fontWeight: 300,
              color: "#2A2A2A",
              letterSpacing: "-0.02em"
            }}>
              Inbox
            </h2>
            <p style={{ 
              fontSize: "14px", 
              fontWeight: 400,
              color: "#999",
              marginTop: "4px"
            }}>
              12 unread messages
            </p>
          </div>

          <div>
            {mockEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className="cursor-pointer transition-all"
                style={{
                  padding: "20px 24px",
                  borderBottom: "1px solid #F0EEE8",
                  background: selectedEmail.id === email.id ? "#FAFAF9" : "white",
                }}
                onMouseEnter={(e) => {
                  if (selectedEmail.id !== email.id) {
                    e.currentTarget.style.background = "#FCFCFB";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedEmail.id !== email.id) {
                    e.currentTarget.style.background = "white";
                  }
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FFB6C1 0%, #FFA07A 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "white",
                      flexShrink: 0
                    }}>
                      {email.from.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: "15px", 
                        fontWeight: email.unread ? 500 : 400,
                        color: "#2A2A2A"
                      }}>
                        {email.from}
                      </div>
                      <div style={{ 
                        fontSize: "13px", 
                        fontWeight: 400,
                        color: "#999"
                      }}>
                        {email.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {email.starred && <Star className="w-4 h-4" style={{ color: "#FFB84D", fill: "#FFB84D" }} />}
                    <span style={{ fontSize: "13px", color: "#999", fontWeight: 400 }}>
                      {email.time}
                    </span>
                  </div>
                </div>
                <div style={{ 
                  fontSize: "15px", 
                  fontWeight: email.unread ? 500 : 400,
                  color: "#2A2A2A",
                  marginBottom: "6px",
                  marginLeft: "52px"
                }}>
                  {email.subject}
                </div>
                <div style={{ 
                  fontSize: "14px", 
                  fontWeight: 300,
                  color: "#666",
                  lineHeight: "1.6",
                  marginLeft: "52px"
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
          padding: "32px 48px"
        }}>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <button style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "1px solid #E8E6E3",
                  background: "white",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#666",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#FAFAF9"}
                onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                >
                  <Archive className="w-4 h-4 inline mr-2" />
                  Archive
                </button>
                <button style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "1px solid #E8E6E3",
                  background: "white",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#666",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#FAFAF9"}
                onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                >
                  <Trash2 className="w-4 h-4 inline mr-2" />
                  Delete
                </button>
              </div>
              <button style={{
                padding: "10px 20px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6B5CE7 0%, #8B7FE8 100%)",
                color: "white",
                fontSize: "14px",
                fontWeight: 400,
                cursor: "pointer",
                border: "none",
                boxShadow: "0 4px 12px rgba(107, 92, 231, 0.2)"
              }}>
                Reply
              </button>
            </div>

            <h1 style={{ 
              fontSize: "36px", 
              fontWeight: 300,
              color: "#2A2A2A",
              lineHeight: "1.3",
              marginBottom: "24px",
              letterSpacing: "-0.02em"
            }}>
              {selectedEmail.subject}
            </h1>

            <div className="flex items-center gap-4 mb-8 pb-8" style={{ borderBottom: "1px solid #F0EEE8" }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FFB6C1 0%, #FFA07A 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 400,
                color: "white"
              }}>
                {selectedEmail.from.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div style={{ fontSize: "16px", fontWeight: 400, color: "#2A2A2A" }}>
                  {selectedEmail.from}
                </div>
                <div style={{ fontSize: "14px", fontWeight: 400, color: "#999" }}>
                  {selectedEmail.email}
                </div>
              </div>
              <div className="ml-auto" style={{ fontSize: "14px", color: "#999", fontWeight: 400 }}>
                {selectedEmail.time}
              </div>
            </div>

            <div style={{ 
              fontSize: "17px", 
              fontWeight: 300,
              color: "#2A2A2A",
              lineHeight: "1.8",
              letterSpacing: "0.01em"
            }}>
              <p className="mb-6">
                {selectedEmail.preview}
              </p>
              <p className="mb-6">
                I hope this message finds you well. I wanted to reach out to discuss the exciting opportunities that lie ahead as you begin this new chapter in your journey.
              </p>
              <p className="mb-6">
                Our team has been working diligently to ensure that your transition is as smooth as possible. We understand that starting something new can be both exciting and challenging, which is why we're committed to providing you with all the support and resources you need.
              </p>
              <p className="mb-6">
                Looking forward to collaborating with you and seeing all the amazing things you'll accomplish.
              </p>
              <p style={{ fontWeight: 400 }}>
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
