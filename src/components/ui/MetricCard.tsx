import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/constants";

export interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  accent?:
    | "primary-orange"
    | "golden-yellow"
    | "rose"
    | "soft-pink"
    | "ink-black"
    | "paper-white"
    | "fire-red"
    | "electric-yellow"
    | "ultra-violet"
    | "acid-yellow"
    | "electric-coral"
    | "royal-maroon"
    | "honey-gold"
    | "deep-navy"
    | "dark";
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
  const accentBorderMap: Record<string, string> = {
    "primary-orange": "border-l-4 border-l-primary-orange",
    "electric-coral": "border-l-4 border-l-primary-orange",
    coral: "border-l-4 border-l-primary-orange",
    orange: "border-l-4 border-l-primary-orange",
    "golden-yellow": "border-l-4 border-l-golden-yellow",
    "electric-yellow": "border-l-4 border-l-golden-yellow",
    yellow: "border-l-4 border-l-golden-yellow",
    "acid-yellow": "border-l-4 border-l-golden-yellow",
    acid: "border-l-4 border-l-golden-yellow",
    "honey-gold": "border-l-4 border-l-golden-yellow",
    gold: "border-l-4 border-l-golden-yellow",
    rose: "border-l-4 border-l-rose",
    "royal-maroon": "border-l-4 border-l-rose",
    maroon: "border-l-4 border-l-rose",
    "ultra-violet": "border-l-4 border-l-rose",
    violet: "border-l-4 border-l-rose",
    "soft-pink": "border-l-4 border-l-soft-pink",
    pink: "border-l-4 border-l-soft-pink",
    "fire-red": "border-l-4 border-l-primary-orange",
    red: "border-l-4 border-l-primary-orange",
    "deep-navy": "border-l-4 border-l-ink-black",
    navy: "border-l-4 border-l-ink-black",
    dark: "border-l-4 border-l-ink-black",
  };

  const accentColorMap: Record<string, string> = {
    "primary-orange": "text-primary-orange",
    "electric-coral": "text-primary-orange",
    coral: "text-primary-orange",
    orange: "text-primary-orange",
    "golden-yellow": "text-golden-yellow",
    "electric-yellow": "text-golden-yellow",
    yellow: "text-golden-yellow",
    "acid-yellow": "text-golden-yellow",
    acid: "text-golden-yellow",
    "honey-gold": "text-golden-yellow",
    gold: "text-golden-yellow",
    rose: "text-rose",
    "royal-maroon": "text-rose",
    maroon: "text-rose",
    "ultra-violet": "text-rose",
    violet: "text-rose",
    "soft-pink": "text-soft-pink",
    pink: "text-soft-pink",
    "fire-red": "text-primary-orange",
    red: "text-primary-orange",
    "deep-navy": "text-ink-black",
    navy: "text-ink-black",
    dark: "text-ink-black",
  };

  const iconBgMap: Record<string, string> = {
    "primary-orange": "bg-primary-orange text-paper-white border border-ink-black",
    "electric-coral": "bg-primary-orange text-paper-white border border-ink-black",
    coral: "bg-primary-orange text-paper-white border border-ink-black",
    orange: "bg-primary-orange text-paper-white border border-ink-black",
    "golden-yellow": "bg-golden-yellow text-ink-black border border-ink-black",
    "electric-yellow": "bg-golden-yellow text-ink-black border border-ink-black",
    yellow: "bg-golden-yellow text-ink-black border border-ink-black",
    "acid-yellow": "bg-golden-yellow text-ink-black border border-ink-black",
    acid: "bg-golden-yellow text-ink-black border border-ink-black",
    "honey-gold": "bg-golden-yellow text-ink-black border border-ink-black",
    gold: "bg-golden-yellow text-ink-black border border-ink-black",
    rose: "bg-rose text-paper-white border border-ink-black",
    "royal-maroon": "bg-rose text-paper-white border border-ink-black",
    maroon: "bg-rose text-paper-white border border-ink-black",
    "ultra-violet": "bg-rose text-paper-white border border-ink-black",
    violet: "bg-rose text-paper-white border border-ink-black",
    "soft-pink": "bg-soft-pink text-ink-black border border-ink-black",
    pink: "bg-soft-pink text-ink-black border border-ink-black",
    "fire-red": "bg-primary-orange text-paper-white border border-ink-black",
    red: "bg-primary-orange text-paper-white border border-ink-black",
    "deep-navy": "bg-ink-black text-paper-white border border-ink-black",
    navy: "bg-ink-black text-paper-white border border-ink-black",
    dark: "bg-ink-black text-paper-white border border-ink-black",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-5 rounded-xl bg-paper-white border-2 border-ink-black text-ink-black transition-all duration-150 flex flex-col justify-between shadow-card-clean",
        accentBorderMap[accent] || accentBorderMap["primary-orange"],
        onClick && "hover:shadow-editorial-sm hover:border-primary-orange cursor-pointer",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="space-y-0.5">
          <span className="text-[11px] font-bold text-ink-black/70 uppercase tracking-wider block">
            {label}
          </span>
          <div className="flex items-baseline gap-2">
            <span className={cn("text-3xl font-extrabold font-mono tracking-tight", accentColorMap[accent] || accentColorMap["primary-orange"])}>
              {value}
            </span>
          </div>
        </div>

        {Icon && (
          <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", iconBgMap[accent] || iconBgMap["primary-orange"])}>
            <Icon className="w-4 h-4 stroke-[2.5]" />
          </div>
        )}
      </div>

      {subValue && (
        <p className="text-xs text-ink-black/80 font-medium leading-relaxed break-words line-clamp-2">
          {subValue}
        </p>
      )}

      {badge && (
        <div className="mt-2.5">
          <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-warm-cream border border-ink-black/20 text-ink-black">
            {badge}
          </span>
        </div>
      )}

      {footer && <div className="mt-3 pt-2.5 border-t border-ink-black/15">{footer}</div>}
    </div>
  );
}
