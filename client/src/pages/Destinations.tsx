import { useQuery } from "@tanstack/react-query";
import { Destination } from "@shared/schema";
import { Link } from "wouter";
import React, { useState, useEffect, useRef } from "react";
import { Tag } from "@/components/ui/tag";
import HeroSection from "@/components/HeroSection";
import { ChevronRight } from "lucide-react";

const Destinations = () => {
  const {
    data: destinations,
    isLoading,
    error,
  } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  // State for lazy loading
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loaderRef = useRef(null);

  // Get visible destinations
  const visibleDestinations = destinations?.slice(0, visibleCount);
  const hasMore = destinations && visibleCount < destinations.length;

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (!loaderRef.current || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoadingMore) {
          setIsLoadingMore(true);

          // Simulate loading delay
          setTimeout(() => {
            setVisibleCount((prevCount) => prevCount + 6);
            setIsLoadingMore(false);
          }, 800);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, isLoadingMore, visibleCount, isLoading]);

  // Debug logs
  useEffect(() => {
    if (destinations && destinations.length > 0) {
      console.log("Destinations data:", destinations);
      console.log("First destination:", destinations[0]);
      console.log("Images property:", (destinations[0] as any).images);
      console.log("Card image URL:", (destinations[0] as any).images?.card);
    }
  }, [destinations]);

  // Additional content for featured destination
  const featuredDestinationContent = {
    title: "Explore the Wonder of Sri Lanka",
    description:
      "From ancient cities to pristine beaches, misty mountains to wildlife sanctuaries, discover the diverse landscapes and cultural treasures of this island paradise.",
    image:
      "https://images.unsplash.com/photo-1586861642026-fc21a5ae85b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
  };

  // Other key experiences we offer
  const keyExperiences = [
    {
      title: "Cultural Heritage",
      description:
        "Explore UNESCO World Heritage sites, ancient temples, and colonial architecture with expert guides.",
      icon: "fa-landmark",
    },
    {
      title: "Wildlife Encounters",
      description:
        "See leopards, elephants, and exotic birds in their natural habitats with luxury safari experiences.",
      icon: "fa-paw",
    },
    {
      title: "Beach Luxury",
      description:
        "Unwind at exclusive beach resorts with private villas, infinity pools, and personalized service.",
      icon: "fa-umbrella-beach",
    },
    {
      title: "Tea Plantation Tours",
      description:
        "Journey through emerald tea fields and learn about Ceylon tea production with private tastings.",
      icon: "fa-mug-hot",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        title="Explore the Wonder of Sri Lanka"
        description="Discover Sri Lanka through our carefully curated experiences that combine luxury, authenticity, and exclusivity."
        backgroundImage="https://res.cloudinary.com/drsjp6bqz/image/upload/v1748296611/srilanka-destination-rail.png"
        overlayColor="bg-[#0077B6]"
        overlayOpacity={50}
        breadcrumbItems={[          
          { label: "Destinations" }
        ]}
      />

      {/* Key Experiences */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0077B6] mb-4">
              Luxury Experiences
            </h2>
            <p className="text-lg text-[#333333]/80">
              From ancient cities to pristine beaches, misty mountains to
              wildlife sanctuaries, discover the diverse landscapes and cultural
              treasures of this island paradise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyExperiences.map((experience, index) => (
              <div
                key={index}
                className="bg-[#F8F5F0] p-8 rounded-lg text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#0077B6]/10 flex items-center justify-center mx-auto mb-6">
                  <i
                    className={`fas ${experience.icon} text-2xl text-[#0077B6]`}
                  ></i>
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3">
                  {experience.title}
                </h3>
                <p className="text-[#333333]/70">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0077B6] mb-4">
              Stunning Destinations
            </h2>
            <p className="text-lg text-[#333333]/80">
              Explore Sri Lanka's most captivating locations, each offering
              unique experiences and luxury accommodations.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-lg h-96 animate-pulse"
                >
                  <div className="h-64 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded w-1/2 mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">
                Failed to load destinations. Please try again later.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleDestinations?.map((destination) => (
                  <div
                    key={destination.id}
                    className="bg-[#F8F5F0] rounded-lg overflow-hidden shadow-lg transition transform hover:scale-[1.02] hover:shadow-xl"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={
                          (destination as any).card?.image?.publicId
                            ? `https://res.cloudinary.com/drsjp6bqz/image/upload/${(destination as any).card.image.publicId}`
                            : (destination as any).images?.card ||
                              destination.imageUrl ||
                              ((destination as any).heroImage &&
                              (destination as any).heroImage.publicId
                                ? `https://res.cloudinary.com/drsjp6bqz/image/upload/${(destination as any).heroImage.publicId}`
                                : "/attached_assets/yves-alarie-3R50kTNBKiE-unsplash.jpg")
                        }
                        alt={
                          (destination as any).card?.image?.alt ||
                          destination.name
                        }
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />

                      {/* Display tags at the top left of image */}
                      {(destination as any).card?.tags &&
                        (destination as any).card.tags.length > 0 && (
                          <div className="absolute top-4 left-4 z-10">
                            <div className="flex flex-wrap gap-1.5">
                              {(destination as any).card.tags
                                .slice(0, 3)
                                .map((tag: string, index: number) => (
                                  <Tag key={index} variant="scenic">
                                    {tag}
                                  </Tag>
                                ))}
                            </div>
                          </div>
                        )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3">
                        {(destination as any).card?.heading ||
                          (destination as any).card?.header ||
                          (destination as any).card?.title ||
                          destination.name}
                      </h3>
                      <p className="text-gray-700/70 mb-6">
                        {(destination as any).card?.body ||
                          (destination as any).card?.subtitle ||
                          destination.excerpt ||
                          destination.shortDescription ||
                          destination.description}
                      </p>

                      <Link
                        href={`/destination/${destination.slug || destination.id}`}
                        className="inline-flex items-center bg-[#0077B6] hover:bg-[#0077B6]/90 text-white font-medium py-2 px-5 rounded-full transition group shadow-md"
                      >
                        Explore <ChevronRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More / End of Content */}
              <div className="mt-12 text-center" ref={loaderRef}>
                {isLoadingMore && (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-10 h-10 border-4 border-[#0077B6] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#0077B6] font-medium">
                      Loading more destinations...
                    </p>
                  </div>
                )}

                {!hasMore && destinations && destinations.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-[#0077B6]/80 font-medium">
                      You've explored all our destinations!
                    </p>
                    <p className="text-[#333333]/60 mt-2">
                      Ready to plan your adventure?
                    </p>
                    <Link
                      href="/contact"
                      className="mt-4 inline-block bg-[#0077B6] hover:bg-[#005a8c] text-white font-medium py-2 px-6 rounded-full transition"
                    >
                      Contact Our Experts
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Featured Destination - Detailed */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0">
              <Link
                href="/destination/sigiriya-rock-fortress"
                className="block hover:text-[#2E8B57] transition"
              >
                <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#0077B6] mb-6">
                  Sigiriya: The Ancient Wonder
                </h2>
              </Link>
              <p className="text-lg text-[#333333]/80 mb-6">
                Rising dramatically from the central plains, the iconic rocky
                outcrop of Sigiriya is perhaps Sri Lanka's most dramatic sight.
                Near-vertical walls soar to a flat-topped summit that contains
                the ruins of an ancient civilization, thought to be once the
                epicenter of the short-lived kingdom of Kassapa.
              </p>
              <p className="text-lg text-[#333333]/80 mb-8">
                Our luxury experience includes exclusive early morning access
                before other tourists arrive, a gourmet breakfast with panoramic
                views, and insights from an archaeology expert who will reveal
                the secrets of this UNESCO World Heritage Site.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#0077B6]/10 flex items-center justify-center mr-4">
                    <i className="fas fa-check text-[#0077B6]"></i>
                  </div>
                  <p className="text-[#333333]/80">
                    Private guided tour with archaeology specialist
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#0077B6]/10 flex items-center justify-center mr-4">
                    <i className="fas fa-check text-[#0077B6]"></i>
                  </div>
                  <p className="text-[#333333]/80">
                    Luxury helicopter transfers available
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#0077B6]/10 flex items-center justify-center mr-4">
                    <i className="fas fa-check text-[#0077B6]"></i>
                  </div>
                  <p className="text-[#333333]/80">
                    Stay at the exclusive Water Garden Sigiriya luxury resort
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="bg-[#0077B6] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-full transition inline-flex items-center"
              >
                Inquire About This Experience
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </Link>
            </div>

            <div className="lg:w-1/2">
              <div className="relative">
                <Link href="/destination/sigiriya-rock-fortress">
                  <img
                    src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743458277/destinations/sigiriya-rock-panoramic-views.jpg"
                    alt="Sigiriya Rock Fortress"
                    className="rounded-lg shadow-xl hover:opacity-95 transition-opacity"
                  />
                </Link>
                <div className="absolute -bottom-10 -right-10 p-6 bg-white rounded-lg shadow-lg max-w-xs hidden md:block">
                  <div className="flex items-center mb-4">
                    <i className="fas fa-star text-[#0077B6] text-2xl mr-4"></i>
                    <h3 className="font-['Playfair_Display'] text-lg font-semibold">
                      Exclusive Experience
                    </h3>
                  </div>
                  <p className="text-[#333333]/70">
                    Our guests enjoy private access to areas closed to regular
                    visitors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-[#F8F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0077B6] mb-4">
              Explore Sri Lanka
            </h2>
            <p className="text-lg text-[#333333]/80">
              Discover the diverse regions of Sri Lanka and start planning your
              luxury journey.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <img
              src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1743664436/destinations/kalpitiya-lagoon.jpg"
              alt="Kalpitiya Lagoon"
              className="w-full h-auto rounded-lg"
            />
            {/* Map would normally have interactive elements - simplified for this demo */}
            <div className="mt-8 text-center">
              <Link
                href="/contact"
                className="bg-[#0077B6] hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-full transition"
              >
                Plan Your Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#0077B6] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://res.cloudinary.com/drsjp6bqz/image/upload/v1747725969/experiences/sigiriya-and-pidurangala.jpg"
            alt="Sri Lanka landscape"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Discover Sri Lanka's Treasures?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              Let our experts craft a personalized journey through these
              stunning destinations, tailored to your preferences and travel
              style.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/tours"
                className="bg-white hover:bg-[#0077B6]/10 text-[#0077B6] hover:text-[#0077B6] font-medium py-3 px-8 rounded-full transition"
              >
                View Luxury Packages
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium py-3 px-8 rounded-full transition"
              >
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Destinations;
