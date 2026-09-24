"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  CheckCircle2,
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  Check,
  Shield,
  BookOpen,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { CAREER_ROLES } from "@/data/careers";
import { CAREER_CATEGORIES } from "@/lib/constants";
import { CareerRole, CareerCategory } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

export default function OnboardingPage() {
  const router = useRouter();
  const { selectedRole, selectRole } = useCareer();

  const [activeCategory, setActiveCategory] = useState<CareerCategory>(selectedRole.category);
  const [currentRole, setCurrentRole] = useState<CareerRole>(selectedRole);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    [selectedRole.category]: true,
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

  const handleStartAssessment = () => {
    selectRole(currentRole.id);
    router.push("/assessment");
  };

  return (
    <div className="space-y-8 animate-fade-in bg-white">
      {/* Header */}
      <div className="border-b border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="imperial" size="sm">Phase 01</Badge>
            <span className="text-xs text-muted font-mono uppercase tracking-wider font-bold">
              Step 1 of the Readiness Lifecycle
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-night tracking-tight uppercase">
            Discover Your Technical Career Pathway
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1 max-w-2xl">
            Select a specialized role across engineering disciplines to generate your customized diagnostic assessment, curriculum map, and production project portfolio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleStartAssessment} size="md" className="gap-2 font-bold shadow-sm">
            <span>Begin {currentRole.title} Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Grid: Categories on Left, Selected Role Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Accordion Category List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider font-bold text-night">
              Select Discipline & Role
            </span>
            <span className="text-[11px] text-muted font-semibold">
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
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    hasSelectedRole
                      ? "border-imperial bg-imperial-50/30 shadow-sm"
                      : "border-border bg-white hover:border-night/40"
                  }`}
                >
                  {/* Category Accordion Header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between p-4 text-left select-none cursor-pointer hover:bg-surface-subtle transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold ${
                        hasSelectedRole
                          ? "bg-imperial text-white"
                          : "bg-surface-subtle text-night border border-border"
                      }`}>
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className={`text-sm font-bold transition-colors ${
                          hasSelectedRole ? "text-imperial" : "text-night"
                        }`}>
                          {category}
                        </h3>
                        <p className="text-[11px] text-muted mt-0.5">
                          {rolesInCategory.length} roles • {rolesInCategory.reduce((acc, r) => acc + r.openRolesCount, 0).toLocaleString()} open vacancies
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {hasSelectedRole && (
                        <Badge variant="imperial" size="sm">Active</Badge>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-night" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-night" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Roles List */}
                  {isExpanded && (
                    <div className="p-3 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-border bg-surface-subtle/50">
                      {rolesInCategory.map((role) => {
                        const isSelected = currentRole.id === role.id;
                        return (
                          <div
                            key={role.id}
                            onClick={() => handleSelectRole(role)}
                            className={`p-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? "bg-night border-night text-white shadow-md"
                                : "bg-white border-border text-night hover:border-imperial hover:shadow-sm"
                            }`}
                          >
                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <h4 className={`text-xs font-bold leading-tight ${isSelected ? "text-white" : "text-night"}`}>
                                  {role.title}
                                </h4>
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-imperial shrink-0" />}
                              </div>
                              <p className={`text-[11px] mt-1 line-clamp-2 leading-relaxed ${isSelected ? "text-white/80" : "text-muted"}`}>
                                {role.shortDesc}
                              </p>
                            </div>

                            <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[10px] ${isSelected ? "border-white/10 text-white/70" : "border-border text-muted"}`}>
                              <span className={`font-mono font-bold ${isSelected ? "text-imperial" : "text-imperial"}`}>{role.averageSalary}</span>
                              <span className="font-mono font-bold text-night/80">{role.growthRate}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Selected Role Deep Dive (5 cols) */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-border shadow-card space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="imperial" size="sm">{currentRole.category}</Badge>
                <span className="text-[11px] text-night font-bold font-mono">{currentRole.growthRate} Demand</span>
              </div>
              <h2 className="text-xl font-display font-extrabold text-night">
                {currentRole.title}
              </h2>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                {currentRole.description}
              </p>
            </div>

            {/* Role Metadata Metric Badges */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-surface-subtle border border-border text-xs">
              <div>
                <span className="text-[10px] text-muted flex items-center gap-1 font-semibold">
                  <DollarSign className="w-3 h-3 text-imperial" /> Avg Compensation
                </span>
                <p className="font-extrabold text-night font-mono mt-0.5">{currentRole.averageSalary}</p>
              </div>
              <div>
                <span className="text-[10px] text-muted flex items-center gap-1 font-semibold">
                  <Clock className="w-3 h-3 text-imperial" /> Initial Assessment
                </span>
                <p className="font-bold text-night font-mono mt-0.5">{currentRole.assessmentDuration}</p>
              </div>
              <div>
                <span className="text-[10px] text-muted flex items-center gap-1 font-semibold">
                  <Calendar className="w-3 h-3 text-imperial" /> Estimated Mastery
                </span>
                <p className="font-bold text-night font-mono mt-0.5">{currentRole.learningPathLength}</p>
              </div>
              <div>
                <span className="text-[10px] text-muted flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3 h-3 text-imperial" /> Open Positions
                </span>
                <p className="font-bold text-night font-mono mt-0.5">{currentRole.openRolesCount.toLocaleString()} Active</p>
              </div>
            </div>

            {/* Expected Skill Areas & Weights */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-night">
                Weighted Skill Blueprint
              </h3>
              <div className="space-y-2.5">
                {currentRole.expectedSkillAreas.map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-night font-semibold">{skill.name}</span>
                      <span className="font-mono font-bold text-imperial">{skill.weight}%</span>
                    </div>
                    <ProgressBar value={skill.weight} size="sm" variant="imperial" />
                    <p className="text-[10px] text-muted">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Required Tools & Tech */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-night">
                Core Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {currentRole.primarySkills.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-surface-subtle border border-border text-[11px] font-mono font-semibold text-night"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-3 border-t border-border">
              <Button onClick={handleStartAssessment} size="lg" className="w-full gap-2 text-sm font-bold shadow-sm">
                <span>Begin Assessment for {currentRole.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-[11px] text-muted text-center mt-2">
                10-question technical diagnostic • Anti-distraction mode • Immediate gap breakdown
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
