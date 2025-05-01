import { useState, useRef, useEffect } from 'react';
import { ChevronRight, Search, Star, Clock, MapPin, Tag, Calendar, Users } from 'lucide-react';
import { Link } from 'wouter';

// Define experience type structure
interface Experience {
  id: number;
  title: string;
  category: string;
  description: string;
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
  
  // Sample experiences data (would be fetched from API in a real implementation)
  const experiencesData: Experience[] = [
    {
      id: 1,
      title: 'Ancient Temples of Anuradhapura',
      category: 'cultural',
      description: 'Explore the ancient city of Anuradhapura, a UNESCO World Heritage Site with stunning stupas, monasteries, and royal gardens dating back over 2,000 years. Our expert guides will bring history to life as you walk through sacred spaces that once housed thousands of monks and served as the center of Sinhalese civilization.',
      shortDescription: 'Tour the sacred ruins of Sri Lanka\'s ancient capital with expert guides.',
      duration: 'Full Day',
      location: 'Anuradhapura',
      price: 120,
      currency: 'USD',
      rating: 4.8,
      reviewCount: 128,
      imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      featured: true,
      tags: ['UNESCO Heritage', 'Historical', 'Cultural'],
      activityLevel: 'moderate',
      seasonality: ['Year-round']
    },
    {
      id: 2,
      title: 'Yala Safari Experience',
      category: 'adventure',
      description: 'Embark on an unforgettable wildlife safari in Yala National Park, home to one of the highest leopard densities in the world. Accompanied by experienced naturalists, you\'ll traverse diverse ecosystems in search of elephants, sloth bears, crocodiles, and numerous bird species. The 4x4 jeep safari experience includes refreshments and a picnic lunch in the wilderness.',
      shortDescription: 'Track leopards and wildlife in Sri Lanka\'s premier national park.',
      duration: 'Full Day',
      location: 'Yala National Park',
      price: 150,
      currency: 'USD',
      rating: 4.9,
      reviewCount: 203,
      imageUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      featured: true,
      tags: ['Wildlife', 'Safari', 'Photography'],
      activityLevel: 'easy',
      seasonality: ['Feb-Jul']
    },
    {
      id: 3,
      title: 'Ayurvedic Spa Retreat',
      category: 'wellness',
      description: 'Immerse yourself in authentic Ayurvedic treatments at a luxury wellness center. This half-day experience includes a personalized consultation with an Ayurvedic doctor, a traditional oil massage, herbal steam bath, and organic herbal tea. All treatments use locally sourced ingredients prepared according to ancient recipes for optimal wellbeing.',
      shortDescription: 'Rejuvenate with traditional Ayurvedic treatments and therapies.',
      duration: 'Half Day',
      location: 'Bentota',
      price: 180,
      currency: 'USD',
      rating: 4.7,
      reviewCount: 89,
      imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      featured: false,
      tags: ['Spa', 'Relaxation', 'Wellness'],
      activityLevel: 'easy',
      seasonality: ['Year-round']
    },
    {
      id: 4,
      title: 'Sri Lankan Cooking Class',
      category: 'culinary',
      description: 'Learn the secrets of Sri Lankan cuisine in this hands-on cooking class. Visit a local market to select fresh ingredients, then prepare authentic dishes under the guidance of an experienced local chef. Master the art of spice blending, coconut milk extraction, and traditional cooking techniques. The experience concludes with a feast of your creations accompanied by local beverages.',
      shortDescription: 'Master authentic Sri Lankan cuisine with local chefs.',
      duration: 'Half Day',
      location: 'Galle',
      price: 85,
      currency: 'USD',
      rating: 4.9,
      reviewCount: 156,
      imageUrl: 'https://images.unsplash.com/photo-1564671165093-20688ff1fffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      featured: false,
      tags: ['Cooking', 'Food', 'Cultural'],
      activityLevel: 'easy',
      seasonality: ['Year-round']
    },
    {
      id: 5,
      title: 'Private Beach Dinner',
      category: 'romantic',
      description: 'Celebrate a special occasion with a private dinner on a secluded beach. Watch the sunset over the Indian Ocean as our dedicated staff prepares a gourmet four-course meal featuring the freshest seafood and local delicacies. Dine under the stars with the sound of waves as your backdrop, complemented by fine wines and personalized service.',
      shortDescription: 'Enjoy an intimate candlelit dinner on a secluded beach.',
      duration: 'Evening',
      location: 'Bentota Beach',
      price: 220,
      currency: 'USD',
      rating: 5.0,
      reviewCount: 74,
      imageUrl: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      featured: true,
      tags: ['Romantic', 'Dining', 'Beach'],
      activityLevel: 'easy',
      seasonality: ['Dec-Apr']
    },
    {
      id: 6,
      title: 'Tea Plantation Tour',
      category: 'cultural',
      description: 'Discover the world of Ceylon tea with a visit to a historic tea plantation in the central highlands. Tour the lush tea gardens, learn about sustainable cultivation methods, and watch the fascinating production process from leaf to cup. Meet tea pickers and master blenders before enjoying a guided tasting of various premium tea varieties with traditional Sri Lankan sweets.',
      shortDescription: 'Tour scenic tea estates and learn about Ceylon tea production.',
      duration: 'Full Day',
      location: 'Nuwara Eliya',
      price: 110,
      currency: 'USD',
      rating: 4.8,
      reviewCount: 142,
      imageUrl: 'https://images.unsplash.com/photo-1576675066965-5a3326f2be62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      featured: false,
      tags: ['Tea', 'Cultural', 'Scenic'],
      activityLevel: 'moderate',
      seasonality: ['Year-round']
    },
    {
      id: 7,
      title: 'Whale Watching Expedition',
      category: 'adventure',
      description: 'Set sail on a thrilling ocean adventure to spot blue whales, sperm whales, and dolphins in their natural habitat. Sri Lanka\'s waters are among the best in the world for cetacean sightings. Expert marine biologists accompany each trip, providing fascinating insights about these magnificent creatures. The expedition includes breakfast, refreshments, and safety equipment.',
      shortDescription: 'Witness majestic blue whales and dolphins in their natural habitat.',
      duration: 'Half Day',
      location: 'Mirissa',
      price: 95,
      currency: 'USD',
      rating: 4.7,
      reviewCount: 183,
      imageUrl: 'https://images.unsplash.com/photo-1516407757093-2f48584fb989?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      featured: true,
      tags: ['Wildlife', 'Ocean', 'Photography'],
      activityLevel: 'moderate',
      seasonality: ['Nov-Apr']
    },
    {
      id: 8,
      title: 'Village Life Experience',
      category: 'family',
      description: 'Immerse your family in authentic rural Sri Lankan life with this interactive village experience. Ride in a traditional bullock cart, cross a lake by catamaran, and try your hand at activities like pottery, weaving, and traditional cooking. Children can participate in games with local kids while learning about sustainable village life. The day concludes with a traditional lunch served on banana leaves.',
      shortDescription: 'Experience rural Sri Lankan life with interactive family activities.',
      duration: 'Full Day',
      location: 'Habarana',
      price: 140,
      currency: 'USD',
      rating: 4.9,
      reviewCount: 112,
      imageUrl: 'https://images.unsplash.com/photo-1625456381035-d7e0ea18eaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      featured: false,
      tags: ['Family', 'Cultural', 'Interactive'],
      activityLevel: 'easy',
      seasonality: ['Year-round']
    }
  ];
  
