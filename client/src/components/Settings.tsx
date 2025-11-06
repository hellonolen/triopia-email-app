import { useState, useEffect } from 'react';
import { Mail, Trash2, Plus, RefreshCw, ExternalLink, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { EMAIL_PROVIDERS, getProviderById, getProviderByEmail, type EmailProvider } from '../../../shared/emailProviders';

export default function Settings() {
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

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
    smtpPort: '587',
  });

  // Auto-detect provider from email
  useEffect(() => {
    if (imapForm.email && selectedProvider === 'custom') {
      const detectedProvider = getProviderByEmail(imapForm.email);
      if (detectedProvider) {
        setImapForm(prev => ({
          ...prev,
          imapHost: detectedProvider.imapHost,
          imapPort: detectedProvider.imapPort.toString(),
          smtpHost: detectedProvider.smtpHost,
          smtpPort: detectedProvider.smtpPort.toString(),
        }));
      }
    }
  }, [imapForm.email, selectedProvider]);

  // Pre-fill form when provider is selected
  useEffect(() => {
    if (selectedProvider && selectedProvider !== 'gmail' && selectedProvider !== 'outlook') {
      const provider = getProviderById(selectedProvider);
      if (provider) {
        setImapForm(prev => ({
          ...prev,
          imapHost: provider.imapHost,
          imapPort: provider.imapPort.toString(),
          smtpHost: provider.smtpHost,
          smtpPort: provider.smtpPort.toString(),
        }));
      }
    }
  }, [selectedProvider]);

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
    if (!imapForm.email || !imapForm.password || !imapForm.imapHost || !imapForm.smtpHost) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await connectCustomAccountMutation.mutateAsync({
        email: imapForm.email,
        password: imapForm.password,
        imapHost: imapForm.imapHost,
        imapPort: parseInt(imapForm.imapPort),
        smtpHost: imapForm.smtpHost,
        smtpPort: parseInt(imapForm.smtpPort)
      });
      toast.success('Email account connected successfully');
      setShowAddAccount(false);
      setSelectedProvider(null);
      setImapForm({
        email: '',
        password: '',
        imapHost: '',
        imapPort: '993',
        smtpHost: '',
        smtpPort: '587',
      });
      refetch();
    } catch (error) {
      toast.error('Failed to connect email account. Please check your credentials and settings.');
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

  const handleSyncAccount = async (accountId: number) => {
    try {
      await syncAccountMutation.mutateAsync({ accountId });
      toast.success('Account sync started');
    } catch (error) {
      toast.error('Failed to sync account');
    }
  };

  const currentProvider = selectedProvider ? getProviderById(selectedProvider) : null;

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
            <p className="text-sm text-muted-foreground">Connect your email accounts using IMAP/SMTP</p>
          </div>
          <Button
            onClick={() => {
              setShowAddAccount(!showAddAccount);
              if (showAddAccount) {
                setSelectedProvider(null);
              }
            }}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Account
          </Button>
        </div>

        {/* Add Account Form */}
        {showAddAccount && (
          <div className="p-6 bg-card border border-border rounded-lg space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Choose Your Email Provider</h4>
              <p className="text-sm text-muted-foreground">Select your provider for quick setup with pre-configured settings</p>
            </div>
            
            {/* Provider Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {EMAIL_PROVIDERS.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${
                    selectedProvider === provider.id
                      ? 'border-primary bg-primary/10 shadow-sm' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium">{provider.name}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Provider-Specific Forms */}
            {selectedProvider === 'gmail' && (
              <div className="p-5 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-1">
                    <h5 className="font-semibold mb-2">Connect Gmail</h5>
                    <p className="text-sm text-muted-foreground mb-3">
                      {currentProvider?.instructions}
                    </p>
                    {currentProvider?.helpUrl && (
                      <a 
                        href={currentProvider.helpUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <HelpCircle className="w-3 h-3" />
                        View Gmail setup guide
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
                <Button onClick={handleConnectGmail} className="w-full" disabled={!gmailAuthUrl}>
                  {gmailAuthUrl ? 'Connect Gmail Account (OAuth)' : 'Loading...'}
                </Button>
                <div className="mt-3 text-center">
                  <button
                    onClick={() => setSelectedProvider('custom')}
                    className="text-sm text-muted-foreground hover:text-foreground underline"
                  >
                    Or connect manually with IMAP/SMTP
                  </button>
                </div>
              </div>
            )}

            {selectedProvider === 'outlook' && (
              <div className="p-5 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-1">
                    <h5 className="font-semibold mb-2">Connect Outlook</h5>
                    <p className="text-sm text-muted-foreground mb-3">
                      {currentProvider?.instructions}
                    </p>
                    {currentProvider?.helpUrl && (
                      <a 
                        href={currentProvider.helpUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <HelpCircle className="w-3 h-3" />
                        View Outlook setup guide
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
                <Button onClick={handleConnectOutlook} className="w-full" disabled={!outlookAuthUrl}>
                  {outlookAuthUrl ? 'Connect Outlook Account (OAuth)' : 'Loading...'}
                </Button>
                <div className="mt-3 text-center">
                  <button
                    onClick={() => setSelectedProvider('custom')}
                    className="text-sm text-muted-foreground hover:text-foreground underline"
                  >
                    Or connect manually with IMAP/SMTP
                  </button>
                </div>
              </div>
            )}

            {/* IMAP/SMTP Form for all other providers */}
            {selectedProvider && selectedProvider !== 'gmail' && selectedProvider !== 'outlook' && (
              <div className="space-y-4">
                {currentProvider && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h5 className="font-semibold mb-1 text-blue-900 dark:text-blue-100">
                          {currentProvider.name} Setup Instructions
                        </h5>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                          {currentProvider.instructions}
                        </p>
                        {currentProvider.helpUrl && (
                          <a 
                            href={currentProvider.helpUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View detailed setup guide
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={imapForm.email}
                      onChange={(e) => setImapForm({ ...imapForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Password / App Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      value={imapForm.password}
                      onChange={(e) => setImapForm({ ...imapForm, password: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="••••••••••••••••"
                    />
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h5 className="font-medium mb-3 text-sm">IMAP Settings (Incoming Mail)</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        IMAP Server <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={imapForm.imapHost}
                        onChange={(e) => setImapForm({ ...imapForm, imapHost: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="imap.example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Port</label>
                      <input
                        type="text"
                        value={imapForm.imapPort}
                        onChange={(e) => setImapForm({ ...imapForm, imapPort: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="993"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h5 className="font-medium mb-3 text-sm">SMTP Settings (Outgoing Mail)</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">
                        SMTP Server <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={imapForm.smtpHost}
                        onChange={(e) => setImapForm({ ...imapForm, smtpHost: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="smtp.example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Port</label>
                      <input
                        type="text"
                        value={imapForm.smtpPort}
                        onChange={(e) => setImapForm({ ...imapForm, smtpPort: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="587"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button 
                    onClick={handleConnectIMAP} 
                    className="flex-1"
                    disabled={connectCustomAccountMutation.isPending}
                  >
                    {connectCustomAccountMutation.isPending ? 'Connecting...' : 'Connect Account'}
                  </Button>
                  <Button 
                    onClick={() => {
                      setSelectedProvider(null);
                      setImapForm({
                        email: '',
                        password: '',
                        imapHost: '',
                        imapPort: '993',
                        smtpHost: '',
                        smtpPort: '587',
                      });
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Connected Accounts List */}
        <div className="space-y-3">
          {accounts && accounts.length > 0 ? (
            accounts.map((account: any) => (
              <div
                key={account.id}
                className="p-4 bg-card border border-border rounded-lg flex items-center justify-between hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">{account.email}</div>
                    <div className="text-sm text-muted-foreground">
                      {account.provider === 'gmail' && 'Gmail'}
                      {account.provider === 'outlook' && 'Outlook'}
                      {account.provider === 'imap' && 'IMAP/SMTP'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleSyncAccount(account.id)}
                    variant="outline"
                    size="sm"
                    disabled={syncAccountMutation.isPending}
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Sync
                  </Button>
                  <Button
                    onClick={() => handleDeleteAccount(account.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-muted/30 rounded-lg border border-dashed border-border">
              <Mail className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-muted-foreground mb-2">No email accounts connected</p>
              <p className="text-sm text-muted-foreground">Click "Add Account" to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
