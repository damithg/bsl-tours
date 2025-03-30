import React from "react";
import { Link } from "wouter";
import { Home, ChevronRight, Calendar, Users, Camera, ChevronDown } from "lucide-react";
import { AsymmetricalGallery, GalleryImage } from "@/components/AsymmetricalGallery";
import { parseJsonSafely } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/optimized-image";

// We define our own Destination interface to ensure it matches what we need for the template
interface Destination {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  featured?: boolean | null;
  slug?: string | null;
  shortDescription?: string | null;
  highlights?: string | null;
  bestTimeToVisit?: string | null;
  recommendedDuration?: string | null;
  weatherInfo?: string | null;
  address?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  region?: string | null;
  // Enhanced template fields
  detailedSections?: string | null;
  pointsOfInterest?: string | null;
  toursFeaturing?: string | null;
  localExperiences?: string | null;
  galleryImages?: string | null | any[];
  faqs?: string | null;
  essentialInfo?: string | null;
  nearbyAttractions?: string | null;
  // Allow any additional properties
  [key: string]: any;
}

// Helper Types
interface PointOfInterest {
  title: string;
  description: string;
  imageUrl: string;
  tag?: string;
  tagType?: 'default' | 'highlight' | 'cultural' | 'scenic';
  icon?: string;
  iconLabel?: string;
}

interface DetailedSection {
  title: string;
  content: string;
  imageUrl?: string;
  imageCaption?: string;
}

interface LocalExperience {
  id: number | string;
  title: string;
  description: string;
  imageUrl: string;
  price?: number;
  duration?: string;
  bookingUrl?: string;
}

interface NearbyAttraction {
  name: string;
  description: string;
  distance?: string;
  travelTime?: string;
  imageUrl?: string;
}

