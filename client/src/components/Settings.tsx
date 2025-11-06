import { useState } from 'react';
import { Mail, Server, Key, User, Save, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmailAccount {
  id: number;
  provider: string;
  email: string;
  status: 'connected' | 'disconnected';
}

export default function Settings() {
  const [accounts, setAccounts] = useState<EmailAccount[]>([
    { id: 1, provider: 'Gmail', email: 'user@gmail.com', status: 'connected' },
  ]);
  const [showAddAccount, setShowAddAccount] = useState(false);

  return (
    <div className="p-8 space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Settings</h2>
        <p className="text-muted-foreground">Manage your email accounts and preferences</p>
      </div>

      {/* Email Accounts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Email Accounts</h3>
            <p className="text-sm text-muted-foreground">Connect and manage your email accounts via IMAP</p>
          </div>
          <Button
            onClick={() => setShowAddAccount(!showAddAccount)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Account
          </Button>
        </div>

        {/* Connected Accounts */}
        <div className="space-y-3">
          {accounts.map((account) => (
            <div key={account.id} className="p-4 bg-card border border-border rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{account.email}</div>
                  <div className="text-sm text-muted-foreground">{account.provider} • IMAP</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  account.status === 'connected' 
                    ? 'bg-green-500/10 text-green-600' 
                    : 'bg-red-500/10 text-red-600'
                }`}>
                  {account.status}
                </span>
                <button className="p-2 hover:bg-destructive/10 rounded-lg transition-all duration-200">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Account Form */}
        {showAddAccount && (
          <div className="p-6 bg-muted/50 border border-border rounded-lg space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <h4 className="font-semibold">Add Email Account</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Provider</label>
                <select className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm">
                  <option>Gmail</option>
                  <option>Outlook</option>
                  <option>Yahoo</option>
                  <option>iCloud</option>
                  <option>Custom IMAP</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm
                           focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  IMAP Server
                </label>
                <input
                  type="text"
                  placeholder="imap.gmail.com"
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm
                           focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Port</label>
                <input
                  type="number"
                  placeholder="993"
                  className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm
                           focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Key className="w-4 h-4" />
                Password / App Password
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm
                         focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground">
                For Gmail, use an App Password. <a href="#" className="text-primary hover:underline">Learn more</a>
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Import Limit</label>
              <select className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm">
                <option>Last 20 emails</option>
                <option>Last 50 emails</option>
                <option>Last 100 emails</option>
                <option>Last 500 emails</option>
                <option>All emails</option>
              </select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={() => setShowAddAccount(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Connect Account
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* General Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">General Settings</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
            <div>
              <div className="font-medium">Email Notifications</div>
              <div className="text-sm text-muted-foreground">Receive notifications for new emails</div>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
            <div>
              <div className="font-medium">Auto-Archive Read Emails</div>
              <div className="text-sm text-muted-foreground">Automatically archive emails after 30 days</div>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>

          <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
            <div>
              <div className="font-medium">Smart Prioritization</div>
              <div className="text-sm text-muted-foreground">Use intelligent sorting to prioritize important emails</div>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
}
