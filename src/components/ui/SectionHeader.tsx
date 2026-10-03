import React from "react";
import { Badge } from "./Badge";
import { cn } from "@/lib/constants";

export interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: any;
  phase?: string;
  eyebrow?: string;
  accent?: "red" | "yellow" | "violet" | "acid" | "gold" | "navy" | string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  badge,
  badgeVariant = "red",
  phase,
  eyebrow,
  accent,
  title,
  description,
  actions,
  className,
}: SectionHeaderProps) {
  const accentDotColor =
    accent === "primary-orange" || accent === "coral" || accent === "electric-coral"
      ? "bg-primary-orange"
      : accent === "golden-yellow" || accent === "yellow" || accent === "acid" || accent === "gold" || accent === "electric-yellow"
      ? "bg-golden-yellow"
      : accent === "rose" || accent === "maroon" || accent === "red" || accent === "violet" || accent === "royal-maroon"
      ? "bg-rose"
      : "bg-ink-black";

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center justify-between gap-4",
        className
      )}
    >
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          {phase && <Badge variant={badgeVariant} size="sm">{phase}</Badge>}
          {badge && (
            <span className="text-xs text-ink-black/70 font-mono uppercase tracking-wider font-bold">
              {badge}
            </span>
          )}
          {eyebrow && (
            <div className="flex items-center gap-2">
              <span className={cn("w-2 h-2 rounded-full", accentDotColor)} />
              <span className="text-[11px] font-mono uppercase tracking-widest text-ink-black/70 font-bold">
                {eyebrow}
              </span>
            </div>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-ink-black tracking-tight uppercase leading-snug">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-ink-black/75 mt-1 max-w-2xl leading-relaxed font-medium">
            {description}
          </p>
        )}
      </div>

      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}
