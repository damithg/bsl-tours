import React from "react";
import { Link } from "wouter";
import { Home, ChevronRight, Calendar, Users, Camera, ChevronDown } from "lucide-react";
import { AsymmetricalGallery, GalleryImage } from "@/components/AsymmetricalGallery";
import { parseJsonSafely } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Destination as ApiDestination } from "@/lib/queryClient";

// We'll use the ApiDestination interface directly, but add a new interface for our component props
// This avoids type conflicts between the backend and frontend interfaces
interface EnhancedDestinationProps {
  // Core properties
  id: number;
  name: string;
  slug: string;
  description?: string; // Will be populated from overview.fullDescription if missing
  imageUrl?: string | null; // Will be populated from heroImage.publicId if missing
  featured: boolean;
  // Other properties needed by the template
  essentialInfo?: ApiDestination['essentialInfo'];
  overview?: ApiDestination['overview'];
  heroImage?: ApiDestination['heroImage'];
  galleryImages?: ApiDestination['galleryImages'];
  nearbyAttractions?: ApiDestination['nearbyAttractions'];
  faqs?: ApiDestination['faqs'];
  // Allow any additional properties from the destination
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
  destination: EnhancedDestinationProps;
}

export const EnhancedDestinationTemplate: React.FC<EnhancedDestinationTemplateProps> = ({ destination }) => {
  // Ensure description is populated - use overview.fullDescription if available
  if (!destination.description && destination.overview?.fullDescription) {
    destination.description = destination.overview.fullDescription;
  }
  
  // Ensure imageUrl is populated - use heroImage.publicId through Cloudinary if available
  if (!destination.imageUrl && destination.heroImage?.publicId) {
    destination.imageUrl = `https://res.cloudinary.com/drsjp6bqz/image/upload/${destination.heroImage.publicId}`;
  }
  
  // Convert subSections to DetailedSections format
  const apiDetailedSections: DetailedSection[] = [];
  
  if (destination.overview) {
    apiDetailedSections.push({
      title: destination.overview.title,
      content: destination.overview.fullDescription,
      imageUrl: destination.heroImage ? 
        `https://res.cloudinary.com/drsjp6bqz/image/upload/${destination.heroImage.publicId}` :
        undefined,
      imageCaption: destination.heroImage?.caption
    });
  }
  
  if (destination.subSections && destination.subSections.length > 0) {
    destination.subSections.forEach((section: { 
      title: string; 
      fullDescription: string;
      image?: {
        id?: number;
        publicId?: string;
        alt?: string;
        caption?: string;
        orientation?: string;
      }
    }) => {
      apiDetailedSections.push({
        title: section.title,
        content: section.fullDescription,
        imageUrl: section.image?.publicId 
          ? `https://res.cloudinary.com/drsjp6bqz/image/upload/${section.image.publicId}`
          : undefined,
        imageCaption: section.image?.caption
      });
    });
  }
  
  // Convert featureSection.items to PointsOfInterest format
  const apiPointsOfInterest: PointOfInterest[] = [];
  
  if (destination.featuresSection?.items && destination.featuresSection.items.length > 0) {
    destination.featuresSection.items.forEach((item: { 
      title: string; 
      description: string;
      image?: { publicId: string; alt: string; } 
    }) => {
      apiPointsOfInterest.push({
        title: item.title,
        description: item.description,
        imageUrl: item.image ? 
          `https://res.cloudinary.com/drsjp6bqz/image/upload/${item.image.publicId}` :
          "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743212891/sigiriya-entrance_kqntzk.jpg",
        tag: 'Featured',
        iconLabel: 'Key Attraction'
      });
    });
  }
  
  // Convert API relatedTours to TourFeature format
  const apiToursFeaturing: TourFeature[] = [];
  
  if (destination.relatedTours && destination.relatedTours.length > 0) {
    destination.relatedTours.forEach((tour: {
      id: number;
      name: string;
      slug: string;
      duration: string;
      startingFrom: number;
    }) => {
      apiToursFeaturing.push({
        id: tour.id,
        title: tour.name,
        slug: tour.slug,
        imageUrl: `https://res.cloudinary.com/drsjp6bqz/image/upload/tours/${tour.slug}`,  // Placeholder URL
        duration: tour.duration,
        maxPeople: 12,  // Default value
        price: tour.startingFrom,
        isBestSeller: false
      });
    });
  }
  
  // Convert API galleryImages to GalleryImage format
  const apiGalleryImages: GalleryImage[] = [];
  
  if (destination.galleryImages && destination.galleryImages.length > 0) {
    destination.galleryImages.forEach((img: {
      id: number;
      publicId: string;
      alt: string;
      caption?: string;
      orientation?: string;
    }) => {
      apiGalleryImages.push({
        publicId: img.publicId,
        alt: img.alt,
        caption: img.caption,
        orientation: img.orientation || 'landscape',
        baseUrl: `https://res.cloudinary.com/drsjp6bqz/image/upload/${img.publicId}`,
        small: `https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/${img.publicId}`,
        medium: `https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_600,c_fill/${img.publicId}`, 
        large: `https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_900,c_fill/${img.publicId}`
      });
    });
  }
  
  // Use the new API FAQs structure directly if it exists
  const apiFaqs: FAQ[] = destination.faqs && destination.faqs.length > 0 ? 
    destination.faqs.map((faq: { id: number; question: string; answer: string }) => ({
      question: faq.question,
      answer: faq.answer
    })) : [];
  
  // Convert API nearbyAttractions to our format
  const apiNearbyAttractions: NearbyAttraction[] = destination.nearbyAttractions && Array.isArray(destination.nearbyAttractions) ? 
    destination.nearbyAttractions.map((attraction: {
      id: number;
      name: string;
      description: string;
      distance?: string;
      travelTime?: string;
    }) => ({
      name: attraction.name,
      description: attraction.description,
      distance: attraction.distance,
      travelTime: attraction.travelTime,
    })) : [];
  
  // Create essentialInfo from API data
  const apiEssentialInfo = destination.essentialInfo || {};
  
  // Legacy parsing for backward compatibility
  // Parse JSON data from the destination with better debugging
  const parsedPointsOfInterest = parseJsonSafely<PointOfInterest[]>(
    destination.pointsOfInterest, 
    [], 
    'template-pointsOfInterest'
  );
  
  const parsedDetailedSections = parseJsonSafely<DetailedSection[]>(
    destination.detailedSections, 
    [], 
    'template-detailedSections'
  );
  
  const localExperiences = parseJsonSafely<LocalExperience[]>(
    destination.localExperiences, 
    [], 
    'template-localExperiences'
  );
  
  const parsedNearbyAttractions = parseJsonSafely<NearbyAttraction[]>(
    destination.nearbyAttractions, 
    [], 
    'template-nearbyAttractions'
  );
  
  const parsedToursFeaturing = parseJsonSafely<TourFeature[]>(
    destination.toursFeaturing, 
    [], 
    'template-toursFeaturing'
  );
  
  const parsedGalleryImages = parseJsonSafely<GalleryImage[]>(
    destination.galleryImages, 
    [], 
    'template-galleryImages'
  );
  
  const parsedFaqs = parseJsonSafely<FAQ[]>(
    destination.faqs, 
    [], 
    'template-faqs'
  );
  
  // Define a type for essential info to avoid TypeScript errors
  interface EssentialInfoType {
    id?: number;
    gettingThere?: string;
    bestTimeToVisit?: string;
    entryRequirements?: string;
    localCuisine?: string;
    travelTips?: string;
    [key: string]: any;
  }
  
  const parsedEssentialInfo = parseJsonSafely<EssentialInfoType>(
    destination.essentialInfo, 
    { 
      gettingThere: '',
      travelTips: '',
      bestTimeToVisit: '',
      entryRequirements: '',
      localCuisine: ''
    }, 
    'template-essentialInfo'
  );
  
  // Combine both API and parsed data, prioritizing API data
  const detailedSections = apiDetailedSections.length > 0 ? apiDetailedSections : parsedDetailedSections;
  const pointsOfInterest = apiPointsOfInterest.length > 0 ? apiPointsOfInterest : parsedPointsOfInterest;
  const toursFeaturing = apiToursFeaturing.length > 0 ? apiToursFeaturing : parsedToursFeaturing;
  const galleryImages = apiGalleryImages.length > 0 ? apiGalleryImages : parsedGalleryImages;
  const faqs = apiFaqs.length > 0 ? apiFaqs : parsedFaqs;
  const nearbyAttractions = apiNearbyAttractions.length > 0 ? apiNearbyAttractions : parsedNearbyAttractions;
  const essentialInfo: EssentialInfoType = Object.keys(apiEssentialInfo).length > 0 
    ? apiEssentialInfo as EssentialInfoType 
    : parsedEssentialInfo;
  
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
  
  // Add hardcoded detailed sections for Sigiriya when none are provided
  const hardcodedDetailedSections: DetailedSection[] = [
    {
      title: "Step Into a Lost Kingdom",
      content: "Imagine standing at the foot of a towering rock that rises straight out of the jungle — 200 meters high — with ancient lion paws guarding the entrance. This isn't just a rock. This is Sigiriya, the heart of a forgotten kingdom, carved with ambition, mystery, and breathtaking artistry.",
      imageUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743212891/sigiriya-entrance_kqntzk.jpg",
      imageCaption: "The majestic entrance to Sigiriya Rock Fortress"
    },
    {
      title: "A Royal Sanctuary in the Sky",
      content: "In the 5th century, King Kasyapa chose this impregnable rock as his new capital. He built a palace at its summit and adorned its sides with colorful frescoes. The lion's paws you'll climb between are all that remain of a massive lion statue — the rock's namesake. Sigiriya means 'Lion Rock' in Sinhalese.",
      imageUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/activities/sigiriya-frescoes.jpg",
      imageCaption: "Ancient frescoes adorning the walls of Sigiriya"
    },
    {
      title: "Engineering Marvel of the Ancient World",
      content: "As you explore, you'll discover sophisticated gardens, pools, and fountains that still function during the rainy season—a testament to the advanced hydraulic engineering of ancient Sri Lanka. The symmetrical water gardens are among the oldest landscaped gardens in the world.",
      imageUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/activities/sigiriya-water-gardens.jpg",
      imageCaption: "The ancient water gardens at the base of Sigiriya"
    }
  ];
  
  // Add enhanced debug information
  // Use hardcoded sections if none are provided
  const finalDetailedSections = detailedSections.length > 0 ? detailedSections : hardcodedDetailedSections;
  
  console.log('EnhancedDestinationTemplate Data:', {
    destination: destination.name,
    parsedDetailedSections: detailedSections,
    finalDetailedSections: finalDetailedSections,
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
              {/* Introduction Section - Using finalDetailedSections with fallback */}
              <div className="mb-16">
                {finalDetailedSections && finalDetailedSections.length > 0 && (
                  <>
                    <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#0F4C81] mb-8">
                      {finalDetailedSections[0].title}
                    </h2>
                    
                    <p className="text-lg text-[#333333]/90 mb-6 leading-relaxed">
                      {finalDetailedSections[0].content}
                    </p>
                  </>
                )}
                
                {/* Featured Image - Main View */}
                {(finalDetailedSections && finalDetailedSections.length > 0 && finalDetailedSections[0].imageUrl) && (
                  <div className="rounded-lg overflow-hidden shadow-xl mb-8">
                    <img 
                      src={finalDetailedSections[0].imageUrl} 
                      alt={destination.name} 
                      className="w-full h-auto" 
                    />
                    {finalDetailedSections[0].imageCaption && (
                      <div className="bg-[#F8F5F0] p-4 text-center">
                        <p className="text-[#333333]/80 italic">{finalDetailedSections[0].imageCaption}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Points of Interest - Move this before the second subsection */}
                {pointsOfInterest && pointsOfInterest.length > 0 && (
                  <div className="mt-12">
                    <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-8">
                      {destination.featuresSection?.title || "What Awaits You"}
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
                                <i className={`fas fa-${poi.icon || 'monument'} text-xs`}></i>
                              </span>
                              <span>{poi.iconLabel || 'Key Attraction'}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Second Subsection - Display after the Points of Interest */}
                {finalDetailedSections && finalDetailedSections.length > 1 && (
                  <div className="mt-12">
                    <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-4">
                      {finalDetailedSections[1].title}
                    </h3>
                    <p className="text-lg text-[#333333]/90 mb-8 leading-relaxed">
                      {finalDetailedSections[1].content}
                    </p>
                    
                    {finalDetailedSections[1].imageUrl && (
                      <div className="rounded-lg overflow-hidden shadow-xl mb-12">
                        <img 
                          src={finalDetailedSections[1].imageUrl} 
                          alt={finalDetailedSections[1].title} 
                          className="w-full h-auto" 
                        />
                        {finalDetailedSections[1].imageCaption && (
                          <div className="bg-[#F8F5F0] p-4 text-center">
                            <p className="text-[#333333]/80 italic">{finalDetailedSections[1].imageCaption}</p>
                          </div>
                        )}
                      </div>
                    )}
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
              
              {/* FAQs Section - Enhanced with details/summary from Sigiriya Template */}
              {(faqs.length > 0 || hardcodedFaqs.length > 0) && (
                <div className="mt-12 mb-16">
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-6">
                    Frequently Asked Questions
                  </h2>
                  
                  <div className="space-y-4">
                    {(faqs.length > 0 ? faqs : hardcodedFaqs).map((faq, index) => (
                      <div key={`faq-${index}`} className="bg-[#F9F7F4] rounded-xl overflow-hidden">
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
      
      {/* CTA Section */}
      <section className="bg-[#0F4C81] text-white py-20 relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="/attached_assets/yves-alarie-3R50kTNBKiE-unsplash.jpg" 
            alt="Sri Lanka landscape" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience {destination.name}?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Let us create your perfect Sri Lankan adventure with {destination.name} as part of your journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/packages" className="bg-white hover:bg-[#D4AF37] text-[#0F4C81] hover:text-white font-medium py-3 px-8 rounded-md transition">
                View Luxury Packages
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium py-3 px-8 rounded-md transition">
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};