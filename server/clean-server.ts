import express, { type Request, Response, NextFunction } from "express";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (!path.includes(".") || path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  // Create a basic HTTP server
  const server = app.listen(0);

  // Error handler middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Setup Vite middleware for development
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Close the initial server and start a new one on the desired port
  server.close();
  
  // Get port from environment variable or use 5000 as default
  const port = process.env.PORT || 5000;
  app.listen(port, "0.0.0.0", () => {
    log(`serving frontend on port ${port}`);
  });
})();