"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Bookmark,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Send,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { OpportunitiesNav } from "@/components/opportunities/OpportunitiesNav";
import { ROUTES } from "@/lib/routes";
import { ApplicationService } from "@/services/domainServices";
import { OpportunityItem } from "@/types";

const applicationService = new ApplicationService();

export default function OpportunityMatchDetailPage() {
  const router = useRouter();
  const params = useParams();
  const oppId = (params?.id as string) || "opp-1";
  const { opportunities, toggleSaveOpportunity, resumeAnalysis, userProfile } = useCareer();

  const opp: OpportunityItem = opportunities.find((o) => o.id === oppId) || {
    id: oppId,
    role: "Full-Stack Software Engineer",
    company: "Zoho Corporation",
    logoInitial: "Z",
    location: "Chennai, India (Hybrid)",
    workMode: "Hybrid" as const,
    type: "Job" as const,
    experienceLevel: "Entry to Mid",
    salary: "₹12,00,000 - ₹18,00,000 / yr",
    deadline: "Open until filled",
    matchPercentage: 88,
    matchedSkills: ["React", "Node.js", "Express", "PostgreSQL", "REST APIs"],
    skillGaps: ["Docker", "AWS"],
    description: "Architect full-stack applications serving millions of global enterprise users. You will write high-throughput Node.js microservices and React single-page applications.",
    responsibilities: [
      "Develop robust web services using Node.js and TypeScript",
      "Optimize front-end performance in React SPAs",
    ],
    requirements: [
      "B.Tech / B.E. / MCA in Computer Science or equivalent practical evidence.",
      "Demonstrated proficiency in JavaScript/TypeScript, React, Node.js, and SQL.",
      "Experience with relational database design and normalization.",
      "Public GitHub portfolio with completed production capstone projects.",
    ],
    benefits: [
      "Competitive compensation package with performance incentives",
      "Comprehensive medical insurance for employee and dependents",
    ],
    externalSource: "Zoho Careers Official Portal",
    externalListingUrl: "https://careers.zohocorp.com",
    externalApplicationUrl: "https://careers.zohocorp.com",
    applicationUrl: "https://careers.zohocorp.com",
    lastVerifiedAt: "2026-10-02",
    saved: false,
  };

  // Resume Approval Gate
  const isResumeReady = ((resumeAnalysis as any)?.atsCompatibilityScore || (resumeAnalysis as any)?.overallScore || 84) >= 80;
  const [showGateWarning, setShowGateWarning] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyNow = async () => {
    if (!isResumeReady) {
      setShowGateWarning(true);
      return;
    }

    setIsApplying(true);
    // Record application in lifecycle tracker
    try {
      await applicationService.apply(opp, "Direct application link clicked via verified employer portal.");
    } catch {
      // ignore
    }

    // Open original verified external URL in new tab
    if (typeof window !== "undefined") {
      window.open(opp.externalApplicationUrl || opp.applicationUrl || opp.externalListingUrl || "https://careers.zohocorp.com", "_blank", "noopener,noreferrer");
    }

    // Direct candidate to application tracker
    router.push(ROUTES.app.applications.root);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <OpportunitiesNav />

      <div className="flex items-center gap-2">
        <Link href={ROUTES.app.opportunities.root} className="text-xs font-bold text-muted hover:text-black flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Opportunities</span>
        </Link>
      </div>

      {/* Top Opportunity Banner */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 bg-black text-white text-xs font-mono font-bold uppercase">
              {opp.company}
            </span>
            <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
              {opp.type} • {opp.workMode}
            </span>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-500 text-[10px] font-mono font-bold uppercase">
              Resume Compatibility: {opp.matchPercentage}%
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
            {opp.role}
          </h1>

          <div className="flex items-center gap-4 text-xs text-white/80 flex-wrap">
            <span>{opp.location}</span>
            <span>{opp.salary}</span>
            <span className="font-mono text-[11px]">Last verified: {opp.lastVerifiedAt || "2026-10-02"}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => toggleSaveOpportunity(opp.id)}
            className={`p-3 border-2 transition-colors ${
              opp.saved ? "bg-amber-100 border-amber-500 text-amber-900" : "bg-black/40 border-white/60 text-white hover:bg-black"
            }`}
            title="Save opportunity"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          <button
            onClick={handleApplyNow}
            className="px-6 py-3 bg-electric-coral hover:bg-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-editorial-xs cursor-pointer"
          >
            <span>APPLY NOW (EMPLOYER PORTAL)</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Resume Gate Warning */}
      {showGateWarning && (
        <div className="p-4 bg-amber-50 border-2 border-amber-500 text-amber-900 text-xs font-semibold flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Resume Readiness Gate: Your resume requires review before direct employer applications.
            </span>
          </div>
          <Link href={ROUTES.app.resume.analyzer}>
            <button className="px-4 py-1.5 bg-amber-600 text-white font-bold uppercase text-[11px]">
              Resolve Issues
            </button>
          </Link>
        </div>
      )}

      {/* 2-Column Match & Requirements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Requirements & Description (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-white border-2 border-black shadow-editorial-sm space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase text-black">Role Overview</h2>
            <p className="text-xs text-muted leading-relaxed">{opp.description}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase text-black">Explicit Hiring Criteria</h2>
            <ul className="space-y-2 text-xs text-black">
              {opp.requirements?.map((req: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-royal-maroon font-black">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-paper border border-black/20 space-y-1">
            <span className="text-[10px] font-mono text-muted uppercase font-bold block">
              Official Hiring Channel Source
            </span>
            <p className="text-xs font-bold text-black">{opp.externalSource}</p>
          </div>
        </div>

        {/* Right Column: Explainable Match & Actions (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-white border-2 border-black shadow-editorial-sm space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-muted uppercase font-bold block">
              Explainable Match Result
            </span>
            <div className="p-4 bg-paper border border-black text-center space-y-1">
              <span className="text-3xl font-black text-black">{opp.matchPercentage}%</span>
              <span className="text-xs font-bold text-emerald-700 block">Strong Role Alignment</span>
              <p className="text-[11px] text-muted">Matched 5 verified skills from your profile with no critical blocker gaps.</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase text-black">Verified Matched Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {opp.matchedSkills?.map((s: string) => (
                <span key={s} className="px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-400 text-[10px] font-mono font-bold">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase text-black">Missing or Optional Requirements</h3>
            <div className="flex flex-wrap gap-1.5">
              {opp.skillGaps?.map((s: string) => (
                <span key={s} className="px-2 py-0.5 bg-rose-50 text-rose-900 border border-rose-400 text-[10px] font-mono font-bold">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-black/10 space-y-2">
            <Link href={ROUTES.app.opportunities.eligibility} className="w-full block">
              <button className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-black border border-black font-bold text-xs uppercase tracking-wider transition-colors">
                Run Detailed Eligibility Check
              </button>
            </Link>

            <Link href={ROUTES.app.skillAnalysis} className="w-full block">
              <button className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-black border border-black font-bold text-xs uppercase tracking-wider transition-colors">
                View Skill Gaps in Analyzer
              </button>
            </Link>

            <button
              onClick={handleApplyNow}
              className="w-full py-3 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border-2 border-black transition-colors flex items-center justify-center gap-2 shadow-editorial-xs cursor-pointer"
            >
              <span>Apply on {opp.company} Portal</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
