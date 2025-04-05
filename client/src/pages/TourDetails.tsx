import { useEffect, useState, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Calendar, Check, Heart, Hotel, Map, Phone, Flag, List, X, Star, Globe, Clock, 
  Users, PiggyBank, Compass, Camera, Info, Mail, ChevronDown, Coffee, UtensilsCrossed 
} from "lucide-react";
import { AsymmetricalGallery, GalleryImage } from "@/components/AsymmetricalGallery";
import EnhancedItineraryItem from "@/components/EnhancedItineraryItem";
import { useCurrency } from "@/contexts/CurrencyContext";
import { StarRating } from "@/components/StarRating";
import ContactForm from "@/components/ContactForm";
import AnimatedRouteMap from "@/components/AnimatedRouteMap";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";

interface TourImage {
  publicId?: string;
  alt?: string;
  caption?: string;
  orientation?: string;
  baseUrl?: string;
  small?: string;
  medium?: string;
  large?: string;
}

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  image?: TourImage;
}

interface TourData {
  id: number;
  name: string;
  slug: string;
  featured: boolean;
  summary: string;
  duration: string;
  startingFrom: number;
  currency: string;
  heroImage?: TourImage;
  cardImage?: TourImage;
  galleryImages?: TourImage[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  highlights?: string[];
  mapImage?: string;
  mapPoints?: {
    id: number | string;
    name: string;
    x: number;
    y: number;
    day?: number;
  }[];
}

interface TourDetailsProps {
  params?: {
    slug?: string;
  };
}

const TourDetails: React.FC<TourDetailsProps> = ({ params }) => {
  const [activeDay, setActiveDay] = useState(1);
  const [activeSection, setActiveSection] = useState('overview');
  const { formatPrice } = useCurrency();
  
  // References to each section for scroll behavior
  const overviewRef = useRef<HTMLDivElement>(null);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const inclusionsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Intersection Observer to update active section based on scroll position
  useEffect(() => {
    const sections = [
      { id: 'overview', ref: overviewRef },
      { id: 'itinerary', ref: itineraryRef },
      { id: 'gallery', ref: galleryRef },
      { id: 'map', ref: mapRef },
      { id: 'inclusions', ref: inclusionsRef },
      { id: 'contact', ref: contactRef }
    ];
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach(section => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });
    
    return () => {
      sections.forEach(section => {
        if (section.ref.current) {
          observer.unobserve(section.ref.current);
        }
      });
    };
  }, []);
  
