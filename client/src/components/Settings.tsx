import { useState, useEffect } from 'react';
import { Mail, Trash2, Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function Settings() {
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'gmail' | 'outlook' | 'imap' | null>(null);

  // Fetch email accounts
  const { data: accounts, refetch } = trpc.email.listAccounts.useQuery();
  const deleteAccountMutation = trpc.email.deleteAccount.useMutation();
  const syncAccountMutation = trpc.email.syncAccount.useMutation();

  // Handle OAuth callback success/error messages
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const error = params.get('error');

    if (success === 'gmail_connected') {
      toast.success('Gmail account connected successfully');
      refetch();
      window.history.replaceState({}, '', '/settings');
    } else if (success === 'outlook_connected') {
      toast.success('Outlook account connected successfully');
      refetch();
      window.history.replaceState({}, '', '/settings');
    } else if (error) {
      toast.error(`Failed to connect account: ${error}`);
      window.history.replaceState({}, '', '/settings');
    }
  }, [refetch]);
  
  // IMAP form state
  const [imapForm, setImapForm] = useState({
    email: '',
    password: '',
    imapHost: '',
    imapPort: '993',
    smtpHost: '',
    smtpPort: '465',
  });

  // Get OAuth URLs
  const { data: gmailAuthUrl } = trpc.email.getGmailAuthUrl.useQuery(undefined, {
    enabled: selectedProvider === 'gmail'
  });
  const { data: outlookAuthUrl } = trpc.email.getOutlookAuthUrl.useQuery(undefined, {
    enabled: selectedProvider === 'outlook'
  });

  const handleConnectGmail = () => {
    if (gmailAuthUrl?.authUrl) {
      window.location.href = gmailAuthUrl.authUrl;
    }
  };

  const handleConnectOutlook = () => {
    if (outlookAuthUrl?.authUrl) {
      window.location.href = outlookAuthUrl.authUrl;
    }
  };

  const connectCustomAccountMutation = trpc.email.connectCustomAccount.useMutation();

  const handleConnectIMAP = async () => {
    try {
      await connectCustomAccountMutation.mutateAsync({
        email: imapForm.email,
        password: imapForm.password,
        imapHost: imapForm.imapHost,
        imapPort: parseInt(imapForm.imapPort),
        smtpHost: imapForm.smtpHost,
        smtpPort: parseInt(imapForm.smtpPort)
      });
      toast.success('IMAP account connected successfully');
      setShowAddAccount(false);
      setImapForm({
        email: '',
        password: '',
        imapHost: '',
        imapPort: '993',
        smtpHost: '',
        smtpPort: '465',
      });
      refetch();
    } catch (error) {
      toast.error('Failed to connect IMAP account');
    }
  };

  const handleDeleteAccount = async (accountId: number) => {
    if (!confirm('Are you sure you want to remove this account?')) return;
    
    try {
      await deleteAccountMutation.mutateAsync({ accountId });
      toast.success('Account removed successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to remove account');
    }
  };

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
            <p className="text-sm text-muted-foreground">Connect Gmail, Outlook, or custom IMAP accounts</p>
          </div>
          <Button
            onClick={() => setShowAddAccount(!showAddAccount)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Account
          </Button>
        </div>

        {/* Add Account Form */}
        {showAddAccount && (
          <div className="p-6 bg-card border border-border rounded-lg space-y-4">
            <h4 className="font-semibold mb-4">Choose Account Type</h4>
            
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setSelectedProvider('gmail')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  selectedProvider === 'gmail' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-center">
                  <Mail className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="font-medium">Gmail</div>
                  <div className="text-xs text-muted-foreground mt-1">OAuth2</div>
                </div>
              </button>

              <button
                onClick={() => setSelectedProvider('outlook')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  selectedProvider === 'outlook' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-center">
                  <Mail className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="font-medium">Outlook</div>
                  <div className="text-xs text-muted-foreground mt-1">OAuth2</div>
                </div>
              </button>

              <button
                onClick={() => setSelectedProvider('imap')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  selectedProvider === 'imap' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-center">
                  <Mail className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="font-medium">Custom</div>
                  <div className="text-xs text-muted-foreground mt-1">IMAP/SMTP</div>
                </div>
              </button>
            </div>

            {/* Gmail OAuth */}
            {selectedProvider === 'gmail' && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm mb-4">
                  Connect your Gmail account securely using Google OAuth2. You'll be redirected to Google to authorize access.
                </p>
                <Button onClick={handleConnectGmail} className="w-full">
                  Connect Gmail Account
                </Button>
              </div>
            )}

            {/* Outlook OAuth */}
            {selectedProvider === 'outlook' && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm mb-4">
                  Connect your Outlook account securely using Microsoft OAuth2. You'll be redirected to Microsoft to authorize access.
                </p>
                <Button onClick={handleConnectOutlook} className="w-full">
                  Connect Outlook Account
                </Button>
              </div>
            )}

            {/* IMAP Form */}
            {selectedProvider === 'imap' && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={imapForm.email}
                      onChange={(e) => setImapForm({ ...imapForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                      type="password"
                      value={imapForm.password}
                      onChange={(e) => setImapForm({ ...imapForm, password: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">IMAP Host</label>
                    <input
                      type="text"
                      value={imapForm.imapHost}
                      onChange={(e) => setImapForm({ ...imapForm, imapHost: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      placeholder="imap.example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">IMAP Port</label>
                    <input
                      type="text"
                      value={imapForm.imapPort}
                      onChange={(e) => setImapForm({ ...imapForm, imapPort: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      placeholder="993"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">SMTP Host</label>
                    <input
                      type="text"
                      value={imapForm.smtpHost}
                      onChange={(e) => setImapForm({ ...imapForm, smtpHost: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      placeholder="smtp.example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">SMTP Port</label>
                    <input
                      type="text"
                      value={imapForm.smtpPort}
                      onChange={(e) => setImapForm({ ...imapForm, smtpPort: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                      placeholder="465"
                    />
                  </div>
                </div>

                <Button onClick={handleConnectIMAP} className="w-full">
                  Connect IMAP Account
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Connected Accounts List */}
        <div className="space-y-3">
          {accounts && accounts.length > 0 ? (
            accounts.map((account) => (
              <div key={account.id} className="p-4 bg-card border border-border rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{account.email}</div>
                    <div className="text-sm text-muted-foreground capitalize">{account.provider}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500">Connected</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      try {
                        await syncAccountMutation.mutateAsync({ accountId: account.id });
                        toast.success('Email sync started');
                      } catch (error) {
                        toast.error('Failed to sync emails');
                      }
                    }}
                  >
                    Sync Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteAccount(account.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No email accounts connected</p>
              <p className="text-sm mt-2">Click "Add Account" to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
