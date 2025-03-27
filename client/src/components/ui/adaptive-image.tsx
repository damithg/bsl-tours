import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AdaptiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  focalPoint?: { x: number; y: number }; // Values between 0-1, defaults to center (0.5, 0.5)
  aspectRatio?: string; // e.g. "16/9", "4/3", "1/1"
  objectPosition?: string; // fallback if no focal point provided
  containerClassName?: string;
  imageClassName?: string;
  fallbackSrc?: string; // Optional fallback image URL if main image fails to load
  loadingPlaceholder?: boolean; // Show a placeholder while loading
  smartCrop?: boolean; // Enable smart cropping (true by default)
}

export function AdaptiveImage({
  src,
  alt,
  focalPoint = { x: 0.5, y: 0.5 },
  aspectRatio,
  objectPosition = "center",
  containerClassName,
  imageClassName,
  fallbackSrc,
  loadingPlaceholder = true,
  smartCrop = true,
  className,
  ...props
}: AdaptiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [actualObjectPosition, setActualObjectPosition] = useState(objectPosition);
  const imageRef = useRef<HTMLImageElement>(null);

  // Calculate object-position based on focal point if smart cropping is enabled
  useEffect(() => {
    if (smartCrop && focalPoint) {
      // Convert focal point (0-1) to percentage for CSS
      const xPos = `${focalPoint.x * 100}%`;
      const yPos = `${focalPoint.y * 100}%`;
      setActualObjectPosition(`${xPos} ${yPos}`);
    } else {
      setActualObjectPosition(objectPosition);
    }
  }, [focalPoint, objectPosition, smartCrop]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        aspectRatio && `aspect-[${aspectRatio}]`,
        containerClassName
      )}
    >
      {/* Loading placeholder */}
      {isLoading && loadingPlaceholder && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}
      
      {/* Main image */}
      <img
        ref={imageRef}
        src={hasError && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300", 
          isLoading ? "opacity-0" : "opacity-100",
          imageClassName,
          className
        )}
        style={{ objectPosition: actualObjectPosition }}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
}