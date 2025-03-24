import { Link } from "wouter";

const CTASection = () => {
  return (
    <section className="py-24 bg-[#0F4C81] relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1561100344-0cce8621ca6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
          alt="Sri Lanka Background" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Begin Your Luxury Sri Lankan Journey</h2>
          <p className="text-xl text-white/80 mb-10">Let us design your perfect escape to the Pearl of the Indian Ocean with a tailor-made luxury experience.</p>
          <Link href="/contact" className="bg-white hover:bg-[#D4AF37] text-[#0F4C81] hover:text-white font-medium py-3 px-8 rounded-md transition transform hover:scale-105 inline-flex items-center">
            Plan Your Trip
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
