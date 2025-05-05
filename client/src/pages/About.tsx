import { Link } from "wouter";
import HeroSection from "../components/HeroSection";

const About = () => {
  // Our values
  const values = [
    {
      title: "Authentic Luxury",
      description: "We believe luxury is about meaningful experiences, not just opulence. Our journeys balance comfort with authentic cultural immersion.",
      icon: "fa-gem"
    },
    {
      title: "Sustainable Tourism",
      description: "We partner with eco-conscious properties and communities, ensuring our presence benefits local economies while protecting environments.",
      icon: "fa-leaf"
    },
    {
      title: "Personal Connection",
      description: "We build lasting relationships with our clients, taking time to understand your preferences to create truly personalized experiences.",
      icon: "fa-handshake"
    },
    {
      title: "Exceptional Service",
      description: "From your first inquiry to your return home, we provide attentive, detail-oriented service that anticipates your every need.",
      icon: "fa-star"
    }
  ];

  return (
    <main>
      {/* Hero Section with standard opacity (no custom overlay) */}
      <HeroSection
        title="About Best Sri Lanka Tours"
        description="Crafting unforgettable luxury journeys through the Pearl of the Indian Ocean since 2010."
        backgroundImage="https://res.cloudinary.com/drsjp6bqz/image/upload/v1746207237/shutterstock_1070510330_ro5cyz.jpg"
        breadcrumbItems={[{ label: "About Us" }]}
        imageTransform="scale-105"
        overlayOpacity={20}
        overlayColor="bg-[#0077B6]"
      />

      {/* Main About Section - Modern Design */}
      <section className="py-16 md:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Two column layout */}
            <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16 lg:gap-20">
              {/* Left column with large image and overlap elements */}
              <div className="w-full lg:w-1/2 relative mb-10 lg:mb-0">
                <div className="relative">
                  {/* Main image - responsive height adjustments */}
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                    <img 
                      src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1746208326/shutterstock_1068884744_1_fza0zi.jpg" 
                      alt="Traditional Sri Lankan boats" 
                      className="w-full object-cover object-center h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px]"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  
                  {/* Decorative element - small image */}
                  <div className="absolute -bottom-12 -right-12 z-20 w-40 h-40 rounded-xl overflow-hidden shadow-xl hidden lg:block border-4 border-white">
                    <img 
                      src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1746207764/shutterstock_203858371_1_kxf0jo.jpg" 
                      alt="Sri Lankan Beach" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  
                </div>
                
                {/* Stats removed as requested */}
              </div>
              
              {/* Right column with content */}
              <div className="w-full lg:w-1/2 lg:pt-12">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-secondary uppercase tracking-wider text-sm font-semibold mb-3 font-['Raleway']">Our Commitment</h4>
                    <h2 className="font-['Playfair_Display'] text-3xl md:text-[2.5rem] font-bold text-primary mb-6 leading-[1.2]">
                      Crafting Meaningful Sri Lankan Journeys Since 2010
                    </h2>
                    
                    <div className="w-20 h-1 bg-secondary mb-8"></div>
                    
                    <p className="font-['Raleway'] text-muted-foreground text-lg leading-relaxed mb-6">
                      At Best Sri Lanka Tours, we believe travel should transform you. Our handcrafted journeys reveal the true essence of Sri Lanka — connecting you with authentic experiences that can't be found in guidebooks.
                    </p>
                    
                    <p className="font-['Raleway'] text-muted-foreground text-lg leading-relaxed">
                      What sets us apart is our deep local knowledge combined with luxury service. Each itinerary is thoughtfully designed to balance iconic landmarks with hidden gems, cultural immersion with relaxation, all while maintaining the highest standards of comfort and personalization.
                    </p>
                  </div>
                  
                  {/* Feature boxes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-300">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-primary mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16.5 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"></path>
                          <path d="M7.5 19a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"></path>
                          <path d="M14 2c-1.047.552-1.5 1.71-1.5 3.5s.453 2.948 1.5 3.5c1.047-.552 1.5-1.71 1.5-3.5S15.047 2.552 14 2Z"></path>
                          <path d="M5 8c0 8.334 5.667 14 12 14 0-8.334-5.667-14-12-14Z"></path>
                        </svg>
                      </div>
                      <h3 className="font-['Playfair_Display'] text-xl font-semibold text-primary mb-2">Local Expertise</h3>
                      <p className="text-muted-foreground">Our guides offer insider knowledge and personal connections that transform good trips into unforgettable journeys.</p>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-300">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-primary mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </div>
                      <h3 className="font-['Playfair_Display'] text-xl font-semibold text-primary mb-2">Personalized Care</h3>
                      <p className="text-muted-foreground">From meticulous planning to 24/7 support during your journey, we ensure every detail is perfectly handled.</p>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <a href="/tours" className="font-['Raleway'] inline-flex items-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors duration-300 font-medium shadow-md">
                      Explore Our Journeys
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

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-primary mb-4">Our Values</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-['Raleway']">
              These core principles guide everything we do at Best Sri Lanka Tours, from how we design our journeys to how we interact with our guests, partners, and communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center h-full flex flex-col hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6 text-primary">
                  {value.icon === 'fa-gem' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="16 2 22 8.5 22 16 16 22 8 22 2 16 2 8.5 8 2 16 2"></polygon><line x1="12" y1="22" x2="12" y2="2"></line><path d="M12 2 2 8.5"></path><path d="M12 2 22 8.5"></path><line x1="2" y1="16" x2="12" y2="8.5"></line><line x1="22" y1="16" x2="12" y2="8.5"></line></svg>
                  )}
                  {value.icon === 'fa-leaf' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8.8 5.5 5.5 0 0 0 5 .8c2.54-.987 3.77-2.2 5.3-3.7C22.87 15.2 22 8.71 22 8.5c0 0-7.262-.02-8.04 0-2.078.055-4.03.534-5.56 1.9-1.522 1.36-2.322 3.41-2.4 6.6.02-4 1.07-6.8 3.9-8.6s6.7-1.9 10 0c-1.586-1.526-4.4-2.274-6.9-2.2-2.5.074-5.02.554-7.3 3-2.28 2.446-2.76 5.78-2.7 8.6v4.2Z"></path></svg>
                  )}
                  {value.icon === 'fa-handshake' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 10.5 14 8l5.5-5.5C20.5 1.5 22 1.5 23 2.5S24.5 5 23.5 6L18 11.5"></path><path d="m14 8-1 1"></path><path d="M11.499 14.5 7 10l1-1"></path><path d="M9 13 4.5 17.5c-1 1-1 2.5 0 3.5s2.5 1 3.5 0l9-9"></path><path d="m14.5 8.5-6 6"></path><path d="M18 2 6 14"></path><path d="m19 3-5.5 5.5"></path><path d="m14.5 11.5 2 2"></path></svg>
                  )}
                  {value.icon === 'fa-star' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  )}
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-primary mb-3">{value.title}</h3>
                <p className="text-muted-foreground flex-grow font-['Raleway']">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-primary">
        <div className="absolute inset-0 z-0" style={{ opacity: 0.8 }}>
          <img 
            src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744007986/activities/ella-nine-arch-train.jpg" 
            alt="Sri Lanka Coastline" 
            className="w-full h-full object-cover object-center" 
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
              Ready to Experience Sri Lanka?
            </h2>
            <p className="text-xl text-white font-medium mb-8 max-w-2xl mx-auto font-['Raleway'] drop-shadow-md">
              Let us craft your perfect journey through the Pearl of the Indian Ocean — tailor-made just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/tours" 
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary hover:bg-gray-100 rounded-lg transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
              >
                Browse Tour Packages
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg transition-colors duration-300 font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;