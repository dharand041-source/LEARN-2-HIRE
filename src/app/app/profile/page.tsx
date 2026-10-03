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
      <div className="rounded-2xl bg-ink-black text-paper-white border-4 border-ink-black p-6 sm:p-8 shadow-editorial-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary-orange text-paper-white flex items-center justify-center font-black text-2xl font-mono shrink-0 border-2 border-ink-black shadow-editorial-xs">
              {userProfile.name.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-paper-white tracking-tight">
                  {userProfile.name}
                </h1>
                <span className="px-2 py-0.5 rounded bg-golden-yellow text-ink-black text-[11px] font-mono font-extrabold border border-ink-black">
                  Verified Candidate
                </span>
              </div>
              <p className="text-xs sm:text-sm text-primary-orange font-mono font-extrabold">
                Target Role: {userProfile.targetRole}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-paper-white/80 pt-1 font-mono">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-primary-orange" /> {userProfile.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-paper-white" /> {resumeData.personalInfo.location || "India"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-golden-yellow font-bold">
                  <Flame className="w-3.5 h-3.5 fill-golden-yellow text-golden-yellow" /> {userProfile.streakDays}-Day Streak
                </span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-paper-white/20">
            <div className="text-right">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-golden-yellow">
                {userProfile.readinessScore}%
              </span>
              <p className="text-[10px] text-paper-white/70 uppercase font-mono font-extrabold tracking-wider">
                Readiness Score
              </p>
            </div>
            <Link href={ROUTES.app.settings}>
              <button className="px-4 py-2 bg-primary-orange hover:bg-rose text-paper-white border-2 border-ink-black font-bold text-xs transition-colors cursor-pointer shadow-editorial-xs">
                Edit Preferences
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Verified Skills & Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-paper-white border-2 border-ink-black shadow-editorial-sm space-y-4">
          <h2 className="text-xs font-black uppercase tracking-wider text-ink-black">
            Verified Competencies
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills[0]?.items.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-warm-cream border border-ink-black text-xs font-bold text-ink-black flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary-orange" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 bg-paper-white border-2 border-ink-black shadow-editorial-sm space-y-4">
          <h2 className="text-xs font-black uppercase tracking-wider text-ink-black">
            Verified Proof Links
          </h2>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-warm-cream border border-ink-black/20 flex justify-between items-center text-ink-black">
              <span>GitHub Portfolio Repository</span>
              <span className="font-mono text-primary-orange font-bold">Verified Active</span>
            </div>
            <div className="p-3 bg-warm-cream border border-ink-black/20 flex justify-between items-center text-ink-black">
              <span>Baseline Diagnostic Test</span>
              <span className="font-mono text-rose font-bold">Grade: 72% Passed</span>
            </div>
            <div className="p-3 bg-warm-cream border border-ink-black/20 flex justify-between items-center text-ink-black">
              <span>Mock Voice Defense</span>
              <span className="font-mono text-golden-yellow font-bold">Score: 88/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
