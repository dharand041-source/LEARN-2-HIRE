"use client";

import React from "react";
import Link from "next/link";
import { Bookmark, ExternalLink, ArrowRight, BookOpen, Trash2 } from "lucide-react";
import { LearningNav } from "@/components/learning/LearningNav";
import { ROUTES } from "@/lib/routes";

const SAVED_ITEMS = [
  {
    id: "bm-01",
    title: "MDN Web Docs: Asynchronous JavaScript (Promises & async/await)",
    provider: "MDN Web Docs",
    type: "Documentation",
    url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous",
  },
  {
    id: "bm-02",
    title: "Full Stack Open: Part 3 Programming a Server with NodeJS and Express",
    provider: "University of Helsinki",
    type: "University Course",
    url: "https://fullstackopen.com/en/part3",
  },
  {
    id: "bm-03",
    title: "SQLBolt: Interactive Multi-table Queries with JOINs",
    provider: "SQLBolt",
    type: "Interactive Tutorial",
    url: "https://sqlbolt.com",
  },
];

export default function LearningBookmarksPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <LearningNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Saved Resources
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            My Learning Bookmarks
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Pinned courses, reference tutorials, and external documentation saved for offline or quick study.
          </p>
        </div>

        <Link href={ROUTES.app.learning.resources}>
          <button className="px-5 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-editorial-xs">
            <span>Discover More Resources</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        {SAVED_ITEMS.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-paper text-black text-[10px] font-mono font-bold uppercase border border-black/20">
                  {item.provider}
                </span>
                <span className="px-2 py-0.5 bg-surface-subtle text-muted text-[10px] font-bold uppercase">
                  {item.type}
                </span>
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-black">
                {item.title}
              </h3>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white border border-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-editorial-xs"
              >
                <span>Open Resource</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
