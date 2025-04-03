import React from 'react';
import { MapPin } from 'lucide-react';

// For use with the itinerary component
interface TourImage {
  publicId?: string;
  alt?: string;
  caption?: string;
  orientation?: string;
  baseUrl?: string;
  small?: string;
  medium?: string;
  large?: string;
}

interface ItineraryDayProps {
  day: number;
  title: string;
  description: string;
  image?: TourImage;
  isActive: boolean;
}

export const EnhancedItineraryItem: React.FC<ItineraryDayProps> = ({
  day,
  title,
  description,
  image,
  isActive
}) => {
  if (!isActive) return null;
  
  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden mb-8 transform transition-all duration-300">
      {/* Day badge in top-right - just to indicate which day without text */}
      <div className="absolute top-4 right-4 z-20 bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
        {day}
      </div>
      
      {/* Image and content in side-by-side layout */}
      <div className="md:flex items-start">
        {/* Image Section - Left side on desktop, top on mobile */}
        {image && (
          <div className="md:w-1/2 relative p-4 self-start">
            <div className="relative rounded-lg overflow-hidden shadow-lg border-4 border-white outline outline-1 outline-gray-200">
              {/* Main image with taller aspect ratio */}
              <img 
                src={image.medium || image.large || image.small || image.baseUrl} 
                alt={image.alt || title}
                className="w-full h-full object-cover object-center aspect-[4/5]"
              />
              
              {/* Caption */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-black/0 text-white p-4 pt-8 text-sm font-medium">
                  {image.caption}
                </div>
              )}
              
              {/* Decorative corner accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/70"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/70"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/70"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/70"></div>
            </div>
          </div>
        )}
        
        {/* Content Section - Right side on desktop, bottom on mobile */}
        <div className={`${image ? 'md:w-1/2' : 'w-full'} p-6 md:p-8 flex flex-col ${!image && 'md:min-h-[300px]'} self-start`}>
          {/* Title now in the right column */}
          <div className="mb-4 border-b border-primary/20 pb-3">
            <h3 className="text-2xl font-bold font-['Playfair_Display'] text-gray-800">
              {title}
            </h3>
          </div>

          {/* Decorative dot pattern in the corner */}
          <div className="absolute top-6 right-6 opacity-10 pointer-events-none">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-1">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="w-1 h-1 rounded-full bg-primary"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Description with formatted text and better typography */}
          <div className="prose prose-lg max-w-none">
            {description.split('\n').map((paragraph, i) => (
              paragraph ? (
                <p key={`para-${i}`} className="text-gray-600 leading-relaxed mb-3">
                  {paragraph.split('. ').map((sentence, j, arr) => {
                    // Create fragment with key but no additional props
                    return (
                      <React.Fragment key={`sent-${i}-${j}`}>
                        {sentence}{j < arr.length - 1 ? '. ' : ''}
                        {/* Add line break after key destinations or attractions */}
                        {(sentence.includes('visit') || 
                          sentence.includes('explore') || 
                          sentence.includes('discover')) && 
                          j < arr.length - 1 && <br className="hidden sm:block" />}
                      </React.Fragment>
                    );
                  })}
                </p>
              ) : <br key={`br-${i}`} />
            ))}
          </div>
          
          {/* Visual elements at the bottom */}
          <div className="mt-auto pt-6">
            <div className="w-16 h-1 bg-primary/30 rounded-full mb-4"></div>
            
            {/* Locations */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                <span>Key Locations</span>
              </h4>
              
              {/* Extract and highlight likely locations from the description */}
              <div className="flex flex-wrap gap-2">
                {description.match(/([A-Z][a-z]+ ?(?:[A-Z][a-z]+)?)(?: National Park| Temple| Fort| Beach| Museum| Gardens| Estate| Lake| Rock| Peak| Falls| Ancient City| Village)/g)?.map((location, i) => (
                  <div key={`location-${i}`} className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary/10 text-primary/90 border border-primary/20">
                    <MapPin className="w-3 h-3 mr-1" />
                    {location}
                  </div>
                )) || (
                  <div className="text-sm text-gray-500 italic">Explore Sri Lanka's beautiful scenery and culture</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedItineraryItem;