"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Bookmark,
  ArrowRight,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { OpportunitiesNav } from "@/components/opportunities/OpportunitiesNav";
import { ROUTES } from "@/lib/routes";
import { OpportunityItem } from "@/types";

export default function OpportunitiesHubPage() {
  const { opportunities, toggleSaveOpportunity, selectedRole, resumeAnalysis } = useCareer();
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");

  const filtered = opportunities.filter((opp) => {
    const matchesSearch =
      opp.company.toLowerCase().includes(search.toLowerCase()) ||
      opp.role.toLowerCase().includes(search.toLowerCase()) ||
      opp.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === "ALL" || opp.type.toUpperCase() === selectedType.toUpperCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <OpportunitiesNav />

      {/* Hero Banner */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
              Opportunity Engine
            </span>
            <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
              Resume-Matched Opportunities
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
            Verified Tech Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
            Jobs, internships, and high-growth startup openings with automated eligibility checks and direct employer links.
          </p>
        </div>

        <div className="p-3 bg-black/50 border border-white/20 text-xs font-mono text-white/90">
          <span className="text-electric-coral font-bold block mb-1">Direct Apply Standard</span>
          <span>Zero phantom postings. Direct links to original employer career portals.</span>
        </div>
      </div>

      {/* Search & Filter Strip */}
      <div className="p-4 bg-white border-2 border-black shadow-editorial-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search company, job title, city, or tech stack..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs font-semibold text-black placeholder:text-muted focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-muted">Type:</span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs font-bold bg-paper border border-black/30 px-3 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Opportunities</option>
            <option value="JOB">Full-Time Jobs</option>
            <option value="INTERNSHIP">Internships</option>
            <option value="STARTUP">Startups</option>
          </select>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filtered.map((opp) => (
          <div
            key={opp.id}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono font-bold uppercase">
                  {opp.company}
                </span>
                <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                  {opp.type} • {opp.workMode}
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-500 text-[10px] font-mono font-bold uppercase">
                  Match: {opp.matchPercentage}%
                </span>
              </div>

              <h3 className="text-lg font-black uppercase text-black">
                {opp.role}
              </h3>

              <div className="flex items-center gap-4 text-xs text-muted flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{opp.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{opp.salary}</span>
                </span>
                <span className="text-[11px] font-mono">
                  Verified: {opp.lastVerifiedAt || (opp as any).lastVerified || "2026-10-01"}
                </span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {opp.matchedSkills.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-stone-100 text-[10px] font-mono font-bold border border-black/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleSaveOpportunity(opp.id)}
                className={`p-2.5 border transition-colors ${
                  opp.saved ? "bg-amber-100 border-amber-500 text-amber-900" : "bg-white border-black/20 text-muted hover:border-black"
                }`}
                title="Save opportunity"
              >
                <Bookmark className="w-4 h-4" />
              </button>

              <Link href={ROUTES.app.opportunities.detail(opp.id)}>
                <button className="px-5 py-2.5 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                  <span>View Match</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
