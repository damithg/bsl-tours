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

  // Expertise sections with icons
  const expertiseAreas = [
    {
      title: "Local Expertise",
      description: "Our team consists of native Sri Lankans with extensive knowledge of hidden gems and cultural insights.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#0077B6]">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      )
    },
    {
      title: "Luxury Experiences",
      description: "Crafting high-end journeys with premium accommodations and exclusive activities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#0077B6]">
          <path d="M12 2v20"></path>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-[#f0f9ff]" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading with animated underline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-[#0077B6]">Best Sri Lanka Tours</span>
          </h2>
          <div className={`h-1 w-24 bg-[#0077B6] mx-auto rounded-full transition-all duration-1000 ease-out ${isVisible ? 'w-24 opacity-100' : 'w-0 opacity-0'}`}></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side with images */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative">
              {/* Main image with parallax effect */}
              <div className="rounded-lg overflow-hidden shadow-xl transform -rotate-2 transition hover:rotate-0 duration-500">
                <img 
                  src="https://bestsrilankatours.com/wp-content/uploads/2020/02/tea-plantation-about-us.jpg" 
                  alt="Tea plantations in Sri Lanka" 
                  className="w-full h-auto object-cover hover:scale-105 transition duration-700" 
                />
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -bottom-12 -right-8 p-6 bg-white rounded-lg shadow-xl max-w-xs hidden md:block transform rotate-3 transition hover:rotate-0 duration-500">
                <div className="flex items-center mb-3">
                  <div className="p-2 rounded-full bg-amber-100 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-amber-600">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Award-Winning Service</h3>
                </div>
                <p className="text-gray-600 leading-relaxed ml-12">Recognized for excellence in personalized Sri Lankan travel experiences.</p>
              </div>
              
              {/* Small decorative element */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#0077B6]/10 rounded-full hidden lg:block"></div>
            </div>
          </div>
          
          {/* Right side with content */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Founded by travel enthusiasts with deep knowledge of Sri Lanka, we specialize in creating 
              <span className="text-[#0077B6] font-semibold"> bespoke luxury journeys</span> that showcase the island's extraordinary beauty and culture.
            </p>
            
            <p className="text-lg text-gray-700 mb-10 leading-relaxed">
              Our team of expert travel designers, local guides, and hospitality professionals work together to craft unforgettable experiences tailored to your preferences and interests.
            </p>
            
            {/* Expertise areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {expertiseAreas.map((area, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border border-gray-100">
                  <div className="mb-4">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{area.title}</h3>
                  <p className="text-gray-600">{area.description}</p>
                </div>
              ))}
            </div>
            
            {/* Call to action button */}
            <a 
              href="/about" 
              className="inline-flex items-center gap-2 bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-3.5 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Learn More About Us
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Stats with animated counters */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg p-6 shadow-md border border-gray-100 transform transition-all duration-700 ease-out delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="flex items-center justify-center mb-2 text-[#0077B6]">
                {stat.icon}
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-[#0077B6] flex items-center justify-center">
                  <span className="counter-value">{counters[index]}</span>
                  <span>{stat.suffix}</span>
                </h3>
                <p className="text-gray-600 font-medium mt-2">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;