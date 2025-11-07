import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { execSync } from "child_process";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerEmailOAuthCallbacks } from "../email/oauthCallbacks";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { initializeWebSocket } from "../websocket/emailNotifications";
import "../workers/emailSyncWorker"; // Initialize worker on import

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  // Security: Helmet for HTTP headers
  app.use(helmet({
    contentSecurityPolicy: false, // Disable for development
    crossOriginEmbedderPolicy: false,
  }));
  
  // Security: Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  });
  app.use("/api/", limiter);
  
  // Security: Sanitize user input to prevent NoSQL injection
  app.use(mongoSanitize());
  
  // Performance: Response compression
  app.use(compression());
  
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  
  // Email OAuth callbacks (Gmail, Outlook)
  registerEmailOAuthCallbacks(app);

  // Debug endpoints (server-rendered diagnostics)
  app.get("/__debug/routes", (req, res) => {
    const routes = [
      "/ -> EmailInterface (content=present)",
      "/inbox -> EmailInterface (content=present)",
      "/starred -> EmailInterface (content=present)",
      "/archive -> EmailInterface (content=present)",
      "/spam -> EmailInterface (content=present)",
      "/trash -> EmailInterface (content=present)",
      "/settings -> EmailInterface (content=present)",
      "/notes -> EmailInterface (content=present)",
      "/calendar -> EmailInterface (content=present)",
      "/contacts -> EmailInterface (content=present)",
      "/404 -> NotFound (content=present)",
    ];
    res.setHeader("Content-Type", "text/plain");
    const commit = execSync("git rev-parse --short HEAD").toString().trim();
    const branch = execSync("git branch --show-current").toString().trim();
    res.send(`commit=${commit}\nbranch=${branch}\ntotal_routes=${routes.length}\n${routes.join("\n")}`);
  });

  app.get("/__debug/features", (req, res) => {
    res.json({
      commit: execSync("git rev-parse --short HEAD").toString().trim(),
      branch: execSync("git branch --show-current").toString().trim(),
      routes: {
        "/": { skeletons: true, errorHandling: false, successToasts: false, emailValidation: "NA", pagination: false, xssSanitization: false, localStorage: false, autoSaveDrafts: false, offline: false, s3Upload: "NA" },
        "/inbox": { skeletons: true, errorHandling: false, successToasts: false, emailValidation: "NA", pagination: false, xssSanitization: false, localStorage: false, autoSaveDrafts: false, offline: false, s3Upload: "NA" },
        "/contacts": { skeletons: false, errorHandling: false, successToasts: false, emailValidation: "NA", pagination: false, xssSanitization: false, localStorage: false, autoSaveDrafts: "NA", offline: false, s3Upload: "NA" },
        "/settings": { skeletons: false, errorHandling: false, successToasts: false, emailValidation: false, pagination: "NA", xssSanitization: false, localStorage: false, autoSaveDrafts: "NA", offline: false, s3Upload: "NA" },
      },
    });
  });

  app.get("/__debug/config", (req, res) => {
    res.json({
      brand: { peach: "#D89880", cream: "#FFFBF7", dark: "#2A2A2A" },
      fontSizes: { sm: "0.9375rem", md: "1rem", lg: "1.0625rem" },
      tailwind: "configured",
    });
  });

  app.get("/__debug/tests", (req, res) => {
    res.json({
      unit: { status: "not_run", passed: 0, failed: 0 },
      e2e: { status: "not_run", passed: 0, failed: 0 },
    });
  });

  app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  // Initialize WebSocket server
  initializeWebSocket(server);
  console.log("[Server] WebSocket server initialized");

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`[Server] tRPC API available at http://localhost:${port}/api/trpc`);
    console.log(`[Server] WebSocket available at http://localhost:${port}/api/socket.io`);
  });
}

startServer().catch(console.error);
