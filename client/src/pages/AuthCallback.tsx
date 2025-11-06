import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function AuthCallback() {
  const [, setLocation] = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Connecting your account...');

  const connectGmailMutation = trpc.email.connectGmailAccount.useMutation();
  const connectOutlookMutation = trpc.email.connectOutlookAccount.useMutation();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const provider = window.location.pathname.includes('gmail') ? 'gmail' : 'outlook';
      const error = params.get('error');

      if (error) {
        setStatus('error');
        setMessage(`Authentication failed: ${error}`);
        setTimeout(() => setLocation('/'), 3000);
        return;
      }

      if (!code) {
        setStatus('error');
        setMessage('No authorization code received');
        setTimeout(() => setLocation('/'), 3000);
        return;
      }

      try {
        if (provider === 'gmail') {
          await connectGmailMutation.mutateAsync({ code });
        } else {
          await connectOutlookMutation.mutateAsync({ code });
        }
        
        setStatus('success');
        setMessage(`${provider === 'gmail' ? 'Gmail' : 'Outlook'} account connected successfully!`);
        setTimeout(() => setLocation('/'), 2000);
      } catch (error) {
        setStatus('error');
        setMessage('Failed to connect account. Please try again.');
        setTimeout(() => setLocation('/'), 3000);
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-primary" />
            <h2 className="text-2xl font-semibold mb-2">{message}</h2>
            <p className="text-muted-foreground">Please wait...</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-semibold mb-2">{message}</h2>
            <p className="text-muted-foreground">Redirecting to Triopia...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-semibold mb-2">{message}</h2>
            <p className="text-muted-foreground">Redirecting back...</p>
          </>
        )}
      </div>
    </div>
  );
}
