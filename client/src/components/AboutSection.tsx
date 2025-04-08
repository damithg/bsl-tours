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
              {/* Stylized Decorative Map - Visual Element Only */}
              <div className="relative max-w-[90%] mx-auto mt-8 md:mt-0">
                {/* Map background with light opacity */}
                <div className="relative">
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744127782/map-sri-lanka_vb7cpr.png" 
                    alt="Sri Lanka Map" 
                    className="w-full h-auto opacity-[0.35]"
                  />
                  
                  {/* Sigiriya Featured Image Box - Top Right */}
                  <div className="absolute top-[15%] right-[20%]">
                    <div className="relative rotate-3 transform transition-transform">
                      <div className="p-2 bg-white rounded-md shadow-lg">
                        <img 
                          src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743450370/destinations/sigiriya-rock-fortress-pidurangala.jpg" 
                          alt="Sigiriya Rock Fortress" 
                          className="w-32 h-32 md:w-40 md:h-28 object-cover rounded-sm"
                        />
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-['Playfair_Display'] text-sm italic drop-shadow-md">
                            Majestic Sigiriya
                          </p>
                        </div>
                      </div>
                      {/* Map Pin */}
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                        <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 0C7.16 0 0 7.16 0 16C0 28 16 42 16 42C16 42 32 28 32 16C32 7.16 24.84 0 16 0ZM16 22C12.68 22 10 19.32 10 16C10 12.68 12.68 10 16 10C19.32 10 22 12.68 22 16C22 19.32 19.32 22 16 22Z" fill="#F26B6B"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Kandy Featured Image Box - Center */}
                  <div className="absolute top-[35%] left-[22%]">
                    <div className="relative -rotate-2 transform transition-transform">
                      <div className="p-2 bg-white rounded-md shadow-lg">
                        <img 
                          src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743664436/destinations/kalpitiya-lagoon.jpg" 
                          alt="Kalpitiya Lagoon" 
                          className="w-32 h-32 md:w-40 md:h-28 object-cover rounded-sm"
                        />
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-['Playfair_Display'] text-sm italic drop-shadow-md">
                            Serene Kalpitiya
                          </p>
                        </div>
                      </div>
                      {/* Map Pin */}
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                        <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 0C7.16 0 0 7.16 0 16C0 28 16 42 16 42C16 42 32 28 32 16C32 7.16 24.84 0 16 0ZM16 22C12.68 22 10 19.32 10 16C10 12.68 12.68 10 16 10C19.32 10 22 12.68 22 16C22 19.32 19.32 22 16 22Z" fill="#F26B6B"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Galle Featured Image Box - Bottom Left */}
                  <div className="absolute bottom-[15%] right-[30%]">
                    <div className="relative rotate-1 transform transition-transform">
                      <div className="p-2 bg-white rounded-md shadow-lg">
                        <img 
                          src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743583056/destinations/galle-lighthouse.jpg" 
                          alt="Galle Lighthouse" 
                          className="w-32 h-32 md:w-40 md:h-28 object-cover rounded-sm"
                        />
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white font-['Playfair_Display'] text-sm italic drop-shadow-md">
                            Historic Galle
                          </p>
                        </div>
                      </div>
                      {/* Map Pin */}
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                        <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 0C7.16 0 0 7.16 0 16C0 28 16 42 16 42C16 42 32 28 32 16C32 7.16 24.84 0 16 0ZM16 22C12.68 22 10 19.32 10 16C10 12.68 12.68 10 16 10C19.32 10 22 12.68 22 16C22 19.32 19.32 22 16 22Z" fill="#F26B6B"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative element - "Discover Sri Lanka" text */}
                  <div className="absolute bottom-8 left-[5%]">
                    <div className="bg-white/90 px-4 py-2 rounded-lg shadow-md transform rotate-3">
                      <p className="font-['Playfair_Display'] text-xl text-[#0077B6] italic">
                        Discover Sri Lanka
                      </p>
                    </div>
                  </div>
                  
                  {/* Decorative element - Sri Lankan Elephant */}
                  <div className="absolute top-[60%] left-[55%]">
                    <img 
                      src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/icons/sri-lankan-elephant_dzc3ph.png" 
                      alt="Sri Lankan Elephant" 
                      className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-80"
                    />
                  </div>
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