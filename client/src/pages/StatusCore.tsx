// Status Core - System status page
export default function StatusCore() {
  const services = [
    { name: 'API Server', status: 'operational', uptime: '99.99%' },
    { name: 'Email Sync', status: 'operational', uptime: '99.95%' },
    { name: 'WebSocket', status: 'operational', uptime: '99.98%' },
    { name: 'Database', status: 'operational', uptime: '100%' },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">System Status</h1>
        <p className="text-lg text-green-600 mb-8">All Systems Operational</p>

        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.name} className="p-6 border border-border rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {service.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 border border-border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Incidents</h2>
          <p className="text-muted-foreground">No incidents in the past 90 days</p>
        </div>
      </div>
    </div>
  );
}
