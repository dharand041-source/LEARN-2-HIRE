"use client";

import React, { memo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  Briefcase,
  User,
  Menu,
  X,
  Compass,
  CheckSquare,
  FolderGit2,
  Award,
  Mic,
  FileText,
  Kanban,
  TrendingUp,
  Activity,
  Bell,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

const PRIMARY_MOBILE_ITEMS = [
  { label: "Home", href: ROUTES.app.dashboard, icon: LayoutDashboard },
  { label: "Learn", href: ROUTES.app.learning.root, icon: BookOpen },
  { label: "Practice", href: ROUTES.app.practice.root, icon: Code2 },
  { label: "Jobs", href: ROUTES.app.opportunities.root, icon: Briefcase },
  { label: "Profile", href: ROUTES.app.profile, icon: User },
] as const;

const MORE_MENU_SECTIONS = [
  {
    title: "Career & Assessments",
    items: [
      { label: "Career Discovery", href: ROUTES.app.career.discover, icon: Compass },
      { label: "Career Goals", href: ROUTES.app.career.goals, icon: Compass },
      { label: "Skill Analysis", href: ROUTES.app.skillAnalysis, icon: Activity },
      { label: "Assessments", href: ROUTES.app.assessments.root, icon: CheckSquare },
    ],
  },
  {
    title: "Projects & Proof",
    items: [
      { label: "Projects", href: ROUTES.app.projects.root, icon: FolderGit2 },
      { label: "Skill Proof", href: ROUTES.app.skillProof.root, icon: Award },
    ],
  },
  {
    title: "Prepare & Opportunities",
    items: [
      { label: "Interview Simulation", href: ROUTES.app.interview.root, icon: Mic },
      { label: "Resume & ATS", href: ROUTES.app.resume.root, icon: FileText },
      { label: "Applications Tracker", href: ROUTES.app.applications.root, icon: Kanban },
    ],
  },
  {
    title: "Growth & System",
    items: [
      { label: "Retraining & Improve", href: ROUTES.app.improve.root, icon: TrendingUp },
      { label: "Analytics Telemetry", href: ROUTES.app.analytics, icon: Activity },
      { label: "Notifications", href: ROUTES.app.notifications, icon: Bell },
      { label: "Settings", href: ROUTES.app.settings, icon: Settings },
    ],
  },
];

function MobileNavComponent() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <>
      {/* Slide-up "More" Drawer for Complete Mobile Navigation */}
      {isMoreOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-ink-black/80 flex flex-col justify-end animate-fade-in">
          <div className="bg-ink-black border-t-4 border-primary-orange p-4 pb-20 max-h-[80vh] overflow-y-auto rounded-t-2xl space-y-4 text-paper-white shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-paper-white/20">
              <span className="text-xs font-mono font-black uppercase text-primary-orange tracking-wider">
                Full Navigation Menu
              </span>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1 rounded-md text-paper-white/80 hover:text-paper-white bg-paper-white/10"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {MORE_MENU_SECTIONS.map((section, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-paper-white/60 font-bold">
                    {section.title}
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMoreOpen(false)}
                          className={cn(
                            "flex items-center gap-2 p-2.5 rounded-lg text-xs font-bold border transition-colors",
                            isActive
                              ? "bg-primary-orange text-paper-white border-ink-black font-black"
                              : "bg-paper-white/5 border-paper-white/10 text-paper-white/90 hover:bg-paper-white/15"
                          )}
                        >
                          <Icon className="w-4 h-4 shrink-0 text-primary-orange" />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-ink-black border-t-2 border-ink-black px-2 py-1.5 flex items-center justify-around shadow-editorial-sm">
        {PRIMARY_MOBILE_ITEMS.map((item) => {
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
              className={cn(
                "flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors text-[10px] font-bold gap-0.5",
                isActive
                  ? "text-primary-orange font-black"
                  : "text-paper-white/70 hover:text-paper-white"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-primary-orange stroke-[2.5]" : "text-paper-white/70")} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* More Menu Trigger */}
        <button
          onClick={() => setIsMoreOpen((prev) => !prev)}
          className={cn(
            "flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors text-[10px] font-bold gap-0.5",
            isMoreOpen ? "text-primary-orange font-black" : "text-paper-white/70 hover:text-paper-white"
          )}
          aria-label="More navigation links"
        >
          <Menu className={cn("w-4 h-4", isMoreOpen ? "text-primary-orange stroke-[2.5]" : "text-paper-white/70")} />
          <span>More</span>
        </button>
      </nav>
    </>
  );
}

export const MobileNav = memo(MobileNavComponent);
