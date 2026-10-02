"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Target,
  ArrowRight,
  CheckCircle2,
  Calendar,
  DollarSign,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { CAREER_ROLES } from "@/data/careers";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { userRepo } from "@/services/domainServices";
import { ROUTES } from "@/lib/routes";

export default function CareerGoalsPage() {
  const { userProfile, selectedRole, selectRole, updateUserProfile } = useCareer();

  const [targetRoleId, setTargetRoleId] = useState(selectedRole.id);
  const [targetTimeline, setTargetTimeline] = useState("12 Weeks (Full-Time Track)");
  const [salaryGoal, setSalaryGoal] = useState(selectedRole.averageSalary);
  const [targetWorkMode, setTargetWorkMode] = useState("Hybrid / Remote");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const activeRole = CAREER_ROLES.find((r) => r.id === targetRoleId) || selectedRole;

  const handleSaveGoals = async () => {
    selectRole(targetRoleId);
    updateUserProfile({
      targetRole: activeRole.title,
      targetCategory: activeRole.category,
    });
    await userRepo.setTargetRole(targetRoleId);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in bg-white pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Career Strategy
          </span>
          <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
            Target Milestones & Timeline
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
          Set Your Engineering Career Goals
        </h1>
        <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
          Configure your target position, compensation objective, and timeline to personalize your automated daily roadmap and job matching filters.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-electric-coral border-2 border-black text-black font-black text-xs flex items-center gap-2 shadow-editorial-xs">
          <CheckCircle2 className="w-5 h-5" />
          <span>Career goals updated successfully! Your target roadmap has been re-indexed.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Goal Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-white border-3 border-black shadow-editorial-sm space-y-5">
            <h2 className="text-base font-black uppercase text-black border-b-2 border-black pb-2">
              Core Target Specifications
            </h2>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-black mb-1">
                Target Engineering Role
              </label>
              <select
                value={targetRoleId}
                onChange={(e) => {
                  setTargetRoleId(e.target.value);
                  const newRole = CAREER_ROLES.find((r) => r.id === e.target.value);
                  if (newRole) setSalaryGoal(newRole.averageSalary);
                }}
                className="w-full px-3 py-2.5 rounded-lg border-2 border-black text-xs font-bold bg-white focus:outline-none focus:ring-2 focus:ring-electric-coral"
              >
                {CAREER_ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title} ({r.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-black mb-1">
                  Target Timeline
                </label>
                <select
                  value={targetTimeline}
                  onChange={(e) => setTargetTimeline(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium rounded-lg border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-electric-coral"
                >
                  <option>8 Weeks (Intensive Bootcamp)</option>
                  <option>12 Weeks (Full-Time Track)</option>
                  <option>16 Weeks (Self-Paced Track)</option>
                  <option>6 Months (Long-Term Mastery)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-black mb-1">
                  Desired Compensation
                </label>
                <input
                  type="text"
                  value={salaryGoal}
                  onChange={(e) => setSalaryGoal(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-electric-coral"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-black mb-1">
                Work Mode Preference
              </label>
              <select
                value={targetWorkMode}
                onChange={(e) => setTargetWorkMode(e.target.value)}
                className="w-full px-3 py-2 text-xs font-medium rounded-lg border-2 border-black bg-white focus:outline-none focus:ring-2 focus:ring-electric-coral"
              >
                <option>Hybrid / Remote</option>
                <option>100% Remote</option>
                <option>Onsite / Office</option>
                <option>Flexible / Any</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                onClick={handleSaveGoals}
                className="px-6 py-3 rounded-lg bg-electric-coral hover:bg-black hover:text-white text-black font-black text-xs border-2 border-black transition-colors flex items-center gap-2 shadow-editorial-xs cursor-pointer"
              >
                <span>Save & Recalibrate Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview Card (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-black text-white border-3 border-electric-coral p-6 shadow-editorial-sm space-y-5">
          <div className="flex items-center justify-between border-b border-white/20 pb-3">
            <div>
              <span className="text-[10px] font-mono text-electric-coral uppercase font-bold">Target Blueprint</span>
              <h3 className="text-lg font-black text-white">{activeRole.title}</h3>
            </div>
            <span className="text-xs font-mono font-black text-electric-coral">{salaryGoal}</span>
          </div>

          <p className="text-xs text-white/80 leading-relaxed font-normal">
            {activeRole.description}
          </p>

          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase text-white tracking-wider block">
              Skill Benchmark Distribution:
            </span>
            {activeRole.expectedSkillAreas.map((area) => (
              <div key={area.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white/80 font-medium truncate max-w-[200px]">{area.name}</span>
                  <span className="font-mono text-electric-coral font-bold">{area.weight}%</span>
                </div>
                <ProgressBar value={area.weight} size="sm" variant="electric-coral" />
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/20">
            <Link href={ROUTES.app.assessments.baseline}>
              <button className="w-full py-2.5 rounded-lg bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-black text-xs border-2 border-black transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <span>Start Diagnostic for {activeRole.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
