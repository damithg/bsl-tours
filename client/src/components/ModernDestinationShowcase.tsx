import { useState } from 'react';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

// Define the type for destination data
interface Destination {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  imageUrl: string;
  highlights: string[];
}

interface DestinationCardProps {
  destination: Destination;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const DestinationCard = ({ destination, index, isActive, onClick }: DestinationCardProps) => {
  const highlightItems = destination.highlights || ['Wildlife Encounters', 'Luxury Accommodations', 'Guided Tours'];

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

export function ModernDestinationShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { formatPrice } = useCurrency();
  
  // Hardcoded destination data for homepage showcase
  const destinations: Destination[] = [
    {
      id: 1,
      name: "Sigiriya Rock Fortress",
      slug: "sigiriya-rock-fortress",
      description: "Ancient rock fortress with panoramic views and stunning frescoes",
      shortDescription: "Experience the ancient marvel of Sigiriya Rock Fortress, a UNESCO World Heritage site with breathtaking views and fascinating history.",
      imageUrl: "https://images.unsplash.com/photo-1586613835341-6003c0e2fb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80",
      highlights: ["UNESCO Heritage", "Panoramic Views", "Ancient Frescoes"]
    },
    {
      id: 2,
      name: "Yala National Park",
      slug: "yala-national-park",
      description: "Sri Lanka's most famous wildlife sanctuary renowned for its leopard population",
      shortDescription: "Encounter majestic leopards, elephants, and diverse birdlife in Sri Lanka's premier wildlife reserve.",
      imageUrl: "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      highlights: ["Wildlife Safari", "Leopard Spotting", "Bird Watching"]
    },
    {
      id: 3,
      name: "Mirissa Beach",
      slug: "mirissa-beach",
      description: "Idyllic beach known for whale watching, surfing, and relaxed atmosphere",
      shortDescription: "Relax on golden sands, surf perfect waves, and embark on unforgettable whale watching expeditions.",
      imageUrl: "/attached_assets/mirissa (7).jpg",
      highlights: ["Whale Watching", "Surfing", "Beachfront Dining"]
    },
    {
      id: 4,
      name: "Kandy Sacred City",
      slug: "kandy-sacred-city",
      description: "Cultural capital and home to the Temple of the Sacred Tooth Relic",
      shortDescription: "Immerse yourself in Sri Lanka's cultural heritage in this sacred city nestled among misty hills.",
      imageUrl: "https://images.unsplash.com/photo-1588258147375-2a853c2eca41?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      highlights: ["Sacred Temple", "Cultural Shows", "Royal Botanic Gardens"]
    },
    {
      id: 5,
      name: "Ella",
      slug: "ella",
      description: "Picturesque mountain village with hiking trails and stunning views",
      shortDescription: "Adventure through tea plantations, hike to spectacular viewpoints, and ride the iconic blue train.",
      imageUrl: "https://images.unsplash.com/photo-1586269615957-3808b1c4936b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      highlights: ["Nine Arch Bridge", "Little Adam's Peak", "Scenic Train Ride"]
    },
    {
      id: 6,
      name: "Galle Fort",
      slug: "galle-fort",
      description: "Colonial-era fortress with Dutch architecture, boutiques and cafes",
      shortDescription: "Wander through centuries-old streets, discover artisan boutiques, and watch breathtaking sunsets from the ramparts.",
      imageUrl: "https://images.unsplash.com/photo-1577351045094-8dccaf5b7273?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
      highlights: ["Colonial Architecture", "Artisan Shops", "Sunset Views"]
    }
  ];
  
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
          {destinations.slice(0, 6).map((destination, index) => (
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
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-block bg-white text-black hover:bg-white/90 font-medium py-4 px-10 rounded-full transition">
              Book Your Journey
            </Link>
            <Link href="/destinations" className="inline-block bg-transparent border border-white text-white hover:bg-white/10 font-medium py-4 px-10 rounded-full transition">
              View All Destinations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModernDestinationShowcase;