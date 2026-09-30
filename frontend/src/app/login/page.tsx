"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getOAuthRedirectURL } from "@/lib/utils/url";
import { 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  AlertCircle,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight
} from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

function LoginForm() {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"python" | "typescript">("typescript");

  const searchParams = useSearchParams();
  const router = useRouter();
  const errorParam = searchParams.get("error");
  const nextParam = searchParams.get("next");
  const tabParam = searchParams.get("tab");

  // Validate internal redirect target
  const safeNext = React.useMemo(() => {
    if (!nextParam) return "/dashboard";
    const decoded = decodeURIComponent(nextParam);
    if (decoded.startsWith("/") && !decoded.startsWith("//") && !decoded.includes("://")) {
      return decoded;
    }
    return "/dashboard";
  }, [nextParam]);

  // If tab=signup is passed via query, default to signup mode
  useEffect(() => {
    if (tabParam === "signup") {
      setMode("signup");
    }
  }, [tabParam]);

  // Defensive client check: If user already has an active Supabase session, redirect immediately
  useEffect(() => {
    try {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          window.location.href = safeNext;
        }
      });
    } catch {
      // Ignore if offline or initializing
    }
  }, [safeNext]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      try {
        sessionStorage.setItem("l2h_post_login_intro", "pending");
      } catch {
        // Ignore if sessionStorage is unavailable
      }

      const supabase = createClient();
      const redirectPath = `/auth/callback?next=${encodeURIComponent(safeNext)}`;
      const redirectTo = getOAuthRedirectURL(redirectPath);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to initiate Google sign-in. Please verify your Supabase configuration.");
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();

      if (mode === "login") {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMessage(error.message);
          setLoading(false);
          return;
        }

        if (data.session) {
          // Session established, mark intro flag and navigate to destination
          try {
            sessionStorage.setItem("l2h_post_login_intro", "pending");
          } catch {
            // Ignore
          }
          window.location.href = safeNext;
        } else {
          setLoading(false);
        }
      } else if (mode === "signup") {
        if (password.length < 6) {
          setErrorMessage("Password must be at least 6 characters.");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName.trim() || undefined,
            },
            emailRedirectTo: getOAuthRedirectURL(`/auth/callback?next=${encodeURIComponent(safeNext)}`),
          },
        });

        if (error) {
          setErrorMessage(error.message);
          setLoading(false);
          return;
        }

        // If session returned immediately (email confirmation disabled in Supabase)
        if (data.session) {
          try {
            sessionStorage.setItem("l2h_post_login_intro", "pending");
          } catch {
            // Ignore
          }
          window.location.href = safeNext;
        } else {
          // Email confirmation is enabled
          setSuccessMessage(
            "Account created! Please check your email inbox to verify your account before logging in."
          );
          setLoading(false);
        }
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: getOAuthRedirectURL("/settings"),
        });

        if (error) {
          setErrorMessage(error.message);
          setLoading(false);
          return;
        }

        setSuccessMessage("Password reset email sent. Please check your inbox for instructions.");
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected authentication error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white text-night">
      {/* Left Column: Authentication Form */}
      <div className="w-full lg:w-[48%] min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 border-r border-surface-border">
        {/* Top Logo */}
        <div>
          <BrandLogo size="lg" href="/login" />
        </div>

        {/* Center Content */}
        <div className="my-auto py-8 max-w-md w-full mx-auto">
          <div className="text-center sm:text-left mb-6">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-night tracking-tight mb-2.5">
              {mode === "login" && "Welcome to Learn-2-Hire"}
              {mode === "signup" && "Create Your Account"}
              {mode === "forgot" && "Reset Password"}
            </h1>
            <p className="text-night-muted text-sm sm:text-base leading-relaxed">
              {mode === "login" && "Sign in to access technical assessments, AI mock interviews, and verified job matches."}
              {mode === "signup" && "Join Learn-2-Hire to benchmark your technical competence and launch your career."}
              {mode === "forgot" && "Enter your registered email address and we'll send a secure reset link."}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          {mode !== "forgot" && (
            <div className="flex rounded-xl bg-surface-subtle p-1 border border-surface-border mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  mode === "login"
                    ? "bg-white text-night shadow-sm border border-surface-border/60"
                    : "text-night-muted hover:text-night"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  mode === "signup"
                    ? "bg-white text-night shadow-sm border border-surface-border/60"
                    : "text-night-muted hover:text-night"
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-sm animate-fade-in">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
              <div>
                <p className="font-semibold">Success</p>
                <p className="text-emerald-700 text-xs mt-0.5 leading-relaxed">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {(errorMessage || errorParam) && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm animate-fade-in">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
              <div>
                <p className="font-medium">Authentication Notice</p>
                <p className="text-red-600 text-xs mt-0.5">
                  {errorMessage || (errorParam === "oauth" ? "OAuth sign-in failed. Please try again or use email/password." : "Unable to complete sign in. Please verify your credentials.")}
                </p>
              </div>
            </div>
          )}

          {/* Google Sign-In Button */}
          {mode !== "forgot" && (
            <div className="space-y-4">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                id="google-signin-btn"
                type="button"
                className="w-full h-12 px-5 py-3 rounded-xl border border-surface-border hover:border-night/40 bg-white hover:bg-surface-subtle text-night font-medium text-sm sm:text-base shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-3.5 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-night" />
                ) : (
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                )}
                <span className="text-night font-semibold">
                  {loading ? "Connecting..." : "Continue with Google"}
                </span>
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-surface-border"></div>
                <span className="flex-shrink mx-4 text-xs font-semibold text-night-muted uppercase tracking-wider">
                  or with email
                </span>
                <div className="flex-grow border-t border-surface-border"></div>
              </div>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-3.5 mt-2">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-bold text-night mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-night-muted absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Candidate Name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-border bg-white text-night text-sm placeholder:text-night-muted/60 focus:outline-none focus:ring-2 focus:ring-imperial focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-night mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-night-muted absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="candidate@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-border bg-white text-night text-sm placeholder:text-night-muted/60 focus:outline-none focus:ring-2 focus:ring-imperial focus:border-transparent transition-all"
                />
              </div>
            </div>

            {mode !== "forgot" && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-night">
                    Password
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode("forgot");
                        setErrorMessage(null);
                        setSuccessMessage(null);
                      }}
                      className="text-xs font-semibold text-imperial hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-night-muted absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-border bg-white text-night text-sm placeholder:text-night-muted/60 focus:outline-none focus:ring-2 focus:ring-imperial focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 mt-2 rounded-xl bg-night hover:bg-imperial text-white font-bold text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <>
                  <span>
                    {mode === "login" && "Sign In"}
                    {mode === "signup" && "Create Account"}
                    {mode === "forgot" && "Send Reset Link"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {mode === "forgot" && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className="text-xs font-semibold text-night hover:text-imperial transition-colors"
                >
                  ← Back to Sign In
                </button>
              </div>
            )}
          </form>

          {/* Feature Perks */}
          <div className="pt-6 border-t border-surface-border mt-8 space-y-3">
            <div className="flex items-center gap-2.5 text-xs text-night-muted">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Instant profile setup & role readiness scoring</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-night-muted">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>AI Mock Interview simulations with real-time feedback</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-night-muted">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Curated job opportunities synced directly with your skill gaps</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Disclaimer */}
        <div className="text-center sm:text-left text-xs text-night-muted pt-6 border-t border-surface-border/60">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-night font-medium">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-night font-medium">
            Privacy Policy
          </Link>
          .
        </div>
      </div>

      {/* Right Column: Hero / Showcase Preview */}
      <div className="w-full lg:w-[52%] bg-surface-subtle flex flex-col justify-between p-6 sm:p-12 lg:p-16 border-t lg:border-t-0">
        {/* Top Feature Tagline */}
        <div className="max-w-xl mx-auto w-full pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-surface-border text-xs font-semibold text-imperial mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            Skill-Verified Hiring Infrastructure
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-night tracking-tight leading-snug">
            AI-Powered Career Intelligence
          </h2>
          <p className="text-night-muted text-sm sm:text-base mt-2">
            The infrastructure behind proven skills, benchmarked evaluations, and seamless hiring.
          </p>

          {/* Interactive Code / Assessment Card */}
          <div className="mt-8 rounded-2xl bg-white border border-surface-border shadow-card-subtle overflow-hidden">
            {/* Terminal Window Header */}
            <div className="px-4 py-3 bg-night-950 text-white flex items-center justify-between border-b border-night-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                <span className="text-xs text-night-muted font-mono ml-2">interview_evaluator.ts</span>
              </div>
              <div className="flex items-center bg-night-900 rounded-lg p-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab("typescript")}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === "typescript" ? "bg-night-800 text-white font-semibold" : "text-night-muted hover:text-white"
                  }`}
                >
                  TypeScript
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("python")}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTab === "python" ? "bg-night-800 text-white font-semibold" : "text-night-muted hover:text-white"
                  }`}
                >
                  Python
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-5 font-mono text-xs sm:text-sm bg-night-950 text-emerald-400 overflow-x-auto leading-relaxed">
              {activeTab === "typescript" ? (
                <>
                  <div className="text-night-muted">{"// 1. Initialize candidate skill assessment"}</div>
                  <div><span className="text-purple-400">import</span> &#123; createClient &#125; <span className="text-purple-400">from</span> <span className="text-amber-300">&apos;@learn-2-hire/sdk&apos;</span>;</div>
                  <div className="mt-2"><span className="text-blue-400">const</span> client = <span className="text-yellow-300">createClient</span>();</div>
                  <div className="mt-2"><span className="text-blue-400">const</span> evaluation = <span className="text-purple-400">await</span> client.assessCandidate(&#123;</div>
                  <div className="pl-4">role: <span className="text-amber-300">&quot;Full Stack & Cloud Engineer&quot;</span>,</div>
                  <div className="pl-4">skills: [<span className="text-amber-300">&quot;Next.js&quot;</span>, <span className="text-amber-300">&quot;PostgreSQL&quot;</span>, <span className="text-amber-300">&quot;Supabase&quot;</span>, <span className="text-amber-300">&quot;Docker&quot;</span>],</div>
                  <div className="pl-4">verifiedMatchScore: <span className="text-cyan-300">96.8</span></div>
                  <div>&#125;);</div>
                  <div className="mt-2 text-night-muted">{"// 2. Real-time hiring recommendation ready"}</div>
                </>
              ) : (
                <>
                  <div className="text-night-muted">{"# 1. Initialize candidate skill assessment"}</div>
                  <div><span className="text-purple-400">from</span> learn2hire <span className="text-purple-400">import</span> SkillEngine</div>
                  <div className="mt-2">engine = SkillEngine(api_key=SUPABASE_SECRET)</div>
                  <div className="mt-2">result = <span className="text-purple-400">await</span> engine.evaluate_interview(</div>
                  <div className="pl-4">role=<span className="text-amber-300">&quot;AI & Data Engineer&quot;</span>,</div>
                  <div className="pl-4">live_code_check=<span className="text-cyan-300">True</span></div>
                  <div>)</div>
                  <div className="mt-2 text-night-muted">{"# 2. Output: Ready for direct hiring pipeline"}</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Social Proof */}
        <div className="max-w-xl mx-auto w-full pt-8 pb-4">
          <p className="text-xs uppercase tracking-wider font-semibold text-night-muted text-center sm:text-left mb-4">
            Trusted by candidates & hiring teams at top engineering hubs
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-center font-display font-bold text-sm text-night">Google</span>
            <span className="text-center font-display font-bold text-sm text-night">Amazon</span>
            <span className="text-center font-display font-bold text-sm text-night">Microsoft</span>
            <span className="text-center font-display font-bold text-sm text-night">Meta</span>
            <span className="text-center font-display font-bold text-sm text-night">Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-imperial" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
