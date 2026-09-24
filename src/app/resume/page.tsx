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
  const { resumeData, updateResume, resumeAnalysis } = useCareer();
  const [formData, setFormData] = useState<ResumeData>(resumeData);
  const [activeSection, setActiveSection] = useState<"personal" | "summary" | "skills" | "experience" | "projects" | "education">("personal");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateResume(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="champagne" size="sm">Phase 11</Badge>
            <span className="text-xs text-pearl-muted font-mono uppercase tracking-wider">
              ATS Standard Verification
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary tracking-tight">
            ATS-Optimized Resume Builder
          </h1>
          <p className="text-xs sm:text-sm text-pearl-muted mt-1 max-w-2xl">
            Single-column, machine-readable resume format structured specifically for ATS scanners and senior technical hiring managers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/resume/analyze">
            <Button variant="secondary" size="sm" className="gap-1.5 text-champagne border-champagne/30">
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
        <div className="lg:col-span-5 rounded-2xl bg-surface-card border border-surface-border p-5 space-y-5">
          {/* Section Navigation Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-navy-950 rounded-lg border border-white/5 text-xs">
            {(["personal", "summary", "skills", "experience", "projects", "education"] as const).map((sec) => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`px-3 py-1.5 rounded-md capitalize font-medium transition-all ${
                  activeSection === sec
                    ? "bg-navy-800 text-champagne border border-champagne/30 font-semibold"
                    : "text-pearl-muted hover:text-pearl-primary"
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Section 1: Personal Info */}
          {activeSection === "personal" && (
            <div className="space-y-3.5 text-xs animate-fade-in">
              <h3 className="font-semibold text-pearl-primary uppercase tracking-wider text-[11px]">
                Personal & Contact Details
              </h3>
              <div className="space-y-1">
                <label className="text-pearl-muted">Full Name</label>
                <input
                  type="text"
                  value={formData.personalInfo.fullName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, fullName: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne"
                />
              </div>

              <div className="space-y-1">
                <label className="text-pearl-muted">Target Professional Title</label>
                <input
                  type="text"
                  value={formData.personalInfo.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, title: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-pearl-muted">Email</label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, email: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-lg bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-pearl-muted">Phone</label>
                  <input
                    type="text"
                    value={formData.personalInfo.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, phone: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-lg bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-pearl-muted">Location</label>
                <input
                  type="text"
                  value={formData.personalInfo.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, location: e.target.value },
                    })
                  }
                  className="w-full p-2.5 rounded-lg bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-pearl-muted">GitHub Profile</label>
                  <input
                    type="text"
                    value={formData.personalInfo.github}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, github: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-lg bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne font-mono text-[11px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-pearl-muted">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={formData.personalInfo.linkedin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        personalInfo: { ...formData.personalInfo, linkedin: e.target.value },
                      })
                    }
                    className="w-full p-2.5 rounded-lg bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Summary */}
          {activeSection === "summary" && (
            <div className="space-y-3 text-xs animate-fade-in">
              <h3 className="font-semibold text-pearl-primary uppercase tracking-wider text-[11px]">
                Professional Summary
              </h3>
              <p className="text-[11px] text-pearl-muted leading-relaxed">
                2-3 punchy sentences summarizing your engineering core, stack, and demonstrated impact.
              </p>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                rows={6}
                className="w-full p-3 rounded-lg bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne resize-y leading-relaxed"
              />
            </div>
          )}

          {/* Section 3: Skills */}
          {activeSection === "skills" && (
            <div className="space-y-3.5 text-xs animate-fade-in">
              <h3 className="font-semibold text-pearl-primary uppercase tracking-wider text-[11px]">
                Technical Skills (Categorized)
              </h3>
              {formData.skills.map((cat, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-navy-950 border border-white/5 space-y-1.5">
                  <span className="font-bold text-champagne text-[11px]">{cat.category}</span>
                  <input
                    type="text"
                    value={cat.items.join(", ")}
                    onChange={(e) => {
                      const updated = [...formData.skills];
                      updated[idx].items = e.target.value.split(",").map((s) => s.trim());
                      setFormData({ ...formData, skills: updated });
                    }}
                    className="w-full p-2 rounded bg-black border border-white/10 text-xs text-pearl-primary font-mono text-[11px] focus:outline-none focus:border-champagne"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Section 4: Experience */}
          {activeSection === "experience" && (
            <div className="space-y-4 text-xs animate-fade-in">
              <h3 className="font-semibold text-pearl-primary uppercase tracking-wider text-[11px]">
                Work & Internship Experience
              </h3>
              {formData.experience.map((exp, idx) => (
                <div key={exp.id} className="p-3.5 rounded-lg bg-navy-950 border border-white/5 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-pearl-primary">{exp.role}</span>
                    <span className="text-champagne font-mono">{exp.period}</span>
                  </div>
                  <p className="text-pearl-muted text-[11px]">{exp.company} • {exp.location}</p>
                  <textarea
                    value={exp.highlights.join("\n")}
                    onChange={(e) => {
                      const updated = [...formData.experience];
                      updated[idx].highlights = e.target.value.split("\n").filter(Boolean);
                      setFormData({ ...formData, experience: updated });
                    }}
                    rows={4}
                    placeholder="Enter bullet points (one per line)..."
                    className="w-full p-2 rounded bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne leading-relaxed"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Section 5: Projects */}
          {activeSection === "projects" && (
            <div className="space-y-4 text-xs animate-fade-in">
              <h3 className="font-semibold text-pearl-primary uppercase tracking-wider text-[11px]">
                Production Projects
              </h3>
              {formData.projects.map((proj, idx) => (
                <div key={proj.id} className="p-3.5 rounded-lg bg-navy-950 border border-white/5 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-pearl-primary">{proj.name}</span>
                    <span className="text-champagne font-mono text-[10px]">{proj.technologies.join(", ")}</span>
                  </div>
                  <textarea
                    value={proj.highlights.join("\n")}
                    onChange={(e) => {
                      const updated = [...formData.projects];
                      updated[idx].highlights = e.target.value.split("\n").filter(Boolean);
                      setFormData({ ...formData, projects: updated });
                    }}
                    rows={4}
                    className="w-full p-2 rounded bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne leading-relaxed"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Section 6: Education */}
          {activeSection === "education" && (
            <div className="space-y-3.5 text-xs animate-fade-in">
              <h3 className="font-semibold text-pearl-primary uppercase tracking-wider text-[11px]">
                Academic Background
              </h3>
              {formData.education.map((edu, idx) => (
                <div key={edu.id} className="p-3 rounded-lg bg-navy-950 border border-white/5 space-y-1.5">
                  <span className="font-bold text-pearl-primary">{edu.institution}</span>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => {
                      const updated = [...formData.education];
                      updated[idx].degree = e.target.value;
                      setFormData({ ...formData, education: updated });
                    }}
                    className="w-full p-2 rounded bg-black border border-white/10 text-xs text-pearl-primary focus:outline-none focus:border-champagne"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <Button onClick={handleSave} size="sm" className="w-full gap-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isSaved ? "Saved Successfully!" : "Save & Sync Resume Data"}</span>
            </Button>
          </div>
        </div>

        {/* Right Column: Live ATS-Standard Resume Document (7 cols) */}
        <div className="lg:col-span-7 sticky top-20">
          <div className="p-8 sm:p-10 rounded-xl bg-pearl text-black shadow-2xl space-y-6 font-sans border border-pearl/40 min-h-[750px]">
            {/* Candidate Header */}
            <div className="text-center space-y-1 border-b border-black/20 pb-4">
              <h2 className="text-2xl font-bold font-serif tracking-tight text-black uppercase">
                {formData.personalInfo.fullName}
              </h2>
              <p className="text-xs font-semibold text-black/80">{formData.personalInfo.title}</p>
              <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-black/70 pt-1">
                <span>{formData.personalInfo.location}</span>
                <span>•</span>
                <span>{formData.personalInfo.phone}</span>
                <span>•</span>
                <span className="underline">{formData.personalInfo.email}</span>
                <span>•</span>
                <span className="font-mono text-[10px]">{formData.personalInfo.github}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-black border-b border-black/20 pb-0.5">
                Professional Summary
              </h3>
              <p className="text-[11px] text-black/80 leading-relaxed text-justify">
                {formData.summary}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-black border-b border-black/20 pb-0.5">
                Technical Skills
              </h3>
              <div className="space-y-1 text-[11px]">
                {formData.skills.map((cat, i) => (
                  <div key={i} className="flex items-baseline gap-2">
                    <strong className="text-black font-semibold shrink-0">{cat.category}:</strong>
                    <span className="text-black/80">{cat.items.join(", ")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-black border-b border-black/20 pb-0.5">
                Experience
              </h3>
              <div className="space-y-3">
                {formData.experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 text-[11px]">
                    <div className="flex justify-between font-semibold text-black">
                      <span>{exp.role} — <em className="font-normal">{exp.company}</em></span>
                      <span className="font-mono text-[10px] text-black/70">{exp.period}</span>
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-0.5 text-black/80 leading-relaxed">
                      {exp.highlights.map((h, idx) => (
                        <li key={idx}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-black border-b border-black/20 pb-0.5">
                Verified Production Projects
              </h3>
              <div className="space-y-3">
                {formData.projects.map((proj) => (
                  <div key={proj.id} className="space-y-1 text-[11px]">
                    <div className="flex justify-between font-semibold text-black">
                      <span>{proj.name}</span>
                      <span className="font-mono text-[10px] text-black/70">[{proj.technologies.slice(0, 3).join(", ")}]</span>
                    </div>
                    <ul className="list-disc list-outside pl-4 space-y-0.5 text-black/80 leading-relaxed">
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
              <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-black border-b border-black/20 pb-0.5">
                Education
              </h3>
              {formData.education.map((edu) => (
                <div key={edu.id} className="flex justify-between text-[11px] text-black/80">
                  <div>
                    <strong className="text-black font-semibold">{edu.institution}</strong>
                    <p className="text-[10px]">{edu.degree} ({edu.score})</p>
                  </div>
                  <span className="font-mono text-[10px]">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
