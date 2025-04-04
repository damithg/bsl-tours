import { useEffect, useState, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Calendar, Check, Heart, Hotel, Map, Phone, Flag, List, X, Star, Globe, Clock, 
  Users, PiggyBank, Compass, Camera, Info, Mail, ChevronDown, Coffee, UtensilsCrossed 
} from "lucide-react";
import { AsymmetricalGallery, GalleryImage } from "../components/AsymmetricalGallery";
import EnhancedItineraryItem from "../components/EnhancedItineraryItem";
import { useCurrency } from "../contexts/CurrencyContext";
import { StarRating } from "../components/StarRating";
import ContactForm from "../components/ContactForm";
import AnimatedRouteMap from "../components/AnimatedRouteMap";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { ScrollToTop } from "../components/ScrollToTop";
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
              <div className="bg-primary/80 text-white px-3 py-1 rounded-md inline-block mb-4">
                Private Luxury Tour
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-md">
                {tourData.name}
              </h1>
              <div className="flex items-center mb-4">
                <StarRating rating={4.8} size="md" />
                <span className="ml-2 text-white/90">4.8 (48 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
                    <span key={`highlight-${index}`} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      {highlight}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                <p className="leading-relaxed">{tourData.summary}</p>
              </div>
              
              {/* Two-column layout for Why Choose and Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Why Choose section with improved design */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500 shadow-sm h-full flex flex-col">
                  <h3 className="text-xl font-semibold text-blue-900 mb-3 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-blue-600" />
                    Why Choose This Tour
                  </h3>
                  <p className="text-blue-800 leading-relaxed">
                    Experience the perfect blend of ancient culture and natural beauty in Sri Lanka with our expert guides and personalized service.
                  </p>
                  <div className="mt-auto pt-4">
                    <button 
                      onClick={() => handleNavClick('contact')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition flex items-center justify-center"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Contact Us
                    </button>
                  </div>
                </div>
                
                {/* Tour Highlights Section */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200 flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    Tour Highlights
                  </h3>
                  
                  <div className="space-y-3">
                    {tourData.highlights && tourData.highlights.length > 0 ? (
                      // If highlights exist, map through them
                      tourData.highlights.map((highlight, index) => (
                        <div 
                          key={`highlight-premium-${index}`} 
                          className="flex items-start group"
                        >
                          <div className="bg-primary/10 rounded-full p-1.5 mr-3 group-hover:bg-primary/20 transition-all duration-300 mt-0.5">
                            <Check className="w-3 h-3 text-primary flex-shrink-0" />
                          </div>
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))
                    ) : (
                      // If no highlights, show some default ones
                      <>
                        {["Expert local guides", "Luxury accommodations", "Private transportation", "Cultural experiences"].map((highlight, index) => (
                          <div 
                            key={`default-highlight-${index}`} 
                            className="flex items-start group"
                          >
                            <div className="bg-primary/10 rounded-full p-1.5 mr-3 group-hover:bg-primary/20 transition-all duration-300 mt-0.5">
                              <Check className="w-3 h-3 text-primary flex-shrink-0" />
                            </div>
                            <span className="text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                  
                  {/* CTA button */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <button 
                      onClick={() => handleNavClick('contact')}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium transition flex items-center justify-center"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Book This Experience
                    </button>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Itinerary Section - ModTour Style */}
            <section ref={itineraryRef} id="itinerary" className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <List className="w-6 h-6 mr-3 text-primary" />
                Tour Itinerary
              </h2>
              
              {tourData.itinerary && tourData.itinerary.length > 0 ? (
                <div className="relative">
                  {/* Timeline track - vertical line connecting all days */}
                  <div className="absolute left-3 md:left-7 top-0 bottom-0 w-[2px] bg-gray-200 z-0"></div>
                  
                  {/* Itinerary days as connected timeline items */}
                  <div className="space-y-6">
                    {tourData.itinerary.map((day, index) => (
                      <div key={`day-${day.day}`} className="relative z-10">
                        {/* Day container with left circle indicator */}
                        <div className="flex items-stretch">
                          {/* Left day indicator */}
                          <div className="flex flex-col items-center mr-4 md:mr-8">
                            <div 
                              className={`
                                w-6 h-6 md:w-14 md:h-14 rounded-full flex items-center justify-center
                                ${index === activeDay - 1 ? 'bg-primary text-white shadow-lg ring-4 ring-primary/20' : 'bg-white text-primary border-2 border-primary'}
                                z-10 font-semibold text-xs md:text-base
                              `}
                            >
                              {day.day}
                            </div>
                          </div>
                          
                          {/* Right content area */}
                          <div className={`
                            flex-1 bg-white rounded-lg overflow-hidden border transition-all duration-300
                            ${index === activeDay - 1 ? 'border-primary shadow-md' : 'border-gray-200'}
                          `}>
                            {/* Day header with title and expand/collapse control */}
                            <div 
                              className={`
                                p-4 cursor-pointer flex justify-between items-center
                                ${index === activeDay - 1 ? 'bg-primary text-white' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'}
                              `}
                              onClick={() => setActiveDay(day.day)}
                            >
                              <h3 className="font-semibold">{day.title}</h3>
                              <div className={`transition-transform ${index === activeDay - 1 ? 'rotate-180' : 'rotate-0'}`}>
                                <ChevronDown className="w-5 h-5" />
                              </div>
                            </div>
                            
                            {/* Expandable content area */}
                            <div className={`
                              transition-all duration-300 overflow-hidden
                              ${index === activeDay - 1 ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                            `}>
                              <div className="p-4 md:p-6">
                                {/* Two-column layout on larger screens */}
                                <div className="flex flex-col md:flex-row gap-6">
                                  {/* Description column */}
                                  <div className="md:w-3/5">
                                    <div className="prose prose-sm max-w-none text-gray-700">
                                      {/* Convert description to paragraphs based on new lines */}
                                      {day.description.split('\n').filter(para => para.trim() !== '').map((paragraph, idx) => (
                                        <p key={`para-${idx}`}>{paragraph}</p>
                                      ))}
                                    </div>
                                    
                                    {/* Accommodation and meals section */}
                                    <div className="mt-4 flex flex-wrap gap-3 items-center">
                                      <div className="flex items-center bg-gray-100 py-1.5 px-3 rounded-full text-sm">
                                        <Hotel className="w-4 h-4 mr-1.5 text-primary" />
                                        <span>Luxury Hotel</span>
                                      </div>
                                      
                                      <div className="flex items-center bg-blue-50 py-1.5 px-3 rounded-full text-sm">
                                        <Coffee className="w-4 h-4 mr-1.5 text-blue-600" />
                                        <span>Breakfast</span>
                                      </div>
                                      
                                      <div className="flex items-center bg-green-50 py-1.5 px-3 rounded-full text-sm">
                                        <UtensilsCrossed className="w-4 h-4 mr-1.5 text-green-600" />
                                        <span>Lunch</span>
                                      </div>
                                      
                                      <div className="flex items-center bg-purple-50 py-1.5 px-3 rounded-full text-sm">
                                        <UtensilsCrossed className="w-4 h-4 mr-1.5 text-purple-600" />
                                        <span>Dinner</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Image column */}
                                  {day.image && (day.image.large || day.image.medium || day.image.small || day.image.baseUrl) && (
                                    <div className="md:w-2/5 mt-4 md:mt-0">
                                      <div className="rounded-lg overflow-hidden h-56 md:h-full">
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                  <p className="text-gray-500">No itinerary available for this tour.</p>
                </div>
              )}
            </section>
            
            {/* Gallery Section */}
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
            
            {/* Map Section - Conditional Rendering */}
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
            
            {/* Inclusions and Exclusions Section */}
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
            
            {/* Contact Form Section */}
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
          
          {/* Sidebar Column */}
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
              
              {/* Tour Features Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Tour Features</h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Clock className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Duration</span>
                      <span className="text-sm text-gray-600">{tourData.duration}</span>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <Compass className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Tour Type</span>
                      <span className="text-sm text-gray-600">Private Luxury Tour</span>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <Users className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Group Size</span>
                      <span className="text-sm text-gray-600">Private Tour</span>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <Globe className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Languages</span>
                      <span className="text-sm text-gray-600">English</span>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <Hotel className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-medium block">Accommodation</span>
                      <span className="text-sm text-gray-600">Luxury Hotels</span>
                    </div>
                  </li>
                </ul>
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
    </div>
  );
};

export default TourDetails;