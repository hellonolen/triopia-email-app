// Flags Core - Feature flags management
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';

export default function FlagsCore() {
  const { data: flags } = trpc.systemCore.listFlags.useQuery();
  const toggleFlag = trpc.systemCore.toggleFlag.useMutation();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Feature Flags</h1>
        {flags && flags.length > 0 ? (
          <div className="space-y-4">
            {flags.map((flag) => (
              <div key={flag.id} className="p-6 border border-border rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{flag.name}</h3>
                  <p className="text-sm text-muted-foreground">{flag.description}</p>
                </div>
                <Button variant={flag.enabled ? 'default' : 'outline'}>
                  {flag.enabled ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No feature flags defined</p>
        )}
      </div>
    </div>
  );
}
