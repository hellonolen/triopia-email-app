import { AlertCircle, TrendingUp, Clock, Zap } from 'lucide-react';

type Priority = 'urgent' | 'high' | 'normal' | 'low';

interface PriorityBadgeProps {
  priority: Priority;
  showLabel?: boolean;
}

export default function PriorityBadge({ priority, showLabel = false }: PriorityBadgeProps) {
  const config = {
    urgent: {
      icon: AlertCircle,
      label: 'Urgent',
      className: 'bg-destructive/10 text-destructive border-destructive/20',
      iconClassName: 'text-destructive',
    },
    high: {
      icon: TrendingUp,
      label: 'High Priority',
      className: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
      iconClassName: 'text-orange-600',
    },
    normal: {
      icon: Zap,
      label: 'Normal',
      className: 'bg-primary/10 text-primary border-primary/20',
      iconClassName: 'text-primary',
    },
    low: {
      icon: Clock,
      label: 'Low Priority',
      className: 'bg-muted text-muted-foreground border-border',
      iconClassName: 'text-muted-foreground',
    },
  };

  const { icon: Icon, label, className, iconClassName } = config[priority];

  if (!showLabel) {
    return (
      <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full border ${className}`}>
        <Icon className={`w-3.5 h-3.5 ${iconClassName}`} />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${className}`}>
      <Icon className={`w-3.5 h-3.5 ${iconClassName}`} />
      <span>{label}</span>
    </div>
  );
}
