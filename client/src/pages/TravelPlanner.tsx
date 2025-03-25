import React from 'react';
import { useQuery } from '@tanstack/react-query';
import TravelRoutePlanner, { RouteDestination } from '../components/TravelRoutePlanner';
import { API_BASE_URL } from '../lib/queryClient';

// Define Destination type locally to avoid import errors
interface Destination {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  featured: boolean;
}

const TravelPlanner = () => {
  // For testing/development, we'll use hardcoded destinations
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
      name: "Colombo",
      description: "Sri Lanka's vibrant capital city with colonial architecture and modern amenities.",
      imageUrl: "https://images.unsplash.com/photo-1575994532957-15b093930c7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 4,
      name: "Galle Fort",
      description: "UNESCO World Heritage site with colonial architecture.",
      imageUrl: "https://images.unsplash.com/photo-1586450463118-8d0cddab713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 5,
      name: "Yala National Park",
      description: "Famous for leopards and diverse wildlife.",
      imageUrl: "https://images.unsplash.com/photo-1607427215467-46804f9b8a8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 6,
      name: "Ella",
      description: "Mountain village with hiking trails and tea plantations.",
      imageUrl: "https://images.unsplash.com/photo-1586686556021-6eb7cb3ce1f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 7,
      name: "Trincomalee",
      description: "Port city with beautiful beaches and natural harbors.",
      imageUrl: "https://images.unsplash.com/photo-1586686460175-794e0662cc3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 8,
      name: "Anuradhapura",
      description: "Ancient city with well-preserved ruins and sacred Buddhist sites.",
      imageUrl: "https://images.unsplash.com/photo-1589809822035-40385849e9e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 9,
      name: "Nuwara Eliya",
      description: "Hill country with tea plantations and cool climate.",
      imageUrl: "https://images.unsplash.com/photo-1546708973-b339540485b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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

  // Convert destinations to route destinations format
  const routeDestinations: RouteDestination[] = React.useMemo(() => {
    if (!destinations) return [];
    return destinations.map(dest => ({
      id: dest.id.toString(),
      name: dest.name,
      description: dest.description,
      imageUrl: dest.imageUrl
    }));
  }, [destinations]);

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
    <div className="container mx-auto px-4 pt-20 pb-8">
      <h1 className="text-4xl font-bold text-center mb-2">Custom Travel Planner</h1>
      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Create your own custom travel itinerary by dragging and dropping destinations to build your perfect 
        Sri Lanka experience. Adjust the number of days at each location and request a personalized tour.
      </p>
      
      <div className="mb-8 bg-primary/5 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"></path>
              <rect x="3" y="3" width="18" height="4" rx="2"></rect>
              <path d="M5 15v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"></path>
            </svg>
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">How It Works</h3>
            <p className="text-gray-600">
              Drag destinations from the available list to your route panel. Reorder them to create your 
              perfect journey sequence, and adjust how many days you'd like at each location. When you're 
              satisfied, submit your custom plan to our travel consultants.
            </p>
          </div>
        </div>
      </div>
      
      {routeDestinations.length > 0 ? (
        <TravelRoutePlanner availableDestinations={routeDestinations} />
      ) : (
        <div className="text-center py-12">
          <p>No destinations available for planning.</p>
        </div>
      )}
      
      <div className="mt-16 bg-primary/5 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Need Help Planning?</h2>
        <p className="mb-4">
          Our luxury tours cover all of Sri Lanka's most fascinating destinations. If you prefer,
          our travel experts can help you design the perfect itinerary based on your preferences.
        </p>
        <p className="mb-6">
          Whether you're interested in cultural heritage, wildlife safaris, or beachside relaxation, 
          our experienced travel consultants are ready to assist.
        </p>
        <div className="flex justify-center">
          <a 
            href="/contact" 
            className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            Contact Our Experts
          </a>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanner;