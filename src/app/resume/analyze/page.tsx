"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileSearch,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  FileCheck,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getScoreColor } from "@/lib/constants";

export default function ResumeAnalyzerPage() {
  const { resumeAnalysis, reanalyzeResume, selectedRole } = useCareer();
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      reanalyzeResume();
      setIsScanning(false);
      setHasScanned(true);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/resume"
            className="p-2 rounded-lg bg-surface-card hover:bg-navy-800 border border-surface-border text-pearl-muted hover:text-pearl-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="champagne" size="sm">Phase 12</Badge>
              <span className="text-xs text-pearl-muted font-mono uppercase tracking-wider">
                ATS Semantic Parser
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary tracking-tight">
              Resume & ATS Diagnostic Engine
            </h1>
            <p className="text-xs sm:text-sm text-pearl-muted mt-1">
              Evaluates keyword density, heading syntax, and project evidence against <strong>{selectedRole.title}</strong> hiring filters.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleRunScan} isLoading={isScanning} size="sm" className="gap-2 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Re-Analyze Resume</span>
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Overall Match & ATS Scores (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-surface-card border border-champagne/40 shadow-card-navy space-y-6 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-pearl-muted">
              ATS Match & Compatibility
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-navy-950 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase text-pearl-muted">Role Match</span>
                <p className="text-3xl font-bold font-mono text-champagne">{resumeAnalysis.overallMatch}%</p>
                <p className="text-[10px] text-emerald-400">High Relevance</p>
              </div>

              <div className="p-4 rounded-xl bg-navy-950 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase text-pearl-muted">ATS Parser Pass</span>
                <p className="text-3xl font-bold font-mono text-emerald-400">{resumeAnalysis.atsCompatibilityScore}%</p>
                <p className="text-[10px] text-emerald-400">Standard Single-Col</p>
              </div>
            </div>

            {/* Sub Metric Bars */}
            <div className="space-y-3 text-left">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-pearl-muted">Experience Relevance</span>
                  <span className="font-mono text-pearl-primary font-bold">{resumeAnalysis.experienceRelevance}%</span>
                </div>
                <ProgressBar value={resumeAnalysis.experienceRelevance} size="sm" variant="champagne" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-pearl-muted">Project Evidence Strength</span>
                  <span className="font-mono text-emerald-400 font-bold">{resumeAnalysis.projectRelevance}%</span>
                </div>
                <ProgressBar value={resumeAnalysis.projectRelevance} size="sm" variant="success" />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-pearl-muted">Machine Formatting Score</span>
                  <span className="font-mono text-champagne font-bold">{resumeAnalysis.formattingScore}%</span>
                </div>
                <ProgressBar value={resumeAnalysis.formattingScore} size="sm" variant="champagne" />
              </div>
            </div>

            <Link href="/opportunities" className="block w-full">
              <Button size="lg" className="w-full gap-2 text-xs font-semibold">
                <span>View Matching Jobs (91% Match)</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Upload / Replace Resume File Box */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-navy-900 border border-white/10 flex items-center justify-center mx-auto text-pearl-muted">
              <UploadCloud className="w-5 h-5 text-champagne" />
            </div>
            <div>
              <p className="text-xs font-semibold text-pearl-primary">Upload Custom Resume (PDF/DOCX)</p>
              <p className="text-[11px] text-pearl-muted mt-0.5">Drag & drop to parse keywords and compare against {selectedRole.title}.</p>
            </div>
            <button
              onClick={handleRunScan}
              className="px-4 py-2 rounded-lg bg-navy-950 border border-white/10 text-xs text-pearl-primary hover:border-champagne transition-colors"
            >
              Simulate File Upload & Scan
            </button>
          </div>
        </div>

        {/* Right Column: Skills Found vs Missing & Recommendations (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Skills Found vs Missing */}
          <div className="p-6 rounded-xl bg-surface-card border border-surface-border space-y-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary">
              Keyword Extraction & ATS Match
            </h2>

            {/* Found Skills */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Skills Found ({resumeAnalysis.skillsFound.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {resumeAnalysis.skillsFound.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-mono text-emerald-300"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs text-rose font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Recommended Missing Keywords ({resumeAnalysis.skillsMissing.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {resumeAnalysis.skillsMissing.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-rose/15 border border-rose/30 text-[11px] font-mono text-rose"
                  >
                    + {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Strengths & Critical Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-surface-card border border-emerald-500/20 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Verified Strengths
              </h3>
              <ul className="space-y-2 text-xs text-pearl-muted">
                {resumeAnalysis.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-surface-card border border-rose/30 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-rose flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                ATS Vulnerabilities
              </h3>
              <ul className="space-y-2 text-xs text-pearl-muted">
                {resumeAnalysis.criticalGaps.map((gap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose font-bold">•</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="p-5 rounded-xl bg-navy-950 border border-white/5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-champagne flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              Immediate Resume Optimization Actions
            </h3>
            <div className="space-y-2.5">
              {resumeAnalysis.recommendations.map((rec, i) => (
                <div key={i} className="p-3 rounded-lg bg-surface-card border border-surface-border flex items-center justify-between text-xs">
                  <span className="text-pearl-muted leading-relaxed">{rec}</span>
                  <Link href="/resume" className="text-[11px] text-champagne font-semibold hover:underline shrink-0 ml-3">
                    Apply Fix →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
