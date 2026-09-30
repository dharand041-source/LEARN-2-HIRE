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

  const columns: { id: ApplicationStatus; title: string; topBorder: string; headerBg: string; headerText: string; badgeBg: string; badgeText: string }[] = [
    { id: "Saved", title: "Saved", topBorder: "border-t-4 border-t-black", headerBg: "bg-black", headerText: "text-white", badgeBg: "bg-white/20", badgeText: "text-white" },
    { id: "Approved", title: "Readiness Approved", topBorder: "border-t-4 border-t-royal-maroon", headerBg: "bg-royal-maroon", headerText: "text-white", badgeBg: "bg-electric-coral", badgeText: "text-black" },
    { id: "Applied", title: "Applied", topBorder: "border-t-4 border-t-black", headerBg: "bg-black", headerText: "text-white", badgeBg: "bg-white/20", badgeText: "text-white" },
    { id: "Assessment", title: "Assessment Active", topBorder: "border-t-4 border-t-electric-coral", headerBg: "bg-electric-coral", headerText: "text-black", badgeBg: "bg-black", badgeText: "text-electric-coral" },
    { id: "Interview", title: "Interviewing", topBorder: "border-t-4 border-t-royal-maroon", headerBg: "bg-royal-maroon", headerText: "text-white", badgeBg: "bg-electric-coral", badgeText: "text-black" },
    { id: "Selected", title: "Offers / Selected", topBorder: "border-t-4 border-t-electric-coral", headerBg: "bg-black", headerText: "text-white", badgeBg: "bg-electric-coral", badgeText: "text-black" },
    { id: "Rejected", title: "Outcome Analyzed", topBorder: "border-t-4 border-t-royal-maroon", headerBg: "bg-royal-maroon", headerText: "text-white", badgeBg: "bg-black", badgeText: "text-white" },
  ];

  const handleStatusChange = (appId: string, newStatus: ApplicationStatus) => {
    updateApplicationStatus(appId, newStatus);
  };

  return (
    <div className="space-y-8 animate-fade-in bg-white text-black min-h-screen">
      {/* Electric Coral Hero Section */}
      <div className="rounded-2xl bg-electric-coral text-black border-4 border-black p-8 sm:p-10 shadow-editorial-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black text-white border-2 border-black text-xs font-mono font-black uppercase tracking-widest">
              <span>Phase 14 // Application Tracker</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black uppercase tracking-tight text-black leading-tight">
              Application Lifecycle Kanban
            </h1>
            <p className="text-black/90 text-sm sm:text-base leading-relaxed font-medium">
              Track verified candidate applications across 7 progressive recruitment stages. Applications with turn-down outcomes automatically trigger root-cause remediation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/feedback">
              <button className="px-4 py-2.5 rounded-lg bg-black text-white hover:bg-white hover:text-black border-2 border-black font-black text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
                <TrendingUp className="w-3.5 h-3.5 text-electric-coral" />
                <span>Retraining Engine</span>
              </button>
            </Link>
            <Link href="/opportunities">
              <button className="px-5 py-2.5 rounded-lg bg-royal-maroon hover:bg-black text-white border-2 border-black font-black text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-editorial-xs">
                <span>Find Opportunities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
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
                className={`w-80 rounded-xl bg-surface border-2 border-black flex flex-col max-h-[750px] shadow-editorial-sm ${col.topBorder}`}
              >
                {/* Column Header Carrying Color Identity */}
                <div className={`p-4 border-b-2 border-black flex items-center justify-between ${col.headerBg} ${col.headerText}`}>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-black uppercase font-mono tracking-wider">{col.title}</h3>
                    <span className={`px-2 py-0.5 rounded-sm border border-black/40 text-[10px] font-mono font-extrabold ${col.badgeBg} ${col.badgeText}`}>
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
                        className="p-4 space-y-3 bg-white border-2 border-black shadow-editorial-xs"
                      >
                        {/* Card Header */}
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase truncate">{app.company}</span>
                            <span className="font-mono text-xs font-black text-black px-1.5 py-0.5 rounded-sm bg-electric-coral border border-black">{app.matchScore}%</span>
                          </div>
                          <h4 className="text-xs font-black text-black leading-tight">
                            {app.role}
                          </h4>
                          <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1 font-mono font-bold">
                            <DollarSign className="w-3 h-3 text-royal-maroon" /> {app.salary}
                          </p>
                        </div>

                        {/* Notes */}
                        {app.notes && (
                          <p className="text-[10px] text-black bg-surface p-2 rounded-md border border-black/20 leading-relaxed font-mono font-medium">
                            {app.notes}
                          </p>
                        )}

                        {/* Special Action for Rejected Cards: Rejection Analysis Link */}
                        {col.id === "Rejected" && (
                          <div className="pt-2 border-t-2 border-black/10">
                            <Link href="/feedback">
                              <button className="w-full py-1.5 px-2 rounded-md bg-royal-maroon hover:bg-black text-white font-extrabold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-black">
                                <TrendingUp className="w-3 h-3" />
                                <span>Inspect Retraining Plan</span>
                              </button>
                            </Link>
                          </div>
                        )}

                        {/* Bottom Row: Move Stage Dropdown & Date */}
                        <div className="pt-2 border-t-2 border-black/10 flex items-center justify-between text-[10px] font-mono">
                          <span className="text-muted-foreground font-bold">{app.appliedDate}</span>

                          {/* Quick Stage Mover */}
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                            className="bg-white border-2 border-black text-black font-extrabold rounded-md px-2 py-0.5 text-[10px] focus:outline-none cursor-pointer"
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
