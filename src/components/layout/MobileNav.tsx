"use client";

import React, { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  FolderGit2,
  Briefcase,
  User,
} from "lucide-react";
import { cn } from "@/lib/constants";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: LayoutDashboard },
  { label: "Learn", href: "/learning", icon: BookOpen },
  { label: "Projects", href: "/projects", icon: FolderGit2 },
  { label: "Jobs", href: "/opportunities", icon: Briefcase },
  { label: "Profile", href: "/profile", icon: User },
] as const;

function MobileNavComponent() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black border-t-2 border-black px-2 py-1.5 flex items-center justify-around shadow-editorial-sm">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={true}
            className={cn(
              "flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors text-[10px] font-bold gap-1",
              isActive
                ? "text-electric-coral font-black"
                : "text-white/70 hover:text-white"
            )}
          >
            <Icon className={cn("w-4 h-4", isActive ? "text-electric-coral stroke-[2.5]" : "text-white/70")} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export const MobileNav = memo(MobileNavComponent);
