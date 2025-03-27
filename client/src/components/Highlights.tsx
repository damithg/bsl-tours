import React from 'react';
import { AdaptiveImage } from './ui/adaptive-image';
import { ASPECT_RATIOS, DESTINATION_FOCAL_POINTS } from '@/lib/image-utils';

// Define highlights image data with optimized focal points
const imageData = {
  main: {
    src: "/images/experiences/romantic-honeymoon.jpg",
    alt: "Romantic honeymoon beach in Sri Lanka",
    focalPoint: { x: 0.5, y: 0.6 }, // Slightly below center to focus on beach/water
    destinationName: "Romantic Beach"
  },
  polaroid1: {
    src: "/images/experiences/mirissa-surf.jpg",
    alt: "Surfing in Mirissa, Sri Lanka",
    focalPoint: { x: 0.4, y: 0.4 },
    caption: "Mirissa Beach"
  },
  polaroid2: {
    src: "/images/experiences/nine-arch-bridge.jpg",
    alt: "Nine Arch Bridge in Ella, Sri Lanka",
    focalPoint: { x: 0.5, y: 0.4 }, 
    caption: "Nine Arch Bridge, Ella"
  },
  polaroid3: {
    src: "/images/experiences/mirissa-aerial.jpg",
    alt: "Aerial view of Mirissa beach, Sri Lanka",
    focalPoint: { x: 0.5, y: 0.5 },
    caption: "Mirissa Coast" 
  },
  polaroid4: {
    src: "/images/experiences/tea-plantation.jpg",
    alt: "Tea plantation in Sri Lanka highlands",
    focalPoint: { x: 0.5, y: 0.6 },
    caption: "Tea Plantations, Nuwara Eliya"
  }
};

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
          
          {/* Right side - Stacked Images with Adaptive Image component */}
          <div className="lg:w-1/2 relative mt-12 lg:mt-0">
            {/* Desktop version (hidden on mobile) */}
            <div className="relative h-[500px] w-full hidden sm:block">
              {/* Main large image - Romantic beach with reflection */}
              <div className="absolute right-0 top-0 w-[85%] h-[320px] rounded-xl overflow-hidden shadow-xl z-10">
                <AdaptiveImage 
                  src={imageData.main.src}
                  alt={imageData.main.alt}
                  focalPoint={imageData.main.focalPoint}
                  aspectRatio="21/9"
                  imageClassName="w-full h-full"
                  containerClassName="w-full h-full"
                />
              </div>
              
              {/* Polaroid-style image 1 - Surfer girl */}
              <div className="absolute top-[50px] left-0 w-[180px] h-[210px] bg-white p-3 rounded-md shadow-lg transform rotate-[-5deg] z-20">
                <div className="w-full h-[170px] overflow-hidden mb-2">
                  <AdaptiveImage 
                    src={imageData.polaroid1.src}
                    alt={imageData.polaroid1.alt}
                    focalPoint={imageData.polaroid1.focalPoint}
                    aspectRatio={ASPECT_RATIOS.POLAROID}
                    imageClassName="w-full h-full"
                  />
                </div>
                <p className="text-xs text-center text-gray-600 font-medium">{imageData.polaroid1.caption}</p>
              </div>
              
              {/* Polaroid-style image 2 - Nine Arch Bridge */}
              <div className="absolute bottom-[20px] right-[35%] w-[200px] h-[230px] bg-white p-3 rounded-md shadow-lg transform rotate-[3deg] z-30">
                <div className="w-full h-[190px] overflow-hidden mb-2">
                  <AdaptiveImage 
                    src={imageData.polaroid2.src}
                    alt={imageData.polaroid2.alt}
                    focalPoint={imageData.polaroid2.focalPoint}
                    aspectRatio={ASPECT_RATIOS.POLAROID}
                    imageClassName="w-full h-full"
                  />
                </div>
                <p className="text-xs text-center text-gray-600 font-medium">{imageData.polaroid2.caption}</p>
              </div>
              
              {/* Polaroid-style image 3 - Aerial beach */}
              <div className="absolute top-[100px] right-[70px] w-[170px] h-[200px] bg-white p-3 rounded-md shadow-lg transform rotate-[8deg] z-50">
                <div className="w-full h-[160px] overflow-hidden mb-2">
                  <AdaptiveImage 
                    src={imageData.polaroid3.src}
                    alt={imageData.polaroid3.alt}
                    focalPoint={imageData.polaroid3.focalPoint}
                    aspectRatio={ASPECT_RATIOS.POLAROID}
                    imageClassName="w-full h-full"
                  />
                </div>
                <p className="text-xs text-center text-gray-600 font-medium">{imageData.polaroid3.caption}</p>
              </div>
              
              {/* Polaroid-style image 4 - Tea plantation */}
              <div className="absolute bottom-[30px] right-0 w-[190px] h-[220px] bg-white p-3 rounded-md shadow-lg transform rotate-[-4deg] z-40">
                <div className="w-full h-[180px] overflow-hidden mb-2">
                  <AdaptiveImage 
                    src={imageData.polaroid4.src}
                    alt={imageData.polaroid4.alt}
                    focalPoint={imageData.polaroid4.focalPoint}
                    aspectRatio={ASPECT_RATIOS.POLAROID}
                    imageClassName="w-full h-full"
                  />
                </div>
                <p className="text-xs text-center text-gray-600 font-medium">{imageData.polaroid4.caption}</p>
              </div>
            </div>

            {/* Mobile version (optimized grid, shown only on small screens) */}
            <div className="block sm:hidden">
              {/* Main image for mobile */}
              <div className="mb-6">
                <div className="w-full h-[230px] rounded-xl overflow-hidden shadow-lg">
                  <AdaptiveImage 
                    src={imageData.main.src}
                    alt={imageData.main.alt}
                    focalPoint={imageData.main.focalPoint}
                    aspectRatio="16/9"
                    containerClassName="w-full h-full"
                  />
                </div>
              </div>

              {/* Mobile image grid - 2x2 with polaroid images */}
              <div className="grid grid-cols-2 gap-4">
                {/* Polaroid 1 - Mirissa Beach */}
                <div className="bg-white p-2 rounded-md shadow-md">
                  <div className="w-full aspect-square overflow-hidden mb-2">
                    <AdaptiveImage 
                      src={imageData.polaroid1.src}
                      alt={imageData.polaroid1.alt}
                      focalPoint={imageData.polaroid1.focalPoint}
                      aspectRatio={ASPECT_RATIOS.SQUARE}
                    />
                  </div>
                  <p className="text-xs text-center text-gray-600 font-medium">{imageData.polaroid1.caption}</p>
                </div>
                
                {/* Polaroid 2 - Aerial View */}
                <div className="bg-white p-2 rounded-md shadow-md">
                  <div className="w-full aspect-square overflow-hidden mb-2">
                    <AdaptiveImage 
                      src={imageData.polaroid3.src}
                      alt={imageData.polaroid3.alt}
                      focalPoint={imageData.polaroid3.focalPoint}
                      aspectRatio={ASPECT_RATIOS.SQUARE}
                    />
                  </div>
                  <p className="text-xs text-center text-gray-600 font-medium">{imageData.polaroid3.caption}</p>
                </div>
                
                {/* Polaroid 3 - Nine Arch Bridge */}
                <div className="bg-white p-2 rounded-md shadow-md">
                  <div className="w-full aspect-square overflow-hidden mb-2">
                    <AdaptiveImage 
                      src={imageData.polaroid2.src}
                      alt={imageData.polaroid2.alt}
                      focalPoint={imageData.polaroid2.focalPoint}
                      aspectRatio={ASPECT_RATIOS.SQUARE}
                    />
                  </div>
                  <p className="text-xs text-center text-gray-600 font-medium">{imageData.polaroid2.caption}</p>
                </div>
                
                {/* Polaroid 4 - Tea Plantation */}
                <div className="bg-white p-2 rounded-md shadow-md">
                  <div className="w-full aspect-square overflow-hidden mb-2">
                    <AdaptiveImage 
                      src={imageData.polaroid4.src}
                      alt={imageData.polaroid4.alt}
                      focalPoint={imageData.polaroid4.focalPoint}
                      aspectRatio={ASPECT_RATIOS.SQUARE}
                    />
                  </div>
                  <p className="text-xs text-center text-gray-600 font-medium">{imageData.polaroid4.caption}</p>
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