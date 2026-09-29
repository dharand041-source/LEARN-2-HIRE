import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Conceptual route aliases mapped to active project paths
const ROUTE_ALIASES: Record<string, string> = {
  "/career-discovery": "/onboarding",
  "/technical-assessment": "/assessment",
  "/personalized-learning": "/learning",
  "/real-world-projects": "/projects",
  "/jobs": "/opportunities",
  "/application-tracker": "/applications",
  "/rejection-retraining": "/feedback",
};

// Public paths that do not require an active Supabase session
const PUBLIC_PATHS = new Set([
  "/login",
  "/signup",
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
function getSafeNextPath(rawNext: string | null, fallback: string = "/dashboard"): string {
  if (!rawNext) return fallback;
  const decoded = decodeURIComponent(rawNext);
  if (decoded.startsWith("/") && !decoded.startsWith("//") && !decoded.includes("://")) {
    return decoded;
  }
  return fallback;
}

/**
 * Helper to construct a redirect response while preserving all cookies
 * (including refreshed auth session tokens) from the base response.
 */
function redirectWithCookies(targetUrl: URL, baseResponse: NextResponse): NextResponse {
  const redirectResponse = NextResponse.redirect(targetUrl);
  baseResponse.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
  });
  return redirectResponse;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const { pathname, search } = request.nextUrl;

  // 1. Handle conceptual route aliases
  if (ROUTE_ALIASES[pathname]) {
    const targetUrl = request.nextUrl.clone();
    targetUrl.pathname = ROUTE_ALIASES[pathname];
    return NextResponse.redirect(targetUrl);
  }

  // 2. Allow API routes to manage their own HTTP 401 responses
  if (pathname.startsWith("/api/")) {
    return supabaseResponse;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !publishableKey) {
    // If Supabase credentials are missing, allow public routes or fail safe
    return supabaseResponse;
  }

  // 3. Fast cookie inspection: Check if Supabase session cookies exist
  const allCookies = request.cookies.getAll();
  const hasAuthCookie = allCookies.some(
    (c) =>
      c.name.startsWith("sb-") ||
      c.name.includes("auth-token") ||
      c.name.includes("access-token")
  );

  let user = null;

  if (hasAuthCookie) {
    const supabase = createServerClient(supabaseUrl, publishableKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    try {
      const {
        data: { user: verifiedUser },
        error,
      } = await supabase.auth.getUser();

      if (!error && verifiedUser) {
        user = verifiedUser;
      }
    } catch {
      user = null;
    }
  }

  const isAuthenticated = !!user;
  const isAuthRoute = pathname === "/login" || pathname === "/signup";
  const isPublicRoute = PUBLIC_PATHS.has(pathname) || pathname.startsWith("/auth/");
  const isRootRoute = pathname === "/";

  // 4. Root gateway (/)
  if (isRootRoute) {
    const targetUrl = request.nextUrl.clone();
    targetUrl.pathname = isAuthenticated ? "/dashboard" : "/login";
    targetUrl.search = "";
    return redirectWithCookies(targetUrl, supabaseResponse);
  }

  // 5. Authenticated user visiting /login or /signup -> redirect to /dashboard or next destination
  if (isAuthRoute && isAuthenticated) {
    const nextParam = request.nextUrl.searchParams.get("next");
    const safeDestination = getSafeNextPath(nextParam, "/dashboard");
    const targetUrl = new URL(safeDestination, request.url);
    return redirectWithCookies(targetUrl, supabaseResponse);
  }

  // 6. Unauthenticated visitor trying to access a protected route
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    const intendedPath = pathname + (search || "");
    loginUrl.searchParams.set("next", intendedPath);
    return redirectWithCookies(loginUrl, supabaseResponse);
  }

  // 7. Otherwise allow request to proceed
  return supabaseResponse;
}
