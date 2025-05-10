import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
}

interface ScrollableResourcePanelProps {
  resources: Resource[];
  categoryTitle: string;
}

const ScrollableResourcePanel: React.FC<ScrollableResourcePanelProps> = ({ 
  resources,
  categoryTitle
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  // Check if we need to show arrows
  useEffect(() => {
    const checkScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
    };
    
    checkScroll();
    
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      return () => scrollContainer.removeEventListener('scroll', checkScroll);
    }
  }, [resources]);
  
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 300; // Adjust scroll amount as needed
    const currentScroll = scrollContainerRef.current.scrollLeft;
    
    scrollContainerRef.current.scrollTo({
      left: direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="relative">
      {/* Category Title */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4 font-['Playfair_Display']">
        {categoryTitle}
      </h3>
      
      {/* Left Arrow */}
      {showLeftArrow && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-md border border-gray-200 focus:outline-none"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-[#0077B6]" />
        </button>
      )}
      
      {/* Right Arrow */}
      {showRightArrow && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-md border border-gray-200 focus:outline-none"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-[#0077B6]" />
        </button>
      )}
      
      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-4 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex space-x-4 pl-2 pr-2">
          {resources.map((resource, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-[280px] bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={resource.imageSrc} 
                  alt={resource.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-4 flex flex-col justify-between" style={{ minHeight: '180px' }}>
                <div>
                  <h4 className="font-semibold text-gray-800 font-['Playfair_Display'] line-clamp-2">
                    {resource.title}
                  </h4>
                  <p className="text-gray-600 text-sm mt-2 font-['Raleway'] line-clamp-3">
                    {resource.description}
                  </p>
                </div>
                
                <a 
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#0077B6] font-medium py-2 px-3 mt-4 rounded-md transition-colors duration-300 hover:bg-[#0077B6]/10 font-['Raleway'] self-start"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollableResourcePanel;