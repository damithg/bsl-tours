import { useState } from 'react';
import { Link } from 'wouter';
import { Calendar, User, Clock, Tag, ArrowRight, Search, Share2, BookOpen } from 'lucide-react';
import { COLORS } from '@/utils/colors';

// Using the same blog data structure
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
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

// Sample data for demonstration
const sampleBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Fantastic Places to Go in the Beautiful East Coast",
    slug: "fantastic-places-to-go-in-the-beautiful-east-coast",
    excerpt: "Discover the pristine beaches, vibrant marine life, and cultural treasures that make Sri Lanka's east coast a must-visit destination for any traveler seeking authentic experiences.",
    content: "",
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
    excerpt: "From spicy curries to sweet treats, explore the rich flavors and culinary traditions that make Sri Lankan food truly exceptional and unforgettable.",
    content: "",
    featuredImage: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1744094008/activities/sri-lankan-food.jpg",
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
    excerpt: "Professional tips for capturing stunning wildlife photos in one of Sri Lanka's premier national parks, from leopards to elephants.",
    content: "",
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
    excerpt: "Journey through centuries of spiritual heritage as we explore the most significant temples and sacred sites across the island.",
    content: "",
    featuredImage: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1744094008/activities/temple-of-tooth.jpg",
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
    excerpt: "Experience the misty mountains and rolling tea plantations that make Sri Lanka's hill country a paradise for nature lovers.",
    content: "",
    featuredImage: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1744094008/activities/tea-plantations.jpg",
    author: {
      name: "Lisa Thompson",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
    },
    publishedAt: "2024-03-05",
    readTime: 7,
    category: "Destinations",
    tags: ["Tea", "Mountains", "Nuwara Eliya", "Nature"]
  }
];

const BlogAlternative = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Destinations', 'Culture', 'Photography', 'Travel Tips'];

  const filteredPosts = sampleBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      {/* Minimal Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
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
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': COLORS.primary } as React.CSSProperties}
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

      {/* Magazine-style Layout */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {featuredPost && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
              {/* Featured Article - Large */}
              <article className="lg:col-span-8">
                <div className="relative group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
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
                          <img
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            className="w-10 h-10 rounded-full border-2 border-white"
                          />
                          <div>
                            <p className="font-medium">{featuredPost.author.name}</p>
                            <p className="text-sm opacity-75">{featuredPost.readTime} min read</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Sidebar with smaller articles */}
              <aside className="lg:col-span-4">
                <div className="space-y-6">
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: COLORS.primary }}>
                    Recent Stories
                  </h3>
                  
                  {regularPosts.slice(0, 3).map((post, index) => (
                    <article key={post.id} className="group cursor-pointer">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-20 h-20 object-cover rounded-lg group-hover:shadow-lg transition-shadow"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span 
                              className="px-2 py-1 rounded text-xs font-medium text-white"
                              style={{ backgroundColor: COLORS.primary }}
                            >
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-500">{formatDate(post.publishedAt)}</span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </aside>
            </div>
          )}

          {/* Grid Layout for Remaining Articles */}
          {regularPosts.length > 3 && (
            <div>
              <h3 className="font-['Playfair_Display'] text-3xl font-bold mb-8 text-center" style={{ color: COLORS.primary }}>
                More Stories
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.slice(3).map((post) => (
                  <article key={post.id} className="group cursor-pointer">
                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
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
                      
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={post.author.avatar}
                              alt={post.author.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span>{post.author.name}</span>
                          </div>
                          <span>•</span>
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        
                        <h3 className="font-['Playfair_Display'] text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-2 font-medium hover:gap-3 transition-all"
                            style={{ color: COLORS.primary }}
                          >
                            <BookOpen className="w-4 h-4" />
                            Read Article
                          </Link>
                          
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
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

export default BlogAlternative;