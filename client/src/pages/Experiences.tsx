import { useState, useRef, useEffect } from 'react';
import { ChevronRight, Search, Star, Clock, MapPin, Calendar, Users, AlertCircle } from 'lucide-react';
import { Tag } from '@/components/ui/tag';
import { COLORS } from '@/utils/colors';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import HeroSection from '@/components/HeroSection';

// Define experience API response types
interface ExperienceImage {
  publicId?: string;
  alt?: string;
  caption?: string;
  baseUrl?: string;
  small?: string;
  medium?: string;
  large?: string;
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
  duration?: string;
}

// Define experience type structure from API
interface APIExperience {
  id: number;
  title: string;
  slug: string;
  description: string;
  // Card and content data
  highlights?: ExperienceHighlight[];
  inclusions?: ExperienceInclusion[];
  whatToBring?: ExperienceWhatToBring[];
  seo?: ExperienceSEO;
  card?: ExperienceCard;
  // Additional properties from API
  duration?: string;
  location?: string;
  price?: number;
  currency?: string;
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
  activityLevel?: string;
  seasonality?: string[];
}

// Define UI Experience type (combined API data + UI display properties)
interface Experience {
  id: number;
  title: string;
  slug: string;
  description: string;
  // UI display fields
  category: string;
  shortDescription: string;
  duration: string;
  location: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  featured: boolean;
  tags: string[];
  activityLevel: 'easy' | 'moderate' | 'challenging';
  seasonality: string[];
  highlights?: ExperienceHighlight[];
  inclusions?: ExperienceInclusion[];
  whatToBring?: ExperienceWhatToBring[];
}

// Define categories
interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  imageUrl: string;
}

