/**
 * URL resolution utilities for local development and production deployments.
 * Automatically resolves the correct origin for OAuth redirects and canonical links.
 */

export function getBaseURL(): string {
  // 1. If configured explicitly in environment, use that
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (siteUrl) {
    return siteUrl.replace(/\/$/, "");
  }

  // 2. If running on Vercel preview/production, Vercel provides VERCEL_URL / NEXT_PUBLIC_VERCEL_URL
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;
  if (vercelUrl) {
    const prefix = vercelUrl.startsWith("http") ? "" : "https://";
    return `${prefix}${vercelUrl.replace(/\/$/, "")}`;
  }

  // 3. Fallback for local development
  return "http://localhost:3000";
}

/**
 * Returns the full callback / redirect URL.
 * In browser context, always prefers `window.location.origin` to match the exact active domain.
 */
export function getOAuthRedirectURL(path: string = "/auth/callback"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}${normalizedPath}`;
  }

  return `${getBaseURL()}${normalizedPath}`;
}
