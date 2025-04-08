import { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
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

  return (
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile version - Text first, then map */}
        <div className="lg:hidden mb-10">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0077B6] mb-6 text-center">About Best Sri Lanka Tours</h2>
          <p className="text-lg text-[#333333]/80 mb-6">
            Bundled with an awe-inspiring set of destination experiences, we provide you with ready-to-go and fully flexible ways to explore the island's extraordinary beauty and culture.
          </p>
          <p className="text-lg text-[#333333]/80 mb-8">
            Our team of expert travel designers, local guides, and hospitality professionals work together to craft unforgettable experiences tailored to your preferences and interests.
          </p>
          
          <div className="text-center mb-8">
            <a href="/about" className="bg-[#0077B6] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition inline-flex items-center">
              Learn More About Us
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center">
          {/* Desktop version - left column */}
          <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0 hidden lg:block">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0077B6] mb-6">About Best Sri Lanka Tours</h2>
            <p className="text-lg text-[#333333]/80 mb-6">
              Bundled with an awe-inspiring set of destination experiences, we provide you with ready-to-go and fully flexible ways to explore the island's extraordinary beauty and culture.
            </p>
            <p className="text-lg text-[#333333]/80 mb-12">
              Our team of expert travel designers, local guides, and hospitality professionals work together to craft unforgettable experiences tailored to your preferences and interests.
            </p>
            
            <a href="/about" className="bg-[#0077B6] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition inline-flex items-center">
              Learn More About Us
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
          
          {/* Map column - both mobile and desktop */}
          <div className="lg:w-1/2 w-full">
            <div className="relative">
              {/* Stylized Decorative Map - Visual Element Only */}
              <div className="relative max-w-[92%] mx-auto mt-8 md:mt-0">
                {/* Map background with light opacity */}
                <div className="relative py-4">
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744127782/map-sri-lanka_vb7cpr.png" 
                    alt="Sri Lanka Map" 
                    className="w-full h-auto opacity-[0.35]"
                  />
                  
                  {/* Mobile adjustments for image positioning */}
                  <div className="md:hidden absolute inset-0 flex items-center justify-center">
                    <p className="font-['Playfair_Display'] text-lg text-[#0077B6] font-medium bg-white/70 px-3 py-1 rounded-full">
                      Discover Sri Lanka's Treasures
                    </p>
                  </div>
                  
                  {/* Desktop & tablet images - hidden on small mobile */}
                  <div className="hidden sm:block">
                    {/* First image with pin - Top Right */}
                    <div className="absolute top-[15%] right-[15%]">
                      <div className="relative rotate-3 transform transition-transform">
                        <div className="p-2 bg-white rounded-md shadow-lg">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-1.png" 
                            alt="Backpack Traveler" 
                            className="w-auto h-auto md:max-w-[150px] object-contain rounded-sm"
                          />
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white font-['Playfair_Display'] text-xs md:text-sm italic drop-shadow-md">
                              Sri Lanka Travels
                            </p>
                          </div>
                        </div>
                        {/* Map Pin */}
                        <div className="absolute -bottom-10 md:-bottom-12 left-1/2 -translate-x-1/2 scale-75 md:scale-100">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-pin-1.png"
                            alt="Map Pin" 
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Second image - Center */}
                    <div className="absolute top-[35%] left-[10%]">
                      <div className="relative -rotate-2 transform transition-transform">
                        <div className="p-2 bg-white rounded-md shadow-lg">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-3.png" 
                            alt="Backpack Traveler" 
                            className="w-auto h-auto md:max-w-[150px] object-contain rounded-sm"
                          />
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white font-['Playfair_Display'] text-xs md:text-sm italic drop-shadow-md">
                              Island Paradise
                            </p>
                          </div>
                        </div>
                        {/* Map Pin */}
                        <div className="absolute -bottom-10 md:-bottom-12 left-1/2 -translate-x-1/2 scale-75 md:scale-100">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-pin-1.png"
                            alt="Map Pin" 
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Third image - Bottom Left */}
                    <div className="absolute bottom-[12%] right-[25%]">
                      <div className="relative rotate-1 transform transition-transform">
                        <div className="p-2 bg-white rounded-md shadow-lg">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-5.png" 
                            alt="Backpack Traveler" 
                            className="w-auto h-auto md:max-w-[150px] object-contain rounded-sm"
                          />
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white font-['Playfair_Display'] text-xs md:text-sm italic drop-shadow-md">
                              Tropical Haven
                            </p>
                          </div>
                        </div>
                        {/* Map Pin */}
                        <div className="absolute -bottom-10 md:-bottom-12 left-1/2 -translate-x-1/2 scale-75 md:scale-100">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-pin-1.png"
                            alt="Map Pin" 
                            className="w-8 h-8 object-contain"
                          />
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
                  
                  {/* Mobile optimized view - alternative to the detailed map above */}
                  <div className="sm:hidden mt-4">
                    <div className="grid grid-cols-3 gap-2 px-4 py-2">
                      <div className="relative">
                        <div className="p-1 bg-white rounded-md shadow-md rotate-3">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-1.png" 
                            alt="Backpack Traveler" 
                            className="w-auto h-20 object-contain rounded-sm"
                          />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 scale-50">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-pin-1.png"
                            alt="Map Pin" 
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <div className="p-1 bg-white rounded-md shadow-md -rotate-2">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-3.png" 
                            alt="Backpack Traveler" 
                            className="w-auto h-20 object-contain rounded-sm"
                          />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 scale-50">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-pin-1.png"
                            alt="Map Pin" 
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <div className="p-1 bg-white rounded-md shadow-md rotate-2">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-5.png" 
                            alt="Backpack Traveler" 
                            className="w-auto h-20 object-contain rounded-sm"
                          />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 scale-50">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-pin-1.png"
                            alt="Map Pin" 
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                      </div>
                    </div>
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