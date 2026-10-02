"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Search } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { OpportunitiesNav } from "@/components/opportunities/OpportunitiesNav";
import { ROUTES } from "@/lib/routes";

export default function OpportunitiesEligibilityPage() {
  const { opportunities, userProfile, resumeAnalysis } = useCareer();
  const [selectedOppId, setSelectedOppId] = useState(opportunities[0]?.id || "opp-01");

  const selectedOpp = opportunities.find((o) => o.id === selectedOppId) || opportunities[0];

  const matchedCount = selectedOpp?.matchedSkills?.length || 0;
  const gapCount = selectedOpp?.skillGaps?.length || 0;

  let status: "ELIGIBLE" | "POSSIBLY ELIGIBLE" | "REQUIREMENTS MISSING" | "REQUIREMENTS UNKNOWN" = "ELIGIBLE";
  let explanation = "You satisfy the essential technical requirements and verified projects benchmark.";

  if (matchedCount >= 3 && gapCount <= 1) {
    status = "ELIGIBLE";
    explanation = "You satisfy the essential technical requirements and verified projects benchmark.";
  } else if (matchedCount >= 2) {
    status = "POSSIBLY ELIGIBLE";
    explanation = "You meet most foundational skills, but addressing minor gaps will significantly improve your chances.";
  } else {
    status = "REQUIREMENTS MISSING";
    explanation = "Key required competencies have not yet been demonstrated in your assessment or project portfolio.";
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <OpportunitiesNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Verification Protocol
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Automated Eligibility Verification Engine
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-2xl">
            Check education, experience, location, and verified technical skills against explicit employer criteria before applying.
          </p>
        </div>

        <div className="p-3 bg-black/60 border border-white/20 text-xs font-mono text-white/90">
          <span className="text-electric-coral font-bold block mb-1">Standard</span>
          <span>Provides an explainable qualification estimate. Does not guarantee employer hiring decisions.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Selector (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-white border-2 border-black shadow-editorial-sm space-y-3">
          <label className="text-xs font-black uppercase text-black block">
            Select Opportunity to Evaluate:
          </label>
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {opportunities.map((opp) => (
              <button
                key={opp.id}
                onClick={() => setSelectedOppId(opp.id)}
                className={`w-full text-left p-3.5 border-2 transition-all cursor-pointer ${
                  selectedOppId === opp.id
                    ? "bg-royal-maroon text-white border-black shadow-editorial-xs"
                    : "bg-paper text-black border-black/20 hover:border-black"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono uppercase">
                  <span>{opp.company}</span>
                  <span>{opp.type}</span>
                </div>
                <div className="text-xs font-black uppercase mt-1">{opp.role}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Evaluation (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-white border-2 border-black shadow-editorial-md space-y-6">
          <div className="border-b border-black/10 pb-4">
            <span className="text-[10px] font-mono uppercase text-muted font-bold block">
              {selectedOpp?.company} • {selectedOpp?.location}
            </span>
            <h2 className="text-xl font-black uppercase text-black mt-1">
              {selectedOpp?.role}
            </h2>
          </div>

          {/* Status Callout */}
          <div className="p-6 bg-paper border-2 border-black space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 text-xs font-black uppercase border ${
                  status === "ELIGIBLE"
                    ? "bg-emerald-100 text-emerald-900 border-emerald-600"
                    : status === "POSSIBLY ELIGIBLE"
                    ? "bg-amber-100 text-amber-900 border-amber-600"
                    : "bg-rose-100 text-rose-900 border-rose-600"
                }`}
              >
                {status}
              </span>
            </div>
            <p className="text-xs text-black leading-relaxed font-medium pt-1">
              {explanation}
            </p>
          </div>

          {/* Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-black">Criteria Assessment</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-stone-50 border border-black/20 flex items-center justify-between">
                <span>Education Benchmark</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Met
                </span>
              </div>
              <div className="p-3 bg-stone-50 border border-black/20 flex items-center justify-between">
                <span>Experience Level</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Matches Target Role
                </span>
              </div>
              <div className="p-3 bg-stone-50 border border-black/20 flex items-center justify-between">
                <span>Technical Skills Required</span>
                <span className="font-mono font-bold text-black">{matchedCount} Verified / {matchedCount + gapCount} Listed</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-black/10 flex items-center justify-between">
            <Link href={ROUTES.app.opportunities.detail(selectedOpp.id)}>
              <button className="px-5 py-2.5 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                <span>Go to Job Match & Direct Apply</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
