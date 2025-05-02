import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { X } from 'lucide-react';

/**
 * CookieConsent component that displays a banner at the bottom of the page when a user
 * first visits the site, allowing them to accept or decline cookie tracking.
 */
const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) {
      // Wait a short period before showing the banner to avoid immediate popup on load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 pr-4">
            <h3 className="text-lg font-semibold text-[#0F4C81] mb-1">We Value Your Privacy</h3>
            <p className="text-sm text-gray-600">
              This website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
              By clicking "Accept All", you consent to our use of cookies. Visit our{' '}
              <Link href="/privacy-policy" className="text-[#0077B6] hover:underline">
                Privacy Policy
              </Link>{' '}
              to learn more.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-2 md:mt-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-[#0F4C81] bg-gray-100 hover:bg-gray-200 rounded-md transition"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-medium text-white bg-[#0077B6] hover:bg-[#0077B6]/90 rounded-md transition"
            >
              Accept All
            </button>
            <button 
              onClick={handleClose}
              className="p-1 text-gray-500 hover:text-gray-700 rounded-full transition"
              aria-label="Close cookie consent"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;