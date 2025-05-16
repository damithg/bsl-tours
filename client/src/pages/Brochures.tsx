import React, { useState, useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import { BreadcrumbItem } from '@/components/Breadcrumb';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm, createContactFormData, FormType } from '@/utils/contactFormService';
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
  
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedBrochures.length === 0 || !name || !email) {
      toast({
        title: "Missing Information",
        description: "Please provide your name, email, and select at least one brochure.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format the selected brochures for submission
      const brochuresList = brochures.filter(brochure => 
        selectedBrochures.includes(brochure.id)
      ).map(brochure => brochure.title).join(", ");
      
      // Prepare the form data using our shared service
      const formData = createContactFormData(
        FormType.BROCHURE_REQUEST,
        name,
        email,
        {
          phone: phone || '',
          requestedBrochures: brochuresList,
          requestType: 'printed',
        }
      );
      
      // Submit using the shared service
      await submitContactForm(formData);
      
      setFormSubmitted(true);
      toast({
        title: "Request Submitted",
        description: "Your brochure request has been submitted successfully. Thank you!",
        variant: "default"
      });
    } catch (error) {
      console.error("Error submitting brochure request:", error);
      toast({
        title: "Request Failed",
        description: error instanceof Error 
          ? error.message 
          : "Failed to submit your request. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
  
  // Refs for scrollable sections
  const brochuresScrollRef = useRef<HTMLDivElement>(null);
  const guidesScrollRef = useRef<HTMLDivElement>(null);
  
  // Scroll function for mobile view
  const scrollHorizontally = (direction: 'left' | 'right', containerRef: React.RefObject<HTMLDivElement>) => {
    if (containerRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      const newScrollLeft = direction === 'left' 
        ? containerRef.current.scrollLeft - scrollAmount 
        : containerRef.current.scrollLeft + scrollAmount;
      
      containerRef.current.scrollTo({
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
                  onClick={() => scrollHorizontally('left', brochuresScrollRef)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md -ml-3 transition md:hidden"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5 text-[#0077B6]" />
                </button>
                
                {/* Right scroll arrow - positioned at right middle */}
                <button 
                  onClick={() => scrollHorizontally('right', brochuresScrollRef)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md -mr-3 transition md:hidden"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5 text-[#0077B6]" />
                </button>
                
                {/* Scrollable container for mobile */}
                <div 
                  ref={brochuresScrollRef}
                  className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 md:overflow-visible scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{brochure.title}</h3>
                        <div className="flex gap-x-4 text-xs text-gray-500 mb-3">
                          <div className="flex items-center">
                            <FileText className="w-3.5 h-3.5 mr-1" />
                            {brochure.pageCount}p
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-1" />
                            2025
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 flex-1">{brochure.description}</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          <button 
                            onClick={() => handleViewBrochure(brochure.id)}
                            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-1.5 px-3 rounded-md transition-colors duration-300"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                          <button 
                            onClick={() => handleDownloadBrochure(brochure.id)}
                            className="flex items-center gap-1 bg-[#0077B6] hover:bg-[#0077B6]/90 text-white text-sm font-medium py-1.5 px-3 rounded-md transition-colors duration-300"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                          <label className="flex items-center gap-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-sm font-medium py-1.5 px-3 rounded-md transition-colors duration-300 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-3.5 h-3.5"
                              checked={selectedBrochures.includes(brochure.id)}
                              onChange={() => handleBrochureToggle(brochure.id)}
                            />
                            Print
                          </label>
                        </div>
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
              
              {/* Scrollable container for mobile with positioned arrow controls */}
              <div className="relative">
                {/* Left scroll arrow - positioned at left middle */}
                <button 
                  onClick={() => scrollHorizontally('left', guidesScrollRef)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md -ml-3 transition md:hidden"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5 text-[#0077B6]" />
                </button>
                
                {/* Right scroll arrow - positioned at right middle */}
                <button 
                  onClick={() => scrollHorizontally('right', guidesScrollRef)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md -mr-3 transition md:hidden"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5 text-[#0077B6]" />
                </button>
                
                {/* Scrollable container for mobile, grid for desktop */}
                <div 
                  ref={guidesScrollRef}
                  className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto pb-4 md:overflow-visible scrollbar-hide"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {specializedGuides.map((guide) => (
                    <div 
                      key={guide.id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 flex min-w-[280px] md:min-w-0"
                    >
                      <div className="w-1/3">
                        <img 
                          src={guide.coverImage} 
                          alt={guide.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{guide.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{guide.description}</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleViewBrochure(guide.id)}
                            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-1 px-2 rounded transition-colors duration-300"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                          <button 
                            onClick={() => handleDownloadBrochure(guide.id)}
                            className="flex items-center gap-1 bg-[#0077B6] hover:bg-[#0077B6]/90 text-white text-sm font-medium py-1 px-2 rounded transition-colors duration-300"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Mobile scrolling instructions - only visible on mobile */}
                <div className="mt-4 text-sm text-gray-500 md:hidden flex items-center justify-center">
                  <span>Swipe left or right to see more guides</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
            
            {/* Request Printed Brochures */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-['Playfair_Display']">
                Request Printed Brochures
              </h2>
              
              {formSubmitted ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <div className="flex">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <div>
                      <p className="text-green-800 font-medium">Thank you for your request!</p>
                      <p className="text-green-700 mt-1">We'll send your selected brochures to the address you provided within 3-5 business days.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-6">
                    If you'd prefer physical copies of our brochures, please complete the form below and we'll mail them to you free of charge.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0077B6] focus:border-[#0077B6] text-gray-900"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0077B6] focus:border-[#0077B6] text-gray-900"
                          placeholder="Enter your email address"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0077B6] focus:border-[#0077B6] text-gray-900"
                          placeholder="Enter your phone number (optional)"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Select Brochures *
                        </label>
                        <div className="space-y-2">
                          {brochures.map((brochure) => (
                            <label key={brochure.id} className="flex items-center">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-[#0077B6] border-gray-300 rounded focus:ring-[#0077B6]"
                                checked={selectedBrochures.includes(brochure.id)}
                                onChange={() => handleBrochureToggle(brochure.id)}
                              />
                              <span className="ml-2 text-gray-700">{brochure.title}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting || selectedBrochures.length === 0 || !name || !email}
                        className={`w-full md:w-auto px-6 py-3 rounded-md font-medium text-white ${
                          isSubmitting || selectedBrochures.length === 0 || !name || !email
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[#0077B6] hover:bg-[#0077B6]/90'
                        } transition-colors duration-300 flex items-center justify-center`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          'Request Printed Brochures'
                        )}
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