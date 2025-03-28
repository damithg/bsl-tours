import { useQuery } from "@tanstack/react-query";
import { Destination } from "@shared/schema";
import { Link } from "wouter";
import { Home, ChevronRight } from "lucide-react";

const Destinations = () => {
  const { data: destinations, isLoading, error } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  // Additional content for featured destination
  const featuredDestinationContent = {
    title: "Explore the Wonder of Sri Lanka",
    description: "From ancient cities to pristine beaches, misty mountains to wildlife sanctuaries, discover the diverse landscapes and cultural treasures of this island paradise.",
    image: "https://images.unsplash.com/photo-1586861642026-fc21a5ae85b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
  };

  // Other key experiences we offer
  const keyExperiences = [
    {
      title: "Cultural Heritage",
      description: "Explore UNESCO World Heritage sites, ancient temples, and colonial architecture with expert guides.",
      icon: "fa-landmark"
    },
    {
      title: "Wildlife Encounters",
      description: "See leopards, elephants, and exotic birds in their natural habitats with luxury safari experiences.",
      icon: "fa-paw"
    },
    {
      title: "Beach Luxury",
      description: "Unwind at exclusive beach resorts with private villas, infinity pools, and personalized service.",
      icon: "fa-umbrella-beach"
    },
    {
      title: "Tea Plantation Tours",
      description: "Journey through emerald tea fields and learn about Ceylon tea production with private tastings.",
      icon: "fa-mug-hot"
    }
  ];

  return (
    <main>
      {/* Hero Section with Breadcrumbs */}
      <section className="relative h-[500px] bg-[#0F4C81]">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src={featuredDestinationContent.image} 
            alt="Sri Lanka destinations" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28">
          {/* Breadcrumb Navigation */}
          <nav className="flex text-white/90 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <ChevronRight className="w-5 h-5 text-white/60" />
                  <span className="ml-1 text-sm font-medium text-white/80">
                    Destinations
                  </span>
                </div>
              </li>
            </ol>
          </nav>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {featuredDestinationContent.title}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {featuredDestinationContent.description}
            </p>
          </div>
        </div>
      </section>

      {/* Key Experiences */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Luxury Experiences</h2>
            <p className="text-lg text-[#333333]/80">Discover Sri Lanka through our carefully curated experiences that combine luxury, authenticity, and exclusivity.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyExperiences.map((experience, index) => (
              <div key={index} className="bg-[#F8F5F0] p-8 rounded-lg text-center">
                <div className="w-16 h-16 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mx-auto mb-6">
                  <i className={`fas ${experience.icon} text-2xl text-[#0F4C81]`}></i>
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3">{experience.title}</h3>
                <p className="text-[#333333]/70">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Stunning Destinations</h2>
            <p className="text-lg text-[#333333]/80">Explore Sri Lanka's most captivating locations, each offering unique experiences and luxury accommodations.</p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg h-96 animate-pulse">
                  <div className="h-64 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded w-1/2 mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">Failed to load destinations. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations?.map((destination) => (
                <div key={destination.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition transform hover:scale-[1.02] hover:shadow-xl">
                  <div className="relative h-64">
                    <img 
                      src={destination.imageUrl} 
                      alt={destination.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3">{destination.name}</h3>
                    <p className="text-[#333333]/70 mb-4">{destination.excerpt || destination.shortDescription || destination.description}</p>
                    <Link href={`/destination/${destination.slug || destination.id}`} className="inline-flex items-center text-[#0F4C81] font-medium hover:text-[#2E8B57] transition">
                      Explore Experiences
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Destination - Detailed */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0">
              <Link href="/destination/sigiriya-rock-fortress" className="block hover:text-[#2E8B57] transition">
                <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-6">Sigiriya: The Ancient Wonder</h2>
              </Link>
              <p className="text-lg text-[#333333]/80 mb-6">Rising dramatically from the central plains, the iconic rocky outcrop of Sigiriya is perhaps Sri Lanka's most dramatic sight. Near-vertical walls soar to a flat-topped summit that contains the ruins of an ancient civilization, thought to be once the epicenter of the short-lived kingdom of Kassapa.</p>
              <p className="text-lg text-[#333333]/80 mb-8">Our luxury experience includes exclusive early morning access before other tourists arrive, a gourmet breakfast with panoramic views, and insights from an archaeology expert who will reveal the secrets of this UNESCO World Heritage Site.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mr-4">
                    <i className="fas fa-check text-[#0F4C81]"></i>
                  </div>
                  <p className="text-[#333333]/80">Private guided tour with archaeology specialist</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mr-4">
                    <i className="fas fa-check text-[#0F4C81]"></i>
                  </div>
                  <p className="text-[#333333]/80">Luxury helicopter transfers available</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mr-4">
                    <i className="fas fa-check text-[#0F4C81]"></i>
                  </div>
                  <p className="text-[#333333]/80">Stay at the exclusive Water Garden Sigiriya luxury resort</p>
                </div>
              </div>
              
              <Link href="/contact" className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition inline-flex items-center">
                Inquire About This Experience
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <Link href="/destination/sigiriya-rock-fortress">
                  <img 
                    src="https://images.unsplash.com/photo-1583087253076-5d1315860eb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                    alt="Sigiriya Rock Fortress" 
                    className="rounded-lg shadow-xl hover:opacity-95 transition-opacity" 
                  />
                </Link>
                <div className="absolute -bottom-10 -right-10 p-6 bg-white rounded-lg shadow-lg max-w-xs hidden md:block">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-star text-[#D4AF37] text-2xl mr-4"></i>
                    <h3 className="font-['Playfair_Display'] text-lg font-semibold">Exclusive Experience</h3>
                  </div>
                  <p className="text-[#333333]/70">Our guests enjoy private access to areas closed to regular visitors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-4">Explore Sri Lanka</h2>
            <p className="text-lg text-[#333333]/80">Discover the diverse regions of Sri Lanka and start planning your luxury journey.</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <img 
              src="https://images.unsplash.com/photo-1604998103924-89e012e5265a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
              alt="Map of Sri Lanka" 
              className="w-full h-auto rounded-lg"
            />
            {/* Map would normally have interactive elements - simplified for this demo */}
            <div className="mt-8 text-center">
              <Link href="/contact" className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition">
                Plan Your Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#0F4C81] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1551357141-b1311e102261?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Sri Lanka landscape" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Discover Sri Lanka's Treasures?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Let our experts craft a personalized journey through these stunning destinations, tailored to your preferences and travel style.
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

export default Destinations;
