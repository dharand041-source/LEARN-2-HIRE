"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  ArrowRight,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ApplicationStatus } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function ApplicationTrackingPage() {
  const { applications, updateApplicationStatus } = useCareer();

  const columns: { id: ApplicationStatus; title: string; topBorder: string }[] = [
    { id: "Saved", title: "Saved", topBorder: "border-t-4 border-t-foreground" },
    { id: "Approved", title: "Readiness Approved", topBorder: "border-t-4 border-t-editorial-acid" },
    { id: "Applied", title: "Applied", topBorder: "border-t-4 border-t-foreground" },
    { id: "Assessment", title: "Assessment Active", topBorder: "border-t-4 border-t-editorial-yellow" },
    { id: "Interview", title: "Interviewing", topBorder: "border-t-4 border-t-editorial-violet" },
    { id: "Selected", title: "Offers / Selected", topBorder: "border-t-4 border-t-emerald-600" },
    { id: "Rejected", title: "Outcome Analyzed", topBorder: "border-t-4 border-t-editorial-red" },
  ];

  const handleStatusChange = (appId: string, newStatus: ApplicationStatus) => {
    updateApplicationStatus(appId, newStatus);
  };

  return (
    <div className="space-y-8 animate-fade-in bg-background text-foreground min-h-screen">
      {/* Editorial Header */}
      <div className="border-b-2 border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SectionHeader
          eyebrow="PHASE 14 // APPLICATION TRACKER"
          title="Application Lifecycle Kanban"
          description="Track verified candidate applications across 7 progressive recruitment stages. Applications with turn-down outcomes automatically trigger root-cause remediation."
          accent="acid"
        />

        <div className="flex items-center gap-3">
          <Link href="/feedback">
            <Button variant="secondary" size="sm" className="gap-2 text-foreground font-bold">
              <TrendingUp className="w-3.5 h-3.5 text-editorial-violet" />
              <span>Retraining Engine</span>
            </Button>
          </Link>
          <Link href="/opportunities">
            <Button variant="acid" size="sm" className="gap-1.5 font-bold shadow-editorial-sm">
              <span>Find Opportunities</span>
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
                className={`w-80 rounded-lg bg-surface border-2 border-border flex flex-col max-h-[750px] shadow-editorial-sm ${col.topBorder}`}
              >
                {/* Column Header */}
                <div className="p-4 border-b-2 border-border flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-foreground">{col.title}</h3>
                    <span className="px-2 py-0.5 rounded-sm bg-editorial-acid border border-foreground text-[10px] font-mono text-foreground font-extrabold">
                      {colApps.length}
                    </span>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="p-3 space-y-3 overflow-y-auto flex-1">
                  {colApps.length === 0 ? (
                    <div className="p-6 text-center text-[11px] font-mono text-muted-foreground border-2 border-dashed border-border rounded-lg">
                      No applications in this phase
                    </div>
                  ) : (
                    colApps.map((app) => (
                      <Card
                        key={app.id}
                        variant="editorial"
                        className="p-4 space-y-3 bg-white"
                      >
                        {/* Card Header */}
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase truncate">{app.company}</span>
                            <span className="font-mono text-xs font-extrabold text-foreground px-1.5 py-0.5 rounded-sm bg-editorial-acid/30 border border-foreground">{app.matchScore}%</span>
                          </div>
                          <h4 className="text-xs font-bold text-foreground leading-tight">
                            {app.role}
                          </h4>
                          <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1 font-mono font-semibold">
                            <DollarSign className="w-3 h-3 text-foreground" /> {app.salary}
                          </p>
                        </div>

                        {/* Notes */}
                        {app.notes && (
                          <p className="text-[10px] text-foreground bg-surface p-2 rounded-md border border-border leading-relaxed font-mono">
                            {app.notes}
                          </p>
                        )}

                        {/* Special Action for Rejected Cards: Rejection Analysis Link */}
                        {col.id === "Rejected" && (
                          <div className="pt-2 border-t-2 border-border">
                            <Link href="/feedback">
                              <Button variant="violet" size="sm" className="w-full gap-1.5 text-[11px] py-1 font-bold">
                                <TrendingUp className="w-3 h-3" />
                                <span>Inspect Retraining Plan</span>
                              </Button>
                            </Link>
                          </div>
                        )}

                        {/* Bottom Row: Move Stage Dropdown & Date */}
                        <div className="pt-2 border-t-2 border-border flex items-center justify-between text-[10px] font-mono">
                          <span className="text-muted-foreground font-bold">{app.appliedDate}</span>

                          {/* Quick Stage Mover */}
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                            className="bg-white border-2 border-border text-foreground font-bold rounded-sm px-2 py-0.5 text-[10px] focus:outline-none focus:border-foreground cursor-pointer"
                          >
                            {columns.map((c) => (
                              <option key={c.id} value={c.id} className="bg-white text-foreground">
                                {c.title}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Card>
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
