/**
 * Image processing utilities for adaptive scaling and smart cropping
 */

export interface FocalPoint {
  x: number;
  y: number;
}

// Predefined focal points for different image types
export const FOCAL_POINTS = {
  // Default center focal point
  DEFAULT: { x: 0.5, y: 0.5 },
  
  // Landscape-oriented presets
  LANDSCAPE_TOP: { x: 0.5, y: 0.25 },
  LANDSCAPE_BOTTOM: { x: 0.5, y: 0.75 },
  
  // Portrait-oriented presets
  PORTRAIT_LEFT: { x: 0.25, y: 0.5 },
  PORTRAIT_RIGHT: { x: 0.75, y: 0.5 },
  
  // Corner presets
  TOP_LEFT: { x: 0.25, y: 0.25 },
  TOP_RIGHT: { x: 0.75, y: 0.25 },
  BOTTOM_LEFT: { x: 0.25, y: 0.75 },
  BOTTOM_RIGHT: { x: 0.75, y: 0.75 },
};

// Map destination names to suggested focal points
// This helps with consistent cropping for known destinations
export const DESTINATION_FOCAL_POINTS: Record<string, FocalPoint> = {
  "Sigiriya Rock Fortress": { x: 0.5, y: 0.4 },  // Focus slightly above center to show the rock
  "Galle Fort": { x: 0.5, y: 0.6 },             // Focus slightly below center to show the fort walls
  "Yala National Park": { x: 0.5, y: 0.5 },      // Default center for wildlife
  "Ella": { x: 0.5, y: 0.4 },                    // Slightly above center for mountain views
  "Bentota Beach": { x: 0.5, y: 0.6 },           // Below center to show beach/water
  "Nine Arch Bridge": { x: 0.5, y: 0.4 },        // Above center to see the bridge structure
  "Mirissa": { x: 0.5, y: 0.65 },                // Below center to show beach/water
  "Kandy": { x: 0.5, y: 0.5 },                   // Center for temple
  "Adam's Peak": { x: 0.5, y: 0.35 },            // Above center for mountain peak
  "Tea Plantations": { x: 0.5, y: 0.5 },         // Center for rolling hills of tea
};

/**
 * Determines the best focal point for an image based on its content or path
 * 
 * @param imageUrl The URL of the image
 * @param destinationName Optional destination name to use predefined focal points
 * @returns FocalPoint coordinates (values from 0-1)
 */
export function determineFocalPoint(imageUrl: string, destinationName?: string): FocalPoint {
  // If we have a destination name with a predefined focal point, use that
  if (destinationName && DESTINATION_FOCAL_POINTS[destinationName]) {
    return DESTINATION_FOCAL_POINTS[destinationName];
  }
  
  // Check image URL for keywords that might suggest a focal point
  const url = imageUrl.toLowerCase();
  
  if (url.includes("beach") || url.includes("coast") || url.includes("ocean")) {
    return FOCAL_POINTS.LANDSCAPE_BOTTOM;
  }
  if (url.includes("mountain") || url.includes("peak") || url.includes("hill")) {
    return FOCAL_POINTS.LANDSCAPE_TOP;
  }
  if (url.includes("wildlife") || url.includes("animal") || url.includes("leopard")) {
    return FOCAL_POINTS.DEFAULT; // Center is usually best for wildlife
  }
  
  // Default to center if no specific rules match
  return FOCAL_POINTS.DEFAULT;
}

/**
 * Calculates the CSS aspect ratio string for responsive layouts
 * 
 * @param width Width of the image
 * @param height Height of the image
 * @returns A CSS aspect ratio string like "16/9"
 */
export function calculateAspectRatio(width: number, height: number): string {
  // Find the greatest common divisor
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  
  // Return the simplified ratio
  return `${width / divisor}/${height / divisor}`;
}

/**
 * Determines if the image is portrait or landscape
 * 
 * @param width Width of the image
 * @param height Height of the image
 * @returns 'portrait', 'landscape', or 'square'
 */
export function getImageOrientation(width: number, height: number): 'portrait' | 'landscape' | 'square' {
  if (width > height) return 'landscape';
  if (height > width) return 'portrait';
  return 'square';
}

/**
 * Standard aspect ratios for common use cases
 */
export const ASPECT_RATIOS = {
  WIDESCREEN: "16/9",
  STANDARD: "4/3",
  SQUARE: "1/1",
  PORTRAIT: "3/4",
  WIDE_PORTRAIT: "2/3",
  HERO: "21/9",
  POLAROID: "4/5",
  ULTRAWIDE: "21/9"
};