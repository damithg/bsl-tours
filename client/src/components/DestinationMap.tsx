import React from "react";

/**
 * A decorative map component showing Sri Lanka destinations with photo overlays
 */
const DestinationMap: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0077B6] mb-4">
            DESTINATION HIGHLIGHTS
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Discover Sri Lanka's iconic destinations - from ancient cultural sites to pristine 
            beaches and breathtaking natural landscapes.
          </p>
        </div>

        {/* Map with destination photos */}
        <div className="relative mx-auto max-w-4xl">
          {/* Sri Lanka map background */}
          <div className="relative rounded-xl p-6 shadow-lg">
            <img 
              src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744127782/map-sri-lanka_vb7cpr.png" 
              alt="Sri Lanka Map" 
              className="w-full h-auto"
            />
            
            {/* Sigiriya Rock Fortress - Cultural Triangle */}
            <div className="absolute" style={{ top: '25%', left: '55%' }}>
              <div className="relative group">
                <img 
                  src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/cultural/sigiriya_nmbzuf.jpg" 
                  alt="Sigiriya Rock Fortress" 
                  className="w-28 h-28 object-cover rounded-lg shadow-lg border-2 border-white transform transition hover:scale-105 cursor-pointer"
                />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="bg-white/80 text-[#0077B6] font-medium text-sm px-3 py-1 rounded-full shadow-sm">
                    Sigiriya
                  </span>
                </div>
              </div>
            </div>
            
            {/* Mirissa Beach - South Coast */}
            <div className="absolute" style={{ bottom: '15%', right: '10%' }}>
              <div className="relative group">
                <img 
                  src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/beaches/mirissa_hq5tcf.jpg" 
                  alt="Mirissa Beach" 
                  className="w-32 h-32 object-cover rounded-lg shadow-lg border-2 border-white transform transition hover:scale-105 cursor-pointer"
                />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="bg-white/80 text-[#0077B6] font-medium text-sm px-3 py-1 rounded-full shadow-sm">
                    Mirissa Beach
                  </span>
                </div>
              </div>
            </div>
            
            {/* Kandy Temple - Central Hill Country */}
            <div className="absolute" style={{ top: '45%', left: '43%' }}>
              <div className="relative group">
                <img 
                  src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/cultural/kandy-temple_tphwsc.jpg" 
                  alt="Temple of the Sacred Tooth Relic" 
                  className="w-28 h-28 object-cover rounded-lg shadow-lg border-2 border-white transform transition hover:scale-105 cursor-pointer"
                />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="bg-white/80 text-[#0077B6] font-medium text-sm px-3 py-1 rounded-full shadow-sm">
                    Kandy
                  </span>
                </div>
              </div>
            </div>
            
            {/* Galle Fort - Southwest Coast */}
            <div className="absolute" style={{ bottom: '30%', left: '20%' }}>
              <div className="relative group">
                <img 
                  src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1681234567/destinations/colonial/galle-fort_wq4fvs.jpg" 
                  alt="Galle Fort" 
                  className="w-32 h-32 object-cover rounded-lg shadow-lg border-2 border-white transform transition hover:scale-105 cursor-pointer"
                />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="bg-white/80 text-[#0077B6] font-medium text-sm px-3 py-1 rounded-full shadow-sm">
                    Galle Fort
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-12">
            <a 
              href="/destinations" 
              className="inline-flex items-center bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Explore All Destinations
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationMap;