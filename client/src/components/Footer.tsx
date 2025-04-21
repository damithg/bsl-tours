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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-[#F6E27F]">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-white/80 hover:text-[#F6E27F] transition">About Us</Link></li>
              <li><Link href="/careers" className="text-white/80 hover:text-[#F6E27F] transition">Careers</Link></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-[#F6E27F]">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-white/80 hover:text-[#F6E27F] transition">Contact Us</Link></li>
              <li><Link href="/support-center" className="text-white/80 hover:text-[#F6E27F] transition">Support Center</Link></li>
              <li><Link href="/pre-departure-info" className="text-white/80 hover:text-[#F6E27F] transition">Pre-Departure Info</Link></li>
              <li><Link href="/travel-resources" className="text-white/80 hover:text-[#F6E27F] transition">Travel Resources</Link></li>
              <li><Link href="/safety-updates" className="text-white/80 hover:text-[#F6E27F] transition">Safety Updates</Link></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-[#F6E27F]">Community</h3>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-white/80 hover:text-[#F6E27F] transition">Blog</Link></li>
              <li><Link href="/newsletter" className="text-white/80 hover:text-[#F6E27F] transition">Newsletter</Link></li>
              <li><Link href="/bsl-club" className="text-white/80 hover:text-[#F6E27F] transition">BSL Club</Link></li>
              <li><Link href="/affiliates" className="text-white/80 hover:text-[#F6E27F] transition">Affiliates</Link></li>
              <li><Link href="/brochures" className="text-white/80 hover:text-[#F6E27F] transition">Brochures</Link></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6 text-[#F6E27F]">Popular Destinations</h3>
            <ul className="space-y-3">
              <li><Link href="/destination/sigiriya" className="text-white/80 hover:text-[#F6E27F] transition">Sigiriya</Link></li>
              <li><Link href="/destination/galle" className="text-white/80 hover:text-[#F6E27F] transition">Galle</Link></li>
              <li><Link href="/destination/kandy" className="text-white/80 hover:text-[#F6E27F] transition">Kandy</Link></li>
              <li><Link href="/destination/ella" className="text-white/80 hover:text-[#F6E27F] transition">Ella</Link></li>
              <li><Link href="/destination/yala" className="text-white/80 hover:text-[#F6E27F] transition">Yala</Link></li>
              <li><Link href="/destination/bentota" className="text-white/80 hover:text-[#F6E27F] transition">Bentota</Link></li>
            </ul>
          </div>
          
          <div className="lg:col-span-4">
            <h3 className="text-lg font-semibold mb-6 text-[#F6E27F]">Our Social</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-[#0077B6]/30 flex items-center justify-center text-white hover:bg-[#0077B6] transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#0077B6]/30 flex items-center justify-center text-white hover:bg-[#0077B6] transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#0077B6]/30 flex items-center justify-center text-white hover:bg-[#0077B6] transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#0077B6]/30 flex items-center justify-center text-white hover:bg-[#0077B6] transition">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
            
            <h4 className="text-md font-medium mb-4 text-white">Sign Up for Updates</h4>
            <p className="text-white/80 mb-4">Subscribe to our newsletter for exclusive offers, travel tips, and the latest Sri Lanka travel inspiration.</p>
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
                  className="bg-[#0077B6] hover:bg-[#005f92] text-white py-3 px-5 rounded-r-md transition"
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
