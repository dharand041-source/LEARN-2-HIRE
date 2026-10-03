"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Edit3,
  Copy,
  BarChart3,
  Target,
  History,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

const RESUME_TABS = [
  { label: "Overview", href: ROUTES.app.resume.root, icon: FileText },
  { label: "Builder", href: ROUTES.app.resume.builder, icon: Edit3 },
  { label: "Versions", href: ROUTES.app.resume.versions, icon: Copy },
  { label: "Analyzer", href: ROUTES.app.resume.analyzer, icon: BarChart3 },
  { label: "Job Match", href: ROUTES.app.resume.jobMatch, icon: Target },
  { label: "History", href: ROUTES.app.resume.history, icon: History },
];

export function ResumeNav() {
  const pathname = usePathname();

  return (
    <div className="border-b-2 border-ink-black bg-warm-cream overflow-x-auto">
      <div className="max-w-6xl mx-auto flex items-center gap-1 px-4 py-2">
        {RESUME_TABS.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer border ${
                isActive
                  ? "bg-rose text-paper-white border-2 border-ink-black shadow-editorial-xs"
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
