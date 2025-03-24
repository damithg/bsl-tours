import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertSubscriberSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // Debug route to list files in public directory
  app.get('/api/debug/public-files', (req, res) => {
    const publicPath = path.join(__dirname, '..', 'public');
    
    const listFilesRecursively = (dir: string, baseDir: string = '') => {
      const files: string[] = [];
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const relativePath = path.join(baseDir, item);
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
          files.push(`📁 ${relativePath}`);
          files.push(...listFilesRecursively(fullPath, relativePath));
        } else {
          files.push(`📄 ${relativePath}`);
        }
      });
      
      return files;
    };
    
    try {
      const fileList = fs.existsSync(publicPath) 
        ? listFilesRecursively(publicPath)
        : ['Public directory does not exist'];
      
      res.json({ 
        publicPath,
        files: fileList
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Error listing files',
        message: error instanceof Error ? error.message : String(error)
      });
    }
  });
  // API routes prefix
  const apiRouter = express.Router();
  app.use("/api", apiRouter);

  // Get all tour packages
  apiRouter.get("/tour-packages", async (req, res) => {
    try {
      const tourPackages = await storage.getTourPackages();
      res.json(tourPackages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tour packages" });
    }
  });

  // Get featured tour packages
  apiRouter.get("/tour-packages/featured", async (req, res) => {
    try {
      const featuredPackages = await storage.getFeaturedTourPackages();
      res.json(featuredPackages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured tour packages" });
    }
  });

  // Get a specific tour package by ID
  apiRouter.get("/tour-packages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const tourPackage = await storage.getTourPackageById(id);
      if (!tourPackage) {
        return res.status(404).json({ message: "Tour package not found" });
      }
      
      res.json(tourPackage);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tour package" });
    }
  });

  // Get all destinations
  apiRouter.get("/destinations", async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations" });
    }
  });

  // Get a specific destination by ID
  apiRouter.get("/destinations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const destination = await storage.getDestinationById(id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destination" });
    }
  });

  // Get all testimonials
  apiRouter.get("/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Submit a contact/inquiry form
  apiRouter.post("/inquiries", async (req, res) => {
    try {
      const inquiryData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(inquiryData);
      
      // If user opted in to newsletter, add them as a subscriber
      if (inquiryData.subscribed) {
        const existingSubscriber = await storage.getSubscriberByEmail(inquiryData.email);
        
        if (!existingSubscriber) {
          await storage.addSubscriber({ email: inquiryData.email });
        }
      }
      
      res.status(201).json({ message: "Inquiry submitted successfully", inquiry });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to submit inquiry" });
    }
  });

  // Subscribe to newsletter
  apiRouter.post("/subscribe", async (req, res) => {
    try {
      const subscriberData = insertSubscriberSchema.parse(req.body);
      
      // Check if email already subscribed
      const existingSubscriber = await storage.getSubscriberByEmail(subscriberData.email);
      
      if (existingSubscriber) {
        return res.json({ message: "Already subscribed to newsletter" });
      }
      
      const subscriber = await storage.addSubscriber(subscriberData);
      res.status(201).json({ message: "Subscribed to newsletter successfully", subscriber });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
