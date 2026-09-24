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
  Sparkles,
  X,
} from "lucide-react";
import { cn, PRODUCT_NAME } from "@/lib/constants";
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

  const renderNavContent = () => (
    <div className="w-80 flex flex-col h-full overflow-hidden shrink-0 select-none bg-white">
      {/* Readiness Snapshot Card */}
      <div className="p-4 mx-3 mt-3 rounded-lg bg-white border border-border shrink-0 shadow-sm">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold text-night uppercase tracking-wider">
            Target Readiness
          </span>
          <span className="text-xs font-bold text-imperial">{userProfile.readinessScore}%</span>
        </div>
        <ProgressBar value={userProfile.readinessScore} size="sm" variant="imperial" />
        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="truncate max-w-[140px] text-night font-semibold">{selectedRole.title}</span>
          <span className="text-imperial text-[10px] font-bold uppercase tracking-wider">Gap: SQL</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 bg-white">
        {primaryNavSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted">
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
                      "flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-md transition-all duration-150",
                      isActive
                        ? "bg-imperial text-white font-semibold shadow-sm"
                        : "text-night hover:text-imperial hover:bg-imperial-50"
                    )}
                  >
                    <Icon className={cn("w-4 h-4 transition-colors", isActive ? "text-white" : "text-night group-hover:text-imperial")} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Lifecycle Tagline */}
      <div className="p-3 m-3 rounded-md bg-surface-subtle border border-border text-[11px] text-muted leading-relaxed text-center shrink-0">
        <p className="text-night font-bold text-[11px]">{PRODUCT_NAME} Lifecycle</p>
        <p className="text-[10px] text-muted mt-0.5">Assess → Learn → Build → Apply → Retrain</p>
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE DRAWER (Below lg breakpoint) */}
      <div className="lg:hidden">
        {/* Mobile Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-night/35 backdrop-blur-sm transition-opacity duration-300 ease-out animate-fade-in"
            onClick={onClose}
            aria-hidden="true"
          />
        )}

        {/* Mobile Drawer Aside */}
        <aside
          className={cn(
            "fixed top-0 bottom-0 left-0 z-50 w-80 max-w-[85vw] bg-white border-r border-border flex flex-col transition-transform duration-300 ease-out shadow-2xl overflow-hidden",
            isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
          )}
          aria-label="Mobile Navigation"
        >
          {/* Mobile Drawer Header */}
          <div className="p-4 border-b border-border flex items-center justify-between shrink-0 bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-night flex items-center justify-center text-white">
                <Sparkles className="w-3.5 h-3.5 text-imperial" />
              </div>
              <span className="font-display font-bold text-base text-night">
                {PRODUCT_NAME}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted hover:text-night hover:bg-surface-subtle transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col bg-white">
            {renderNavContent()}
          </div>
        </aside>
      </div>

      {/* DESKTOP COLLAPSIBLE SIDEBAR (lg breakpoint and above) */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-white overflow-hidden transition-all duration-300 ease-out shrink-0",
          isOpen
            ? "w-80 border-r border-border opacity-100"
            : "w-0 border-r-0 border-transparent opacity-0 pointer-events-none"
        )}
        aria-label="Main Navigation"
        aria-hidden={!isOpen}
      >
        <div className="w-80 h-[calc(100vh-4rem)] sticky top-16 flex flex-col overflow-hidden bg-white">
          {renderNavContent()}
        </div>
      </aside>
    </>
  );
}
