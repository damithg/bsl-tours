import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { ChevronRight, Star, Check, Clock, MapPin, Calendar, Users, Wifi, Coffee, Compass, Luggage, Info, AlertCircle } from 'lucide-react';
import HeroSection from '@/components/HeroSection';

// Types for Experience API Response
interface ExperienceImage {
  publicId?: string;
  alt?: string;
  caption?: string;
  baseUrl?: string;
  small?: string;
  medium?: string;
  large?: string;
  banner?: string;
}

interface ExperienceHighlight {
  id: number;
  text: string;
}

interface ExperienceInclusion {
  id: number;
  text: string;
}

interface ExperienceWhatToBring {
  id: number;
  text: string;
}

interface ExperienceSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

interface ExperienceCard {
  image?: ExperienceImage;
  header?: string;
  body?: string;
  tags?: string[];
}

interface Experience {
  id: number;
  title: string;
  slug: string;
  description: string;
  highlights?: ExperienceHighlight[];
  inclusions?: ExperienceInclusion[];
  whatToBring?: ExperienceWhatToBring[];
  seo?: ExperienceSEO;
  card?: ExperienceCard;
}

const ExperienceDetail = () => {
  const [, params] = useRoute('/experiences/:slug');
  const slug = params?.slug;
  
  // Fetch experience data from API
  const { data: experiences, isLoading, error } = useQuery({
    queryKey: ['/api/experiences'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Find specific experience by slug
  const experience = Array.isArray(experiences) 
    ? experiences.find((exp: Experience) => exp.slug === slug) 
    : null;
  
  // Derived state
  const [imageUrl, setImageUrl] = useState<string>('');
  
  // Set image when experience is loaded
  useEffect(() => {
    if (experience?.card?.image) {
      setImageUrl(
        experience.card.image.large || 
        experience.card.image.medium || 
        experience.card.image.baseUrl || 
        'https://images.unsplash.com/photo-1576675066965-5a3326f2be62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
      );
    }
  }, [experience]);
  
  // Render star rating component
  const renderStars = (rating = 4.8) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<Star key={i} className="w-4 h-4 fill-[#F6E27F] text-[#F6E27F]" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<Star key={i} className="w-4 h-4 fill-[#F6E27F]/50 text-[#F6E27F]" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-[#F6E27F]" />);
      }
    }
    return stars;
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center py-20 bg-[#FAF9F6]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0077B6]"></div>
      </div>
    );
  }
  
  if (error || !experience) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-16 bg-white rounded-xl shadow-sm max-w-2xl mx-auto">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="font-['Playfair_Display'] text-2xl font-bold text-gray-800 mb-2">
              {error ? 'Error Loading Experience' : 'Experience Not Found'}
            </h1>
            <p className="text-gray-600 mb-8">
              {error 
                ? 'We encountered an error while loading this experience. Please try again later.' 
                : 'The experience you are looking for could not be found.'}
            </p>
            <Link 
              href="/experiences"
              className="inline-flex items-center bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-2.5 px-5 rounded-full transition-all"
            >
              Back to All Experiences
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Hero Section using shared component */}
      <HeroSection
        title={experience.title}
        description={experience.card?.body || experience.description}
        backgroundImage={imageUrl}
        breadcrumbItems={[
          { label: 'Experiences', path: '/experiences' },
          { label: experience.title }
        ]}
        customOverlay="bg-gradient-to-t from-black/70 to-black/40"
        imageTransform="scale-105"
      >
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/80 text-[#0077B6]">
            {experience.card?.tags?.[0] || 'Experience'}
          </div>
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className="flex mr-2">
            {renderStars()}
          </div>
          <span className="text-white/90 text-sm">4.8 (100+ reviews)</span>
        </div>
      </HeroSection>
      
      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content - Description & Details */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-10">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#004E64] mb-4">
                  About This Experience
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>{experience.description}</p>
                </div>
              </div>
              
              {/* Highlights */}
              {experience.highlights && experience.highlights.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#004E64] mb-4">
                    Experience Highlights
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {experience.highlights.map(highlight => (
                      <li key={highlight.id} className="flex items-start">
                        <Check className="w-5 h-5 text-[#0077B6] mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{highlight.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* What's Included */}
              {experience.inclusions && experience.inclusions.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#004E64] mb-4">
                    What's Included
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {experience.inclusions.map(inclusion => (
                      <li key={inclusion.id} className="flex items-start">
                        <Check className="w-5 h-5 text-[#88B04B] mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{inclusion.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* What to Bring */}
              {experience.whatToBring && experience.whatToBring.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#004E64] mb-4">
                    What to Bring
                  </h2>
                  <div className="bg-[#F8F5F0] p-6 rounded-lg">
                    <ul className="space-y-3">
                      {experience.whatToBring.map(item => (
                        <li key={item.id} className="flex items-start">
                          <Info className="w-5 h-5 text-[#F26B6B] mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Sidebar - Booking Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
                <div className="p-6">
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#004E64] mb-4">
                    Experience Details
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-[#0077B6] mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Duration</h4>
                        <p className="text-gray-600">Full Day (8-9 hours)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-[#0077B6] mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Location</h4>
                        <p className="text-gray-600">Sri Lanka</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="w-5 h-5 text-[#0077B6] mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Group Size</h4>
                        <p className="text-gray-600">2-8 people</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-[#0077B6] mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Availability</h4>
                        <p className="text-gray-600">All year</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6 pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">Price</span>
                      <span className="text-xl font-bold text-[#0077B6]">$150</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-6">per person</p>
                    
                    <Link href="/contact" className="block w-full bg-[#0077B6] hover:bg-[#0077B6]/90 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors">
                      Inquire About This Experience
                    </Link>
                  </div>
                </div>
                
                <div className="bg-[#F8F5F0] p-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Need Help?</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Have questions about this experience? Our Sri Lanka travel experts are here to help.
                  </p>
                  <Link href="/contact" className="inline-flex items-center text-[#0077B6] font-medium hover:text-[#004E64] transition-colors">
                    Contact Us <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Experiences Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#004E64] mb-8 text-center">
            Similar Experiences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* This would be populated with actual related experiences from the API */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1564671165093-20688ff1fffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Sri Lankan Cooking Class" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-gray-800 mb-2">Sri Lankan Cooking Class</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">Master authentic Sri Lankan cuisine with local chefs in a hands-on cooking class.</p>
                <Link 
                  href="/experiences/sri-lankan-cooking-class"
                  className="inline-flex items-center text-sm font-medium text-[#0077B6]"
                >
                  View Details <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Yala Safari Experience" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-gray-800 mb-2">Yala Safari Experience</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">Track leopards and wildlife in Sri Lanka's premier national park on a guided jeep safari.</p>
                <Link 
                  href="/experiences/yala-safari-experience"
                  className="inline-flex items-center text-sm font-medium text-[#0077B6]"
                >
                  View Details <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Ancient Temples of Anuradhapura" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-gray-800 mb-2">Ancient Temples of Anuradhapura</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">Tour the sacred ruins of Sri Lanka's ancient capital with expert historical guides.</p>
                <Link 
                  href="/experiences/ancient-temples-of-anuradhapura"
                  className="inline-flex items-center text-sm font-medium text-[#0077B6]"
                >
                  View Details <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExperienceDetail;