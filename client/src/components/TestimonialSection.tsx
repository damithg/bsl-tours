import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { LucideRefreshCw, LucideChevronLeft, LucideChevronRight } from "lucide-react";
import { Testimonial, queryClient } from "@/lib/queryClient";

// Helper functions to handle different field names between JS and .NET APIs
const getName = (testimonial: Testimonial): string => {
  return testimonial.name || 
         testimonial.CustomerName || 
         testimonial.clientName || 
         'Guest';
};

const getPackageName = (testimonial: Testimonial): string => {
  return testimonial.packageName || 
         testimonial.TourPackage || 
         testimonial.tourName || 
         'Tour Package';
};

const getNameInitial = (testimonial: Testimonial): string => {
  const name = getName(testimonial);
  return name !== 'Guest' ? name.charAt(0) : 'G';
};

const TestimonialSection = () => {
  const queryKey = ['/api/testimonials'];
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey,
  });
  
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (sliderRef.current && testimonials) {
      const scrollToActiveSlide = () => {
        const slideWidth = sliderRef.current?.clientWidth || 0;
        sliderRef.current?.scrollTo({
          left: activeIndex * (slideWidth / 3),
          behavior: 'smooth'
        });
      };
      
      scrollToActiveSlide();
      checkScrollable();
    }
  }, [activeIndex, testimonials]);

  const checkScrollable = () => {
    const container = sliderRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    }
  };

  const scrollLeft = () => {
    const container = sliderRef.current;
    if (container) {
      container.scrollBy({ left: -container.clientWidth, behavior: "smooth" });
      const newIndex = Math.max(0, activeIndex - 1);
      setActiveIndex(newIndex);
    }
  };

  const scrollRight = () => {
    const container = sliderRef.current;
    if (container && testimonials) {
      container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
      const newIndex = Math.min(testimonials.length - 1, activeIndex + 1);
      setActiveIndex(newIndex);
    }
  };

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-primary mb-4">What Our Guests Say</h2>
            <p className="text-lg text-foreground/80">Discover why our guests keep coming back and recommending us to their friends and family.</p>
          </div>
          
          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                  <div className="bg-white p-8 rounded-lg shadow-lg h-full animate-pulse">
                    <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                      <div>
                        <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
                        <div className="h-3 bg-gray-300 rounded w-24"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonials" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center">
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-primary mb-4">What Our Guests Say</h2>
              <button 
                onClick={() => {
                  // This will force a fresh fetch from the server
                  queryClient.invalidateQueries({ queryKey });
                }}
                className="ml-3 mb-4 p-2 text-primary hover:text-primary/80 transition-colors rounded-full"
                aria-label="Retry loading testimonials"
                title="Retry loading testimonials"
              >
                <LucideRefreshCw size={20} />
              </button>
            </div>
            <p className="text-red-500">Failed to load testimonials. Please try again by clicking the refresh button.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-12 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-primary mb-4">What Our Guests Say</h2>
            <button 
              onClick={() => {
                // This will force a fresh fetch from the server
                queryClient.invalidateQueries({ queryKey });
              }}
              className="ml-3 mb-4 p-2 text-primary hover:text-primary/80 transition-colors rounded-full"
              aria-label="Refresh testimonials"
              title="Refresh testimonials"
            >
              <LucideRefreshCw size={20} />
            </button>
          </div>
          <p className="text-lg text-foreground/80">Discover why our guests keep coming back and recommending us to their friends and family.</p>
        </div>
        
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={scrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow-md -ml-4 transition ${
              !canScrollLeft ? "opacity-0 cursor-default" : "opacity-100 cursor-pointer"
            }`}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <LucideChevronLeft size={24} />
          </button>
          
          <button
            onClick={scrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow-md -mr-4 transition ${
              !canScrollRight ? "opacity-0 cursor-default" : "opacity-100 cursor-pointer"
            }`}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <LucideChevronRight size={24} />
          </button>
          
          <div 
            ref={sliderRef} 
            className="testimonial-slider overflow-x-auto pb-8 flex snap-x space-x-6 hide-scrollbar"
            onScroll={checkScrollable}
          >
            {testimonials?.map((testimonial, index) => (
              <div key={testimonial.id} className="testimonial-slide flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                <div className="bg-white p-8 rounded-lg shadow-lg h-full">
                  <div className="text-secondary mb-4">
                    {[...Array(testimonial.rating || testimonial.Rating || 5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-6 italic">"{testimonial.content || testimonial.Content || testimonial.comment || 'Wonderful experience with Best Sri Lanka Tours!'}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 mr-4">
                      {/* Avatar placeholder - no actual image used */}
                      <div className="w-full h-full bg-primary/30 flex items-center justify-center text-white">
                        {getNameInitial(testimonial)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">{getName(testimonial)}</h4>
                      <p className="text-sm text-gray-500">{getPackageName(testimonial)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-2 mt-6">
            {testimonials && testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
