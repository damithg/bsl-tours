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
    <footer className="bg-[#3D2C1F] text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-6">
              <span className="font-['Playfair_Display'] text-2xl font-bold text-white">Ceylon<span className="text-[#D4AF37]">Luxe</span></span>
            </div>
            <p className="text-white/70 mb-6">Crafting unforgettable luxury journeys through the Pearl of the Indian Ocean.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#D4AF37] transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-[#D4AF37] transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-[#D4AF37] transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-[#D4AF37] transition">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/70 hover:text-[#D4AF37] transition">Home</Link></li>
              <li><Link href="/packages" className="text-white/70 hover:text-[#D4AF37] transition">Tour Packages</Link></li>
              <li><Link href="/destinations" className="text-white/70 hover:text-[#D4AF37] transition">Destinations</Link></li>
              <li><Link href="/about" className="text-white/70 hover:text-[#D4AF37] transition">About Us</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-[#D4AF37] transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-6">Popular Destinations</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/70 hover:text-[#D4AF37] transition">Sigiriya Rock Fortress</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#D4AF37] transition">Galle Fort</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#D4AF37] transition">Kandy</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#D4AF37] transition">Ella</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#D4AF37] transition">Yala National Park</a></li>
              <li><a href="#" className="text-white/70 hover:text-[#D4AF37] transition">Bentota Beach</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-['Playfair_Display'] text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-white/70 mb-4">Subscribe to receive exclusive offers and travel inspiration.</p>
            <form className="mb-4" onSubmit={handleSubscribe}>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow bg-white/10 text-white placeholder-white/50 py-3 px-4 rounded-l-md focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit" 
                  className="bg-[#D4AF37] hover:bg-opacity-90 text-[#3D2C1F] font-medium py-3 px-4 rounded-r-md transition"
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
            <p className="text-white/50 text-sm">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Ceylon Luxe. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/50 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition">Terms & Conditions</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
