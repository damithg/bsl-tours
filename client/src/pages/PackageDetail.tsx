import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { TourPackage } from "@shared/schema";
import ContactForm from "@/components/ContactForm";

const PackageDetail = () => {
  const { id } = useParams();
  const packageId = parseInt(id || "0");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { data: packageData, isLoading, error } = useQuery<TourPackage>({
    queryKey: ['/api/tour-packages', packageId],
  });

  // Format rating to display as stars (50 = 5 stars)
  const formatRating = (rating: number) => {
    const fullStars = Math.floor(rating / 10);
    const hasHalfStar = rating % 10 >= 5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="text-[#D4AF37] flex">
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="fas fa-star"></i>
        ))}
        {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
      </div>
    );
  };

  // Additional images for the package (using the main image plus variations)
  const packageImages = packageData ? [
    packageData.image,
    "https://images.unsplash.com/photo-1599561046251-bfb9465b4c44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1578005343021-46ec921ee656?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1588598158189-3d6e4dade28b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  ] : [];

  // Package features
  const features = [
    { icon: "fa-concierge-bell", text: "Personal Travel Consultant" },
    { icon: "fa-car", text: "Private Transportation" },
    { icon: "fa-hotel", text: "Luxury Accommodations" },
    { icon: "fa-utensils", text: "Authentic Culinary Experiences" },
    { icon: "fa-camera", text: "Professional Photography Sessions" },
    { icon: "fa-map-marked-alt", text: "Custom Itinerary" }
  ];

  // Itinerary details (sample based on package type)
  const itinerary = packageData ? [
    {
      day: 1,
      title: "Arrival & Welcome",
      description: "Arrive at Bandaranaike International Airport, where your personal chauffeur will greet you. Transfer to your luxury hotel in Colombo for a welcome dinner with traditional performances."
    },
    {
      day: 2,
      title: "Colombo City Exploration",
      description: "Explore Colombo's colonial architecture, vibrant markets, and cultural sites with your private guide. Enjoy lunch at a acclaimed restaurant and evening cocktails overlooking the Indian Ocean."
    },
    {
      day: 3,
      title: "Journey to Cultural Triangle",
      description: "Travel to the Cultural Triangle in a luxury vehicle, stopping at spice gardens and local artisan workshops. Check into your exclusive boutique property with panoramic views."
    },
    // More days would be customized based on the specific package
  ] : [];

  if (isLoading) {
    return (
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg mb-8"></div>
          <div className="h-10 bg-gray-200 animate-pulse rounded w-1/2 mb-4"></div>
          <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4 mb-6"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-8"></div>
        </div>
      </main>
    );
  }

  if (error || !packageData) {
    return (
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-xl mx-auto">
            <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-4">Package Not Found</h1>
            <p className="text-lg text-[#333333]/80 mb-6">We couldn't find the tour package you're looking for.</p>
            <Link href="/packages" className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition">
              View All Packages
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-28 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Image and Thumbnails */}
            <div className="md:w-2/3">
              <div className="relative rounded-lg overflow-hidden mb-4 h-[400px] md:h-[500px]">
                <img 
                  src={packageImages[activeImageIndex]} 
                  alt={packageData.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-sm font-semibold py-1 px-3 rounded-full">
                  {packageData.duration} Days
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {packageImages.map((img, index) => (
                  <div 
                    key={index}
                    className={`h-20 rounded-md overflow-hidden cursor-pointer border-2 ${index === activeImageIndex ? 'border-[#0F4C81]' : 'border-transparent'}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Package Details */}
            <div className="md:w-1/3">
              <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-3">{packageData.title}</h1>
              
              <div className="flex items-center mb-4">
                {formatRating(packageData.rating)}
                <span className="text-sm text-gray-500 ml-2">{packageData.rating / 10} ({packageData.reviewCount} reviews)</span>
              </div>
              
              <div className="bg-[#F8F5F0] p-6 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-lg text-gray-500">Price</span>
                    <div className="text-[#0F4C81] text-3xl font-semibold">${packageData.price.toLocaleString()}</div>
                    <span className="text-gray-500">per person</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg text-gray-500">Duration</span>
                    <div className="text-[#0F4C81] text-3xl font-semibold">{packageData.duration}</div>
                    <span className="text-gray-500">days</span>
                  </div>
                </div>
                
                <Link 
                  href="#inquiry" 
                  className="w-full bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-3 px-4 rounded-md transition text-center block"
                >
                  Book This Tour
                </Link>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0F4C81]">Package Includes</h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <i className={`fas ${feature.icon} text-[#2E8B57] w-6`}></i>
                      <span className="ml-2">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Description */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#0F4C81] mb-6">About This Tour</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-[#333333]/80 mb-4">{packageData.description}</p>
              <p className="text-[#333333]/80 mb-4">
                This exclusive luxury tour offers an immersive experience of Sri Lanka's most iconic destinations. With private transportation, expert guides, and carefully selected accommodations, you'll discover the natural beauty and cultural heritage of this enchanting island in unparalleled comfort and style.
              </p>
              <p className="text-[#333333]/80">
                Whether you're exploring ancient temples, relaxing on pristine beaches, or venturing through lush tea plantations, every day brings new discoveries and unforgettable moments. Our personal concierge service ensures that every detail is tailored to your preferences.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Itinerary */}
      <section className="py-10 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#0F4C81] mb-6">Day-by-Day Itinerary</h2>
            
            <div className="space-y-8">
              {itinerary.map((day) => (
                <div key={day.day} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-[#0F4C81] text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold">Day {day.day}</span>
                    </div>
                    <div className="ml-6">
                      <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0F4C81] mb-2">{day.title}</h3>
                      <p className="text-[#333333]/80">{day.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-dashed border-[#0F4C81]/30 text-center">
                <p className="text-[#333333]/80 mb-4">The full itinerary includes {packageData.duration} days of curated experiences.</p>
                <p className="text-[#333333]/80 italic">Contact us for the complete day-by-day breakdown.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Inquiry Form */}
      <section id="inquiry" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#0F4C81] mb-4">Book This Package</h2>
              <p className="text-lg text-[#333333]/80">Complete the form below and one of our luxury travel consultants will contact you within 24 hours to discuss your booking.</p>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>
      
      {/* Related Packages */}
      <section className="py-16 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#0F4C81] mb-4">You May Also Like</h2>
            <p className="text-lg text-[#333333]/80">Explore our other luxury experiences in Sri Lanka</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition transform hover:scale-[1.02] hover:shadow-xl">
              <div className="relative h-64">
                <img 
                  src="https://images.unsplash.com/photo-1544535830-2a087b7641c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Wildlife Safari Experience" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-sm font-semibold py-1 px-3 rounded-full">
                  6 Days
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Wildlife Safari Experience</h3>
                <p className="text-[#333333]/70 mb-4">Discover Sri Lanka's incredible wildlife in luxury tented camps and boutique lodges.</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">From</span>
                    <span className="text-[#0F4C81] text-xl font-semibold">$2,199</span>
                  </div>
                  <Link href="/packages/4" className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition">View Details</Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition transform hover:scale-[1.02] hover:shadow-xl">
              <div className="relative h-64">
                <img 
                  src="https://images.unsplash.com/photo-1578005343021-46ec921ee656?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Ayurvedic Wellness Retreat" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-sm font-semibold py-1 px-3 rounded-full">
                  5 Days
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Ayurvedic Wellness Retreat</h3>
                <p className="text-[#333333]/70 mb-4">Rejuvenate with ancient healing traditions in luxury wellness sanctuaries.</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">From</span>
                    <span className="text-[#0F4C81] text-xl font-semibold">$1,899</span>
                  </div>
                  <Link href="/packages" className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition">View Details</Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition transform hover:scale-[1.02] hover:shadow-xl">
              <div className="relative h-64">
                <img 
                  src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Coastal Getaway" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-sm font-semibold py-1 px-3 rounded-full">
                  7 Days
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Coastal Luxury Getaway</h3>
                <p className="text-[#333333]/70 mb-4">Experience the finest beach resorts and water activities along Sri Lanka's coast.</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">From</span>
                    <span className="text-[#0F4C81] text-xl font-semibold">$2,499</span>
                  </div>
                  <Link href="/packages/2" className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition">View Details</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PackageDetail;
