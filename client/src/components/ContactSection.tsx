import ContactForm from '@/components/ContactForm';
import { Link } from 'wouter';

const ContactSection = () => {
  return (
    <section id="contact" className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text and Contact Info */}
          <div>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-primary mb-6">
              Talk to our travel experts
            </h2>
            <p className="text-lg text-foreground/80 mb-8">
              Have questions about pricing, destinations, or Sri Lankan tours? Fill out the form and our travel experts will be in touch directly.
            </p>
            
            {/* Contact Methods */}
            <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
              <div className="space-y-6">
                {/* Chat */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <i className="fas fa-comments"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Chat</h3>
                    <p className="text-foreground/70">Monday - Saturday: 10:00 - 18:00</p>
                  </div>
                </div>
                
                {/* WhatsApp Chat */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <i className="fab fa-whatsapp"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">WhatsApp Chat</h3>
                    <a href="https://wa.me/447418364367" className="text-primary hover:text-primary/80 transition">
                      +44 7418 364367
                    </a>
                  </div>
                </div>
                
                {/* FAQs */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <i className="fas fa-question-circle"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">FAQ's</h3>
                    <Link href="/faqs" className="text-primary hover:text-primary/80 transition">
                      FAQ's portal
                    </Link>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <i className="fas fa-envelope"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Email</h3>
                    <a href="mailto:info@bestsrilankatours.com" className="text-primary hover:text-primary/80 transition">
                      info@bestsrilankatours.com
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-foreground mb-4">Connect with us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Contact Form */}
          <div>
            <div className="p-1">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;