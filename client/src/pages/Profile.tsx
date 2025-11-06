import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { User, Mail, Bell, Eye, Shield, Trash2 } from 'lucide-react';

export default function Profile() {
  const { data: user } = trpc.auth.me.useQuery();
  const { data: accounts, refetch: refetchAccounts } = trpc.email.listAccounts.useQuery();
  const { data: preferences, refetch: refetchPreferences } = trpc.preferences.get.useQuery();
  
  const updatePreferencesMutation = trpc.preferences.update.useMutation();
  const deleteAccountMutation = trpc.email.deleteAccount.useMutation();

  const [prefs, setPrefs] = useState(preferences || {
    emailNotifications: 1,
    desktopNotifications: 1,
    soundEnabled: 1,
    notifyOnImportant: 1,
    notifyOnMentions: 1,
    theme: 'light' as const,
    emailsPerPage: 50,
    showPreview: 1,
    compactView: 0,
    readReceipts: 0,
    allowTracking: 0,
  });

  const handleSavePreferences = async () => {
    try {
      await updatePreferencesMutation.mutateAsync(prefs);
      toast.success('Preferences saved');
      refetchPreferences();
    } catch (error) {
      toast.error('Failed to save preferences');
    }
  };

  const handleDeleteAccount = async (accountId: number, email: string) => {
    if (!confirm(`Delete email account ${email}? This will remove all synced emails.`)) return;

    try {
      await deleteAccountMutation.mutateAsync({ id: accountId });
      toast.success('Account deleted');
      refetchAccounts();
    } catch (error) {
      toast.error('Failed to delete account');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8">
        <h1 className="text-3xl font-bold mb-8">Profile & Settings</h1>

        {/* User Info Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.name || 'User'}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Connected Accounts Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Connected Email Accounts</h3>
          </div>

          {accounts && accounts.length > 0 ? (
            <div className="space-y-3">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{account.email}</div>
                      <div className="text-sm text-muted-foreground">
                        {account.provider.charAt(0).toUpperCase() + account.provider.slice(1)} · 
                        {account.isActive ? ' Active' : ' Inactive'}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteAccount(account.id, account.email)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No email accounts connected</p>
          )}
        </div>

        {/* Notification Preferences */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Notification Preferences</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">Receive email notifications for new messages</div>
              </div>
              <input
                type="checkbox"
                checked={prefs.emailNotifications === 1}
                onChange={(e) => setPrefs({ ...prefs, emailNotifications: e.target.checked ? 1 : 0 })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Desktop Notifications</div>
                <div className="text-sm text-muted-foreground">Show desktop notifications</div>
              </div>
              <input
                type="checkbox"
                checked={prefs.desktopNotifications === 1}
                onChange={(e) => setPrefs({ ...prefs, desktopNotifications: e.target.checked ? 1 : 0 })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Sound</div>
                <div className="text-sm text-muted-foreground">Play sound for new messages</div>
              </div>
              <input
                type="checkbox"
                checked={prefs.soundEnabled === 1}
                onChange={(e) => setPrefs({ ...prefs, soundEnabled: e.target.checked ? 1 : 0 })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Important Emails Only</div>
                <div className="text-sm text-muted-foreground">Only notify for important messages</div>
              </div>
              <input
                type="checkbox"
                checked={prefs.notifyOnImportant === 1}
                onChange={(e) => setPrefs({ ...prefs, notifyOnImportant: e.target.checked ? 1 : 0 })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Mentions</div>
                <div className="text-sm text-muted-foreground">Notify when you're mentioned</div>
              </div>
              <input
                type="checkbox"
                checked={prefs.notifyOnMentions === 1}
                onChange={(e) => setPrefs({ ...prefs, notifyOnMentions: e.target.checked ? 1 : 0 })}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* Display Preferences */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Display Preferences</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Emails Per Page</label>
              <select
                value={prefs.emailsPerPage}
                onChange={(e) => setPrefs({ ...prefs, emailsPerPage: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Show Email Preview</div>
                <div className="text-sm text-muted-foreground">Display email preview in list</div>
              </div>
              <input
                type="checkbox"
                checked={prefs.showPreview === 1}
                onChange={(e) => setPrefs({ ...prefs, showPreview: e.target.checked ? 1 : 0 })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Compact View</div>
                <div className="text-sm text-muted-foreground">Use compact email list layout</div>
              </div>
              <input
                type="checkbox"
                checked={prefs.compactView === 1}
                onChange={(e) => setPrefs({ ...prefs, compactView: e.target.checked ? 1 : 0 })}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* Privacy Preferences */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Privacy & Security</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Read Receipts</div>
                <div className="text-sm text-muted-foreground">Send read receipts to senders</div>
              </div>
              <input
                type="checkbox"
                checked={prefs.readReceipts === 1}
                onChange={(e) => setPrefs({ ...prefs, readReceipts: e.target.checked ? 1 : 0 })}
                className="w-4 h-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Allow Tracking</div>
                <div className="text-sm text-muted-foreground">Allow email tracking pixels</div>
              </div>
              <input
                type="checkbox"
                checked={prefs.allowTracking === 1}
                onChange={(e) => setPrefs({ ...prefs, allowTracking: e.target.checked ? 1 : 0 })}
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSavePreferences} size="lg">
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
