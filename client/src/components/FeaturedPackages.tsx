import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useState, useRef } from "react";
import { LucideChevronLeft, LucideChevronRight, LucideRefreshCw, ChevronRight as LucideChevronRightArrow } from "lucide-react";
import { queryClient, API_BASE_URL } from "@/lib/queryClient";
import { AdaptiveImage } from "./ui/adaptive-image";
import { determineFocalPoint } from "@/lib/image-utils";
import { useCurrency } from "@/contexts/CurrencyContext";
import { COLORS } from "@/utils/colors";
import { Tag } from "@/components/ui/tag";

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
  // Use the API_BASE_URL constant for the featured tours endpoint
  const queryKey = [`${API_BASE_URL}/api/tours/featured`];
  const { data: strapiResponse, isLoading, error, refetch } = useQuery<StrapiResponse>({
    queryKey,
  });
  
  // Get the formatPrice function from the CurrencyContext
  const { formatPrice } = useCurrency();
  
  // The API response is the array of tours directly
  const tours = strapiResponse || [];
  // Debug code to verify data from Azure API
  console.log("Featured tours data:", strapiResponse);
  
  // Debug individual tour prices
  if (tours && tours.length > 0) {
    console.log("First tour pricing data:", {
      name: tours[0].name,
      startingFrom: tours[0].startingFrom,
      currency: tours[0].currency,
      type: typeof tours[0].startingFrom
    });
  }
  
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
      <div className="flex" style={{ color: COLORS.secondary }}>
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
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>Luxury Sri Lanka Tours</h2>
            <p className="text-lg text-gray-700/80">Each journey is tailor-made to reflect your preferences, with private guides, luxury accommodations, and unforgettable experiences.</p>
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
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>Luxury Sri Lanka Tours</h2>
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
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>Luxury Sri Lanka Tours</h2>
            <p className="text-lg text-gray-700/80 mb-4">Currently configuring our tours. Please check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>Luxury Sri Lanka Tours</h2>
          <p className="text-lg text-gray-700/80">Each journey is tailor-made to reflect your preferences, with private guides, luxury accommodations, and unforgettable experiences.</p>
        </div>
        
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={scrollLeft}
            style={{ color: COLORS.primary }}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md -ml-4 transition ${
              !canScrollLeft ? "opacity-0 cursor-default" : "opacity-100 cursor-pointer"
            }`}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <LucideChevronLeft size={24} />
          </button>
          
          <button
            onClick={scrollRight}
            style={{ color: COLORS.primary }}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md -mr-4 transition ${
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
                  // First try the new card structure, prioritizing medium size
                  if (tour.card?.image) {
                    // For cards, medium size is ideal (800x600)
                    if (tour.card.image.medium) return tour.card.image.medium;
                    // Fallback order if medium is not available
                    if (tour.card.image.small) return tour.card.image.small;
                    if (tour.card.image.large) return tour.card.image.large;
                    if (tour.card.image.baseUrl) return tour.card.image.baseUrl;
                  }
                  
                  // Try legacy cardImage as fallback, also prioritizing medium size
                  if (tour.cardImage) {
                    if (tour.cardImage.medium) return tour.cardImage.medium;
                    if (tour.cardImage.small) return tour.cardImage.small;
                    if (tour.cardImage.large) return tour.cardImage.large;
                    if (tour.cardImage.baseUrl) return tour.cardImage.baseUrl;
                  }
                  
                  // Try heroImage as last fallback
                  if (tour.heroImage) {
                    if (tour.heroImage.medium) return tour.heroImage.medium;
                    if (tour.heroImage.small) return tour.heroImage.small;
                    if (tour.heroImage.large) return tour.heroImage.large;
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
                      <div className="absolute top-4 right-4">
                        <Tag variant="duration">
                          {tour.duration}
                        </Tag>
                      </div>
                      {/* Use card.tags first, then fallback to tour.tags */}
                      {((tour.card?.tags && tour.card.tags.length > 0) || (tour.tags && tour.tags.length > 0)) && (
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {(tour.card?.tags || tour.tags || []).slice(0, 2).map((tag: string, i: number) => (
                            <Tag key={i} variant="scenic">
                              {tag}
                            </Tag>
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
                      <p className="text-gray-700/70 mb-4">
                        {tour.card?.body || tour.cardImage?.caption || tour.summary}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Starting from</span>
                          <div className="flex items-baseline">
                            <span style={{ color: COLORS.primary }} className="text-xl font-semibold">
                              {formatPrice(Number(tour.startingFrom) || 0, { currency: tour.currency || 'USD' })}
                            </span>
                            <span className="text-gray-500 text-sm ml-1.5">/ per person</span>
                          </div>
                        </div>
                        <Link 
                          href={`/tours/${tour.slug}`} 
                          style={{ backgroundColor: COLORS.primary }}
                          className="inline-flex items-center hover:bg-primary/90 text-white font-medium py-2 px-5 rounded-full transition group shadow-md"
                        >
                          Explore <LucideChevronRightArrow className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/tours" 
            style={{ backgroundColor: COLORS.primary }}
            className="inline-flex items-center hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            View All Tours
            <LucideChevronRightArrow className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
