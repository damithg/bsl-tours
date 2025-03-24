import { useQuery } from "@tanstack/react-query";
import { Testimonial } from "@shared/schema";
import { useState, useRef, useEffect } from "react";

const TestimonialSection = () => {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });
  
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

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
    }
  }, [activeIndex, testimonials]);

  if (isLoading) {
    return (
      <section id="testimonials" className="py-20 bg-[#0F4C81]/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">What Our Guests Say</h2>
            <p className="text-lg text-[#333333]/80">Discover why our guests keep coming back and recommending us to their friends and family.</p>
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
      <section id="testimonials" className="py-20 bg-[#0F4C81]/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">What Our Guests Say</h2>
            <p className="text-red-500">Failed to load testimonials. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-[#0F4C81]/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">What Our Guests Say</h2>
          <p className="text-lg text-[#333333]/80">Discover why our guests keep coming back and recommending us to their friends and family.</p>
        </div>
        
        <div className="relative">
          <div ref={sliderRef} className="testimonial-slider overflow-x-auto pb-8 flex snap-x space-x-6 scrollbar-hide">
            {testimonials?.map((testimonial, index) => (
              <div key={testimonial.id} className="testimonial-slide flex-shrink-0 w-full md:w-1/2 lg:w-1/3">
                <div className="bg-white p-8 rounded-lg shadow-lg h-full">
                  <div className="text-[#D4AF37] mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <p className="text-[#333333]/80 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 mr-4">
                      {/* Avatar placeholder - no actual image used */}
                      <div className="w-full h-full bg-[#0F4C81]/30 flex items-center justify-center text-white">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.packageName}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-2 mt-6">
            {testimonials?.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-[#0F4C81]' : 'bg-gray-300'}`}
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
