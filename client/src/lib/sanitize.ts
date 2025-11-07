/**
 * XSS Sanitization Utility
 * Wraps DOMPurify for safe HTML rendering
 */

import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param dirty - Untrusted HTML string
 * @returns Sanitized HTML safe for rendering
 */
export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
    ALLOW_DATA_ATTR: false,
  });
}

/**
 * Sanitize email preview text (strip all HTML)
 * @param dirty - Untrusted text
 * @returns Plain text only
 */
export function sanitizePreview(dirty: string): string {
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [] });
}

// Expose DOMPurify globally for feature detection
if (typeof window !== 'undefined') {
  (window as any).DOMPurify = DOMPurify;
}
