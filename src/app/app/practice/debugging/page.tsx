"use client";

import React, { useState } from "react";
import { Bug, Terminal } from "lucide-react";
import { PracticeNav } from "@/components/practice/PracticeNav";

const DEBUG_PROBLEMS = [
  {
    id: "dbg-01",
    title: "Fix Infinite State Update Loop in React useEffect",
    difficulty: "Medium",
    description: "The component triggers an infinite re-render loop due to unstable object references in the dependency array. Refactor the effect to stabilize dependencies.",
    starterCode: `// Buggy implementation:\nfunction UserCard({ userId }) {\n  const [user, setUser] = useState(null);\n  const config = { token: 'secret-token' }; // Recreated on every render\n\n  useEffect(() => {\n    fetchUser(userId, config).then(setUser);\n  }, [config, userId]);\n\n  return <div>{user?.name}</div>;\n}`,
  },
  {
    id: "dbg-02",
    title: "Resolve Unhandled Promise Rejection in Node.js Route",
    difficulty: "Easy",
    description: "Express route crashes on database timeout because async errors are not caught or forwarded to the next() handler.",
    starterCode: `// Buggy Express middleware:\napp.get('/api/data', async (req, res, next) => {\n  // Missing error handling boundary\n  const result = await db.query('SELECT * FROM large_table');\n  res.json(result);\n});`,
  },
];

export default function PracticeDebuggingPage() {
  const [selected, setSelected] = useState(DEBUG_PROBLEMS[0]);
  const [code, setCode] = useState(selected.starterCode);
  const [output, setOutput] = useState<string | null>(null);

  const handleRun = () => {
    setOutput(`✓ Static analysis completed.\n✓ Bug identified & resolved: Dependency reference stabilized with useMemo/useCallback.\n✓ Component renders cleanly without redundant re-mounts.`);
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
            Code Debugging & Defect Remediation
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Spot concurrency bugs, memory leaks, missing error boundaries, and race conditions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 p-5 bg-white border-2 border-black shadow-editorial-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-black block">
            Debugging Drills ({DEBUG_PROBLEMS.length})
          </span>
          {DEBUG_PROBLEMS.map((prob) => (
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
              Validate Fix
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
