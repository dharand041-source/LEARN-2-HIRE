"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  CheckSquare,
  BookOpen,
  FolderGit2,
  Code2,
  Mic,
  FileText,
  Briefcase,
  Kanban,
  TrendingUp,
  User,
  Settings,
  ShieldAlert,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/constants";
import { useCareer } from "@/context/CareerContext";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { userProfile, selectedRole } = useCareer();

  const primaryNavSections = [
    {
      group: "Core Progression",
      items: [
        { label: "Dashboard", href: "/", icon: LayoutDashboard },
        { label: "Career Discovery", href: "/onboarding", icon: Compass },
        { label: "Technical Assessment", href: "/assessment", icon: CheckSquare },
        { label: "Personalized Learning", href: "/learning", icon: BookOpen },
        { label: "Advanced Assessment", href: "/advanced-assessment", icon: ShieldAlert },
        { label: "Real-World Projects", href: "/projects", icon: FolderGit2 },
        { label: "Problem Solving", href: "/problem-solving", icon: Code2 },
      ],
    },
    {
      group: "Career & Employment",
      items: [
        { label: "Interview Simulation", href: "/interview", icon: Mic },
        { label: "Resume & ATS Engine", href: "/resume", icon: FileText },
        { label: "Matching Opportunities", href: "/opportunities", icon: Briefcase },
        { label: "Application Tracker", href: "/applications", icon: Kanban },
        { label: "Rejection & Retraining", href: "/feedback", icon: TrendingUp },
      ],
    },
    {
      group: "Candidate Profile",
      items: [
        { label: "Profile & Portfolio", href: "/profile", icon: User },
        { label: "System Settings", href: "/settings", icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-16 bottom-0 left-0 z-40 w-64 bg-black border-r border-surface-border flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Readiness Snapshot Card */}
        <div className="p-4 mx-3 mt-3 rounded-lg bg-surface-card border border-surface-border">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-pearl-muted uppercase tracking-wider">
              Target Readiness
            </span>
            <span className="text-xs font-bold text-champagne">{userProfile.readinessScore}%</span>
          </div>
          <ProgressBar value={userProfile.readinessScore} size="sm" variant="champagne" />
          <div className="mt-2 flex items-center justify-between text-[11px] text-pearl-muted">
            <span className="truncate max-w-[140px] text-pearl-primary font-medium">{selectedRole.title}</span>
            <span className="text-rose text-[10px] font-medium">Gap: SQL</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {primaryNavSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-pearl-muted/70">
                {section.group}
              </p>
              <div className="mt-1 space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-colors",
                        isActive
                          ? "bg-navy-800 text-champagne border border-champagne/30 font-semibold"
                          : "text-pearl-muted hover:text-pearl-primary hover:bg-navy-900/60"
                      )}
                    >
                      <Icon className={cn("w-4 h-4", isActive ? "text-champagne" : "text-pearl-muted")} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Lifecycle Tagline */}
        <div className="p-3 m-3 rounded-md bg-navy-950 border border-white/5 text-[11px] text-pearl-muted leading-relaxed text-center">
          <p className="text-pearl-primary font-medium text-[11px]">SkillForge Lifecycle</p>
          <p className="text-[10px] text-pearl-muted mt-0.5">Assess → Learn → Build → Apply → Retrain</p>
        </div>
      </aside>
    </>
  );
}
