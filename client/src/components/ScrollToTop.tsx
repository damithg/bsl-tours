import { useEffect } from 'react';
import { useLocation } from 'wouter';

/**
 * ScrollToTop is a utility component that scrolls the page to the top
 * whenever the route changes. This ensures users always start at the
 * top of new pages when navigating.
 */
export const ScrollToTop = () => {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location]);

  return null;
};

export default ScrollToTop;