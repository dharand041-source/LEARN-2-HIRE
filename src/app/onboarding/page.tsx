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
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { CAREER_ROLES } from "@/data/careers";
import { CAREER_CATEGORIES } from "@/lib/constants";
import { CareerRole, CareerCategory } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function OnboardingPage() {
  const router = useRouter();
  const { selectedRole, selectRole } = useCareer();

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
    <div className="space-y-8 animate-fade-in bg-background text-foreground min-h-screen">
      {/* Editorial Header */}
      <div className="border-b-2 border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SectionHeader
          eyebrow="PHASE 01 // CAREER DISCOVERY"
          title="Discover Your Engineering Pathway"
          description="Select an engineering track to generate your personalized diagnostic assessment, structured curriculum path, and production project portfolio."
          accent="gold"
        />

        <div className="flex items-center gap-3">
          <Button
            onClick={handleStartAssessment}
            variant="gold"
            size="md"
            className="gap-2 font-bold shadow-editorial-sm"
          >
            <span>Begin {currentRole.title} Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Grid: Categories on Left, Selected Role Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Accordion Category List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-border pb-2">
            <span className="text-xs uppercase font-mono tracking-wider font-bold text-foreground">
              Select Discipline & Role
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
                  className={`rounded-lg border-2 transition-all duration-150 overflow-hidden ${
                    hasSelectedRole
                      ? "border-foreground bg-white shadow-editorial-sm"
                      : "border-border bg-white hover:border-foreground"
                  }`}
                >
                  {/* Category Accordion Header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between p-4 text-left select-none cursor-pointer hover:bg-surface transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-9 h-9 rounded-md flex items-center justify-center text-xs font-bold border-2 ${
                        hasSelectedRole
                          ? "bg-editorial-gold text-foreground border-foreground shadow-editorial-sm"
                          : "bg-surface text-foreground border-border"
                      }`}>
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className={`text-sm font-bold tracking-tight ${
                          hasSelectedRole ? "text-foreground" : "text-foreground"
                        }`}>
                          {category}
                        </h3>
                        <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                          {rolesInCategory.length} roles • {rolesInCategory.reduce((acc, r) => acc + r.openRolesCount, 0).toLocaleString()} open market vacancies
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {hasSelectedRole && (
                        <Badge variant="gold" size="sm">Active Track</Badge>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-foreground" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Roles List */}
                  {isExpanded && (
                    <div className="p-3 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t-2 border-border bg-surface">
                      {rolesInCategory.map((role) => {
                        const isSelected = currentRole.id === role.id;
                        return (
                          <div
                            key={role.id}
                            onClick={() => handleSelectRole(role)}
                            className={`p-3.5 rounded-md border-2 transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? "bg-white border-foreground text-foreground shadow-editorial-sm"
                                : "bg-white border-border text-foreground hover:border-foreground"
                            }`}
                          >
                            <div>
                              <div className="flex items-start justify-between gap-1">
                                <h4 className="text-xs font-bold leading-tight text-foreground">
                                  {role.title}
                                </h4>
                                {isSelected && (
                                  <span className="w-2.5 h-2.5 rounded-full bg-editorial-gold border border-foreground shrink-0" />
                                )}
                              </div>
                              <p className="text-[11px] mt-1.5 line-clamp-2 leading-relaxed text-muted-foreground">
                                {role.shortDesc}
                              </p>
                            </div>

                            <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-[10px] font-mono">
                              <span className="font-bold text-foreground">{role.averageSalary}</span>
                              <span className="font-bold text-muted-foreground">{role.growthRate}</span>
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
          <Card variant="editorial" className="p-6 md:p-7 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="gold" size="sm">{currentRole.category}</Badge>
                <span className="text-[11px] text-foreground font-bold font-mono">{currentRole.growthRate} Growth</span>
              </div>
              <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
                {currentRole.title}
              </h2>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                {currentRole.description}
              </p>
            </div>

            {/* Role Metadata Metric Badges */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-surface border-2 border-border text-xs">
              <div>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono font-bold uppercase">
                  <DollarSign className="w-3 h-3 text-foreground" /> Avg Compensation
                </span>
                <p className="font-extrabold text-foreground font-mono mt-1 text-sm">{currentRole.averageSalary}</p>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono font-bold uppercase">
                  <Clock className="w-3 h-3 text-foreground" /> Assessment Time
                </span>
                <p className="font-bold text-foreground font-mono mt-1">{currentRole.assessmentDuration}</p>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono font-bold uppercase">
                  <Calendar className="w-3 h-3 text-foreground" /> Learning Curve
                </span>
                <p className="font-bold text-foreground font-mono mt-1">{currentRole.learningPathLength}</p>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono font-bold uppercase">
                  <TrendingUp className="w-3 h-3 text-foreground" /> Open Positions
                </span>
                <p className="font-bold text-foreground font-mono mt-1">{currentRole.openRolesCount.toLocaleString()} Active</p>
              </div>
            </div>

            {/* Expected Skill Areas & Weights */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-foreground">
                Target Competency Blueprint
              </h3>
              <div className="space-y-3">
                {currentRole.expectedSkillAreas.map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-foreground font-semibold">{skill.name}</span>
                      <span className="font-mono font-bold text-foreground">{skill.weight}%</span>
                    </div>
                    <ProgressBar value={skill.weight} size="sm" variant="gold" />
                    <p className="text-[10px] text-muted-foreground">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Required Tools & Tech */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-foreground">
                Core Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {currentRole.primarySkills.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-sm bg-surface border-2 border-border text-[11px] font-mono font-bold text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t-2 border-border space-y-2">
              <Button
                onClick={handleStartAssessment}
                variant="gold"
                size="lg"
                className="w-full gap-2 text-xs font-bold shadow-editorial-sm"
              >
                <span>Begin Assessment for {currentRole.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-[10px] text-muted-foreground text-center font-mono font-medium">
                10-question technical diagnostic • Anti-distraction mode • Immediate gap breakdown
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
