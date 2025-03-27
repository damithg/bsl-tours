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
            <div className="relative h-[450px] w-full">
              {/* Main large image */}
              <div className="absolute right-0 top-0 w-[85%] h-[320px] rounded-xl overflow-hidden shadow-xl z-10">
                <img 
                  src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
                  alt="Sri Lanka beach"
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Small polaroid-like image 1 */}
              <div className="absolute top-[50px] left-0 w-[180px] h-[160px] bg-white p-2 rounded-lg shadow-lg transform rotate-[-5deg] z-20">
                <img 
                  src="https://images.unsplash.com/photo-1515867447977-5646fb3de616?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Sri Lanka wildlife"
                  className="w-full h-full object-cover rounded" 
                />
              </div>
              
              {/* Small polaroid-like image 2 */}
              <div className="absolute bottom-0 right-[30%] w-[200px] h-[180px] bg-white p-2 rounded-lg shadow-lg transform rotate-[3deg] z-30">
                <img 
                  src="https://images.unsplash.com/photo-1546975490-e8b92a360b24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Sri Lanka coastline"
                  className="w-full h-full object-cover rounded" 
                />
              </div>
              
              {/* Product/tour card */}
              <div className="absolute bottom-[40px] right-[5%] w-[220px] bg-white rounded-lg shadow-lg p-4 z-40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Tour</span>
                  <span className="font-bold text-[#0F4C81]">$1200</span>
                </div>
                <h4 className="font-medium mb-1">Luxury Sri Lanka Tour</h4>
                <p className="text-xs text-gray-600 mb-3">7 days of beautiful coastal experiences</p>
                <a 
                  href="/tour-packages/luxury-coastal" 
                  className="block w-full py-2 bg-[#F0F0F0] text-center text-[#0F4C81] text-sm rounded-md"
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
