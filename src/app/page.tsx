import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * Root Authentication Gateway (/)
 * Acts as the authoritative server-side entry point for Learn-2-Hire:
 * - Authenticated users are redirected to /dashboard
 * - Unauthenticated visitors are redirected to /login
 * Prevents any flash of protected content or UI data.
 */
export default async function RootGatewayPage() {
  let isAuthenticated = false;

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    isAuthenticated = !error && !!user;
  } catch {
    isAuthenticated = false;
  }

  if (isAuthenticated) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
