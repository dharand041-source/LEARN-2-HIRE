"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  ArrowRight,
  TrendingUp,
  Briefcase,
  ExternalLink,
  Plus,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ApplicationStatus } from "@/types";
import { ApplicationsNav } from "@/components/applications/ApplicationsNav";
import { ROUTES } from "@/lib/routes";

const COLUMNS: { id: ApplicationStatus; title: string; topBorder: string }[] = [
  { id: "Saved", title: "Saved", topBorder: "border-t-4 border-t-black" },
  { id: "Approved", title: "Ready to Apply", topBorder: "border-t-4 border-t-royal-maroon" },
  { id: "Applied", title: "Applied", topBorder: "border-t-4 border-t-black" },
  { id: "Assessment", title: "Assessment", topBorder: "border-t-4 border-t-electric-coral" },
  { id: "Interview", title: "Interview", topBorder: "border-t-4 border-t-royal-maroon" },
  { id: "Selected", title: "Offers / Hired", topBorder: "border-t-4 border-t-emerald-600" },
  { id: "Rejected", title: "Rejected / Closed", topBorder: "border-t-4 border-t-rose-600" },
];

export default function ApplicationsKanbanPage() {
  const { applications, updateApplicationStatus } = useCareer();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ApplicationsNav />

      {/* Hero Banner */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
              Application Tracker
            </span>
            <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
              Recruitment Lifecycle
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
            Application Pipeline Kanban
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
            Track interview invitations, assessment deadlines, offer negotiations, and turn-down post-mortems.
          </p>
        </div>

        <Link href={ROUTES.app.opportunities.jobs}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-editorial-xs cursor-pointer">
            <span>Find More Roles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      {/* Kanban Board Container with horizontal scroll */}
      <div className="overflow-x-auto pb-6">
        <div className="flex gap-4 min-w-[1300px]">
          {COLUMNS.map((col) => {
            const colApps = applications.filter((a) => a.status === col.id);

            return (
              <div
                key={col.id}
                className={`w-80 rounded-xl bg-white border-2 border-black flex flex-col max-h-[750px] shadow-editorial-sm ${col.topBorder}`}
              >
                {/* Column Header */}
                <div className="p-3 border-b-2 border-black flex items-center justify-between bg-stone-50">
                  <h3 className="text-xs font-black uppercase text-black">
                    {col.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black text-white">
                    {colApps.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="p-3 overflow-y-auto space-y-3 flex-1">
                  {colApps.length === 0 ? (
                    <div className="p-4 text-center border-2 border-dashed border-black/20 rounded-lg">
                      <span className="text-[11px] font-mono text-muted uppercase">No Applications</span>
                    </div>
                  ) : (
                    colApps.map((app) => (
                      <div
                        key={app.id}
                        className="p-4 rounded-lg bg-paper border-2 border-black space-y-3 shadow-editorial-xs hover:border-royal-maroon transition-all"
                      >
                        <div className="space-y-1">
                          <span className="px-1.5 py-0.5 rounded bg-black text-white text-[9px] font-mono font-bold uppercase">
                            {app.company}
                          </span>
                          <h4 className="text-xs font-black uppercase text-black line-clamp-1">
                            {app.role}
                          </h4>
                          <span className="text-[10px] font-mono text-muted block">{app.location}</span>
                        </div>

                        {app.salary && (
                          <div className="text-[11px] font-mono text-black font-semibold">
                            {app.salary}
                          </div>
                        )}

                        <div className="pt-2 border-t border-black/10 flex items-center justify-between">
                          <select
                            value={app.status}
                            onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                            className="text-[10px] font-bold bg-white border border-black/30 px-2 py-1 focus:outline-none"
                          >
                            <option value="Saved">Saved</option>
                            <option value="Approved">Ready</option>
                            <option value="Applied">Applied</option>
                            <option value="Assessment">Assessment</option>
                            <option value="Interview">Interview</option>
                            <option value="Selected">Offer</option>
                            <option value="Rejected">Rejected</option>
                          </select>

                          <Link href={ROUTES.app.applications.detail(app.id)}>
                            <span className="text-[11px] font-bold text-royal-maroon uppercase hover:underline flex items-center gap-1">
                              Details <ArrowRight className="w-3 h-3" />
                            </span>
                          </Link>
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
