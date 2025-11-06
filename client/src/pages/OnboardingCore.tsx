// Onboarding Core - Onboarding flow
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function OnboardingCore() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome to Triopia</h1>
          <p className="text-muted-foreground">Let's get you set up in 3 easy steps</p>
        </div>

        <div className="p-8 border border-border rounded-lg">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 1: Connect Your Email</h2>
              <p className="text-muted-foreground mb-6">Connect your Gmail, Outlook, or IMAP account to get started</p>
              <div className="space-y-3">
                <Button className="w-full">Connect Gmail</Button>
                <Button className="w-full" variant="outline">Connect Outlook</Button>
                <Button className="w-full" variant="outline">Connect IMAP</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 2: Set Your Preferences</h2>
              <p className="text-muted-foreground mb-6">Customize your email experience</p>
              <div className="space-y-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Enable AI email summaries
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Enable desktop notifications
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Auto-categorize emails
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Step 3: You're All Set!</h2>
              <p className="text-muted-foreground mb-6">Start managing your emails with Triopia</p>
              <Button className="w-full">Go to Inbox</Button>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button variant="outline" disabled={step === 1} onClick={() => setStep(step - 1)}>
              Back
            </Button>
            <Button disabled={step === 3} onClick={() => setStep(step + 1)}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
