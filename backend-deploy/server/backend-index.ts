import express, { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import MemoryStore from "memorystore";
import cors from "cors";
import { registerRoutes } from "./routes";
import { log, serveStatic } from "./vite";
import { Server } from "http";

export async function createServer(): Promise<Server> {
  const app: Express = express();
  
  // Use CORS middleware with configuration
  app.use(cors({
    // Allow requests from any origin when deployed
    // Replace with your actual frontend domain in production
    origin: "*", 
    // Allow credentials if needed (cookies, auth headers)
    credentials: false,
    // Allowed HTTP methods
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // Allowed request headers
    allowedHeaders: ["Content-Type", "Authorization"],
  }));

  // Always parse JSON bodies
  app.use(express.json());
  
  // Configure session middleware if needed
  const sessionStore = MemoryStore(session);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "your-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
      store: new sessionStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    })
  );

  // Register API routes
  const server = await registerRoutes(app);

  // Serve static files in production
  serveStatic(app);

  // Global error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    log(`Error: ${err.message}`);
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
      message: err.message || "An unexpected error occurred",
    });
  });

  return server;
}

// Start the server if this file is run directly
if (require.main === module) {
  const port = parseInt(process.env.PORT || "5000");
  createServer().then((server) => {
    server.listen(port, () => {
      log(`Backend server listening on port ${port}`);
    });
  });
}