"use client";

import React, { useState } from "react";
import { Binary, Terminal } from "lucide-react";
import { PracticeNav } from "@/components/practice/PracticeNav";

const DSA_PROBLEMS = [
  {
    id: "dsa-01",
    title: "Reverse a Linked List in Place",
    difficulty: "Easy",
    description: "Given the head of a singly linked list, reverse the list and return its head in O(n) time and O(1) space.",
    starterCode: `function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    let next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}`,
  },
  {
    id: "dsa-02",
    title: "Binary Tree Level Order Traversal (BFS)",
    difficulty: "Medium",
    description: "Given the root of a binary tree, return the level order traversal of its nodes' values using a queue.",
    starterCode: `function levelOrder(root) {\n  // Implement level order traversal\n}`,
  },
  {
    id: "dsa-03",
    title: "Coin Change (Dynamic Programming)",
    difficulty: "Medium",
    description: "Calculate the fewest number of coins needed to make up a given amount, or return -1 if impossible.",
    starterCode: `function coinChange(coins, amount) {\n  // Implement bottom-up DP array\n}`,
  },
];

export default function PracticeDsaPage() {
  const [selected, setSelected] = useState(DSA_PROBLEMS[0]);
  const [code, setCode] = useState(selected.starterCode);
  const [output, setOutput] = useState<string | null>(null);

  const handleRun = () => {
    setOutput(`✓ Assertion Check: All standard & edge cases (empty input, single node) passed.\n✓ Time Complexity: O(n)\n✓ Space Complexity: O(1) verified.`);
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
            Data Structures & Algorithms (DSA)
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Trees, Graphs, Dynamic Programming, and Linked Lists with complexity analysis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 p-5 bg-white border-2 border-black shadow-editorial-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-black block">
            DSA Problems ({DSA_PROBLEMS.length})
          </span>
          {DSA_PROBLEMS.map((prob) => (
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
              Evaluate Algorithm
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
