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
  LogOut,
  X,
} from "lucide-react";
import { cn, PRODUCT_NAME } from "@/lib/constants";
import { useCareer } from "@/context/CareerContext";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { BrandLogo } from "@/components/ui/BrandLogo";

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
        colorClass: "text-fire-red",
        borderClass: "border-l-fire-red",
        activeBgClass: "bg-fire-red-50/70 text-foreground font-extrabold",
      },
      {
        label: "Career Discovery",
        href: "/onboarding",
        icon: Compass,
        colorClass: "text-[#DDA300]",
        borderClass: "border-l-honey-gold",
        activeBgClass: "bg-honey-gold/15 text-foreground font-extrabold",
      },
      {
        label: "Technical Assessment",
        href: "/assessment",
        icon: CheckSquare,
        colorClass: "text-[#C29E00]",
        borderClass: "border-l-electric-yellow",
        activeBgClass: "bg-electric-yellow/20 text-foreground font-extrabold",
      },
      {
        label: "Personalized Learning",
        href: "/learning",
        icon: BookOpen,
        colorClass: "text-[#97A700]",
        borderClass: "border-l-acid-yellow",
        activeBgClass: "bg-acid-yellow/20 text-foreground font-extrabold",
      },
      {
        label: "Advanced Assessment",
        href: "/advanced-assessment",
        icon: ShieldAlert,
        colorClass: "text-[#C29E00]",
        borderClass: "border-l-electric-yellow",
        activeBgClass: "bg-electric-yellow/20 text-foreground font-extrabold",
      },
      {
        label: "Real-World Projects",
        href: "/projects",
        icon: FolderGit2,
        colorClass: "text-deep-navy",
        borderClass: "border-l-deep-navy",
        activeBgClass: "bg-deep-navy/10 text-foreground font-extrabold",
      },
      {
        label: "Problem Solving",
        href: "/problem-solving",
        icon: Code2,
        colorClass: "text-deep-navy",
        borderClass: "border-l-deep-navy",
        activeBgClass: "bg-deep-navy/10 text-foreground font-extrabold",
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
        colorClass: "text-ultra-violet",
        borderClass: "border-l-ultra-violet",
        activeBgClass: "bg-ultra-violet/10 text-foreground font-extrabold",
      },
      {
        label: "Resume & ATS Engine",
        href: "/resume",
        icon: FileText,
        colorClass: "text-fire-red",
        borderClass: "border-l-fire-red",
        activeBgClass: "bg-fire-red-50/70 text-foreground font-extrabold",
      },
      {
        label: "Matching Opportunities",
        href: "/opportunities",
        icon: Briefcase,
        colorClass: "text-[#DDA300]",
        borderClass: "border-l-honey-gold",
        activeBgClass: "bg-honey-gold/15 text-foreground font-extrabold",
      },
      {
        label: "Application Tracker",
        href: "/applications",
        icon: Kanban,
        colorClass: "text-[#97A700]",
        borderClass: "border-l-acid-yellow",
        activeBgClass: "bg-acid-yellow/20 text-foreground font-extrabold",
      },
      {
        label: "Rejection & Retraining",
        href: "/feedback",
        icon: TrendingUp,
        colorClass: "text-ultra-violet",
        borderClass: "border-l-ultra-violet",
        activeBgClass: "bg-ultra-violet/10 text-foreground font-extrabold",
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
        colorClass: "text-deep-navy",
        borderClass: "border-l-deep-navy",
        activeBgClass: "bg-deep-navy/10 text-foreground font-extrabold",
      },
      {
        label: "System Settings",
        href: "/settings",
        icon: Settings,
        colorClass: "text-muted",
        borderClass: "border-l-foreground",
        activeBgClass: "bg-surface text-foreground font-extrabold",
      },
    ],
  },
] as const;

