import ContactForm from "@/components/ContactForm";
import { BreadcrumbItem } from "@/components/Breadcrumb";
import Breadcrumb from "@/components/Breadcrumb";

const Contact = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    // Home will be automatically added by the Breadcrumb component
    { label: "Contact" }
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
      {/* Simple Page Header with Breadcrumb */}
      <section className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-white font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
          <Breadcrumb items={breadcrumbItems} className="text-white/80" />
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Left Side - Contact Tabs (similar to G Adventures) */}
            <div className="w-full md:w-1/3">
              <div className="border rounded-md overflow-hidden">
                {/* Email Tab */}
                <div className="border-b last:border-b-0">
                  <div className="p-4 bg-white">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <i className="fas fa-envelope text-primary"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Email</h3>
                        <a href="mailto:info@bestsrilankatours.com" className="text-primary hover:underline">
                          info@bestsrilankatours.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Phone Tab */}
                <div className="border-b last:border-b-0">
                  <div className="p-4 bg-white">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <i className="fas fa-phone-alt text-primary"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Call Us</h3>
                        <a href="tel:+94112345678" className="text-primary hover:underline">
                          +94 11 234 5678
                        </a>
                        <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM (Sri Lanka time)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* WhatsApp Tab */}
                <div className="border-b last:border-b-0">
                  <div className="p-4 bg-white">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#25D366]/10 p-3 rounded-full">
                        <i className="fab fa-whatsapp text-[#25D366]"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">WhatsApp</h3>
                        <a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">
                          +94 77 123 4567
                        </a>
                        <p className="text-sm text-gray-500">Available 24/7 for quick responses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Office Locations - Same Tab Style */}
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-gray-800 mt-8 mb-4">Our Offices</h2>
              
              <div className="border rounded-md overflow-hidden">
                {/* Colombo Office */}
                <div className="border-b last:border-b-0">
                  <div className="p-4 bg-white">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full mt-1">
                        <i className="fas fa-map-marker-alt text-primary"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Colombo, Sri Lanka</h3>
                        <p className="text-gray-600">
                          42 Galle Face Terrace<br />
                          Colombo 03<br />
                          Sri Lanka
                        </p>
                        <p className="text-sm text-gray-500 mt-2">Monday-Friday, 9AM-6PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* London Office */}
                <div className="border-b last:border-b-0">
                  <div className="p-4 bg-white">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full mt-1">
                        <i className="fas fa-map-marker-alt text-primary"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">London, UK</h3>
                        <p className="text-gray-600">
                          15 Berkeley Street<br />
                          Mayfair, London W1J 8DY<br />
                          United Kingdom
                        </p>
                        <p className="text-sm text-gray-500 mt-2">Monday-Friday, 9AM-5PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-gray-800 mt-8 mb-4">Connect With Us</h2>
              
              <div className="flex gap-3">
                <a href="https://www.facebook.com/thebestsrilankatours" target="_blank" rel="noopener noreferrer" 
                   className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#E4405F] flex items-center justify-center text-white hover:opacity-90 transition">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:opacity-90 transition">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-90 transition">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:opacity-90 transition">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            
            {/* Right Side - Contact Form */}
            <div className="w-full md:w-2/3">
              <div className="bg-white border rounded-md p-6">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below, and our travel experts will be in touch with you within 24 hours.
                </p>
                
                <ContactForm />
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="bg-[#25D366]/10 rounded-md p-4 flex items-center gap-3">
                    <div className="text-[#25D366] text-2xl">
                      <i className="fab fa-whatsapp"></i>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 font-medium">Need a quick response?</p>
                      <p className="text-sm text-gray-600">Message us directly on WhatsApp for immediate assistance</p>
                    </div>
                    <a 
                      href="https://wa.me/94771234567" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-[#25D366] hover:bg-[#20BD5C] text-white font-medium py-2 px-4 rounded transition whitespace-nowrap"
                    >
                      <i className="fab fa-whatsapp mr-2"></i> Chat Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-gray-800 mb-2 text-center">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">Find answers to common questions about our luxury Sri Lanka tours</p>
            
            <div className="grid gap-4 max-w-4xl mx-auto">
              {faqItems.map((item, index) => (
                <div key={index} className="border rounded-md overflow-hidden">
                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Still have questions about our luxury Sri Lanka tours?</p>
              <a href="mailto:info@bestsrilankatours.com" className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded inline-flex items-center">
                <i className="fas fa-envelope mr-2"></i> Email Us Directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
