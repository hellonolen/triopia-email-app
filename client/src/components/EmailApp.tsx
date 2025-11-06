import { useState } from 'react';
import Sidebar from './Sidebar';
import EmailList from './EmailList';
import EmailDetail from './EmailDetail';
import AnalyticsDashboard from './AnalyticsDashboard';
import Calendar from './Calendar';
import Settings from './Settings';
import Footer from './Footer';
import EmailComposer from './EmailComposer';
import Contacts from './Contacts';
import SmartTriage from './SmartTriage';
import CommandBar from './CommandBar';
import KeyboardShortcutsHelp from './KeyboardShortcutsHelp';
import Storage from './Storage';
import Notes from './Notes';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

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
  isArchived?: boolean;
  isDeleted?: boolean;
  isSpam?: boolean;
}

export default function EmailApp() {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showComposer, setShowComposer] = useState(false);
  const [showCommandBar, setShowCommandBar] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
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
      setEmails(emails.map(email =>
        email.id === emailId ? { ...email, isArchived: true } : email
      ));
      if (selectedEmail?.id === emailId) {
        setSelectedEmail(null);
      }
    }, 300);
  };

  const handleDelete = (emailId: number) => {
    setTimeout(() => {
      setEmails(emails.map(email =>
        email.id === emailId ? { ...email, isDeleted: true } : email
      ));
      if (selectedEmail?.id === emailId) {
        setSelectedEmail(null);
      }
    }, 300);
  };

  const handlePin = (emailId: number) => {
    console.log('Pin email:', emailId);
  };

  const handleMarkAsSpam = (emailId: number) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, isSpam: true } : email
    ));
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null);
    }
  };

  const handleMarkAsNotSpam = (emailId: number) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, isSpam: false } : email
    ));
  };

  const handleRestoreFromTrash = (emailId: number) => {
    setEmails(emails.map(email =>
      email.id === emailId ? { ...email, isDeleted: false } : email
    ));
  };

  const handleToggleRead = (emailId: number) => {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === emailId ? { ...email, isRead: !email.isRead } : email
      )
    );
  };

  const handleEmailDropOnCalendar = (email: Email) => {
    // Switch to calendar view and open event creator with email data pre-filled
    setSelectedFolder('calendar');
    // In a real implementation, this would trigger the EventCreator modal
    // with the email subject as title, sender as attendee, and body as description
    console.log('Email dropped on calendar:', email);
    alert(`Creating event from email: "${email.subject}"\n\nEvent creator would open with:\n- Title: ${email.subject}\n- Attendee: ${email.senderEmail}\n- Description: ${email.preview}`);
  };

  const getFilteredEmails = () => {
    switch (selectedFolder) {
      case 'inbox':
        return emails.filter(e => !e.isArchived && !e.isDeleted && !e.isSpam);
      case 'starred':
        return emails.filter(e => e.isStarred && !e.isDeleted && !e.isSpam);
      case 'sent':
        return []; // Will be populated with sent emails
      case 'drafts':
        return []; // Will be populated with draft emails
      case 'archive':
        return emails.filter(e => e.isArchived && !e.isDeleted);
      case 'spam':
        return emails.filter(e => e.isSpam && !e.isDeleted);
      case 'trash':
        return emails.filter(e => e.isDeleted);
      default:
        return emails;
    }
  };

  const getUnreadCount = (folder: string) => {
    if (folder === 'priority') {
      // Count urgent and high priority unread emails
      return emails.filter(e => !e.isRead && (e.priority === 'urgent' || e.priority === 'high')).length;
    }
    if (folder === 'inbox') {
      return emails.filter(e => !e.isRead && !e.isSpam && !e.isArchived && !e.isDeleted).length;
    }
    if (folder === 'starred') {
      return emails.filter(e => e.isStarred).length;
    }
    if (folder === 'drafts') {
      return 2;
    }
    return 0;
  };

  // Keyboard shortcuts
  useKeyboardShortcuts([
    { key: 'e', description: 'Archive email', action: () => selectedEmail && handleArchive(selectedEmail.id) },
    { key: 'r', description: 'Reply to email', action: () => selectedEmail && console.log('Reply') },
    { key: 'f', description: 'Forward email', action: () => selectedEmail && console.log('Forward') },
    { key: 's', description: 'Star/unstar email', action: () => selectedEmail && handleStarToggle(selectedEmail.id) },
    { key: '#', description: 'Delete email', action: () => selectedEmail && handleDelete(selectedEmail.id) },
    { key: 'c', description: 'Compose new email', action: () => setShowComposer(true) },
    { key: '/', description: 'Focus search', action: () => (document.querySelector('input[type="text"]') as HTMLInputElement)?.focus() },
    { key: 'k', ctrl: true, description: 'Open command bar', action: () => setShowCommandBar(true) },
    { key: '?', description: 'Show keyboard shortcuts', action: () => setShowKeyboardHelp(true) },
  ], !showComposer && !showCommandBar && !showKeyboardHelp);

  const handleCommandAction = (action: string) => {
    switch (action) {
      case 'compose':
        setShowComposer(true);
        break;
      case 'archive-all':
        console.log('Archive all');
        break;
      case 'mark-read':
        console.log('Mark all as read');
        break;
      case 'search':
        (document.querySelector('input[type="text"]') as HTMLInputElement)?.focus();
        break;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedFolder={selectedFolder}
          onFolderSelect={setSelectedFolder}
          getUnreadCount={getUnreadCount}
          onCompose={() => setShowComposer(true)}
          onEmailDrop={handleEmailDropOnCalendar}
        />
        {selectedFolder === 'priority' ? (
          <SmartTriage
            emails={emails.filter(e => !e.isArchived && !e.isDeleted)}
            selectedEmail={selectedEmail}
            onEmailSelect={handleEmailSelect}
            onStarToggle={handleStarToggle}
            onArchive={handleArchive}
            onDelete={handleDelete}
            onPin={handlePin}
            onMarkAsSpam={handleMarkAsSpam}
            onToggleRead={handleToggleRead}
          />
        ) : selectedFolder === 'analytics' ? (
          <div className="flex-1 overflow-y-auto">
            <AnalyticsDashboard />
          </div>
        ) : selectedFolder === 'calendar' ? (
          <div className="flex-1 overflow-y-auto">
            <Calendar />
          </div>
        ) : selectedFolder === 'settings' ? (
          <div className="flex-1 overflow-y-auto">
            <Settings />
          </div>
        ) : selectedFolder === 'contacts' ? (
          <div className="flex-1 overflow-hidden">
            <Contacts />
          </div>
        ) : selectedFolder === 'storage' ? (
          <div className="flex-1 overflow-hidden">
            <Storage />
          </div>
        ) : selectedFolder === 'notes' ? (
          <div className="flex-1 overflow-hidden">
            <Notes />
          </div>
        ) : (
          <>
            <EmailList
              emails={getFilteredEmails()}
              selectedEmail={selectedEmail}
              folderName={selectedFolder}
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
      <Footer />
      {showComposer && (
        <EmailComposer
          onClose={() => setShowComposer(false)}
          onSend={(email) => {
            console.log('Sending email:', email);
            setShowComposer(false);
          }}
        />
      )}
      {showCommandBar && (
        <CommandBar
          onClose={() => setShowCommandBar(false)}
          onNavigate={(folder) => {
            setSelectedFolder(folder);
            setShowCommandBar(false);
          }}
          onAction={handleCommandAction}
        />
      )}
      {showKeyboardHelp && (
        <KeyboardShortcutsHelp onClose={() => setShowKeyboardHelp(false)} />
      )}
    </div>
  );
}
