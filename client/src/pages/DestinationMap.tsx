import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

/**
 * DestinationMap page with photo overlays on a Sri Lanka map
 */
const DestinationMap = () => {
  // Define destination data directly in component for simplicity
  const destinations = [
    {
      id: 1,
      name: "Sigiriya Rock Fortress",
      description: "Ancient rock fortress with frescoes and stunning views.",
      imageUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/cultural/sigiriya_nmbzuf.jpg",
      position: { top: '25%', left: '55%' },
      featured: true
    },
    {
      id: 2,
      name: "Kandy Temple",
      description: "Temple of the Sacred Tooth Relic - Sri Lanka's most important Buddhist shrine.",
      imageUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/cultural/kandy-temple_tphwsc.jpg",
      position: { top: '45%', left: '43%' },
      featured: true
    },
    {
      id: 3,
      name: "Galle Fort",
      description: "UNESCO World Heritage site with Dutch colonial architecture and coastal views.",
      imageUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/colonial/galle-fort_wq4fvs.jpg",
      position: { bottom: '30%', left: '20%' },
      featured: true
    },
    {
      id: 4,
      name: "Mirissa Beach",
      description: "Pristine beach with turquoise waters, perfect for relaxation and whale watching.",
      imageUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/beaches/mirissa_hq5tcf.jpg",
      position: { bottom: '15%', right: '10%' },
      featured: true
    },
    {
      id: 5,
      name: "Yala National Park",
      description: "Famous for leopards and diverse wildlife, offering stunning safari experiences.",
      imageUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/wildlife/yala_tzqz9j.jpg",
      position: { bottom: '22%', right: '30%' },
      featured: false
    },
    {
      id: 6,
      name: "Nuwara Eliya",
      description: "Hill country with tea plantations and cool climate, known as 'Little England'.",
      imageUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/nature/nuwara-eliya-tea_zn6fvs.jpg",
      position: { top: '55%', left: '60%' },
      featured: false
    }
  ];

  // Track the selected destination for the expanded view
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 bg-[#0077B6]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/beaches/aerial-beach_r2mfcp.jpg" 
            alt="Sri Lanka Aerial View" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-6">
              Destinations of Sri Lanka
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore our interactive map to discover Sri Lanka's most captivating places and start planning your perfect journey.
            </p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0077B6] mb-4">
            DISCOVER THE PEARL OF THE INDIAN OCEAN
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            From ancient cultural treasures to pristine beaches and lush landscapes, 
            Sri Lanka offers a wealth of diverse experiences in a compact island.
          </p>
        </div>
      
        {/* Map with photo overlays */}
        <div className="relative mx-auto max-w-5xl">
          {/* Sri Lanka map background */}
          <div className="relative rounded-xl p-6 shadow-lg">
            <img 
              src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744127782/map-sri-lanka_vb7cpr.png" 
              alt="Sri Lanka Map" 
              className="w-full h-auto"
            />
            
            {/* Photo overlays */}
            {destinations.map(destination => (
              <div 
                key={destination.id}
                className="absolute"
                style={{ ...destination.position }}
              >
                <div 
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedDestination(selectedDestination === destination.id ? null : destination.id)}
                >
                  <img 
                    src={destination.imageUrl} 
                    alt={destination.name} 
                    className={`object-cover rounded-lg shadow-xl border-2 border-white transform transition-all duration-500 hover:scale-105 ${
                      selectedDestination === destination.id ? 'ring-4 ring-[#F26B6B] scale-105 z-20' : 'z-10'
                    } ${
                      destination.featured ? 'w-36 h-36' : 'w-28 h-28'
                    }`}
                  />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="bg-white/80 text-[#0077B6] font-medium text-sm px-3 py-1 rounded-full shadow-sm">
                      {destination.name}
                    </span>
                  </div>
                  
                  {/* Expanded view when selected */}
                  {selectedDestination === destination.id && (
                    <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-72 bg-white rounded-xl shadow-2xl p-4 z-30">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45"></div>
                      <h3 className="font-bold text-lg text-[#0077B6] mb-2">{destination.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{destination.description}</p>
                      <a 
                        href={`/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-flex items-center text-sm bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-1.5 px-4 rounded-full"
                      >
                        Learn More 
                        <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Instructions */}
          <div className="text-center mt-16 mb-6 bg-[#0077B6]/5 py-6 px-8 rounded-lg">
            <h3 className="text-xl font-semibold text-[#0077B6] mb-2">How to Use the Map</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4">
              Click on any destination photo to view details. Our interactive map allows you to explore 
              major attractions across Sri Lanka and find the perfect spots for your travel itinerary.
            </p>
            
            {/* Call to action */}
            <div className="flex justify-center mt-6">
              <a 
                href="/tours" 
                className="inline-flex items-center bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                Explore Our Tour Packages
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Additional content */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0077B6]/5 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-[#0077B6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0077B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#0077B6] mb-2">Cultural Triangle</h3>
            <p className="text-gray-600">
              Explore ancient cities, rock fortresses, and cave temples in Sri Lanka's Cultural Triangle.
            </p>
          </div>
          
          <div className="bg-[#0077B6]/5 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-[#0077B6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0077B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#0077B6] mb-2">Hill Country</h3>
            <p className="text-gray-600">
              Discover misty mountains, vast tea plantations, and colonial charm in Sri Lanka's central highlands.
            </p>
          </div>
          
          <div className="bg-[#0077B6]/5 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-[#0077B6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0077B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#0077B6] mb-2">Coastal Regions</h3>
            <p className="text-gray-600">
              Relax on pristine beaches, enjoy water sports, and savor the unique coastal culture.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationMap;