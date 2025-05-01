import { useQuery } from "@tanstack/react-query";
import { Destination } from "@shared/schema";
import { useState, useRef, useEffect } from "react";
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideRefreshCw,
  ChevronRight as LucideChevronRightArrow,
} from "lucide-react";
import { queryClient, getQueryFn } from "@/lib/queryClient";
import { AdaptiveImage } from "./ui/adaptive-image";
import {
  determineFocalPoint,
  DESTINATION_FOCAL_POINTS,
} from "@/lib/image-utils";
import { COLORS } from "@/utils/colors";
import { Tag } from "@/components/ui/tag";

const DestinationShowcase = () => {
  const queryKey = ["/api/destinations"];
  // Debug code (temporarily hidden)
  // console.log("DestinationShowcase mounted");

  const {
    data: destinations,
    isLoading,
    error,
    refetch,
  } = useQuery<Destination[]>({
    queryKey,
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollable = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 1,
      );
    }
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -container.clientWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section
        id="destinations"
        className="py-20 bg-gradient-to-b from-primary/5 to-primary/10"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-primary mb-4">
              Stunning Destinations
            </h2>
            <p className="text-lg text-foreground/80">
              Discover Sri Lanka's most breathtaking locations, where luxury and
              natural beauty combine for unforgettable experiences.
            </p>
          </div>

          <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] relative overflow-hidden rounded-lg shadow-lg h-80 bg-gray-300 animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="destinations"
        className="py-20 bg-gradient-to-b from-primary/5 to-primary/10"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-primary mb-4">
              Stunning Destinations
            </h2>
            <p className="text-red-500">
              Failed to load destinations. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Handle empty destinations array
  if (!destinations || destinations.length === 0) {
    return (
      <section
        id="destinations"
        className="py-20 bg-gradient-to-b from-primary/5 to-primary/10"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-primary mb-4">
              Stunning Destinations
            </h2>
            <p className="text-lg text-foreground/80 mb-4">
              Currently configuring our destinations. Please check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="destinations"
      className="py-10 pb-12 bg-gradient-to-b from-background to-primary/5"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-primary mb-4">
            Stunning Destinations
          </h2>
          <p className="text-lg text-foreground/80">
            Discover Sri Lanka's most breathtaking locations, where luxury and
            natural beauty combine for unforgettable experiences.
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={scrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow-md -ml-4 transition ${
              !canScrollLeft
                ? "opacity-0 cursor-default"
                : "opacity-100 cursor-pointer"
            }`}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <LucideChevronLeft size={24} />
          </button>

          <button
            onClick={scrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow-md -mr-4 transition ${
              !canScrollRight
                ? "opacity-0 cursor-default"
                : "opacity-100 cursor-pointer"
            }`}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <LucideChevronRight size={24} />
          </button>

          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory hide-scrollbar"
            onScroll={checkScrollable}
          >
            {destinations.map((destination) => {
              // Debug code (temporarily hidden)
              // console.log("full destination:", destination);

              return (
                <div
                  key={destination.id}
                  className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start group relative overflow-hidden rounded-lg shadow-lg h-80 transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-xl"
                >
                  {(destination as any).card?.image?.publicId ||
                  (destination as any).images?.card ||
                  destination.imageUrl ||
                  ((destination as any).heroImage &&
                    (destination as any).heroImage.publicId) ? (
                    <div className="w-full h-full transition duration-700 group-hover:scale-110">
                      <AdaptiveImage
                        src={
                          // New card image structure with optimized URLs
                          (destination as any).card?.image?.medium ||
                          (destination as any).card?.image?.small ||
                          (destination as any).card?.image?.baseUrl ||
                          // Legacy image structure with publicId
                          ((destination as any).card?.image?.publicId
                            ? `https://res.cloudinary.com/drsjp6bqz/image/upload/${(destination as any).card.image.publicId}`
                            : // Legacy images object or direct URL
                              (destination as any).images?.card ||
                              destination.imageUrl ||
                              // Hero image as fallback
                              ((destination as any).heroImage &&
                                (destination as any).heroImage.medium) ||
                              ((destination as any).heroImage &&
                                (destination as any).heroImage.baseUrl) ||
                              ((destination as any).heroImage &&
                              (destination as any).heroImage.publicId
                                ? `https://res.cloudinary.com/drsjp6bqz/image/upload/${(destination as any).heroImage.publicId}`
                                : ""))
                        }
                        alt={
                          (destination as any).card?.image?.alt ||
                          destination.name
                        }
                        focalPoint={
                          DESTINATION_FOCAL_POINTS[destination.name] ||
                          determineFocalPoint(
                            // Use the same URL source order as above for consistency
                            (destination as any).card?.image?.medium ||
                              (destination as any).card?.image?.small ||
                              (destination as any).card?.image?.baseUrl ||
                              ((destination as any).card?.image?.publicId
                                ? `https://res.cloudinary.com/drsjp6bqz/image/upload/${(destination as any).card.image.publicId}`
                                : (destination as any).images?.card ||
                                  destination.imageUrl ||
                                  ((destination as any).heroImage &&
                                    (destination as any).heroImage.medium) ||
                                  ((destination as any).heroImage &&
                                    (destination as any).heroImage.baseUrl) ||
                                  ((destination as any).heroImage &&
                                  (destination as any).heroImage.publicId
                                    ? `https://res.cloudinary.com/drsjp6bqz/image/upload/${(destination as any).heroImage.publicId}`
                                    : "")),
                            destination.name,
                          )
                        }
                        imageClassName="transition duration-700 group-hover:scale-110"
                        containerClassName="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 transition duration-700 group-hover:scale-110">
                      No Image Available
                    </div>
                  )}
                  {/* Tags at the top of the card, similar to FeaturedPackages */}
                  {(destination as any).card?.tags &&
                    (destination as any).card.tags.length > 0 && (
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                        {(destination as any).card.tags
                          .slice(0, 3)
                          .map((tag: string, index: number) => (
                            <Tag key={index} variant="scenic">
                              {tag}
                            </Tag>
                          ))}
                      </div>
                    )}
                  <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-95" 
                        style={{ 
                          background: `linear-gradient(to top, 
                            rgba(0,0,0,0.9) 0%, 
                            rgba(0,0,0,0.7) 20%, 
                            rgba(0,0,0,0.4) 40%, 
                            rgba(0,0,0,0.2) 65%, 
                            rgba(0,0,0,0.1) 80%, 
                            transparent 100%)`
                        }}>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl text-white font-bold mb-3 transition-colors duration-300 group-hover:text-secondary text-shadow-sm">
                      {(destination as any).card?.heading ||
                        (destination as any).card?.header ||
                        (destination as any).card?.title ||
                        destination.name ||
                        "Destination"}
                    </h3>
                    <p className="text-white/95 mb-5 max-w-md line-clamp-2 group-hover:line-clamp-3 transition-all duration-300 text-base">
                      {(destination as any).card?.body ||
                        (destination as any).card?.subtitle ||
                        destination.excerpt ||
                        destination.shortDescription ||
                        destination.description ||
                        "Description not available"}
                    </p>
                    <a
                      href={`/destination/${destination.slug || destination.id}`}
                      className="inline-flex items-center bg-primary hover:bg-primary/90 
                                text-white font-medium py-2.5 px-6 rounded-full transition group shadow-md"
                    >
                      Explore{" "}
                      <LucideChevronRightArrow className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/destinations"
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            View All Destinations
            <LucideChevronRightArrow className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DestinationShowcase;
