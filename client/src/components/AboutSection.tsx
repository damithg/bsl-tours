import { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
  // Animation hooks
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Stats with animated counters
  const stats = [
    { 
      value: 15, 
      suffix: "+", 
      label: "Years of Excellence",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      )
    },
    { 
      value: 1000, 
      suffix: "+", 
      label: "Happy Travelers",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    { 
      value: 100, 
      suffix: "%", 
      label: "Tailor-Made",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
          <path d="M12 2v2"></path>
          <path d="M12 22v-2"></path>
          <path d="m17 20.66-1-1.73"></path>
          <path d="M11 10.27 7 3.34"></path>
          <path d="m20.66 17-1.73-1"></path>
          <path d="m3.34 7 1.73 1"></path>
          <path d="M14 12h8"></path>
          <path d="M2 12h2"></path>
          <path d="m20.66 7-1.73 1"></path>
          <path d="m3.34 17 1.73-1"></path>
          <path d="m17 3.34-1 1.73"></path>
          <path d="m7 20.66 1-1.73"></path>
        </svg>
      )
    },
    { 
      value: 24, 
      suffix: "/7", 
      label: "Concierge Support",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      )
    }
  ];

  // Values for counter animation
  const [counters, setCounters] = useState(stats.map(stat => 0));
  
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
  
  // Animate counters when section is visible
  useEffect(() => {
    if (!isVisible) return;
    
    const animationDuration = 2000; // 2 seconds for counter animation
    const intervalTime = 20; // Update counter every 20ms for smooth animation
    const steps = animationDuration / intervalTime;
    
    const countersAnimation = stats.map((stat, index) => {
      const stepValue = stat.value / steps;
      let currentValue = 0;
      
      return setInterval(() => {
        currentValue += stepValue;
        if (currentValue > stat.value) {
          currentValue = stat.value;
          clearInterval(countersAnimation[index]);
        }
        
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(currentValue);
          return newCounters;
        });
      }, intervalTime);
    });
    
    return () => {
      countersAnimation.forEach(interval => clearInterval(interval));
    };
  }, [isVisible, stats]);

  return (
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: About Content */}
          <div className={`lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-[#0077B6]">Best Sri Lanka Tours</span>
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Bundled with an awe-inspiring set of destination experiences, we provide you with ready-to-go and fully flexible ways to explore the island's extraordinary beauty and culture.
            </p>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Our team of expert travel designers, local guides, and hospitality professionals work together to craft unforgettable experiences tailored to your preferences and interests.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center transition-all duration-700 delay-300">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0077B6]/10 mb-3">
                    <div className="text-[#0077B6]">{stat.icon}</div>
                  </div>
                  <span className="text-[#0077B6] text-4xl font-bold mb-1 flex items-center">
                    <span className="counter-value">{counters[index]}</span>
                    <span>{stat.suffix}</span>
                  </span>
                  <p className="text-gray-600 text-center font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
            
            <a 
              href="/about" 
              className="inline-block mt-2 px-8 py-3 border border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6] hover:text-white font-medium rounded-md transition-colors duration-300"
            >
              EXPLORE
            </a>
          </div>
          
          {/* Right Side: Map with Destinations Image */}
          <div className={`lg:w-1/2 relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              {/* Map Background */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img 
                  src="/images/sri-lanka-map-outline.svg" 
                  alt="Sri Lanka Map" 
                  className="w-full h-auto opacity-20"
                />
                
                {/* Destination Illustrations */}
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_150,c_fill,g_auto,q_auto/v1634567890/destinations/sigiriya.jpg" 
                    alt="Beautiful city of London" 
                    className="w-32 h-24 object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-2 text-center text-sm font-script text-gray-800">Beautiful Sigiriya</p>
                </div>
                
                <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2">
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_150,c_fill,g_auto,q_auto/v1634567890/destinations/galle.jpg" 
                    alt="Tower Bridge" 
                    className="w-36 h-24 object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* "Discover Destinations" Text Overlay */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-white/70 backdrop-blur-sm px-3 py-2 rounded-md shadow-sm">
                    <p className="text-sm font-bold text-gray-800 uppercase tracking-wider">DISCOVER DESTINATIONS</p>
                    <p className="text-xl font-script text-[#0077B6]">Sri Lanka</p>
                  </div>
                </div>
                
                {/* Little decorative tuk-tuk icon */}
                <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <img 
                    src="/images/tuk-tuk-icon.svg" 
                    alt="Tuk Tuk" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;