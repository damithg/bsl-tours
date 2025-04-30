import React from 'react';
import StandardPageTemplate from '@/components/StandardPageTemplate';
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
      id: 'checklists',
      title: 'Travel Checklists',
      icon: <FileText className="w-6 h-6 text-[#0077B6]" />,
      description: 'Comprehensive checklists to help you prepare for your Sri Lankan adventure and ensure you don\'t forget any essentials.',
      resources: [
        {
          title: 'Pre-Departure Checklist',
          description: 'Everything you need to do before leaving for Sri Lanka, from documents to packing essentials.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/resources/pre-departure.jpg',
          link: '/pre-departure-info'
        },
        {
          title: 'Beach Holiday Packing List',
          description: 'Essential items for enjoying Sri Lanka\'s stunning beaches and coastal activities.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/resources/beach-packing.jpg',
          link: '/resources/beach-packing-list'
        },
        {
          title: 'Wildlife Safari Essentials',
          description: 'What to bring for optimal wildlife viewing experiences in Sri Lanka\'s national parks.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/resources/safari-essentials.jpg',
          link: '/resources/safari-essentials'
        },
        {
          title: 'Health & Medication Checklist',
          description: 'Recommended medications, vaccinations, and health preparations for your trip.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/resources/health-checklist.jpg',
          link: '/resources/health-checklist'
        }
      ]
    },
    {
      id: 'cultural',
      title: 'Cultural Insights',
      icon: <PenTool className="w-6 h-6 text-[#0077B6]" />,
      description: 'Understanding Sri Lankan culture, etiquette, and traditions to enrich your travel experience and foster meaningful connections.',
      resources: [
        {
          title: 'Sri Lankan Temple Etiquette',
          description: 'Essential guidelines for visiting Buddhist and Hindu temples with respect and cultural awareness.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/resources/temple-etiquette.jpg',
          link: '/resources/temple-etiquette'
        },
        {
          title: 'Understanding Sri Lankan Festivals',
          description: 'A guide to major celebrations and festivals you might encounter during your visit.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/resources/festivals.jpg',
          link: '/resources/festivals'
        },
        {
          title: 'Local Customs & Social Etiquette',
          description: 'Navigating social interactions, greetings, and cultural norms in Sri Lanka.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/resources/customs.jpg',
          link: '/resources/customs-etiquette'
        },
        {
          title: 'An Introduction to Ayurveda',
          description: 'Understanding Sri Lanka\'s ancient healing tradition and wellness practices.',
          imageSrc: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_300,c_fill/v1634567890/resources/ayurveda.jpg',
          link: '/resources/ayurveda-guide'
        }
      ]
    }
  ];
  
  // Downloadable Resources
  const downloadableResources = [
    {
      title: 'Sri Lanka Travel Phrasebook',
      description: 'Essential Sinhala and Tamil phrases with pronunciation guides for travelers.',
      icon: <Languages className="w-8 h-8 text-[#0077B6]" />,
      link: '/downloads/sri-lanka-phrasebook.pdf'
    },
    {
      title: 'Wildlife Spotting Guide',
      description: 'Identification guide for common wildlife species in Sri Lanka\'s national parks.',
      icon: <Camera className="w-8 h-8 text-[#0077B6]" />,
      link: '/downloads/wildlife-guide.pdf'
    },
    {
      title: 'Seasonal Festival Calendar',
      description: 'Year-round calendar of Sri Lankan festivals and cultural events.',
      icon: <Calendar className="w-8 h-8 text-[#0077B6]" />,
      link: '/downloads/festival-calendar.pdf'
    },
    {
      title: 'Colombo City Map',
      description: 'Detailed map of Colombo with key attractions, neighborhoods, and transport info.',
      icon: <Map className="w-8 h-8 text-[#0077B6]" />,
      link: '/downloads/colombo-map.pdf'
    },
    {
      title: 'Sri Lankan Cuisine Guide',
      description: 'Introduction to local dishes, spices, and culinary traditions with recommended dishes to try.',
      icon: <Utensils className="w-8 h-8 text-[#0077B6]" />,
      link: '/downloads/cuisine-guide.pdf'
    }
  ];
  
  // External Travel Resources
  const externalResources = [
    {
      title: 'Sri Lanka Tourism Bureau',
      description: 'Official tourism information from the Sri Lankan government.',
      link: 'https://www.srilanka.travel/'
    },
    {
      title: 'World Health Organization - Sri Lanka',
      description: 'Health information and travel advisories.',
      link: 'https://www.who.int/srilanka'
    },
    {
      title: 'Department of Immigration',
      description: 'Official visa and immigration information for Sri Lanka.',
      link: 'https://www.immigration.gov.lk/'
    },
    {
      title: 'Sri Lanka Railways',
      description: 'Train schedules and ticket booking information.',
      link: 'https://railway.gov.lk/'
    }
  ];

  return (
    <StandardPageTemplate
      title="Travel Resources"
      description="Comprehensive guides, checklists, and information to help you plan and enjoy your Sri Lankan adventure."
      breadcrumbs={[]}
    >
      {/* Resource Categories */}
      {resourceCategories.map((category) => (
        <div key={category.id} className="mb-16">
          <div className="flex items-center mb-6">
            <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
              {category.icon}
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
                {category.title}
              </h2>
              <p className="text-gray-600 mt-1">{category.description}</p>
            </div>
          </div>
          
          {/* Resource Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.resources.map((resource, index) => (
              <div 
                key={`${category.id}-resource-${index}`} 
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                <img 
                  src={resource.imageSrc} 
                  alt={resource.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {resource.description}
                  </p>
                  <Link 
                    href={resource.link} 
                    className="text-[#0077B6] font-medium hover:underline flex items-center mt-auto"
                  >
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Downloadable Resources */}
      <div className="mb-16">
        <div className="flex items-center mb-6">
          <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
            <Download className="w-6 h-6 text-[#0077B6]" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
              Downloadable Resources
            </h2>
            <p className="text-gray-600 mt-1">
              Free travel guides and useful documents to help you prepare for your journey.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {downloadableResources.map((resource, index) => (
            <div 
              key={`download-${index}`}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300 flex items-start"
            >
              <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4 flex-shrink-0">
                {resource.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {resource.description}
                </p>
                <a 
                  href={resource.link}
                  className="inline-flex items-center gap-1.5 bg-[#0077B6]/10 hover:bg-[#0077B6]/20 text-[#0077B6] font-medium py-2 px-4 rounded-md transition-colors duration-300"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* External Resources */}
      <div className="mb-16">
        <div className="flex items-center mb-6">
          <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
            <ExternalLink className="w-6 h-6 text-[#0077B6]" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
              Useful External Resources
            </h2>
            <p className="text-gray-600 mt-1">
              Official websites and reliable third-party resources for additional information.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {externalResources.map((resource, index) => (
            <div 
              key={`external-${index}`}
              className={`p-5 flex justify-between items-center ${
                index !== externalResources.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <div>
                <h3 className="font-semibold text-gray-800">
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {resource.description}
                </p>
              </div>
              <a 
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#0077B6] font-medium py-2 px-3 rounded-md transition-colors duration-300 hover:bg-[#0077B6]/10"
              >
                Visit
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
      
      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-[#0077B6]/10 to-[#004E64]/5 rounded-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 font-['Playfair_Display']">
            Stay Updated with Travel Tips & Resources
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest travel guides, seasonal recommendations, and exclusive offers for your Sri Lankan adventure.
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-gray-500 text-xs mt-3 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </StandardPageTemplate>
  );
};

export default TravelResources;