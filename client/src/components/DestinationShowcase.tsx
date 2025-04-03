import { useQuery } from "@tanstack/react-query";
import { Destination } from "@shared/schema";
import { useState, useRef, useEffect } from "react";
import { LucideChevronLeft, LucideChevronRight, LucideRefreshCw } from "lucide-react";
import { queryClient, getQueryFn } from "@/lib/queryClient";
import { AdaptiveImage } from "./ui/adaptive-image";
import { determineFocalPoint, DESTINATION_FOCAL_POINTS } from "@/lib/image-utils";

const DestinationShowcase = () => {
  const queryKey = ['/api/destinations'];
  // Debug code (temporarily hidden)
  // console.log("DestinationShowcase mounted");

  const { data: destinations, isLoading, error, refetch } = useQuery<Destination[]>({
    queryKey,
    queryFn: getQueryFn({ on401: "throw" }),
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

  // Handle empty destinations array
  if (!destinations || destinations.length === 0) {
    return (
      <section id="destinations" className="py-20 bg-gradient-to-b from-[#0F4C81]/5 to-[#0F4C81]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Stunning Destinations</h2>
            <p className="text-lg text-[#333333]/80 mb-4">Currently configuring our destinations. Please check back soon!</p>
            <button 
              onClick={() => {
                // Force a refresh
                queryClient.invalidateQueries({ queryKey });
              }}
              className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition flex items-center mx-auto"
            >
              <LucideRefreshCw size={18} className="mr-2" /> Refresh Destinations
            </button>
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
          <div className="mt-6">
            <a href="/destinations" className="inline-block bg-[#0F4C81] hover:bg-[#0a325a] text-white font-medium py-2 px-6 rounded-full transition">
              View All Destinations
            </a>
          </div>
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
            {destinations.map((destination) => {
              // Debug code (temporarily hidden)
              // console.log("full destination:", destination);

              return (
                <div
                  key={destination.id}
                  className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start group relative overflow-hidden rounded-lg shadow-lg h-80"
                >
                  {((destination as any).card?.image?.publicId || (destination as any).images?.card || destination.imageUrl || ((destination as any).heroImage && (destination as any).heroImage.publicId)) ? (
                    <div className="w-full h-full transition duration-700 group-hover:scale-110">
                      <AdaptiveImage
                        src={(destination as any).card?.image?.publicId ? 
                             `https://res.cloudinary.com/drsjp6bqz/image/upload/${(destination as any).card.image.publicId}` :
                             (destination as any).images?.card || 
                             destination.imageUrl || 
                             ((destination as any).heroImage && (destination as any).heroImage.publicId ? 
                               `https://res.cloudinary.com/drsjp6bqz/image/upload/${(destination as any).heroImage.publicId}` : 
                               '')}
                        alt={(destination as any).card?.image?.alt || destination.name}
                        focalPoint={DESTINATION_FOCAL_POINTS[destination.name] || determineFocalPoint(
                          (destination as any).card?.image?.publicId ? 
                          `https://res.cloudinary.com/drsjp6bqz/image/upload/${(destination as any).card.image.publicId}` :
                          (destination as any).images?.card || destination.imageUrl || 
                          ((destination as any).heroImage ? `https://res.cloudinary.com/drsjp6bqz/image/upload/${(destination as any).heroImage.publicId}` : ''), 
                          destination.name
                        )}
                        imageClassName="transition duration-700 group-hover:scale-110"
                        containerClassName="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 transition duration-700 group-hover:scale-110">
                      No Image Available
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="font-['Playfair_Display'] text-xl text-white font-semibold mb-2">
                      {(destination as any).card?.title || destination.name || 'Destination'}
                    </h3>
                    <p className="text-white/80 mb-4 max-w-xs">
                      {(destination as any).card?.subtitle || 
                       destination.excerpt || 
                       destination.shortDescription || 
                       destination.description || 
                       'Description not available'}
                    </p>
                    <a href={`/destination/${destination.slug || destination.id}`} className="inline-flex items-center text-white hover:text-[#D4AF37] transition">
                      Explore <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationShowcase;
