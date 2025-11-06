export default function Privacy() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: November 6, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Triopia ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our email management platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>Email account credentials (encrypted)</li>
              <li>Email content and metadata</li>
              <li>Calendar events and contacts</li>
              <li>Usage data and preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and deliver email communications</li>
              <li>Provide AI-powered features like summarization and smart replies</li>
              <li>Sync your calendar and contacts</li>
              <li>Send you technical notices and support messages</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We implement industry-standard security measures to protect your data, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>AES-256 encryption for stored credentials</li>
              <li>TLS/SSL encryption for data in transit</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We integrate with third-party services including Gmail, Outlook, and OpenAI. These services have their own privacy policies governing the use of your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-foreground leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt-out of certain data processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-foreground leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@triopia.com" className="text-primary hover:underline">
                privacy@triopia.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12">
          <a href="/" className="text-primary hover:underline">
            ← Back to Triopia
          </a>
        </div>
      </div>
    </div>
  );
}
