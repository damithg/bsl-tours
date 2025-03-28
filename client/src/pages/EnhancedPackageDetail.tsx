import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { TourPackage, ItineraryDay as APIItineraryDay } from "@/lib/queryClient";
import { useCurrency } from "@/contexts/CurrencyContext";
import ContactForm from "@/components/ContactForm";
import TourRouteMap from "@/components/TourRouteMap";
import VisualTimeline, { TimelineDayData } from "@/components/VisualTimeline";
import { Calendar, Clock, Map, Users, DollarSign, Award, Check, X, ChevronRight, ChevronLeft, Heart, ChevronDown, LayoutList, List, Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Helper Types - only for RelatedTour now
// We're using the ItineraryDay interface from queryClient.ts

interface RelatedTour {
  id: number;
  title: string;
  duration: number;
  price: number;
  imageUrl: string;
  description: string;
  shortDescription?: string;
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
  const [itinerary, setItinerary] = useState<APIItineraryDay[]>([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [timelineData, setTimelineData] = useState<TimelineDayData[]>([]);
  // Using only the visual timeline format
  
  // Get currency formatter
  const { formatPrice } = useCurrency();

  // Determine queries based on available parameters
  const packageQueryKey = slug 
    ? ['/api/tour-packages/by-slug/', slug] 
    : ['/api/tour-packages', parseInt(id || "0")];
    
  const itineraryQueryKey = slug 
    ? ['/api/tour-packages/by-slug/', slug, '/itinerary'] 
    : ['/api/tour-packages', parseInt(id || "0"), '/itinerary'];

  // Fetch tour package data
  const { 
    data: packageData, 
    isLoading: isPackageLoading, 
    error: packageError 
  } = useQuery<TourPackage>({
    queryKey: packageQueryKey,
  });
  
  // Fetch itinerary data directly from the new endpoint
  const { 
    data: itineraryData, 
    isLoading: isItineraryLoading,
    error: itineraryError
  } = useQuery<APIItineraryDay[]>({
    queryKey: itineraryQueryKey,
    enabled: !!packageData, // Only fetch itinerary once we have package data
  });

  // Process JSON fields when data is loaded
  useEffect(() => {
    if (packageData) {
      console.log("Package data received:", packageData);
      console.log("Gallery Image URL Check:", {
        galleryImages: packageData.galleryImages,
        isArray: packageData.galleryImages && Array.isArray(packageData.galleryImages),
        galleryField: packageData.gallery
      });
      
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

      // We'll handle itinerary in a separate useEffect that watches itineraryData
    }
  }, [packageData]);
  
  // Process itinerary data directly from the API response
  useEffect(() => {
    if (packageData?.itineraryDays && Array.isArray(packageData.itineraryDays) && packageData.itineraryDays.length > 0) {
      // If we have structured itinerary data directly in package data
      console.log("Using itineraryDays from API response:", packageData.itineraryDays);
      setItinerary(packageData.itineraryDays);
    } else if (itineraryData && Array.isArray(itineraryData) && itineraryData.length > 0) {
      // Fallback to separate itinerary endpoint data if available
      console.log("Using structured itinerary data from API endpoint:", itineraryData);
      setItinerary(itineraryData);
    } else if (packageData?.itinerary) {
      console.log("Itinerary field from package data:", packageData.itinerary);
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
          const parsedItinerary: APIItineraryDay[] = [];
          
          lines.forEach(line => {
            const match = line.match(/Day (\d+)(?:-\d+)?: (.+)/);
            if (match) {
              const day = parseInt(match[1]);
              const title = match[2].trim();
              
              parsedItinerary.push({
                day,
                title,
                description: `Visit key attractions in ${title} with your private guide. Experience authentic Sri Lankan culture and cuisine.`,
                accommodation: "Luxury Hotel",
                imageUrl: `https://source.unsplash.com/featured/?srilanka,${title.replace(/ /g, '')}`
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
      console.log("No itinerary data available");
      setItinerary([]);
    }
  }, [packageData, itineraryData]);

  // Transform itinerary data into visual timeline format when itinerary changes
  useEffect(() => {
    if (itinerary.length > 0) {
      // Enhanced transformation from itinerary to visual timeline data
      const transformedData: TimelineDayData[] = itinerary.map(day => {
        // Convert accommodation to string if it's an object
        let accommodationString: string | undefined;
        
        if (typeof day.accommodation === 'object' && day.accommodation !== null) {
          accommodationString = day.accommodation.name;
        } else if (typeof day.accommodation === 'string') {
          accommodationString = day.accommodation;
        }
        
        // Build a richer description that includes activities if they exist
        let enhancedDescription = day.description;
        
        if (day.activities && Array.isArray(day.activities) && day.activities.length > 0) {
          enhancedDescription += '<br/><br/><strong>Today\'s Activities:</strong><ul>';
          day.activities.forEach((activity: { 
            title: string; 
            description?: string;
            time?: string;
            imageUrl?: string;
          }) => {
            if (typeof activity === 'object' && activity !== null) {
              enhancedDescription += `<li><strong>${activity.title}</strong>`;
              if (activity.description) {
                enhancedDescription += `: ${activity.description}`;
              }
              if (activity.time) {
                enhancedDescription += ` (${activity.time})`;
              }
              enhancedDescription += '</li>';
            }
          });
          enhancedDescription += '</ul>';
        }
        
        // Include meal information
        if (day.meals) {
          enhancedDescription += '<br/><strong>Meals:</strong> ';
          const mealsIncluded = [];
          if (day.meals.breakfast) mealsIncluded.push('Breakfast');
          if (day.meals.lunch) mealsIncluded.push('Lunch');
          if (day.meals.dinner) mealsIncluded.push('Dinner');
          
          enhancedDescription += mealsIncluded.length > 0 
            ? mealsIncluded.join(', ') 
            : 'No meals included';
        }
        
        return {
          day: day.day,
          title: day.title,
          description: enhancedDescription,
          accommodation: accommodationString,
          // Use the imageUrl from the itinerary data if it exists, otherwise generate one dynamically
          imageUrl: day.imageUrl || `/images/packages/${day.title.toLowerCase().replace(/ /g, '-')}.jpg` || `https://source.unsplash.com/featured/?srilanka,${day.title.replace(/ /g, '')}`
        };
      });
      
      setTimelineData(transformedData);
    }
  }, [itinerary]);

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
    console.log("Navigating gallery images:", { 
      direction, 
      currentIndex: activeImageIndex, 
      totalImages: galleryImages.length,
      galleryImages
    });
    
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
      description: "Discover Sri Lanka's incredible wildlife in luxury tented camps and boutique lodges.",
      shortDescription: "Discover Sri Lanka's incredible wildlife in luxury tented camps and boutique lodges."
    },
    {
      id: 2,
      title: "Ayurvedic Wellness Retreat",
      duration: 8,
      price: 2999,
      imageUrl: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Rejuvenate with ancient healing traditions in luxury wellness sanctuaries.",
      shortDescription: "Rejuvenate with ancient healing traditions in luxury wellness sanctuaries."
    },
    {
      id: 3,
      title: "Coastal Luxury Getaway",
      duration: 7,
      price: 2499,
      imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Experience the finest beach resorts and water activities along Sri Lanka's pristine coast.",
      shortDescription: "Experience the finest beach resorts and water activities along Sri Lanka's pristine coast."
    }
  ];

  // Loading state
  if (isPackageLoading || isItineraryLoading) {
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
  if (packageError || itineraryError || !packageData) {
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
      {/* Hero Section with larger image and prominent text overlay */}
      <section className="relative h-[380px]">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${packageData.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>
        </div>
        
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28">
          <nav className="flex text-white/90 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-white/60" />
                  <Link href="/packages" className="ml-1 text-sm font-medium hover:text-white">
                    Tour Packages
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-white/60" />
                  <span className="ml-1 text-sm font-medium text-white/80">
                    {packageData.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          
          {/* Tour Title and Info - Simplified */}
          <div className="text-white relative z-10">
            <h1 className="font-['Playfair_Display'] text-2xl md:text-2xl lg:text-3xl font-bold text-white mb-6 leading-tight md:text-left text-center">
              {packageData.title}
            </h1>
            
            <div className="flex flex-wrap md:justify-start justify-center gap-4 mb-8">
              <div className="flex items-center text-white/90">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{packageData.duration} Days</span>
              </div>
              <div className="flex items-center text-white/90">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{packageData.destinations?.replace(/,/g, ', ') || "Multiple Destinations"}</span>
              </div>
            </div>
            
            <div className="flex md:justify-start justify-center gap-4">
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
              
              {/* Tour Description */}
              <div className="mb-16">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-4">
                    {packageData.title}
                  </h2>
                </div>
                <div className="text-xl text-gray-700 font-medium mb-6">
                  {packageData.shortDescription || "Experience the best of Sri Lanka with our luxury tour package."}
                </div>
                <div 
                  className="prose prose-lg max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: packageData.description || '' }}
                />
                {packageData.tourHighlights && (
                  <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <h3 className="text-xl font-semibold mb-3">Tour Highlights</h3>
                    <div className="text-gray-700">{packageData.tourHighlights}</div>
                  </div>
                )}
              </div>
              
              {/* Tour Map & Itinerary - Integrated Experience - Hidden per request */}
              
              {/* Detailed Itinerary Section - For Additional Details */}
              <div className="mb-16">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold">Journey Highlights</h2>
                </div>
                
                {itinerary.length > 0 ? (
                  <div className="bg-white px-0">
                    <VisualTimeline data={timelineData} className="timeline-luxury" />
                  </div>
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
                <div className="mb-8">
                  <h2 className="text-3xl font-bold">What's Included</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#f8f7f2] p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center mr-3">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                      Included
                    </h3>
                    <ul className="space-y-3">
                      {includesItems.map((item, idx) => (
                        <li key={idx} className="flex">
                          <Check className="h-5 w-5 text-[var(--secondary)] mr-3 flex-shrink-0 mt-1" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-[#f8f7f2] p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center mr-3">
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
                    <span className="text-4xl font-bold ml-2">{formatPrice(packageData.price || 0)}</span>
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
                <h3 className="text-xl font-semibold mb-4">
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
                <h3 className="text-xl font-semibold mb-4">
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
            <h2 className="text-4xl font-bold mb-6">
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
                  <h3 className="text-2xl font-semibold mb-3">{tour.title}</h3>
                  <p className="text-gray-600 mb-6">{tour.shortDescription || tour.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">From</span>
                      <span className="text-[#103556] text-2xl font-bold ml-2">{formatPrice(tour.price || 0)}</span>
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
              <h2 className="text-4xl font-bold mb-6">
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
            <h2 className="text-4xl font-bold mb-6">
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
                    <h4 className="text-xl font-semibold">James Davies</h4>
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
                    <h4 className="text-xl font-semibold">Sarah Mitchell</h4>
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
            <h2 className="text-4xl font-bold mb-6">Ready to Experience Luxury in Sri Lanka?</h2>
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