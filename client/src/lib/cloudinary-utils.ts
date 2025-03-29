/**
 * Cloudinary image transformation utilities for BSL Tours
 */

// Base Cloudinary URL
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/bsltours/image/upload';

// Common image sizes
export const IMAGE_SIZES = {
  THUMBNAIL: { width: 300, height: 200 },
  CARD: { width: 600, height: 400 },
  HERO: { width: 1920, height: 800 },
  GALLERY: { width: 800, height: 600 },
  FEATURED: { width: 1000, height: 750 },
  BACKGROUND: { width: 1200, height: 600 },
  ITINERARY: { width: 600, height: 400 },
  EXPERIENCE: { width: 600, height: 400 }
};

// Common image quality levels
export const IMAGE_QUALITY = {
  LOW: 60,
  MEDIUM: 75,
  HIGH: 85,
  PREMIUM: 90
};

// Image formats
export const IMAGE_FORMAT = {
  AUTO: 'auto',
  WEBP: 'webp',
  AVIF: 'avif',
  JPEG: 'jpg',
  PNG: 'png'
};

/**
 * Generate a Cloudinary transformation URL
 * @param originalUrl Original image URL 
 * @param options Transformation options
 * @returns Transformed Cloudinary URL
 */
export function getCloudinaryUrl(
  originalUrl: string, 
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
    crop?: 'fill' | 'fit' | 'crop' | 'scale';
    gravity?: 'auto' | 'center' | 'face';
    effect?: string;
    radius?: number;
    background?: string;
  } = {}
): string {
  // Return original URL if it's not a Cloudinary URL and doesn't have a public ID
  if (!originalUrl.includes('cloudinary.com') && !originalUrl.startsWith('/')) {
    return originalUrl;
  }

  // Setup default options
  const {
    width,
    height,
    quality = IMAGE_QUALITY.HIGH,
    format = IMAGE_FORMAT.AUTO,
    crop = 'fill',
    gravity = 'auto',
    effect = '',
    radius = 0,
    background = ''
  } = options;

  // Build transformation string
  const transformations: string[] = [];

  // Add width and height if provided
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);

  // Add other transformations
  if (crop) transformations.push(`c_${crop}`);
  if (gravity) transformations.push(`g_${gravity}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format !== 'auto') transformations.push(`f_${format}`);
  if (effect) transformations.push(`e_${effect}`);
  if (radius) transformations.push(`r_${radius}`);
  if (background) transformations.push(`b_${background}`);

  // Combine transformations
  const transformationString = transformations.join(',');

  // Check if the URL is a Cloudinary URL already or a local path
  if (originalUrl.includes('cloudinary.com')) {
    // Extract existing transformations and replace them
    const regex = /\/upload\/([^/]+)\//;
    const hasExistingTransform = regex.test(originalUrl);
    
    if (hasExistingTransform) {
      return originalUrl.replace(regex, `/upload/${transformationString}/`);
    } else {
      return originalUrl.replace('/upload/', `/upload/${transformationString}/`);
    }
  } else if (originalUrl.startsWith('/')) {
    // For local paths, assume they're public IDs for Cloudinary
    // Strip leading slash for the public ID
    const publicId = originalUrl.substring(1);
    return `${CLOUDINARY_BASE_URL}/${transformationString}/${publicId}`;
  }

  // Fallback to original URL if we can't process it
  return originalUrl;
}

/**
 * Get an optimized hero image URL
 * @param imageUrl Original image URL or path
 * @returns Transformed URL for hero usage
 */
export function getHeroImageUrl(imageUrl: string): string {
  return getCloudinaryUrl(imageUrl, {
    width: IMAGE_SIZES.HERO.width,
    height: IMAGE_SIZES.HERO.height,
    quality: IMAGE_QUALITY.HIGH,
    crop: 'fill',
    gravity: 'auto'
  });
}

/**
 * Get an optimized gallery image URL
 * @param imageUrl Original image URL or path
 * @param featured Whether this is a featured (larger) gallery image
 * @returns Transformed URL for gallery usage
 */
export function getGalleryImageUrl(imageUrl: string, featured = false): string {
  return getCloudinaryUrl(imageUrl, {
    width: featured ? IMAGE_SIZES.FEATURED.width : IMAGE_SIZES.GALLERY.width,
    height: featured ? IMAGE_SIZES.FEATURED.height : IMAGE_SIZES.GALLERY.height,
    quality: IMAGE_QUALITY.HIGH,
    crop: 'fill',
    gravity: 'auto'
  });
}

/**
 * Get an optimized card image URL
 * @param imageUrl Original image URL or path
 * @returns Transformed URL for card usage
 */
export function getCardImageUrl(imageUrl: string): string {
  return getCloudinaryUrl(imageUrl, {
    width: IMAGE_SIZES.CARD.width,
    height: IMAGE_SIZES.CARD.height,
    quality: IMAGE_QUALITY.MEDIUM,
    crop: 'fill',
    gravity: 'auto'
  });
}

/**
 * Get an optimized thumbnail image URL
 * @param imageUrl Original image URL or path
 * @returns Transformed URL for thumbnail usage
 */
export function getThumbnailImageUrl(imageUrl: string): string {
  return getCloudinaryUrl(imageUrl, {
    width: IMAGE_SIZES.THUMBNAIL.width,
    height: IMAGE_SIZES.THUMBNAIL.height,
    quality: IMAGE_QUALITY.MEDIUM,
    crop: 'fill',
    gravity: 'auto'
  });
}

/**
 * Get an optimized itinerary image URL
 * @param imageUrl Original image URL or path
 * @returns Transformed URL for itinerary usage
 */
export function getItineraryImageUrl(imageUrl: string): string {
  return getCloudinaryUrl(imageUrl, {
    width: IMAGE_SIZES.ITINERARY.width,
    height: IMAGE_SIZES.ITINERARY.height,
    quality: IMAGE_QUALITY.MEDIUM,
    crop: 'fill',
    gravity: 'auto'
  });
}

/**
 * Get an optimized experience image URL
 * @param imageUrl Original image URL or path
 * @returns Transformed URL for experience usage
 */
export function getExperienceImageUrl(imageUrl: string): string {
  return getCloudinaryUrl(imageUrl, {
    width: IMAGE_SIZES.EXPERIENCE.width,
    height: IMAGE_SIZES.EXPERIENCE.height,
    quality: IMAGE_QUALITY.HIGH,
    crop: 'fill',
    gravity: 'auto'
  });
}

/**
 * Get an optimized background image URL
 * @param imageUrl Original image URL or path
 * @returns Transformed URL for background usage
 */
export function getBackgroundImageUrl(imageUrl: string): string {
  return getCloudinaryUrl(imageUrl, {
    width: IMAGE_SIZES.BACKGROUND.width,
    height: IMAGE_SIZES.BACKGROUND.height,
    quality: IMAGE_QUALITY.LOW,
    crop: 'fill',
    gravity: 'auto',
    effect: 'auto_brightness'
  });
}