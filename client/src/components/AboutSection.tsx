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
    <section id="about" className="py-24 bg-[#f9f3e5]" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left image column */}
            <div className="w-full lg:w-1/2">
              <div className="rounded-2xl overflow-hidden">
                <img                  src="https://media.istockphoto.com/id/505221662/photo/elephants-in-river.jpg?s=1024x1024&w=is&k=20&c=6H1PzDPfOlCwJQZ8XSUQlkNKBgILDmig7RVqD9utJEY=" 
                  alt="Sigiriya Rock, Sri Lanka" 
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
              </div>
            </div>
            
            {/* Right content column */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-6">
                <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#48341c] mb-4">
                  Best Sri Lanka Tours
                </h2>
                
                <p className="font-['Raleway'] text-[#48341c] text-lg leading-relaxed">
                  Exceptional Sri Lankan tours tailored for you. We are dedicated to providing guided, local experiences that reveal the beauty and culture of our enchanting island.
                </p>
                
                <ul className="space-y-3 pt-4">
                  <li className="flex items-start">
                    <span className="text-[#0077B6] mr-3 pt-1">•</span>
                    <span className="font-['Raleway'] text-[#48341c] text-lg font-medium">Experienced Guides</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0077B6] mr-3 pt-1">•</span>
                    <span className="font-['Raleway'] text-[#48341c] text-lg font-medium">Curated Itineraries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#0077B6] mr-3 pt-1">•</span>
                    <span className="font-['Raleway'] text-[#48341c] text-lg font-medium">Personalized Service</span>
                  </li>
                </ul>
                
                <div className="flex gap-8 pt-4">
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
                  <a href="/about" className="font-['Raleway'] inline-flex items-center px-8 py-3 bg-[#0077B6] text-white hover:bg-[#0077B6]/90 rounded-lg transition-colors duration-300 font-medium">
                    Explore Our Tours
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