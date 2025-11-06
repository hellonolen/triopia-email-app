import { useState } from 'react';
import { Search, Plus, Mail, Phone, Building, MoreVertical, Star, Trash2, Edit, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  isStarred?: boolean;
  lastEmailDate?: string;
  emailCount?: number;
  avatar?: string;
}

export default function Contacts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarahjohnson@iom.com',
      phone: '+1 (555) 123-4567',
      company: 'Tech Innovations Inc',
      title: 'VP of Marketing',
      isStarred: true,
      lastEmailDate: 'Nov 6, 2:30 PM',
      emailCount: 47,
    },
    {
      id: 2,
      name: 'David Chen',
      email: 'david.chen@company.com',
      phone: '+1 (555) 234-5678',
      company: 'Global Ventures',
      title: 'Senior Partner',
      lastEmailDate: 'Nov 6, 1h',
      emailCount: 23,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@company.com',
      company: 'Creative Solutions LLC',
      title: 'Event Coordinator',
      lastEmailDate: 'Nov 6, 1K',
      emailCount: 12,
    },
  ]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStarToggle = (contactId: number) => {
    setContacts(contacts.map(c =>
      c.id === contactId ? { ...c, isStarred: !c.isStarred } : c
    ));
  };

  return (
    <div className="flex h-full">
      {/* Contact List */}
      <div className="w-[400px] border-r border-border flex flex-col bg-background">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Contacts</h2>
            <Button size="sm" className="bg-primary hover:bg-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm
                       focus:bg-card focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                       transition-all duration-200"
            />
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`
                p-4 border-b border-border cursor-pointer transition-all duration-200
                hover:bg-muted
                ${selectedContact?.id === contact.id ? 'bg-muted border-l-4 border-primary' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center flex-shrink-0 text-primary-foreground font-semibold text-sm">
                  {contact.name.charAt(0).toUpperCase()}
                </div>

                {/* Contact Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold truncate">{contact.name}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStarToggle(contact.id);
                      }}
                      className="p-1 hover:bg-muted rounded transition-all duration-200"
                    >
                      <Star className={`w-3.5 h-3.5 ${contact.isStarred ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mb-1">{contact.email}</p>
                  {contact.company && (
                    <p className="text-xs text-muted-foreground truncate">{contact.company}</p>
                  )}
                  {contact.emailCount && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {contact.emailCount} emails · Last: {contact.lastEmailDate}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Detail */}
      <div className="flex-1 bg-background">
        {selectedContact ? (
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-semibold text-2xl">
                  {selectedContact.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-semibold mb-1">{selectedContact.name}</h1>
                  {selectedContact.title && selectedContact.company && (
                    <p className="text-sm text-muted-foreground">
                      {selectedContact.title} at {selectedContact.company}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">{selectedContact.email}</p>
                    </div>
                  </div>

                  {selectedContact.phone && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="text-sm font-medium">{selectedContact.phone}</p>
                      </div>
                    </div>
                  )}

                  {selectedContact.company && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Building className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">Company</p>
                        <p className="text-sm font-medium">{selectedContact.company}</p>
                        {selectedContact.title && (
                          <p className="text-xs text-muted-foreground">{selectedContact.title}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Email Activity */}
              <div>
                <h3 className="text-sm font-semibold mb-4">Email Activity</h3>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total emails</span>
                    <span className="text-sm font-semibold">{selectedContact.emailCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last email</span>
                    <span className="text-sm font-semibold">{selectedContact.lastEmailDate}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1 bg-primary hover:bg-primary">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="flex-1">
                  View All Emails
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a contact</h3>
              <p className="text-sm text-muted-foreground">
                Choose a contact from the list to view details
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
