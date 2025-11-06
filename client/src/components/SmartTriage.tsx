import { AlertCircle, TrendingUp, Users, Clock, Briefcase, DollarSign } from 'lucide-react';
import type { Email } from './EmailApp';
import EmailListItem from './EmailListItem';

interface SmartTriageProps {
  emails: Email[];
  selectedEmail: Email | null;
  onEmailSelect: (email: Email) => void;
  onStarToggle: (emailId: number) => void;
  onArchive: (emailId: number) => void;
  onDelete: (emailId: number) => void;
  onPin: (emailId: number) => void;
  onMarkAsSpam: (emailId: number) => void;
  onToggleRead: (emailId: number) => void;
}

export default function SmartTriage({
  emails,
  selectedEmail,
  onEmailSelect,
  onStarToggle,
  onArchive,
  onDelete,
  onPin,
  onMarkAsSpam,
  onToggleRead,
}: SmartTriageProps) {
  // Categorize emails
  const urgentEmails = emails.filter(e => e.priority === 'urgent' && !e.isRead);
  const vipEmails = emails.filter(e => e.isStarred && !e.isRead);
  const actionRequired = emails.filter(e => 
    !e.isRead && (
      e.subject.toLowerCase().includes('approval') ||
      e.subject.toLowerCase().includes('review') ||
      e.subject.toLowerCase().includes('deadline')
    )
  );
  const opportunities = emails.filter(e =>
    !e.isRead && (
      e.subject.toLowerCase().includes('deal') ||
      e.subject.toLowerCase().includes('investment') ||
      e.subject.toLowerCase().includes('partnership')
    )
  );

  const categories = [
    {
      id: 'urgent',
      title: 'Urgent',
      description: 'Requires immediate attention',
      icon: AlertCircle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      emails: urgentEmails,
    },
    {
      id: 'vip',
      title: 'VIP',
      description: 'From important contacts',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      emails: vipEmails,
    },
    {
      id: 'action',
      title: 'Action Required',
      description: 'Needs your response or approval',
      icon: Briefcase,
      color: 'text-orange-600',
      bgColor: 'bg-orange-500/10',
      emails: actionRequired,
    },
    {
      id: 'opportunities',
      title: 'Opportunities',
      description: 'Deals, investments, partnerships',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-500/10',
      emails: opportunities,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="mb-4">
        <h1 className="text-xl font-semibold mb-1">Priority Inbox</h1>
        <p className="text-xs text-muted-foreground">
          Smart triage of your most important emails
        </p>
      </div>

      <div className="space-y-3">
        {categories.map((category) => {
          const Icon = category.icon;
          
          if (category.emails.length === 0) return null;

          return (
            <div key={category.id} className="bg-card rounded-lg border border-border overflow-hidden">
              {/* Category Header */}
              <div className="p-3 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${category.bgColor}`}>
                    <Icon className={`w-4 h-4 ${category.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{category.title}</h3>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground">
                    {category.emails.length}
                  </div>
                </div>
              </div>

              {/* Emails */}
              <div>
                {category.emails.slice(0, 5).map((email) => (
                  <EmailListItem
                    key={email.id}
                    email={email}
                    isSelected={selectedEmail?.id === email.id}
                    onSelect={onEmailSelect}
                    onStarToggle={onStarToggle}
                    onArchive={onArchive}
                    onDelete={onDelete}
                    onPin={onPin}
                    onMarkAsSpam={onMarkAsSpam}
                    onToggleRead={onToggleRead}
                  />
                ))}
                {category.emails.length > 5 && (
                  <div className="p-4 text-center border-t border-border">
                    <button className="text-sm text-primary hover:underline">
                      View all {category.emails.length} emails
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {categories.every(cat => cat.emails.length === 0) && (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
            <p className="text-sm text-muted-foreground">
              No urgent emails requiring your attention right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
