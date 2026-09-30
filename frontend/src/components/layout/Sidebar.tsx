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
        colorClass: "text-black",
        borderClass: "border-l-black",
        activeBgClass: "bg-honey-gold text-black font-extrabold shadow-sm",
      },
      {
        label: "Career Discovery",
        href: "/onboarding",
        icon: Compass,
        colorClass: "text-black",
        borderClass: "border-l-black",
        activeBgClass: "bg-honey-gold text-black font-extrabold shadow-sm",
      },
      {
        label: "Technical Assessment",
        href: "/assessment",
        icon: CheckSquare,
        colorClass: "text-white",
        borderClass: "border-l-electric-yellow",
        activeBgClass: "bg-fire-red text-white font-extrabold shadow-sm",
      },
      {
        label: "Personalized Learning",
        href: "/learning",
        icon: BookOpen,
        colorClass: "text-acid-yellow",
        borderClass: "border-l-acid-yellow",
        activeBgClass: "bg-ultra-violet text-white font-extrabold shadow-sm",
      },
      {
        label: "Advanced Assessment",
        href: "/advanced-assessment",
        icon: ShieldAlert,
        colorClass: "text-white",
        borderClass: "border-l-electric-yellow",
        activeBgClass: "bg-fire-red text-white font-extrabold shadow-sm",
      },
      {
        label: "Real-World Projects",
        href: "/projects",
        icon: FolderGit2,
        colorClass: "text-black",
        borderClass: "border-l-black",
        activeBgClass: "bg-honey-gold text-black font-extrabold shadow-sm",
      },
      {
        label: "Problem Solving",
        href: "/problem-solving",
        icon: Code2,
        colorClass: "text-white",
        borderClass: "border-l-electric-yellow",
        activeBgClass: "bg-fire-red text-white font-extrabold shadow-sm",
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
        colorClass: "text-acid-yellow",
        borderClass: "border-l-acid-yellow",
        activeBgClass: "bg-ultra-violet text-white font-extrabold shadow-sm",
      },
      {
        label: "Resume & ATS Engine",
        href: "/resume",
        icon: FileText,
        colorClass: "text-black",
        borderClass: "border-l-black",
        activeBgClass: "bg-honey-gold text-black font-extrabold shadow-sm",
      },
      {
        label: "Matching Opportunities",
        href: "/opportunities",
        icon: Briefcase,
        colorClass: "text-black",
        borderClass: "border-l-black",
        activeBgClass: "bg-honey-gold text-black font-extrabold shadow-sm",
      },
      {
        label: "Application Tracker",
        href: "/applications",
        icon: Kanban,
        colorClass: "text-black",
        borderClass: "border-l-black",
        activeBgClass: "bg-electric-yellow text-black font-extrabold shadow-sm",
      },
      {
        label: "Rejection & Retraining",
        href: "/feedback",
        icon: TrendingUp,
        colorClass: "text-acid-yellow",
        borderClass: "border-l-acid-yellow",
        activeBgClass: "bg-ultra-violet text-white font-extrabold shadow-sm",
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
        colorClass: "text-black",
        borderClass: "border-l-black",
        activeBgClass: "bg-honey-gold text-black font-extrabold shadow-sm",
      },
      {
        label: "System Settings",
        href: "/settings",
        icon: Settings,
        colorClass: "text-black",
        borderClass: "border-l-black",
        activeBgClass: "bg-white text-black font-extrabold shadow-sm",
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
    <div className="w-[268px] flex flex-col h-full overflow-hidden shrink-0 select-none bg-deep-navy text-white border-r-2 border-black">
      {/* Brand Header with Exact L2H Logo */}
      <div className="px-4 py-4 border-b border-white/15 flex items-center justify-between shrink-0 bg-deep-navy">
        <BrandLogo size="md" href="/dashboard" theme="dark" />
        {isMobileDrawer && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Target Readiness Snapshot Card */}
      <div className="p-3.5 mx-3 mt-3 rounded-lg bg-black border-2 border-honey-gold/30 text-white shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-extrabold text-white/60 uppercase tracking-wider font-mono">
            Target Readiness
          </span>
          <span className="text-xs font-extrabold font-mono text-honey-gold">
            {userProfile.readinessScore}%
          </span>
        </div>
        <ProgressBar value={userProfile.readinessScore} size="sm" variant="honey-gold" />
        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="truncate max-w-[125px] text-white font-bold">
            {selectedRole.title}
          </span>
          <span className="text-honey-gold text-[10px] font-extrabold uppercase tracking-wider truncate max-w-[95px] font-mono">
            {userProfile.focusArea ? `Gap: ${userProfile.focusArea.split("&")[0].trim()}` : "Active"}
          </span>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav
        aria-label="Sidebar Navigation"
        className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4 bg-deep-navy"
      >
        {PRIMARY_NAV_SECTIONS.map((section, idx) => (
          <div key={idx} className="space-y-0.5">
            <p className="px-2.5 py-1 text-[10px] font-mono font-extrabold uppercase tracking-wider text-white/50">
              {section.group}
            </p>
            <div className="space-y-1">
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
                      "flex items-center gap-2.5 px-3 py-2 text-xs rounded-md transition-all duration-150 group min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                      isActive
                        ? cn(
                            "border-l-4 font-extrabold",
                            item.borderClass,
                            item.activeBgClass
                          )
                        : "text-white/80 font-medium hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-transform group-hover:scale-110 shrink-0",
                        isActive ? item.colorClass : "text-white/70"
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
      <div className="p-3 border-t border-white/15 shrink-0 bg-deep-navy text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-honey-gold text-black flex items-center justify-center text-[11px] font-mono font-extrabold shrink-0">
              {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="min-w-0 flex flex-col">
              <span className="text-xs font-bold text-white truncate">
                {userProfile.name}
              </span>
              <span className="text-[10px] text-white/50 truncate font-mono">
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
              className="p-1.5 rounded-md text-white/70 hover:text-fire-red hover:bg-white/10 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
            className="fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ease-out animate-fade-in"
            onClick={onClose}
            aria-hidden="true"
          />
        )}

        {/* Mobile Drawer Aside */}
        <aside
          className={cn(
            "fixed top-0 bottom-0 left-0 z-50 w-[268px] max-w-[85vw] bg-deep-navy border-r-2 border-black flex flex-col transition-transform duration-300 ease-out shadow-2xl overflow-hidden",
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
          "hidden lg:flex flex-col bg-deep-navy overflow-hidden transition-all duration-300 ease-out shrink-0",
          isOpen
            ? "w-[268px] border-r-2 border-black opacity-100"
            : "w-0 border-r-0 border-transparent opacity-0 pointer-events-none"
        )}
        aria-label="Main Navigation"
        aria-hidden={!isOpen}
      >
        <div className="w-[268px] h-[calc(100vh-4rem)] sticky top-16 flex flex-col overflow-hidden bg-deep-navy">
          {renderNavContent(false)}
        </div>
      </aside>
    </>
  );
}

export const Sidebar = memo(SidebarComponent);
