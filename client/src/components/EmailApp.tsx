import { useState } from 'react';
import Sidebar from './Sidebar';
import EmailList from './EmailList';
import EmailDetail from './EmailDetail';
import AnalyticsDashboard from './AnalyticsDashboard';

export interface Email {
  id: number;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  body: string;
  timestamp: string;
  date: string;
  isStarred: boolean;
  isRead: boolean;
  priority: 'urgent' | 'high' | 'normal' | 'low';
  category?: string;
}

export default function EmailApp() {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails, setEmails] = useState<Email[]>([
    {
      id: 1,
      sender: 'Sarah Johnson',
      senderEmail: 'sarahjohnson@iom',
      subject: 'Q4 Marketing Strategy Review',
      preview: 'Hi team, I wanted to share the preliminary results from our Q4 marketing campaigns. The metrics...',
      body: `Hi John,\n\nI hope this email finds you well.\n\nI wanted to schedule a review meeting for our Q4 marketing strategy. Are you available for a meeting on October 15th in the afternoon?\n\nPlease let me know if this works for you or if there's another time that suits you better.\n\nBest regards,\nSarah`,
      timestamp: '2:30 PM',
      date: 'Oct 8, 12:28 PM',
      isStarred: true,
      isRead: false,
      priority: 'high',
      category: 'Work',
    },
    {
      id: 2,
      sender: 'David Chen',
      senderEmail: 'david.chen@company.com',
      subject: 'Lunch Next Week?',
      preview: 'To preview meeting for ccww meeting.',
      body: 'Hey! Would you be free for lunch next week? I wanted to discuss the upcoming project timeline.',
      timestamp: '1 h',
      date: 'Oct 8, 11:45 AM',
      isStarred: false,
      isRead: true,
      priority: 'normal',
      category: 'Personal',
    },
    {
      id: 3,
      sender: 'Microsoft Teams',
      senderEmail: 'noreply@teams.microsoft.com',
      subject: 'Project Update',
      preview: 'Are updated (a meeting on October 15',
      body: 'Your meeting "Weekly Standup" has been updated. The new time is October 15 at 2:00 PM.',
      timestamp: '27',
      date: 'Oct 7, 10:15 AM',
      isStarred: false,
      isRead: true,
      priority: 'normal',
      category: 'Notifications',
    },
    {
      id: 4,
      sender: 'Emily Rodriguez',
      senderEmail: 'emily.r@company.com',
      subject: 'Event Planning Meeting',
      preview: 'Please let the know if werks for you',
      body: 'Hi team, I wanted to coordinate our next event planning session. Please let me know your availability.',
      timestamp: '1K',
      date: 'Oct 6, 9:20 AM',
      isStarred: false,
      isRead: true,
      priority: 'low',
      category: 'Work',
    },
    {
      id: 5,
      sender: 'GitHub',
      senderEmail: 'noreply@github.com',
      subject: 'New Comment on Issue',
      preview: 'Best regards',
      body: 'A new comment has been added to issue #234 in your repository.',
      timestamp: 'Ap',
      date: 'Oct 5, 4:30 PM',
      isStarred: false,
      isRead: true,
      priority: 'low',
      category: 'Notifications',
    },
  ]);

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email);
    setEmails(emails.map(e => 
      e.id === email.id ? { ...e, isRead: true } : e
    ));
  };

  const handleStarToggle = (emailId: number) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, isStarred: !email.isStarred } : email
    ));
    if (selectedEmail?.id === emailId) {
      setSelectedEmail({ ...selectedEmail, isStarred: !selectedEmail.isStarred });
    }
  };

  const handleArchive = (emailId: number) => {
    setTimeout(() => {
      setEmails(emails.filter(email => email.id !== emailId));
      if (selectedEmail?.id === emailId) {
        setSelectedEmail(null);
      }
    }, 300);
  };

  const handleDelete = (emailId: number) => {
    setTimeout(() => {
      setEmails(emails.filter(email => email.id !== emailId));
      if (selectedEmail?.id === emailId) {
        setSelectedEmail(null);
      }
    }, 300);
  };

  const handlePin = (emailId: number) => {
    console.log('Pin email:', emailId);
  };

  const handleMarkAsSpam = (emailId: number) => {
    setTimeout(() => {
      setEmails(emails.filter(email => email.id !== emailId));
      if (selectedEmail?.id === emailId) {
        setSelectedEmail(null);
      }
    }, 300);
  };

  const handleToggleRead = (emailId: number) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, isRead: !email.isRead } : email
    ));
    if (selectedEmail?.id === emailId) {
      setSelectedEmail({ ...selectedEmail, isRead: !selectedEmail.isRead });
    }
  };

  const getUnreadCount = (folder: string) => {
    if (folder === 'inbox') {
      return emails.filter(e => !e.isRead).length;
    }
    if (folder === 'starred') {
      return emails.filter(e => e.isStarred).length;
    }
    if (folder === 'drafts') {
      return 2;
    }
    return 0;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        selectedFolder={selectedFolder}
        onFolderSelect={setSelectedFolder}
        getUnreadCount={getUnreadCount}
      />
      {selectedFolder === 'analytics' ? (
        <div className="flex-1 overflow-y-auto">
          <AnalyticsDashboard />
        </div>
      ) : (
        <>
          <EmailList
            emails={emails}
            selectedEmail={selectedEmail}
            onEmailSelect={handleEmailSelect}
            onStarToggle={handleStarToggle}
            onArchive={handleArchive}
            onDelete={handleDelete}
            onPin={handlePin}
            onMarkAsSpam={handleMarkAsSpam}
            onToggleRead={handleToggleRead}
          />
          <EmailDetail
            email={selectedEmail}
            onArchive={handleArchive}
            onDelete={handleDelete}
            onStarToggle={handleStarToggle}
          />
        </>
      )}
    </div>
  );
}
