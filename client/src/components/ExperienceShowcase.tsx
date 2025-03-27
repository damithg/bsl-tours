import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const ExperienceShowcase = () => {
  const experiences = [
    {
      icon: "fa-concierge-bell",
      color: "gold",
      title: "Personal Concierge",
      description: "Dedicated travel consultant available 24/7 throughout your journey",
      imageUrl: "/images/experiences/personal-concierge.jpg",
      altImage: "https://images.unsplash.com/photo-1631631480669-535cc43f2327?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: "fa-car",
      color: "blue",
      title: "Private Transportation",
      description: "Luxury vehicles with professional chauffeurs for seamless travel",
      imageUrl: "/images/experiences/private-transportation.jpg",
      altImage: "https://images.unsplash.com/photo-1622037022824-0c71d511ef3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: "fa-hotel",
      color: "teal",
      title: "Exclusive Accommodations",
      description: "Hand-selected luxury hotels, boutique properties, and private villas",
      imageUrl: "/images/experiences/luxury-accommodation.jpg",
      altImage: "https://images.unsplash.com/photo-1623053807566-3da809d5d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: "fa-compass",
      color: "cyan",
      title: "Guided Explorations",
      description: "Expert local guides revealing hidden gems and authentic experiences",
      imageUrl: "/images/experiences/guided-exploration.jpg",
      altImage: "https://images.unsplash.com/photo-1620977861760-f36307a4fb01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading with Gold Accent */}
        <div className="text-center mb-16 relative">
          <div className="inline-block">
            <span className="text-sm uppercase tracking-wider text-[#D4AF37] font-semibold mb-2 block">
              Experience Sri Lanka's Finest
            </span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#103556] relative z-10">
              Curated Luxury Experiences
            </h2>
            {/* Gold decorative element */}
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37] to-[#D4AF37]/40 mx-auto mt-5"></div>
          </div>
        </div>
        
        {/* Description */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-lg text-[#333333]/80">
            Each journey is crafted with meticulous attention to detail, offering you exclusive access to Sri Lanka's hidden treasures and authentic cultural encounters.
          </p>
        </div>
        
        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((experience, index) => (
            <div 
              key={index} 
              className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
            >
              {/* Card Image */}
              <div className="h-64 w-full overflow-hidden">
                <img 
                  src={experience.imageUrl || experience.altImage} 
                  alt={experience.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  onError={(e) => {
                    // Fallback to alternative image if the primary image doesn't load
                    const target = e.target as HTMLImageElement;
                    target.src = experience.altImage;
                  }}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                {/* Icon with Colored Circle */}
                <div className={`w-12 h-12 rounded-full ${
                  experience.color === 'gold' ? 'bg-gradient-to-br from-[#D4AF37] to-[#F5D882]' : 
                  experience.color === 'blue' ? 'bg-gradient-to-br from-[#0F4C81] to-[#156bb1]' : 
                  experience.color === 'teal' ? 'bg-gradient-to-br from-[#2E8B57] to-[#40c87c]' :
                  'bg-gradient-to-br from-[#2CB1BC] to-[#61e0ec]'
                } flex items-center justify-center mb-3 transform transition-transform group-hover:scale-110`}>
                  <i className={`fas ${experience.icon} text-white`}></i>
                </div>
                
                {/* Title & Description */}
                <h3 className="font-['Playfair_Display'] text-xl font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {experience.title}
                </h3>
                <p className="text-white/90 text-sm">{experience.description}</p>
                
                {/* Hover Reveal Arrow */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Link */}
        <div className="text-center mt-14">
          <a href="/experiences" className="inline-flex items-center text-[#0F4C81] hover:text-[#D4AF37] font-medium transition-colors group">
            <span className="border-b-2 border-current pb-1">Discover All Experiences</span>
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExperienceShowcase;
