"use client";

import React from "react";
import Link from "next/link";
import { FolderGit2, CheckCircle2, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ProjectsNav } from "@/components/projects/ProjectsNav";
import { ROUTES } from "@/lib/routes";

export default function MyProjectsPage() {
  const { projects } = useCareer();
  const enrolled = projects.filter((p) => p.status === "In Progress" || p.status === "Completed");

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ProjectsNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Active Enrollments
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            My Enrolled Projects
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Projects actively underway or submitted for automated grading and skill proof verification.
          </p>
        </div>

        <Link href={ROUTES.app.projects.recommended}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>Browse More Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {enrolled.map((p) => (
          <div
            key={p.id}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-500">
                  {p.status}
                </span>
                <h3 className="text-base font-black uppercase text-black">{p.title}</h3>
              </div>
              <p className="text-xs text-muted max-w-xl">{p.description}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href={ROUTES.app.projects.workspace(p.id)}>
                <button className="px-4 py-2 bg-stone-100 hover:bg-black hover:text-white text-black border border-black font-bold text-xs uppercase tracking-wider transition-colors">
                  Workspace
                </button>
              </Link>
              <Link href={ROUTES.app.projects.submit(p.id)}>
                <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                  <span>Submit Work</span>
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
