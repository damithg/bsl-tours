import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import { BreadcrumbItem } from "@/components/Breadcrumb";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

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
    <main>
      {/* Hero Section */}
      <HeroSection
        title="Contact Us"
        description="Get in touch with our team of Sri Lanka travel experts"
        backgroundImage="https://res.cloudinary.com/drsjp6bqz/image/upload/v1746207237/shutterstock_1070510330_ro5cyz.jpg"
        breadcrumbItems={breadcrumbItems}
        overlayColor="bg-[#0077B6]"
        overlayOpacity={20}
        imageTransform="scale-105"
      />
      
      {/* Main Contact Section */}
      <section className="py-16 md:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-['Playfair_Display'] font-bold text-gray-800 mb-10">Contact us</h2>
          
            <div className="flex flex-col md:flex-row">
              {/* Left Column - Image */}
              <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
                <div className="rounded-lg overflow-hidden h-full shadow-lg relative">
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743642543/activities/unawatuna-stilt-fishing.jpg" 
                    alt="Sri Lanka scenic view" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Right Column - Contact Options */}
              <div className="w-full md:w-1/2">
                <div className="h-full flex flex-col justify-center">
                  <h3 className="text-2xl font-['Playfair_Display'] font-bold text-gray-800 mb-6">Get in touch with our experts</h3>
                  <p className="font-['Raleway'] text-gray-600 mb-8">
                    Our friendly travel specialists are here to help you create your perfect Sri Lankan journey. 
                    Choose the way you prefer to connect with us.
                  </p>
                  
                  <div className="space-y-6">
                    {/* Contact Option - WhatsApp */}
                    <div className="flex items-center border-l-4 border-[#25D366] pl-6 py-3 hover:bg-gray-50 transition rounded-r">
                      <div className="text-[#25D366] text-3xl mr-5">
                        <i className="fab fa-whatsapp"></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-['Playfair_Display'] font-bold text-xl text-gray-800">WhatsApp Chat</h4>
                        <p className="font-['Raleway'] text-gray-600 text-base">Connect with us anytime, anywhere</p>
                      </div>
                      <a 
                        href="https://wa.me/447768787119" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-[#25D366] text-white py-2 px-4 rounded hover:bg-[#20BD5C] transition flex items-center space-x-2"
                      >
                        <span>Chat Now</span>
                      </a>
                    </div>
                    
                    {/* Contact Option - Email */}
                    <div className="flex items-center border-l-4 border-secondary pl-6 py-3 hover:bg-gray-50 transition rounded-r">
                      <div className="text-secondary text-3xl mr-5">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-['Playfair_Display'] font-bold text-xl text-gray-800">Email Us</h4>
                        <p className="font-['Raleway'] text-gray-600 text-base">We'll respond within 24 hours</p>
                      </div>
                      <a 
                        href="mailto:info@bestsrilankatours.com" 
                        className="bg-secondary text-gray-800 py-2 px-4 rounded hover:bg-secondary/90 transition flex items-center space-x-2"
                      >
                        <span>Send Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
            
            <div className="bg-white rounded-lg shadow-sm p-2 md:p-6 mb-10">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-b-0">
                    <AccordionTrigger className="py-4 text-left font-['Playfair_Display'] font-semibold text-gray-800 text-lg hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 font-['Raleway'] text-base">
                      <div className="border-l-4 border-primary pl-4 py-2">
                        {item.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="text-center">
              <p className="text-lg font-['Raleway'] text-gray-600 mb-5">Have more questions?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://wa.me/447768787119" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#25D366] text-white py-3 px-6 rounded-md hover:bg-[#20BD5C] transition inline-flex items-center"
                >
                  <i className="fab fa-whatsapp mr-2 text-lg"></i>
                  <span>Ask on WhatsApp</span>
                </a>
                <a 
                  href="mailto:info@bestsrilankatours.com" 
                  className="bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition inline-flex items-center"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-['Playfair_Display'] font-bold text-gray-800 mb-8">Send Us a Message</h2>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Contact Form */}
              <div className="w-full lg:w-1/2">
                <ContactForm />
              </div>
              
              {/* Right Column - Image */}
              <div className="w-full lg:w-1/2">
                <div className="h-full rounded-lg overflow-hidden shadow-lg relative">
                  <img 
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743295324/activities/sigiriya-frescoes.jpg" 
                    alt="Sri Lanka tropical beach" 
                    className="w-full h-full object-cover object-center" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full text-white p-6">
                    <div className="max-w-md">
                      <h3 className="text-2xl font-['Playfair_Display'] font-bold mb-2 drop-shadow-md">
                        Your Sri Lankan journey begins here
                      </h3>
                      <p className="font-['Raleway'] text-base drop-shadow-md">
                        Let our expert planners create your perfect custom experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;