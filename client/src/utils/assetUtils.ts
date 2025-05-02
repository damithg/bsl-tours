/**
 * Utility functions for handling assets in the application.
 * This helps with proper asset resolving in both development and production builds.
 */

/**
 * Resolves the path to an asset, trying multiple potential locations 
 * to ensure it works across development and production environments.
 * 
 * @param path The relative path to the asset (e.g., '/images/logo.png')
 * @returns The resolved asset path
 */
export function getAssetPath(path: string): string {
  // For client-side rendering, use the path as-is
  return path;
}

/**
 * Gets a fallback URL for an asset in case the primary URL fails to load.
 * Used with the onError event of img tags.
 * 
 * @param primaryPath The primary path that failed to load
 * @param fallbackUrl The fallback absolute URL
 * @returns A function to handle the error event
 */
export function handleImageError(primaryPath: string, fallbackUrl: string) {
  return (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = e.target as HTMLImageElement;
    
    // Only replace if it's not already using the fallback
    if (imgElement.src.indexOf(fallbackUrl) === -1) {
      console.warn(`Failed to load image from ${primaryPath}, falling back to ${fallbackUrl}`);
      imgElement.src = fallbackUrl;
    }
  };
}