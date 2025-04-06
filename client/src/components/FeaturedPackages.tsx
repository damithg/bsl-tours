import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useState, useRef } from "react";
import { LucideChevronLeft, LucideChevronRight, LucideRefreshCw } from "lucide-react";
import { queryClient } from "@/lib/queryClient";
import { AdaptiveImage } from "./ui/adaptive-image";
import { determineFocalPoint } from "@/lib/image-utils";
import { useCurrency } from "@/contexts/CurrencyContext";

// Strapi API Tour interface
interface StrapiTour {
  id: number;
  name: string;
  slug: string;
  featured: boolean;
  summary: string;
  duration: string;
  startingFrom: number;
  currency: string;
  // Optional fields
  documentId?: string;
  inclusions?: string[];
  exclusions?: string[];
  accommodationInfo?: string;
  operatedBy?: string;
  category?: string;
  tags?: string[];
  minGroupSize?: number;
  maxGroupSize?: number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  // New card structure
  card?: {
    image?: {
      publicId?: string;
      alt?: string;
      caption?: string;
      orientation?: string;
      baseUrl?: string;
      small?: string;
      medium?: string;
      large?: string;
    };
    header?: string;
    heading?: string;
    body?: string;
    tags?: string[];
  };
  // Legacy structure
  heroImage?: {
    publicId?: string;
    alt?: string;
    caption?: string;
    orientation?: string;
    baseUrl?: string;
    small?: string;
    medium?: string;
    large?: string;
  };
  cardImage?: {
    publicId?: string;
    alt?: string;
    caption?: string;
    orientation?: string;
    baseUrl?: string;
    small?: string;
    medium?: string;
    large?: string;
  };
  galleryImages?: Array<{
    publicId?: string;
    alt?: string;
    caption?: string;
    orientation?: string;
    baseUrl?: string;
    small?: string;
    medium?: string;
    large?: string;
  }>;
  pricingTiers?: Array<{
    label: string;
    price: number;
    description: string;
  }>;
  optionalAddOns?: Array<{
    title: string;
    price: number;
    description: string;
  }>;
  relatedDestinations?: Array<{
    name: string;
    slug: string;
  }>;
  reviews?: Array<{
    reviewer: string;
    country: string;
    comment: string;
    rating: number;
  }>;
  languagesSupported?: string[];
  routeOverview?: string;
  bookingUrl?: string;
  guideProfileUrl?: string;
  departureDates?: string[];
  bookingWindow?: string;
  mapEmbedUrl?: string;
}

// The API returns the tour data directly as an array, not wrapped in a data property
type StrapiResponse = StrapiTour[];

