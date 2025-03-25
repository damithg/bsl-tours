import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { TourPackage } from "@shared/schema";
import { useState, useRef } from "react";
import { LucideChevronLeft, LucideChevronRight, LucideRefreshCw } from "lucide-react";
import { queryClient } from "@/lib/queryClient";

const FeaturedPackages = () => {
  const queryKey = ['/api/tour-packages/featured'];
  const { data: packages, isLoading, error, refetch } = useQuery<TourPackage[]>({
    queryKey,
  });
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Format rating to display as stars (50 = 5 stars)
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

  const formatRating = (rating: number | null) => {
    if (rating === null || rating === undefined) return null;
    
    // Ensure rating is a valid number
    const validRating = Number.isFinite(rating) ? rating : 0;
    
    // Ensure we don't exceed 5 stars or go below 0
    const clampedRating = Math.max(0, Math.min(50, validRating));
    
    const fullStars = Math.floor(clampedRating / 10);
    const hasHalfStar = clampedRating % 10 >= 5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    // Create arrays safely
    const fullStarsArray = fullStars > 0 ? Array(fullStars).fill(null) : [];
    const emptyStarsArray = emptyStars > 0 ? Array(emptyStars).fill(null) : [];
    
    return (
      <div className="text-[#D4AF37] flex">
        {fullStarsArray.map((_, i) => (
          <i key={`full-${i}`} className="fas fa-star"></i>
        ))}
        {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
        {emptyStarsArray.map((_, i) => (
          <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section id="packages" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Luxury Tour Packages</h2>
            <p className="text-lg text-[#333333]/80">Each journey is tailor-made to reflect your preferences, with private guides, luxury accommodations, and unforgettable experiences.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-[#F8F5F0] rounded-lg overflow-hidden shadow-lg animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="flex items-center mb-4">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-300 rounded w-12"></div>
                      <div className="h-5 bg-gray-300 rounded w-20"></div>
                    </div>
                    <div className="h-8 bg-gray-300 rounded w-28"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="packages" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Luxury Tour Packages</h2>
            <p className="text-red-500">Failed to load packages. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // Handle empty packages array
  if (!packages || packages.length === 0) {
    return (
      <section id="packages" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Luxury Tour Packages</h2>
            <p className="text-lg text-[#333333]/80 mb-4">Currently configuring our tour packages. Please check back soon!</p>
            <button 
              onClick={() => {
                // Force a refresh
                queryClient.invalidateQueries({ queryKey });
              }}
              className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition flex items-center mx-auto"
            >
              <LucideRefreshCw size={18} className="mr-2" /> Refresh Packages
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Luxury Tour Packages</h2>
            <button 
              onClick={() => {
                // This will force a fresh fetch from the server
                queryClient.invalidateQueries({ queryKey });
              }}
              className="ml-3 mb-4 p-2 text-[#0F4C81] hover:text-[#0a325a] transition-colors rounded-full"
              aria-label="Refresh packages"
              title="Refresh packages"
            >
              <LucideRefreshCw size={20} />
            </button>
          </div>
          <p className="text-lg text-[#333333]/80">Each journey is tailor-made to reflect your preferences, with private guides, luxury accommodations, and unforgettable experiences.</p>
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
            {packages.map((pkg) => (
              <div 
                key={pkg.id} 
                className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start bg-[#F8F5F0] rounded-lg overflow-hidden shadow-lg transition transform hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="relative h-64 flex items-center justify-center overflow-hidden">
                  {pkg.imageUrl ? (
                    <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover object-center" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image Available</div>
                  )}
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-sm font-semibold py-1 px-3 rounded-full">
                    {pkg.duration} Days
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">{pkg.title}</h3>
                  <div className="flex items-center mb-4">
                    {formatRating(pkg.rating)}
                    <span className="text-sm text-gray-500 ml-2">{pkg.rating ? (pkg.rating / 10) : 0} ({pkg.reviewCount || 0} reviews)</span>
                  </div>
                  <p className="text-[#333333]/70 mb-4">{pkg.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">From</span>
                      <span className="text-[#0F4C81] text-xl font-semibold">${pkg.price?.toLocaleString() || 0}</span>
                      <span className="text-gray-500 text-sm">per person</span>
                    </div>
                    <Link href={pkg.slug ? `/tour/${pkg.slug}` : `/tour-packages/${pkg.id}`} className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link href="/tour-packages" className="inline-flex items-center border-2 border-[#0F4C81] text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white font-medium py-3 px-8 rounded-md transition">
            View All Packages
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
