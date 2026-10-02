"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  ChevronRight,
  Search,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CAREER_ROLES } from "@/data/careers";
import { CAREER_CATEGORIES } from "@/lib/constants";
import { useCareer } from "@/context/CareerContext";
import { ROUTES } from "@/lib/routes";

export default function CareerDiscoverPage() {
  const { selectedRole, selectRole } = useCareer();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = CAREER_ROLES.filter((role) => {
    const matchCat = selectedCategory === "all" || role.category === selectedCategory;
    const matchSearch =
      role.title.toLowerCase().includes(search.toLowerCase()) ||
      role.primarySkills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in bg-white pb-12">
      {/* Royal Maroon Hero */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Career Discovery
          </span>
          <span className="text-xs text-white/90 font-mono uppercase tracking-wider font-extrabold">
            22+ High-Demand Specializations
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug">
          Explore & Target Technical Pathways
        </h1>
        <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
          Select an engineering role to examine its required competencies, assessment criteria, curated curriculum modules, and verified job benchmarks.
        </p>
      </div>

      {/* Categories & Search */}
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
            All Tracks ({CAREER_ROLES.length})
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-electric-coral"
          />
        </div>
      </div>

      {/* Grid of Career Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((role) => {
          const isSelected = selectedRole.id === role.id;
          return (
            <div
              key={role.id}
              className={`p-6 rounded-xl border-2 transition-all flex flex-col justify-between ${
                isSelected
                  ? "bg-white border-royal-maroon border-3 shadow-editorial-md ring-2 ring-electric-coral"
                  : "bg-white border-black shadow-editorial-sm hover:-translate-y-1"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={isSelected ? "coral" : "night"} size="sm">
                    {role.category}
                  </Badge>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded bg-royal-maroon text-white font-mono text-[10px] font-black uppercase">
                      Current Target
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-black leading-snug">
                  {role.title}
                </h3>

                <p className="text-xs text-black/80 leading-relaxed font-normal">
                  {role.shortDesc}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-black/10">
                  <span className="text-black/60 font-medium">Avg Compensation:</span>
                  <span className="font-mono font-black text-royal-maroon">{role.averageSalary}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-black/60 font-bold block mb-1">
                    Primary Required Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {role.primarySkills.slice(0, 4).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-surface border border-black/20 text-[10px] font-mono">
                        {s}
                      </span>
                    ))}
                    {role.primarySkills.length > 4 && (
                      <span className="px-1 py-0.5 text-[10px] text-black/50 font-bold">
                        +{role.primarySkills.length - 4}
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
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/app/career/${role.id}`}
                  className="px-3.5 py-1.5 rounded-lg bg-electric-coral text-black font-black text-xs border-2 border-black hover:bg-black hover:text-white transition-colors"
                >
                  Inspect Role
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
