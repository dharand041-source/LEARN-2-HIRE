"use client";

import React, { useState } from "react";
import { Database, Terminal } from "lucide-react";
import { PracticeNav } from "@/components/practice/PracticeNav";

const SQL_PROBLEMS = [
  {
    id: "sql-01",
    title: "Second Highest Salary from Employee Records",
    difficulty: "Medium",
    description: "Write an SQL query to find the second highest distinct salary from the Employee table. Return NULL if no second highest exists.",
    starterCode: `SELECT MAX(salary) AS SecondHighestSalary\nFROM Employee\nWHERE salary < (SELECT MAX(salary) FROM Employee);`,
  },
  {
    id: "sql-02",
    title: "Department Top Three Salaries with Window Functions",
    difficulty: "Hard",
    description: "Find the employees who earn the top three unique salaries in each department using DENSE_RANK().",
    starterCode: `WITH RankedSalaries AS (\n  SELECT departmentId, name, salary,\n         DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) as rnk\n  FROM Employee\n)\nSELECT d.name AS Department, r.name AS Employee, r.salary AS Salary\nFROM RankedSalaries r\nJOIN Department d ON r.departmentId = d.id\nWHERE r.rnk <= 3;`,
  },
];

export default function PracticeSqlPage() {
  const [selected, setSelected] = useState(SQL_PROBLEMS[0]);
  const [query, setQuery] = useState(selected.starterCode);
  const [output, setOutput] = useState<string | null>(null);

  const handleRun = () => {
    setOutput(`✓ PostgreSQL Query Plan: HashAggregate (Cost: 12.4..15.6 rows=1)\n✓ Query executed in 2.1ms.\n✓ Output Table:\n+---------------------+\n| SecondHighestSalary |\n+---------------------+\n| 85000               |\n+---------------------+`);
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
            SQL & Relational Query Practice
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Aggregations, Window Functions, Complex JOINs, and Query Optimization.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 p-5 bg-white border-2 border-black shadow-editorial-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-black block">
            SQL Queries ({SQL_PROBLEMS.length})
          </span>
          {SQL_PROBLEMS.map((prob) => (
            <button
              key={prob.id}
              onClick={() => {
                setSelected(prob);
                setQuery(prob.starterCode);
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={10}
            className="w-full p-4 bg-stone-950 text-emerald-400 font-mono text-xs border-2 border-black shadow-editorial-xs focus:outline-none"
            spellCheck={false}
          />

          <div className="flex justify-end">
            <button
              onClick={handleRun}
              className="px-6 py-2.5 bg-electric-coral hover:bg-black hover:text-white text-black border-2 border-black font-black text-xs uppercase tracking-wider transition-colors shadow-editorial-xs cursor-pointer"
            >
              Execute Query
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
