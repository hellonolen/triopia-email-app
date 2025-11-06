import { X, Mail, Phone, MapPin, Calendar, FileText, MessageSquare, Clock, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Email } from './EmailApp';

interface ContextSidebarProps {
  email: Email | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContextSidebar({ email, isOpen, onClose }: ContextSidebarProps) {
  if (!isOpen || !email) return null;

  const pastConversations = [
    { id: 1, subject: 'Q3 Marketing Review', date: 'Sep 15, 2024', preview: 'Great work on the campaign...' },
    { id: 2, subject: 'Budget Approval', date: 'Aug 22, 2024', preview: 'The budget has been approved...' },
    { id: 3, subject: 'Team Meeting Notes', date: 'Jul 10, 2024', preview: 'Here are the notes from...' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Q4 Strategy Meeting', date: 'Oct 15, 2:00 PM', location: 'Conference Room A' },
    { id: 2, title: 'Marketing Review', date: 'Oct 20, 10:00 AM', location: 'Virtual' },
  ];

  const sharedFiles = [
    { id: 1, name: 'Q4_Marketing_Plan.pdf', size: '2.4 MB', date: 'Oct 1' },
    { id: 2, name: 'Campaign_Metrics.xlsx', size: '1.8 MB', date: 'Sep 28' },
    { id: 3, name: 'Budget_2024.docx', size: '890 KB', date: 'Sep 15' },
  ];

  return (
    <div className={`
      fixed right-0 top-0 h-full w-[380px] bg-card border-l border-border shadow-2xl
      transform transition-transform duration-300 ease-out z-50
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
    `}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold">Contact Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Contact Info */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-semibold text-2xl">
                {email.sender.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{email.sender}</h3>
                <p className="text-sm text-muted-foreground">{email.senderEmail}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{email.senderEmail}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>

          {/* Past Conversations */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-sm">Past Conversations</h3>
            </div>
            <div className="space-y-2">
              {pastConversations.map((conv) => (
                <button
                  key={conv.id}
                  className="w-full p-3 bg-muted hover:bg-muted rounded-lg text-left transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="font-medium text-sm mb-1">{conv.subject}</div>
                  <div className="text-xs text-muted-foreground mb-1">{conv.date}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">{conv.preview}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-sm">Upcoming Events</h3>
            </div>
            <div className="space-y-2">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 bg-primary border border-primary/20 rounded-lg"
                >
                  <div className="font-medium text-sm mb-1">{event.title}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {event.date}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shared Files */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Paperclip className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-sm">Shared Files</h3>
            </div>
            <div className="space-y-2">
              {sharedFiles.map((file) => (
                <button
                  key={file.id}
                  className="w-full p-3 bg-muted hover:bg-muted rounded-lg text-left transition-all duration-200 hover:scale-[1.02] flex items-center gap-3"
                >
                  <FileText className="w-8 h-8 text-primary" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{file.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {file.size} • {file.date}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
