export default function Terms() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: November 6, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
            <p className="text-foreground leading-relaxed mb-4">
              By accessing or using Triopia, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Use License</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Permission is granted to use Triopia for personal or commercial email management purposes. This license shall automatically terminate if you violate any of these restrictions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
            <p className="text-foreground leading-relaxed mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Ensuring your use complies with applicable laws</li>
              <li>The content of emails sent through our platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
            <p className="text-foreground leading-relaxed mb-4">
              You may not use Triopia to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-foreground">
              <li>Send spam or unsolicited communications</li>
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit malware or harmful code</li>
              <li>Impersonate others or provide false information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We strive to provide reliable service but do not guarantee uninterrupted access. We reserve the right to modify or discontinue the service at any time without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-foreground leading-relaxed mb-4">
              Triopia shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p className="text-foreground leading-relaxed mb-4">
              We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-foreground leading-relaxed">
              For questions about these Terms of Service, contact us at{' '}
              <a href="mailto:legal@triopia.com" className="text-primary hover:underline">
                legal@triopia.com
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
