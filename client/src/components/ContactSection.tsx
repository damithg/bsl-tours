import ContactForm from '@/components/ContactForm';
import { Link } from 'wouter';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-[#F8F5F0]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0077B6] mb-6">Contact Our Travel Experts</h2>
            <p className="text-lg text-[#333333]/80 mb-8">Our luxury travel consultants are ready to help you plan your perfect Sri Lankan getaway. Fill out the form, and we'll be in touch within 24 hours.</p>
            
            <div className="space-y-8 mb-10">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-[#0077B6] mb-4 flex items-center">
                  <i className="fas fa-comments text-[#0077B6] mr-3"></i>
                  Chat
                </h3>
                <p className="text-[#333333]/80 mb-2">Monday - Saturday</p>
                <p className="text-[#333333] font-medium">09:00 - 18:00</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-[#0077B6] mb-4 flex items-center">
                  <i className="fab fa-whatsapp text-[#0077B6] mr-3"></i>
                  WhatsApp Chat
                </h3>
                <p className="text-[#333333] font-medium mb-2">+44 7245 87589 422 (UK)</p>
                <p className="text-[#333333] font-medium">+94 478 5496 456 (Sri Lanka)</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-[#0077B6] mb-4 flex items-center">
                  <i className="fas fa-envelope text-[#0077B6] mr-3"></i>
                  Email
                </h3>
                <a href="mailto:info@bestsrilankatours.com" className="text-[#0077B6] hover:text-[#0077B6]/80 font-medium transition">
                  info@bestsrilankatours.com
                </a>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-[#0077B6] mb-4 flex items-center">
                  <i className="fas fa-question-circle text-[#0077B6] mr-3"></i>
                  FAQs
                </h3>
                <Link href="/faqs" className="inline-flex items-center text-[#0077B6] hover:text-[#0077B6]/80 font-medium transition">
                  View frequently asked questions
                  <i className="fas fa-arrow-right ml-2 text-sm"></i>
                </Link>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#0077B6] flex items-center justify-center text-white hover:bg-[#F6E27F] hover:text-[#0077B6] transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#0077B6] flex items-center justify-center text-white hover:bg-[#F6E27F] hover:text-[#0077B6] transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#0077B6] flex items-center justify-center text-white hover:bg-[#F6E27F] hover:text-[#0077B6] transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#0077B6] flex items-center justify-center text-white hover:bg-[#F6E27F] hover:text-[#0077B6] transition">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;