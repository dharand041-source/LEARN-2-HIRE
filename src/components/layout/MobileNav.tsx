"use client";

import React from "react";
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

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: LayoutDashboard },
    { label: "Learn", href: "/learning", icon: BookOpen },
    { label: "Projects", href: "/projects", icon: FolderGit2 },
    { label: "Jobs", href: "/opportunities", icon: Briefcase },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 border-t border-surface-border backdrop-blur-md px-2 py-1.5 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors text-[10px] font-medium gap-1",
              isActive
                ? "text-champagne font-semibold"
                : "text-pearl-muted hover:text-pearl-primary"
            )}
          >
            <Icon className={cn("w-4 h-4", isActive ? "text-champagne" : "text-pearl-muted")} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
