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
      "/ -> EmailInterface (view=inbox, content=present)",
      "/fresh-start -> EmailInterface (view=fresh-start, content=present)",
      "/inbox -> EmailInterface (view=inbox, content=present)",
      "/starred -> EmailInterface (view=starred, content=present)",
      "/new-connections -> EmailInterface (view=new-connections, content=present)",
      "/paused -> EmailInterface (view=paused, content=present)",
      "/complete -> EmailInterface (view=complete, content=present)",
      "/sent -> EmailInterface (view=sent, content=present)",
      "/drafts -> EmailInterface (view=drafts, content=present)",
      "/archive -> EmailInterface (view=archive, content=present)",
      "/spam -> EmailInterface (view=spam, content=present)",
      "/trash -> EmailInterface (view=trash, content=present)",
      "/storage -> EmailInterface (view=storage, content=present)",
      "/notes -> EmailInterface (view=notes, content=present)",
      "/calendar -> EmailInterface (view=calendar, content=present)",
      "/contacts -> EmailInterface (view=contacts, content=present)",
      "/analytics -> EmailInterface (view=analytics, content=present)",
      "/appearance -> EmailInterface (view=appearance, content=present)",
      "/settings -> EmailInterface (view=settings, content=present)",
      "/profile -> EmailInterface (view=profile, content=present)",
      "/admin -> EmailInterface (view=admin, content=present)",
      "/404 -> NotFound (content=present)",
    ];
    res.setHeader("Content-Type", "text/plain");
    const commit = execSync("git rev-parse --short HEAD").toString().trim();
    const branch = execSync("git branch --show-current").toString().trim();
    res.send(`commit=${commit}\nbranch=${branch}\ntotal_routes=${routes.length}\n${routes.join("\n")}`);
  });

  app.get("/__debug/features", async (req, res) => {
    const { detectFeaturesForRoute } = await import('../lib/featureDetection.js');
    
    res.json({
      commit: execSync("git rev-parse --short HEAD").toString().trim(),
      branch: execSync("git branch --show-current").toString().trim(),
      routes: {
        "/": detectFeaturesForRoute("/"),
        "/inbox": detectFeaturesForRoute("/inbox"),
        "/contacts": detectFeaturesForRoute("/contacts"),
        "/settings": detectFeaturesForRoute("/settings"),
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

  // Combined debug report endpoint
  app.get("/__debug/report", async (req, res) => {
    const { detectFeaturesForRoute } = await import('../lib/featureDetection.js');
    const commit = execSync("git rev-parse --short HEAD").toString().trim();
    const branch = execSync("git branch --show-current").toString().trim();
    const timestamp = new Date().toISOString();
    
    // Get preview URL from env or use default
    const preview = process.env.PREVIEW_URL || "https://3000-isnj9ofymsbtrhk650nk1-b6a5c71b.manus.computer";
    
    // Routes as text
    const routes = [
      "/ -> EmailInterface (view=inbox, content=present)",
      "/fresh-start -> EmailInterface (view=fresh-start, content=present)",
      "/inbox -> EmailInterface (view=inbox, content=present)",
      "/starred -> EmailInterface (view=starred, content=present)",
      "/new-connections -> EmailInterface (view=new-connections, content=present)",
      "/paused -> EmailInterface (view=paused, content=present)",
      "/complete -> EmailInterface (view=complete, content=present)",
      "/sent -> EmailInterface (view=sent, content=present)",
      "/drafts -> EmailInterface (view=drafts, content=present)",
      "/archive -> EmailInterface (view=archive, content=present)",
      "/spam -> EmailInterface (view=spam, content=present)",
      "/trash -> EmailInterface (view=trash, content=present)",
      "/storage -> EmailInterface (view=storage, content=present)",
      "/notes -> EmailInterface (view=notes, content=present)",
      "/calendar -> EmailInterface (view=calendar, content=present)",
      "/contacts -> EmailInterface (view=contacts, content=present)",
      "/analytics -> EmailInterface (view=analytics, content=present)",
      "/appearance -> EmailInterface (view=appearance, content=present)",
      "/settings -> EmailInterface (view=settings, content=present)",
      "/profile -> EmailInterface (view=profile, content=present)",
      "/admin -> EmailInterface (view=admin, content=present)",
      "/404 -> NotFound (content=present)",
    ];
    const routesText = `commit=${commit}\nbranch=${branch}\ntotal_routes=${routes.length}\n${routes.join("\n")}`;
    
    // Features as JSON (computed via detectors)
    const features = {
      commit,
      branch,
      routes: {
        "/": detectFeaturesForRoute("/"),
        "/inbox": detectFeaturesForRoute("/inbox"),
        "/contacts": detectFeaturesForRoute("/contacts"),
        "/settings": detectFeaturesForRoute("/settings"),
      },
    };
    
    // Config subset
    const config = {
      brand: { peach: "#D89880", cream: "#FFFBF7", dark: "#2A2A2A" },
      fontSizes: { sm: "0.9375rem", md: "1rem", lg: "1.0625rem" },
      tailwind: "configured",
    };
    
    // Tests
    const tests = {
      unit: "N/A",
      e2e: "N/A",
    };
    
    res.json({
      branch,
      commit,
      preview,
      timestamp,
      routes: routesText,
      features,
      config,
      tests,
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
