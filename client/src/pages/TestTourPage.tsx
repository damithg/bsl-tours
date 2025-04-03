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
  Home,
  ChevronRight
} from 'lucide-react';
import { AsymmetricalGallery } from '@/components/AsymmetricalGallery';
import Header from '@/components/Header';
import AnimatedRouteMap from '@/components/AnimatedRouteMap';
import ContactForm from '@/components/ContactForm';

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

const TestTourPage: React.FC = () => {
  const [tourData, setTourData] = useState<TourData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<number | undefined>(1);

  // Function to fetch tour data from the API
  useEffect(() => {
    const fetchTourData = async () => {
      try {
        setLoading(true);
        
        // Call the API endpoint with the full Azure URL and CORS headers
        const response = await fetch('https://bsl-dg-adf2awanb4etgsap.uksouth-01.azurewebsites.net/api/tours/scenic-wonders-of-sri-lanka', {
          headers: {
            'Accept': 'application/json',
            'Origin': window.location.origin
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch tour data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Fetched tour data:', data);
        setTourData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching tour data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTourData();
  }, []);

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
      {/* Header */}
      <Header />
      
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
            <p className="text-xl text-white/90 mb-6">{tourData.heroImage?.caption || tourData.summary}</p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Calendar className="w-4 h-4 mr-2" />
                {tourData.duration}
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Heart className="w-4 h-4 mr-2" />
                Private Tour
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#D4AF37] text-white">
                From {tourData.currency} {tourData.startingFrom}
              </span>
            </div>
            
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
              {/* Highlights */}
              {tourData.highlights && tourData.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {tourData.highlights.map((highlight, index) => (
                    <span key={`highlight-${index}`} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      {highlight}
                    </span>
                  ))}
                </div>
              )}
                    
              {/* Tour Summary */}
              <p className="text-gray-700 mb-6">{tourData.summary}</p>
              
              {/* Tour Tabs: Itinerary, Inclusions, Gallery, Map */}
              <div className="mb-8">
                <Tabs defaultValue="itinerary" className="w-full">
                  <TabsList className="mb-4 grid grid-cols-4 border-b border-b-muted w-full rounded-none bg-transparent h-auto">
                    {[
                      { id: "itinerary", label: "Itinerary", icon: <LayoutList className="w-4 h-4 mr-2" /> },
                      { id: "inclusions", label: "Inclusions", icon: <List className="w-4 h-4 mr-2" /> },
                      { id: "gallery", label: "Gallery", icon: <ImageIcon className="w-4 h-4 mr-2" /> },
                      { id: "map", label: "Map", icon: <Map className="w-4 h-4 mr-2" /> }
                    ].map((tab) => (
                      <TabsTrigger 
                        key={`tab-${tab.id}`} 
                        value={tab.id} 
                        className="py-2 text-sm md:text-base data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                      >
                        {tab.icon}
                        <span className="hidden sm:inline">{tab.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                
                  {/* Itinerary Tab Content */}
                  <TabsContent value="itinerary" className="mt-0">
                    <div className="mb-6 flex overflow-x-auto space-x-2 pb-2">
                      {tourData.itinerary.map((day) => (
                        <button
                          key={`day-button-${day.day}`}
                          onClick={() => setActiveDay(day.day)}
                          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                            activeDay === day.day
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          Day {day.day}
                        </button>
                      ))}
                    </div>
                    
                    {tourData.itinerary.map((day) => (
                      <div 
                        key={day.day} 
                        className={`bg-white shadow-md rounded-lg p-6 mb-4 ${activeDay === day.day ? 'block' : 'hidden'}`}
                      >
                        <h3 className="text-xl font-semibold mb-2">Day {day.day}: {day.title}</h3>
                        <p className="text-gray-700 mb-4">{day.description}</p>
                        {day.image && (
                          <img 
                            src={day.image.medium || day.image.large || day.image.small || day.image.baseUrl} 
                            alt={day.image.alt || day.title}
                            className="w-full h-auto rounded"
                          />
                        )}
                      </div>
                    ))}
                  </TabsContent>
                  
                  {/* Inclusions/Exclusions Tab Content */}
                  <TabsContent value="inclusions" className="mt-0">
                    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                      <h2 className="text-xl font-bold mb-4 flex items-center">
                        <Check className="w-5 h-5 mr-2 text-green-600" />
                        What's Included
                      </h2>
                      <ul className="space-y-2">
                        {tourData.inclusions.map((item, index) => (
                          <li key={`inclusion-${index}`} className="flex items-start">
                            <Check className="w-4 h-4 text-green-600 mr-2 mt-1" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white shadow-md rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center">
                        <X className="w-5 h-5 mr-2 text-red-500" />
                        What's Not Included
                      </h2>
                      <ul className="space-y-2">
                        {tourData.exclusions.map((item, index) => (
                          <li key={`exclusion-${index}`} className="flex items-start">
                            <X className="w-4 h-4 text-red-500 mr-2 mt-1" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  {/* Gallery Tab Content */}
                  <TabsContent value="gallery" className="mt-0">
                    <div className="bg-white shadow-md rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-6 flex items-center">
                        <ImageIcon className="w-5 h-5 mr-2 text-primary" />
                        Tour Photo Gallery
                      </h2>
                      
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
                  </TabsContent>
                  
                  {/* Map Tab Content */}
                  <TabsContent value="map" className="mt-0">
                    <div className="bg-white shadow-md rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-6 flex items-center">
                        <Map className="w-5 h-5 mr-2 text-primary" />
                        Tour Route Map
                      </h2>
                      
                      {tourData.mapPoints && tourData.mapPoints.length > 0 ? (
                        <>
                          <div className="mb-6 flex overflow-x-auto space-x-2 pb-2">
                            {tourData.itinerary.map((day) => (
                              <button
                                key={`map-day-button-${day.day}`}
                                onClick={() => setActiveDay(day.day)}
                                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                                  activeDay === day.day
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                              >
                                Day {day.day}
                              </button>
                            ))}
                          </div>
                          <div className="aspect-[4/3] relative border border-gray-100 rounded overflow-hidden">
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
                        </>
                      ) : (
                        <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-lg">
                          <Map className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                          <p className="text-gray-500">No map data available for this tour.</p>
                          <p className="text-xs text-gray-400 mt-2">Interactive map coming soon</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Raw JSON Data for Debugging */}
              <div className="mt-12 border-t pt-8">
                <h2 className="text-2xl font-bold mb-4">Raw API Response (For Debugging)</h2>
                <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
                  {JSON.stringify(tourData, null, 2)}
                </pre>
              </div>
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
                
                <button className="w-full bg-[#D4AF37] hover:bg-[#C8A52E] text-white py-3 rounded-md font-medium transition mb-4">
                  Book Now
                </button>
                
                <div className="text-center">
                  <button className="text-sm text-primary hover:underline">
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