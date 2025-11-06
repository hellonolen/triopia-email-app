// Legal Core - Hub for all legal documents
import { Link } from 'wouter';

export default function LegalCore() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Legal & Compliance</h1>
        
        <div className="grid gap-6">
          <Link href="/privacy">
            <div className="p-6 border border-border rounded-lg hover:bg-muted cursor-pointer">
              <h2 className="text-2xl font-semibold mb-2">Privacy Policy</h2>
              <p className="text-muted-foreground">How we collect, use, and protect your data</p>
            </div>
          </Link>

          <Link href="/terms">
            <div className="p-6 border border-border rounded-lg hover:bg-muted cursor-pointer">
              <h2 className="text-2xl font-semibold mb-2">Terms of Service</h2>
              <p className="text-muted-foreground">Terms and conditions for using Triopia</p>
            </div>
          </Link>

          <div className="p-6 border border-border rounded-lg hover:bg-muted cursor-pointer">
            <h2 className="text-2xl font-semibold mb-2">Refund Policy</h2>
            <p className="text-muted-foreground">Our refund and cancellation policy</p>
          </div>

          <div className="p-6 border border-border rounded-lg hover:bg-muted cursor-pointer">
            <h2 className="text-2xl font-semibold mb-2">Cookie Policy</h2>
            <p className="text-muted-foreground">How we use cookies and tracking technologies</p>
          </div>

          <div className="p-6 border border-border rounded-lg hover:bg-muted cursor-pointer">
            <h2 className="text-2xl font-semibold mb-2">Data Processing Agreement (DPA)</h2>
            <p className="text-muted-foreground">For enterprise customers - GDPR compliance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
