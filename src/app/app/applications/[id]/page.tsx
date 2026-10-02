"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ApplicationsNav } from "@/components/applications/ApplicationsNav";
import { ROUTES } from "@/lib/routes";
import { ApplicationStatus } from "@/types";

export default function ApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const appId = (params?.id as string) || "app-1";
  const { applications, updateApplicationStatus } = useCareer();

  const app = applications.find((a) => a.id === appId) || {
    id: appId,
    role: "Full-Stack Software Engineer",
    company: "Zoho Corporation",
    location: "Chennai, India",
    type: "Job",
    status: "Applied" as ApplicationStatus,
    appliedDate: "2026-10-02",
    salary: "₹12,00,000 - ₹18,00,000 / yr",
    matchScore: 88,
    notes: "Applied directly on official careers portal with verified resume version.",
    rejectionReason: undefined,
  };

  const [currentStatus, setCurrentStatus] = useState<ApplicationStatus>(app.status);
  const [notes, setNotes] = useState(app.notes || "");
  const [rejectionReason, setRejectionReason] = useState<string>((app as any).rejectionReason || "");
  const [isSaved, setIsSaved] = useState(false);

  const handleUpdate = () => {
    updateApplicationStatus(app.id, currentStatus);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <ApplicationsNav />

      <div className="flex items-center gap-2">
        <Link href={ROUTES.app.applications.root} className="text-xs font-bold text-muted hover:text-black flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Applications</span>
        </Link>
      </div>

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-black text-white text-xs font-mono font-bold uppercase">{app.company}</span>
            <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
              {app.type}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
            {app.role}
          </h1>
          <p className="text-xs sm:text-sm text-white/80">
            {app.location} • Applied on {app.appliedDate || "2026-10-02"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleUpdate}
            className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors shadow-editorial-xs cursor-pointer"
          >
            {isSaved ? "Saved!" : "Update Status"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 p-6 bg-white border-2 border-black shadow-editorial-sm space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-black block">Application Status</label>
            <select
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value as ApplicationStatus)}
              className="w-full p-3 bg-paper border-2 border-black text-xs font-bold focus:outline-none"
            >
              <option value="Saved">Saved</option>
              <option value="Approved">Ready to Apply</option>
              <option value="Applied">Applied</option>
              <option value="Assessment">Technical Assessment</option>
              <option value="Interview">Interview Scheduled</option>
              <option value="Selected">Offer Received / Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-black block">Recruiter / Process Notes</label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 bg-paper border border-black text-xs font-medium focus:outline-none leading-relaxed"
              placeholder="Record interviewer names, date of next round, assessment instructions..."
            />
          </div>

          {/* Outcome Section */}
          {currentStatus === "Rejected" && (
            <div className="p-5 bg-rose-50 border-2 border-rose-500 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-700" />
                <h3 className="text-xs font-black uppercase text-rose-950">Outcome Post-Mortem</h3>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed">
                If the employer provided feedback or a specific rejection reason, store it below to feed into the continuous Retraining & Improvement Loop.
              </p>
              <input
                type="text"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Needed more production Docker/Kubernetes experience..."
                className="w-full p-2.5 bg-white border border-rose-400 text-xs font-semibold focus:outline-none"
              />
              <div className="text-[11px] font-mono text-rose-800">
                Current Reason: {rejectionReason.trim() ? rejectionReason : "Reason not provided."}
              </div>

              <div className="pt-2">
                <Link href={ROUTES.app.improve.retraining}>
                  <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                    <span>Generate Targeted Retraining Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>
          )}

          {currentStatus === "Selected" && (
            <div className="p-5 bg-emerald-50 border-2 border-emerald-500 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <h3 className="text-xs font-black uppercase text-emerald-950">Offer Received / Hired!</h3>
              </div>
              <p className="text-xs text-emerald-900">
                Congratulations! Your verified proof, capstone project, and interview defense successfully secured this placement.
              </p>
            </div>
          )}
        </div>

        {/* Right Summary Column (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
          <h3 className="text-xs font-black uppercase text-black">Application Summary</h3>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-paper border border-black/20 flex justify-between">
              <span className="text-muted">Target Company</span>
              <span className="font-bold text-black">{app.company}</span>
            </div>
            <div className="p-3 bg-paper border border-black/20 flex justify-between">
              <span className="text-muted">Role Title</span>
              <span className="font-bold text-black">{app.role}</span>
            </div>
            <div className="p-3 bg-paper border border-black/20 flex justify-between">
              <span className="text-muted">Compatibility Match</span>
              <span className="font-mono font-bold text-black">{app.matchScore || 88}%</span>
            </div>
            <div className="p-3 bg-paper border border-black/20 flex justify-between">
              <span className="text-muted">Applied Date</span>
              <span className="font-mono text-black">{app.appliedDate || "2026-10-02"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
