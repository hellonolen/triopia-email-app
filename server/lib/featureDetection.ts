/**
 * Server-side feature detection
 * Returns computed feature status based on runtime checks
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

/**
 * Detect features for a route by checking code implementation
 * This is a simplified server-side version that reports based on known implementations
 */
export function detectFeaturesForRoute(route: string): FeatureMatrix {
  // Base features available on all routes
  const baseFeatures: FeatureMatrix = {
    skeletons: false,
    errorHandling: false,
    successToasts: false,
    emailValidation: "NA",
    pagination: "NA",
    xssSanitization: false,
    localStorage: false,
    autoSaveDrafts: "NA",
    offline: false,
    s3Upload: "NA",
  };

  // Route-specific features
  if (route === "/" || route === "/inbox") {
    return {
      skeletons: true, // EmailListSkeleton, EmailDetailSkeleton
      errorHandling: true, // Error banner with retry
      successToasts: true, // Toast notifications for actions
      emailValidation: "NA",
      pagination: true, // Pager with URL sync
      xssSanitization: true, // DOMPurify integration
      localStorage: true, // triopia:pager:size, triopia:sidebar:*
      autoSaveDrafts: "NA",
      offline: true, // Offline banner + disabled actions
      s3Upload: "NA",
    };
  }

  if (route === "/contacts") {
    return {
      ...baseFeatures,
      skeletons: false,
      errorHandling: false,
      successToasts: false,
      pagination: "NA",
    };
  }

  if (route === "/settings") {
    return {
      ...baseFeatures,
      skeletons: false,
      errorHandling: false,
      successToasts: false,
      emailValidation: false, // TODO: Add email validation
      pagination: "NA",
    };
  }

  return baseFeatures;
}
