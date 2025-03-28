import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { TourPackage } from "@shared/schema";
import ContactForm from "@/components/ContactForm";

const LuxuryPackageDetail = () => {
  const { id } = useParams();
  const packageId = parseInt(id || "0");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const { data: packageData, isLoading, error } = useQuery<TourPackage>({
    queryKey: ['/api/tour-packages', packageId],
  });

  // Format rating to display as stars (50 = 5 stars)
  const formatRating = (rating: number) => {
    const fullStars = Math.min(Math.floor(rating / 10), 5);
    const hasHalfStar = rating % 10 >= 5 && fullStars < 5;
    const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));
    
    return (
      <div className="text-amber-400 flex">
        {Array.from({length: fullStars}, (_, i) => (
          <i key={`full-${i}`} className="fas fa-star"></i>
        ))}
        {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
        {Array.from({length: emptyStars}, (_, i) => (
          <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
      </div>
    );
  };

  // Additional images for the package (using the main image plus variations)
  const packageImages = packageData ? [
    packageData.imageUrl,
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
      {/* Hero Banner Section */}
      <section className="relative pt-28 pb-16 bg-gradient-to-r from-[#0F4C81] to-[#137795]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src={packageData.imageUrl} 
            alt={packageData.title} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-amber-400 text-white px-4 py-1 rounded-full mb-4 text-sm font-semibold">
              {packageData.duration} Days Luxury Experience
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {packageData.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Experience the finest luxury tour through Sri Lanka's most captivating destinations
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <i className="fas fa-clock text-amber-400 mr-2"></i>
                <span className="text-white">{packageData.duration} Days</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <i className="fas fa-map-marker-alt text-amber-400 mr-2"></i>
                <span className="text-white">Multiple Destinations</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <i className="fas fa-dollar-sign text-amber-400 mr-2"></i>
                <span className="text-white">From ${packageData.price?.toLocaleString() || "0"}</span>
              </div>
            </div>
            <div className="mt-10">
              <a href="#booking" className="bg-amber-400 hover:bg-amber-500 text-white text-lg font-semibold px-8 py-3 rounded-full transition duration-300 shadow-lg hover:shadow-xl">
                Book This Package
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column - Gallery & Details */}
            <div className="lg:w-8/12">
              {/* Gallery Section */}
              <div className="mb-16">
                <div className="relative rounded-xl overflow-hidden h-[500px] mb-4 shadow-xl">
                  <img 
                    src={packageImages[activeImageIndex]} 
                    alt={packageData.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Controls */}
                  <button 
                    onClick={() => setActiveImageIndex(prev => prev === 0 ? packageImages.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition duration-300"
                  >
                    <i className="fas fa-chevron-left text-[#0F4C81] text-xl"></i>
                  </button>
                  <button 
                    onClick={() => setActiveImageIndex(prev => prev === packageImages.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-md transition duration-300"
                  >
                    <i className="fas fa-chevron-right text-[#0F4C81] text-xl"></i>
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {activeImageIndex + 1} / {packageImages.length}
                  </div>
                </div>
                
                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-3">
                  {packageImages.map((img, index) => (
                    <div 
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`h-24 rounded-lg overflow-hidden cursor-pointer transition-all ${
                        index === activeImageIndex 
                          ? 'ring-4 ring-amber-400 ring-offset-2' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Overview Section */}
              <div className="mb-16">
                <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-6 relative pl-4 border-l-4 border-amber-400">
                  Tour Overview
                </h2>
                <div className="prose prose-lg max-w-none text-[#333333]/90">
                  <p className="mb-6 leading-relaxed">{packageData.shortDescription || packageData.description}</p>
                  <p className="mb-6 leading-relaxed">
                    This exclusive luxury tour offers an immersive experience of Sri Lanka's most iconic destinations. With private transportation, expert guides, and carefully selected accommodations, you'll discover the natural beauty and cultural heritage of this enchanting island in unparalleled comfort and style.
                  </p>
                  <p className="leading-relaxed">
                    Whether you're exploring ancient temples, relaxing on pristine beaches, or venturing through lush tea plantations, every day brings new discoveries and unforgettable moments. Our personal concierge service ensures that every detail is tailored to your preferences.
                  </p>
                </div>
                
                {/* Highlights */}
                <div className="mt-10 p-8 rounded-xl bg-gradient-to-r from-[#F8F5F0] to-[#F7F4ED]">
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0F4C81] mb-6">
                    Tour Highlights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-white p-3 rounded-full shadow-md mr-4">
                          <i className={`fas ${feature.icon} text-amber-400 text-lg`}></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-[#0F4C81]">{feature.text}</h4>
                          <p className="text-[#333333]/70 text-sm mt-1">Included in this package</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Itinerary Section */}
              <div className="mb-16">
                <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-8 relative pl-4 border-l-4 border-amber-400">
                  Day-by-Day Itinerary
                </h2>
                
                <div className="relative pl-8 border-l-2 border-dashed border-[#0F4C81]/30">
                  {itinerary.map((day, index) => (
                    <div key={day.day} className="mb-12 relative">
                      {/* Day Indicator */}
                      <div className="absolute -left-8 w-14 h-14 bg-[#0F4C81] text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="font-bold">Day {day.day}</span>
                      </div>
                      
                      {/* Content */}
                      <div className="ml-10 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0F4C81] mb-3">
                          {day.title}
                        </h3>
                        <p className="text-[#333333]/80 leading-relaxed">
                          {day.description}
                        </p>
                        
                        {/* Indicator for last day vs more days */}
                        {index === itinerary.length - 1 ? (
                          <div className="mt-4 pt-4 border-t border-dashed border-[#0F4C81]/20 text-center">
                            <div className="inline-flex items-center text-amber-500">
                              <i className="fas fa-info-circle mr-2"></i>
                              <span className="font-medium">The full itinerary includes {packageData.duration} days of unforgettable experiences.</span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                  
                  {/* Full Itinerary Note */}
                  <div className="bg-[#F8F5F0] p-6 rounded-xl border border-dashed border-[#0F4C81]/30 text-center ml-10">
                    <p className="text-lg text-[#333333]/80 mb-4">
                      <i className="fas fa-scroll text-amber-500 mr-2"></i>
                      The full itinerary includes {packageData.duration} days of carefully curated experiences.
                    </p>
                    <p className="text-[#333333]/60 italic">
                      Contact us for a detailed day-by-day breakdown tailored to your preferences.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Inquiry Form */}
              <div id="booking" className="mb-16 bg-gradient-to-r from-[#0F4C81] to-[#137795] rounded-xl shadow-xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                  <img 
                    src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
                    alt="Booking background" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="relative z-10">
                  <div className="text-center mb-10">
                    <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">
                      Book This Luxury Experience
                    </h2>
                    <p className="text-white/80 max-w-2xl mx-auto">
                      Complete the form below and one of our luxury travel consultants will contact you within 24 hours to discuss your booking and customize your journey.
                    </p>
                  </div>
                  
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Pricing & Sidebar */}
            <div className="lg:w-4/12">
              {/* Pricing Card */}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden sticky top-28">
                {/* Price Header */}
                <div className="bg-gradient-to-r from-[#0F4C81] to-[#137795] p-6 text-white">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-medium">Price Per Person</span>
                    <div className="bg-amber-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {packageData.duration} Days
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    ${packageData.price?.toLocaleString() || "0"}
                  </div>
                  <div className="flex items-center">
                    {formatRating(packageData.rating || 50)}
                    <span className="text-sm ml-2">
                      {((packageData.rating || 50) / 10).toFixed(1)} ({packageData.reviewCount || 25} reviews)
                    </span>
                  </div>
                </div>
                
                {/* Quick Details */}
                <div className="p-6 border-b">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      <i className="fas fa-calendar-alt text-[#0F4C81] w-8"></i>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">{packageData.duration} Days</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-map-marked-alt text-[#0F4C81] w-8"></i>
                      <div>
                        <p className="text-sm text-gray-500">Tour Type</p>
                        <p className="font-medium">Private Luxury Tour</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-concierge-bell text-[#0F4C81] w-8"></i>
                      <div>
                        <p className="text-sm text-gray-500">Service Level</p>
                        <p className="font-medium">Premium</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-users text-[#0F4C81] w-8"></i>
                      <div>
                        <p className="text-sm text-gray-500">Group Size</p>
                        <p className="font-medium">Private / Customizable</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Package Includes Summary */}
                <div className="p-6 border-b">
                  <h4 className="font-['Playfair_Display'] text-lg font-semibold text-[#0F4C81] mb-4">
                    Package Includes
                  </h4>
                  <ul className="space-y-2">
                    {features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <i className="fas fa-check-circle text-green-600 mr-2"></i>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full text-[#0F4C81] hover:text-[#137795] text-sm font-medium mt-3 flex items-center justify-center">
                    View All Inclusions
                    <i className="fas fa-chevron-down ml-1"></i>
                  </button>
                </div>
                
                {/* Action Buttons */}
                <div className="p-6 space-y-3">
                  <a 
                    href="#booking" 
                    className="w-full bg-[#0F4C81] hover:bg-[#137795] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <i className="fas fa-calendar-check mr-2"></i>
                    Book Now
                  </a>
                  <button className="w-full border border-[#0F4C81] hover:bg-[#F8F5F0] text-[#0F4C81] font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                    <i className="far fa-heart mr-2"></i>
                    Add to Wishlist
                  </button>
                  <button className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
                    <i className="fas fa-share-alt mr-2"></i>
                    Share This Tour
                  </button>
                </div>
                
                {/* Need Help Box */}
                <div className="bg-[#F8F5F0] p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-white p-3 rounded-full shadow-md mr-4">
                      <i className="fas fa-headset text-amber-400 text-xl"></i>
                    </div>
                    <h4 className="font-semibold text-lg">Need Assistance?</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Our travel experts are ready to help you craft the perfect Sri Lankan experience.</p>
                  <a href="tel:+94777123456" className="text-[#0F4C81] hover:text-[#137795] font-medium flex items-center">
                    <i className="fas fa-phone-alt mr-2"></i>
                    +94 777 123 456
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Tours Section */}
      <section className="py-20 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-4">
              You May Also Like
            </h2>
            <p className="text-lg text-[#333333]/80 max-w-3xl mx-auto">
              Explore our other luxury tours curated to showcase the best of Sri Lanka's diverse landscapes and cultural heritage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tour Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="relative h-72">
                <img 
                  src="https://images.unsplash.com/photo-1544535830-2a087b7641c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Wildlife Safari Experience" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50"></div>
                <div className="absolute top-4 right-4 bg-amber-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  6 Days
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white">Wildlife Safari Experience</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#333333]/70 mb-6 line-clamp-3">
                  Discover Sri Lanka's incredible wildlife with expert guides in luxury tented camps and boutique lodges near national parks.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-[#0F4C81] text-2xl font-bold">$2,199</p>
                  </div>
                  <Link 
                    href="/packages/4" 
                    className="bg-[#0F4C81] hover:bg-[#137795] text-white font-medium py-2 px-5 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Tour Card 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="relative h-72">
                <img 
                  src="https://images.unsplash.com/photo-1578005343021-46ec921ee656?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Ayurvedic Wellness Retreat" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50"></div>
                <div className="absolute top-4 right-4 bg-amber-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  5 Days
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white">Ayurvedic Wellness Retreat</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#333333]/70 mb-6 line-clamp-3">
                  Rejuvenate with ancient healing traditions in luxury wellness sanctuaries nestled among Sri Lanka's serene landscapes.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-[#0F4C81] text-2xl font-bold">$1,899</p>
                  </div>
                  <Link 
                    href="/packages/5" 
                    className="bg-[#0F4C81] hover:bg-[#137795] text-white font-medium py-2 px-5 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Tour Card 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="relative h-72">
                <img 
                  src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Coastal Getaway" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50"></div>
                <div className="absolute top-4 right-4 bg-amber-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  7 Days
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white">Coastal Luxury Getaway</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#333333]/70 mb-6 line-clamp-3">
                  Experience the finest beach resorts and water activities along Sri Lanka's pristine coastline with private beach access.
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-[#0F4C81] text-2xl font-bold">$2,499</p>
                  </div>
                  <Link 
                    href="/packages/2" 
                    className="bg-[#0F4C81] hover:bg-[#137795] text-white font-medium py-2 px-5 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/tour-packages" 
              className="inline-flex items-center bg-white hover:bg-gray-100 text-[#0F4C81] font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              View All Luxury Tours
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="py-20 bg-gradient-to-r from-[#0F4C81] to-[#137795] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1578005343021-46ec921ee656?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Sri Lanka beaches" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-white mb-6">
              Ready for the Ultimate Sri Lanka Experience?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Speak with our expert travel consultants to create your dream luxury trip
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#booking" 
                className="bg-amber-400 hover:bg-amber-500 text-white text-lg font-semibold px-8 py-3 rounded-full transition duration-300 shadow-lg hover:shadow-xl"
              >
                Book This Tour
              </a>
              <a 
                href="/contact" 
                className="bg-white hover:bg-gray-100 text-[#0F4C81] text-lg font-semibold px-8 py-3 rounded-full transition duration-300 shadow-lg hover:shadow-xl"
              >
                Customize Your Journey
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LuxuryPackageDetail;