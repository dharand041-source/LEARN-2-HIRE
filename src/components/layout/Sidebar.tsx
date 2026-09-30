"use client";

import React, { memo } from "react";
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

const PRIMARY_NAV_SECTIONS = [
  {
    group: "Core Progression",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        color: "#E62727", // Fire Red
        colorClass: "text-fire-red",
        borderClass: "border-l-fire-red",
      },
      {
        label: "Career Discovery",
        href: "/onboarding",
        icon: Compass,
        color: "#FEC40B", // Honey Gold
        colorClass: "text-[#DDA300]",
        borderClass: "border-l-honey-gold",
      },
      {
        label: "Technical Assessment",
        href: "/assessment",
        icon: CheckSquare,
        color: "#FFDE00", // Electric Yellow
        colorClass: "text-[#C29E00]",
        borderClass: "border-l-electric-yellow",
      },
      {
        label: "Personalized Learning",
        href: "/learning",
        icon: BookOpen,
        color: "#EFFF00", // Acid Yellow
        colorClass: "text-[#97A700]",
        borderClass: "border-l-acid-yellow",
      },
      {
        label: "Advanced Assessment",
        href: "/advanced-assessment",
        icon: ShieldAlert,
        color: "#FFDE00", // Electric Yellow
        colorClass: "text-[#C29E00]",
        borderClass: "border-l-electric-yellow",
      },
      {
        label: "Real-World Projects",
        href: "/projects",
        icon: FolderGit2,
        color: "#04123F", // Deep Navy
        colorClass: "text-deep-navy",
        borderClass: "border-l-deep-navy",
      },
      {
        label: "Problem Solving",
        href: "/problem-solving",
        icon: Code2,
        color: "#04123F", // Deep Navy
        colorClass: "text-deep-navy",
        borderClass: "border-l-deep-navy",
      },
    ],
  },
  {
    group: "Career & Employment",
    items: [
      {
        label: "Interview Simulation",
        href: "/interview",
        icon: Mic,
        color: "#7F00FF", // Ultra Violet
        colorClass: "text-ultra-violet",
        borderClass: "border-l-ultra-violet",
      },
      {
        label: "Resume & ATS Engine",
        href: "/resume",
        icon: FileText,
        color: "#E62727", // Fire Red
        colorClass: "text-fire-red",
        borderClass: "border-l-fire-red",
      },
      {
        label: "Matching Opportunities",
        href: "/opportunities",
        icon: Briefcase,
        color: "#FEC40B", // Honey Gold
        colorClass: "text-[#DDA300]",
        borderClass: "border-l-honey-gold",
      },
      {
        label: "Application Tracker",
        href: "/applications",
        icon: Kanban,
        color: "#EFFF00", // Acid Yellow
        colorClass: "text-[#97A700]",
        borderClass: "border-l-acid-yellow",
      },
      {
        label: "Rejection & Retraining",
        href: "/feedback",
        icon: TrendingUp,
        color: "#7F00FF", // Ultra Violet
        colorClass: "text-ultra-violet",
        borderClass: "border-l-ultra-violet",
      },
    ],
  },
  {
    group: "Candidate Profile",
    items: [
      {
        label: "Profile & Portfolio",
        href: "/profile",
        icon: User,
        color: "#04123F",
        colorClass: "text-deep-navy",
        borderClass: "border-l-deep-navy",
      },
      {
        label: "System Settings",
        href: "/settings",
        icon: Settings,
        color: "#666666",
        colorClass: "text-muted",
        borderClass: "border-l-foreground",
      },
    ],
  },
] as const;

function SidebarComponent({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { userProfile, selectedRole } = useCareer();

  const renderNavContent = () => (
    <div className="w-80 flex flex-col h-full overflow-hidden shrink-0 select-none bg-white">
      {/* Readiness Snapshot Card (Editorial Metric Block) */}
      <div className="p-4 mx-3 mt-3 rounded-xl bg-white border-2 border-foreground shrink-0 shadow-editorial-sm">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-extrabold text-foreground uppercase tracking-wider">
            Target Readiness
          </span>
          <span className="text-sm font-extrabold font-mono text-fire-red">
            {userProfile.readinessScore}%
          </span>
        </div>
        <ProgressBar value={userProfile.readinessScore} size="sm" variant="fire-red" />
        <div className="mt-2.5 flex items-center justify-between text-[11px]">
          <span className="truncate max-w-[140px] text-foreground font-bold">
            {selectedRole.title}
          </span>
          <span className="text-fire-red text-[10px] font-extrabold uppercase tracking-wider truncate max-w-[110px] font-mono">
            {userProfile.focusArea ? `Gap: ${userProfile.focusArea.split("&")[0].trim()}` : "Pending"}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 bg-white">
        {PRIMARY_NAV_SECTIONS.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-muted">
              {section.group}
            </p>
            <div className="mt-1 space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href)) ||
                  (item.href === "/dashboard" && (pathname === "/" || pathname === "/dashboard"));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-xs rounded-md transition-all duration-150 group",
                      isActive
                        ? cn(
                            "bg-surface text-foreground font-extrabold border-l-4 shadow-xs",
                            item.borderClass
                          )
                        : "text-foreground font-medium hover:bg-surface hover:text-foreground"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-transform group-hover:scale-110 shrink-0",
                        item.colorClass
                      )}
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Lifecycle Tagline */}
      <div className="p-3 m-3 rounded-lg bg-surface border border-border text-[11px] text-muted leading-relaxed text-center shrink-0">
        <p className="text-foreground font-extrabold text-[11px] uppercase tracking-wider">
          {PRODUCT_NAME} Standard
        </p>
        <p className="text-[10px] text-muted font-medium mt-0.5">
          Assess → Learn → Build → Apply → Retrain
        </p>
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
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center text-white shadow-editorial-sm">
                <Sparkles className="w-4 h-4 text-fire-red fill-fire-red" />
              </div>
              <span className="font-display font-extrabold text-base text-foreground tracking-tight">
                {PRODUCT_NAME}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-surface transition-colors cursor-pointer"
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

export const Sidebar = memo(SidebarComponent);
