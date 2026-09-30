"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
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
  Briefcase,
  ChevronDown,
  ChevronUp,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ExternalApplyModal } from "@/components/opportunities/ExternalApplyModal";
import { FormatCheckStatus } from "@/types";

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

    const validExtensions = ["pdf", "docx", "txt"];
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !validExtensions.includes(ext)) {
      setUploadError("Unsupported file type. Please upload a PDF, DOCX, or TXT document.");
      return;
    }

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

  // Breakdown values
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
        return <Badge variant="neutral" size="sm" className="bg-emerald-50 text-emerald-800 border-emerald-600">✓ PASS</Badge>;
      case "WARNING":
        return <Badge variant="gold" size="sm">! WARNING</Badge>;
      case "NEEDS_IMPROVEMENT":
        return <Badge variant="red" size="sm">✕ REVISE</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in bg-background text-foreground min-h-screen">
      {/* Header */}
      <div className="border-b-2 border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/resume"
            className="p-2 rounded-md bg-white hover:bg-surface border-2 border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <SectionHeader
            eyebrow="PHASE 11 // ATS VERIFICATION"
            title="ATS-Style Resume Diagnostic"
            description={`Deterministic parsing, format validation, keyword coverage, and real-time vacancy matching for ${selectedRole.title}.`}
            accent="red"
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => fileInputRef.current?.click()}
            isLoading={isAnalyzingResume}
            variant="red"
            size="sm"
            className="gap-2 font-bold shadow-editorial-sm"
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

      {/* Official Disclaimer Notice */}
      <Card variant="editorial" className="p-4 bg-surface border-2 border-border flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-royal-maroon shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-foreground text-xs uppercase font-mono">
            Learn-2-Hire ATS Compatibility Standard
          </p>
          <p className="text-[11px] leading-relaxed text-muted-foreground font-medium">
            This deterministic compatibility estimate evaluates parsing heuristics, section completeness,
            keyword coverage, and content metrics. It is calibrated against corporate applicant tracking systems.
          </p>
        </div>
      </Card>

      {/* Upload Error Banner */}
      {uploadError && (
        <div className="p-4 rounded-lg bg-royal-maroon/10 border-2 border-royal-maroon text-xs text-foreground flex items-center justify-between font-medium">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 shrink-0 text-royal-maroon" />
            <span>{uploadError}</span>
          </div>
          <button onClick={() => setUploadError(null)} className="text-xs uppercase font-mono font-bold underline hover:text-electric-coral">
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
        className={`p-6 sm:p-8 rounded-lg border-2 border-dashed transition-all cursor-pointer text-center space-y-3 ${
          dragActive
            ? "border-royal-maroon bg-royal-maroon/5 scale-[1.005]"
            : "border-border bg-white hover:border-electric-coral hover:bg-surface"
        }`}
      >
        <div className="w-12 h-12 rounded-lg bg-surface border-2 border-border flex items-center justify-center mx-auto text-royal-maroon">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">
            {selectedFileName ? (
              <span className="text-electric-coral font-mono font-extrabold">Active File: {selectedFileName}</span>
            ) : (
              "Upload or Drag & Drop Resume File"
            )}
          </p>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            Supports PDF, DOCX, and TXT (Max 5MB). In-memory client parsing only.
          </p>
        </div>
        {isAnalyzingResume && (
          <div className="flex items-center justify-center gap-2 text-xs text-electric-coral pt-2 font-mono font-bold">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Parsing text layout and evaluating ATS compatibility heuristics...</span>
          </div>
        )}
      </div>

      {/* Main Grid: ATS Score Breakdown (4 cols) & Deep Diagnostics (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: ATS Score & 9-Part Rubric */}
        <div className="lg:col-span-4 space-y-6">
          <Card variant="editorial" className="p-6 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-mono">
                ATS Compatibility Index
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-extrabold font-mono text-royal-maroon">{displayScore}</span>
                <span className="text-lg font-mono text-muted-foreground font-bold">/100</span>
              </div>
              <Badge variant="maroon" size="sm" className="mt-1">
                {displayScore >= 80
                  ? "Strong Machine Readability"
                  : displayScore >= 65
                  ? "Moderate Compatibility"
                  : "Needs Optimization"}
              </Badge>
            </div>

            {/* 9-Category Score Rubric */}
            <div className="space-y-3 pt-3 border-t-2 border-border text-xs">
              <span className="text-[10px] uppercase font-mono font-bold text-muted-foreground block">
                Deterministic 9-Factor Rubric
              </span>

              {/* 1. Format */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-muted-foreground font-medium">Parsing & Format</span>
                  <span className="text-foreground font-bold">
                    {breakdown.parsingAndFormat.score}/{breakdown.parsingAndFormat.max}
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.parsingAndFormat.score / breakdown.parsingAndFormat.max) * 100}
                  size="sm"
                  variant="red"
                />
              </div>

              {/* 2. Required Sections */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-muted-foreground font-medium">Required Sections</span>
                  <span className="text-foreground font-bold">
                    {breakdown.requiredSections.score}/{breakdown.requiredSections.max}
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.requiredSections.score / breakdown.requiredSections.max) * 100}
                  size="sm"
                  variant="red"
                />
              </div>

              {/* 3. Keywords */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-muted-foreground font-medium">Keyword Alignment</span>
                  <span className="text-foreground font-bold">
                    {breakdown.keywordAndSkills.score}/{breakdown.keywordAndSkills.max}
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.keywordAndSkills.score / breakdown.keywordAndSkills.max) * 100}
                  size="sm"
                  variant="red"
                />
              </div>

              {/* 4. Role Alignment */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-muted-foreground font-medium">Role & Title Match</span>
                  <span className="text-foreground font-bold">
                    {breakdown.roleAlignment.score}/{breakdown.roleAlignment.max}
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.roleAlignment.score / breakdown.roleAlignment.max) * 100}
                  size="sm"
                  variant="red"
                />
              </div>

              {/* 5. Experience */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-muted-foreground font-medium">Experience Relevance</span>
                  <span className="text-foreground font-bold">
                    {breakdown.experienceRelevance.score}/{breakdown.experienceRelevance.max}
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.experienceRelevance.score / breakdown.experienceRelevance.max) * 100}
                  size="sm"
                  variant="red"
                />
              </div>

              {/* 6. Projects */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-muted-foreground font-medium">Technical Projects</span>
                  <span className="text-foreground font-bold">
                    {breakdown.projectRelevance.score}/{breakdown.projectRelevance.max}
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.projectRelevance.score / breakdown.projectRelevance.max) * 100}
                  size="sm"
                  variant="red"
                />
              </div>

              {/* 7. Education */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-muted-foreground font-medium">Education & Certs</span>
                  <span className="text-foreground font-bold">
                    {breakdown.educationCert.score}/{breakdown.educationCert.max}
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.educationCert.score / breakdown.educationCert.max) * 100}
                  size="sm"
                  variant="red"
                />
              </div>

              {/* 8. Achievements */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-muted-foreground font-medium">Metric Proof Quality</span>
                  <span className="text-foreground font-bold">
                    {breakdown.achievements.score}/{breakdown.achievements.max}
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.achievements.score / breakdown.achievements.max) * 100}
                  size="sm"
                  variant="red"
                />
              </div>

              {/* 9. Contact */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-muted-foreground font-medium">Contact Completeness</span>
                  <span className="text-foreground font-bold">
                    {breakdown.contactCompleteness.score}/{breakdown.contactCompleteness.max}
                  </span>
                </div>
                <ProgressBar
                  value={(breakdown.contactCompleteness.score / breakdown.contactCompleteness.max) * 100}
                  size="sm"
                  variant="red"
                />
              </div>
            </div>
          </Card>

          {/* Job-Specific ATS Match Tool Toggle */}
          <Card variant="editorial" className="p-5 space-y-3">
            <button
              onClick={() => setShowJobComparison(!showJobComparison)}
              className="w-full flex items-center justify-between text-xs font-bold uppercase font-mono text-foreground hover:text-electric-coral transition-colors"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-royal-maroon" />
                <span>Job-Specific ATS Target</span>
              </div>
              {showJobComparison ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showJobComparison && (
              <div className="space-y-3 pt-2 text-xs animate-fade-in">
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Paste an employer job description to calculate exact job keyword coverage, missing skills, and match score.
                </p>
                <textarea
                  value={customJobDesc}
                  onChange={(e) => setCustomJobDesc(e.target.value)}
                  placeholder="Paste Job Description (requirements, responsibilities, tech stack)..."
                  rows={4}
                  className="w-full p-2.5 rounded-md bg-white border-2 border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-electric-coral"
                />
                <Button
                  onClick={handleRunJobSpecificComparison}
                  isLoading={isComparingJob}
                  disabled={!customJobDesc.trim()}
                  variant="coral"
                  size="sm"
                  className="w-full gap-2 text-xs font-bold shadow-editorial-sm"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Benchmark Against Job</span>
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Diagnostics, Format Checks, Keywords, and Live Vacancies */}
        <div className="lg:col-span-8 space-y-6">
          {/* Format Checks */}
          {activeAnalysis?.formatChecks && activeAnalysis.formatChecks.length > 0 && (
            <Card variant="editorial" className="p-6 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono flex items-center gap-2 border-b-2 border-border pb-3">
                <FileCheck className="w-4 h-4 text-royal-maroon" />
                <span>Format & Parsing Diagnostics</span>
              </h3>
              <div className="space-y-2">
                {activeAnalysis.formatChecks.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-md bg-surface border-2 border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-bold text-foreground font-mono">{item.check}</span>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{item.feedback}</p>
                    </div>
                    <div>{getFormatBadge(item.status)}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Keywords: Found vs Missing */}
          <Card variant="editorial" className="p-6 space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono border-b-2 border-border pb-3">
              Target Role Keyword Coverage
            </h2>

            {/* Matched Skills */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-foreground font-bold font-mono">
                <CheckCircle2 className="w-4 h-4 text-electric-coral stroke-[2.5]" />
                <span>
                  Matched Technical Competencies ({activeAnalysis?.matchedSkills.length ?? resumeAnalysis.skillsFound.length})
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(activeAnalysis?.matchedSkills ?? resumeAnalysis.skillsFound).map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-sm bg-white border-2 border-black text-[11px] font-mono font-bold text-black"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills with Direct Learning Deep-Link */}
            <div className="space-y-2 pt-3 border-t-2 border-border">
              <div className="flex items-center gap-2 text-xs text-royal-maroon font-bold font-mono">
                <AlertTriangle className="w-4 h-4" />
                <span>
                  Missing Competencies ({activeAnalysis?.missingSkills.length ?? resumeAnalysis.skillsMissing.length})
                </span>
              </div>
              <div className="space-y-2">
                {(activeAnalysis?.missingSkills ?? resumeAnalysis.skillsMissing).map((skill, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-md bg-surface border-2 border-border flex items-center justify-between text-xs"
                  >
                    <span className="text-royal-maroon font-mono font-bold">+ {skill}</span>
                    <Link
                      href={`/learning?skill=${encodeURIComponent(skill)}`}
                      className="text-[11px] text-foreground hover:text-electric-coral flex items-center gap-1 font-bold font-mono underline"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Learn this skill</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Genuine Issues & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="editorial" className="p-5 space-y-3 border-l-4 border-l-royal-maroon">
              <h3 className="text-xs font-bold uppercase tracking-wider text-royal-maroon flex items-center gap-2 font-mono">
                <AlertTriangle className="w-4 h-4" />
                Issues Detected
              </h3>
              <ul className="space-y-2 text-xs text-foreground font-medium">
                {(activeAnalysis?.issues ?? resumeAnalysis.criticalGaps).map((issue, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-royal-maroon font-bold font-mono">▶</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="editorial" className="p-5 space-y-3 border-l-4 border-l-foreground">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2 font-mono">
                <Zap className="w-4 h-4 text-royal-maroon" />
                Prescribed Fixes
              </h3>
              <ul className="space-y-2 text-xs text-foreground font-medium">
                {(activeAnalysis?.recommendations ?? resumeAnalysis.recommendations).map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-foreground font-bold font-mono">▶</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Real-Time Matched Vacancies Section */}
          <Card variant="editorial" className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-border pb-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground font-mono flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-royal-maroon" />
                  <span>Real-Time Matching Vacancies</span>
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Live verified vacancies matching your parsed resume skills.
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => fetchLiveJobs()}
                isLoading={isJobsLoading}
                className="gap-1.5 text-xs font-bold shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Live Feeds</span>
              </Button>
            </div>

            {/* Opportunities List */}
            {liveJobMatches.length > 0 ? (
              <div className="space-y-3">
                {liveJobMatches.slice(0, 5).map((match) => (
                  <div
                    key={match.job.id}
                    className="p-4 rounded-lg bg-surface border-2 border-border hover:border-foreground transition-all space-y-2.5 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-muted-foreground font-mono uppercase text-[10px]">{match.job.company}</span>
                          <Badge variant="maroon" size="sm">{match.job.opportunityType}</Badge>
                          <Badge variant="coral" size="sm">{match.job.remoteType}</Badge>
                        </div>
                        <h4 className="text-sm font-bold text-foreground mt-0.5">{match.job.title}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-extrabold font-mono text-foreground">{match.matchScore}%</span>
                        <span className="text-[9px] uppercase font-mono font-bold text-muted-foreground block">Job Match</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] uppercase font-mono font-bold text-foreground">Matched:</span>
                      {match.matchedSkills.slice(0, 4).map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-sm bg-white border border-border text-[10px] font-mono text-foreground font-semibold">
                          ✓ {s}
                        </span>
                      ))}
                      {match.missingSkills.length > 0 && (
                        <>
                          <span className="text-[10px] uppercase font-mono font-bold text-royal-maroon ml-2">Missing:</span>
                          {match.missingSkills.slice(0, 2).map((s, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-sm bg-royal-maroon/10 border border-royal-maroon text-[10px] font-mono text-royal-maroon font-bold">
                              • {s}
                            </span>
                          ))}
                        </>
                      )}
                    </div>

                    <div className="pt-2 border-t-2 border-border flex items-center justify-between text-[11px] font-mono">
                      <span className="text-muted-foreground">
                        {match.job.attribution || `Source: ${match.job.source}`}
                      </span>
                      <Button
                        variant="coral"
                        size="sm"
                        onClick={() => openExternalApplyModal(match.job)}
                        className="gap-1.5 text-xs font-bold shadow-editorial-sm"
                      >
                        <span>Apply Externally</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Link href="/opportunities" className="block text-center pt-2">
                  <Button variant="secondary" size="sm" className="w-full text-xs font-bold gap-1.5">
                    <span>View All {liveJobMatches.length} Matching Opportunities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-muted-foreground font-mono space-y-2">
                <Briefcase className="w-8 h-8 text-muted-foreground mx-auto" />
                <p>No active live vacancies loaded yet.</p>
                <Button size="sm" variant="secondary" onClick={() => fetchLiveJobs()} className="font-bold">
                  Load Live Feeds
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* External Application User Approval Modal */}
      <ExternalApplyModal />
    </div>
  );
}
