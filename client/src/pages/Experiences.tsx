import { useState, useRef, useEffect } from 'react';
import { ChevronRight, Search, Filter, Star, Clock, MapPin, Tag, ChevronDown } from 'lucide-react';
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
  const [showFilters, setShowFilters] = useState(false);
  
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
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551211645-75a7e04c6c67?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex flex-col justify-center">
          <div className="max-w-4xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-5xl font-bold text-white md:mb-0 mb-4">
                Curated Luxury Experiences
              </h1>
              <p className="text-xl text-white/90 md:ml-8 md:text-right">
                Handcrafted Sri Lankan luxury
              </p>
            </div>
            <div className="h-8"></div> {/* Spacer */}
            <div className="relative max-w-xl">
              <div className="flex rounded-lg overflow-hidden shadow-lg">
                <div className="flex-grow relative bg-white">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search experiences..."
                    className="block w-full bg-white py-3 pl-10 pr-4 text-gray-900 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  className="px-4 flex items-center bg-[#0077B6] hover:bg-[#005f92] text-white transition"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-5 w-5 mr-2" />
                  <span>Filters</span>
                </button>
              </div>
            </div>
            
            {/* Advanced Filters (conditionally shown) */}
            {showFilters && (
              <div className="mt-4 bg-white rounded-lg shadow-lg max-w-xl transition-all overflow-hidden">
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Duration</label>
                      <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-[#0077B6]">
                        <option value="">Any Duration</option>
                        <option value="half">Half Day</option>
                        <option value="full">Full Day</option>
                        <option value="multi">Multi-Day</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Price Range</label>
                      <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-[#0077B6]">
                        <option value="">Any Price</option>
                        <option value="budget">Under $100</option>
                        <option value="mid">$100 - $200</option>
                        <option value="premium">$200+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Activity Level</label>
                      <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-[#0077B6]">
                        <option value="">Any Level</option>
                        <option value="easy">Easy</option>
                        <option value="moderate">Moderate</option>
                        <option value="challenging">Challenging</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end bg-gray-50 py-3 px-6 border-t border-gray-100">
                  <button 
                    className="bg-[#0077B6] hover:bg-[#005f92] text-white px-4 py-2 rounded-lg transition"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0077B6] mb-4">Experience Categories</h2>
            <p className="text-lg text-[#333333]/80">Browse our diverse range of experiences by category</p>
            <p className="mt-2 text-sm text-[#0077B6]">
              <Link href="/experiences-premium" className="inline-flex items-center underline hover:text-[#005f92]">
                Try our premium design <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`group relative overflow-hidden rounded-xl shadow-md transition-all hover:shadow-lg 
                  ${selectedCategory === category.id ? 'ring-4 ring-[#0077B6]' : ''}`}
                onClick={() => {
                  const newCategory = selectedCategory === category.id ? null : category.id;
                  setSelectedCategory(newCategory);
                  // If we're clearing the filter, don't scroll
                  if (newCategory && filteredResultsRef.current) {
                    setTimeout(() => {
                      filteredResultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }
                }}
              >
                {/* Background Image */}
                <div className="aspect-[4/3] w-full">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${category.imageUrl}')` }}
                  ></div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <div className={`w-10 h-10 rounded-full ${category.color} mb-2 flex items-center justify-center`}>
                      <i className={`fas ${category.icon}`}></i>
                    </div>
                    <h3 className="font-['Playfair_Display'] text-lg font-semibold text-white mb-1">{category.name}</h3>
                    <p className="text-xs text-white/80 line-clamp-2">{category.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* All Experiences Section */}
      <section className="py-16 bg-[#F8F5F0]/50" ref={filteredResultsRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0077B6] mb-2">All Experiences</h2>
              <p className="text-lg text-[#333333]/80">
                {filteredExperiences.length} {filteredExperiences.length === 1 ? 'experience' : 'experiences'} found
                {selectedCategory && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center border rounded-full overflow-hidden bg-white shadow-sm">
                <span className="px-4 text-gray-600">Sort by:</span>
                <select className="py-2 pr-8 pl-2 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-600">
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
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
      
      {/* Custom Experience Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0077B6]/10 rounded-xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#0077B6" d="M46.5,-58.5C59.6,-47.8,69.3,-32.8,73.2,-16.2C77.1,0.5,75.1,18.8,66.3,31.5C57.5,44.2,41.9,51.3,26.2,57.4C10.5,63.5,-5.3,68.7,-19,65.4C-32.8,62.1,-44.5,50.2,-54.5,36.8C-64.6,23.3,-73,8.2,-73.1,-7.2C-73.3,-22.5,-65.2,-38.2,-52.8,-49C-40.4,-59.8,-23.7,-65.8,-4.9,-61.1C13.9,-56.5,33.3,-69.2,46.5,-58.5Z" transform="translate(100 100)" />
              </svg>
            </div>
            
            <div className="relative max-w-3xl">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0077B6] mb-4">Create Your Custom Experience</h2>
              <p className="text-lg text-[#333333]/80 mb-6">
                Don't see exactly what you&apos;re looking for? Our travel experts can design a completely customized experience tailored to your preferences.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg p-5 shadow-sm border border-[#0077B6]/10">
                  <div className="w-12 h-12 rounded-full bg-[#0077B6]/10 flex items-center justify-center mb-4">
                    <i className="fas fa-calendar-alt text-[#0077B6]"></i>
                  </div>
                  <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-2">Flexible Scheduling</h3>
                  <p className="text-gray-600 text-sm">
                    Choose dates and times that work for your itinerary, with options for sunrise, sunset, or nighttime experiences.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-5 shadow-sm border border-[#0077B6]/10">
                  <div className="w-12 h-12 rounded-full bg-[#0077B6]/10 flex items-center justify-center mb-4">
                    <i className="fas fa-users text-[#0077B6]"></i>
                  </div>
                  <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-2">Private Arrangements</h3>
                  <p className="text-gray-600 text-sm">
                    Enjoy exclusive experiences designed just for you and your travel companions, with dedicated guides and personalized attention.
                  </p>
                </div>
              </div>
              
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-[#0077B6] hover:bg-[#005f92] text-white py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                Request Custom Experience
                <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
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
          
          <div className="space-y-12">
            {featuredExperiences.map((experience) => (
              <div key={experience.id} className="flex flex-col lg:flex-row bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className="lg:w-1/2 h-64 lg:h-auto relative">
                  <img 
                    src={experience.imageUrl} 
                    alt={experience.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm py-1 px-3 rounded-full text-sm font-medium text-[#0077B6]">
                    {experience.category.charAt(0).toUpperCase() + experience.category.slice(1)}
                  </div>
                </div>
                <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col">
                  <div className="mb-auto">
                    <h3 className="font-['Playfair_Display'] text-2xl font-bold text-gray-800 mb-2">{experience.title}</h3>
                    <div className="flex items-center mb-4">
                      <div className="flex mr-2">
                        {renderStars(experience.rating)}
                      </div>
                      <span className="text-gray-600 text-sm">
                        {experience.rating.toFixed(1)} ({experience.reviewCount} reviews)
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6">{experience.shortDescription}</p>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{experience.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Tag className="w-4 h-4 mr-1" />
                        <span>{experience.activityLevel.charAt(0).toUpperCase() + experience.activityLevel.slice(1)}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {experience.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="inline-block bg-[#F8F5F0] text-[#0077B6] px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <p className="text-sm text-gray-500">Starting from</p>
                      <div className="flex items-baseline">
                        <span className="text-[#0077B6] text-2xl font-semibold">
                          {formatPrice(experience.price, experience.currency)}
                        </span>
                        <span className="text-gray-500 text-sm ml-1.5">/ per person</span>
                      </div>
                    </div>
                    <Link href={`/experiences/${experience.id}`} className="inline-flex items-center bg-[#0077B6] hover:bg-[#005f92] text-white py-2.5 px-5 rounded-full transition group shadow-md">
                      View Details <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Expert Recommendations */}
      <section className="py-16 bg-[#F8F5F0]/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0077B6] mb-4">Expert Recommendations</h2>
            <p className="text-lg text-[#333333]/80">Curated experiences suggested by our local travel specialists</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1604881991720-f91add269bed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Seasonal special" 
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0077B6]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-6">
                <div className="inline-block bg-[#F6E27F]/20 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-medium mb-3">
                  Seasonal Special
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-gray-800 mb-3">
                  Kite Surfing in Kalpitiya
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  The monsoon winds create perfect conditions for kite surfing in Kalpitiya between May and October. Our expert instructors offer lessons for all levels.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#0077B6] font-semibold">From $120</span>
                  <Link 
                    href="/experiences/seasonal/kite-surfing" 
                    className="text-[#0077B6] group-hover:text-[#005f92] font-medium flex items-center transition"
                  >
                    Discover <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Local&apos;s favorite" 
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0077B6]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-6">
                <div className="inline-block bg-[#88B04B]/20 text-[#88B04B] px-3 py-1 rounded-full text-xs font-medium mb-3">
                  Local&apos;s Favorite
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-gray-800 mb-3">
                  Secret Waterfalls Hike
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Discover hidden waterfalls in the central highlands known only to locals. Trek through pristine rainforest to secluded swimming spots away from the crowds.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#0077B6] font-semibold">From $85</span>
                  <Link 
                    href="/experiences/local-secret/waterfalls" 
                    className="text-[#0077B6] group-hover:text-[#005f92] font-medium flex items-center transition"
                  >
                    Discover <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1583821883086-7b78ae590189?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="For returning visitors" 
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0077B6]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-6">
                <div className="inline-block bg-[#F26B6B]/20 text-[#F26B6B] px-3 py-1 rounded-full text-xs font-medium mb-3">
                  Off The Beaten Path
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-gray-800 mb-3">
                  Eastern Coast Discovery
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Perfect for returning visitors, this tour explores the less-visited eastern coast with pristine beaches, authentic fishing villages, and historic sites.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#0077B6] font-semibold">From $165</span>
                  <Link 
                    href="/experiences/hidden-gems/east-coast" 
                    className="text-[#0077B6] group-hover:text-[#005f92] font-medium flex items-center transition"
                  >
                    Discover <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0077B6] mb-4">Guest Experiences</h2>
            <p className="text-lg text-[#333333]/80">Read what our guests have to say about their favorite experiences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#F8F5F0] rounded-xl p-8 relative">
              <div className="absolute top-4 left-4 text-[#0077B6]/10 text-6xl font-serif">
                "
              </div>
              <div className="relative z-10">
                <p className="text-gray-700 mb-6 italic">
                  The cooking class in Galle was the highlight of our trip! Chef Kumara was so knowledgeable and made the experience fun for our whole family. We&apos;ve already tried making the curry at home and it was delicious.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/45.jpg" 
                      alt="Sarah Mitchell" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Sarah Mitchell</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F6E27F] text-[#F6E27F]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#F8F5F0] rounded-xl p-8 relative">
              <div className="absolute top-4 left-4 text-[#0077B6]/10 text-6xl font-serif">
                "
              </div>
              <div className="relative z-10">
                <p className="text-gray-700 mb-6 italic">
                  The private whale watching tour was incredible - we saw multiple blue whales and a super pod of dolphins! Our guide was incredibly knowledgeable about marine life. Worth every penny for the private boat.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/men/32.jpg" 
                      alt="James Wilson" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">James Wilson</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F6E27F] text-[#F6E27F]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-[#F8F5F0]/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0077B6] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-[#333333]/80">Everything you need to know about our luxury experiences</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button className="flex justify-between items-center w-full p-6 text-left">
                <h3 className="font-['Playfair_Display'] text-lg font-semibold text-gray-800">How far in advance should I book experiences?</h3>
                <ChevronDown className="w-5 h-5 text-[#0077B6]" />
              </button>
              <div className="px-6 pb-6">
                <p className="text-gray-600">
                  We recommend booking experiences at least 2-3 weeks in advance, especially during peak season (December to March). For highly popular experiences like whale watching or private dining, 4-6 weeks notice is ideal. Last-minute bookings can sometimes be accommodated based on availability.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button className="flex justify-between items-center w-full p-6 text-left">
                <h3 className="font-['Playfair_Display'] text-lg font-semibold text-gray-800">Can experiences be customized to my preferences?</h3>
                <ChevronDown className="w-5 h-5 text-[#0077B6]" />
              </button>
              <div className="px-6 pb-6">
                <p className="text-gray-600">
                  Absolutely! Most of our experiences can be tailored to your preferences, whether that&apos;s dietary requirements, physical ability levels, special interests, or time constraints. Simply mention your requirements when booking, and our team will work with you to create the perfect experience.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button className="flex justify-between items-center w-full p-6 text-left">
                <h3 className="font-['Playfair_Display'] text-lg font-semibold text-gray-800">What is your cancellation policy?</h3>
                <ChevronDown className="w-5 h-5 text-[#0077B6]" />
              </button>
              <div className="px-6 pb-6">
                <p className="text-gray-600">
                  Our standard cancellation policy allows for full refunds up to 7 days before the experience date. Cancellations within 3-7 days receive a 50% refund. Within 72 hours, experiences are non-refundable but may be rescheduled subject to availability. Some specialized experiences may have different policies, which will be clearly noted during booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="py-20 bg-[#0077B6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-4">
              Ready for an Unforgettable Experience?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Let us help you discover the authentic heart of Sri Lanka through our handcrafted experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white hover:bg-gray-100 text-[#0077B6] py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              >
                Contact Our Experience Team
              </Link>
              <Link 
                href="/tours" 
                className="bg-transparent hover:bg-white/10 text-white border border-white py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              >
                Explore Tour Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Experiences;