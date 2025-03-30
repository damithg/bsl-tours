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
            src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_800,c_fill/v1743212891/galle-fort_kqntzk.jpg" 
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
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_900,c_fill/activities/sigiriya-frescoes.jpg" 
                    alt="Sigiriya Frescoes" 
                    className="w-full h-auto" 
                  />
                  <div className="bg-[#F8F5F0] p-4 text-center">
                    <p className="text-[#333333]/80 italic">Sigiriya Frescoes</p>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-[#0F4C81] mb-8">
                  What Awaits You at the Top
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    <div className="h-52 overflow-hidden relative">
                      <img 
                        src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill,g_auto,q_auto:best/activities/sigiriya-lion-gate.jpg" 
                        alt="Lion Gate at Sigiriya" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 flex items-center">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center mr-3 shadow-md">
                          <i className="fas fa-monument text-[#0F4C81]"></i>
                        </div>
                        <h4 className="text-white text-xl font-medium">Lion Gate</h4>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-[#333333]/80 leading-relaxed">
                        Walk through the colossal lion claws carved in stone, marking the entrance to the final ascent of this ancient citadel. Once a complete lion figure, these remaining paws hint at the grandeur of the original structure.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    <div className="h-52 overflow-hidden relative">
                      <img 
                        src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill,g_auto,q_auto:best/activities/sigiriya-frescoes.jpg" 
                        alt="Ancient Frescoes at Sigiriya" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 flex items-center">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center mr-3 shadow-md">
                          <i className="fas fa-palette text-[#0F4C81]"></i>
                        </div>
                        <h4 className="text-white text-xl font-medium">Ancient Frescoes</h4>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-[#333333]/80 leading-relaxed">
                        Admire the world-famous paintings of celestial maidens, preserved for over 1,500 years in a sheltered pocket of the rock. These colorful frescoes showcase the advanced artistic techniques of ancient Sri Lankan painters.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    <div className="h-52 overflow-hidden relative">
                      <img 
                        src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill,g_auto,q_auto:best/activities/sigiriya-mirror-wall.jpg" 
                        alt="Mirror Wall at Sigiriya" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 flex items-center">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center mr-3 shadow-md">
                          <i className="fas fa-pen-fancy text-[#0F4C81]"></i>
                        </div>
                        <h4 className="text-white text-xl font-medium">Mirror Wall</h4>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-[#333333]/80 leading-relaxed">
                        Discover the ancient graffiti on Sigiriya's mirror wall, once polished so smooth it reflected the frescoes above. Today, it bears verses and comments from visitors dating back to the 8th century, offering insights into historical perspectives.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    <div className="h-52 overflow-hidden relative">
                      <img 
                        src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill,g_auto,q_auto:best/activities/sigiriya-summit-view.jpg" 
                        alt="Panoramic Views from Sigiriya Summit" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 flex items-center">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center mr-3 shadow-md">
                          <i className="fas fa-mountain text-[#0F4C81]"></i>
                        </div>
                        <h4 className="text-white text-xl font-medium">Panoramic Views</h4>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-[#333333]/80 leading-relaxed">
                        Experience breathtaking 360-degree panoramas from the summit platform. The lush jungle canopy stretches to the horizon, with distant mountains creating a dramatic backdrop. On clear days, you can spot Pidurangala Rock and several ancient water gardens.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Featured Image - Summit View */}
                <div className="rounded-lg overflow-hidden shadow-xl mb-12">
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_900,c_fill/activities/sigiriya-main-view.jpg" 
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
                  <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                    <img 
                      src="/attached_assets/image_1743065917969.png" 
                      alt="Sigiriya Gallery Image 1" 
                      className="w-full h-48 object-cover" 
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                    <img 
                      src="/attached_assets/image_1743067682182.png" 
                      alt="Sigiriya Gallery Image 2" 
                      className="w-full h-48 object-cover" 
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                    <img 
                      src="/attached_assets/image_1743091860073.png" 
                      alt="Sigiriya Gallery Image 3" 
                      className="w-full h-48 object-cover" 
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                    <img 
                      src="/attached_assets/image_1743182459632.png" 
                      alt="Sigiriya Gallery Image 4" 
                      className="w-full h-48 object-cover" 
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                    <img 
                      src="/attached_assets/image_1743183045495.png" 
                      alt="Sigiriya Gallery Image 5" 
                      className="w-full h-48 object-cover" 
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                    <img 
                      src="/attached_assets/image_1743183280625.png" 
                      alt="Sigiriya Gallery Image 6" 
                      className="w-full h-48 object-cover" 
                    />
                  </div>
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
                        src="/attached_assets/image_1743183016164.png"
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
                        src="/attached_assets/image_1743100519865.png"
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
                        src="/attached_assets/image_1743101273205.png"
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
      
      {/* Tours Featuring This Destination */}
      <section className="py-16 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-6">
              Tours Featuring Sigiriya
            </h2>
            <p className="text-lg text-[#333333]/80 max-w-3xl mx-auto">
              Experience the ancient rock fortress as part of our carefully crafted luxury tour packages
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tour Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-xl">
              <div className="relative h-64">
                <img 
                  src="/attached_assets/A Week in the Tropics.jpg" 
                  alt="Cultural Triangle Explorer" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-sm px-3 py-1 rounded-full">
                  Best Seller
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Cultural Triangle Explorer</h3>
                <div className="flex items-center mb-3">
                  <span className="text-sm bg-[#0F4C81]/10 text-[#0F4C81] px-3 py-1 rounded-full mr-2">7 Days</span>
                  <span className="text-sm bg-[#0F4C81]/10 text-[#0F4C81] px-3 py-1 rounded-full">Luxury</span>
                </div>
                <p className="text-[#333333]/80 mb-4">
                  An immersive journey through Sri Lanka's ancient kingdoms including Sigiriya, Polonnaruwa, and Anuradhapura.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-semibold text-[#0F4C81]">From $1,499</span>
                    <span className="text-sm text-[#333333]/70">/person</span>
                  </div>
                  <Link href="/packages/cultural-triangle-explorer" className="text-[#0F4C81] font-medium hover:text-[#D4AF37] transition flex items-center">
                    View Tour <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Tour Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-xl">
              <div className="relative h-64">
                <img 
                  src="/attached_assets/romantic honeymoon escape.jpg" 
                  alt="Sri Lanka Highlights" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 right-4 bg-[#0F4C81] text-white text-sm px-3 py-1 rounded-full">
                  Most Popular
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Sri Lanka Highlights</h3>
                <div className="flex items-center mb-3">
                  <span className="text-sm bg-[#0F4C81]/10 text-[#0F4C81] px-3 py-1 rounded-full mr-2">10 Days</span>
                  <span className="text-sm bg-[#0F4C81]/10 text-[#0F4C81] px-3 py-1 rounded-full">Premium</span>
                </div>
                <p className="text-[#333333]/80 mb-4">
                  Discover the best of Sri Lanka from ancient wonders to pristine beaches and wildlife encounters.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-semibold text-[#0F4C81]">From $2,199</span>
                    <span className="text-sm text-[#333333]/70">/person</span>
                  </div>
                  <Link href="/packages/sri-lanka-highlights" className="text-[#0F4C81] font-medium hover:text-[#D4AF37] transition flex items-center">
                    View Tour <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Tour Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-xl">
              <div className="relative h-64">
                <img 
                  src="/attached_assets/mirissa (7).jpg" 
                  alt="Luxury Sri Lanka Adventure" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-sm px-3 py-1 rounded-full">
                  Ultra Luxury
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Luxury Sri Lanka Adventure</h3>
                <div className="flex items-center mb-3">
                  <span className="text-sm bg-[#0F4C81]/10 text-[#0F4C81] px-3 py-1 rounded-full mr-2">14 Days</span>
                  <span className="text-sm bg-[#0F4C81]/10 text-[#0F4C81] px-3 py-1 rounded-full">Ultra Luxury</span>
                </div>
                <p className="text-[#333333]/80 mb-4">
                  An exclusive journey with private guides, luxury accommodations, and extraordinary experiences.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-semibold text-[#0F4C81]">From $3,899</span>
                    <span className="text-sm text-[#333333]/70">/person</span>
                  </div>
                  <Link href="/packages/luxury-sri-lanka-adventure" className="text-[#0F4C81] font-medium hover:text-[#D4AF37] transition flex items-center">
                    View Tour <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/packages" className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition inline-flex items-center">
              View All Tour Packages <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Local Experiences */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-6">
              Local Experiences in Sigiriya
            </h2>
            <p className="text-lg text-[#333333]/80 max-w-3xl mx-auto">
              Enhance your visit with authentic cultural experiences and activities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Experience 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
              <div className="p-6">
                <div className="w-14 h-14 bg-[#0F4C81]/10 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-bicycle text-xl text-[#0F4C81]"></i>
                </div>
                <h3 className="font-bold text-xl mb-3">Village Cycling Tour</h3>
                <p className="text-[#333333]/80 mb-4">
                  Explore the rural landscapes surrounding Sigiriya by bicycle, visiting local villages, paddy fields, and meeting local farmers.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#0F4C81] font-semibold">$45 per person</span>
                  <span className="text-sm text-[#333333]/70">3-4 hours</span>
                </div>
              </div>
            </div>
            
            {/* Experience 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
              <div className="p-6">
                <div className="w-14 h-14 bg-[#0F4C81]/10 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-utensils text-xl text-[#0F4C81]"></i>
                </div>
                <h3 className="font-bold text-xl mb-3">Sri Lankan Cooking Class</h3>
                <p className="text-[#333333]/80 mb-4">
                  Learn to prepare authentic Sri Lankan dishes with a local chef in a village home, using traditional ingredients and cooking methods.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#0F4C81] font-semibold">$65 per person</span>
                  <span className="text-sm text-[#333333]/70">3 hours</span>
                </div>
              </div>
            </div>
            
            {/* Experience 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
              <div className="p-6">
                <div className="w-14 h-14 bg-[#0F4C81]/10 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-tree text-xl text-[#0F4C81]"></i>
                </div>
                <h3 className="font-bold text-xl mb-3">Herbal Garden Walk</h3>
                <p className="text-[#333333]/80 mb-4">
                  Discover the medicinal plants used in traditional Ayurvedic treatments with an expert guide, followed by a herbal tea tasting.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#0F4C81] font-semibold">$35 per person</span>
                  <span className="text-sm text-[#333333]/70">2 hours</span>
                </div>
              </div>
            </div>
            
            {/* Experience 4 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
              <div className="p-6">
                <div className="w-14 h-14 bg-[#0F4C81]/10 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-elephant text-xl text-[#0F4C81]"></i>
                </div>
                <h3 className="font-bold text-xl mb-3">Elephant Safari</h3>
                <p className="text-[#333333]/80 mb-4">
                  Join a guided jeep safari in Minneriya National Park to witness the famous elephant gathering, one of Asia's greatest wildlife spectacles.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#0F4C81] font-semibold">$85 per person</span>
                  <span className="text-sm text-[#333333]/70">Half-day</span>
                </div>
              </div>
            </div>
            
            {/* Experience 5 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
              <div className="p-6">
                <div className="w-14 h-14 bg-[#0F4C81]/10 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-hot-tub text-xl text-[#0F4C81]"></i>
                </div>
                <h3 className="font-bold text-xl mb-3">Ayurvedic Spa Treatment</h3>
                <p className="text-[#333333]/80 mb-4">
                  Indulge in a traditional Ayurvedic treatment at a luxury spa, using ancient techniques and natural oils to restore balance.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#0F4C81] font-semibold">$120 per person</span>
                  <span className="text-sm text-[#333333]/70">2 hours</span>
                </div>
              </div>
            </div>
            
            {/* Experience 6 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
              <div className="p-6">
                <div className="w-14 h-14 bg-[#0F4C81]/10 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-sunrise text-xl text-[#0F4C81]"></i>
                </div>
                <h3 className="font-bold text-xl mb-3">Pidurangala Sunrise Hike</h3>
                <p className="text-[#333333]/80 mb-4">
                  Trek up Pidurangala Rock before dawn to witness a breathtaking sunrise with panoramic views of Sigiriya Rock and the surrounding landscapes.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#0F4C81] font-semibold">$55 per person</span>
                  <span className="text-sm text-[#333333]/70">3 hours</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 bg-[#F8F5F0] p-8 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-6">
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-2">
                  Custom Experience Packages
                </h3>
                <p className="text-[#333333]/80">
                  Let us design a personalized itinerary combining your preferred experiences for an unforgettable stay.
                </p>
              </div>
              <Link href="/contact" className="bg-[#0F4C81] hover:bg-[#D4AF37] text-white font-medium py-3 px-6 rounded-md transition whitespace-nowrap">
                Inquire Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-[#0F4C81] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="/attached_assets/yves-alarie-3R50kTNBKiE-unsplash.jpg" 
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