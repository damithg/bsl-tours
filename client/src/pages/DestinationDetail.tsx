import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Destination } from '@shared/schema';
import { useCurrency } from '@/contexts/CurrencyContext';

interface RelatedTour {
  id: number;
  slug: string;
  title: string;
  duration: number;
  price: number;
  imageUrl: string;
}

const DestinationDetail = () => {
  const [, params] = useRoute<{ id: string }>('/destination/:id');
  const destinationId = params?.id ? parseInt(params.id, 10) : 0;
  const { formatPrice } = useCurrency();
  
  // Fetch destination data
  const { data: destination, isLoading, error } = useQuery<Destination>({
    queryKey: ['/api/destinations', destinationId],
    enabled: !!destinationId,
  });

  // Mock related tours based on the destination (in a real app, would be fetched from API)
  const relatedTours: RelatedTour[] = [
    {
      id: 1,
      slug: "cultural-heritage-tour",
      title: "Cultural Heritage Expedition",
      duration: 7,
      price: 2499,
      imageUrl: "/images/packages/cultural-heritage-expedition.jpg"
    },
    {
      id: 2,
      slug: "wildlife-safari",
      title: "Wildlife Safari Adventure",
      duration: 5,
      price: 1899,
      imageUrl: "/images/packages/wildlife-safari-adventure.jpg"
    },
    {
      id: 3,
      slug: "beach-retreat",
      title: "Tropical Beach Retreat",
      duration: 6,
      price: 2199,
      imageUrl: "/images/packages/tropical-beach-retreat.jpg"
    }
  ];

  // Sample experiences for this destination
  const experiences = [
    {
      title: "Private Guided Tours",
      description: "Explore the hidden treasures with our expert local guides who bring history and culture to life.",
      icon: "🔍"
    },
    {
      title: "Exclusive Access",
      description: "Enjoy special access to restricted areas and experience the destination without the crowds.",
      icon: "🔑"
    },
    {
      title: "Luxury Transportation",
      description: "Travel in comfort with our fleet of luxury vehicles and experienced drivers.",
      icon: "🚙"
    },
    {
      title: "Authentic Cuisine",
      description: "Savor local delicacies prepared by renowned chefs in stunning settings.",
      icon: "🍽️"
    }
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg mb-8"></div>
        <div className="w-2/3 h-10 bg-gray-200 animate-pulse rounded-lg mb-4"></div>
        <div className="w-full h-40 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-['Playfair_Display'] text-3xl text-[#0F4C81] mb-4">Destination Not Found</h2>
        <p className="mb-8">Sorry, we couldn't locate the destination you're looking for.</p>
        <Link href="/destinations" className="inline-block bg-[#0F4C81] text-white font-medium py-3 px-8 rounded-md">
          Return to Destinations
        </Link>
      </div>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[380px] overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img 
          src={destination.imageUrl || "https://images.unsplash.com/photo-1583087253076-5d1315860eb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} 
          alt={destination.name} 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white mb-4">{destination.name}</h1>
          <div className="flex flex-wrap gap-2">
            <span className="bg-[#D4AF37]/90 text-white px-3 py-1 rounded-full text-sm">Luxury Experience</span>
            <span className="bg-white/90 text-[#0F4C81] px-3 py-1 rounded-full text-sm">Cultural Heritage</span>
            <span className="bg-white/90 text-[#0F4C81] px-3 py-1 rounded-full text-sm">UNESCO Site</span>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-2/3">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-6">Destination Overview</h2>
              <p className="text-lg text-[#333333]/80 mb-6">
                {destination.description}
              </p>
              <p className="text-lg text-[#333333]/80 mb-6">
                Our luxury tours to {destination.name} offer an unparalleled travel experience with exclusive access to key sites, private guides, and exquisite accommodation options. Whether you're seeking cultural immersion, adventure, or simply relaxation, our tailored packages ensure you experience the very best this destination has to offer.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {experiences.map((experience, index) => (
                  <div key={index} className="bg-[#F8F5F0] p-6 rounded-lg">
                    <div className="text-3xl mb-3">{experience.icon}</div>
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">{experience.title}</h3>
                    <p className="text-[#333333]/70">{experience.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="bg-[#F8F5F0] p-6 rounded-lg shadow-sm">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Plan Your Visit</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Best Time to Visit</p>
                    <p className="text-[#333333]/70">January to April</p>
                  </div>
                  <div>
                    <p className="font-medium">Recommended Duration</p>
                    <p className="text-[#333333]/70">1-2 Days</p>
                  </div>
                  <div>
                    <p className="font-medium">Highlights</p>
                    <ul className="list-disc list-inside text-[#333333]/70">
                      <li>Panoramic Views</li>
                      <li>Ancient Frescoes</li>
                      <li>Royal Gardens</li>
                      <li>Mirror Wall</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Link href="/contact" className="block w-full bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-3 px-6 rounded-md text-center transition">
                    Inquire About Custom Tours
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-12 bg-[#F8F5F0]">
        <div className="container mx-auto px-4">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-8 text-center">Visual Journey</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 md:col-span-2 row-span-2">
              <img 
                src={`https://images.unsplash.com/photo-1583087253076-5d1315860eb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80`} 
                alt={`${destination.name} - Main View`} 
                className="w-full h-full object-cover rounded-lg" 
              />
            </div>
            <div>
              <img 
                src={`https://images.unsplash.com/photo-1627894966831-0c839fa78bfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`}
                alt={`${destination.name} - Detail 1`}
                className="w-full h-full object-cover rounded-lg" 
              />
            </div>
            <div>
              <img 
                src={`https://images.unsplash.com/photo-1531259922615-206732e4349b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`}
                alt={`${destination.name} - Detail 2`}
                className="w-full h-full object-cover rounded-lg" 
              />
            </div>
            <div>
              <img 
                src={`https://images.unsplash.com/photo-1618846042125-0a64dc7c3608?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`}
                alt={`${destination.name} - Detail 3`}
                className="w-full h-full object-cover rounded-lg" 
              />
            </div>
            <div>
              <img 
                src={`https://images.unsplash.com/photo-1613990721978-6da9d8b062fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`}
                alt={`${destination.name} - Detail 4`}
                className="w-full h-full object-cover rounded-lg" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Tours Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-8">Tours Featuring {destination.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedTours.map((tour) => (
              <div key={tour.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={tour.imageUrl || "https://images.unsplash.com/photo-1581260466152-d2c0303e51f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                    alt={tour.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">{tour.title}</h3>
                  <div className="flex items-center text-[#333333]/70 mb-4">
                    <span className="flex items-center mr-4">
                      <svg className="w-5 h-5 mr-1 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                      </svg>
                      {tour.duration} Days
                    </span>
                    <span className="font-semibold text-[#0F4C81]">
                      {formatPrice(tour.price)}
                    </span>
                  </div>
                  <Link href={`/tour/${tour.slug}`} className="block w-full bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md text-center transition">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
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
              Ready to Experience {destination.name}?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Let our experts craft a personalized journey featuring {destination.name}, tailored to your preferences and travel style.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/tour-packages" className="bg-white hover:bg-[#D4AF37] text-[#0F4C81] hover:text-white font-medium py-3 px-8 rounded-md transition">
                Browse Tour Packages
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium py-3 px-8 rounded-md transition">
                Contact Our Travel Experts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DestinationDetail;