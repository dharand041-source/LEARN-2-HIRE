"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ExternalApplyModal } from "@/components/opportunities/ExternalApplyModal";
import { JobListing } from "@/types";

export default function OpportunityDetailsPage() {
  const params = useParams();
  const {
    opportunities,
    openExternalApplyModal,
    confirmExternalApplied,
    applicationRecords,
  } = useCareer();

  const oppId = params.id as string;
  const opp = opportunities.find((o) => o.id === oppId) || opportunities[0];

  const appRecord = applicationRecords.find((r) => r.jobId === opp.id);
  const isApplied = opp.applicationStatus === "Applied" || appRecord?.status === "Applied";
  const isRedirected = appRecord?.status === "Redirected";

  const handleApplyClick = () => {
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
      opportunityType:
        opp.type === "Internship" || opp.type === "INTERNSHIP"
          ? "INTERNSHIP"
          : opp.type === "Startup" || opp.type === "STARTUP"
          ? "STARTUP"
          : "JOB",
      experienceLevel: opp.experienceLevel || "Entry Level",
      requiredSkills: opp.matchedSkills.concat(opp.skillGaps),
      preferredSkills: [],
      listingUrl: opp.externalListingUrl || opp.listingUrl || "https://jobicy.com",
      applicationUrl: opp.externalApplicationUrl || opp.applicationUrl || opp.externalListingUrl || opp.listingUrl,
      postedAt: opp.postedAt || new Date().toISOString(),
      lastVerifiedAt: opp.lastVerifiedAt || new Date().toISOString(),
      isActive: true,
      sourceUrl: opp.externalListingUrl || opp.listingUrl || "https://jobicy.com",
      attribution: opp.attribution || `Source: ${opp.externalSource || "Verified Employer Portal"}`,
    };
    openExternalApplyModal(syntheticJob);
  };

  return (
    <div className="space-y-8 animate-fade-in bg-background text-foreground min-h-screen">
      {/* Header */}
      <div className="border-b-2 border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <Link
            href="/opportunities"
            className="p-2 rounded-md bg-white hover:bg-surface border-2 border-border text-muted-foreground hover:text-foreground transition-colors mt-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-muted-foreground uppercase">{opp.company}</span>
              <Badge variant="maroon" size="sm">{opp.workMode}</Badge>
              <Badge variant="coral" size="sm">{opp.type}</Badge>
              {opp.eligibilityStatus && (
                <Badge
                  variant={
                    opp.eligibilityStatus === "eligible"
                      ? "coral"
                      : opp.eligibilityStatus === "not_eligible"
                      ? "maroon"
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
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {opp.role}
            </h1>
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

        <div className="flex items-center gap-3">
          {isApplied ? (
            <Link href="/applications">
              <Button variant="secondary" size="sm" className="gap-2 text-foreground font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-electric-coral stroke-[2.5]" />
                <span>Application Submitted • View Tracker</span>
              </Button>
            </Link>
          ) : isRedirected ? (
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleApplyClick}
                className="gap-1.5 text-xs font-bold"
              >
                <span>Re-open Destination</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="coral"
                size="sm"
                onClick={() => confirmExternalApplied(opp.id)}
                className="gap-1.5 font-bold text-xs shadow-editorial-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark as Applied</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="coral"
              onClick={handleApplyClick}
              size="md"
              className="gap-2 font-bold shadow-editorial-sm"
            >
              <span>Apply Externally</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Main Grid: Left Job Spec (7 cols) & Right Readiness Match (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Job Overview */}
          <Card variant="editorial" className="p-6 md:p-7 space-y-4">
            <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-foreground border-b-2 border-border pb-3">
              Role Specification
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {opp.description}
            </p>
            <div className="pt-2 text-[11px] text-muted-foreground font-mono">
              <span>{opp.attribution || `Source: ${opp.externalSource || opp.source || "Verified Job Feed"}`}</span>
            </div>
          </Card>

          {/* Key Responsibilities */}
          <Card variant="editorial" className="p-6 md:p-7 space-y-4">
            <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-foreground border-b-2 border-border pb-3">
              Primary Responsibilities
            </h2>
            <div className="space-y-2.5">
              {opp.responsibilities.map((resp, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-foreground font-medium leading-relaxed">
                  <span className="text-foreground font-bold font-mono">▶</span>
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Requirements */}
          <Card variant="editorial" className="p-6 md:p-7 space-y-4">
            <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-foreground border-b-2 border-border pb-3">
              Required Qualifications
            </h2>
            <div className="space-y-2.5">
              {opp.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-foreground font-medium leading-relaxed">
                  <span className="text-foreground font-bold font-mono">▶</span>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Benefits & Perks */}
          <Card variant="editorial" className="p-6 md:p-7 space-y-4">
            <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-foreground border-b-2 border-border pb-3">
              Compensation & Benefits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {opp.benefits.map((b, i) => (
                <div key={i} className="p-3 rounded-md bg-surface border-2 border-border text-xs text-foreground flex items-center gap-2 font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-foreground shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Verified Match & Gaps Panel (5 cols) */}
        <div className="lg:col-span-5 sticky top-20 space-y-6">
          <Card variant="editorial" className="p-6 md:p-7 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-border pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground font-bold">
                  Compatibility Index
                </span>
                <h3 className="text-2xl font-extrabold font-mono text-foreground">{opp.matchPercentage}% Matched</h3>
              </div>
              <Badge variant="coral" size="sm">Verified Portal</Badge>
            </div>

            {/* Matched Skills */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-foreground font-bold font-mono">
                <CheckCircle2 className="w-4 h-4 text-electric-coral stroke-[2.5]" />
                <span>Verified Matched Skills ({opp.matchedSkills.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {opp.matchedSkills.map((s, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-sm bg-surface border border-border text-[11px] font-mono font-semibold text-foreground"
                  >
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Skill Gaps & Direct Learning Deep-Links */}
            {opp.skillGaps.length > 0 && (
              <div className="space-y-3 pt-3 border-t-2 border-border">
                <div className="flex items-center gap-2 text-xs text-royal-maroon font-bold font-mono">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Missing Competencies ({opp.skillGaps.length})</span>
                </div>
                <div className="space-y-2">
                  {opp.skillGaps.map((gap, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-md bg-surface border-2 border-border flex items-center justify-between text-xs"
                    >
                      <span className="text-royal-maroon font-mono font-bold">+ {gap}</span>
                      <Link
                        href={`/learning?skill=${encodeURIComponent(gap)}`}
                        className="text-[11px] text-foreground hover:text-electric-coral flex items-center gap-1 font-bold font-mono underline"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Learn skill</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Application Policy Notice */}
            <div className="p-4 rounded-md bg-surface border-2 border-border space-y-2 text-[11px] text-muted-foreground leading-relaxed font-mono">
              <p className="font-bold text-foreground uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-electric-coral stroke-[2.5]" />
                <span>Direct Application Protection</span>
              </p>
              <p>
                Learn-2-Hire safely redirects you directly to the verified employer application destination.
                No automated bot submissions.
              </p>
            </div>

            {/* Application CTA */}
            <Button
              onClick={handleApplyClick}
              variant="coral"
              size="lg"
              className="w-full gap-2 text-xs font-bold shadow-editorial-sm"
            >
              {isApplied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Applied on {opp.appliedDate || "Recently"}</span>
                </>
              ) : isRedirected ? (
                <>
                  <ExternalLink className="w-4 h-4" />
                  <span>Re-open Application Page</span>
                </>
              ) : (
                <>
                  <span>Apply on Official Website</span>
                  <ExternalLink className="w-4 h-4" />
                </>
              )}
            </Button>
          </Card>
        </div>
      </div>

      {/* External Application User Approval Modal */}
      <ExternalApplyModal />
    </div>
  );
}
