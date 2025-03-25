import { Link } from "wouter";

const About = () => {
  // Team members
  const teamMembers = [
    {
      name: "Sarah Williams",
      position: "Founder & CEO",
      description: "With over 15 years in luxury travel and a deep love for Sri Lanka, Sarah founded Best Sri Lanka Tours to share the island's beauty with discerning travelers.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Raj Perera",
      position: "Head of Experiences",
      description: "Born and raised in Sri Lanka, Raj brings authentic cultural insights and exclusive access to hidden gems across the island.",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Emma Chen",
      position: "Luxury Travel Designer",
      description: "With an eye for detail and luxury hospitality experience, Emma crafts bespoke journeys tailored to each client's preferences.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Michael Fernandez",
      position: "Guest Relations Director",
      description: "Michael ensures flawless experiences from initial inquiry to your return home, with 24/7 concierge support throughout your journey.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

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

  // Timeline history
  const timeline = [
    {
      year: "2010",
      title: "The Beginning",
      description: "Best Sri Lanka Tours was founded with a vision to showcase Sri Lanka's hidden treasures to luxury travelers seeking authentic experiences."
    },
    {
      year: "2013",
      title: "Expanding Experiences",
      description: "We expanded our portfolio to include exclusive wildlife safaris and wellness retreats in partnership with luxury properties."
    },
    {
      year: "2016",
      title: "Award Recognition",
      description: "Best Sri Lanka Tours received its first international recognition as 'Best Luxury Tour Operator - Sri Lanka' by Travel & Hospitality Awards."
    },
    {
      year: "2019",
      title: "Global Presence",
      description: "We established representative offices in London, New York, and Singapore to better serve our international clientele."
    },
    {
      year: "2023",
      title: "The Future",
      description: "Today, we continue to innovate and create unforgettable journeys for travelers seeking the perfect blend of luxury and authenticity."
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 bg-[#0F4C81]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1619546952812-520e98064a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Best Sri Lanka Tours Team" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0">
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-6">Our Story</h2>
              <p className="text-lg text-[#333333]/80 mb-6">Founded by travel enthusiasts with deep knowledge of Sri Lanka, Best Sri Lanka Tours was born from a passion to share the extraordinary beauty and culture of this island nation with discerning travelers.</p>
              <p className="text-lg text-[#333333]/80 mb-6">What began as a boutique operation has grown into a renowned luxury travel company, yet we've maintained our founding principles: authentic experiences, personalized service, and attention to every detail.</p>
              <p className="text-lg text-[#333333]/80 mb-8">Our team combines international luxury travel expertise with local knowledge, creating journeys that go beyond typical tourist routes to reveal the true essence of Sri Lanka.</p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <span className="text-[#0F4C81] text-4xl font-bold mb-2">10+</span>
                  <p className="text-[#333333]/70 text-center">Years of Excellence</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="text-[#0F4C81] text-4xl font-bold mb-2">500+</span>
                  <p className="text-[#333333]/70 text-center">Happy Travelers</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="text-[#0F4C81] text-4xl font-bold mb-2">100%</span>
                  <p className="text-[#333333]/70 text-center">Tailor-Made</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="text-[#0F4C81] text-4xl font-bold mb-2">24/7</span>
                  <p className="text-[#333333]/70 text-center">Concierge Support</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1619546952812-520e98064a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Best Sri Lanka Tours Team" 
                  className="rounded-lg shadow-xl" 
                />
                <div className="absolute -bottom-10 -left-10 p-6 bg-white rounded-lg shadow-lg max-w-xs hidden md:block">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-award text-[#D4AF37] text-2xl mr-4"></i>
                    <h3 className="font-['Playfair_Display'] text-lg font-semibold">Award-Winning Service</h3>
                  </div>
                  <p className="text-[#333333]/70">Recognized by Luxury Travel Awards for excellence in personalized travel experiences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Our Values</h2>
            <p className="text-lg text-[#333333]/80">These core principles guide everything we do at Best Sri Lanka Tours, from how we design our journeys to how we interact with our guests, partners, and communities.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center h-full flex flex-col">
                <div className="w-16 h-16 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mx-auto mb-6">
                  <i className={`fas ${value.icon} text-2xl text-[#0F4C81]`}></i>
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-[#333333]/70 flex-grow">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Meet Our Team</h2>
            <p className="text-lg text-[#333333]/80">Our passionate team of travel experts combines global luxury hospitality experience with deep local knowledge of Sri Lanka.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-[#F8F5F0] rounded-lg overflow-hidden shadow-lg">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-[#0F4C81] mb-3">{member.position}</p>
                  <p className="text-[#333333]/70">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-16 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Our Journey</h2>
            <p className="text-lg text-[#333333]/80">From our humble beginnings to becoming a leading luxury travel company, here's how our story has unfolded.</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#0F4C81]/20"></div>
            
            {timeline.map((item, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center mb-12 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 mb-6 md:mb-0 md:px-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <span className="inline-block bg-[#0F4C81] text-white px-3 py-1 rounded text-sm font-semibold mb-2">{item.year}</span>
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-[#333333]/70">{item.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#0F4C81] text-white flex items-center justify-center z-10">
                  <i className="fas fa-star"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">What Our Guests Say</h2>
            <p className="text-lg text-[#333333]/80">The experiences of our guests speak volumes about our commitment to excellence.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-[#F8F5F0] p-8 rounded-lg shadow-lg md:w-1/2">
              <div className="text-[#D4AF37] mb-4">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="text-[#333333]/80 mb-6 italic">"Our trip to Sri Lanka with Best Sri Lanka Tours was nothing short of magical. From the moment we landed until our departure, every detail was meticulously planned yet felt effortless. The cultural insights, exclusive experiences, and personal touches made this journey truly unforgettable."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4">
                  <div className="w-full h-full bg-[#0F4C81]/30 flex items-center justify-center text-white">J</div>
                </div>
                <div>
                  <h4 className="font-semibold">James & Emily Wilson</h4>
                  <p className="text-sm text-gray-500">Complete Sri Lanka Experience</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#F8F5F0] p-8 rounded-lg shadow-lg md:w-1/2">
              <div className="text-[#D4AF37] mb-4">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="text-[#333333]/80 mb-6 italic">"As frequent luxury travelers, we have high expectations. Best Sri Lanka Tours not only met but exceeded them at every turn. Their insider knowledge led us to experiences we would never have discovered on our own, while their attention to detail ensured seamless logistics throughout our journey."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-4">
                  <div className="w-full h-full bg-[#0F4C81]/30 flex items-center justify-center text-white">R</div>
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
      <section className="py-16 bg-[#0F4C81] relative overflow-hidden">
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
            <Link href="/contact" className="bg-white hover:bg-[#D4AF37] text-[#0F4C81] hover:text-white font-medium py-3 px-8 rounded-md transition transform hover:scale-105 inline-flex items-center">
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
