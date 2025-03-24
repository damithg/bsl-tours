import { 
  users, type User, type InsertUser,
  tourPackages, type TourPackage, type InsertTourPackage,
  destinations, type Destination, type InsertDestination,
  testimonials, type Testimonial, type InsertTestimonial, 
  inquiries, type Inquiry, type InsertInquiry,
  subscribers, type Subscriber, type InsertSubscriber
} from "@shared/schema";

// Define storage interface with all needed methods
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tour Packages
  getTourPackages(): Promise<TourPackage[]>;
  getFeaturedTourPackages(): Promise<TourPackage[]>;
  getTourPackageById(id: number): Promise<TourPackage | undefined>;
  createTourPackage(tourPackage: InsertTourPackage): Promise<TourPackage>;
  
  // Destinations
  getDestinations(): Promise<Destination[]>;
  getDestinationById(id: number): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  
  // Newsletter Subscribers
  addSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
}

// Implementation using in-memory storage
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tourPackages: Map<number, TourPackage>;
  private destinations: Map<number, Destination>;
  private testimonials: Map<number, Testimonial>;
  private inquiries: Map<number, Inquiry>;
  private subscribers: Map<number, Subscriber>;
  
  private currentUserId: number;
  private currentTourPackageId: number;
  private currentDestinationId: number;
  private currentTestimonialId: number;
  private currentInquiryId: number;
  private currentSubscriberId: number;
  
  constructor() {
    this.users = new Map();
    this.tourPackages = new Map();
    this.destinations = new Map();
    this.testimonials = new Map();
    this.inquiries = new Map();
    this.subscribers = new Map();
    
    this.currentUserId = 1;
    this.currentTourPackageId = 1;
    this.currentDestinationId = 1;
    this.currentTestimonialId = 1;
    this.currentInquiryId = 1;
    this.currentSubscriberId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }
  
  private initializeData() {
    // Tour Packages
    const samplePackages: InsertTourPackage[] = [
      {
        title: "Cultural Triangle Luxury Tour",
        description: "Explore ancient cities, sacred temples, and the cultural heart of Sri Lanka with luxury accommodations.",
        duration: 10,
        price: 3899,
        image: "https://bestsrilankatours.com/wp-content/uploads/2020/03/cultural-triangle-sri-lanka.jpg",
        rating: 50,
        reviewCount: 24,
        featured: true
      },
      {
        title: "Coastal Serenity Escape",
        description: "Indulge in beachfront luxury with private villa stays, spa treatments, and pristine beaches.",
        duration: 7,
        price: 2499,
        image: "https://bestsrilankatours.com/wp-content/uploads/2020/02/south-coast-best-beaches.jpg",
        rating: 48,
        reviewCount: 19,
        featured: true
      },
      {
        title: "Hill Country Tea Trails",
        description: "Journey through misty mountains, tea plantations, and colonial-era luxury bungalows.",
        duration: 8,
        price: 2799,
        image: "https://bestsrilankatours.com/wp-content/uploads/2020/02/tea-country-tours.jpg",
        rating: 50,
        reviewCount: 28,
        featured: true
      },
      {
        title: "Wildlife Safari Experience",
        description: "Discover Sri Lanka's incredible wildlife in luxury tented camps and boutique lodges.",
        duration: 6,
        price: 2199,
        image: "https://bestsrilankatours.com/wp-content/uploads/2020/02/wildlife-tour-sri-lanka.jpg",
        rating: 47,
        reviewCount: 15,
        featured: false
      }
    ];
    
    samplePackages.forEach(pkg => this.createTourPackage(pkg));
    
    // Destinations
    const sampleDestinations: InsertDestination[] = [
      {
        name: "Sigiriya Rock Fortress",
        description: "Ancient rock fortress with panoramic views and stunning frescoes",
        image: "https://bestsrilankatours.com/wp-content/uploads/2020/03/sigiriya-header.jpg"
      },
      {
        name: "Galle Fort",
        description: "Colonial charm with boutique hotels, cafes and ocean views",
        image: "https://bestsrilankatours.com/wp-content/uploads/2020/02/galle-fort-unesco-site.jpg"
      },
      {
        name: "Yala National Park",
        description: "Luxury safari experiences with the highest leopard density in the world",
        image: "https://bestsrilankatours.com/wp-content/uploads/2020/02/wildlife-tour-sri-lanka.jpg"
      },
      {
        name: "Ella",
        description: "Mountain vistas, tea plantations, and iconic Nine Arch Bridge",
        image: "https://bestsrilankatours.com/wp-content/uploads/2022/03/nine-arch-bridge-ella.jpg"
      },
      {
        name: "Bentota Beach",
        description: "Pristine golden sands with luxury beach resorts and water sports",
        image: "https://bestsrilankatours.com/wp-content/uploads/2020/02/south-coast-best-beaches.jpg"
      },
      {
        name: "Kandy",
        description: "Sacred Temple of the Tooth and serene lake surrounded by hills",
        image: "https://bestsrilankatours.com/wp-content/uploads/2020/02/kandy-temple-of-tooth.jpg"
      }
    ];
    
    sampleDestinations.forEach(dest => this.createDestination(dest));
    
    // Testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Sarah Johnson",
        content: "Our trip to Sri Lanka exceeded all expectations. The attention to detail, private guides, and luxurious accommodations made it truly special. We'll cherish these memories forever.",
        packageName: "Cultural Triangle Tour",
        rating: 5
      },
      {
        name: "James & Emily Wilson",
        content: "We've traveled extensively, but our journey through Sri Lanka with Best Sri Lanka Tours was one of the most memorable. The personalized service and insider access to hidden gems made all the difference.",
        packageName: "Complete Sri Lanka Experience",
        rating: 5
      },
      {
        name: "Michelle Thompson",
        content: "The private beach villa arranged by Best Sri Lanka Tours was absolutely breathtaking. Our personal chef prepared the most amazing Sri Lankan cuisine, and the sunset views were unmatched.",
        packageName: "Coastal Serenity Escape",
        rating: 5
      }
    ];
    
    sampleTestimonials.forEach(test => this.createTestimonial(test));
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Tour Package methods
  async getTourPackages(): Promise<TourPackage[]> {
    return Array.from(this.tourPackages.values());
  }
  
  async getFeaturedTourPackages(): Promise<TourPackage[]> {
    return Array.from(this.tourPackages.values()).filter(pkg => pkg.featured);
  }
  
  async getTourPackageById(id: number): Promise<TourPackage | undefined> {
    return this.tourPackages.get(id);
  }
  
  async createTourPackage(insertTourPackage: InsertTourPackage): Promise<TourPackage> {
    const id = this.currentTourPackageId++;
    const tourPackage: TourPackage = { ...insertTourPackage, id };
    this.tourPackages.set(id, tourPackage);
    return tourPackage;
  }
  
  // Destination methods
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }
  
  async getDestinationById(id: number): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }
  
  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.currentDestinationId++;
    const destination: Destination = { ...insertDestination, id };
    this.destinations.set(id, destination);
    return destination;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Inquiry methods
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const createdAt = new Date();
    const inquiry: Inquiry = { ...insertInquiry, id, createdAt };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
  
  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
  
  // Subscriber methods
  async addSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentSubscriberId++;
    const createdAt = new Date();
    const subscriber: Subscriber = { ...insertSubscriber, id, createdAt };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }
  
  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }
}

export const storage = new MemStorage();
