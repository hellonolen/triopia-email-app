// Assistant Core - AI assistant/tours
import { Button } from '@/components/ui/button';

export default function AssistantCore() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">AI Assistant</h1>
        
        <div className="p-6 border border-border rounded-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">How can I help you today?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <p className="font-semibold">Connect an email account</p>
                <p className="text-sm text-muted-foreground">I'll guide you through the setup</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <p className="font-semibold">Organize my inbox</p>
                <p className="text-sm text-muted-foreground">Let me help you clean up</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <p className="font-semibold">Set up email templates</p>
                <p className="text-sm text-muted-foreground">Create reusable templates</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <p className="font-semibold">Learn keyboard shortcuts</p>
                <p className="text-sm text-muted-foreground">Work faster with shortcuts</p>
              </div>
            </Button>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Interactive Tours</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">🎯 Getting Started Tour</Button>
            <Button variant="outline" className="w-full justify-start">✨ AI Features Tour</Button>
            <Button variant="outline" className="w-full justify-start">⚙️ Advanced Settings Tour</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