const Experiences = () => {
  // Get currency context for price formatting
  const { formatPrice } = useCurrency();
  
  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Reference for the filtered results section
  const filteredResultsRef = useRef<HTMLDivElement>(null);
  
  // Define experience categories
  const categories: Category[] = [
    {
      id: 'cultural',
      name: 'Cultural',
      description: 'Authentic cultural encounters and heritage sites',
      icon: 'fa-landmark',
      color: 'bg-[#88B04B]/10 text-[#88B04B]',
      imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'adventure',
      name: 'Adventure',
      description: 'Thrilling outdoor activities and expeditions',
      icon: 'fa-mountain',
      color: 'bg-[#0077B6]/10 text-[#0077B6]',
      imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'wellness',
      name: 'Wellness',
      description: 'Rejuvenating spa treatments and wellness rituals',
      icon: 'fa-spa',
      color: 'bg-[#F26B6B]/10 text-[#F26B6B]',
      imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'culinary',
      name: 'Culinary',
      description: 'Exquisite dining and gastronomic adventures',
      icon: 'fa-utensils',
      color: 'bg-[#D4AF37]/10 text-[#D4AF37]',
      imageUrl: 'https://images.unsplash.com/photo-1564671165093-20688ff1fffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'romantic',
      name: 'Romantic',
      description: 'Special moments for couples and honeymooners',
      icon: 'fa-heart',
      color: 'bg-[#F26B6B]/10 text-[#F26B6B]',
      imageUrl: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'family',
      name: 'Family',
      description: 'Kid-friendly activities for memorable family vacations',
      icon: 'fa-users',
      color: 'bg-[#0077B6]/10 text-[#0077B6]',
      imageUrl: 'https://images.unsplash.com/photo-1625456381035-d7e0ea18eaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];
  
  // Fetch experiences from API
  const { data: apiExperiences = [], isLoading, error } = useQuery({
    queryKey: ['/api/experiences'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Function to adapt API experience to UI format
  const adaptExperienceForUI = (apiExperience: APIExperience): Experience => {
    // Extract duration from API or use fallback
    const duration = typeof apiExperience.duration === 'string' ? apiExperience.duration : 
                     (apiExperience.card?.duration || 'Full Day');
                     
    // Extract tags from card or create default ones
    const tags = apiExperience.card?.tags || [];
    
    // Map API data to the format expected by the UI
    return {
      id: apiExperience.id,
      title: apiExperience.card?.header || apiExperience.title,
      slug: apiExperience.slug,
      description: apiExperience.description,
      highlights: apiExperience.highlights,
      inclusions: apiExperience.inclusions,
      whatToBring: apiExperience.whatToBring,
      imageUrl: apiExperience.card?.image?.medium || apiExperience.card?.image?.baseUrl || 'https://images.unsplash.com/photo-1576675066965-5a3326f2be62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      shortDescription: apiExperience.card?.body || apiExperience.description,
      category: tags[0] || 'cultural',
      featured: apiExperience.featured || false,
      rating: apiExperience.rating || 4.8, // Default rating if not provided
      reviewCount: apiExperience.reviewCount || 100, // Default review count if not provided
      tags: tags,
      duration: duration,
      location: apiExperience.location || 'Sri Lanka',
      price: apiExperience.price || 150,
      currency: apiExperience.currency || 'USD',
      activityLevel: (apiExperience.activityLevel as 'easy' | 'moderate' | 'challenging') || 'moderate',
      seasonality: apiExperience.seasonality || ['Year-round']
    };
  };
  
  // Process experiences for UI display
  const processedExperiences: Experience[] = Array.isArray(apiExperiences) 
    ? (apiExperiences as APIExperience[]).map(adaptExperienceForUI)
    : [];
  
  // Filter experiences based on search and category
  const filteredExperiences = processedExperiences.filter(experience => {
    const matchesSearch = experience.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          experience.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          experience.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || experience.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get featured experiences (in this case all from API for now)
  const featuredExperiences = processedExperiences.slice(0, 3); // Just take first 3 for featured section
  
  // Effect to scroll to results when category is selected
  useEffect(() => {
    if (selectedCategory !== null && filteredResultsRef.current) {
      // Scroll to filtered results with a small delay for smooth transition
      setTimeout(() => {
        filteredResultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selectedCategory]);
  
  // This function is now provided by the useCurrency hook
  
  // Render star rating
  const renderStars = (rating: number) => {
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
  
  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      {/* Hero Section using the shared component */}
      <HeroSection
        title="Sri Lankan Experiences"
        description="Handcrafted adventures to immerse yourself in Sri Lanka's culture and natural beauty"
        backgroundImage="https://images.unsplash.com/photo-1535162222970-f8ab279245f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
        breadcrumbItems={[
          { label: 'Experiences' }
        ]}
        customOverlay="bg-gradient-to-t from-black/70 to-black/40"
        imageTransform="scale-105"
        showDivider={true}
      />
      
      {/* All Experiences Section */}
      <section id="all-experiences" className="py-16 bg-[#F8F5F0]/50" ref={filteredResultsRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0077B6] mb-2">All Experiences</h2>
            <p className="text-lg text-[#333333]/80 max-w-2xl mx-auto">
              Discover authentic Sri Lankan moments, from cultural immersions to breathtaking adventures across this tropical paradise
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0077B6]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-gray-800 mb-2">Unable to Load Experiences</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We're having trouble connecting to our servers. Please try again later.
              </p>
              <button 
                className="mt-6 inline-flex items-center bg-[#0077B6] hover:bg-[#005f92] text-white py-2.5 px-5 rounded-full transition shadow-md"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperiences.length > 0 ? (
                filteredExperiences.map((experience) => (
                  <div key={experience.id} className="bg-[#F8F5F0] rounded-lg overflow-hidden shadow-lg transition transform hover:scale-[1.02] hover:shadow-xl">
                    <div className="relative h-64 flex items-center justify-center overflow-hidden">
                      <img 
                        src={experience.imageUrl} 
                        alt={experience.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                      />
                      <div className="absolute top-4 right-4">
                        <Tag variant="duration">
                          {experience.duration}
                        </Tag>
                      </div>
                      {experience.tags && experience.tags.length > 0 && (
                        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                          {experience.tags.slice(0, 2).map((tag, i) => (
                            <Tag key={i} variant="scenic">
                              {tag}
                            </Tag>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">{experience.title}</h3>
                      <div className="flex items-center mb-4">
                        <div className="flex mr-2">
                          {renderStars(experience.rating)}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">
                          {experience.rating.toFixed(1)} ({experience.reviewCount} {experience.reviewCount === 1 ? 'review' : 'reviews'})
                        </span>
                      </div>
                      <p className="text-gray-700/70 mb-4">{experience.shortDescription}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Starting from</span>
                          <div className="flex items-baseline">
                            <span style={{ color: COLORS.primary }} className="text-xl font-semibold">
                              {formatPrice(experience.price)}
                            </span>
                            <span className="text-gray-500 text-sm ml-1.5">/ per person</span>
                          </div>
                        </div>
                        <Link 
                          href={`/experiences/${experience.slug}`}
                          style={{ backgroundColor: COLORS.primary }}
                          className="inline-flex items-center hover:bg-primary/90 text-white font-medium py-2 px-5 rounded-full transition group shadow-md"
                        >
                          Explore <ChevronRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 bg-white rounded-xl shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-[#F8F5F0] flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-[#0077B6]/50" />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-gray-800 mb-2">
                    No Experiences Found
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    We couldn't find any experiences matching your criteria. Try adjusting your filters or search terms.
                  </p>
                  <button 
                    className="mt-6 inline-flex items-center bg-[#0077B6] hover:bg-[#005f92] text-white py-2.5 px-5 rounded-full transition shadow-md"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      {/* Custom Experience Section */}
      <section className="py-20 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl relative border border-gray-100">
            {/* Subtle decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="flex flex-col md:flex-row">
              {/* Image Side */}
              <div className="md:w-2/5 relative min-h-[400px] md:min-h-[500px]">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ 
                  backgroundImage: "url('https://res.cloudinary.com/drsjp6bqz/image/upload/v1743775033/activities/arugam-bay-fishing.jpg')",
                }}>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
                  <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-sm">
                    <div className="flex items-center mb-3">
                      <div className="w-2 h-2 bg-[#0077B6] rounded-full mr-2"></div>
                      <span className="text-gray-600 text-sm font-medium">Client Review</span>
                    </div>
                    <h3 className="font-['Playfair_Display'] text-gray-800 text-lg font-semibold mb-3">Perfectly Tailored</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      "Every moment was crafted to our interests. From sunrise at Adam's Peak to private cooking classes in Kandy - pure magic."
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-[#0077B6] fill-[#0077B6]" />
                        ))}
                      </div>
                      <span className="text-gray-600 text-xs font-medium">– Emma & James</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="md:w-3/5 p-8 md:p-12 lg:p-16 relative">
                <div className="max-w-2xl">
                  <div className="mb-8">
                    <div className="inline-flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                      Bespoke Travel Design
                    </div>
                    <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-800 mb-4 leading-tight">
                      Create Your Perfect Sri Lankan Story
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      Our expert travel designers craft completely personalized journeys that reflect your unique interests, travel style, and dreams. Every detail is thoughtfully curated just for you.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 mb-10">
                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-[#0077B6]/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-6 h-6 text-[#0077B6]" />
                        </div>
                        <div>
                          <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-2 text-gray-800">Perfectly Timed Moments</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Experience Sri Lanka at its most magical - sunrise at Sigiriya Rock, golden hour at Galle Fort, or tea estate visits during harvest season.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-[#0077B6]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-6 h-6 text-[#0077B6]" />
                        </div>
                        <div>
                          <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-2 text-gray-800">Exclusively Yours</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            Private expert guides, luxury vehicles, and VIP access to experiences unavailable to regular tourists. Your journey, your pace.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center justify-center bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      Start Planning Your Journey
                      <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link href="/tours" className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-4 px-8 rounded-full border border-gray-200 transition-all duration-300">
                      Explore Our Tours
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Experiences;