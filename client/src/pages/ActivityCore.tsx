// Activity Core - Activity/audit log viewer
import { trpc } from '@/lib/trpc';

export default function ActivityCore() {
  const { data: activity } = trpc.activity.list.useQuery({ userId: 'demo-user' });

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Activity Log</h1>
        {activity && activity.length > 0 ? (
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left">Action</th>
                  <th className="p-3 text-left">Resource</th>
                  <th className="p-3 text-left">Timestamp</th>
                  <th className="p-3 text-left">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {activity.map((act) => (
                  <tr key={act.id} className="border-t border-border">
                    <td className="p-3">{act.action}</td>
                    <td className="p-3">{act.resource || '-'}</td>
                    <td className="p-3">{new Date(act.createdAt!).toLocaleString()}</td>
                    <td className="p-3 font-mono text-sm">{act.ipAddress || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground">No activity logged yet</p>
        )}
      </div>
    </div>
  );
}
