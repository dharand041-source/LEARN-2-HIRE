"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCareer } from "@/context/CareerContext";
import {
  ExternalLink,
  ShieldCheck,
  MapPin,
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
      description="You are about to navigate to the employer's official recruitment portal."
      maxWidth="md"
    >
      <div className="space-y-4 text-xs font-sans">
        {/* Notice Alert */}
        <div className="p-3.5 rounded-lg bg-editorial-gold/20 border-2 border-foreground text-foreground space-y-1.5">
          <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase font-mono">
            <Info className="w-4 h-4 shrink-0" />
            <span>Official Application Notice</span>
          </div>
          <p className="text-[11px] text-foreground leading-relaxed font-medium">
            You are about to leave Learn-2-Hire and continue on the external employer destination:{" "}
            <strong className="text-foreground font-mono font-bold">{domain}</strong>.
          </p>
        </div>

        {/* Opportunity Summary Card */}
        <div className="p-4 rounded-lg bg-surface border-2 border-border space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] text-muted-foreground font-mono font-bold uppercase tracking-wider">
                {job.company}
              </span>
              <h4 className="text-sm font-bold text-foreground">{job.title}</h4>
            </div>
            <Badge variant="gold" size="sm">
              {job.opportunityType}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-muted-foreground font-mono">
            <span className="flex items-center gap-1 text-foreground">
              <MapPin className="w-3.5 h-3.5 text-foreground" /> {job.location}
            </span>
            <span>•</span>
            <span className="text-foreground font-bold">
              {job.remoteType}
            </span>
            {job.salaryMin && (
              <>
                <span>•</span>
                <span className="font-mono text-foreground font-bold">
                  {job.salaryCurrency || "₹"} {job.salaryMin.toLocaleString()}
                  {job.salaryMax ? ` - ${job.salaryMax.toLocaleString()}` : "+"}
                </span>
              </>
            )}
          </div>

          {/* Source Attribution & Freshness */}
          <div className="pt-2 border-t-2 border-border flex items-center justify-between text-[10px] text-muted-foreground font-mono">
            <span>{job.attribution || `Source: ${job.source}`}</span>
            <span>
              {job.lastVerifiedAt
                ? `Verified ${new Date(job.lastVerifiedAt).toLocaleDateString()}`
                : "Active"}
            </span>
          </div>
        </div>

        {/* Transparent Policy */}
        <div className="p-3 rounded-lg bg-surface border-2 border-border text-[11px] text-muted-foreground leading-relaxed space-y-1">
          <div className="flex items-center gap-1.5 text-foreground font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Zero Automated Form-Filling Guarantee</span>
          </div>
          <p>
            Learn-2-Hire never automatically submits external applications on your behalf. You review and
            submit directly on the verified company portal.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={closeExternalApplyModal} className="font-bold">
            Cancel
          </Button>
          <Button
            variant="gold"
            size="sm"
            onClick={confirmExternalApplyRedirect}
            className="gap-2 font-bold shadow-editorial-sm"
          >
            <span>Continue to Apply</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
