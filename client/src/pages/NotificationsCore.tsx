// Notifications Core - Notification center
import { trpc } from '@/lib/trpc';

export default function NotificationsCore() {
  const { data: notifications } = trpc.notificationsCore.list.useQuery({ userId: 'demo-user' });

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Notifications</h1>
        {notifications && notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className={`p-6 border border-border rounded-lg ${notif.isRead ? 'opacity-60' : ''}`}>
                <h3 className="font-semibold">{notif.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                <p className="text-xs text-muted-foreground mt-2">{new Date(notif.createdAt!).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No notifications</p>
        )}
      </div>
    </div>
  );
}
