// Billing Core - Subscriptions, invoices, payment methods
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';

export default function BillingCore() {
  const { data: subscription } = trpc.billing.getSubscription.useQuery({ userId: 'demo-user' });
  const { data: invoices } = trpc.billing.listInvoices.useQuery({ userId: 'demo-user' });

  const plans = [
    { id: 'starter', name: 'Starter', price: 29, features: ['5 email accounts', '10GB storage', 'Basic support'] },
    { id: 'pro', name: 'Professional', price: 79, features: ['20 email accounts', '100GB storage', 'Priority support', 'AI features'] },
    { id: 'enterprise', name: 'Enterprise', price: 199, features: ['Unlimited accounts', '1TB storage', '24/7 support', 'Advanced AI', 'Custom integrations'] },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Billing & Subscriptions</h1>

        {/* Current Subscription */}
        <div className="mb-8 p-6 border border-border rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Current Plan</h2>
          {subscription ? (
            <div>
              <p className="text-lg">Plan: <span className="font-semibold">{subscription.planId}</span></p>
              <p className="text-sm text-muted-foreground">Status: {subscription.status}</p>
              <Button className="mt-4">Manage Subscription</Button>
            </div>
          ) : (
            <p className="text-muted-foreground">No active subscription</p>
          )}
        </div>

        {/* Available Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.id} className="p-6 border border-border rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold mb-4">${plan.price}<span className="text-sm text-muted-foreground">/mo</span></p>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-sm">✓ {feature}</li>
                  ))}
                </ul>
                <Button className="w-full">Select Plan</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Invoices */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Invoice History</h2>
          {invoices && invoices.length > 0 ? (
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-t border-border">
                      <td className="p-3">{new Date(invoice.createdAt!).toLocaleDateString()}</td>
                      <td className="p-3">${(invoice.amount / 100).toFixed(2)}</td>
                      <td className="p-3">{invoice.status}</td>
                      <td className="p-3">
                        <Button variant="outline" size="sm">Download</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground">No invoices yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
