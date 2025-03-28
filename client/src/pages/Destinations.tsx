import { useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, MapPin, Calendar, Users } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Destination } from '@shared/schema';

// Helper function to safely parse JSON strings
const safeJsonParse = (jsonString: string | null | undefined, fallback: any = null) => {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return fallback;
  }
};

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

const DestinationCard = ({ destination, index }: DestinationCardProps) => {
  // Parse highlights if they exist
  const highlightItems = destination.highlights 
    ? safeJsonParse(destination.highlights, ['Wildlife', 'Culture', 'Adventure'])
    : ['Wildlife', 'Culture', 'Adventure'];
  
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={destination.imageUrl} 
          alt={destination.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {destination.featured && (
          <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-2 text-gray-900">
          {destination.name}
        </h3>
        
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{destination.region || 'Sri Lanka'}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {destination.shortDescription || destination.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {highlightItems.slice(0, 3).map((highlight, idx) => (
            <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
              {highlight}
            </span>
          ))}
        </div>
        
        <Link 
          href={`/destination/${destination.slug || destination.id}`} 
          className="inline-flex items-center text-primary font-medium hover:underline group"
        >
          Explore Destination
          <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default function Destinations() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const { formatPrice } = useCurrency();
  
  // Fetch destinations from API
  const { data: destinations, isLoading, error } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });
  
  // Available regions
  const regions = destinations 
    ? [...new Set(destinations.map(d => d.region).filter(Boolean))]
    : [];
  
  // Filter destinations based on selected region
  const filteredDestinations = destinations?.filter(d => 
    selectedRegion ? d.region === selectedRegion : true
  ) || [];
  
  // Loading state
  if (isLoading) {
    return (
      <main className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-10">
            <div className="bg-gray-200 h-12 w-1/2 rounded animate-pulse mb-4"></div>
            <div className="bg-gray-200 h-24 rounded animate-pulse"></div>
          </div>
          
          <div className="flex flex-wrap mb-8 gap-2 justify-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 h-10 w-28 rounded-full animate-pulse"></div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 h-96 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </main>
    );
  }
  
  // Error state
  if (error || !destinations) {
    return (
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-['Playfair_Display'] text-4xl font-bold mb-6">
            Destinations
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're currently updating our destination information. Please check back soon to explore our featured destinations.
          </p>
          <Link href="/contact" className="inline-block bg-primary text-white hover:bg-primary/90 font-medium py-3 px-8 rounded-full transition">
            Contact Us
          </Link>
        </div>
      </main>
    );
  }
  
  return (
    <main className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">
            Discover Sri Lanka
          </h1>
          <p className="text-gray-600 text-lg">
            Explore our curated selection of destinations across Sri Lanka - from ancient cultural
            sites to pristine beaches and wildlife sanctuaries. Each destination offers unique
            experiences that showcase the island's incredible diversity.
          </p>
        </div>
        
        {/* Region filter */}
        {regions.length > 0 && (
          <div className="flex flex-wrap mb-10 gap-2 justify-center">
            <button
              onClick={() => setSelectedRegion(null)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition
                        ${!selectedRegion 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              All Regions
            </button>
            {regions.map((region) => region && (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition
                          ${selectedRegion === region 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {region}
              </button>
            ))}
          </div>
        )}
        
        {/* Destinations grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium mb-2">No destinations found</h3>
            <p className="text-gray-600">
              {selectedRegion 
                ? `We don't have any destinations in ${selectedRegion} yet. Please check other regions.`
                : 'We are currently adding new destinations. Please check back soon!'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}