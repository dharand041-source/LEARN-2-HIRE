"use client";

import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/constants";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "soft"
    | "outline"
    | "ghost"
    | "dark"
    | "danger"
    | "red"
    | "yellow"
    | "gold"
    | "acid"
    | "navy"
    | "violet"
    | "coral"
    | "maroon"
    | "rose";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange focus-visible:ring-offset-2 focus-visible:ring-offset-warm-cream disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer active:scale-[0.98]";

    const variants = {
      // Primary: #E43D12 with #F7F5EF text
      primary: "bg-primary-orange text-paper-white hover:bg-rose hover:text-paper-white border-2 border-ink-black font-black shadow-editorial-xs",
      // Secondary: #D6536D with #F7F5EF text
      secondary: "bg-rose text-paper-white hover:bg-ink-black hover:text-paper-white border-2 border-ink-black font-extrabold shadow-editorial-xs",
      // Accent: #EFB11D with #171714 text
      accent: "bg-golden-yellow text-ink-black hover:bg-soft-pink hover:text-ink-black border-2 border-ink-black font-black shadow-editorial-xs",
      // Soft: #FFA2B6 with #171714 text
      soft: "bg-soft-pink text-ink-black hover:bg-golden-yellow hover:text-ink-black border-2 border-ink-black font-bold shadow-editorial-xs",
      // Dark: #171714 with #F7F5EF text
      dark: "bg-ink-black text-paper-white hover:bg-primary-orange hover:text-paper-white border-2 border-ink-black font-extrabold shadow-editorial-xs",
      // Outline: #E43D12 border and text
      outline: "bg-transparent text-primary-orange border-2 border-primary-orange hover:bg-primary-orange hover:text-paper-white font-extrabold",
      // Ghost: Text-only button
      ghost: "bg-transparent text-ink-black/70 hover:text-ink-black hover:bg-warm-cream font-bold",
      // Danger / Alert: Primary Orange
      danger: "bg-primary-orange text-paper-white border-2 border-ink-black hover:bg-rose font-extrabold",
      // Backward compatibility mappings
      coral: "bg-primary-orange text-paper-white hover:bg-rose hover:text-paper-white border-2 border-ink-black font-black shadow-editorial-xs",
      maroon: "bg-rose text-paper-white hover:bg-ink-black hover:text-paper-white border-2 border-ink-black font-extrabold shadow-editorial-xs",
      navy: "bg-ink-black text-paper-white hover:bg-primary-orange hover:text-paper-white border-2 border-ink-black font-extrabold shadow-editorial-xs",
      red: "bg-primary-orange text-paper-white hover:bg-rose border-2 border-ink-black font-extrabold",
      yellow: "bg-golden-yellow text-ink-black hover:bg-soft-pink border-2 border-ink-black font-black",
      gold: "bg-golden-yellow text-ink-black hover:bg-soft-pink border-2 border-ink-black font-black",
      acid: "bg-golden-yellow text-ink-black hover:bg-soft-pink border-2 border-ink-black font-black",
      violet: "bg-rose text-paper-white hover:bg-ink-black border-2 border-ink-black font-extrabold",
      rose: "bg-rose text-paper-white hover:bg-ink-black border-2 border-ink-black font-extrabold",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-xs sm:text-sm px-4 py-2 gap-2",
      lg: "text-sm sm:text-base px-6 py-3 gap-2.5 font-bold tracking-tight",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-1.5" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
