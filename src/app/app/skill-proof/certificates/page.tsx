"use client";

import React from "react";
import Link from "next/link";
import { Award, ShieldCheck, ExternalLink } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { SkillProofNav } from "@/components/skill-proof/SkillProofNav";

const CERTIFICATES = [
  {
    id: "cert-01",
    title: "Full-Stack Development Competency Certificate",
    issuer: "Learn-2-Hire Verification Protocol",
    issuedDate: "2026-10-02",
    credentialId: "L2H-FS-2026-8841",
    status: "Verified & Active",
  },
  {
    id: "cert-02",
    title: "Algorithms & Asynchronous JS Specialization",
    issuer: "Learn-2-Hire Verification Protocol",
    issuedDate: "2026-10-01",
    credentialId: "L2H-ALGO-2026-1920",
    status: "Verified & Active",
  },
];

export default function SkillProofCertificatesPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <SkillProofNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Verified Credentials
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Verifiable Certificates & Badges
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Certificates generated automatically upon completing diagnostic assessments and capstone project rubric grading.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTIFICATES.map((cert) => (
          <div key={cert.id} className="p-6 bg-white border-2 border-black shadow-editorial-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-500 text-[10px] font-mono font-bold uppercase">
                {cert.status}
              </span>
              <span className="text-xs font-mono text-muted">{cert.credentialId}</span>
            </div>
            <h3 className="text-base font-black uppercase text-black">{cert.title}</h3>
            <p className="text-xs text-muted">Issuer: {cert.issuer} • Issued on {cert.issuedDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
