import React from 'react';
import HeroSection from '@/components/HeroSection';
import { BreadcrumbItem } from '@/components/Breadcrumb';
import ScrollableResourcePanel from '@/components/ScrollableResourcePanel';
import { 
  BookOpen, 
  FileText, 
  Map, 
  Calendar, 
  Camera, 
  Languages, 
  Utensils, 
  PenTool, 
  Download,
  ExternalLink
} from 'lucide-react';
import { Link } from 'wouter';

const TravelResources: React.FC = () => {
  // For a top-level page like this, we need to show the current page in breadcrumbs
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Travel Resources" }
  ];

  // Resource Categories
  const resourceCategories = [
    {
      id: 'guides',
      title: 'Destination Guides',
      icon: <BookOpen className="w-6 h-6 text-[#0077B6]" />,
      description: 'In-depth guides to Sri Lanka\'s most popular destinations with insider tips, must-see attractions, and local recommendations.',
      resources: [
        {
          title: 'Ultimate Guide to Sigiriya',
          description: 'Explore the ancient rock fortress, its history, best times to visit, and lesser-known spots.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/destinations/sigiriya.jpg',
          link: '/resources/sigiriya-guide'
        },
        {
          title: 'Exploring Colombo: A 2-Day Itinerary',
          description: 'Make the most of your time in Sri Lanka\'s vibrant capital with this curated city guide.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/destinations/colombo.jpg',
          link: '/resources/colombo-guide'
        },
        {
          title: 'Galle Fort: History & Highlights',
          description: 'Discover the colonial charm and cultural richness of this UNESCO World Heritage site.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/destinations/galle.jpg',
          link: '/resources/galle-guide'
        },
        {
          title: 'Sri Lanka\'s Tea Country: Nuwara Eliya & Ella',
          description: 'Journey through misty mountains, tea plantations, and scenic train rides in Sri Lanka\'s highlands.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/destinations/tea-country.jpg',
          link: '/resources/tea-country-guide'
        }
      ]
    },
    {
      id: 'practical',
      title: 'Practical Information',
      icon: <FileText className="w-6 h-6 text-[#0077B6]" />,
      description: 'Essential travel information to help you plan and prepare for your Sri Lankan journey.',
      resources: [
        {
          title: 'Sri Lanka Visa Guide',
          description: 'Everything you need to know about visa requirements, application process, and fees.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/practical/visa.jpg',
          link: '/pre-departure-info'
        },
        {
          title: 'Currency & Money Tips',
          description: 'Information about the Sri Lankan Rupee, currency exchange, ATMs, and payment methods.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/practical/currency.jpg',
          link: '/pre-departure-info'
        },
        {
          title: 'Health & Safety',
          description: 'Recommended vaccinations, health precautions, and safety tips for traveling in Sri Lanka.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/practical/health.jpg',
          link: '/pre-departure-info'
        },
        {
          title: 'Packing Checklist',
          description: 'A comprehensive packing list tailored for Sri Lanka\'s climate and activities.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/practical/packing.jpg',
          link: '/pre-departure-info'
        }
      ]
    },
    {
      id: 'maps',
      title: 'Maps & Navigation',
      icon: <Map className="w-6 h-6 text-[#0077B6]" />,
      description: 'Detailed maps and navigation resources to help you explore Sri Lanka with confidence.',
      resources: [
        {
          title: 'Interactive Sri Lanka Map',
          description: 'Explore destinations, attractions, and plan your route with our interactive map.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/maps/interactive.jpg',
          link: '/interactive-map'
        },
        {
          title: 'Cultural Triangle Map',
          description: 'Detailed map of Sri Lanka\'s Cultural Triangle with key archaeological sites and attractions.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/maps/cultural-triangle.jpg',
          link: '/resources/cultural-triangle-map'
        },
        {
          title: 'National Parks Guide Map',
          description: 'Maps and information for Sri Lanka\'s major national parks and wildlife sanctuaries.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/maps/national-parks.jpg',
          link: '/resources/national-parks-map'
        },
        {
          title: 'Transportation Routes Map',
          description: 'Train, bus, and major road networks across Sri Lanka for planning your transportation.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/maps/transportation.jpg',
          link: '/resources/transportation-map'
        }
      ]
    },
    {
      id: 'seasonal',
      title: 'Seasonal Information',
      icon: <Calendar className="w-6 h-6 text-[#0077B6]" />,
      description: 'Season-specific guidance to help you plan your visit during different times of the year.',
      resources: [
        {
          title: 'Best Time to Visit Sri Lanka',
          description: 'Detailed breakdown of climate patterns, festivals, and regional variations throughout the year.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/seasonal/best-time.jpg',
          link: '/resources/best-time-to-visit'
        },
        {
          title: 'Monsoon Season Travel Guide',
          description: 'Tips for traveling during monsoon seasons, including which regions to visit and what to expect.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/seasonal/monsoon.jpg',
          link: '/resources/monsoon-travel'
        },
        {
          title: 'Festival Calendar',
          description: 'Annual calendar of Sri Lankan festivals, celebrations, and cultural events.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/seasonal/festivals.jpg',
          link: '/resources/festival-calendar'
        },
        {
          title: 'Wildlife Spotting Seasons',
          description: 'Best times to visit national parks for wildlife viewing, including migration patterns.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/seasonal/wildlife.jpg',
          link: '/resources/wildlife-seasons'
        }
      ]
    },
    {
      id: 'photography',
      title: 'Photography Tips',
      icon: <Camera className="w-6 h-6 text-[#0077B6]" />,
      description: 'Capture the beauty of Sri Lanka with expert photography tips, location guides, and gear recommendations.',
      resources: [
        {
          title: 'Sri Lanka Photography Guide',
          description: 'Essential tips for capturing stunning photos in Sri Lanka\'s diverse landscapes.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/photography/general.jpg',
          link: '/resources/photography-guide'
        },
        {
          title: 'Best Sunset & Sunrise Locations',
          description: 'Top spots across Sri Lanka for capturing magical golden hour moments.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/photography/sunset.jpg',
          link: '/resources/sunset-locations'
        },
        {
          title: 'Wildlife Photography Tips',
          description: 'Specialized advice for photographing Sri Lanka\'s diverse wildlife in national parks.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/photography/wildlife.jpg',
          link: '/resources/wildlife-photography'
        },
        {
          title: 'Cultural Photography Etiquette',
          description: 'Guidelines for respectfully photographing people, temples, and cultural sites.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/photography/cultural.jpg',
          link: '/resources/photography-etiquette'
        }
      ]
    },
    {
      id: 'language',
      title: 'Language Resources',
      icon: <Languages className="w-6 h-6 text-[#0077B6]" />,
      description: 'Learn essential Sinhala and Tamil phrases to enhance your travel experience and connect with locals.',
      resources: [
        {
          title: 'Essential Sinhala Phrases',
          description: 'Basic greetings, thank you, numbers, and everyday phrases with pronunciation guide.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/language/sinhala.jpg',
          link: '/resources/sinhala-phrases'
        },
        {
          title: 'Tamil Basics for Travelers',
          description: 'Helpful Tamil phrases for traveling in the northern and eastern regions of Sri Lanka.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/language/tamil.jpg',
          link: '/resources/tamil-phrases'
        },
        {
          title: 'Food & Dining Dictionary',
          description: 'Comprehensive list of Sri Lankan dishes, ingredients, and menu terms.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/language/food.jpg',
          link: '/resources/food-dictionary'
        },
        {
          title: 'Audio Pronunciation Guide',
          description: 'Listen to correct pronunciations of common Sinhala and Tamil words and phrases.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/language/pronunciation.jpg',
          link: '/resources/pronunciation-guide'
        }
      ]
    },
    {
      id: 'food',
      title: 'Food & Culinary Guides',
      icon: <Utensils className="w-6 h-6 text-[#0077B6]" />,
      description: 'Discover Sri Lankan cuisine with our comprehensive food guides, regional specialties, and culinary experiences.',
      resources: [
        {
          title: 'Sri Lankan Cuisine Guide',
          description: 'Introduction to Sri Lankan food, key ingredients, and traditional cooking methods.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/food/cuisine.jpg',
          link: '/resources/cuisine-guide'
        },
        {
          title: 'Regional Food Specialties',
          description: 'Discover unique dishes from different regions of Sri Lanka.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/food/regional.jpg',
          link: '/resources/regional-food'
        },
        {
          title: 'Street Food Guide',
          description: 'Must-try street foods, where to find them, and how to eat like a local.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/food/street.jpg',
          link: '/resources/street-food'
        },
        {
          title: 'Ceylon Tea Experience',
          description: 'All about Sri Lankan tea, tea estates, and how to properly taste and appreciate Ceylon tea.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/food/tea.jpg',
          link: '/resources/ceylon-tea'
        }
      ]
    },
    {
      id: 'cultural',
      title: 'Cultural Insights',
      icon: <PenTool className="w-6 h-6 text-[#0077B6]" />,
      description: 'Deepen your understanding of Sri Lankan culture, traditions, history, and etiquette.',
      resources: [
        {
          title: 'Sri Lankan Customs & Etiquette',
          description: 'Essential cultural norms, temple etiquette, and social customs for respectful travel.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/cultural/etiquette.jpg',
          link: '/resources/customs-etiquette'
        },
        {
          title: 'Religious Traditions',
          description: 'Guide to Buddhism, Hinduism, Islam, and Christianity in Sri Lanka and their cultural significance.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/cultural/religion.jpg',
          link: '/resources/religious-traditions'
        },
        {
          title: 'Sri Lankan Art & Crafts',
          description: 'Traditional artforms, handicrafts, and where to see and purchase authentic souvenirs.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/cultural/crafts.jpg',
          link: '/resources/art-crafts'
        },
        {
          title: 'Brief History of Sri Lanka',
          description: 'Concise historical overview from ancient kingdoms to modern Sri Lanka.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/cultural/history.jpg',
          link: '/resources/history'
        }
      ]
    },
    {
      id: 'downloads',
      title: 'Downloadable Resources',
      icon: <Download className="w-6 h-6 text-[#0077B6]" />,
      description: 'Practical resources to download and keep with you during your travels in Sri Lanka.',
      resources: [
        {
          title: 'Sri Lanka Travel Checklist',
          description: 'Comprehensive pre-departure checklist to ensure you\'re fully prepared.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/downloads/checklist.jpg',
          link: '/resources/downloads/travel-checklist.pdf'
        },
        {
          title: 'Offline City Maps',
          description: 'Downloadable PDF maps of major cities and destinations for offline use.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/downloads/maps.jpg',
          link: '/resources/downloads/offline-maps.zip'
        },
        {
          title: 'Emergency Contact Card',
          description: 'Printable card with essential emergency contacts and phrases.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/downloads/emergency.jpg',
          link: '/resources/downloads/emergency-card.pdf'
        },
        {
          title: 'Phrasebook PDF',
          description: 'Pocket-sized language guide with essential Sinhala and Tamil phrases.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/downloads/phrasebook.jpg',
          link: '/resources/downloads/phrasebook.pdf'
        }
      ]
    }
  ];

  return (
    <main>
      {/* Hero Section using our standardized HeroSection component */}
      <HeroSection
        title="Travel Resources"
        description="Comprehensive guides, tips, and tools to help you plan and enjoy your Sri Lankan adventure."
        backgroundImage="https://res.cloudinary.com/drsjp6bqz/image/upload/v1746551342/guide-books-and-map_zcmwtl.jpg"
        breadcrumbItems={breadcrumbItems}
        customOverlay="bg-gradient-to-r from-[#0077B6]/80 to-[#004E64]/70"
        imageTransform="scale-105"
      />
      
      {/* Main Content */}
      <section className="py-16 md:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Resource Categories Grid */}
            {resourceCategories.map((category) => (
              <div key={category.id} className="mb-20" id={category.id}>
                <div className="flex items-center mb-6">
                  <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
                    {category.icon}
                  </div>
                  <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
                    {category.title}
                  </h2>
                </div>
                
                <p className="text-gray-600 mb-8 max-w-4xl font-['Raleway']">
                  {category.description}
                </p>
                
                {/* Mobile View: Horizontal Scrollable Panel */}
                <div className="block md:hidden">
                  <ScrollableResourcePanel 
                    resources={category.resources}
                    categoryTitle=""
                  />
                </div>
                
                {/* Desktop View: Grid Layout */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.resources.map((resource, index) => (
                    <div 
                      key={index}
                      className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={resource.imageSrc} 
                          alt={resource.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex flex-col justify-between gap-4 h-52">
                        <div>
                          <h3 className="font-semibold text-gray-800 font-['Playfair_Display']">
                            {resource.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-2 font-['Raleway']">
                            {resource.description}
                          </p>
                        </div>
                        <a 
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[#0077B6] font-medium py-2 px-3 rounded-md transition-colors duration-300 hover:bg-[#0077B6]/10 font-['Raleway']"
                        >
                          Visit
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Newsletter Subscription */}
            <div className="bg-[#F6F8FC] py-12 px-6 rounded-xl text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-['Playfair_Display']">
                Stay Updated with Travel Tips & Resources
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-['Raleway']">
                Subscribe to our newsletter to receive the latest travel guides, seasonal recommendations, and exclusive offers for your Sri Lankan adventure.
              </p>
              
              <div className="max-w-md mx-auto mt-6">
                <form className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent font-['Raleway']"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 whitespace-nowrap font-['Raleway']"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-gray-500 text-xs mt-3 text-center font-['Raleway']">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TravelResources;