  // Handle navigation click
  const handleNavClick = (sectionId: string) => {
    const sectionMap: Record<string, React.RefObject<HTMLDivElement>> = {
      'overview': overviewRef,
      'itinerary': itineraryRef,
      'gallery': galleryRef,
      'map': mapRef,
      'inclusions': inclusionsRef,
      'contact': contactRef
    };
    
    const ref = sectionMap[sectionId];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const {
    data: tourData,
    isLoading,
    error,
  } = useQuery<TourData>({
    queryKey: ["/api/tours", params?.slug],
    enabled: !!params?.slug,
  });
  
  // Set first day as active when tour data loads
  useEffect(() => {
    if (tourData?.itinerary && tourData.itinerary.length > 0) {
      setActiveDay(tourData.itinerary[0].day);
    }
  }, [tourData]);
  
  // Update active point on map when active day changes
  const getActiveMapPoints = useCallback(() => {
    if (!tourData?.mapPoints) return [];
    
    return tourData.mapPoints.map(point => ({
      ...point,
      isActive: point.day === activeDay,
    }));
  }, [tourData?.mapPoints, activeDay]);
  
  // Show loading state when fetching tour data
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ScrollToTop />
        <div className="w-full aspect-[21/9] rounded-lg overflow-hidden mb-6">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-8/12">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-2/3 mb-6" />
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
            
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="space-y-3 mb-6">
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-28 w-full" />
            </div>
          </div>
          <div className="lg:w-4/12">
            <Skeleton className="h-64 w-full mb-4" />
            <Skeleton className="h-10 w-full mb-3" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
          </div>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error || !tourData) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <ScrollToTop />
        <div className="bg-red-50 p-6 rounded-lg max-w-2xl mx-auto">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tour Not Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find the tour you're looking for. It may have been removed or the URL might be incorrect.
          </p>
          <Button 
            variant="default" 
            size="lg"
            onClick={() => window.location.href = "/tours"}
          >
            Browse All Tours
          </Button>
        </div>
      </div>
    );
  }
  
  // Prepare gallery images
  const galleryImages: GalleryImage[] = 
    tourData.galleryImages?.map(img => ({
      publicId: img.publicId,
      url: img.large || img.medium || img.small || img.baseUrl,
      baseUrl: img.baseUrl,
      alt: img.alt || tourData.name,
      caption: img.caption,
      orientation: img.orientation || 'landscape',
      small: img.small,
      medium: img.medium,
      large: img.large,
    })) || [];
    
  // If we have a hero image and it's not already in the gallery, add it first
  if (tourData.heroImage && !galleryImages.some(img => img.publicId === tourData.heroImage?.publicId)) {
    galleryImages.unshift({
      publicId: tourData.heroImage.publicId,
      url: tourData.heroImage.large || tourData.heroImage.medium || tourData.heroImage.small || tourData.heroImage.baseUrl,
      baseUrl: tourData.heroImage.baseUrl,
      alt: tourData.heroImage.alt || tourData.name,
      caption: tourData.heroImage.caption,
      orientation: tourData.heroImage.orientation || 'landscape',
      small: tourData.heroImage.small,
      medium: tourData.heroImage.medium,
      large: tourData.heroImage.large,
    });
  }
  
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <ScrollToTop />
      
      {/* We're replacing the separate breadcrumb with the one in the hero image */}
      
      {/* Hero Section with Full-Width Image */}
      <section className="relative">
        <div className="aspect-[21/9] lg:aspect-[3/1] w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          {tourData.heroImage ? (
            <img 
              src={tourData.heroImage.large || tourData.heroImage.medium || tourData.heroImage.small || tourData.heroImage.baseUrl}
              alt={tourData.heroImage.alt || tourData.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
          )}
          
          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end items-start text-white z-20 container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-3xl">
              <div className="flex items-center mb-4">
                <a href="/" className="text-white/90 hover:text-white mr-2">Home</a>
                <span className="text-white/70 mx-1">/</span>
                <a href="/tours" className="text-white/90 hover:text-white mr-2">Tours</a>
                <span className="text-white/70 mx-1">/</span>
                <span className="text-white font-medium">{tourData.name}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-md text-white">
                {tourData.name}
              </h1>
              {tourData.heroImage && tourData.heroImage.caption && (
                <p className="text-white/90 text-lg max-w-2xl drop-shadow-sm mb-4 hidden md:block">
                  {tourData.heroImage.caption}
                </p>
              )}
              <div className="flex items-center bg-black/30 px-3 py-1.5 rounded-md inline-block">
                <StarRating rating={4.8} size="md" />
                <span className="ml-2 text-white/90">4.8 (48 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile Summary (only visible on mobile) */}
      <div className="md:hidden bg-white p-4 border-b">
        <p className="text-gray-700 text-base">
          {tourData.summary.length > 120 ? tourData.summary.substring(0, 120) + '...' : tourData.summary}
        </p>
      </div>
      
      {/* Info Cards Section - Similar to ModTour */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-6">
            {/* Duration Card */}
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Duration</div>
                <div className="font-medium">{tourData.duration}</div>
              </div>
            </div>
            
            {/* Tour Type Card */}
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <Compass className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Tour Type</div>
                <div className="font-medium">Private Luxury</div>
              </div>
            </div>
            
            {/* Group Size Card */}
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Group Size</div>
                <div className="font-medium">Private Tour</div>
              </div>
            </div>
            
            {/* Languages Card */}
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-3 rounded-full">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Languages</div>
                <div className="font-medium">English</div>
              </div>
            </div>
            
            {/* Price Card */}
            <div className="hidden xl:flex items-center space-x-3 col-span-1">
              <div className="bg-primary/10 p-3 rounded-full">
                <PiggyBank className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-gray-500">From</div>
                <div className="font-medium text-primary">
                  {formatPrice(tourData.startingFrom, { currency: tourData.currency })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sticky Navigation Menu - ModTour Style */}
      <div className="bg-white sticky top-0 z-30 border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center overflow-x-auto scrollbar-none whitespace-nowrap py-4 gap-6">
            <button 
              onClick={() => handleNavClick('overview')}
              className={`text-sm font-medium px-3 py-2 border-b-2 transition-colors ${
                activeSection === 'overview' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => handleNavClick('itinerary')}
              className={`text-sm font-medium px-3 py-2 border-b-2 transition-colors ${
                activeSection === 'itinerary' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Itinerary
            </button>
            <button 
              onClick={() => handleNavClick('gallery')}
              className={`text-sm font-medium px-3 py-2 border-b-2 transition-colors ${
                activeSection === 'gallery' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Gallery
            </button>
            {tourData.mapImage && tourData.mapPoints && tourData.mapPoints.length > 0 && (
              <button 
                onClick={() => handleNavClick('map')}
                className={`text-sm font-medium px-3 py-2 border-b-2 transition-colors ${
                  activeSection === 'map' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Map
              </button>
            )}
            <button 
              onClick={() => handleNavClick('inclusions')}
              className={`text-sm font-medium px-3 py-2 border-b-2 transition-colors ${
                activeSection === 'inclusions' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Details
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className={`text-sm font-medium px-3 py-2 border-b-2 transition-colors ${
                activeSection === 'contact' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content + Sidebar Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Column */}
          <div className="lg:w-8/12">
            {/* Overview Section */}
            <section ref={overviewRef} id="overview" className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Overview</h2>
              
              {/* Quick Highlights - Positioned as tags for scanning */}
              {tourData.highlights && tourData.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {tourData.highlights.map((highlight, index) => (
                    <div 
                      key={`highlight-${index}`} 
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Main description with paragraphs */}
              <div className="prose prose-sm md:prose max-w-none text-gray-700 mb-6">
                {tourData.summary.split('\n').filter(para => para.trim() !== '').map((paragraph, idx) => (
                  <p key={`para-${idx}`}>{paragraph}</p>
                ))}
              </div>
              
              {/* Quick Facts - Bottom of overview section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 mt-6 border-t border-gray-100">
                <div>
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-primary mr-2" />
                    <h3 className="font-medium text-gray-800">Best Time to Visit</h3>
                  </div>
                  <p className="text-sm text-gray-600 pl-7">November to April</p>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <Flag className="w-5 h-5 text-primary mr-2" />
                    <h3 className="font-medium text-gray-800">Visa Requirements</h3>
                  </div>
                  <p className="text-sm text-gray-600 pl-7">Electronic Travel Authorization (ETA)</p>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-primary mr-2" />
                    <h3 className="font-medium text-gray-800">Highlights</h3>
                  </div>
                  <p className="text-sm text-gray-600 pl-7">Cultural sites, beaches, wildlife, cuisine</p>
                </div>
              </div>
            </section>
            
            {/* Itinerary Section - ModTour Style */}
            <section ref={itineraryRef} id="itinerary" className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
                <List className="w-6 h-6 mr-3 text-primary" />
                Tour Itinerary
              </h2>
              
              {tourData.itinerary && tourData.itinerary.length > 0 ? (
                <div className="grid gap-6">
                  {tourData.itinerary.map((day, index) => (
                    <div 
                      key={`day-${day.day}`} 
                      className={`
                        border rounded-xl overflow-hidden bg-transparent
                        ${index === activeDay - 1 ? 'border-primary shadow-md' : 'border-gray-200'}
                        transition-all duration-300
                      `}
                    >
                      {/* Expandable header with day number and title */}
                      <div 
                        className={`
                          p-5 cursor-pointer flex items-center justify-between
                          ${index === activeDay - 1 ? 'bg-primary text-white' : 'bg-gray-50 text-gray-800'}
                        `}
                        onClick={() => setActiveDay(day.day)}
                      >
                        {/* Left side with day number and title */}
                        <div className="flex items-center">
                          <div 
                            className={`
                              w-auto px-3 py-1 rounded-md flex items-center justify-center mr-4
                              text-sm font-medium border ${index === activeDay - 1 
                                ? 'bg-white text-primary border-primary' 
                                : 'bg-primary/10 text-primary border-primary/20'}
                            `}
                          >
                            Day {day.day}
                          </div>
                          <h3 className="font-bold text-lg">{day.title}</h3>
                        </div>
                        
                        {/* Expand/collapse indicator */}
                        <div className={`transition-transform ${index === activeDay - 1 ? 'rotate-180' : 'rotate-0'}`}>
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                      
                      {/* Expandable content */}
                      <div 
                        className={`
                          transition-all duration-300 overflow-hidden
                          ${index === activeDay - 1 ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                        `}
                      >
                        <div className="p-6 border-t border-gray-200 bg-white">
                          {/* Two-column layout on larger screens */}
                          <div className="flex flex-col lg:flex-row gap-8">
                            {/* Description column */}
                            <div className="lg:w-3/5 order-2 lg:order-1">
                              <div className="prose prose-sm md:prose max-w-none text-gray-700">
                                {/* Convert description to paragraphs based on new lines */}
                                {day.description.split('\n').filter(para => para.trim() !== '').map((paragraph, idx) => (
                                  <p key={`para-${idx}`}>{paragraph}</p>
                                ))}
                              </div>
                              
                              {/* Accommodation and meals section */}
                              <div className="mt-6 flex flex-wrap gap-3 items-center">
                                <div className="flex items-center border border-gray-200 py-2 px-4 rounded-md text-sm">
                                  <Hotel className="w-4 h-4 mr-2 text-primary" />
                                  <span>5-Star Hotel</span>
                                </div>
                                
                                <div className="flex items-center border border-gray-200 py-2 px-4 rounded-md text-sm">
                                  <Coffee className="w-4 h-4 mr-2 text-primary" />
                                  <span>Breakfast</span>
                                </div>
                                
                                <div className="flex items-center border border-gray-200 py-2 px-4 rounded-md text-sm">
                                  <UtensilsCrossed className="w-4 h-4 mr-2 text-primary" />
                                  <span>Lunch</span>
                                </div>
                                
                                <div className="flex items-center border border-gray-200 py-2 px-4 rounded-md text-sm">
                                  <UtensilsCrossed className="w-4 h-4 mr-2 text-primary" />
                                  <span>Dinner</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Image column */}
                            {day.image && (day.image.large || day.image.medium || day.image.small || day.image.baseUrl) && (
                              <div className="lg:w-2/5 order-1 lg:order-2 mb-6 lg:mb-0">
                                <div className="rounded-xl overflow-hidden shadow-md h-60 lg:h-full">
                                  <img 
                                    src={day.image.large || day.image.medium || day.image.small || day.image.baseUrl}
                                    alt={day.image.alt || `Day ${day.day}: ${day.title}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500">No itinerary available for this tour.</p>
                </div>
              )}
            </section>
          </div>
          
          {/* Sidebar Column - Ends right after itinerary section */}
          <div className="lg:w-4/12">
            <div className="sticky top-[85px]">
              {/* Price Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">From</div>
                  <div className="flex items-center">
                    <StarRating rating={4.8} size="sm" />
                    <span className="text-gray-500 text-sm ml-1">(48)</span>
                  </div>
                </div>
                
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(tourData.startingFrom, { currency: tourData.currency })}
                  </span>
                  <span className="text-gray-500 ml-2">per person</span>
                </div>
                
                <div className="space-y-6">
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-md font-medium transition flex items-center justify-center"
                  >
                    Book Now
                  </button>
                  
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="w-full bg-white hover:bg-gray-50 text-primary border border-primary py-3 px-4 rounded-md font-medium transition flex items-center justify-center"
                  >
                    Request Custom Quote
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4">
                    <h3 className="font-medium text-yellow-800 mb-1">Special Offer</h3>
                    <p className="text-sm text-yellow-700">Book now and receive a complimentary airport transfer!</p>
                  </div>
                </div>
              </div>
              
              {/* Need Help Card */}
              <div className="bg-gray-50 rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Need Help?</h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  Our travel experts are here to assist you with planning your perfect Sri Lanka experience.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-primary mr-2" />
                    <span className="text-gray-800 font-medium">+94 77 123 4567</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-primary mr-2" />
                    <span className="text-gray-800 font-medium">info@bestsrilankatours.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Full-width sections below itinerary and sidebar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Gallery Section - Full Width */}
        <section ref={galleryRef} id="gallery" className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Camera className="w-6 h-6 mr-3 text-primary" />
            Tour Gallery
          </h2>
          
          {galleryImages && galleryImages.length > 0 ? (
            <AsymmetricalGallery images={galleryImages} />
          ) : (
            <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-500">No gallery images available for this tour.</p>
            </div>
          )}
        </section>
        
        {/* Map Section - Conditional Rendering - Full Width */}
        {tourData.mapImage && tourData.mapPoints && tourData.mapPoints.length > 0 && (
          <section ref={mapRef} id="map" className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Map className="w-6 h-6 mr-3 text-primary" />
              Tour Route Map
            </h2>
            
            <AnimatedRouteMap
              mapImage={tourData.mapImage}
              points={getActiveMapPoints()}
              activeDay={activeDay}
              onPointClick={(pointId) => {
                const point = tourData.mapPoints?.find(p => p.id === pointId);
                if (point && point.day) {
                  setActiveDay(point.day);
                  handleNavClick('itinerary');
                }
              }}
            />
          </section>
        )}
        
        {/* Inclusions and Exclusions Section - Full Width */}
        <section ref={inclusionsRef} id="inclusions" className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Info className="w-6 h-6 mr-3 text-primary" />
            Tour Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inclusions */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                <Check className="w-5 h-5 mr-2 text-green-600" />
                What's Included
              </h3>
              
              <ul className="space-y-3">
                {tourData.inclusions && tourData.inclusions.length > 0 ? (
                  tourData.inclusions.map((item, index) => (
                    <li key={`inclusion-${index}`} className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No inclusions specified for this tour.</li>
                )}
              </ul>
            </div>
            
            {/* Exclusions */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                <X className="w-5 h-5 mr-2 text-red-600" />
                What's Not Included
              </h3>
              
              <ul className="space-y-3">
                {tourData.exclusions && tourData.exclusions.length > 0 ? (
                  tourData.exclusions.map((item, index) => (
                    <li key={`exclusion-${index}`} className="flex items-start">
                      <div className="bg-red-100 rounded-full p-1 mr-3 mt-0.5">
                        <X className="w-3.5 h-3.5 text-red-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No exclusions specified for this tour.</li>
                )}
              </ul>
            </div>
          </div>
        </section>
        
        {/* Contact Form Section - Full Width */}
        <section ref={contactRef} id="contact" className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Phone className="w-6 h-6 mr-3 text-primary" />
            Book This Tour
          </h2>
          
          <ContactForm 
            tourName={tourData.name} 
            prefilledMessage={`I'm interested in the ${tourData.name} tour and would like more information.`} 
          />
        </section>
      </div>
    </div>
  );
};

export default TourDetails;