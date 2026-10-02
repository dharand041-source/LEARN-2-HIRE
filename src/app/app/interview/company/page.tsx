"use client";

import React from "react";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";
import { InterviewNav } from "@/components/interview/InterviewNav";
import { ROUTES } from "@/lib/routes";

const COMPANY_SIMULATIONS = [
  {
    company: "Amazon",
    rounds: "LP + System Design + Coding",
    interviewer: "Bar Raiser Interviewer",
    style: "Deep dive on Customer Obsession and Dive Deep. Rigorous architectural scalability questioning.",
  },
  {
    company: "Zoho",
    rounds: "Machine Coding + Technical Round",
    interviewer: "Senior Technical Architect",
    style: "Low-level system implementation, memory management, zero-library vanilla algorithms.",
  },
  {
    company: "Microsoft",
    rounds: "Technical Architecture + Problem Solving",
    interviewer: "Partner Engineer",
    style: "Component decomposition, distributed caching tradeoffs, clean design patterns.",
  },
  {
    company: "TCS / Infosys (Digital)",
    rounds: "Technical Assessment + Panel Interview",
    interviewer: "Technical Evaluation Panel",
    style: "Core CS fundamentals (OOP, OS, DBMS, Networks), agile SDLC, and live code walkthrough.",
  },
];

export default function InterviewCompanyPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <InterviewNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Employer Simulations
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Company-Specific Mock Interviews
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Replicate the exact interview panel formats, question types, and evaluation rubrics of target employers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COMPANY_SIMULATIONS.map((sim) => (
          <div key={sim.company} className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4 flex flex-col justify-between hover:border-royal-maroon transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-black text-white text-xs font-mono font-bold uppercase">{sim.company}</span>
                <span className="text-xs font-mono text-muted">{sim.rounds}</span>
              </div>
              <p className="text-xs font-bold text-royal-maroon uppercase">Interviewer: {sim.interviewer}</p>
              <p className="text-xs text-muted leading-relaxed">{sim.style}</p>
            </div>

            <div className="pt-4 border-t border-black/10 flex justify-end">
              <Link href={ROUTES.app.interview.mock}>
                <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                  <span>Enter Simulation</span>
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
