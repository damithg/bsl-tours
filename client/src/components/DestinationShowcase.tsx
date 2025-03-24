import { useQuery } from "@tanstack/react-query";
import { Destination } from "@shared/schema";

const DestinationShowcase = () => {
  const { data: destinations, isLoading, error } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  if (isLoading) {
    return (
      <section id="destinations" className="py-20 bg-gradient-to-b from-[#0F4C81]/5 to-[#0F4C81]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Stunning Destinations</h2>
            <p className="text-lg text-[#333333]/80">Discover Sri Lanka's most breathtaking locations, where luxury and natural beauty combine for unforgettable experiences.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg shadow-lg h-80 bg-gray-300 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="destinations" className="py-20 bg-gradient-to-b from-[#0F4C81]/5 to-[#0F4C81]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Stunning Destinations</h2>
            <p className="text-red-500">Failed to load destinations. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" className="py-20 bg-gradient-to-b from-[#0F4C81]/5 to-[#0F4C81]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Stunning Destinations</h2>
          <p className="text-lg text-[#333333]/80">Discover Sri Lanka's most breathtaking locations, where luxury and natural beauty combine for unforgettable experiences.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations?.map((destination) => (
            <div key={destination.id} className="group relative overflow-hidden rounded-lg shadow-lg h-80">
              <img 
                src={destination.image} 
                alt={destination.name} 
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-['Playfair_Display'] text-xl text-white font-semibold mb-2">{destination.name}</h3>
                <p className="text-white/80 mb-4 max-w-xs">{destination.description}</p>
                <a href="#" className="inline-flex items-center text-white hover:text-[#D4AF37] transition">
                  Explore <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationShowcase;
