// Logs Core - Error & logs viewer
export default function LogsCore() {
  const logs = [
    { id: 1, level: 'error', message: 'Failed to sync email account', timestamp: new Date().toISOString() },
    { id: 2, level: 'warn', message: 'Rate limit approaching', timestamp: new Date().toISOString() },
    { id: 3, level: 'info', message: 'Email sent successfully', timestamp: new Date().toISOString() },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">System Logs</h1>
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full font-mono text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Level</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-t border-border">
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      log.level === 'error' ? 'bg-red-100 text-red-800' :
                      log.level === 'warn' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {log.level}
                    </span>
                  </td>
                  <td className="p-3">{log.message}</td>
                  <td className="p-3">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
