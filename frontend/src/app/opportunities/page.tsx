"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { OpportunityItem, JobListing } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExternalApplyModal } from "@/components/opportunities/ExternalApplyModal";

export default function OpportunitiesHubPage() {
  const {
    opportunities,
    toggleSaveOpportunity,
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
    <div className="space-y-8 animate-fade-in bg-background text-foreground min-h-screen">
      {/* Deep Navy Hero Section */}
      <div className="rounded-2xl bg-deep-navy text-white border-4 border-black p-8 sm:p-10 shadow-editorial-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black text-honey-gold border-2 border-black text-xs font-mono font-extrabold uppercase tracking-widest">
              <span>Phase 13 // Matched Opportunities</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
              Matching Jobs, Internships & Startups
            </h1>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Live verified opportunities matched transparently against your diagnostic readiness score and validated competencies. Official employer applications only.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => fetchLiveJobs()}
              disabled={isJobsLoading}
              className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border-2 border-white/40 font-extrabold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isJobsLoading ? "animate-spin" : ""}`} />
              <span>Refresh Live Feeds</span>
            </button>

            <Link href="/applications">
              <button className="px-5 py-2.5 rounded-lg bg-honey-gold hover:bg-electric-yellow text-black border-2 border-black font-extrabold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-editorial-xs">
                <span>Application Kanban</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>

        {/* Opportunity Track Counts Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20">
          <div className="p-3.5 rounded-xl bg-black border-2 border-honey-gold text-white flex items-center justify-between">
            <div>
              <p className="text-[10px] text-white/70 uppercase font-mono font-bold">Verified Full-time Roles</p>
              <p className="text-xl font-extrabold text-honey-gold font-mono">{jobCount} Live Jobs</p>
            </div>
            <Briefcase className="w-6 h-6 text-honey-gold" />
          </div>

          <div className="p-3.5 rounded-xl bg-black border-2 border-white/30 text-white flex items-center justify-between">
            <div>
              <p className="text-[10px] text-white/70 uppercase font-mono font-bold">Skill-verified Internships</p>
              <p className="text-xl font-extrabold text-white font-mono">{internshipCount} Internships</p>
            </div>
            <MapPin className="w-6 h-6 text-white/70" />
          </div>

          <div className="p-3.5 rounded-xl bg-black border-2 border-honey-gold text-white flex items-center justify-between">
            <div>
              <p className="text-[10px] text-white/70 uppercase font-mono font-bold">YC & High-Growth Startups</p>
              <p className="text-xl font-extrabold text-honey-gold font-mono">{startupCount} Startups</p>
            </div>
            <DollarSign className="w-6 h-6 text-honey-gold" />
          </div>
        </div>
      </div>

      {/* External Discovery Shortcuts */}
      <Card variant="editorial" className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-surface border-2 border-border">
        <div className="flex items-center gap-2 text-foreground font-mono">
          <Search className="w-4 h-4 text-foreground shrink-0" />
          <span className="font-bold uppercase tracking-wider text-[11px]">Direct Discovery Engines:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={linkedInSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-md bg-white border-2 border-foreground hover:bg-editorial-gold hover:text-foreground text-foreground transition-all flex items-center gap-1.5 font-bold text-[11px] shadow-editorial-sm"
          >
            <span>Search LinkedIn Verified</span>
            <ExternalLink className="w-3 h-3 text-foreground" />
          </a>
          <a
            href={naukriSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-md bg-white border-2 border-foreground hover:bg-editorial-gold hover:text-foreground text-foreground transition-all flex items-center gap-1.5 font-bold text-[11px] shadow-editorial-sm"
          >
            <span>Search Naukri Verified</span>
            <ExternalLink className="w-3 h-3 text-foreground" />
          </a>
        </div>
      </Card>

      {/* Tabs & Search Filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Tabs
            tabs={[
              { id: "Job", label: "Full-Time Jobs", count: jobCount },
              { id: "Internship", label: "Paid Internships", count: internshipCount },
              { id: "Startup", label: "Startup Openings", count: startupCount },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
            accent="gold"
          />

          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search role, company, or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2.5 rounded-md bg-white border-2 border-border text-xs text-foreground focus:outline-none focus:border-foreground font-sans placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground font-mono">
          <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-foreground">
            <Filter className="w-3.5 h-3.5 text-foreground" /> Filters:
          </span>

          <select
            value={workModeFilter}
            onChange={(e) => setWorkModeFilter(e.target.value)}
            className="px-3 py-1.5 rounded-md bg-white border-2 border-border text-xs text-foreground font-bold focus:outline-none focus:border-foreground"
          >
            <option value="all">All Work Modes</option>
            <option value="remote">Remote Only</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">On-site</option>
          </select>

          <label className="flex items-center gap-2 cursor-pointer ml-auto text-xs text-foreground font-bold font-mono">
            <input
              type="checkbox"
              checked={eligibleOnly}
              onChange={(e) => setEligibleOnly(e.target.checked)}
              className="rounded-none border-2 border-foreground text-foreground focus:ring-0 w-4 h-4 cursor-pointer"
            />
            <span>ELIGIBLE ONLY</span>
          </label>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map((opp) => (
            <Card
              key={opp.id}
              variant="editorial"
              className="p-6 md:p-7 space-y-4 hover:border-foreground transition-all group"
            >
              {/* Top Row: Company & Title */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-editorial-gold border-2 border-foreground flex items-center justify-center font-extrabold text-foreground text-base font-mono shrink-0 shadow-editorial-sm">
                    {opp.logoInitial || opp.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-muted-foreground uppercase">{opp.company}</span>
                      <Badge variant="navy" size="sm">{opp.workMode}</Badge>
                      <Badge variant="gold" size="sm">{opp.type}</Badge>
                      {opp.eligibilityStatus && (
                        <Badge
                          variant={
                            opp.eligibilityStatus === "eligible"
                              ? "gold"
                              : opp.eligibilityStatus === "not_eligible"
                              ? "red"
                              : "neutral"
                          }
                          size="sm"
                        >
                          {opp.eligibilityStatus === "eligible"
                            ? "✓ Verified Match"
                            : opp.eligibilityStatus === "possibly_eligible"
                            ? "? Review Reqs"
                            : opp.eligibilityStatus === "not_eligible"
                            ? "✕ Gap Detected"
                            : "Eligibility Unknown"}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mt-1 tracking-tight">
                      {opp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1.5 font-mono font-medium">
                      <span className="flex items-center gap-1 text-foreground">
                        <MapPin className="w-3.5 h-3.5 text-foreground" /> {opp.location}
                      </span>
                      <span>•</span>
                      <span className="font-mono text-foreground font-bold flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-foreground" /> {opp.salary}
                      </span>
                      {opp.lastVerifiedAt && (
                        <>
                          <span>•</span>
                          <span className="text-[11px] text-muted-foreground">
                            Verified: {new Date(opp.lastVerifiedAt).toLocaleDateString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Match Score Block */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 pt-2 sm:pt-0">
                  <div className="flex items-center gap-2">
                    <div className="text-right p-2 px-3 rounded-lg bg-editorial-gold/25 border-2 border-foreground">
                      <span className="text-2xl font-extrabold font-mono text-foreground">{opp.matchPercentage}%</span>
                      <span className="text-[9px] uppercase tracking-wider text-foreground block font-mono font-bold">Match</span>
                    </div>
                    <button
                      onClick={() => toggleSaveOpportunity(opp.id)}
                      className={`p-2.5 rounded-lg border-2 transition-colors ${
                        opp.saved
                          ? "bg-editorial-gold border-foreground text-foreground shadow-editorial-sm"
                          : "bg-surface border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                      }`}
                      title={opp.saved ? "Saved Opportunity" : "Save Opportunity"}
                    >
                      {opp.saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Middle Row: Description */}
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {opp.description}
              </p>

              {/* Matched Skills vs Skill Gaps */}
              <div className="p-3.5 rounded-lg bg-surface border-2 border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] uppercase font-mono font-bold text-foreground mr-1">Matched Skills:</span>
                  {opp.matchedSkills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-sm bg-white border border-border text-[10px] font-mono text-foreground font-semibold">
                      ✓ {s}
                    </span>
                  ))}
                </div>

                {opp.skillGaps.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 sm:pt-0 sm:border-l-2 sm:border-border sm:pl-3">
                    <span className="text-[10px] uppercase font-mono font-bold text-editorial-red mr-1">Skill Gap:</span>
                    {opp.skillGaps.map((gap, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-sm bg-editorial-red/10 border border-editorial-red text-[10px] font-mono text-editorial-red font-bold">
                        • {gap}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Row: Source Attribution & Actions */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t-2 border-border">
                <div className="text-[11px] text-muted-foreground font-mono">
                  <span>{opp.attribution || `Source: ${opp.externalSource || opp.source || "Verified Opportunity"}`}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Link href={`/opportunities/${opp.id}`}>
                    <Button variant="secondary" size="sm" className="gap-1.5 text-xs font-bold">
                      <span>View Details</span>
                    </Button>
                  </Link>

                  <Button
                    variant="gold"
                    size="sm"
                    onClick={() => handleApplyClick(opp)}
                    className="gap-2 text-xs font-bold shadow-editorial-sm"
                  >
                    <span>Apply Externally</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card variant="editorial" className="p-12 text-center space-y-4">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto" />
            <h3 className="text-base font-bold text-foreground">
              No live opportunities matching current filters
            </h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Try adjusting your search criteria, clearing work-mode filters, or refreshing verified live feeds.
            </p>
            <Button size="sm" variant="secondary" onClick={() => fetchLiveJobs()} className="font-bold">
              Refresh Verified Feeds
            </Button>
          </Card>
        )}
      </div>

      {/* External Application User Approval Modal */}
      <ExternalApplyModal />
    </div>
  );
}
