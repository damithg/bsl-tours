import React, { useState, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import { BreadcrumbItem } from '@/components/Breadcrumb';
import { 
  FileText, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock,
  ChevronRight,
  Eye,
  CheckCircle,
  ChevronLeft,
} from 'lucide-react';

const Brochures: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedBrochures, setSelectedBrochures] = useState<string[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const brochures = [
    {
      id: 'main-catalog',
      title: 'Sri Lanka Complete Tour Catalog 2025',
      description: 'Our comprehensive collection of all tour packages, with detailed itineraries, accommodation options, and pricing.',
      pageCount: 48,
      fileSize: '12.5 MB',
      coverImage: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_600,c_fill/v1634567890/brochures/main-catalog.jpg',
      featured: true
    },
    {
      id: 'wildlife-guide',
      title: 'Wildlife & National Parks Guide',
      description: 'Detailed information about Sri Lanka\'s national parks, wildlife viewing opportunities, and specialized safari tours.',
      pageCount: 24,
      fileSize: '8.2 MB',
      coverImage: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_600,c_fill/v1634567890/brochures/wildlife-guide.jpg'
    },
    {
      id: 'cultural-heritage',
      title: 'Cultural Heritage Experiences',
      description: 'Explore Sri Lanka\'s rich cultural heritage, archaeological sites, and immersive cultural experiences.',
      pageCount: 32,
      fileSize: '10.4 MB',
      coverImage: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_600,c_fill/v1634567890/brochures/cultural-heritage.jpg'
    },
    {
      id: 'beach-escapes',
      title: 'Coastal & Beach Escapes',
      description: 'A guide to Sri Lanka\'s stunning coastline, featuring beach resorts, water activities, and relaxing coastal tours.',
      pageCount: 20,
      fileSize: '7.8 MB',
      coverImage: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_600,c_fill/v1634567890/brochures/beach-escapes.jpg'
    },
    {
      id: 'luxury-collection',
      title: 'Luxury Collection 2025',
      description: 'Our premium tour packages featuring 5-star accommodations, exclusive experiences, and VIP services.',
      pageCount: 28,
      fileSize: '9.5 MB',
      coverImage: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_600,c_fill/v1634567890/brochures/luxury-collection.jpg'
    },
    {
      id: 'adventure-tours',
      title: 'Adventure & Active Tours',
      description: 'Hiking, trekking, water sports, and other adventure activities throughout Sri Lanka.',
      pageCount: 22,
      fileSize: '8.7 MB',
      coverImage: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_400,h_600,c_fill/v1634567890/brochures/adventure-tours.jpg'
    }
  ];
  
  const specializedGuides = [
    {
      id: 'honeymoon',
      title: 'Honeymoon & Romance Guide',
      description: 'Specially curated romantic experiences, private retreats, and honeymoon packages.',
      coverImage: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_300,h_200,c_fill/v1634567890/brochures/honeymoon-guide.jpg'
    },
    {
      id: 'ayurveda',
      title: 'Wellness & Ayurveda Experiences',
      description: 'Traditional and modern wellness treatments, retreats, and rejuvenation programs.',
      coverImage: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_300,h_200,c_fill/v1634567890/brochures/ayurveda-guide.jpg'
    },
    {
      id: 'family',
      title: 'Family-Friendly Sri Lanka',
      description: 'Tours and activities designed for families with children of all ages.',
      coverImage: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_300,h_200,c_fill/v1634567890/brochures/family-guide.jpg'
    },
    {
      id: 'culinary',
      title: 'Culinary Journeys',
      description: 'Food tours, cooking classes, and gastronomic experiences across the island.',
      coverImage: 'https://res.cloudinary.com/drsjp6bqz/image/upload/w_300,h_200,c_fill/v1634567890/brochures/culinary-guide.jpg'
    }
  ];
  
  const handleBrochureToggle = (brochureId: string) => {
    if (selectedBrochures.includes(brochureId)) {
      setSelectedBrochures(selectedBrochures.filter(id => id !== brochureId));
    } else {
      setSelectedBrochures([...selectedBrochures, brochureId]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would submit the form data to an API
    console.log({
      name,
      email,
      phone,
      selectedBrochures
    });
    
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
    }, 1000);
  };
  
  const handleViewBrochure = (brochureId: string) => {
    // In a real application, this would open the brochure in a new tab
    console.log(`Viewing brochure: ${brochureId}`);
  };
  
  const handleDownloadBrochure = (brochureId: string) => {
    // In a real application, this would download the brochure
    console.log(`Downloading brochure: ${brochureId}`);
  };

  // Define breadcrumbs
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Travel Resources", path: "/travel-resources" },
    { label: "Brochures" }
  ];
  
  // Refs for scrollable section
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Scroll function for mobile view
  const scrollHorizontally = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount 
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        title="Travel Brochures"
        description="Download our travel brochures to explore Sri Lanka's destinations, experiences, and tour packages in detail."
        backgroundImage="https://res.cloudinary.com/drsjp6bqz/image/upload/v1746207237/shutterstock_1070510330_ro5cyz.jpg"
        breadcrumbItems={breadcrumbItems}
        overlayColor="bg-[#0077B6]"
        overlayOpacity={20}
        imageTransform="scale-105"
      />
      
      {/* Main Content */}
      <section className="py-16 md:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Introduction */}
            <div className="mb-16">
              <p className="text-lg text-gray-700 mb-8">
                Our collection of detailed travel brochures provides in-depth information about our tour packages, destinations, and travel experiences in Sri Lanka. Download them to explore at your leisure or request physical copies for your travel planning.
              </p>
              
              <div className="bg-[#0077B6]/10 p-6 rounded-lg border-l-4 border-[#0077B6]">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Ways to Use Our Brochures</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <div className="bg-white p-2 rounded-full shadow-sm mr-3 mt-0.5">
                      <FileText className="w-5 h-5 text-[#0077B6]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Research & Inspiration</h4>
                      <p className="text-sm text-gray-600">Explore destinations and experiences to inspire your journey</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-2 rounded-full shadow-sm mr-3 mt-0.5">
                      <Calendar className="w-5 h-5 text-[#0077B6]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Trip Planning</h4>
                      <p className="text-sm text-gray-600">Use detailed itineraries to help plan your perfect Sri Lankan adventure</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-2 rounded-full shadow-sm mr-3 mt-0.5">
                      <Mail className="w-5 h-5 text-[#0077B6]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Share with Travel Partners</h4>
                      <p className="text-sm text-gray-600">Forward digital copies to friends or family joining your trip</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Featured Brochure */}
            <div className="mb-16">
              <h2 className="text-3xl font-semibold text-gray-800 mb-8 font-['Playfair_Display']">
                Featured Brochure
              </h2>
              
              {brochures.filter(brochure => brochure.featured).map(brochure => (
                <div 
                  key={brochure.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 lg:w-1/4">
                      <img 
                        src={brochure.coverImage} 
                        alt={brochure.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 lg:w-3/4 p-6 md:p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{brochure.title}</h3>
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mb-4">
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 mr-1" />
                              {brochure.pageCount} Pages
                            </div>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                <polyline points="7 3 7 8 15 8"></polyline>
                              </svg>
                              {brochure.fileSize}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Updated April 2025
                            </div>
                          </div>
                        </div>
                        <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                          New for 2025
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6">
                        {brochure.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                        <button 
                          onClick={() => handleViewBrochure(brochure.id)}
                          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-300"
                        >
                          <Eye className="w-5 h-5" />
                          View Online
                        </button>
                        <button 
                          onClick={() => handleDownloadBrochure(brochure.id)}
                          className="flex items-center gap-2 bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                        >
                          <Download className="w-5 h-5" />
                          Download Now
                        </button>
                        <label className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-300 cursor-pointer">
                          <input
                            type="checkbox"
                            className="mr-1"
                            checked={selectedBrochures.includes(brochure.id)}
                            onChange={() => handleBrochureToggle(brochure.id)}
                          />
                          Request Printed Copy
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* All Brochures - Scrollable on Mobile */}
            <div className="mb-16">
              <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display'] mb-8">
                Tour & Destination Brochures
              </h2>
              
              {/* Scrollable container for mobile with positioned arrow controls */}
              <div className="relative">
                {/* Left scroll arrow - positioned at left middle */}
                <button 
                  onClick={() => scrollHorizontally('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md -ml-3 transition md:hidden"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5 text-[#0077B6]" />
                </button>
                
                {/* Right scroll arrow - positioned at right middle */}
                <button 
                  onClick={() => scrollHorizontally('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md -mr-3 transition md:hidden"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5 text-[#0077B6]" />
                </button>
                
                {/* Scrollable container for mobile */}
                <div 
                  ref={scrollContainerRef}
                  className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 md:overflow-visible scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  onScroll={() => console.log('Scrolling')}
                >
                {brochures.filter(brochure => !brochure.featured).map(brochure => (
                  <div 
                    key={brochure.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col min-w-[280px] md:min-w-0"
                  >
                    <div className="relative">
                      <img 
                        src={brochure.coverImage} 
                        alt={brochure.title} 
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button 
                          onClick={() => handleViewBrochure(brochure.id)}
                          className="bg-white text-gray-800 font-medium py-2 px-4 rounded-md mx-2 hover:bg-gray-100 transition-colors duration-300"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDownloadBrochure(brochure.id)}
                          className="bg-[#0077B6] text-white font-medium py-2 px-4 rounded-md mx-2 hover:bg-[#0077B6]/90 transition-colors duration-300"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-5 flex-grow">
                      <h3 className="font-semibold text-gray-800 text-lg mb-2">{brochure.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 flex-grow">{brochure.description}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          {brochure.pageCount} Pages
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                            <polyline points="7 3 7 8 15 8"></polyline>
                          </svg>
                          {brochure.fileSize}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border-t border-gray-200">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedBrochures.includes(brochure.id)}
                          onChange={() => handleBrochureToggle(brochure.id)}
                        />
                        <span className="text-gray-700">Request Printed Copy</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mobile scrolling instructions - only visible on mobile */}
              <div className="mt-4 text-sm text-gray-500 md:hidden flex items-center justify-center">
                <span>Swipe left or right to see more brochures</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
            
            {/* Specialized Guides */}
            <div className="mb-16">
              <h2 className="text-3xl font-semibold text-gray-800 mb-8 font-['Playfair_Display']">
                Specialized Travel Guides
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specializedGuides.map((guide) => (
                  <div 
                    key={guide.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 flex"
                  >
                    <div className="w-1/3">
                      <img 
                        src={guide.coverImage} 
                        alt={guide.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-5">
                      <h3 className="font-semibold text-gray-800 text-lg mb-2">{guide.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{guide.description}</p>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewBrochure(guide.id)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-1.5 px-3 text-sm rounded-md transition-colors duration-300 flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                        <button 
                          onClick={() => handleDownloadBrochure(guide.id)}
                          className="bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-1.5 px-3 text-sm rounded-md transition-colors duration-300 flex items-center"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Request Printed Brochures Form */}
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-['Playfair_Display']">
                Request Printed Brochures
              </h2>
              
              {formSubmitted ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-green-800">Request Submitted</h3>
                      <div className="mt-2 text-green-700">
                        <p>Thank you for your request! We'll send your selected brochures to the address provided within 5-7 business days.</p>
                        <p className="mt-3">Meanwhile, you can access our digital brochures online for immediate reference.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-6">
                    Select the brochures you want to receive by mail. We'll send printed copies to your address anywhere in the world at no cost.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0077B6] focus:border-[#0077B6] transition"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0077B6] focus:border-[#0077B6] transition"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0077B6] focus:border-[#0077B6] transition"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Mailing Address *
                        </label>
                        <div className="flex items-center text-amber-600">
                          <MapPin className="w-5 h-5 mr-2" />
                          <span className="text-sm">You'll be asked for your mailing address after submission</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Brochures</h3>
                      
                      {selectedBrochures.length === 0 ? (
                        <div className="bg-amber-50 p-4 rounded-lg text-amber-800">
                          Please select at least one brochure to request a printed copy.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {selectedBrochures.map((brochureId) => {
                            const brochure = [...brochures, ...specializedGuides].find(b => b.id === brochureId);
                            return brochure && (
                              <div 
                                key={brochureId} 
                                className="flex items-start bg-white p-3 rounded-lg border border-gray-200"
                              >
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="font-medium text-gray-800">{brochure.title}</h4>
                                  {'pageCount' in brochure && (
                                    <p className="text-xs text-gray-500">{brochure.pageCount} pages</p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={selectedBrochures.length === 0 || !name || !email}
                        className={`w-full md:w-auto px-6 py-3 rounded-md font-medium text-white ${
                          selectedBrochures.length === 0 || !name || !email
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#0077B6] hover:bg-[#0077B6]/90'
                        } transition-colors duration-300`}
                      >
                        Request Printed Brochures
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Brochures;