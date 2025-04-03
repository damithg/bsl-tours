import React, { useState, useEffect } from 'react';

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
        
        // Call the API endpoint
        const response = await fetch('/api/tours/scenic-wonders-of-sri-lanka');
        
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
      
      {/* Itinerary */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tour Itinerary</h2>
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
      </div>
      
      {/* Inclusions */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">What's Included</h2>
        <ul className="list-disc pl-6">
          {tourData.inclusions.map((item, index) => (
            <li key={index} className="mb-1 text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
      
      {/* Exclusions */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">What's Not Included</h2>
        <ul className="list-disc pl-6">
          {tourData.exclusions.map((item, index) => (
            <li key={index} className="mb-1 text-gray-700">{item}</li>
          ))}
        </ul>
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