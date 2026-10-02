"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building2, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { PracticeNav } from "@/components/practice/PracticeNav";
import { ROUTES } from "@/lib/routes";

const COMPANY_TRACKS = [
  {
    company: "Zoho",
    role: "Full-Stack & Systems Developer",
    style: "Deep C/Java fundamentals, algorithmic puzzles, no-framework JS DOM manipulation, DB schemas.",
    drills: 8,
    difficulty: "Advanced",
  },
  {
    company: "Amazon",
    role: "Software Development Engineer (SDE I)",
    style: "Leadership Principles, object-oriented design, dynamic programming, tree traversals, scalability.",
    drills: 12,
    difficulty: "Hard",
  },
  {
    company: "TCS (Digital / Prime)",
    role: "Software Engineer",
    style: "Advanced quantitative reasoning, Python/Java algorithmic questions, agile SDLC paradigms.",
    drills: 10,
    difficulty: "Medium",
  },
  {
    company: "Infosys (Specialist Programmer)",
    role: "Systems Engineer & Specialist",
    style: "DSA, graph traversals, bit manipulation, relational database design under tight time constraints.",
    drills: 9,
    difficulty: "Medium to Hard",
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    style: "Data structures, asynchronous programming, clean code refactoring, system architecture tradeoffs.",
    drills: 11,
    difficulty: "Hard",
  },
  {
    company: "Accenture",
    role: "Associate Software Engineer",
    style: "Critical thinking, technical MCQ evaluation, pseudocode debugging, verbal reasoning.",
    drills: 7,
    difficulty: "Medium",
  },
];

export default function PracticeCompanyPage() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PracticeNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Employer Pattern Blueprints
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Company-Specific Assessment Preparation
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Real evaluation patterns curated from approved recruitment benchmarks (Zoho, Amazon, TCS, Infosys, Microsoft, Accenture).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMPANY_TRACKS.map((item) => (
          <div
            key={item.company}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col justify-between space-y-4 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-black text-white font-mono text-xs font-bold uppercase">
                  {item.company}
                </span>
                <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                  {item.difficulty}
                </span>
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-black mt-2">
                {item.role}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                {item.style}
              </p>
            </div>

            <div className="pt-4 border-t border-black/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-muted">
                {item.drills} Standard Drills
              </span>
              <Link href={ROUTES.app.practice.root}>
                <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                  <span>Start Pattern</span>
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