const FeaturedPackages = () => {
  // Use the correct API endpoint for featured tours
  const queryKey = ['/api/tours/featured'];
  const { data: strapiResponse, isLoading, error, refetch } = useQuery<StrapiResponse>({
    queryKey,
  });
  
  // Get the formatPrice function from the CurrencyContext
  const { formatPrice } = useCurrency();
  
  // The API response is the array of tours directly
  const tours = strapiResponse || [];
  // Debug code (temporarily hidden)
  // console.log("Featured tours data:", tours);
  
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
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Luxury Sri Lanka Tours</h2>
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
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Luxury Sri Lanka Tours</h2>
            <p className="text-red-500">Failed to load tours. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // Handle empty tours array
  if (!tours || tours.length === 0) {
    return (
      <section id="packages" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Luxury Sri Lanka Tours</h2>
            <p className="text-lg text-[#333333]/80 mb-4">Currently configuring our tours. Please check back soon!</p>
            <button 
              onClick={() => {
                // Force a refresh
                queryClient.invalidateQueries({ queryKey });
              }}
              className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition flex items-center mx-auto"
            >
              <LucideRefreshCw size={18} className="mr-2" /> Refresh Tours
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
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Luxury Sri Lanka Tours</h2>
            <button 
              onClick={() => {
                // This will force a fresh fetch from the server
                queryClient.invalidateQueries({ queryKey });
              }}
              className="ml-3 mb-4 p-2 text-[#0F4C81] hover:text-[#0a325a] transition-colors rounded-full"
              aria-label="Refresh tours"
              title="Refresh tours"
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
            {tours.map((tour: StrapiTour) => {
                // Get the image URL from cardImage or heroImage, prioritizing medium size (800x600)
                const getImageUrl = () => {
                  // First try the new card structure
                  if (tour.card?.image) {
                    if (tour.card.image.medium) return tour.card.image.medium;
                    if (tour.card.image.large) return tour.card.image.large;
                    if (tour.card.image.small) return tour.card.image.small;
                    if (tour.card.image.baseUrl) return tour.card.image.baseUrl;
                  }
                  
                  // Try legacy cardImage as fallback
                  if (tour.cardImage) {
                    if (tour.cardImage.medium) return tour.cardImage.medium;
                    if (tour.cardImage.large) return tour.cardImage.large;
                    if (tour.cardImage.small) return tour.cardImage.small;
                    if (tour.cardImage.baseUrl) return tour.cardImage.baseUrl;
                  }
                  
                  // Try heroImage as last fallback
                  if (tour.heroImage) {
                    if (tour.heroImage.medium) return tour.heroImage.medium;
                    if (tour.heroImage.large) return tour.heroImage.large;
                    if (tour.heroImage.small) return tour.heroImage.small;
                    if (tour.heroImage.baseUrl) return tour.heroImage.baseUrl;
                  }
                  
                  // Last resort fallback
                  return "/images/tours/scenic-sri-lanka-hero.jpg";
                };
                
                // Extract average rating from reviews
                const reviews = tour.reviews || [];
                const averageRating = reviews.length > 0 
                  ? reviews.reduce((acc: number, review: {rating: number}) => acc + review.rating, 0) / reviews.length 
                  : null;
              
                return (
                  <div 
                    key={tour.id} 
                    className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start bg-[#F8F5F0] rounded-lg overflow-hidden shadow-lg transition transform hover:scale-[1.02] hover:shadow-xl"
                  >
                    <div className="relative h-64 flex items-center justify-center overflow-hidden">
                      <img 
                        src={getImageUrl()} 
                        alt={tour.card?.image?.alt || tour.cardImage?.alt || tour.heroImage?.alt || tour.name} 
                        className="w-full h-full object-cover object-center" 
                      />
                      <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-sm font-semibold py-1 px-3 rounded-full">
                        {tour.duration}
                      </div>
                      {/* Use card.tags first, then fallback to tour.tags */}
                      {((tour.card?.tags && tour.card.tags.length > 0) || (tour.tags && tour.tags.length > 0)) && (
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {(tour.card?.tags || tour.tags || []).slice(0, 1).map((tag: string, i: number) => (
                            <span 
                              key={i}
                              className="bg-black/50 backdrop-blur-sm text-white text-[0.9rem] py-0.5 px-3 rounded-md leading-6"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">
                        {tour.card?.heading || tour.card?.header || tour.name}
                      </h3>
                      <div className="flex items-center mb-4">
                        {formatRating(averageRating || 5)}
                        <span className="text-sm text-gray-500 ml-2">
                          {averageRating ? averageRating.toFixed(1) : '5.0'} 
                          ({reviews.length || 0} {reviews.length === 1 ? 'review' : 'reviews'})
                        </span>
                      </div>
                      <p className="text-[#333333]/70 mb-4">
                        {tour.card?.body || tour.cardImage?.caption || tour.summary}
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-500">From</span>
                          <span className="text-[#0F4C81] text-xl font-semibold">
                            {formatPrice(tour.startingFrom || 0, { currency: tour.currency || 'USD' })}
                          </span>
                          <span className="text-gray-500 text-sm">per person</span>
                        </div>
                        <Link href={`/tours/${tour.slug}`} className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition">View Details</Link>
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link href="/tours" className="inline-flex items-center border-2 border-[#0F4C81] text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white font-medium py-3 px-8 rounded-md transition">
            View All Tours
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
