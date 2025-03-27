import React from 'react';

const Highlights = () => {
  const features = [
    {
      title: "Experienced Guides",
      description: "Experience the best of Sri Lanka with our tour agency. Our experienced guides, customizable packages, and commitment to customer satisfaction ensure an unforgettable journey."
    },
    {
      title: "Customizable Packages",
      description: "Tailor your trip to Sri Lanka according to your preferences and interests."
    }
  ];

  return (
    <section id="highlights" className="py-24 bg-[#F8F5F0] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Content */}
          <div className="lg:w-1/2 lg:pr-4">
            {/* Section tag */}
            <span className="inline-block text-[#666] text-sm tracking-wider mb-3">EXPERIENCE SRI LANKA'S FINEST</span>
            
            {/* Headline */}
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#0F4C81] mb-6 leading-tight">
              Discover the beauty of<br />
              <span className="font-bold">Sri Lanka with Us</span>
            </h2>
            
            {/* Description */}
            <p className="text-[#333333]/80 mb-10 max-w-xl text-lg">
              Experience the best of Sri Lanka with our tour agency. Our experienced guides, customizable packages, and commitment to customer satisfaction ensure an unforgettable journey.
            </p>
            
            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col">
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2 text-[#0F4C81]">
                    {feature.title}
                  </h3>
                  <p className="text-[#333333]/70">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <div>
              <a 
                href="/tour-packages" 
                className="inline-block py-3 px-8 bg-[#0F4C81] text-white rounded-lg font-medium hover:bg-[#0F4C81]/90 transition-colors"
              >
                Book now
              </a>
            </div>
          </div>
          
          {/* Right side - Stacked Images */}
          <div className="lg:w-1/2 relative">
            <div className="relative h-[500px] w-full">
              {/* Main large image - Romantic beach with reflection */}
              <div className="absolute right-0 top-0 w-[85%] h-[320px] rounded-xl overflow-hidden shadow-xl z-10">
                <img 
                  src="/images/experiences/romantic-honeymoon.jpg" 
                  alt="Romantic honeymoon beach in Sri Lanka"
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Polaroid-style image 1 - Surfer girl */}
              <div className="absolute top-[50px] left-0 w-[180px] h-[210px] bg-white p-3 rounded-md shadow-lg transform rotate-[-5deg] z-20">
                <div className="w-full h-[170px] overflow-hidden mb-2">
                  <img 
                    src="/images/experiences/mirissa-surf.jpg" 
                    alt="Surfing in Mirissa, Sri Lanka"
                    className="w-full h-full object-cover" 
                  />
                </div>
                <p className="text-xs text-center text-gray-600 font-medium">Mirissa Beach</p>
              </div>
              
              {/* Polaroid-style image 2 - Nine Arch Bridge */}
              <div className="absolute bottom-[20px] right-[35%] w-[200px] h-[230px] bg-white p-3 rounded-md shadow-lg transform rotate-[3deg] z-30">
                <div className="w-full h-[190px] overflow-hidden mb-2">
                  <img 
                    src="/images/experiences/nine-arch-bridge.jpg" 
                    alt="Nine Arch Bridge in Ella, Sri Lanka"
                    className="w-full h-full object-cover" 
                  />
                </div>
                <p className="text-xs text-center text-gray-600 font-medium">Nine Arch Bridge, Ella</p>
              </div>
              
              {/* Polaroid-style image 3 - Aerial beach */}
              <div className="absolute top-[240px] left-[80px] w-[170px] h-[200px] bg-white p-3 rounded-md shadow-lg transform rotate-[8deg] z-25">
                <div className="w-full h-[160px] overflow-hidden mb-2">
                  <img 
                    src="/images/experiences/mirissa-aerial.jpg" 
                    alt="Aerial view of Mirissa beach, Sri Lanka"
                    className="w-full h-full object-cover" 
                  />
                </div>
                <p className="text-xs text-center text-gray-600 font-medium">Mirissa Coast</p>
              </div>
              
              {/* Product/tour card */}
              <div className="absolute bottom-[30px] right-0 w-[220px] bg-white rounded-lg shadow-lg p-4 z-40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#D4AF37] font-semibold">Featured Tour</span>
                  <span className="font-bold text-[#0F4C81]">$1,450</span>
                </div>
                <h4 className="font-medium mb-1">Sri Lanka Paradise</h4>
                <p className="text-xs text-gray-600 mb-3">10 days of luxury experiences</p>
                <a 
                  href="/tour-packages/sri-lanka-paradise" 
                  className="block w-full py-2 bg-[#F0F0F0] text-center text-[#0F4C81] text-sm rounded-md hover:bg-[#0F4C81]/10 transition-colors"
                >
                  View Details →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
