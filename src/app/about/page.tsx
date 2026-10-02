"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  HeartHandshake,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/lib/routes";

export default function AboutPublicPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <PublicHeader />

      <main className="flex-1 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header Hero */}
        <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-8 sm:p-12 shadow-editorial-md space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black text-electric-coral border-2 border-black text-xs font-mono font-black uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Ethics & Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            About Learn-2-Hire
          </h1>
          <p className="text-white/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            We built Learn-2-Hire to replace superficial tutorial certificates and arbitrary resume screening with verifiable technical proof and honest career readiness.
          </p>
        </div>

        {/* 3 Core Ethical Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border-2 border-black bg-white shadow-editorial-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-electric-coral text-black flex items-center justify-center font-bold">
              <Award className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-black text-black">Verifiable Proof Over Claims</h3>
            <p className="text-xs text-black/80 leading-relaxed font-normal">
              Anyone can claim a skill on a resume. Learn-2-Hire measures ability through code execution, SQL query plans, rubric-evaluated GitHub repositories, and live voice architectural defense.
            </p>
          </div>

          <div className="p-6 rounded-xl border-2 border-black bg-white shadow-editorial-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-royal-maroon text-white flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-black">Zero Fake Content Or Paywalls</h3>
            <p className="text-xs text-black/80 leading-relaxed font-normal">
              We never fabricate jobs, companies, or salary estimates. All curriculum links point directly to authentic, free, and open-source university courses, documentation, and accredited repositories.
            </p>
          </div>

          <div className="p-6 rounded-xl border-2 border-black bg-white shadow-editorial-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-black text-electric-coral flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-black">Outcome Recovery Loop</h3>
            <p className="text-xs text-black/80 leading-relaxed font-normal">
              Rejections happen to every engineer. Instead of leaving you with silence, our engine diagnoses why an application missed the threshold and immediately structures an adaptive retraining roadmap.
            </p>
          </div>
        </section>

        {/* The Standard Manifesto Block */}
        <section className="rounded-2xl bg-black text-white border-3 border-electric-coral p-8 sm:p-12 shadow-editorial-md space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-black uppercase text-electric-coral tracking-widest">
              Our Commitment
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
              Transparent, Direct, Anti-Distraction
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/90">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-electric-coral shrink-0 mt-0.5" />
              <span>We never auto-submit applications on your behalf without your explicit review and consent.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-electric-coral shrink-0 mt-0.5" />
              <span>We label all ATS compatibility scores as Learn-2-Hire estimates, not mysterious proprietary guarantees.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-electric-coral shrink-0 mt-0.5" />
              <span>We provide deep, multi-language technical summaries to ensure complex concepts are mastered thoroughly.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-electric-coral shrink-0 mt-0.5" />
              <span>Every career role connects to transparent industry data and legitimate employer career links.</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/20 flex flex-wrap gap-4">
            <Link href={ROUTES.onboarding}>
              <button className="px-6 py-3 rounded-lg bg-electric-coral text-black font-black text-xs sm:text-sm hover:bg-white transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
                <span>Join the Candidate Pipeline</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href={ROUTES.careers}>
              <button className="px-6 py-3 rounded-lg bg-white/10 text-white font-bold text-xs sm:text-sm hover:bg-white/20 border border-white/20 transition-colors">
                Explore 22+ Specializations
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
