"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Target, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ResumeNav } from "@/components/resume/ResumeNav";
import { ROUTES } from "@/lib/routes";

export default function ResumeJobMatchPage() {
  const { resumeData } = useCareer();
  const [jobDescription, setJobDescription] = useState(
    "Looking for a Full-Stack Developer with experience in React, Node.js, Express, PostgreSQL, REST APIs, Docker, and AWS. Must understand relational database normalization and asynchronous concurrency."
  );
  const [matchScore, setMatchScore] = useState<number | null>(82);

  const matched = ["React", "Node.js", "Express", "PostgreSQL", "REST APIs"];
  const missing = ["Docker", "AWS"];

  const handleMatch = () => {
    setMatchScore(82);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ResumeNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Job Comparison
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Target Job Description Matching
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Compare your active resume against any employer job posting to identify missing requirements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
          <label className="text-xs font-black uppercase text-black block">
            Paste Job Description / Requirements
          </label>
          <textarea
            rows={8}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-4 bg-paper border border-black text-xs font-medium focus:outline-none leading-relaxed"
          />
          <div className="flex justify-end">
            <button
              onClick={handleMatch}
              className="px-6 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors shadow-editorial-xs cursor-pointer"
            >
              Analyze Job Match
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
          <h3 className="text-xs font-black uppercase text-black">Matching Results</h3>

          {matchScore && (
            <div className="space-y-4">
              <div className="p-4 bg-paper border border-black text-center">
                <span className="text-[10px] font-mono text-muted uppercase font-bold block">
                  Learn-2-Hire Compatibility
                </span>
                <span className="text-3xl font-black text-black">{matchScore}%</span>
                <span className="text-xs font-bold text-emerald-700 block mt-1">Strong Role Alignment</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-black block">Matched Skills</span>
                <div className="flex flex-wrap gap-1">
                  {matched.map((m) => (
                    <span key={m} className="px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-400 text-[10px] font-mono font-bold">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-black block">Missing Requirements</span>
                <div className="flex flex-wrap gap-1">
                  {missing.map((m) => (
                    <span key={m} className="px-2 py-0.5 bg-rose-50 text-rose-900 border border-rose-400 text-[10px] font-mono font-bold">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-black/10">
                <Link href={ROUTES.app.opportunities.jobs}>
                  <button className="w-full py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center justify-center gap-1.5 shadow-editorial-xs">
                    <span>Find Similar Jobs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
