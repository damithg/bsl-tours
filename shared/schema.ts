import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base user schema from the template
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Tour packages
export const tourPackages = pgTable("tour_packages", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description"), // Brief overview of the tour
  tourHighlights: text("tour_highlights"), // Brief description to display below shortDescription
  highlightsSummary: text("highlights_summary"), // Brief bullet points about the tour highlights
  duration: integer("duration").notNull(),
  price: integer("price").notNull(),
  imageUrl: text("image_url").notNull(),
  gallery: text("gallery"), // JSON array of image URLs for the tour gallery
  rating: integer("rating").default(50),
  reviewCount: integer("review_count").default(0),
  featured: boolean("featured").default(false),
  destinations: text("destinations"), // JSON array of destinations included in this tour
  includes: text("includes"), // JSON array of what's included in the package
  excludes: text("excludes"), // JSON array of what's excluded from the package
  itinerary: text("itinerary"), // JSON array of day-by-day itinerary
  startingLocations: text("starting_locations"), // JSON array of possible starting locations
  luxuryLevel: integer("luxury_level").default(5), // 1-5 scale of luxury level
  bestTimeToVisit: text("best_time_to_visit"), // Best months to take this tour
  groupSize: text("group_size"), // Information about maximum group size
  slug: text("slug"), // URL-friendly version of title
});

export const insertTourPackageSchema = createInsertSchema(tourPackages).omit({
  id: true,
});

// Destinations
export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug"),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  featured: boolean("featured").default(false),
  
  // Location information
  region: text("region"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  address: text("address"),
  
  // Extended information
  shortDescription: text("short_description"),
  excerpt: text("excerpt"), // Used with .NET API
  fullDescription: text("full_description"),
  highlights: text("highlights"), // Stored as JSON string
  
  // Planning information
  bestTimeToVisit: text("best_time_to_visit"),
  recommendedDuration: text("recommended_duration"),
  weatherInfo: text("weather_info"),
  travelTips: text("travel_tips"), // Stored as JSON string
  
  // Additional media
  galleryImages: text("gallery_images"), // Stored as JSON string
  
  // Related content (stored as JSON strings)
  activities: text("activities"),
  experiences: text("experiences"),
  faqs: text("faqs"),
  
  // Template and enhanced content fields
  templateType: text("template_type").default("standard"), // "standard", "enhanced", "sigiriya", etc.
  detailedSections: text("detailed_sections"), // JSON string of rich content sections
  pointsOfInterest: text("points_of_interest"), // Key attractions with detailed descriptions (JSON)
  nearbyAttractions: text("nearby_attractions"), // JSON string
  toursFeaturing: text("tours_featuring"), // Related tours that include this destination (JSON)
  localExperiences: text("local_experiences"), // Local activities/experiences (JSON)
  essentialInfo: text("essential_info"), // Getting there, climate, etc. (JSON)
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({
  id: true,
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content").notNull(),
  packageName: text("package_name").notNull(),
  rating: integer("rating").default(5),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

// Inquiries
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  travelDates: text("travel_dates"),
  packageInterest: text("package_interest"),
  message: text("message").notNull(),
  subscribed: boolean("subscribed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

// Newsletter subscribers
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
  createdAt: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type TourPackage = typeof tourPackages.$inferSelect;
export type InsertTourPackage = z.infer<typeof insertTourPackageSchema>;

export type Destination = typeof destinations.$inferSelect;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
