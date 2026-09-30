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
import { cn } from "@/lib/constants";
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
      },
      {
        label: "Real-World Projects",
        href: "/projects",
        icon: FolderGit2,
      },
      {
        label: "Problem Solving",
        href: "/problem-solving",
        icon: Code2,
      },
      {
        label: "Technical Assessment",
        href: "/assessment",
        icon: CheckSquare,
      },
      {
        label: "Personalized Learning",
        href: "/learning",
        icon: BookOpen,
      },
      {
        label: "Career Discovery",
        href: "/onboarding",
        icon: Compass,
      },
      {
        label: "Advanced Assessment",
        href: "/advanced-assessment",
        icon: ShieldAlert,
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
      },
      {
        label: "Resume & ATS Engine",
        href: "/resume",
        icon: FileText,
      },
      {
        label: "Matching Opportunities",
        href: "/opportunities",
        icon: Briefcase,
      },
      {
        label: "Application Tracker",
        href: "/applications",
        icon: Kanban,
      },
      {
        label: "Rejection & Retraining",
        href: "/feedback",
        icon: TrendingUp,
      },
    ],
  },
  {
    group: "Candidate",
    items: [
      {
        label: "Profile & Portfolio",
        href: "/profile",
        icon: User,
      },
      {
        label: "System Settings",
        href: "/settings",
        icon: Settings,
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
    <div className="w-[268px] flex flex-col h-full overflow-hidden shrink-0 select-none bg-royal-maroon text-white border-r-2 border-black">
      {/* Brand Header with Exact Transparent L2H Logo */}
      <div className="px-4 py-3.5 border-b-2 border-black/40 flex items-center justify-between shrink-0 bg-royal-maroon">
        <BrandLogo size="md" href="/dashboard" theme="dark" />
        {isMobileDrawer && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-coral"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Target Readiness Snapshot Card - Compact */}
      <div className="p-2.5 mx-3 mt-2.5 rounded-lg bg-black border-2 border-electric-coral/50 text-white shrink-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-extrabold text-white/70 uppercase tracking-wider font-mono">
            Target Readiness
          </span>
          <span className="text-xs font-mono font-black text-electric-coral">
            {userProfile.readinessScore}%
          </span>
        </div>
        <ProgressBar value={userProfile.readinessScore} size="sm" variant="electric-coral" />
        <div className="mt-1.5 flex items-center justify-between text-[11px]">
          <span className="truncate max-w-[125px] text-white font-bold text-[11px]">
            {selectedRole.title}
          </span>
          <span className="text-electric-coral text-[10px] font-extrabold uppercase tracking-wider truncate max-w-[95px] font-mono">
            {userProfile.focusArea ? `Gap: ${userProfile.focusArea.split("&")[0].trim()}` : "Active"}
          </span>
        </div>
      </div>

      {/* Navigation Groups - Compact Spacing with Subtle Scrollbar */}
      <nav
        aria-label="Sidebar Navigation"
        className="flex-1 overflow-y-auto px-2.5 py-2.5 space-y-3.5 bg-royal-maroon sidebar-scrollbar"
      >
        {PRIMARY_NAV_SECTIONS.map((section, idx) => (
          <div key={idx} className="space-y-0.5">
            <p className="px-2.5 py-0.5 text-[9px] font-mono font-extrabold uppercase tracking-widest text-white/60">
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
                      "flex items-center gap-2.5 px-3 py-2 text-xs rounded-md transition-colors duration-150 group min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-coral",
                      isActive
                        ? "bg-electric-coral text-black font-black shadow-editorial-xs border-2 border-black"
                        : "text-white font-medium hover:bg-electric-coral hover:text-black"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-transform group-hover:scale-110 shrink-0",
                        isActive ? "text-black stroke-[2.5]" : "text-white/80"
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

      {/* Compact User / Authentication Footer */}
      <div className="p-2.5 px-3 border-t-2 border-black/40 shrink-0 bg-royal-maroon text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-electric-coral text-black flex items-center justify-center text-[10px] font-mono font-black shrink-0 border border-black">
              {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="min-w-0 flex flex-col">
              <span className="text-xs font-bold text-white truncate leading-tight">
                {userProfile.name}
              </span>
              <span className="text-[9px] text-white/60 truncate font-mono">
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
              className="p-1.5 rounded-md text-white/80 hover:text-black hover:bg-electric-coral transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-coral"
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
            className="fixed inset-0 z-40 bg-black/70 transition-opacity duration-[260ms] ease-out animate-fade-in"
            onClick={onClose}
            aria-hidden="true"
          />
        )}

        {/* Mobile Drawer Aside */}
        <aside
          className={cn(
            "fixed top-0 bottom-0 left-0 z-50 w-[268px] max-w-[85vw] bg-royal-maroon border-r-2 border-black flex flex-col transition-transform duration-[260ms] ease-out shadow-2xl overflow-hidden",
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
          "hidden lg:block overflow-hidden transition-[width,transform,opacity] duration-[260ms] ease-out shrink-0 bg-royal-maroon z-30",
          isOpen
            ? "w-[268px] opacity-100 translate-x-0 border-r-2 border-black"
            : "w-0 opacity-0 -translate-x-full pointer-events-none border-r-0"
        )}
        aria-label="Main Navigation"
        aria-hidden={!isOpen}
      >
        <div className="w-[268px] h-[calc(100vh-4rem)] sticky top-16 flex flex-col overflow-hidden bg-royal-maroon">
          {renderNavContent(false)}
        </div>
      </aside>
    </>
  );
}

export const Sidebar = memo(SidebarComponent);
