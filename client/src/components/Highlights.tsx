import React from 'react';
import AdaptiveImage from './AdaptiveImage';
import PolaroidImage from './PolaroidImage';

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

  // Image data with smart cropping focus points
  const images = [
    {
      id: 'main',
      src: '/images/experiences/romantic-honeymoon.jpg',
      alt: 'Romantic honeymoon beach in Sri Lanka',
      caption: 'Infinity Beach Resort',
      focusPoint: '50% 50%',
    },
    {
      id: 'surf',
      src: '/images/experiences/mirissa-surf.jpg',
      alt: 'Surfing in Mirissa, Sri Lanka',
      caption: 'Mirissa Beach',
      focusPoint: '40% 40%',
    },
    {
      id: 'aerial',
      src: '/images/experiences/mirissa-aerial.jpg',
      alt: 'Aerial view of Mirissa beach, Sri Lanka',
      caption: 'Mirissa Coast',
      focusPoint: '50% 50%',
    },
    {
      id: 'bridge',
      src: '/images/experiences/nine-arch-bridge.jpg',
      alt: 'Nine Arch Bridge in Ella, Sri Lanka',
      caption: 'Nine Arch Bridge, Ella',
      focusPoint: '50% 40%',
    },
    {
      id: 'tea',
      src: '/images/experiences/tea-plantation.jpg',
      alt: 'Tea plantation in Sri Lanka highlands',
      caption: 'Tea Plantations, Nuwara Eliya',
      focusPoint: '50% 60%',
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
          <div className="lg:w-1/2 relative mt-12 lg:mt-0">
            {/* Desktop version (hidden on mobile) */}
            <div className="relative h-[500px] w-full hidden sm:block">
              {/* Main large image - Romantic beach with reflection */}
              <div className="absolute right-0 top-0 w-[85%] h-[320px] rounded-xl overflow-hidden shadow-xl z-10">
                <AdaptiveImage 
                  src={images[0].src}
                  alt={images[0].alt}
                  aspectRatio="landscape"
                  focusPoint={images[0].focusPoint}
                  className="h-full"
                />
              </div>
              
              {/* Polaroid-style image 1 - Surfer girl */}
              <PolaroidImage
                src={images[1].src}
                alt={images[1].alt}
                caption={images[1].caption}
                focusPoint={images[1].focusPoint}
                className="absolute top-[50px] left-0 w-[180px] h-[210px]"
                rotation={-5}
                zIndex={20}
              />
              
              {/* Polaroid-style image 2 - Nine Arch Bridge */}
              <PolaroidImage
                src={images[3].src}
                alt={images[3].alt}
                caption={images[3].caption}
                focusPoint={images[3].focusPoint}
                className="absolute bottom-[20px] right-[35%] w-[200px] h-[230px]"
                rotation={3}
                zIndex={30}
              />
              
              {/* Polaroid-style image 3 - Aerial beach */}
              <PolaroidImage
                src={images[2].src}
                alt={images[2].alt}
                caption={images[2].caption}
                focusPoint={images[2].focusPoint}
                className="absolute top-[100px] right-[70px] w-[170px] h-[200px]"
                rotation={8}
                zIndex={50}
              />
              
              {/* Polaroid-style image 4 - Tea plantation */}
              <PolaroidImage
                src={images[4].src}
                alt={images[4].alt}
                caption={images[4].caption}
                focusPoint={images[4].focusPoint}
                className="absolute bottom-[30px] right-0 w-[190px] h-[220px]"
                rotation={-4}
                zIndex={40}
              />
            </div>

            {/* Mobile version (optimized grid, shown only on small screens) */}
            <div className="block sm:hidden">
              {/* Main image for mobile */}
              <div className="mb-6">
                <div className="w-full h-[230px] rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={images[0].src}
                    alt={images[0].alt}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: images[0].focusPoint }}
                  />
                </div>
              </div>

              {/* Mobile image grid - 2x2 with polaroid images */}
              <div className="grid grid-cols-2 gap-4">
                {/* Polaroid 1 - Mirissa Beach */}
                <div className="bg-white p-2 rounded-md shadow-md overflow-hidden h-36">
                  <div className="w-full h-[110px] overflow-hidden mb-2">
                    <img 
                      src={images[1].src}
                      alt={images[1].alt}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: images[1].focusPoint }}
                    />
                  </div>
                  <p className="text-xs text-center text-gray-600 font-medium">{images[1].caption}</p>
                </div>
                
                {/* Polaroid 2 - Aerial View */}
                <div className="bg-white p-2 rounded-md shadow-md overflow-hidden h-36">
                  <div className="w-full h-[110px] overflow-hidden mb-2">
                    <img 
                      src={images[2].src}
                      alt={images[2].alt} 
                      className="w-full h-full object-cover"
                      style={{ objectPosition: images[2].focusPoint }}
                    />
                  </div>
                  <p className="text-xs text-center text-gray-600 font-medium">{images[2].caption}</p>
                </div>
                
                {/* Polaroid 3 - Nine Arch Bridge */}
                <div className="bg-white p-2 rounded-md shadow-md overflow-hidden h-36">
                  <div className="w-full h-[110px] overflow-hidden mb-2">
                    <img 
                      src={images[3].src}
                      alt={images[3].alt}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: images[3].focusPoint }}
                    />
                  </div>
                  <p className="text-xs text-center text-gray-600 font-medium">{images[3].caption}</p>
                </div>
                
                {/* Polaroid 4 - Tea Plantation */}
                <div className="bg-white p-2 rounded-md shadow-md overflow-hidden h-36">
                  <div className="w-full h-[110px] overflow-hidden mb-2">
                    <img 
                      src={images[4].src}
                      alt={images[4].alt}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: images[4].focusPoint }}
                    />
                  </div>
                  <p className="text-xs text-center text-gray-600 font-medium">{images[4].caption}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
