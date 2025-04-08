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
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0 order-2 lg:order-1">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0077B6] mb-6">About Best Sri Lanka Tours</h2>
            <p className="text-lg text-[#333333]/80 mb-6">
              Bundled with an awe-inspiring set of destination experiences, we provide you with ready-to-go and fully flexible ways to explore the island's extraordinary beauty and culture.
            </p>
            <p className="text-lg text-[#333333]/80 mb-8">
              Our team of expert travel designers, local guides, and hospitality professionals work together to craft unforgettable experiences tailored to your preferences and interests.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className={`flex flex-col items-center transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
            
            <a href="/about" className="bg-[#0077B6] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition inline-flex items-center">
              Learn More About Us
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
          
          <div className="lg:w-1/2 order-1 lg:order-2 mb-10 lg:mb-0">
            <div className="relative">
              {/* Mini Sri Lanka Map with Destinations */}
              <div className="rounded-lg shadow-xl overflow-hidden bg-[#f8f9fa] p-4 border border-gray-100">
                <div className="relative">
                  {/* Map background */}
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744127782/map-sri-lanka_vb7cpr.png" 
                    alt="Sri Lanka Map" 
                    className="w-full h-auto rounded"
                  />
                  
                  {/* Destination Pins */}
                  {/* Sigiriya */}
                  <div className="absolute" style={{ top: '25%', left: '55%' }}>
                    <div className="relative">
                      <img 
                        src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743450370/destinations/sigiriya-rock-fortress-pidurangala.jpg" 
                        alt="Sigiriya Rock Fortress" 
                        className="w-16 h-16 object-cover rounded-lg shadow-md border-2 border-white"
                      />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="bg-white/90 text-[#0077B6] text-xs px-2 py-1 rounded-full shadow-sm">
                          Sigiriya
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Kandy */}
                  <div className="absolute" style={{ top: '45%', left: '43%' }}>
                    <div className="relative">
                      <img 
                        src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743585928/destinations/kandy-overview.jpg" 
                        alt="Kandy" 
                        className="w-16 h-16 object-cover rounded-lg shadow-md border-2 border-white"
                      />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="bg-white/90 text-[#0077B6] text-xs px-2 py-1 rounded-full shadow-sm">
                          Kandy
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Galle */}
                  <div className="absolute" style={{ bottom: '30%', left: '20%' }}>
                    <div className="relative">
                      <img 
                        src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/colonial/galle-fort_wq4fvs.jpg" 
                        alt="Galle Fort" 
                        className="w-16 h-16 object-cover rounded-lg shadow-md border-2 border-white"
                      />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="bg-white/90 text-[#0077B6] text-xs px-2 py-1 rounded-full shadow-sm">
                          Galle
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating card */}
              <div className="absolute -bottom-10 -left-10 p-6 bg-white rounded-lg shadow-lg max-w-xs hidden md:block">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-amber-500 mr-4">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                  <h3 className="font-['Playfair_Display'] text-lg font-semibold">Award-Winning Service</h3>
                </div>
                <p className="text-[#333333]/70">Recognized for excellence in personalized Sri Lankan travel experiences.</p>
              </div>
              
              {/* Explore CTA overlay */}
              <div className="absolute bottom-4 right-4">
                <a 
                  href="/destination-map" 
                  className="bg-[#0077B6] hover:bg-[#0077B6]/90 text-white text-sm font-medium py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all flex items-center"
                >
                  Explore Map
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;