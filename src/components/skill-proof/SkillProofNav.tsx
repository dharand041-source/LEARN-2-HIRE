"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  FileCode,
  FolderGit2,
  Award,
  Trophy,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

const PROOF_TABS = [
  { label: "Overview", href: ROUTES.app.skillProof.root, icon: ShieldCheck },
  { label: "Skills", href: ROUTES.app.skillProof.skills, icon: CheckCircle2 },
  { label: "Evidence", href: ROUTES.app.skillProof.evidence, icon: FileCode },
  { label: "Projects", href: ROUTES.app.skillProof.projects, icon: FolderGit2 },
  { label: "Certificates", href: ROUTES.app.skillProof.certificates, icon: Award },
  { label: "Achievements", href: ROUTES.app.skillProof.achievements, icon: Trophy },
];

export function SkillProofNav() {
  const pathname = usePathname();

  return (
    <div className="border-b-2 border-ink-black bg-warm-cream overflow-x-auto">
      <div className="max-w-6xl mx-auto flex items-center gap-1 px-4 py-2">
        {PROOF_TABS.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer border ${
                isActive
                  ? "bg-primary-orange text-paper-white border-2 border-ink-black shadow-editorial-xs"
                  : "bg-paper-white text-ink-black hover:text-ink-black hover:bg-soft-pink border border-ink-black/20"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
