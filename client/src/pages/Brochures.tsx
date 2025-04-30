import React, { useState } from 'react';
import StandardPageTemplate from '@/components/StandardPageTemplate';
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
  CheckCircle
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

  return (
    <StandardPageTemplate
      title="Travel Brochures"
      description="Download our travel brochures to explore Sri Lanka's destinations, experiences, and tour packages in detail."
      breadcrumbs={[{ label: 'Travel Resources', path: '/travel-resources' }]}
    >
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
      
      {/* All Brochures */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 font-['Playfair_Display']">
          Tour & Destination Brochures
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brochures.filter(brochure => !brochure.featured).map(brochure => (
            <div 
              key={brochure.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col"
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
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleViewBrochure(guide.id)}
                    className="text-[#0077B6] hover:text-[#0077B6]/80 font-medium py-1 px-2 text-sm rounded-md transition-colors duration-300 flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </button>
                  <button 
                    onClick={() => handleDownloadBrochure(guide.id)}
                    className="text-[#0077B6] hover:text-[#0077B6]/80 font-medium py-1 px-2 text-sm rounded-md transition-colors duration-300 flex items-center"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </button>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-1"
                      checked={selectedBrochures.includes(guide.id)}
                      onChange={() => handleBrochureToggle(guide.id)}
                    />
                    <span className="text-gray-700 text-sm">Request Print</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Request Form */}
      <div id="request-form">
        <div className="bg-gradient-to-r from-[#0077B6]/10 to-[#0077B6]/5 rounded-lg p-8">
          {formSubmitted ? (
            <div className="max-w-2xl mx-auto text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Your Request!</h3>
              <p className="text-gray-700 mb-6">
                We've received your brochure request and will process it shortly. Digital copies have been sent to your email address, and any requested printed materials will be mailed within 3-5 business days.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Next Steps</h4>
                <ul className="text-left space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Check your inbox for digital copies of your requested brochures</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Add info@bestsrilankatours.com to your contacts to ensure delivery</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Look for printed materials in your mailbox within 3-5 business days (international delivery may take longer)</span>
                  </li>
                </ul>
              </div>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-3 px-6 rounded-md transition-all duration-300"
              >
                Contact Us With Questions
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Request Printed Brochures
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Complete the form below to request physical copies of our brochures. We'll also send digital versions to your email for immediate access.
                </p>
              </div>
              
              <div className="max-w-2xl mx-auto">
                {selectedBrochures.length === 0 ? (
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-amber-700">
                          Please select at least one brochure above before requesting printed copies.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Selected Brochures:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedBrochures.map((id) => {
                        const brochure = [...brochures, ...specializedGuides].find(b => b.id === id);
                        return (
                          <li key={id} className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span className="text-gray-700">{brochure?.title}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                
                <form className="bg-white rounded-lg p-6 shadow-md" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                        placeholder="Your full name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                        placeholder="Your email address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                        placeholder="Your phone number (optional)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <input
                        type="text"
                        id="country"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                        placeholder="Your country of residence"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Mailing Address *
                    </label>
                    <textarea
                      id="address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-transparent"
                      placeholder="Full mailing address for printed brochures"
                      rows={3}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        className="mt-1 mr-2"
                        required
                      />
                      <span className="text-sm text-gray-700">
                        I agree to receive email communication from Best Sri Lanka Tours. I understand I can unsubscribe at any time. View our <a href="/privacy" className="text-[#0077B6] hover:underline">privacy policy</a>.
                      </span>
                    </label>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 w-full justify-center"
                      disabled={selectedBrochures.length === 0}
                    >
                      <Mail className="w-5 h-5" />
                      Request Selected Brochures
                    </button>
                  </div>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Digital copies will be sent immediately. Printed materials typically arrive within 3-5 business days (international shipping may take longer).
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </StandardPageTemplate>
  );
};

export default Brochures;