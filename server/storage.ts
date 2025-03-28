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
  getTourPackageBySlug(slug: string): Promise<TourPackage | undefined>;
  createTourPackage(tourPackage: InsertTourPackage): Promise<TourPackage>;
  
  // Destinations
  getDestinations(): Promise<Destination[]>;
  getDestinationById(id: number): Promise<Destination | undefined>;
  getDestinationBySlug(slug: string): Promise<Destination | undefined>;
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
        imageUrl: "https://images.unsplash.com/photo-1594818379496-da1e345318f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 50,
        reviewCount: 24,
        featured: true,
        slug: "cultural-triangle-luxury-tour",
        itinerary: JSON.stringify([
          {
            day: 1,
            title: "Arrive in Colombo",
            description: "Begin your Sri Lankan adventure as you arrive at Bandaranaike International Airport. Your private chauffeur will greet you and transfer you to your luxury hotel in Colombo. Rest and recover from your journey before an evening welcome dinner.",
            activities: [
              {
                title: "Airport Welcome",
                description: "Meet and greet with your dedicated tour guide",
                time: "Upon arrival"
              },
              {
                title: "Hotel Check-in",
                description: "Settle into your luxury accommodation",
                imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
                time: "Afternoon"
              },
              {
                title: "Welcome Dinner",
                description: "Enjoy an authentic Sri Lankan dinner at a premier restaurant",
                imageUrl: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
                time: "7:00 PM"
              }
            ],
            accommodation: {
              name: "Shangri-La Colombo",
              description: "5-star luxury overlooking the Indian Ocean",
              imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
            },
            meals: {
              breakfast: false,
              lunch: false,
              dinner: true
            }
          },
          {
            day: 2,
            title: "Colombo to Anuradhapura",
            description: "After breakfast, depart for Anuradhapura, the ancient capital of Sri Lanka. Enjoy a scenic drive through rural landscapes before arriving at your hotel. In the afternoon, begin exploring the UNESCO World Heritage site.",
            activities: [
              {
                title: "Scenic Drive",
                description: "Journey through picturesque countryside with stops for refreshments",
                imageUrl: "https://images.unsplash.com/photo-1516466788553-69e7d654afa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
                time: "9:00 AM"
              },
              {
                title: "Anuradhapura Introduction",
                description: "Brief orientation tour of the ancient city with your expert guide",
                imageUrl: "https://images.unsplash.com/photo-1588997427895-f5564729948e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
                time: "3:00 PM"
              }
            ],
            accommodation: {
              name: "Ulagalla Resort",
              description: "Luxury eco-resort set in 58 acres of tropical gardens",
              imageUrl: "https://images.unsplash.com/photo-1548704806-0c20f7ea6474?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
            },
            meals: {
              breakfast: true,
              lunch: true,
              dinner: true
            }
          },
          {
            day: 3,
            title: "Explore Anuradhapura",
            description: "Spend a full day exploring the ancient ruins, stupas, and archaeological wonders of Anuradhapura. Visit the sacred Sri Maha Bodhi tree, the oldest documented tree in the world.",
            activities: [
              {
                title: "Sacred City Tour",
                description: "Visit key sites including Ruwanwelisaya Stupa and Isurumuniya Temple",
                imageUrl: "https://images.unsplash.com/photo-1588997427895-f5564729948e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
                time: "8:30 AM"
              },
              {
                title: "Sri Maha Bodhi",
                description: "Visit the sacred Bo Tree, a sapling from the tree under which Buddha attained enlightenment",
                imageUrl: "https://images.unsplash.com/photo-1587123368812-59eca8bf5a15?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80",
                time: "2:00 PM"
              },
              {
                title: "Evening Relaxation",
                description: "Enjoy spa treatments or relaxation at the resort",
                time: "6:00 PM"
              }
            ],
            accommodation: {
              name: "Ulagalla Resort",
              description: "Luxury eco-resort set in 58 acres of tropical gardens",
              imageUrl: "https://images.unsplash.com/photo-1548704806-0c20f7ea6474?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80"
            },
            meals: {
              breakfast: true,
              lunch: true,
              dinner: true
            }
          }
        ])
      },
      {
        title: "Coastal Serenity Escape",
        description: "Indulge in beachfront luxury with private villa stays, spa treatments, and pristine beaches.",
        duration: 7,
        price: 2499,
        imageUrl: "https://images.unsplash.com/photo-1571435584758-13df417a2154?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 48,
        reviewCount: 19,
        featured: true
      },
      {
        title: "Hill Country Tea Trails",
        description: "Journey through misty mountains, tea plantations, and colonial-era luxury bungalows.",
        duration: 8,
        price: 2799,
        imageUrl: "https://images.unsplash.com/photo-1583230690438-a157757de87a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 50,
        reviewCount: 28,
        featured: true
      },
      {
        title: "Wildlife Safari Experience",
        description: "Discover Sri Lanka's incredible wildlife in luxury tented camps and boutique lodges.",
        duration: 6,
        price: 2199,
        imageUrl: "https://images.unsplash.com/photo-1616352116213-503cb49c8c63?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 47,
        reviewCount: 15,
        featured: false
      },
      {
        title: "Luxury Family Adventure",
        description: "Create unforgettable memories with your loved ones on this family-friendly luxury tour through Sri Lanka's highlights.",
        duration: 12,
        price: 3599,
        imageUrl: "https://images.unsplash.com/photo-1583309219338-a582f1f9ca6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 49,
        reviewCount: 22,
        featured: false
      },
      {
        title: "Romantic Honeymoon Escape",
        description: "Begin your journey together with exclusive experiences, romantic dinners, and luxurious accommodations.",
        duration: 9,
        price: 3299,
        imageUrl: "https://images.unsplash.com/photo-1578922132951-13b3c524c104?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 50,
        reviewCount: 31,
        featured: true
      },
      {
        title: "Ayurveda & Wellness Retreat",
        description: "Rejuvenate your mind, body, and soul with traditional Ayurvedic treatments and mindful experiences.",
        duration: 8,
        price: 2999,
        imageUrl: "https://images.unsplash.com/photo-1583416750470-965b2707b355?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 48,
        reviewCount: 17,
        featured: false
      },
      {
        title: "Exclusive Golf Tour",
        description: "Experience Sri Lanka's stunning golf courses combined with sightseeing and luxury accommodations.",
        duration: 10,
        price: 3799,
        imageUrl: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 46,
        reviewCount: 14,
        featured: false
      },
      {
        title: "Culinary Journey",
        description: "Discover the flavors of Sri Lanka with cooking classes, market visits, and gourmet dining experiences.",
        duration: 8,
        price: 2899,
        imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        rating: 49,
        reviewCount: 23,
        featured: false
      },
      {
        title: "Historical Heritage Tour",
        description: "Immerse yourself in Sri Lanka's rich history from ancient kingdoms to colonial influences with expert guides.",
        duration: 11,
        price: 3499,
        imageUrl: "https://images.unsplash.com/photo-1602351447937-745cb720612f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
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
        slug: "sigiriya-rock-fortress",
        description: "Ancient rock fortress with panoramic views and stunning frescoes",
        imageUrl: "https://images.unsplash.com/photo-1586613835341-6003c0e2fb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
        featured: true,
        
        // Location information
        region: "Cultural Triangle",
        latitude: "7.9572",
        longitude: "80.7603",
        address: "Sigiriya, Sri Lanka",
        
        // Extended information
        shortDescription: "An ancient rock fortress and palace with spectacular views",
        fullDescription: "Rising dramatically from the central plains, the iconic rocky outcrop of Sigiriya is perhaps Sri Lanka's most dramatic sight. Near-vertical walls soar to a flat-topped summit that contains the ruins of an ancient civilization, thought to be once the epicenter of the short-lived kingdom of Kassapa. A series of galleries and staircases emerging from the mouth of a gigantic lion constructed of bricks and plaster provide access to the site.",
        highlights: JSON.stringify(["Lion's Paw Entrance", "Ancient Frescoes", "Mirror Wall", "Water Gardens", "Panoramic Summit Views"]),
        
        // Planning information
        bestTimeToVisit: "January to April",
        recommendedDuration: "1-2 Days",
        weatherInfo: "The dry season from January to April offers the most pleasant weather for climbing, with temperatures around 25-30°C",
        travelTips: JSON.stringify([
          "Visit early morning to avoid crowds and heat",
          "Bring plenty of water for the climb",
          "Wear comfortable shoes for steep staircases",
          "Allow 3-4 hours for the complete experience"
        ]),
        
        // Additional media
        galleryImages: JSON.stringify([
          {
            url: "https://images.unsplash.com/photo-1583087253076-5d1315860eb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
            alt: "Sigiriya Rock Fortress - Main View"
          },
          {
            url: "https://images.unsplash.com/photo-1627894966831-0c839fa78bfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            alt: "Sigiriya Rock Fortress - Ancient Frescoes"
          },
          {
            url: "https://images.unsplash.com/photo-1531259922615-206732e4349b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            alt: "Sigiriya Rock Fortress - Water Gardens"
          },
          {
            url: "https://images.unsplash.com/photo-1618846042125-0a64dc7c3608?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            alt: "Sigiriya Rock Fortress - Summit View"
          }
        ]),
        
        // Activities
        activities: JSON.stringify([
          {
            title: "Guided Historical Tour",
            description: "Explore the ancient fortress with expert archaeologists who bring the history to life",
            imageUrl: "/images/activities/sigiriya-guided-tour.jpg"
          },
          {
            title: "Sunrise Photography",
            description: "Capture the amazing sunrise views with special early access before regular opening hours",
            imageUrl: "/images/activities/sigiriya-sunrise.jpg"
          },
          {
            title: "Helicopter Tour",
            description: "Experience Sigiriya from above with an exclusive aerial tour",
            imageUrl: "/images/activities/sigiriya-helicopter.jpg"
          }
        ]),
        
        // Experiences
        experiences: JSON.stringify([
          {
            title: "Private Guided Tour",
            description: "Explore with expert local guides who bring history and culture to life",
            icon: "guide"
          },
          {
            title: "Exclusive Access",
            description: "Special early morning or evening access when the site is closed to regular visitors",
            icon: "key"
          },
          {
            title: "Luxury Picnic",
            description: "Gourmet dining experience with panoramic views of the surrounding landscape",
            icon: "dining"
          }
        ]),
        
        // FAQs
        faqs: JSON.stringify([
          {
            question: "How difficult is the climb to the top of Sigiriya?",
            answer: "The climb involves approximately 1,200 steps and takes about 1.5 hours for the average person. While steep in places, there are plenty of rest points along the way."
          },
          {
            question: "Can I visit Sigiriya and Dambulla in one day?",
            answer: "Yes, many visitors combine these two UNESCO sites in a single day trip, although having more time allows for a more relaxed experience."
          },
          {
            question: "Is photography allowed throughout the site?",
            answer: "Photography is allowed in most areas of Sigiriya, but flash photography is prohibited in the frescoes gallery to preserve the ancient paintings."
          }
        ])
      },
      {
        name: "Galle Fort",
        description: "Colonial charm with boutique hotels, cafes and ocean views",
        imageUrl: "https://images.unsplash.com/photo-1575136042347-ebaaa37049e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Yala National Park",
        description: "Luxury safari experiences with the highest leopard density in the world",
        imageUrl: "https://images.unsplash.com/photo-1607793279016-c6865c283483?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Ella",
        description: "Mountain vistas, tea plantations, and iconic Nine Arch Bridge",
        imageUrl: "https://images.unsplash.com/photo-1577094695438-efe3fb02c242?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Bentota Beach",
        description: "Pristine golden sands with luxury beach resorts and water sports",
        imageUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Kandy",
        description: "Sacred Temple of the Tooth and serene lake surrounded by hills",
        imageUrl: "https://images.unsplash.com/photo-1619111942607-1bb91e5c6d65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Polonnaruwa",
        description: "Ancient city with well-preserved ruins and impressive stone carvings",
        imageUrl: "https://images.unsplash.com/photo-1602601320430-0b94c1926dce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Dambulla Cave Temple",
        description: "UNESCO World Heritage site with ancient Buddha statues and painted murals",
        imageUrl: "https://images.unsplash.com/photo-1624029769122-a836aba27077?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Anuradhapura",
        description: "Sri Lanka's ancient capital with sacred Bo Tree and majestic stupas",
        imageUrl: "https://images.unsplash.com/photo-1602602516181-a913082de858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Nuwara Eliya",
        description: "Little England with Tudor-style cottages and world-class tea estates",
        imageUrl: "https://images.unsplash.com/photo-1546708936-2af4a8ca0b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Adam's Peak",
        description: "Sacred mountain pilgrimage with breathtaking sunrise views",
        imageUrl: "https://images.unsplash.com/photo-1579176647030-bd86f6fd4e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
      },
      {
        name: "Mirissa",
        description: "Idyllic beach with luxury villas and world-class whale watching",
        imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
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
  
  async getTourPackageBySlug(slug: string): Promise<TourPackage | undefined> {
    return Array.from(this.tourPackages.values()).find(
      (pkg) => pkg.slug === slug
    );
  }
  
  async createTourPackage(insertTourPackage: InsertTourPackage): Promise<TourPackage> {
    const id = this.currentTourPackageId++;
    
    // Generate a slug if one isn't provided
    let slug = insertTourPackage.slug || null;
    if (!slug) {
      slug = insertTourPackage.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .replace(/-+/g, '-'); // Replace multiple dashes with a single dash
    }
    
    // Create a clean object with all required fields
    const tourPackage: TourPackage = {
      id,
      title: insertTourPackage.title,
      description: insertTourPackage.description,
      duration: insertTourPackage.duration,
      price: insertTourPackage.price,
      imageUrl: insertTourPackage.imageUrl,
      slug,
      
      // Handle fields that might be null
      shortDescription: insertTourPackage.shortDescription || null,
      tourHighlights: insertTourPackage.tourHighlights || null,
      highlightsSummary: insertTourPackage.highlightsSummary || null,
      gallery: insertTourPackage.gallery || null,
      rating: insertTourPackage.rating || null,
      reviewCount: insertTourPackage.reviewCount || null,
      featured: insertTourPackage.featured || null,
      destinations: insertTourPackage.destinations || null,
      includes: insertTourPackage.includes || null,
      excludes: insertTourPackage.excludes || null,
      itinerary: insertTourPackage.itinerary || null,
      startingLocations: insertTourPackage.startingLocations || null,
      luxuryLevel: insertTourPackage.luxuryLevel || null,
      bestTimeToVisit: insertTourPackage.bestTimeToVisit || null,
      groupSize: insertTourPackage.groupSize || null
    };
    
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
  
  async getDestinationBySlug(slug: string): Promise<Destination | undefined> {
    // Convert the values iterator to an array to avoid the MapIterator error
    const destinationsArray = Array.from(this.destinations.values());
    return destinationsArray.find(destination => destination.slug === slug);
  }
  
  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.currentDestinationId++;
    
    // Generate a slug if one isn't provided
    let slug = insertDestination.slug || null;
    if (!slug && insertDestination.name) {
      slug = insertDestination.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with dashes
        .replace(/-+/g, '-');     // Replace multiple dashes with a single dash
    }
    
    // Create a clean object with all fields properly handled
    const destination: Destination = {
      id,
      name: insertDestination.name,
      slug: slug,
      description: insertDestination.description,
      imageUrl: insertDestination.imageUrl,
      
      // Handle optional fields
      featured: insertDestination.featured || false,
      region: insertDestination.region || null,
      latitude: insertDestination.latitude || null,
      longitude: insertDestination.longitude || null,
      address: insertDestination.address || null,
      shortDescription: insertDestination.shortDescription || null,
      fullDescription: insertDestination.fullDescription || null,
      highlights: insertDestination.highlights || null,
      bestTimeToVisit: insertDestination.bestTimeToVisit || null,
      recommendedDuration: insertDestination.recommendedDuration || null,
      weatherInfo: insertDestination.weatherInfo || null,
      travelTips: insertDestination.travelTips || null,
      galleryImages: insertDestination.galleryImages || null,
      activities: insertDestination.activities || null,
      experiences: insertDestination.experiences || null,
      faqs: insertDestination.faqs || null,
      createdAt: new Date(),
      updatedAt: null
    };
    
    this.destinations.set(id, destination);
    return destination;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id,
      rating: insertTestimonial.rating || null
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Inquiry methods
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const createdAt = new Date();
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id, 
      createdAt,
      phone: insertInquiry.phone || null,
      travelDates: insertInquiry.travelDates || null,
      packageInterest: insertInquiry.packageInterest || null,
      subscribed: insertInquiry.subscribed || null
    };
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
 * The frontend now connects directly to the .NET Core API on Azure at:
 * https://bsl-dg-adf2awanb4etgsap.uksouth-01.azurewebsites.net
 * This is kept for reference purposes only.
 */
export const storage = new MemStorage();
