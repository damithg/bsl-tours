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
    <section id="about" className="py-16 bg-gradient-to-b from-white to-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#0077B6] mb-4">About Us</h2>
          <div className="w-16 h-1 bg-[#F6E27F] mx-auto mb-5"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Creating unforgettable luxury journeys through Sri Lanka since 2010</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Image */}
          <div className="order-2 lg:order-1">
            <div className="relative h-[400px] overflow-hidden rounded-xl shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1590064661010-d542a64da71f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Beautiful Sri Lankan beach" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#004E64]/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-1">Our Passion</h3>
                <p className="text-white/90">Sharing the beauty and culture of Sri Lanka</p>
              </div>
            </div>
          </div>
          
          {/* Right column - Content */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              <div>
                <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0077B6] mb-3">Luxury Travel Experts</h3>
                <p className="text-gray-700">
                  Bundled with an awe-inspiring set of destination experiences, we provide you with ready-to-go and fully flexible ways to explore the island's extraordinary beauty and culture.
                </p>
              </div>
              
              <div>
                <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0077B6] mb-3">Personalized Experiences</h3>
                <p className="text-gray-700">
                  Our team of expert travel designers, local guides, and hospitality professionals work together to craft unforgettable experiences tailored to your preferences and interests.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white p-4 rounded-lg flex flex-col items-center shadow-sm">
                  <span className="text-[#0077B6] text-3xl font-bold">10+</span>
                  <p className="text-gray-600 text-center text-sm">Years of Excellence</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg flex flex-col items-center shadow-sm">
                  <span className="text-[#0077B6] text-3xl font-bold">500+</span>
                  <p className="text-gray-600 text-center text-sm">Happy Travelers</p>
                </div>
              </div>
              
              <div className="pt-4">
                <a href="/about" className="inline-flex items-center px-6 py-3 bg-[#0077B6] text-white hover:bg-[#0077B6]/90 rounded-lg transition-colors duration-300 font-medium shadow-md hover:shadow-lg">
                  Learn More About Us
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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