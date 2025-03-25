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
  // For testing/development, we'll use hardcoded destinations since the API might not be available
  const mockDestinations: Destination[] = [
    {
      id: 1,
      name: "Sigiriya Rock Fortress",
      description: "Ancient rock fortress with frescoes and stunning views.",
      imageUrl: "https://images.unsplash.com/photo-1588428895011-8a3fb77e433a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 2,
      name: "Kandy",
      description: "Cultural capital and home to the Temple of the Sacred Tooth Relic.",
      imageUrl: "https://images.unsplash.com/photo-1586613835017-4748b1722780?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 3,
      name: "Galle Fort",
      description: "UNESCO World Heritage site with colonial architecture.",
      imageUrl: "https://images.unsplash.com/photo-1553858117-30fb7b89b809?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 4,
      name: "Yala National Park",
      description: "Famous for leopards and diverse wildlife.",
      imageUrl: "https://images.unsplash.com/photo-1607427215467-46804f9b8a8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 5,
      name: "Ella",
      description: "Mountain village with hiking trails and tea plantations.",
      imageUrl: "https://images.unsplash.com/photo-1586686556021-6eb7cb3ce1f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: false
    }
  ];

  // Disable API query for now and use mock data
  const { data: destinations, isLoading, error } = useQuery<Destination[]>({
    queryKey: ['destinations'],
    queryFn: async () => {
      // Simulate API call for testing
      return new Promise<Destination[]>((resolve) => {
        setTimeout(() => resolve(mockDestinations), 500);
      });
    },
    staleTime: Infinity // Never refetch this data
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
    <>
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 bg-primary">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1593693411515-c20261bcad6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Sri Lanka Map" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-6">
              Interactive Map
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore Sri Lanka's most captivating destinations and plan your perfect journey.
            </p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-2">Discover Sri Lanka</h2>
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
    </>
  );
};

export default DestinationMap;