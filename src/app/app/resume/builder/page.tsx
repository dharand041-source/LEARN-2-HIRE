"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, Save, CheckCircle2, ArrowRight, Plus, Trash2 } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ResumeNav } from "@/components/resume/ResumeNav";
import { ROUTES } from "@/lib/routes";
import { ResumeData } from "@/types";

export default function ResumeBuilderPage() {
  const { resumeData, updateResume } = useCareer();
  const [formData, setFormData] = useState<ResumeData>(resumeData);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateResume(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ResumeNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Resume Builder
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Structured ATS Resume Editor
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Built from actual profile evidence. Do not invent experience or skills.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-editorial-xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaved ? "Saved Successfully!" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Editor Form (7 cols) */}
        <div className="lg:col-span-7 p-6 bg-white border-2 border-black shadow-editorial-sm space-y-6">
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-black border-b border-black/10 pb-2">
              1. Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono uppercase text-muted font-bold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.personalInfo.fullName}
                  onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, fullName: e.target.value } })}
                  className="w-full p-2.5 bg-paper border border-black text-xs font-bold focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono uppercase text-muted font-bold block mb-1">Target Title</label>
                <input
                  type="text"
                  value={formData.personalInfo.title}
                  onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, title: e.target.value } })}
                  className="w-full p-2.5 bg-paper border border-black text-xs font-bold focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono uppercase text-muted font-bold block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, email: e.target.value } })}
                  className="w-full p-2.5 bg-paper border border-black text-xs font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono uppercase text-muted font-bold block mb-1">Location</label>
                <input
                  type="text"
                  value={formData.personalInfo.location}
                  onChange={(e) => setFormData({ ...formData, personalInfo: { ...formData.personalInfo, location: e.target.value } })}
                  className="w-full p-2.5 bg-paper border border-black text-xs font-bold focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-black border-b border-black/10 pb-2">
              2. Professional Summary
            </h2>
            <textarea
              rows={4}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full p-3 bg-paper border border-black text-xs font-medium focus:outline-none leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-black border-b border-black/10 pb-2">
              3. Verified Technical Skills
            </h2>
            <input
              type="text"
              value={formData.skills[0]?.items.join(", ")}
              onChange={(e) => {
                const items = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                setFormData({
                  ...formData,
                  skills: [{ category: "Core Technologies", items }],
                });
              }}
              className="w-full p-2.5 bg-paper border border-black text-xs font-mono focus:outline-none"
              placeholder="React, TypeScript, Node.js, PostgreSQL, Docker..."
            />
          </div>
        </div>

        {/* Live Clean Document Preview (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-white border-2 border-black shadow-editorial-md space-y-4 font-sans text-xs">
          <span className="text-[10px] font-mono uppercase text-muted font-bold block border-b border-black/10 pb-2">
            ATS Single-Column Preview
          </span>

          <div className="text-center space-y-1 pb-3 border-b border-black/20">
            <h3 className="text-lg font-black uppercase tracking-tight text-black">{formData.personalInfo.fullName}</h3>
            <p className="font-bold text-royal-maroon">{formData.personalInfo.title}</p>
            <p className="text-[11px] text-muted">{formData.personalInfo.email} • {formData.personalInfo.location}</p>
          </div>

          <div className="space-y-1">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-black border-b border-black/10">Summary</h4>
            <p className="text-[11px] text-black/80 leading-relaxed">{formData.summary}</p>
          </div>

          <div className="space-y-1">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-black border-b border-black/10">Core Technical Skills</h4>
            <p className="text-[11px] font-mono text-black">{formData.skills[0]?.items.join(" • ")}</p>
          </div>

          <div className="pt-4 border-t border-black/10 flex justify-end">
            <Link href={ROUTES.app.resume.analyzer}>
              <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-editorial-xs">
                Run ATS Analyzer
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
