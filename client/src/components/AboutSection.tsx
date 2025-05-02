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
    <section id="about" className="py-24 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left image column */}
            <div className="w-full lg:w-1/2">
              <div className="rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1586861254912-511bfed4a46a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Sigiriya Rock, Sri Lanka" 
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
              </div>
            </div>
            
            {/* Right content column */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-5 -mt-4">
                <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#48341c] mb-4">
                  Discover the Soul of Sri Lanka with Expertly Crafted Journeys
                </h2>
                
                <p className="font-['Raleway'] text-[#48341c] text-lg leading-relaxed">
                  At Best Sri Lanka Tours, we specialize in creating unforgettable travel experiences across the island's most breathtaking destinations. Whether you're seeking ancient temples, golden beaches, lush tea plantations, or vibrant local culture, our guided tours are designed to immerse you in the authentic beauty of Sri Lanka.
                </p>
                
                <p className="font-['Raleway'] text-[#48341c] text-lg leading-relaxed mt-3">
                  Our passionate local team ensures every journey is personalized, seamless, and filled with meaningful moments that go beyond the ordinary.
                </p>
                
                <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#0077B6] mt-6 mb-3">
                  Why Travel with Us:
                </h3>
                
                <ul className="space-y-4 pt-1">
                  <li className="flex items-start">
                    <span className="text-[#0077B6] mr-3 pt-1">🧭</span>
                    <span className="font-['Raleway'] text-[#48341c] text-lg font-medium">Experienced Local Guides – Knowledgeable, friendly, and dedicated to sharing the heart of Sri Lanka.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0077B6] mr-3 pt-1">📜</span>
                    <span className="font-['Raleway'] text-[#48341c] text-lg font-medium">Curated Itineraries – Thoughtfully planned routes that balance adventure, relaxation, and cultural discovery.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0077B6] mr-3 pt-1">🌴</span>
                    <span className="font-['Raleway'] text-[#48341c] text-lg font-medium">Tailored Travel Experiences – Flexible and fully customizable tours based on your interests and pace.</span>
                  </li>
                </ul>
                
                <div className="flex gap-8 pt-6">
                  <div className="flex flex-col">
                    <span className="font-['Playfair_Display'] text-[#0077B6] text-4xl font-bold">10+</span>
                    <p className="font-['Raleway'] text-[#48341c]">Years of Excellence</p>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="font-['Playfair_Display'] text-[#0077B6] text-4xl font-bold">500+</span>
                    <p className="font-['Raleway'] text-[#48341c]">Happy Travelers</p>
                  </div>
                </div>
                
                <div className="pt-8">
                  <a href="/tours" className="font-['Raleway'] inline-flex items-center px-8 py-3 bg-[#0077B6] text-white hover:bg-[#0077B6]/90 rounded-lg transition-colors duration-300 font-medium">
                    Browse Our Tour Packages
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