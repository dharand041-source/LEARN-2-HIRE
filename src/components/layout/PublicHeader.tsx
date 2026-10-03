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
    <header className="sticky top-0 z-50 w-full border-b-2 border-ink-black bg-paper-white text-ink-black">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <BrandLogo size="md" theme="light" href={ROUTES.home} />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-ink-black/20">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-bold transition-colors",
                    isActive
                      ? "bg-warm-cream text-primary-orange"
                      : "text-ink-black/80 hover:text-ink-black hover:bg-warm-cream"
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
            className="px-4 py-2 text-xs font-bold text-ink-black hover:text-primary-orange transition-colors"
          >
            Sign In
          </Link>

          <Link
            href={ROUTES.onboarding}
            className="px-4 py-2 rounded-lg bg-primary-orange hover:bg-rose text-paper-white border-2 border-ink-black font-black text-xs transition-colors flex items-center gap-1.5 shadow-editorial-xs cursor-pointer"
          >
            <span>Start Journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="sm:hidden p-2 text-ink-black hover:text-primary-orange"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-ink-black/20 bg-paper-white px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-xs font-bold text-ink-black/90 hover:bg-warm-cream"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-ink-black/20 flex flex-col gap-2">
            <Link
              href={ROUTES.auth.login}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg border-2 border-ink-black/30 text-center text-xs font-bold text-ink-black hover:bg-warm-cream"
            >
              Sign In
            </Link>
            <Link
              href={ROUTES.onboarding}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-lg bg-primary-orange text-paper-white font-black text-center text-xs border-2 border-ink-black flex items-center justify-center gap-2 hover:bg-rose"
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
