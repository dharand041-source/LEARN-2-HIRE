"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FolderGit2, CheckCircle2, ArrowRight, ArrowLeft, ExternalLink, Terminal } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ProjectsNav } from "@/components/projects/ProjectsNav";
import { ROUTES } from "@/lib/routes";

const MILESTONES = [
  { id: "m1", title: "Git Repository & Scaffolding", desc: "Initialize repository, configure TypeScript, ESLint, and setup environment configs." },
  { id: "m2", title: "Database Schema & Migrations", desc: "Define relational models, foreign key constraints, and seed testing fixtures." },
  { id: "m3", title: "Core Business Logic & API Routes", desc: "Implement endpoints with input validation schema and authentication middleware." },
  { id: "m4", title: "Automated Integration Test Suite", desc: "Write Jest or Vitest test suites verifying critical edge cases and failure modes." },
  { id: "m5", title: "Public Deployment & Documentation", desc: "Deploy to Vercel/Render, configure production environment variables, and draft README." },
];

export default function ProjectWorkspacePage() {
  const params = useParams();
  const projectId = (params?.id as string) || "proj-1";
  const { projects } = useCareer();
  const [completedMilestones, setCompletedMilestones] = useState<Set<string>>(new Set(["m1"]));

  const project = projects.find((p) => p.id === projectId) || {
    id: projectId,
    title: "Production Authentication & Access Control Engine",
  };

  const toggleMilestone = (id: string) => {
    setCompletedMilestones((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ProjectsNav />

      <div className="flex items-center gap-2">
        <Link href={ROUTES.app.projects.detail(projectId)} className="text-xs font-bold text-muted hover:text-black flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Project Detail</span>
        </Link>
      </div>

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Development Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            {project.title}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Track implementation milestones, run automated checks, and prepare artifacts for final evaluation.
          </p>
        </div>

        <Link href={ROUTES.app.projects.submit(projectId)}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-editorial-xs">
            <span>Ready to Submit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
        <h2 className="text-sm font-black uppercase text-black">Implementation Milestones</h2>

        <div className="space-y-3">
          {MILESTONES.map((m, idx) => {
            const isDone = completedMilestones.has(m.id);
            return (
              <div
                key={m.id}
                onClick={() => toggleMilestone(m.id)}
                className={`p-4 border-2 transition-all flex items-start gap-4 cursor-pointer ${
                  isDone
                    ? "bg-emerald-50 border-emerald-500 text-emerald-950"
                    : "bg-paper border-black/20 hover:border-black text-black"
                }`}
              >
                <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 border ${isDone ? "bg-emerald-600 text-white border-emerald-700" : "bg-white border-black/30"}`}>
                  {isDone && <CheckCircle2 className="w-4 h-4" />}
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase font-bold text-muted">
                    Milestone 0{idx + 1}
                  </span>
                  <h3 className="text-sm font-bold uppercase">{m.title}</h3>
                  <p className="text-xs opacity-80">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
