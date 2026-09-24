"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Landing page or full-focus pages (e.g. active interview session or assessment) can have custom layout
  const isLanding = pathname === "/";
  const isFocusMode = pathname.startsWith("/assessment") && pathname !== "/assessment/results";
  const isInterviewSession = pathname === "/interview/session";

  if (isLanding) {
    return (
      <div className="min-h-screen bg-black text-pearl-primary flex flex-col">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  if (isFocusMode || isInterviewSession) {
    // Distraction-free mode with top bar minimal status
    return (
      <div className="min-h-screen bg-black text-pearl-primary flex flex-col">
        <main className="flex-1">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-pearl-primary flex flex-col">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 lg:pl-64 min-w-0 flex flex-col pb-20 lg:pb-8">
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
            {children}
          </div>
          <Footer />
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
