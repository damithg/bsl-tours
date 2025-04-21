import ContactForm from '@/components/ContactForm';
import { Link } from 'wouter';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-[#F8F5F0]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0077B6] mb-4">Contact Our Travel Experts</h2>
          <p className="text-lg text-[#333333]/80 max-w-3xl mx-auto">
            Our luxury travel consultants are ready to help you plan your perfect Sri Lankan getaway. 
            Fill out the form or reach out through any of our channels below.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8 pb-0">
                <h3 className="text-2xl font-semibold text-[#0077B6] mb-6 pb-6 border-b border-gray-100">
                  Get in Touch
                </h3>
              </div>
              
              <div className="px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-l-4 border-[#0077B6] pl-4 py-2">
                    <span className="text-sm text-[#333333]/60 block mb-1">Chat Hours</span>
                    <div className="flex items-center text-[#333333]">
                      <i className="fas fa-comments text-[#0077B6] mr-3"></i>
                      <div>
                        <p className="font-medium">Monday - Saturday</p>
                        <p>09:00 - 18:00</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-[#0077B6] pl-4 py-2">
                    <span className="text-sm text-[#333333]/60 block mb-1">WhatsApp (UK)</span>
                    <div className="flex items-center text-[#333333]">
                      <i className="fab fa-whatsapp text-[#0077B6] mr-3"></i>
                      <p className="font-medium">+44 7245 87589 422</p>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-[#0077B6] pl-4 py-2">
                    <span className="text-sm text-[#333333]/60 block mb-1">WhatsApp (Sri Lanka)</span>
                    <div className="flex items-center text-[#333333]">
                      <i className="fab fa-whatsapp text-[#0077B6] mr-3"></i>
                      <p className="font-medium">+94 478 5496 456</p>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-[#0077B6] pl-4 py-2">
                    <span className="text-sm text-[#333333]/60 block mb-1">Email</span>
                    <div className="flex items-center text-[#333333]">
                      <i className="fas fa-envelope text-[#0077B6] mr-3"></i>
                      <a href="mailto:info@bestsrilankatours.com" className="font-medium text-[#0077B6] hover:text-[#0077B6]/80 transition">
                        info@bestsrilankatours.com
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <Link href="/faqs" className="inline-flex items-center text-[#0077B6] hover:text-[#0077B6]/80 font-medium transition">
                        <i className="fas fa-question-circle mr-2"></i>
                        View our FAQs
                      </Link>
                    </div>
                    
                    <div className="flex space-x-3">
                      <a href="#" className="w-8 h-8 rounded-full bg-[#0077B6]/10 flex items-center justify-center text-[#0077B6] hover:bg-[#0077B6] hover:text-white transition">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-[#0077B6]/10 flex items-center justify-center text-[#0077B6] hover:bg-[#0077B6] hover:text-white transition">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-[#0077B6]/10 flex items-center justify-center text-[#0077B6] hover:bg-[#0077B6] hover:text-white transition">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-[#0077B6]/10 flex items-center justify-center text-[#0077B6] hover:bg-[#0077B6] hover:text-white transition">
                        <i className="fab fa-pinterest"></i>
                      </a>
                    </div>
                  </div>
                </div>
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