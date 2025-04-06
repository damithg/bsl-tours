import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useCurrency } from "../contexts/CurrencyContext";

// Strapi API Tour interface
interface StrapiTour {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  summary: string;
  duration: string;
  startingFrom: number;
  currency: string;
  inclusions: string[];
  exclusions: string[];
  accommodationInfo: string;
  operatedBy: string;
  category: string;
  tags: string[];
  minGroupSize: number;
  maxGroupSize: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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
    id?: number;
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
    id?: number;
    publicId?: string;
    alt?: string;
    caption?: string;
    orientation?: string;
    baseUrl?: string;
    small?: string;
    medium?: string;
    large?: string;
  };
  reviews?: {
    id: number;
    reviewer: string;
    country: string;
    comment: string;
    rating: number;
  }[];
}

interface StrapiResponse {
  data: StrapiTour[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const TourPackages = () => {
  const { data: strapiResponse, isLoading, error } = useQuery<StrapiResponse>({
    queryKey: ['https://graceful-happiness-10e3a700b4.strapiapp.com/api/tours?populate=*'],
  });
  
  const tours = strapiResponse?.data || [];
  const { formatPrice } = useCurrency();

  // Format rating to display as stars (5 = 5 stars)
  const formatRating = (rating: number | null) => {
    if (rating === null || rating === undefined) {
      return (
        <div className="text-gray-400 flex">
          <span>No ratings yet</span>
        </div>
      );
    }
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="text-[#D4AF37] flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <i key={`full-${i}`} className="fas fa-star"></i>
        ))}
        {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
      </div>
    );
  };

  return (
    <main>
      <section className="relative pt-28 pb-20 bg-[#0F4C81]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
            alt="Sri Lanka Tea Plantations" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-6">
              Luxury Sri Lanka Tour Packages
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover our handcrafted luxury experiences designed to showcase the best of Sri Lanka's natural beauty and cultural heritage.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-4">Explore Our Packages</h2>
            <p className="text-lg text-[#333333]/80">Each journey is tailor-made to reflect your preferences, with private guides, luxury accommodations, and unforgettable experiences.</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
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
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Failed to load tours. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => {
                // Get the image URL from cardImage or heroImage, with fallbacks
                const getImageUrl = () => {
                  // First try the new card structure, prioritizing medium size for cards
                  if (tour.card?.image) {
                    // For cards, medium size is ideal (800x600)
                    if (tour.card.image.medium) return tour.card.image.medium;
                    // Fallback order if medium is not available
                    if (tour.card.image.small) return tour.card.image.small;
                    if (tour.card.image.large) return tour.card.image.large;
                    if (tour.card.image.baseUrl) return tour.card.image.baseUrl;
                    if (tour.card.image.publicId) {
                      return `https://res.cloudinary.com/best-sri-lanka-tours/image/upload/w_800,h_600,c_fill/${tour.card.image.publicId}`;
                    }
                  }
                  
                  // Try legacy cardImage structure
                  if (tour.cardImage?.medium) {
                    return tour.cardImage.medium;
                  } else if (tour.cardImage?.small) {
                    return tour.cardImage.small;
                  } else if (tour.cardImage?.large) {
                    return tour.cardImage.large;
                  } else if (tour.cardImage?.baseUrl) {
                    return tour.cardImage.baseUrl;
                  } else if (tour.cardImage?.publicId) {
                    return `https://res.cloudinary.com/best-sri-lanka-tours/image/upload/w_800,h_600,c_fill/${tour.cardImage.publicId}`;
                  }
                  
                  // Try heroImage as last fallback
                  if (tour.heroImage?.medium) {
                    return tour.heroImage.medium;
                  } else if (tour.heroImage?.small) {
                    return tour.heroImage.small;
                  } else if (tour.heroImage?.large) {
                    return tour.heroImage.large;
                  } else if (tour.heroImage?.baseUrl) {
                    return tour.heroImage.baseUrl;
                  } else if (tour.heroImage?.publicId) {
                    return `https://res.cloudinary.com/best-sri-lanka-tours/image/upload/w_800,h_600,c_fill/${tour.heroImage.publicId}`;
                  }
                  
                  // Last resort fallback
                  return "https://images.unsplash.com/photo-1571983823232-07c155b4b685?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80";
                };
                
                // Extract average rating from reviews
                const reviews = tour.reviews || [];
                const averageRating = reviews.length > 0 
                  ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
                  : null;
                
                return (
                  <div key={tour.id} className="bg-[#F8F5F0] rounded-lg overflow-hidden shadow-lg transition transform hover:scale-[1.02] hover:shadow-xl">
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
                          {(tour.card?.tags || tour.tags || []).slice(0, 2).map((tag, i) => (
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
                        {formatRating(averageRating)}
                        <span className="text-sm text-gray-500 ml-2">
                          {averageRating ? averageRating.toFixed(1) : 'N/A'} 
                          ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                        </span>
                      </div>
                      <p className="text-[#333333]/70 mb-4">
                        {tour.card?.body || tour.cardImage?.caption || tour.summary}
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-sm text-gray-500">From</span>
                          <span className="text-[#0F4C81] text-xl font-semibold">
                            {formatPrice(tour.startingFrom, { currency: tour.currency })}
                          </span>
                          <span className="text-gray-500 text-sm">per person</span>
                        </div>
                        <Link 
                          href={`/tours/${tour.slug}`} 
                          className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-6">Customize Your Journey</h2>
            <p className="text-lg text-[#333333]/80 mb-8">Don't see exactly what you're looking for? Our travel experts can create a completely customized itinerary tailored to your preferences.</p>
            <Link href="/contact" className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md transition">
              Contact Us to Customize
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TourPackages;
