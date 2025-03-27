import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useQuery } from '@tanstack/react-query';
import { Destination } from '@shared/schema';

interface DestinationCardProps {
  destination: Destination;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

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

const DestinationCard = ({ destination, index, isActive, onClick }: DestinationCardProps) => {
  // Parse highlights if they exist
  const highlightItems = destination.highlights 
    ? safeJsonParse(destination.highlights, ['Wildlife Encounters', 'Luxury Accommodations', 'Guided Tours'])
    : ['Wildlife Encounters', 'Luxury Accommodations', 'Guided Tours'];

  return (
    <div 
      className={`flex flex-col transition-all duration-500 ease-in-out cursor-pointer rounded-3xl overflow-hidden
                 ${isActive ? 'col-span-1 md:col-span-2 row-span-1 md:row-span-2' : 'opacity-90 hover:opacity-100'}`}
      onClick={onClick}
    >
      <div className="relative w-full h-full aspect-[4/5] overflow-hidden group">
        {/* Image */}
        <img 
          src={destination.imageUrl} 
          alt={destination.name} 
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105
                    ${isActive ? 'brightness-90' : 'brightness-75 hover:brightness-90'}`}
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
          <div className={`transition-all duration-500 ${isActive ? 'mb-8' : 'mb-4'}`}>
            <h3 className={`font-['Playfair_Display'] font-bold leading-tight mb-2
                          ${isActive ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
              {destination.name}
            </h3>
            
            {isActive && (
              <div className="mt-3 space-y-4">
                <p className="text-white/90 max-w-md">
                  {destination.shortDescription || destination.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {highlightItems.slice(0, 3).map((highlight: string, idx: number) => (
                    <span key={idx} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {highlight}
                    </span>
                  ))}
                </div>

                <Link 
                  href={`/destination/${destination.slug}`} 
                  className="inline-flex items-center mt-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 
                           text-white font-medium py-2 px-5 rounded-full transition group"
                >
                  Explore Destination
                  <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>
          
          {/* Numbered index badge */}
          <div className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center 
                        bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
            {String(index+1).padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  );
};

export function ModernDestinationShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { formatPrice } = useCurrency();
  
  // Fetch destinations from API
  const { data: destinations, isLoading, error } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  // Filter featured destinations or use all if none are featured
  const featuredDestinations = destinations?.filter(d => d.featured) || [];
  const displayDestinations = featuredDestinations.length > 0 ? featuredDestinations : destinations || [];
  
  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row mb-12">
            <div className="lg:w-1/2">
              <div className="bg-white/10 h-16 rounded animate-pulse mb-4"></div>
              <div className="bg-white/10 h-16 rounded animate-pulse"></div>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <div className="bg-white/10 h-28 rounded animate-pulse mt-4 lg:mt-8"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="bg-white/10 h-80 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error || !displayDestinations.length) {
    return (
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-6">
            Discover Sri Lanka's Beauty
          </h2>
          <p className="text-white/80 mb-8">
            We're currently updating our destination information. Please check back soon to explore our featured destinations.
          </p>
          <Link href="/contact" className="inline-block bg-white text-black hover:bg-white/90 font-medium py-4 px-10 rounded-full transition">
            Contact Us
          </Link>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row mb-12">
          <div className="lg:w-1/2">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Discover the beauty of <br />Sri Lanka with Us
            </h2>
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <p className="text-lg text-white/80 mt-4 lg:mt-8">
              Experience the best of Sri Lanka with our luxury tour services. Our experienced guides, customizable packages, and commitment to customer satisfaction ensure an unforgettable journey.
            </p>
          </div>
        </div>
        
        {/* Grid of destinations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {displayDestinations.slice(0, 6).map((destination, index) => (
            <DestinationCard 
              key={destination.id}
              destination={destination}
              index={index}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        
        {/* Highlights Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          <div className="space-y-4">
            <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold">
              Experienced Guides
            </h3>
            <p className="text-white/80">
              Our local guides have extensive knowledge of Sri Lanka's history, culture, and hidden gems. They create personalized experiences that bring the island to life.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold">
              Customizable Packages
            </h3>
            <p className="text-white/80">
              Tailor your Sri Lanka journey according to your preferences and interests. Whether you're seeking cultural immersion, wildlife adventures, or beach relaxation, we craft the perfect itinerary.
            </p>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Link href="/contact" className="inline-block bg-white text-black hover:bg-white/90 font-medium py-4 px-10 rounded-full transition">
            Book Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ModernDestinationShowcase;