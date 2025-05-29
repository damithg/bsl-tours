import { useEffect, useState, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import useEmblaCarousel from 'embla-carousel-react';
import { 
  Calendar, Check, Heart, Hotel, Map, Phone, Flag, List, X, Star, Globe, Clock, 
  Users, PiggyBank, Compass, Camera, Info, Mail, ChevronDown, Coffee, UtensilsCrossed,
  ChevronLeft, ChevronRight, ChevronUp
} from "lucide-react";
import { AsymmetricalGallery, GalleryImage } from "@/components/AsymmetricalGallery";
import EnhancedItineraryItem from "@/components/EnhancedItineraryItem";
import { useCurrency } from "@/contexts/CurrencyContext";
import { StarRating } from "@/components/StarRating";
import ContactForm from "@/components/ContactForm";
import AnimatedRouteMap from "@/components/AnimatedRouteMap";
import TourPDFGenerator from "@/components/TourPDFGenerator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BackToTopButton } from "@/components/BackToTopButton";
import { Button } from "@/components/ui/button";
import { TourData, TourImage, ItineraryDay } from "@/types/tour";
import DetailPageHeader from "@/components/DetailPageHeader";

interface TourDetailsProps {
  params?: {
    slug?: string;
  };
}

const TourDetails: React.FC<TourDetailsProps> = ({ params }) => {
  const [activeDay, setActiveDay] = useState<number | null>(1);
  const [activeSection, setActiveSection] = useState('overview');
  const { formatPrice } = useCurrency();
  
  // Set up Embla carousel for mobile gallery
  const [emblaGalleryRef, emblaGalleryApi] = useEmblaCarousel({ loop: true });
  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      // @ts-ignore - the emblaGalleryRef.current is correctly handled by Embla internally
      emblaGalleryRef.current = node;
    }
  }, [emblaGalleryRef]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  
  // Gallery carousel controls
  const onSelectGallery = useCallback(() => {
    if (!emblaGalleryApi) return;
    setGalleryIndex(emblaGalleryApi.selectedScrollSnap());
  }, [emblaGalleryApi]);

  const scrollPrevGallery = useCallback(() => {
    if (emblaGalleryApi) emblaGalleryApi.scrollPrev();
  }, [emblaGalleryApi]);

  const scrollNextGallery = useCallback(() => {
    if (emblaGalleryApi) emblaGalleryApi.scrollNext();
  }, [emblaGalleryApi]);
  
  // Initialize Gallery Carousel
  useEffect(() => {
    if (!emblaGalleryApi) return;
    
    // Update to reset the gallery index
    setGalleryIndex(0);
    
    // Add event listeners
    emblaGalleryApi.on('select', onSelectGallery);
    
    // Initial selection
    onSelectGallery();
    
    return () => {
      emblaGalleryApi.off('select', onSelectGallery);
    };
  }, [emblaGalleryApi, onSelectGallery]);
  
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
    
  // If we have a hero image and it's not already in the gallery, add it
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
      <BackToTopButton />
      
      {/* Hero Section */}
      <DetailPageHeader
        imageUrl={tourData.heroImage?.large || tourData.heroImage?.medium || tourData.heroImage?.small || tourData.heroImage?.baseUrl}
        imageAlt={tourData.heroImage?.alt || tourData.name}
        title={tourData.name}
        subtitle={tourData.heroImage?.caption}
        rating={4.8}
        reviewCount={48}
        duration={tourData.duration}
        aspectRatio="wide"
        overlayOpacity={0}
      />
      
      {/* Breadcrumb Navigation - positioned to match tours page */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-1">
          <nav className="flex text-white/90 mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" className="inline-flex items-center text-sm font-medium hover:text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white/60 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                  <a href="/tours" className="ml-1 text-sm font-medium text-white/90 hover:text-white" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                    Tours
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white/60 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-white/80" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
                    {tourData.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      

      
      {/* Elegant Navigation Menu */}
      <div className="bg-white sticky top-0 z-40 border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center overflow-x-auto scrollbar-none whitespace-nowrap py-3 gap-1 md:gap-0">
              <button 
                onClick={() => handleNavClick('overview')}
                className={`relative text-sm font-medium px-5 py-2 transition-all duration-300 
                  border-b-2 ${
                  activeSection === 'overview' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-600 hover:text-primary/80'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => handleNavClick('itinerary')}
                className={`relative text-sm font-medium px-5 py-2 transition-all duration-300 
                  border-b-2 ${
                  activeSection === 'itinerary' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-600 hover:text-primary/80'
                }`}
              >
                Itinerary
              </button>
              <button 
                onClick={() => handleNavClick('gallery')}
                className={`relative text-sm font-medium px-5 py-2 transition-all duration-300 
                  border-b-2 ${
                  activeSection === 'gallery' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-600 hover:text-primary/80'
                }`}
              >
                Gallery
              </button>
              {tourData.mapImage && tourData.mapPoints && tourData.mapPoints.length > 0 && (
                <button 
                  onClick={() => handleNavClick('map')}
                  className={`relative text-sm font-medium px-5 py-2 transition-all duration-300 
                    border-b-2 ${
                    activeSection === 'map' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-600 hover:text-primary/80'
                  }`}
                >
                  Map
                </button>
              )}
              <button 
                onClick={() => handleNavClick('inclusions')}
                className={`relative text-sm font-medium px-5 py-2 transition-all duration-300 
                  border-b-2 ${
                  activeSection === 'inclusions' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-600 hover:text-primary/80'
                }`}
              >
                Details
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className={`relative text-sm font-medium px-5 py-2 transition-all duration-300 ml-1 md:ml-3 
                  ${activeSection === 'contact' 
                    ? 'text-primary bg-primary/5 border-b-2 border-primary' 
                    : 'text-primary border-b-2 border-transparent hover:bg-primary/5'
                  }
                `}
              >
                Book Now
              </button>
            </div>
            
            {/* Elegantly styled Back to Top button */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hidden md:flex items-center gap-1 text-primary/80 hover:text-primary transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
              <span className="text-xs font-medium">Top</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
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
                    <Clock className="w-5 h-5 text-primary mr-2" />
                    <h3 className="font-medium text-gray-800">Duration</h3>
                  </div>
                  <p className="text-sm text-gray-600 pl-7">{tourData.duration}</p>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-primary mr-2" />
                    <h3 className="font-medium text-gray-800">Best Time to Visit</h3>
                  </div>
                  <p className="text-sm text-gray-600 pl-7">November to April</p>
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
            
            {/* Itinerary Section */}
            <section ref={itineraryRef} id="itinerary" className="mb-8">              
              {tourData.itinerary && tourData.itinerary.length > 0 ? (
                <div className="grid gap-4">
                  {tourData.itinerary.map((day, index) => (
                    <div 
                      key={`day-${day.day}`} 
                      className="border border-gray-200 overflow-hidden rounded-xl transition-all duration-300"
                    >
                      {/* Expandable header with day number and title */}
                      <div 
                        className="py-4 px-6 cursor-pointer flex items-center justify-between bg-white"
                        onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
                      >
                        {/* Left side with day number and title */}
                        <div className="flex items-center">
                          <div className="flex items-center justify-center mr-4">
                            <div className="px-5 py-1.5 rounded-md border border-gray-300 text-gray-700 text-sm font-semibold whitespace-nowrap">
                              Day {day.day}
                            </div>
                          </div>
                          
                          <h3 className="font-bold text-lg text-gray-800">{day.title}</h3>
                        </div>
                        
                        {/* Expand/collapse indicator */}
                        <div className={`
                          w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center
                          ${activeDay === day.day ? 'text-primary rotate-180' : 'text-gray-500 rotate-0'}
                          transition-all duration-300
                        `}>
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                      
                      {/* Expandable content */}
                      <div 
                        className={`
                          transition-all duration-300 overflow-hidden bg-white
                          ${activeDay === day.day ? 'max-h-[2000px] opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0 border-t-0'}
                        `}
                      >
                        <div className="p-6">
                          {/* Two-column layout on larger screens */}
                          <div className="flex flex-col lg:flex-row gap-8">
                            {/* Description column */}
                            <div className="lg:w-3/5 order-2 lg:order-1">
                              <div className="prose prose-sm md:prose max-w-none text-gray-600">
                                {/* Convert description to paragraphs based on new lines */}
                                {day.description.split('\n').filter(para => para.trim() !== '').map((paragraph, idx) => (
                                  <p key={`para-${idx}`} className="mb-4">{paragraph}</p>
                                ))}
                              </div>
                              
                              {/* Accommodation and meals section */}
                              <div className="mt-6 flex flex-wrap gap-3 items-center">
                                <div className="flex items-center border border-gray-200 py-2 px-4 rounded-full text-sm bg-gray-50">
                                  <Hotel className="w-4 h-4 mr-2 text-primary" />
                                  <span className="text-gray-700">5-Star Hotel</span>
                                </div>
                                
                                <div className="flex items-center border border-gray-200 py-2 px-4 rounded-full text-sm bg-blue-50">
                                  <Coffee className="w-4 h-4 mr-2 text-blue-600" />
                                  <span className="text-gray-700">Breakfast</span>
                                </div>
                                
                                <div className="flex items-center border border-gray-200 py-2 px-4 rounded-full text-sm bg-amber-50">
                                  <UtensilsCrossed className="w-4 h-4 mr-2 text-amber-600" />
                                  <span className="text-gray-700">Lunch</span>
                                </div>
                                
                                <div className="flex items-center border border-gray-200 py-2 px-4 rounded-full text-sm bg-green-50">
                                  <UtensilsCrossed className="w-4 h-4 mr-2 text-green-600" />
                                  <span className="text-gray-700">Dinner</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Image column */}
                            {day.image && (day.image.large || day.image.medium || day.image.small || day.image.baseUrl) && (
                              <div className="lg:w-2/5 order-1 lg:order-2 mb-6 lg:mb-0">
                                <div className="rounded-xl overflow-hidden shadow-sm h-60 lg:h-full border border-gray-100">
                                  <img 
                                    src={day.image.large || day.image.medium || day.image.small || day.image.baseUrl}
                                    alt={day.image.alt || `Day ${day.day}: ${day.title}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
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
          
          {/* Sidebar Column */}
          <div className="lg:w-4/12">
            <div className="sticky top-[70px]">
              {/* Price Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">Starting from</div>
                  <div className="flex items-center">
                    <StarRating rating={4.8} size="sm" />
                    <span className="text-gray-500 text-sm ml-1">(48)</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-[#0077B6]">
                      {formatPrice(tourData.startingFrom, { currency: tourData.currency })}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">/ per person</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="w-full bg-[#0077B6] hover:bg-[#005f92] text-white py-3 px-4 rounded-full font-medium transition flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    Book Now <ChevronRight className="w-4 h-4 ml-1.5" />
                  </button>
                  
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="w-full bg-white hover:bg-gray-50 text-[#0077B6] border border-[#0077B6] py-3 px-4 rounded-full font-medium transition flex items-center justify-center shadow-sm hover:shadow-md"
                  >
                    Request Custom Quote
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-[#F8F3E2] border border-[#F6E27F]/30 rounded-xl p-4 shadow-sm">
                    <h3 className="font-medium text-[#8B7727] mb-1 flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Special Offer
                    </h3>
                    <p className="text-sm text-[#6B5900] ml-7">Book now and receive a complimentary airport transfer!</p>
                  </div>
                </div>
              </div>
              
              {/* What to Pack Card */}
              <div className="bg-gradient-to-br from-[#F9FCFF] to-[#EFF8FC] rounded-xl shadow-sm p-6 border border-[#0077B6]/10 mb-6">
                <h3 className="font-semibold text-[#0077B6] mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z"></path>
                    <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z"></path>
                    <line x1="12" y1="22" x2="12" y2="13"></line>
                    <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5"></path>
                  </svg>
                  What to Pack
                </h3>
                
                <div className="space-y-2.5 mb-3">
                  <div className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-0.5 border border-[#0077B6]/20">
                      <Check className="w-3 h-3 text-[#0077B6]" />
                    </div>
                    <p className="text-gray-700 text-sm">Lightweight, breathable clothing</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-0.5 border border-[#0077B6]/20">
                      <Check className="w-3 h-3 text-[#0077B6]" />
                    </div>
                    <p className="text-gray-700 text-sm">Sun protection (hat, sunglasses, sunscreen)</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-0.5 border border-[#0077B6]/20">
                      <Check className="w-3 h-3 text-[#0077B6]" />
                    </div>
                    <p className="text-gray-700 text-sm">Comfortable walking shoes</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-white rounded-full p-1 mr-3 mt-0.5 border border-[#0077B6]/20">
                      <Check className="w-3 h-3 text-[#0077B6]" />
                    </div>
                    <p className="text-gray-700 text-sm">Insect repellent</p>
                  </div>
                </div>
              </div>
              
              {/* Weather Card */}
              <div className="bg-gradient-to-br from-[#FFFDF9] to-[#FFF9EA] rounded-xl shadow-sm p-6 border border-amber-100 mb-6">
                <h3 className="font-semibold text-amber-700 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M12 9a4 4 0 0 0-2 7.5"></path>
                    <path d="M12 3v2"></path>
                    <path d="m6.6 18.4-1.4 1.4"></path>
                    <path d="M20 12h2"></path>
                    <path d="M6.6 5.6 5.2 4.2"></path>
                    <path d="M18 12a6 6 0 0 1-12 0"></path>
                    <path d="M12 18v2"></path>
                    <path d="m18.4 18.4 1.4 1.4"></path>
                    <path d="M2 12h2"></path>
                    <path d="m17.4 5.6 1.4-1.4"></path>
                  </svg>
                  Weather
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-gray-500 text-xs">Average High</p>
                    <p className="text-gray-800 font-semibold">29°C / 84°F</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Average Low</p>
                    <p className="text-gray-800 font-semibold">23°C / 73°F</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Rainfall</p>
                    <p className="text-gray-800 font-semibold">Low</p>
                  </div>
                </div>
                
                <div className="text-xs text-gray-600 italic">
                  *Weather data shown for peak season (November-April)
                </div>
              </div>
              
              {/* Need Help Card */}
              <div className="bg-gradient-to-br from-[#EFF8FC] to-[#E6F4FC] rounded-xl shadow-sm p-6 border border-[#0077B6]/10">
                <h3 className="font-semibold text-[#0077B6] mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Need Help?
                </h3>
                
                <p className="text-gray-600 text-sm mb-5">
                  Our travel experts are here to assist you with planning your perfect Sri Lanka experience.
                </p>
                
                <div className="space-y-4">
                  <button className="flex items-center justify-center w-full gap-2 bg-white hover:bg-gray-50 text-[#0077B6] border border-[#0077B6]/30 py-2.5 px-4 rounded-full font-medium transition shadow-sm">
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </button>
                  
                  <button 
                    onClick={() => handleNavClick('contact')}
                    className="flex items-center justify-center w-full gap-2 bg-white hover:bg-gray-50 text-[#0077B6] border border-[#0077B6]/30 py-2.5 px-4 rounded-full font-medium transition shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Us</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Full-width sections below main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Gallery Section */}
        <section ref={galleryRef} id="gallery" className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Camera className="w-6 h-6 mr-3 text-primary" />
            Tour Gallery
          </h2>
          
          {galleryImages && galleryImages.length > 0 ? (
            <>
              {/* Desktop Gallery */}
              <div className="hidden md:block">
                <AsymmetricalGallery images={galleryImages} />
              </div>
              
              {/* Mobile Carousel */}
              <div className="md:hidden relative">
                <div className="overflow-hidden" ref={emblaGalleryRef}>
                  <div className="flex">
                    {galleryImages.map((image, index) => (
                      <div key={`carousel-${index}`} className="flex-[0_0_100%] min-w-0 relative">
                        <div className="h-64 relative">
                          <img 
                            src={image.medium || image.url || image.baseUrl}
                            alt={image.alt}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          {image.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                              <p className="text-sm">{image.caption}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Navigation buttons */}
                <button 
                  onClick={scrollPrevGallery} 
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 text-[#0077B6] shadow-md z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={scrollNextGallery} 
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 text-[#0077B6] shadow-md z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {/* Pagination dots */}
                <div className="flex justify-center gap-1 mt-3">
                  {galleryImages.map((_, index) => (
                    <button
                      key={`dot-${index}`}
                      className={`w-2 h-2 rounded-full transition-all ${
                        galleryIndex === index
                          ? "bg-primary w-4"
                          : "bg-gray-300"
                      }`}
                      onClick={() => emblaGalleryApi?.scrollTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </>
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
        
        {/* PDF Generator Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Camera className="w-6 h-6 mr-3 text-primary" />
            Share This Tour
          </h2>
          
          <div className="space-y-4">
            <TourPDFGenerator 
              tourData={tourData}
              isGenerating={false}
            />
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
    </div>
  );
};

export default TourDetails;