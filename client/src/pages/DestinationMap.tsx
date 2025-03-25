import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../lib/queryClient';
import InteractiveMap from '../components/InteractiveMap';

// Define Destination type locally to avoid import errors
interface Destination {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  featured: boolean;
}

const DestinationMap = () => {
  const { data: destinations, isLoading, error } = useQuery<Destination[]>({
    queryKey: ['destinations'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/destinations`);
      if (!res.ok) {
        throw new Error('Failed to fetch destinations');
      }
      return res.json();
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading destinations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Destinations</h2>
          <p className="text-lg mb-4">We encountered an issue while fetching destination data.</p>
          <p>Please try again later or contact our support team.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-2">Discover Sri Lanka</h1>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Explore the interactive map of Sri Lanka to discover the island's most stunning destinations. 
        From ancient temples to pristine beaches, each location offers a unique experience.
      </p>
      
      {destinations && destinations.length > 0 ? (
        <InteractiveMap destinations={destinations} />
      ) : (
        <div className="text-center py-12">
          <p>No destinations found.</p>
        </div>
      )}
      
      <div className="mt-16 bg-primary/5 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Plan Your Journey</h2>
        <p className="mb-4">
          Our luxury tours cover all of Sri Lanka's most fascinating destinations. Each tour is 
          customizable to your preferences, allowing you to create the perfect itinerary.
        </p>
        <p className="mb-6">
          Whether you're interested in cultural heritage, wildlife safaris, or beachside relaxation, 
          our experienced travel consultants can help design your dream Sri Lankan adventure.
        </p>
        <div className="flex justify-center">
          <a 
            href="/tour-packages" 
            className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            Browse Tour Packages
          </a>
        </div>
      </div>
    </div>
  );
};

export default DestinationMap;