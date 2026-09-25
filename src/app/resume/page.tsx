"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  Download,
  Share2,
  ArrowRight,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Award,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ResumeData } from "@/types";

export default function ResumeBuilderPage() {
  const {
    resumeData,
    updateResume,
    resumeAnalysis,
    uploadAndAnalyzeResume,
    reanalyzeResume,
    isAnalyzingResume,
  } = useCareer();
  const [formData, setFormData] = useState<ResumeData>(resumeData);
  const [activeSection, setActiveSection] = useState<"personal" | "summary" | "skills" | "experience" | "projects" | "education">("personal");
  const [isSaved, setIsSaved] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSave = () => {
    updateResume(formData);
    reanalyzeResume();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleUploadResume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const { parsed } = await uploadAndAnalyzeResume(file);
        const updated: ResumeData = {
          ...formData,
          personalInfo: {
            fullName: parsed.personalInfo.fullName || formData.personalInfo.fullName,
            title: parsed.jobTitles[0] || formData.personalInfo.title,
            email: parsed.personalInfo.email || formData.personalInfo.email,
            phone: parsed.personalInfo.phone || formData.personalInfo.phone,
            location: parsed.personalInfo.location || formData.personalInfo.location,
            linkedin: parsed.personalInfo.linkedin || formData.personalInfo.linkedin,
            github: parsed.personalInfo.github || formData.personalInfo.github,
            portfolio: parsed.personalInfo.portfolio || formData.personalInfo.portfolio,
          },
          summary: parsed.summary || formData.summary,
          skills: [
            {
              category: "Extracted Technical Skills",
              items: parsed.technicalSkills.length > 0 ? parsed.technicalSkills : formData.skills[0].items,
            },
          ],
        };
        setFormData(updated);
        updateResume(updated);
        reanalyzeResume();
      } catch (err: any) {
        alert(err.message || "Failed to parse resume document.");
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="imperial" size="sm">Phase 11</Badge>
            <span className="text-xs text-night-muted font-mono uppercase tracking-wider">
              ATS Standard Verification
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-night tracking-tight">
            ATS-Optimized Resume Builder
          </h1>
          <p className="text-xs sm:text-sm text-night-muted mt-1 max-w-2xl">
            Single-column, machine-readable resume format structured specifically for ATS scanners and senior technical hiring managers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleUploadResume}
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            isLoading={isAnalyzingResume}
            className="gap-1.5 text-xs font-semibold"
          >
            <span>Import PDF / DOCX</span>
          </Button>

          <Link href="/resume/analyze">
            <Button variant="secondary" size="sm" className="gap-1.5 text-imperial border-imperial/30 hover:bg-imperial-50">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ATS Score: {resumeAnalysis.atsCompatibilityScore}%</span>
            </Button>
          </Link>
          <Button onClick={handleSave} size="sm" className="gap-1.5 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isSaved ? "Saved to Profile!" : "Save Changes"}</span>
          </Button>
        </div>
      </div>

      {/* Main Grid: Form Editor (5 cols) & Live ATS Preview (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-surface-border p-5 sm:p-6 space-y-6 shadow-sm">
          {/* Section Navigation Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-surface-subtle rounded-xl border border-surface-border text-xs">
            {(["personal", "summary", "skills", "experience", "projects", "education"] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                  activeSection === sec
                    ? "bg-white text-imperial font-bold shadow-sm border border-surface-border ring-1 ring-black/5"
                    : "text-night-muted hover:text-night hover:bg-white/60"
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Section 1: Personal Info */}
          {activeSection === "personal" && (
            <div className="space-y-4 text-xs animate-fade-in">
              <div className="border-b border-surface-border pb-2">
                <h3 className="font-bold text-night uppercase tracking-wider text-xs">
                  Personal & Contact Details
                </h3>
                <p className="text-[11px] text-night-muted mt-0.5">
                  Accurate details formatted to prevent ATS parsing errors.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-night/80">Full Name</label>
                <input
                  type="text"
                  value={formData.personalInfo.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, fullName: e.target.value },
                    })
                  }
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle/60 hover:bg-white focus:bg-white border border-surface-border text-xs text-night font-medium placeholder:text-night-muted/50 focus:outline-none focus:border-imperial focus:ring-2 focus:ring-imperial/10 transition-all shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-night/80">Target Professional Title</label>
                <input
                  type="text"
                  value={formData.personalInfo.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, title: e.target.value },
                    })
                  }
                  placeholder="e.g. Senior Full Stack Engineer"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle/60 hover:bg-white focus:bg-white border border-surface-border text-xs text-night font-medium placeholder:text-night-muted/50 focus:outline-none focus:border-imperial focus:ring-2 focus:ring-imperial/10 transition-all shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-night/80">Email</label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, email: e.target.value },
                      })
                    }
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle/60 hover:bg-white focus:bg-white border border-surface-border text-xs text-night font-medium placeholder:text-night-muted/50 focus:outline-none focus:border-imperial focus:ring-2 focus:ring-imperial/10 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-night/80">Phone</label>
                  <input
                    type="text"
                    value={formData.personalInfo.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, phone: e.target.value },
                      })
                    }
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle/60 hover:bg-white focus:bg-white border border-surface-border text-xs text-night font-medium placeholder:text-night-muted/50 focus:outline-none focus:border-imperial focus:ring-2 focus:ring-imperial/10 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-night/80">Location</label>
                <input
                  type="text"
                  value={formData.personalInfo.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, location: e.target.value },
                    })
                  }
                  placeholder="City, State / Country"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle/60 hover:bg-white focus:bg-white border border-surface-border text-xs text-night font-medium placeholder:text-night-muted/50 focus:outline-none focus:border-imperial focus:ring-2 focus:ring-imperial/10 transition-all shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-night/80">GitHub Profile</label>
                  <input
                    type="text"
                    value={formData.personalInfo.github}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, github: e.target.value },
                      })
                    }
                    placeholder="github.com/username"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle/60 hover:bg-white focus:bg-white border border-surface-border text-xs text-night font-mono text-[11px] placeholder:text-night-muted/50 focus:outline-none focus:border-imperial focus:ring-2 focus:ring-imperial/10 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-night/80">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={formData.personalInfo.linkedin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, linkedin: e.target.value },
                      })
                    }
                    placeholder="linkedin.com/in/username"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle/60 hover:bg-white focus:bg-white border border-surface-border text-xs text-night font-mono text-[11px] placeholder:text-night-muted/50 focus:outline-none focus:border-imperial focus:ring-2 focus:ring-imperial/10 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Summary */}
          {activeSection === "summary" && (
            <div className="space-y-3.5 text-xs animate-fade-in">
              <div className="border-b border-surface-border pb-2">
                <h3 className="font-bold text-night uppercase tracking-wider text-xs">
                  Professional Summary
                </h3>
                <p className="text-[11px] text-night-muted mt-0.5 leading-relaxed">
                  2-3 punchy sentences summarizing your engineering core, stack, and demonstrated business/system impact.
                </p>
              </div>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                rows={7}
                placeholder="Write your professional summary here..."
                className="w-full p-3.5 rounded-lg bg-surface-subtle/60 hover:bg-white focus:bg-white border border-surface-border text-xs text-night font-normal placeholder:text-night-muted/50 focus:outline-none focus:border-imperial focus:ring-2 focus:ring-imperial/10 transition-all shadow-sm resize-y leading-relaxed"
              />
            </div>
          )}

          {/* Section 3: Skills */}
          {activeSection === "skills" && (
            <div className="space-y-4 text-xs animate-fade-in">
              <div className="border-b border-surface-border pb-2">
                <h3 className="font-bold text-night uppercase tracking-wider text-xs">
                  Technical Skills (Categorized)
                </h3>
                <p className="text-[11px] text-night-muted mt-0.5">
                  Comma-separated skills grouped cleanly by domain for optimal ATS keyword scanning.
                </p>
              </div>

              {formData.skills.map((cat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border space-y-2">
                  <span className="font-bold text-imperial text-xs tracking-wide">{cat.category}</span>
                  <input
                    type="text"
                    value={cat.items.join(", ")}
                    onChange={(e) => {
                      const updated = [...formData.skills];
                      updated[idx].items = e.target.value.split(",").map((s) => s.trim());
                      setFormData({ ...formData, skills: updated });
                    }}
                    placeholder="Skill 1, Skill 2, Skill 3"
                    className="w-full p-2.5 rounded-lg bg-white border border-surface-border text-xs text-night font-mono text-[11px] focus:outline-none focus:border-imperial focus:ring-2 focus:ring-imperial/10 shadow-sm transition-all"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Section 4: Experience */}
          {activeSection === "experience" && (
            <div className="space-y-4 text-xs animate-fade-in">
              <div className="border-b border-surface-border pb-2">
                <h3 className="font-bold text-night uppercase tracking-wider text-xs">
                  Work & Internship Experience
                </h3>
                <p className="text-[11px] text-night-muted mt-0.5">
                  Action-verb bullet points emphasizing metrics, scale, and technological implementation.
                </p>
              </div>

              {formData.experience.map((exp, idx) => (
                <div key={exp.id} className="p-4 rounded-xl bg-surface-subtle border border-surface-border space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-night text-xs">{exp.role}</span>
                    <span className="text-imperial font-mono text-[10px] bg-imperial-50 border border-imperial-200 px-2 py-0.5 rounded-md self-start sm:self-auto">{exp.period}</span>
                  </div>
                  <p className="text-night-muted text-[11px]">{exp.company} • {exp.location}</p>
                  <textarea
                    value={exp.highlights.join("\n")}
                    onChange={(e) => {
                      const updated = [...formData.experience];
                      updated[idx].highlights = e.target.value.split("\n").filter(Boolean);
                      setFormData({ ...formData, experience: updated });
                    }}
                    rows={4}
                    placeholder="Enter bullet points (one per line)..."
                    className="w-full p-2.5 rounded-lg bg-white border border-surface-border text-xs text-night focus:outline-none focus:border-imperial focus:ring-2 focus:ring-imperial/10 leading-relaxed shadow-sm transition-all placeholder:text-night-muted/50"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Section 5: Projects */}
          {activeSection === "projects" && (
            <div className="space-y-4 text-xs animate-fade-in">
              <div className="border-b border-surface-border pb-2">
                <h3 className="font-bold text-night uppercase tracking-wider text-xs">
                  Production Projects
                </h3>
                <p className="text-[11px] text-night-muted mt-0.5">
                  High-signal repository or production projects with verifiable technical depth.
                </p>
              </div>

              {formData.projects.map((proj, idx) => (
                <div key={proj.id} className="p-4 rounded-xl bg-surface-subtle border border-surface-border space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-night text-xs">{proj.name}</span>
                    <span className="text-imperial font-mono text-[10px] bg-imperial-50 border border-imperial-200 px-2 py-0.5 rounded-md self-start sm:self-auto">{proj.technologies.join(", ")}</span>
                  </div>
                  <textarea
                    value={proj.highlights.join("\n")}
                    onChange={(e) => {
                      const updated = [...formData.projects];
                      updated[idx].highlights = e.target.value.split("\n").filter(Boolean);
                      setFormData({ ...formData, projects: updated });
                    }}
                    rows={4}
                    placeholder="Enter project bullet points (one per line)..."
                    className="w-full p-2.5 rounded-lg bg-white border border-surface-border text-xs text-night focus:outline-none focus:border-imperial focus:ring-2 focus:ring-imperial/10 leading-relaxed shadow-sm transition-all placeholder:text-night-muted/50"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Section 6: Education */}
          {activeSection === "education" && (
            <div className="space-y-4 text-xs animate-fade-in">
              <div className="border-b border-surface-border pb-2">
                <h3 className="font-bold text-night uppercase tracking-wider text-xs">
                  Academic Background
                </h3>
                <p className="text-[11px] text-night-muted mt-0.5">
                  Institutions, verified degrees, academic dates, and honors.
                </p>
              </div>

              {formData.education.map((edu, idx) => (
                <div key={edu.id} className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border space-y-2">
                  <span className="font-bold text-night text-xs">{edu.institution}</span>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const updated = [...formData.education];
                      updated[idx].degree = e.target.value;
                      setFormData({ ...formData, education: updated });
                    }}
                    placeholder="Degree title..."
                    className="w-full p-2.5 rounded-lg bg-white border border-surface-border text-xs text-night focus:outline-none focus:border-imperial focus:ring-2 focus:ring-imperial/10 shadow-sm transition-all"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-surface-border flex items-center justify-between">
            <Button onClick={handleSave} size="md" className="w-full gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSaved ? "Saved Successfully!" : "Save & Sync Resume Data"}</span>
            </Button>
          </div>
        </div>

        {/* Right Column: Live ATS-Standard Resume Document (7 cols) */}
        <div className="lg:col-span-7 sticky top-20">
          <div className="p-8 sm:p-10 rounded-2xl bg-white text-night shadow-lg space-y-6 font-sans border border-surface-border min-h-[750px]">
            {/* Candidate Header */}
            <div className="text-center space-y-1.5 border-b border-surface-border pb-5">
              <h2 className="text-2xl font-bold font-serif tracking-tight text-night uppercase">
                {formData.personalInfo.fullName || "Your Full Name"}
              </h2>
              <p className="text-xs font-semibold text-imperial tracking-wide">
                {formData.personalInfo.title || "Target Professional Title"}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-night-muted pt-1">
                {formData.personalInfo.location && <span>{formData.personalInfo.location}</span>}
                {formData.personalInfo.phone && <span>•</span>}
                {formData.personalInfo.phone && <span>{formData.personalInfo.phone}</span>}
                {formData.personalInfo.email && <span>•</span>}
                {formData.personalInfo.email && <span className="underline">{formData.personalInfo.email}</span>}
                {formData.personalInfo.github && <span>•</span>}
                {formData.personalInfo.github && <span className="font-mono text-[10px]">{formData.personalInfo.github}</span>}
                {formData.personalInfo.linkedin && <span>•</span>}
                {formData.personalInfo.linkedin && <span className="font-mono text-[10px]">{formData.personalInfo.linkedin}</span>}
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-night border-b border-surface-border pb-1">
                Professional Summary
              </h3>
              <p className="text-[11px] text-night-muted leading-relaxed text-justify">
                {formData.summary}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-night border-b border-surface-border pb-1">
                Technical Skills
              </h3>
              <div className="space-y-1.5 text-[11px]">
                {formData.skills.map((cat, i) => (
                  <div key={i} className="flex items-baseline gap-2">
                    <strong className="text-night font-semibold shrink-0">{cat.category}:</strong>
                    <span className="text-night-muted">{cat.items.join(", ")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-night border-b border-surface-border pb-1">
                Experience
              </h3>
              <div className="space-y-3.5">
                {formData.experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 text-[11px]">
                    <div className="flex justify-between font-semibold text-night">
                      <span>{exp.role} — <em className="font-normal text-night-muted">{exp.company}</em></span>
                      <span className="font-mono text-[10px] text-night-muted">{exp.period}</span>
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-0.5 text-night-muted leading-relaxed">
                      {exp.highlights.map((h, idx) => (
                        <li key={idx}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-night border-b border-surface-border pb-1">
                Verified Production Projects
              </h3>
              <div className="space-y-3.5">
                {formData.projects.map((proj) => (
                  <div key={proj.id} className="space-y-1 text-[11px]">
                    <div className="flex justify-between font-semibold text-night">
                      <span>{proj.name}</span>
                      <span className="font-mono text-[10px] text-imperial">[{proj.technologies.slice(0, 3).join(", ")}]</span>
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-0.5 text-night-muted leading-relaxed">
                      {proj.highlights.map((h, idx) => (
                        <li key={idx}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-night border-b border-surface-border pb-1">
                Education
              </h3>
              {formData.education.map((edu) => (
                <div key={edu.id} className="flex justify-between text-[11px] text-night-muted">
                  <div>
                    <strong className="text-night font-semibold">{edu.institution}</strong>
                    <p className="text-[10px] text-night-muted">{edu.degree} ({edu.score})</p>
                  </div>
                  <span className="font-mono text-[10px] text-night-muted">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
