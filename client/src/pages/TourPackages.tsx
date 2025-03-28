import { useQuery } from "@tanstack/react-query";
import { TourPackage } from "@shared/schema";
import { Link } from "wouter";
import { useCurrency } from "../contexts/CurrencyContext";

const TourPackages = () => {
  const { data: packages, isLoading, error } = useQuery<TourPackage[]>({
    queryKey: ['/api/tour-packages'],
  });
  
  const { formatPrice } = useCurrency();

  // Format rating to display as stars (50 = 5 stars)
  const formatRating = (rating: number | null) => {
    if (rating === null) {
      return (
        <div className="text-gray-400 flex">
          <span>No ratings yet</span>
        </div>
      );
    }
    
    const fullStars = Math.floor(rating / 10);
    const hasHalfStar = rating % 10 >= 5;
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
              <p className="text-red-500">Failed to load packages. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages?.map((pkg) => (
                <div key={pkg.id} className="bg-[#F8F5F0] rounded-lg overflow-hidden shadow-lg transition transform hover:scale-[1.02] hover:shadow-xl">
                  <div className="relative h-64 flex items-center justify-center overflow-hidden">
                    <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover object-center" />
                    <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-sm font-semibold py-1 px-3 rounded-full">
                      {pkg.duration} Days
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">{pkg.title}</h3>
                    <div className="flex items-center mb-4">
                      {formatRating(pkg.rating || 50)}
                      <span className="text-sm text-gray-500 ml-2">
                        {((pkg.rating || 50) / 10).toFixed(1)} ({pkg.reviewCount || 25} reviews)
                      </span>
                    </div>
                    <p className="text-[#333333]/70 mb-4">{pkg.shortDescription || pkg.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-500">From</span>
                        <span className="text-[#0F4C81] text-xl font-semibold">{formatPrice(pkg.price)}</span>
                        <span className="text-gray-500 text-sm">per person</span>
                      </div>
                      <Link 
                        href={pkg.slug ? `/tour/${pkg.slug}` : `/tour-packages/${pkg.id}`} 
                        className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
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
