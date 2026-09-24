"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { OpportunityItem, OpportunityType } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";

export default function OpportunitiesHubPage() {
  const { opportunities, toggleSaveOpportunity, userProfile } = useCareer();
  const [activeTab, setActiveTab] = useState<string>("Job");
  const [searchQuery, setSearchQuery] = useState("");

  const jobCount = opportunities.filter((o) => o.type === "Job").length;
  const internshipCount = opportunities.filter((o) => o.type === "Internship").length;
  const startupCount = opportunities.filter((o) => o.type === "Startup").length;

  const filteredOpportunities = opportunities.filter((opp) => {
    if (opp.type !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        opp.company.toLowerCase().includes(q) ||
        opp.role.toLowerCase().includes(q) ||
        opp.matchedSkills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="champagne" size="sm">Phase 13</Badge>
            <span className="text-xs text-pearl-muted font-mono uppercase tracking-wider">
              Precision Employment Matching
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary tracking-tight">
            Matching Jobs, Internships & Startups
          </h1>
          <p className="text-xs sm:text-sm text-pearl-muted mt-1 max-w-2xl">
            Matched directly against your verified assessment scores and production project portfolio. No superficial auto-applies—only opportunities with verified readiness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/applications">
            <Button variant="secondary" size="sm" className="gap-1.5">
              <span>Application Tracker (Kanban)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs & Search Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs
          tabs={[
            { id: "Job", label: "Full-Time Jobs", count: jobCount },
            { id: "Internship", label: "Paid Internships", count: internshipCount },
            { id: "Startup", label: "YC & Seed Startups", count: startupCount },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by company, role, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-lg bg-surface-card border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne"
          />
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.map((opp) => (
          <div
            key={opp.id}
            className="p-6 rounded-2xl bg-surface-card border border-surface-border hover:border-champagne/40 transition-all duration-200 hover:shadow-card-hover space-y-4"
          >
            {/* Top Row: Company & Title */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-navy-800 border border-champagne/30 flex items-center justify-center font-bold text-champagne text-sm font-mono shrink-0 shadow-inner">
                  {opp.logoInitial}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-pearl-muted font-medium">{opp.company}</span>
                    <Badge variant="navy" size="sm">{opp.workMode}</Badge>
                    <Badge variant="neutral" size="sm">{opp.type}</Badge>
                  </div>
                  <h3 className="text-base font-bold text-pearl-primary mt-0.5">
                    {opp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-pearl-muted mt-1.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-champagne" /> {opp.location}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-champagne font-semibold flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-champagne" /> {opp.salary}
                    </span>
                    <span>•</span>
                    <span>Deadline: {opp.deadline}</span>
                  </div>
                </div>
              </div>

              {/* Match Score Gauge */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0">
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-2xl font-bold font-mono text-champagne">{opp.matchPercentage}%</span>
                    <span className="text-[10px] text-pearl-muted block font-mono">Profile Match</span>
                  </div>
                  <button
                    onClick={() => toggleSaveOpportunity(opp.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      opp.saved
                        ? "bg-champagne/20 border-champagne text-champagne"
                        : "bg-surface-subtle border-white/10 text-pearl-muted hover:text-pearl-primary"
                    }`}
                    title={opp.saved ? "Saved Opportunity" : "Save Opportunity"}
                  >
                    {opp.saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Middle Row: Description */}
            <p className="text-xs text-pearl-muted leading-relaxed line-clamp-2">
              {opp.description}
            </p>

            {/* Matched Skills vs Skill Gaps */}
            <div className="p-3.5 rounded-xl bg-navy-950 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] uppercase font-semibold text-emerald-400 mr-1">Matched Skills:</span>
                {opp.matchedSkills.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                    ✓ {s}
                  </span>
                ))}
              </div>

              {opp.skillGaps.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2 sm:pt-0 sm:border-l sm:border-white/10 sm:pl-3">
                  <span className="text-[10px] uppercase font-semibold text-rose mr-1">Skill Gap:</span>
                  {opp.skillGaps.map((gap, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-rose/15 border border-rose/30 text-[10px] font-mono text-rose">
                      ! {gap}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Row: Actions */}
            <div className="pt-2 flex items-center justify-between">
              {opp.applicationStatus ? (
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      opp.applicationStatus === "Applied"
                        ? "champagne"
                        : opp.applicationStatus === "Interview"
                        ? "champagne"
                        : opp.applicationStatus === "Rejected"
                        ? "rose"
                        : "navy"
                    }
                    size="sm"
                  >
                    Status: {opp.applicationStatus}
                  </Badge>
                  <span className="text-[11px] text-pearl-muted font-mono">Applied on {opp.appliedDate}</span>
                </div>
              ) : (
                <span className="text-[11px] text-pearl-muted">
                  Verified Candidate Fast-Track Eligible
                </span>
              )}

              <Link href={`/opportunities/${opp.id}`}>
                <Button variant="primary" size="sm" className="gap-2 text-xs font-semibold">
                  <span>View Full Details & Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
