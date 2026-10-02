"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Clock,
  CheckCircle2,
  ArrowRight,
  Award,
  Sparkles,
  ExternalLink,
  Code2,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ProjectsNav } from "@/components/projects/ProjectsNav";
import { ROUTES } from "@/lib/routes";

export default function ProjectsOverviewPage() {
  const { projects, selectedRole } = useCareer();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const completedCount = projects.filter((p) => p.status === "Completed").length;
  const inProgressCount = projects.filter((p) => p.status === "In Progress").length;

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "in_progress") return p.status === "In Progress";
    if (activeFilter === "completed") return p.status === "Completed";
    if (activeFilter === "not_started") return p.status === "Not Started";
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ProjectsNav />

      {/* Top Banner */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
              Phase 06 Capstone
            </span>
            <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
              Real-World Engineering Projects
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
            Production-Grade Projects Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 font-medium">
            Architect, deploy, and verify full-stack applications. Completed submissions generate verifiable skill proof for hiring employers.
          </p>
        </div>

        <Link href={ROUTES.app.projects.recommended}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>Recommended for You</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      {/* Quick Filter */}
      <div className="flex items-center justify-between gap-4 flex-wrap bg-white p-4 border-2 border-black shadow-editorial-xs">
        <div className="flex items-center gap-2">
          {["all", "in_progress", "completed", "not_started"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-1.5 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer border ${
                activeFilter === tab
                  ? "bg-royal-maroon text-white border-black"
                  : "bg-surface-subtle text-muted hover:text-black border-black/20"
              }`}
            >
              {tab.replace("_", " ")}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono font-bold text-muted">
          Showing {filteredProjects.length} Projects
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col justify-between space-y-4 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                  {p.estimatedDuration} • {p.difficulty}
                </span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-black uppercase border ${
                    p.status === "Completed"
                      ? "bg-emerald-100 text-emerald-900 border-emerald-500"
                      : p.status === "In Progress"
                      ? "bg-amber-100 text-amber-900 border-amber-500"
                      : "bg-stone-100 text-stone-800 border-stone-400"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <h3 className="text-lg font-black uppercase tracking-tight text-black">
                {p.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed line-clamp-3">
                {p.description}
              </p>

              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {p.skillsTested.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-stone-100 text-[10px] font-mono font-bold border border-black/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-3">
              <Link href={ROUTES.app.projects.workspace(p.id)}>
                <button className="px-4 py-2 bg-stone-100 hover:bg-black hover:text-white text-black font-extrabold text-xs uppercase tracking-wider border border-black transition-colors">
                  Open Workspace
                </button>
              </Link>

              <Link href={ROUTES.app.projects.submit(p.id)}>
                <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                  <span>Submit Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
