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
    <section id="about" className="py-20 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile version - Text first, then map - now top-aligned */}
        <div className="lg:hidden mb-10 mt-0 pt-0">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-primary mb-6 text-center">About Best Sri Lanka Tours</h2>
          <p className="text-lg text-foreground/80 mb-6">
            Bundled with an awe-inspiring set of destination experiences, we provide you with ready-to-go and fully flexible ways to explore the island's extraordinary beauty and culture.
          </p>
          <p className="text-lg text-foreground/80 mb-8">
            Our team of expert travel designers, local guides, and hospitality professionals work together to craft unforgettable experiences tailored to your preferences and interests.
          </p>
          
          <div className="text-center mb-8">
            <a href="/about" className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition inline-flex items-center">
              Learn More About Us
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start">
          {/* Desktop version - left column - now top-aligned */}
          <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0 hidden lg:block pt-0">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-primary mb-6">About Best Sri Lanka Tours</h2>
            <p className="text-lg text-foreground/80 mb-6">
              Bundled with an awe-inspiring set of destination experiences, we provide you with ready-to-go and fully flexible ways to explore the island's extraordinary beauty and culture.
            </p>
            <p className="text-lg text-foreground/80 mb-12">
              Our team of expert travel designers, local guides, and hospitality professionals work together to craft unforgettable experiences tailored to your preferences and interests.
            </p>
            
            <a href="/about" className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-full transition inline-flex items-center">
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
              <div className="relative max-w-[50%] mx-auto mt-8 md:mt-0">
                {/* Map background with light opacity - full map but smaller size */}
                <div className="relative py-4">
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744127782/map-sri-lanka_vb7cpr.png" 
                    alt="Sri Lanka Map" 
                    className="w-full h-auto opacity-[0.35]"
                  />
                  
                  {/* Mobile adjustments for image positioning */}
                  <div className="md:hidden absolute inset-0 flex items-center justify-center">
                    <p className="font-['Playfair_Display'] text-lg text-primary font-medium bg-background/70 px-3 py-1 rounded-full">
                      Discover Sri Lanka's Treasures
                    </p>
                  </div>
                  
                  {/* Desktop & tablet images - hidden on small mobile */}
                  <div className="hidden sm:block">
                    {/* First image */}
                    <div className="absolute top-[45%] left-[-20%]">
                      <div className="relative rotate-3 transform transition-transform">
                        <div className="p-0 bg-card rounded-md shadow-lg">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-1.png" 
                            alt="Backpack Traveler" 
                            className="w-auto h-auto object-contain rounded-sm"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Second image */}
                    <div className="absolute top-[4%] right-[-32%]">
                      <div className="relative -rotate-2 transform transition-transform">
                        <div className="p-0 bg-card rounded-md shadow-lg">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-3.png" 
                            alt="Backpack Traveler" 
                            className="w-auto h-auto object-contain rounded-sm"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Third image - Hidden for now */}
                    <div className="absolute bottom-[15%] right-[35%] hidden">
                      <div className="relative rotate-1 transform transition-transform">
                        <div className="p-0 bg-card rounded-md shadow-lg">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-5.png" 
                            alt="Backpack Traveler" 
                            className="w-auto h-auto object-contain rounded-sm"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Map Pins - Now positioned independently */}
                    {/* Pin 1 */}
                    <div className="absolute top-[55%] left-[30%]">
                      <img 
                        src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-pin-1.png"
                        alt="Map Pin" 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    
                    {/* Pin 2 */}
                    <div className="absolute top-[35%] left-[45%]">
                      <img 
                        src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-pin-1.png"
                        alt="Map Pin" 
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    


                  </div>
                  
                  {/* Mobile optimized view - correct positioning */}
                  <div className="sm:hidden mt-8">
                    <div className="mx-auto relative h-[450px]">
                      {/* Sri Lanka Map for Mobile - explicitly positioned */}
                      <div className="absolute inset-0 top-0 left-0 w-full">
                        <img 
                          src="/images/sri-lanka-map.svg" 
                          alt="Sri Lanka Map" 
                          className="w-full h-auto object-contain opacity-50"
                        />
                      </div>
                    
                      {/* First Image - Positioned on Map */}
                      <div className="absolute top-[120px] left-1/2 -translate-x-1/2 z-10 w-3/4">
                        <div className="p-0 bg-card rounded-md shadow-md">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-1.png" 
                            alt="Backpack Traveler" 
                            className="w-full h-auto object-contain rounded-sm"
                          />
                        </div>
                        {/* Pin below this image */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-pin-1.png"
                            alt="Map Pin" 
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                      </div>
                      
                      {/* Second Image - Positioned on Map */}
                      <div className="absolute top-[260px] left-1/2 -translate-x-1/2 z-10 w-3/4">
                        <div className="p-0 bg-card rounded-md shadow-md">
                          <img 
                            src="https://backpacktraveler.qodeinteractive.com/wp-content/uploads/2018/09/landing-mini-slider-image-3.png" 
                            alt="Backpack Traveler" 
                            className="w-full h-auto object-contain rounded-sm"
                          />
                        </div>
                        {/* Pin below this image */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
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