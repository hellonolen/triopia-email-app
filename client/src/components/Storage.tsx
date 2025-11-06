import { useState } from 'react';
import { Cloud, HardDrive, FolderOpen, File, Download, Upload, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StorageProvider {
  id: string;
  name: string;
  icon: string;
  isConnected: boolean;
  usedSpace?: string;
  totalSpace?: string;
}

export default function Storage() {
  const [providers, setProviders] = useState<StorageProvider[]>([
    { id: 'mega', name: 'Mega', icon: '☁️', isConnected: false },
    { id: 'dropbox', name: 'Dropbox', icon: '📦', isConnected: false },
    { id: 'onedrive', name: 'OneDrive', icon: '📁', isConnected: false },
  ]);

  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const handleConnect = (providerId: string) => {
    // In a real implementation, this would open OAuth flow
    console.log(`Connecting to ${providerId}...`);
    setProviders(providers.map(p =>
      p.id === providerId
        ? { ...p, isConnected: true, usedSpace: '2.4 GB', totalSpace: '15 GB' }
        : p
    ));
  };

  const handleDisconnect = (providerId: string) => {
    setProviders(providers.map(p =>
      p.id === providerId
        ? { ...p, isConnected: false, usedSpace: undefined, totalSpace: undefined }
        : p
    ));
    if (selectedProvider === providerId) {
      setSelectedProvider(null);
    }
  };

  const connectedProvider = selectedProvider
    ? providers.find(p => p.id === selectedProvider)
    : null;

  return (
    <div className="flex h-full">
      {/* Providers List */}
      <div className="w-[350px] border-r border-border flex flex-col bg-background">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold mb-1">Cloud Storage</h2>
          <p className="text-xs text-muted-foreground">
            Connect your cloud storage providers
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className={`
                p-4 rounded-lg border border-border transition-all duration-200
                ${selectedProvider === provider.id ? 'bg-primary/5 border-primary' : 'bg-card hover:bg-muted/50'}
                ${provider.isConnected ? 'cursor-pointer' : ''}
              `}
              onClick={() => provider.isConnected && setSelectedProvider(provider.id)}
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{provider.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1">{provider.name}</h3>
                  {provider.isConnected ? (
                    <>
                      <p className="text-xs text-muted-foreground mb-2">
                        {provider.usedSpace} of {provider.totalSpace} used
                      </p>
                      <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: '16%' }}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDisconnect(provider.id);
                        }}
                        className="text-xs"
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConnect(provider.id);
                      }}
                      className="bg-primary hover:bg-primary/90 text-xs"
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground">
            Connected storage can be used to attach files to emails or save email attachments.
          </p>
        </div>
      </div>

      {/* File Browser */}
      <div className="flex-1 bg-background">
        {connectedProvider ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">{connectedProvider.name} Files</h2>
                <p className="text-sm text-muted-foreground">
                  Browse and manage your files
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                <Button variant="outline" size="sm">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  New Folder
                </Button>
              </div>
            </div>

            {/* Sample Files */}
            <div className="space-y-2">
              {[
                { name: 'Documents', type: 'folder', size: '—', modified: 'Oct 15, 2024' },
                { name: 'Photos', type: 'folder', size: '—', modified: 'Oct 10, 2024' },
                { name: 'Q4_Report.pdf', type: 'file', size: '2.4 MB', modified: 'Nov 5, 2024' },
                { name: 'Presentation.pptx', type: 'file', size: '5.1 MB', modified: 'Nov 3, 2024' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                >
                  {item.type === 'folder' ? (
                    <FolderOpen className="w-5 h-5 text-primary" />
                  ) : (
                    <File className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.size} · Modified {item.modified}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 hover:bg-muted rounded-lg transition-all duration-200">
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-all duration-200">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Cloud className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No storage connected</h3>
              <p className="text-sm text-muted-foreground">
                Connect a cloud storage provider to browse and manage files
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
