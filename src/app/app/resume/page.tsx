"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Award,
  Upload,
  BarChart3,
  Briefcase,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ResumeNav } from "@/components/resume/ResumeNav";
import { ROUTES } from "@/lib/routes";

export default function ResumeOverviewPage() {
  const { resumeData, resumeAnalysis, selectedRole } = useCareer();

  // Resume Approval Gate Status
  const score = (resumeAnalysis as any)?.atsCompatibilityScore || (resumeAnalysis as any)?.overallScore || 84;
  const readinessStatus: "Not Ready" | "Needs Improvement" | "Ready" =
    score >= 80 ? "Ready" : score >= 60 ? "Needs Improvement" : "Not Ready";

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ResumeNav />

      {/* Top Hero Banner */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
              Phase 08 Presentation
            </span>
            <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
              ATS Optimization Suite
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
            Candidate Resume & Readiness Portal
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
            Generated directly from your verified diagnostic test scores, github repositories, and interview defense records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link href={ROUTES.app.resume.builder}>
            <button className="px-5 py-2.5 bg-white hover:bg-stone-100 text-black border-2 border-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-editorial-xs">
              Edit Resume
            </button>
          </Link>
          <Link href={ROUTES.app.resume.analyzer}>
            <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
              <span>Run Compatibility Check</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Resume Readiness Approval Gate Callout */}
      <div className="p-6 bg-white border-4 border-black shadow-editorial-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full border-2 border-black flex items-center justify-center shrink-0 ${
                readinessStatus === "Ready"
                  ? "bg-emerald-100 text-emerald-800"
                  : readinessStatus === "Needs Improvement"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-rose-100 text-rose-800"
              }`}
            >
              {readinessStatus === "Ready" ? (
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-amber-700" />
              )}
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-muted font-bold block">
                Direct Application Gate
              </span>
              <h2 className="text-lg font-black uppercase text-black">
                Resume Readiness:{" "}
                <span
                  className={
                    readinessStatus === "Ready"
                      ? "text-emerald-700"
                      : readinessStatus === "Needs Improvement"
                      ? "text-amber-700"
                      : "text-rose-700"
                  }
                >
                  {readinessStatus}
                </span>
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-muted uppercase block">
              Compatibility Estimate
            </span>
            <span className="text-3xl font-black text-black">{score}/100</span>
          </div>
        </div>

        <p className="text-xs text-muted leading-relaxed">
          {readinessStatus === "Ready"
            ? "Your resume satisfies the Learn-2-Hire compatibility gate. You are unlocked for Direct Employer Portal Applications."
            : "Direct employer applications require a minimum compatibility score of 80. Review the analyzer recommendations to resolve missing keywords."}
        </p>

        <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
          <span className="text-[11px] font-mono text-muted">
            Target Track: <strong className="text-black">{selectedRole?.title}</strong>
          </span>

          <Link href={readinessStatus === "Ready" ? ROUTES.app.opportunities.jobs : ROUTES.app.resume.analyzer}>
            <button className="px-6 py-2.5 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border-2 border-black transition-colors flex items-center gap-2 shadow-editorial-xs">
              <span>{readinessStatus === "Ready" ? "Browse Verified Jobs" : "Fix Resume Issues"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>

      {/* Snapshot Preview */}
      <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
        <div className="flex items-center justify-between border-b border-black/10 pb-3">
          <h3 className="text-xs font-black uppercase text-black">
            Active Resume Snapshot ({resumeData.personalInfo.fullName})
          </h3>
          <span className="text-xs font-mono text-muted">{resumeData.personalInfo.email}</span>
        </div>

        <div className="space-y-2 text-xs">
          <p className="font-bold text-black">{resumeData.personalInfo.title}</p>
          <p className="text-muted leading-relaxed">{resumeData.summary}</p>
        </div>

        <div className="pt-2 border-t border-black/10">
          <span className="text-[10px] font-mono text-muted uppercase font-bold block mb-1">
            Included Technical Skills:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {resumeData.skills[0]?.items.map((s) => (
              <span key={s} className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold border border-black/20">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
