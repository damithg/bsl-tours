import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { CurrencySelector } from "./CurrencySelector";
import { handleImageError } from "../utils/assetUtils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  // Handle scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle mobile menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle navigation link click
  const handleNavClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed w-full bg-white bg-opacity-95 shadow-md z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="/images/bsl_logo.png" 
                alt="Best Sri Lanka Tours Logo" 
                className="h-12 md:h-14"
                onError={handleImageError(
                  "/images/bsl_logo.png", 
                  "https://bestsrilankatours.com/wp-content/uploads/2020/08/bsl_logo.png"
                )}
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {/* Desktop Navigation */}
            <nav className="flex space-x-6">
              <Link href="/tours" className={`font-['Raleway'] font-medium ${location === '/tours' || location === '/packages' ? 'text-primary' : 'text-[#0F4C81]'} hover:text-primary transition`} onClick={handleNavClick}>
                Tours
              </Link>
              <Link href="/destinations" className={`font-['Raleway'] font-medium ${location === '/destinations' || location === '/destination-map' ? 'text-primary' : 'text-[#0F4C81]'} hover:text-primary transition`} onClick={handleNavClick}>
                Destinations
              </Link>
              <Link href="/experiences" className={`font-['Raleway'] font-medium ${location === '/experiences' ? 'text-primary' : 'text-[#0F4C81]'} hover:text-primary transition`} onClick={handleNavClick}>
                Experiences
              </Link>
              <Link href="/about" className={`font-['Raleway'] font-medium ${location === '/about' ? 'text-primary' : 'text-[#0F4C81]'} hover:text-primary transition`} onClick={handleNavClick}>
                About
              </Link>
              <Link href="/contact" className={`font-['Raleway'] font-medium ${location === '/contact' ? 'text-primary' : 'text-[#0F4C81]'} hover:text-primary transition`} onClick={handleNavClick}>
                Contact
              </Link>
            </nav>
            
            {/* Currency Selector */}
            <div className="border-l border-gray-200 pl-4">
              <CurrencySelector />
            </div>
            
            {/* Book Now Button */}
            <Link href="/contact" className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md transition">
              Book Now
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-[#0F4C81] focus:outline-none" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white pt-2 pb-4 px-4`}>
          <Link href="/tours" className={`block py-2 font-medium ${location === '/tours' || location === '/packages' ? 'text-primary' : 'text-[#0F4C81]'} hover:text-primary`} onClick={handleNavClick}>
            Tours
          </Link>
          <Link href="/destinations" className={`block py-2 font-medium ${location === '/destinations' ? 'text-primary' : 'text-[#0F4C81]'} hover:text-primary`} onClick={handleNavClick}>
            Destinations
          </Link>
          <Link href="/experiences" className={`block py-2 font-medium ${location === '/experiences' ? 'text-primary' : 'text-[#0F4C81]'} hover:text-primary`} onClick={handleNavClick}>
            Experiences
          </Link>
          <Link href="/about" className={`block py-2 font-medium ${location === '/about' ? 'text-primary' : 'text-[#0F4C81]'} hover:text-primary`} onClick={handleNavClick}>
            About
          </Link>
          <Link href="/contact" className={`block py-2 font-medium ${location === '/contact' ? 'text-primary' : 'text-[#0F4C81]'} hover:text-primary`} onClick={handleNavClick}>
            Contact
          </Link>
          
          <div className="py-3 border-t border-gray-100 mt-2">
            <span className="text-sm text-gray-500 mb-2 block">Select Currency</span>
            <CurrencySelector />
          </div>
          
          <Link href="/contact" className="block mt-4 bg-primary hover:bg-primary/90 text-white text-center font-medium py-2 px-4 rounded-md transition" onClick={handleNavClick}>
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;