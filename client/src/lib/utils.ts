import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Safely parses a JSON string and returns the parsed data or a fallback value
 * 
 * @param jsonString The JSON string to parse
 * @param fallback The fallback value to return if parsing fails
 * @returns The parsed JSON object or the fallback value
 */
export function parseJsonSafely<T>(jsonString: string | null | undefined, fallback: T): T {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error("Error parsing JSON:", error);
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