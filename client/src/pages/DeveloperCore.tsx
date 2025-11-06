// Developer Core - API tokens, webhooks, dev console, API docs
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function DeveloperCore() {
  const [activeTab, setActiveTab] = useState<'tokens' | 'webhooks' | 'docs'>('tokens');
  const { data: tokens } = trpc.systemCore.listTokens.useQuery({ userId: 'demo-user' });
  const { data: webhooks } = trpc.systemCore.listWebhooks.useQuery({ userId: 'demo-user' });

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Developer Console</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('tokens')}
            className={`pb-2 px-4 ${activeTab === 'tokens' ? 'border-b-2 border-primary font-semibold' : 'text-muted-foreground'}`}
          >
            API Tokens
          </button>
          <button
            onClick={() => setActiveTab('webhooks')}
            className={`pb-2 px-4 ${activeTab === 'webhooks' ? 'border-b-2 border-primary font-semibold' : 'text-muted-foreground'}`}
          >
            Webhooks
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`pb-2 px-4 ${activeTab === 'docs' ? 'border-b-2 border-primary font-semibold' : 'text-muted-foreground'}`}
          >
            API Docs
          </button>
        </div>

        {/* API Tokens */}
        {activeTab === 'tokens' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">API Tokens</h2>
              <Button>Create Token</Button>
            </div>
            {tokens && tokens.length > 0 ? (
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Token</th>
                      <th className="p-3 text-left">Created</th>
                      <th className="p-3 text-left">Last Used</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((token) => (
                      <tr key={token.id} className="border-t border-border">
                        <td className="p-3">{token.name}</td>
                        <td className="p-3 font-mono text-sm">{token.token.substring(0, 20)}...</td>
                        <td className="p-3">{new Date(token.createdAt!).toLocaleDateString()}</td>
                        <td className="p-3">{token.lastUsedAt ? new Date(token.lastUsedAt).toLocaleDateString() : 'Never'}</td>
                        <td className="p-3">
                          <Button variant="outline" size="sm">Revoke</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground">No API tokens yet</p>
            )}
          </div>
        )}

        {/* Webhooks */}
        {activeTab === 'webhooks' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Webhooks</h2>
              <Button>Create Webhook</Button>
            </div>
            {webhooks && webhooks.length > 0 ? (
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="p-6 border border-border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-mono text-sm mb-2">{webhook.url}</p>
                        <div className="flex flex-wrap gap-2">
                          {(webhook.events as string[]).map((event, idx) => (
                            <span key={idx} className="px-2 py-1 bg-muted rounded text-xs">{event}</span>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Status: {webhook.enabled ? 'Active' : 'Disabled'}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No webhooks configured</p>
            )}
          </div>
        )}

        {/* API Docs */}
        {activeTab === 'docs' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">API Documentation</h2>
            <div className="p-6 border border-border rounded-lg">
              <h3 className="text-xl font-semibold mb-4">REST API Endpoints</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded">
                  <p className="font-mono text-sm mb-2">GET /api/emails</p>
                  <p className="text-sm text-muted-foreground">Retrieve all emails for authenticated user</p>
                </div>
                <div className="p-4 bg-muted rounded">
                  <p className="font-mono text-sm mb-2">POST /api/emails/send</p>
                  <p className="text-sm text-muted-foreground">Send a new email</p>
                </div>
                <div className="p-4 bg-muted rounded">
                  <p className="font-mono text-sm mb-2">GET /api/accounts</p>
                  <p className="text-sm text-muted-foreground">List connected email accounts</p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Authentication</h4>
                <p className="text-sm text-muted-foreground">Include your API token in the Authorization header:</p>
                <pre className="mt-2 p-4 bg-muted rounded font-mono text-sm">
                  Authorization: Bearer YOUR_API_TOKEN
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
