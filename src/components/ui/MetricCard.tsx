import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/constants";

export interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  accent?: "fire-red" | "electric-yellow" | "ultra-violet" | "acid-yellow" | "electric-coral" | "royal-maroon" | "honey-gold" | "deep-navy" | "dark";
  icon?: LucideIcon;
  badge?: string;
  className?: string;
  onClick?: () => void;
  footer?: React.ReactNode;
}

export function MetricCard({
  label,
  value,
  subValue,
  accent = "fire-red",
  icon: Icon,
  badge,
  className,
  onClick,
  footer,
}: MetricCardProps) {
  const accentBorderMap = {
    "electric-coral": "border-l-4 border-l-electric-coral",
    "royal-maroon": "border-l-4 border-l-royal-maroon",
    "fire-red": "border-l-4 border-l-royal-maroon",
    "electric-yellow": "border-l-4 border-l-electric-coral",
    "ultra-violet": "border-l-4 border-l-royal-maroon",
    "acid-yellow": "border-l-4 border-l-electric-coral",
    "honey-gold": "border-l-4 border-l-electric-coral",
    "deep-navy": "border-l-4 border-l-royal-maroon",
    dark: "border-l-4 border-l-foreground",
  };

  const accentColorMap = {
    "electric-coral": "text-electric-coral",
    "royal-maroon": "text-royal-maroon",
    "fire-red": "text-royal-maroon",
    "electric-yellow": "text-electric-coral",
    "ultra-violet": "text-royal-maroon",
    "acid-yellow": "text-electric-coral",
    "honey-gold": "text-electric-coral",
    "deep-navy": "text-royal-maroon",
    dark: "text-foreground",
  };

  const iconBgMap = {
    "electric-coral": "bg-electric-coral text-black border border-black",
    "royal-maroon": "bg-royal-maroon text-white border border-black",
    "fire-red": "bg-royal-maroon text-white border border-black",
    "electric-yellow": "bg-electric-coral text-black border border-black",
    "ultra-violet": "bg-royal-maroon text-white border border-black",
    "acid-yellow": "bg-electric-coral text-black border border-black",
    "honey-gold": "bg-electric-coral text-black border border-black",
    "deep-navy": "bg-royal-maroon text-white border border-black",
    dark: "bg-surface text-foreground border border-foreground/30",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-5 rounded-xl bg-white border border-border transition-all duration-150 flex flex-col justify-between shadow-card-clean",
        accentBorderMap[accent],
        onClick && "hover:shadow-editorial-sm hover:border-foreground cursor-pointer",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="space-y-0.5">
          <span className="text-[11px] font-bold text-muted uppercase tracking-wider block">
            {label}
          </span>
          <div className="flex items-baseline gap-2">
            <span className={cn("text-3xl font-extrabold font-mono tracking-tight", accentColorMap[accent])}>
              {value}
            </span>
          </div>
        </div>

        {Icon && (
          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", iconBgMap[accent])}>
            <Icon className="w-4 h-4 stroke-[2.5]" />
          </div>
        )}
      </div>

      {subValue && (
        <p className="text-xs text-muted font-medium leading-relaxed break-words line-clamp-2">
          {subValue}
        </p>
      )}

      {badge && (
        <div className="mt-2.5">
          <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-surface border border-border text-foreground">
            {badge}
          </span>
        </div>
      )}

      {footer && <div className="mt-3 pt-2.5 border-t border-border">{footer}</div>}
    </div>
  );
}
