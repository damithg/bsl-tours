import { useState, useMemo, useCallback, FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { useCurrency } from "@/contexts/CurrencyContext";
import ContactForm from "@/components/ContactForm";
import TourRouteMap from "@/components/TourRouteMap";
import VisualTimeline from "@/components/VisualTimeline";
import { Calendar, Clock, Map, Users, DollarSign, Award, Check, X, ChevronRight, ChevronLeft, Heart, ChevronDown, LayoutList, List, Home, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Helper Types 
// Tour API response interface based on .NET API structure
interface TourData {
  id: number;
  documentId: string;
  name: string;
  title?: string; // Some places use title instead of name
  slug: string;
  summary: string;
  description?: string;
  shortDescription?: string;
  duration: string;
  startingFrom: number;
  price?: number; // Some places use price instead of startingFrom
  currency: string;
  inclusions: string[];
  exclusions: string[];
  includes?: string | string[]; // Additional property for backward compatibility
  excludes?: string | string[]; // Additional property for backward compatibility
  imageUrl?: string;
  gallery?: string;
  galleryImages?: any[]; // Either string[] or object array with image properties
  itinerary?: any; // Can be string or array
  // destinationNames can be a string or array of destination names
  destinations?: string | string[]; // Can be string or array
  itineraryDays?: Array<{
    id?: number;
    day: number;
    title: string;
    description: string;
    accommodation?: string | { name: string };
    imageUrl?: string;
    image?: {
      small?: string;
      medium?: string;
      large?: string;
      baseUrl?: string;
    };
    activities?: Array<{
      title: string;
      description?: string;
      time?: string;
      imageUrl?: string;
    }>;
    meals?: {
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
    };
  }>;
  heroImage?: {
    id?: number;
    publicId?: string;
    alt?: string;
    caption?: string;
    orientation?: string;
    baseUrl?: string;
    small?: string;
    medium?: string;
    large?: string;
    url?: string;
  } | string;
  cardImage?: {
    id?: number;
    publicId?: string;
    alt?: string;
    caption?: string;
    orientation?: string;
    baseUrl?: string;
    small?: string;
    medium?: string;
    large?: string;
    url?: string;
  } | string;
  tourHighlights?: string[];
  accommodationInfo?: string;
  operatedBy?: string;
  category?: string;
  tags?: string[];
  minGroupSize?: number;
  maxGroupSize?: number;
  reviews?: Array<{
    id: number;
    reviewer: string;
    country: string;
    comment: string;
    rating: number;
  }>;
}

// Define the interface for variables used in the component  
interface APIItineraryDay {
  day: number;
  title: string;
  description: string;
  accommodation?: string | { name: string };
  imageUrl?: string;
  image?: {
    small?: string;
    medium?: string;
    large?: string;
    baseUrl?: string;
  };
  activities?: Array<{
    title: string;
    description?: string;
    time?: string;
    imageUrl?: string;
  }>;
  meals?: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
}

interface TimelineDayData {
  day: number;
  title: string;
  description: string;
  accommodation?: string;
  imageUrl?: string;
}

interface RelatedTour {
  id: number;
  title: string;
  duration: number;
  price: number;
  imageUrl: string;
  description: string;
  shortDescription?: string;
  slug?: string;
}

const EnhancedPackageDetail = () => {
  const params = useParams();
  const slug = params.slug;  // Get the slug parameter
  const id = params.id;      // Also support ID parameter for backward compatibility
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewCountry, setReviewCountry] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  
  // Get currency formatter
  const { formatPrice } = useCurrency();

  // Use the Azure-hosted .NET API for tour details - single API endpoint with all data
  const apiBaseUrl = 'https://bsl-dg-adf2awanb4etgsap.uksouth-01.azurewebsites.net/api/tours';
  
  // Build the right query based on slug or id
  const apiQueryUrl = slug 
    ? `${apiBaseUrl}/${slug}`
    : `${apiBaseUrl}/${id}`;
    
  // Fetch tour data - all data comes from a single API request
  const { 
    data: tourData, 
    isLoading: isTourLoading, 
    error: tourError 
  } = useQuery<TourData>({
    queryKey: ['tour', slug || id], // Use stable query key
    queryFn: async () => {
      console.log(`Fetching tour data: ${apiQueryUrl}`);
      const response = await fetch(apiQueryUrl);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    enabled: !!slug || !!id, // Only run query when we have either slug or id
    retry: 1, // Limit retries to prevent excessive requests
  });
  
  // Extract hero image URL for use in other places
  const heroImageUrl = useMemo(() => {
    if (!tourData) return '';
    
    // Process hero image
    if (tourData.heroImage) {
      if (typeof tourData.heroImage === 'object') {
        return tourData.heroImage.large || 
          tourData.heroImage.medium || 
          tourData.heroImage.small || 
          tourData.heroImage.baseUrl || 
          (tourData.heroImage.publicId ? `https://res.cloudinary.com/drsjp6bqz/image/upload/${tourData.heroImage.publicId}.jpg` : '');
      } else if (typeof tourData.heroImage === 'string') {
        return tourData.heroImage;
      }
    } else if (tourData.cardImage) {
      if (typeof tourData.cardImage === 'object') {
        return tourData.cardImage.large || 
          tourData.cardImage.medium || 
          tourData.cardImage.small || 
          tourData.cardImage.baseUrl || 
          (tourData.cardImage.publicId ? `https://res.cloudinary.com/drsjp6bqz/image/upload/${tourData.cardImage.publicId}.jpg` : '');
      } else if (typeof tourData.cardImage === 'string') {
        return tourData.cardImage;
      }
    } else if (tourData.imageUrl) {
      return tourData.imageUrl;
    }
    
    return '';
  }, [tourData]);
  
  // Process gallery images
  const galleryImages = useMemo(() => {
    if (!tourData) return [];
    
    const images: string[] = [];
    
    // Process gallery images
    if (tourData.galleryImages && Array.isArray(tourData.galleryImages)) {
      tourData.galleryImages.forEach(img => {
        if (typeof img === 'object') {
          const imgUrl = 
            img.large || 
            img.medium || 
            img.small || 
            img.baseUrl || 
            (img.publicId ? `https://res.cloudinary.com/drsjp6bqz/image/upload/${img.publicId}.jpg` : '');
          if (imgUrl) images.push(imgUrl);
        } else if (typeof img === 'string') {
          images.push(img);
        }
      });
    } else if (tourData.gallery) {
      try {
        const parsedGallery = JSON.parse(tourData.gallery);
        if (Array.isArray(parsedGallery)) {
          parsedGallery.forEach(img => {
            if (typeof img === 'string') images.push(img);
          });
        }
      } catch (e) {
        // If parsing fails, use hero image as fallback
        if (heroImageUrl) images.push(heroImageUrl);
      }
    } else if (heroImageUrl) {
      images.push(heroImageUrl);
    }
    
    return images.length > 0 ? images : (heroImageUrl ? [heroImageUrl] : []);
  }, [tourData, heroImageUrl]);
  
  // Process includes
  const includes = useMemo(() => {
    if (!tourData) return [];
    
    if (tourData.includes) {
      if (Array.isArray(tourData.includes)) {
        return tourData.includes;
      } else if (typeof tourData.includes === 'string') {
        try {
          const parsedIncludes = JSON.parse(tourData.includes);
          if (Array.isArray(parsedIncludes)) {
            return parsedIncludes;
          }
        } catch (e) {
          // If parsing fails, try inclusions field
        }
      }
    }
    
    return tourData.inclusions && Array.isArray(tourData.inclusions) ? tourData.inclusions : [];
  }, [tourData]);
  
  // Process excludes
  const excludes = useMemo(() => {
    if (!tourData) return [];
    
    if (tourData.excludes) {
      if (Array.isArray(tourData.excludes)) {
        return tourData.excludes;
      } else if (typeof tourData.excludes === 'string') {
        try {
          const parsedExcludes = JSON.parse(tourData.excludes);
          if (Array.isArray(parsedExcludes)) {
            return parsedExcludes;
          }
        } catch (e) {
          // If parsing fails, try exclusions field
        }
      }
    }
    
    return tourData.exclusions && Array.isArray(tourData.exclusions) ? tourData.exclusions : [];
  }, [tourData]);
  
  // Process destinations
  const destinations = useMemo(() => {
    if (!tourData || !tourData.destinations) return [];
    
    if (Array.isArray(tourData.destinations)) {
      return tourData.destinations;
    } else if (typeof tourData.destinations === 'string') {
      try {
        const parsedDestinations = JSON.parse(tourData.destinations);
        if (Array.isArray(parsedDestinations)) {
          return parsedDestinations;
        }
        // If it's a comma-separated string
        return tourData.destinations.split(',').map(d => d.trim());
      } catch (e) {
        // If parsing fails, try splitting by comma
        return tourData.destinations.split(',').map(d => d.trim());
      }
    }
    
    return [];
  }, [tourData]);
  
  // Process itinerary data
  const itinerary = useMemo((): APIItineraryDay[] => {
    if (!tourData) return [];
    
    // First try using itineraryDays if available
    if (tourData.itineraryDays && Array.isArray(tourData.itineraryDays) && tourData.itineraryDays.length > 0) {
      return tourData.itineraryDays;
    }
    
    // Then try the itinerary property
    if (tourData.itinerary) {
      // If itinerary is already an array
      if (Array.isArray(tourData.itinerary) && tourData.itinerary.length > 0) {
        return tourData.itinerary;
      }
      
      // If itinerary is a JSON string
      if (typeof tourData.itinerary === 'string') {
        try {
          const parsedItinerary = JSON.parse(tourData.itinerary);
          if (Array.isArray(parsedItinerary) && parsedItinerary.length > 0) {
            return parsedItinerary;
          }
        } catch (e) {
          // If parsing fails, try to extract day information from text
          if (tourData.itinerary.includes('Day')) {
            const lines = tourData.itinerary.split('\n');
            const textItinerary: APIItineraryDay[] = [];
            
            lines.forEach(line => {
              const match = line.match(/Day (\d+)(?:-\d+)?: (.+)/);
              if (match) {
                const day = parseInt(match[1]);
                const title = match[2].trim();
                
                textItinerary.push({
                  day,
                  title,
                  description: `Visit key attractions in ${title} with your private guide.`,
                  accommodation: "Luxury Hotel"
                });
              }
            });
            
            if (textItinerary.length > 0) {
              return textItinerary;
            }
          }
        }
      }
    }
    
    return [];
  }, [tourData]);
  
  // Transform itinerary data into timeline format
  const timelineData = useMemo((): TimelineDayData[] => {
    if (!itinerary || itinerary.length === 0) return [];
    
    return itinerary.map((day, index) => {
      // Process accommodation
      let accommodationText: string | undefined;
      if (typeof day.accommodation === 'object' && day.accommodation !== null) {
        accommodationText = day.accommodation.name;
      } else if (typeof day.accommodation === 'string') {
        accommodationText = day.accommodation;
      }
      
      // Process description with activities and meals
      let fullDescription = day.description || '';
      
      // Add activities if available
      if (day.activities && Array.isArray(day.activities) && day.activities.length > 0) {
        fullDescription += '<br/><br/><strong>Today\'s Activities:</strong><ul>';
        day.activities.forEach((activity, activityIndex) => {
          fullDescription += `<li><strong>${activity.title}</strong>`;
          if (activity.description) fullDescription += `: ${activity.description}`;
          if (activity.time) fullDescription += ` (${activity.time})`;
          fullDescription += '</li>';
        });
        fullDescription += '</ul>';
      }
      
      // Add meals if available
      if (day.meals) {
        fullDescription += '<br/><strong>Meals:</strong> ';
        const meals = [];
        if (day.meals.breakfast) meals.push('Breakfast');
        if (day.meals.lunch) meals.push('Lunch');
        if (day.meals.dinner) meals.push('Dinner');
        
        fullDescription += meals.length > 0 ? meals.join(', ') : 'No meals included';
      }
      
      // Process image URL - specifically extract medium from image object 
      let imageUrl: string | undefined;
      
      // First priority: Extract from image object structure following the updated API image prioritization
      if (day.image && typeof day.image === 'object' && day.image !== null) {
        // Updated image prioritization: medium -> large -> small -> baseUrl
        imageUrl = day.image.medium || day.image.large || day.image.small || day.image.baseUrl;
      } 
      // Second priority: If image is a direct string
      else if (day.image && typeof day.image === 'string') {
        imageUrl = day.image;
      }
      // Third priority: If there's an imageUrl property
      else if (day.imageUrl) {
        imageUrl = day.imageUrl;
      }
      
      return {
        day: day.day,
        title: day.title,
        description: fullDescription,
        accommodation: accommodationText,
        imageUrl
      };
    });
  }, [itinerary]);

  // Format rating to display as stars (50 = 5 stars)
  const formatRating = (rating: number | null) => {
    if (rating === null) rating = 50; // Default to 5 stars if no rating
    
    const fullStars = Math.min(Math.floor(rating / 10), 5);
    const hasHalfStar = rating % 10 >= 5 && fullStars < 5;
    const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));
    
    return (
      <div className="text-amber-400 flex text-lg">
        {Array.from({length: fullStars}, (_, i) => (
          <i key={`full-${i}`} className="fas fa-star"></i>
        ))}
        {hasHalfStar && <i key="half-star" className="fas fa-star-half-alt"></i>}
        {Array.from({length: emptyStars}, (_, i) => (
          <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
      </div>
    );
  };

  // Handle image navigation
  const handleImageNav = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    } else {
      setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    }
  };

  // Handle wishlist toggle
  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist);
    // In a real app, this would save to user's profile
  };
  
  // Handle review submission
  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!reviewName || !reviewContent || reviewRating < 1) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmittingReview(true);
    
    // In a real app, this would send the review to the API
    setTimeout(() => {
      // Simulate API call success
      alert('Thank you for your review! It will be visible after moderation.');
      
      // Reset form
      setReviewName('');
      setReviewCountry('');
      setReviewContent('');
      setReviewRating(5);
      setIsSubmittingReview(false);
    }, 1000);
  };

  // Default package includes if not available in data
  const includesItems = includes.length > 0 ? includes : [
    "Luxury accommodations throughout the journey",
    "Private transportation in an air-conditioned vehicle",
    "English-speaking chauffeur guide",
    "Daily breakfast and selected meals",
    "All entrance fees to sites mentioned in the itinerary",
    "Welcome and farewell dinners",
    "24/7 concierge support",
    "All government taxes"
  ];

  // Default package excludes if not available in data
  const excludesItems = excludes.length > 0 ? excludes : [
    "International airfare",
    "Personal expenses",
    "Meals not mentioned in the itinerary",
    "Travel insurance",
    "Visa fees",
    "Optional activities"
  ];
  
  // Tour highlights
  const tourHighlights = [
    "Visit the UNESCO World Heritage sites in the Cultural Triangle",
    "Climb the iconic Sigiriya Rock Fortress",
    "Explore ancient cities of Polonnaruwa and Anuradhapura",
    "Experience sacred Buddhist temples and cave paintings in Dambulla",
    "Discover the Temple of the Sacred Tooth Relic in Kandy"
  ];

  // Mock related tours (in a real app, these would be fetched from API)
  const relatedTours: RelatedTour[] = [
    {
      id: 1,
      title: "Wildlife Safari Experience",
      duration: 6,
      price: 2199,
      imageUrl: "https://images.unsplash.com/photo-1544535830-2a087b7641c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Discover Sri Lanka's incredible wildlife in luxury tented camps and boutique lodges.",
      shortDescription: "Discover Sri Lanka's incredible wildlife in luxury tented camps and boutique lodges.",
      slug: "wildlife-safari-experience"
    },
    {
      id: 2,
      title: "Ayurvedic Wellness Retreat",
      duration: 8,
      price: 2999,
      imageUrl: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Rejuvenate with ancient healing traditions in luxury wellness sanctuaries.",
      shortDescription: "Rejuvenate with ancient healing traditions in luxury wellness sanctuaries.",
      slug: "ayurvedic-wellness-retreat"
    },
    {
      id: 3,
      title: "Coastal Luxury Getaway",
      duration: 7,
      price: 2499,
      imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Experience the finest beach resorts and water activities along Sri Lanka's pristine coast.",
      shortDescription: "Experience the finest beach resorts and water activities along Sri Lanka's pristine coast.",
      slug: "coastal-luxury-getaway"
    }
  ];

  // Loading state
  if (isTourLoading) {
    return (
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="flex flex-col gap-4">
              <div className="h-10 bg-gray-200 animate-pulse rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (tourError || !tourData) {
    return (
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-xl mx-auto">
            <h1 className="font-['Playfair_Display'] text-3xl font-bold text-primary mb-4">Tour Not Found</h1>
            <p className="text-lg text-muted-foreground mb-6">We couldn't find the tour you're looking for.</p>
            <Link href="/tours">
              <Button size="lg">View All Sri Lanka Tours</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section with larger image and prominent text overlay */}
      <section className="relative h-[380px]">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImageUrl || tourData.imageUrl || '/images/tours/scenic-sri-lanka-hero.jpg'})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>
        </div>
        
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28">
          <nav className="flex text-white/90 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li key="breadcrumb-home" className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </li>
              <li key="breadcrumb-tours">
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-white/60" />
                  <Link href="/tours" className="ml-1 text-sm font-medium hover:text-white">
                    Sri Lanka Tours
                  </Link>
                </div>
              </li>
              <li key="breadcrumb-current" aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-white/60" />
                  <span className="ml-1 text-sm font-medium text-white/80">
                    {tourData.title || tourData.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          
          {/* Tour Title and Info - Simplified */}
          <div className="text-white relative z-10">
            <h1 className="font-['Playfair_Display'] text-2xl md:text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight md:text-left text-center">
              {tourData.title || tourData.name}
            </h1>
            
            <div className="flex flex-wrap md:justify-start justify-center gap-4 mb-4">
              {[
                { 
                  id: "duration", 
                  icon: <Calendar className="w-4 h-4 mr-2" />, 
                  text: `${tourData.duration} Days` 
                },
                { 
                  id: "destinations", 
                  icon: <MapPin className="w-4 h-4 mr-2" />, 
                  text: `${destinations.slice(0, 3).join(', ')}${destinations.length > 3 ? '...' : ''}` 
                },
                { 
                  id: "tour-type", 
                  icon: <Users className="w-4 h-4 mr-2" />, 
                  text: "Private Tour" 
                },
                { 
                  id: "rating", 
                  icon: <Star className="w-4 h-4 mr-2 text-amber-400" />, 
                  text: "5.0 (23 reviews)" 
                }
              ].map((item) => (
                <div key={`header-info-${item.id}`} className="flex items-center text-white/80">
                  {item.icon}
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Tour Details - Left Column (2/3 width on desktop) */}
          <div className="lg:w-2/3">
            {/* Gallery Images */}
            <div className="relative mb-8 overflow-hidden rounded-lg">
              {galleryImages.length > 0 ? (
                <>
                  <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden">
                    <img 
                      src={galleryImages[activeImageIndex]}
                      alt={`${tourData.title || tourData.name} - Gallery image ${activeImageIndex + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* Gallery Navigation */}
                  {galleryImages.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <button 
                        onClick={() => handleImageNav('prev')}
                        className="bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={() => handleImageNav('next')}
                        className="bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  )}
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                    {activeImageIndex + 1} / {galleryImages.length}
                  </div>
                </>
              ) : (
                <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No gallery images available</p>
                </div>
              )}
            </div>
            
            {/* Tour Summary or Description */}
            <div className="mb-8">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-primary mb-4">Tour Overview</h2>
              <div 
                className="prose prose-lg max-w-none text-muted-foreground" 
                dangerouslySetInnerHTML={{ __html: tourData.description || tourData.summary || '' }} 
              />
            </div>
            
            {/* Tour Highlights */}
            <div className="mb-8 bg-primary/5 p-6 rounded-lg">
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-primary mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Tour Highlights
              </h2>
              <ul className="grid md:grid-cols-2 gap-3">
                {(tourData.tourHighlights || tourHighlights).map((highlight, index) => (
                  <li key={`highlight-${highlight.substring(0, 15)}-${index}`} className="flex items-start">
                    <Check className="w-5 h-5 text-primary/80 mr-2 mt-1" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Tour Tabs: Itinerary, Inclusions, Map */}
            <Tabs defaultValue="itinerary" className="mb-8">
              <TabsList className="mb-4 grid grid-cols-3 border-b border-b-muted w-full rounded-none bg-transparent h-auto">
                {[
                  { id: "itinerary", label: "Itinerary", icon: <LayoutList className="w-4 h-4 mr-2" /> },
                  { id: "inclusions", label: "Inclusions", icon: <List className="w-4 h-4 mr-2" /> },
                  { id: "map", label: "Map", icon: <Map className="w-4 h-4 mr-2" /> }
                ].map((tab) => (
                  <TabsTrigger 
                    key={`tab-${tab.id}`} 
                    value={tab.id} 
                    className="py-2 text-sm md:text-base data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    {tab.icon}
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {/* Itinerary Tab Content */}
              <TabsContent value="itinerary" className="mt-0">
                {timelineData.length > 0 ? (
                  <VisualTimeline data={timelineData} />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Detailed itinerary information is not available for this tour.</p>
                    <p className="mt-2">Please contact us for a customized day-by-day plan.</p>
                  </div>
                )}
              </TabsContent>
              
              {/* Inclusions Tab Content */}
              <TabsContent value="inclusions" className="mt-0">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Package Includes */}
                  <div>
                    <h3 className="font-['Playfair_Display'] text-lg font-bold text-primary mb-4 flex items-center">
                      <Check className="w-5 h-5 mr-2 text-green-600" />
                      Package Includes
                    </h3>
                    <ul className="space-y-2">
                      {includesItems.map((item, index) => (
                        <li key={`inclusion-${item.substring(0, 15)}-${index}`} className="flex items-start">
                          <Check className="w-4 h-4 text-green-600 mr-2 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Package Excludes */}
                  <div>
                    <h3 className="font-['Playfair_Display'] text-lg font-bold text-primary mb-4 flex items-center">
                      <X className="w-5 h-5 mr-2 text-red-500" />
                      Package Excludes
                    </h3>
                    <ul className="space-y-2">
                      {excludesItems.map((item, index) => (
                        <li key={`exclusion-${item.substring(0, 15)}-${index}`} className="flex items-start">
                          <X className="w-4 h-4 text-red-500 mr-2 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              {/* Map Tab Content */}
              <TabsContent value="map" className="mt-0">
                {destinations.length > 0 ? (
                  <div className="rounded-lg overflow-hidden">
                    <TourRouteMap destinations={destinations} itinerary={timelineData} />
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Map information is not available for this tour.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            {/* Accommodation Information */}
            {tourData.accommodationInfo && (
              <div className="mb-8">
                <h2 className="font-['Playfair_Display'] text-xl font-bold text-primary mb-4 flex items-center">
                  <Home className="w-5 h-5 mr-2" />
                  Accommodation
                </h2>
                <div 
                  className="prose prose-lg max-w-none text-muted-foreground" 
                  dangerouslySetInnerHTML={{ __html: tourData.accommodationInfo }} 
                />
              </div>
            )}
            
            {/* Customer Reviews */}
            <div className="mb-8">
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-primary mb-4">Customer Reviews</h2>
              
              {/* Reviews List */}
              <div className="space-y-4 mb-6">
                {tourData.reviews && tourData.reviews.length > 0 ? (
                  tourData.reviews.map(review => (
                    <div key={review.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold">{review.reviewer}</h4>
                          <p className="text-sm text-muted-foreground">{review.country}</p>
                        </div>
                        {formatRating(review.rating)}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 border border-border rounded-lg">
                    <p className="text-muted-foreground">No reviews yet. Be the first to review this tour.</p>
                  </div>
                )}
              </div>
              
              {/* Review Form */}
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-primary mb-4">Leave a Review</h3>
                <form onSubmit={handleReviewSubmit}>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="name">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        className="border-border rounded-md w-full p-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="country">
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        value={reviewCountry}
                        onChange={(e) => setReviewCountry(e.target.value)}
                        className="border-border rounded-md w-full p-2"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="review">
                      Your Review *
                    </label>
                    <textarea
                      id="review"
                      rows={4}
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      className="border-border rounded-md w-full p-2"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Rating *
                    </label>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={`rating-star-${rating}`}
                          type="button"
                          onClick={() => setReviewRating(rating * 10)}
                          className="text-2xl"
                        >
                          <i className={`fas fa-star ${reviewRating >= rating * 10 ? 'text-amber-400' : 'text-gray-300'}`}></i>
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" disabled={isSubmittingReview}>
                    {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </form>
              </div>
            </div>
            
            {/* Related Tours */}
            <div className="mb-8">
              <h2 className="font-['Playfair_Display'] text-xl font-bold text-primary mb-4">You Might Also Like</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedTours.map((tour) => (
                  <Link href={`/tours/${tour.slug}`} key={tour.id} className="group">
                    <div className="border border-border rounded-lg overflow-hidden h-full transition-shadow hover:shadow-md">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={tour.imageUrl} 
                          alt={tour.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold group-hover:text-primary">{tour.title}</h3>
                          <Badge variant="outline">{tour.duration} Days</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{tour.shortDescription || tour.description}</p>
                        <div className="font-bold text-primary">
                          From {formatPrice(tour.price)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar - Right Column (1/3 width on desktop) */}
          <div className="lg:w-1/3">
            {/* Booking Card */}
            <div className="border border-border rounded-lg p-6 mb-8 sticky top-24">
              {/* Price Display */}
              <div className="mb-4">
                <div className="text-sm text-muted-foreground">Starting from</div>
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(tourData.startingFrom || tourData.price || 0)}
                </div>
                <div className="text-sm text-muted-foreground">per person</div>
              </div>
              
              {/* Quick Info */}
              <div className="border-t border-b border-border py-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { 
                      id: "duration", 
                      icon: <Calendar className="w-4 h-4 mr-2 text-primary/70" />, 
                      text: `${tourData.duration} Days`,
                      colSpan: 1
                    },
                    { 
                      id: "tour-type", 
                      icon: <Users className="w-4 h-4 mr-2 text-primary/70" />, 
                      text: "Private Tour",
                      colSpan: 1
                    },
                    { 
                      id: "destinations", 
                      icon: <MapPin className="w-4 h-4 mr-2 text-primary/70" />, 
                      text: `${destinations.slice(0, 3).join(', ')}${destinations.length > 3 ? '...' : ''}`,
                      colSpan: 2
                    }
                  ].map((item) => (
                    <div 
                      key={`sidebar-info-${item.id}`} 
                      className={`flex items-center ${item.colSpan === 2 ? 'col-span-2' : ''}`}
                    >
                      {item.icon}
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Request Quote
                </Button>
                <Button variant="outline" className="w-full" onClick={handleAddToWishlist}>
                  <Heart className={`w-4 h-4 mr-2 ${isInWishlist ? 'fill-primary text-primary' : ''}`} />
                  {isInWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>
              
              {/* Tour Operated By */}
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>Operated by <strong>{tourData.operatedBy || "Best Sri Lanka Tours"}</strong></p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="border border-border rounded-lg p-6">
              <h2 className="font-['Playfair_Display'] text-lg font-bold text-primary mb-4">Ask a Question</h2>
              <ContactForm tourName={tourData.title || tourData.name} prefilledMessage={`I'm interested in the ${tourData.title || tourData.name} tour and would like more information.`} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EnhancedPackageDetail;