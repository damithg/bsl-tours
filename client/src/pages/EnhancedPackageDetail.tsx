import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { TourPackage } from "@/lib/queryClient";
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
// We're using the ItineraryDay interface from queryClient.ts

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
  galleryImages?: string[];
  itinerary?: string;
  // destinationNames can be a string or array of destination names
  destinations?: string | string[]; // Can be string or array
  itineraryDays?: Array<{
    id?: number;
    day: number;
    title: string;
    description: string;
    accommodation?: string;
    imageUrl?: string;
    image?: {
      small?: string;
      medium?: string;
      large?: string;
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
    id: number;
    publicId: string;
    alt: string;
    caption: string;
    orientation: string;
  };
  cardImage?: {
    id: number;
    publicId: string;
    alt: string;
    caption: string;
    orientation: string;
  };
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
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

// For direct API responses
interface StrapiResponse {
  data: TourData | TourData[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  };
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
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [heroImageUrl, setHeroImageUrl] = useState<string>('');
  const [includes, setIncludes] = useState<string[]>([]);
  const [excludes, setExcludes] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<APIItineraryDay[]>([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [timelineData, setTimelineData] = useState<TimelineDayData[]>([]);
  
  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewCountry, setReviewCountry] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  // Using only the visual timeline format
  
  // Get currency formatter
  const { formatPrice } = useCurrency();

  // Use the Azure-hosted .NET API for tour details
  const apiBaseUrl = 'https://bsl-dg-adf2awanb4etgsap.uksouth-01.azurewebsites.net/api/tours';
  
  // Build the right query based on slug or id
  const strapiQueryUrl = slug 
    ? `${apiBaseUrl}/${slug}`
    : `${apiBaseUrl}/${id}`;
    
  // Fetch tour data
  const { 
    data: strapiResponse, 
    isLoading: isTourLoading, 
    error: tourError 
  } = useQuery({
    queryKey: [strapiQueryUrl],
  });
  
  // Extract the tour data from the response
  // Handle the response potentially being flat without a data property wrapping it
  const tourData: TourData = strapiResponse 
    ? (typeof strapiResponse === 'object' 
        ? (strapiResponse.data 
            ? (Array.isArray(strapiResponse.data) && strapiResponse.data.length > 0
                ? strapiResponse.data[0]
                : strapiResponse.data as TourData)
            : strapiResponse as TourData) // Handle both wrapper and direct object
        : {} as TourData)
    : {} as TourData;
    
  // Debug log the JSON to see exact structure
  if (tourData) {
    console.log("PROCESSED TOUR DATA:", JSON.stringify(tourData, null, 2));
  }
    
  console.log("PROCESSED TOUR DATA:", tourData);
    
  // Extract itinerary data from the tour data
  const itineraryData = tourData?.itineraryDays || [];
  const isItineraryLoading = isTourLoading;
  const itineraryError = null;

  // Process JSON fields when data is loaded
  useEffect(() => {
    if (tourData) {
      console.log("Tour data received:", tourData);
      
      // Log the structure of tourData to help debug
      console.log("Tour data structure check:", {
        id: tourData.id,
        name: tourData.name || tourData.title,
        slug: tourData.slug,
        imageUrl: tourData.imageUrl,
        heroImage: tourData.heroImage,
        galleryImages: tourData.galleryImages
      });
      
      console.log("Gallery Image URL Check:", {
        galleryImages: tourData.galleryImages,
        isArray: tourData.galleryImages && Array.isArray(tourData.galleryImages),
        galleryField: tourData.gallery
      });
      
      // Process heroImage first - this determines the main tour image
      let processedHeroImageUrl = '';
      
      // Direct debug of the heroImage object
      console.log("HERO IMAGE OBJECT:", JSON.stringify(tourData.heroImage, null, 2));
      console.log("HERO IMAGE TYPE CHECK:", {
        exists: !!tourData.heroImage,
        type: typeof tourData.heroImage,
        hasPublicId: tourData.heroImage && typeof tourData.heroImage === 'object' && 'publicId' in tourData.heroImage
      });
      
      if (tourData.heroImage) {
        if (typeof tourData.heroImage === 'object') {
          if ('publicId' in tourData.heroImage && tourData.heroImage.publicId) {
            console.log("Using heroImage with publicId from API response:", tourData.heroImage.publicId);
            processedHeroImageUrl = `https://res.cloudinary.com/drsjp6bqz/image/upload/v1743583187/${tourData.heroImage.publicId}.jpg`;
            setHeroImageUrl(processedHeroImageUrl);
            console.log("SET HERO URL TO:", processedHeroImageUrl);
          } else if ('url' in tourData.heroImage && tourData.heroImage.url) {
            console.log("Using heroImage with url from API response:", tourData.heroImage.url);
            processedHeroImageUrl = tourData.heroImage.url;
            setHeroImageUrl(processedHeroImageUrl);
          } else {
            console.log("HeroImage object exists but has no publicId or url");
          }
        } else if (typeof tourData.heroImage === 'string') {
          console.log("Using heroImage string from API response:", tourData.heroImage);
          processedHeroImageUrl = tourData.heroImage;
          setHeroImageUrl(processedHeroImageUrl);
        }
      } else if (tourData.cardImage) {
        if (typeof tourData.cardImage === 'object') {
          if (tourData.cardImage.publicId) {
            console.log("Using cardImage as fallback for heroImage:", tourData.cardImage);
            processedHeroImageUrl = `https://res.cloudinary.com/drsjp6bqz/image/upload/v1743583187/${tourData.cardImage.publicId}.jpg`;
            setHeroImageUrl(processedHeroImageUrl);
          } else if (tourData.cardImage.url) {
            console.log("Using cardImage url as fallback for heroImage:", tourData.cardImage);
            processedHeroImageUrl = tourData.cardImage.url;
            setHeroImageUrl(processedHeroImageUrl);
          }
        } else if (typeof tourData.cardImage === 'string') {
          console.log("Using cardImage string as fallback for heroImage:", tourData.cardImage);
          processedHeroImageUrl = tourData.cardImage;
          setHeroImageUrl(processedHeroImageUrl);
        }
      } else if (tourData.imageUrl) {
        console.log("Using imageUrl as fallback for hero:", tourData.imageUrl);
        processedHeroImageUrl = tourData.imageUrl;
        setHeroImageUrl(processedHeroImageUrl);
      }
      
      // Important: we're not directly modifying tourData anymore to avoid infinite update loops
      
      // Handle gallery images
      // First check for galleryImages array in the API response
      if (tourData.galleryImages && Array.isArray(tourData.galleryImages)) {
        console.log("Using galleryImages from API response:", tourData.galleryImages);
        
        // Process gallery images - convert publicId objects to Cloudinary URLs if needed
        const processedGalleryImages = tourData.galleryImages.map((image: any) => {
          if (typeof image === 'object' && image.publicId) {
            return `https://res.cloudinary.com/drsjp6bqz/image/upload/v1743583187/${image.publicId}.jpg`;
          } else if (typeof image === 'string') {
            return image;
          }
          return '';  // Return empty string instead of null to maintain string[] type
        }).filter((url: string) => url !== '');  // Filter out empty strings
        
        setGalleryImages(processedGalleryImages);
      } 
      // Then try to parse gallery field if it exists
      else if (tourData.gallery) {
        try {
          const parsedGallery = JSON.parse(tourData.gallery);
          console.log("Parsed gallery from JSON string:", parsedGallery);
          setGalleryImages(parsedGallery);
        } catch (e) {
          console.log("Error parsing gallery, using imageUrl as fallback");
          // Use processedHeroImageUrl (local var) as primary fallback if available
          setGalleryImages([processedHeroImageUrl || tourData.imageUrl || '/images/tours/scenic-sri-lanka-hero.jpg']);
        }
      } else {
        console.log("No gallery found, using imageUrl as fallback");
        // Use processedHeroImageUrl (local var) as primary fallback if available
        setGalleryImages([processedHeroImageUrl || tourData.imageUrl || '/images/tours/scenic-sri-lanka-hero.jpg']);
      }

      // Parse includes/excludes if available
      if (tourData.includes) {
        try {
          // Handle both string and array types
          if (typeof tourData.includes === 'string') {
            setIncludes(JSON.parse(tourData.includes));
          } else if (Array.isArray(tourData.includes)) {
            setIncludes(tourData.includes);
          }
        } catch (e) {
          setIncludes([]);
        }
      } else if (tourData.inclusions && Array.isArray(tourData.inclusions)) {
        // Use inclusions if includes is not available
        setIncludes(tourData.inclusions);
      }

      if (tourData.excludes) {
        try {
          // Handle both string and array types
          if (typeof tourData.excludes === 'string') {
            setExcludes(JSON.parse(tourData.excludes));
          } else if (Array.isArray(tourData.excludes)) {
            setExcludes(tourData.excludes);
          }
        } catch (e) {
          setExcludes([]);
        }
      } else if (tourData.exclusions && Array.isArray(tourData.exclusions)) {
        // Use exclusions if excludes is not available
        setExcludes(tourData.exclusions);
      }

      // Parse destinations if available
      if (tourData.destinations) {
        try {
          // Handle both string and array types
          if (typeof tourData.destinations === 'string') {
            setDestinations(JSON.parse(tourData.destinations));
          } else if (Array.isArray(tourData.destinations)) {
            setDestinations(tourData.destinations);
          }
        } catch (e) {
          setDestinations([]);
        }
      }

      // We'll handle itinerary in a separate useEffect that watches itineraryData
    }
  }, [tourData]);
  
  // Process itinerary data directly from the API response
  useEffect(() => {
    console.log("PROCESSING ITINERARY DATA:", tourData.itinerary);
    
    // Check if we have a direct itinerary array from the API (format in the JSON like your example)
    if (tourData.itinerary && Array.isArray(tourData.itinerary) && tourData.itinerary.length > 0) {
      console.log("Found ARRAY ITINERARY:", tourData.itinerary);
      setItinerary(tourData.itinerary);
    }
    // Check for itineraryDays property (some APIs might use this)
    else if (tourData?.itineraryDays && Array.isArray(tourData.itineraryDays) && tourData.itineraryDays.length > 0) {
      console.log("Using itineraryDays from API response:", tourData.itineraryDays);
      setItinerary(tourData.itineraryDays);
    } 
    // Use itineraryData from separate endpoint if available
    else if (itineraryData && Array.isArray(itineraryData) && itineraryData.length > 0) {
      console.log("Using structured itinerary data from API endpoint:", itineraryData);
      setItinerary(itineraryData);
    } 
    // Try to parse itinerary if it's a string (older API format)
    else if (tourData?.itinerary && typeof tourData.itinerary === 'string') {
      console.log("Itinerary field from tour data is a string:", tourData.itinerary);
      // Try to parse as JSON
      try {
        const parsedItinerary = JSON.parse(tourData.itinerary);
        console.log("Parsed itinerary as JSON:", parsedItinerary);
        
        // Check if we got a valid array
        if (Array.isArray(parsedItinerary) && parsedItinerary.length > 0) {
          setItinerary(parsedItinerary);
        } else {
          // Not a valid array, fall through to next parsing option
          throw new Error("Not a valid itinerary array");
        }
      } catch (e) {
        console.log("Itinerary is not a JSON string, trying to parse from text format");
        
        // Try to parse as plain text format with "Day X: Description" format
        if (tourData.itinerary.includes('Day')) {
          const lines = tourData.itinerary.split('\n');
          const parsedItinerary: APIItineraryDay[] = [];
          
          lines.forEach((line: string) => {
            const match = line.match(/Day (\d+)(?:-\d+)?: (.+)/);
            if (match) {
              const day = parseInt(match[1]);
              const title = match[2].trim();
              
              parsedItinerary.push({
                day,
                title,
                description: `Visit key attractions in ${title} with your private guide. Experience authentic Sri Lankan culture and cuisine.`,
                accommodation: "Luxury Hotel"
              });
            }
          });
          
          console.log("Parsed itinerary from text:", parsedItinerary);
          
          if (parsedItinerary.length > 0) {
            setItinerary(parsedItinerary);
          } else {
            console.log("Could not parse itinerary from text format");
            setItinerary([]);
          }
        } else {
          console.log("Itinerary is not in expected format");
          setItinerary([]);
        }
      }
    } else {
      console.log("No itinerary data available");
      setItinerary([]);
    }
  }, [tourData, itineraryData]);

  // Transform itinerary data into visual timeline format when itinerary changes
  useEffect(() => {
    if (itinerary.length > 0) {
      // Enhanced transformation from itinerary to visual timeline data
      const transformedData: TimelineDayData[] = itinerary.map(day => {
        // Convert accommodation to string if it's an object
        let accommodationString: string | undefined;
        
        if (typeof day.accommodation === 'object' && day.accommodation !== null) {
          accommodationString = day.accommodation.name;
        } else if (typeof day.accommodation === 'string') {
          accommodationString = day.accommodation;
        }
        
        // Build a richer description that includes activities if they exist
        let enhancedDescription = day.description;
        
        if (day.activities && Array.isArray(day.activities) && day.activities.length > 0) {
          enhancedDescription += '<br/><br/><strong>Today\'s Activities:</strong><ul>';
          day.activities.forEach((activity: { 
            title: string; 
            description?: string;
            time?: string;
            imageUrl?: string;
          }) => {
            if (typeof activity === 'object' && activity !== null) {
              enhancedDescription += `<li><strong>${activity.title}</strong>`;
              if (activity.description) {
                enhancedDescription += `: ${activity.description}`;
              }
              if (activity.time) {
                enhancedDescription += ` (${activity.time})`;
              }
              enhancedDescription += '</li>';
            }
          });
          enhancedDescription += '</ul>';
        }
        
        // Include meal information
        if (day.meals) {
          enhancedDescription += '<br/><strong>Meals:</strong> ';
          const mealsIncluded = [];
          if (day.meals.breakfast) mealsIncluded.push('Breakfast');
          if (day.meals.lunch) mealsIncluded.push('Lunch');
          if (day.meals.dinner) mealsIncluded.push('Dinner');
          
          enhancedDescription += mealsIncluded.length > 0 
            ? mealsIncluded.join(', ') 
            : 'No meals included';
        }
        
        return {
          day: day.day,
          title: day.title,
          description: enhancedDescription,
          accommodation: accommodationString,
          // Use the image from the new API structure if it exists
          imageUrl: 
            (day.image?.medium ? `https://res.cloudinary.com/drsjp6bqz/image/upload/v1743583187/${day.image.medium}.jpg` : null) || 
            (day.image?.small ? `https://res.cloudinary.com/drsjp6bqz/image/upload/v1743583187/${day.image.small}.jpg` : null) || 
            (day.imageUrl && day.imageUrl.includes('publicId') ? 
              `https://res.cloudinary.com/drsjp6bqz/image/upload/v1743583187/${JSON.parse(day.imageUrl).publicId}.jpg` : 
              day.imageUrl) || 
            `https://res.cloudinary.com/drsjp6bqz/image/upload/v1743583187/destinations/${day.title.toLowerCase().replace(/ /g, '-')}.jpg`
        };
      });
      
      setTimelineData(transformedData);
    }
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
    console.log("Navigating gallery images:", { 
      direction, 
      currentIndex: activeImageIndex, 
      totalImages: galleryImages.length,
      galleryImages
    });
    
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