import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, X, Mail } from 'lucide-react';

interface NewSender {
  id: number;
  name: string;
  email: string;
  subject: string;
  preview: string;
  timestamp: string;
}

export default function NewConnections() {
  const [pendingSenders, setPendingSenders] = useState<NewSender[]>([
    {
      id: 1,
      name: 'Alex Martinez',
      email: 'alex.martinez@startup.io',
      subject: 'Partnership Opportunity',
      preview: 'Hi, I came across Triopia and would love to discuss a potential partnership...',
      timestamp: '10 min ago'
    },
    {
      id: 2,
      name: 'Jennifer Lee',
      email: 'jennifer@marketing.agency',
      subject: 'Marketing Services',
      preview: 'We specialize in growth marketing for SaaS companies...',
      timestamp: '1 hour ago'
    },
    {
      id: 3,
      name: 'Robert Chen',
      email: 'robert.chen@consulting.com',
      subject: 'Consulting Proposal',
      preview: 'I noticed your company is expanding and wanted to reach out...',
      timestamp: '2 hours ago'
    }
  ]);

  const handleAccept = (id: number) => {
    setPendingSenders(prev => prev.filter(s => s.id !== id));
    // TODO: Move email to inbox and whitelist sender
  };

  const handleBlock = (id: number) => {
    setPendingSenders(prev => prev.filter(s => s.id !== id));
    // TODO: Block sender and move to spam
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="container max-w-4xl py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">New Connections</h1>
          <p className="text-muted-foreground">
            Review first-time senders before they reach your inbox
          </p>
        </div>

        {/* Pending Senders List */}
        {pendingSenders.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-primary/10">
                <Mail className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">All caught up!</h3>
                <p className="text-sm text-muted-foreground">
                  No new senders to review
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {pendingSenders.map((sender) => (
              <Card key={sender.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                    {sender.name.charAt(0)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{sender.name}</h3>
                        <p className="text-sm text-muted-foreground">{sender.email}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {sender.timestamp}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="font-medium mb-1">{sender.subject}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {sender.preview}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleAccept(sender.id)}
                        className="flex-1"
                        variant="default"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleBlock(sender.id)}
                        className="flex-1"
                        variant="outline"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Block
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Info */}
        {pendingSenders.length > 0 && (
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Tip:</strong> Accepted senders will be added to your contacts and their emails will appear in your inbox. 
              Blocked senders will be filtered to spam automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
