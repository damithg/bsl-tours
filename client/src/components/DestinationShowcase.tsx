import { useState, useEffect, useRef } from 'react';

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  position: {
    x: number;
    y: number;
  };
}

const DestinationShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Sample destinations with coordinates relative to the map
  const destinations: Destination[] = [
    {
      id: 1,
      name: "Sigiriya",
      description: "Ancient rock fortress with frescoes and landscaped gardens",
      image: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_600,h_400,c_fill/v1634567890/destinations/sigiriya.jpg",
      position: { x: 55, y: 38 }
    },
    {
      id: 2,
      name: "Kandy",
      description: "Cultural capital and home to the Temple of the Sacred Tooth Relic",
      image: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_600,h_400,c_fill/v1634567890/destinations/kandy.jpg",
      position: { x: 45, y: 45 }
    },
    {
      id: 3,
      name: "Galle",
      description: "Historic fort city with Dutch colonial architecture",
      image: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_600,h_400,c_fill/v1634567890/destinations/galle.jpg",
      position: { x: 30, y: 80 }
    },
    {
      id: 4,
      name: "Ella",
      description: "Picturesque mountain village with tea plantations and hiking trails",
      image: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_600,h_400,c_fill/v1634567890/destinations/ella.jpg",
      position: { x: 60, y: 65 }
    },
    {
      id: 5,
      name: "Trincomalee",
      description: "Coastal city with beautiful beaches and natural harbors",
      image: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_600,h_400,c_fill/v1634567890/destinations/trincomalee.jpg",
      position: { x: 75, y: 28 }
    }
  ];

  // Intersection Observer to trigger animations when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.2 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="destinations" className="py-24 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover <span className="text-[#0077B6]">Sri Lanka</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the diversity of Sri Lanka's breathtaking destinations, from ancient cultural sites
            to pristine beaches and lush tea plantations.
          </p>
          <div className={`h-1 w-24 bg-[#0077B6] mx-auto rounded-full transition-all duration-1000 ease-out mt-6 ${isVisible ? 'w-24 opacity-100' : 'w-0 opacity-0'}`}></div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* Left side content */}
          <div className={`lg:w-5/12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Iconic Destinations
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Sri Lanka offers a remarkable variety of places to explore, from UNESCO World Heritage sites to 
              stunning beaches and scenic mountain landscapes. Each destination tells its own unique story.
            </p>
            
            <div className="space-y-8 mb-10">
              <div className="flex items-start">
                <div className="bg-[#0077B6]/10 p-2.5 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#0077B6]">
                    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">Cultural Triangle</h4>
                  <p className="text-gray-600">
                    Explore ancient cities, rock fortresses, and Buddhist temples in the heart of the island.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#0077B6]/10 p-2.5 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#0077B6]">
                    <path d="M21 6h-4l-3-3H8v16h16V9a3 3 0 0 0-3-3Z"></path>
                    <path d="M16 8v8"></path>
                    <path d="M12 16h8"></path>
                    <path d="M3 6h4"></path>
                    <path d="M3 12h8"></path>
                    <path d="M3 18h8"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">Colonial Heritage</h4>
                  <p className="text-gray-600">
                    Discover the Dutch, Portuguese, and British influence in Galle, Colombo, and hill country.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#0077B6]/10 p-2.5 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#0077B6]">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">Scenic Landscapes</h4>
                  <p className="text-gray-600">
                    Journey through misty mountains, cascading waterfalls, and emerald tea plantations.
                  </p>
                </div>
              </div>
            </div>
            
            <a 
              href="/destinations" 
              className="inline-flex items-center gap-2 bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-3.5 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Explore All Destinations
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
          
          {/* Right side map with destinations */}
          <div className={`lg:w-7/12 relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              {/* Sri Lanka Map */}
              <div className="relative mb-4">
                <img 
                  src="/images/sri-lanka-map-outline.svg" 
                  alt="Sri Lanka Map" 
                  className="w-full h-auto"
                />
                
                {/* Destination markers */}
                {destinations.map((destination) => (
                  <a 
                    key={destination.id}
                    href={`/destinations/${destination.name.toLowerCase()}`}
                    className="absolute transition-transform hover:scale-110 duration-300"
                    style={{ 
                      left: `${destination.position.x}%`, 
                      top: `${destination.position.y}%`,
                      transform: "translate(-50%, -50%)" 
                    }}
                  >
                    <div className="relative group cursor-pointer">
                      {/* Animated ping effect */}
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0077B6] opacity-75"></span>
                      
                      {/* Main marker dot */}
                      <span className="relative flex items-center justify-center w-6 h-6 bg-[#0077B6] text-white rounded-full border-2 border-white shadow-lg z-10">
                        <span className="text-xs font-bold">{destination.id}</span>
                      </span>
                      
                      {/* Tooltip on hover */}
                      <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 w-48 bg-white shadow-xl rounded-md p-3 text-left z-20">
                        <div className="relative">
                          <img 
                            src={destination.image} 
                            alt={destination.name} 
                            className="w-full h-24 object-cover rounded-md mb-2"
                          />
                          <h4 className="font-bold text-gray-900">{destination.name}</h4>
                          <p className="text-xs text-gray-600">{destination.description}</p>
                          
                          {/* Triangle pointer */}
                          <div className="absolute h-3 w-3 bg-white transform rotate-45 left-1/2 -bottom-1.5 -ml-1.5"></div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
                
                {/* Destination label - Sigiriya */}
                <div 
                  className="absolute text-center"
                  style={{ left: '58%', top: '32%' }}
                >
                  <div className="font-script text-lg text-gray-800 whitespace-nowrap">
                    Cultural Triangle
                  </div>
                </div>
                
                {/* Destination label - Kandy */}
                <div 
                  className="absolute text-center hidden md:block"
                  style={{ left: '40%', top: '48%' }}
                >
                  <div className="font-script text-lg text-gray-800 whitespace-nowrap">
                    Hill Country
                  </div>
                </div>
                
                {/* Destination label - South Coast */}
                <div 
                  className="absolute text-center hidden md:block"
                  style={{ left: '30%', top: '88%' }}
                >
                  <div className="font-script text-lg text-gray-800 whitespace-nowrap">
                    South Coast
                  </div>
                </div>
                
                {/* Small illustrations */}
                <div 
                  className="absolute w-16 h-16 hidden md:block"
                  style={{ left: '75%', top: '15%' }}
                >
                  <img 
                    src="/images/elephant-icon.svg" 
                    alt="Wildlife" 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div 
                  className="absolute w-16 h-16 hidden md:block"
                  style={{ left: '15%', top: '65%' }}
                >
                  <img 
                    src="/images/beach-icon.svg" 
                    alt="Beach" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              {/* Destinations title overlay */}
              <div className="absolute bottom-10 right-10 text-right hidden lg:block">
                <div className="bg-white/80 backdrop-blur-sm px-5 py-3 rounded-lg shadow-md inline-block">
                  <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wider">
                    DISCOVER DESTINATIONS
                  </h3>
                  <div className="text-2xl font-script text-[#0077B6]">
                    Sri Lanka
                  </div>
                </div>
              </div>
            </div>
            
            {/* Featured destinations below map for mobile */}
            <div className="grid grid-cols-2 gap-4 mt-8 md:hidden">
              {destinations.slice(0, 4).map(destination => (
                <a 
                  key={destination.id}
                  href={`/destinations/${destination.name.toLowerCase()}`}
                  className="group block relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-32 object-cover group-hover:scale-105 transition duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h4 className="font-bold">{destination.name}</h4>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationShowcase;