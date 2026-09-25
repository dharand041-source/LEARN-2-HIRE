"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles,
  ShieldCheck,
  Award,
  FileText,
  Briefcase,
  ChevronRight,
  Zap,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ExternalApplyModal } from "@/components/opportunities/ExternalApplyModal";
import { JobListing } from "@/types";

export default function OpportunityDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const {
    opportunities,
    userProfile,
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
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <Link
            href="/opportunities"
            className="p-2 rounded-lg bg-surface-card hover:bg-navy-800 border border-surface-border text-pearl-muted hover:text-pearl-primary transition-colors mt-1"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-pearl-muted font-medium">{opp.company}</span>
              <Badge variant="champagne" size="sm">{opp.workMode}</Badge>
              <Badge variant="navy" size="sm">{opp.type}</Badge>
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
            <h1 className="text-2xl font-bold text-pearl-primary">
              {opp.role}
            </h1>
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

        <div className="flex items-center gap-3">
          {isApplied ? (
            <Link href="/applications">
              <Button variant="secondary" size="sm" className="gap-2 text-champagne border-champagne/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Application Submitted • View Tracker</span>
              </Button>
            </Link>
          ) : isRedirected ? (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleApplyClick}
                className="gap-1.5 text-xs font-semibold"
              >
                <span>Re-open Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
              <Button
                size="sm"
                onClick={() => confirmExternalApplied(opp.id)}
                className="gap-1.5 font-semibold text-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark as Applied</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleApplyClick}
              size="md"
              className="gap-2 font-semibold shadow-gold-btn"
            >
              <span>Apply Externally</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Main Grid: Left Job Spec (7 cols) & Right Readiness Match (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Job Description, Responsibilities & Requirements */}
        <div className="lg:col-span-7 space-y-6">
          {/* Job Overview */}
          <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary font-mono">
              About the Role
            </h2>
            <p className="text-xs text-pearl-muted leading-relaxed">
              {opp.description}
            </p>
            <div className="pt-2 text-[11px] text-pearl-muted font-mono">
              <span>{opp.attribution || `Source: ${opp.externalSource || opp.source || "Verified Job Feed"}`}</span>
            </div>
          </div>

          {/* Key Responsibilities */}
          <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary font-mono">
              Core Responsibilities
            </h2>
            <div className="space-y-2.5">
              {opp.responsibilities.map((resp, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-pearl-muted leading-relaxed">
                  <span className="text-champagne font-bold mt-0.5">•</span>
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary font-mono">
              Required Qualifications
            </h2>
            <div className="space-y-2.5">
              {opp.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-pearl-muted leading-relaxed">
                  <span className="text-champagne font-bold mt-0.5">•</span>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits & Perks */}
          <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary font-mono">
              Perks & Compensation
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {opp.benefits.map((b, i) => (
                <div key={i} className="p-3 rounded-lg bg-navy-950 border border-white/5 text-xs text-pearl-muted flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-champagne shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Verified Match & Gaps Panel (5 cols) */}
        <div className="lg:col-span-5 sticky top-20 space-y-6">
          <div className="p-6 rounded-2xl bg-surface-card border border-champagne/40 shadow-card-navy space-y-6">
            <div className="flex items-center justify-between border-b border-surface-border pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-pearl-muted">
                  Learn-2-Hire Compatibility Formula
                </span>
                <h3 className="text-xl font-bold font-mono text-champagne">{opp.matchPercentage}% Compatibility</h3>
              </div>
              <Badge variant="champagne" size="sm">Verified Feed</Badge>
            </div>

            {/* Matched Skills */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Your Matched Competencies ({opp.matchedSkills.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {opp.matchedSkills.map((s, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-mono text-emerald-300"
                  >
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Skill Gaps & Direct Learning Deep-Links */}
            {opp.skillGaps.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-rose font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Missing Skills ({opp.skillGaps.length})</span>
                </div>
                <div className="space-y-2">
                  {opp.skillGaps.map((gap, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-navy-950 border border-rose/30 flex items-center justify-between text-xs"
                    >
                      <span className="text-rose font-mono font-medium">+ {gap}</span>
                      <Link
                        href={`/learning?skill=${encodeURIComponent(gap)}`}
                        className="text-[11px] text-champagne hover:underline flex items-center gap-1 font-semibold"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>Learn this skill</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Application Policy Notice */}
            <div className="p-4 rounded-xl bg-navy-950 border border-white/5 space-y-2 text-[11px] text-pearl-muted leading-relaxed">
              <p className="font-semibold text-pearl-primary uppercase tracking-wider text-[10px] font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>External Application Redirect</span>
              </p>
              <p>
                When you click apply, Learn-2-Hire safely redirects you to the verified external career
                destination. You will review and submit your application directly on the employer&apos;s site.
              </p>
            </div>

            {/* Application CTA */}
            <Button
              onClick={handleApplyClick}
              size="lg"
              className="w-full gap-2 text-sm font-semibold shadow-gold-btn"
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
          </div>
        </div>
      </div>

      {/* External Application User Approval Modal */}
      <ExternalApplyModal />
    </div>
  );
}
