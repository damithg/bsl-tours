import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';

const DestinationPostsSection = () => {
  // Animation hooks
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Intersection Observer to trigger animations when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.3 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Featured destinations
  const destinations = [
    {
      name: "Sigiriya",
      description: "The ancient rock fortress",
      image: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1620000000/destinations/sigiriya.jpg",
      position: { top: "20%", left: "50%" },
    },
    {
      name: "Kandy",
      description: "Cultural capital of Sri Lanka",
      image: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1620000000/destinations/kandy.jpg",
      position: { top: "35%", left: "45%" },
    },
    {
      name: "Galle",
      description: "Historic fort city",
      image: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1620000000/destinations/galle.jpg",
      position: { bottom: "25%", left: "40%" },
    },
    {
      name: "Ella",
      description: "Scenic mountain village",
      image: "https://res.cloudinary.com/drsjp6bqz/image/upload/v1620000000/destinations/ella.jpg",
      position: { top: "45%", right: "30%" },
    }
  ];

  return (
    <section id="destinations" className="py-24 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left side content */}
          <div className={`lg:col-span-5 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-[#0077B6]">Destination</span> Highlights
            </h2>
            
            <div className={`h-1 w-24 bg-[#0077B6] rounded-full mb-8 transition-all duration-1000 ease-out ${isVisible ? 'w-24 opacity-100' : 'w-0 opacity-0'}`}></div>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Explore the breathtaking diversity of Sri Lanka through our curated collection of must-visit destinations. From ancient ruins to pristine beaches, each location offers unique experiences.
            </p>
            
            <p className="text-lg text-gray-700 mb-10 leading-relaxed">
              Our luxury tours take you through these magnificent locations with expert guides, comfortable accommodations, and perfectly planned itineraries.
            </p>
            
            <Link href="/destinations">
              <a className="inline-flex items-center gap-2 bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-3.5 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Explore Destinations
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </Link>
          </div>
          
          {/* Right side - Sri Lanka map with pins */}
          <div className={`lg:col-span-7 relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative w-full h-[550px]">
              {/* Sri Lanka Map Outline - SVG */}
              <svg 
                viewBox="0 0 444 800" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-auto mx-auto"
              >
                <path 
                  d="M293.5,30c-3.8,0.7-7.9,6-9.7,12.5c-1.1,4-4.2,9.1-6.8,11.2c-2.6,2.2-6,6.8-7.5,10.3 
                  c-1.5,3.5-4.9,7.8-7.5,9.7c-2.6,1.8-5.9,6.1-7.3,9.6c-1.4,3.6-4.5,8.9-6.9,11.8c-2.4,3-5.4,8.4-6.7,12c-1.3,3.7-4.8,8.4-7.8,10.5 
                  c-3.1,2.1-6.8,6.5-8.4,9.8c-1.6,3.3-4.7,7-6.7,8.1c-2.1,1.1-4.7,4.7-5.7,7.8c-1.1,3.2-4.2,8-7,10.7c-2.8,2.7-5.9,7.3-6.9,10.2 
                  c-0.9,3-3.8,6.9-6.4,8.7c-2.6,1.8-5.7,5.3-6.7,7.7c-1.1,2.4-3.8,7.5-6.1,11.3c-2.3,3.7-4.9,9.2-5.9,12.2c-0.9,2.9-3.6,6.8-6,8.7 
                  c-2.3,1.8-4.9,5.8-5.8,8.9c-0.8,3.1-3,6.9-4.8,8.4c-1.8,1.6-4.1,5.1-5.1,7.8c-1,2.8-4.4,8.4-7.6,12.6c-3.2,4.1-6.2,10.2-6.7,13.5 
                  c-0.5,3.3-2.5,7.9-4.5,10.2c-2,2.3-4,6.7-4.5,9.8c-0.4,3.1-2.5,8.5-4.8,12c-2.3,3.5-4.1,8.8-4.1,11.8c0,3-1.9,8.7-4.1,12.5 
                  c-2.3,3.9-4.1,9.3-4.1,12c0,2.7-1.8,8.4-4,12.5c-2.2,4.2-4.5,11.1-5.1,15.5c-0.6,4.4-2.1,10.7-3.2,14c-1.2,3.3-2.4,10.4-2.7,15.8 
                  c-0.3,5.4-1.5,13.6-2.5,18.2c-1,4.6-1.9,14.3-1.9,21.5c0,8.3,0.7,15.2,1.9,19.2c1.1,3.5,1.9,13,2.1,21.3c0.1,9.9,1,16.5,2.6,20.2 
                  c1.3,3.2,2.5,11.9,2.8,22c0.3,10.8,1.3,19.3,2.8,24.2c1.2,4.1,2.2,15.6,2.2,25.3c0,10.5,1,21.4,2.4,28c1.4,6.2,3.5,14.1,4.7,17.5 
                  c1.1,3.5,3.5,11.5,5.2,17.7c1.8,6.3,5.4,15.7,8.2,21c2.7,5.3,7.3,14.3,10.3,20c2.9,5.7,7,13.6,9.1,17.5c2.1,3.9,6.7,11.6,10.2,17.2 
                  c3.5,5.5,9.7,14.4,13.7,19.6c4,5.3,9.5,12.6,12.2,16.3c2.7,3.7,8.4,10.3,12.6,14.7c4.2,4.4,9.5,9.6,11.8,11.5 
                  c2.3,1.9,7.7,5.7,11.9,8.3c4.3,2.6,10.4,5.9,13.7,7.3c3.3,1.4,9.4,3.7,13.5,5c4.1,1.3,10.4,2.4,14,2.4c3.6,0,9.7,1.4,13.4,3 
                  c8.1,3.5,18.1,2.8,27.8-2.1c3.5-1.8,8.8-3.6,11.7-4.1c2.9-0.5,9.1-2.9,13.7-5.3c4.7-2.4,10.6-6,13.3-8.1c2.7-2,8-6.7,11.7-10.5 
                  c3.7-3.8,9.6-10.6,13-15.2c3.4-4.6,8.4-12.7,11.1-18c2.7-5.3,6.1-13.6,7.6-18.5c1.5-4.9,4.3-15.1,6.1-22.5 
                  c1.9-7.4,3.8-18.3,4.2-24c0.5-5.8,0.5-16.5,0-23.8c-0.5-7.3-1.8-18.2-2.8-24.2c-1.1-6-2.5-15.9-3.3-22c-0.7-6.1-2.2-15.3-3.2-20.5 
                  c-1.1-5.2-2.4-13.7-3-19c-0.6-5.3-1.9-13-2.9-17c-1-4-2.4-11.9-3-17.5c-0.6-5.6-2-14.8-3-20.5c-1-5.7-1.9-14.9-1.9-20.5 
                  c0-5.6,0.9-15.4,1.9-22c1.1-6.5,3.1-15.4,4.5-19.7c1.4-4.3,3.6-11.4,4.9-15.8c1.4-4.4,4.1-11.2,6.1-15.2c2-4,4.9-10.2,6.4-13.8 
                  c1.5-3.6,5.2-10.3,8.2-15c3-4.7,6.7-11.4,8.1-15c1.4-3.6,4.2-9.3,6.1-12.7c1.9-3.4,4.7-9.3,6.3-13.2c1.5-3.9,5-10.3,7.8-14.3 
                  c2.8-4,6.1-9.8,7.4-13c1.3-3.2,3.9-8.7,5.9-12.2c2-3.5,4.5-9.5,5.6-13.3c1.1-3.8,3.4-9,5.1-11.5c1.8-2.5,4.1-7.1,5.2-10.2 
                  c1.1-3.1,3.6-8.1,5.6-11c2-3,4.6-8.3,5.7-11.8c1.1-3.5,3.6-8.9,5.6-12c2-3.1,4.5-8.9,5.6-12.8c1.1-3.9,3.8-9.4,6.1-12.2 
                  c2.2-2.8,4.7-8.1,5.6-11.8c0.8-3.7,3.7-9.3,6.1-12.5c2.5-3.2,5.3-8.4,6.3-11.5c1-3.1,3.6-8.5,5.8-12c2.2-3.5,5-8.8,6.1-11.8 
                  c1.1-3,2.8-8,3.7-11.2c0.9-3.2,1.1-6.6,0.5-7.5c-2.6-4.2-113.1-4.7-124.4-0.5z"
                  fill="#F5F7FA"
                  stroke="#0077B6"
                  strokeWidth="2"
                />
              </svg>

              {/* Destination Pins */}
              {destinations.map((destination, index) => (
                <div 
                  key={index}
                  className={`absolute transition-all duration-1000 delay-${500 + index * 200} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                  style={destination.position as React.CSSProperties}
                >
                  {/* Pin */}
                  <div className="relative">
                    <div className="absolute -translate-x-1/2 -translate-y-full mb-2">
                      <div className="relative">
                        {/* Pin dot */}
                        <div className="w-5 h-5 bg-red-500 rounded-full ring-4 ring-red-500/20 animate-pulse"></div>
                        
                        {/* Destination card appearing on hover */}
                        <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-3 transition-all duration-300 pointer-events-none z-10">
                          <div className="flex bg-white rounded-lg shadow-xl p-3 items-center gap-3 w-64 border border-gray-100">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-800">{destination.name}</h3>
                              <p className="text-gray-600 text-sm">{destination.description}</p>
                            </div>
                          </div>
                          {/* Tiny arrow down from card */}
                          <div className="w-4 h-4 bg-white transform rotate-45 absolute -bottom-2 left-1/2 -translate-x-1/2 border-r border-b border-gray-100"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Featured Destination Cards - Floating around the map */}
              <div className={`absolute top-10 right-0 lg:right-10 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-xl max-w-xs transform hover:-translate-y-2 transition-transform duration-300">
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1620000000/destinations/sigiriya-aerial.jpg" 
                    alt="Sigiriya Rock Fortress" 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Sigiriya Rock Fortress</h3>
                    <p className="text-sm text-gray-600">Ancient palace with breathtaking views</p>
                  </div>
                </div>
              </div>

              <div className={`absolute bottom-20 left-10 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-xl max-w-xs transform hover:-translate-y-2 transition-transform duration-300">
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1620000000/destinations/beach-sri-lanka.jpg" 
                    alt="Mirissa Beach" 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Mirissa Beach</h3>
                    <p className="text-sm text-gray-600">Pristine beaches and whale watching</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className={`absolute bottom-10 right-20 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-gray-800/90 italic">
                  Sri Lanka
                </div>
              </div>

              <div className={`absolute top-1/4 left-0 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                <div className="inline-flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full">
                  <span className="text-amber-700 font-medium text-sm">DISCOVER DESTINATIONS</span>
                  <span className="text-amber-500">✨</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationPostsSection;