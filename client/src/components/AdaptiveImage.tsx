import React, { useState, useEffect, useRef } from 'react';

export interface AdaptiveImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'original';
  objectPosition?: string;
  quality?: 'low' | 'medium' | 'high';
  placeholderColor?: string;
  focusPoint?: string; // Format: 'x% y%' - e.g., '50% 50%' is center
}

/**
 * AdaptiveImage Component
 * Provides smart cropping and adaptive scaling for images
 * 
 * @param src Image source URL
 * @param alt Alternative text for accessibility
 * @param className Additional CSS classes
 * @param aspectRatio Control the aspect ratio of the image container
 * @param objectPosition CSS object-position property to control focus point
 * @param quality Image quality (affects loading strategy)
 * @param placeholderColor Background color shown during loading
 * @param focusPoint Focus point for image (overrides objectPosition)
 */
const AdaptiveImage: React.FC<AdaptiveImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'original',
  objectPosition = 'center',
  quality = 'high',
  placeholderColor = '#F0F0F0',
  focusPoint,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Determine aspect ratio CSS class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'landscape':
        return 'aspect-video'; // 16:9 ratio
      case 'portrait':
        return 'aspect-[3/4]'; // 3:4 ratio
      case 'original':
      default:
        return '';
    }
  };

  // Loading strategy based on quality
  useEffect(() => {
    if (!imgRef.current || quality !== 'low') return;
    
    // For low quality, we'll load a smaller version first
    const fullSrc = src;
    // This would be replaced with actual image processing in production
    // For now we'll simulate by just setting the original
    setTimeout(() => {
      if (imgRef.current) {
        imgRef.current.src = fullSrc;
      }
    }, 100);
  }, [src, quality]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };

  // Apply focus point or object-position
  const imagePosition = focusPoint || objectPosition;

  return (
    <div 
      className={`overflow-hidden ${getAspectRatioClass()} ${className}`}
      style={{ backgroundColor: placeholderColor }}
    >
      {!error ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectPosition: imagePosition }}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
          {alt || 'Image not available'}
        </div>
      )}
    </div>
  );
};

export default AdaptiveImage;