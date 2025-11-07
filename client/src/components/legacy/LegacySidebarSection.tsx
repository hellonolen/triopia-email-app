import { Link, useLocation } from 'wouter';
import {
  Home, Inbox, Star, UserPlus, Pause, CheckCircle2,
  Send, FilePen, Archive, AlertCircle, Trash2, HardDrive,
  FileText, Calendar, Users, BarChart3, Palette, Settings,
  User, Shield
} from 'lucide-react';

type RouteConfig = {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
};

const routes: RouteConfig[] = [
  { path: '/', label: 'Fresh Start', icon: Home },
  { path: '/inbox', label: 'Inbox', icon: Inbox, count: 12 },
  { path: '/starred', label: 'Starred', icon: Star, count: 3 },
  { path: '/new-connections', label: 'New Connections', icon: UserPlus, count: 5 },
  { path: '/paused', label: 'Paused', icon: Pause, count: 2 },
  { path: '/complete', label: 'Complete', icon: CheckCircle2, count: 8 },
  { path: '/sent', label: 'Sent', icon: Send },
  { path: '/drafts', label: 'Drafts', icon: FilePen, count: 2 },
  { path: '/archive', label: 'Archive', icon: Archive },
  { path: '/spam', label: 'Spam', icon: AlertCircle },
  { path: '/trash', label: 'Trash', icon: Trash2 },
  { path: '/storage', label: 'Storage', icon: HardDrive },
  { path: '/notes', label: 'Notes', icon: FileText },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
  { path: '/contacts', label: 'Contacts', icon: Users },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/appearance', label: 'Appearance', icon: Palette },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/admin', label: 'Admin', icon: Shield },
];

export function LegacySidebarSection() {
  const [location] = useLocation();

  return (
    <div className="flex flex-col gap-0.5" data-testid="sidebar-section">
      {routes.map((route) => {
        const Icon = route.icon;
        const isActive = location === route.path;

        return (
          <Link
            key={route.path}
            href={route.path}
            className={`
              flex items-center justify-between px-3 py-1.5 rounded
              transition-colors cursor-pointer
              ${isActive 
                ? 'bg-triopia-peach/20 text-triopia-dark' 
                : 'text-triopia-dark/70 hover:bg-triopia-cream/50'
              }
            `}
            data-testid={`sidebar-link-${route.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span className="text-sm font-normal">{route.label}</span>
            </div>
            {route.count !== undefined && (
              <span className="text-xs text-triopia-dark/50 font-normal">
                {route.count}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
