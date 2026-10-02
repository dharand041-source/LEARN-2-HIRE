"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderGit2,
  Sparkles,
  Layers,
  Send,
  Code2,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

const PROJECT_TABS = [
  { label: "All Projects", href: ROUTES.app.projects.root, icon: FolderGit2 },
  { label: "Recommended", href: ROUTES.app.projects.recommended, icon: Sparkles },
  { label: "My Projects", href: ROUTES.app.projects.myProjects, icon: Layers },
];

export function ProjectsNav() {
  const pathname = usePathname();

  return (
    <div className="border-b-2 border-black bg-white overflow-x-auto">
      <div className="max-w-6xl mx-auto flex items-center gap-1 px-4 py-2">
        {PROJECT_TABS.map((tab) => {
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
