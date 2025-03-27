import { useState, useRef } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight, MapPin, ArrowRight, Globe, Star, Filter } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Destination } from '@shared/schema';
import { determineFocalPoint, DESTINATION_FOCAL_POINTS } from "@/lib/image-utils";
import { AdaptiveImage } from '@/components/ui/adaptive-image';

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

// Modern Dribbble-inspired card design
const DestinationCard = ({ destination, index }: DestinationCardProps) => {
  // Parse highlights if they exist
  const highlightItems: string[] = destination.highlights 
    ? safeJsonParse(destination.highlights, ['Wildlife', 'Culture', 'Adventure'])
    : ['Wildlife', 'Culture', 'Adventure'];
  
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="relative h-[280px] overflow-hidden">
        {destination.imageUrl ? (
          <div className="w-full h-full transition duration-700 group-hover:scale-110">
            <AdaptiveImage
              src={destination.imageUrl}
              alt={destination.name}
              focalPoint={DESTINATION_FOCAL_POINTS[destination.name] || determineFocalPoint(destination.imageUrl, destination.name)}
              containerClassName="w-full h-full"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Badge positioned in top right */}
        {destination.featured && (
          <div className="absolute top-4 right-4 bg-[#D4AF37]/90 text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
        )}
        
        {/* Destination number in top left */}
        <div className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center 
                     bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
          {String(index+1).padStart(2, '0')}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900">
            {destination.name}
          </h3>
        </div>
        
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{destination.region || 'Sri Lanka'}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {destination.shortDescription || destination.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {highlightItems.slice(0, 3).map((highlight: string, idx: number) => (
            <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
              {highlight}
            </span>
          ))}
        </div>
        
        <Link 
          href={`/destination/${destination.slug || destination.id}`} 
          className="inline-flex items-center text-[#0F4C81] font-medium hover:text-[#D4AF37] transition group"
        >
          Explore Destination
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

// Featured destination in hero section design
const FeaturedDestinationHero = ({ destination }: { destination: Destination }) => {
  return (
    <div className="relative overflow-hidden rounded-xl h-[480px] shadow-xl">
      {destination.imageUrl ? (
        <div className="w-full h-full">
          <AdaptiveImage
            src={destination.imageUrl}
            alt={destination.name}
            focalPoint={DESTINATION_FOCAL_POINTS[destination.name] || determineFocalPoint(destination.imageUrl, destination.name)}
            containerClassName="w-full h-full"
          />
        </div>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
          No Image Available
        </div>
      )}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <div className="bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm font-medium w-max mb-4">
          Featured Destination
        </div>
        <h2 className="font-['Playfair_Display'] text-4xl font-bold text-white mb-3">
          {destination.name}
        </h2>
        <p className="text-white/90 text-lg max-w-2xl mb-6">
          {destination.shortDescription || destination.description}
        </p>
        <Link 
          href={`/destination/${destination.slug || destination.id}`} 
          className="inline-block bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-8 rounded-full backdrop-blur-sm transition"
        >
          Explore {destination.name}
        </Link>
      </div>
    </div>
  );
};

export default function Destinations() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured' | 'popular'>('all');
  const filtersRef = useRef<HTMLDivElement>(null);
  
  // Fetch destinations from API
  const { data: destinations, isLoading, error } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });
  
  // Available regions
  const regions: string[] = destinations 
    ? Array.from(
        new Set(
          destinations
            .map(d => d.region)
            .filter((region): region is string => Boolean(region))
        )
      )
    : [];
  
  // Filter destinations based on selected criteria
  const filteredDestinations = destinations?.filter(d => {
    // Region filter
    const matchesRegion = selectedRegion ? d.region === selectedRegion : true;
    
    // Type filter (all, featured, popular)
    const matchesType = 
      activeFilter === 'all' ? true : 
      activeFilter === 'featured' ? d.featured : 
      false; // We can add 'popular' flag later if needed
    
    return matchesRegion && matchesType;
  }) || [];
  
  // Get a featured destination for the hero section
  const featuredDestination = destinations?.find(d => d.featured) || 
                            (destinations && destinations.length > 0 ? destinations[0] : null);
  
  // Loading state
  if (isLoading) {
    return (
      <main className="pt-24 pb-16 bg-[#F8F8F8]">
        <div className="container mx-auto px-4">
          {/* Hero section loading state */}
          <div className="bg-gray-200 h-[480px] rounded-xl animate-pulse mb-16"></div>
          
          {/* Filters loading state */}
          <div className="flex justify-between items-center mb-12">
            <div className="bg-gray-200 h-10 w-40 rounded animate-pulse"></div>
            <div className="flex gap-3">
              <div className="bg-gray-200 h-10 w-28 rounded-full animate-pulse"></div>
              <div className="bg-gray-200 h-10 w-28 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Grid loading state */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 h-[400px] rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </main>
    );
  }
  
  // Error state
  if (error || !destinations || destinations.length === 0) {
    return (
      <main className="pt-24 pb-16 bg-[#F8F8F8]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-['Playfair_Display'] text-4xl font-bold mb-6 text-[#0F4C81]">
            Destinations
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're currently updating our destination information. Please check back soon to explore our featured destinations.
          </p>
          <Link href="/contact" className="inline-block bg-[#0F4C81] text-white hover:bg-opacity-90 font-medium py-3 px-8 rounded-full transition">
            Contact Us
          </Link>
        </div>
      </main>
    );
  }
  
  return (
    <main className="pt-24 pb-16 bg-[#F8F8F8]">
      <div className="container mx-auto px-4">
        {/* Hero section with featured destination */}
        {featuredDestination && (
          <div className="mb-16">
            <FeaturedDestinationHero destination={featuredDestination} />
          </div>
        )}
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4 text-[#0F4C81]">
            Discover Sri Lanka
          </h1>
          <p className="text-gray-600 text-lg">
            Explore our curated selection of destinations across Sri Lanka - from ancient cultural
            sites to pristine beaches and wildlife sanctuaries.
          </p>
        </div>
        
        {/* Filters section */}
        <div className="sticky top-20 z-10 bg-[#F8F8F8] py-4 mb-8" ref={filtersRef}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Type filters */}
            <div className="flex gap-3">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition
                          ${activeFilter === 'all' 
                            ? 'bg-[#0F4C81] text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
              >
                <Globe className="w-4 h-4" />
                All Destinations
              </button>
              <button
                onClick={() => setActiveFilter('featured')}
                className={`px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition
                          ${activeFilter === 'featured' 
                            ? 'bg-[#0F4C81] text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
              >
                <Star className="w-4 h-4" />
                Featured
              </button>
            </div>
            
            {/* Region filter dropdown */}
            {regions.length > 0 && (
              <div className="relative group">
                <button
                  className="px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition
                           bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                >
                  <Filter className="w-4 h-4" />
                  {selectedRegion ? `Region: ${selectedRegion}` : 'Filter by Region'}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden hidden group-hover:block z-20">
                  <div className="p-2">
                    <button
                      onClick={() => setSelectedRegion(null)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition
                                ${!selectedRegion ? 'font-medium text-[#0F4C81]' : ''}`}
                    >
                      All Regions
                    </button>
                    {regions.map((region) => (
                      <button
                        key={region}
                        onClick={() => setSelectedRegion(region)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition
                                  ${selectedRegion === region ? 'font-medium text-[#0F4C81]' : ''}`}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Destinations grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">No destinations found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {selectedRegion 
                ? `We don't have any destinations in ${selectedRegion} matching your current filters. Please try different criteria.`
                : 'No destinations match your current filters. Please try different criteria.'}
            </p>
            <button
              onClick={() => {
                setSelectedRegion(null);
                setActiveFilter('all');
              }}
              className="mt-4 px-5 py-2 bg-[#0F4C81] text-white rounded-full text-sm font-medium hover:bg-opacity-90 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}