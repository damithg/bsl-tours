import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import { BreadcrumbItem } from "@/components/Breadcrumb";
import { COLORS } from "@/utils/colors";

const Contact = () => {
  // Breadcrumb setup
  const breadcrumbItems: BreadcrumbItem[] = [
    // Home will be automatically added by the Breadcrumb component
    { label: "Contact" } // No path for current page as it's the current page
  ];
  const contactInfo = [
    {
      title: "Email Us",
      details: "info@bestsrilankatours.com",
      description: "For general inquiries and booking information",
      icon: "fa-envelope"
    },
    {
      title: "Call Us",
      details: "+94 11 234 5678",
      description: "Available Monday-Friday, 9AM-6PM (Sri Lanka time)",
      icon: "fa-phone-alt"
    },
    {
      title: "WhatsApp",
      details: "+94 77 123 4567",
      description: "Message us anytime for quick responses to your inquiries",
      icon: "fa-whatsapp"
    }
  ];

  const faqItems = [
    {
      question: "How far in advance should I book my Sri Lanka tour?",
      answer: "For the best availability, especially during peak season (December-March), we recommend booking 4-6 months in advance. For holiday periods, 6-8 months is ideal. However, we can sometimes accommodate last-minute bookings with our extensive network of partners."
    },
    {
      question: "Are your tours completely customizable?",
      answer: "Absolutely! While we offer curated packages as inspiration, every journey we create is tailored to your preferences, pace, and interests. Our travel designers will work with you to craft a completely personalized experience."
    },
    {
      question: "What's included in your package prices?",
      answer: "Our packages typically include luxury accommodation, private transportation with professional chauffeurs, experienced guides, most meals, entrance fees to attractions, and 24/7 concierge support. International flights are usually not included, but we can assist with arrangements if needed."
    },
    {
      question: "What is the best time to visit Sri Lanka?",
      answer: "Sri Lanka has complex weather patterns due to two monsoon seasons. Generally, December to March is ideal for the south and west coasts, while May to September is best for the east coast. The central highlands are pleasant year-round. We can help you plan according to your preferred travel dates."
    },
    {
      question: "How do you select the accommodations for your tours?",
      answer: "We personally visit and carefully select each property based on its location, service quality, sustainability practices, and unique character. We partner with the finest luxury hotels, boutique properties, and exclusive villas that align with our standards of excellence."
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        title="Contact Our Travel Experts"
        description="Let our experts craft your perfect Sri Lankan journey tailored to your preferences."
        backgroundImage="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744007883/destinations/sigiriya-lion-rock-summit.jpg"
        breadcrumbItems={breadcrumbItems}
        showDivider={true}
        imageTransform="scale-105"
        overlayOpacity={30}
        customOverlay="bg-gradient-to-r from-primary/60 to-primary/20"
      />

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-primary mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground">We're here to answer your questions and start planning your luxury Sri Lankan experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((item, index) => (
              <div key={index} className="bg-muted p-8 rounded-lg text-center h-full flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <i className={`fas ${item.icon} text-xl text-primary`}></i>
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-primary font-medium mb-2">{item.details}</p>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col lg:flex-row bg-muted rounded-lg overflow-hidden shadow-lg">
            <div className="lg:w-1/2 p-8 lg:p-12 relative">
              <div className="absolute top-0 left-0 w-20 h-20 bg-secondary/30 rounded-br-full opacity-30"></div>
              <div className="relative z-10">
                <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-primary mb-6">Send Us a Message</h2>
                <p className="text-muted-foreground mb-8">Fill out the form below, and one of our luxury travel consultants will contact you within 24 hours.</p>
                
                <ContactForm />
                
                <div className="mt-8 pt-6 border-t border-primary/10">
                  <p className="text-center text-sm text-muted-foreground mb-4">Prefer a more immediate response?</p>
                  <a 
                    href="https://wa.me/94771234567" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5C] text-white font-medium py-3 px-4 rounded-md transition w-full"
                  >
                    <i className="fab fa-whatsapp text-xl"></i>
                    <span>Contact Us on WhatsApp</span>
                  </a>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-secondary/20 rounded-tl-full opacity-30"></div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <img 
                src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744008175/activities/sigiriya-lion-rock.jpg" 
                alt="Luxury Sri Lanka experience" 
                className="w-full h-full object-cover object-center" 
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-primary/30 flex items-center justify-center">
                <div className="text-center px-8">
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white drop-shadow-md mb-3">Ready for an unforgettable journey?</h3>
                  <p className="text-white/90 text-lg drop-shadow-sm">Let us create your perfect Sri Lankan experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-primary mb-4">Our Offices</h2>
            <p className="text-lg text-muted-foreground">Visit us at our offices around the world for personalized travel planning.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <i className="fas fa-map-marker-alt text-primary"></i>
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-primary">Colombo (Headquarters)</h3>
              </div>
              <p className="text-muted-foreground mb-1">42 Galle Face Terrace</p>
              <p className="text-muted-foreground mb-1">Colombo 03</p>
              <p className="text-muted-foreground mb-4">Sri Lanka</p>
              <p className="text-muted-foreground mb-1"><strong>Phone:</strong> +94 11 234 5678</p>
              <p className="text-muted-foreground"><strong>Hours:</strong> Monday-Friday, 9AM-6PM</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <i className="fas fa-map-marker-alt text-primary"></i>
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-primary">London</h3>
              </div>
              <p className="text-muted-foreground mb-1">15 Berkeley Street</p>
              <p className="text-muted-foreground mb-1">Mayfair, London W1J 8DY</p>
              <p className="text-muted-foreground mb-4">United Kingdom</p>
              <p className="text-muted-foreground mb-1"><strong>Phone:</strong> +44 20 7123 4567</p>
              <p className="text-muted-foreground"><strong>Hours:</strong> Monday-Friday, 9AM-5PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Find answers to common questions about planning your luxury journey to Sri Lanka.</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-muted rounded-lg p-6">
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-primary mb-3">{item.question}</h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <p className="text-lg text-muted-foreground mb-6">Still have questions? Our travel experts are here to help.</p>
              <a href="mailto:info@bestsrilankatours.com" className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md transition inline-flex items-center">
                Email Us Directly
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-white to-secondary/10"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/20 rounded-bl-full opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-primary/10 rounded-tr-full opacity-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-primary mb-4">Connect With Us</h2>
            <p className="text-lg text-muted-foreground mb-8">Follow us on social media for travel inspiration and behind-the-scenes glimpses of luxury Sri Lankan experiences.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
              <a href="https://www.facebook.com/thebestsrilankatours" target="_blank" rel="noopener noreferrer" 
                className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-muted transition group">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white group-hover:bg-[#1877F2] transition">
                  <i className="fab fa-facebook-f text-lg"></i>
                </div>
                <span className="text-sm font-medium text-muted-foreground">Facebook</span>
              </a>
              
              <a href="#" target="_blank" rel="noopener noreferrer" 
                className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-muted transition group">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white group-hover:bg-[#E4405F] transition">
                  <i className="fab fa-instagram text-lg"></i>
                </div>
                <span className="text-sm font-medium text-muted-foreground">Instagram</span>
              </a>
              
              <a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer" 
                className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-muted transition group">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white group-hover:bg-[#25D366] transition">
                  <i className="fab fa-whatsapp text-lg"></i>
                </div>
                <span className="text-sm font-medium text-muted-foreground">WhatsApp</span>
              </a>
              
              <a href="#" target="_blank" rel="noopener noreferrer" 
                className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-muted transition group">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white group-hover:bg-[#1DA1F2] transition">
                  <i className="fab fa-twitter text-lg"></i>
                </div>
                <span className="text-sm font-medium text-muted-foreground">Twitter</span>
              </a>
              
              <a href="#" target="_blank" rel="noopener noreferrer" 
                className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-muted transition group">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white group-hover:bg-[#FF0000] transition">
                  <i className="fab fa-youtube text-lg"></i>
                </div>
                <span className="text-sm font-medium text-muted-foreground">YouTube</span>
              </a>
            </div>
            
            <p className="mt-10 text-center text-sm text-muted-foreground">
              Follow us for updates on new tour packages, travel tips, and stunning photos of Sri Lanka's most beautiful destinations.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
