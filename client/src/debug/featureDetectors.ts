/**
 * Feature Detectors - Runtime checks for production polish features
 * Used by /__debug/features endpoint to report actual implementation status
 */

export type FeatureMatrix = {
  skeletons: boolean;
  errorHandling: boolean;
  successToasts: boolean;
  emailValidation: boolean | "NA";
  pagination: boolean | "NA";
  xssSanitization: boolean;
  localStorage: boolean;
  autoSaveDrafts: boolean | "NA";
  offline: boolean;
  s3Upload: boolean | "NA";
};

// Global flags set by components at runtime
declare global {
  interface Window {
    __triopia?: {
      flags?: {
        route?: {
          [route: string]: {
            hasPager?: boolean;
            hasSkeletons?: boolean;
            hasErrorHandling?: boolean;
            hasToasts?: boolean;
            hasOfflineBanner?: boolean;
            hasXSS?: boolean;
          };
        };
      };
    };
  }
}

/**
 * Check if skeletons are implemented for a route
 * Looks for skeleton components or data-testid="skeleton" in DOM
 */
function hasSkeletons(route: string): boolean {
  // Check runtime flag
  if (window.__triopia?.flags?.route?.[route]?.hasSkeletons) {
    return true;
  }
  
  // Check for skeleton elements in DOM
  const skeletons = document.querySelectorAll('[data-testid*="skeleton"]');
  return skeletons.length > 0;
}

/**
 * Check if error handling is implemented
 * Looks for error banners with retry functionality
 */
function hasErrorHandling(route: string): boolean {
  // Check runtime flag
  if (window.__triopia?.flags?.route?.[route]?.hasErrorHandling) {
    return true;
  }
  
  // Check for error banner component
  const errorBanner = document.querySelector('[data-testid="error-banner"]');
  return errorBanner !== null;
}

/**
 * Check if success toasts are implemented
 * Looks for toast components and toast calls
 */
function hasSuccessToasts(): boolean {
  // Check for toast container
  const toastContainer = document.querySelector('[data-testid="toast-success"]') ||
                        document.querySelector('[data-sonner-toaster]');
  return toastContainer !== null;
}

/**
 * Check if email validation is implemented
 * Only applicable for routes with email input (settings, compose)
 */
function hasEmailValidation(route: string): boolean | "NA" {
  if (route === "/settings" || route === "/compose") {
    // Check for email validation in localStorage or form validation
    return false; // TODO: Implement email validation
  }
  return "NA";
}

/**
 * Check if pagination is implemented
 * Looks for pager component, URL sync, and localStorage persistence
 */
function hasPagination(route: string): boolean | "NA" {
  if (route === "/contacts" || route === "/settings") {
    return "NA";
  }
  
  // Check runtime flag
  if (window.__triopia?.flags?.route?.[route]?.hasPager) {
    return true;
  }
  
  // Check for pager component
  const pager = document.querySelector('[data-testid="pager"]');
  
  // Check for URL params
  const urlParams = new URLSearchParams(window.location.search);
  const hasPageParam = urlParams.has('page') || urlParams.has('size');
  
  // Check localStorage
  const hasStoredSize = localStorage.getItem('triopia:pager:size') !== null;
  
  return pager !== null && (hasPageParam || hasStoredSize);
}

/**
 * Check if XSS sanitization is implemented
 * Looks for DOMPurify usage in code
 */
function hasXSS(route: string): boolean {
  // Check runtime flag
  if (window.__triopia?.flags?.route?.[route]?.hasXSS) {
    return true;
  }
  
  // Check if DOMPurify is available
  return typeof (window as any).DOMPurify !== 'undefined';
}

/**
 * Check if localStorage is used for preferences
 * Looks for triopia:* keys
 */
function hasLocalStorage(): boolean {
  const triopiaKeys = Object.keys(localStorage).filter(key => key.startsWith('triopia:'));
  return triopiaKeys.length > 0;
}

/**
 * Check if auto-save drafts is implemented
 * Only applicable for compose routes
 */
function hasAutoSaveDrafts(route: string): boolean | "NA" {
  if (route === "/compose" || route === "/") {
    // Check for draft auto-save interval
    return false; // TODO: Implement auto-save drafts
  }
  return "NA";
}

/**
 * Check if offline detection is implemented
 * Looks for offline banner and disabled actions
 */
function hasOffline(): boolean {
  // Check runtime flag
  if (window.__triopia?.flags?.route?.['*']?.hasOfflineBanner) {
    return true;
  }
  
  // Check for offline banner
  const offlineBanner = document.querySelector('[data-testid="offline-banner"]');
  return offlineBanner !== null;
}

/**
 * Check if S3 upload is implemented
 * Only applicable for routes with file upload
 */
function hasS3Upload(route: string): boolean | "NA" {
  if (route === "/compose" || route === "/") {
    // Check for S3 uploader
    return false; // TODO: Implement S3 upload
  }
  return "NA";
}

/**
 * Detect all features for a given route
 */
export function detectFeaturesForRoute(route: string): FeatureMatrix {
  return {
    skeletons: hasSkeletons(route),
    errorHandling: hasErrorHandling(route),
    successToasts: hasSuccessToasts(),
    emailValidation: hasEmailValidation(route),
    pagination: hasPagination(route),
    xssSanitization: hasXSS(route),
    localStorage: hasLocalStorage(),
    autoSaveDrafts: hasAutoSaveDrafts(route),
    offline: hasOffline(),
    s3Upload: hasS3Upload(route),
  };
}

/**
 * Initialize runtime flags
 * Call this early in app bootstrap
 */
export function initFeatureFlags() {
  if (typeof window === 'undefined') return;
  
  window.__triopia = window.__triopia || {};
  window.__triopia.flags = window.__triopia.flags || {};
  window.__triopia.flags.route = window.__triopia.flags.route || {};
}

/**
 * Set a feature flag for a route
 */
export function setFeatureFlag(route: string, feature: string, value: boolean) {
  if (typeof window === 'undefined') return;
  
  initFeatureFlags();
  
  if (!window.__triopia!.flags!.route![route]) {
    window.__triopia!.flags!.route![route] = {};
  }
  
  (window.__triopia!.flags!.route![route] as any)[feature] = value;
}
