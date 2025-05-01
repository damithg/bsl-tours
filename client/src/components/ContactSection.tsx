import ContactForm from '@/components/ContactForm';
import { Link } from 'wouter';
import { COLORS } from '@/utils/colors';

const ContactSection = () => {
  return (
    <section id="contact" className="py-12 relative overflow-hidden">
      {/* Background pattern - Wave shaped decorative element */}
      <div className="absolute top-0 left-0 w-full h-40 bg-primary/5 -skew-y-3 transform origin-top-left z-0"></div>
      <div className="absolute bottom-0 right-0 w-full h-40 bg-secondary/10 skew-y-3 transform origin-bottom-right z-0"></div>
      
      {/* Circular decorative elements for beach theme */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-primary/5 z-0"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 rounded-full bg-accent/5 z-0"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-secondary/5 z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-primary relative inline-block">
            Contact Our Travel Experts
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-secondary/70 rounded-full"></span>
          </h2>
          <p className="text-lg text-foreground/80 mt-6 max-w-2xl mx-auto">
            Our luxury travel consultants are ready to help you plan your perfect Sri Lankan getaway.
            Let us craft your dream vacation together.
          </p>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          {/* Left Column - Contact Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="bg-background rounded-xl shadow-md p-6 h-full border border-primary/10 relative overflow-hidden">
              {/* Decorative bottom wave */}
              <div className="absolute bottom-0 left-0 right-0 h-24 opacity-10" 
                style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%230077B6'/%3E%3C/svg%3E")`,
                backgroundSize: 'cover', backgroundPosition: 'bottom'}}>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-medium text-primary mb-6 border-b border-primary/20 pb-3">Get in Touch</h3>
                
                <div className="space-y-6 mb-8">
                  <div className="group flex items-start rounded-lg p-3 transition-all hover:bg-primary/5">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <i className="fas fa-envelope"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-foreground">Email Us</h4>
                      <a href="mailto:info@bestsrilankatours.com" className="text-primary hover:text-primary/80 transition block mt-1">
                        info@bestsrilankatours.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="group flex items-start rounded-lg p-3 transition-all hover:bg-primary/5">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <i className="fab fa-whatsapp"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-foreground">WhatsApp</h4>
                      <p className="text-foreground/70 mt-1">+44 7245 87589 422 (UK)</p>
                      <p className="text-foreground/70">+94 478 5496 456 (SL)</p>
                    </div>
                  </div>
                  
                  <div className="group flex items-start rounded-lg p-3 transition-all hover:bg-primary/5">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <i className="fas fa-comments"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-foreground">Live Chat</h4>
                      <p className="text-foreground/70 mt-1">Monday - Saturday</p>
                      <p className="text-foreground/70">09:00 - 18:00 GMT+1</p>
                    </div>
                  </div>
                  
                  <div className="group flex items-start rounded-lg p-3 transition-all hover:bg-primary/5">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <i className="fas fa-question-circle"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-foreground">FAQs</h4>
                      <Link href="/faqs" className="text-primary hover:text-primary/80 transition mt-1 inline-block">
                        View frequently asked questions
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Social Media */}
                <div className="mt-auto">
                  <h4 className="text-foreground/80 font-medium mb-3">Connect with us:</h4>
                  <div className="flex space-x-3">
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
          </div>
          
          {/* Right Column - Contact Form */}
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-card rounded-xl shadow-md p-6 border border-primary/10 relative overflow-hidden">
              {/* Decorative wave element */}
              <div className="absolute top-0 right-0 left-0 h-8 opacity-10"
                style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23F6E27F'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23F6E27F'/%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23F6E27F'/%3E%3C/svg%3E")`,
                backgroundSize: 'cover', backgroundPosition: 'top'}}>
              </div>
              
              <div className="relative z-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;