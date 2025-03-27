const Highlights = () => {
  const highlights = [
    {
      icon: "fa-umbrella-beach",
      color: "ocean-blue",
      title: "Pristine Beaches",
      description: "Discover secluded beaches with crystal-clear waters and luxurious beachfront accommodations."
    },
    {
      icon: "fa-landmark",
      color: "tropical-green",
      title: "Cultural Immersion",
      description: "Experience ancient temples, traditional ceremonies, and UNESCO world heritage sites."
    },
    {
      icon: "fa-utensils",
      color: "golden-sand",
      title: "Culinary Journeys",
      description: "Savor authentic Sri Lankan cuisine with private chefs and exclusive dining experiences."
    }
  ];

  return (
    <section id="highlights" className="py-24 bg-gradient-to-b from-[#F8F5F0] to-white relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37]/30 via-[#D4AF37] to-[#D4AF37]/30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 bg-[#0F4C81]/10 text-[#0F4C81] text-sm font-semibold rounded-full mb-3">LUXURY EXPERIENCES</span>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold text-[#0F4C81] mb-6 relative">
            Experience Sri Lanka's Finest
            <span className="block h-1 w-40 bg-[#D4AF37] mx-auto mt-6"></span>
          </h2>
          <p className="text-lg md:text-xl text-[#333333] leading-relaxed">
            Discover our handcrafted experiences that showcase the best of Sri Lanka's natural beauty, 
            cultural heritage, and luxurious accommodations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {highlights.map((highlight, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border-t-4 border-t-transparent hover:border-t-[#D4AF37] group"
            >
              <div className={`w-24 h-24 rounded-full ${
                highlight.color === 'ocean-blue' 
                  ? 'bg-[#0F4C81]/10 group-hover:bg-[#0F4C81]/20' 
                  : highlight.color === 'tropical-green' 
                    ? 'bg-[#2E8B57]/10 group-hover:bg-[#2E8B57]/20' 
                    : 'bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20'
              } flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform`}>
                <i className={`fas ${highlight.icon} text-4xl ${
                  highlight.color === 'ocean-blue' 
                    ? 'text-[#0F4C81]' 
                    : highlight.color === 'tropical-green' 
                      ? 'text-[#2E8B57]' 
                      : 'text-[#D4AF37]'
                }`}></i>
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4">{highlight.title}</h3>
              <p className="text-[#333333]/80 text-lg">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
