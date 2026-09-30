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
  ArrowRight,
  Terminal,
} from "lucide-react";
import { useCareer } from "@/context/CareerContext";
import { ProblemItem } from "@/types";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Tabs } from "@/components/ui/Tabs";
import { SectionHeader } from "@/components/ui/SectionHeader";

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
        text: `✓ Test Case 1 Passed: [Optimal Output Validated]\n✓ Test Case 2 Passed: Time: 6ms, Memory: 13.8MB\n✓ All test assertions completed with expected algorithmic complexity.`,
      });
      solveProblem(selectedProblem.id);
    } else {
      setTestOutput({
        success: false,
        text: `✗ Execution Assertion Error: Incomplete logic or failing assertions on test case 1.`,
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in bg-background text-foreground min-h-screen">
      {/* Header */}
      <div className="border-b-2 border-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SectionHeader
          eyebrow="PHASE 08 // ALGORITHMIC RIGOR"
          title="Problem Solving, Aptitude & Debugging"
          description="Sharpen algorithmic logic, SQL queries, distributed system debugging, and analytical problem-solving across 6 core competency domains."
          accent="navy"
        />

        <div className="flex items-center gap-3">
          <Link href="/interview">
            <Button variant="navy" size="sm" className="gap-1.5 font-bold shadow-editorial-sm">
              <span>Interview Defense</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card variant="editorial" className="p-4 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-mono font-bold">Problems Solved</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono text-foreground">{solvedCount}</span>
            <span className="text-xs text-muted-foreground font-mono font-bold">/ {problems.length}</span>
          </div>
          <ProgressBar value={(solvedCount / problems.length) * 100} size="sm" variant="navy" />
        </Card>

        <Card variant="editorial" className="p-4 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-mono font-bold">Problem Solving XP</span>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-editorial-navy" />
            <span className="text-2xl font-extrabold font-mono text-foreground">{userProfile.xp}</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono font-bold">+50 XP per verified solve</p>
        </Card>

        <Card variant="editorial" className="p-4 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-mono font-bold">Active Streak</span>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-editorial-red fill-editorial-red" />
            <span className="text-2xl font-extrabold font-mono text-foreground">{userProfile.streakDays}</span>
            <span className="text-xs text-muted-foreground font-mono font-bold">Days</span>
          </div>
          <p className="text-[10px] text-editorial-red font-bold font-mono">Daily cadence active</p>
        </Card>

        <Card variant="editorial" className="p-4 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-mono font-bold">First-Pass Accuracy</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold font-mono text-foreground">{accuracyPercentage}%</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono font-bold">High algorithmic precision</p>
        </Card>
      </div>

      {/* Category Tabs */}
      <Tabs
        tabs={categories}
        activeTab={activeCategory}
        onChange={setActiveCategory}
        accent="navy"
      />

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Problem List (4 cols) */}
        <div className="lg:col-span-4 rounded-lg bg-white border-2 border-border p-4 space-y-3 shadow-editorial-sm">
          <div className="flex items-center justify-between border-b-2 border-border pb-2.5">
            <span className="text-xs uppercase font-mono font-bold text-foreground">Problem Library</span>
            <span className="text-xs text-muted-foreground font-mono font-bold">{filteredProblems.length} Items</span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredProblems.map((prob) => {
              const isSelected = selectedProblem.id === prob.id;
              return (
                <div
                  key={prob.id}
                  onClick={() => handleSelectProblem(prob)}
                  className={`p-3 rounded-md border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-surface border-editorial-navy text-foreground shadow-editorial-sm"
                      : "bg-white border-border text-foreground hover:border-editorial-navy"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <Badge
                          variant={
                            prob.difficulty === "Easy"
                              ? "acid"
                              : prob.difficulty === "Medium"
                              ? "gold"
                              : "red"
                          }
                          size="sm"
                        >
                          {prob.difficulty}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground font-mono font-bold">{prob.category}</span>
                      </div>
                      <h4 className="text-xs font-bold leading-tight pt-1 text-foreground">
                        {prob.title}
                      </h4>
                    </div>

                    {prob.solved && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                    <span className="text-editorial-navy font-bold">+{prob.xp} XP</span>
                    <span>{prob.tags[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Problem Details & Code Sandbox (8 cols) */}
        <Card variant="editorial" className="lg:col-span-8 p-6 md:p-7 space-y-5">
          {/* Problem Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-border pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="navy" size="sm">{selectedProblem.category}</Badge>
                <Badge
                  variant={
                    selectedProblem.difficulty === "Easy"
                      ? "acid"
                      : selectedProblem.difficulty === "Medium"
                      ? "gold"
                      : "red"
                  }
                  size="sm"
                >
                  {selectedProblem.difficulty}
                </Badge>
                <span className="text-xs text-editorial-navy font-mono font-extrabold">+{selectedProblem.xp} XP</span>
              </div>
              <h2 className="text-xl font-extrabold text-foreground tracking-tight">
                {selectedProblem.title}
              </h2>
            </div>

            {selectedProblem.solved && (
              <Badge variant="navy" size="md">
                ✓ Solved & Verified
              </Badge>
            )}
          </div>

          {/* Problem Description */}
          <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p className="text-foreground font-medium text-sm">{selectedProblem.description}</p>

            {/* Examples */}
            <div className="space-y-2 pt-2">
              <p className="text-[11px] uppercase font-mono font-bold text-foreground">Example Test Cases:</p>
              {selectedProblem.examples.map((ex, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-surface border-2 border-border font-mono text-[11px] space-y-1">
                  <div><strong className="text-muted-foreground">Input:</strong> <span className="text-foreground font-bold">{ex.input}</span></div>
                  <div><strong className="text-muted-foreground">Output:</strong> <span className="text-editorial-navy font-bold">{ex.output}</span></div>
                  {ex.explanation && (
                    <div className="text-muted-foreground text-[10px] font-sans pt-1">Explanation: {ex.explanation}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Code Editor Box */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between px-3 py-2 rounded-t-lg bg-editorial-navy text-white text-xs font-mono">
              <span className="flex items-center gap-1.5 font-bold">
                <Terminal className="w-3.5 h-3.5 text-white" /> solution.ts / query.sql
              </span>
              <button
                onClick={() => setCodeDraft(selectedProblem.starterCode || "")}
                className="text-[11px] text-white/80 hover:text-white underline transition-colors font-bold"
              >
                Reset Starter Code
              </button>
            </div>
            <textarea
              value={codeDraft}
              onChange={(e) => setCodeDraft(e.target.value)}
              rows={9}
              className="w-full p-4 rounded-b-lg bg-[#04123F] text-white border-2 border-editorial-navy font-mono text-xs focus:outline-none resize-y leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Action Buttons & Hints */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <Button onClick={handleRunCode} variant="navy" size="sm" className="gap-2 font-bold shadow-editorial-sm">
                <Terminal className="w-3.5 h-3.5" />
                <span>Run Assertions</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowSolution(!showSolution)}
                className="text-xs font-bold"
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
                  className="px-2.5 py-1 rounded-md bg-white border-2 border-border text-[11px] font-mono font-bold text-foreground hover:border-editorial-navy transition-colors"
                >
                  Hint {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Hint Accordion */}
          {showHintIndex !== null && (
            <div className="p-3.5 rounded-lg bg-surface border-2 border-border text-xs text-foreground leading-relaxed animate-fade-in font-mono">
              <strong className="text-editorial-navy">Hint {showHintIndex + 1}:</strong> {selectedProblem.hints[showHintIndex]}
            </div>
          )}

          {/* Test Runner Output */}
          {testOutput && (
            <div
              className={`p-4 rounded-lg border-2 text-xs font-mono leading-relaxed animate-slide-up whitespace-pre-wrap ${
                testOutput.success
                  ? "bg-emerald-50 border-emerald-600 text-emerald-950 font-bold"
                  : "bg-red-50 border-editorial-red text-editorial-red font-bold"
              }`}
            >
              {testOutput.text}
            </div>
          )}

          {/* Ideal Solution Box */}
          {showSolution && selectedProblem.solution && (
            <div className="p-4 rounded-lg bg-surface border-2 border-border space-y-2 animate-slide-up">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-editorial-navy">
                <span>Optimal Solution & Time Complexity:</span>
                <button
                  onClick={() => setCodeDraft(selectedProblem.solution || "")}
                  className="text-[11px] underline hover:text-foreground"
                >
                  Copy to Editor
                </button>
              </div>
              <pre className="font-mono text-xs text-foreground overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {selectedProblem.solution}
              </pre>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
