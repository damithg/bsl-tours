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
    <section id="about" className="py-28 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left image column */}
            <div className="w-full lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1746208326/shutterstock_1068884744_1_fza0zi.jpg" 
                  alt="Sri Lanka Boat Tour" 
                  className="w-full h-auto object-cover aspect-[4/5] transform scale-105 hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            
            {/* Right content column */}
            <div className="w-full lg:w-1/2">
              <div className="space-y-7">
                <h2 className="font-['Playfair_Display'] text-2xl md:text-[2.25rem] font-bold text-primary mb-8 leading-[1.3]">
                  Sri Lanka, Beyond the Guidebook
                </h2>
                
                <p className="font-['Raleway'] text-muted-foreground text-lg leading-relaxed">
                  At Best Sri Lanka Tours, we believe travel should be more than ticking off destinations — it should be about connection, culture, and unforgettable moments.
                </p>
                
                <p className="font-['Raleway'] text-muted-foreground text-lg leading-relaxed">
                  Our passionate local team curates immersive journeys that reveal the true essence of Sri Lanka — from ancient temples and lush jungles to golden beaches and vibrant village life. Every experience is crafted with care, tailored to your interests, and guided by people who call this island home.
                </p>
                
                <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-primary mb-5">
                  Why Choose Us:
                </h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-3 pt-1">🧭</span>
                    <span className="font-['Raleway'] text-muted-foreground text-lg font-medium">Expert Local Guides – Sharing personal stories, hidden gems, and real insights.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 pt-1">📜</span>
                    <span className="font-['Raleway'] text-muted-foreground text-lg font-medium">Handpicked Itineraries – Balanced blends of adventure, culture, and relaxation.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 pt-1">🌴</span>
                    <span className="font-['Raleway'] text-muted-foreground text-lg font-medium">Tailored Travel Planning – Custom journeys designed around you.</span>
                  </li>
                </ul>
                
                <div className="pt-6">
                  <a href="/tours" className="font-['Raleway'] inline-flex items-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors duration-300 font-medium">
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