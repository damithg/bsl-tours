import React from "react";
import { ArrowRight } from "lucide-react";

/**
 * A decorative map component showing Sri Lanka destinations with illustrations
 */
const DestinationMap: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side content */}
          <div className="lg:w-5/12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0077B6] mb-6">
              DESTINATION HIGHLIGHTS
            </h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Bundled with awe-inspiring set of destination layouts. They provide 
              you with a <span className="text-[#F26B6B] font-medium">ready-to-go & fully flexible</span> way to present
              detailed write-ups about places you visited.
            </p>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              Showcase destinations in categories or custom list layouts, & let
              visitors access destination single pages with 1 click.
            </p>
            <a 
              href="/destinations" 
              className="inline-flex items-center border-2 border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6] hover:text-white font-medium py-3 px-8 uppercase tracking-wider transition duration-300"
            >
              EXPLORE
            </a>
          </div>

          {/* Right side map illustration */}
          <div className="lg:w-7/12 relative">
            <div className="w-full h-full relative">
              {/* Sri Lanka map outline with all illustrations */}
              <div className="relative bg-[#f8f9fa] rounded-xl p-4 border border-gray-200 shadow-md">
                {/* Map background */}
                <img 
                  src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/illustrations/sri-lanka-map-outline_d6efwh.png" 
                  alt="Sri Lanka Map" 
                  className="w-full"
                />
                
                {/* Destination marker - Colombo */}
                <div className="absolute" style={{ top: '75%', left: '25%' }}>
                  <div className="relative">
                    <div className="w-8 h-8 bg-[#F26B6B] rounded-full flex items-center justify-center shadow-md">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26B6B] opacity-75"></span>
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute whitespace-nowrap -left-16 -bottom-12">
                      <span className="font-script text-xl text-[#0077B6]">Beautiful city of Colombo</span>
                    </div>
                  </div>
                </div>
                
                {/* Destination marker - Cultural Triangle */}
                <div className="absolute" style={{ top: '35%', left: '55%' }}>
                  <div className="relative">
                    <div className="w-8 h-8 bg-[#F26B6B] rounded-full flex items-center justify-center shadow-md">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26B6B] opacity-75"></span>
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Ancient Temple Illustration */}
                <div className="absolute" style={{ top: '15%', left: '45%' }}>
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/illustrations/sri-lanka-temple_fw3rpn.png" 
                    alt="Ancient Temple" 
                    className="w-40 h-auto"
                  />
                </div>
                
                {/* Beach Destination */}
                <div className="absolute" style={{ bottom: '20%', right: '5%' }}>
                  <div className="relative group">
                    <img 
                      src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/beaches/mirissa_hq5tcf.jpg" 
                      alt="Beach Destination" 
                      className="w-28 h-28 object-cover rounded-lg shadow-lg border-2 border-white"
                    />
                    <div className="absolute -bottom-8 right-0">
                      <span className="text-[#0077B6] font-medium text-sm bg-white/80 px-2 py-1 rounded shadow-sm">
                        DISCOVER DESTINATIONS 🏝
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* London Bridge Image */}
                <div className="absolute" style={{ top: '0%', right: '0%' }}>
                  <div className="relative">
                    <img 
                      src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/international/london-bridge_pnxrbe.jpg" 
                      alt="London Bridge" 
                      className="w-48 h-32 object-cover rounded-lg shadow-lg border-2 border-white"
                    />
                  </div>
                </div>
                
                {/* Double-Decker Bus Illustration */}
                <div className="absolute" style={{ bottom: '30%', left: '30%' }}>
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/illustrations/london-bus_tme6ft.png" 
                    alt="London Bus" 
                    className="w-20 h-auto"
                  />
                </div>
                
                {/* "United Kingdom" Text */}
                <div className="absolute" style={{ bottom: '5%', right: '20%' }}>
                  <span className="font-script text-3xl text-gray-800">United Kingdom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationMap;