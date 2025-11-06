import { Server as SocketIOServer, Socket } from "socket.io";
import type { Server as HTTPServer } from "http";

interface AuthenticatedSocket {
  userId: number;
  email: string;
}

let io: SocketIOServer | null = null;

/**
 * Initialize WebSocket server for real-time email notifications
 */
export function initializeWebSocket(httpServer: HTTPServer) {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.VITE_FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    },
    path: "/api/socket.io",
  });

  // Authentication middleware
  io.use(async (socket: Socket, next: (err?: Error) => void) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error("Authentication token required"));
      }

      // TODO: Implement JWT token verification
      // For now, accept any token (will be secured in Phase 7)
      const userId = socket.handshake.auth.userId;
      const email = socket.handshake.auth.email;

      // Attach user info to socket
      (socket as any).userId = userId;
      (socket as any).email = email;

      next();
    } catch (error) {
      console.error("[WebSocket] Authentication error:", error);
      next(new Error("Authentication failed"));
    }
  });

  // Connection handler
  io.on("connection", (socket: Socket) => {
    const userId = (socket as any).userId;
    const email = (socket as any).email;

    console.log(`[WebSocket] User ${userId} (${email}) connected`);

    // Join user-specific room
    socket.join(`user:${userId}`);

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`[WebSocket] User ${userId} (${email}) disconnected`);
    });

    // Handle ping for connection health check
    socket.on("ping", () => {
      socket.emit("pong");
    });
  });

  console.log("[WebSocket] Email notification server initialized");
  return io;
}

/**
 * Notify user of new email
 */
export function notifyNewEmail(userId: number, email: {
  id: number;
  subject: string;
  from: string;
  fromName?: string;
  snippet?: string;
  receivedAt: Date;
}) {
  if (!io) {
    console.warn("[WebSocket] Socket.IO not initialized");
    return;
  }

  io.to(`user:${userId}`).emit("new-email", {
    type: "new-email",
    data: email,
    timestamp: new Date(),
  });

  console.log(`[WebSocket] Sent new email notification to user ${userId}`);
}

/**
 * Notify user of email update (read, starred, etc.)
 */
export function notifyEmailUpdate(userId: number, emailId: number, updates: {
  isRead?: boolean;
  isStarred?: boolean;
  folder?: string;
}) {
  if (!io) {
    console.warn("[WebSocket] Socket.IO not initialized");
    return;
  }

  io.to(`user:${userId}`).emit("email-updated", {
    type: "email-updated",
    data: {
      emailId,
      updates,
    },
    timestamp: new Date(),
  });

  console.log(`[WebSocket] Sent email update notification to user ${userId}`);
}

/**
 * Notify user of unread count change
 */
export function notifyUnreadCountUpdate(userId: number, accountId: number, unreadCount: number) {
  if (!io) {
    console.warn("[WebSocket] Socket.IO not initialized");
    return;
  }

  io.to(`user:${userId}`).emit("unread-count-updated", {
    type: "unread-count-updated",
    data: {
      accountId,
      unreadCount,
    },
    timestamp: new Date(),
  });

  console.log(`[WebSocket] Sent unread count update to user ${userId}`);
}

/**
 * Notify user of sync status
 */
export function notifySyncStatus(userId: number, status: {
  accountId: number;
  status: "syncing" | "completed" | "failed";
  emailsSynced?: number;
  error?: string;
}) {
  if (!io) {
    console.warn("[WebSocket] Socket.IO not initialized");
    return;
  }

  io.to(`user:${userId}`).emit("sync-status", {
    type: "sync-status",
    data: status,
    timestamp: new Date(),
  });

  console.log(`[WebSocket] Sent sync status to user ${userId}`);
}

/**
 * Broadcast to all connected users (admin only)
 */
export function broadcastToAll(event: string, data: any) {
  if (!io) {
    console.warn("[WebSocket] Socket.IO not initialized");
    return;
  }

  io.emit(event, {
    type: event,
    data,
    timestamp: new Date(),
  });

  console.log(`[WebSocket] Broadcast ${event} to all users`);
}

export { io };
