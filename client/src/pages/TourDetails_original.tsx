import { useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Check, Heart, Hotel, Map, Phone, Flag, List, X, ArrowLeft, ArrowRight } from "lucide-react";
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
  const { formatPrice } = useCurrency();
  
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
    <div className="bg-gray-50 min-h-screen">
      <ScrollToTop />
      
      {/* Hero Section */}
      <section className="relative">
        {/* Hero Image */}
        <div className="aspect-[21/9] lg:aspect-[3/1] w-full overflow-hidden relative">
          <div className="absolute inset-0 bg-black/30 z-10"></div>
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
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20">
            <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-md">
                {tourData.name}
              </h1>
              <div className="flex items-center justify-center mb-6">
                <StarRating rating={4.8} size="md" />
                <span className="ml-2 text-white/90">4.8 (48 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Feature Tiles - Positioned right beneath the hero image */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-20">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="bg-white shadow-sm p-5 flex flex-col items-center text-center rounded-lg">
              <div className="bg-primary/10 rounded-full p-3 mb-3 text-primary">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-1">Duration</h4>
              <p>{tourData.duration}</p>
            </div>
            <div className="bg-white shadow-sm p-5 flex flex-col items-center text-center rounded-lg">
              <div className="bg-primary/10 rounded-full p-3 mb-3 text-primary">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-1">Tour Type</h4>
              <p>Private Luxury</p>
            </div>
            <div className="bg-white shadow-sm p-5 flex flex-col items-center text-center rounded-lg">
              <div className="bg-primary/10 rounded-full p-3 mb-3 text-primary">
                <Hotel className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-1">Accommodation</h4>
              <p>Luxury Hotels</p>
            </div>
            <div className="bg-white shadow-sm p-5 flex flex-col items-center text-center rounded-lg">
              <div className="bg-primary/10 rounded-full p-3 mb-3 text-primary">
                <ArrowLeft className="w-6 h-6" />
              </div>
              <h4 className="font-semibold mb-1">Starting Price</h4>
              <p>{formatPrice(tourData.startingFrom, { currency: tourData.currency })}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:w-8/12">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
              {/* Quick Highlights - Positioned as tags above tabs for scanning */}
              {tourData.highlights && tourData.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {tourData.highlights.map((highlight, index) => (
                    <span key={`highlight-${index}`} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      {highlight}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Premium Luxury Tour Overview Section */}
              <div className="mb-16 relative">
                {/* Background decorative elements */}
                <div className="absolute w-64 h-64 -top-12 -right-12 bg-primary/5 rounded-full blur-xl"></div>
                <div className="absolute w-48 h-48 bottom-0 -left-12 bg-yellow-400/5 rounded-full blur-xl"></div>
                <div className="absolute hidden md:block h-full w-1 bg-gradient-to-b from-primary/30 via-primary to-blue-400/30 left-0 top-0 rounded-full"></div>
                
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  {/* Main content section */}
                  <div className="px-6 md:px-10 pt-6">
                    
                    {/* Main summary section */}
                    <div className="prose prose-lg max-w-none mb-8">
                      <p className="text-gray-700 text-lg leading-relaxed">{tourData.summary}</p>
                    </div>
                    
                    {/* Two-column layout for why choose and highlights */}
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
                            onClick={() => document.getElementById('contact-form-container')?.scrollIntoView({ behavior: 'smooth' })}
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
                            onClick={() => document.getElementById('contact-form-container')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-medium transition flex items-center justify-center"
                          >
                            <Calendar className="w-5 h-5 mr-2" />
                            Book This Experience
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Itinerary Section */}
              <div className="mt-10 mb-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-primary/80 to-primary p-6 text-white">
                    <h2 className="text-xl font-bold flex items-center">
                      <List className="w-5 h-5 mr-3" />
                      Tour Itinerary
                    </h2>
                    <p className="text-white/80 mt-1 text-sm">Daily activities and experiences for your journey</p>
                  </div>
                  
                  <div className="p-6">
                    {tourData.itinerary && tourData.itinerary.length > 0 ? (
                      <>
                        {/* Scrollable Tab Slider for Days */}
                        <div className="mb-8">
                          <div className="relative">
                            {/* Left shadow overlay for scroll indicator */}
                            <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                            
                            {/* Right shadow overlay for scroll indicator */}
                            <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                            
                            {/* Tab bar container */}
                            <div className="mb-4">
                              {/* Hide scrollbar for Chrome, Safari and Opera */}
                              <style dangerouslySetInnerHTML={{
                                __html: `
                                  .scrollbar-none::-webkit-scrollbar {
                                    display: none;
                                  }
                                  .scrollbar-none {
                                    -ms-overflow-style: none;
                                    scrollbar-width: none;
                                  }

                                `
                              }} />
                              
                              {/* Scrollable tabs - simplified Material UI style with navigation arrows */}
                              <div className="relative">
                                {/* Left navigation arrow with conditional visibility */}
                                <button 
                                  onClick={() => {
                                    const container = document.querySelector('.itinerary-tabs-container');
                                    if (container) {
                                      container.scrollBy({ left: -200, behavior: 'smooth' });
                                    }
                                  }}
                                  className="itinerary-left-arrow absolute left-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-all"
                                  aria-label="Scroll left"
                                  ref={(el) => {
                                    if (el) {
                                      // Make sure arrows are visible when content overflows
                                      const checkOverflow = () => {
                                        const container = document.querySelector('.itinerary-tabs-container') as HTMLElement;
                                        if (container) {
                                          const isOverflowing = container.scrollWidth > container.clientWidth;
                                          el.style.display = isOverflowing ? 'flex' : 'none';
                                        }
                                      };
                                      
                                      // Check multiple times to ensure it catches any layout changes
                                      checkOverflow();
                                      setTimeout(checkOverflow, 100);
                                      setTimeout(checkOverflow, 500);
                                      setTimeout(checkOverflow, 1000);
                                      
                                      // Add resize listener to recheck on window resize
                                      window.addEventListener('resize', checkOverflow);
                                    }
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                  </svg>
                                </button>
                                
                                {/* Scrollable tabs container */}
                                <div 
                                  className="flex overflow-x-auto scrollbar-none pb-0 scroll-smooth px-10 itinerary-tabs-container"
                                  ref={(el) => {
                                    if (el) {
                                      // Always maintain left alignment
                                      el.classList.remove('justify-center');
                                      el.classList.remove('justify-end');
                                    }
                                  }}
                                >
                                  {tourData.itinerary.map((day) => (
                                    <button
                                      key={`day-tab-${day.day}`}
                                      onClick={() => setActiveDay(day.day)}
                                      className={`
                                        day-tab relative whitespace-nowrap transition-all duration-200
                                        px-6 py-3 mx-1.5 text-sm font-medium rounded-full focus:outline-none
                                        ${activeDay === day.day 
                                          ? 'bg-[#0F7173] text-white' 
                                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                                      `}
                                    >
                                      Day {day.day}
                                    </button>
                                  ))}
                                </div>
                                
                                {/* Right navigation arrow with conditional visibility */}
                                <button 
                                  onClick={() => {
                                    const container = document.querySelector('.itinerary-tabs-container');
                                    if (container) {
                                      container.scrollBy({ left: 200, behavior: 'smooth' });
                                    }
                                  }}
                                  className="itinerary-right-arrow absolute right-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-all"
                                  aria-label="Scroll right"
                                  ref={(el) => {
                                    if (el) {
                                      // Make sure arrows are visible when content overflows
                                      const checkOverflow = () => {
                                        const container = document.querySelector('.itinerary-tabs-container') as HTMLElement;
                                        if (container) {
                                          const isOverflowing = container.scrollWidth > container.clientWidth;
                                          el.style.display = isOverflowing ? 'flex' : 'none';
                                        }
                                      };
                                      
                                      // Check multiple times to ensure it catches any layout changes
                                      checkOverflow();
                                      setTimeout(checkOverflow, 100);
                                      setTimeout(checkOverflow, 500);
                                      setTimeout(checkOverflow, 1000);
                                      
                                      // Add resize listener to recheck on window resize
                                      window.addEventListener('resize', checkOverflow);
                                    }
                                  }}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Render selected day's itinerary with accommodation and meals */}
                        {tourData.itinerary.map((day) => (
                          <EnhancedItineraryItem
                            key={day.day}
                            day={day.day}
                            title={day.title}
                            description={day.description}
                            image={day.image}
                            isActive={activeDay === day.day}
                            accommodation="Luxury Hotel"
                            meals={{
                              breakfast: true,
                              lunch: true,
                              dinner: true
                            }}
                          />
                        ))}
                      </>
                    ) : (
                      <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                        <p className="text-gray-500">No itinerary available for this tour.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gallery Section */}
            <div className="mb-8">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                  <h2 className="text-xl font-bold">Tour Gallery</h2>
                  <p className="text-white/80 mt-1 text-sm">Explore the stunning landscapes and experiences of this tour</p>
                </div>
                <div className="p-6">
                  {galleryImages && galleryImages.length > 0 ? (
                    <AsymmetricalGallery images={galleryImages} />
                  ) : (
                    <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                      <p className="text-gray-500">No gallery images available for this tour.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Map Section */}
            {tourData.mapImage && tourData.mapPoints && tourData.mapPoints.length > 0 && (
              <div className="mb-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
                    <h2 className="text-xl font-bold flex items-center">
                      <Map className="w-5 h-5 mr-3" />
                      Tour Route Map
                    </h2>
                    <p className="text-white/80 mt-1 text-sm">Follow the journey through Sri Lanka's most beautiful locations</p>
                  </div>
                  <div className="p-6">
                    <AnimatedRouteMap
                      mapImage={tourData.mapImage}
                      points={getActiveMapPoints()}
                      activeDay={activeDay}
                      onPointClick={(pointId) => {
                        const point = tourData.mapPoints?.find(p => p.id === pointId);
                        if (point && point.day) {
                          setActiveDay(point.day);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Inclusions and Exclusions Section */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 text-white">
                    <h2 className="text-lg font-bold flex items-center">
                      <Check className="w-5 h-5 mr-2" />
                      What's Included
                    </h2>
                  </div>
                  <div className="p-6">
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
                </div>
                
                {/* Exclusions */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-red-600 to-red-500 p-4 text-white">
                    <h2 className="text-lg font-bold flex items-center">
                      <X className="w-5 h-5 mr-2" />
                      What's Not Included
                    </h2>
                  </div>
                  <div className="p-6">
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
              </div>
            </div>
            
            {/* Contact Form Section */}
            <div className="mb-8" id="contact-form-container">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-white">
                  <h2 className="text-xl font-bold flex items-center">
                    <Phone className="w-5 h-5 mr-3" />
                    Ready to Book This Tour?
                  </h2>
                  <p className="text-white/80 mt-1 text-sm">Fill out the form below and our travel experts will get back to you within 24 hours</p>
                </div>
                <div className="p-6">
                  <ContactForm 
                    tourName={tourData.name} 
                    prefilledMessage={`I'm interested in the ${tourData.name} tour and would like more information.`} 
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking Sidebar */}
          <div className="lg:w-4/12">
            <div className="bg-primary rounded-lg overflow-hidden sticky top-4">
              <div className="p-6 bg-primary text-white">
                <h3 className="text-xl font-bold mb-4">{tourData.name}</h3>
                <div className="bg-white/10 rounded-lg p-5 mb-6">
                  <div className="text-3xl font-bold mb-1">
                    {formatPrice(tourData.startingFrom, { currency: tourData.currency })}
                  </div>
                  <div className="text-white/90 text-sm">per person</div>
                </div>
                
                <div className="space-y-4 mb-8 text-white/90">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Duration:</span>
                    <span>{tourData.duration}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tour Type:</span>
                    <span>Private Tour</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Starting From:</span>
                    <span>Colombo</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
                    <p className="font-medium text-yellow-800">Special Offer</p>
                    <p className="text-yellow-700">Book now and receive a complimentary airport transfer!</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => document.getElementById('contact-form-container')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-[#D4AF37] hover:bg-[#C8A52E] text-white py-3 rounded-md font-medium transition mb-4"
                >
                  Book Now
                </button>
                
                <div className="text-center">
                  <button 
                    onClick={() => document.getElementById('contact-form-container')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-sm text-white hover:underline"
                  >
                    Request Custom Quote
                  </button>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-white text-sm mb-2">Need assistance?</p>
                <p className="text-white/90 font-medium">Call: +94 77 123 4567</p>
                <p className="text-white/90 font-medium">Email: info@bestsrilankatours.com</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TourDetails;