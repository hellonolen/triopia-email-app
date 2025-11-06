import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

export function useWebSocketConnection() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const socketInstance = io({
      path: '/api/socket.io',
      transports: ['websocket', 'polling']
    });

    socketInstance.on('connect', () => {
      console.log('[WebSocket] Connected');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('[WebSocket] Disconnected');
      setIsConnected(false);
    });

    socketInstance.on('new-email', (data: { from: string; subject: string }) => {
      toast.success(`New email from ${data.from}`, {
        description: data.subject
      });
      setUnreadCount(prev => prev + 1);
    });

    socketInstance.on('unread-count', (count: number) => {
      setUnreadCount(count);
    });

    socketInstance.on('email-sent', () => {
      toast.success('Email sent successfully');
    });

    socketInstance.on('sync-complete', (data: { accountEmail: string; newEmails: number }) => {
      if (data.newEmails > 0) {
        toast.info(`Sync complete: ${data.newEmails} new emails`);
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, isConnected, unreadCount };
}
