import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

const ExperienceShowcase = () => {
  const experiences = [
    {
      image: "https://images.unsplash.com/photo-1631631480669-535cc43f2327?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fa-utensils",
      title: "Private Dining",
      description: "Intimate gourmet experiences in stunning locations with personal chefs"
    },
    {
      image: "https://images.unsplash.com/photo-1622037022824-0c71d511ef3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fa-spa",
      title: "Luxury Spa",
      description: "Indulgent wellness treatments using traditional Sri Lankan techniques"
    },
    {
      image: "https://images.unsplash.com/photo-1623053807566-3da809d5d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fa-ship",
      title: "Private Yacht",
      description: "Exclusive ocean excursions along Sri Lanka's pristine coastline"
    },
    {
      image: "https://images.unsplash.com/photo-1620977861760-f36307a4fb01?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fa-masks-theater",
      title: "Cultural Performances",
      description: "Authentic entertainment showcasing Sri Lanka's rich heritage"
    },
    {
      image: "https://images.unsplash.com/photo-1583309218688-db97f21e678a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fa-umbrella-beach",
      title: "Beach Escapes",
      description: "Secluded coastal retreats with personalized service and amenities"
    },
    {
      image: "https://images.unsplash.com/photo-1574857085264-7b851824eb88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: "fa-camera-retro",
      title: "Photography Tours",
      description: "Guided excursions to capture Sri Lanka's most picturesque scenery"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with subtle wave pattern */}
      <div className="absolute inset-0 bg-[#F8F5F0] opacity-50 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577127296859-34da7963e90a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-5">
            Curated Luxury Experiences
          </h2>
          <p className="text-lg text-foreground/80">
            Each journey is crafted with meticulous attention to detail, offering you exclusive access to Sri Lanka's hidden treasures and authentic cultural encounters.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <div key={index} className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-[420px] flex flex-col">
              <div className="absolute inset-0 z-0">
                <img 
                  src={experience.image} 
                  alt={experience.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#004E64]/95 via-[#004E64]/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              </div>
              
              <div className="relative z-10 flex-grow flex flex-col justify-end p-8 text-white">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <i className={`fas ${experience.icon} text-white text-2xl`}></i>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 group-hover:translate-x-2 transition-transform duration-300">
                  {experience.title}
                </h3>
                
                <p className="text-white/80 mb-8 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {experience.description}
                </p>
                
                <div className="absolute bottom-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/experiences" 
            className="inline-flex items-center bg-primary hover:bg-primary/80 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            Discover All Experiences
            <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExperienceShowcase;
