"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn, PRODUCT_NAME } from "@/lib/constants";

export interface BrandLogoProps {
  /**
   * Sizing presets for consistent proportional scaling
   * xs: h-6 (~24px)
   * sm: h-7 (~28px)
   * md: h-8 (~32px)
   * lg: h-10 (~40px)
   * xl: h-12 (~48px)
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Whether to render the brand wordmark next to the logo
   */
  showText?: boolean;
  /**
   * Optional custom text class
   */
  textClassName?: string;
  /**
   * Optional link destination (defaults to /dashboard)
   */
  href?: string;
  /**
   * Additional container classes
   */
  className?: string;
  /**
   * Accessible alt text (defaults to "Learn-2-Hire logo")
   */
  alt?: string;
  /**
   * Optional priority loading flag
   */
  priority?: boolean;
}

const SIZE_MAP = {
  xs: { height: 24, class: "h-6 w-auto" },
  sm: { height: 28, class: "h-7 w-auto" },
  md: { height: 34, class: "h-8.5 w-auto" },
  lg: { height: 42, class: "h-10.5 w-auto" },
  xl: { height: 48, class: "h-12 w-auto" },
};

export function BrandLogo({
  size = "md",
  showText = true,
  textClassName,
  href,
  className,
  alt = "Learn-2-Hire logo",
  priority = false,
}: BrandLogoProps) {
  const currentSize = SIZE_MAP[size];

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 group select-none", className)}>
      {/* Exact L2H Logo Asset - Proportional Aspect Ratio Preserved */}
      <div className="relative shrink-0 flex items-center justify-center">
        <Image
          src="/brand/l2h-logo.png"
          alt={alt}
          width={776}
          height={995}
          priority={priority}
          className={cn(
            "object-contain transition-transform duration-200 group-hover:scale-105",
            currentSize.class
          )}
          style={{
            height: `${currentSize.height}px`,
            width: "auto",
            maxWidth: "none",
          }}
        />
      </div>

      {showText && (
        <span
          className={cn(
            "font-display font-extrabold text-foreground tracking-tight transition-colors group-hover:text-fire-red whitespace-nowrap",
            size === "xs" && "text-sm",
            size === "sm" && "text-base",
            size === "md" && "text-lg",
            size === "lg" && "text-xl",
            size === "xl" && "text-2xl",
            textClassName
          )}
        >
          {PRODUCT_NAME}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} prefetch={true} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
