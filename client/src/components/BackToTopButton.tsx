import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

interface BackToTopButtonProps {
  threshold?: number;
  className?: string;
}

export const BackToTopButton = ({ 
  threshold = 300, 
  className = '' 
}: BackToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    // Initialize visibility on component mount
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 bg-white text-primary border border-gray-100 rounded-full shadow-lg opacity-0 backdrop-blur-sm transition-all duration-300 z-50 
        hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 
        ${isVisible ? 'opacity-95 translate-y-0 scale-100' : 'translate-y-10 scale-90'} 
        ${className}`}
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
};

export default BackToTopButton;