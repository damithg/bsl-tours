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
      {/* Hero Section (matching G Adventures) - Simple blue header with white text */}
      <div className="bg-primary">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-white font-['Playfair_Display'] text-4xl font-bold mb-4">Contact Us</h1>
          <div className="text-white/80">
            <Breadcrumb items={breadcrumbItems} className="text-white/80" />
          </div>
        </div>
      </div>

      {/* Let's just get the hero section right for now */}
    </main>
  );
};

export default Contact;
