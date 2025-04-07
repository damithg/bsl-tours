import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  X
} from 'lucide-react';

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
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const ExperiencesAlternative = () => {
  // State for filters and animations
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeExperience, setActiveExperience] = useState<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Update scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Define experience categories with Lucide icons
  const categories: Category[] = [
    {
      id: 'cultural',
      name: 'Cultural',
      description: 'Immersive heritage and tradition',
      icon: <span className="material-symbols-outlined">temple_buddhist</span>,
      color: 'text-amber-700',
      bgColor: 'bg-amber-50'
    },
    {
      id: 'adventure',
      name: 'Adventure',
      description: 'Thrilling expeditions',
      icon: <span className="material-symbols-outlined">forest</span>,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50'
    },
    {
      id: 'wellness',
      name: 'Wellness',
      description: 'Rejuvenating escapes',
      icon: <span className="material-symbols-outlined">spa</span>,
      color: 'text-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'culinary',
      name: 'Culinary',
      description: 'Gastronomic journeys',
      icon: <span className="material-symbols-outlined">restaurant</span>,
      color: 'text-red-700',
      bgColor: 'bg-red-50'
    },
    {
      id: 'romantic',
      name: 'Romantic',
      description: 'Intimate moments',
      icon: <span className="material-symbols-outlined">favorite</span>,
      color: 'text-pink-700',
      bgColor: 'bg-pink-50'
    },
    {
      id: 'family',
      name: 'Family',
      description: 'Memorable family adventures',
      icon: <span className="material-symbols-outlined">family_restroom</span>,
      color: 'text-indigo-700',
      bgColor: 'bg-indigo-50'
    }
  ];
  
  // Sample experiences data (would be fetched from API in a real implementation)
  const experiencesData: Experience[] = [
    {
      id: 1,
      title: 'Sacred Heritage of Anuradhapura',
      category: 'cultural',
      description: 'Journey through time at Sri Lanka&apos;s ancient capital, where sacred Buddhist relics are housed in magnificent stupas. Walk the same paths as kings and pilgrims from over 2,000 years ago as your expert guide reveals the secrets of this UNESCO World Heritage site. Witness the Sri Maha Bodhi, the world&apos;s oldest documented tree, and experience the spiritual ambiance of this sacred city.',
      shortDescription: 'Explore the ancient ruins of Sri Lanka&apos;s first capital with expert guides.',
      duration: 'Full Day',
      location: 'Anuradhapura',
      price: 120,
      currency: 'USD',
      rating: 4.8,
      reviewCount: 128,
      imageUrl: 'https://images.unsplash.com/photo-1596263532618-6ffaf5baa82c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      featured: true,
      tags: ['UNESCO Heritage', 'Historical', 'Cultural'],
      activityLevel: 'moderate',
      seasonality: ['Year-round']
    },
    {
      id: 2,
      title: 'Leopard Trails: Yala Safari Experience',
      category: 'adventure',
      description: 'Embark on an exclusive wildlife safari in Yala National Park, home to one of the highest leopard densities in the world. Your private jeep and expert naturalist guide will take you through diverse ecosystems in search of Sri Lanka&apos;s magnificent wildlife. Beyond the elusive leopard, encounter elephants, sloth bears, crocodiles, and vibrant birdlife in their natural habitat. The experience includes gourmet refreshments and a champagne sundowner.',
      shortDescription: 'Track leopards and wildlife in Sri Lanka&apos;s premier national park.',
      duration: 'Full Day',
      location: 'Yala National Park',
      price: 350,
      currency: 'USD',
      rating: 4.9,
      reviewCount: 203,
      imageUrl: 'https://images.unsplash.com/photo-1562613579-059859382132?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      featured: true,
      tags: ['Wildlife', 'Safari', 'Photography'],
      activityLevel: 'easy',
      seasonality: ['Feb-Jul']
    },
    {
      id: 3,
      title: 'Luxury Ayurvedic Spa Retreat',
      category: 'wellness',
      description: 'Immerse yourself in the ancient healing traditions of Sri Lanka with this premium Ayurvedic experience. Begin with a private consultation with an Ayurvedic doctor who will customize treatments to your individual dosha (body constitution). Enjoy a series of therapeutic treatments including herbal steam baths, warm oil massages, and medicinal herb bundles. The experience concludes with a personalized wellness plan and organic herbal refreshments in a private pavilion overlooking lush gardens.',
      shortDescription: 'Rejuvenate with personalized traditional Ayurvedic treatments and therapies.',
      duration: 'Half Day',
      location: 'Bentota',
      price: 280,
      currency: 'USD',
      rating: 4.7,
      reviewCount: 89,
      imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      featured: false,
      tags: ['Spa', 'Relaxation', 'Wellness'],
      activityLevel: 'easy',
      seasonality: ['Year-round']
    },
    {
      id: 4,
      title: 'Chef&apos;s Table: Sri Lankan Culinary Journey',
      category: 'culinary',
      description: 'Discover the vibrant flavors of Sri Lankan cuisine with this immersive culinary experience. Begin at a local market where a celebrated chef will guide you in selecting exotic spices and fresh produce. In a private beachfront kitchen, learn the art of preparing authentic Sri Lankan dishes, from fragrant curries to traditional hoppers. Master the techniques of spice blending and coconut milk extraction before enjoying your creations during an elegant dinner paired with fine wines and local arrack.',
      shortDescription: 'Master authentic Sri Lankan cuisine with celebrated local chefs.',
      duration: 'Half Day',
      location: 'Galle',
      price: 195,
      currency: 'USD',
      rating: 4.9,
      reviewCount: 156,
      imageUrl: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      featured: false,
      tags: ['Cooking', 'Food', 'Cultural'],
      activityLevel: 'easy',
      seasonality: ['Year-round']
    },
    {
      id: 5,
      title: 'Private Beach Dinner Under the Stars',
      category: 'romantic',
      description: 'Experience the ultimate romantic evening on a private stretch of pristine beach. As the sun sets over the Indian Ocean, follow a pathway of torches to your exclusive dining pavilion. A dedicated team of chefs and waitstaff will serve a bespoke seven-course tasting menu featuring the freshest seafood and local delicacies. Dine by candlelight with the gentle sound of waves as your soundtrack, with the option of a private musician. The evening concludes with a champagne toast under the stars.',
      shortDescription: 'Enjoy an exquisite candlelit dinner on a secluded beach.',
      duration: 'Evening',
      location: 'Bentota Beach',
      price: 320,
      currency: 'USD',
      rating: 5.0,
      reviewCount: 74,
      imageUrl: 'https://images.unsplash.com/photo-1602168048516-5642916cd8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      featured: true,
      tags: ['Romantic', 'Dining', 'Beach'],
      activityLevel: 'easy',
      seasonality: ['Dec-Apr']
    },
    {
      id: 6,
      title: 'Ceylon Tea Journey',
      category: 'cultural',
      description: 'Immerse yourself in the world of Ceylon tea with this exclusive plantation experience. Travel by private helicopter to a historic tea estate in the misty highlands where you&apos;ll be greeted by the estate manager. Tour the lush tea gardens with a senior planter who will explain the sustainable cultivation methods that produce Sri Lanka&apos;s finest teas. Visit the factory to witness the artisanal production process before participating in a private tea tasting session guided by a master tea sommelier. The experience includes a gourmet picnic lunch amid panoramic mountain views.',
      shortDescription: 'Discover the artistry behind Ceylon&apos;s world-renowned teas.',
      duration: 'Full Day',
      location: 'Nuwara Eliya',
      price: 410,
      currency: 'USD',
      rating: 4.8,
      reviewCount: 142,
      imageUrl: 'https://images.unsplash.com/photo-1566200128242-5a23f7a08f64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      featured: false,
      tags: ['Tea', 'Cultural', 'Scenic'],
      activityLevel: 'moderate',
      seasonality: ['Year-round']
    },
    {
      id: 7,
      title: 'Blue Whale Expedition',
      category: 'adventure',
      description: 'Embark on an unforgettable marine adventure to witness the largest animals on earth in their natural habitat. Board a luxury catamaran equipped with viewing decks and underwater viewing windows for an exclusive whale watching experience. Sri Lanka&apos;s waters are among the best in the world for blue whale sightings, with opportunities to also spot sperm whales, orcas, and several dolphin species. Marine biologists accompany each expedition, providing fascinating insights about these magnificent creatures. The experience includes gourmet breakfast, lunch, premium beverages, and professional photography services.',
      shortDescription: 'Witness the majestic blue whales from a luxury catamaran.',
      duration: 'Full Day',
      location: 'Mirissa',
      price: 295,
      currency: 'USD',
      rating: 4.7,
      reviewCount: 183,
      imageUrl: 'https://images.unsplash.com/photo-1624212187620-9359ec6055a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      featured: true,
      tags: ['Wildlife', 'Ocean', 'Photography'],
      activityLevel: 'moderate',
      seasonality: ['Nov-Apr']
    },
    {
      id: 8,
      title: 'Village Life Experience',
      category: 'family',
      description: 'Connect with Sri Lanka&apos;s rural heritage through this authentic yet comfortable village experience designed for families. Arrive at a traditional village via bullock cart and cross a lake by catamaran to reach a model village created specifically for immersive cultural experiences. Participate in hands-on activities including pottery, traditional cooking, and paddy harvesting alongside local craftspeople. Children will enjoy special activities like buffalo bathing, kite making, and village games with local children. The day concludes with a farm-to-table lunch featuring organic village produce served on traditional banana leaves.',
      shortDescription: 'Experience rural Sri Lankan life with interactive family activities.',
      duration: 'Full Day',
      location: 'Habarana',
      price: 240,
      currency: 'USD',
      rating: 4.9,
      reviewCount: 112,
      imageUrl: 'https://images.unsplash.com/photo-1625456381035-d7e0ea18eaa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      featured: false,
      tags: ['Family', 'Cultural', 'Interactive'],
      activityLevel: 'easy',
      seasonality: ['Year-round']
    }
  ];
  
  // Filter experiences based on search and category
  const filteredExperiences = experiencesData.filter(experience => {
    const matchesSearch = searchQuery === '' || 
                         experience.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         experience.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || experience.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get featured experiences
  const featuredExperiences = experiencesData.filter(exp => exp.featured);
  
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
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < Math.floor(rating) 
              ? 'fill-[#F6E27F] text-[#F6E27F]' 
              : i < Math.floor(rating) + 0.5 
                ? 'fill-[#F6E27F]/50 text-[#F6E27F]' 
                : 'text-[#F6E27F]'}`}
          />
        ))}
      </div>
    );
  };
  
  // Calculate parallax values
  const getParallaxStyle = (speed = 0.2) => {
    return {
      transform: `translateY(${scrollPosition * speed}px)`
    };
  };
  
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Parallax */}
      <section className="relative h-[85vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1546948630-1149ea60dc86?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
            ...getParallaxStyle(0.15)
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"></div>
        
        <div className="container mx-auto px-6 relative h-full flex flex-col justify-end pb-20 md:pb-32">
          <div className="max-w-4xl mb-8">
            <div 
              className="opacity-0 animate-[fadeInUp_0.8s_ease_forwards]" 
              style={{animationDelay: '0.3s'}}
            >
              <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Curated<br />Experiences
              </h1>
            </div>
            
            <div 
              className="opacity-0 animate-[fadeInUp_0.8s_ease_forwards]" 
              style={{animationDelay: '0.6s'}}
            >
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed">
                Discover the essence of Sri Lanka through our carefully crafted experiences, designed to reveal the island's treasures in unparalleled luxury.
              </p>
            </div>
          </div>
          
          <div 
            className="opacity-0 animate-[fadeInUp_0.8s_ease_forwards]" 
            style={{animationDelay: '0.9s'}}
          >
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)} 
                className="flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 py-3 px-6 rounded-full transition"
              >
                <Search className="w-5 h-5 mr-2" />
                <span>Search Experiences</span>
              </button>
              
              <button 
                onClick={() => {
                  const categoriesSection = document.getElementById('categories-section');
                  if (categoriesSection) {
                    categoriesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex items-center text-white"
              >
                <span>Explore Categories</span>
                <ChevronDown className="w-5 h-5 ml-1 animate-bounce" />
              </button>
            </div>
            
            {isSearchOpen && (
              <div className="absolute left-0 right-0 mt-4 bg-white/95 shadow-xl backdrop-blur-md p-4 rounded-xl z-20 animate-[fadeIn_0.3s_ease_forwards]">
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by experience, location, or activity..."
                    className="w-full pl-12 pr-12 py-3 bg-transparent border-b border-gray-300 text-gray-800 focus:outline-none focus:border-[#0077B6]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button 
                    className="absolute right-4 top-3.5"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-5 w-5 text-gray-500 hover:text-gray-900" />
                  </button>
                </div>
                {searchQuery && (
                  <div className="mt-4 max-h-80 overflow-y-auto">
                    {filteredExperiences.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredExperiences.map((exp) => (
                          <Link key={exp.id} href={`/experiences/${exp.id}`}>
                            <div className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                <img 
                                  src={exp.imageUrl} 
                                  alt={exp.title} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-3">
                                <h4 className="text-sm font-semibold text-gray-900">{exp.title}</h4>
                                <div className="flex items-center text-xs text-gray-500">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  <span>{exp.location}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-500">No experiences match your search criteria.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>
      
      {/* Category Navigation Section */}
      <section id="categories-section" className="py-16 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="mb-12 relative">
            <div className="absolute -top-16 left-0 w-16 h-16 rounded-full bg-[#F6E27F]/20"></div>
            <div className="absolute top-8 right-10 w-8 h-8 rounded-full bg-[#0077B6]/10"></div>
            
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-gray-900 relative z-10">
              Discover by <span className="text-[#0077B6]">Category</span>
            </h2>
            <p className="text-lg text-gray-600 mt-3 max-w-2xl">
              Explore our handpicked experiences by category, each designed to showcase the finest aspects of Sri Lanka.
            </p>
            <p className="mt-2 text-sm text-[#0077B6]">
              <Link href="/experiences" className="inline-flex items-center underline hover:text-[#005f92]">
                Back to standard design <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`group p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border flex flex-col items-center text-center ${
                  selectedCategory === category.id 
                    ? `${category.bgColor} border-${category.color.split('-')[1]}-300 shadow` 
                    : 'bg-white border-gray-100'
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                style={{height: '180px'}}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  selectedCategory === category.id 
                    ? `${category.color} bg-white` 
                    : `${category.bgColor} ${category.color} group-hover:${category.color} group-hover:bg-white`
                }`}>
                  {category.icon}
                </div>
                <h3 className={`font-semibold transition-colors ${
                  selectedCategory === category.id 
                    ? `${category.color}` 
                    : 'text-gray-800 group-hover:text-gray-900'
                }`}>
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2">{category.description}</p>
              </button>
            ))}
          </div>
          
          {selectedCategory && (
            <div className="mt-4 pt-2 pb-1 px-4 bg-gray-100 rounded-full inline-flex items-center">
              <span className="text-sm text-gray-700 mr-3">
                Showing {categories.find(c => c.id === selectedCategory)?.name} experiences
              </span>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-sm text-[#0077B6] hover:text-[#005f92] flex items-center"
              >
                Clear filter <X className="w-3 h-3 ml-1" />
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Experiences Section */}
      {featuredExperiences.length > 0 && (
        <section className="py-20 bg-[#F8F9FA]">
          <div className="container mx-auto px-6">
            <div className="mb-16 relative">
              <div className="absolute -top-10 right-0 w-40 h-40 rounded-full bg-[#0077B6]/5"></div>
              
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-gray-900 relative z-10">
                Featured <span className="text-[#0077B6]">Experiences</span>
              </h2>
              <p className="text-lg text-gray-600 mt-3 max-w-2xl">
                Our most sought-after experiences, each offering an exceptional window into Sri Lanka's beauty and culture.
              </p>
            </div>
            
            <div className="space-y-32">
              {featuredExperiences.map((experience, index) => (
                <div 
                  key={experience.id} 
                  className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div 
                    className="md:w-[65%] h-[500px] rounded-3xl overflow-hidden"
                    onMouseEnter={() => setActiveExperience(experience.id)}
                    onMouseLeave={() => setActiveExperience(null)}
                  >
                    <div className="w-full h-full relative group">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${experience.imageUrl}')` }}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-10">
                        <span className="inline-block bg-white text-[#0077B6] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                          {experience.category.charAt(0).toUpperCase() + experience.category.slice(1)}
                        </span>
                        
                        <h3 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">
                          {experience.title}
                        </h3>
                        
                        <div className="flex items-center text-white/80 space-x-4 mb-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{experience.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{experience.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="flex mr-2">
                            {renderStars(experience.rating)}
                          </div>
                          <span className="text-white/80 text-sm">
                            {experience.rating.toFixed(1)} ({experience.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`md:w-[45%] md:absolute top-1/2 ${index % 2 === 0 ? 'right-0' : 'left-0'} transform -translate-y-1/2 ${index % 2 === 0 ? 'translate-x-16' : '-translate-x-16'} z-10`}>
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 md:ml-auto md:mr-0 max-w-xl">
                      <div className="mb-6">
                        <p className="text-sm font-medium text-[#0077B6] mb-2 uppercase tracking-wide">Experience Highlights</p>
                        <p className="text-gray-700 leading-relaxed">
                          {experience.description.substring(0, 300)}...
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {experience.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-start justify-between pt-6 border-t border-gray-100">
                        <div>
                          <p className="text-sm text-gray-500">Starting from</p>
                          <div className="flex items-baseline">
                            <span className="text-[#0077B6] text-2xl font-semibold">
                              {formatPrice(experience.price, experience.currency)}
                            </span>
                            <span className="text-gray-500 text-sm ml-1.5">/ per person</span>
                          </div>
                        </div>
                        <Link href={`/experiences/${experience.id}`} className="inline-flex items-center bg-[#0077B6] hover:bg-[#005f92] text-white py-3 px-6 rounded-full transition group shadow-md">
                          Explore in Detail 
                          <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* All Experiences Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="relative">
              <div className="absolute -top-10 left-0 w-20 h-20 rounded-full bg-[#F6E27F]/20"></div>
              
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-gray-900 relative z-10">
                All <span className="text-[#0077B6]">Experiences</span>
              </h2>
              <p className="text-lg text-gray-600 mt-3 max-w-2xl">
                {filteredExperiences.length} unique ways to discover the magic of Sri Lanka
                {selectedCategory && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
              </p>
            </div>
            
            <div className="mt-6 md:mt-0">
              <div className="flex items-center border rounded-full overflow-hidden bg-white shadow-sm px-3">
                <span className="text-gray-600 pr-3">Sort by:</span>
                <select className="py-3 pr-8 pl-2 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-600">
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
              <div 
                key={experience.id} 
                className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full overflow-hidden group"
              >
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={experience.imageUrl} 
                    alt={experience.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm py-1.5 px-4 rounded-full text-sm font-medium text-[#0077B6]">
                    {experience.category.charAt(0).toUpperCase() + experience.category.slice(1)}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex space-x-4 text-white">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{experience.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span className="text-sm">{experience.seasonality[0]}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span className="text-sm">{experience.activityLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-2 group-hover:text-[#0077B6] transition-colors">
                    {experience.title}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex mr-2">
                      {renderStars(experience.rating)}
                    </div>
                    <span className="text-gray-600 text-xs">
                      {experience.rating.toFixed(1)} ({experience.reviewCount})
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-5 line-clamp-3">{experience.shortDescription}</p>
                  
                  <div className="mt-auto flex items-end justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">From</p>
                      <div className="flex items-baseline">
                        <span className="text-[#0077B6] text-lg font-semibold">
                          {formatPrice(experience.price, experience.currency)}
                        </span>
                        <span className="text-gray-500 text-xs ml-1">/ person</span>
                      </div>
                    </div>
                    <Link 
                      href={`/experiences/${experience.id}`} 
                      className="inline-flex items-center bg-transparent hover:bg-[#0077B6]/10 text-[#0077B6] text-sm py-2 px-4 rounded-full transition group border border-[#0077B6]/20 hover:border-[#0077B6]"
                    >
                      View Details 
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredExperiences.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
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
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Testimonials Section with Geometric Elements */}
      <section className="py-24 bg-[#F8F9FA] relative overflow-hidden">
        <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-[#0077B6]/5"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#F6E27F]/10"></div>
        <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-[#0077B6]/10"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Guest <span className="text-[#0077B6]">Testimonials</span>
            </h2>
            <p className="text-lg text-gray-600">
              Hear from guests who have experienced our curated journeys
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-md relative">
              <div className="absolute -top-6 left-8 w-12 h-12 flex items-center justify-center rounded-full bg-[#0077B6]">
                <span className="text-white text-4xl leading-none font-serif">"</span>
              </div>
              <div className="pt-6">
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  The private beach dinner was beyond our expectations. Every detail was perfect - from the torch-lit pathway to the exceptional cuisine. A truly magical evening that will be a highlight of our marriage for years to come.
                </p>
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/23.jpg" 
                      alt="Emma & James T." 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Emma & James T.</h4>
                    <p className="text-sm text-gray-500">United Kingdom</p>
                    {renderStars(5)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-md relative">
              <div className="absolute -top-6 left-8 w-12 h-12 flex items-center justify-center rounded-full bg-[#0077B6]">
                <span className="text-white text-4xl leading-none font-serif">"</span>
              </div>
              <div className="pt-6">
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  The Ayurvedic spa retreat was transformative. The expert practitioners created a personalized experience that addressed my specific needs. I left feeling rejuvenated and with practical wellness knowledge to take home.
                </p>
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/65.jpg" 
                      alt="Sophia M." 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sophia M.</h4>
                    <p className="text-sm text-gray-500">Australia</p>
                    {renderStars(4.7)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-md relative">
              <div className="absolute -top-6 left-8 w-12 h-12 flex items-center justify-center rounded-full bg-[#0077B6]">
                <span className="text-white text-4xl leading-none font-serif">"</span>
              </div>
              <div className="pt-6">
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  The leopard safari exceeded all expectations. Our guide seemed to have a sixth sense for tracking these elusive cats. We witnessed two separate leopard sightings, including a mother with cubs - a truly once-in-a-lifetime experience.
                </p>
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/men/42.jpg" 
                      alt="Michael D." 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Michael D.</h4>
                    <p className="text-sm text-gray-500">Canada</p>
                    {renderStars(5)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-[#0077B6] rounded-3xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-6">
                  Design Your Perfect Experience
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-lg">
                  Our luxury travel experts are ready to craft a bespoke experience tailored to your preferences and interests. Contact us to begin your journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-[#0077B6] py-3.5 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    Contact Our Experts
                  </Link>
                  <Link 
                    href="/about" 
                    className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white border border-white py-3.5 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    About Our Approach
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 h-80 md:h-auto relative">
                <img 
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Luxury Travel Expert" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0077B6] via-transparent to-transparent md:bg-gradient-to-l"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExperiencesAlternative;