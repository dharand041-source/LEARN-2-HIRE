"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  User,
  GraduationCap,
  Briefcase,
  Target,
  Sparkles,
  Layers,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { CAREER_ROLES } from "@/data/careers";
import { CAREER_CATEGORIES } from "@/lib/constants";
import { CareerRole } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { onboardingService, userRepo } from "@/services/domainServices";
import { ROUTES } from "@/lib/routes";

export default function OnboardingPage() {
  const router = useRouter();
  const { selectedRole, selectRole, updateUserProfile } = useCareer();

  // Onboarding Form State
  const [name, setName] = useState("Alex Morgan");
  const [education, setEducation] = useState("B.Tech / B.E. in Computer Science");
  const [experienceLevel, setExperienceLevel] = useState("Entry Level / Fresher");
  const [currentSkillsInput, setCurrentSkillsInput] = useState("JavaScript, HTML, CSS, Git, Basic React");
  const [careerInterests, setCareerInterests] = useState("Full-Stack Web Development, Scalable APIs");
  const [careerGoal, setCareerGoal] = useState("Land a high-growth Software Engineer role at a top tech company or funded startup");
  const [preferredWorkType, setPreferredWorkType] = useState("Hybrid / Remote");

  const [currentRole, setCurrentRole] = useState<CareerRole>(
    CAREER_ROLES.find((r) => r.id === "full-stack-developer" || r.id === "full-stack-dev") || selectedRole
  );

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    "Software Development & Engineering": true,
  });

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const handleSelectRole = (role: CareerRole) => {
    setCurrentRole(role);
    selectRole(role.id);
  };

  const handleStartAssessment = async () => {
    selectRole(currentRole.id);

    const skillsArray = currentSkillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    await onboardingService.submitOnboarding({
      fullName: name,
      education,
      experienceLevel,
      currentSkills: skillsArray,
      careerGoal,
      targetRole: currentRole.title,
      preferredWorkType,
    });

    updateUserProfile({
      name,
      targetRole: currentRole.title,
      targetCategory: currentRole.category,
    });

    router.push(ROUTES.app.assessments.baseline);
  };

  return (
    <div className="space-y-8 animate-fade-in bg-background text-foreground min-h-screen pb-16">
      {/* Royal Maroon Career Discovery Hero Section */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-8 sm:p-10 shadow-editorial-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black text-electric-coral border-2 border-black text-xs font-mono font-extrabold uppercase tracking-widest">
              <span>Candidate Setup // Step 1 of 8</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-white leading-tight">
              Initialize Your Career Pathway
            </h1>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Define your background, specify your target role, and instantly generate your baseline diagnostic assessment and personalized curriculum.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleStartAssessment}
              className="px-6 py-3.5 rounded-lg bg-electric-coral hover:bg-white text-black border-2 border-black font-black text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs"
            >
              <span>Begin {currentRole.title} Assessment</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Candidate Background & Goals Intake Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border-3 border-black shadow-editorial-md space-y-6">
        <div className="flex items-center gap-2 border-b-2 border-black pb-3">
          <User className="w-5 h-5 text-royal-maroon" />
          <h2 className="text-lg font-display font-black uppercase text-black">
            Candidate Profile & Career Objectives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          <div>
            <label className="block font-bold font-mono text-black uppercase mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-electric-coral font-medium"
            />
          </div>

          <div>
            <label className="block font-bold font-mono text-black uppercase mb-1">
              Highest Education
            </label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-electric-coral font-medium"
            />
          </div>

          <div>
            <label className="block font-bold font-mono text-black uppercase mb-1">
              Experience Level
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-electric-coral font-medium bg-white"
            >
              <option>Student / Final Year</option>
              <option>Entry Level / Fresher</option>
              <option>1-3 Years Experience (Junior/Mid)</option>
              <option>3+ Years Experience (Senior)</option>
              <option>Career Transitioner</option>
            </select>
          </div>

          <div>
            <label className="block font-bold font-mono text-black uppercase mb-1">
              Preferred Work Type
            </label>
            <select
              value={preferredWorkType}
              onChange={(e) => setPreferredWorkType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-electric-coral font-medium bg-white"
            >
              <option>Hybrid / Remote</option>
              <option>100% Remote</option>
              <option>Onsite / Office</option>
              <option>Flexible / Any</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold font-mono text-black uppercase mb-1">
              Current Technical Skills (Comma separated)
            </label>
            <input
              type="text"
              value={currentSkillsInput}
              onChange={(e) => setCurrentSkillsInput(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-electric-coral font-medium"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block font-bold font-mono text-black uppercase mb-1">
              Career Goal & Dream Technical Role
            </label>
            <input
              type="text"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-electric-coral font-medium"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Categories on Left, Selected Role Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Accordion Category List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-border pb-2">
            <span className="text-xs uppercase font-mono tracking-wider font-bold text-foreground">
              Select Your Target Career Discipline
            </span>
            <span className="text-[11px] text-muted-foreground font-mono font-bold">
              {CAREER_ROLES.length} Specializations Available
            </span>
          </div>

          <div className="space-y-3">
            {CAREER_CATEGORIES.map((category) => {
              const rolesInCategory = CAREER_ROLES.filter((r) => r.category === category);
              const isExpanded = !!expandedCategories[category];
              const hasSelectedRole = rolesInCategory.some((r) => r.id === currentRole.id);

              return (
                <div
                  key={category}
                  className={`rounded-xl border-2 transition-all ${
                    hasSelectedRole
                      ? "border-black bg-white shadow-editorial-xs"
                      : "border-border bg-white"
                  }`}
                >
                  {/* Category Header Accordion Button */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-surface/50 rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full border border-black ${
                          hasSelectedRole ? "bg-electric-coral" : "bg-black/20"
                        }`}
                      />
                      <span className="font-extrabold text-sm text-foreground">
                        {category}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-muted bg-surface px-2 py-0.5 rounded border border-border">
                        {rolesInCategory.length} roles
                      </span>
                    </div>

                    <div className="text-muted">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Role Cards inside Category */}
                  {isExpanded && (
                    <div className="p-3 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-border mt-1">
                      {rolesInCategory.map((role) => {
                        const isSelected = currentRole.id === role.id;
                        return (
                          <button
                            key={role.id}
                            onClick={() => handleSelectRole(role)}
                            className={`p-3 rounded-lg text-left transition-all border-2 flex flex-col justify-between cursor-pointer ${
                              isSelected
                                ? "bg-royal-maroon border-black text-white shadow-editorial-xs"
                                : "bg-surface border-border hover:border-black text-foreground"
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-extrabold text-xs">{role.title}</span>
                                {isSelected && (
                                  <CheckCircle2 className="w-4 h-4 text-electric-coral shrink-0" />
                                )}
                              </div>
                              <p
                                className={`text-[11px] leading-tight line-clamp-2 ${
                                  isSelected ? "text-white/80" : "text-muted"
                                }`}
                              >
                                {role.shortDesc}
                              </p>
                            </div>

                            <div
                              className={`mt-2 pt-2 border-t flex items-center justify-between text-[10px] font-mono font-bold ${
                                isSelected ? "border-white/20 text-electric-coral" : "border-border text-foreground"
                              }`}
                            >
                              <span>{role.averageSalary}</span>
                              <span className="opacity-80">{role.learningPathLength}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Selected Role Deep Detail Card (5 cols) */}
        <div className="lg:col-span-5 sticky top-20 rounded-2xl bg-white border-3 border-black p-6 shadow-editorial-md space-y-6">
          <div className="space-y-2 border-b-2 border-border pb-4">
            <div className="flex items-center justify-between">
              <Badge variant="coral" size="sm">
                Target Specialization
              </Badge>
              <span className="text-xs font-mono font-extrabold text-royal-maroon">
                {currentRole.growthRate}
              </span>
            </div>
            <h2 className="text-2xl font-display font-extrabold text-foreground tracking-tight">
              {currentRole.title}
            </h2>
            <p className="text-xs text-muted leading-relaxed">
              {currentRole.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-surface border border-border">
              <span className="text-[10px] font-mono text-muted uppercase font-bold block">
                Avg Benchmark
              </span>
              <span className="text-sm font-mono font-extrabold text-foreground">
                {currentRole.averageSalary}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border">
              <span className="text-[10px] font-mono text-muted uppercase font-bold block">
                Open Positions
              </span>
              <span className="text-sm font-mono font-extrabold text-foreground">
                {currentRole.openRolesCount}+ Active
              </span>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border">
              <span className="text-[10px] font-mono text-muted uppercase font-bold block">
                Initial Diagnostic
              </span>
              <span className="text-sm font-mono font-extrabold text-foreground">
                {currentRole.assessmentDuration} (10 Qs)
              </span>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-border">
              <span className="text-[10px] font-mono text-muted uppercase font-bold block">
                Estimated Roadmap
              </span>
              <span className="text-sm font-mono font-extrabold text-foreground">
                {currentRole.learningPathLength}
              </span>
            </div>
          </div>

          {/* Expected Skill Areas & Weights */}
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider font-extrabold text-foreground block">
              Skill Evaluation Weights
            </span>
            <div className="space-y-2.5">
              {currentRole.expectedSkillAreas.map((area) => (
                <div key={area.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground truncate max-w-[200px]">
                      {area.name}
                    </span>
                    <span className="font-mono font-extrabold text-royal-maroon">{area.weight}%</span>
                  </div>
                  <ProgressBar value={area.weight} size="sm" variant="electric-coral" />
                  <p className="text-[10px] text-muted leading-tight">{area.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleStartAssessment}
              className="w-full py-3.5 px-4 rounded-xl bg-electric-coral hover:bg-black hover:text-white text-black font-black text-xs sm:text-sm border-2 border-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-editorial-xs"
            >
              <span>Confirm Track & Start Baseline Diagnostic</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <p className="text-[10px] text-center text-muted font-mono mt-2">
              Saves target role & routes directly to /app/assessments/baseline
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
