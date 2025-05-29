import React from 'react';
import { StarRating } from './StarRating';

interface DetailPageHeaderProps {
  // Image properties
  imageUrl?: string;
  imageAlt?: string;
  
  // Content properties
  title: string;
  subtitle?: string;
  description?: string;
  
  // Rating properties (optional)
  rating?: number;
  reviewCount?: number;
  
  // Additional content (optional)
  badges?: string[];
  duration?: string;
  location?: string;
  
  // Styling options
  aspectRatio?: 'wide' | 'standard'; // wide: 21/9, standard: 3/1
  overlayOpacity?: number; // 0-100, 0 = no overlay
  textPosition?: 'bottom-left' | 'bottom-center' | 'center';
  
  // Custom content slot
  children?: React.ReactNode;
}

export const DetailPageHeader: React.FC<DetailPageHeaderProps> = ({
  imageUrl,
  imageAlt,
  title,
  subtitle,
  description,
  rating,
  reviewCount,
  badges = [],
  duration,
  location,
  aspectRatio = 'wide',
  overlayOpacity = 0,
  textPosition = 'bottom-left',
  children
}) => {
  const aspectClass = aspectRatio === 'wide' ? 'aspect-[21/9] lg:aspect-[3/1]' : 'aspect-[3/1]';
  const overlayClass = overlayOpacity > 0 ? `bg-black/${overlayOpacity} z-10` : '';
  
  const positionClasses = {
    'bottom-left': 'justify-end items-start text-left',
    'bottom-center': 'justify-end items-center text-center',
    'center': 'justify-center items-center text-center'
  };

  return (
    <section className="relative pt-[65px] md:pt-0">
      <div className={`${aspectClass} w-full overflow-hidden relative`}>
        {overlayOpacity > 0 && (
          <div className={`absolute inset-0 ${overlayClass}`}></div>
        )}
        
        {imageUrl ? (
          <img 
            src={imageUrl}
            alt={imageAlt || title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-lg">No image available</span>
          </div>
        )}

        {/* Content Overlay - only show if we have overlay or text positioning */}
        {(overlayOpacity > 0 || textPosition !== 'bottom-left') && (
          <div className={`absolute inset-0 flex ${positionClasses[textPosition]} p-8 md:p-12 lg:p-16 z-20`}>
            <div className="max-w-4xl">
              {/* Badges */}
              {badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {badges.map((badge, index) => (
                    <span 
                      key={index}
                      className="bg-white/90 backdrop-blur-sm py-1.5 px-3 rounded-full text-xs font-medium uppercase tracking-wider text-gray-700"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              {/* Title and Subtitle */}
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-md ${
                overlayOpacity > 0 ? 'text-white' : 'text-gray-800'
              }`}>
                {title}
              </h1>
              
              {subtitle && (
                <p className={`text-lg md:text-xl max-w-2xl drop-shadow-sm mb-4 ${
                  overlayOpacity > 0 ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {subtitle}
                </p>
              )}

              {/* Description */}
              {description && (
                <p className={`text-base max-w-2xl drop-shadow-sm mb-6 ${
                  overlayOpacity > 0 ? 'text-white/80' : 'text-gray-600'
                }`}>
                  {description}
                </p>
              )}

              {/* Rating */}
              {rating && (
                <div className="flex items-center mb-4">
                  <StarRating rating={rating} size="md" />
                  {reviewCount && (
                    <span className={`ml-2 font-medium drop-shadow-sm ${
                      overlayOpacity > 0 ? 'text-white' : 'text-gray-700'
                    }`}>
                      {rating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                    </span>
                  )}
                </div>
              )}

              {/* Duration and Location */}
              {(duration || location) && (
                <div className="flex flex-wrap gap-4">
                  {duration && (
                    <span className={`text-sm font-medium ${
                      overlayOpacity > 0 ? 'text-white/90' : 'text-gray-600'
                    }`}>
                      Duration: {duration}
                    </span>
                  )}
                  {location && (
                    <span className={`text-sm font-medium ${
                      overlayOpacity > 0 ? 'text-white/90' : 'text-gray-600'
                    }`}>
                      Location: {location}
                    </span>
                  )}
                </div>
              )}

              {/* Custom children content */}
              {children}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailPageHeader;