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
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";

export default function OpportunityDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { opportunities, applyToOpportunity, userProfile, resumeData } = useCareer();

  const oppId = params.id as string;
  const opp = opportunities.find((o) => o.id === oppId) || opportunities[0];

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(opp.applicationStatus === "Applied");

  const handleApply = () => {
    applyToOpportunity(opp.id);
    setIsApplied(true);
    setIsApplyModalOpen(false);
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
              <span>•</span>
              <span>Deadline: {opp.deadline}</span>
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
          ) : (
            <Button onClick={() => setIsApplyModalOpen(true)} size="md" className="gap-2 font-semibold shadow-gold-btn">
              <Send className="w-4 h-4 text-black" />
              <span>Apply with Verified Profile</span>
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
            <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary">
              About the Role
            </h2>
            <p className="text-xs text-pearl-muted leading-relaxed">
              {opp.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary">
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
            <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary">
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
            <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary">
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
                  Demonstrated Match
                </span>
                <h3 className="text-xl font-bold font-mono text-champagne">{opp.matchPercentage}% Strong Match</h3>
              </div>
              <Badge variant="champagne" size="sm">Verified Ready</Badge>
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
                  <span>Remaining Skill Gaps ({opp.skillGaps.length})</span>
                </div>
                <div className="space-y-2">
                  {opp.skillGaps.map((gap, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-navy-950 border border-rose/30 flex items-center justify-between text-xs"
                    >
                      <span className="text-rose font-mono font-medium">{gap}</span>
                      <Link
                        href="/learning"
                        className="text-[11px] text-champagne hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Learn Skill</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Candidate Credentials Being Submitted */}
            <div className="p-4 rounded-xl bg-navy-950 border border-white/5 space-y-2.5 text-xs text-pearl-muted">
              <p className="font-semibold text-pearl-primary uppercase tracking-wider text-[11px]">
                Submission Artifacts:
              </p>
              <div className="flex justify-between">
                <span>Verified Diagnostic:</span>
                <span className="font-mono text-champagne font-semibold">{userProfile.readinessScore}/100</span>
              </div>
              <div className="flex justify-between">
                <span>Production Projects:</span>
                <span className="font-mono text-pearl-primary">2 Deployed Apps</span>
              </div>
              <div className="flex justify-between">
                <span>ATS Resume:</span>
                <span className="font-mono text-emerald-400">91% ATS Pass</span>
              </div>
            </div>

            {/* Application CTA */}
            <Button
              onClick={() => setIsApplyModalOpen(true)}
              disabled={isApplied}
              size="lg"
              className="w-full gap-2 text-sm font-semibold"
            >
              {isApplied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Applied on {opp.appliedDate || "Today"}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Apply with Verified Profile</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Confirm Application Submission"
        description={`You are about to apply for ${opp.role} at ${opp.company}.`}
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-lg bg-navy-950 border border-white/5 space-y-2">
            <div className="flex justify-between">
              <span className="text-pearl-muted">Applicant:</span>
              <span className="text-pearl-primary font-bold">{userProfile.name} ({userProfile.email})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-pearl-muted">Role Match:</span>
              <span className="text-champagne font-bold font-mono">{opp.matchPercentage}% Match</span>
            </div>
            <div className="flex justify-between">
              <span className="text-pearl-muted">Location / Mode:</span>
              <span className="text-pearl-primary">{opp.location} ({opp.workMode})</span>
            </div>
          </div>

          <p className="text-pearl-muted text-[11px] leading-relaxed">
            By applying, your verified skill diagnostics, GitHub projects, and ATS resume are securely delivered to {opp.company}'s engineering recruitment pipeline.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsApplyModalOpen(false)}>
              Review Application
            </Button>
            <Button size="sm" onClick={handleApply} className="gap-1.5 font-semibold">
              <Send className="w-3.5 h-3.5" />
              <span>Confirm & Submit Application</span>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
