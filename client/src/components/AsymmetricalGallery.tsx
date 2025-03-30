import { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  publicId?: string;
  url?: string;
  baseUrl?: string;
  alt: string;
  caption?: string;
  orientation?: 'landscape' | 'portrait' | 'square' | string;
  // Cloudinary transformations
  small?: string;
  medium?: string;
  large?: string;
}

interface AsymmetricalGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export function AsymmetricalGallery({ images, className = '' }: AsymmetricalGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = ''; // Restore scrolling
  };

  const navigateToImage = (index: number) => {
    // Ensure index is within bounds
    if (index >= 0 && index < images.length) {
      setCurrentImageIndex(index);
    }
  };

  const navigatePrev = () => navigateToImage(currentImageIndex - 1);
  const navigateNext = () => navigateToImage(currentImageIndex + 1);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        navigatePrev();
        break;
      case 'ArrowRight':
        navigateNext();
        break;
      case 'Escape':
        closeLightbox();
        break;
      default:
        break;
    }
  }, [lightboxOpen, currentImageIndex]);

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 100) {
      // Swipe left - go to next image
      navigateNext();
    } else if (touchEndX - touchStartX > 100) {
      // Swipe right - go to previous image
      navigatePrev();
    }
  };

  // Set up keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Get optimized image URL based on context
  const getOptimizedImageUrl = (image: GalleryImage, size: 'small' | 'medium' | 'large'): string => {
    // Use the specified size if available, otherwise fall back to the original URL
    if (size === 'small' && image.small) return image.small;
    if (size === 'medium' && image.medium) return image.medium;
    if (size === 'large' && image.large) return image.large;
    if (image.baseUrl) return image.baseUrl;
    if (image.url) return image.url;
    
    // Fallback to construct URL from publicId if no direct URLs provided
    if (image.publicId) {
      return `https://res.cloudinary.com/drsjp6bqz/image/upload/${image.publicId}`;
    }
    
    // Absolute fallback to avoid breaking rendering
    return '';
  };

  return (
    <div className={`${className}`}>
      {/* Asymmetrical Grid Gallery */}
      <div className="grid grid-cols-12 gap-4">
        {images.length > 0 && (
          <>
            {/* Featured large image - spans 8 columns */}
            <div 
              className="col-span-12 md:col-span-8 cursor-pointer overflow-hidden rounded-lg relative group" 
              onClick={() => openLightbox(0)}
            >
              <img 
                src={getOptimizedImageUrl(images[0], 'medium')} 
                alt={images[0].alt}
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="font-medium">{images[0].caption || images[0].alt}</p>
              </div>
            </div>

            {/* Two stacked smaller images - each spans 4 columns */}
            <div className="col-span-12 md:col-span-4 space-y-4">
              {images.length > 1 && (
                <div 
                  className="cursor-pointer overflow-hidden rounded-lg relative group h-[240px]" 
                  onClick={() => openLightbox(1)}
                >
                  <img 
                    src={getOptimizedImageUrl(images[1], 'small')} 
                    alt={images[1].alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-medium">{images[1].caption || images[1].alt}</p>
                  </div>
                </div>
              )}

              {images.length > 2 && (
                <div 
                  className="cursor-pointer overflow-hidden rounded-lg relative group h-[240px]" 
                  onClick={() => openLightbox(2)}
                >
                  <img 
                    src={getOptimizedImageUrl(images[2], 'small')} 
                    alt={images[2].alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-medium">{images[2].caption || images[2].alt}</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Bottom row - two equal images */}
        <div className="col-span-12 md:col-span-6 cursor-pointer overflow-hidden rounded-lg relative group h-[240px]">
          {images.length > 3 && (
            <div 
              className="h-full"
              onClick={() => openLightbox(3)}
            >
              <img 
                src={getOptimizedImageUrl(images[3], 'small')} 
                alt={images[3].alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="font-medium">{images[3].caption || images[3].alt}</p>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-12 md:col-span-6 cursor-pointer overflow-hidden rounded-lg relative group h-[240px]">
          {images.length > 4 && (
            <div 
              className="h-full"
              onClick={() => openLightbox(4)}
            >
              <img 
                src={getOptimizedImageUrl(images[4], 'small')} 
                alt={images[4].alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="font-medium">{images[4].caption || images[4].alt}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] p-2"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Image */}
            <img 
              src={getOptimizedImageUrl(images[currentImageIndex], 'large')}
              alt={images[currentImageIndex].alt}
              className="max-h-[80vh] max-w-full object-contain mx-auto"
            />
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white text-center">
              {images[currentImageIndex].caption || images[currentImageIndex].alt}
            </div>

            {/* Navigation Controls */}
            <button 
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/80 transition-colors"
              onClick={(e) => { e.stopPropagation(); navigatePrev(); }}
              disabled={currentImageIndex === 0}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white hover:bg-black/80 transition-colors"
              onClick={(e) => { e.stopPropagation(); navigateNext(); }}
              disabled={currentImageIndex === images.length - 1}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white hover:bg-black/80 transition-colors"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-black/50 rounded-full px-3 py-1 text-white text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}