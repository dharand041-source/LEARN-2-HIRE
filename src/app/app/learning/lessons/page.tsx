"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Code2,
  Globe,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";
import { LearningNav } from "@/components/learning/LearningNav";
import { ROUTES } from "@/lib/routes";

const LESSON_UNITS = [
  {
    id: "js-async-01",
    title: "Understanding JavaScript Event Loop & Promises",
    category: "JavaScript Foundations",
    duration: "25 min",
    content: `JavaScript is single-threaded, using an event loop architecture to handle concurrency without blocking the main execution thread.

Key components of the execution environment:
1. Call Stack: Tracks active function calls in LIFO order.
2. Web APIs / Node APIs: Handles asynchronous operations (DOM events, timers, network requests).
3. Callback Queue (Task Queue): Holds completed asynchronous tasks ready to enter the call stack.
4. Microtask Queue: Processes Promise resolutions before regular tasks.`,
    codeSnippet: `// Asynchronous execution sequence demo
console.log("1. Synchronous log");

Promise.resolve().then(() => {
  console.log("2. Microtask resolved");
});

setTimeout(() => {
  console.log("3. Macrotask executed");
}, 0);

console.log("4. Call stack empty");
// Output: 1, 4, 2, 3`,
    takeaways: [
      "Microtasks (Promises) always run before Macrotasks (setTimeout).",
      "Avoid blocking operations in synchronous execution paths.",
      "Use async/await with try/catch for clean, readable error handling.",
    ],
  },
  {
    id: "react-state-02",
    title: "React Component Lifecycle & Immutability Patterns",
    category: "React Architecture",
    duration: "30 min",
    content: `State immutability is fundamental to React's change detection engine. Direct mutations bypass reconciliation, causing subtle UI rendering bugs.

Best practices:
- Always use functional updates when new state depends on previous state.
- Keep state local to where it is needed; lift state up only when siblings require synchronization.
- Leverage useMemo and useCallback selectively to avoid premature optimization.`,
    codeSnippet: `// Proper state immutability in React
function TaskList() {
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = (newTask: string) => {
    // Correct: create fresh array reference
    setTasks(prev => [...prev, newTask]);
  };

  return <div>{tasks.length} Active Tasks</div>;
}`,
    takeaways: [
      "Never mutate state directly (e.g. state.push()).",
      "Use structural cloning or spread operators for nested updates.",
      "Decompose large states into normalized atomic stores.",
    ],
  },
];

export default function LearningLessonsPage() {
  const { userProfile, setLanguage } = useCareer();
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const currentLesson = LESSON_UNITS[currentLessonIdx];

  const toggleComplete = (id: string) => {
    setCompletedLessons((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <LearningNav />

      {/* Header */}
      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Interactive Lessons
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Module Lesson Viewer
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Deep-dive conceptual tutorials with real code execution snippets and multi-language support.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 bg-black text-white border-2 border-electric-coral text-xs shadow-xs">
          <Globe className="w-3.5 h-3.5 text-electric-coral" />
          <select
            value={userProfile.selectedLanguage}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="bg-black text-electric-coral font-extrabold text-xs focus:outline-none cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Lesson Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar List (4 cols) */}
        <div className="lg:col-span-4 p-5 bg-white border-2 border-black shadow-editorial-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-black block mb-2">
            Unit Curriculum
          </span>

          <div className="space-y-2">
            {LESSON_UNITS.map((u, idx) => (
              <button
                key={u.id}
                onClick={() => setCurrentLessonIdx(idx)}
                className={`w-full text-left p-3 border-2 transition-all cursor-pointer ${
                  currentLessonIdx === idx
                    ? "bg-royal-maroon text-white border-black shadow-editorial-xs"
                    : "bg-paper text-black border-black/20 hover:border-black"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono uppercase">
                  <span>Unit 0{idx + 1}</span>
                  <span>{u.duration}</span>
                </div>
                <div className="text-xs font-bold mt-1 line-clamp-1">{u.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Lesson Content (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-8 bg-white border-2 border-black shadow-editorial-md space-y-6">
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <div>
              <span className="text-[10px] font-mono text-royal-maroon uppercase font-bold block">
                {currentLesson.category}
              </span>
              <h2 className="text-xl font-black uppercase tracking-tight text-black mt-1">
                {currentLesson.title}
              </h2>
            </div>

            <button
              onClick={() => toggleComplete(currentLesson.id)}
              className={`px-4 py-2 border-2 text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer ${
                completedLessons.has(currentLesson.id)
                  ? "bg-emerald-600 text-white border-black"
                  : "bg-white text-black border-black hover:bg-stone-100"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{completedLessons.has(currentLesson.id) ? "Completed" : "Mark Complete"}</span>
            </button>
          </div>

          <div className="prose text-xs sm:text-sm text-black leading-relaxed whitespace-pre-line font-sans">
            {currentLesson.content}
          </div>

          {currentLesson.codeSnippet && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted font-bold block">
                Executable Code Pattern:
              </span>
              <pre className="p-4 bg-black text-electric-coral font-mono text-xs overflow-x-auto border-2 border-black shadow-editorial-xs">
                <code>{currentLesson.codeSnippet}</code>
              </pre>
            </div>
          )}

          <div className="p-4 bg-paper border border-black/20 space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-black block">
              Core Architectural Takeaways
            </span>
            <ul className="space-y-1.5 text-xs text-black/90">
              {currentLesson.takeaways.map((t, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-royal-maroon font-black">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-black/10">
            <button
              onClick={() => setCurrentLessonIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentLessonIdx === 0}
              className="px-4 py-2 bg-white border border-black text-xs font-bold uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-100"
            >
              Previous Unit
            </button>

            <Link href={ROUTES.app.learning.practice}>
              <button className="px-5 py-2 bg-electric-coral text-black border border-black font-black text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors flex items-center gap-1.5 shadow-editorial-xs">
                <span>Practice Topic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>

            <button
              onClick={() => setCurrentLessonIdx((prev) => Math.min(LESSON_UNITS.length - 1, prev + 1))}
              disabled={currentLessonIdx === LESSON_UNITS.length - 1}
              className="px-4 py-2 bg-royal-maroon text-white border border-black text-xs font-bold uppercase disabled:opacity-30 disabled:cursor-not-allowed hover:bg-electric-coral hover:text-black"
            >
              Next Unit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
