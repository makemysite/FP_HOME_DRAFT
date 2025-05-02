
import { format } from 'date-fns';

/**
 * Normalizes a slug by removing leading/trailing slashes and handling edge cases
 * @param slug The slug to normalize
 * @returns Normalized slug
 */
export function normalizeSlug(slug: string): string {
  // Remove leading and trailing slashes
  let normalizedSlug = slug.replace(/^\/+|\/+$/g, '');
  
  // Convert to lowercase
  normalizedSlug = normalizedSlug.toLowerCase();
  
  // Replace spaces with hyphens
  normalizedSlug = normalizedSlug.replace(/\s+/g, '-');
  
  return normalizedSlug;
}

/**
 * Generate possible slug variations to try when querying the database
 * @param slug The original slug
 * @returns Array of possible slug variations
 */
export function getSlugVariations(slug: string): string[] {
  if (!slug) return [];
  
  const normalized = normalizeSlug(slug);
  
  // Array of possible slug variations to try
  const variations = [
    normalized,
    // With and without trailing slash
    normalized.endsWith('/') ? normalized.slice(0, -1) : `${normalized}/`,
    // Original slug (in case normalization removed something important)
    slug
  ];
  
  // Remove duplicates
  return [...new Set(variations)];
}

/**
 * Format a date string into a human-readable format
 * @param dateString ISO date string to format
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  return format(new Date(dateString), 'MMMM d, yyyy');
}
