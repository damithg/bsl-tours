import React from "react";
import { Link } from "wouter";
import { Home, ChevronRight, Calendar, Users, Camera } from "lucide-react";
import { AsymmetricalGallery } from "@/components/AsymmetricalGallery";

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
                
                {/* Featured Image - Main View */}
                <div className="rounded-lg overflow-hidden shadow-xl mb-8">
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_900,c_fill/activities/sigiriya-main-view.jpg" 
                    alt="Sigiriya Rock Fortress" 
                    className="w-full h-auto" 
                  />
                  <div className="bg-[#F8F5F0] p-4 text-center">
                    <p className="text-[#333333]/80 italic">The majestic Sigiriya Rock Fortress rises 200 meters above the surrounding plains</p>
                  </div>
                </div>
                
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-4 mt-12">
                  A Story Written in Stone
                </h3>
                <p className="text-lg text-[#333333]/90 mb-8 leading-relaxed">
                  Built by King Kasyapa in the 5th century, Sigiriya was more than a fortress — it was a statement. A sky palace. A sanctuary. A show of power perched above the clouds. Today, its winding staircases and ancient frescoes speak of an era where art and architecture reigned supreme.
                </p>
                
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-8">
                  What Awaits You at the Top
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {/* Lion Gate Card */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill,g_auto,q_auto:best/activities/sigiriya-lion-gate.jpg" 
                        alt="Lion Gate at Sigiriya" 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#0F4C81]">
                        Must See
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-3">Lion Gate</h4>
                      <p className="text-gray-600 mb-4">
                        Walk through the colossal lion claws carved in stone, marking the entrance to the final ascent of this ancient citadel. Once a complete lion figure, these remaining paws hint at the grandeur of the original structure.
                      </p>
                      <div className="flex items-center text-sm text-[#0F4C81]">
                        <span className="inline-block w-4 h-4 rounded-full bg-[#0F4C81]/10 mr-2 flex items-center justify-center">
                          <i className="fas fa-monument text-xs"></i>
                        </span>
                        <span>Historical Marvel</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ancient Frescoes Card */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill,g_auto,q_auto:best/activities/sigiriya-frescoes.jpg" 
                        alt="Ancient Frescoes at Sigiriya" 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#0F4C81]">
                        Art Highlight
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-3">Ancient Frescoes</h4>
                      <p className="text-gray-600 mb-4">
                        Admire the world-famous paintings of celestial maidens, preserved for over 1,500 years in a sheltered pocket of the rock. These colorful frescoes showcase the advanced artistic techniques of ancient Sri Lankan painters.
                      </p>
                      <div className="flex items-center text-sm text-[#0F4C81]">
                        <span className="inline-block w-4 h-4 rounded-full bg-[#0F4C81]/10 mr-2 flex items-center justify-center">
                          <i className="fas fa-palette text-xs"></i>
                        </span>
                        <span>Cultural Wonder</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mirror Wall Card */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill,g_auto,q_auto:best/activities/sigiriya-mirror-wall.jpg" 
                        alt="Mirror Wall at Sigiriya" 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#0F4C81]">
                        Ancient Text
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-3">Mirror Wall</h4>
                      <p className="text-gray-600 mb-4">
                        Discover the ancient graffiti on Sigiriya's mirror wall, once polished so smooth it reflected the frescoes above. Today, it bears verses and comments from visitors dating back to the 8th century, offering insights into historical perspectives.
                      </p>
                      <div className="flex items-center text-sm text-[#0F4C81]">
                        <span className="inline-block w-4 h-4 rounded-full bg-[#0F4C81]/10 mr-2 flex items-center justify-center">
                          <i className="fas fa-pen-fancy text-xs"></i>
                        </span>
                        <span>Historical Insight</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Panoramic Views Card */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill,g_auto,q_auto:best/activities/sigiriya-summit-view.jpg" 
                        alt="Panoramic Views from Sigiriya Summit" 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#0F4C81]">
                        Scenic Vista
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-3">Panoramic Views</h4>
                      <p className="text-gray-600 mb-4">
                        Experience breathtaking 360-degree panoramas from the summit platform. The lush jungle canopy stretches to the horizon, with distant mountains creating a dramatic backdrop. On clear days, you can spot Pidurangala Rock and several ancient water gardens.
                      </p>
                      <div className="flex items-center text-sm text-[#0F4C81]">
                        <span className="inline-block w-4 h-4 rounded-full bg-[#0F4C81]/10 mr-2 flex items-center justify-center">
                          <i className="fas fa-mountain text-xs"></i>
                        </span>
                        <span>Photography Highlight</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-6">
                  Make It a Journey, Not Just a Stop
                </h3>
                
                <p className="text-lg text-[#333333]/90 mb-8 leading-relaxed">
                  Pair Sigiriya with nearby wonders like Pidurangala Rock (for a dramatic sunrise view of Sigiriya itself), or the spiritual caves of Dambulla. You're not just seeing Sri Lanka — you're feeling it come alive.
                </p>
                
                {/* Featured Image - Frescoes */}
                <div className="rounded-lg overflow-hidden shadow-xl mb-12">
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_900,c_fill/activities/sigiriya-frescoes.jpg" 
                    alt="Sigiriya Frescoes" 
                    className="w-full h-auto" 
                  />
                  <div className="bg-[#F8F5F0] p-4 text-center">
                    <p className="text-[#333333]/80 italic">Sigiriya's ancient frescoes depict celestial maidens, preserved for over 1,500 years</p>
                  </div>
                </div>
              </div>
              
              {/* Tours Featuring This Destination */}
              <div className="mt-12 mb-16">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81]">
                    Tours Featuring Sigiriya
                  </h2>
                  <Link href="/tour-packages" className="text-[#0F4C81] hover:text-[#D4AF37] flex items-center gap-1 font-medium">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tour Card 1 */}
                  <div className="flex bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="w-1/3 h-auto relative">
                      <img 
                        src="/attached_assets/A Week in the Tropics.jpg" 
                        alt="Cultural Triangle Explorer" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute top-2 right-2 bg-[#D4AF37] text-white text-xs px-2 py-0.5 rounded-full">
                        Best Seller
                      </div>
                    </div>
                    <div className="w-2/3 p-4">
                      <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-1">Cultural Triangle Explorer</h3>
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>7 Days</span>
                        <span className="mx-2">•</span>
                        <Users className="w-4 h-4 mr-1" />
                        <span>Max 12 people</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-[#0F4C81]">
                          From $1,499
                        </span>
                        <Link 
                          href="/packages/cultural-triangle-explorer" 
                          className="text-[#0F4C81] hover:text-[#D4AF37] text-sm font-medium"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tour Card 2 */}
                  <div className="flex bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="w-1/3 h-auto relative">
                      <img 
                        src="/attached_assets/romantic honeymoon escape.jpg" 
                        alt="Sri Lanka Highlights" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute top-2 right-2 bg-[#0F4C81] text-white text-xs px-2 py-0.5 rounded-full">
                        Popular
                      </div>
                    </div>
                    <div className="w-2/3 p-4">
                      <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-1">Sri Lanka Highlights</h3>
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>10 Days</span>
                        <span className="mx-2">•</span>
                        <Users className="w-4 h-4 mr-1" />
                        <span>Max 10 people</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-[#0F4C81]">
                          From $2,199
                        </span>
                        <Link 
                          href="/packages/sri-lanka-highlights" 
                          className="text-[#0F4C81] hover:text-[#D4AF37] text-sm font-medium"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              {/* Essential Information */}
              <div className="bg-[#F9F7F4] p-6 rounded-xl shadow-sm mb-8 sticky top-4">
                <h3 className="font-['Playfair_Display'] text-xl font-bold mb-6 text-gray-900">Essential Information</h3>
                
                <div className="space-y-5">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                      <i className="fas fa-calendar text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Best Time to Visit</h4>
                      <p className="text-gray-600">December to April, during the dry season</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                      <i className="fas fa-clock text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Recommended Duration</h4>
                      <p className="text-gray-600">4-5 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] flex-shrink-0">
                      <i className="fas fa-sun text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Weather</h4>
                      <p className="text-gray-600">Hot and humid with temperatures ranging from 22-32°C year-round</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                        Lion Gate
                      </span>
                      <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                        Ancient Frescoes
                      </span>
                      <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                        Mirror Wall
                      </span>
                      <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                        Summit Views
                      </span>
                      <span className="bg-white px-3 py-1 rounded-full text-sm text-gray-700">
                        Water Gardens
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Travel Tips</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Start your climb early morning (opens at 7 AM)</li>
                      <li>Bring water and wear comfortable shoes</li>
                      <li>Allow 3-4 hours for the full experience</li>
                      <li>Consider hiring a guide for historical context</li>
                    </ul>
                  </div>
                  
                  <div className="pt-5 mt-5 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Getting Here</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Sigiriya, Central Province, Sri Lanka</li>
                      <li>3-4 hours from Colombo by car</li>
                      <li>30-minute helicopter transfer available</li>
                    </ul>
                  </div>
                  
                  <div className="pt-5 mt-5 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Nearby Attractions</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3">
                          <img
                            src="/attached_assets/image_1743183016164.png"
                            alt="Dambulla Cave Temple"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-0.5 text-gray-900">Dambulla Cave Temple</h5>
                          <p className="text-xs text-gray-600">17 km - UNESCO World Heritage Site</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3">
                          <img
                            src="/attached_assets/image_1743100519865.png"
                            alt="Pidurangala Rock"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-0.5 text-gray-900">Pidurangala Rock</h5>
                          <p className="text-xs text-gray-600">2 km - Panoramic views of Sigiriya</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3">
                          <img
                            src="/attached_assets/image_1743101273205.png"
                            alt="Minneriya National Park"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-0.5 text-gray-900">Minneriya National Park</h5>
                          <p className="text-xs text-gray-600">30 km - Famous for elephant gatherings</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link 
                    href="/custom-tour-request" 
                    className="block w-full bg-[#0F4C81] hover:bg-[#0D3E6A] text-white font-medium py-3 px-6 rounded-lg text-center transition"
                  >
                    Create Custom Tour
                  </Link>
                  <Link 
                    href="/contact" 
                    className="block w-full bg-white border border-[#0F4C81] text-[#0F4C81] hover:bg-[#F9F7F4] font-medium py-3 px-6 rounded-lg text-center mt-3 transition"
                  >
                    Ask a Question
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Photo Gallery Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81]">
              Photo Gallery
            </h2>
            <div className="flex items-center gap-2 text-[#0F4C81]">
              <Camera className="w-5 h-5" />
              <span className="font-medium">5 Photos</span>
            </div>
          </div>
          
          {/* Asymmetrical Gallery with Lightbox */}
          <AsymmetricalGallery 
            images={[
              {
                baseUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_900,c_fill/activities/sigiriya-main-view.jpg",
                alt: "Sigiriya Rock Fortress",
                small: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_600,h_400,c_fill/activities/sigiriya-main-view.jpg",
                medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_1200,h_800,c_fill/activities/sigiriya-main-view.jpg",
                large: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_1600,h_900,c_fill/activities/sigiriya-main-view.jpg",
                caption: "The majestic Sigiriya Rock Fortress rises 200 meters above the surrounding plains"
              },
              {
                baseUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill,g_auto,q_auto:best/activities/sigiriya-lion-gate.jpg",
                alt: "Lion Gate at Sigiriya",
                small: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_600,h_400,c_fill/activities/sigiriya-lion-gate.jpg",
                medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill/activities/sigiriya-lion-gate.jpg",
                large: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_1200,h_800,c_fill/activities/sigiriya-lion-gate.jpg",
                caption: "The impressive Lion Gate with ancient paw carvings marking the final ascent"
              },
              {
                baseUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill,g_auto,q_auto:best/activities/sigiriya-frescoes.jpg",
                alt: "Ancient Frescoes at Sigiriya",
                small: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_600,h_400,c_fill/activities/sigiriya-frescoes.jpg",
                medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill/activities/sigiriya-frescoes.jpg",
                large: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_1200,h_800,c_fill/activities/sigiriya-frescoes.jpg",
                caption: "The well-preserved ancient frescoes depicting celestial maidens"
              },
              {
                baseUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill,g_auto,q_auto:best/activities/sigiriya-mirror-wall.jpg",
                alt: "Mirror Wall at Sigiriya",
                small: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_600,h_400,c_fill/activities/sigiriya-mirror-wall.jpg",
                medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill/activities/sigiriya-mirror-wall.jpg",
                large: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_1200,h_800,c_fill/activities/sigiriya-mirror-wall.jpg",
                caption: "The ancient mirror wall with historical graffiti dating back to the 8th century"
              },
              {
                baseUrl: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill,g_auto,q_auto:best/activities/sigiriya-summit-view.jpg",
                alt: "Panoramic Views from Sigiriya Summit",
                small: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_600,h_400,c_fill/activities/sigiriya-summit-view.jpg",
                medium: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_800,h_500,c_fill/activities/sigiriya-summit-view.jpg",
                large: "https://res.cloudinary.com/drsjp6bqz/image/upload/w_1200,h_800,c_fill/activities/sigiriya-summit-view.jpg",
                caption: "Breathtaking panoramic views from the summit platform of Sigiriya"
              }
            ]}
            className="mb-6"
          />
        </div>
      </section>
      
      {/* Local Experiences Section */}
      <section className="py-16 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-6">
              Local Experiences
            </h2>
            <p className="text-lg text-[#333333]/80 max-w-3xl mx-auto">
              Complete your visit to Sigiriya with these authentic Sri Lankan experiences nearby
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Experience Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-xl">
              <div className="relative h-64">
                <img 
                  src="/attached_assets/image_1743100519865.png" 
                  alt="Sunrise at Pidurangala" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-sm px-3 py-1 rounded-full">
                  Popular
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Sunrise at Pidurangala</h3>
                <p className="text-[#333333]/80 mb-4">
                  Climb Pidurangala Rock for the most breathtaking views of Sigiriya and the surrounding landscapes at dawn.
                </p>
                <div>
                  <Link href="/experiences/sunrise-pidurangala" className="text-[#0F4C81] font-medium hover:text-[#D4AF37] transition flex items-center">
                    Book This Experience <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Experience Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-xl">
              <div className="relative h-64">
                <img 
                  src="/attached_assets/image_1743101273205.png" 
                  alt="Minneriya Safari" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 right-4 bg-[#0F4C81] text-white text-sm px-3 py-1 rounded-full">
                  Bestseller
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Minneriya Safari</h3>
                <p className="text-[#333333]/80 mb-4">
                  Experience one of Asia's most spectacular wildlife gatherings with hundreds of elephants in their natural habitat.
                </p>
                <div>
                  <Link href="/experiences/minneriya-safari" className="text-[#0F4C81] font-medium hover:text-[#D4AF37] transition flex items-center">
                    Book This Experience <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Experience Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-xl">
              <div className="relative h-64">
                <img 
                  src="/attached_assets/mirissa (8).jpg" 
                  alt="Village Cycling Tour" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-sm px-3 py-1 rounded-full">
                  Authentic
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Village Cycling Tour</h3>
                <p className="text-[#333333]/80 mb-4">
                  Cycle through rural villages, meet locals, and experience authentic rural life in the shadow of Sigiriya rock.
                </p>
                <div>
                  <Link href="/experiences/village-cycling-tour" className="text-[#0F4C81] font-medium hover:text-[#D4AF37] transition flex items-center">
                    Book This Experience <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/experiences" className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition inline-flex items-center">
              View All Experiences <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
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