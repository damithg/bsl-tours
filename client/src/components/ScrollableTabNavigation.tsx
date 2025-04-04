import React, { useEffect, useRef } from 'react';

interface ScrollableTabNavigationProps {
  containerClassName: string;
  children: React.ReactNode;
}

const ScrollableTabNavigation: React.FC<ScrollableTabNavigationProps> = ({ 
  containerClassName, 
  children 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLButtonElement>(null);
  const rightArrowRef = useRef<HTMLButtonElement>(null);
  
  // Check if we need to show navigation arrows
  const checkOverflow = () => {
    if (!containerRef.current || !leftArrowRef.current || !rightArrowRef.current) return;
    
    const container = containerRef.current;
    const isOverflowing = container.scrollWidth > container.clientWidth;
    
    // Only show arrows if content is overflowing
    leftArrowRef.current.style.display = isOverflowing ? 'flex' : 'none';
    rightArrowRef.current.style.display = isOverflowing ? 'flex' : 'none';
    
    // Also adjust opacity based on scroll position
    if (isOverflowing) {
      const isAtStart = container.scrollLeft <= 10;
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
      
      leftArrowRef.current.style.opacity = isAtStart ? '0.5' : '1';
      rightArrowRef.current.style.opacity = isAtEnd ? '0.5' : '1';
    }
  };
  
  // Scroll functionality
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  
  // Check overflow on mount, resize, and scroll
  useEffect(() => {
    const container = containerRef.current;
    
    // Initial check
    checkOverflow();
    
    // Add listeners
    window.addEventListener('resize', checkOverflow);
    container?.addEventListener('scroll', checkOverflow);
    
    // Content might take time to load, so check again after a delay
    const timeoutId = setTimeout(checkOverflow, 500);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', checkOverflow);
      container?.removeEventListener('scroll', checkOverflow);
      clearTimeout(timeoutId);
    };
  }, []);
  
  return (
    <div className="relative">
      {/* Left shadow overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Right shadow overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Left navigation arrow - initially hidden */}
      <button 
        ref={leftArrowRef}
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8 hidden items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-all"
        aria-label="Scroll left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Scrollable content container */}
      <div 
        ref={containerRef}
        className={`flex overflow-x-auto scrollbar-none pb-0 scroll-smooth px-10 ${containerClassName}`}
      >
        {children}
      </div>
      
      {/* Right navigation arrow - initially hidden */}
      <button 
        ref={rightArrowRef}
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-8 w-8 hidden items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-white transition-all"
        aria-label="Scroll right"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default ScrollableTabNavigation;