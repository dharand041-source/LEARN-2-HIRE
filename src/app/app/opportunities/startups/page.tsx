"use client";

import React from "react";
import Link from "next/link";
import { Rocket, ArrowRight, Bookmark } from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { OpportunitiesNav } from "@/components/opportunities/OpportunitiesNav";
import { ROUTES } from "@/lib/routes";

export default function OpportunitiesStartupsPage() {
  const { opportunities, toggleSaveOpportunity } = useCareer();
  const startups = opportunities.filter((o) => o.type === "Startup" || o.type === "STARTUP");

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <OpportunitiesNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            High-Growth Ventures
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Early-Stage & Scaled Startups
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Build products from 0-to-1 with competitive equity grants, rapid autonomy, and high technical velocity.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {startups.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white border-2 border-black shadow-editorial-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-royal-maroon transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-black text-white text-[10px] font-mono font-bold uppercase">{item.company}</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-500 text-[10px] font-mono font-bold uppercase">
                  Match: {item.matchPercentage}%
                </span>
              </div>
              <h3 className="text-base font-black uppercase text-black">{item.role}</h3>
              <div className="flex items-center gap-4 text-xs text-muted">
                <span>{item.location}</span>
                <span>{item.salary}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleSaveOpportunity(item.id)}
                className={`p-2.5 border ${item.saved ? "bg-amber-100 border-amber-500 text-amber-900" : "bg-white border-black/20 text-muted"}`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <Link href={ROUTES.app.opportunities.detail(item.id)}>
                <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                  <span>Match Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
