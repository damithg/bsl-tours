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
  LayoutList 
} from 'lucide-react';

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
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
}

const TestTourPage: React.FC = () => {
  const [tourData, setTourData] = useState<TourData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{tourData.name}</h1>
      
      {/* Hero Image */}
      <div className="mb-8 rounded-lg overflow-hidden">
        {tourData.heroImage && (
          <img 
            src={tourData.heroImage.medium || tourData.heroImage.baseUrl} 
            alt={tourData.heroImage.alt || tourData.name}
            className="w-full h-auto"
          />
        )}
      </div>
      
      {/* Tour Summary */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between mb-4">
          <div>
            <span className="text-gray-600 block">Duration:</span>
            <span className="font-semibold">{tourData.duration}</span>
          </div>
          <div>
            <span className="text-gray-600 block">Starting From:</span>
            <span className="font-semibold">{tourData.currency} {tourData.startingFrom}</span>
          </div>
        </div>
        <p className="text-gray-700">{tourData.summary}</p>
      </div>
      
      {/* Tour Tabs: Itinerary, Inclusions, Map */}
      <div className="mb-8">
        <Tabs defaultValue="itinerary" className="w-full">
          <TabsList className="mb-4 grid grid-cols-3 border-b border-b-muted w-full rounded-none bg-transparent h-auto">
            {[
              { id: "itinerary", label: "Itinerary", icon: <LayoutList className="w-4 h-4 mr-2" /> },
              { id: "inclusions", label: "Inclusions", icon: <List className="w-4 h-4 mr-2" /> },
              { id: "map", label: "Map", icon: <Map className="w-4 h-4 mr-2" /> }
            ].map((tab) => (
              <TabsTrigger 
                key={`tab-${tab.id}`} 
                value={tab.id} 
                className="py-2 text-sm md:text-base data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* Itinerary Tab Content */}
          <TabsContent value="itinerary" className="mt-0">
            {tourData.itinerary.map((day) => (
              <div key={day.day} className="bg-white shadow-md rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold mb-2">Day {day.day}: {day.title}</h3>
                <p className="text-gray-700 mb-4">{day.description}</p>
                {day.image && (
                  <img 
                    src={day.image.medium || day.image.baseUrl} 
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
          
          {/* Map Tab Content */}
          <TabsContent value="map" className="mt-0">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <p className="text-gray-700">Map information will be displayed here.</p>
              <p className="text-sm text-gray-500 mt-2">Coming soon: Interactive tour route map</p>
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
  );
};

export default TestTourPage;