import { Link } from "wouter";

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
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 bg-[#0077B6]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1619546952812-520e98064a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Best Sri Lanka Tours Team" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex text-white/90 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-white">
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  Home
                </Link>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white/60 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  <span className="text-sm font-medium text-white/80">
                    About Us
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-6">
              About Best Sri Lanka Tours
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Crafting unforgettable luxury journeys through the Pearl of the Indian Ocean since 2010.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0077B6] mb-6">Our Story</h2>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">Founded by travel enthusiasts with deep knowledge of Sri Lanka, Best Sri Lanka Tours was born from a passion to share the extraordinary beauty and culture of this island nation with discerning travelers.</p>
                
                <p className="mb-4">What began as a boutique operation has grown into a renowned luxury travel company, yet we've maintained our founding principles: authentic experiences, personalized service, and attention to every detail.</p>
                
                <p>Our team combines international luxury travel expertise with local knowledge, creating journeys that go beyond typical tourist routes to reveal the true essence of Sri Lanka.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center shadow-sm">
                  <span className="text-[#0077B6] text-3xl lg:text-4xl font-bold">10+</span>
                  <p className="text-gray-600 text-center text-sm lg:text-base">Years of Excellence</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center shadow-sm">
                  <span className="text-[#0077B6] text-3xl lg:text-4xl font-bold">500+</span>
                  <p className="text-gray-600 text-center text-sm lg:text-base">Happy Travelers</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center shadow-sm">
                  <span className="text-[#0077B6] text-3xl lg:text-4xl font-bold">100%</span>
                  <p className="text-gray-600 text-center text-sm lg:text-base">Tailor-Made</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center shadow-sm">
                  <span className="text-[#0077B6] text-3xl lg:text-4xl font-bold">24/7</span>
                  <p className="text-gray-600 text-center text-sm lg:text-base">Concierge Support</p>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/tours" className="inline-flex items-center px-6 py-3 border border-[#0077B6] text-[#0077B6] bg-transparent hover:bg-[#0077B6] hover:text-white rounded-full transition-colors duration-300 font-medium">
                  Explore Our Tours
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative h-[400px] lg:h-[600px] w-full">
                <img 
                  src="https://images.unsplash.com/photo-1551774465-37633a57a1d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Scenic Sri Lanka coastline" 
                  className="w-full h-full object-cover rounded-xl shadow-2xl"
                />
                
                <div className="absolute -bottom-6 -left-6 p-5 bg-white rounded-lg shadow-lg max-w-xs hidden md:block">
                  <div className="flex items-center mb-3">
                    <div className="bg-[#F6E27F]/20 p-2 rounded-full mr-3 text-[#F6E27F]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9Z"></path>
                        <path d="m14 4 2 5h-8l2-5"></path>
                      </svg>
                    </div>
                    <h3 className="font-['Playfair_Display'] text-lg font-semibold">Award-Winning Service</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Recognized by Luxury Travel Awards for excellence in personalized travel experiences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0077B6] mb-4">Our Values</h2>
            <p className="text-lg text-gray-700">These core principles guide everything we do at Best Sri Lanka Tours, from how we design our journeys to how we interact with our guests, partners, and communities.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center h-full flex flex-col hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-[#F6E27F]/20 flex items-center justify-center mx-auto mb-6 text-[#0077B6]">
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
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 flex-grow">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0077B6] mb-4">What Our Guests Say</h2>
            <p className="text-lg text-gray-700">The experiences of our guests speak volumes about our commitment to excellence.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-gray-50 p-8 rounded-lg shadow-md md:w-1/2 hover:shadow-lg transition-shadow duration-300">
              <div className="text-[#F6E27F] mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"Our trip to Sri Lanka with Best Sri Lanka Tours was nothing short of magical. From the moment we landed until our departure, every detail was meticulously planned yet felt effortless. The cultural insights, exclusive experiences, and personal touches made this journey truly unforgettable."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#0077B6]/10 mr-4">
                  <div className="w-full h-full flex items-center justify-center text-[#0077B6] font-semibold">J</div>
                </div>
                <div>
                  <h4 className="font-semibold">James & Emily Wilson</h4>
                  <p className="text-sm text-gray-500">Complete Sri Lanka Experience</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md md:w-1/2 hover:shadow-lg transition-shadow duration-300">
              <div className="text-[#F6E27F] mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"As frequent luxury travelers, we have high expectations. Best Sri Lanka Tours not only met but exceeded them at every turn. Their insider knowledge led us to experiences we would never have discovered on our own, while their attention to detail ensured seamless logistics throughout our journey."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#0077B6]/10 mr-4">
                  <div className="w-full h-full flex items-center justify-center text-[#0077B6] font-semibold">R</div>
                </div>
                <div>
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <p className="text-sm text-gray-500">Cultural Triangle Tour</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#0077B6] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1561100344-0cce8621ca6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Sri Lanka Background" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-6">
              Let's Create Your Sri Lankan Journey
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Our team is ready to craft a personalized luxury experience that reveals the true essence of Sri Lanka.
            </p>
            <Link href="/contact" className="bg-white hover:bg-[#F6E27F] text-[#0077B6] hover:text-[#0077B6] font-medium py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg inline-flex items-center">
              Contact Our Experts
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
