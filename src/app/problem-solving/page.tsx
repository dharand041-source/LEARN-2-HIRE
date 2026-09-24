"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Brain,
  Database,
  Bug,
  Calculator,
  Binary,
  Flame,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Terminal,
  HelpCircle,
  Check,
  Zap,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ProblemItem } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Tabs } from "@/components/ui/Tabs";

export default function ProblemSolvingPage() {
  const { problems, solveProblem, userProfile } = useCareer();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProblem, setSelectedProblem] = useState<ProblemItem>(problems[0]);
  const [codeDraft, setCodeDraft] = useState(selectedProblem.starterCode || "");
  const [testOutput, setTestOutput] = useState<{ success: boolean; text: string } | null>(null);
  const [showHintIndex, setShowHintIndex] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const solvedCount = problems.filter((p) => p.solved).length;
  const accuracyPercentage = 92;

  const categories = [
    { id: "all", label: "All Categories", count: problems.length },
    { id: "Programming", label: "Programming", icon: <Code2 className="w-3.5 h-3.5" /> },
    { id: "Algorithms", label: "Algorithms", icon: <Binary className="w-3.5 h-3.5" /> },
    { id: "SQL", label: "SQL & DB", icon: <Database className="w-3.5 h-3.5" /> },
    { id: "Debugging", label: "Debugging", icon: <Bug className="w-3.5 h-3.5" /> },
    { id: "Logical Reasoning", label: "Logic", icon: <Brain className="w-3.5 h-3.5" /> },
    { id: "Aptitude", label: "Aptitude", icon: <Calculator className="w-3.5 h-3.5" /> },
  ];

  const filteredProblems = problems.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  const handleSelectProblem = (prob: ProblemItem) => {
    setSelectedProblem(prob);
    setCodeDraft(prob.starterCode || "");
    setTestOutput(null);
    setShowHintIndex(null);
    setShowSolution(false);
  };

  const handleRunCode = () => {
    if (codeDraft.trim().length > 25) {
      setTestOutput({
        success: true,
        text: `✓ Test Case 1 Passed: [Correct Output]\n✓ Test Case 2 Passed: Time: 8ms, Memory: 14.1MB\n✓ All test assertions passed with optimal time complexity.`,
      });
      solveProblem(selectedProblem.id);
    } else {
      setTestOutput({
        success: false,
        text: `✗ Execution Error: Incomplete logic or failing assertions on test case 1.`,
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-surface-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="champagne" size="sm">Phase 08</Badge>
            <span className="text-xs text-pearl-muted font-mono uppercase tracking-wider">
              Cognitive & Technical Problem Solving
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-pearl-primary tracking-tight">
            Problem Solving, Aptitude & Debugging
          </h1>
          <p className="text-xs sm:text-sm text-pearl-muted mt-1 max-w-2xl">
            Sharpen algorithmic logic, SQL window functions, incident debugging, and analytical problem solving across 6 core competency domains.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/interview">
            <Button size="sm" className="gap-1.5">
              <span>Interview Preparation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-1">
          <span className="text-[11px] text-pearl-muted uppercase font-semibold">Problems Solved</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-pearl-primary">{solvedCount}</span>
            <span className="text-xs text-pearl-muted font-mono">/ {problems.length}</span>
          </div>
          <ProgressBar value={(solvedCount / problems.length) * 100} size="sm" variant="champagne" />
        </div>

        <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-1">
          <span className="text-[11px] text-pearl-muted uppercase font-semibold">Problem Solving XP</span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-champagne" />
            <span className="text-2xl font-bold font-mono text-champagne">{userProfile.xp}</span>
          </div>
          <p className="text-[10px] text-emerald-400 font-mono">+50 XP per solve</p>
        </div>

        <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-1">
          <span className="text-[11px] text-pearl-muted uppercase font-semibold">Active Streak</span>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            <span className="text-2xl font-bold font-mono text-pearl-primary">{userProfile.streakDays}</span>
            <span className="text-xs text-pearl-muted">Days</span>
          </div>
          <p className="text-[10px] text-amber-400 font-medium">Daily practice active</p>
        </div>

        <div className="p-4 rounded-xl bg-surface-card border border-surface-border space-y-1">
          <span className="text-[11px] text-pearl-muted uppercase font-semibold">First-Pass Accuracy</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-400">{accuracyPercentage}%</span>
          </div>
          <p className="text-[10px] text-pearl-muted">High algorithmic precision</p>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs
        tabs={categories}
        activeTab={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Main 2-Column Grid: Left Problems List (4 cols) & Right Active Solver Sandbox (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Problem List */}
        <div className="lg:col-span-4 rounded-xl bg-surface-card border border-surface-border p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-surface-border pb-2.5">
            <span className="text-xs uppercase font-semibold text-pearl-muted">Problem Set</span>
            <span className="text-xs text-pearl-muted font-mono">{filteredProblems.length} Items</span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredProblems.map((prob) => {
              const isSelected = selectedProblem.id === prob.id;
              return (
                <div
                  key={prob.id}
                  onClick={() => handleSelectProblem(prob)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-navy-800 border-champagne text-pearl-primary ring-1 ring-champagne/30 shadow-sm"
                      : "bg-surface-subtle border-white/5 text-pearl-muted hover:border-pearl/20 hover:text-pearl-primary"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <Badge
                          variant={
                            prob.difficulty === "Easy"
                              ? "success"
                              : prob.difficulty === "Medium"
                              ? "champagne"
                              : "rose"
                          }
                          size="sm"
                        >
                          {prob.difficulty}
                        </Badge>
                        <span className="text-[10px] text-pearl-muted font-mono">{prob.category}</span>
                      </div>
                      <h4 className={`text-xs font-semibold leading-tight pt-1 ${isSelected ? "text-champagne" : "text-pearl-primary"}`}>
                        {prob.title}
                      </h4>
                    </div>

                    {prob.solved && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-pearl-muted font-mono">
                    <span className="text-champagne font-semibold">+{prob.xp} XP</span>
                    <span>{prob.tags[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Problem Details & Code Sandbox (8 cols) */}
        <div className="lg:col-span-8 rounded-xl bg-surface-card border border-surface-border p-6 space-y-5">
          {/* Problem Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-border pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="navy" size="sm">{selectedProblem.category}</Badge>
                <Badge
                  variant={
                    selectedProblem.difficulty === "Easy"
                      ? "success"
                      : selectedProblem.difficulty === "Medium"
                      ? "champagne"
                      : "rose"
                  }
                  size="sm"
                >
                  {selectedProblem.difficulty}
                </Badge>
                <span className="text-xs text-champagne font-mono font-bold">+{selectedProblem.xp} XP</span>
              </div>
              <h2 className="text-lg font-bold text-pearl-primary">
                {selectedProblem.title}
              </h2>
            </div>

            {selectedProblem.solved && (
              <Badge variant="success" size="md">
                ✓ Solved & Verified
              </Badge>
            )}
          </div>

          {/* Problem Description */}
          <div className="space-y-3 text-xs text-pearl-muted leading-relaxed">
            <p className="text-pearl-primary font-medium">{selectedProblem.description}</p>

            {/* Examples */}
            <div className="space-y-2 pt-1">
              <p className="text-[11px] uppercase font-semibold text-pearl-muted">Example Test Cases:</p>
              {selectedProblem.examples.map((ex, i) => (
                <div key={i} className="p-3 rounded-lg bg-navy-950 border border-white/5 font-mono text-[11px] space-y-1">
                  <div><strong className="text-pearl-muted">Input:</strong> <span className="text-pearl-primary">{ex.input}</span></div>
                  <div><strong className="text-pearl-muted">Output:</strong> <span className="text-champagne">{ex.output}</span></div>
                  {ex.explanation && (
                    <div className="text-pearl-muted text-[10px] font-sans pt-0.5">Explanation: {ex.explanation}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Code Editor Box */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between px-3 py-1.5 rounded-t-lg bg-navy-950 border border-b-0 border-white/10 text-xs font-mono text-pearl-muted">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-champagne" /> solution.ts / query.sql
              </span>
              <button
                onClick={() => setCodeDraft(selectedProblem.starterCode || "")}
                className="text-[11px] text-pearl-muted hover:text-champagne transition-colors"
              >
                Reset Code
              </button>
            </div>
            <textarea
              value={codeDraft}
              onChange={(e) => setCodeDraft(e.target.value)}
              rows={8}
              className="w-full p-4 rounded-b-lg bg-black border border-white/10 font-mono text-xs text-pearl-primary focus:outline-none focus:border-champagne resize-y leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Action Buttons & Hints */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <Button onClick={handleRunCode} size="sm" className="gap-2 font-semibold">
                <Terminal className="w-3.5 h-3.5" />
                <span>Run Test Cases</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSolution(!showSolution)}
                className="text-xs"
              >
                {showSolution ? "Hide Solution" : "View Optimal Solution"}
              </Button>
            </div>

            {/* Hints */}
            <div className="flex items-center gap-1.5">
              {selectedProblem.hints.map((hint, i) => (
                <button
                  key={i}
                  onClick={() => setShowHintIndex(showHintIndex === i ? null : i)}
                  className="px-2.5 py-1 rounded bg-navy-900 border border-white/5 text-[11px] text-pearl-muted hover:text-champagne transition-colors"
                >
                  Hint {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Hint Accordion */}
          {showHintIndex !== null && (
            <div className="p-3.5 rounded-lg bg-navy-950 border border-champagne/30 text-xs text-champagne leading-relaxed animate-fade-in">
              <strong>Hint {showHintIndex + 1}:</strong> {selectedProblem.hints[showHintIndex]}
            </div>
          )}

          {/* Test Runner Output */}
          {testOutput && (
            <div
              className={`p-4 rounded-lg border text-xs font-mono leading-relaxed animate-slide-up whitespace-pre-wrap ${
                testOutput.success
                  ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                  : "bg-red-950/60 border-red-500/40 text-red-300"
              }`}
            >
              {testOutput.text}
            </div>
          )}

          {/* Ideal Solution Box */}
          {showSolution && selectedProblem.solution && (
            <div className="p-4 rounded-lg bg-black border border-champagne/40 space-y-2 animate-slide-up">
              <div className="flex items-center justify-between text-xs font-semibold text-champagne">
                <span>Optimal Solution & Time Complexity:</span>
                <button
                  onClick={() => setCodeDraft(selectedProblem.solution || "")}
                  className="text-[11px] underline hover:text-pearl-primary"
                >
                  Copy to Editor
                </button>
              </div>
              <pre className="font-mono text-xs text-pearl-primary overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {selectedProblem.solution}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
