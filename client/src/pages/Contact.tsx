import ContactForm from "@/components/ContactForm";

const Contact = () => {
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
      title: "Visit Us",
      details: "42 Galle Face Terrace, Colombo 03, Sri Lanka",
      description: "Our head office in the heart of Colombo",
      icon: "fa-map-marker-alt"
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
      <section className="relative pt-28 pb-20 bg-[#0F4C81]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1596627116790-af6f96da30a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Sri Lanka landscape" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Our luxury travel consultants are ready to help you create your perfect Sri Lankan journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-4">Get in Touch</h2>
            <p className="text-lg text-[#333333]/80">We're here to answer your questions and start planning your luxury Sri Lankan experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((item, index) => (
              <div key={index} className="bg-[#F8F5F0] p-8 rounded-lg text-center h-full flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#0F4C81]/10 flex items-center justify-center mb-6">
                  <i className={`fas ${item.icon} text-xl text-[#0F4C81]`}></i>
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-[#0F4C81] font-medium mb-2">{item.details}</p>
                <p className="text-[#333333]/70">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col lg:flex-row bg-[#F8F5F0] rounded-lg overflow-hidden shadow-lg">
            <div className="lg:w-1/2 p-8 lg:p-12">
              <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#0F4C81] mb-6">Send Us a Message</h2>
              <p className="text-[#333333]/80 mb-8">Fill out the form below, and one of our luxury travel consultants will contact you within 24 hours.</p>
              
              <ContactForm />
            </div>
            
            <div className="lg:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Luxury Sri Lanka experience" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-[#0F4C81]/30 flex items-center justify-center">
                <div className="text-center px-8">
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-3">Ready for an unforgettable journey?</h3>
                  <p className="text-white/90 text-lg">Let us create your perfect Sri Lankan experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-4">Our Offices</h2>
            <p className="text-lg text-[#333333]/80">Visit us at our offices around the world for personalized travel planning.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0F4C81] mb-3">Colombo (Headquarters)</h3>
              <p className="text-[#333333]/80 mb-1">42 Galle Face Terrace</p>
              <p className="text-[#333333]/80 mb-1">Colombo 03</p>
              <p className="text-[#333333]/80 mb-4">Sri Lanka</p>
              <p className="text-[#333333]/80 mb-1"><strong>Phone:</strong> +94 11 234 5678</p>
              <p className="text-[#333333]/80"><strong>Hours:</strong> Monday-Friday, 9AM-6PM</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0F4C81] mb-3">London</h3>
              <p className="text-[#333333]/80 mb-1">15 Berkeley Street</p>
              <p className="text-[#333333]/80 mb-1">Mayfair, London W1J 8DY</p>
              <p className="text-[#333333]/80 mb-4">United Kingdom</p>
              <p className="text-[#333333]/80 mb-1"><strong>Phone:</strong> +44 20 7123 4567</p>
              <p className="text-[#333333]/80"><strong>Hours:</strong> Monday-Friday, 9AM-5PM</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0F4C81] mb-3">New York</h3>
              <p className="text-[#333333]/80 mb-1">555 Madison Avenue</p>
              <p className="text-[#333333]/80 mb-1">New York, NY 10022</p>
              <p className="text-[#333333]/80 mb-4">United States</p>
              <p className="text-[#333333]/80 mb-1"><strong>Phone:</strong> +1 212 555 1234</p>
              <p className="text-[#333333]/80"><strong>Hours:</strong> Monday-Friday, 9AM-5PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-[#333333]/80">Find answers to common questions about planning your luxury journey to Sri Lanka.</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div key={index} className="bg-[#F8F5F0] rounded-lg p-6">
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#0F4C81] mb-3">{item.question}</h3>
                  <p className="text-[#333333]/80">{item.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <p className="text-lg text-[#333333]/80 mb-6">Still have questions? Our travel experts are here to help.</p>
              <a href="mailto:info@bestsrilankatours.com" className="bg-[#0F4C81] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition inline-flex items-center">
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
      <section className="py-16 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0F4C81] mb-4">Connect With Us</h2>
            <p className="text-lg text-[#333333]/80 mb-8">Follow us on social media for travel inspiration and behind-the-scenes glimpses of luxury Sri Lankan experiences.</p>
            
            <div className="flex justify-center space-x-6">
              <a href="#" className="w-12 h-12 rounded-full bg-[#0F4C81] flex items-center justify-center text-white hover:bg-[#D4AF37] transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-[#0F4C81] flex items-center justify-center text-white hover:bg-[#D4AF37] transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-[#0F4C81] flex items-center justify-center text-white hover:bg-[#D4AF37] transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-[#0F4C81] flex items-center justify-center text-white hover:bg-[#D4AF37] transition">
                <i className="fab fa-pinterest"></i>
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-[#0F4C81] flex items-center justify-center text-white hover:bg-[#D4AF37] transition">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
