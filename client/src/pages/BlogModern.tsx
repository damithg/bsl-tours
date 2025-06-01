import { useState } from 'react';
import { Link } from 'wouter';
import { Calendar, User, Clock, Tag, ArrowRight, Search, Filter } from 'lucide-react';
import { COLORS } from '@/utils/colors';

// Sample blog data structure
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

// Sample data - in real implementation, this would come from your API
const sampleBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Fantastic Places to Go in the Beautiful East Coast",
    slug: "fantastic-places-to-go-in-the-beautiful-east-coast",
    excerpt: "Discover the pristine beaches, vibrant marine life, and cultural treasures that make Sri Lanka's east coast a must-visit destination for any traveler.",
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
    excerpt: "From spicy curries to sweet treats, explore the rich flavors and culinary traditions that make Sri Lankan food truly exceptional.",
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
    excerpt: "Professional tips for capturing stunning wildlife photos in one of Sri Lanka's premier national parks.",
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
  }
];

const BlogModern = () => {
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
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-blue-600 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold mb-6">
            Travel Insights & Stories
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
            Discover hidden gems, local secrets, and expert travel advice for your Sri Lankan adventure
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                }`}
                style={selectedCategory === category ? { backgroundColor: COLORS.primary } : {}}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {filteredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-center mb-12" style={{ color: COLORS.primary }}>
              Featured Article
            </h2>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-full">
                  <img
                    src={filteredPosts[0].featuredImage}
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      {filteredPosts[0].category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={filteredPosts[0].author.avatar}
                        alt={filteredPosts[0].author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{filteredPosts[0].author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(filteredPosts[0].publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{filteredPosts[0].readTime} min read</span>
                    </div>
                  </div>
                  
                  <h3 className="font-['Playfair_Display'] text-3xl font-bold mb-4 text-gray-900">
                    {filteredPosts[0].title}
                  </h3>
                  
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {filteredPosts[0].excerpt}
                  </p>
                  
                  <Link 
                    href={`/blog/${filteredPosts[0].slug}`}
                    className="inline-flex items-center gap-2 font-medium text-lg hover:gap-3 transition-all"
                    style={{ color: COLORS.primary }}
                  >
                    Read Full Article
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-center mb-12" style={{ color: COLORS.primary }}>
            Latest Articles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
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
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>
                  
                  <h3 className="font-['Playfair_Display'] text-xl font-bold mb-3 text-gray-900 line-clamp-2">
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
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    
                    <span className="text-sm text-gray-400">
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16" style={{ backgroundColor: COLORS.primary }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-4">
            Never Miss an Adventure
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Subscribe to our newsletter for the latest travel insights, hidden gems, and exclusive offers.
          </p>
          <Link 
            href="/newsletter"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full font-medium text-lg hover:shadow-lg transition-all"
          >
            Subscribe Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default BlogModern;