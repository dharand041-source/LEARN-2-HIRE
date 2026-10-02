"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-01",
    title: "Resume Readiness Gate Cleared",
    desc: "Your ATS-tailored resume reached 84% compatibility. Direct application links are now unlocked.",
    time: "10 mins ago",
    type: "success",
    link: ROUTES.app.opportunities.jobs,
  },
  {
    id: "notif-02",
    title: "New Matching Opportunity Available",
    desc: "Zoho Corporation posted Full-Stack Software Engineer (88% match with your verified skills).",
    time: "1 hour ago",
    type: "opportunity",
    link: ROUTES.app.opportunities.root,
  },
  {
    id: "notif-03",
    title: "Adaptive Reassessment Available",
    desc: "You have completed practice drills in Node.js. Reassessment is recommended to update your skill profile.",
    time: "Yesterday",
    type: "reminder",
    link: ROUTES.app.improve.reassessment,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            System Alerts
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Candidate Notifications & Alerts
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Real-time notifications on assessment results, application status changes, and new role matches.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="p-5 bg-white border-2 border-black shadow-editorial-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-royal-maroon transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-paper border border-black flex items-center justify-center shrink-0 mt-0.5">
                <Bell className="w-4 h-4 text-royal-maroon" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black uppercase text-black">{n.title}</h3>
                  <span className="text-[10px] font-mono text-muted">{n.time}</span>
                </div>
                <p className="text-xs text-muted max-w-2xl">{n.desc}</p>
              </div>
            </div>

            <Link href={n.link}>
              <button className="px-4 py-2 bg-royal-maroon hover:bg-electric-coral hover:text-black text-white font-extrabold text-xs uppercase tracking-wider border border-black transition-colors flex items-center gap-1.5 shadow-editorial-xs whitespace-nowrap">
                <span>View Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
