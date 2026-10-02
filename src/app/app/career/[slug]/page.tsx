"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  FolderGit2,
  Mic,
  FileText,
  Briefcase,
  AlertTriangle,
  Code2,
  CheckSquare,
  ShieldCheck,
  TrendingUp,
  Layers,
  ChevronRight,
  Check,
} from "lucide-react";
import { getCareerRoleBySlug, CAREER_ROLES } from "@/data/careers";
import { useCareer } from "@/context/CareerContext";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { userRepo } from "@/services/domainServices";
import { ROUTES } from "@/lib/routes";

export default function CareerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "";
  const role = getCareerRoleBySlug(slug);

  const { selectRole, updateUserProfile } = useCareer();

  if (!role) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-surface border-2 border-black flex items-center justify-center mx-auto text-royal-maroon">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <Badge variant="coral" size="sm">Product Status // Route Verified</Badge>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-black uppercase">
            Specialization Not Found
          </h1>
          <p className="text-xs text-black/70 max-w-md mx-auto">
            The career pathway <strong className="font-mono text-black">&quot;{slug}&quot;</strong> does not exist in our 22+ engineering catalog.
          </p>
        </div>
        <div>
          <Link href={ROUTES.app.career.discover}>
            <button className="px-6 py-3 rounded-lg bg-electric-coral text-black font-black text-xs border-2 border-black hover:bg-black hover:text-white transition-colors cursor-pointer shadow-editorial-xs">
              Back to Career Discovery
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleStartCareerJourney = async () => {
    selectRole(role.id);
    updateUserProfile({
      targetRole: role.title,
      targetCategory: role.category,
    });
    await userRepo.setTargetRole(role.id);
    await userRepo.setJourneyStage("BASELINE_ASSESSMENT");
    router.push(ROUTES.app.assessments.baseline);
  };

  return (
    <div className="space-y-8 animate-fade-in bg-white pb-16">
      {/* 1. Header Banner & Primary CTA */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-10 shadow-editorial-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
                Specialization Blueprint
              </span>
              <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
                {role.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              {role.title}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
              {role.description}
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-2">
            <button
              onClick={handleStartCareerJourney}
              className="px-7 py-3.5 rounded-xl bg-electric-coral hover:bg-white text-black font-black text-xs sm:text-sm border-2 border-black transition-colors flex items-center gap-2.5 shadow-editorial-sm cursor-pointer"
            >
              <span>START CAREER JOURNEY</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <p className="text-[10px] text-center text-white/60 font-mono">
              Sets target role & navigates to baseline test
            </p>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border-2 border-black bg-white shadow-editorial-xs">
          <span className="text-[10px] font-mono uppercase text-black/60 font-bold block">Average Salary</span>
          <span className="text-base sm:text-lg font-mono font-black text-royal-maroon">{role.averageSalary}</span>
        </div>
        <div className="p-4 rounded-xl border-2 border-black bg-white shadow-editorial-xs">
          <span className="text-[10px] font-mono uppercase text-black/60 font-bold block">YoY Market Growth</span>
          <span className="text-base sm:text-lg font-mono font-black text-black">{role.growthRate}</span>
        </div>
        <div className="p-4 rounded-xl border-2 border-black bg-white shadow-editorial-xs">
          <span className="text-[10px] font-mono uppercase text-black/60 font-bold block">Open Positions</span>
          <span className="text-base sm:text-lg font-mono font-black text-black">{role.openRolesCount}+ Active</span>
        </div>
        <div className="p-4 rounded-xl border-2 border-black bg-white shadow-editorial-xs">
          <span className="text-[10px] font-mono uppercase text-black/60 font-bold block">Learning Track</span>
          <span className="text-base sm:text-lg font-mono font-black text-electric-coral">{role.learningPathLength}</span>
        </div>
      </div>

      {/* Main 2-Column Detail Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Deep Technical Specifications */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 2: Responsibilities */}
          <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-editorial-sm space-y-3">
            <h2 className="text-base font-black uppercase text-black border-b-2 border-black pb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-royal-maroon" />
              <span>Core Responsibilities & Technical Scope</span>
            </h2>
            <ul className="space-y-2 text-xs text-black/80 leading-relaxed">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-electric-coral shrink-0 mt-0.5 stroke-[3]" />
                <span>Architect and maintain production-grade software artifacts adhering to enterprise standards.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-electric-coral shrink-0 mt-0.5 stroke-[3]" />
                <span>Collaborate cross-functionally with product managers, QA automation engineers, and cloud infrastructure teams.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-electric-coral shrink-0 mt-0.5 stroke-[3]" />
                <span>Benchmark latency, diagnose memory leaks, and profile database query plans.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-electric-coral shrink-0 mt-0.5 stroke-[3]" />
                <span>Formulate automated test suites (unit, integration, contract) to protect regression integrity.</span>
              </li>
            </ul>
          </div>

          {/* Section 3 & 4: Required Skills & Competency Weights */}
          <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-editorial-sm space-y-4">
            <h2 className="text-base font-black uppercase text-black border-b-2 border-black pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-royal-maroon" />
              <span>Required Competencies & Diagnostic Weights</span>
            </h2>
            <div className="space-y-3">
              {role.expectedSkillAreas.map((area) => (
                <div key={area.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-black">{area.name}</span>
                    <span className="font-mono font-bold text-royal-maroon">{area.weight}% Weight</span>
                  </div>
                  <ProgressBar value={area.weight} size="sm" variant="electric-coral" />
                  <p className="text-[11px] text-black/70 leading-tight">{area.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7, 8, 9, 10: Learning, Assessment, Practice, Projects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Learning Path */}
            <div className="p-5 rounded-xl border-2 border-black bg-surface space-y-2">
              <div className="flex items-center gap-2 text-royal-maroon font-black text-xs uppercase">
                <BookOpen className="w-4 h-4" />
                <span>Curated Learning Path</span>
              </div>
              <p className="text-xs text-black/80 leading-relaxed">
                Structured into {role.learningPathLength} of university lectures, MDN guides, and NPTEL modules.
              </p>
              <Link href={ROUTES.app.learning.roadmap} className="text-xs font-bold text-royal-maroon hover:underline block pt-1">
                View Roadmap Modules →
              </Link>
            </div>

            {/* Assessment Benchmark */}
            <div className="p-5 rounded-xl border-2 border-black bg-surface space-y-2">
              <div className="flex items-center gap-2 text-royal-maroon font-black text-xs uppercase">
                <CheckSquare className="w-4 h-4" />
                <span>Baseline Assessment</span>
              </div>
              <p className="text-xs text-black/80 leading-relaxed">
                {role.assessmentDuration} diagnostic with 10 role-specific technical questions and real code snippets.
              </p>
              <Link href={ROUTES.app.assessments.baseline} className="text-xs font-bold text-royal-maroon hover:underline block pt-1">
                Preview Assessment →
              </Link>
            </div>

            {/* Hands-On Practice */}
            <div className="p-5 rounded-xl border-2 border-black bg-surface space-y-2">
              <div className="flex items-center gap-2 text-royal-maroon font-black text-xs uppercase">
                <Code2 className="w-4 h-4" />
                <span>Interactive Practice</span>
              </div>
              <p className="text-xs text-black/80 leading-relaxed">
                Coding challenges, SQL sandbox queries, and algorithmic problem solving matched to this track.
              </p>
              <Link href={ROUTES.app.practice.root} className="text-xs font-bold text-royal-maroon hover:underline block pt-1">
                Launch Code Practice →
              </Link>
            </div>

            {/* Production Projects */}
            <div className="p-5 rounded-xl border-2 border-black bg-surface space-y-2">
              <div className="flex items-center gap-2 text-royal-maroon font-black text-xs uppercase">
                <FolderGit2 className="w-4 h-4" />
                <span>Capstone Build</span>
              </div>
              <p className="text-xs text-black/80 leading-relaxed">
                Full-stack production repositories evaluated against a strict 100-point rubric.
              </p>
              <Link href={ROUTES.app.projects.root} className="text-xs font-bold text-royal-maroon hover:underline block pt-1">
                Explore Capstones →
              </Link>
            </div>
          </div>

          {/* Section 11 & 12: Interview Topics & Resume Skills */}
          <div className="p-6 rounded-2xl bg-white border-2 border-black shadow-editorial-sm space-y-4">
            <h2 className="text-base font-black uppercase text-black border-b-2 border-black pb-2 flex items-center gap-2">
              <Mic className="w-4 h-4 text-royal-maroon" />
              <span>Interview Defense & ATS Resume Keywords</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <span className="font-mono font-bold uppercase text-black block text-[11px]">
                  High-Yield Interview Questions:
                </span>
                <ul className="space-y-1.5 text-black/80">
                  <li>• System design tradeoffs & microservice communication</li>
                  <li>• ACID properties, indexing, and SQL isolation levels</li>
                  <li>• Asynchronous runtimes, memory leaks, and concurrency</li>
                  <li>• STAR behavioral storytelling for conflict & deadlines</li>
                </ul>
              </div>

              <div className="space-y-2">
                <span className="font-mono font-bold uppercase text-black block text-[11px]">
                  Required Resume Keywords:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {role.primarySkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-surface border border-black/30 font-mono text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Sticky Action & Opportunity Snapshot */}
        <div className="lg:col-span-4 sticky top-20 space-y-6">
          {/* Action Card */}
          <div className="p-6 rounded-2xl bg-black text-white border-3 border-electric-coral shadow-editorial-md space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-electric-coral font-bold">Track Selection</span>
              <h3 className="text-lg font-black text-white">{role.title}</h3>
            </div>

            <p className="text-xs text-white/80 leading-relaxed font-normal">
              Targeting this specialization aligns your automated assessment question pools, project recommendations, and job matching filters.
            </p>

            <button
              onClick={handleStartCareerJourney}
              className="w-full py-3.5 px-4 rounded-xl bg-electric-coral hover:bg-white text-black font-black text-xs border-2 border-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-editorial-xs"
            >
              <span>START CAREER JOURNEY</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="pt-2 border-t border-white/20 text-center">
              <Link href={ROUTES.app.career.discover} className="text-xs font-bold text-white/70 hover:text-white">
                ← Browse Other Career Tracks
              </Link>
            </div>
          </div>

          {/* Section 13: Job Opportunities preview */}
          <div className="p-5 rounded-2xl bg-white border-2 border-black shadow-editorial-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-royal-maroon" />
                <span>Job Openings</span>
              </span>
              <span className="text-xs font-mono font-bold text-royal-maroon">{role.openRolesCount}+</span>
            </div>
            <p className="text-xs text-black/70 leading-relaxed">
              Explore direct application links to verified openings requiring {role.primarySkills.slice(0, 3).join(", ")}.
            </p>
            <Link
              href={ROUTES.app.opportunities.jobs}
              className="block w-full text-center py-2 rounded-lg bg-surface border border-black/30 hover:border-black font-bold text-xs text-black transition-colors"
            >
              View Active Job Postings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
