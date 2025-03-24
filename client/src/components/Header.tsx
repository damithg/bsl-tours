import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

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
              <span className="font-['Playfair_Display'] text-[#0F4C81] text-2xl font-bold">Ceylon<span className="text-[#D4AF37]">Luxe</span></span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={`font-['Raleway'] font-medium ${location === '/' ? 'text-[#2E8B57]' : 'text-[#0F4C81]'} hover:text-[#2E8B57] transition`} onClick={handleNavClick}>
              Home
            </Link>
            <Link href="/packages" className={`font-['Raleway'] font-medium ${location === '/packages' ? 'text-[#2E8B57]' : 'text-[#0F4C81]'} hover:text-[#2E8B57] transition`} onClick={handleNavClick}>
              Tour Packages
            </Link>
            <Link href="/destinations" className={`font-['Raleway'] font-medium ${location === '/destinations' ? 'text-[#2E8B57]' : 'text-[#0F4C81]'} hover:text-[#2E8B57] transition`} onClick={handleNavClick}>
              Destinations
            </Link>
            <Link href="/about" className={`font-['Raleway'] font-medium ${location === '/about' ? 'text-[#2E8B57]' : 'text-[#0F4C81]'} hover:text-[#2E8B57] transition`} onClick={handleNavClick}>
              About
            </Link>
            <Link href="/contact" className={`font-['Raleway'] font-medium ${location === '/contact' ? 'text-[#2E8B57]' : 'text-[#0F4C81]'} hover:text-[#2E8B57] transition`} onClick={handleNavClick}>
              Contact
            </Link>
          </nav>
          
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
          
          {/* Book Now Button */}
          <Link href="/contact" className="hidden md:block bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded-md transition">
            Book Now
          </Link>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white pt-2 pb-4 px-4`}>
          <Link href="/" className={`block py-2 font-medium ${location === '/' ? 'text-[#2E8B57]' : 'text-[#0F4C81]'} hover:text-[#2E8B57]`} onClick={handleNavClick}>
            Home
          </Link>
          <Link href="/packages" className={`block py-2 font-medium ${location === '/packages' ? 'text-[#2E8B57]' : 'text-[#0F4C81]'} hover:text-[#2E8B57]`} onClick={handleNavClick}>
            Tour Packages
          </Link>
          <Link href="/destinations" className={`block py-2 font-medium ${location === '/destinations' ? 'text-[#2E8B57]' : 'text-[#0F4C81]'} hover:text-[#2E8B57]`} onClick={handleNavClick}>
            Destinations
          </Link>
          <Link href="/about" className={`block py-2 font-medium ${location === '/about' ? 'text-[#2E8B57]' : 'text-[#0F4C81]'} hover:text-[#2E8B57]`} onClick={handleNavClick}>
            About
          </Link>
          <Link href="/contact" className={`block py-2 font-medium ${location === '/contact' ? 'text-[#2E8B57]' : 'text-[#0F4C81]'} hover:text-[#2E8B57]`} onClick={handleNavClick}>
            Contact
          </Link>
          <Link href="/contact" className="block mt-4 bg-[#0F4C81] hover:bg-opacity-90 text-white text-center font-medium py-2 px-4 rounded-md transition" onClick={handleNavClick}>
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
