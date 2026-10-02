"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Library,
  ExternalLink,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  ArrowRight,
} from "lucide-react";
import { LearningNav } from "@/components/learning/LearningNav";
import { ROUTES } from "@/lib/routes";

const FREE_RESOURCES = [
  {
    id: "res-01",
    title: "MDN Web Docs: JavaScript Fundamentals & Async",
    provider: "MDN Web Docs",
    skill: "JavaScript",
    topic: "Core Language & Concurrency",
    difficulty: "Beginner to Intermediate",
    freeStatus: "100% Free & Open Source",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    lastVerified: "2026-09-15",
  },
  {
    id: "res-02",
    title: "Harvard CS50x: Introduction to Computer Science",
    provider: "Harvard University / edX",
    skill: "Algorithms & Systems",
    topic: "C, Python, SQL, Memory & Algorithms",
    difficulty: "Beginner to Advanced",
    freeStatus: "Free to Audit (Complete Access)",
    url: "https://cs50.harvard.edu/x",
    lastVerified: "2026-09-20",
  },
  {
    id: "res-03",
    title: "Full Stack Open: Modern Web Development",
    provider: "University of Helsinki",
    skill: "React & Node.js",
    topic: "TypeScript, GraphQL, CI/CD, Containerization",
    difficulty: "Intermediate",
    freeStatus: "100% Free Public University Course",
    url: "https://fullstackopen.com/en",
    lastVerified: "2026-09-18",
  },
  {
    id: "res-04",
    title: "freeCodeCamp Responsive Web Design & Algorithms",
    provider: "freeCodeCamp",
    skill: "Frontend & DSA",
    topic: "Interactive coding curriculum with certification",
    difficulty: "Beginner",
    freeStatus: "100% Free Non-Profit",
    url: "https://www.freecodecamp.org",
    lastVerified: "2026-09-22",
  },
  {
    id: "res-05",
    title: "SQLBolt: Interactive SQL Tutorials",
    provider: "SQLBolt",
    skill: "SQL & Databases",
    topic: "Relational Queries, Joins, Aggregations & Schemas",
    difficulty: "Beginner to Intermediate",
    freeStatus: "100% Free Interactive Platform",
    url: "https://sqlbolt.com",
    lastVerified: "2026-09-10",
  },
  {
    id: "res-06",
    title: "NPTEL Database Management Systems",
    provider: "IIT Kharagpur / NPTEL",
    skill: "Databases & Storage",
    topic: "Relational Algebra, Normalization & ACID Transactions",
    difficulty: "Intermediate to Advanced",
    freeStatus: "Government of India SWAYAM Initiative",
    url: "https://nptel.ac.in",
    lastVerified: "2026-09-05",
  },
  {
    id: "res-07",
    title: "Microsoft Learn: TypeScript Foundations",
    provider: "Microsoft Learn",
    skill: "TypeScript",
    topic: "Static Typing, Generics, Interfaces & Tooling",
    difficulty: "Intermediate",
    freeStatus: "100% Free Official Learning Path",
    url: "https://learn.microsoft.com/training/paths/build-javascript-applications-typescript",
    lastVerified: "2026-09-14",
  },
  {
    id: "res-08",
    title: "MIT OpenCourseWare: Introduction to Algorithms (6.006)",
    provider: "MIT OpenCourseWare",
    skill: "Data Structures & Algorithms",
    topic: "Sorting, Graph Algorithms, Dynamic Programming",
    difficulty: "Advanced",
    freeStatus: "100% Free Academic Archive",
    url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020",
    lastVerified: "2026-09-08",
  },
];

export default function LearningResourcesPage() {
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("ALL");
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  };

  const filtered = FREE_RESOURCES.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.provider.toLowerCase().includes(search.toLowerCase()) ||
      r.skill.toLowerCase().includes(search.toLowerCase());
    const matchesSkill = selectedSkill === "ALL" || r.skill.toLowerCase().includes(selectedSkill.toLowerCase());
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <LearningNav />

      {/* Hero Header */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Verified Free Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Free & Open Educational Resources
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-2xl">
            No paywalls. Only verified, legitimate free courses, textbooks, and interactive platforms from world-class institutions.
          </p>
        </div>

        <div className="p-3 bg-black/50 border border-white/20 text-xs font-mono text-white/90">
          <span className="text-electric-coral font-bold block mb-1">Ethical Standard</span>
          <span>Zero copyrighted pirated media. Direct links to original providers.</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 bg-white border-2 border-black shadow-editorial-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search by topic, provider, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs font-semibold text-black placeholder:text-muted focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-muted">Skill:</span>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="text-xs font-bold bg-paper border border-black/30 px-3 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Skills</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React & Node</option>
            <option value="SQL">SQL & Databases</option>
            <option value="Algorithms">Algorithms & DSA</option>
            <option value="TypeScript">TypeScript</option>
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col justify-between space-y-4 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                  {r.provider}
                </span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold uppercase border border-emerald-400">
                  {r.freeStatus}
                </span>
              </div>

              <h3 className="text-base font-black uppercase tracking-tight text-black leading-snug">
                {r.title}
              </h3>

              <div className="text-xs text-muted space-y-1">
                <p>
                  <strong className="text-black">Topic:</strong> {r.topic}
                </p>
                <p>
                  <strong className="text-black">Level:</strong> {r.difficulty}
                </p>
                <p className="text-[11px] font-mono text-muted">
                  Last verified: {r.lastVerified}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-2">
              <button
                onClick={() => toggleBookmark(r.id)}
                className={`p-2 border transition-colors ${
                  bookmarkedIds.has(r.id)
                    ? "bg-amber-100 border-amber-500 text-amber-900"
                    : "bg-white border-black/20 text-muted hover:border-black"
                }`}
                title="Bookmark resource"
              >
                <Bookmark className="w-4 h-4" />
              </button>

              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs"
              >
                <span>Access Original Course</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
