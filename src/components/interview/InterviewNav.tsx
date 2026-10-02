"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Mic,
  Code2,
  Users,
  Compass,
  Volume2,
  Briefcase,
  Building2,
  Radio,
  History,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

const INTERVIEW_TABS = [
  { label: "Overview", href: ROUTES.app.interview.root, icon: Mic },
  { label: "Technical", href: ROUTES.app.interview.technical, icon: Code2 },
  { label: "HR", href: ROUTES.app.interview.hr, icon: Users },
  { label: "Behavioral", href: ROUTES.app.interview.behavioral, icon: Compass },
  { label: "Communication", href: ROUTES.app.interview.communication, icon: Volume2 },
  { label: "Role", href: ROUTES.app.interview.role, icon: Briefcase },
  { label: "Company", href: ROUTES.app.interview.company, icon: Building2 },
  { label: "Voice Mock", href: ROUTES.app.interview.mock, icon: Radio },
  { label: "History", href: ROUTES.app.interview.history, icon: History },
];

export function InterviewNav() {
  const pathname = usePathname();

  return (
    <div className="border-b-2 border-black bg-white overflow-x-auto">
      <div className="max-w-6xl mx-auto flex items-center gap-1 px-4 py-2">
        {INTERVIEW_TABS.map((tab) => {
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
