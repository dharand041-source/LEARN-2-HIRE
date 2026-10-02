"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  GraduationCap,
  Rocket,
  Globe,
  Sparkles,
  Bookmark,
  CheckCircle2,
  LayoutGrid,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

const OPPORTUNITY_TABS = [
  { label: "All Hub", href: ROUTES.app.opportunities.root, icon: LayoutGrid },
  { label: "Jobs", href: ROUTES.app.opportunities.jobs, icon: Briefcase },
  { label: "Internships", href: ROUTES.app.opportunities.internships, icon: GraduationCap },
  { label: "Startups", href: ROUTES.app.opportunities.startups, icon: Rocket },
  { label: "Remote", href: ROUTES.app.opportunities.remote, icon: Globe },
  { label: "Recommended", href: ROUTES.app.opportunities.recommended, icon: Sparkles },
  { label: "Saved", href: ROUTES.app.opportunities.saved, icon: Bookmark },
  { label: "Eligibility", href: ROUTES.app.opportunities.eligibility, icon: CheckCircle2 },
];

export function OpportunitiesNav() {
  const pathname = usePathname();

  return (
    <div className="border-b-2 border-black bg-white overflow-x-auto">
      <div className="max-w-6xl mx-auto flex items-center gap-1 px-4 py-2">
        {OPPORTUNITY_TABS.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer border ${
                isActive
                  ? "bg-royal-maroon text-white border-black shadow-editorial-xs"
                  : "bg-surface-subtle text-muted hover:text-black hover:bg-stone-100 border-transparent"
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
