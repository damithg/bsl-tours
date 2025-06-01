import { useState } from "react";
import { Link, useRoute } from "wouter";
import {
  Calendar,
  Clock,
  User,
  Share2,
  ArrowLeft,
  Tag,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  ChevronRight,
  ArrowRight,
  Check,
} from "lucide-react";
import { COLORS } from "@/utils/colors";

// Blog post interface
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
    bio: string;
  };
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
}

// Ad Component for monetization
const AffiliateAd = ({
  placement,
  size = "medium",
}: {
  placement: string;
  size?: "small" | "medium" | "large";
}) => {
  const adSizes = {
    small: "h-24",
    medium: "h-32",
    large: "h-48",
  };

  return (
    <div
      className={`w-full ${adSizes[size]} bg-gradient-to-r from-blue-50 to-teal-50 border border-gray-200 rounded-lg flex items-center justify-center my-8`}
    >
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">Advertisement</p>
        <p className="text-xs text-gray-400">
          {placement} - {size}
        </p>
      </div>
    </div>
  );
};

// Sample blog post data with enhanced content
const sampleBlogPost: BlogPost = {
  id: 1,
  title: "Fantastic Places to Go in the Beautiful East Coast",
  slug: "fantastic-places-to-go-in-the-beautiful-east-coast",
  excerpt:
    "Discover the pristine beaches, vibrant marine life, and cultural treasures that make Sri Lanka's east coast a must-visit destination.",
  content: `
    <p>Sri Lanka's east coast is a hidden gem that offers some of the most breathtaking coastal experiences in the Indian Ocean. From pristine beaches to vibrant marine ecosystems, this region provides an authentic glimpse into the island's natural beauty and cultural heritage.</p>

    <div class="my-8">
      <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743666036/destinations/arugam-bay-vibes.jpg" />
      <p class="text-sm text-gray-600 text-center mt-3 italic">Golden sunrise over Arugam Bay's pristine coastline</p>
    </div>

    <h2>Arugam Bay: The Surfer's Paradise</h2>
    <p>Arugam Bay stands as one of the world's premier surfing destinations. The consistent swells and perfect waves make it ideal for both beginners and experienced surfers. The bay's crescent-shaped coastline creates optimal wave conditions from April to October.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <div>
        <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743665999/destinations/arugam-bay-surfing.jpg" alt="Surfing at Arugam Bay" class="w-full h-48 object-cover rounded-lg shadow-md" />
        <p class="text-sm text-gray-600 text-center mt-2">World-class surfing waves</p>
      </div>
      <div>
        <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744094008/activities/arugam-bay-beach.jpg" alt="Arugam Bay Beach" class="w-full h-48 object-cover rounded-lg shadow-md" />
        <p class="text-sm text-gray-600 text-center mt-2">Crystal clear waters and golden sand</p>
      </div>
    </div>

    <p>Beyond surfing, Arugam Bay offers:</p>
    <ul>
      <li>Stunning sunset views from the main beach</li>
      <li>Fresh seafood at beachfront restaurants</li>
      <li>Wildlife watching at nearby Kumana National Park</li>
      <li>Cultural visits to ancient temples</li>
    </ul>

    <div class="my-8">
      <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743644784/destinations/arugam-bay-hero.jpg" alt="Sunset at Arugam Bay" class="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg" />
      <p class="text-sm text-gray-600 text-center mt-3 italic">Spectacular sunset views that make Arugam Bay unforgettable</p>
    </div>

    <h2>Trincomalee: Ancient Harbor City</h2>
    <p>Trincomalee boasts one of the world's finest natural harbors and a rich history spanning over 2,000 years. The city combines colonial architecture, ancient Hindu temples, and pristine beaches.</p>

    <div class="my-8">
      <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743638597/activities/trincomalee-temple.jpg" alt="Koneswaram Temple" class="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg" />
      <p class="text-sm text-gray-600 text-center mt-3 italic">The ancient Koneswaram Temple perched dramatically on Swami Rock</p>
    </div>

    <p>Must-visit attractions include:</p>
    <ul>
      <li>Koneswaram Temple perched on Swami Rock</li>
      <li>Nilaveli Beach with its crystal-clear waters</li>
      <li>Whale watching excursions (seasonal)</li>
      <li>Marble Beach for snorkeling</li>
    </ul>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      <div>
        <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743727734/destinations/nilaveli-snorkeling.jpg" alt="Nilaveli Beach" class="w-full h-40 object-cover rounded-lg shadow-md" />
        <p class="text-sm text-gray-600 text-center mt-2">Nilaveli's turquoise waters</p>
      </div>
      <div>
        <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743727955/features/nilaveli-whale-watching.jpg" alt="Whale watching" class="w-full h-40 object-cover rounded-lg shadow-md" />
        <p class="text-sm text-gray-600 text-center mt-2">Blue whale encounters</p>
      </div>
      <div>
        <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743773362/destinations/nilaveli-overview.jpg" alt="Marble Beach" class="w-full h-40 object-cover rounded-lg shadow-md" />
        <p class="text-sm text-gray-600 text-center mt-2">Marble Beach snorkeling</p>
      </div>
    </div>

    <h2>Batticaloa: The Land of Singing Fish</h2>
    <p>Batticaloa offers a unique cultural experience with its lagoons, bridges, and the mysterious phenomenon of "singing fish" that can be heard on quiet nights near the Kallady Bridge.</p>

    <div class="my-8">
      <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743664436/destinations/kalpitiya-lagoon.jpg" alt="Batticaloa Lagoon" class="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg" />
      <p class="text-sm text-gray-600 text-center mt-3 italic">The serene lagoons of Batticaloa at twilight</p>
    </div>

    <h2>Best Time to Visit</h2>
    <p>The east coast enjoys a different monsoon pattern than the west and south coasts. The ideal time to visit is from April to September when the weather is dry and perfect for beach activities.</p>

    <div class="bg-blue-50 p-6 rounded-xl my-8 border-l-4 border-blue-500">
      <h3 class="font-bold text-lg mb-3 text-blue-900">Pro Tip: Weather Patterns</h3>
      <p class="text-blue-800">Unlike the west coast, the east coast is at its best during the southwest monsoon period. Plan your visit between April and September for calm seas and sunny skies.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <div>
        <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743984780/tours/sandy-beach.jpg" alt="Perfect weather on east coast" class="w-full h-48 object-cover rounded-lg shadow-md" />
        <p class="text-sm text-gray-600 text-center mt-2">Perfect beach weather from April to September</p>
      </div>
      <div>
        <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743786028/tour/beach-holiday-srilanka.jpg" alt="Beach activities" class="w-full h-48 object-cover rounded-lg shadow-md" />
        <p class="text-sm text-gray-600 text-center mt-2">Ideal conditions for water sports and beach activities</p>
      </div>
    </div>

    <h2>Planning Your Visit</h2>
    <p>To make the most of your east coast adventure, consider staying 5-7 days to explore multiple destinations. Many visitors combine their east coast trip with visits to ancient cities like Polonnaruwa or wildlife parks like Yala.</p>

    <div class="my-8">
      <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744094008/activities/east-coast-itinerary.jpg" alt="East coast travel map" class="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg" />
      <p class="text-sm text-gray-600 text-center mt-3 italic">A suggested route for exploring Sri Lanka's magnificent east coast</p>
    </div>

    <div class="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-xl my-8">
      <h3 class="font-bold text-lg mb-3 text-teal-900">7-Day East Coast Itinerary</h3>
      <ul class="text-teal-800 space-y-2">
        <li><strong>Days 1-3:</strong> Trincomalee - Temples, beaches, and whale watching</li>
        <li><strong>Days 4-5:</strong> Arugam Bay - Surfing and sunset vibes</li>
        <li><strong>Days 6-7:</strong> Batticaloa - Cultural immersion and lagoon exploration</li>
      </ul>
    </div>
  `,
  featuredImage:
    "https://res.cloudinary.com/drsjp6bqz/image/upload/v1744002024/activities/unawatuna-bay.jpg",
  author: {
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Travel writer and Sri Lanka specialist with over 8 years of experience exploring the island's hidden gems.",
  },
  publishedAt: "2024-03-15",
  readTime: 8,
  category: "Destinations",
  tags: ["East Coast", "Beaches", "Travel Tips", "Arugam Bay", "Trincomalee"],
};

