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
    <div className="space-y-8 animate-fade-in bg-warm-cream text-ink-black min-h-screen pb-16">
      {/* Primary Orange Career Discovery Hero Section */}
      <div className="rounded-2xl bg-primary-orange text-paper-white border-4 border-ink-black p-8 sm:p-10 shadow-editorial-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-ink-black text-paper-white border-2 border-ink-black text-xs font-mono font-extrabold uppercase tracking-widest">
              <span>Candidate Setup // Step 1 of 8</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-paper-white leading-tight">
              Initialize Your Career Pathway
            </h1>
            <p className="text-paper-white/95 text-sm sm:text-base leading-relaxed">
              Define your background, specify your target role, and instantly generate your baseline diagnostic assessment and personalized curriculum.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleStartAssessment}
              className="px-6 py-3.5 rounded-lg bg-paper-white hover:bg-warm-cream text-ink-black border-2 border-ink-black font-black text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs"
            >
              <span>Begin {currentRole.title} Assessment</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Candidate Background & Goals Intake Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-paper-white border-3 border-ink-black shadow-editorial-md space-y-6 text-ink-black">
        <div className="flex items-center gap-2 border-b-2 border-ink-black pb-3">
          <User className="w-5 h-5 text-primary-orange" />
          <h2 className="text-lg font-display font-black uppercase text-ink-black">
            Candidate Profile & Career Objectives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          <div>
            <label className="block font-bold font-mono text-ink-black uppercase mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-ink-black bg-paper-white text-ink-black focus:outline-none focus:ring-2 focus:ring-primary-orange font-medium"
            />
          </div>

          <div>
            <label className="block font-bold font-mono text-ink-black uppercase mb-1">
              Highest Education
            </label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-ink-black bg-paper-white text-ink-black focus:outline-none focus:ring-2 focus:ring-primary-orange font-medium"
            />
          </div>

          <div>
            <label className="block font-bold font-mono text-ink-black uppercase mb-1">
              Experience Level
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-ink-black bg-paper-white text-ink-black focus:outline-none focus:ring-2 focus:ring-primary-orange font-medium"
            >
              <option>Student / Final Year</option>
              <option>Entry Level / Fresher</option>
              <option>1-3 Years Experience (Junior/Mid)</option>
              <option>3+ Years Experience (Senior)</option>
              <option>Career Transitioner</option>
            </select>
          </div>

          <div>
            <label className="block font-bold font-mono text-ink-black uppercase mb-1">
              Preferred Work Type
            </label>
            <select
              value={preferredWorkType}
              onChange={(e) => setPreferredWorkType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-ink-black bg-paper-white text-ink-black focus:outline-none focus:ring-2 focus:ring-primary-orange font-medium"
            >
              <option>Hybrid / Remote</option>
              <option>100% Remote</option>
              <option>Onsite / Office</option>
              <option>Flexible / Any</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-bold font-mono text-ink-black uppercase mb-1">
              Current Technical Skills (Comma separated)
            </label>
            <input
              type="text"
              value={currentSkillsInput}
              onChange={(e) => setCurrentSkillsInput(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-ink-black bg-paper-white text-ink-black focus:outline-none focus:ring-2 focus:ring-primary-orange font-medium"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block font-bold font-mono text-ink-black uppercase mb-1">
              Career Goal & Dream Technical Role
            </label>
            <input
              type="text"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border-2 border-ink-black bg-paper-white text-ink-black focus:outline-none focus:ring-2 focus:ring-primary-orange font-medium"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Categories on Left, Selected Role Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Accordion Category List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-ink-black pb-2">
            <span className="text-xs uppercase font-mono tracking-wider font-bold text-ink-black">
              Select Your Target Career Discipline
            </span>
            <span className="text-[11px] text-ink-black/70 font-mono font-bold">
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
                      ? "border-ink-black bg-paper-white shadow-editorial-xs"
                      : "border-ink-black/30 bg-paper-white"
                  }`}
                >
                  {/* Category Header Accordion Button */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-warm-cream/50 rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full border border-ink-black ${
                          hasSelectedRole ? "bg-primary-orange" : "bg-ink-black/20"
                        }`}
                      />
                      <span className="font-extrabold text-sm text-ink-black">
                        {category}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-ink-black bg-warm-cream px-2 py-0.5 rounded border border-ink-black/20">
                        {rolesInCategory.length} roles
                      </span>
                    </div>

                    <div className="text-ink-black/70">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Role Cards inside Category */}
                  {isExpanded && (
                    <div className="p-3 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-ink-black/15 mt-1">
                      {rolesInCategory.map((role) => {
                        const isSelected = currentRole.id === role.id;
                        return (
                          <button
                            key={role.id}
                            onClick={() => handleSelectRole(role)}
                            className={`p-3 rounded-lg text-left transition-all border-2 flex flex-col justify-between cursor-pointer ${
                              isSelected
                                ? "bg-rose border-ink-black text-paper-white shadow-editorial-xs"
                                : "bg-paper-white border-ink-black/20 hover:border-ink-black text-ink-black"
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-extrabold text-xs">{role.title}</span>
                                {isSelected && (
                                  <CheckCircle2 className="w-4 h-4 text-golden-yellow shrink-0" />
                                )}
                              </div>
                              <p
                                className={`text-[11px] leading-tight line-clamp-2 ${
                                  isSelected ? "text-paper-white/90" : "text-ink-black/70"
                                }`}
                              >
                                {role.shortDesc}
                              </p>
                            </div>

                            <div
                              className={`mt-2 pt-2 border-t flex items-center justify-between text-[10px] font-mono font-bold ${
                                isSelected ? "border-paper-white/20 text-golden-yellow" : "border-ink-black/15 text-ink-black"
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
        <div className="lg:col-span-5 sticky top-20 rounded-2xl bg-paper-white border-3 border-ink-black p-6 shadow-editorial-md space-y-6 text-ink-black">
          <div className="space-y-2 border-b-2 border-ink-black/15 pb-4">
            <div className="flex items-center justify-between">
              <Badge variant="primary" size="sm">
                Target Specialization
              </Badge>
              <span className="text-xs font-mono font-extrabold text-primary-orange">
                {currentRole.growthRate}
              </span>
            </div>
            <h2 className="text-2xl font-display font-extrabold text-ink-black tracking-tight">
              {currentRole.title}
            </h2>
            <p className="text-xs text-ink-black/75 leading-relaxed">
              {currentRole.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-warm-cream border border-ink-black/20">
              <span className="text-[10px] font-mono text-ink-black/70 uppercase font-bold block">
                Avg Benchmark
              </span>
              <span className="text-sm font-mono font-extrabold text-ink-black">
                {currentRole.averageSalary}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-warm-cream border border-ink-black/20">
              <span className="text-[10px] font-mono text-ink-black/70 uppercase font-bold block">
                Open Positions
              </span>
              <span className="text-sm font-mono font-extrabold text-ink-black">
                {currentRole.openRolesCount}+ Active
              </span>
            </div>

            <div className="p-3 rounded-lg bg-warm-cream border border-ink-black/20">
              <span className="text-[10px] font-mono text-ink-black/70 uppercase font-bold block">
                Initial Diagnostic
              </span>
              <span className="text-sm font-mono font-extrabold text-ink-black">
                {currentRole.assessmentDuration} (10 Qs)
              </span>
            </div>

            <div className="p-3 rounded-lg bg-warm-cream border border-ink-black/20">
              <span className="text-[10px] font-mono text-ink-black/70 uppercase font-bold block">
                Estimated Roadmap
              </span>
              <span className="text-sm font-mono font-extrabold text-ink-black">
                {currentRole.learningPathLength}
              </span>
            </div>
          </div>

          {/* Expected Skill Areas & Weights */}
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono tracking-wider font-extrabold text-ink-black block">
              Skill Evaluation Weights
            </span>
            <div className="space-y-2.5">
              {currentRole.expectedSkillAreas.map((area) => (
                <div key={area.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-ink-black truncate max-w-[200px]">
                      {area.name}
                    </span>
                    <span className="font-mono font-extrabold text-primary-orange">{area.weight}%</span>
                  </div>
                  <ProgressBar value={area.weight} size="sm" variant="primary-orange" />
                  <p className="text-[10px] text-ink-black/70 leading-tight">{area.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleStartAssessment}
              className="w-full py-3.5 px-4 rounded-xl bg-primary-orange hover:bg-rose text-paper-white font-black text-xs sm:text-sm border-2 border-ink-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-editorial-xs"
            >
              <span>Confirm Track & Start Baseline Diagnostic</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <p className="text-[10px] text-center text-ink-black/70 font-mono mt-2">
              Saves target role & routes directly to /app/assessments/baseline
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
