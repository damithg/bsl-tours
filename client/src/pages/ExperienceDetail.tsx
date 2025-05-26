import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { ChevronRight, Star, Check, Clock, MapPin, Calendar, Users, Wifi, Coffee, Compass, Luggage, Info, AlertCircle, ChevronLeft } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import { Tag } from '@/components/ui/tag';
import { COLORS } from '@/utils/colors';

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

// The API returns simple string arrays, not objects with id/text

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

interface RelatedExperience {
  id: number;
  title: string;
  slug: string;
  shortSummary: string;
  duration: string;
  price: number;
  difficulty: string;
  description: string;
  card?: ExperienceCard;
}

interface Experience {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortSummary?: string;
  duration?: string;
  price?: number;
  difficulty?: string;
  featured?: boolean;
  highlights?: string[];  // API returns string arrays
  inclusions?: string[];  // API returns string arrays
  whatToBring?: string[]; // API returns string arrays
  seo?: ExperienceSEO;
  card?: ExperienceCard;
  relatedExperiences?: RelatedExperience[];
}

const ExperienceDetail = () => {
  const [, params] = useRoute('/experiences/:slug');
  const slug = params?.slug;
  
  // Fetch specific experience data from API using slug
  const { data: experience, isLoading, error } = useQuery<Experience>({
    queryKey: ['/api/experiences', slug],
    enabled: !!slug, // Only run query if slug exists
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Derived state
  const [imageUrl, setImageUrl] = useState<string>('');
  
  // Related experiences scroll functionality
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 10);
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [experience?.relatedExperiences]);
  
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
        title=""
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
                    {experience.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-[#0077B6] mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
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
                    {experience.inclusions.map((inclusion: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-[#88B04B] mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{inclusion}</span>
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
                      {experience.whatToBring.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Info className="w-5 h-5 text-[#F26B6B] mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
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
      {experience.relatedExperiences && experience.relatedExperiences.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#004E64] mb-8 text-center">
              Similar Experiences
            </h2>
            
            {/* Scrollable container with arrow controls */}
            <div className="relative">
              {/* Left Arrow */}
              {showLeftArrow && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#0077B6] rounded-full p-2 shadow-lg transition-all md:hidden"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              
              {/* Right Arrow */}
              {showRightArrow && (
                <button
                  onClick={scrollRight}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#0077B6] rounded-full p-2 shadow-lg transition-all md:hidden"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
              
              {/* Mobile: Horizontal scroll, Desktop: Grid */}
              <div 
                ref={scrollContainerRef}
                className="md:grid md:grid-cols-3 md:gap-8 flex md:flex-none overflow-x-auto gap-4 pb-6 md:pb-0 px-2 md:px-0 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {experience.relatedExperiences.map((relatedExp: RelatedExperience, index: number) => (
                  <div 
                    key={`${relatedExp.slug}-${index}`} 
                    className="flex-none w-72 md:w-auto bg-[#F8F5F0] rounded-lg overflow-hidden shadow-lg transition transform hover:scale-[1.02] hover:shadow-xl"
                  >
                    <div className="relative h-64 flex items-center justify-center overflow-hidden">
                      <img 
                        src={
                          relatedExp.card?.image?.medium || 
                          relatedExp.card?.image?.large || 
                          relatedExp.card?.image?.baseUrl || 
                          'https://images.unsplash.com/photo-1576675066965-5a3326f2be62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
                        }
                        alt={relatedExp.card?.image?.alt || relatedExp.title}
                        className="w-full h-full object-cover object-center" 
                      />
                      <div className="absolute top-4 right-4">
                        <Tag variant="duration">
                          {relatedExp.duration}
                        </Tag>
                      </div>
                      {/* Tags overlay */}
                      {relatedExp.card?.tags && relatedExp.card.tags.length > 0 && (
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {relatedExp.card.tags.slice(0, 2).map((tag, tagIndex) => (
                            <Tag key={tagIndex} variant="scenic">
                              {tag}
                            </Tag>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">
                        {relatedExp.card?.header || relatedExp.title}
                      </h3>
                      <div className="flex items-center mb-4">
                        <div className="flex" style={{ color: COLORS.secondary }}>
                          {Array(5).fill(null).map((_, i) => (
                            <i key={i} className="fas fa-star"></i>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">5.0 (0 reviews)</span>
                      </div>
                      <p className="text-gray-700/70 mb-4">
                        {relatedExp.card?.body || relatedExp.shortSummary}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Starting from</span>
                          <div className="flex items-baseline">
                            <span style={{ color: COLORS.primary }} className="text-xl font-semibold">
                              ${relatedExp.price}
                            </span>
                            <span className="text-gray-500 text-sm ml-1.5">/ per person</span>
                          </div>
                        </div>
                        <Link 
                          href={`/experiences/${relatedExp.slug}`}
                          style={{ backgroundColor: COLORS.primary }}
                          className="inline-flex items-center hover:bg-primary/90 text-white font-medium py-2 px-5 rounded-full transition group shadow-md"
                        >
                          Explore <ChevronRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
              ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ExperienceDetail;