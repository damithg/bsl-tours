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
    <section id="highlights" className="py-20 bg-[#F8F5F0]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Experience Sri Lanka's Finest</h2>
          <p className="text-lg text-[#333333]/80">Discover our handcrafted experiences that showcase the best of Sri Lanka's natural beauty, cultural heritage, and luxurious accommodations.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className={`w-20 h-20 rounded-full ${highlight.color === 'ocean-blue' ? 'bg-[#0F4C81]/10' : highlight.color === 'tropical-green' ? 'bg-[#2E8B57]/10' : 'bg-[#D4AF37]/10'} flex items-center justify-center mb-6`}>
                <i className={`fas ${highlight.icon} text-3xl ${highlight.color === 'ocean-blue' ? 'text-[#0F4C81]' : highlight.color === 'tropical-green' ? 'text-[#2E8B57]' : 'text-[#D4AF37]'}`}></i>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3">{highlight.title}</h3>
              <p className="text-[#333333]/70">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
