const AboutSection = () => {
  const stats = [
    { value: "15+", label: "Years of Excellence" },
    { value: "1000+", label: "Happy Travelers" },
    { value: "100%", label: "Tailor-Made" },
    { value: "24/7", label: "Concierge Support" }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0 order-2 lg:order-1">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-6">About Best Sri Lanka Tours</h2>
            <p className="text-lg text-[#333333]/80 mb-6">Founded by travel enthusiasts with deep knowledge of Sri Lanka, we specialize in creating bespoke luxury journeys that showcase the island's extraordinary beauty and culture.</p>
            <p className="text-lg text-[#333333]/80 mb-8">Our team of expert travel designers, local guides, and hospitality professionals work together to craft unforgettable experiences tailored to your preferences and interests.</p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-[#0F4C81] text-4xl font-bold mb-2">{stat.value}</span>
                  <p className="text-[#333333]/70 text-center">{stat.label}</p>
                </div>
              ))}
            </div>
            
            <a href="/about" className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition inline-flex items-center">
              Learn More About Us
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
          
          <div className="lg:w-1/2 order-1 lg:order-2 mb-10 lg:mb-0">
            <div className="relative">
              <img 
                src="https://bestsrilankatours.com/wp-content/uploads/2020/02/tea-plantation-about-us.jpg" 
                alt="Best Sri Lanka Tours Team" 
                className="rounded-lg shadow-xl" 
              />
              <div className="absolute -bottom-10 -left-10 p-6 bg-white rounded-lg shadow-lg max-w-xs hidden md:block">
                <div className="flex items-center mb-4">
                  <i className="fas fa-award text-[#D4AF37] text-2xl mr-4"></i>
                  <h3 className="font-['Playfair_Display'] text-lg font-semibold">Award-Winning Service</h3>
                </div>
                <p className="text-[#333333]/70">Recognized for excellence in personalized Sri Lankan travel experiences.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;