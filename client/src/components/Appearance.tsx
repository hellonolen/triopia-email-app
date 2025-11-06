import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Mail, Briefcase, Calendar as CalendarIcon, Heart, DollarSign, AlertCircle } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  subject: string;
  body: string;
  icon: any;
}

export default function Appearance() {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);

  const templates: EmailTemplate[] = [
    {
      id: 'meeting-request',
      name: 'Meeting Request',
      category: 'Business',
      icon: CalendarIcon,
      subject: 'Meeting Request: [Topic]',
      body: `Hi [Name],

I hope this email finds you well.

I wanted to reach out to schedule a meeting to discuss [topic]. Would you be available for a [duration] meeting sometime this week?

Here are a few time slots that work for me:
• [Date/Time Option 1]
• [Date/Time Option 2]
• [Date/Time Option 3]

Please let me know which works best for you, or suggest an alternative time.

Looking forward to connecting.

Best regards,
[Your Name]`
    },
    {
      id: 'follow-up',
      name: 'Follow-Up',
      category: 'Business',
      icon: Mail,
      subject: 'Following Up: [Topic]',
      body: `Hi [Name],

I wanted to follow up on my previous email regarding [topic].

I understand you're busy, but I wanted to make sure this didn't get lost in your inbox. If you need any additional information or have questions, please don't hesitate to reach out.

Would it be possible to get an update on [specific ask]?

Thank you for your time.

Best regards,
[Your Name]`
    },
    {
      id: 'introduction',
      name: 'Introduction',
      category: 'Networking',
      icon: Heart,
      subject: 'Introduction: [Your Name]',
      body: `Hi [Name],

My name is [Your Name] and I'm [your role/title] at [company]. I came across your work on [platform/project] and was impressed by [specific achievement].

I'm reaching out because [reason for connection]. I believe there might be opportunities for us to [collaborate/learn from each other/share insights].

Would you be open to a brief call or coffee chat to explore this further?

Looking forward to connecting.

Best regards,
[Your Name]`
    },
    {
      id: 'thank-you',
      name: 'Thank You',
      category: 'Professional',
      icon: Heart,
      subject: 'Thank You',
      body: `Hi [Name],

I wanted to take a moment to thank you for [specific action/help/opportunity].

[Specific detail about what they did and its impact]

Your [support/guidance/time] has been invaluable, and I truly appreciate it.

Please let me know if there's anything I can do to return the favor.

With gratitude,
[Your Name]`
    },
    {
      id: 'proposal',
      name: 'Business Proposal',
      category: 'Business',
      icon: Briefcase,
      subject: 'Proposal: [Project Name]',
      body: `Hi [Name],

I hope this email finds you well.

I'm writing to present a proposal for [project/opportunity]. Based on our previous discussions and your current needs, I believe this could be a valuable opportunity for [company/team].

**Overview:**
[Brief description of the proposal]

**Key Benefits:**
• [Benefit 1]
• [Benefit 2]
• [Benefit 3]

**Next Steps:**
I'd love to schedule a call to discuss this in more detail and answer any questions you might have.

Are you available for a meeting next week?

Best regards,
[Your Name]`
    },
    {
      id: 'out-of-office',
      name: 'Out of Office',
      category: 'Professional',
      icon: AlertCircle,
      subject: 'Out of Office: [Your Name]',
      body: `Thank you for your email.

I am currently out of the office from [start date] to [end date] with limited access to email.

If your matter is urgent, please contact [colleague name] at [email] or [phone].

Otherwise, I will respond to your email upon my return.

Thank you for your patience.

Best regards,
[Your Name]`
    },
    {
      id: 'invoice',
      name: 'Invoice',
      category: 'Finance',
      icon: DollarSign,
      subject: 'Invoice #[Number] - [Company Name]',
      body: `Hi [Name],

Please find attached invoice #[number] for [services/products] provided during [time period].

**Invoice Details:**
• Invoice Number: [Number]
• Date: [Date]
• Amount Due: $[Amount]
• Due Date: [Date]

Payment can be made via [payment methods].

If you have any questions regarding this invoice, please don't hesitate to reach out.

Thank you for your business.

Best regards,
[Your Name]`
    }
  ];

  const categories = ['All', 'Business', 'Professional', 'Networking', 'Finance'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const handleUseTemplate = (template: EmailTemplate) => {
    // This would trigger the compose modal with the template pre-filled
    console.log('Using template:', template);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-semibold mb-2">Email Templates</h2>
        <p className="text-sm text-muted-foreground">
          Professional email templates to save time and maintain consistency
        </p>
      </div>

      <div className="p-6 border-b border-border">
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Template List */}
        <div className="w-80 border-r border-border overflow-y-auto">
          <div className="p-4 space-y-2">
            {filteredTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`
                    w-full p-4 rounded-lg text-left transition-all duration-200
                    ${selectedTemplate?.id === template.id 
                      ? 'bg-primary/10 border-2 border-primary' 
                      : 'bg-card hover:bg-muted border-2 border-transparent'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm mb-1">{template.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {template.subject}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {template.category}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Template Preview */}
        <div className="flex-1 overflow-y-auto">
          {selectedTemplate ? (
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    {(() => {
                      const Icon = selectedTemplate.icon;
                      return <Icon className="w-6 h-6 text-primary" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedTemplate.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedTemplate.category}</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleUseTemplate(selectedTemplate)}
                  className="w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Use This Template
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Subject
                  </label>
                  <div className="p-3 bg-muted rounded-lg text-sm font-medium">
                    {selectedTemplate.subject}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Body
                  </label>
                  <div className="p-4 bg-muted rounded-lg">
                    <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed">
                      {selectedTemplate.body}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Mail className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Select a template to preview</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
