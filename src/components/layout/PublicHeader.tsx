"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ROUTES } from "@/lib/routes";
import { cn } from "@/lib/constants";

export function PublicHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "How It Works", href: ROUTES.howItWorks },
    { label: "Career Pathways", href: ROUTES.careers },
    { label: "Free Resources", href: ROUTES.resources },
    { label: "About & Ethics", href: ROUTES.about },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-black bg-black text-white">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <BrandLogo size="md" theme="dark" href={ROUTES.home} />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-white/20">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-bold transition-colors",
                    isActive
                      ? "bg-white/15 text-electric-coral"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href={ROUTES.auth.login}
            className="px-4 py-2 text-xs font-bold text-white hover:text-electric-coral transition-colors"
          >
            Sign In
          </Link>

          <Link
            href={ROUTES.onboarding}
            className="px-4 py-2 rounded-lg bg-electric-coral hover:bg-white text-black border-2 border-black font-black text-xs transition-colors flex items-center gap-1.5 shadow-editorial-xs cursor-pointer"
          >
            <span>Start Journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="sm:hidden p-2 text-white hover:text-electric-coral"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-white/20 bg-black px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-xs font-bold text-white/90 hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-white/20 flex flex-col gap-2">
            <Link
              href={ROUTES.auth.login}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg border-2 border-white/30 text-center text-xs font-bold text-white"
            >
              Sign In
            </Link>
            <Link
              href={ROUTES.onboarding}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-electric-coral text-black font-black text-center text-xs border-2 border-black flex items-center justify-center gap-2"
            >
              <span>Start Career Journey</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
