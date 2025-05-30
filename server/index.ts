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
// Debug code (temporarily hidden)
// console.log('Static files path:', publicPath);
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

// Get all destinations
app.get('/api/destinations', async (req, res) => {
  try {
    const destinations = await storage.getDestinations();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
});

// Get destination by slug - this needs to come BEFORE the ID route!
app.get('/api/destinations/by-slug/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const destination = await storage.getDestinationBySlug(slug);
    
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch destination by slug' });
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

// Handle contact form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message, turnstileToken } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          message: !message ? 'Message is required' : null
        }
      });
    }

    // Verify Cloudflare Turnstile token
    if (!turnstileToken) {
      return res.status(400).json({ error: 'Security verification required' });
    }

    try {
      const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: '0x4AAAAAABfWL_s97fugmRSezjaYRXXaW3k',
          response: turnstileToken,
        }),
      });

      const turnstileResult = await turnstileResponse.json();
      
      if (!turnstileResult.success) {
        return res.status(400).json({ error: 'Security verification failed' });
      }
    } catch (turnstileError) {
      console.error('Turnstile verification error:', turnstileError);
      return res.status(500).json({ error: 'Security verification failed' });
    }
    
    // Import sendContactFormEmail avoiding circular dependencies
    const { sendContactFormEmail } = await import('./emailService');
    
    // Send the email notification
    await sendContactFormEmail(name, email, phone || '', message);
    
    res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error sending contact form email:', error);
    
    // Check if it's a SendGrid API key error
    const err = error as Error;
    if (err.message === 'Email service is not configured') {
      return res.status(503).json({ 
        error: 'Email service unavailable', 
        message: 'Email service is not configured. Please contact the administrator.'
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to send message', 
      message: err.message || 'An unexpected error occurred'
    });
  }
});

// Handle tour inquiry submissions
app.post('/api/inquiries', async (req, res) => {
  let storedInquiry = null; // Declare this outside the try block so we can access it in the catch block
  
  try {
    const { firstName, lastName, email, phone, travelDates, packageInterest, message, subscribed } = req.body;
    
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: {
          firstName: !firstName ? 'First name is required' : null,
          lastName: !lastName ? 'Last name is required' : null,
          email: !email ? 'Email is required' : null,
          message: !message ? 'Message is required' : null
        }
      });
    }
    
    // Store the inquiry in the database
    storedInquiry = await storage.createInquiry({
      firstName,
      lastName,
      email,
      phone: phone || null,
      travelDates: travelDates || null,
      packageInterest: packageInterest || null,
      message,
      subscribed: subscribed || false
    });
    
    // Import sendTourInquiryEmail avoiding circular dependencies
    const { sendTourInquiryEmail } = await import('./emailService');
    
    // Send the email notification
    await sendTourInquiryEmail(
      firstName,
      lastName,
      email,
      phone || '',
      travelDates || '',
      packageInterest || '',
      message,
      subscribed || false
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Your inquiry has been submitted successfully!',
      inquiry: storedInquiry
    });
  } catch (error) {
    console.error('Error processing tour inquiry:', error);
    
    // Check if the inquiry was successfully stored
    if (storedInquiry) {
      // The inquiry was saved, but email sending failed
      // Check if it's a SendGrid API key error
      const err = error as Error;
      if (err.message === 'Email service is not configured') {
        console.warn('Email service not configured, but inquiry was stored successfully');
        // Still consider this a success since the data was stored
        return res.status(201).json({ 
          success: true, 
          message: 'Your inquiry has been submitted successfully! (Email notifications are currently disabled)',
          inquiry: storedInquiry
        });
      }
      
      // Handle other email errors but still return a 201 if the inquiry was saved
      res.status(201).json({ 
        success: true, 
        message: 'Your inquiry has been submitted successfully! (Email notification could not be sent)',
        inquiry: storedInquiry,
        emailError: err.message || 'Email service error'
      });
    } else {
      // The inquiry couldn't be saved at all
      res.status(500).json({ 
        success: false,
        error: 'Failed to submit inquiry', 
        message: (error as Error).message || 'An unexpected error occurred'
      });
    }
  }
});

// Handle newsletter subscriptions
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Check if subscriber already exists
    const existingSubscriber = await storage.getSubscriberByEmail(email);
    if (existingSubscriber) {
      return res.status(200).json({ 
        success: true, 
        message: 'You are already subscribed to our newsletter!'
      });
    }
    
    // Store the new subscriber
    const subscriber = await storage.addSubscriber({ email });
    
    res.status(201).json({ 
      success: true, 
      message: 'Thank you for subscribing to our newsletter!',
      subscriber
    });
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    res.status(500).json({ 
      error: 'Failed to process subscription', 
      message: (error as Error).message || 'An unexpected error occurred'
    });
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
  // Email Tour PDF endpoint
  app.post('/api/tours/email-pdf', async (req: Request, res: Response) => {
    // Import sendTourPdfEmail here to avoid circular dependencies
    try {
      const { sendTourPdfEmail } = await import('./emailService');
      
      const { email, tourName, pdfContent } = req.body;
      
      if (!email || !tourName || !pdfContent) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          details: {
            email: !email ? 'Email is required' : null,
            tourName: !tourName ? 'Tour name is required' : null,
            pdfContent: !pdfContent ? 'PDF content is required' : null
          }
        });
      }
      
      // Send the email with PDF attachment
      await sendTourPdfEmail(email, tourName, pdfContent);
      
      res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending tour PDF email:', error);
      
      // Check if it's a SendGrid API key error
      const err = error as Error;
      if (err.message === 'Email service is not configured') {
        return res.status(503).json({ 
          error: 'Email service unavailable', 
          message: 'Email service is not configured. Please contact the administrator.'
        });
      }
      
      res.status(500).json({ 
        error: 'Failed to send email', 
        message: err.message || 'An unexpected error occurred'
      });
    }
  });

  // Catch-all handler: send back React's index.html file for client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });

  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(port, "0.0.0.0", () => {
    log(`serving frontend on port ${port}`);
  });
})();
