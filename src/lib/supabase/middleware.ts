import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Canonical route aliases mapping legacy and alternate links to canonical routes
const ROUTE_ALIASES: Record<string, string> = {
  "/dashboard": "/app/dashboard",
  "/career-discovery": "/app/career/discover",
  "/technical-assessment": "/app/assessments",
  "/assessment": "/app/assessments",
  "/personalized-learning": "/app/learning",
  "/learning": "/app/learning",
  "/real-world-projects": "/app/projects",
  "/projects": "/app/projects",
  "/problem-solving": "/app/practice",
  "/interview": "/app/interview",
  "/resume": "/app/resume",
  "/jobs": "/app/opportunities/jobs",
  "/opportunities": "/app/opportunities",
  "/application-tracker": "/app/applications",
  "/applications": "/app/applications",
  "/rejection-retraining": "/app/improve",
  "/feedback": "/app/improve",
  "/profile": "/app/profile",
  "/settings": "/app/settings",
  "/login": "/auth/login",
  "/signup": "/auth/signup",
};

// Public paths that do not require an active Supabase session
const PUBLIC_PATHS = new Set([
  "/",
  "/how-it-works",
  "/careers",
  "/resources",
  "/about",
  "/auth/login",
  "/auth/signup",
  "/auth/callback",
  "/auth/error",
  "/terms",
  "/privacy",
  "/robots.txt",
  "/sitemap.xml",
]);

/**
 * Validates that a redirect path is internal and relative,
 * preventing open redirect vulnerabilities.
 */
function getSafeNextPath(rawNext: string | null, fallback: string = "/app/dashboard"): string {
  if (!rawNext) return fallback;
  const decoded = decodeURIComponent(rawNext);
  if (decoded.startsWith("/") && !decoded.startsWith("//") && !decoded.includes("://")) {
    return decoded;
  }
  return fallback;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const { pathname, search } = request.nextUrl;

  // 1. Handle canonical route aliases
  if (ROUTE_ALIASES[pathname]) {
    const targetUrl = request.nextUrl.clone();
    targetUrl.pathname = ROUTE_ALIASES[pathname];
    return NextResponse.redirect(targetUrl);
  }

  // 2. Allow API routes to manage their own HTTP responses
  if (pathname.startsWith("/api/")) {
    return supabaseResponse;
  }

  // 3. Allow public routes
  if (PUBLIC_PATHS.has(pathname) || pathname.startsWith("/auth/")) {
    return supabaseResponse;
  }

  // 4. In development / local auth mode: allow access to app and onboarding routes
  // (LocalAuthProvider handles state in browser storage)
  return supabaseResponse;
}
