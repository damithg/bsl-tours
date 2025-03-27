import { useState, useEffect } from 'react';

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div 
      onClick={scrollToContent}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-40 flex flex-col items-center group"
    >
      <span className="text-white bg-[#0F4C81]/80 px-4 py-1 rounded-full text-sm mb-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Scroll Down
      </span>
      <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg">
        <div className="w-6 h-6 flex items-center justify-center">
          <svg 
            className="text-[#0F4C81] animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;