import React from "react";
import { Link } from "wouter";
import { Home, ChevronRight } from "lucide-react";

const SigiriyaTemplate = () => {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section with Banner Image */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_800,c_fill/v1743213326/sigiriya-rock-fortress_f2zjap.jpg" 
            alt="Sigiriya Rock Fortress" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-end pb-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex text-white/90 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-white/60" />
                  <Link href="/destinations" className="ml-1 text-sm font-medium text-white/90 hover:text-white">
                    Destinations
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-white/60" />
                  <span className="ml-1 text-sm font-medium text-white/80">
                    Sigiriya Rock Fortress
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          
          <div className="max-w-4xl">
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Sigiriya Rock Fortress
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Ancient rock fortress with panoramic views and stunning frescoes
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2">
              {/* Introduction Section */}
              <div className="mb-16">
                <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#0F4C81] mb-8">
                  Step Into a Lost Kingdom
                </h2>
                <p className="text-lg text-[#333333]/90 mb-6 leading-relaxed">
                  Imagine standing at the foot of a towering rock that rises straight out of the jungle — 200 meters high — with ancient lion paws guarding the entrance. This isn't just a rock. This is Sigiriya, the heart of a forgotten kingdom, carved with ambition, mystery, and breathtaking artistry.
                </p>
                
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-4 mt-12">
                  A Story Written in Stone
                </h3>
                <p className="text-lg text-[#333333]/90 mb-12 leading-relaxed">
                  Built by King Kasyapa in the 5th century, Sigiriya was more than a fortress — it was a statement. A sky palace. A sanctuary. A show of power perched above the clouds. Today, its winding staircases and ancient frescoes speak of an era where art and architecture reigned supreme.
                </p>
                
                {/* Featured Image - Frescoes */}
                <div className="rounded-lg overflow-hidden shadow-xl mb-12">
                  <img 
                    src="https://images.unsplash.com/photo-1596402184320-417e1a2a3634?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
                    alt="Sigiriya Frescoes" 
                    className="w-full h-auto" 
                  />
                  <div className="bg-[#F8F5F0] p-4 text-center">
                    <p className="text-[#333333]/80 italic">Sigiriya Frescoes</p>
                  </div>
                </div>
                
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-6">
                  What Awaits You at the Top
                </h3>
                
                <div className="space-y-4 mb-12">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-monument text-[#0F4C81]"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">The Lion Gate</h4>
                      <p className="text-[#333333]/80">Walk through colossal lion claws carved in stone</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-palette text-[#0F4C81]"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Frescoes</h4>
                      <p className="text-[#333333]/80">Gaze at celestial maidens painted over 1,500 years ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-pen-fancy text-[#0F4C81]"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Mirror Wall</h4>
                      <p className="text-[#333333]/80">Ancient graffiti and poetry etched by pilgrims</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-mountain text-[#0F4C81]"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Panoramic Views</h4>
                      <p className="text-[#333333]/80">A jungle-carpeted kingdom unfolds beneath your feet</p>
                    </div>
                  </div>
                </div>
                
                {/* Featured Image - Summit View */}
                <div className="rounded-lg overflow-hidden shadow-xl mb-12">
                  <img 
                    src="https://images.unsplash.com/photo-1596402184320-417e1a2a3634?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
                    alt="Summit view from Sigiriya" 
                    className="w-full h-auto" 
                  />
                  <div className="bg-[#F8F5F0] p-4 text-center">
                    <p className="text-[#333333]/80 italic">Summit view from Sigiriya</p>
                  </div>
                </div>
                
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-6">
                  When to Go & How to Prepare
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                  <div className="bg-[#F8F5F0] p-6 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3">Best Time to Visit</h4>
                    <p className="text-[#333333]/80">December to April, during the dry season.</p>
                  </div>
                  
                  <div className="bg-[#F8F5F0] p-6 rounded-lg">
                    <h4 className="font-semibold text-lg mb-3">Top Tips</h4>
                    <p className="text-[#333333]/80">Start your climb early morning to beat the heat. Wear sturdy shoes, carry water, and don't forget your camera. You'll want to remember every step.</p>
                  </div>
                </div>
                
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-6">
                  Make It a Journey, Not Just a Stop
                </h3>
                
                <p className="text-lg text-[#333333]/90 mb-6 leading-relaxed">
                  Pair Sigiriya with nearby wonders like Pidurangala Rock (for a dramatic sunrise view of Sigiriya itself), or the spiritual caves of Dambulla. You're not just seeing Sri Lanka — you're feeling it come alive.
                </p>
              </div>
              
              {/* Gallery Section */}
              <div className="mb-16">
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-8">
                  Explore Sigiriya
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                      <img 
                        src={`https://source.unsplash.com/random/600x400?sigiriya,srilanka&sig=${index}`} 
                        alt={`Sigiriya Gallery Image ${index}`} 
                        className="w-full h-48 object-cover" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              {/* Booking Widget */}
              <div className="bg-[#F8F5F0] p-6 rounded-lg shadow-md mb-8 sticky top-4">
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0F4C81] mb-6 border-b border-[#0F4C81]/20 pb-3">
                  Plan Your Sigiriya Experience
                </h3>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[#333333]/90 font-medium">Private Tour</span>
                    <span className="text-2xl font-normal text-[#0F4C81]">$79</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[#333333]/90 font-medium">With Expert Guide</span>
                    <span className="text-2xl font-normal text-[#0F4C81]">$149</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[#333333]/90 font-medium">Luxury Package</span>
                    <span className="text-2xl font-normal text-[#0F4C81]">$299</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mr-3">
                      <i className="fas fa-check text-sm text-[#0F4C81]"></i>
                    </div>
                    <p className="text-[#333333]/80 text-sm">Skip-the-line entrance tickets</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mr-3">
                      <i className="fas fa-check text-sm text-[#0F4C81]"></i>
                    </div>
                    <p className="text-[#333333]/80 text-sm">Luxury transportation</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mr-3">
                      <i className="fas fa-check text-sm text-[#0F4C81]"></i>
                    </div>
                    <p className="text-[#333333]/80 text-sm">Expert local guide</p>
                  </div>
                </div>
                
                <Link href="/contact" className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md transition block text-center">
                  Inquire About Availability
                </Link>
              </div>
              
              {/* Weather Information */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm mb-8">
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0F4C81] mb-4">
                  Weather at Sigiriya
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <i className="fas fa-sun text-2xl text-yellow-500 mr-3"></i>
                    <div>
                      <p className="text-lg font-medium">28°C</p>
                      <p className="text-sm text-[#333333]/70">Average high</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-medium">22°C</p>
                    <p className="text-sm text-[#333333]/70">Average low</p>
                  </div>
                </div>
                
                <p className="text-sm text-[#333333]/80 mb-2">
                  <strong>Dry Season:</strong> December to April
                </p>
                <p className="text-sm text-[#333333]/80">
                  <strong>Monsoon Season:</strong> May to November
                </p>
              </div>
              
              {/* Location Information */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm mb-8">
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0F4C81] mb-4">
                  Getting Here
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <i className="fas fa-map-marker-alt text-[#0F4C81] mt-1 mr-3"></i>
                    <p className="text-sm text-[#333333]/80">
                      Sigiriya, Central Province, Sri Lanka
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <i className="fas fa-car text-[#0F4C81] mt-1 mr-3"></i>
                    <p className="text-sm text-[#333333]/80">
                      3-4 hours from Colombo by car
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <i className="fas fa-plane text-[#0F4C81] mt-1 mr-3"></i>
                    <p className="text-sm text-[#333333]/80">
                      30-minute helicopter transfer available
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  {/* This would normally be a map component */}
                  <div className="h-32 bg-gray-300 flex items-center justify-center">
                    <i className="fas fa-map-marked-alt text-3xl text-gray-500"></i>
                  </div>
                </div>
              </div>
              
              {/* Nearby Attractions */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0F4C81] mb-4">
                  Nearby Attractions
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-3">
                      <img
                        src="https://images.unsplash.com/photo-1591801309940-9e7a12ec5665?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                        alt="Dambulla Cave Temple"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Dambulla Cave Temple</h4>
                      <p className="text-sm text-[#333333]/80">17 km - UNESCO World Heritage Site</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-3">
                      <img
                        src="https://images.unsplash.com/photo-1596402184320-417e1a2a3634?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                        alt="Pidurangala Rock"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Pidurangala Rock</h4>
                      <p className="text-sm text-[#333333]/80">2 km - Panoramic views of Sigiriya</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-3">
                      <img
                        src="https://images.unsplash.com/photo-1586861642026-fc21a5ae85b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                        alt="Minneriya National Park"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Minneriya National Park</h4>
                      <p className="text-sm text-[#333333]/80">30 km - Famous for elephant gatherings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-[#0F4C81] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1586861642026-fc21a5ae85b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Sri Lanka landscape" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience Sigiriya?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Let us create your perfect Sri Lankan adventure with Sigiriya as the centerpiece of your journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/packages" className="bg-white hover:bg-[#D4AF37] text-[#0F4C81] hover:text-white font-medium py-3 px-8 rounded-md transition">
                View Luxury Packages
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium py-3 px-8 rounded-md transition">
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SigiriyaTemplate;