import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { TourPackage } from "@/lib/queryClient";
import ContactForm from "@/components/ContactForm";
import TourRouteMap from "@/components/TourRouteMap";
import { Calendar, Clock, Map, Users, DollarSign, Award, Check, X, ChevronRight, ChevronLeft, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Determine query based on available parameters
  const queryKey = slug 
    ? ['/api/tour-packages/by-slug/', slug] 
    : ['/api/tour-packages', parseInt(id || "0")];

  // Fetch tour package data
  const { data: packageData, isLoading, error } = useQuery<TourPackage>({
    queryKey,
  });

  // Process JSON fields when data is loaded
  useEffect(() => {
    if (packageData) {
      console.log("Package data received:", packageData);
      console.log("Itinerary field:", packageData.itinerary);
      
      // Handle gallery images
      // First check for galleryImages array in the API response
      if (packageData.galleryImages && Array.isArray(packageData.galleryImages)) {
        console.log("Using galleryImages from API response:", packageData.galleryImages);
        setGalleryImages(packageData.galleryImages);
      } 
      // Then try to parse gallery field if it exists
      else if (packageData.gallery) {
        try {
          const parsedGallery = JSON.parse(packageData.gallery);
          console.log("Parsed gallery from JSON string:", parsedGallery);
          setGalleryImages(parsedGallery);
        } catch (e) {
          console.log("Error parsing gallery, using imageUrl as fallback");
          setGalleryImages([packageData.imageUrl]);
        }
      } else {
        console.log("No gallery found, using imageUrl as fallback");
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
        console.log("Itinerary field:", packageData.itinerary);
        // First check if it's already a JSON string
        try {
          const parsedItinerary = JSON.parse(packageData.itinerary);
          console.log("Parsed itinerary as JSON:", parsedItinerary);
          
          // Check if we got a valid array
          if (Array.isArray(parsedItinerary) && parsedItinerary.length > 0) {
            setItinerary(parsedItinerary);
          } else {
            // Not a valid array, fall through to next parsing option
            throw new Error("Not a valid itinerary array");
          }
        } catch (e) {
          console.log("Itinerary is not a JSON string, trying to parse from text format");
          
          // Try to parse as plain text format with "Day X: Description" format
          if (typeof packageData.itinerary === 'string' && packageData.itinerary.includes('Day')) {
            const lines = packageData.itinerary.split('\n');
            const parsedItinerary: ItineraryDay[] = [];
            
            lines.forEach(line => {
              const match = line.match(/Day (\d+)(?:-\d+)?: (.+)/);
              if (match) {
                const day = parseInt(match[1]);
                const title = match[2].trim();
                
                parsedItinerary.push({
                  day,
                  title,
                  description: `Explore ${title} with your private guide. Visit key attractions and immerse yourself in the local culture. Enjoy luxury accommodation and fine dining experiences.`,
                  accommodation: "Luxury Hotel"
                });
              }
            });
            
            console.log("Parsed itinerary from text:", parsedItinerary);
            
            if (parsedItinerary.length > 0) {
              setItinerary(parsedItinerary);
            } else {
              console.log("Could not parse itinerary from text format");
              setItinerary([]);
            }
          } else {
            console.log("Itinerary is not in expected format");
            setItinerary([]);
          }
        }
      } else {
        console.log("No itinerary field found in package data");
        setItinerary([]);
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
  const handleImageNav = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    } else {
      setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    }
  };

  // Handle wishlist toggle
  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist);
    // In a real app, this would save to user's profile
  };

  // Default package includes if not available in data
  const includesItems = includes.length > 0 ? includes : [
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
  const excludesItems = excludes.length > 0 ? excludes : [
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
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center text-white/90">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{packageData.duration} Days</span>
              </div>
              <div className="flex items-center text-white/90">
                <Users className="h-5 w-5 mr-2" />
                <span>Private Tour</span>
              </div>
              <div className="flex items-center text-white/90">
                <Map className="h-5 w-5 mr-2" />
                <span>{packageData.destinations}</span>
              </div>
              <div className="flex items-center text-white/90">
                <Clock className="h-5 w-5 mr-2" />
                <span>All Year Round</span>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <a 
                href="#inquiry" 
                className="bg-[#D4AF37] hover:bg-[#c4a033] text-white font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Book This Tour
              </a>
              <a 
                href="#customizeForm" 
                className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium px-8 py-3 rounded-sm transition-colors"
              >
                Customize Tour
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column - Tour Info */}
            <div className="lg:col-span-2">
              
              {/* Gallery */}
              <div className="mb-16">
                <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg mb-4">
                  <img 
                    src={galleryImages[activeImageIndex] || packageData.imageUrl} 
                    alt={`${packageData.title} - Image ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover" 
                  />
                  
                  {/* Image Navigation */}
                  {galleryImages.length > 1 && (
                    <>
                      <button 
                        onClick={() => handleImageNav('prev')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6 text-[#103556]" />
                      </button>
                      <button 
                        onClick={() => handleImageNav('next')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6 text-[#103556]" />
                      </button>
                    </>
                  )}
                </div>
                
                {/* Thumbnails */}
                {galleryImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {galleryImages.map((img, index) => (
                      <button 
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${activeImageIndex === index ? 'border-[#D4AF37]' : 'border-transparent'}`}
                      >
                        <img 
                          src={img} 
                          alt={`${packageData.title} - Thumbnail ${index + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Overview */}
              <div className="mb-16">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#103556]">
                    Overview
                  </h2>
                  <div className="h-0.5 w-32 bg-[#D4AF37]"></div>
                </div>
                <div 
                  className="prose prose-lg max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: packageData.description || '' }}
                />
              </div>
              
              {/* Tour Map */}
              {itinerary.length > 0 && (
                <div className="mb-16">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#103556]">
                      Tour Map
                    </h2>
                    <div className="h-0.5 w-32 bg-[#D4AF37]"></div>
                  </div>
                  <div className="bg-[#f8f7f2] p-6 rounded-lg">
                    <TourRouteMap 
                      itinerary={itinerary}
                      destinations={packageData.destinations?.split(',').map(d => d.trim()) || []}
                      className="h-[700px] w-full"
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
                
                {itinerary.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full border rounded-xl overflow-hidden">
                    {itinerary.map((day) => (
                      <AccordionItem key={day.day} value={`day-${day.day}`} className="border-b last:border-0">
                        <AccordionTrigger className="py-6 px-6 hover:no-underline bg-[#f9f8f5] hover:bg-[#f5f3eb]">
                          <div className="flex items-center text-left">
                            <div className="w-12 h-12 bg-[#103556] text-white rounded-full flex items-center justify-center shadow-md mr-4 flex-shrink-0">
                              <span className="text-sm font-bold">Day {day.day}</span>
                            </div>
                            <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#103556]">
                              {day.title}
                            </h3>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pt-2 pb-6">
                          <div className="ml-16">
                            <p className="text-gray-600 mb-4 leading-relaxed">{day.description}</p>
                            {day.accommodation && day.accommodation !== "N/A" && (
                              <div className="bg-[#f8f7f2] px-4 py-3 rounded-lg inline-block">
                                <span className="font-semibold text-[#103556]">Accommodation:</span> {day.accommodation}
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
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
              
              {/* Includes/Excludes Section */}
              <div className="mb-16">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#103556]">
                    What's Included
                  </h2>
                  <div className="h-0.5 w-32 bg-[#D4AF37]"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#f8f7f2] p-6 rounded-lg">
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#103556] mb-4 flex items-center">
                      <div className="w-8 h-8 bg-[#103556] rounded-full flex items-center justify-center mr-3">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      Included
                    </h3>
                    <ul className="space-y-3">
                      {includesItems.map((item, idx) => (
                        <li key={idx} className="flex">
                          <Check className="h-5 w-5 text-[#D4AF37] mr-3 flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-[#f8f7f2] p-6 rounded-lg">
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#103556] mb-4 flex items-center">
                      <div className="w-8 h-8 bg-[#103556] rounded-full flex items-center justify-center mr-3">
                        <X className="h-5 w-5 text-white" />
                      </div>
                      Not Included
                    </h3>
                    <ul className="space-y-3">
                      {excludesItems.map((item, idx) => (
                        <li key={idx} className="flex">
                          <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              {/* Price Card */}
              <div className="sticky top-24 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-[#103556] p-6 text-white">
                  <div className="flex items-baseline">
                    <span className="text-xl font-medium">From</span>
                    <span className="text-4xl font-bold ml-2">${packageData.price?.toLocaleString() || "0"}</span>
                    <span className="ml-1 text-white/80">per person</span>
                  </div>
                  <p className="text-white/80 text-sm mt-1">Based on double occupancy</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-[#D4AF37] mr-3" />
                        <span className="text-gray-600">Duration</span>
                      </div>
                      <span className="font-semibold">{packageData.duration} Days</span>
                    </div>
                    
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-[#D4AF37] mr-3" />
                        <span className="text-gray-600">Tour Type</span>
                      </div>
                      <span className="font-semibold">Private Tour</span>
                    </div>
                    
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-[#D4AF37] mr-3" />
                        <span className="text-gray-600">Price Includes</span>
                      </div>
                      <span className="font-semibold">All Inclusive</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-[#D4AF37] mr-3" />
                        <span className="text-gray-600">Quality</span>
                      </div>
                      <span className="font-semibold">5-Star Luxury</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <a 
                      href="#inquiry" 
                      className="block bg-[#D4AF37] hover:bg-[#c4a033] text-white font-medium text-center px-6 py-3 rounded-sm transition-colors w-full"
                    >
                      Book This Tour
                    </a>
                    <button 
                      onClick={handleAddToWishlist}
                      className="flex items-center justify-center border border-[#103556] text-[#103556] hover:bg-[#103556] hover:text-white font-medium px-6 py-3 rounded-sm transition-colors w-full"
                    >
                      <Heart className={`h-5 w-5 mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
                      {isInWishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Need Help Box */}
              <div className="mt-8 bg-[#f8f7f2] p-6 rounded-lg border border-[#D4AF37]/20">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#103556] mb-4">
                  Need Help?
                </h3>
                <p className="text-gray-600 mb-4">
                  Our luxury travel consultants are ready to assist you with any questions about this tour.
                </p>
                <div className="flex items-center mt-4 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 bg-[#103556] rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-phone-alt text-white"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call us</p>
                    <p className="font-semibold text-[#103556]">+94 77 123 4567</p>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-10 h-10 bg-[#103556] rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-envelope text-white"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email us</p>
                    <p className="font-semibold text-[#103556]">info@bestsrilankatours.com</p>
                  </div>
                </div>
              </div>
              
              {/* Customize Box */}
              <div className="mt-8 bg-[#f8f7f2] p-6 rounded-lg border border-[#D4AF37]/20">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#103556] mb-4">
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