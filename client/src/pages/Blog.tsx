import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Calendar, Clock, Search, BookOpen, ChevronDown, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { COLORS } from '@/utils/colors';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
}



// Extended blog data - 15 posts for demonstration
const generateBlogPosts = (): BlogPost[] => [
  {
    id: 1,
    title: "Fantastic Places to Go in the Beautiful East Coast",
    slug: "fantastic-places-to-go-in-the-beautiful-east-coast",
    excerpt: "Discover the pristine beaches, vibrant marine life, and cultural treasures that make Sri Lanka's east coast a must-visit destination.",
    featuredImage: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1744094008/activities/mirissa-beach.jpg",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-03-15",
    readTime: 8,
    category: "Destinations",
    tags: ["East Coast", "Beaches", "Travel Tips"]
  },
  {
    id: 2,
    title: "The Ultimate Guide to Sri Lankan Cuisine",
    slug: "ultimate-guide-sri-lankan-cuisine",
    excerpt: "From spicy curries to sweet treats, explore the rich flavors and culinary traditions that make Sri Lankan food exceptional.",
    featuredImage: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1747699564/resources/regional-food.jpg",
    author: {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-03-12",
    readTime: 12,
    category: "Culture",
    tags: ["Food", "Culture", "Local Experience"]
  },
  {
    id: 3,
    title: "Wildlife Photography in Yala National Park",
    slug: "wildlife-photography-yala-national-park",
    excerpt: "Professional tips for capturing stunning wildlife photos in one of Sri Lanka's premier national parks.",
    featuredImage: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1744094008/activities/yala-leopard.jpg",
    author: {
      name: "Emma Williams",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-03-10",
    readTime: 6,
    category: "Photography",
    tags: ["Wildlife", "Photography", "Yala", "Safari"]
  },
  {
    id: 4,
    title: "Ancient Temples and Sacred Sites of Sri Lanka",
    slug: "ancient-temples-sacred-sites-sri-lanka",
    excerpt: "Journey through centuries of spiritual heritage as we explore the most significant temples and sacred sites.",
    featuredImage: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743256026/dambulla-cave-temples_xpkz40.jpg",
    author: {
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-03-08",
    readTime: 10,
    category: "Culture",
    tags: ["Temples", "History", "Buddhism", "Heritage"]
  },
  {
    id: 5,
    title: "Tea Country Adventures in Nuwara Eliya",
    slug: "tea-country-adventures-nuwara-eliya",
    excerpt: "Experience the misty mountains and rolling tea plantations that make Sri Lanka's hill country a paradise.",
    featuredImage: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1747709686/experiences/nuwara-eliya-tea-plucking.jpg",
    author: {
      name: "Lisa Thompson",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-03-05",
    readTime: 7,
    category: "Destinations",
    tags: ["Tea", "Mountains", "Nuwara Eliya", "Nature"]
  },
  {
    id: 6,
    title: "Best Budget Travel Tips for Sri Lanka",
    slug: "best-budget-travel-tips-sri-lanka",
    excerpt: "Travel Sri Lanka on a budget without compromising on experiences. Essential tips for affordable adventures.",
    featuredImage: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1744182888/itineraries/weligama-surf.jpg",
    author: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-03-03",
    readTime: 9,
    category: "Travel Tips",
    tags: ["Budget", "Backpacking", "Money Saving"]
  },
  {
    id: 7,
    title: "Luxury Beach Resorts in Southern Sri Lanka",
    slug: "luxury-beach-resorts-southern-sri-lanka",
    excerpt: "Discover the most exclusive beachfront resorts along Sri Lanka's stunning southern coastline.",
    featuredImage: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1744182732/itineraries/mirissa-day.jpg",
    author: {
      name: "Sophia Martinez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-03-01",
    readTime: 11,
    category: "Luxury",
    tags: ["Luxury", "Resorts", "Southern Coast"]
  },
  {
    id: 8,
    title: "Hiking Trails in Sri Lanka's Central Highlands",
    slug: "hiking-trails-central-highlands",
    excerpt: "Explore breathtaking mountain trails, from Adam's Peak pilgrimage to scenic routes through Horton Plains.",
    featuredImage: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1743677654/features/ella-caves.jpg",
    author: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-02-28",
    readTime: 8,
    category: "Adventure",
    tags: ["Hiking", "Mountains", "Adventure"]
  },
  {
    id: 9,
    title: "Ayurveda and Wellness Retreats",
    slug: "ayurveda-wellness-retreats",
    excerpt: "Rejuvenate your mind and body with authentic Ayurvedic treatments and wellness programs in serene locations.",
    featuredImage: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1744182998/itineraries/weligama-yoga.jpg",
    author: {
      name: "Dr. Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-02-25",
    readTime: 12,
    category: "Wellness",
    tags: ["Ayurveda", "Wellness", "Spa", "Health"]
  },
  {
    id: 10,
    title: "Street Food Adventures in Colombo",
    slug: "street-food-adventures-colombo",
    excerpt: "Navigate Colombo's vibrant street food scene and discover the authentic flavors that locals love.",
    featuredImage: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1744094008/activities/street-food.jpg",
    author: {
      name: "Ravi Patel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-02-22",
    readTime: 6,
    category: "Food",
    tags: ["Street Food", "Colombo", "Local Cuisine"]
  },
  {
    id: 11,
    title: "Photography Guide to Sigiriya Rock Fortress",
    slug: "photography-guide-sigiriya",
    excerpt: "Master the art of photographing Sri Lanka's most iconic landmark with professional techniques.",
    featuredImage: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1744094008/activities/sigiriya.jpg",
    author: {
      name: "Marcus Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-02-20",
    readTime: 9,
    category: "Photography",
    tags: ["Sigiriya", "Photography", "Ancient Sites"]
  },
  {
    id: 12,
    title: "Monsoon Season Travel Guide",
    slug: "monsoon-season-travel-guide",
    excerpt: "Make the most of Sri Lanka's monsoon seasons with strategic planning and destination recommendations.",
    featuredImage: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1744094008/activities/monsoon.jpg",
    author: {
      name: "Weather Expert Team",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-02-18",
    readTime: 7,
    category: "Travel Tips",
    tags: ["Weather", "Monsoon", "Planning"]
  }
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const postsPerPage = 9;

  const sampleBlogPosts = generateBlogPosts();
  const categories = ['All', 'Destinations', 'Culture', 'Photography', 'Travel Tips', 'Adventure', 'Luxury', 'Wellness', 'Food'];

  const filteredPosts = sampleBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex text-gray-600 mb-8 pt-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  Home
                </Link>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  <span className="text-sm font-medium text-gray-900">
                    Travel Journal
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold mb-6" style={{ color: COLORS.primary }}>
              Travel Journal
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stories, guides, and insights from Sri Lanka's most beautiful destinations
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'text-white shadow-md'
                    : 'text-gray-600 bg-white border border-gray-200 hover:border-gray-300'
                }`}
                style={selectedCategory === category ? { backgroundColor: COLORS.primary } : {}}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>



      {/* Featured Article & Sidebar Layout */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {featuredPost && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
              {/* Featured Article */}
              <article className="lg:col-span-8">
                <Link href={`/blog/${featuredPost.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl h-[30rem]">
                    <img
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="flex items-center gap-3 mb-4">
                        <span 
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{ backgroundColor: COLORS.accent }}
                        >
                          {featuredPost.category}
                        </span>
                        <span className="text-sm opacity-90">{formatDate(featuredPost.publishedAt)}</span>
                      </div>
                      <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-3">
                        {featuredPost.title}
                      </h2>
                      <p className="text-lg opacity-90 mb-4 line-clamp-2">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium">{featuredPost.author.name}</p>
                            <p className="text-sm opacity-75">{featuredPost.readTime} min read</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="space-y-6">
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: COLORS.primary }}>
                    Latest Stories
                  </h3>
                  
                  {regularPosts.slice(0, 3).map((post) => (
                    <article key={post.id} className="group">
                      <Link href={`/blog/${post.slug}`} className="flex gap-4 items-start">
                        <div className="flex-shrink-0">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-32 h-28 object-cover rounded-lg group-hover:shadow-lg transition-shadow"
                          />
                        </div>
                        <div className="flex-1 min-h-[7rem] flex flex-col">
                          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">{post.excerpt}</p>
                          <div className="flex items-center gap-2 mt-auto">
                            <span 
                              className="px-2 py-1 rounded text-xs font-medium text-white"
                              style={{ backgroundColor: COLORS.primary }}
                            >
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-500">{post.readTime} min read</span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}


                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      {/* More Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-['Playfair_Display'] text-3xl font-bold mb-8 text-center" style={{ color: COLORS.primary }}>
            More Stories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.slice(3).map((post, index) => (
              <div key={post.id}>
                <article className="group h-full">
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span 
                            className="px-3 py-1 rounded-full text-sm font-medium text-white"
                            style={{ backgroundColor: COLORS.primary }}
                          >
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-2">
                            <span>{post.author.name}</span>
                          </div>
                          <span>•</span>
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        
                        <h3 className="font-['Playfair_Display'] text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                            <BookOpen className="w-4 h-4" />
                            <span>Read Article</span>
                          </div>
                          
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: currentPage === page ? COLORS.primary : 'transparent'
                    }}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}


        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4" style={{ color: COLORS.primary }}>
            Ready for Your Sri Lankan Adventure?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Turn these travel stories into your own unforgettable experiences. Browse our curated tour packages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/tours"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-medium text-lg hover:shadow-lg transition-all"
              style={{ backgroundColor: COLORS.primary }}
            >
              Explore Tours
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/newsletter"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 rounded-full font-medium text-lg hover:shadow-lg transition-all"
              style={{ borderColor: COLORS.primary, color: COLORS.primary }}
            >
              Subscribe to Updates
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;