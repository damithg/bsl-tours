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
        image: "https://images.unsplash.com/photo-1594818379496-da1e345318f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 50,
        reviewCount: 24,
        featured: true
      },
      {
        title: "Coastal Serenity Escape",
        description: "Indulge in beachfront luxury with private villa stays, spa treatments, and pristine beaches.",
        duration: 7,
        price: 2499,
        image: "https://images.unsplash.com/photo-1571435584758-13df417a2154?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 48,
        reviewCount: 19,
        featured: true
      },
      {
        title: "Hill Country Tea Trails",
        description: "Journey through misty mountains, tea plantations, and colonial-era luxury bungalows.",
        duration: 8,
        price: 2799,
        image: "https://images.unsplash.com/photo-1583230690438-a157757de87a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 50,
        reviewCount: 28,
        featured: true
      },
      {
        title: "Wildlife Safari Experience",
        description: "Discover Sri Lanka's incredible wildlife in luxury tented camps and boutique lodges.",
        duration: 6,
        price: 2199,
        image: "https://images.unsplash.com/photo-1616352116213-503cb49c8c63?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 47,
        reviewCount: 15,
        featured: false
      },
      {
        title: "Luxury Family Adventure",
        description: "Create unforgettable memories with your loved ones on this family-friendly luxury tour through Sri Lanka's highlights.",
        duration: 12,
        price: 3599,
        image: "https://images.unsplash.com/photo-1583309219338-a582f1f9ca6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 49,
        reviewCount: 22,
        featured: false
      },
      {
        title: "Romantic Honeymoon Escape",
        description: "Begin your journey together with exclusive experiences, romantic dinners, and luxurious accommodations.",
        duration: 9,
        price: 3299,
        image: "https://images.unsplash.com/photo-1578922132951-13b3c524c104?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 50,
        reviewCount: 31,
        featured: true
      },
      {
        title: "Ayurveda & Wellness Retreat",
        description: "Rejuvenate your mind, body, and soul with traditional Ayurvedic treatments and mindful experiences.",
        duration: 8,
        price: 2999,
        image: "https://images.unsplash.com/photo-1583416750470-965b2707b355?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 48,
        reviewCount: 17,
        featured: false
      },
      {
        title: "Exclusive Golf Tour",
        description: "Experience Sri Lanka's stunning golf courses combined with sightseeing and luxury accommodations.",
        duration: 10,
        price: 3799,
        image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 46,
        reviewCount: 14,
        featured: false
      },
      {
        title: "Culinary Journey",
        description: "Discover the flavors of Sri Lanka with cooking classes, market visits, and gourmet dining experiences.",
        duration: 8,
        price: 2899,
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 49,
        reviewCount: 23,
        featured: false
      },
      {
        title: "Historical Heritage Tour",
        description: "Immerse yourself in Sri Lanka's rich history from ancient kingdoms to colonial influences with expert guides.",
        duration: 11,
        price: 3499,
        image: "https://images.unsplash.com/photo-1602351447937-745cb720612f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 47,
        reviewCount: 18,
        featured: false
      }
    ];
    
    samplePackages.forEach(pkg => this.createTourPackage(pkg));
    
    // Destinations
    const sampleDestinations: InsertDestination[] = [
      {
        name: "Sigiriya Rock Fortress",
        description: "Ancient rock fortress with panoramic views and stunning frescoes",
        image: "https://images.unsplash.com/photo-1586613835341-6003c0e2fb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Galle Fort",
        description: "Colonial charm with boutique hotels, cafes and ocean views",
        image: "https://images.unsplash.com/photo-1575136042347-ebaaa37049e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Yala National Park",
        description: "Luxury safari experiences with the highest leopard density in the world",
        image: "https://images.unsplash.com/photo-1607793279016-c6865c283483?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Ella",
        description: "Mountain vistas, tea plantations, and iconic Nine Arch Bridge",
        image: "https://images.unsplash.com/photo-1577094695438-efe3fb02c242?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Bentota Beach",
        description: "Pristine golden sands with luxury beach resorts and water sports",
        image: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Kandy",
        description: "Sacred Temple of the Tooth and serene lake surrounded by hills",
        image: "https://images.unsplash.com/photo-1619111942607-1bb91e5c6d65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Polonnaruwa",
        description: "Ancient city with well-preserved ruins and impressive stone carvings",
        image: "https://images.unsplash.com/photo-1602601320430-0b94c1926dce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Dambulla Cave Temple",
        description: "UNESCO World Heritage site with ancient Buddha statues and painted murals",
        image: "https://images.unsplash.com/photo-1624029769122-a836aba27077?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Anuradhapura",
        description: "Sri Lanka's ancient capital with sacred Bo Tree and majestic stupas",
        image: "https://images.unsplash.com/photo-1602602516181-a913082de858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Nuwara Eliya",
        description: "Little England with Tudor-style cottages and world-class tea estates",
        image: "https://images.unsplash.com/photo-1546708936-2af4a8ca0b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Adam's Peak",
        description: "Sacred mountain pilgrimage with breathtaking sunrise views",
        image: "https://images.unsplash.com/photo-1579176647030-bd86f6fd4e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Mirissa",
        description: "Idyllic beach with luxury villas and world-class whale watching",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      }
    ];
    
    sampleDestinations.forEach(dest => this.createDestination(dest));
    
    // Testimonials
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Sarah Johnson",
        content: "Our trip to Sri Lanka exceeded all expectations. The attention to detail, private guides, and luxurious accommodations made it truly special. We'll cherish these memories forever.",
        packageName: "Cultural Triangle Luxury Tour",
        rating: 5
      },
      {
        name: "James & Emily Wilson",
        content: "We've traveled extensively, but our journey through Sri Lanka with Best Sri Lanka Tours was one of the most memorable. The personalized service and insider access to hidden gems made all the difference.",
        packageName: "Wildlife Safari Experience",
        rating: 5
      },
      {
        name: "Michelle Thompson",
        content: "The private beach villa arranged by Best Sri Lanka Tours was absolutely breathtaking. Our personal chef prepared the most amazing Sri Lankan cuisine, and the sunset views were unmatched.",
        packageName: "Coastal Serenity Escape",
        rating: 5
      },
      {
        name: "David Chen",
        content: "As avid tea lovers, the Hill Country Tea Trails tour was a dream come true. Staying in colonial-era tea planter bungalows and learning about the tea-making process directly from experts was incredible.",
        packageName: "Hill Country Tea Trails",
        rating: 5
      },
      {
        name: "Alexandra & Robert Patel",
        content: "Our honeymoon in Sri Lanka was pure magic. From candlelit dinners on the beach to private waterfall swims, every moment was curated to perfection. Truly an unforgettable start to our marriage.",
        packageName: "Romantic Honeymoon Escape",
        rating: 5
      },
      {
        name: "Thomas Williams",
        content: "The Ayurveda retreat exceeded all my expectations. Two weeks of traditional treatments, yoga, and meditation in a serene environment completely rejuvenated me. I'm already planning my return visit.",
        packageName: "Ayurveda & Wellness Retreat",
        rating: 5
      },
      {
        name: "Maria & Carlos Rodriguez",
        content: "Traveling with three generations of our family, we were amazed at how seamlessly BSL accommodated everyone's interests and needs. The grandparents, parents, and children all had the time of their lives!",
        packageName: "Luxury Family Adventure",
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

/**
 * Note: This storage implementation is no longer actively used by the application.
 * The frontend now connects directly to the .NET Core API at api.travelnip.com.
 * This is kept for reference purposes only.
 */
export const storage = new MemStorage();
