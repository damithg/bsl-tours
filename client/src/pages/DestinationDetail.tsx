import { useState, useEffect, useRef } from 'react';
import { useRoute, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { 
  ChevronRight, MapPin, Calendar, Clock, Bookmark, Users, Compass, 
  Sun, Droplets, Star, Menu, ArrowRight, ChevronDown, MessageCircle, 
  Heart, Share2, Camera, MapIcon, Coffee
} from 'lucide-react';
import { Destination } from '@shared/schema';
import { useCurrency } from '@/contexts/CurrencyContext';
import { determineFocalPoint, DESTINATION_FOCAL_POINTS } from "@/lib/image-utils";
import { AdaptiveImage } from '@/components/ui/adaptive-image';
import { 
  HeroImage, 
  FeatureImage, 
  ExperienceImage, 
  GalleryImage, 
  BackgroundImage 
} from '@/components/ui/optimized-image';

// Helper function to safely parse JSON strings
const safeJsonParse = (jsonString: string | null | undefined, fallback: any = null) => {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return fallback;
  }
};

interface RelatedTour {
  id: number;
  slug: string;
  title: string;
  duration: number;
  price: number;
  imageUrl: string;
}

const DestinationDetail = () => {
  const [matched, params] = useRoute<{ slug: string }>('/destination/:slug');
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'gallery' | 'map'>('overview');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const overviewRef = useRef<HTMLDivElement>(null);
  const activitiesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Determine if we're using an ID or slug for the API request
  const paramValue = params?.slug || '';
  const isNumeric = /^\d+$/.test(paramValue);
  const destinationId = isNumeric ? parseInt(paramValue, 10) : 0;
  const destinationSlug = !isNumeric ? paramValue : '';
  
  // Log the route parameters for debugging
  console.log('Route parameters:', { matched, paramValue, isNumeric, destinationId, destinationSlug });
  
  // Decide which API endpoint to use based on whether we have an ID or a slug
  // The .NET Core API can handle both ID-based and slug-based requests directly
  const queryEndpoint = destinationId ? ['/api/destinations', destinationId] : 
                        destinationSlug ? ['/api/destinations', destinationSlug] : 
                        ['/api/destinations', 0];
  
  // Fetch destination data
  const { data: destination, isLoading, error } = useQuery<Destination>({
    queryKey: queryEndpoint,
    enabled: !!(destinationId || destinationSlug)
  });

  // Error logging
  useEffect(() => {
    if (error) {
      console.error('Destination detail error:', error, 'Query endpoint:', queryEndpoint);
    }
  }, [error, queryEndpoint]);

  // Setup scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Check which section is visible
      if (overviewRef.current && scrollPosition >= overviewRef.current.offsetTop) {
        setActiveSection('overview');
        setActiveTab('overview');
      }
      
      if (activitiesRef.current && scrollPosition >= activitiesRef.current.offsetTop) {
        setActiveSection('activities');
        setActiveTab('activities');
      }
      
      if (galleryRef.current && scrollPosition >= galleryRef.current.offsetTop) {
        setActiveSection('gallery');
        setActiveTab('gallery');
      }
      
      if (mapRef.current && scrollPosition >= mapRef.current.offsetTop) {
        setActiveSection('map');
        setActiveTab('map');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Related tours based on the destination
  const relatedTours: RelatedTour[] = [
    {
      id: 1,
      slug: "cultural-heritage-tour",
      title: "Cultural Heritage Expedition",
      duration: 7,
      price: 2499,
      imageUrl: "/images/packages/cultural-heritage-expedition.jpg"
    },
    {
      id: 2,
      slug: "wildlife-safari",
      title: "Wildlife Safari Adventure",
      duration: 5,
      price: 1899,
      imageUrl: "/images/packages/wildlife-safari-adventure.jpg"
    },
    {
      id: 3,
      slug: "beach-retreat",
      title: "Tropical Beach Retreat",
      duration: 6,
      price: 2199,
      imageUrl: "/images/packages/tropical-beach-retreat.jpg"
    }
  ];

  // Define feature interface
  interface Feature {
    title: string;
    description: string;
    icon: string;
    imageUrl?: string;
  }
  
  // Use features from API or fallback to sample experiences
  const experiences: Feature[] = (destination as any)?.features || [
    {
      title: "Private Guided Tours",
      description: "Explore hidden gems with our expert local guides who bring history and culture to life.",
      icon: "guide"
    },
    {
      title: "Exclusive Access",
      description: "Skip the lines and enjoy special access to restricted areas without the crowds.",
      icon: "key"
    },
    {
      title: "Luxury Transportation",
      description: "Travel in air-conditioned comfort with our fleet of luxury vehicles.",
      icon: "transport"
    },
    {
      title: "Authentic Cuisine",
      description: "Savor local delicacies prepared by renowned chefs in stunning settings.",
      icon: "dining"
    }
  ];

  // Local experiences for this destination
  const localExperiences = (destination as any)?.localExperiences || 
    [
      {
        title: "Hiking Adventure",
        description: "Explore breathtaking trails with panoramic views of the surrounding landscape.",
        imageUrl: "/images/activities/hiking.jpg",
        duration: "3-4 hours",
        difficulty: "Moderate"
      },
      {
        title: "Cultural Tour",
        description: "Discover the rich cultural heritage and history with our expert local guides.",
        imageUrl: "/images/activities/cultural-tour.jpg",
        duration: "Half day",
        difficulty: "Easy"
      },
      {
        title: "Wildlife Safari",
        description: "Spot exotic wildlife in their natural habitat with our experienced trackers.",
        imageUrl: "/images/activities/wildlife-safari.jpg",
        duration: "Full day",
        difficulty: "Easy"
      }
    ];

  // Gallery image interface
  interface GalleryImage {
    url: string;
    alt: string;
  }
  
  // Gallery images - now directly use the structured gallery images from API
  const galleryImages: GalleryImage[] = (destination as any)?.galleryImages || 
    [
      {
        url: destination?.imageUrl || "/images/destinations/gallery/tropical-beach.jpg",
        alt: `${destination?.name} - Main View`
      },
      {
        url: "/images/destinations/gallery/mountain-view.jpg",
        alt: `${destination?.name} - Mountain View`
      },
      {
        url: "/images/destinations/gallery/mirissa-beach.jpg",
        alt: `${destination?.name} - Beach View`
      },
      {
        url: "/images/destinations/gallery/mirissa-palm.jpg",
        alt: `${destination?.name} - Palm Trees`
      },
      {
        url: "/images/destinations/gallery/romantic-beach.jpg",
        alt: `${destination?.name} - Romantic Beach`
      },
      {
        url: destination?.imageUrl || "/images/destinations/gallery/tropical-beach.jpg",
        alt: `${destination?.name} - Aerial View`
      }
    ];

  // Highlights - directly use the array from API
  const highlights: string[] = (destination as any)?.highlights || 
    ['Wildlife', 'Cultural Heritage', 'UNESCO Site', 'Panoramic Views'];

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg mb-8"></div>
        <div className="w-2/3 h-10 bg-gray-200 animate-pulse rounded-lg mb-4"></div>
        <div className="flex gap-4 mb-8">
          <div className="w-24 h-8 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="w-24 h-8 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="w-24 h-8 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="w-full h-40 bg-gray-200 animate-pulse rounded-lg mb-6"></div>
            <div className="w-full h-60 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
          <div>
            <div className="w-full h-80 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !destination) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-['Playfair_Display'] text-3xl text-[#0F4C81] mb-4">Destination Not Found</h2>
        <p className="mb-8">Sorry, we couldn't locate the destination you're looking for.</p>
        <Link href="/destinations" className="inline-block bg-[#0F4C81] text-white font-medium py-3 px-8 rounded-md">
          Return to Destinations
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10"></div>
        <div className="absolute inset-0">
          {destination.imageUrl ? (
            <HeroImage
              src={destination.imageUrl}
              alt={destination.name}
              className="object-cover"
            />
          ) : (
            <HeroImage
              src="https://images.unsplash.com/photo-1583087253076-5d1315860eb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt={destination.name}
              className="object-cover"
            />
          )}
        </div>
        
        <div className="absolute top-0 left-0 w-full z-20">
          <div className="container mx-auto px-4 pt-8 flex justify-between items-center">
            <Link href="/destinations" className="flex items-center gap-2 text-white hover:text-[#D4AF37] transition-colors">
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span>Back to All Destinations</span>
            </Link>
            
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition">
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full z-20">
          <div className="container mx-auto px-4 pb-8 md:pb-12">
            <div className="bg-white/10 backdrop-blur-sm py-1 px-3 rounded-full text-white text-sm inline-block mb-4">
              {destination.region || 'Sri Lanka'}
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
              {destination.name}
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mb-6">
              {destination.shortDescription || destination.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {highlights.slice(0, 3).map((highlight: string, index: number) => (
                <span key={index} className="bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-white">
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 bg-white z-30 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button 
              onClick={() => {
                setActiveTab('overview');
                if (overviewRef.current) {
                  overviewRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'overview' 
                  ? 'border-[#0F4C81] text-[#0F4C81]' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => {
                setActiveTab('activities');
                if (activitiesRef.current) {
                  activitiesRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'activities' 
                  ? 'border-[#0F4C81] text-[#0F4C81]' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Local Experiences
            </button>
            <button 
              onClick={() => {
                setActiveTab('gallery');
                if (galleryRef.current) {
                  galleryRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'gallery' 
                  ? 'border-[#0F4C81] text-[#0F4C81]' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Gallery
            </button>
            <button 
              onClick={() => {
                setActiveTab('map');
                if (mapRef.current) {
                  mapRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === 'map' 
                  ? 'border-[#0F4C81] text-[#0F4C81]' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Map
            </button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section ref={overviewRef} className="py-12 bg-white" id="overview">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              <div className="mb-10">
                <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-6">About {destination.name}</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700">
                    {destination.fullDescription || destination.shortDescription || destination.excerpt || destination.description}
                  </p>
                  <p className="text-gray-700">
                    {destination.fullDescription && (destination.description || destination.shortDescription || destination.excerpt) ? 
                      (destination.description || destination.shortDescription || destination.excerpt) : 
                      `Our luxury tours to ${destination.name} offer an unparalleled travel experience with exclusive access to key sites, private guides, and exquisite accommodation options. Whether you're seeking cultural immersion, adventure, or simply relaxation, our tailored packages ensure you experience the very best this destination has to offer.`
                    }
                  </p>
                </div>
              </div>
              
              {/* Highlights & Experiences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {experiences.map((experience: Feature, index: number) => (
                  <div key={index} className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#0F4C81]/30 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="p-6">
                      <div className="flex mb-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                          <FeatureImage 
                            src={experience.imageUrl 
                              ? experience.imageUrl 
                              : experience.icon === 'heritage-walk' 
                              ? "/images/activities/guide-experience.jpg" 
                              : experience.icon === 'boutique-hotel' 
                              ? "/images/activities/exclusive-access.jpg"
                              : experience.icon === 'sunset'
                              ? "/images/activities/luxury-transport.jpg"
                              : experience.icon === 'coffee-art'
                              ? "/images/activities/authentic-cuisine.jpg"
                              : experience.icon === 'guide' 
                              ? "/images/activities/guide-experience.jpg" 
                              : experience.icon === 'key' 
                              ? "/images/activities/exclusive-access.jpg"
                              : experience.icon === 'transport'
                              ? "/images/activities/luxury-transport.jpg"
                              : "/images/activities/authentic-cuisine.jpg"} 
                            alt={experience.title}
                          />
                        </div>
                        <div>
                          <div className="inline-flex items-center text-[#0F4C81] mb-2">
                            {experience.icon === 'heritage-walk' ? (
                              <Users className="w-4 h-4 mr-2" />
                            ) : experience.icon === 'boutique-hotel' ? (
                              <Bookmark className="w-4 h-4 mr-2" />
                            ) : experience.icon === 'sunset' ? (
                              <Sun className="w-4 h-4 mr-2" />
                            ) : experience.icon === 'coffee-art' ? (
                              <Coffee className="w-4 h-4 mr-2" />
                            ) : experience.icon === 'guide' ? (
                              <Users className="w-4 h-4 mr-2" />
                            ) : experience.icon === 'key' ? (
                              <Bookmark className="w-4 h-4 mr-2" />
                            ) : experience.icon === 'transport' ? (
                              <Compass className="w-4 h-4 mr-2" />
                            ) : (
                              <MessageCircle className="w-4 h-4 mr-2" />
                            )}
                            <span className="text-sm font-medium">Exclusive</span>
                          </div>
                          <h3 className="font-['Playfair_Display'] text-xl font-medium text-gray-900">{experience.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{experience.description}</p>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Featured Experience</span>
                          <div className="w-8 h-8 rounded-full bg-[#F9F7F4] group-hover:bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] transition-colors duration-300">
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Related Tours */}
              <div className="mt-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81]">
                    Tours Featuring {destination.name}
                  </h2>
                  <Link href="/tour-packages" className="text-[#0F4C81] hover:text-[#D4AF37] flex items-center gap-1 font-medium">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedTours.slice(0, 2).map((tour) => (
                    <div key={tour.id} className="flex bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="w-1/3 h-auto relative">
                        <FeatureImage
                          src={tour.imageUrl} 
                          alt={tour.title}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-1">{tour.title}</h3>
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{tour.duration} Days</span>
                          <span className="mx-2">•</span>
                          <Users className="w-4 h-4 mr-1" />
                          <span>Max 12 people</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-[#0F4C81]">
                            From {formatPrice(tour.price)}
                          </span>
                          <Link 
                            href={`/tour/${tour.slug}`} 
                            className="text-[#0F4C81] hover:text-[#D4AF37] transition"
                          >
                            <ArrowRight className="w-5 h-5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-[#F9F7F4] p-6 rounded-xl shadow-sm sticky top-24">
                <h3 className="font-['Playfair_Display'] text-xl font-bold mb-6 text-gray-900">Essential Information</h3>
                
                <div className="space-y-5">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Best Time to Visit</h4>
                      <p className="text-gray-600">{destination.bestTimeToVisit || "January to April"}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Recommended Duration</h4>
                      <p className="text-gray-600">{destination.recommendedDuration || "1-2 Days"}</p>
                    </div>
                  </div>
                  
                  {destination.weatherInfo && (
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                        <Sun className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Weather</h4>
                        <p className="text-gray-600">{destination.weatherInfo}</p>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {highlights.map((highlight: string, index: number) => (
                        <span key={index} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {(destination as any)?.travelTips && (destination as any).travelTips.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Travel Tips</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {((destination as any).travelTips || []).map((tip: string, index: number) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link 
                    href="/custom-tour-request" 
                    className="block w-full bg-[#0F4C81] hover:bg-[#0D3E6A] text-white font-medium py-3 px-6 rounded-lg text-center transition"
                  >
                    Create Custom Tour
                  </Link>
                  <Link 
                    href="/contact" 
                    className="block w-full bg-white border border-[#0F4C81] text-[#0F4C81] hover:bg-[#F9F7F4] font-medium py-3 px-6 rounded-lg text-center mt-3 transition"
                  >
                    Ask a Question
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Experiences Section */}
      <section ref={activitiesRef} className="py-12 bg-[#F9F7F4]" id="activities">
        <div className="container mx-auto px-4">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-center text-[#0F4C81] mb-10">
            Local Experiences in {destination.name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {localExperiences.map((experience: any, index: number) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="relative h-56">
                  <ExperienceImage 
                    src={experience.imageUrl || `/images/activities/activity-${index + 1}.jpg`} 
                    alt={experience.title}
                    className="w-full h-full"
                  />
                  {experience.difficulty && (
                    <div className="absolute top-4 right-4 bg-white/90 text-[#0F4C81] px-3 py-1 rounded-full text-sm font-medium">
                      {experience.difficulty}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2 text-gray-900">{experience.title}</h3>
                  
                  {experience.duration && (
                    <div className="flex items-center text-gray-500 mb-3">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{experience.duration}</span>
                    </div>
                  )}
                  
                  <p className="text-gray-600 mb-5">{experience.description}</p>
                  
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center text-[#0F4C81] font-medium hover:text-[#D4AF37] gap-1 transition"
                  >
                    Book This Experience
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="py-12 bg-white" id="gallery">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81]">
              Photo Gallery
            </h2>
            <div className="flex items-center gap-2 text-[#0F4C81]">
              <Camera className="w-5 h-5" />
              <span className="font-medium">{galleryImages.length} Photos</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image: GalleryImage, index: number) => (
              <div 
                key={index} 
                className={`rounded-xl overflow-hidden ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <GalleryImage 
                  src={image.url} 
                  alt={image.alt || `${destination.name} - Image ${index + 1}`}
                  className="w-full h-full hover:scale-105 transition-transform duration-500"
                  featured={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapRef} className="py-12 bg-[#F9F7F4]" id="map">
        <div className="container mx-auto px-4">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-10 text-center">
            Location & Map
          </h2>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-4">
            <div className="aspect-[16/9] bg-[#E8EDF0] rounded-lg mb-4 flex items-center justify-center relative">
              <div className="flex flex-col items-center text-[#0F4C81]">
                <MapIcon className="w-16 h-16 mb-2 opacity-30" />
                <p className="text-lg font-medium">Interactive map available on our premium plan</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-[#0F4C81] rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-2">
              <MapPin className="w-5 h-5 text-[#0F4C81]" />
              <p className="text-gray-600">
                {destination.region ? `${destination.name}, ${destination.region}` : `${destination.name}, Sri Lanka`}
              </p>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4 text-gray-900">
                Getting There
              </h3>
              <p className="text-gray-600 mb-2">
                {(destination as any).gettingThere || `${destination.name} is accessible by car from Colombo, with a journey time of approximately 3-4 hours depending on traffic. Private transfers, taxis and buses are available.`}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4 text-gray-900">
                Nearby Attractions
              </h3>
              <ul className="text-gray-600 space-y-2">
                {((destination as any)?.nearbyAttractions && (destination as any).nearbyAttractions.length > 0) ? 
                  ((destination as any).nearbyAttractions || []).map((attraction: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="w-4 h-4 text-[#0F4C81] mt-1 mr-1 flex-shrink-0" />
                      <span>{attraction}</span>
                    </li>
                  )) : (
                    <>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-[#0F4C81] mt-1 mr-1 flex-shrink-0" />
                        <span>Nearby Wildlife Sanctuary</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-[#0F4C81] mt-1 mr-1 flex-shrink-0" />
                        <span>Local Cultural Village</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-[#0F4C81] mt-1 mr-1 flex-shrink-0" />
                        <span>Ancient Temple Complex</span>
                      </li>
                    </>
                  )
                }
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4 text-gray-900">
                Accommodation
              </h3>
              <p className="text-gray-600 mb-2">
                {(destination as any).accommodation || `We offer a range of luxury accommodations near ${destination.name}, from boutique hotels to private villas. All properties are carefully selected for comfort, service and unique character.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {((destination as any)?.faQs?.length > 0) && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {((destination as any)?.faQs || []).map((faq: {question: string, answer: string}, index: number) => (
                  <div key={index} className="bg-[#F9F7F4] rounded-xl overflow-hidden">
                    <details className="group">
                      <summary className="flex justify-between items-center p-6 cursor-pointer">
                        <h3 className="font-['Playfair_Display'] text-xl font-semibold text-gray-900">
                          {faq.question}
                        </h3>
                        <ChevronDown className="w-5 h-5 text-[#0F4C81] group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="px-6 pb-6 text-gray-600">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-[#0F4C81] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <BackgroundImage 
            src={destination.imageUrl || "https://images.unsplash.com/photo-1551357141-b1311e102261?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} 
            alt={`${destination.name} landscape`}
            className="w-full h-full"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience {destination.name}?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Let our experts craft a personalized journey featuring {destination.name}, tailored to your preferences and travel style.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/tour-packages" 
                className="bg-white hover:bg-[#D4AF37] text-[#0F4C81] hover:text-white font-medium py-3 px-8 rounded-lg transition"
              >
                Browse Tour Packages
              </Link>
              <Link 
                href="/custom-tour-request" 
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium py-3 px-8 rounded-lg transition"
              >
                Create Custom Tour
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DestinationDetail;