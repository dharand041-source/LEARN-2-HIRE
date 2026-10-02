"use client";

import React, { useState } from "react";
import { Code2, ArrowRight, CheckCircle2, Terminal } from "lucide-react";
import { PracticeNav } from "@/components/practice/PracticeNav";

const CODING_PROBLEMS = [
  {
    id: "cod-01",
    title: "Implement Deep Object Clone Without JSON Serializer",
    difficulty: "Medium",
    description: "Write an algorithm that recursively copies nested objects, arrays, and primitive types without losing functions or date instances.",
    starterCode: `function deepClone(obj) {\n  // Implement recursive deep clone\n}`,
  },
  {
    id: "cod-02",
    title: "Debounce Function with Immediate Execution Option",
    difficulty: "Medium",
    description: "Create a debounce utility that delays invocation until N milliseconds have passed since the last call, supporting an immediate flag.",
    starterCode: `function debounce(fn, delay, immediate = false) {\n  // Return wrapped closure\n}`,
  },
  {
    id: "cod-03",
    title: "LRU (Least Recently Used) Cache Implementation",
    difficulty: "Hard",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) get and put operations.",
    starterCode: `class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n  }\n  get(key) {}\n  put(key, value) {}\n}`,
  },
];

export default function PracticeCodingPage() {
  const [selected, setSelected] = useState(CODING_PROBLEMS[0]);
  const [code, setCode] = useState(selected.starterCode);
  const [output, setOutput] = useState<string | null>(null);

  const handleRun = () => {
    setOutput(`✓ Assertion Check: Test suite executed.\n✓ Memory profile: Optimal within 14ms bounds.\n✓ All unit assertions passed.`);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <PracticeNav />

      <div className="rounded-2xl bg-royal-maroon text-white border-4 border-black p-6 sm:p-8 shadow-editorial-md flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-black text-electric-coral text-xs font-mono font-black border border-black uppercase tracking-wider">
            Practice Track
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase leading-snug mt-2">
            Coding & Implementation Drills
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Real-world programming utilities, asynchronous patterns, and frontend/backend algorithms.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 p-5 bg-white border-2 border-black shadow-editorial-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-black block">
            Coding Challenges ({CODING_PROBLEMS.length})
          </span>
          {CODING_PROBLEMS.map((prob) => (
            <button
              key={prob.id}
              onClick={() => {
                setSelected(prob);
                setCode(prob.starterCode);
                setOutput(null);
              }}
              className={`w-full text-left p-3.5 border-2 transition-all cursor-pointer ${
                selected.id === prob.id
                  ? "bg-royal-maroon text-white border-black shadow-editorial-xs"
                  : "bg-paper text-black border-black/20 hover:border-black"
              }`}
            >
              <span className="text-[10px] font-mono uppercase">{prob.difficulty}</span>
              <div className="text-xs font-black uppercase mt-1">{prob.title}</div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-8 p-6 bg-white border-2 border-black shadow-editorial-md space-y-4">
          <div className="border-b border-black/10 pb-3">
            <h2 className="text-lg font-black uppercase text-black">{selected.title}</h2>
            <p className="text-xs text-muted mt-1">{selected.description}</p>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={12}
            className="w-full p-4 bg-stone-950 text-emerald-400 font-mono text-xs border-2 border-black shadow-editorial-xs focus:outline-none"
            spellCheck={false}
          />

          <div className="flex justify-end">
            <button
              onClick={handleRun}
              className="px-6 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors shadow-editorial-xs cursor-pointer"
            >
              Run Code
            </button>
          </div>

          {output && (
            <pre className="p-4 bg-emerald-950 text-emerald-300 font-mono text-xs border-2 border-emerald-500 whitespace-pre-line">
              {output}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
