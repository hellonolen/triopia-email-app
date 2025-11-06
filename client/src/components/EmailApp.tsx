import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Mail, Send, Star, Trash2, Archive, Search } from 'lucide-react';
import { Button } from './ui/button';

interface Email {
  id: number;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  isStarred: boolean;
  isRead: boolean;
}

export default function EmailApp() {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  
  const emails: Email[] = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      senderEmail: 'sarah.johnson@company.com',
      subject: 'Q4 Marketing Strategy Review',
      preview: 'Hi team, I wanted to share the preliminary results from our Q4 marketing campaigns...',
      body: 'Full email content here...',
      timestamp: '2:30 PM',
      isStarred: true,
      isRead: false,
    },
    {
      id: 2,
      sender: 'David Chen',
      senderEmail: 'david.chen@company.com',
      subject: 'Lunch Next Week?',
      preview: 'Would you be free for lunch next week? I wanted to discuss the upcoming project timeline.',
      body: 'Full email content here...',
      timestamp: '1h ago',
      isStarred: false,
      isRead: true,
    },
    {
      id: 3,
      sender: 'Emily Rodriguez',
      senderEmail: 'emily.r@company.com',
      subject: 'Event Planning Meeting',
      preview: 'Hi team, I wanted to coordinate our next event planning session...',
      body: 'Full email content here...',
      timestamp: 'Yesterday',
      isStarred: false,
      isRead: true,
    },
  ];

  const folders = [
    { id: 'inbox', label: 'Inbox', icon: Mail, count: 3 },
    { id: 'sent', label: 'Sent', icon: Send, count: 0 },
    { id: 'starred', label: 'Starred', icon: Star, count: 1 },
    { id: 'archive', label: 'Archive', icon: Archive, count: 0 },
    { id: 'trash', label: 'Trash', icon: Trash2, count: 0 },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 bg-white p-6">
          <Button className="w-full mb-8 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg shadow-sm">
            Compose
          </Button>
          
          <nav className="space-y-1">
            {folders.map((folder) => {
              const Icon = folder.icon;
              const isActive = selectedFolder === folder.id;
              
              return (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`
                    w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-900' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{folder.label}</span>
                  </div>
                  {folder.count > 0 && (
                    <span className="text-xs text-gray-500">{folder.count}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Email List */}
        <div className="w-96 border-r border-gray-200 bg-white flex flex-col shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search emails..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {emails.map((email) => (
              <button
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={`
                  w-full p-5 border-b border-gray-100 text-left hover:bg-gray-50 transition-all duration-150
                  ${selectedEmail?.id === email.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''}
                  ${!email.isRead && selectedEmail?.id !== email.id ? 'bg-blue-50/20' : ''}
                `}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className={`text-sm ${!email.isRead ? 'font-semibold' : 'font-medium'}`}>
                    {email.sender}
                  </span>
                  <span className="text-xs text-gray-500">{email.timestamp}</span>
                </div>
                <div className={`text-sm mb-1 ${!email.isRead ? 'font-medium' : ''}`}>
                  {email.subject}
                </div>
                <div className="text-xs text-gray-500 line-clamp-2">
                  {email.preview}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Email Detail */}
        <div className="flex-1 bg-white p-12">
          {selectedEmail ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{selectedEmail.subject}</h2>
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {selectedEmail.sender[0]}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{selectedEmail.sender}</div>
                  <div className="text-sm text-gray-500">{selectedEmail.senderEmail}</div>
                </div>
                <div className="text-sm text-gray-500">{selectedEmail.timestamp}</div>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{selectedEmail.body}</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Mail className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Select an email to read</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