const BlogDetail = () => {
  const [match, params] = useRoute("/blog/:slug");
  const [shareMenuOpen, setShareMenuOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = sampleBlogPost.title;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setShareMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex text-gray-600 mb-6 pt-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  <Link href="/blog" className="text-sm font-medium hover:text-blue-600 transition-colors">
                    Travel Journal
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-400 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  <span className="text-sm font-medium text-gray-900">
                    {sampleBlogPost.category}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="px-4 py-2 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: COLORS.primary }}
              >
                {sampleBlogPost.category}
              </span>
              <span className="text-gray-500">
                {formatDate(sampleBlogPost.publishedAt)}
              </span>
            </div>

            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {sampleBlogPost.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {sampleBlogPost.excerpt}
            </p>

            {/* Author & Meta Info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {sampleBlogPost.author.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{sampleBlogPost.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={() => setShareMenuOpen(!shareMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>

                {shareMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="py-2">
                      <a
                        href={shareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <Facebook className="w-4 h-4 text-blue-600" />
                        Facebook
                      </a>
                      <a
                        href={shareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <Twitter className="w-4 h-4 text-blue-400" />
                        Twitter
                      </a>
                      <a
                        href={shareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-blue-700" />
                        LinkedIn
                      </a>
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors w-full text-left"
                      >
                        <Copy className="w-4 h-4 text-gray-600" />
                        Copy Link
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative mb-12">
            <img
              src={sampleBlogPost.featuredImage}
              alt={sampleBlogPost.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <div
                className="prose prose-lg max-w-none prose-headings:font-['Playfair_Display'] prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:mb-6 prose-p:leading-relaxed prose-ul:mb-6 prose-li:mb-2"
                dangerouslySetInnerHTML={{ __html: sampleBlogPost.content }}
              />

              {/* Tour Promotion - Mid Content */}
              <div className="my-12 p-8 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3
                      className="font-['Playfair_Display'] text-2xl font-bold mb-4"
                      style={{ color: COLORS.primary }}
                    >
                      Experience the East Coast with BSL Tours
                    </h3>
                    <p className="text-gray-700 mb-6">
                      Ready to explore these incredible destinations? Our
                      expert-crafted East Coast Discovery tour takes you to all
                      the places mentioned in this article, with luxury
                      accommodations and local guides.
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: COLORS.primary }}
                        ></div>
                        <span className="text-gray-700">
                          Private chauffeur and luxury vehicle
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: COLORS.primary }}
                        ></div>
                        <span className="text-gray-700">
                          Hand-picked boutique accommodations
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: COLORS.primary }}
                        ></div>
                        <span className="text-gray-700">
                          Expert local guides and authentic experiences
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/tours"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all"
                        style={{ backgroundColor: COLORS.primary }}
                      >
                        View East Coast Tours
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 rounded-lg font-medium hover:shadow-md transition-all"
                        style={{
                          borderColor: COLORS.primary,
                          color: COLORS.primary,
                        }}
                      >
                        Get Custom Quote
                      </Link>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="https://images.mrandmrssmith.com/images/698x522/3802504-amanwella-hotel-tangalle-sri-lanka.jpg"
                      alt="BSL Tours luxury vehicle"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md">
                      <p
                        className="text-sm font-semibold"
                        style={{ color: COLORS.primary }}
                      >
                        From $899
                      </p>
                      <p className="text-xs text-gray-600">7-day package</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ad Placement - After Tour Promotion */}
              <AffiliateAd placement="Mid Article" size="large" />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {sampleBlogPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                <h3 className="font-['Playfair_Display'] text-xl font-bold mb-4">
                  About the Author
                </h3>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {sampleBlogPost.author.name}
                  </h4>
                  <p className="text-gray-600">{sampleBlogPost.author.bio}</p>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Featured East Coast Tours */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3
                    className="font-['Playfair_Display'] text-xl font-bold mb-4"
                    style={{ color: COLORS.primary }}
                  >
                    Related Tours
                  </h3>

                  <div className="space-y-4">
                    <div className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <img
                        src="https://blog.bestsrilankatours.com/wp-content/uploads/2020/08/Beach-Holidays.jpg"
                        alt="East Coast Discovery Tour"
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          East Coast Discovery
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          7 days exploring Trincomalee, Arugam Bay & Batticaloa
                        </p>
                        <div className="flex items-center justify-between">
                          <span
                            className="font-bold"
                            style={{ color: COLORS.primary }}
                          >
                            From $899
                          </span>
                          <Link
                            href="/tours"
                            className="text-sm font-medium hover:underline"
                            style={{ color: COLORS.primary }}
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <img
                        src="https://blog.bestsrilankatours.com/wp-content/uploads/2018/04/highlights-1.jpg"
                        alt="Cultural & Coast Combo"
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Cultural & Coast Combo
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Ancient cities + pristine east coast beaches
                        </p>
                        <div className="flex items-center justify-between">
                          <span
                            className="font-bold"
                            style={{ color: COLORS.primary }}
                          >
                            From $1,299
                          </span>
                          <Link
                            href="/tours"
                            className="text-sm font-medium hover:underline"
                            style={{ color: COLORS.primary }}
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/tours"
                    className="inline-flex items-center gap-2 px-4 py-3 mt-4 w-full justify-center rounded-lg text-white font-medium hover:shadow-lg transition-all"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    View All East Coast Tours
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Free Travel Guide CTA */}
                <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 rounded-xl border border-blue-200">
                  <h3
                    className="font-['Playfair_Display'] text-xl font-bold mb-3"
                    style={{ color: COLORS.primary }}
                  >
                    Free Sri Lanka Travel Guide
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Get our comprehensive 47-page travel guide with insider
                    tips, hidden gems, and detailed itineraries.
                  </p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Check
                        className="w-4 h-4"
                        style={{ color: COLORS.primary }}
                      />
                      <span className="text-sm text-gray-700">
                        Best time to visit each region
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check
                        className="w-4 h-4"
                        style={{ color: COLORS.primary }}
                      />
                      <span className="text-sm text-gray-700">
                        Budget planning worksheets
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check
                        className="w-4 h-4"
                        style={{ color: COLORS.primary }}
                      />
                      <span className="text-sm text-gray-700">
                        Local restaurant recommendations
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/brochures"
                    className="inline-flex items-center gap-2 px-4 py-3 w-full justify-center rounded-lg text-white font-medium hover:shadow-lg transition-all"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    Download Free Guide
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Why Choose BSL Tours */}
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h3
                    className="font-['Playfair_Display'] text-xl font-bold mb-4"
                    style={{ color: COLORS.primary }}
                  >
                    Why Choose BSL Tours?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: COLORS.primary }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Local Expertise
                        </p>
                        <p className="text-sm text-gray-600">
                          8+ years of Sri Lanka travel experience
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: COLORS.primary }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Personalized Service
                        </p>
                        <p className="text-sm text-gray-600">
                          Tailored itineraries for every traveler
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: COLORS.primary }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          24/7 Support
                        </p>
                        <p className="text-sm text-gray-600">
                          Local assistance throughout your journey
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-4 py-2 mt-4 border-2 rounded-lg font-medium hover:shadow-md transition-all w-full justify-center"
                    style={{
                      borderColor: COLORS.primary,
                      color: COLORS.primary,
                    }}
                  >
                    Learn More About Us
                  </Link>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200">
                  <h3
                    className="font-['Playfair_Display'] text-xl font-bold mb-3"
                    style={{ color: COLORS.primary }}
                  >
                    Weekly Travel Insights
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Join 15,000+ travelers getting exclusive tips, hidden gems,
                    and special offers.
                  </p>
                  <Link
                    href="/newsletter"
                    className="inline-flex items-center gap-2 px-4 py-3 w-full justify-center rounded-lg font-medium hover:shadow-md transition-all border-2"
                    style={{
                      borderColor: COLORS.primary,
                      color: COLORS.primary,
                    }}
                  >
                    Subscribe Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Ad Placement - Sidebar Bottom */}
                <AffiliateAd placement="Sidebar Bottom" size="medium" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/blog-alternative"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 rounded-lg hover:shadow-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Travel Journal
          </Link>
        </div>
      </section>
    </main>
  );
};

export default BlogDetail;
