import { Mail, Star, Send, FileText, Archive, Trash2, Calendar, Settings, Plus, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  selectedFolder: string;
  onFolderSelect: (folder: string) => void;
  getUnreadCount: (folder: string) => number;
  onCompose?: () => void;
}

export default function Sidebar({ selectedFolder, onFolderSelect, getUnreadCount, onCompose }: SidebarProps) {
  const folders = [
    { id: 'inbox', label: 'Inbox', icon: Mail },
    { id: 'starred', label: 'Starred', icon: Star },
    { id: 'sent', label: 'Sent', icon: Send },
    { id: 'drafts', label: 'Drafts', icon: FileText },
    { id: 'archive', label: 'Archive', icon: Archive },
    { id: 'trash', label: 'Trash', icon: Trash2 },
  ];

  const bottomItems = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-[280px] bg-card border-r border-border flex flex-col h-full p-6">
      <div className="mb-8">
        <Button
          onClick={onCompose}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Compose
        </Button>
      </div>

      <nav className="flex-1 space-y-1">
        {folders.map((folder) => {
          const Icon = folder.icon;
          const count = getUnreadCount(folder.id);
          const isActive = selectedFolder === folder.id;

          return (
            <button
              key={folder.id}
              onClick={() => onFolderSelect(folder.id)}
              className={`
                w-full flex items-center justify-between px-4 py-3 rounded-lg
                transition-all duration-200
                ${isActive 
                  ? 'bg-muted font-medium' 
                  : 'hover:bg-muted/50'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 transition-all duration-200 ${isActive ? 'text-primary scale-110' : 'text-muted-foreground'}`} />
                <span className="text-sm">{folder.label}</span>
              </div>
              {count > 0 && (
                <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full min-w-[24px] text-center transition-transform duration-200 hover:scale-110">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-border space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted/50 transition-all duration-200"
            >
              <Icon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
