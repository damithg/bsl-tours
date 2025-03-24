import { useQuery } from "@tanstack/react-query";
import { Destination } from "@shared/schema";
import { useState, useRef } from "react";
import { LucideChevronLeft, LucideChevronRight, LucideRefreshCw } from "lucide-react";
import { queryClient } from "@/lib/queryClient";

const DestinationShowcase = () => {
  const queryKey = ['/api/destinations'];
  const { data: destinations, isLoading, error, refetch } = useQuery<Destination[]>({
    queryKey,
  });
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const checkScrollable = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    }
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -container.clientWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section id="destinations" className="py-20 bg-gradient-to-b from-[#0F4C81]/5 to-[#0F4C81]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Stunning Destinations</h2>
            <p className="text-lg text-[#333333]/80">Discover Sri Lanka's most breathtaking locations, where luxury and natural beauty combine for unforgettable experiences.</p>
          </div>
          
          <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar">
              {[...Array(6)].map((_, index) => (
                <div 
                  key={index} 
                  className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] relative overflow-hidden rounded-lg shadow-lg h-80 bg-gray-300 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="destinations" className="py-20 bg-gradient-to-b from-[#0F4C81]/5 to-[#0F4C81]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Stunning Destinations</h2>
            <p className="text-red-500">Failed to load destinations. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" className="py-20 bg-gradient-to-b from-[#0F4C81]/5 to-[#0F4C81]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Stunning Destinations</h2>
            <button 
              onClick={() => {
                // This will force a fresh fetch from the server
                queryClient.invalidateQueries({ queryKey });
              }}
              className="ml-3 mb-4 p-2 text-[#0F4C81] hover:text-[#0a325a] transition-colors rounded-full"
              aria-label="Refresh destinations"
              title="Refresh destinations"
            >
              <LucideRefreshCw size={20} />
            </button>
          </div>
          <p className="text-lg text-[#333333]/80">Discover Sri Lanka's most breathtaking locations, where luxury and natural beauty combine for unforgettable experiences.</p>
        </div>
        
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={scrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#0F4C81] rounded-full p-2 shadow-md -ml-4 transition ${
              !canScrollLeft ? "opacity-0 cursor-default" : "opacity-100 cursor-pointer"
            }`}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <LucideChevronLeft size={24} />
          </button>
          
          <button
            onClick={scrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#0F4C81] rounded-full p-2 shadow-md -mr-4 transition ${
              !canScrollRight ? "opacity-0 cursor-default" : "opacity-100 cursor-pointer"
            }`}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <LucideChevronRight size={24} />
          </button>
          
          {/* Scroll container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory hide-scrollbar"
            onScroll={checkScrollable}
          >
            {destinations?.map((destination) => (
              <div 
                key={destination.id} 
                className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start group relative overflow-hidden rounded-lg shadow-lg h-80"
              >
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-['Playfair_Display'] text-xl text-white font-semibold mb-2">{destination.name}</h3>
                  <p className="text-white/80 mb-4 max-w-xs">{destination.description}</p>
                  <a href="#" className="inline-flex items-center text-white hover:text-[#D4AF37] transition">
                    Explore <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationShowcase;
