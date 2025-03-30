import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryImageType {
  // Core required properties
  alt: string;
  
  // URL properties (at least one of these must exist)
  url?: string;
  baseUrl?: string;
  
  // Cloudinary transformation URLs
  small?: string;
  medium?: string;
  banner?: string;
  large?: string;
  
  // Additional metadata
  publicId?: string;
  caption?: string;
  orientation?: 'landscape' | 'portrait' | 'square' | string;
  width?: number;
  height?: number;
  category?: string;
}

export interface ResponsivePhotoGalleryProps {
  images: GalleryImageType[];
  className?: string;
}

export function ResponsivePhotoGallery({ images, className = '' }: ResponsivePhotoGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  // Handle keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, activeIndex]);
  
  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);
  
  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setIsLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };
  
  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };
  
  // Touch handlers for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      navigateImage('next');
    } else if (isRightSwipe) {
      navigateImage('prev');
    }
  };
  
  // Get optimal image source based on screen size, context, and layout position
  const getOptimalImageSrc = (image: GalleryImageType, context: 'grid' | 'lightbox', index?: number): string => {
    // Use the appropriate URL (handle both API formats)
    const imageUrl = image.url || image.baseUrl || '';
    
    // If we don't have a URL at all
    if (!imageUrl) {
      return image.medium || image.small || image.banner || image.large || '';
    }
    
    // First check if we have pre-optimized images from the API
    if (context === 'lightbox' && image.large) {
      return image.large;
    }
    
    if (context === 'lightbox' && image.medium) {
      return image.medium;
    }
    
    // For grid view, check the layout position to determine optimal image size
    if (context === 'grid') {
      // Calculate if this is a featured tile that spans multiple cells
      const isSpanningTile = index !== undefined && (
        index === 0 || // First image always spans
        (image.orientation === 'landscape' && (index === 4 || index === 8)) || // Landscape images in these positions span horizontally
        (image.orientation === 'square' && index === 0) // Featured square
      );
      
      // Use medium size for featured/spanning tiles to avoid stretching
      if (isSpanningTile && image.medium) {
        return image.medium;
      }
      
      // Use small size for regular tiles
      if (image.small) {
        return image.small;
      }
    }
    
    // If it's a Cloudinary URL, we can add transformations
    const isCloudinary = imageUrl.includes && imageUrl.includes('cloudinary.com');
    
    if (isCloudinary) {
      // For Cloudinary images, we can use their transformation API
      const baseUrl = imageUrl.split('/upload/')[0] + '/upload/';
      const imagePath = imageUrl.split('/upload/')[1];
      
      if (context === 'grid') {
        // Calculate if this is a featured tile that spans multiple cells
        const isSpanningTile = index !== undefined && (
          index === 0 || // First image always spans
          (image.orientation === 'landscape' && (index === 4 || index === 8)) || // Landscape images in these positions span horizontally
          (image.orientation === 'square' && index === 0) // Featured square
        );
        
        // Different sizes based on layout position and orientation
        if (isSpanningTile) {
          // For larger tiles, use larger images
          if (image.orientation === 'portrait') {
            return `${baseUrl}c_fill,g_auto,h_800,w_600,q_auto:good/${imagePath}`;
          } else if (image.orientation === 'square') {
            return `${baseUrl}c_fill,g_auto,h_700,w_700,q_auto:good/${imagePath}`;
          } else { // landscape
            return `${baseUrl}c_fill,g_auto,h_600,w_800,q_auto:good/${imagePath}`;
          }
        } else {
          // Regular tiles
          if (image.orientation === 'portrait') {
            return `${baseUrl}c_fill,g_auto,h_400,w_300,q_auto:good/${imagePath}`;
          } else if (image.orientation === 'square') {
            return `${baseUrl}c_fill,g_auto,h_350,w_350,q_auto:good/${imagePath}`;
          } else { // landscape
            return `${baseUrl}c_fill,g_auto,h_300,w_400,q_auto:good/${imagePath}`;
          }
        }
      } else {
        // Higher quality, responsive images for the lightbox
        // Preserve original orientation for lightbox viewing
        if (image.orientation === 'portrait') {
          return `${baseUrl}c_limit,h_1600,w_1000,q_auto:best/${imagePath}`;
        } else {
          return `${baseUrl}c_limit,h_1200,w_1600,q_auto:best/${imagePath}`;
        }
      }
    }
    
    // For non-Cloudinary images, use the provided variants
    if (context === 'grid') {
      return image.small || image.medium || imageUrl || '';
    } else {
      return image.banner || image.large || image.medium || imageUrl || '';
    }
  };
  
  // Determine if an image should have a special layout
  const getImageLayout = (index: number, image: GalleryImageType): string => {
    // If image has orientation data, use it to determine layout
    if (image.orientation) {
      // Portrait images take up 1 column but 2 rows for better display
      if (image.orientation === 'portrait') {
        // Showcase portrait images in appropriate spots
        if (index === 0 || index === 3 || index === 7) {
          return 'sm:col-span-1 sm:row-span-2';
        } 
      }
      
      // Landscape images can span 2 columns for better visibility
      if (image.orientation === 'landscape') {
        // Make first landscape image a featured one
        if (index === 0) {
          return 'sm:col-span-2 sm:row-span-2';
        }
        
        // Other landscape images can span two columns where appropriate
        if (index === 4 || index === 8) {
          return 'sm:col-span-2 sm:row-span-1';
        }
      }
      
      // Square images can be default size or occasionally featured
      if (image.orientation === 'square' && index === 0) {
        return 'sm:col-span-2 sm:row-span-2';
      }
    } else {
      // Fallback to index-based layout if no orientation data
      // Make first image larger
      if (index === 0) return 'sm:col-span-2 sm:row-span-2';
      
      // Make every 5th image (excluding the first one) larger
      if ((index + 4) % 5 === 0) return 'sm:col-span-2 sm:row-span-1';
      
      // Second row, second column image
      if (index === 3) return 'sm:col-span-1 sm:row-span-2';
    }
    
    return '';
  };
  
  return (
    <div className={`${className}`} ref={galleryRef}>
      {/* Grid Gallery */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`rounded-lg overflow-hidden cursor-pointer ${getImageLayout(index, image)}`}
            onClick={() => openLightbox(index)}
          >
            <img
              src={getOptimalImageSrc(image, 'grid', index)}
              alt={image.alt || `Gallery image ${index + 1}`}
              className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex flex-col"
          onClick={closeLightbox}
        >
          {/* Header with close button */}
          <div className="p-4 flex justify-between items-center">
            <span className="text-white text-sm opacity-75">{activeIndex + 1} / {images.length}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Main image area with swipe support */}
          <div 
            className="flex-grow flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={getOptimalImageSrc(images[activeIndex], 'lightbox')}
              alt={images[activeIndex].alt || `Gallery image ${activeIndex + 1}`}
              className="max-h-[80vh] max-w-[95vw] object-contain px-2"
            />
          </div>
          
          {/* Navigation controls - large touch targets */}
          <div className="p-4 flex justify-between">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}