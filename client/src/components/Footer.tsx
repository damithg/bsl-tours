import { useState } from 'react';
import { Link } from 'wouter';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await apiRequest('POST', '/api/subscribe', { email });
      const data = await response.json();
      
      toast({
        title: "Success!",
        description: data.message || "Subscribed to newsletter successfully.",
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: error instanceof Error ? error.message : "Failed to subscribe to newsletter",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#004E64] text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div>
            <div className="mb-6">
              <span className="font-['Playfair_Display'] text-2xl font-bold text-white">BSL<span className="text-[#F6E27F]">Tours</span></span>
            </div>
            <p className="text-white/80 mb-6">Crafting unforgettable luxury journeys through the Pearl of the Indian Ocean.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#F6E27F] transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-[#F6E27F] transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-[#F6E27F] transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-[#F6E27F] transition">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-6 text-[#F6E27F]">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/80 hover:text-[#F6E27F] transition">Home</Link></li>
              <li><Link href="/tours" className="text-white/80 hover:text-[#F6E27F] transition">Tour Packages</Link></li>
              <li><Link href="/destinations" className="text-white/80 hover:text-[#F6E27F] transition">Destinations</Link></li>
              <li><Link href="/about" className="text-white/80 hover:text-[#F6E27F] transition">About Us</Link></li>
              <li><Link href="/contact" className="text-white/80 hover:text-[#F6E27F] transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-6 text-[#F6E27F]">Our Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-[#F6E27F] transition">Luxury Private Tours</a></li>
              <li><a href="#" className="text-white/80 hover:text-[#F6E27F] transition">Family Holiday Packages</a></li>
              <li><a href="#" className="text-white/80 hover:text-[#F6E27F] transition">Honeymoon Experiences</a></li>
              <li><a href="#" className="text-white/80 hover:text-[#F6E27F] transition">Adventure Activities</a></li>
              <li><a href="#" className="text-white/80 hover:text-[#F6E27F] transition">Wildlife Safari Tours</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-6 text-[#F6E27F]">Popular Destinations</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-[#F6E27F] transition">Sigiriya Rock Fortress</a></li>
              <li><a href="#" className="text-white/80 hover:text-[#F6E27F] transition">Galle Fort</a></li>
              <li><a href="#" className="text-white/80 hover:text-[#F6E27F] transition">Kandy</a></li>
              <li><a href="#" className="text-white/80 hover:text-[#F6E27F] transition">Ella</a></li>
              <li><a href="#" className="text-white/80 hover:text-[#F6E27F] transition">Yala National Park</a></li>
              <li><a href="#" className="text-white/80 hover:text-[#F6E27F] transition">Bentota Beach</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-6 text-[#F6E27F]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-[#F6E27F] mt-1 mr-3"></i>
                <span className="text-white/80">42 Galle Face Terrace<br/>Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt text-[#F6E27F] mr-3"></i>
                <span className="text-white/80">+94 11 234 5678</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope text-[#F6E27F] mr-3"></i>
                <a href="mailto:damithg@gmail.com" className="text-white/80 hover:text-[#F6E27F] transition">damithg@gmail.com</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock text-[#F6E27F] mr-3"></i>
                <span className="text-white/80">Mon-Fri: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-6 text-[#F6E27F]">Newsletter</h3>
            <p className="text-white/80 mb-4">Subscribe to receive exclusive offers and travel inspiration.</p>
            <form className="mb-4" onSubmit={handleSubscribe}>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow bg-white/10 text-white placeholder-white/60 py-3 px-4 rounded-l-md focus:outline-none focus:bg-white/15 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit" 
                  className="bg-[#0077B6] hover:bg-[#005f92] text-white font-medium py-3 px-4 rounded-r-md transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <i className="fas fa-arrow-right"></i>
                  )}
                </button>
              </div>
            </form>
            <p className="text-white/60 text-sm">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Best Sri Lanka Tours. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="text-white/60 hover:text-white text-sm transition">Privacy Policy</Link>
            <Link href="/terms-conditions" className="text-white/60 hover:text-white text-sm transition">Terms & Conditions</Link>
            <Link href="/cookie-policy" className="text-white/60 hover:text-white text-sm transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
