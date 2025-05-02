import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import FeaturedPackages from '@/components/FeaturedPackages';
import DestinationShowcase from '@/components/DestinationShowcase';
import MapDestinationShowcase from '@/components/MapDestinationShowcase';
import ExperienceShowcase from '@/components/ExperienceShowcase';
import TestimonialSection from '@/components/TestimonialSection';
import AboutSection from '@/components/AboutSection';
import DestinationMap from '@/components/DestinationMap';
import CTASection from '@/components/CTASection';
import ContactSection from '@/components/ContactSection';
import SeoHead from '@/components/SeoHead';

const Home = () => {
  // Example SEO data for the home page
  const seoData = {
    metaTitle: "Best Sri Lanka Tours - Luxury Travel Experiences",
    metaDescription: "Experience the beauty of Sri Lanka with our luxury, personalized tour packages. Explore beaches, wildlife, ancient temples, and more.",
    canonicalURL: "https://bestsrilankatours.com",
    metaRobots: "index, follow",
    keywords: "sri lanka tours, luxury travel, private tours, beach holidays, cultural tours, wildlife tours",
    ogTitle: "Best Sri Lanka Tours - Discover the Pearl of the Indian Ocean",
    ogDescription: "Tailor-made private journeys through Sri Lanka's most breathtaking landscapes and cultural treasures",
    twitterTitle: "Best Sri Lanka Tours - Luxury Sri Lankan Experiences",
    twitterDescription: "Discover Sri Lanka's beauty with our personalized luxury tour packages",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Best Sri Lanka Tours",
      "description": "Luxury Sri Lanka tour operator specializing in personalized travel experiences.",
      "url": "https://bestsrilankatours.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "42 Galle Face Terrace",
        "addressLocality": "Colombo",
        "postalCode": "00300",
        "addressCountry": "LK"
      }
    }
  };
  
  return (
    <main>
      <SeoHead {...seoData} />
      <Hero />
      {/* <Highlights /> */}
      <FeaturedPackages />
      {/* Original Interactive Map */} 
      <DestinationShowcase />
      
      {/* Alternate version kept in a separate component */}
      {/* <MapDestinationShowcase /> */}
      <ExperienceShowcase />
      {/* <TestimonialSection /> */}
      <AboutSection />
      {/* <DestinationMap /> */}
      <CTASection />
      {/* <ContactSection /> */}
    </main>
  );
};

export default Home;
