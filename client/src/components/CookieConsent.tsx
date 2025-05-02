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
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center">
            <p className="text-sm leading-tight text-gray-700 mb-0 max-w-[calc(100%-180px)]">
              This website uses cookies to improve your experience. We'll assume you're ok with this, but you can opt-out if you wish.{' '}
              <Link href="/privacy-policy" className="text-[#0077B6] hover:underline">
                Privacy Policy
              </Link>
            </p>
            <div className="flex items-center gap-2 whitespace-nowrap ml-5">
              <button
                onClick={handleDecline}
                className="px-3 py-1 text-sm font-medium text-[#0F4C81] bg-gray-100 hover:bg-gray-200 rounded-md transition"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-3 py-1 text-sm font-medium text-white bg-[#0077B6] hover:bg-[#0077B6]/90 rounded-md transition"
              >
                Accept
              </button>
              <button 
                onClick={handleClose}
                className="p-0.5 ml-0.5 text-gray-500 hover:text-gray-700 rounded-full transition"
                aria-label="Close cookie consent"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
