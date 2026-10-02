"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Flame,
  CheckCircle2,
  FolderGit2,
  Briefcase,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ROUTES } from "@/lib/routes";

export default function CandidateProfilePage() {
  const { userProfile, projects, achievements, applications, resumeData } = useCareer();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Profile Hero Header */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-electric-coral text-black flex items-center justify-center font-black text-2xl font-mono shrink-0 border-2 border-black shadow-editorial-xs">
              {userProfile.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {userProfile.name}
                </h1>
                <span className="px-2 py-0.5 rounded bg-electric-coral text-black text-[11px] font-mono font-extrabold border border-black">
                  Verified Candidate
                </span>
              </div>
              <p className="text-xs sm:text-sm text-electric-coral font-mono font-extrabold">
                Target Role: {userProfile.targetRole}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/80 pt-1 font-mono">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-electric-coral" /> {userProfile.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-white" /> {resumeData.personalInfo.location || "India"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-electric-coral font-bold">
                  <Flame className="w-3.5 h-3.5 fill-electric-coral" /> {userProfile.streakDays}-Day Streak
                </span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/20">
            <div className="text-right">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-electric-coral">
                {userProfile.readinessScore}%
              </span>
              <p className="text-[10px] text-white/70 uppercase font-mono font-extrabold tracking-wider">
                Readiness Score
              </p>
            </div>
            <Link href={ROUTES.app.settings}>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border-2 border-white/40 font-bold text-xs transition-colors cursor-pointer">
                Edit Preferences
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Verified Skills & Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
          <h2 className="text-xs font-black uppercase tracking-wider text-black">
            Verified Competencies
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills[0]?.items.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-paper border border-black text-xs font-bold text-black flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
          <h2 className="text-xs font-black uppercase tracking-wider text-black">
            Verified Proof Links
          </h2>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-paper border border-black/20 flex justify-between items-center">
              <span>GitHub Portfolio Repository</span>
              <span className="font-mono text-royal-maroon font-bold">Verified Active</span>
            </div>
            <div className="p-3 bg-paper border border-black/20 flex justify-between items-center">
              <span>Baseline Diagnostic Test</span>
              <span className="font-mono text-emerald-700 font-bold">Grade: 72% Passed</span>
            </div>
            <div className="p-3 bg-paper border border-black/20 flex justify-between items-center">
              <span>Mock Voice Defense</span>
              <span className="font-mono text-emerald-700 font-bold">Score: 88/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
