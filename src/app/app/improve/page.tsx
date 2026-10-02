"use client";

import React from "react";
import Link from "next/link";
import {
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ImproveNav } from "@/components/improve/ImproveNav";
import { ROUTES } from "@/lib/routes";

export default function ImproveOverviewPage() {
  const { userProfile, selectedRole, assessmentResult } = useCareer();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ImproveNav />

      {/* Hero Banner */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
              Growth Engine
            </span>
            <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
              Continuous Improvement & Retraining Loop
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
            Adaptive Retraining & Recovery Architecture
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
            Turn interview feedback, diagnostic blindspots, and application rejections into verified competency gains.
          </p>
        </div>

        <Link href={ROUTES.app.improve.reassessment}>
          <button className="px-6 py-3 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>START ADAPTIVE REASSESSMENT</span>
            <RotateCcw className="w-4 h-4" />
          </button>
        </Link>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-3">
          <div className="w-10 h-10 bg-rose-100 text-rose-700 border border-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black uppercase text-black">1. Skill Gaps</h3>
          <p className="text-xs text-muted leading-relaxed">
            Identifies delta between target role requirements and verified evidence.
          </p>
          <Link href={ROUTES.app.improve.skillGaps} className="block pt-2">
            <span className="text-xs font-black text-royal-maroon uppercase hover:underline flex items-center gap-1">
              View Active Gaps <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-3">
          <div className="w-10 h-10 bg-amber-100 text-amber-700 border border-amber-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-base font-black uppercase text-black">2. Retraining Plan</h3>
          <p className="text-xs text-muted leading-relaxed">
            Curated 1-to-2 week intensive curriculum focused solely on weak competencies.
          </p>
          <Link href={ROUTES.app.improve.retraining} className="block pt-2">
            <span className="text-xs font-black text-royal-maroon uppercase hover:underline flex items-center gap-1">
              Review Action Plan <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-3">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-700 border border-emerald-400 flex items-center justify-center">
            <RotateCcw className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-base font-black uppercase text-black">3. Reassessment Loop</h3>
          <p className="text-xs text-muted leading-relaxed">
            Targeted re-test focusing specifically on prior mistakes. Automatically updates readiness score.
          </p>
          <Link href={ROUTES.app.improve.reassessment} className="block pt-2">
            <span className="text-xs font-black text-royal-maroon uppercase hover:underline flex items-center gap-1">
              Trigger Reassessment <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
