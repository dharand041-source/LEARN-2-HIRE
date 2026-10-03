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
import { ROUTES } from "@/lib/routes";

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
      { title: "Dashboard", href: ROUTES.app.dashboard },
      { title: "Career Discovery", href: ROUTES.app.career.discover, badge: "22 Tracks" },
      { title: "Skill Assessment", href: ROUTES.app.assessments.root },
      { title: "Personalized Learning", href: ROUTES.app.learning.root },
      { title: "Skill Analysis", href: ROUTES.app.skillAnalysis },
      { title: "Real-World Projects", href: ROUTES.app.projects.root },
    ],
  },
  {
    title: "Career",
    links: [
      { title: "Problem Solving", href: ROUTES.app.practice.root },
      { title: "Interview Simulation", href: ROUTES.app.interview.root, badge: "Voice AI" },
      { title: "Resume & ATS", href: ROUTES.app.resume.root },
      { title: "Job Opportunities", href: ROUTES.app.opportunities.jobs },
      { title: "Application Tracker", href: ROUTES.app.applications.root },
      { title: "Skill Evidence", href: ROUTES.app.skillProof.root },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Learning Curriculum", href: ROUTES.app.learning.courses },
      { title: "Learning Roadmap", href: ROUTES.app.learning.roadmap },
      { title: "Free Resources", href: ROUTES.resources },
      { title: "How It Works", href: ROUTES.howItWorks },
      { title: "Rejection Retraining", href: ROUTES.app.improve.root, badge: "Recovery" },
      { title: "System Preferences", href: ROUTES.app.settings },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About Learn-2-Hire", href: ROUTES.about },
      { title: "All Careers", href: ROUTES.careers },
      { title: "Candidate Profile", href: ROUTES.app.profile },
      { title: "Analytics", href: ROUTES.app.analytics },
      { title: "Contact & Settings", href: ROUTES.app.settings },
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
      className="w-full border-t-4 border-ink-black bg-ink-black text-paper-white selection:bg-primary-orange selection:text-paper-white"
      role="contentinfo"
      aria-label="Learn-2-Hire Site Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Main Grid: Left Brand Column + Right Navigation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-paper-white/20">
          {/* Brand & Editorial Value Statement (Left Side - 4 Columns on Desktop) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Logo and Tagline */}
            <BrandLogo size="lg" theme="dark" href={ROUTES.app.dashboard} />

            <p className="text-sm font-extrabold text-paper-white tracking-tight">
              Build skills. Prove your readiness. Launch your career.
            </p>

            <p className="text-xs text-paper-white/70 leading-relaxed font-normal max-w-sm">
              Learn-2-Hire is an evidence-based career-readiness platform that helps learners assess their technical skills, identify blind spots, build production experience, rehearse live voice interviews, and discover verified employment opportunities.
            </p>

            {/* Platform Trust Badge */}
            <div className="pt-1 flex items-center gap-2 text-[11px] font-mono font-bold text-paper-white bg-paper-white/10 p-2.5 rounded-lg border border-paper-white/20 max-w-sm">
              <ShieldCheck className="w-4 h-4 text-primary-orange shrink-0" />
              <span>Verifiable Competency & Rubric Standards</span>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-primary-orange font-extrabold mb-2.5">
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
                      className="w-9 h-9 rounded-lg bg-paper-white/10 hover:bg-primary-orange text-paper-white hover:text-paper-white border border-paper-white/20 hover:border-ink-black flex items-center justify-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange"
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
                <h3 className="text-xs font-mono uppercase tracking-widest font-extrabold text-primary-orange border-b border-paper-white/20 pb-2">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        prefetch={true}
                        className="group flex items-center justify-between text-xs text-paper-white/70 hover:text-paper-white font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded py-0.5"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform truncate">
                          {link.title}
                        </span>
                        {link.badge ? (
                          <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded bg-paper-white/10 border border-paper-white/20 text-primary-orange group-hover:border-primary-orange shrink-0 ml-1.5">
                            {link.badge}
                          </span>
                        ) : (
                          <ChevronRight className="w-3 h-3 text-paper-white/30 group-hover:text-primary-orange opacity-0 group-hover:opacity-100 transition-all shrink-0 ml-1" />
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-paper-white/60">
          {/* Copyright notice */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
            <span className="font-bold text-paper-white">
              © 2026 {PRODUCT_NAME}. All rights reserved.
            </span>
            <span className="hidden sm:inline text-paper-white/40">•</span>
            <span className="text-paper-white/60 text-[11px]">
              Precision engineering for candidate employment readiness.
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 sm:gap-6 font-medium text-[11px]">
            <button
              onClick={() => setActiveLegalModal("privacy")}
              className="hover:text-primary-orange transition-colors cursor-pointer underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveLegalModal("terms")}
              className="hover:text-primary-orange transition-colors cursor-pointer underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setActiveLegalModal("cookies")}
              className="hover:text-primary-orange transition-colors cursor-pointer underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-orange rounded"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-black/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setActiveLegalModal(null)}
        >
          <div
            className="w-full max-w-lg rounded-xl bg-paper-white border-2 border-ink-black p-6 shadow-editorial-md space-y-4 text-ink-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-ink-black/15 pb-3">
              <h2 id="legal-modal-title" className="text-base font-extrabold uppercase tracking-tight text-ink-black font-display">
                {legalContent[activeLegalModal].title}
              </h2>
              <button
                onClick={() => setActiveLegalModal(null)}
                aria-label="Close legal modal"
                className="p-1 rounded text-ink-black/70 hover:text-ink-black hover:bg-warm-cream transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-ink-black/70 leading-relaxed">
              {legalContent[activeLegalModal].body}
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="px-4 py-2 bg-ink-black text-paper-white rounded-lg text-xs font-bold hover:bg-primary-orange transition-colors cursor-pointer"
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