  // Filter experiences based on search and category
  const filteredExperiences = experiencesData.filter(experience => {
    const matchesSearch = experience.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          experience.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          experience.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || experience.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get featured experiences
  const featuredExperiences = experiencesData.filter(exp => exp.featured);
  
  // Effect to scroll to results when category is selected
  useEffect(() => {
    if (selectedCategory !== null && filteredResultsRef.current) {
      // Scroll to filtered results with a small delay for smooth transition
      setTimeout(() => {
        filteredResultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [selectedCategory]);
  
  // Format price with currency
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(price);
  };
  
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
      {/* Hero Section - Exactly matching Tours page style */}
      <section className="relative h-[30vh] md:h-[35vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1535162222970-f8ab279245f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/40"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex flex-col justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              Sri Lankan Experiences
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              Handcrafted adventures to immerse yourself in Sri Lanka's culture and natural beauty
            </p>
          </div>
        </div>
      </section>
      
      {/* All Experiences Section */}
      <section id="all-experiences" className="py-16 bg-[#F8F5F0]/50" ref={filteredResultsRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0077B6] mb-2">All Experiences</h2>
            <p className="text-lg text-[#333333]/80 max-w-2xl mx-auto">
              Discover authentic Sri Lankan moments, from cultural immersions to breathtaking adventures across this tropical paradise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiences.map((experience) => (
              <div key={experience.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={experience.imageUrl} 
                    alt={experience.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm py-1 px-3 rounded-full text-sm font-medium text-[#0077B6]">
                    {experience.category.charAt(0).toUpperCase() + experience.category.slice(1)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-gray-800 mb-2 line-clamp-1">{experience.title}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex mr-2">
                      {renderStars(experience.rating)}
                    </div>
                    <span className="text-gray-600 text-xs">
                      {experience.rating.toFixed(1)} ({experience.reviewCount})
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{experience.shortDescription}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-gray-500">From</p>
                      <div className="flex items-baseline">
                        <span className="text-[#0077B6] text-lg font-semibold">
                          {formatPrice(experience.price, experience.currency)}
                        </span>
                        <span className="text-gray-500 text-xs ml-1">/ person</span>
                      </div>
                    </div>
                    <Link href={`/experiences/${experience.id}`} className="inline-flex items-center bg-[#0077B6] hover:bg-[#005f92] text-white text-sm py-1.5 px-3 rounded-full transition group">
                      Details <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredExperiences.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <div className="w-20 h-20 rounded-full bg-[#F8F5F0] flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-[#0077B6]/50" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-gray-800 mb-2">No Experiences Found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find any experiences matching your criteria. Try adjusting your filters or search terms.
              </p>
              <button 
                className="mt-6 inline-flex items-center bg-[#0077B6] hover:bg-[#005f92] text-white py-2.5 px-5 rounded-full transition shadow-md"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                  // Scroll back to the top of the results
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Custom Experience Section - Redesigned */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#004E64] to-[#0077B6] rounded-2xl overflow-hidden shadow-xl relative">
            <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M46.5,-58.5C59.6,-47.8,69.3,-32.8,73.2,-16.2C77.1,0.5,75.1,18.8,66.3,31.5C57.5,44.2,41.9,51.3,26.2,57.4C10.5,63.5,-5.3,68.7,-19,65.4C-32.8,62.1,-44.5,50.2,-54.5,36.8C-64.6,23.3,-73,8.2,-73.1,-7.2C-73.3,-22.5,-65.2,-38.2,-52.8,-49C-40.4,-59.8,-23.7,-65.8,-4.9,-61.1C13.9,-56.5,33.3,-69.2,46.5,-58.5Z" transform="translate(100 100)" />
              </svg>
            </div>
            
            <div className="flex flex-col md:flex-row">
              {/* Image Side */}
              <div className="md:w-2/5 relative">
                <div className="absolute inset-0 bg-cover bg-center" style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1560179406-1c6c60e0dc76?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80')",
                }}>
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
                </div>
                <div className="py-10 px-8 md:p-0 relative md:absolute inset-0 flex flex-col justify-center items-center text-center md:text-left">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg max-w-xs">
                    <h3 className="font-['Playfair_Display'] text-white text-xl font-bold mb-2">Crafted For You</h3>
                    <p className="text-white/90 text-sm">
                      "The custom tour arranged for us was the highlight of our Sri Lanka visit. Every detail was perfectly tailored to our interests."
                    </p>
                    <div className="mt-3 flex items-center justify-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-[#F6E27F] fill-[#F6E27F]" />
                        ))}
                      </div>
                      <span className="ml-2 text-white text-xs">– Sarah & David</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="md:w-3/5 p-8 md:p-12 relative">
                <div className="max-w-2xl">
                  <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">
                    Create Your Custom Experience
                  </h2>
                  <p className="text-white/90 mb-8">
                    Our travel designers will craft a bespoke experience that reflects your interests, preferences, and travel style. From cultural immersions to adventure activities, your custom journey will be uniquely yours.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                        <Calendar className="w-6 h-6 text-[#F6E27F]" />
                      </div>
                      <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-2 text-white">Your Perfect Timing</h3>
                      <p className="text-white/80 text-sm">
                        Choose your ideal dates and pace, with experiences timed for magical moments like sunrise at Sigiriya or sunset at Galle Fort.
                      </p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-[#F6E27F]" />
                      </div>
                      <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-2 text-white">Private Journey</h3>
                      <p className="text-white/80 text-sm">
                        Enjoy the exclusivity of private guides, luxury transportation, and personalized attention throughout your Sri Lankan adventure.
                      </p>
                    </div>
                  </div>
                  
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center bg-[#F6E27F] hover:bg-[#f7e9a1] text-[#004E64] font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group"
                  >
                    Begin Your Custom Journey
                    <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Experiences Section */}
      <section className="py-16 bg-gradient-to-b from-white to-[#F8F5F0]/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0077B6] mb-4">Featured Experiences</h2>
            <p className="text-lg text-[#333333]/80">Our most popular and unique luxury experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredExperiences.map((experience) => (
              <div key={experience.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all flex flex-col h-full">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={experience.imageUrl} 
                    alt={experience.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-3 right-3 bg-[#F26B6B] text-white text-xs py-1 px-2 rounded-full tracking-wide uppercase">
                    Featured
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-['Playfair_Display'] text-lg font-bold text-gray-800 mb-2 line-clamp-1">{experience.title}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderStars(experience.rating)}
                    </div>
                    <span className="text-gray-600 text-xs">
                      {experience.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{experience.shortDescription}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Tag className="w-4 h-4 mr-1" />
                        <span>{experience.tags[0]}</span>
                      </div>
                      <div className="text-[#0077B6] font-semibold">
                        {formatPrice(experience.price, experience.currency)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Experiences;