import React from 'react';
import { Home, Clock, MapPin } from 'lucide-react';
import { StarRating } from './StarRating';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface DetailPageHeaderProps {
  imageUrl?: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
  rating?: number;
  reviewCount?: number;
  badges?: string[];
  duration?: string;
  location?: string;
  aspectRatio?: 'wide' | 'square';
  overlayOpacity?: number;
  textPosition?: 'bottom-left' | 'bottom-center' | 'center';
  children?: React.ReactNode;
}

const DetailPageHeader: React.FC<DetailPageHeaderProps> = ({
  imageUrl,
  imageAlt,
  title,
  subtitle,
  description,
  breadcrumbItems = [],
  rating,
  reviewCount,
  badges = [],
  duration,
  location,
  aspectRatio = 'wide',
  overlayOpacity = 20,
  children
}) => {
  const aspectClass = aspectRatio === 'wide' ? 'aspect-[4/3] sm:aspect-[16/9] lg:aspect-[3/1]' : 'aspect-[3/1]';

  return (
    <section className="relative pt-16 md:pt-20">
      <div className={`${aspectClass} w-full overflow-hidden relative`}>
        {/* Background Image */}
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

        {/* Overlay */}
        {overlayOpacity > 0 && (
          <div className={`absolute inset-0 bg-black/${overlayOpacity} z-10`}></div>
        )}
        
        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
            {/* Breadcrumb Navigation */}
            {breadcrumbItems.filter(item => item.label && item.label.trim()).length > 0 && (
              <nav className="flex text-white/90 mb-6" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-0.5 flex-wrap">
                  <li className="inline-flex items-center">
                    <a href="/" className="inline-flex items-center text-sm font-medium text-white/90 hover:text-white">
                      <Home className="w-4 h-4 mr-1.5" />
                      <span className="hidden sm:inline">Home</span>
                    </a>
                  </li>
                  {breadcrumbItems.filter(item => item.label && item.label.trim()).map((item, index) => (
                    <li key={index} {...(item.isCurrentPage ? { 'aria-current': 'page' } : {})} className="flex items-center">
                      <svg className="w-3 h-3 md:w-4 md:h-4 text-white/60 mx-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                      {item.href && !item.isCurrentPage ? (
                        <a href={item.href} className="text-sm font-medium text-white/90 hover:text-white">
                          {item.label}
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-white/80 truncate max-w-[120px] sm:max-w-[200px] md:max-w-none" title={item.label}>
                          {item.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}

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

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-md">
                {title}
              </h1>
              
              {/* Subtitle */}
              {subtitle && (
                <p className="text-base sm:text-lg md:text-xl max-w-2xl text-white/90 drop-shadow-sm mb-3 sm:mb-4">
                  {subtitle}
                </p>
              )}

              {/* Description */}
              {description && (
                <p className="text-base max-w-2xl text-white/80 drop-shadow-sm mb-6">
                  {description}
                </p>
              )}

              {/* Rating */}
              {rating && (
                <div className="flex items-center mb-4">
                  <StarRating rating={rating} size="md" />
                  {reviewCount && (
                    <span className="ml-2 font-medium text-white drop-shadow-sm">
                      {rating.toFixed(1)} ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                    </span>
                  )}
                </div>
              )}

              {/* Duration and Location */}
              {(duration || location) && (
                <div className="flex flex-wrap gap-4">
                  {duration && (
                    <span className="text-sm font-medium text-white/90">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {duration}
                    </span>
                  )}
                  {location && (
                    <span className="text-sm font-medium text-white/90">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {location}
                    </span>
                  )}
                </div>
              )}

              {/* Custom children content */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailPageHeader;