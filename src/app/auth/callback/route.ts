import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const nextParam = requestUrl.searchParams.get("next");

  // Safely resolve origin across Vercel, reverse proxies, and local development
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  const isLocalEnv = process.env.NODE_ENV === "development";

  let origin = requestUrl.origin;
  if (!isLocalEnv && forwardedHost) {
    const host = forwardedHost.split(",")[0].trim();
    origin = `${forwardedProto}://${host}`;
  } else if (!isLocalEnv && (process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL)) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL;
    origin = siteUrl!.replace(/\/$/, "");
  }

  // Safe internal path validation: Ensure relative path starting with '/', prevents open redirect attacks
  let safeNext = "/dashboard";
  if (nextParam) {
    const decoded = decodeURIComponent(nextParam);
    if (decoded.startsWith("/") && !decoded.startsWith("//") && !decoded.includes("://")) {
      safeNext = decoded;
    }
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
    console.error("Supabase exchangeCodeForSession error:", error.message);
  }

  // Return user to login with error notice
  return NextResponse.redirect(`${origin}/login?error=oauth`);
}
