import { ChevronRight, LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useState, useRef, useEffect } from "react";
import { Tag } from "@/components/ui/tag";
import { COLORS } from "@/utils/colors";

const ExperienceShowcase = () => {
  const experiences = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1631631480669-535cc43f2327?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fa-utensils",
      title: "Private Dining",
      description: "Intimate gourmet experiences in stunning locations with personal chefs",
      duration: "3-4 hours",
      rating: 4.9,
      reviewCount: 24,
      price: 180,
      currency: "USD",
      tags: ["Culinary", "Romantic"]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1622037022824-0c71d511ef3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fa-spa",
      title: "Luxury Spa",
      description: "Indulgent wellness treatments using traditional Sri Lankan techniques",
      duration: "Half Day",
      rating: 4.8,
      reviewCount: 36,
      price: 120,
      currency: "USD",
      tags: ["Wellness", "Relaxation"]
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1623053807566-3da809d5d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fa-ship",
      title: "Private Yacht",
      description: "Exclusive ocean excursions along Sri Lanka's pristine coastline",
      duration: "Full Day",
      rating: 4.9,
      reviewCount: 18,
      price: 350,
      currency: "USD",
      tags: ["Adventure", "Luxury"]
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1620977861760-f36307a4fb01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fa-masks-theater",
      title: "Cultural Performances",
      description: "Authentic entertainment showcasing Sri Lanka's rich heritage",
      duration: "2 hours",
      rating: 4.7,
      reviewCount: 42,
      price: 65,
      currency: "USD",
      tags: ["Cultural", "Evening"]
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1583309218688-db97f21e678a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fa-umbrella-beach",
      title: "Beach Escapes",
      description: "Secluded coastal retreats with personalized service and amenities",
      duration: "Full Day",
      rating: 4.9,
      reviewCount: 31,
      price: 200,
      currency: "USD",
      tags: ["Relaxation", "Nature"]
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1574857085264-7b851824eb88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fa-camera-retro",
      title: "Photography Tours",
      description: "Guided excursions to capture Sri Lanka's most picturesque scenery",
      duration: "Full Day",
      rating: 4.8,
      reviewCount: 27,
      price: 150,
      currency: "USD",
      tags: ["Photography", "Nature"]
    }
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollable = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    }
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -container.clientWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  // Format rating to display as stars
  const formatRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex" style={{ color: COLORS.secondary }}>
        {Array(fullStars).fill(null).map((_, i) => (
          <i key={`full-${i}`} className="fas fa-star"></i>
        ))}
        {hasHalfStar && <i className="fas fa-star-half-alt"></i>}
        {Array(emptyStars).fill(null).map((_, i) => (
          <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
      </div>
    );
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-5" style={{ color: COLORS.primary }}>
            Curated Luxury Experiences
          </h2>
          <p className="text-lg text-gray-700/80">
            Each journey is crafted with meticulous attention to detail, offering you exclusive access to Sri Lanka's hidden treasures and authentic cultural encounters.
          </p>
        </div>
        
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={scrollLeft}
            style={{ color: COLORS.primary }}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md -ml-4 transition ${
              !canScrollLeft ? "opacity-0 cursor-default" : "opacity-100 cursor-pointer"
            }`}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <LucideChevronLeft size={24} />
          </button>
          
          <button
            onClick={scrollRight}
            style={{ color: COLORS.primary }}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md -mr-4 transition ${
              !canScrollRight ? "opacity-0 cursor-default" : "opacity-100 cursor-pointer"
            }`}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <LucideChevronRight size={24} />
          </button>
          
          {/* Scroll container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory hide-scrollbar"
            onScroll={checkScrollable}
          >
            {experiences.map((experience) => (
              <div 
                key={experience.id} 
                className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start bg-[#F8F5F0] rounded-lg overflow-hidden shadow-lg transition transform hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="relative h-64 flex items-center justify-center overflow-hidden">
                  <img 
                    src={experience.image} 
                    alt={experience.title} 
                    className="w-full h-full object-cover object-center" 
                  />
                  <div className="absolute top-4 right-4">
                    <Tag variant="duration">
                      {experience.duration}
                    </Tag>
                  </div>
                  {experience.tags && (
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {experience.tags.slice(0, 2).map((tag, i) => (
                        <Tag key={i} variant="scenic">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">
                    {experience.title}
                  </h3>
                  <div className="flex items-center mb-4">
                    {formatRating(experience.rating)}
                    <span className="text-sm text-gray-500 ml-2">
                      {experience.rating.toFixed(1)} 
                      ({experience.reviewCount} {experience.reviewCount === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                  <p className="text-gray-700/70 mb-4 line-clamp-2">
                    {experience.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">From</span>
                      <div className="flex items-baseline">
                        <span style={{ color: COLORS.primary }} className="text-xl font-semibold">
                          ${experience.price}
                        </span>
                        <span className="text-gray-500 text-sm ml-1.5">/ per person</span>
                      </div>
                    </div>
                    <Link 
                      href={`/experiences/${experience.id}`} 
                      style={{ backgroundColor: COLORS.primary }}
                      className="inline-flex items-center hover:bg-primary/90 text-white font-medium py-2 px-5 rounded-full transition group shadow-md"
                    >
                      Explore <ChevronRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/experiences" 
            style={{ borderColor: COLORS.primary, color: COLORS.primary }}
            className="inline-flex items-center bg-transparent border-2 hover:bg-primary/5 font-medium py-3 px-8 rounded-full shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            View All Experiences
            <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExperienceShowcase;
