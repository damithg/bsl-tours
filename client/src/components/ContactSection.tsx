import ContactForm from '@/components/ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-[#F8F5F0]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0077B6] mb-6">Contact Our Travel Experts</h2>
            <p className="text-lg text-[#333333]/80 mb-8">Our luxury travel consultants are ready to help you plan your perfect Sri Lankan getaway. Fill out the form, and we'll be in touch within 24 hours.</p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-[#0077B6]/10 flex items-center justify-center">
                    <i className="fas fa-envelope text-[#0077B6]"></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Email Us</h3>
                  <p className="text-[#333333]/70">damithg@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-[#0077B6]/10 flex items-center justify-center">
                    <i className="fas fa-phone-alt text-[#0077B6]"></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Call Us</h3>
                  <p className="text-[#333333]/70">+94 11 234 5678</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full bg-[#0077B6]/10 flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-[#0077B6]"></i>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Visit Us</h3>
                  <p className="text-[#333333]/70">42 Galle Face Terrace<br/>Colombo 03, Sri Lanka</p>
                </div>
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