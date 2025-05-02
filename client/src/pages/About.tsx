import { Link } from "wouter";
import AboutSection from "../components/AboutSection";

const About = () => {
  // Our values
  const values = [
    {
      title: "Authentic Luxury",
      description: "We believe luxury is about meaningful experiences, not just opulence. Our journeys balance comfort with authentic cultural immersion.",
      icon: "fa-gem"
    },
    {
      title: "Sustainable Tourism",
      description: "We partner with eco-conscious properties and communities, ensuring our presence benefits local economies while protecting environments.",
      icon: "fa-leaf"
    },
    {
      title: "Personal Connection",
      description: "We build lasting relationships with our clients, taking time to understand your preferences to create truly personalized experiences.",
      icon: "fa-handshake"
    },
    {
      title: "Exceptional Service",
      description: "From your first inquiry to your return home, we provide attentive, detail-oriented service that anticipates your every need.",
      icon: "fa-star"
    }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 bg-primary">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1746209324/shutterstock_1394315526_1_l2efle.jpg" 
            alt="Sri Lanka Landscape" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex text-white/90 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-white">
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  Home
                </Link>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-white/60 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  <span className="text-sm font-medium text-white/80">
                    About Us
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-6">
              About Best Sri Lanka Tours
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-['Raleway']">
              Crafting unforgettable luxury journeys through the Pearl of the Indian Ocean since 2010.
            </p>
          </div>
        </div>
      </section>

      {/* Main About Section */}
      <AboutSection />

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-primary mb-4">Our Values</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-['Raleway']">
              These core principles guide everything we do at Best Sri Lanka Tours, from how we design our journeys to how we interact with our guests, partners, and communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center h-full flex flex-col hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6 text-primary">
                  {value.icon === 'fa-gem' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="16 2 22 8.5 22 16 16 22 8 22 2 16 2 8.5 8 2 16 2"></polygon><line x1="12" y1="22" x2="12" y2="2"></line><path d="M12 2 2 8.5"></path><path d="M12 2 22 8.5"></path><line x1="2" y1="16" x2="12" y2="8.5"></line><line x1="22" y1="16" x2="12" y2="8.5"></line></svg>
                  )}
                  {value.icon === 'fa-leaf' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8.8 5.5 5.5 0 0 0 5 .8c2.54-.987 3.77-2.2 5.3-3.7C22.87 15.2 22 8.71 22 8.5c0 0-7.262-.02-8.04 0-2.078.055-4.03.534-5.56 1.9-1.522 1.36-2.322 3.41-2.4 6.6.02-4 1.07-6.8 3.9-8.6s6.7-1.9 10 0c-1.586-1.526-4.4-2.274-6.9-2.2-2.5.074-5.02.554-7.3 3-2.28 2.446-2.76 5.78-2.7 8.6v4.2Z"></path></svg>
                  )}
                  {value.icon === 'fa-handshake' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 10.5 14 8l5.5-5.5C20.5 1.5 22 1.5 23 2.5S24.5 5 23.5 6L18 11.5"></path><path d="m14 8-1 1"></path><path d="M11.499 14.5 7 10l1-1"></path><path d="M9 13 4.5 17.5c-1 1-1 2.5 0 3.5s2.5 1 3.5 0l9-9"></path><path d="m14.5 8.5-6 6"></path><path d="M18 2 6 14"></path><path d="m19 3-5.5 5.5"></path><path d="m14.5 11.5 2 2"></path></svg>
                  )}
                  {value.icon === 'fa-star' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  )}
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold text-primary mb-3">{value.title}</h3>
                <p className="text-muted-foreground flex-grow font-['Raleway']">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-primary">
        <div className="absolute inset-0 z-0 opacity-10">
          <img 
            src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1746209493/shutterstock_422503523_1_cjhlbg.jpg" 
            alt="Sri Lanka Coastline" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience Sri Lanka?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-['Raleway']">
              Let us craft your perfect journey through the Pearl of the Indian Ocean — tailor-made just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/tours" 
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary hover:bg-gray-100 rounded-lg transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
              >
                Browse Tour Packages
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg transition-colors duration-300 font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;