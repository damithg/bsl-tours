import express, { type Request, Response, NextFunction } from "express";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { storage } from "./storage";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
const publicPath = path.join(__dirname, '..', 'public');
console.log('Static files path:', publicPath);
app.use(express.static(publicPath));

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

// API Routes

// Get all tour packages
app.get('/api/tour-packages', async (req, res) => {
  try {
    const packages = await storage.getTourPackages();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tour packages' });
  }
});

// Get destination by ID
app.get('/api/destinations/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const destination = await storage.getDestinationById(id);
    
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch destination' });
  }
});

// Get featured tour packages
app.get('/api/tour-packages/featured', async (req, res) => {
  try {
    const packages = await storage.getFeaturedTourPackages();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured tour packages' });
  }
});

// Get tour package by slug - this needs to come BEFORE the ID route!
app.get('/api/tour-packages/by-slug/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const tourPackage = await storage.getTourPackageBySlug(slug);
    
    if (!tourPackage) {
      return res.status(404).json({ error: 'Tour package not found' });
    }
    
    res.json(tourPackage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tour package' });
  }
});

// Get tour package by ID
app.get('/api/tour-packages/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tourPackage = await storage.getTourPackageById(id);
    
    if (!tourPackage) {
      return res.status(404).json({ error: 'Tour package not found' });
    }
    
    res.json(tourPackage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tour package' });
  }
});

(async () => {
  // Create a basic HTTP server
  const server = createServer(app);

  // Error handler middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Add a catch-all route for SPA navigation
  // This will serve index.html for any non-API routes that don't match static files
  app.get('*', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api')) {
      return next();
    }
    
    // Skip static file requests
    if (req.path.includes('.')) {
      return next();
    }
    
    if (app.get('env') === 'development') {
      // In development, let Vite handle the request
      return next();
    } else {
      // In production, serve the index.html file
      res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    }
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Get port from environment variable or use 5000 as default
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(port, "0.0.0.0", () => {
    log(`serving frontend on port ${port}`);
  });
})();
