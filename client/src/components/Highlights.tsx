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
    <section id="highlights" className="py-24 bg-black text-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch gap-14">
          {/* Left side - Images */}
          <div className="lg:w-2/5 flex gap-5">
            {/* Vertical image panels */}
            <div className="w-[120px] sm:w-[180px] h-[450px] rounded-3xl overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1546975490-e8b92a360b24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Sri Lanka beach view"
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="w-[120px] sm:w-[180px] h-[450px] rounded-3xl overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1590732488817-d56a3aea8637?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Sri Lanka water villas"
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          
          {/* Right side - Content */}
          <div className="lg:w-3/5 lg:pl-4 flex flex-col justify-center">
            {/* Headline */}
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
              Discover the beauty of<br />
              <span className="font-normal">Sri Lanka with Us</span>
            </h2>
            
            {/* Description */}
            <p className="text-gray-200 mb-12 max-w-xl text-lg">
              Experience the best of Sri Lanka with our tour agency. Our experienced guides, customizable packages, and commitment to customer satisfaction ensure an unforgettable journey.
            </p>
            
            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col">
                  <h3 className="font-['Playfair_Display'] text-2xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <div>
              <a 
                href="/tour-packages" 
                className="inline-block py-3 px-8 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Book now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
