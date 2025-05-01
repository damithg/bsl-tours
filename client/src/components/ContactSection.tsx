import ContactForm from '@/components/ContactForm';
import { Link } from 'wouter';

const ContactSection = () => {
  return (
    <section id="contact" className="py-12 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-primary mb-4">Contact Our Travel Experts</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Our luxury travel consultants are ready to help you plan your perfect Sri Lankan getaway.
            Fill out the form, and we'll be in touch within 24 hours.
          </p>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="group hover:shadow-md transition-all p-5 rounded-lg bg-white">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <i className="fas fa-envelope"></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">Email</h3>
                  <a href="mailto:info@bestsrilankatours.com" className="text-primary hover:text-primary/80 transition">
                    info@bestsrilankatours.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="group hover:shadow-md transition-all p-5 rounded-lg bg-white">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">WhatsApp</h3>
                  <p className="text-foreground/70">+44 7245 87589 422 (UK)</p>
                  <p className="text-foreground/70">+94 478 5496 456 (SL)</p>
                </div>
              </div>
            </div>
            
            <div className="group hover:shadow-md transition-all p-5 rounded-lg bg-white">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <i className="fas fa-comments"></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">Chat</h3>
                  <p className="text-foreground/70">Monday - Saturday</p>
                  <p className="text-foreground/70">09:00 - 18:00</p>
                </div>
              </div>
            </div>
            
            <div className="group hover:shadow-md transition-all p-5 rounded-lg bg-white">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <i className="fas fa-question-circle"></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">FAQs</h3>
                  <Link href="/faqs" className="text-primary hover:text-primary/80 transition">
                    View frequently asked questions
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="p-5 rounded-lg bg-white">
              <h3 className="text-lg font-medium text-foreground mb-4">Connect with us</h3>
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
          
          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h3 className="text-xl font-medium text-primary mb-6 pb-4 border-b border-primary/10">Send Us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;