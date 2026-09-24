"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Kanban,
  Building,
  MapPin,
  DollarSign,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ApplicationItem, ApplicationStatus } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function ApplicationTrackingPage() {
  const { applications, updateApplicationStatus } = useCareer();

  const columns: { id: ApplicationStatus; title: string; color: string }[] = [
    { id: "Saved", title: "Saved", color: "border-pearl-muted/40" },
    { id: "Approved", title: "Readiness Approved", color: "border-champagne/40" },
    { id: "Applied", title: "Applied", color: "border-navy-500" },
    { id: "Assessment", title: "Assessment Active", color: "border-amber-400" },
    { id: "Interview", title: "Interviewing", color: "border-champagne" },
    { id: "Selected", title: "Offers / Selected", color: "border-emerald-400" },
    { id: "Rejected", title: "Outcome Analyzed", color: "border-rose" },
  ];

  const handleStatusChange = (appId: string, newStatus: ApplicationStatus) => {
    updateApplicationStatus(appId, newStatus);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="champagne" size="sm">Phase 14</Badge>
            <span className="text-xs text-pearl-muted font-mono uppercase tracking-wider">
              Employment Pipeline Tracking
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary tracking-tight">
            Application Lifecycle Tracker
          </h1>
          <p className="text-xs sm:text-sm text-pearl-muted mt-1 max-w-2xl">
            Track real candidate submissions across 7 progressive stages. Applications with rejection outcomes automatically trigger root-cause analysis and retraining plans.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/feedback">
            <Button variant="secondary" size="sm" className="gap-2 text-rose border-rose/30">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Rejection & Retraining Hub</span>
            </Button>
          </Link>
          <Link href="/opportunities">
            <Button size="sm" className="gap-1.5">
              <span>Find More Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Kanban Board Container with horizontal scroll */}
      <div className="overflow-x-auto pb-6">
        <div className="flex gap-4 min-w-[1300px]">
          {columns.map((col) => {
            const colApps = applications.filter((a) => a.status === col.id);

            return (
              <div
                key={col.id}
                className="w-80 rounded-2xl bg-surface-card border border-surface-border flex flex-col max-h-[750px] shadow-card-subtle"
              >
                {/* Column Header */}
                <div className={`p-4 border-b border-surface-border flex items-center justify-between border-t-2 ${col.color}`}>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-pearl-primary">{col.title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-navy-950 border border-white/5 text-[10px] font-mono text-champagne font-semibold">
                      {colApps.length}
                    </span>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="p-3 space-y-3 overflow-y-auto flex-1">
                  {colApps.length === 0 ? (
                    <div className="p-6 text-center text-[11px] text-pearl-muted/60 border border-dashed border-white/5 rounded-xl">
                      No applications in this stage
                    </div>
                  ) : (
                    colApps.map((app) => (
                      <div
                        key={app.id}
                        className={`p-4 rounded-xl border transition-all space-y-3 ${
                          col.id === "Rejected"
                            ? "bg-navy-950/90 border-rose/40 hover:border-rose"
                            : col.id === "Selected"
                            ? "bg-navy-950/90 border-emerald-500/40"
                            : "bg-surface-subtle border-white/10 hover:border-champagne/40"
                        }`}
                      >
                        {/* Card Header */}
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[11px] font-semibold text-pearl-muted truncate">{app.company}</span>
                            <span className="font-mono text-xs font-bold text-champagne">{app.matchScore}%</span>
                          </div>
                          <h4 className="text-xs font-bold text-pearl-primary leading-tight">
                            {app.role}
                          </h4>
                          <p className="text-[10px] text-pearl-muted mt-1 flex items-center gap-1 font-mono">
                            <DollarSign className="w-3 h-3 text-champagne" /> {app.salary}
                          </p>
                        </div>

                        {/* Notes */}
                        {app.notes && (
                          <p className="text-[10px] text-pearl-muted/90 bg-black/40 p-2 rounded border border-white/5 leading-relaxed">
                            {app.notes}
                          </p>
                        )}

                        {/* Special Action for Rejected Cards: Rejection Analysis Link */}
                        {col.id === "Rejected" && (
                          <div className="pt-2 border-t border-rose/30">
                            <Link href="/feedback">
                              <Button variant="rose" size="sm" className="w-full gap-1.5 text-[11px] py-1">
                                <TrendingUp className="w-3 h-3" />
                                <span>Inspect Retraining Plan</span>
                              </Button>
                            </Link>
                          </div>
                        )}

                        {/* Bottom Row: Move Stage Dropdown & Date */}
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                          <span className="text-pearl-muted font-mono">{app.appliedDate}</span>

                          {/* Quick Stage Mover */}
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                            className="bg-navy-900 border border-white/10 text-pearl-primary rounded px-2 py-0.5 text-[10px] focus:outline-none focus:border-champagne cursor-pointer"
                          >
                            {columns.map((c) => (
                              <option key={c.id} value={c.id} className="bg-black text-pearl-primary">
                                Move to: {c.title}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
