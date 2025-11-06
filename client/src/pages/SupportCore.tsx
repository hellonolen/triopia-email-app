// Support Core - Help, FAQ, tickets, feedback, NPS
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function SupportCore() {
  const [activeTab, setActiveTab] = useState<'help' | 'tickets' | 'feedback'>('help');
  const { data: tickets } = trpc.support.listTickets.useQuery({ userId: 'demo-user' });
  const createTicket = trpc.support.createTicket.useMutation();
  const submitFeedback = trpc.support.submitFeedback.useMutation();

  const faqs = [
    { q: 'How do I connect my Gmail account?', a: 'Go to Settings > Accounts and click "Connect Gmail Account"' },
    { q: 'How do I upgrade my plan?', a: 'Visit the Billing page and select your desired plan' },
    { q: 'Can I export my emails?', a: 'Yes, go to Settings > Data Export to download all your data' },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Support Center</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('help')}
            className={`pb-2 px-4 ${activeTab === 'help' ? 'border-b-2 border-primary font-semibold' : 'text-muted-foreground'}`}
          >
            Help & FAQ
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`pb-2 px-4 ${activeTab === 'tickets' ? 'border-b-2 border-primary font-semibold' : 'text-muted-foreground'}`}
          >
            My Tickets
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`pb-2 px-4 ${activeTab === 'feedback' ? 'border-b-2 border-primary font-semibold' : 'text-muted-foreground'}`}
          >
            Feedback
          </button>
        </div>

        {/* Help & FAQ */}
        {activeTab === 'help' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-6 border border-border rounded-lg">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 border border-border rounded-lg bg-muted">
              <h3 className="text-xl font-semibold mb-2">Need more help?</h3>
              <p className="text-muted-foreground mb-4">Can't find what you're looking for? Create a support ticket.</p>
              <Button onClick={() => setActiveTab('tickets')}>Create Ticket</Button>
            </div>
          </div>
        )}

        {/* Tickets */}
        {activeTab === 'tickets' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Support Tickets</h2>
              <Button>New Ticket</Button>
            </div>
            {tickets && tickets.length > 0 ? (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="p-6 border border-border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{ticket.subject}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{ticket.description}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="px-2 py-1 bg-muted rounded text-xs">{ticket.status}</span>
                          <span className="px-2 py-1 bg-muted rounded text-xs">{ticket.priority}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No tickets yet</p>
            )}
          </div>
        )}

        {/* Feedback */}
        {activeTab === 'feedback' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send Feedback</h2>
            <div className="p-6 border border-border rounded-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Feedback Type</label>
                  <select className="w-full p-2 border border-border rounded">
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                    <option>General Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea className="w-full p-2 border border-border rounded h-32" placeholder="Tell us what you think..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">How would you rate your experience?</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button key={rating} className="w-10 h-10 border border-border rounded hover:bg-muted">
                        {rating}⭐
                      </button>
                    ))}
                  </div>
                </div>
                <Button>Submit Feedback</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
