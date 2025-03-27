import React from 'react';
import AdaptiveImage from './AdaptiveImage';

export interface PolaroidImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'original';
  rotation?: number;
  zIndex?: number;
  focusPoint?: string;
}

/**
 * PolaroidImage Component
 * Displays an image in a polaroid-style frame with optional caption and rotation
 * 
 * @param src Image source URL
 * @param alt Alternative text for accessibility
 * @param caption Optional caption text below the image
 * @param className Additional CSS classes for the container
 * @param aspectRatio Control the aspect ratio of the image
 * @param rotation Rotation angle in degrees (positive or negative)
 * @param zIndex Z-index value for stacking
 * @param focusPoint Focus point for image (format: 'x% y%')
 */
const PolaroidImage: React.FC<PolaroidImageProps> = ({
  src,
  alt,
  caption,
  className = '',
  aspectRatio = 'portrait',
  rotation = 0,
  zIndex = 10,
  focusPoint,
}) => {
  return (
    <div 
      className={`bg-white p-3 rounded-md shadow-lg ${className}`}
      style={{ 
        transform: `rotate(${rotation}deg)`,
        zIndex
      }}
    >
      <AdaptiveImage
        src={src}
        alt={alt}
        aspectRatio={aspectRatio}
        className="mb-2"
        focusPoint={focusPoint}
      />
      
      {caption && (
        <p className="text-xs text-center text-gray-600 font-medium">
          {caption}
        </p>
      )}
    </div>
  );
};

export default PolaroidImage;