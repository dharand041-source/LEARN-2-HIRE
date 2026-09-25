import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";

  // Safely resolve the origin across Vercel / proxy environments
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  const isLocalEnv = process.env.NODE_ENV === "development";

  let origin = requestUrl.origin;
  if (!isLocalEnv && forwardedHost) {
    origin = `${forwardedProto}://${forwardedHost}`;
  } else if (!isLocalEnv && process.env.NEXT_PUBLIC_SITE_URL) {
    origin = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  // Safe internal path validation for `next` (ensures relative path, prevents open redirects)
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
    console.error("Supabase exchangeCodeForSession error:", error.message);
  }

  // Return the user to login with oauth error notice
  return NextResponse.redirect(`${origin}/login?error=oauth`);
}

