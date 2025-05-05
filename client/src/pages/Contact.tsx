import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import { BreadcrumbItem } from "@/components/Breadcrumb";

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
      {/* Hero Section - Simple style similar to G Adventures */}
      <HeroSection
        title="Contact Us"
        description="Get in touch with our team of Sri Lanka travel experts"
        backgroundImage="https://res.cloudinary.com/drsjp6bqz/image/upload/v1744008175/activities/sigiriya-lion-rock.jpg"
        breadcrumbItems={breadcrumbItems}
        overlayColor="bg-primary"
        overlayOpacity={80}
        showDivider={false}
      />
      
      {/* Contact Options Section - Similar to G Adventures cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-800 mb-10">Contact us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WhatsApp Card */}
            <div className="bg-gray-100 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-[#25D366] p-3 rounded-full mr-4">
                  <i className="fab fa-whatsapp text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold">Let's chat!</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Our team is ready to answer your questions on live chat - it's quick and easy.
              </p>
              <p className="font-medium text-gray-700 mb-6">24/7 Service</p>
              <a 
                href="https://wa.me/94771234567" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#20BD5C] text-white font-medium py-2 px-4 rounded transition w-full"
              >
                <i className="fab fa-whatsapp mr-2"></i>
                Start WhatsApp Chat
              </a>
            </div>
            
            {/* Phone Card */}
            <div className="bg-gray-100 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-primary p-3 rounded-full mr-4">
                  <i className="fas fa-phone-alt text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold">Let's talk!</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Prefer to speak on the phone? Give us a ring so we can help plan your perfect Sri Lanka journey.
              </p>
              <p className="font-medium text-gray-700 mb-6">24/7 Service</p>
              <a 
                href="tel:+94112345678" 
                className="text-xl font-bold text-primary hover:underline block"
              >
                +94 11 234 5678
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
