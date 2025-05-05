import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import { BreadcrumbItem } from "@/components/Breadcrumb";

const Contact = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    // Home will be automatically added by the Breadcrumb component
    { label: "Contact" } // No path for current page as it's the current page
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
    <main className="bg-white">
      {/* Hero Section - Simple and Clean */}
      <HeroSection
        title="Contact Us"
        description="Our luxury travel experts are ready to design your perfect Sri Lankan journey"
        backgroundImage="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744008175/activities/sigiriya-lion-rock.jpg"
        breadcrumbItems={breadcrumbItems}
        showDivider={false}
        imageTransform="scale-105"
        overlayOpacity={60}
        overlayColor="bg-black"
        alignment="center"
      />

      {/* Main Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-primary mb-6">How to Reach Us</h2>
              
              <div className="grid gap-8">
                {/* Email */}
                <div className="flex">
                  <div className="mr-5 mt-1">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <i className="fas fa-envelope text-primary"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Email</h3>
                    <p className="mb-1"><a href="mailto:info@bestsrilankatours.com" className="text-primary hover:underline">info@bestsrilankatours.com</a></p>
                    <p className="text-muted-foreground text-sm">For general inquiries and booking information</p>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex">
                  <div className="mr-5 mt-1">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <i className="fas fa-phone-alt text-primary"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Phone</h3>
                    <p className="mb-1"><a href="tel:+94112345678" className="text-primary hover:underline">+94 11 234 5678</a></p>
                    <p className="text-muted-foreground text-sm">Monday-Friday, 9AM-6PM (Sri Lanka time)</p>
                  </div>
                </div>
                
                {/* WhatsApp */}
                <div className="flex">
                  <div className="mr-5 mt-1">
                    <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                      <i className="fab fa-whatsapp text-[#25D366]"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">WhatsApp</h3>
                    <p className="mb-1"><a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">+94 77 123 4567</a></p>
                    <p className="text-muted-foreground text-sm">Available for quick responses anytime</p>
                  </div>
                </div>
              </div>
              
              {/* Office Locations */}
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-primary mt-12 mb-6">Our Offices</h2>
              
              <div className="grid gap-8">
                {/* Colombo Office */}
                <div className="flex">
                  <div className="mr-5 mt-1">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-primary"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Colombo (Headquarters)</h3>
                    <p className="text-muted-foreground">42 Galle Face Terrace</p>
                    <p className="text-muted-foreground">Colombo 03</p>
                    <p className="text-muted-foreground">Sri Lanka</p>
                    <p className="text-sm mt-2"><strong>Hours:</strong> Monday-Friday, 9AM-6PM</p>
                  </div>
                </div>
                
                {/* London Office */}
                <div className="flex">
                  <div className="mr-5 mt-1">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-primary"></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">London</h3>
                    <p className="text-muted-foreground">15 Berkeley Street</p>
                    <p className="text-muted-foreground">Mayfair, London W1J 8DY</p>
                    <p className="text-muted-foreground">United Kingdom</p>
                    <p className="text-sm mt-2"><strong>Hours:</strong> Monday-Friday, 9AM-5PM</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-primary mt-12 mb-6">Connect With Us</h2>
              
              <div className="flex gap-4">
                <a href="https://www.facebook.com/thebestsrilankatours" target="_blank" rel="noopener noreferrer" 
                   className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-[#E4405F] flex items-center justify-center text-white hover:opacity-90 transition">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer"
                   className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:opacity-90 transition">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-90 transition">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:opacity-90 transition">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            
            {/* Right Column - Contact Form */}
            <div className="bg-muted p-8 rounded-lg">
              <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-primary mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground mb-6">Fill out the form below and we'll get back to you within 24 hours</p>
              
              <ContactForm />
              
              <div className="mt-8 pt-6 border-t border-gray-200">
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
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-primary mb-2 text-center">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-12 text-center max-w-3xl mx-auto">Find answers to common questions about planning your luxury journey to Sri Lanka.</p>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-primary mb-3">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-lg text-muted-foreground mb-6">Still have questions?</p>
            <a href="mailto:info@bestsrilankatours.com" className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md transition inline-flex items-center">
              Email Us Directly
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
