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
    // IMPROVED VERSION: Prioritize pre-generated optimized URLs from the API
    
    // For lightbox (full-screen view), we want the highest quality image
    if (context === 'lightbox') {
      // Prioritize pre-generated URLs in order of preference: large → medium → banner → small → baseUrl/url
      return image.large || image.medium || image.banner || image.small || image.baseUrl || image.url || '';
    }
    
    // For grid view, we choose based on the tile size and position
    if (context === 'grid') {
      // Calculate if this is a featured tile that spans multiple cells
      const isSpanningTile = index !== undefined && (
        index === 0 || // First image always spans
        (image.orientation === 'landscape' && (index === 4 || index === 8)) || // Landscape images in these positions span horizontally
        (image.orientation === 'square' && index === 0) // Featured square
      );
      
      // For spanning/featured tiles, we want medium-sized images
      if (isSpanningTile) {
        // Priority: medium → large → small → banner → baseUrl/url
        return image.medium || image.large || image.small || image.banner || image.baseUrl || image.url || '';
      } 
      
      // For regular grid tiles, we want smaller images for better performance
      // Priority: small → medium → banner → large → baseUrl/url
      return image.small || image.medium || image.banner || image.large || image.baseUrl || image.url || '';
    }
    
    // If we don't have any pre-generated URLs, but we have a publicId or base URL, 
    // we can fallback to constructing a Cloudinary URL
    const imageUrl = image.baseUrl || image.url || '';
    if (imageUrl && imageUrl.includes && imageUrl.includes('cloudinary.com')) {
      // This is already a Cloudinary URL
      const parts = imageUrl.split('/upload/');
      if (parts.length === 2) {
        const baseUrl = parts[0] + '/upload/';
        const imagePath = parts[1];
        
        // Generate appropriate size based on context and orientation
        if (context === 'lightbox') {
          // For lightbox, use higher quality
          return `${baseUrl}q_auto:best/${imagePath}`;
        } else {
          // For grid, use more efficient sizes
          return `${baseUrl}c_fill,g_auto,w_600,h_450,q_auto:good/${imagePath}`;
        }
      }
    } else if (image.publicId) {
      // We have a publicId but no pre-generated URLs, generate a basic one
      return `https://res.cloudinary.com/drsjp6bqz/image/upload/${context === 'lightbox' ? 'q_auto:best' : 'c_fill,w_600,h_450,q_auto:good'}/${image.publicId}`;
    }
    
    // Default fallback
    return image.baseUrl || image.url || '';
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