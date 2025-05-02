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
    <section id="about" className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile-only heading */}
        <div className="text-center mb-12 lg:hidden">
          <h3 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#0077B6] mb-4">Creating unforgettable luxury journeys through Sri Lanka since 2010</h3>
          <div className="w-16 h-1 bg-[#F6E27F] mx-auto mb-5"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Content container with card design */}
          <div className="grid grid-cols-1 lg:grid-cols-12 shadow-xl rounded-xl overflow-hidden">
            {/* Left column - Large image */}
            <div className="lg:col-span-5 h-[300px] sm:h-[400px] lg:h-[600px]">
              <img 
                src="https://media.istockphoto.com/id/2164082654/photo/aerial-view-of-idyllic-beach-on-sri-lanka-at-golden-sunset.jpg?s=1024x1024&w=is&k=20&c=_6X2PZDf0QtVR31daZvvqfITcN5HBqQw0y3RBkGCKTk=" 
                alt="Beautiful Sri Lankan beach" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-y-0 left-0 lg:w-5/12 w-full bg-gradient-to-r from-[#004E64]/90 to-transparent lg:block hidden"></div>
              <div className="absolute top-0 left-0 w-full h-full lg:hidden bg-gradient-to-t from-[#004E64]/90 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white lg:max-w-xs w-full lg:block hidden">
                <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-2">Our Passion</h3>
                <p className="text-white/90 text-lg">Sharing the beauty and culture of Sri Lanka</p>
              </div>
            </div>
            
            {/* Right column - Content */}
            <div className="lg:col-span-7 bg-white p-8 lg:p-12">
              {/* Desktop heading - Only visible on larger screens */}
              <div className="hidden lg:block mb-8">
                <h3 className="font-['Playfair_Display'] text-4xl font-bold text-[#0077B6] mb-4">Creating unforgettable luxury journeys through Sri Lanka since 2010</h3>
                <div className="w-16 h-1 bg-[#F6E27F] mb-5"></div>
              </div>
              
              {/* Mobile-only intro section */}
              <div className="lg:hidden mb-6">
                <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-2 text-[#0077B6]">Our Passion</h3>
                <p className="text-gray-700">Sharing the beauty and culture of Sri Lanka</p>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0077B6] mb-3">Luxury Travel Experts</h3>
                  <p className="text-gray-700 text-lg">
                    Bundled with an awe-inspiring set of destination experiences, we provide you with ready-to-go and fully flexible ways to explore the island's extraordinary beauty and culture.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0077B6] mb-3">Personalized Experiences</h3>
                  <p className="text-gray-700 text-lg">
                    Our team of expert travel designers, local guides, and hospitality professionals work together to craft unforgettable experiences tailored to your preferences and interests.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div className="bg-[#0077B6]/5 p-5 rounded-lg flex flex-col items-center">
                    <span className="text-[#0077B6] text-4xl font-bold">10+</span>
                    <p className="text-gray-700 text-center">Years of Excellence</p>
                  </div>
                  
                  <div className="bg-[#0077B6]/5 p-5 rounded-lg flex flex-col items-center">
                    <span className="text-[#0077B6] text-4xl font-bold">500+</span>
                    <p className="text-gray-700 text-center">Happy Travelers</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <a href="/about" className="inline-flex items-center px-8 py-3 bg-[#0077B6] text-white hover:bg-[#0077B6]/90 rounded-lg transition-colors duration-300 font-medium shadow-md hover:shadow-lg">
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
      </div>
    </section>
  );
};

export default AboutSection;