"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  AlertCircle,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { authService, userRepo } from "@/services/domainServices";
import { ROUTES } from "@/lib/routes";

function AuthLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const nextParam = searchParams.get("next");

  const safeNext = React.useMemo(() => {
    if (!nextParam) return ROUTES.app.dashboard;
    const decoded = decodeURIComponent(nextParam);
    if (decoded.startsWith("/") && !decoded.startsWith("//") && !decoded.includes("://")) {
      return decoded;
    }
    return ROUTES.app.dashboard;
  }, [nextParam]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await authService.signInWithGoogle();
      const profile = await userRepo.getProfile();
      // If new user with no target role, send to onboarding, else to safeNext
      if (!profile.targetRole || profile.targetRole === "Learner") {
        router.push(ROUTES.onboarding);
      } else {
        router.push(safeNext);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Sign in failed. Please try again.");
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    setLoading(true);
    setErrorMessage(null);
    try {
      await authService.signInWithEmail(email);
      const profile = await userRepo.getProfile();
      if (!profile.targetRole || profile.targetRole === "Learner") {
        router.push(ROUTES.onboarding);
      } else {
        router.push(safeNext);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Authentication error.");
      setLoading(false);
    }
  };

  const handleInstantDemoLogin = async () => {
    setLoading(true);
    await authService.signInWithEmail("candidate@learn2hire.dev", "Alex Morgan");
    router.push(ROUTES.app.dashboard);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <BrandLogo size="lg" theme="light" href={ROUTES.home} />
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-royal-maroon">
          Sign In to Learn-2-Hire
        </h1>
        <p className="text-xs text-muted max-w-sm mx-auto font-medium">
          Access your verified career telemetry, personalized curriculum, and rubric evaluations.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 border-4 border-black rounded-2xl shadow-editorial-md space-y-6">
          {errorMessage && (
            <div className="p-3 bg-red-50 border-2 border-red-500 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Primary CTA: Continue with Google */}
          <div>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl border-3 border-black bg-white hover:bg-surface font-extrabold text-xs sm:text-sm text-foreground flex items-center justify-center gap-3 transition-colors shadow-editorial-sm cursor-pointer disabled:opacity-50"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? "Authenticating..." : "Continue with Google"}</span>
            </button>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-black/20"></div>
            <span className="flex-shrink mx-4 text-[10px] font-mono uppercase tracking-wider text-muted font-bold">
              Or with email
            </span>
            <div className="flex-grow border-t border-black/20"></div>
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1 uppercase tracking-wider font-mono">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="candidate@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-electric-coral"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1 uppercase tracking-wider font-mono">
                Password (Optional for Demo)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-electric-coral"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-black text-xs sm:text-sm border-2 border-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-editorial-xs disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Fast Development Demo Bypass */}
          <div className="pt-2 border-t border-black/15 text-center">
            <button
              onClick={handleInstantDemoLogin}
              className="w-full py-2 rounded-lg bg-surface border border-black/30 hover:border-black text-[11px] font-bold text-foreground transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-electric-coral" />
              <span>Instant Candidate Login (Fast Dev Mode)</span>
            </button>
          </div>

          <div className="text-center text-xs text-muted">
            Don&apos;t have an account yet?{" "}
            <Link href={ROUTES.auth.signup} className="text-royal-maroon font-bold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loader2 className="w-8 h-8 animate-spin text-royal-maroon" />
        </div>
      }
    >
      <AuthLoginForm />
    </Suspense>
  );
}
