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
    | "primary-orange"
    | "golden-yellow"
    | "rose"
    | "soft-pink"
    | "ink-black"
    | "paper-white"
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

export function Tabs({ tabs, activeTab, onChange, accent = "coral", className }: TabsProps) {
  const activeStyles: Record<string, string> = {
    "primary-orange": "bg-primary-orange text-paper-white border-2 border-ink-black font-black shadow-editorial-xs",
    "electric-coral": "bg-primary-orange text-paper-white border-2 border-ink-black font-black shadow-editorial-xs",
    coral: "bg-primary-orange text-paper-white border-2 border-ink-black font-black shadow-editorial-xs",
    orange: "bg-primary-orange text-paper-white border-2 border-ink-black font-black shadow-editorial-xs",
    rose: "bg-rose text-paper-white border-2 border-ink-black font-extrabold shadow-editorial-xs",
    "royal-maroon": "bg-rose text-paper-white border-2 border-ink-black font-extrabold shadow-editorial-xs",
    maroon: "bg-rose text-paper-white border-2 border-ink-black font-extrabold shadow-editorial-xs",
    "deep-navy": "bg-ink-black text-paper-white border-2 border-ink-black font-extrabold shadow-editorial-xs",
    navy: "bg-ink-black text-paper-white border-2 border-ink-black font-extrabold shadow-editorial-xs",
    "fire-red": "bg-primary-orange text-paper-white border-2 border-ink-black font-extrabold shadow-editorial-xs",
    red: "bg-primary-orange text-paper-white border-2 border-ink-black font-extrabold shadow-editorial-xs",
    "ultra-violet": "bg-rose text-paper-white border-2 border-ink-black font-extrabold shadow-editorial-xs",
    violet: "bg-rose text-paper-white border-2 border-ink-black font-extrabold shadow-editorial-xs",
    "golden-yellow": "bg-golden-yellow text-ink-black border-2 border-ink-black font-black shadow-editorial-xs",
    "acid-yellow": "bg-golden-yellow text-ink-black border-2 border-ink-black font-black shadow-editorial-xs",
    acid: "bg-golden-yellow text-ink-black border-2 border-ink-black font-black shadow-editorial-xs",
    "electric-yellow": "bg-golden-yellow text-ink-black border-2 border-ink-black font-black shadow-editorial-xs",
    yellow: "bg-golden-yellow text-ink-black border-2 border-ink-black font-black shadow-editorial-xs",
    "honey-gold": "bg-golden-yellow text-ink-black border-2 border-ink-black font-black shadow-editorial-xs",
    gold: "bg-golden-yellow text-ink-black border-2 border-ink-black font-black shadow-editorial-xs",
    dark: "bg-ink-black text-paper-white border-2 border-ink-black font-extrabold shadow-editorial-xs",
  };

  const isLightText =
    accent !== "golden-yellow" &&
    accent !== "acid-yellow" &&
    accent !== "acid" &&
    accent !== "electric-yellow" &&
    accent !== "yellow" &&
    accent !== "honey-gold" &&
    accent !== "gold";

  return (
    <div className={cn("flex items-center gap-1.5 p-1 bg-warm-cream border-2 border-ink-black rounded-lg overflow-x-auto", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap select-none cursor-pointer border border-transparent",
              isActive
                ? (activeStyles[accent] || activeStyles["primary-orange"])
                : "bg-paper-white text-ink-black border-ink-black/20 hover:bg-soft-pink hover:text-ink-black"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {typeof tab.count === "number" && (
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-sm text-[10px] font-mono",
                  isActive
                    ? isLightText
                      ? "bg-paper-white/25 text-paper-white font-bold"
                      : "bg-ink-black/15 text-ink-black font-bold"
                    : "bg-ink-black/10 text-ink-black font-bold"
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
