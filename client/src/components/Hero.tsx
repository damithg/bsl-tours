import { Link } from "wouter";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1588511706388-d433dabf3b37?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
          alt="Sigiriya Rock Fortress" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center hero-animation">
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Best Sri Lanka Tours
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 font-light">
          Tailor-made private journeys through Sri Lanka's most breathtaking landscapes and cultural treasures
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/packages" className="bg-[#0F4C81] hover:bg-opacity-90 text-white text-lg font-medium py-3 px-8 rounded-md transition transform hover:scale-105">
            Explore Packages
          </Link>
          <Link href="/contact" className="bg-transparent border-2 border-white hover:bg-white/10 text-white text-lg font-medium py-3 px-8 rounded-md transition transform hover:scale-105">
            Plan Your Journey
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <a href="#highlights" className="animate-bounce text-white">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
