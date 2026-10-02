"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Code2,
  Binary,
  Database,
  Bug,
  Calculator,
  Brain,
  MessageSquare,
  Briefcase,
  Building2,
  History,
  LayoutGrid,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

const PRACTICE_TABS = [
  { label: "Hub", href: ROUTES.app.practice.root, icon: LayoutGrid },
  { label: "Coding", href: ROUTES.app.practice.coding, icon: Code2 },
  { label: "DSA", href: ROUTES.app.practice.dsa, icon: Binary },
  { label: "SQL", href: ROUTES.app.practice.sql, icon: Database },
  { label: "Debugging", href: ROUTES.app.practice.debugging, icon: Bug },
  { label: "Aptitude", href: ROUTES.app.practice.aptitude, icon: Calculator },
  { label: "Logical", href: ROUTES.app.practice.logical, icon: Brain },
  { label: "Verbal", href: ROUTES.app.practice.verbal, icon: MessageSquare },
  { label: "Role", href: ROUTES.app.practice.role, icon: Briefcase },
  { label: "Company", href: ROUTES.app.practice.company, icon: Building2 },
  { label: "History", href: ROUTES.app.practice.history, icon: History },
];

export function PracticeNav() {
  const pathname = usePathname();

  return (
    <div className="border-b-2 border-black bg-white overflow-x-auto">
      <div className="max-w-6xl mx-auto flex items-center gap-1 px-4 py-2">
        {PRACTICE_TABS.map((tab) => {
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
