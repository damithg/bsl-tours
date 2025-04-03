import React, { useState, useEffect } from 'react';
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
  Image,
  BookOpenText,
  Hotel,
  Phone,
  Heart,
} from 'lucide-react';
import { AsymmetricalGallery, GalleryImage } from '@/components/AsymmetricalGallery';
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
      <div className="relative pt-24 z-0">
        {tourData.heroImage && (
          <div className="absolute inset-0">
            <img 
              src={tourData.heroImage.large || tourData.heroImage.medium || tourData.heroImage.baseUrl} 
              alt={tourData.heroImage.alt || tourData.name}
              className="w-full h-[70vh] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
          </div>
        )}
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tourData.name}</h1>
            <p className="text-xl opacity-90 mb-6">{tourData.summary}</p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Calendar className="w-4 h-4 mr-2" />
                {tourData.duration}
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Heart className="w-4 h-4 mr-2" />
                Private Tour
              </span>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-white">
                From {tourData.currency} {tourData.startingFrom}
              </span>
            </div>
            
            <button className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md transition">
              Book This Tour
            </button>
          </div>
        </div>
      </div>
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-24 relative z-10">
        <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
          
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
          
          {/* Tour Tabs: Itinerary, Inclusions, Gallery, Map, Book */}
          <div className="mb-8">
            <Tabs defaultValue="itinerary" className="w-full">
          <TabsList className="mb-4 grid grid-cols-5 border-b border-b-muted w-full rounded-none bg-transparent h-auto">
            {[
              { id: "itinerary", label: "Itinerary", icon: <LayoutList className="w-4 h-4 mr-2" /> },
              { id: "inclusions", label: "Inclusions", icon: <List className="w-4 h-4 mr-2" /> },
              { id: "gallery", label: "Gallery", icon: <Image className="w-4 h-4 mr-2" /> },
              { id: "map", label: "Map", icon: <Map className="w-4 h-4 mr-2" /> },
              { id: "book", label: "Book Tour", icon: <Phone className="w-4 h-4 mr-2" /> }
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
                <Image className="w-5 h-5 mr-2 text-primary" />
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
                  <Image className="w-16 h-16 mx-auto text-gray-400 mb-4" />
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
          
          {/* Book Tour Tab Content */}
          <TabsContent value="book" className="mt-0">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                Book This Tour
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-blue-800">Tour Details</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Calendar className="w-4 h-4 text-blue-800 mr-2 mt-1" />
                        <div>
                          <span className="font-medium text-blue-800">Duration:</span>
                          <span className="ml-2">{tourData.duration}</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Hotel className="w-4 h-4 text-blue-800 mr-2 mt-1" />
                        <div>
                          <span className="font-medium text-blue-800">Accommodation:</span>
                          <span className="ml-2">Luxury hotels and resorts</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <BookOpenText className="w-4 h-4 text-blue-800 mr-2 mt-1" />
                        <div>
                          <span className="font-medium text-blue-800">Price:</span>
                          <span className="ml-2">{tourData.currency} {tourData.startingFrom} per person</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-green-800">Booking Information</h3>
                    <p className="text-green-800 mb-4">
                      Fill out the form to book this tour or request more information. Our team will get back to you within 24 hours.
                    </p>
                    <p className="text-sm text-green-700">
                      <span className="font-bold">Note:</span> Customization available for group size, dates, and accommodations.
                    </p>
                  </div>
                </div>
                
                <div>
                  <ContactForm 
                    tourName={tourData.name}
                    prefilledMessage={`I'm interested in the ${tourData.name} tour lasting ${tourData.duration}. Please provide more information.`}
                  />
                </div>
              </div>
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
  </main>
  </div>
  );
};

export default TestTourPage;