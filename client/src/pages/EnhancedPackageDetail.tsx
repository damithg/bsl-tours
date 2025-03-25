import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { TourPackage } from "@shared/schema";
import ContactForm from "@/components/ContactForm";
import TourRouteMap from "@/components/TourRouteMap";
import { Calendar, Clock, Map, Users, DollarSign, Award, Check, X, ChevronRight, ChevronLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Helper Types
interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  accommodation?: string;
}

interface RelatedTour {
  id: number;
  title: string;
  duration: number;
  price: number;
  imageUrl: string;
  description: string;
}

const EnhancedPackageDetail = () => {
  const params = useParams();
  const slug = params.slug;  // Get the slug parameter
  const id = params.id;      // Also support ID parameter for backward compatibility
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [includes, setIncludes] = useState<string[]>([]);
  const [excludes, setExcludes] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);

  // Determine query based on available parameters
  const queryKey = slug 
    ? ['/api/tour-packages/by-slug', slug] 
    : ['/api/tour-packages', parseInt(id || "0")];

  // Fetch tour package data
  const { data: packageData, isLoading, error } = useQuery<TourPackage>({
    queryKey,
  });

  // Process JSON fields when data is loaded
  useEffect(() => {
    if (packageData) {
      // Parse gallery images if available
      if (packageData.gallery) {
        try {
          setGalleryImages(JSON.parse(packageData.gallery));
        } catch (e) {
          setGalleryImages([packageData.imageUrl]);
        }
      } else {
        setGalleryImages([packageData.imageUrl]);
      }

      // Parse includes/excludes if available
      if (packageData.includes) {
        try {
          setIncludes(JSON.parse(packageData.includes));
        } catch (e) {
          setIncludes([]);
        }
      }

      if (packageData.excludes) {
        try {
          setExcludes(JSON.parse(packageData.excludes));
        } catch (e) {
          setExcludes([]);
        }
      }

      // Parse destinations if available
      if (packageData.destinations) {
        try {
          setDestinations(JSON.parse(packageData.destinations));
        } catch (e) {
          setDestinations([]);
        }
      }

      // Parse itinerary if available
      if (packageData.itinerary) {
        try {
          setItinerary(JSON.parse(packageData.itinerary));
        } catch (e) {
          setItinerary([]);
        }
      }
    }
  }, [packageData]);

  // Format rating to display as stars (50 = 5 stars)
  const formatRating = (rating: number | null) => {
    if (rating === null) rating = 50; // Default to 5 stars if no rating
    
    const fullStars = Math.min(Math.floor(rating / 10), 5);
    const hasHalfStar = rating % 10 >= 5 && fullStars < 5;
    const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));
    
    return (
      <div className="text-amber-400 flex text-lg">
        {Array.from({length: fullStars}, (_, i) => (
          <i key={`full-${i}`} className="fas fa-star"></i>
        ))}
        {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
        {Array.from({length: emptyStars}, (_, i) => (
          <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
      </div>
    );
  };

  // Handle image navigation
  const goToNextImage = () => {
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const goToPrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  // Default package includes if not available in data
  const defaultIncludes = [
    "Luxury accommodations throughout the journey",
    "Private transportation in an air-conditioned vehicle",
    "English-speaking chauffeur guide",
    "Daily breakfast and selected meals",
    "All entrance fees to sites mentioned in the itinerary",
    "Welcome and farewell dinners",
    "24/7 concierge support",
    "All government taxes"
  ];

  // Default package excludes if not available in data
  const defaultExcludes = [
    "International airfare",
    "Personal expenses",
    "Meals not mentioned in the itinerary",
    "Travel insurance",
    "Visa fees",
    "Optional activities"
  ];

  // Mock related tours (in a real app, these would be fetched from API)
  const relatedTours: RelatedTour[] = [
    {
      id: 1,
      title: "Wildlife Safari Experience",
      duration: 6,
      price: 2199,
      imageUrl: "https://images.unsplash.com/photo-1544535830-2a087b7641c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Discover Sri Lanka's incredible wildlife in luxury tented camps and boutique lodges."
    },
    {
      id: 2,
      title: "Ayurvedic Wellness Retreat",
      duration: 8,
      price: 2999,
      imageUrl: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Rejuvenate with ancient healing traditions in luxury wellness sanctuaries."
    },
    {
      id: 3,
      title: "Coastal Luxury Getaway",
      duration: 7,
      price: 2499,
      imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Experience the finest beach resorts and water activities along Sri Lanka's pristine coast."
    }
  ];

  // Loading state
  if (isLoading) {
    return (
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="flex flex-col gap-4">
              <div className="h-10 bg-gray-200 animate-pulse rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !packageData) {
    return (
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-xl mx-auto">
            <h1 className="font-['Playfair_Display'] text-3xl font-bold text-primary mb-4">Package Not Found</h1>
            <p className="text-lg text-muted-foreground mb-6">We couldn't find the tour package you're looking for.</p>
            <Link href="/tour-packages">
              <Button size="lg">View All Tour Packages</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-[#103556] to-[#0d2942]">
        <div className="absolute inset-0 z-0 opacity-15 mix-blend-overlay">
          <img 
            src={packageData.imageUrl}
            alt={packageData.title} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d2942] via-transparent to-transparent z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-4 flex justify-center">
              <div className="inline-block bg-[#D4AF37] text-white px-5 py-1.5 rounded-full text-sm font-medium tracking-wide">
                {packageData.duration} DAYS LUXURY TOUR
              </div>
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {packageData.title}
            </h1>
            <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto mb-6"></div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Experience the finest of Sri Lanka with our carefully crafted luxury tour
            </p>
            <div className="flex justify-center mt-6">
              {formatRating(packageData.rating)}
              <span className="text-white/80 ml-2">
                {(packageData.rating || 50) / 10} ({packageData.reviewCount || 0} reviews)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div className="flex flex-col items-center">
              <Calendar className="h-6 w-6 text-[#D4AF37] mb-2" />
              <span className="text-[#103556] font-medium"><strong>{packageData.duration}</strong> Days</span>
            </div>
            <div className="flex flex-col items-center">
              <Map className="h-6 w-6 text-[#D4AF37] mb-2" />
              <span className="text-[#103556] font-medium"><strong>{destinations.length || 'Multiple'}</strong> Destinations</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-6 w-6 text-[#D4AF37] mb-2" />
              <span className="text-[#103556] font-medium">{packageData.groupSize || "Private Tour"}</span>
            </div>
            <div className="flex flex-col items-center">
              <DollarSign className="h-6 w-6 text-[#D4AF37] mb-2" />
              <span className="text-[#103556] font-medium">From <strong>${packageData.price?.toLocaleString() || "0"}</strong></span>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-6 w-6 text-[#D4AF37] mb-2" />
              <span className="text-[#103556] font-medium">5-Star Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Content: Images and Details */}
          <div className="lg:w-2/3">
            {/* Image Gallery */}
            <div className="mb-10">
              <div className="relative h-[400px] md:h-[600px] mb-6 shadow-2xl overflow-hidden">
                <img 
                  src={galleryImages[activeImageIndex] || packageData.imageUrl} 
                  alt={`${packageData.title} - View ${activeImageIndex + 1}`} 
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Buttons */}
                {galleryImages.length > 1 && (
                  <>
                    <button 
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#D4AF37] hover:text-white p-3 rounded-full shadow-lg transition-colors"
                      onClick={goToPrevImage}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button 
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-[#D4AF37] hover:text-white p-3 rounded-full shadow-lg transition-colors"
                      onClick={goToNextImage}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-[#103556]/70 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                      {activeImageIndex + 1} / {galleryImages.length}
                    </div>
                  </>
                )}
              </div>
              
              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {galleryImages.map((img, index) => (
                    <div 
                      key={index}
                      className={`h-24 overflow-hidden cursor-pointer transition-all ${
                        index === activeImageIndex 
                          ? 'ring-3 ring-[#D4AF37] ring-offset-2 shadow-lg' 
                          : 'opacity-70 hover:opacity-100 shadow-md'
                      }`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Tour Overview Section */}
            <div className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#103556]">
                  Tour Overview
                </h2>
                <div className="h-0.5 w-32 bg-[#D4AF37]"></div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-8">
                  {packageData.description}
                </p>
                
                {packageData.highlightsSummary && (
                  <div className="mb-8">
                    <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#103556] mb-4">
                      Tour Highlights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {packageData.highlightsSummary.split(',').map((highlight, index) => (
                        <div key={index} className="flex items-start gap-3 bg-[#f8f7f2] p-4 rounded-lg">
                          <Check className="h-5 w-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{highlight.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {packageData.bestTimeToVisit && (
                    <div className="bg-[#f8f7f2] p-5 rounded-lg border-l-4 border-[#D4AF37]">
                      <h4 className="font-semibold text-[#103556] mb-2">Best Time to Visit</h4>
                      <p className="text-gray-600">{packageData.bestTimeToVisit}</p>
                    </div>
                  )}
                  
                  {destinations.length > 0 && (
                    <div className="bg-[#f8f7f2] p-5 rounded-lg border-l-4 border-[#D4AF37]">
                      <h4 className="font-semibold text-[#103556] mb-2">Destinations Covered</h4>
                      <p className="text-gray-600">{destinations.join(', ')}</p>
                    </div>
                  )}
                  
                  {packageData.startingLocations && (
                    <div className="bg-[#f8f7f2] p-5 rounded-lg border-l-4 border-[#D4AF37]">
                      <h4 className="font-semibold text-[#103556] mb-2">Tour Starts From</h4>
                      <p className="text-gray-600">
                        {JSON.parse(packageData.startingLocations).join(' or ')}
                      </p>
                    </div>
                  )}
                  
                  {packageData.groupSize && (
                    <div className="bg-[#f8f7f2] p-5 rounded-lg border-l-4 border-[#D4AF37]">
                      <h4 className="font-semibold text-[#103556] mb-2">Group Size</h4>
                      <p className="text-gray-600">{packageData.groupSize}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Animated Tour Route Map */}
            {(itinerary.length > 0 || destinations.length > 0) && (
              <div className="mb-16">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#103556]">
                    Tour Route Visualization
                  </h2>
                  <div className="h-0.5 w-32 bg-[#D4AF37]"></div>
                </div>
                
                <div className="bg-[#f8f7f2] p-6 rounded-lg border border-[#D4AF37]/20 mb-6">
                  <p className="text-gray-600 mb-6">
                    Follow your journey through Sri Lanka with our interactive map. Click on locations or itinerary days to see the animated route between destinations.
                  </p>
                  
                  <TourRouteMap 
                    itinerary={itinerary} 
                    destinations={destinations} 
                    className="mt-4" 
                  />
                </div>
              </div>
            )}
            
            {/* Day-by-Day Itinerary Section */}
            <div className="mb-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#103556]">
                  Day-by-Day Itinerary
                </h2>
                <div className="h-0.5 w-32 bg-[#D4AF37]"></div>
              </div>
              
              <div className="space-y-6">
                {itinerary.length > 0 ? (
                  itinerary.map((day) => (
                    <div key={day.day} className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden border border-gray-100">
                      <div className="absolute -left-0 h-full w-1 bg-[#D4AF37]"></div>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-24 flex-shrink-0">
                          <div className="w-20 h-20 bg-[#103556] text-white rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-xl font-bold">Day {day.day}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#103556] mb-3">
                            {day.title}
                          </h3>
                          <p className="text-gray-600 mb-4 leading-relaxed">{day.description}</p>
                          {day.accommodation && day.accommodation !== "N/A" && (
                            <div className="inline-block bg-[#f8f7f2] px-4 py-2 rounded-lg">
                              <span className="font-semibold text-[#103556]">Accommodation:</span> {day.accommodation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-8 bg-[#f8f7f2] rounded-lg border border-[#D4AF37]/20">
                    <p className="text-lg text-gray-600 mb-3">
                      Full {packageData.duration}-day itinerary available upon request.
                    </p>
                    <p className="text-gray-500">
                      Contact our travel consultants for a detailed day-by-day plan.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Includes/Excludes Section */}
            <div className="mb-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#103556]">
                  What's Included
                </h2>
                <div className="h-0.5 w-32 bg-[#D4AF37]"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#103556] mb-6 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    Your Tour Includes
                  </h3>
                  <ul className="space-y-3">
                    {(includes.length > 0 ? includes : defaultIncludes).map((item, index) => (
                      <li key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                        <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#103556] mb-6 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <X className="h-5 w-5 text-red-500" />
                    </div>
                    Your Tour Excludes
                  </h3>
                  <ul className="space-y-3">
                    {(excludes.length > 0 ? excludes : defaultExcludes).map((item, index) => (
                      <li key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                        <X className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Destinations Map Section */}
            <div className="mb-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#103556]">
                  Destinations on This Tour
                </h2>
                <div className="h-0.5 w-32 bg-[#D4AF37]"></div>
              </div>
              
              {destinations.length > 0 ? (
                <div>
                  <div className="aspect-video relative rounded-lg overflow-hidden mb-8 shadow-xl">
                    <img 
                      src="/images/sri-lanka-map-watercolor.jpg" 
                      alt="Sri Lanka Map" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-8 py-6 bg-white/90 rounded-lg shadow-lg">
                        <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#103556] mb-2">Tour Route</h3>
                        <p className="text-gray-600">
                          This luxury tour covers {destinations.length} stunning destinations across Sri Lanka
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {destinations.map((destination, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-md text-center border border-gray-100 hover:border-[#D4AF37] transition-colors">
                        <h4 className="font-medium text-[#103556]">{destination}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 bg-[#f8f7f2] rounded-lg">
                  <p className="text-gray-600">
                    Detailed destination information available upon request.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Sidebar: Booking and Information */}
          <div className="lg:w-1/3">
            {/* Booking Card */}
            <div className="bg-white rounded-sm shadow-xl overflow-hidden mb-8 sticky top-28 border border-[#D4AF37]/30">
              <div className="bg-gradient-to-r from-[#103556] to-[#0d2942] text-white p-6">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="h-5 w-5 text-[#D4AF37]" />
                  <h3 className="text-lg font-semibold">Pricing Details</h3>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-3xl font-bold mb-1 text-white">${packageData.price?.toLocaleString() || "0"}</div>
                    <div className="text-sm text-white/80">per person</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-semibold">{packageData.duration}</div>
                    <div className="text-sm text-white/80">days</div>
                  </div>
                </div>
                
                <div className="mt-4 border-t border-white/20 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-[#D4AF37]" />
                    <span>Private Transportation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Check className="h-4 w-4 text-[#D4AF37]" />
                    <span>Luxury Accommodations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Check className="h-4 w-4 text-[#D4AF37]" />
                    <span>English-speaking Guide</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Tour Rating</span>
                    <span className="font-medium">{(packageData.rating || 50) / 10} / 5</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Tour Duration</span>
                    <span className="font-medium">{packageData.duration} days</span>
                  </div>
                  {packageData.luxuryLevel && (
                    <div className="flex justify-between text-sm mb-2">
                      <span>Luxury Level</span>
                      <span className="font-medium">
                        {[...Array(packageData.luxuryLevel)].map((_, i) => (
                          <i key={i} className="fas fa-star text-amber-400"></i>
                        ))}
                      </span>
                    </div>
                  )}
                  {packageData.groupSize && (
                    <div className="flex justify-between text-sm mb-2">
                      <span>Group Size</span>
                      <span className="font-medium">{packageData.groupSize}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Book This Tour
                  </Button>
                  
                  <Button variant="outline" className="w-full" size="lg">
                    <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
                  </Button>
                </div>
                
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>Have questions? Call us at</p>
                  <p className="font-semibold text-primary text-lg">+94 112 123 4567</p>
                </div>
              </div>
            </div>
            
            {/* Need Help Box */}
            <div className="bg-secondary/20 rounded-lg p-6 mb-8">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-primary mb-3">
                Need Customizations?
              </h3>
              <p className="text-muted-foreground mb-4">
                Want to add extra activities, change accommodation options, or adjust the itinerary? Our experts can customize this tour to your preferences.
              </p>
              <Button variant="outline" className="w-full">
                Request Custom Tour
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Tours */}
      <section className="py-20 bg-gradient-to-b from-white to-[#f8f7f2]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-3">
              <div className="h-0.5 w-10 bg-[#D4AF37] inline-block mr-3"></div>
              <span className="text-[#103556] uppercase text-sm font-medium tracking-wider">Luxury Experiences</span>
              <div className="h-0.5 w-10 bg-[#D4AF37] inline-block ml-3"></div>
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#103556] mb-6">
              You May Also Like
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our other luxury experiences across Sri Lanka's most captivating destinations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {relatedTours.map((tour) => (
              <div key={tour.id} className="bg-white overflow-hidden shadow-lg transition-all hover:shadow-2xl group">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={tour.imageUrl} 
                    alt={tour.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-sm font-semibold py-1 px-4 rounded-full">
                    {tour.duration} Days
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <div className="p-8 border-b border-l border-r border-gray-100">
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-3 text-[#103556]">{tour.title}</h3>
                  <p className="text-gray-600 mb-6">{tour.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">From</span>
                      <span className="text-[#103556] text-2xl font-bold ml-2">${tour.price?.toLocaleString() || "0"}</span>
                    </div>
                    <Link href={`/tour/${tour.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')}`}>
                      <button className="bg-[#103556] hover:bg-[#1a4971] text-white font-medium px-6 py-2.5 rounded-sm transition-colors">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Inquiry Form */}
      <section id="inquiry" className="py-24 bg-[#103556] bg-[url('/images/pattern-bg.png')] bg-opacity-10 bg-blend-overlay">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-10 shadow-2xl">
            <div className="text-center mb-10">
              <div className="inline-block mb-3">
                <div className="h-0.5 w-10 bg-[#D4AF37] inline-block mr-3"></div>
                <span className="text-[#103556] uppercase text-sm font-medium tracking-wider">Book Your Journey</span>
                <div className="h-0.5 w-10 bg-[#D4AF37] inline-block ml-3"></div>
              </div>
              <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#103556] mb-6">
                Interested in This Tour?
              </h2>
              <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Complete the form below and one of our luxury travel consultants will contact you 
                within 24 hours to discuss your booking and answer any questions.
              </p>
            </div>
            
            <ContactForm />
            
            <div className="mt-8 text-center text-gray-600 text-sm">
              <p>By submitting this form, you agree to our <span className="text-[#103556] font-medium">Privacy Policy</span> and <span className="text-[#103556] font-medium">Terms of Service</span>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-20 bg-[#f8f7f2]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-3">
              <div className="h-0.5 w-10 bg-[#D4AF37] inline-block mr-3"></div>
              <span className="text-[#103556] uppercase text-sm font-medium tracking-wider">Traveler Experiences</span>
              <div className="h-0.5 w-10 bg-[#D4AF37] inline-block ml-3"></div>
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#103556] mb-6">
              What Our Guests Say
            </h2>
            <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read about the experiences of travelers who have enjoyed this tour
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="bg-white p-10 shadow-xl relative">
              <div className="absolute -top-6 left-10 text-[#D4AF37] text-7xl opacity-20">"</div>
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-6 border-b border-gray-100 pb-6">
                  <div className="w-20 h-20 rounded-full bg-[#103556]/10 flex items-center justify-center text-[#103556] font-semibold text-xl">
                    JD
                  </div>
                  <div>
                    <h4 className="font-['Playfair_Display'] text-xl font-semibold text-[#103556]">James Davies</h4>
                    <p className="text-gray-500">United Kingdom</p>
                    <div className="text-[#D4AF37] mt-1">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p className="italic text-gray-600 leading-relaxed">
                  "Our trip with BSL Tours exceeded all expectations. The attention to detail was superb, and our guide's knowledge made every destination come alive. The accommodations were stunning and the private transportation was extremely comfortable."
                </p>
                <div className="mt-6 text-sm text-[#103556]">
                  <span className="font-medium">Tour:</span> Luxury Sri Lanka
                </div>
              </div>
            </div>
            
            <div className="bg-white p-10 shadow-xl relative">
              <div className="absolute -top-6 left-10 text-[#D4AF37] text-7xl opacity-20">"</div>
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-6 border-b border-gray-100 pb-6">
                  <div className="w-20 h-20 rounded-full bg-[#103556]/10 flex items-center justify-center text-[#103556] font-semibold text-xl">
                    SM
                  </div>
                  <div>
                    <h4 className="font-['Playfair_Display'] text-xl font-semibold text-[#103556]">Sarah Mitchell</h4>
                    <p className="text-gray-500">Australia</p>
                    <div className="text-[#D4AF37] mt-1">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
                <p className="italic text-gray-600 leading-relaxed">
                  "From the moment we landed until our departure, everything was perfectly organized. We especially loved the cultural experiences and the wonderful food. Our tour consultant was responsive and made sure every aspect of our journey was flawless."
                </p>
                <div className="mt-6 text-sm text-[#103556]">
                  <span className="font-medium">Tour:</span> Sri Lankan Heritage
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="#" className="inline-flex items-center text-[#103556] hover:text-[#D4AF37] font-medium transition-colors">
              Read More Reviews <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="relative py-20 bg-[#103556] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="/images/cta-background.jpg"
            alt="Sri Lanka Beach" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-4xl font-bold mb-6">Ready to Experience Luxury in Sri Lanka?</h2>
            <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mb-6"></div>
            <p className="text-xl text-white/80 mb-10">
              Our team of luxury travel specialists is waiting to craft your perfect Sri Lankan journey. 
              Don't miss this opportunity to create memories that will last a lifetime.
            </p>
            <a 
              href="#inquiry" 
              className="inline-block bg-[#D4AF37] hover:bg-[#c4a033] text-white font-medium px-8 py-3 rounded-sm transition-colors"
            >
              Book Your Tour Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EnhancedPackageDetail;