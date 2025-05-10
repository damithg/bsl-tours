import React from 'react';
import HeroSection from '@/components/HeroSection';
import { BreadcrumbItem } from '@/components/Breadcrumb';
import { AlertTriangle, AlertCircle, Umbrella, Thermometer, GlobeLock, Phone, Shield, LifeBuoy } from 'lucide-react';

const SafetyUpdates: React.FC = () => {
  // Define breadcrumbs
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Travel Resources", path: "/travel-resources" },
    { label: "Safety Updates" }
  ];
  
  // Sample travel alerts and safety updates
  const travelAlerts = [
    {
      id: 1,
      title: 'Weather Advisory: Monsoon Season',
      date: 'April 15, 2025',
      category: 'Weather',
      severity: 'moderate',
      content: 'The southwest monsoon season is expected from May to September. Travelers should expect heavy rainfall, particularly in the western, southern, and central regions. This may cause localized flooding, landslides in mountainous areas, and transportation disruptions. Consider flexible itineraries during this period and check weather forecasts regularly.',
      icon: <Umbrella className="w-5 h-5" />
    },
    {
      id: 2,
      title: 'Health Advisory: Dengue Prevention',
      date: 'April 10, 2025',
      category: 'Health',
      severity: 'moderate',
      content: 'An increase in dengue fever cases has been reported in urban and coastal areas. Travelers are advised to take precautions against mosquito bites, including using repellent, wearing long sleeves and pants, and ensuring accommodations have proper screens or mosquito nets. Symptoms include high fever, severe headache, pain behind the eyes, and joint/muscle pain. Seek medical attention if symptoms develop.',
      icon: <Thermometer className="w-5 h-5" />
    },
    {
      id: 3,
      title: 'Transportation Update: Railway Maintenance',
      date: 'April 5, 2025',
      category: 'Transportation',
      severity: 'low',
      content: 'Scheduled maintenance on the Colombo to Kandy railway line will take place throughout May 2025. Travelers can expect reduced service and potential delays. Alternative transportation options are recommended for this route during this period. Check with Sri Lanka Railways for the latest schedule changes.',
      icon: <AlertCircle className="w-5 h-5" />
    },
    {
      id: 4,
      title: 'Travel Advisory: Coastal Areas',
      date: 'March 25, 2025',
      category: 'Regional',
      severity: 'moderate',
      content: 'Strong currents and rough sea conditions are expected along the eastern coast from April to June. Swimming is not recommended at unprotected beaches, especially in the areas of Arugam Bay and Passikudah. Always obey warning flags and lifeguard instructions where available.',
      icon: <LifeBuoy className="w-5 h-5" />
    }
  ];
  
  // Safety tips categorized by type
  const safetyTips = [
    {
      category: 'General Safety',
      icon: <Shield className="w-6 h-6 text-[#0077B6]" />,
      tips: [
        'Keep a photocopy of your passport and important documents separate from the originals.',
        'Register with your country\'s embassy or consulate upon arrival.',
        'Stay aware of your surroundings, especially in crowded tourist areas.',
        'Use hotel safes for valuables and avoid displaying expensive items.',
        'Research local laws and customs before your trip to avoid unintentional offenses.'
      ]
    },
    {
      category: 'Health & Wellness',
      icon: <Thermometer className="w-6 h-6 text-[#0077B6]" />,
      tips: [
        'Drink bottled or purified water and avoid ice in drinks unless at reputable establishments.',
        'Use insect repellent containing DEET, especially in tropical areas.',
        'Apply sunscreen regularly, even on cloudy days, due to Sri Lanka\'s proximity to the equator.',
        'Carry basic medications for stomach issues, pain relief, and allergies.',
        'Know the location of the nearest hospital or medical facility at each destination.'
      ]
    },
    {
      category: 'Transportation Safety',
      icon: <GlobeLock className="w-6 h-6 text-[#0077B6]" />,
      tips: [
        'Use reputable transportation providers and avoid unmarked taxis.',
        'Always wear a seatbelt when available, even if others don\'t.',
        'Be cautious when crossing roads as traffic can be chaotic in urban areas.',
        'For tuk-tuks, agree on a price before starting your journey or insist on using the meter.',
        'Avoid overnight travel on rural roads where possible.'
      ]
    },
    {
      category: 'Wildlife Safety',
      icon: <AlertTriangle className="w-6 h-6 text-[#0077B6]" />,
      tips: [
        'Always maintain a safe distance from wildlife, even if they appear docile.',
        'Follow park ranger and guide instructions when on safari or in national parks.',
        'Never feed wild animals or leave food accessible to them.',
        'Be cautious of monkeys in temple areas as they can be aggressive if they think you have food.',
        'Wear appropriate footwear when hiking to protect against snakes and other wildlife.'
      ]
    }
  ];
  
  // Emergency contact information
  const emergencyContacts = [
    {
      title: 'General Emergency',
      numbers: ['119'],
      description: 'For police, fire, or medical emergencies'
    },
    {
      title: 'Tourist Police',
      numbers: ['+94 11 242 1052', '+94 11 242 1451'],
      description: 'Specialized police unit for tourist assistance'
    },
    {
      title: 'Ambulance Services',
      numbers: ['1990', '110'],
      description: '24-hour emergency medical services'
    },
    {
      title: 'Best Sri Lanka Tours Emergency Line',
      numbers: ['+94 77 123 4567'],
      description: '24/7 support for our tour clients'
    }
  ];

  // Function to render severity indicator
  const renderSeverityIndicator = (severity: string) => {
    const severityClasses = {
      low: 'bg-blue-100 text-blue-800',
      moderate: 'bg-amber-100 text-amber-800',
      high: 'bg-red-100 text-red-800'
    };
    
    const severityClass = severityClasses[severity as keyof typeof severityClasses] || severityClasses.low;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityClass}`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        title="Safety Updates & Travel Alerts"
        description="Stay informed about current conditions, travel advisories, and safety tips for your Sri Lankan journey."
        backgroundImage="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743151323/safety_hero_image_czfk8z.jpg"
        breadcrumbItems={breadcrumbItems}
        overlayColor="bg-[#0077B6]"
        overlayOpacity={20}
        imageTransform="scale-105"
      />
      
      {/* Main Content */}
      <section className="py-16 md:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Current Travel Alerts */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
                  <AlertTriangle className="w-6 h-6 text-[#0077B6]" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
                  Current Travel Alerts
                </h2>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                {travelAlerts.map((alert, index) => (
                  <div 
                    key={alert.id}
                    className={`p-6 ${index !== travelAlerts.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="flex flex-wrap justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className={`mr-3 p-2 rounded-full ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-600' : 
                          alert.severity === 'moderate' ? 'bg-amber-100 text-amber-600' : 
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {alert.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{alert.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 mt-1">
                            <span className="text-sm text-gray-500">{alert.date}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{alert.category}</span>
                            <span className="text-sm text-gray-500">•</span>
                            {renderSeverityIndicator(alert.severity)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{alert.content}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-gray-500 mr-2" />
                <p className="text-sm text-gray-500">
                  Last updated: April 30, 2025. Check back regularly for the latest updates.
                </p>
              </div>
            </div>
            
            {/* Safety Tips */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
                  <Shield className="w-6 h-6 text-[#0077B6]" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
                  Safety Tips
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {safetyTips.map((section, index) => (
                  <div 
                    key={`safety-tips-${index}`}
                    className="bg-white shadow-sm rounded-lg p-6 border border-gray-200"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-[#0077B6]/10 p-2.5 rounded-full mr-3">
                        {section.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">{section.category}</h3>
                    </div>
                    
                    <ul className="space-y-3">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={`tip-${index}-${tipIndex}`} className="flex items-start">
                          <div className="bg-[#0077B6]/10 p-1.5 rounded-full mr-2 mt-1 text-[#0077B6]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Emergency Contacts */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
                  <Phone className="w-6 h-6 text-[#0077B6]" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
                  Emergency Contacts
                </h2>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                {emergencyContacts.map((contact, index) => (
                  <div 
                    key={`emergency-${index}`}
                    className={`p-5 flex flex-col md:flex-row md:items-center md:justify-between ${
                      index !== emergencyContacts.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <div className="mb-3 md:mb-0">
                      <h3 className="font-semibold text-gray-800">{contact.title}</h3>
                      <p className="text-sm text-gray-600">{contact.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {contact.numbers.map((number, numIndex) => (
                        <a 
                          key={`number-${index}-${numIndex}`}
                          href={`tel:${number.replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-1.5 bg-[#0077B6]/10 hover:bg-[#0077B6]/20 text-[#0077B6] font-medium py-2 px-4 rounded-md transition-colors duration-300"
                        >
                          <Phone className="w-4 h-4" />
                          {number}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-amber-800">Important Notice</h3>
                    <div className="mt-2 text-amber-700">
                      <p>Save these emergency numbers in your phone before your trip. We also recommend keeping a printed copy in your wallet or travel documents.</p>
                      <p className="mt-2">In case of emergency during your tour with Best Sri Lanka Tours, contact your tour guide immediately or call our 24/7 emergency line.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Resources for Latest Updates */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-[#0077B6]/10 p-3 rounded-full mr-4">
                  <GlobeLock className="w-6 h-6 text-[#0077B6]" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 font-['Playfair_Display']">
                  Stay Updated
                </h2>
              </div>
              
              <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
                <p className="text-gray-700 mb-6">
                  For the most current travel advisories and safety information, we recommend checking these official sources regularly:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#0077B6]/10 p-2 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#0077B6]">
                        <path d="M19.3 14.8C20.1 13.8 20.6 12.5 20.6 11.1C20.6 7.8 18.2 5 15.3 5C12.2 5 9.7 7.8 9.7 11.1C9.7 12.4 10.1 13.7 10.9 14.7"></path>
                        <path d="M15.3 11.1C15.3 14.4 12.8 17.2 9.7 17.2C6.7 17.2 4.3 14.4 4.3 11.1C4.3 7.8 6.7 5 9.7 5C9.5 5 9.2 5 9 5"></path>
                        <path d="M18 20.1C16.8 20.6 15.5 20.1 14 20.2C14 20.2 13 20.4 12 20.2C11 20 9.7 19.5 9.7 19.5C8.4 20 6.7 20.2 5.2 19.8"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Your Country's Travel Advisory</h3>
                      <p className="text-gray-600 mb-2">
                        Check your government's travel advisory service for country-specific safety information.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <a 
                          href="https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/SriLanka.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0077B6] text-sm hover:underline flex items-center"
                        >
                          US Travel Advisory
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
                            <path d="M7 17l9.2-9.2"></path>
                            <path d="M17 17V8H8"></path>
                          </svg>
                        </a>
                        <a 
                          href="https://www.gov.uk/foreign-travel-advice/sri-lanka"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0077B6] text-sm hover:underline flex items-center"
                        >
                          UK Travel Advice
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
                            <path d="M7 17l9.2-9.2"></path>
                            <path d="M17 17V8H8"></path>
                          </svg>
                        </a>
                        <a 
                          href="https://www.smartraveller.gov.au/destinations/asia/sri-lanka"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0077B6] text-sm hover:underline flex items-center"
                        >
                          Australian Travel Advice
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
                            <path d="M7 17l9.2-9.2"></path>
                            <path d="M17 17V8H8"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#0077B6]/10 p-2 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#0077B6]">
                        <path d="M8 6h8"></path>
                        <path d="M8 12h8"></path>
                        <path d="M8 18h8"></path>
                        <path d="M3 6h.01"></path>
                        <path d="M3 12h.01"></path>
                        <path d="M3 18h.01"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Sri Lanka Tourism Development Authority</h3>
                      <p className="text-gray-600 mb-2">
                        Official tourism information including safety updates for visitors.
                      </p>
                      <a 
                        href="https://www.sltda.gov.lk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0077B6] text-sm hover:underline flex items-center"
                      >
                        Visit Website
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
                          <path d="M7 17l9.2-9.2"></path>
                          <path d="M17 17V8H8"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#0077B6]/10 p-2 rounded-full mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#0077B6]">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">World Health Organization</h3>
                      <p className="text-gray-600 mb-2">
                        Health advisories and travel health information.
                      </p>
                      <a 
                        href="https://www.who.int/sri-lanka"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0077B6] text-sm hover:underline flex items-center"
                      >
                        Visit Website
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
                          <path d="M7 17l9.2-9.2"></path>
                          <path d="M17 17V8H8"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SafetyUpdates;