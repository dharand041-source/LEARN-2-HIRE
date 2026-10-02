"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, ExternalLink, Clock, CheckCircle2 } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { LearningNav } from "@/components/learning/LearningNav";
import { ROUTES } from "@/lib/routes";

export default function LearningCoursesPage() {
  const { learningModules, selectedRole } = useCareer();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <LearningNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Curriculum Courses
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Structured Courses for {selectedRole?.title}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Complete accredited, open-access courses with syllabus milestones and guided practice.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {learningModules.map((course) => (
          <div
            key={course.id}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col justify-between space-y-4 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                  {course.difficulty}
                </span>
                <span className="text-xs font-mono font-bold text-muted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{course.estimatedTime}</span>
                </span>
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-black">
                {course.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="pt-4 border-t border-black/10 flex items-center justify-between">
              <span className="text-xs font-bold text-royal-maroon uppercase">
                Status: {course.status}
              </span>
              <Link href={ROUTES.app.learning.lessons}>
                <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                  <span>Start Course</span>
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
