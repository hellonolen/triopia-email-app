// App Core - Main dashboard
import { trpc } from '@/lib/trpc';

export default function AppCore() {
  const { data: notifications } = trpc.notificationsCore.list.useQuery({ userId: 'demo-user' });
  const { data: activity } = trpc.activity.list.useQuery({ userId: 'demo-user' });

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 border border-border rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Users</h3>
            <p className="text-3xl font-bold">1,234</p>
          </div>
          
          <div className="p-6 border border-border rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Active Subscriptions</h3>
            <p className="text-3xl font-bold">856</p>
          </div>
          
          <div className="p-6 border border-border rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Monthly Revenue</h3>
            <p className="text-3xl font-bold">$42,500</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
            {notifications && notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.slice(0, 5).map((notif) => (
                  <div key={notif.id} className="p-3 bg-muted rounded">
                    <p className="font-medium">{notif.title}</p>
                    <p className="text-sm text-muted-foreground">{notif.message}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No notifications</p>
            )}
          </div>

          <div className="border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            {activity && activity.length > 0 ? (
              <div className="space-y-3">
                {activity.slice(0, 5).map((act) => (
                  <div key={act.id} className="p-3 bg-muted rounded">
                    <p className="font-medium">{act.action}</p>
                    <p className="text-sm text-muted-foreground">{act.resource}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
