import React from 'react';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  quality?: number;
  lazy?: boolean;
}

/**
 * Optimized Image component that handles proper sizing and loading
 * for improved performance and user experience.
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  objectFit = 'cover',
  quality = 80,
  lazy = true,
}: OptimizedImageProps) {
  // Handle images from external URLs vs local images
  const isExternalUrl = src?.startsWith('http');
  const imageSrc = isExternalUrl ? src : src;

  // Build a simple query string for image optimization
  // This would work with image optimization services like Cloudinary, Imgix, etc.
  // For this implementation, we'll just demonstrate the approach
  const optimizedSrc = isExternalUrl
    ? `${imageSrc}${imageSrc.includes('?') ? '&' : '?'}w=${width}&q=${quality}`
    : imageSrc;

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={lazy ? 'lazy' : 'eager'}
      className={`${className} object-${objectFit}`}
      style={{ 
        maxWidth: width ? `${width}px` : '100%', 
        maxHeight: height ? `${height}px` : 'auto',
        objectFit 
      }}
    />
  );
}

// Specialized versions with preset sizes for different use cases
export function HeroImage({ src, alt, className = '' }: Omit<OptimizedImageProps, 'width' | 'height'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1920}
      height={800}
      quality={85}
      lazy={false} // Hero should load immediately
      className={`w-full h-full ${className}`}
    />
  );
}

export function FeatureImage({ src, alt, className = '' }: Omit<OptimizedImageProps, 'width' | 'height'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={400}
      height={300}
      quality={75}
      className={`w-full h-full ${className}`}
    />
  );
}

export function ExperienceImage({ src, alt, className = '' }: Omit<OptimizedImageProps, 'width' | 'height'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={600}
      height={400}
      quality={80}
      className={`w-full h-full ${className}`}
    />
  );
}

export function GalleryImage({ src, alt, className = '', featured = false }: Omit<OptimizedImageProps, 'width' | 'height'> & { featured?: boolean }) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={featured ? 1000 : 800}
      height={featured ? 750 : 600}
      quality={80}
      className={`w-full h-full ${className}`}
    />
  );
}

export function BackgroundImage({ src, alt, className = '' }: Omit<OptimizedImageProps, 'width' | 'height'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1200}
      height={600}
      quality={70}
      className={`w-full h-full ${className}`}
    />
  );
}