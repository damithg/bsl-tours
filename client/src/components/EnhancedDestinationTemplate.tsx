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
  
  // Define a type for the overview object
  interface OverviewType {
    id: number;
    title: string;
    fullDescription: string;
    image?: {
      id?: number;
      publicId?: string;
      alt?: string;
      caption?: string;
      orientation?: string;
    };
  }
  
  // First, add the overview section as the first detailed section
  if (destination.overview) {
    const overview = destination.overview as OverviewType;
    apiDetailedSections.push({
      title: overview.title,
      content: overview.fullDescription,
      imageUrl: overview.image?.publicId
        ? `https://res.cloudinary.com/drsjp6bqz/image/upload/${overview.image.publicId}` 
        : undefined,
      imageCaption: overview.image?.caption
    });
  }
  
  // Next, add subsections if they exist
  if (destination.subSections && Array.isArray(destination.subSections) && destination.subSections.length > 0) {
    console.log("Processing subSections:", destination.subSections.length);
    
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
    }, index: number) => {
      console.log(`Adding subsection ${index + 1}: ${section.title}`);
      
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
      heroImage?: {
        publicId?: string;
        alt?: string;
      }
    }) => {
      // Properly handle tour images - try to get from heroImage, fallback to attached_assets or use a placeholder
      let imageUrl = '/attached_assets/A Week in the Tropics.jpg'; // Default fallback image
      
      // If tour has heroImage with publicId, use that
      if (tour.heroImage && tour.heroImage.publicId) {
        imageUrl = `https://res.cloudinary.com/drsjp6bqz/image/upload/${tour.heroImage.publicId}`;
      } 
      // Second fallback - try to use predictable slug-based naming
      else if (tour.slug) {
        // Try different formats that might exist in the attached_assets folder
        if (tour.slug === 'cultural-triangle-explorer') {
          imageUrl = '/attached_assets/A Week in the Tropics.jpg';
        } else if (tour.slug === 'romantic-honeymoon-escape' || tour.slug.includes('honeymoon')) {
          imageUrl = '/attached_assets/romantic honeymoon escape.jpg';
        } else if (tour.slug.includes('mirissa')) {
          imageUrl = '/attached_assets/mirissa (7).jpg';
        }
      }
      
      apiToursFeaturing.push({
        id: tour.id,
        title: tour.name,
        slug: tour.slug,
        imageUrl: imageUrl,
        duration: tour.duration,
        maxPeople: 12,  // Default value
        price: tour.startingFrom,
        isBestSeller: tour.slug === 'cultural-triangle-explorer' // Mark this popular tour as best seller
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

  // Get appropriate hero image URL directly from heroImage field (preferred) or fallback to other sources
  const heroImageUrl = destination.heroImage?.publicId 
    ? `https://res.cloudinary.com/drsjp6bqz/image/upload/${destination.heroImage.publicId}`
    : ((destination as any).images?.banner || destination.imageUrl);
  
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
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              {destination.name}
            </h1>
            <p className="text-2xl text-white/90 max-w-4xl whitespace-normal">
              {destination.shortDescription || "A must-visit destination in Sri Lanka"}
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
                {/* First Subsection */}
                {finalDetailedSections && finalDetailedSections.length > 0 && (
                  <div className="mb-12">
                    <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#0F4C81] mb-8">
                      {finalDetailedSections[0].title}
                    </h2>
                    
                    <p className="text-lg text-[#333333]/90 mb-6 leading-relaxed">
                      {finalDetailedSections[0].content}
                    </p>
                    
                    {/* Only show image if it exists */}
                    {finalDetailedSections[0].imageUrl && (
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
                  </div>
                )}
                
                {/* Points of Interest - Features Section */}
                {pointsOfInterest && pointsOfInterest.length > 0 && (
                  <div className="mb-12">
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
                  <div className="mb-12">
                    <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-4">
                      {finalDetailedSections[1].title}
                    </h3>
                    <p className="text-lg text-[#333333]/90 mb-8 leading-relaxed">
                      {finalDetailedSections[1].content}
                    </p>
                    
                    {/* Only show image if it exists */}
                    {finalDetailedSections[1].imageUrl && (
                      <div className="rounded-lg overflow-hidden shadow-xl mb-8">
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
              
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              {/* Essential Information Card - Styled like SigiriyaTemplate */}
              <div className="bg-[#F9F7F4] p-6 rounded-xl shadow-sm mb-8 sticky top-4">
                <h3 className="font-['Playfair_Display'] text-xl font-bold mb-6 text-gray-900">Essential Information</h3>
                
                <div className="space-y-5">
                  {/* Best Time to Visit */}
                  {destination.bestTimeToVisit && (
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                        <i className="fas fa-calendar text-lg"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Best Time to Visit</h4>
                        <p className="text-gray-600">{destination.bestTimeToVisit}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Recommended Duration */}
                  {destination.recommendedDuration && (
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                        <i className="fas fa-clock text-lg"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Recommended Duration</h4>
                        <p className="text-gray-600">{destination.recommendedDuration}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Weather */}
                  {destination.weatherInfo && (
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                        <i className="fas fa-sun text-lg"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Weather</h4>
                        <p className="text-gray-600">{destination.weatherInfo}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Location */}
                  {destination.address && (
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                        <i className="fas fa-map-marker-alt text-lg"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Location</h4>
                        <p className="text-gray-600">{destination.address}</p>
                        
                        {/* Map Placeholder */}
                        {destination.latitude && destination.longitude && (
                          <div className="mt-3 rounded-lg overflow-hidden h-36 bg-gray-200 relative">
                            <iframe
                              title={`Map of ${destination.name}`}
                              className="w-full h-full border-0"
                              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${destination.latitude},${destination.longitude}&zoom=12`}
                              allowFullScreen
                            ></iframe>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Highlights */}
                  {destination.highlights && parseJsonSafely<string[]>(destination.highlights, []).length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {parseJsonSafely<string[]>(destination.highlights, []).map((highlight, index) => (
                          <span key={`highlight-${index}`} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Getting Here */}
                  {essentialInfo.gettingThere && (
                    <div className="pt-5 mt-5 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Getting Here</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {typeof essentialInfo.gettingThere === 'string'
                          ? essentialInfo.gettingThere.split('\n').filter(line => line.trim()).map((info, index) => (
                              <li key={`getting-${index}`}>{info.trim()}</li>
                            ))
                          : Array.isArray(essentialInfo.gettingThere)
                            ? essentialInfo.gettingThere.map((info, index) => (
                                <li key={`getting-${index}`}>{info}</li>
                              ))
                            : <li>{String(essentialInfo.gettingThere)}</li>
                        }
                      </ul>
                    </div>
                  )}
                  
                  {/* Highlights Section */}
                  {essentialInfo.highlights && (
                    <div className="pt-5 mt-5 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {typeof essentialInfo.highlights === 'string'
                          ? essentialInfo.highlights.split('\n').filter(line => line.trim()).map((highlight, index) => (
                              <span key={`highlight-${index}`} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                                {highlight.trim()}
                              </span>
                            ))
                          : Array.isArray(essentialInfo.highlights)
                            ? essentialInfo.highlights.map((highlight, index) => (
                                <span key={`highlight-${index}`} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                                  {highlight}
                                </span>
                              ))
                            : <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                                {String(essentialInfo.highlights)}
                              </span>
                        }
                      </div>
                    </div>
                  )}
                  
                  {/* Travel Tips */}
                  {essentialInfo.travelTips && (
                    <div className="pt-5 mt-5 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Travel Tips</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {typeof essentialInfo.travelTips === 'string'
                          ? essentialInfo.travelTips.split('\n').filter(line => line.trim()).map((tip, index) => (
                              <li key={`tip-${index}`}>{tip.trim()}</li>
                            ))
                          : Array.isArray(essentialInfo.travelTips)
                            ? essentialInfo.travelTips.map((tip, index) => (
                                <li key={`tip-${index}`}>{tip}</li>
                              ))
                            : <li>{String(essentialInfo.travelTips)}</li>
                        }
                      </ul>
                    </div>
                  )}
                  
                  {/* Accessibility Information */}
                  {essentialInfo.accessibility && (
                    <div className="pt-5 mt-5 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Accessibility</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {typeof essentialInfo.accessibility === 'string'
                          ? essentialInfo.accessibility.split('\n').filter(line => line.trim()).map((access, index) => (
                              <li key={`access-${index}`}>{access.trim()}</li>
                            ))
                          : Array.isArray(essentialInfo.accessibility)
                            ? essentialInfo.accessibility.map((access, index) => (
                                <li key={`access-${index}`}>{access}</li>
                              ))
                            : <li>{String(essentialInfo.accessibility)}</li>
                        }
                      </ul>
                    </div>
                  )}
                  
                  {/* Nearby Attractions */}
                  {nearbyAttractions && nearbyAttractions.length > 0 && (
                    <div className="pt-5 mt-5 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Nearby Attractions</h4>
                      <div className="space-y-3">
                        {nearbyAttractions.map((attraction, index) => (
                          <div key={`attraction-${index}`} className="flex items-start">
                            {attraction.imageUrl ? (
                              <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3">
                                <img
                                  src={attraction.imageUrl}
                                  alt={attraction.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3 flex items-center justify-center text-gray-400">
                                <i className="fas fa-image"></i>
                              </div>
                            )}
                            <div>
                              <h5 className="font-medium text-sm mb-0.5 text-gray-900">{attraction.name}</h5>
                              <p className="text-xs text-gray-500">
                                {attraction.distance && `${attraction.distance}`}
                                {attraction.distance && attraction.travelTime && ` • `}
                                {attraction.travelTime && `${attraction.travelTime}`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
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
        </div>
      </section>
      
      {/* Photo Gallery Section - Full Width */}
      {(galleryImages.length > 0 || hardcodedGalleryImages.length > 0) && (
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81]">
                Photo Gallery
              </h2>
              <div className="flex items-center gap-2 text-[#0F4C81]">
                <Camera className="w-5 h-5" />
                <span className="font-medium">{galleryImages.length > 0 ? galleryImages.length : hardcodedGalleryImages.length} Photos</span>
              </div>
            </div>
            <AsymmetricalGallery 
              images={galleryImages.length > 0 ? galleryImages : hardcodedGalleryImages} 
            />
          </div>
        </section>
      )}
      
      {/* Local Experiences Section */}
      {(localExperiences.length > 0 || hardcodedLocalExperiences.length > 0) && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-10">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81]">
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
        </section>
      )}
      
      {/* FAQs Section */}
      {(faqs.length > 0 || hardcodedFaqs.length > 0) && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-10 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {(faqs.length > 0 ? faqs : hardcodedFaqs).map((faq, index) => (
                <div key={`faq-${index}`} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
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
        </section>
      )}
      
      {/* End of first content section */}
      
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