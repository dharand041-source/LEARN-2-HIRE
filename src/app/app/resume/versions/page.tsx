"use client";

import React from "react";
import Link from "next/link";
import { Copy, ArrowRight, CheckCircle2, FileText, Download } from "lucide-react";
import { ResumeNav } from "@/components/resume/ResumeNav";
import { ROUTES } from "@/lib/routes";

const RESUME_VERSIONS = [
  {
    id: "ver-fs",
    title: "Full-Stack Developer (Default Canonical)",
    roleFocus: "React, Node.js, Express, PostgreSQL",
    lastEdited: "2026-10-02",
    compatibility: "88/100",
    isDefault: true,
  },
  {
    id: "ver-be",
    title: "Backend / Distributed Systems Specialist",
    roleFocus: "Go, Node.js, Microservices, Redis, Kafka",
    lastEdited: "2026-09-28",
    compatibility: "84/100",
    isDefault: false,
  },
  {
    id: "ver-fe",
    title: "Frontend & UI Engineering Lead",
    roleFocus: "React, Next.js, TypeScript, Tailwind, Web Performance",
    lastEdited: "2026-09-25",
    compatibility: "86/100",
    isDefault: false,
  },
];

export default function ResumeVersionsPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ResumeNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Tailored Profiles
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Target-Role Resume Versions
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Maintain specific resume variants optimized for different job profiles while preserving verified facts.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {RESUME_VERSIONS.map((v) => (
          <div
            key={v.id}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {v.isDefault && (
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-500 text-[10px] font-mono font-bold uppercase">
                    Default
                  </span>
                )}
                <h3 className="text-base font-black uppercase text-black">{v.title}</h3>
              </div>
              <p className="text-xs font-mono text-royal-maroon font-bold">{v.roleFocus}</p>
              <p className="text-[11px] font-mono text-muted">
                Last modified: {v.lastEdited} • Learn-2-Hire compatibility estimate: <strong className="text-black">{v.compatibility}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href={ROUTES.app.resume.builder}>
                <button className="px-4 py-2 bg-stone-100 hover:bg-black hover:text-white text-black border border-black font-bold text-xs uppercase tracking-wider transition-colors">
                  Edit Version
                </button>
              </Link>
              <Link href={ROUTES.app.resume.analyzer}>
                <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors shadow-editorial-xs">
                  Analyze
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
