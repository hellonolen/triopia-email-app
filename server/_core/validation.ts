import { z } from "zod";

/**
 * Common validation schemas for security
 */

export const emailSchema = z.string().email().max(255);

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128)
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const urlSchema = z.string().url().max(2048);

export const idSchema = z.number().int().positive();

export const dateSchema = z.date();

export const stringSchema = z.string().max(10000); // Prevent extremely large strings

export const htmlSchema = z.string().max(100000); // For email bodies

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(html: string): string {
  // Basic XSS prevention - remove script tags and event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/on\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

/**
 * Validate and sanitize email subject
 */
export function sanitizeEmailSubject(subject: string): string {
  return subject.replace(/[\r\n]/g, "").slice(0, 998); // RFC 2822 limit
}

/**
 * Validate file upload
 */
export const fileUploadSchema = z.object({
  filename: z.string().max(255),
  mimetype: z.string().max(127),
  size: z.number().max(25 * 1024 * 1024), // 25MB max
});

/**
 * Rate limit key generator for user-specific limits
 */
export function getUserRateLimitKey(userId: number, action: string): string {
  return `ratelimit:${userId}:${action}`;
}