function SidebarComponent({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { userProfile, selectedRole, isAuthenticated, signOut } = useCareer();

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Block body scroll on mobile/tablet when drawer is open
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      document.body.style.overflow = "hidden";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const renderNavContent = (isMobileDrawer = false) => (
    <div className="w-[268px] flex flex-col h-full overflow-hidden shrink-0 select-none bg-white">
      {/* Brand Header with Exact L2H Logo */}
      <div className="px-4 py-4 border-b border-border flex items-center justify-between shrink-0 bg-white">
        <BrandLogo size="md" href="/dashboard" />
        {isMobileDrawer && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-surface transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Target Readiness Snapshot Card */}
      <div className="p-3.5 mx-3 mt-3 rounded-lg bg-surface border border-border shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider">
            Target Readiness
          </span>
          <span className="text-xs font-extrabold font-mono text-fire-red">
            {userProfile.readinessScore}%
          </span>
        </div>
        <ProgressBar value={userProfile.readinessScore} size="sm" variant="fire-red" />
        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="truncate max-w-[125px] text-foreground font-bold">
            {selectedRole.title}
          </span>
          <span className="text-fire-red text-[10px] font-extrabold uppercase tracking-wider truncate max-w-[95px] font-mono">
            {userProfile.focusArea ? `Gap: ${userProfile.focusArea.split("&")[0].trim()}` : "Active"}
          </span>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav
        aria-label="Sidebar Navigation"
        className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4 bg-white"
      >
        {PRIMARY_NAV_SECTIONS.map((section, idx) => (
          <div key={idx} className="space-y-0.5">
            <p className="px-2.5 py-1 text-[10px] font-mono font-extrabold uppercase tracking-wider text-muted">
              {section.group}
            </p>
            <div className="space-y-0.5">
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
                    onClick={() => {
                      if (isMobileDrawer) onClose();
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 px-2.5 py-2 text-xs rounded-md transition-all duration-150 group min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground",
                      isActive
                        ? cn(
                            "border-l-4 shadow-xs font-extrabold",
                            item.borderClass,
                            item.activeBgClass
                          )
                        : "text-foreground font-medium hover:bg-surface hover:text-foreground"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-transform group-hover:scale-110 shrink-0",
                        isActive ? item.colorClass : "text-foreground/70"
                      )}
                    />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User / Authentication Footer */}
      <div className="p-3 border-t border-border shrink-0 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center text-white text-[11px] font-mono font-bold shrink-0">
              {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="min-w-0 flex flex-col">
              <span className="text-xs font-bold text-foreground truncate">
                {userProfile.name}
              </span>
              <span className="text-[10px] text-muted truncate font-mono">
                {userProfile.email}
              </span>
            </div>
          </div>

          {isAuthenticated && (
            <button
              onClick={async () => {
                if (isMobileDrawer) onClose();
                await signOut();
              }}
              title="Sign Out"
              aria-label="Sign Out"
              className="p-1.5 rounded-md text-muted hover:text-fire-red hover:bg-fire-red-50 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
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
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ease-out animate-fade-in"
            onClick={onClose}
            aria-hidden="true"
          />
        )}

        {/* Mobile Drawer Aside */}
        <aside
          className={cn(
            "fixed top-0 bottom-0 left-0 z-50 w-[268px] max-w-[85vw] bg-white border-r border-border flex flex-col transition-transform duration-300 ease-out shadow-2xl overflow-hidden",
            isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
          )}
          aria-label="Mobile Navigation"
        >
          {renderNavContent(true)}
        </aside>
      </div>

      {/* DESKTOP COLLAPSIBLE SIDEBAR (lg breakpoint and above) */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-white overflow-hidden transition-all duration-300 ease-out shrink-0",
          isOpen
            ? "w-[268px] border-r border-border opacity-100"
            : "w-0 border-r-0 border-transparent opacity-0 pointer-events-none"
        )}
        aria-label="Main Navigation"
        aria-hidden={!isOpen}
      >
        <div className="w-[268px] h-[calc(100vh-4rem)] sticky top-16 flex flex-col overflow-hidden bg-white">
          {renderNavContent(false)}
        </div>
      </aside>
    </>
  );
}

export const Sidebar = memo(SidebarComponent);
