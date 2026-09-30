"use client";

import React from "react";
import { cn } from "@/lib/constants";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  accent?:
    | "fire-red"
    | "red"
    | "electric-yellow"
    | "yellow"
    | "ultra-violet"
    | "violet"
    | "acid-yellow"
    | "acid"
    | "honey-gold"
    | "gold"
    | "deep-navy"
    | "navy"
    | "dark";
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, accent = "fire-red", className }: TabsProps) {
  const activeStyles = {
    "fire-red": "bg-editorial-red text-white shadow-editorial-sm font-bold",
    red: "bg-editorial-red text-white shadow-editorial-sm font-bold",
    "electric-yellow": "bg-editorial-yellow text-foreground border-2 border-foreground font-bold",
    yellow: "bg-editorial-yellow text-foreground border-2 border-foreground font-bold",
    "acid-yellow": "bg-editorial-acid text-foreground border-2 border-foreground font-bold",
    acid: "bg-editorial-acid text-foreground border-2 border-foreground font-bold",
    "honey-gold": "bg-editorial-gold text-foreground border-2 border-foreground font-bold",
    gold: "bg-editorial-gold text-foreground border-2 border-foreground font-bold",
    "deep-navy": "bg-editorial-navy text-white font-bold",
    navy: "bg-editorial-navy text-white font-bold",
    "ultra-violet": "bg-editorial-violet text-white font-bold",
    violet: "bg-editorial-violet text-white font-bold",
    dark: "bg-foreground text-background font-bold",
  };

  const isDarkAccent =
    accent === "fire-red" ||
    accent === "red" ||
    accent === "deep-navy" ||
    accent === "navy" ||
    accent === "ultra-violet" ||
    accent === "violet" ||
    accent === "dark";

  return (
    <div className={cn("flex items-center gap-1.5 p-1 bg-surface border-2 border-border rounded-lg overflow-x-auto", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap select-none cursor-pointer",
              isActive
                ? activeStyles[accent]
                : "text-muted-foreground hover:text-foreground hover:bg-white"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {typeof tab.count === "number" && (
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-sm text-[10px] font-mono",
                  isActive
                    ? isDarkAccent
                      ? "bg-white/25 text-white font-bold"
                      : "bg-black/15 text-foreground font-bold"
                    : "bg-border text-muted-foreground font-bold"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
