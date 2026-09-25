"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCareer } from "@/context/CareerContext";
import {
  ExternalLink,
  ShieldCheck,
  Building,
  MapPin,
  Clock,
  AlertTriangle,
  ArrowRight,
  Info,
} from "lucide-react";

export function ExternalApplyModal() {
  const {
    isApplyApprovalModalOpen,
    closeExternalApplyModal,
    confirmExternalApplyRedirect,
    pendingApplyJob,
  } = useCareer();

  if (!pendingApplyJob) return null;

  const job = pendingApplyJob;
  const targetUrl = job.applicationUrl || job.listingUrl || job.sourceUrl;
  let domain = "";
  try {
    domain = new URL(targetUrl).hostname;
  } catch {
    domain = "External Portal";
  }

  return (
    <Modal
      isOpen={isApplyApprovalModalOpen}
      onClose={closeExternalApplyModal}
      title="External Application Redirect"
      description="You are about to leave SkillForge to complete your application."
      maxWidth="md"
    >
      <div className="space-y-4 text-xs">
        {/* Leaving Notice Alert */}
        <div className="p-3.5 rounded-xl bg-champagne/10 border border-champagne/30 text-pearl-primary space-y-1.5">
          <div className="flex items-center gap-2 text-champagne font-semibold text-xs">
            <Info className="w-4 h-4 shrink-0" />
            <span>Official Application Notice</span>
          </div>
          <p className="text-[11px] text-pearl-muted leading-relaxed">
            You are about to leave SkillForge and continue on the external application website:{" "}
            <strong className="text-pearl-primary font-mono">{domain}</strong>.
          </p>
        </div>

        {/* Opportunity Summary Card */}
        <div className="p-4 rounded-xl bg-navy-950 border border-white/5 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] text-pearl-muted font-mono uppercase tracking-wider">
                {job.company}
              </span>
              <h4 className="text-sm font-bold text-pearl-primary">{job.title}</h4>
            </div>
            <Badge variant="champagne" size="sm">
              {job.opportunityType}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-pearl-muted">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-champagne" /> {job.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono text-champagne font-medium">
              {job.remoteType}
            </span>
            {job.salaryMin && (
              <>
                <span>•</span>
                <span className="font-mono text-emerald-400 font-medium">
                  {job.salaryCurrency || "₹"} {job.salaryMin.toLocaleString()}
                  {job.salaryMax ? ` - ${job.salaryMax.toLocaleString()}` : "+"}
                </span>
              </>
            )}
          </div>

          {/* Source Attribution & Freshness */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-pearl-muted font-mono">
            <span>{job.attribution || `Source: ${job.source}`}</span>
            <span>
              {job.lastVerifiedAt
                ? `Verified ${new Date(job.lastVerifiedAt).toLocaleDateString()}`
                : "Active"}
            </span>
          </div>
        </div>

        {/* Transparent Policy */}
        <div className="p-3 rounded-lg bg-surface-subtle/50 border border-white/5 text-[11px] text-pearl-muted leading-relaxed space-y-1">
          <div className="flex items-center gap-1.5 text-pearl-primary font-semibold text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Automated Form-Filling</span>
          </div>
          <p>
            SkillForge never automatically submits external employer applications. You will review and
            submit your application directly on the employer&apos;s verified portal.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" size="sm" onClick={closeExternalApplyModal}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={confirmExternalApplyRedirect}
            className="gap-2 font-semibold shadow-gold-btn"
          >
            <span>Continue to Apply</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