interface TourFeature {
  id: number | string;
  title: string;
  imageUrl: string;
  duration: string;
  maxPeople: number;
  price: number;
  isBestSeller?: boolean;
  slug?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface EnhancedDestinationTemplateProps {
  destination: Destination;
}

export const EnhancedDestinationTemplate: React.FC<EnhancedDestinationTemplateProps> = ({ destination }) => {
  // Parse JSON data from the destination with better debugging
  const pointsOfInterest = parseJsonSafely<PointOfInterest[]>(
    destination.pointsOfInterest, 
    [], 
    'template-pointsOfInterest'
  );
  
  const detailedSections = parseJsonSafely<DetailedSection[]>(
    destination.detailedSections, 
    [], 
    'template-detailedSections'
  );
  
  const localExperiences = parseJsonSafely<LocalExperience[]>(
    destination.localExperiences, 
    [], 
    'template-localExperiences'
  );
  
  const nearbyAttractions = parseJsonSafely<NearbyAttraction[]>(
    destination.nearbyAttractions, 
    [], 
    'template-nearbyAttractions'
  );
  
  const toursFeaturing = parseJsonSafely<TourFeature[]>(
    destination.toursFeaturing, 
    [], 
    'template-toursFeaturing'
  );
  
  const galleryImages = parseJsonSafely<GalleryImage[]>(
    destination.galleryImages, 
    [], 
    'template-galleryImages'
  );
  
  const faqs = parseJsonSafely<FAQ[]>(
    destination.faqs, 
    [], 
    'template-faqs'
  );
  
  const essentialInfo = parseJsonSafely<{gettingThere?: string; travelTips?: string}>(
    destination.essentialInfo, 
    {}, 
    'template-essentialInfo'
  );
  
  // For debugging - add hard-coded fallback experiences when none are provided
  const hardcodedLocalExperiences: LocalExperience[] = [
    {
      id: 1,
      title: "Galle Fort Heritage Walk",
      description: "A curated tour led by a local historian exploring key landmarks inside the fort.",
      imageUrl: "/images/experiences/heritage-walk.jpg"
    },
    {
      id: 2,
      title: "Sunset at the Lighthouse",
      description: "Stroll to the iconic Galle lighthouse and enjoy panoramic views at dusk.",
      imageUrl: "/images/experiences/sunset-lighthouse.jpg"
    },
    {
      id: 3,
      title: "Artisan Shopping Trail",
      description: "Browse handmade jewelry, batik fabrics, and crafts from local artists.",
      imageUrl: "/images/experiences/shopping-trail.jpg"
    }
  ];
  
  const hardcodedGalleryImages: GalleryImage[] = [
    {
      publicId: "activities/galle-fort-ramparts",
      alt: "Galle Fort Rampart Walls",
      caption: "Historic rampart walls surrounding Galle Fort",
      orientation: "landscape",
      baseUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743212891/galle-fort_kqntzk.jpg",
      small: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1743212891/galle-fort_kqntzk.jpg",
      medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_600,c_fill/v1743212891/galle-fort_kqntzk.jpg",
      large: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_900,c_fill/v1743212891/galle-fort_kqntzk.jpg"
    }
  ];
  
  const hardcodedFaqs: FAQ[] = [
    {
      question: "What is the best time to visit this destination?",
      answer: "The best time to visit is during the dry season (December to April) when the weather is sunny and ideal for sightseeing and outdoor activities."
    },
    {
      question: "How do I get to this destination from Colombo?",
      answer: "You can reach this destination by private car (recommended for comfort), taxi, or public bus. The journey takes approximately 3-5 hours depending on traffic conditions."
    },
    {
      question: "Are there any entrance fees?",
      answer: "Yes, there may be entrance fees for certain attractions within this destination. These typically range from $5-25 USD per person depending on the site."
    },
    {
      question: "What should I wear when visiting?",
      answer: "We recommend light, breathable clothing due to Sri Lanka's tropical climate. For cultural and religious sites, please dress modestly with shoulders and knees covered."
    }
  ];
  
  // Add enhanced debug information
  console.log('EnhancedDestinationTemplate Data:', {
    destination: destination.name,
    parsedDetailedSections: detailedSections,
    parsedPointsOfInterest: pointsOfInterest,
    parsedToursFeaturing: toursFeaturing,
    rawLocalExperiences: destination.localExperiences,
    parsedLocalExperiences: localExperiences,
    finalLocalExperiences: localExperiences.length > 0 ? localExperiences : hardcodedLocalExperiences,
    rawGalleryImages: destination.galleryImages,
    parsedGalleryImages: galleryImages,
    finalGalleryImages: galleryImages.length > 0 ? galleryImages : hardcodedGalleryImages,
    rawFaqs: destination.faqs,
    parsedFaqs: faqs,
    finalFaqs: faqs.length > 0 ? faqs : hardcodedFaqs,
    rawEssentialInfo: destination.essentialInfo,
    parsedEssentialInfo: essentialInfo
  });
  
  // FAQ toggles
  const [openFaqs, setOpenFaqs] = React.useState<number[]>([]);
  
  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  // Get appropriate hero image URL
  const heroImageUrl = ((destination as any).images?.banner || destination.imageUrl);
  
  // Helper function to get the first section image
  const getFirstSectionImage = () => {
    if (detailedSections && detailedSections.length > 0 && detailedSections[0].imageUrl) {
      return detailedSections[0].imageUrl;
    }
    return destination.imageUrl;
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section with Banner Image */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImageUrl} 
            alt={destination.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-end pb-16">
          {/* Breadcrumb Navigation */}
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
                  <Link href="/destinations" className="ml-1 text-sm font-medium text-white/90 hover:text-white">
                    Destinations
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-white/60" />
                  <span className="ml-1 text-sm font-medium text-white/80">
                    {destination.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          
          <div className="max-w-4xl">
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {destination.name}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              {destination.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Introduction Section */}
              <div className="mb-16">
                {detailedSections && detailedSections.length > 0 && (
                  <>
                    <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#0F4C81] mb-8">
                      {detailedSections[0].title}
                    </h2>
                    
                    <p className="text-lg text-[#333333]/90 mb-6 leading-relaxed">
                      {detailedSections[0].content}
                    </p>
                  </>
                )}
                
                {/* Featured Image - Main View */}
                {(detailedSections && detailedSections.length > 0 && detailedSections[0].imageUrl) && (
                  <div className="rounded-lg overflow-hidden shadow-xl mb-8">
                    <img 
                      src={detailedSections[0].imageUrl} 
                      alt={destination.name} 
                      className="w-full h-auto" 
                    />
                    {detailedSections[0].imageCaption && (
                      <div className="bg-[#F8F5F0] p-4 text-center">
                        <p className="text-[#333333]/80 italic">{detailedSections[0].imageCaption}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Additional Detailed Sections */}
                {detailedSections && detailedSections.length > 1 && detailedSections.slice(1).map((section, index) => (
                  <div key={`section-${index}`} className="mt-12">
                    <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-4">
                      {section.title}
                    </h3>
                    <p className="text-lg text-[#333333]/90 mb-8 leading-relaxed">
                      {section.content}
                    </p>
                    
                    {section.imageUrl && (
                      <div className="rounded-lg overflow-hidden shadow-xl mb-12">
                        <img 
                          src={section.imageUrl} 
                          alt={section.title} 
                          className="w-full h-auto" 
                        />
                        {section.imageCaption && (
                          <div className="bg-[#F8F5F0] p-4 text-center">
                            <p className="text-[#333333]/80 italic">{section.imageCaption}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Points of Interest */}
                {pointsOfInterest && pointsOfInterest.length > 0 && (
                  <div className="mt-12">
                    <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-8">
                      What Awaits You
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      {pointsOfInterest.map((poi, index) => (
                        <div 
                          key={`poi-${index}`}
                          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={poi.imageUrl} 
                              alt={poi.title} 
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#0F4C81]">
                              {poi.tag || 'Must See'}
                            </div>
                          </div>
                          <div className="p-6">
                            <h4 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-3">{poi.title}</h4>
                            <p className="text-gray-600 mb-4">
                              {poi.description}
                            </p>
                            <div className="flex items-center text-sm text-[#0F4C81]">
                              <span className="inline-block w-4 h-4 rounded-full bg-[#0F4C81]/10 mr-2 flex items-center justify-center">
                                <i className="fas fa-monument text-xs"></i>
                              </span>
                              <span>{poi.iconLabel || 'Key Attraction'}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Tours Featuring This Destination */}
              {toursFeaturing && toursFeaturing.length > 0 && (
                <div className="mt-12 mb-16">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81]">
                      Tours Featuring {destination.name}
                    </h2>
                    <Link href="/tour-packages" className="text-[#0F4C81] hover:text-[#D4AF37] flex items-center gap-1 font-medium">
                      View All <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {toursFeaturing.map((tour, index) => (
                      <div 
                        key={`tour-${tour.id || index}`}
                        className="flex bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="w-1/3 h-auto relative">
                          <img 
                            src={tour.imageUrl} 
                            alt={tour.title} 
                            className="w-full h-full object-cover" 
                          />
                          {tour.isBestSeller && (
                            <div className="absolute top-2 right-2 bg-[#D4AF37] text-white text-xs px-2 py-0.5 rounded-full">
                              Best Seller
                            </div>
                          )}
                        </div>
                        <div className="w-2/3 p-4">
                          <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-1">{tour.title}</h3>
                          <div className="flex items-center text-gray-500 text-sm mb-2">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{tour.duration}</span>
                            <span className="mx-2">•</span>
                            <Users className="w-4 h-4 mr-1" />
                            <span>Max {tour.maxPeople} people</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-[#0F4C81]">
                              From ${tour.price}
                            </span>
                            <Link 
                              href={`/packages/${tour.slug || tour.id}`}
                              className="text-sm font-medium text-[#0F4C81] hover:text-[#D4AF37]"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Photo Gallery - Use fallback if needed */}
              {(galleryImages.length > 0 || hardcodedGalleryImages.length > 0) && (
                <div className="mt-12 mb-16">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81]">
                      Photo Gallery
                    </h2>
                  </div>
                  <AsymmetricalGallery 
                    images={galleryImages.length > 0 ? galleryImages : hardcodedGalleryImages} 
                  />
                </div>
              )}
              
              {/* Local Experiences - Use fallback if needed */}
              {(localExperiences.length > 0 || hardcodedLocalExperiences.length > 0) && (
                <div className="mt-12 mb-16">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81]">
                      Local Experiences
                    </h2>
                    <Link href="/experiences" className="text-[#0F4C81] hover:text-[#D4AF37] flex items-center gap-1 font-medium">
                      View All <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(localExperiences.length > 0 ? localExperiences : hardcodedLocalExperiences).map((experience, index) => (
                      <div 
                        key={`exp-${experience.id || index}`}
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={experience.imageUrl} 
                            alt={experience.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-3">{experience.title}</h3>
                          <p className="text-gray-600 mb-4">
                            {experience.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-[#0F4C81]">
                              {experience.price ? `$${experience.price}` : "Price on request"}
                            </span>
                            <a 
                              href={experience.bookingUrl || "#"} 
                              className="text-[#0F4C81] font-medium hover:text-[#D4AF37]"
                            >
                              Book This Experience
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* FAQs Section - Use hardcoded data if needed */}
              {(faqs.length > 0 || hardcodedFaqs.length > 0) && (
                <div className="mt-12 mb-16">
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-6">
                    Frequently Asked Questions
                  </h2>
                  
                  <div className="space-y-4">
                    {(faqs.length > 0 ? faqs : hardcodedFaqs).map((faq, index) => (
                      <div key={`faq-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50"
                          onClick={() => toggleFaq(index)}
                          aria-expanded={openFaqs.includes(index)}
                        >
                          <span className="font-medium text-[#0F4C81]">{faq.question}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-[#0F4C81] transition-transform ${
                              openFaqs.includes(index) ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openFaqs.includes(index) && (
                          <div className="p-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              {/* Essential Information Card */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="p-6">
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0F4C81] mb-4">
                    Essential Information
                  </h3>
                  
                  {/* Best Time to Visit */}
                  {destination.bestTimeToVisit && (
                    <div className="mb-4">
                      <p className="font-semibold text-gray-800 mb-1">Best Time to Visit</p>
                      <p className="text-gray-600">{destination.bestTimeToVisit}</p>
                    </div>
                  )}
                  
                  {/* Recommended Duration */}
                  {destination.recommendedDuration && (
                    <div className="mb-4">
                      <p className="font-semibold text-gray-800 mb-1">Recommended Duration</p>
                      <p className="text-gray-600">{destination.recommendedDuration}</p>
                    </div>
                  )}
                  
                  {/* Getting Here */}
                  {essentialInfo.gettingThere && (
                    <div className="mb-4">
                      <p className="font-semibold text-gray-800 mb-1">Getting Here</p>
                      <p className="text-gray-600">{essentialInfo.gettingThere}</p>
                    </div>
                  )}
                  
                  {/* Nearby Attractions */}
                  {nearbyAttractions && nearbyAttractions.length > 0 && (
                    <div className="mb-4">
                      <p className="font-semibold text-gray-800 mb-1">Nearby Attractions</p>
                      <ul className="list-disc list-inside text-gray-600">
                        {nearbyAttractions.map((attraction, index) => (
                          <li key={`attraction-${index}`} className="mb-1">
                            <span className="font-medium">{attraction.name}</span>
                            {attraction.distance && <span> - {attraction.distance}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Travel Tips */}
                  {essentialInfo.travelTips && (
                    <div className="mb-4">
                      <p className="font-semibold text-gray-800 mb-1">Travel Tips</p>
                      <p className="text-gray-600">{essentialInfo.travelTips}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Highlights Card */}
              {destination.highlights && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
                  <div className="p-6">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0F4C81] mb-4">
                      Highlights
                    </h3>
                    
                    <ul className="space-y-2">
                      {parseJsonSafely<string[]>(destination.highlights, []).map((highlight, index) => (
                        <li key={`highlight-${index}`} className="flex items-start">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#0F4C81]/10 text-[#0F4C81] mr-3 mt-0.5">
                            ✓
                          </span>
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Weather Card */}
              {destination.weatherInfo && (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
                  <div className="p-6">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0F4C81] mb-4">
                      Weather
                    </h3>
                    <p className="text-gray-600">{destination.weatherInfo}</p>
                  </div>
                </div>
              )}
              
              {/* Map Location Card */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0F4C81] mb-4">
                    Location
                  </h3>
                  
                  {/* Map Placeholder */}
                  <div className="rounded-lg overflow-hidden h-48 bg-gray-200 mb-4 relative">
                    {destination.latitude && destination.longitude ? (
                      <iframe
                        title={`Map of ${destination.name}`}
                        className="w-full h-full border-0"
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${destination.latitude},${destination.longitude}&zoom=12`}
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-500">Map not available</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Address */}
                  {destination.address && (
                    <p className="text-gray-600">
                      <span className="font-semibold">Address:</span> {destination.address}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};