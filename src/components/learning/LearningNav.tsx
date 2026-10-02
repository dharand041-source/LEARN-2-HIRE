"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  BookOpen,
  FileText,
  Library,
  Code2,
  TrendingUp,
  Bookmark,
  AlertTriangle,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

const LEARNING_TABS = [
  { label: "Overview", href: ROUTES.app.learning.root, icon: Compass },
  { label: "Roadmap", href: ROUTES.app.learning.roadmap, icon: Compass },
  { label: "Courses", href: ROUTES.app.learning.courses, icon: BookOpen },
  { label: "Lessons", href: ROUTES.app.learning.lessons, icon: FileText },
  { label: "Resources", href: ROUTES.app.learning.resources, icon: Library },
  { label: "Practice", href: ROUTES.app.learning.practice, icon: Code2 },
  { label: "Progress", href: ROUTES.app.learning.progress, icon: TrendingUp },
  { label: "Bookmarks", href: ROUTES.app.learning.bookmarks, icon: Bookmark },
  { label: "Weak Topics", href: ROUTES.app.learning.weakTopics, icon: AlertTriangle },
];

export function LearningNav() {
  const pathname = usePathname();

  return (
    <div className="border-b-2 border-black bg-white overflow-x-auto">
      <div className="max-w-6xl mx-auto flex items-center gap-1 px-4 py-2">
        {LEARNING_TABS.map((tab) => {
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
