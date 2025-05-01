import { useState, useEffect, useRef } from 'react';
import { useRoute, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { 
  ChevronRight, MapPin, Calendar, Clock, Bookmark, Users, Compass, 
  Sun, Droplets, Star, Menu, ArrowRight, ChevronDown, MessageCircle, 
  Heart, Share2, Camera, MapIcon, Coffee
} from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { parseJsonSafely } from '@/lib/utils';
import { Destination, API_BASE_URL } from '@/lib/queryClient';
import { determineFocalPoint, DESTINATION_FOCAL_POINTS } from "@/lib/image-utils";
import { AdaptiveImage } from '@/components/ui/adaptive-image';
import { 
  HeroImage, 
  FeatureImage, 
  ExperienceImage, 
  BackgroundImage 
} from '@/components/ui/optimized-image';
import { ResponsivePhotoGallery } from '@/components/ResponsivePhotoGallery';
import { AsymmetricalGallery } from '@/components/AsymmetricalGallery';
import { EnhancedDestinationTemplate } from '@/components/EnhancedDestinationTemplate';

// Extended destination interface to handle all possible properties from the API
// Use Destination interface from queryClient.ts
// This local interface is just for component props/state
interface LocalDestination {
  id: number;
  name: string;
  description: string;
  imageUrl?: string; // Make imageUrl optional to match the Destination interface
  featured: boolean | null;
  slug?: string;
  shortDescription?: string | null;
  excerpt?: string | null;
  fullDescription?: string | null;
  region?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  highlights?: string | null;
  activities?: string | null;
  // Enhanced template properties
  featuredExperiences?: string | null;
  relatedTours?: string | null;
  localExperiences?: string | null;
  toursFeaturing?: string | null;
  detailedSections?: string | null;
  pointsOfInterest?: string | null;
  faqs?: string | null;
  essentialInfo?: string | null;
  templateType?: string | null;
  // Any other properties
  [key: string]: any;
}

// Alias parseJsonSafely to maintain compatibility with existing code
const safeJsonParse = parseJsonSafely;

interface RelatedTour {
  id: number;
  slug: string;
  title: string;
  duration: number;
  price: number;
  imageUrl: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
}

interface GalleryImage {
  url?: string;
  alt: string;
  small?: string;
  medium?: string;
  banner?: string;
  large?: string;
  baseUrl?: string;
  publicId?: string;
  caption?: string;
  orientation?: string;
}

const DestinationDetail = () => {
  const [matched, params] = useRoute<{ slug: string }>('/destination/:slug');
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'gallery' | 'map'>('overview');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const overviewRef = useRef<HTMLDivElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Determine if we're using an ID or slug for the API request
  const paramValue = params?.slug || '';
  const isNumeric = /^\d+$/.test(paramValue);
  const destinationId = isNumeric ? parseInt(paramValue, 10) : 0;
  const destinationSlug = !isNumeric ? paramValue : '';
  
  // Handle scroll events to update active navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      if (overviewRef.current && activitiesRef.current && galleryRef.current && mapRef.current) {
        const overviewTop = overviewRef.current.offsetTop;
        const activitiesTop = activitiesRef.current.offsetTop;
        const galleryTop = galleryRef.current.offsetTop;
        const mapTop = mapRef.current.offsetTop;
        
        if (scrollPosition >= mapTop) {
          setActiveTab('map');
        } else if (scrollPosition >= galleryTop) {
          setActiveTab('gallery');
        } else if (scrollPosition >= activitiesTop) {
          setActiveTab('activities');
        } else if (scrollPosition >= overviewTop) {
          setActiveTab('overview');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Fetch destinations from the new API endpoint
  // The API now returns an array of destinations - we need to filter for the one we want
  const { data: destinationsData, error, isLoading } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
    enabled: !!paramValue,
  });
  
  // Find the matching destination from the array
  const destination = destinationsData?.find(dest => 
    (isNumeric && dest.id === destinationId) || 
    (!isNumeric && dest.slug === destinationSlug)
  );
  
  // Log the API URL for debugging
  console.log('Making API request to:', `${API_BASE_URL}/api/destinations`);
  
  // If we have destination data, log it for debugging
  if (destination) {
    console.log('Full destination data received:', destination);
  }
  
  // Default experiences to use when none are provided by the API
  const defaultExperiences = [
    {
      title: "Private Guided Tour",
      description: "Discover the hidden gems of the destination with our expert local guides who provide personalized insights and exclusive access.",
      icon: "guide"
    },
    {
      title: "Cultural Immersion",
      description: "Experience authentic local traditions, cuisine, and customs through carefully curated activities and interactions.",
      icon: "heritage-walk"
    },
    {
      title: "Luxury Accommodations",
      description: "Stay in handpicked boutique hotels and luxury resorts that offer exceptional service and authentic character.",
      icon: "boutique-hotel"
    },
    {
      title: "Culinary Experiences",
      description: "Indulge in authentic cuisine and unique dining experiences from street food adventures to gourmet meals.",
      icon: "coffee-art"
    }
  ];

  // Parse additional data with better debug information
  const highlights = parseJsonSafely(
    destination?.highlights, 
    [], 
    'highlights'
  );
  
  // Parse experiences from different API properties with debugging labels
  const experiences = destination?.featuredExperiences
    ? parseJsonSafely(destination.featuredExperiences, defaultExperiences, 'featuredExperiences')
    : destination?.localExperiences
      ? parseJsonSafely(destination.localExperiences, defaultExperiences, 'localExperiences')
      : defaultExperiences;
      
  // Parse related tours data with debugging labels
  const relatedTours = destination?.relatedTours
    ? parseJsonSafely(destination.relatedTours, [], 'relatedTours')
    : destination?.toursFeaturing
      ? parseJsonSafely(destination.toursFeaturing, [], 'toursFeaturing')
      : [];
    
  // Parse gallery data with debugging label
  const galleryImages = parseJsonSafely(
    destination?.galleryImages, 
    [], 
    'galleryImages'
  );
    
  // Determine if we have API-provided gallery images
  const hasApiGalleryImages = galleryImages && galleryImages.length > 0;
  
  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-16 h-16 border-4 border-[#0F4C81] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-['Playfair_Display'] text-3xl text-[#0F4C81] mb-4">Error Loading Destination</h2>
        <p className="mb-8">We encountered an error while loading the destination information. Please try again later.</p>
        <Link href="/destinations" className="inline-block bg-[#0F4C81] text-white font-medium py-3 px-8 rounded-md">
          Return to Destinations
        </Link>
      </div>
    );
  }
  
  // Not found state
  if (!destination) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-['Playfair_Display'] text-3xl text-[#0F4C81] mb-4">Destination Not Found</h2>
        <p className="mb-8">Sorry, we couldn't locate the destination you're looking for.</p>
        <Link href="/destinations" className="inline-block bg-[#0F4C81] text-white font-medium py-3 px-8 rounded-md">
          Return to Destinations
        </Link>
      </div>
    );
  }
  
  // Apply the enhanced template UI to all destinations regardless of API data
  console.log('Destination data for enhanced template:', {
    name: destination.name,
    hasDetailedSections: !!destination.detailedSections,
    detailedSectionsLength: destination.detailedSections ? 
                           parseJsonSafely(destination.detailedSections, []).length : 0,
    hasPointsOfInterest: !!destination.pointsOfInterest,
    pointsOfInterestLength: destination.pointsOfInterest ? 
                           parseJsonSafely(destination.pointsOfInterest, []).length : 0,
    hasToursFeaturing: !!destination.toursFeaturing,
    toursFeaturingLength: destination.toursFeaturing ? 
                         parseJsonSafely(destination.toursFeaturing, []).length : 0,
    hasLocalExperiences: !!destination.localExperiences,
    localExperiencesLength: destination.localExperiences ? 
                           parseJsonSafely(destination.localExperiences, []).length : 0,
    hasGalleryImages: !!destination.galleryImages,
    galleryImagesLength: destination.galleryImages ? 
                         parseJsonSafely(destination.galleryImages, []).length : 0,
    hasFaqs: !!destination.faqs,
    faqsLength: destination.faqs ? 
               parseJsonSafely(destination.faqs, []).length : 0,
    hasEssentialInfo: !!destination.essentialInfo,
  });
  
  // Enhanced destination object with all needed properties from the updated API
  // Use type assertion to ensure compatibility with EnhancedDestinationTemplate
  const enhancedDestination = {
    ...destination,
    // Core properties (ensure they exist)
    id: destination.id,
    slug: destination.slug || "",
    name: destination.name,
    description: destination.overview?.fullDescription || destination.description || destination.excerpt || "",
    featured: destination.featured || false,
    
    // Essential information
    address: destination.address || undefined,
    bestTimeToVisit: destination.essentialInfo?.bestTimeToVisit || destination.bestTimeToVisit || undefined,
    recommendedDuration: destination.recommendedDuration || undefined,
    weatherInfo: destination.weatherInfo || undefined,
    region: destination.region || undefined,
    
    // Coordinates for maps
    latitude: destination.latitude || undefined,
    longitude: destination.longitude || undefined,
    
    // Media - set imageUrl if not already present
    imageUrl: destination.imageUrl || 
              (destination.heroImage?.publicId ? 
              `https://res.cloudinary.com/drsjp6bqz/image/upload/${destination.heroImage.publicId}` : 
              undefined),
    
    // New API structure fields
    overview: destination.overview || undefined,
    subSections: destination.subSections || undefined,
    featuresSection: destination.featuresSection || undefined,
    heroImage: destination.heroImage || undefined,
    galleryImages: destination.galleryImages || undefined, // Now is an array of objects in new API
    videoBlock: destination.videoBlock || undefined,
    quoteBlock: destination.quoteBlock || undefined,
    relatedTours: destination.relatedTours || undefined, // Now is an array of objects in new API
    nearbyAttractions: destination.nearbyAttractions || undefined, // Now is an array of objects in new API
    essentialInfo: destination.essentialInfo || undefined, // Now is an object in new API
    faqs: destination.faqs || undefined, // Now is an array of objects in new API
    
    // Legacy data fields for backward compatibility with the template
    // These will be used if the new API fields are not populated
    detailedSections: destination.detailedSections || undefined,
    pointsOfInterest: destination.pointsOfInterest || undefined,
    toursFeaturing: destination.toursFeaturing || undefined,
    localExperiences: destination.localExperiences || undefined,
    
    // For debugging
    fullApiData: destination,
  } as any; // Use type assertion to avoid TypeScript errors
  
  // Log the enhanced destination for debugging
  console.log('Enhanced destination data:', enhancedDestination);
  
  // Always use the enhanced template UI for all destinations
  return <EnhancedDestinationTemplate destination={enhancedDestination} />;
};

export default DestinationDetail;