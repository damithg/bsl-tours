import React from 'react';

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
    <section id="highlights" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stylized header with decorative elements */}
        <div className="relative text-center mb-20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            {/* First decorative image */}
            <div className="w-56 h-[70px] rounded-sm overflow-hidden bg-[#0F4C81] flex items-center justify-center mb-2 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
                alt="" 
                className="w-full h-full object-cover opacity-50"
              />
            </div>
            
            {/* Experience text */}
            <div className="flex flex-col">
              <h3 className="text-xl md:text-2xl font-['Playfair_Display'] font-bold text-[#0F4C81]">
                Experience
              </h3>
              <h3 className="text-xl md:text-2xl font-['Playfair_Display'] font-bold text-[#0F4C81]">
                the beauty
              </h3>
              <h3 className="text-xl md:text-2xl font-['Playfair_Display'] font-bold text-[#0F4C81]">
                of
              </h3>
            </div>
            
            {/* Second decorative image - wider */}
            <div className="w-80 h-[70px] rounded-sm overflow-hidden bg-[#D4AF37] flex items-center justify-center mb-2 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
                alt="" 
                className="w-full h-full object-cover opacity-50"
              />
            </div>
            
            {/* Sri Lanka text */}
            <div className="flex flex-col">
              <h3 className="text-xl md:text-2xl font-['Playfair_Display'] font-bold text-[#0F4C81]">
                Sri Lanka
              </h3>
              <h3 className="text-xl md:text-2xl font-['Playfair_Display'] font-bold text-[#0F4C81]">
                with us
              </h3>
            </div>
            
            {/* Third decorative image */}
            <div className="w-56 h-[70px] rounded-sm overflow-hidden bg-[#2E8B57] flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1552465011-b4e21f78cb59?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
                alt="" 
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          </div>
          
          {/* Subheading */}
          <div className="mt-10 max-w-3xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold text-[#0F4C81] mb-6">
              Unforgettable
            </h2>
            <p className="text-lg md:text-xl text-[#333333]/80 mb-6">
              Discover our handcrafted experiences that showcase the best of Sri Lanka's natural beauty, 
              cultural heritage, and luxurious accommodations.
            </p>
            {/* Gold gradient separator */}
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37] to-[#D4AF37]/40 mx-auto"></div>
          </div>
        </div>
        
        {/* Highlights section title */}
        <div className="text-center mb-14">
          <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#0F4C81]">
            the best Experience in Sri Lanka
          </h3>
          <a href="/tour-packages" className="inline-block mt-4 text-[#0F4C81] hover:text-[#D4AF37] transition-colors font-semibold">
            View all
          </a>
        </div>
        
        {/* Highlights cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {highlights.map((highlight, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-lg shadow-lg group"
            >
              {/* Card background image with gradient overlay */}
              <div className="relative h-96 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <img 
                  src={`https://source.unsplash.com/random/600x800/?srilanka,${highlight.title.toLowerCase().replace(' ', ',')}`}
                  alt={highlight.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Card content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <div className={`w-14 h-14 rounded-full ${
                  highlight.color === 'ocean-blue' ? 'bg-[#0F4C81]' : 
                  highlight.color === 'tropical-green' ? 'bg-[#2E8B57]' : 
                  'bg-[#D4AF37]'
                } flex items-center justify-center mb-3 shadow-lg`}>
                  <i className={`fas ${highlight.icon} text-xl text-white`}></i>
                </div>
                
                <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-2">{highlight.title}</h3>
                <p className="text-white/90 mb-6">{highlight.description}</p>
                
                <a 
                  href={`/experiences/${highlight.title.toLowerCase().replace(' ', '-')}`}
                  className="inline-block py-2 px-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full transition-all"
                >
                  Discover More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
