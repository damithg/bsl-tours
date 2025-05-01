import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

const ExperienceShowcase = () => {
  const experiences = [
    {
      icon: "fa-concierge-bell",
      color: "tropical-green",
      title: "Personal Concierge",
      description: "Dedicated travel consultant available 24/7 throughout your journey"
    },
    {
      icon: "fa-car",
      color: "ocean-blue",
      title: "Private Transportation",
      description: "Luxury vehicles with professional chauffeurs for seamless travel"
    },
    {
      icon: "fa-hotel",
      color: "golden-sand",
      title: "Exclusive Accommodations",
      description: "Hand-selected luxury hotels, boutique properties, and private villas"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#F8F5F0]/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0077B6] mb-5">
            Curated Luxury Experiences
          </h2>
          <p className="text-lg text-[#333333]/80">
            Each journey is crafted with meticulous attention to detail, offering you exclusive access to Sri Lanka's hidden treasures and authentic cultural encounters.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-stretch gap-10 mt-12">
          {/* Left side - Card grid */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-6 order-2 lg:order-1">
            <div className="space-y-6">
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg h-48 md:h-64 group relative transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1631631480669-535cc43f2327?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Private dining experience" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004E64]/80 via-[#004E64]/40 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300 flex items-end">
                  <div className="p-5 text-white">
                    <p className="font-medium text-lg">Private Dining</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg h-64 md:h-80 group relative transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1622037022824-0c71d511ef3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Luxury spa treatment" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004E64]/80 via-[#004E64]/40 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300 flex items-end">
                  <div className="p-5 text-white">
                    <p className="font-medium text-lg">Luxury Spa</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6 mt-6 lg:mt-10">
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg h-64 md:h-80 group relative transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1623053807566-3da809d5d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Private yacht experience" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004E64]/80 via-[#004E64]/40 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300 flex items-end">
                  <div className="p-5 text-white">
                    <p className="font-medium text-lg">Private Yacht</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg h-48 md:h-64 group relative transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1620977861760-f36307a4fb01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Cultural dance performance" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004E64]/80 via-[#004E64]/40 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-300 flex items-end">
                  <div className="p-5 text-white">
                    <p className="font-medium text-lg">Cultural Performance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Experience cards */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
              <div className="p-10 flex-grow">
                <div className="space-y-10">
                  {experiences.map((experience, index) => (
                    <div key={index} className="group flex items-start hover:translate-y-[-2px] transition-transform duration-300">
                      <div className="flex-shrink-0 mr-6">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center group-hover:shadow-md transition-all duration-300
                          ${experience.color === 'ocean-blue' 
                            ? 'bg-[#0077B6]/10 text-[#0077B6] group-hover:bg-[#0077B6]/15' 
                            : experience.color === 'tropical-green' 
                              ? 'bg-[#88B04B]/10 text-[#88B04B] group-hover:bg-[#88B04B]/15' 
                              : 'bg-[#F6E27F]/20 text-[#D4AF37] group-hover:bg-[#F6E27F]/30'}`}
                        >
                          <i className={`fas ${experience.icon} text-2xl`}></i>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">{experience.title}</h3>
                        <p className="text-[#333333]/70 text-base leading-relaxed">{experience.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-auto bg-[#F8F5F0]/50 p-8 border-t border-gray-100 rounded-b-xl">
                <Link 
                  to="/experiences" 
                  className="inline-flex items-center bg-[#0077B6] hover:bg-[#005f92] text-white font-medium py-3 px-7 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  Discover All Experiences
                  <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceShowcase;
