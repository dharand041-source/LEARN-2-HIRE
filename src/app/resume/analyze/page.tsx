"use client";

import React, { useState, useRef } from "react";
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
  ExternalLink,
  BookOpen,
  FileText,
  Briefcase,
  Layers,
  ChevronDown,
  ChevronUp,
  XCircle,
  HelpCircle,
  Building,
  MapPin,
  RefreshCw,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ExternalApplyModal } from "@/components/opportunities/ExternalApplyModal";
import { FormatCheckStatus, JobListing } from "@/types";

export default function ResumeAnalyzerPage() {
  const {
    resumeAnalysis,
    atsAnalysis,
    parsedResume,
    selectedRole,
    uploadAndAnalyzeResume,
    analyzeResumeFromRawText,
    isAnalyzingResume,
    liveJobMatches,
    isJobsLoading,
    openExternalApplyModal,
    fetchLiveJobs,
  } = useCareer();

  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [customJobDesc, setCustomJobDesc] = useState("");
  const [isComparingJob, setIsComparingJob] = useState(false);
  const [showJobComparison, setShowJobComparison] = useState(false);
  const [jobSpecificAnalysis, setJobSpecificAnalysis] = useState<typeof atsAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Validate and handle file upload
  const processFile = async (file: File) => {
    setUploadError(null);

    // Format validation
    const validExtensions = ["pdf", "docx", "txt"];
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !validExtensions.includes(ext)) {
      setUploadError("Unsupported file type. Please upload a PDF, DOCX, or TXT resume document.");
      return;
    }

    // Size validation (Max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size exceeds 5MB limit. Please upload a smaller resume document.");
      return;
    }

    if (file.size === 0) {
      setUploadError("The selected file is empty. Please select a valid resume.");
      return;
    }

    setSelectedFileName(file.name);

    try {
      await uploadAndAnalyzeResume(file, customJobDesc || undefined);
    } catch (err: any) {
      setUploadError(err.message || "Failed to analyze resume. Please try again.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Job specific comparison
  const handleRunJobSpecificComparison = async () => {
    if (!customJobDesc.trim()) return;
    setIsComparingJob(true);
    try {
      const textToUse = parsedResume?.rawText || "";
      if (textToUse) {
        const res = await analyzeResumeFromRawText(textToUse, customJobDesc);
        setJobSpecificAnalysis(res.analysis);
      }
    } catch (err: any) {
      setUploadError(err.message || "Failed to evaluate job comparison.");
    } finally {
      setIsComparingJob(false);
    }
  };

  // Active analysis to display
  const activeAnalysis = jobSpecificAnalysis || atsAnalysis;
  const displayScore = activeAnalysis?.atsCompatibilityScore ?? resumeAnalysis.atsCompatibilityScore;

  // Breakdown values (fallback to resumeAnalysis if first load)
  const breakdown = activeAnalysis?.scoreBreakdown || {
    parsingAndFormat: { score: Math.round(resumeAnalysis.formattingScore / 5), max: 20 },
    requiredSections: { score: 14, max: 15 },
    keywordAndSkills: { score: Math.round((resumeAnalysis.skillsFound.length / Math.max(1, resumeAnalysis.skillsFound.length + resumeAnalysis.skillsMissing.length)) * 25), max: 25 },
    roleAlignment: { score: 9, max: 10 },
    experienceRelevance: { score: Math.round(resumeAnalysis.experienceRelevance / 10), max: 10 },
    projectRelevance: { score: Math.round(resumeAnalysis.projectRelevance / 20), max: 5 },
    educationCert: { score: 4, max: 5 },
    achievements: { score: 4, max: 5 },
    contactCompleteness: { score: 5, max: 5 },
  };

  const getFormatBadge = (status: FormatCheckStatus) => {
    switch (status) {
      case "PASS":
        return <Badge variant="champagne" size="sm">✓ PASS</Badge>;
      case "WARNING":
        return <Badge variant="navy" size="sm">! WARNING</Badge>;
      case "NEEDS_IMPROVEMENT":
        return <Badge variant="rose" size="sm">✕ NEEDS IMPROVEMENT</Badge>;
    }
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
              <Badge variant="champagne" size="sm">ATS-Grade Diagnostic</Badge>
              <span className="text-xs text-pearl-muted font-mono uppercase tracking-wider">
                Transparent 100-Point Scoring Model
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary tracking-tight">
              SkillForge ATS-Style Resume Analyzer
            </h1>
            <p className="text-xs sm:text-sm text-pearl-muted mt-1">
              Deterministic parsing, format validation, keyword coverage, and real-time employment matching for{" "}
              <strong className="text-champagne">{selectedRole.title}</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => fileInputRef.current?.click()}
            isLoading={isAnalyzingResume}
            size="sm"
            className="gap-2 font-semibold shadow-gold-btn"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload New Resume</span>
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Mandatory Official Disclaimer Notice */}
      <div className="p-4 rounded-xl bg-navy-950 border border-champagne/30 text-xs text-pearl-muted flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-pearl-primary">
            SkillForge ATS Compatibility Score
          </p>
          <p className="text-[11px] leading-relaxed text-pearl-muted">
            This is SkillForge&apos;s compatibility estimate based on resume parsing, structure,
            job-description alignment, keywords, skills, and content quality. It is not an official
            score from an employer&apos;s ATS (such as Workday, Greenhouse, or Lever).
          </p>
        </div>
      </div>

      {/* Upload Error Banner */}
      {uploadError && (
        <div className="p-4 rounded-xl bg-rose/10 border border-rose/30 text-xs text-rose flex items-center justify-between">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button onClick={() => setUploadError(null)} className="text-xs underline hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* Real Drag & Drop Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center space-y-3 ${
          dragActive
            ? "border-champagne bg-champagne/10 scale-[1.005]"
            : "border-surface-border bg-surface-card hover:border-champagne/50 hover:bg-navy-900/60"
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-navy-900 border border-white/10 flex items-center justify-center mx-auto text-champagne">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-pearl-primary">
            {selectedFileName ? (
              <span className="text-champagne font-mono">Selected: {selectedFileName}</span>
            ) : (
              "Upload or drag & drop your resume file"
            )}
          </p>
          <p className="text-xs text-pearl-muted mt-1">
            Accepts official <strong className="text-pearl-primary">PDF</strong>,{" "}
            <strong className="text-pearl-primary">DOCX</strong>, and{" "}
            <strong className="text-pearl-primary">TXT</strong> (Max 5MB). Client privacy protected.
          </p>
        </div>
        {isAnalyzingResume && (
          <div className="flex items-center justify-center gap-2 text-xs text-champagne pt-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Parsing document text layer and evaluating ATS compatibility...</span>
          </div>
        )}
      </div>

      {/* Main Grid: ATS Score Breakdown (4 cols) & Deep Diagnostics (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: ATS Compatibility Score & 9-Part Rubric */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-surface-card border border-champagne/40 shadow-card-navy space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-pearl-muted font-mono">
                SkillForge Compatibility Estimate
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-extrabold font-mono text-champagne">{displayScore}</span>
                <span className="text-lg font-mono text-pearl-muted">/100</span>
              </div>
              <p className="text-xs text-emerald-400 font-medium pt-1">
                {displayScore >= 80
                  ? "Strong Machine Readability"
                  : displayScore >= 65
                  ? "Moderate Compatibility"
                  : "Needs Structural Optimization"}
              </p>
            </div>

            {/* Transparent 9-Category Score Rubric */}
            <div className="space-y-3 pt-2 border-t border-white/5 text-xs">
              <span className="text-[10px] uppercase font-mono font-semibold text-pearl-muted block">
                Transparent 9-Factor Rubric
              </span>

              {/* 1. Format */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-pearl-muted">Parsing & Format</span>
                  <span className="font-mono text-pearl-primary font-bold">
                    {breakdown.parsingAndFormat.score}/{breakdown.parsingAndFormat.max} pts
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.parsingAndFormat.score / breakdown.parsingAndFormat.max) * 100}
                  size="sm"
                  variant="champagne"
                />
              </div>

              {/* 2. Required Sections */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-pearl-muted">Required Resume Sections</span>
                  <span className="font-mono text-pearl-primary font-bold">
                    {breakdown.requiredSections.score}/{breakdown.requiredSections.max} pts
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.requiredSections.score / breakdown.requiredSections.max) * 100}
                  size="sm"
                  variant="champagne"
                />
              </div>

              {/* 3. Keywords */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-pearl-muted">Keyword & Skill Alignment</span>
                  <span className="font-mono text-pearl-primary font-bold">
                    {breakdown.keywordAndSkills.score}/{breakdown.keywordAndSkills.max} pts
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.keywordAndSkills.score / breakdown.keywordAndSkills.max) * 100}
                  size="sm"
                  variant="champagne"
                />
              </div>

              {/* 4. Role Alignment */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-pearl-muted">Role & Title Alignment</span>
                  <span className="font-mono text-pearl-primary font-bold">
                    {breakdown.roleAlignment.score}/{breakdown.roleAlignment.max} pts
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.roleAlignment.score / breakdown.roleAlignment.max) * 100}
                  size="sm"
                  variant="champagne"
                />
              </div>

              {/* 5. Experience */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-pearl-muted">Experience Relevance</span>
                  <span className="font-mono text-pearl-primary font-bold">
                    {breakdown.experienceRelevance.score}/{breakdown.experienceRelevance.max} pts
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.experienceRelevance.score / breakdown.experienceRelevance.max) * 100}
                  size="sm"
                  variant="champagne"
                />
              </div>

              {/* 6. Projects */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-pearl-muted">Technical Projects</span>
                  <span className="font-mono text-pearl-primary font-bold">
                    {breakdown.projectRelevance.score}/{breakdown.projectRelevance.max} pts
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.projectRelevance.score / breakdown.projectRelevance.max) * 100}
                  size="sm"
                  variant="champagne"
                />
              </div>

              {/* 7. Education / Cert */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-pearl-muted">Education & Certifications</span>
                  <span className="font-mono text-pearl-primary font-bold">
                    {breakdown.educationCert.score}/{breakdown.educationCert.max} pts
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.educationCert.score / breakdown.educationCert.max) * 100}
                  size="sm"
                  variant="champagne"
                />
              </div>

              {/* 8. Achievements */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-pearl-muted">Metrics & Evidence Quality</span>
                  <span className="font-mono text-pearl-primary font-bold">
                    {breakdown.achievements.score}/{breakdown.achievements.max} pts
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.achievements.score / breakdown.achievements.max) * 100}
                  size="sm"
                  variant="champagne"
                />
              </div>

              {/* 9. Contact */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-pearl-muted">Contact & Profile Completeness</span>
                  <span className="font-mono text-pearl-primary font-bold">
                    {breakdown.contactCompleteness.score}/{breakdown.contactCompleteness.max} pts
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.contactCompleteness.score / breakdown.contactCompleteness.max) * 100}
                  size="sm"
                  variant="champagne"
                />
              </div>
            </div>
          </div>

          {/* Job-Specific ATS Match Tool Toggle */}
          <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-3">
            <button
              onClick={() => setShowJobComparison(!showJobComparison)}
              className="w-full flex items-center justify-between text-xs font-semibold text-pearl-primary hover:text-champagne transition-colors"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-champagne" />
                <span>Job-Specific ATS Match</span>
              </div>
              {showJobComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showJobComparison && (
              <div className="space-y-3 pt-2 text-xs animate-fade-in">
                <p className="text-[11px] text-pearl-muted leading-relaxed">
                  Paste an employer job description to calculate exact job keyword coverage, missing skills, and eligibility.
                </p>
                <textarea
                  value={customJobDesc}
                  onChange={(e) => setCustomJobDesc(e.target.value)}
                  placeholder="Paste Job Description (requirements, responsibilities, skills)..."
                  rows={4}
                  className="w-full p-2.5 rounded-lg bg-navy-950 border border-white/10 text-xs text-pearl-primary placeholder:text-pearl-muted/40 focus:outline-none focus:border-champagne"
                />
                <Button
                  onClick={handleRunJobSpecificComparison}
                  isLoading={isComparingJob}
                  disabled={!customJobDesc.trim()}
                  size="sm"
                  className="w-full gap-2 text-xs font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze Resume for This Job</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Diagnostics, Format Checks, Keywords, and Live Vacancies */}
        <div className="lg:col-span-8 space-y-6">
          {/* Format Checks */}
          {activeAnalysis?.formatChecks && activeAnalysis.formatChecks.length > 0 && (
            <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-pearl-primary font-mono flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-champagne" />
                <span>Format & Parsing Diagnostics</span>
              </h3>
              <div className="space-y-2">
                {activeAnalysis.formatChecks.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-navy-950 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-semibold text-pearl-primary">{item.check}</span>
                      <p className="text-[11px] text-pearl-muted mt-0.5">{item.feedback}</p>
                    </div>
                    <div>{getFormatBadge(item.status)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Keywords: Found vs Missing with Learning Deep-Links */}
          <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary font-mono">
              Role Keyword Coverage & Gaps
            </h2>

            {/* Matched Skills */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  Matched Technical Skills ({activeAnalysis?.matchedSkills.length ?? resumeAnalysis.skillsFound.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(activeAnalysis?.matchedSkills ?? resumeAnalysis.skillsFound).map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-mono text-emerald-300"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills with Direct Learning Deep-Link (Prompt Rule #26 & #27) */}
            <div className="space-y-2 pt-3 border-t border-white/5">
              <div className="flex items-center gap-2 text-xs text-rose font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>
                  Missing Skills ({activeAnalysis?.missingSkills.length ?? resumeAnalysis.skillsMissing.length})
                </span>
              </div>
              <div className="space-y-2">
                {(activeAnalysis?.missingSkills ?? resumeAnalysis.skillsMissing).map((skill, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-navy-950 border border-rose/30 flex items-center justify-between text-xs"
                  >
                    <span className="text-rose font-mono font-medium">+ {skill}</span>
                    <Link
                      href={`/learning?skill=${encodeURIComponent(skill)}`}
                      className="text-[11px] text-champagne hover:underline flex items-center gap-1 font-semibold"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Learn this skill</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Genuine Issues & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-surface-card border border-rose/30 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-rose flex items-center gap-2 font-mono">
                <AlertTriangle className="w-4 h-4" />
                Issues Detected
              </h3>
              <ul className="space-y-2 text-xs text-pearl-muted">
                {(activeAnalysis?.issues ?? resumeAnalysis.criticalGaps).map((issue, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose font-bold mt-0.5">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-surface-card border border-champagne/30 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-champagne flex items-center gap-2 font-mono">
                <Zap className="w-4 h-4" />
                Recommended Improvements
              </h3>
              <ul className="space-y-2 text-xs text-pearl-muted">
                {(activeAnalysis?.recommendations ?? resumeAnalysis.recommendations).map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-champagne font-bold mt-0.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Real-Time Matched Vacancies Section */}
          <div className="p-6 rounded-2xl bg-surface-card border border-surface-border space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-pearl-primary font-mono flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-champagne" />
                  <span>Real-Time Matching Opportunities</span>
                </h3>
                <p className="text-[11px] text-pearl-muted mt-0.5">
                  Live vacancies retrieved from verified platforms matching your parsed resume skills.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchLiveJobs()}
                isLoading={isJobsLoading}
                className="gap-1.5 text-xs shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Opportunities</span>
              </Button>
            </div>

            {/* Opportunities List */}
            {liveJobMatches.length > 0 ? (
              <div className="space-y-3">
                {liveJobMatches.slice(0, 5).map((match) => (
                  <div
                    key={match.job.id}
                    className="p-4 rounded-xl bg-navy-950 border border-white/5 hover:border-champagne/30 transition-all space-y-2.5 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-pearl-muted">{match.job.company}</span>
                          <Badge variant="navy" size="sm">{match.job.opportunityType}</Badge>
                          <Badge variant="champagne" size="sm">{match.job.remoteType}</Badge>
                        </div>
                        <h4 className="text-sm font-bold text-pearl-primary mt-0.5">{match.job.title}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold font-mono text-champagne">{match.matchScore}%</span>
                        <span className="text-[10px] text-pearl-muted block font-mono">Job Match</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] uppercase font-semibold text-emerald-400">Matched:</span>
                      {match.matchedSkills.slice(0, 4).map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                          ✓ {s}
                        </span>
                      ))}
                      {match.missingSkills.length > 0 && (
                        <>
                          <span className="text-[10px] uppercase font-semibold text-rose ml-2">Missing:</span>
                          {match.missingSkills.slice(0, 2).map((s, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-rose/15 border border-rose/30 text-[10px] font-mono text-rose">
                              • {s}
                            </span>
                          ))}
                        </>
                      )}
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                      <span className="text-pearl-muted font-mono">
                        {match.job.attribution || `Source: ${match.job.source}`}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => openExternalApplyModal(match.job)}
                        className="gap-1.5 text-xs font-semibold"
                      >
                        <span>Apply Externally</span>
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Link href="/opportunities" className="block text-center pt-2">
                  <Button variant="secondary" size="sm" className="w-full text-xs gap-1.5">
                    <span>View All {liveJobMatches.length} Matching Opportunities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-pearl-muted space-y-2">
                <Briefcase className="w-8 h-8 text-pearl-muted/40 mx-auto" />
                <p>No active live vacancies loaded yet.</p>
                <Button size="sm" variant="outline" onClick={() => fetchLiveJobs()}>
                  Load Live Opportunities
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* External Application User Approval Modal */}
      <ExternalApplyModal />
    </div>
  );
}
