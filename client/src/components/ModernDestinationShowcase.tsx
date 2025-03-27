import { useState } from 'react';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

interface Destination {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  featured?: boolean;
  regionCode?: string;
  shortDescription?: string;
  bestTimeToVisit?: string;
  highlights?: string; // JSON string array
}

interface DestinationCardProps {
  destination: Destination;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const DestinationCard = ({ destination, index, isActive, onClick }: DestinationCardProps) => {
  // Parse highlights if they exist
  const highlightItems = destination.highlights 
    ? JSON.parse(destination.highlights)
    : ['Wildlife Encounters', 'Luxury Accommodations', 'Guided Tours'];

  return (
    <div 
      className={`flex flex-col transition-all duration-500 ease-in-out cursor-pointer rounded-3xl overflow-hidden
                 ${isActive ? 'col-span-1 md:col-span-2 row-span-1 md:row-span-2' : 'opacity-90 hover:opacity-100'}`}
      onClick={onClick}
    >
      <div className="relative w-full h-full aspect-[4/5] overflow-hidden group">
        {/* Image */}
        <img 
          src={destination.imageUrl} 
          alt={destination.name} 
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105
                    ${isActive ? 'brightness-90' : 'brightness-75 hover:brightness-90'}`}
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
          <div className={`transition-all duration-500 ${isActive ? 'mb-8' : 'mb-4'}`}>
            <h3 className={`font-['Playfair_Display'] font-bold leading-tight mb-2
                          ${isActive ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
              {destination.name}
            </h3>
            
            {isActive && (
              <div className="mt-3 space-y-4">
                <p className="text-white/90 max-w-md">
                  {destination.shortDescription || destination.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {highlightItems.slice(0, 3).map((highlight: string, idx: number) => (
                    <span key={idx} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {highlight}
                    </span>
                  ))}
                </div>

                <Link 
                  href={`/destination/${destination.slug}`} 
                  className="inline-flex items-center mt-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 
                           text-white font-medium py-2 px-5 rounded-full transition group"
                >
                  Explore Destination
                  <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>
          
          {/* Numbered index badge */}
          <div className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center 
                        bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
            {String(index+1).padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  );
};

const SriLankaDestinations = [
  {
    id: 1,
    name: "Sigiriya Rock Fortress",
    slug: "sigiriya-rock-fortress",
    description: "Ancient rock fortress with panoramic views and stunning frescoes",
    shortDescription: "Discover the iconic ancient rock fortress with breathtaking panoramic views, spectacular frescoes, and rich history dating back to the 5th century.",
    imageUrl: "https://images.unsplash.com/photo-1586613835341-6003c0e2fb11?auto=format&fit=crop&w=1600&q=80",
    regionCode: "central",
    bestTimeToVisit: "January to April",
    highlights: JSON.stringify(["UNESCO Heritage Site", "Ancient Frescoes", "Panoramic Views"])
  },
  {
    id: 2,
    name: "Yala National Park",
    slug: "yala-national-park",
    description: "Luxury safari experiences with the highest leopard density in the world",
    shortDescription: "Experience exclusive luxury safaris in one of Asia's premier wildlife reserves, home to the highest leopard density in the world and diverse ecosystems.",
    imageUrl: "https://images.unsplash.com/photo-1561996775-0b7469f6e8c9?auto=format&fit=crop&w=1600&q=80",
    regionCode: "south",
    bestTimeToVisit: "February to July",
    highlights: JSON.stringify(["Leopard Safaris", "Luxury Tented Camps", "Bird Watching"])
  },
  {
    id: 3,
    name: "Galle Fort",
    slug: "galle-fort",
    description: "Colonial charm with boutique hotels, cafes and ocean views",
    shortDescription: "Wander through the enchanting colonial-era fort with boutique hotels, artisan shops, and stunning ocean views from historic ramparts.",
    imageUrl: "https://images.unsplash.com/photo-1588997476056-12ce2958fffe?auto=format&fit=crop&w=1600&q=80",
    regionCode: "south",
    bestTimeToVisit: "December to April",
    highlights: JSON.stringify(["Colonial Architecture", "Boutique Shopping", "Ocean Views"])
  },
  {
    id: 4,
    name: "Ella",
    slug: "ella",
    description: "Mountain vistas, tea plantations, and iconic Nine Arch Bridge",
    shortDescription: "Retreat to the misty hills featuring panoramic mountain vistas, lush tea plantations, and the iconic Nine Arch Bridge railway marvel.",
    imageUrl: "https://images.unsplash.com/photo-1580889272861-dc2dbf242676?auto=format&fit=crop&w=1600&q=80",
    regionCode: "hill-country",
    bestTimeToVisit: "March to May",
    highlights: JSON.stringify(["Nine Arch Bridge", "Tea Estates", "Little Adam's Peak"])
  },
  {
    id: 5,
    name: "Mirissa",
    slug: "mirissa",
    description: "Idyllic beach with luxury villas and world-class whale watching",
    shortDescription: "Relax at this idyllic beach paradise with exclusive luxury villas, pristine shores, and world-class whale watching excursions.",
    imageUrl: "https://images.unsplash.com/photo-1582530239833-524a8933a99c?auto=format&fit=crop&w=1600&q=80",
    regionCode: "south",
    bestTimeToVisit: "November to April",
    highlights: JSON.stringify(["Blue Whale Watching", "Luxury Beach Villas", "Sunset Sailing"])
  },
  {
    id: 6,
    name: "Kandy",
    slug: "kandy",
    description: "Sacred Temple of the Tooth and serene lake surrounded by hills",
    shortDescription: "Explore the cultural heart of Sri Lanka with its sacred Temple of the Tooth, serene lake views, and vibrant traditional arts and crafts.",
    imageUrl: "https://images.unsplash.com/photo-1605541808999-dd63981bb9dd?auto=format&fit=crop&w=1600&q=80",
    regionCode: "central",
    bestTimeToVisit: "January to April",
    highlights: JSON.stringify(["Temple of the Tooth", "Cultural Dance", "Royal Botanical Gardens"])
  },
];

export function ModernDestinationShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { formatPrice } = useCurrency();
  
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row mb-12">
          <div className="lg:w-1/2">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Discover the beauty of <br />Sri Lanka with Us
            </h2>
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <p className="text-lg text-white/80 mt-4 lg:mt-8">
              Experience the best of Sri Lanka with our luxury tour services. Our experienced guides, customizable packages, and commitment to customer satisfaction ensure an unforgettable journey.
            </p>
          </div>
        </div>
        
        {/* Grid of destinations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {SriLankaDestinations.map((destination, index) => (
            <DestinationCard 
              key={destination.id}
              destination={destination}
              index={index}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        
        {/* Highlights Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          <div className="space-y-4">
            <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold">
              Experienced Guides
            </h3>
            <p className="text-white/80">
              Our local guides have extensive knowledge of Sri Lanka's history, culture, and hidden gems. They create personalized experiences that bring the island to life.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold">
              Customizable Packages
            </h3>
            <p className="text-white/80">
              Tailor your Sri Lanka journey according to your preferences and interests. Whether you're seeking cultural immersion, wildlife adventures, or beach relaxation, we craft the perfect itinerary.
            </p>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Link href="/contact" className="inline-block bg-white text-black hover:bg-white/90 font-medium py-4 px-10 rounded-full transition">
            Book Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ModernDestinationShowcase;