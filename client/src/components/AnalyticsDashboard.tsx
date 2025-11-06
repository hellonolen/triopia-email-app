import { TrendingUp, Mail, Clock, Users, BarChart3, Eye, MousePointer } from 'lucide-react';

export default function AnalyticsDashboard() {
  const stats = [
    { label: 'Total Emails', value: '1,247', change: '+12%', icon: Mail, color: 'text-blue-600' },
    { label: 'Open Rate', value: '68%', change: '+5%', icon: Eye, color: 'text-green-600' },
    { label: 'Avg Response Time', value: '2.4h', change: '-15%', icon: Clock, color: 'text-orange-600' },
    { label: 'Engagement', value: '84%', change: '+8%', icon: MousePointer, color: 'text-purple-600' },
  ];

  const topSenders = [
    { name: 'Sarah Johnson', count: 45, trend: 'up' },
    { name: 'David Chen', count: 38, trend: 'up' },
    { name: 'Microsoft Teams', count: 32, trend: 'down' },
    { name: 'Emily Rodriguez', count: 28, trend: 'up' },
  ];

  const categories = [
    { name: 'Work', count: 542, percentage: 68, color: 'bg-primary' },
    { name: 'Personal', count: 198, percentage: 25, color: 'bg-green-500' },
    { name: 'Notifications', count: 56, percentage: 7, color: 'bg-orange-500' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Email Analytics</h2>
        <select className="px-4 py-2 bg-muted border border-border rounded-lg text-sm">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${stat.color}`} />
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Top Senders */}
        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Top Senders</h3>
          </div>
          <div className="space-y-3">
            {topSenders.map((sender) => (
              <div key={sender.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    {sender.name.charAt(0)}
                  </div>
                  <span className="font-medium">{sender.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{sender.count} emails</span>
                  <TrendingUp className={`w-4 h-4 ${sender.trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Categories */}
        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Email Categories</h3>
          </div>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground">{category.count} ({category.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${category.color} transition-all duration-500`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Actions */}
      <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Suggested Actions
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>You have 12 emails from Sarah Johnson that haven't been responded to in over 48 hours.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Your response time to work emails has improved by 15% this week. Keep it up!</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Consider creating a filter for Microsoft Teams notifications to reduce inbox clutter.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
