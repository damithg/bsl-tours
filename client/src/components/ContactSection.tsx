import ContactForm from '@/components/ContactForm';
import { Link } from 'wouter';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-[#F8F5F0]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2 lg:pr-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0077B6] mb-6">Contact Our Travel Experts</h2>
            <p className="text-lg text-[#333333]/80 mb-10">
              Our luxury travel consultants are ready to help you plan your perfect Sri Lankan getaway. 
              Fill out the form, and we'll be in touch within 24 hours.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 mb-10">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 mt-1">
                  <div className="w-10 h-10 rounded-full bg-[#0077B6]/10 flex items-center justify-center">
                    <i className="fas fa-comments text-[#0077B6]"></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#333333] mb-1">Chat</h3>
                  <p className="text-[#333333]/70">Monday - Saturday</p>
                  <p className="text-[#333333]/70">09:00 - 18:00</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 mt-1">
                  <div className="w-10 h-10 rounded-full bg-[#0077B6]/10 flex items-center justify-center">
                    <i className="fab fa-whatsapp text-[#0077B6]"></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#333333] mb-1">WhatsApp</h3>
                  <p className="text-[#333333]/70">+44 7245 87589 422 (UK)</p>
                  <p className="text-[#333333]/70">+94 478 5496 456 (SL)</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 mt-1">
                  <div className="w-10 h-10 rounded-full bg-[#0077B6]/10 flex items-center justify-center">
                    <i className="fas fa-envelope text-[#0077B6]"></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#333333] mb-1">Email</h3>
                  <a href="mailto:info@bestsrilankatours.com" className="text-[#0077B6] hover:text-[#0077B6]/80 transition">
                    info@bestsrilankatours.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 mt-1">
                  <div className="w-10 h-10 rounded-full bg-[#0077B6]/10 flex items-center justify-center">
                    <i className="fas fa-question-circle text-[#0077B6]"></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#333333] mb-1">FAQs</h3>
                  <Link href="/faqs" className="text-[#0077B6] hover:text-[#0077B6]/80 transition">
                    View frequently asked questions
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="text-[#333333]/70 mr-4">Connect with us:</span>
              <div className="flex space-x-3">
                <a href="#" className="w-9 h-9 rounded-full bg-[#0077B6]/10 flex items-center justify-center text-[#0077B6] hover:bg-[#0077B6] hover:text-white transition">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#0077B6]/10 flex items-center justify-center text-[#0077B6] hover:bg-[#0077B6] hover:text-white transition">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#0077B6]/10 flex items-center justify-center text-[#0077B6] hover:bg-[#0077B6] hover:text-white transition">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#0077B6]/10 flex items-center justify-center text-[#0077B6] hover:bg-[#0077B6] hover:text-white transition">
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
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