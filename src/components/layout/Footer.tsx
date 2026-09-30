"use client";

import React, { memo, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  Globe,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  X,
} from "lucide-react";
import { PRODUCT_NAME, PRODUCT_TAGLINE } from "@/lib/constants";
import { BrandLogo } from "@/components/ui/BrandLogo";

interface FooterLink {
  title: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_SECTIONS: FooterColumn[] = [
  {
    title: "Platform",
    links: [
      { title: "Dashboard", href: "/dashboard" },
      { title: "Career Discovery", href: "/onboarding", badge: "24 Tracks" },
      { title: "Skill Assessment", href: "/assessment" },
      { title: "Personalized Learning", href: "/learning" },
      { title: "Advanced Assessment", href: "/advanced-assessment" },
      { title: "Real-World Projects", href: "/projects" },
    ],
  },
  {
    title: "Career",
    links: [
      { title: "Problem Solving", href: "/problem-solving" },
      { title: "Interview Simulation", href: "/interview", badge: "Voice AI" },
      { title: "Resume & ATS", href: "/resume" },
      { title: "Job Opportunities", href: "/opportunities" },
      { title: "Application Tracker", href: "/applications" },
      { title: "Skill Development", href: "/learning" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Learning Curriculum", href: "/learning" },
      { title: "Career Guidance", href: "/onboarding" },
      { title: "Project Marketplace", href: "/projects" },
      { title: "Interview Defense", href: "/interview" },
      { title: "Rejection Retraining", href: "/feedback", badge: "Recovery" },
      { title: "System Preferences", href: "/settings" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About Learn-2-Hire", href: "/dashboard" },
      { title: "Our Mission", href: "/dashboard" },
      { title: "Candidate Profile", href: "/profile" },
      { title: "Feedback Engine", href: "/feedback" },
      { title: "Contact Support", href: "/settings" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
    label: "Learn-2-Hire on GitHub",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    label: "Learn-2-Hire on LinkedIn",
  },
  {
    name: "Twitter / X",
    href: "https://x.com",
    icon: Twitter,
    label: "Learn-2-Hire on X (Twitter)",
  },
];

function FooterComponent() {
  const [activeLegalModal, setActiveLegalModal] = useState<string | null>(null);

  const legalContent: Record<string, { title: string; body: string }> = {
    privacy: {
      title: "Privacy Policy",
      body: "Learn-2-Hire is committed to safeguarding learner privacy and assessment data. All evaluation metrics, audio recordings from mock interviews, and code test runs are stored securely in isolated tenant partitions and used solely for candidate skill gap diagnostics. We never sell candidate telemetry to third parties.",
    },
    terms: {
      title: "Terms & Conditions",
      body: "By utilizing the Learn-2-Hire career readiness platform, you agree to engage in authentic skill evaluation. Rubric scoring, automated ATS reviews, and verified production project credentials reflect honest candidate capability. Unauthorized automation or abuse of assessment endpoints is strictly prohibited.",
    },
    cookies: {
      title: "Cookie Policy",
      body: "We use essential session tokens and functional cookies to preserve authentication status, language choices, and assessment timer progress. No invasive cross-site advertising cookies are deployed on the platform.",
    },
  };

  return (
    <footer
      className="w-full border-t-2 border-border bg-white text-foreground selection:bg-fire-red selection:text-white"
      role="contentinfo"
      aria-label="Learn-2-Hire Site Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Main Grid: Left Brand Column + Right Navigation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-border">
          {/* Brand & Editorial Value Statement (Left Side - 4 Columns on Desktop) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logo and Tagline */}
            <BrandLogo size="lg" href="/dashboard" />

            <p className="text-sm font-extrabold text-foreground tracking-tight">
              Build skills. Prove your readiness. Launch your career.
            </p>

            <p className="text-xs text-muted leading-relaxed font-normal max-w-sm">
              Learn-2-Hire is an evidence-based career-readiness platform that helps learners assess their technical skills, identify blind spots, build production experience, rehearse live voice interviews, and discover verified employment opportunities.
            </p>

            {/* Platform Trust Badge */}
            <div className="pt-1 flex items-center gap-2 text-[11px] font-mono font-bold text-foreground bg-surface p-2.5 rounded-lg border border-border max-w-sm">
              <ShieldCheck className="w-4 h-4 text-fire-red shrink-0" />
              <span>Verifiable Competency & Rubric Standards</span>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted font-extrabold mb-2.5">
                Connect With Us
              </p>
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="w-9 h-9 rounded-lg bg-surface hover:bg-foreground text-foreground hover:text-white border border-border hover:border-foreground flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Navigation Columns (Right Side - 8 Columns on Desktop) */}
          <nav
            aria-label="Footer Navigation"
            className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6"
          >
            {FOOTER_SECTIONS.map((col) => (
              <div key={col.title} className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest font-extrabold text-foreground border-b border-border pb-2">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        prefetch={true}
                        className="group flex items-center justify-between text-xs text-muted hover:text-foreground font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded py-0.5"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform truncate">
                          {link.title}
                        </span>
                        {link.badge ? (
                          <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded bg-surface border border-border text-foreground group-hover:border-foreground shrink-0 ml-1.5">
                            {link.badge}
                          </span>
                        ) : (
                          <ChevronRight className="w-3 h-3 text-border group-hover:text-foreground opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-1" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          {/* Copyright notice */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span className="font-medium text-foreground">
              © 2026 {PRODUCT_NAME}. All rights reserved.
            </span>
            <span className="hidden sm:inline text-border">•</span>
            <span className="text-muted text-[11px]">
              Precision engineering for candidate employment readiness.
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 sm:gap-6 font-medium text-[11px]">
            <button
              onClick={() => setActiveLegalModal("privacy")}
              className="hover:text-foreground transition-colors cursor-pointer underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveLegalModal("terms")}
              className="hover:text-foreground transition-colors cursor-pointer underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setActiveLegalModal("cookies")}
              className="hover:text-foreground transition-colors cursor-pointer underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>

      {/* Accessible In-App Legal Information Modal */}
      {activeLegalModal && legalContent[activeLegalModal] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night/50 backdrop-blur-xs animate-fade-in"
          onClick={() => setActiveLegalModal(null)}
        >
          <div
            className="w-full max-w-lg rounded-xl bg-white border-2 border-foreground p-6 shadow-editorial-md space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 id="legal-modal-title" className="text-base font-extrabold uppercase tracking-tight text-foreground font-display">
                {legalContent[activeLegalModal].title}
              </h2>
              <button
                onClick={() => setActiveLegalModal(null)}
                aria-label="Close legal modal"
                className="p-1 rounded text-muted hover:text-foreground hover:bg-surface transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {legalContent[activeLegalModal].body}
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="px-4 py-2 bg-foreground text-white rounded-lg text-xs font-bold hover:bg-fire-red transition-colors cursor-pointer"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export const Footer = memo(FooterComponent);
