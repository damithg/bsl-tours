import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Safely handles JSON data which might be a string that needs parsing
 * or an already parsed object
 * 
 * @param data The input data which could be a JSON string, parsed object, or null/undefined
 * @param fallback The fallback value to return if parsing fails or data is absent
 * @param debugLabel Optional label for debugging
 * @returns The parsed JSON object or the fallback value
 */
export function parseJsonSafely<T>(
  data: string | object | null | undefined, 
  fallback: T, 
  debugLabel?: string
): T {
  // Return fallback if data is absent
  if (data === null || data === undefined) {
    if (debugLabel) console.log(`[${debugLabel}] No data provided, using fallback`);
    return fallback;
  }
  
  try {
    // If it's already an object (not a string), return it
    if (typeof data === 'object') {
      if (debugLabel) console.log(`[${debugLabel}] Data is already an object:`, data);
      return data as unknown as T;
    }
    
    // Try to parse the string
    if (typeof data === 'string') {
      if (debugLabel) console.log(`[${debugLabel}] Parsing string data`);
      return JSON.parse(data) as T;
    }
    
    // For any other type, log and return fallback
    if (debugLabel) console.log(`[${debugLabel}] Unexpected data type:`, typeof data);
    return fallback;
  } catch (error) {
    console.error(`Error parsing JSON${debugLabel ? ` [${debugLabel}]` : ''}:`, error);
    console.log(`Data that failed to parse${debugLabel ? ` [${debugLabel}]` : ''}:`, data);
    return fallback;
  }
}

/**
 * Formats a currency value
 * 
 * @param value The value to format
 * @param currency The currency code (default: USD)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Truncates text to a specified length and adds ellipsis if needed
 * 
 * @param text The text to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Creates a slug from a string by converting to lowercase, 
 * replacing spaces with hyphens and removing special characters
 * 
 * @param text The text to convert to a slug
 * @returns Slugified string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Gets the initials from a name (first letter of first and last name)
 * 
 * @param name The full name
 * @returns Initials (1-2 characters)
 */
export function getInitials(name: string): string {
  const parts = name.split(' ').filter(part => part.length > 0);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Combines class names with Tailwind CSS classes, ensuring proper merging
 * 
 * @param inputs Class name inputs to be combined
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}