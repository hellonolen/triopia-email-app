import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, CheckCircle2, Clock, Users } from 'lucide-react';

interface FreshStartProps {
  onNavigate: (folder: string) => void;
}

export default function FreshStart({ onNavigate }: FreshStartProps) {
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  });

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-4xl py-12 px-6">
        {/* Greeting Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {greeting}!
          </h1>
          <p className="text-xl text-muted-foreground">{today}</p>
          <p className="text-sm text-muted-foreground mt-2">
            New Chapter, New Email
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50"
            onClick={() => onNavigate('inbox')}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Inbox</h3>
                <p className="text-sm text-muted-foreground">
                  Check your messages
                </p>
                <div className="mt-2 text-2xl font-bold text-primary">
                  18 <span className="text-sm font-normal text-muted-foreground">new</span>
                </div>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50"
            onClick={() => onNavigate('new-connections')}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">New Connections</h3>
                <p className="text-sm text-muted-foreground">
                  Review new senders
                </p>
                <div className="mt-2 text-2xl font-bold text-blue-600">
                  3 <span className="text-sm font-normal text-muted-foreground">pending</span>
                </div>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50"
            onClick={() => onNavigate('paused')}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-orange-500/10">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Paused</h3>
                <p className="text-sm text-muted-foreground">
                  Items set aside for later
                </p>
                <div className="mt-2 text-2xl font-bold text-orange-600">
                  5 <span className="text-sm font-normal text-muted-foreground">paused</span>
                </div>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50"
            onClick={() => onNavigate('priority')}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Priority</h3>
                <p className="text-sm text-muted-foreground">
                  Important messages
                </p>
                <div className="mt-2 text-2xl font-bold text-green-600">
                  1 <span className="text-sm font-normal text-muted-foreground">urgent</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Today's Focus */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold text-lg mb-4">Today's Focus</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm">Review Q4 Marketing Strategy</span>
              </div>
              <span className="text-xs text-muted-foreground">Sarah Johnson</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Lunch meeting confirmation</span>
              </div>
              <span className="text-xs text-muted-foreground">David Chen</span>
            </div>
          </div>
        </Card>

        {/* Quick Start Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="px-8"
            onClick={() => onNavigate('inbox')}
          >
            Let's Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
