import React, { useState } from "react";
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
  
  // Process gallery images
  const galleryImages = React.useMemo(() => {
    if (!tourData) return [];
    
    const images: string[] = [];
    let heroImageUrl = '';
    
    // Process hero image first for fallback
    if (tourData.heroImage) {
      if (typeof tourData.heroImage === 'object') {
        heroImageUrl = 
          tourData.heroImage.large || 
          tourData.heroImage.medium || 
          tourData.heroImage.small || 
          tourData.heroImage.baseUrl || 
          (tourData.heroImage.publicId ? `https://res.cloudinary.com/drsjp6bqz/image/upload/${tourData.heroImage.publicId}.jpg` : '');
      } else if (typeof tourData.heroImage === 'string') {
        heroImageUrl = tourData.heroImage;
      }
    } else if (tourData.cardImage) {
      if (typeof tourData.cardImage === 'object') {
        heroImageUrl = 
          tourData.cardImage.large || 
          tourData.cardImage.medium || 
          tourData.cardImage.small || 
          tourData.cardImage.baseUrl || 
          (tourData.cardImage.publicId ? `https://res.cloudinary.com/drsjp6bqz/image/upload/${tourData.cardImage.publicId}.jpg` : '');
      } else if (typeof tourData.cardImage === 'string') {
        heroImageUrl = tourData.cardImage;
      }
    } else if (tourData.imageUrl) {
      heroImageUrl = tourData.imageUrl;
    }
    
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
  }, [tourData]);
  
  // Process includes
  const includes = React.useMemo(() => {
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
  const excludes = React.useMemo(() => {
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
  const destinations = React.useMemo(() => {
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
  const itinerary = React.useMemo((): APIItineraryDay[] => {
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
  const timelineData = React.useMemo((): TimelineDayData[] => {
    if (!itinerary || itinerary.length === 0) return [];
    
    return itinerary.map(day => {
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
        day.activities.forEach(activity => {
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
      
      // Process image URL
      let imageUrl: string | undefined;
      if (day.image) {
        imageUrl = day.image.medium || day.image.small || day.image.baseUrl;
      }
      if (!imageUrl && day.imageUrl) {
        imageUrl = day.imageUrl;
      }
      if (!imageUrl) {
        // Fallback to a placeholder based on day number
        imageUrl = `https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_600,c_fill/itineraries/day-${day.day}.jpg`;
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
        {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
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
  const handleReviewSubmit = (e: React.FormEvent) => {
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
  if (isTourLoading || isItineraryLoading) {
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
  if (tourError || itineraryError || !tourData) {
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
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-white/60" />
                  <Link href="/tours" className="ml-1 text-sm font-medium hover:text-white">
                    Sri Lanka Tours
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-white/60" />
                  <span className="ml-1 text-sm font-medium text-white/80">
                    {tourData.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          
          {/* Tour Title and Info - Simplified */}
          <div className="text-white relative z-10">
            <h1 className="font-['Playfair_Display'] text-2xl md:text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight md:text-left text-center">
              {tourData.title}
            </h1>
            
            <div className="flex flex-wrap md:justify-start justify-center gap-4 mb-8">
              <div className="flex items-center text-white/90">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{tourData.duration} Days</span>
              </div>
              <div className="flex items-center text-white/90">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{Array.isArray(tourData.destinations) ? tourData.destinations.join(', ') : (typeof tourData.destinations === 'string' ? tourData.destinations.replace(/,/g, ', ') : "Multiple Destinations")}</span>
              </div>
            </div>
            
            <div className="flex md:justify-start justify-center gap-4">
              <a 
                href="#inquiry" 
                className="bg-[#D4AF37] hover:bg-[#c4a033] text-white font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Book This Tour
              </a>
              <a 
                href="#customizeForm" 
                className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Customize Tour
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Left Column - Tour Info */}
            <div className="lg:col-span-3">
              
              {/* Gallery */}
              <div className="mb-16">
                <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg mb-4">
                  <img 
                    src={galleryImages[activeImageIndex] || heroImageUrl || tourData.imageUrl || '/images/tours/scenic-sri-lanka-hero.jpg'} 
                    alt={`${tourData.title} - Image ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover" 
                  />
                  
                  {/* Image Navigation */}
                  {galleryImages.length > 1 && (
                    <>
                      <button 
                        onClick={() => handleImageNav('prev')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6 text-[#103556]" />
                      </button>
                      <button 
                        onClick={() => handleImageNav('next')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6 text-[#103556]" />
                      </button>
                    </>
                  )}
                </div>
                
                {/* Thumbnails */}
                {galleryImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {galleryImages.map((img, index) => (
                      <button 
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${activeImageIndex === index ? 'border-[#D4AF37]' : 'border-transparent'}`}
                      >
                        <img 
                          src={img} 
                          alt={`${tourData.title} - Thumbnail ${index + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Tour Description */}
              <div className="mb-16">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4">
                    {tourData.title}
                  </h2>
                </div>
                <div className="text-xl text-gray-700 font-medium mb-6">
                  {tourData.shortDescription || "Experience the best of Sri Lanka with our luxury tour package."}
                </div>
                <div 
                  className="prose prose-lg max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: tourData.description || '' }}
                />
                {tourData.tourHighlights && (
                  <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 className="text-xl font-semibold mb-3">Tour Highlights</h3>
                    <div className="text-gray-700">{tourData.tourHighlights}</div>
                  </div>
                )}
              </div>
              
              {/* Tour Map & Itinerary - Integrated Experience - Hidden per request */}
              
              {/* Detailed Itinerary Section - For Additional Details */}
              <div className="mb-16">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold">Journey Highlights</h2>
                </div>
                
                {itinerary.length > 0 ? (
                  <div className="bg-white px-0">
                    <VisualTimeline data={timelineData} className="timeline-luxury" />
                  </div>
                ) : (
                  <div className="text-center p-8 bg-[#f8f7f2] rounded-lg border border-[#D4AF37]/20">
                    <p className="text-lg text-gray-600 mb-3">
                      Full {tourData.duration}-day itinerary available upon request.
                    </p>
                    <p className="text-gray-500">
                      Contact our travel consultants for a detailed day-by-day plan.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Tour Highlights Section */}
              <div className="mb-16">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold">Highlights</h2>
                </div>
                
                <div className="space-y-6 mb-8">
                  {tourHighlights.map((item, idx) => (
                    <div key={`highlight-${idx}`} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Includes/Excludes Section - New Style */}
              <div className="mb-16">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold">Included/Excluded</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Included Column */}
                  <div className="space-y-6">
                    {includesItems.map((item, idx) => (
                      <div key={`include-${idx}`} className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <Check className="h-3.5 w-3.5 text-green-600" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Excluded Column */}
                  <div className="space-y-6">
                    {excludesItems.map((item, idx) => (
                      <div key={`exclude-${idx}`} className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <X className="h-3.5 w-3.5 text-red-500" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              {/* Sticky container for all sidebar components */}
              <div className="sticky top-24 space-y-8">
                {/* Price Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-[#103556] p-6 text-white">
                    <div className="flex items-baseline">
                      <span className="text-xl font-medium">From</span>
                      <span className="text-2xl font-normal ml-2">{formatPrice(tourData.price || 0)}</span>
                      <span className="ml-1 text-white/80">per person</span>
                    </div>
                    <p className="text-white/80 text-sm mt-1">Based on double occupancy</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between pb-3 border-b border-gray-100">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-[#D4AF37] mr-3" />
                          <span className="text-gray-600">Duration</span>
                        </div>
                        <span className="font-semibold">{tourData.duration} Days</span>
                      </div>
                      
                      <div className="flex justify-between pb-3 border-b border-gray-100">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-[#D4AF37] mr-3" />
                          <span className="text-gray-600">Tour Type</span>
                        </div>
                        <span className="font-semibold">Private Tour</span>
                      </div>
                      
                      <div className="flex justify-between pb-3 border-b border-gray-100">
                        <div className="flex items-center">
                          <DollarSign className="h-5 w-5 text-[#D4AF37] mr-3" />
                          <span className="text-gray-600">Price Includes</span>
                        </div>
                        <span className="font-semibold">All Inclusive</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 text-[#D4AF37] mr-3" />
                          <span className="text-gray-600">Quality</span>
                        </div>
                        <span className="font-semibold">5-Star Luxury</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <a 
                        href="#inquiry" 
                        className="block bg-[#D4AF37] hover:bg-[#c4a033] text-white font-medium text-center px-6 py-3 rounded-sm transition-colors w-full"
                      >
                        Book This Tour
                      </a>
                      <button 
                        onClick={handleAddToWishlist}
                        className="flex items-center justify-center border border-[#103556] text-[#103556] hover:bg-[#103556] hover:text-white font-medium px-6 py-3 rounded-sm transition-colors w-full"
                      >
                        <Heart className={`h-5 w-5 mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
                        {isInWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Need Help Box */}
                <div className="bg-[#f8f7f2] p-6 rounded-lg border border-[#D4AF37]/20">
                  <h3 className="text-xl font-semibold mb-4">
                    Need Help?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our luxury travel consultants are ready to assist you with any questions about this tour.
                  </p>
                  <div className="flex items-center mt-4 pb-4 border-b border-gray-200">
                    <div className="w-10 h-10 bg-[#103556] rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-phone-alt text-white"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Call us</p>
                      <p className="font-semibold text-[#103556]">+94 77 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="w-10 h-10 bg-[#103556] rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-envelope text-white"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email us</p>
                      <p className="font-semibold text-[#103556]">info@bestsrilankatours.com</p>
                    </div>
                  </div>
                </div>
                
                {/* Customize Box */}
                <div className="bg-[#f8f7f2] p-6 rounded-lg border border-[#D4AF37]/20">
                  <h3 className="text-xl font-semibold mb-4">
                    Need Customizations?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Want to add extra activities, change accommodation options, or adjust the itinerary? Our experts can customize this tour to your preferences.
                  </p>
                  <Button variant="outline" className="w-full">
                    Request Custom Tour
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Tours */}
      <section className="py-20 bg-gradient-to-b from-white to-[#f8f7f2]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-3">
              <span className="text-[#103556] uppercase text-sm font-medium tracking-wider block">Luxury Experiences</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              You May Also Like
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our other luxury experiences across Sri Lanka's most captivating destinations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {relatedTours.map((tour) => (
              <div key={tour.id} className="bg-white overflow-hidden shadow-lg transition-all hover:shadow-2xl group">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={tour.imageUrl} 
                    alt={tour.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-sm font-semibold py-1 px-4 rounded-full">
                    {tour.duration} Days
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="p-8 border-b border-l border-r border-gray-100">
                  <h3 className="text-2xl font-semibold mb-3">{tour.title}</h3>
                  <p className="text-gray-600 mb-6">{tour.shortDescription || tour.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">From</span>
                      <span className="text-[#103556] text-2xl font-normal ml-2">{formatPrice(tour.price || 0)}</span>
                    </div>
                    <Link href={`/tour/${tour.slug || tour.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')}`}>
                      <button className="bg-[#103556] hover:bg-[#1a4971] text-white font-medium px-6 py-2.5 rounded-sm transition-colors">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-14">
            <Link href="/tours">
              <Button variant="outline" size="lg" className="border-[#103556] text-[#103556] hover:bg-[#103556] hover:text-white transition-colors">
                View All Sri Lanka Tours
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Inquiry Form */}
      <section id="inquiry" className="py-24 bg-[#103556] bg-[url('/images/pattern-bg.png')] bg-opacity-10 bg-blend-overlay">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-10 shadow-2xl">
            <div className="text-center mb-10">
              <div className="inline-block mb-3">
                <span className="text-[#103556] uppercase text-sm font-medium tracking-wider block">Book Your Journey</span>
              </div>
              <h2 className="text-4xl font-bold mb-6">
                Interested in This Tour?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Complete the form below and one of our luxury travel consultants will contact you 
                within 24 hours to discuss your booking and answer any questions.
              </p>
            </div>
            
            <ContactForm />
            
            <div className="mt-8 text-center text-gray-600 text-sm">
              <p>By submitting this form, you agree to our <span className="text-[#103556] font-medium">Privacy Policy</span> and <span className="text-[#103556] font-medium">Terms of Service</span>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews and Testimonials section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#f8f7f2]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#103556] uppercase text-sm font-medium tracking-wider block mb-3">Traveler Experiences</span>
            <h2 className="text-4xl font-bold mb-6">
              What Our Guests Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read about the experiences of travelers who have enjoyed this tour
            </p>
          </div>
          
          {/* Reviews Grid - Past Reviews */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Recent Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              <div className="bg-white p-10 shadow-lg rounded-md hover:shadow-xl transition-shadow relative">
                <div className="absolute -top-6 left-10 text-[#D4AF37] text-7xl opacity-20">"</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-6 border-b border-gray-100 pb-6">
                    <div className="w-16 h-16 rounded-full bg-[#103556]/10 flex items-center justify-center text-[#103556] font-semibold text-xl">
                      JD
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">James Davies</h4>
                      <p className="text-gray-500">United Kingdom</p>
                      <div className="flex text-[#D4AF37] mt-1">
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                      </div>
                    </div>
                  </div>
                  <p className="italic text-gray-600 leading-relaxed">
                    "Our trip with BSL Tours exceeded all expectations. The attention to detail was superb, and our guide's knowledge made every destination come alive. The accommodations were stunning and the private transportation was extremely comfortable."
                  </p>
                  <div className="mt-6 text-sm text-[#103556]">
                    <span className="font-medium">Tour:</span> Luxury Sri Lanka
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-10 shadow-lg rounded-md hover:shadow-xl transition-shadow relative">
                <div className="absolute -top-6 left-10 text-[#D4AF37] text-7xl opacity-20">"</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-6 border-b border-gray-100 pb-6">
                    <div className="w-16 h-16 rounded-full bg-[#103556]/10 flex items-center justify-center text-[#103556] font-semibold text-xl">
                      SM
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">Sarah Mitchell</h4>
                      <p className="text-gray-500">Australia</p>
                      <div className="flex text-[#D4AF37] mt-1">
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                        <Star className="h-5 w-5 fill-current" />
                      </div>
                    </div>
                  </div>
                  <p className="italic text-gray-600 leading-relaxed">
                    "From the moment we landed until our departure, everything was perfectly organized. We especially loved the cultural experiences and the wonderful food. Our tour consultant was responsive and made sure every aspect of our journey was flawless."
                  </p>
                  <div className="mt-6 text-sm text-[#103556]">
                    <span className="font-medium">Tour:</span> Cultural Triangle Explorer
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Add Review Section */}
          <div className="max-w-2xl mx-auto bg-white p-10 shadow-lg rounded-md border border-gray-100">
            <h3 className="text-2xl font-bold mb-8 text-center">Share Your Experience</h3>
            
            <form className="space-y-6" onSubmit={handleReviewSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="reviewerName" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    id="reviewerName" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#103556] focus:border-transparent" 
                    placeholder="John Smith"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="reviewerCountry" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input 
                    type="text" 
                    id="reviewerCountry" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#103556] focus:border-transparent" 
                    placeholder="United Kingdom"
                    value={reviewCountry}
                    onChange={(e) => setReviewCountry(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="reviewRating" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="text-[#D4AF37] hover:scale-110 transition-transform"
                      onClick={() => setReviewRating(star)}
                    >
                      <Star className={`h-8 w-8 ${star <= reviewRating ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="reviewContent" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review
                </label>
                <textarea 
                  id="reviewContent" 
                  rows={5} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#103556] focus:border-transparent"
                  placeholder="Share your experience with this tour..."
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full bg-[#103556] hover:bg-[#1a4971] text-white font-medium py-3 px-6 rounded-md transition-colors"
                  disabled={isSubmittingReview}
                >
                  {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Your review will be visible after approval by our team. We appreciate your feedback!
              </p>
            </form>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="relative py-20 bg-[#103556] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="/images/cta-background.jpg"
            alt="Sri Lanka Beach" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Ready to Experience Luxury in Sri Lanka?</h2>
            <p className="text-xl text-white/80 mb-10">
              Our team of luxury travel specialists is waiting to craft your perfect Sri Lankan journey. 
              Don't miss this opportunity to create memories that will last a lifetime.
            </p>
            <a 
              href="#inquiry" 
              className="inline-block bg-[#D4AF37] hover:bg-[#c4a033] text-white font-medium px-8 py-3 rounded-sm transition-colors"
            >
              Book Your Tour Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EnhancedPackageDetail;