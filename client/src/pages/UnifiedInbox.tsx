import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function UnifiedInbox() {
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>("inbox");
  
  const folders = [
    { id: "inbox", label: "Inbox", icon: Mail },
    { id: "sent", label: "Sent", icon: Mail },
    { id: "drafts", label: "Drafts", icon: Mail },
    { id: "archive", label: "Archive", icon: Mail },
    { id: "spam", label: "Spam", icon: AlertCircle },
    { id: "trash", label: "Trash", icon: AlertCircle },
  ];
  
  const { data: accounts, refetch: refetchAccounts } = trpc.email.listAccounts.useQuery();
  const { data: allEmails, refetch: refetchEmails } = trpc.email.getEmails.useQuery(
    { accountId: selectedAccount! },
    { enabled: !!selectedAccount }
  );
  
  // Filter emails by selected folder
  const emails = allEmails?.filter((email: any) => email.folder === selectedFolder);
  
  const syncMutation = trpc.email.syncAccount.useMutation({
    onSuccess: () => {
      toast.success("Sync started");
      refetchEmails();
    },
    onError: (error) => {
      toast.error(`Sync failed: ${error.message}`);
    },
  });

  const handleSync = (accountId: number) => {
    syncMutation.mutate({ accountId });
  };

  const getAccountStatusColor = (lastSyncedAt: Date | null) => {
    if (!lastSyncedAt) return "text-yellow-500";
    const hoursSince = (Date.now() - new Date(lastSyncedAt).getTime()) / (1000 * 60 * 60);
    if (hoursSince > 24) return "text-red-500";
    if (hoursSince > 2) return "text-yellow-500";
    return "text-green-500";
  };

  const getAccountStatusIcon = (lastSyncedAt: Date | null) => {
    if (!lastSyncedAt) return <AlertCircle className="w-4 h-4" />;
    const hoursSince = (Date.now() - new Date(lastSyncedAt).getTime()) / (1000 * 60 * 60);
    if (hoursSince > 24) return <AlertCircle className="w-4 h-4" />;
    if (hoursSince > 2) return <AlertCircle className="w-4 h-4" />;
    return <CheckCircle2 className="w-4 h-4" />;
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Account Sidebar */}
      <div className="w-64 border-r border-border bg-sidebar p-4">
        <h2 className="text-lg font-semibold mb-4">Email Accounts</h2>
        
        <div className="space-y-2">
          {accounts?.map((account) => (
            <button
              key={account.id}
              onClick={() => setSelectedAccount(account.id)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selectedAccount === account.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-muted border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium truncate">{account.email}</span>
                <div className={getAccountStatusColor(account.lastSyncedAt)}>
                  {getAccountStatusIcon(account.lastSyncedAt)}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {account.provider}
                </Badge>
                {account.lastSyncedAt && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(account.lastSyncedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => refetchAccounts()}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Accounts
        </Button>
      </div>

      {/* Folder Navigation */}
      <div className="w-48 border-r border-border bg-sidebar p-4">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">FOLDERS</h3>
        <div className="space-y-1">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setSelectedFolder(folder.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedFolder === folder.id
                  ? "bg-primary text-primary-foreground font-medium"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              {folder.label}
            </button>
          ))}
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 flex flex-col">
        {selectedAccount ? (
          <>
            <div className="border-b p-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold capitalize">{selectedFolder}</h1>
              <Button
                onClick={() => handleSync(selectedAccount)}
                disabled={syncMutation.isPending}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${syncMutation.isPending ? "animate-spin" : ""}`} />
                Sync
              </Button>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {emails && emails.length > 0 ? (
                <div className="space-y-2">
                  {emails.map((email: any) => (
                    <div
                      key={email.id}
                      className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-semibold">{email.from}</div>
                          <div className="text-sm text-muted-foreground">{email.fromName}</div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {email.receivedAt ? new Date(email.receivedAt).toLocaleDateString() : ""}
                        </div>
                      </div>
                      <div className="font-medium mb-1">{email.subject}</div>
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {email.snippet || email.body}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <Mail className="w-16 h-16 mb-4" />
                  <p>No emails found</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => handleSync(selectedAccount)}
                  >
                    Sync Emails
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Mail className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">Select an account to view emails</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
