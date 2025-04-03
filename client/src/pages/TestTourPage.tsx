import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Calendar, 
  List,
  Check, 
  X,
  Map, 
  LayoutList,
  Image as ImageIcon,
  BookOpenText,
  Hotel,
  Phone,
  Heart,
  Info,
  Home,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { AsymmetricalGallery } from '@/components/AsymmetricalGallery';
import Header from '@/components/Header';
import AnimatedRouteMap from '@/components/AnimatedRouteMap';
import ContactForm from '@/components/ContactForm';
import EnhancedItineraryItem from '@/components/EnhancedItineraryItem';

// Type definition for our tour data
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

interface TestTourPageProps {
  params?: {
    slug?: string;
  };
}

const TestTourPage: React.FC<TestTourPageProps> = ({ params }) => {
  const [tourData, setTourData] = useState<TourData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<number | undefined>(1);
  const { formatPrice } = useCurrency();
  
  // Get the slug from the URL params or use a default if not available
  const tourSlug = params?.slug || 'scenic-wonders-of-sri-lanka';

  // Function to fetch tour data from the API
  useEffect(() => {
    const fetchTourData = async () => {
      try {
        setLoading(true);
        
        // Call the API endpoint with the full Azure URL and CORS headers
        const response = await fetch(`https://bsl-dg-adf2awanb4etgsap.uksouth-01.azurewebsites.net/api/tours/${tourSlug}`, {
          headers: {
            'Accept': 'application/json',
            'Origin': window.location.origin
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch tour data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        // Debug code (temporarily hidden)
        // console.log('Fetched tour data:', data);
        setTourData(data);
        setError(null);
      } catch (err) {
        // Debug code (temporarily hidden)
        // console.error('Error fetching tour data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTourData();
  }, [tourSlug]);

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-24 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-64 bg-gray-200 rounded w-full"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading tour data...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Error Loading Tour Data</h2>
          <p>{error}</p>
          <p className="mt-4">
            Please try again later or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }

  // If no data found
  if (!tourData) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">No Tour Data Found</h2>
          <p>The requested tour could not be found.</p>
        </div>
      </div>
    );
  }

  // Show actual tour data
  return (
    <div>
      
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0 z-0">
          <img 
            src={tourData.heroImage?.large || tourData.heroImage?.medium || tourData.heroImage?.baseUrl || "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743155638/maps/sri-lanka-base-map_kczjir.jpg"} 
            alt={tourData.heroImage?.alt || tourData.name}
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-end pb-16">
          {/* Breadcrumb Navigation */}
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
                  <Link href="/tours" className="ml-1 text-sm font-medium text-white/90 hover:text-white">
                    Tours
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-white/60" />
                  <span className="ml-1 text-sm font-medium text-white/80">
                    {tourData.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-4">{tourData.name}</h1>
            {tourData.heroImage?.caption && (
              <p className="text-xl text-white/90 mb-6">{tourData.heroImage.caption}</p>
            )}
            
            {/* Remove tags as requested */}
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-white hover:bg-[#D4AF37] text-[#0F4C81] hover:text-white font-medium py-3 px-8 rounded-md transition">
                Book This Tour
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium py-3 px-8 rounded-md transition">
                View Itinerary
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
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
                  {/* Feature icons section in a 4-column grid */}
                  <div className="px-6 md:px-10 pt-6">
                    {/* Visual features section in a 4-column grid - No borders */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
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
                          <BookOpenText className="w-6 h-6" />
                        </div>
                        <h4 className="font-semibold mb-1">Starting Price</h4>
                        <p>{formatPrice(tourData.startingFrom, { currency: tourData.currency })}</p>
                      </div>
                    </div>
                    
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
              
              {/* Tour Tabs: Itinerary, Inclusions, Gallery, Map */}
              <div className="mb-10">
                <Tabs defaultValue="itinerary" className="w-full">
                  <TabsList className="mb-6 flex space-x-2 md:space-x-4 w-full rounded-lg bg-gray-50 p-1.5 border border-gray-100 shadow-sm">
                    {[
                      { id: "itinerary", label: "Itinerary", icon: <LayoutList className="w-5 h-5 mr-2" /> },
                      { id: "inclusions", label: "Inclusions", icon: <List className="w-5 h-5 mr-2" /> },
                      { id: "gallery", label: "Gallery", icon: <ImageIcon className="w-5 h-5 mr-2" /> },
                      { id: "map", label: "Map", icon: <Map className="w-5 h-5 mr-2" /> }
                    ].map((tab) => (
                      <TabsTrigger 
                        key={`tab-${tab.id}`} 
                        value={tab.id} 
                        className="flex-1 py-3 text-gray-600 font-medium flex items-center justify-center rounded-md transition-all
                        data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm
                        hover:bg-gray-100 data-[state=active]:hover:bg-white"
                      >
                        {tab.icon}
                        <span className="hidden sm:inline">{tab.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {/* Itinerary Tab Content */}
                  <TabsContent value="itinerary" className="mt-0">
                    <div className="mb-6 flex overflow-x-auto space-x-3 pb-3">
                      {tourData.itinerary.map((day) => (
                        <button
                          key={`day-button-${day.day}`}
                          onClick={() => setActiveDay(day.day)}
                          className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
                            activeDay === day.day
                              ? 'bg-primary text-white shadow-md shadow-primary/20 ring-2 ring-primary/30'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-sm'
                          }`}
                        >
                          Day {day.day}
                        </button>
                      ))}
                    </div>
                    
                    {tourData.itinerary.map((day) => (
                      <EnhancedItineraryItem
                        key={day.day}
                        day={day.day}
                        title={day.title}
                        description={day.description}
                        image={day.image}
                        isActive={activeDay === day.day}
                      />
                    ))}
                  </TabsContent>
                  
                  {/* Inclusions/Exclusions Tab Content */}
                  <TabsContent value="inclusions" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-b from-green-50 to-white shadow-md rounded-lg overflow-hidden">
                        <div className="bg-green-600 py-4 px-6">
                          <h2 className="text-lg font-bold text-white flex items-center">
                            <Check className="w-5 h-5 mr-2" />
                            What's Included
                          </h2>
                        </div>
                        <div className="p-6">
                          <ul className="space-y-3">
                            {tourData.inclusions.map((item, index) => (
                              <li key={`inclusion-${index}`} className="flex items-start group">
                                <div className="bg-green-100 rounded-full p-1 mt-0.5 mr-3 group-hover:bg-green-200 transition-colors">
                                  <Check className="w-4 h-4 text-green-600" />
                                </div>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-b from-red-50 to-white shadow-md rounded-lg overflow-hidden">
                        <div className="bg-red-500 py-4 px-6">
                          <h2 className="text-lg font-bold text-white flex items-center">
                            <X className="w-5 h-5 mr-2" />
                            What's Not Included
                          </h2>
                        </div>
                        <div className="p-6">
                          <ul className="space-y-3">
                            {tourData.exclusions.map((item, index) => (
                              <li key={`exclusion-${index}`} className="flex items-start group">
                                <div className="bg-red-100 rounded-full p-1 mt-0.5 mr-3 group-hover:bg-red-200 transition-colors">
                                  <X className="w-4 h-4 text-red-500" />
                                </div>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Gallery Tab Content */}
                  <TabsContent value="gallery" className="mt-0">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-primary/80 to-primary p-6 text-white">
                        <h2 className="text-xl font-bold flex items-center">
                          <ImageIcon className="w-5 h-5 mr-3" />
                          Tour Photo Gallery
                        </h2>
                        <p className="text-white/80 mt-1 text-sm">Explore the visual journey of this luxury tour</p>
                      </div>
                      
                      <div className="p-6">
                        {tourData.galleryImages && tourData.galleryImages.length > 0 ? (
                          <AsymmetricalGallery 
                            images={tourData.galleryImages.map(img => ({
                              ...img,
                              alt: img.alt || 'Tour image'
                            }))} 
                          />
                        ) : (
                          <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                            <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-500">No gallery images available for this tour.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Map Tab Content */}
                  <TabsContent value="map" className="mt-0">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                        <h2 className="text-xl font-bold flex items-center">
                          <Map className="w-5 h-5 mr-3" />
                          Tour Route Map
                        </h2>
                        <p className="text-white/80 mt-1 text-sm">Follow the journey through Sri Lanka's most beautiful destinations</p>
                      </div>
                      
                      <div className="p-6">
                        {tourData.mapPoints && tourData.mapPoints.length > 0 ? (
                          <>
                            <div className="mb-6 flex overflow-x-auto space-x-3 pb-3">
                              {tourData.itinerary.map((day) => (
                                <button
                                  key={`map-day-button-${day.day}`}
                                  onClick={() => setActiveDay(day.day)}
                                  className={`px-6 py-2.5 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
                                    activeDay === day.day
                                      ? 'bg-primary text-white shadow-md shadow-primary/20 ring-2 ring-primary/30'
                                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-sm'
                                  }`}
                                >
                                  Day {day.day}
                                </button>
                              ))}
                            </div>
                            <div className="aspect-[4/3] relative border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                              <AnimatedRouteMap
                                mapImage={tourData.mapImage || "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743155638/maps/sri-lanka-base-map_kczjir.jpg"}
                                points={(tourData.mapPoints || []).map(point => ({
                                  ...point,
                                  isActive: point.day === activeDay
                                }))}
                                activeDay={activeDay}
                                className="w-full h-full"
                                onPointClick={(pointId) => {
                                  const point = tourData.mapPoints ? tourData.mapPoints.find(p => p.id === pointId) : undefined;
                                  if (point && point.day) {
                                    setActiveDay(point.day);
                                  }
                                }}
                              />
                            </div>
                            <div className="mt-4 text-center text-sm text-gray-500">
                              Click on a day number to see the route or click map locations to navigate
                            </div>
                          </>
                        ) : (
                          <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                            <Map className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-500">No map data available for this tour.</p>
                            <p className="text-xs text-gray-400 mt-2">Interactive map coming soon</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Contact Form Section */}
              <div id="contact-form-container" className="mt-12 border-t pt-8">
                <h2 className="text-2xl font-bold mb-4">Book This Tour</h2>
                <p className="text-gray-600 mb-6">Fill out the form below and our travel experts will get back to you within 24 hours with a customized itinerary and quote.</p>
                
                <ContactForm 
                  tourName={tourData.name}
                  prefilledMessage={`I'm interested in the "${tourData.name}" tour package. Please provide more information about availability and pricing.`}
                />
              </div>
              
              {/* Raw JSON Data for Debugging - Hidden completely */}
              {/* 
                Debug section temporarily hidden as requested
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-12 border-t pt-8">
                    <h2 className="text-2xl font-bold mb-4">Raw API Response (For Debugging)</h2>
                    <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
                      {JSON.stringify(tourData, null, 2)}
                    </pre>
                  </div>
                )}
              */}
            </div>
          </div>
          
          {/* Right Column - Booking Form */}
          <div className="lg:w-4/12">
            <div className="bg-gradient-to-r from-[#0F4C81] to-[#137795] rounded-lg shadow-xl p-6 sticky top-8">
              <div className="text-center mb-8">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-2">
                  Book This Tour
                </h2>
                <p className="text-white/80">
                  Reserve your spot on this exclusive private tour
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="font-medium">Tour Price:</span>
                    <span className="text-lg font-bold text-primary">{tourData.currency} {tourData.startingFrom}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="font-medium">Duration:</span>
                    <span>{tourData.duration}</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
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
                    className="text-sm text-primary hover:underline"
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

export default TestTourPage;