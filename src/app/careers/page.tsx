"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  ChevronRight,
  Sparkles,
  TrendingUp,
  DollarSign,
  Search,
} from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { CAREER_ROLES } from "@/data/careers";
import { CAREER_CATEGORIES } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";

export default function CareersPublicPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredRoles = CAREER_ROLES.filter((role) => {
    const matchesCategory = selectedCategory === "all" || role.category === selectedCategory;
    const matchesSearch =
      role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.primarySkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <PublicHeader />

      <main className="flex-1 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header Hero */}
        <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-8 sm:p-12 shadow-editorial-md space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black text-electric-coral border-2 border-black text-xs font-mono font-black uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            <span>Career Atlas // 22 Engineering Disciplines</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            Explore Technical Pathways
          </h1>
          <p className="text-white/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            Every engineering track includes explicit competency benchmarks, salary insights, diagnostic assessments, and curated learning roadmaps.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-black pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-colors ${
                selectedCategory === "all"
                  ? "bg-black text-white border-black"
                  : "bg-surface text-black border-black/30 hover:border-black"
              }`}
            >
              All Categories ({CAREER_ROLES.length})
            </button>
            {CAREER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-colors ${
                  selectedCategory === cat
                    ? "bg-black text-white border-black"
                    : "bg-surface text-black border-black/30 hover:border-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-black/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by role or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-electric-coral"
            />
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className="p-6 rounded-xl border-2 border-black bg-white shadow-editorial-sm flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="coral" size="sm">
                    {role.category}
                  </Badge>
                  <span className="text-xs font-mono font-bold text-black/60">
                    {role.openRolesCount}+ roles
                  </span>
                </div>

                <h3 className="text-lg font-black text-black leading-snug">
                  {role.title}
                </h3>

                <p className="text-xs text-black/80 leading-relaxed font-normal">
                  {role.shortDesc}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-black/10">
                  <span className="text-black/60 font-medium">Avg Compensation:</span>
                  <span className="font-mono font-black text-royal-maroon">
                    {role.averageSalary}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-black/60 font-bold block mb-1.5">
                    Core Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {role.primarySkills.slice(0, 4).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-surface border border-black/20 text-[10px] font-mono">
                        {s}
                      </span>
                    ))}
                    {role.primarySkills.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] text-black/50 font-bold">
                        +{role.primarySkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between">
                <Link
                  href={`/app/career/${role.id}`}
                  className="font-black text-xs text-black hover:text-royal-maroon flex items-center gap-1 transition-colors"
                >
                  <span>Explore Detail & Curriculum</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href={ROUTES.onboarding}
                  className="px-3 py-1.5 rounded bg-electric-coral text-black font-black text-xs border border-black hover:bg-black hover:text-white transition-colors"
                >
                  Select Track
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
