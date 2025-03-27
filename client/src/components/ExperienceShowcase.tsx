const ExperienceShowcase = () => {
  const experiences = [
    {
      icon: "fa-concierge-bell",
      color: "tropical-green",
      title: "Personal Concierge",
      description: "Dedicated travel consultant available 24/7 throughout your journey"
    },
    {
      icon: "fa-car",
      color: "ocean-blue",
      title: "Private Transportation",
      description: "Luxury vehicles with professional chauffeurs for seamless travel"
    },
    {
      icon: "fa-hotel",
      color: "golden-sand",
      title: "Exclusive Accommodations",
      description: "Hand-selected luxury hotels, boutique properties, and private villas"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-6">Curated Luxury Experiences</h2>
            <p className="text-lg text-[#333333]/80 mb-8">Each journey is crafted with meticulous attention to detail, offering you exclusive access to Sri Lanka's hidden treasures and authentic cultural encounters.</p>
            
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`w-12 h-12 rounded-full ${experience.color === 'ocean-blue' ? 'bg-[#0F4C81]/10' : experience.color === 'tropical-green' ? 'bg-[#2E8B57]/10' : 'bg-[#D4AF37]/10'} flex items-center justify-center`}>
                      <i className={`fas ${experience.icon} ${experience.color === 'ocean-blue' ? 'text-[#0F4C81]' : experience.color === 'tropical-green' ? 'text-[#2E8B57]' : 'text-[#D4AF37]'}`}></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">{experience.title}</h3>
                    <p className="text-[#333333]/70">{experience.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <a href="#" className="inline-flex items-center text-[#0F4C81] border-b-2 border-[#0F4C81] font-medium hover:text-[#2E8B57] hover:border-[#2E8B57] transition mt-8">
              Discover All Experiences
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden shadow-lg h-48 md:h-64">
                <img src="https://images.unsplash.com/photo-1631631480669-535cc43f2327?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Private dining experience" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg h-64 md:h-80">
                <img src="https://images.unsplash.com/photo-1622037022824-0c71d511ef3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Luxury spa treatment" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="rounded-lg overflow-hidden shadow-lg h-64 md:h-80">
                <img src="https://images.unsplash.com/photo-1623053807566-3da809d5d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Private yacht experience" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg h-48 md:h-64">
                <img src="https://images.unsplash.com/photo-1620977861760-f36307a4fb01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Cultural dance performance" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceShowcase;
