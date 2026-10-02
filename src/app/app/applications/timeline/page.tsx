"use client";

import React from "react";
import Link from "next/link";
import { Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ApplicationsNav } from "@/components/applications/ApplicationsNav";
import { ROUTES } from "@/lib/routes";

export default function ApplicationsTimelinePage() {
  const { applications } = useCareer();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ApplicationsNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Chronological Audit
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Application Pipeline Timeline
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Chronological record of applications, status updates, interview schedules, and outcomes.
          </p>
        </div>
      </div>

      <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-5 bg-paper border border-black/20 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono font-bold uppercase">{app.company}</span>
                  <span className="px-2 py-0.5 bg-white border border-black text-[10px] font-mono font-bold uppercase">{app.status}</span>
                </div>
                <h3 className="text-base font-black uppercase text-black">{app.role}</h3>
                <p className="text-xs text-muted">{app.location} • Applied: {app.appliedDate || "2026-10-02"}</p>
              </div>

              <Link href={ROUTES.app.applications.detail(app.id)}>
                <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                  <span>View Event Timeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
