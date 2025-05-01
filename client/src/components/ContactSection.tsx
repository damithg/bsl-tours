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
            
            {/* Office Image */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744123886/office-team_qsdmry.jpg" 
                alt="Our Office" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Contact Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Our offices</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* UK Office */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">United Kingdom</h4>
                  <div className="flex items-start mb-2">
                    <div className="mt-1 mr-3 text-primary">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <p className="text-foreground/80">
                      30 Eastbourne Terrace<br />
                      Paddington, London<br />
                      W2 6LA, UK
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 text-primary">
                      <i className="fas fa-phone"></i>
                    </div>
                    <a href="tel:+441215671091" className="text-primary hover:text-primary/80">
                      +44 121 567 1091
                    </a>
                  </div>
                </div>
                
                {/* Sri Lanka Office */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Sri Lanka</h4>
                  <div className="flex items-start mb-2">
                    <div className="mt-1 mr-3 text-primary">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <p className="text-foreground/80">
                      42 Marine Drive<br />
                      Colombo 03<br />
                      Sri Lanka
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 text-primary">
                      <i className="fas fa-phone"></i>
                    </div>
                    <a href="tel:+94112145699" className="text-primary hover:text-primary/80">
                      +94 11 214 5699
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="pt-4 border-t border-gray-200">
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
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold text-primary mb-6">Send us a message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;