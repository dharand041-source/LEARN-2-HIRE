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
  ExternalLink,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { OpportunityItem, OpportunityType, JobListing } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { ExternalApplyModal } from "@/components/opportunities/ExternalApplyModal";

export default function OpportunitiesHubPage() {
  const {
    opportunities,
    toggleSaveOpportunity,
    userProfile,
    selectedRole,
    fetchLiveJobs,
    isJobsLoading,
    openExternalApplyModal,
  } = useCareer();

  const [activeTab, setActiveTab] = useState<string>("Job");
  const [searchQuery, setSearchQuery] = useState("");
  const [workModeFilter, setWorkModeFilter] = useState<string>("all");
  const [eligibleOnly, setEligibleOnly] = useState<boolean>(false);

  const jobCount = opportunities.filter((o) => o.type === "Job" || o.type === "JOB").length;
  const internshipCount = opportunities.filter((o) => o.type === "Internship" || o.type === "INTERNSHIP").length;
  const startupCount = opportunities.filter((o) => o.type === "Startup" || o.type === "STARTUP").length;

  const filteredOpportunities = opportunities.filter((opp) => {
    // Type match
    const typeUpper = opp.type.toUpperCase();
    const tabUpper = activeTab.toUpperCase();
    if (typeUpper !== tabUpper) return false;

    // Work Mode
    if (workModeFilter !== "all" && opp.workMode.toLowerCase() !== workModeFilter.toLowerCase()) {
      return false;
    }

    // Eligible Only filter
    if (eligibleOnly && opp.eligibilityStatus && opp.eligibilityStatus !== "eligible") {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        opp.company.toLowerCase().includes(q) ||
        opp.role.toLowerCase().includes(q) ||
        opp.matchedSkills.some((s) => s.toLowerCase().includes(q)) ||
        opp.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleApplyClick = (opp: OpportunityItem) => {
    const syntheticJob: JobListing = {
      id: opp.id,
      source: (opp.externalSource as any) || "verified_external",
      sourceId: opp.id,
      title: opp.role,
      company: opp.company,
      description: opp.description,
      location: opp.location,
      country: "India",
      remoteType: opp.workMode === "Remote" ? "Remote" : opp.workMode === "Hybrid" ? "Hybrid" : "Onsite",
      employmentType: "Full-time",
      opportunityType: opp.type === "Internship" || opp.type === "INTERNSHIP" ? "INTERNSHIP" : opp.type === "Startup" || opp.type === "STARTUP" ? "STARTUP" : "JOB",
      experienceLevel: opp.experienceLevel || "Entry Level",
      requiredSkills: opp.matchedSkills.concat(opp.skillGaps),
      preferredSkills: [],
      listingUrl: opp.externalListingUrl || opp.listingUrl || "https://jobicy.com",
      applicationUrl: opp.externalApplicationUrl || opp.applicationUrl || opp.externalListingUrl || opp.listingUrl,
      postedAt: opp.postedAt || new Date().toISOString(),
      lastVerifiedAt: opp.lastVerifiedAt || new Date().toISOString(),
      isActive: true,
      sourceUrl: opp.externalListingUrl || opp.listingUrl || "https://jobicy.com",
      attribution: opp.attribution || `Source: ${opp.externalSource || "Verified Job Feed"}`,
    };
    openExternalApplyModal(syntheticJob);
  };

  const linkedInSearchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
    searchQuery || selectedRole.title
  )}`;
  const naukriSearchUrl = `https://www.naukri.com/${encodeURIComponent(
    (searchQuery || selectedRole.title).toLowerCase().replace(/\s+/g, "-")
  )}-jobs`;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="champagne" size="sm">Phase 13</Badge>
            <span className="text-xs text-pearl-muted font-mono uppercase tracking-wider">
              Live Verified Opportunities
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary tracking-tight">
            Matching Jobs, Internships & Startups
          </h1>
          <p className="text-xs sm:text-sm text-pearl-muted mt-1 max-w-2xl">
            Live vacancies matched transparently against your resume skills and diagnostic profile. Direct redirects to official employer & platform application destinations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchLiveJobs()}
            isLoading={isJobsLoading}
            className="gap-1.5 text-xs font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Opportunities</span>
          </Button>

          <Link href="/applications">
            <Button variant="secondary" size="sm" className="gap-1.5">
              <span>Application Tracker (Kanban)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* External Discovery Shortcuts (Prompt Rules #12 & #13: LinkedIn & Naukri legitimate search links) */}
      <div className="p-4 rounded-xl bg-navy-950 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-pearl-muted">
          <Search className="w-4 h-4 text-champagne shrink-0" />
          <span>Additional Discovery (Legitimate Search Destinations):</span>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={linkedInSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-surface-card border border-white/10 hover:border-champagne/40 text-pearl-primary hover:text-champagne transition-all flex items-center gap-1.5 font-medium text-[11px]"
          >
            <span>Search on LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-champagne" />
          </a>
          <a
            href={naukriSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-surface-card border border-white/10 hover:border-champagne/40 text-pearl-primary hover:text-champagne transition-all flex items-center gap-1.5 font-medium text-[11px]"
          >
            <span>Search on Naukri</span>
            <ExternalLink className="w-3 h-3 text-champagne" />
          </a>
        </div>
      </div>

      {/* Tabs & Search Filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Tabs
            tabs={[
              { id: "Job", label: "Full-Time Jobs", count: jobCount },
              { id: "Internship", label: "Paid Internships", count: internshipCount },
              { id: "Startup", label: "Startup Opportunities", count: startupCount },
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

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-pearl-muted">
          <span className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-pearl-muted">
            <Filter className="w-3 h-3 text-champagne" /> Filter:
          </span>

          <select
            value={workModeFilter}
            onChange={(e) => setWorkModeFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-surface-card border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne"
          >
            <option value="all">All Work Modes</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">On-site</option>
          </select>

          <label className="flex items-center gap-1.5 cursor-pointer ml-auto text-xs text-pearl-primary">
            <input
              type="checkbox"
              checked={eligibleOnly}
              onChange={(e) => setEligibleOnly(e.target.checked)}
              className="rounded bg-navy-950 border-white/20 text-champagne focus:ring-0"
            />
            <span>Eligible only</span>
          </label>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="p-6 rounded-2xl bg-surface-card border border-surface-border hover:border-champagne/40 transition-all duration-200 hover:shadow-card-hover space-y-4"
            >
              {/* Top Row: Company & Title */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-navy-800 border border-champagne/30 flex items-center justify-center font-bold text-champagne text-sm font-mono shrink-0 shadow-inner">
                    {opp.logoInitial || opp.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-pearl-muted font-medium">{opp.company}</span>
                      <Badge variant="navy" size="sm">{opp.workMode}</Badge>
                      <Badge variant="champagne" size="sm">{opp.type}</Badge>
                      {opp.eligibilityStatus && (
                        <Badge
                          variant={
                            opp.eligibilityStatus === "eligible"
                              ? "champagne"
                              : opp.eligibilityStatus === "not_eligible"
                              ? "rose"
                              : "neutral"
                          }
                          size="sm"
                        >
                          {opp.eligibilityStatus === "eligible"
                            ? "✓ Compatible"
                            : opp.eligibilityStatus === "possibly_eligible"
                            ? "? Review Reqs"
                            : opp.eligibilityStatus === "not_eligible"
                            ? "✕ Gap Detected"
                            : "Eligibility Unknown"}
                        </Badge>
                      )}
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
                      {opp.lastVerifiedAt && (
                        <>
                          <span>•</span>
                          <span className="font-mono text-[11px] text-pearl-muted">
                            Last verified: {new Date(opp.lastVerifiedAt).toLocaleDateString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Match Score Gauge */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0">
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-2xl font-bold font-mono text-champagne">{opp.matchPercentage}%</span>
                      <span className="text-[10px] text-pearl-muted block font-mono">Job Match</span>
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
                        • {gap}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Row: Source Attribution & Actions */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-[11px] text-pearl-muted font-mono">
                  <span>{opp.attribution || `Source: ${opp.externalSource || opp.source || "Verified Opportunity"}`}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Link href={`/opportunities/${opp.id}`}>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                      <span>View Details</span>
                    </Button>
                  </Link>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleApplyClick(opp)}
                    className="gap-2 text-xs font-semibold shadow-gold-btn"
                  >
                    <span>Apply Externally</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center rounded-2xl bg-surface-card border border-surface-border space-y-3">
            <Briefcase className="w-10 h-10 text-pearl-muted/40 mx-auto" />
            <h3 className="text-sm font-semibold text-pearl-primary">
              No live opportunities matching current filters
            </h3>
            <p className="text-xs text-pearl-muted max-w-md mx-auto">
              Try adjusting your search criteria, clearing filters, or refreshing live feeds.
            </p>
            <Button size="sm" variant="outline" onClick={() => fetchLiveJobs()}>
              Refresh Live Feeds
            </Button>
          </div>
        )}
      </div>

      {/* External Application User Approval Modal */}
      <ExternalApplyModal />
    </div>
  );
}
