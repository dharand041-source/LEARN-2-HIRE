"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Loader2, 
  Code2, 
  ShieldCheck, 
  Terminal,
  AlertCircle
} from "lucide-react";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"python" | "typescript">("typescript");
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const supabase = createClient();
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
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

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white text-night">
      {/* Left Column: Authentication Form */}
      <div className="w-full lg:w-[48%] min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 border-r border-surface-border">
        {/* Top Logo */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-night text-white flex items-center justify-center font-display font-bold text-xl shadow-md group-hover:bg-imperial transition-colors duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-night">
              Skill<span className="text-imperial">Forge</span>
            </span>
          </Link>
        </div>

        {/* Center Content */}
        <div className="my-auto py-10 max-w-md w-full mx-auto">
          <div className="text-center sm:text-left mb-8">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-night tracking-tight mb-2.5">
              Welcome to SkillForge
            </h1>
            <p className="text-night-muted text-sm sm:text-base leading-relaxed">
              Sign in with your Google account to access technical assessments, AI mock interviews, and verified job matches.
            </p>
          </div>

          {/* Error Alert if any */}
          {(errorMessage || errorParam) && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
              <div>
                <p className="font-medium">Authentication Notice</p>
                <p className="text-red-600 text-xs mt-0.5">
                  {errorMessage || "Unable to complete sign in. Please verify Google OAuth is enabled in your Supabase Dashboard."}
                </p>
              </div>
            </div>
          )}

          {/* Google Sign-In Button */}
          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              id="google-signin-btn"
              type="button"
              className="w-full h-13 px-5 py-3.5 rounded-xl border border-surface-border hover:border-night/40 bg-white hover:bg-surface-subtle text-night font-medium text-base shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-3.5 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
                {loading ? "Connecting to Google..." : "Continue with Google"}
              </span>
            </button>

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
                  <div><span className="text-purple-400">import</span> &#123; createClient &#125; <span className="text-purple-400">from</span> <span className="text-amber-300">&apos;@skillforge/sdk&apos;</span>;</div>
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
                  <div><span className="text-purple-400">from</span> skillforge <span className="text-purple-400">import</span> SkillEngine</div>
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
