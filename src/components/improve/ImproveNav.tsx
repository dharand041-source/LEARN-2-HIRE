"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RotateCcw,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

const IMPROVE_TABS = [
  { label: "Overview", href: ROUTES.app.improve.root, icon: TrendingUp },
  { label: "Skill Gaps", href: ROUTES.app.improve.skillGaps, icon: AlertTriangle },
  { label: "Retraining", href: ROUTES.app.improve.retraining, icon: GraduationCap },
  { label: "Reassessment", href: ROUTES.app.improve.reassessment, icon: RotateCcw },
];

export function ImproveNav() {
  const pathname = usePathname();

  return (
    <div className="border-b-2 border-ink-black bg-warm-cream overflow-x-auto">
      <div className="max-w-6xl mx-auto flex items-center gap-1 px-4 py-2">
        {IMPROVE_TABS.map((tab) => {
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
