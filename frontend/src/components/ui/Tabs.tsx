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
    | "electric-coral"
    | "coral"
    | "royal-maroon"
    | "maroon"
    | "deep-navy"
    | "navy"
    | "dark";
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, accent = "fire-red", className }: TabsProps) {
  const activeStyles: Record<string, string> = {
    "ultra-violet": "bg-ultra-violet text-white border-2 border-black font-extrabold shadow-editorial-xs",
    violet: "bg-ultra-violet text-white border-2 border-black font-extrabold shadow-editorial-xs",
    "acid-yellow": "bg-acid-yellow text-black border-2 border-black font-extrabold shadow-editorial-xs",
    acid: "bg-acid-yellow text-black border-2 border-black font-extrabold shadow-editorial-xs",
    "fire-red": "bg-fire-red text-white border-2 border-black font-extrabold shadow-editorial-xs",
    red: "bg-fire-red text-white border-2 border-black font-extrabold shadow-editorial-xs",
    "electric-yellow": "bg-electric-yellow text-black border-2 border-black font-extrabold shadow-editorial-xs",
    yellow: "bg-electric-yellow text-black border-2 border-black font-extrabold shadow-editorial-xs",
    "honey-gold": "bg-electric-yellow text-black border-2 border-black font-extrabold shadow-editorial-xs",
    gold: "bg-electric-yellow text-black border-2 border-black font-extrabold shadow-editorial-xs",
    "electric-coral": "bg-electric-coral text-white border-2 border-black font-extrabold shadow-editorial-xs",
    coral: "bg-electric-coral text-white border-2 border-black font-extrabold shadow-editorial-xs",
    "royal-maroon": "bg-royal-maroon text-white border-2 border-black font-extrabold shadow-editorial-xs",
    maroon: "bg-royal-maroon text-white border-2 border-black font-extrabold shadow-editorial-xs",
    "deep-navy": "bg-royal-maroon text-white border-2 border-black font-extrabold shadow-editorial-xs",
    navy: "bg-royal-maroon text-white border-2 border-black font-extrabold shadow-editorial-xs",
    dark: "bg-black text-white border-2 border-black font-extrabold shadow-editorial-xs",
  };

  const isDarkAccent =
    accent === "fire-red" ||
    accent === "red" ||
    accent === "royal-maroon" ||
    accent === "maroon" ||
    accent === "deep-navy" ||
    accent === "navy" ||
    accent === "ultra-violet" ||
    accent === "violet" ||
    accent === "electric-coral" ||
    accent === "coral" ||
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
