"use client";

import React, { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Target,
  BarChart2,
  CheckSquare,
  BookOpen,
  Code2,
  FolderGit2,
  Award,
  Mic,
  FileText,
  Briefcase,
  GraduationCap,
  Rocket,
  Kanban,
  TrendingUp,
  Activity,
  Bell,
  User,
  Settings,
  ShieldAlert,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/constants";
import { useCareer } from "@/context/CareerContext";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ROUTES } from "@/lib/routes";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRIMARY_NAV_SECTIONS = [
  {
    group: "Home",
    items: [
      {
        label: "Dashboard",
        href: ROUTES.app.dashboard,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    group: "Career",
    items: [
      {
        label: "Career Discovery",
        href: ROUTES.app.career.discover,
        icon: Compass,
      },
      {
        label: "Career Goals",
        href: ROUTES.app.career.goals,
        icon: Target,
      },
      {
        label: "Skill Analysis",
        href: ROUTES.app.skillAnalysis,
        icon: BarChart2,
      },
    ],
  },
  {
    group: "Develop",
    items: [
      {
        label: "Assessments",
        href: ROUTES.app.assessments.root,
        icon: CheckSquare,
      },
      {
        label: "Learning",
        href: ROUTES.app.learning.root,
        icon: BookOpen,
      },
      {
        label: "Practice",
        href: ROUTES.app.practice.root,
        icon: Code2,
      },
    ],
  },
  {
    group: "Prove",
    items: [
      {
        label: "Projects",
        href: ROUTES.app.projects.root,
        icon: FolderGit2,
      },
      {
        label: "Skill Proof",
        href: ROUTES.app.skillProof.root,
        icon: Award,
      },
    ],
  },
  {
    group: "Prepare",
    items: [
      {
        label: "Interview",
        href: ROUTES.app.interview.root,
        icon: Mic,
      },
      {
        label: "Resume",
        href: ROUTES.app.resume.root,
        icon: FileText,
      },
    ],
  },
  {
    group: "Opportunities",
    items: [
      {
        label: "Jobs",
        href: ROUTES.app.opportunities.jobs,
        icon: Briefcase,
      },
      {
        label: "Internships",
        href: ROUTES.app.opportunities.internships,
        icon: GraduationCap,
      },
      {
        label: "Startups",
        href: ROUTES.app.opportunities.startups,
        icon: Rocket,
      },
      {
        label: "Applications",
        href: ROUTES.app.applications.root,
        icon: Kanban,
      },
    ],
  },
  {
    group: "Grow",
    items: [
      {
        label: "Improve",
        href: ROUTES.app.improve.root,
        icon: TrendingUp,
      },
      {
        label: "Analytics",
        href: ROUTES.app.analytics,
        icon: Activity,
      },
    ],
  },
  {
    group: "System",
    items: [
      {
        label: "Notifications",
        href: ROUTES.app.notifications,
        icon: Bell,
      },
      {
        label: "Profile",
        href: ROUTES.app.profile,
        icon: User,
      },
      {
        label: "Settings",
        href: ROUTES.app.settings,
        icon: Settings,
      },
    ],
  },
] as const;

function SidebarComponent({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { userProfile, selectedRole, isAuthenticated, signOut } = useCareer();

  // Root Page Scroll Control: Lock document/body scroll when open, restore on close
  React.useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Measure scrollbar width to prevent horizontal layout shift when scrollbar disappears
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Dark Overlay Backdrop: Closes drawer on click; absorbs touch/wheel outside sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 transition-opacity duration-[250ms] ease-out",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        onTouchMove={(e) => e.preventDefault()}
        onWheel={(e) => e.preventDefault()}
        aria-hidden="true"
      />

      {/* Unified Overlay Sidebar: Constrained viewport height, smooth 250ms transform */}
      <aside
        id="app-sidebar"
        aria-label="Main Navigation"
        aria-hidden={!isOpen}
        className={cn(
          "fixed top-16 bottom-0 left-0 z-50 w-[280px] max-w-[85vw] bg-ink-black border-r-2 border-ink-black flex flex-col shadow-2xl transition-transform duration-[250ms] ease-out select-none",
          isOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
        )}
        style={{
          height: "calc(100vh - 4rem)",
          maxHeight: "calc(100dvh - 4rem)",
        }}
      >
        {/* Pinned Sidebar Header: Transparent Brand Logo & Close X Button */}
        <div className="px-4 py-3.5 border-b-2 border-paper-white/20 flex items-center justify-between shrink-0 bg-ink-black text-paper-white">
          <BrandLogo size="md" href="/dashboard" theme="dark" />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-paper-white/80 hover:text-paper-white hover:bg-paper-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange"
            aria-label="Close navigation"
            title="Close navigation"
          >
            <X className="w-5 h-5 text-paper-white" />
          </button>
        </div>

        {/* EXACTLY ONE Independent Scroll Container for Navigation & User Profile */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-3 space-y-4 bg-ink-black text-paper-white sidebar-scrollbar"
          style={{
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Target Readiness Snapshot Card */}
          <div className="p-2.5 rounded-lg bg-paper-white/5 border-2 border-golden-yellow/70 text-paper-white shrink-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-extrabold text-paper-white/70 uppercase tracking-wider font-mono">
                Target Readiness
              </span>
              <span className="text-xs font-mono font-black text-golden-yellow">
                {userProfile.readinessScore}%
              </span>
            </div>
            <ProgressBar value={userProfile.readinessScore} size="sm" variant="electric-yellow" />
            <div className="mt-1.5 flex items-center justify-between text-[11px]">
              <span className="truncate max-w-[130px] text-paper-white font-bold text-[11px]">
                {selectedRole.title}
              </span>
              <span className="text-golden-yellow text-[10px] font-extrabold uppercase tracking-wider truncate max-w-[100px] font-mono">
                {userProfile.focusArea ? `Gap: ${userProfile.focusArea.split("&")[0].trim()}` : "Active"}
              </span>
            </div>
          </div>

          {/* Navigation Sections */}
          <nav aria-label="Sidebar Navigation Links" className="space-y-3.5">
            {PRIMARY_NAV_SECTIONS.map((section, idx) => (
              <div key={idx} className="space-y-0.5">
                <p className="px-2.5 py-0.5 text-[9px] font-mono font-extrabold uppercase tracking-widest text-paper-white/60">
                  {section.group}
                </p>
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== ROUTES.app.dashboard && pathname.startsWith(item.href)) ||
                      (item.href === ROUTES.app.dashboard && (pathname === "/" || pathname === "/dashboard" || pathname === ROUTES.app.dashboard));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        prefetch={true}
                        onClick={onClose}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2 text-xs rounded-md transition-colors duration-150 group min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange",
                          isActive
                            ? "bg-primary-orange text-paper-white font-black shadow-editorial-xs border-2 border-ink-black"
                            : "text-paper-white font-medium hover:bg-rose hover:text-paper-white"
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-4 h-4 transition-transform group-hover:scale-110 shrink-0",
                            isActive ? "text-paper-white stroke-[2.5]" : "text-paper-white/80 group-hover:text-paper-white"
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

          {/* Candidate Profile / Auth Footer (integrated in single scroll container) */}
          <div className="pt-3 border-t-2 border-paper-white/20 text-paper-white">
            <div className="flex items-center justify-between p-2 rounded-lg bg-paper-white/10 border border-paper-white/20">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-primary-orange text-paper-white flex items-center justify-center text-[10px] font-mono font-black shrink-0 border border-paper-white/30">
                  {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="text-xs font-bold text-paper-white truncate leading-tight">
                    {userProfile.name}
                  </span>
                  <span className="text-[9px] text-paper-white/60 truncate font-mono">
                    {userProfile.email}
                  </span>
                </div>
              </div>

              {isAuthenticated && (
                <button
                  onClick={async () => {
                    onClose();
                    await signOut();
                  }}
                  title="Sign Out"
                  aria-label="Sign Out"
                  className="p-1.5 rounded-md text-paper-white/80 hover:text-paper-white hover:bg-rose transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export const Sidebar = memo(SidebarComponent);
