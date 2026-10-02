"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ExternalLink,
  Search,
  CheckCircle,
  Globe,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/lib/routes";

interface FreeResource {
  id: string;
  title: string;
  provider: string;
  skill: string;
  topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  freeStatus: "100% Free / Open Source" | "Free Audit";
  url: string;
  lastVerified: string;
  description: string;
}

const FREE_RESOURCES_CATALOG: FreeResource[] = [
  {
    id: "res-1",
    title: "CS50: Introduction to Computer Science",
    provider: "Harvard University / edX",
    skill: "Computer Science & Problem Solving",
    topic: "Algorithms, C, Python, Memory Management, Web",
    difficulty: "Beginner",
    freeStatus: "100% Free / Open Source",
    url: "https://cs50.harvard.edu/x",
    lastVerified: "2026-09-15",
    description: "World-renowned introductory computer science curriculum teaching fundamental logic, pointers, data structures, and web technologies.",
  },
  {
    id: "res-2",
    title: "MDN Web Docs & JavaScript Deep Dive",
    provider: "Mozilla Developer Network (MDN)",
    skill: "Frontend & JavaScript",
    topic: "Event Loop, DOM, Promises, Async/Await, Prototypes",
    difficulty: "Intermediate",
    freeStatus: "100% Free / Open Source",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    lastVerified: "2026-09-20",
    description: "Authoritative reference and deep guide for modern JavaScript, browser APIs, CSS grid architectures, and WCAG accessibility standards.",
  },
  {
    id: "res-3",
    title: "Full Stack Open: Deep Dive into Modern Web Development",
    provider: "University of Helsinki",
    skill: "Full-Stack Development",
    topic: "React, Redux, Node.js, Express, MongoDB, TypeScript, CI/CD",
    difficulty: "Intermediate",
    freeStatus: "100% Free / Open Source",
    url: "https://fullstackopen.com/en",
    lastVerified: "2026-09-18",
    description: "Comprehensive university-grade course on building single-page apps with React and Node.js REST/GraphQL backends.",
  },
  {
    id: "res-4",
    title: "NPTEL: Database Management System",
    provider: "IIT Kharagpur / NPTEL",
    skill: "Database Design & SQL",
    topic: "Relational Algebra, SQL Normalization, Indexing, Transactions",
    difficulty: "Intermediate",
    freeStatus: "100% Free / Open Source",
    url: "https://nptel.ac.in/courses/106105175",
    lastVerified: "2026-09-10",
    description: "In-depth engineering curriculum on database internals, ACID transaction schedules, B+ tree indexing, and query optimization.",
  },
  {
    id: "res-5",
    title: "The Missing Semester of Your CS Education",
    provider: "MIT OpenCourseWare",
    skill: "DevOps, Shell & Tooling",
    topic: "Bash, Git Internals, Vim, SSH, Build Systems, Debugging",
    difficulty: "Beginner",
    freeStatus: "100% Free / Open Source",
    url: "https://missing.csail.mit.edu",
    lastVerified: "2026-09-22",
    description: "Practical engineering tools, command-line mastery, and version control hygiene essential for production software engineers.",
  },
  {
    id: "res-6",
    title: "SQLBolt: Interactive SQL Lessons",
    provider: "SQLBolt",
    skill: "SQL",
    topic: "SELECT queries, JOINs, Aggregations, Subqueries, Constraints",
    difficulty: "Beginner",
    freeStatus: "100% Free / Open Source",
    url: "https://sqlbolt.com",
    lastVerified: "2026-09-25",
    description: "Browser-based interactive SQL sandbox for hands-on practice querying relational schemas with immediate feedback.",
  },
  {
    id: "res-7",
    title: "Microsoft Learn: TypeScript Fundamentals",
    provider: "Microsoft Learn",
    skill: "TypeScript",
    topic: "Type Inference, Generics, Interfaces, Union & Intersection Types",
    difficulty: "Beginner",
    freeStatus: "100% Free / Open Source",
    url: "https://learn.microsoft.com/en-us/training/paths/build-javascript-applications-typescript",
    lastVerified: "2026-09-12",
    description: "Official structured learning path from Microsoft covering static typing, strict configuration, and architectural type guards.",
  },
  {
    id: "res-8",
    title: "AWS Skill Builder: Cloud Foundations",
    provider: "Amazon Web Services",
    skill: "Cloud Architecture",
    topic: "VPC, IAM Least-Privilege, S3, EC2, RDS, Serverless Lambda",
    difficulty: "Intermediate",
    freeStatus: "100% Free / Open Source",
    url: "https://explore.skillbuilder.aws",
    lastVerified: "2026-09-28",
    description: "Free digital training directly from AWS explaining scalable cloud infrastructure, security boundaries, and high availability.",
  },
];

export default function ResourcesPublicPage() {
  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  const filtered = FREE_RESOURCES_CATALOG.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.provider.toLowerCase().includes(search.toLowerCase()) ||
      res.skill.toLowerCase().includes(search.toLowerCase()) ||
      res.topic.toLowerCase().includes(search.toLowerCase());
    const matchesDiff = filterDifficulty === "all" || res.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
    return matchesSearch && matchesDiff;
  });

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <PublicHeader />

      <main className="flex-1 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Header Hero */}
        <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-8 sm:p-12 shadow-editorial-md space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black text-electric-coral border-2 border-black text-xs font-mono font-black uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Verified Educational Ecosystem</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            Free Technical Learning Resources
          </h1>
          <p className="text-white/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            No paywalled fake courses. Learn-2-Hire curates, deep-links, and verifies legitimate free educational material from universities, standards bodies, and official documentation.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-black pb-4">
          <div className="flex gap-2">
            {["all", "beginner", "intermediate", "advanced"].map((d) => (
              <button
                key={d}
                onClick={() => setFilterDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 capitalize transition-colors ${
                  filterDifficulty === d
                    ? "bg-black text-white border-black"
                    : "bg-surface text-black border-black/30 hover:border-black"
                }`}
              >
                {d === "all" ? "All Levels" : d}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-black/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search provider, skill or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-electric-coral"
            />
          </div>
        </div>

        {/* Resources Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((res) => (
            <div
              key={res.id}
              className="p-6 rounded-xl border-2 border-black bg-white shadow-editorial-sm flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-black text-white text-[10px] font-mono font-bold">
                    {res.provider}
                  </span>
                  <Badge variant="coral" size="sm">
                    {res.freeStatus}
                  </Badge>
                </div>

                <h3 className="text-lg font-black text-black leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs text-black/80 leading-relaxed">
                  {res.description}
                </p>

                <div className="space-y-1 pt-2 border-t border-black/10 text-xs">
                  <div className="flex justify-between">
                    <span className="text-black/60 font-bold">Target Skill:</span>
                    <span className="font-mono font-extrabold text-royal-maroon">{res.skill}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/60 font-bold">Key Topics:</span>
                    <span className="text-right text-[11px] text-black/80 font-medium truncate max-w-[240px]">{res.topic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/60 font-bold">Last Verified:</span>
                    <span className="font-mono text-[10px] text-black/60">{res.lastVerified}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t-2 border-black flex items-center justify-between">
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-electric-coral text-black font-black text-xs border border-black hover:bg-black hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>Open Free Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <Link
                  href={ROUTES.onboarding}
                  className="text-xs font-black text-black hover:underline flex items-center gap-1"
                >
                  <span>Add to My Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
