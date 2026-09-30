/**
 * SkillForge Question Engine - Central Aggregator & Evaluation Core
 *
 * Provides strictly segregated question pools across 14 technical roles,
 * Aptitude, and Logical Reasoning. Ensures zero question sharing between roles,
 * deterministic answer evaluation, option shuffling with correct answer re-indexing,
 * and comprehensive skill gap analysis.
 */

import {
  TechnicalQuestion,
  AptitudeQuestion,
  LogicalReasoningQuestion,
  QuestionOption,
} from "./types";

import { FULL_STACK_QUESTIONS } from "./technical/fullStack";
import { FRONTEND_QUESTIONS } from "./technical/frontend";
import { BACKEND_QUESTIONS } from "./technical/backend";
import { MOBILE_QUESTIONS } from "./technical/mobile";
import { SDET_QUESTIONS } from "./technical/sdet";
import { ML_QUESTIONS } from "./technical/ml";
import { DATA_ENGINEERING_QUESTIONS } from "./technical/dataEngineering";
import { DATA_ANALYTICS_QUESTIONS } from "./technical/dataAnalytics";
import { CLOUD_DEVOPS_QUESTIONS } from "./technical/cloudDevops";
import { SRE_QUESTIONS } from "./technical/sre";
import { CYBERSECURITY_QUESTIONS } from "./technical/cybersecurity";
import { APPSEC_QUESTIONS } from "./technical/appsec";
import { CLOUD_ARCHITECT_QUESTIONS } from "./technical/cloudArchitect";
import { EMBEDDED_IOT_QUESTIONS } from "./technical/embeddedIot";

import { APTITUDE_QUESTION_BANK } from "./aptitude/aptitudeBank";
import { LOGICAL_QUESTION_BANK } from "./logical/logicalBank";
import { validateQuestionUniqueness } from "./validator";

export * from "./types";
export * from "./validator";
export { APTITUDE_QUESTION_BANK } from "./aptitude/aptitudeBank";
export { LOGICAL_QUESTION_BANK } from "./logical/logicalBank";

// 14 Technical Role Pools (15 questions each = 210 questions)
export const ROLE_QUESTIONS_MAP: Record<string, TechnicalQuestion[]> = {
  "full-stack-dev": FULL_STACK_QUESTIONS,
  "frontend-dev": FRONTEND_QUESTIONS,
  "backend-dev": BACKEND_QUESTIONS,
  "mobile-dev": MOBILE_QUESTIONS,
  "sdet-engineer": SDET_QUESTIONS,
  "ai-ml-engineer": ML_QUESTIONS,
  "data-engineer": DATA_ENGINEERING_QUESTIONS,
  "data-analyst": DATA_ANALYTICS_QUESTIONS,
  "devops-engineer": CLOUD_DEVOPS_QUESTIONS,
  "site-reliability-engineer": SRE_QUESTIONS,
  "security-analyst": CYBERSECURITY_QUESTIONS,
  "app-security-engineer": APPSEC_QUESTIONS,
  "solutions-architect": CLOUD_ARCHITECT_QUESTIONS,
  "embedded-engineer": EMBEDDED_IOT_QUESTIONS,
};

// Aliases mapping user/role strings to canonical keys
const ROLE_ALIASES: Record<string, string> = {
  "full stack developer": "full-stack-dev",
  "full-stack developer": "full-stack-dev",
  "frontend developer": "frontend-dev",
  "frontend": "frontend-dev",
  "backend developer": "backend-dev",
  "backend": "backend-dev",
  "mobile app developer": "mobile-dev",
  "mobile developer": "mobile-dev",
  "sdet": "sdet-engineer",
  "software development engineer in test": "sdet-engineer",
  "software development engineer in test (sdet)": "sdet-engineer",
  "machine learning engineer": "ai-ml-engineer",
  "ml engineer": "ai-ml-engineer",
  "data engineer": "data-engineer",
  "data analyst": "data-analyst",
  "data analyst / bi specialist": "data-analyst",
  "bi specialist": "data-analyst",
  "cloud & devops engineer": "devops-engineer",
  "devops engineer": "devops-engineer",
  "site reliability engineer": "site-reliability-engineer",
  "site reliability engineer (sre)": "site-reliability-engineer",
  "sre": "site-reliability-engineer",
  "cybersecurity analyst": "security-analyst",
  "cybersecurity analyst / soc analyst": "security-analyst",
  "soc analyst": "security-analyst",
  "application security engineer": "app-security-engineer",
  "application security engineer (appsec)": "app-security-engineer",
  "appsec": "app-security-engineer",
  "cloud solutions architect": "solutions-architect",
  "solutions architect": "solutions-architect",
  "embedded systems & iot engineer": "embedded-engineer",
  "embedded systems engineer": "embedded-engineer",
  "iot engineer": "embedded-engineer",
};

export const ALL_TECHNICAL_QUESTIONS: TechnicalQuestion[] = Object.values(ROLE_QUESTIONS_MAP).flat();

/**
 * Normalizes user input for text/fill-in-the-blank comparisons:
 * - Trims whitespace
 * - Strips enclosing quotes ('..."...`...)
 * - Condenses multiple internal spaces
 * - Lowercases for case-insensitive checks
 * - Strips trailing punctuation (periods, commas, semicolons)
 */
export function normalizeAnswer(value: string | undefined | null): string {
  if (!value) return "";
  let clean = value.trim();
  // Strip outer quotes/backticks/parentheses if present
  clean = clean.replace(/^["'`\(\[]|["'`\)\]]$/g, "");
  // Condense spaces
  clean = clean.replace(/\s+/g, " ").trim();
  // Strip trailing punctuation
  clean = clean.replace(/[.,;:]+$/, "");
  return clean.toLowerCase();
}

/**
 * Validates whether user answer is correct for MCQ or Fill-in-the-blank.
 * Uses deterministic comparison. No AI hallucination or non-deterministic grading.
 */
export function evaluateQuestionAnswer(
  question: TechnicalQuestion,
  userAnswer: string | undefined | null
): boolean {
  if (!userAnswer || typeof userAnswer !== "string" || userAnswer.trim() === "") {
    return false;
  }

  const rawUser = userAnswer.trim();
  const normalizedUser = normalizeAnswer(userAnswer);

  if (question.type === "mcq") {
    // 1. Direct label match ("A", "B", "C", "D")
    if (rawUser.toUpperCase() === question.correctAnswer.toUpperCase()) {
      return true;
    }

    // 2. Direct match with correct option's text
    if (question.options) {
      const correctOpt = question.options.find(
        (o) => o.label.toUpperCase() === question.correctAnswer.toUpperCase()
      );
      if (correctOpt) {
        if (
          rawUser === correctOpt.text ||
          normalizedUser === normalizeAnswer(correctOpt.text)
        ) {
          return true;
        }
      }

      // Check if user submitted option text directly that matches an option
      const userMatchedOpt = question.options.find(
        (o) =>
          normalizeAnswer(o.text) === normalizedUser ||
          o.text.trim().toLowerCase() === rawUser.toLowerCase()
      );
      if (userMatchedOpt && userMatchedOpt.label.toUpperCase() === question.correctAnswer.toUpperCase()) {
        return true;
      }
    }

    return false;
  }

  if (question.type === "fill_blank") {
    // 1. Canonical correct answer match
    if (normalizedUser === normalizeAnswer(question.correctAnswer)) {
      return true;
    }

    // 2. Accepted answers array match
    if (question.acceptedAnswers && question.acceptedAnswers.length > 0) {
      return question.acceptedAnswers.some(
        (acc) => normalizeAnswer(acc) === normalizedUser
      );
    }

    return false;
  }

  return false;
}

/**
 * Randomize array order using Fisher-Yates shuffle
 */
function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Retrieves the 15 assessment questions for a given role (10 MCQs + 5 Fill-in-the-blanks).
 * Enforces role-specific isolation. When shuffle is true:
 * - Shuffles question order
 * - Shuffles MCQ option choices (A, B, C, D) and remaps `correctAnswer` so the correct text is preserved!
 */
export function getQuestionsForRole(
  roleIdOrTitle: string,
  options?: { shuffle?: boolean; excludeIds?: string[] }
): TechnicalQuestion[] {
  const normalizedKey = roleIdOrTitle.toLowerCase().trim();
  const canonicalRoleId = ROLE_ALIASES[normalizedKey] || normalizedKey;

  const roleQuestions = ROLE_QUESTIONS_MAP[canonicalRoleId] || ROLE_QUESTIONS_MAP["full-stack-dev"];

  // Clone to avoid mutating static data
  let questions = roleQuestions.map((q) => ({
    ...q,
    options: q.options ? q.options.map((opt) => ({ ...opt })) : undefined,
    acceptedAnswers: q.acceptedAnswers ? [...q.acceptedAnswers] : undefined,
  }));

  // Exclude previously presented questions if requested (and if alternate exists)
  if (options?.excludeIds && options.excludeIds.length > 0) {
    const excludeSet = new Set(options.excludeIds);
    const nonExcluded = questions.filter((q) => !excludeSet.has(q.id));
    if (nonExcluded.length >= 15) {
      questions = nonExcluded;
    }
  }

  const mcqs = questions.filter((q) => q.type === "mcq");
  const fillBlanks = questions.filter((q) => q.type === "fill_blank");

  let selectedMCQs = mcqs.slice(0, 10);
  let selectedFills = fillBlanks.slice(0, 5);

  if (options?.shuffle) {
    // 1. Shuffle MCQ options and update correctAnswer label
    selectedMCQs = selectedMCQs.map((q) => {
      if (!q.options || q.options.length !== 4) return q;

      // Find the text of the currently correct option
      const currentCorrectOpt = q.options.find((o) => o.label === q.correctAnswer);
      const correctText = currentCorrectOpt ? currentCorrectOpt.text : q.options[0].text;

      // Shuffle the option text contents
      const shuffledTexts = shuffleArray(q.options.map((o) => o.text));
      const labels: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];

      let newCorrectLabel: "A" | "B" | "C" | "D" = "A";
      const newOptions: QuestionOption[] = labels.map((lbl, idx) => {
        const text = shuffledTexts[idx];
        if (text === correctText) {
          newCorrectLabel = lbl;
        }
        return { label: lbl, text };
      });

      return {
        ...q,
        options: newOptions,
        correctAnswer: newCorrectLabel,
      };
    });

    // 2. Shuffle order of MCQs and Fill-in-the-blanks
    selectedMCQs = shuffleArray(selectedMCQs);
    selectedFills = shuffleArray(selectedFills);
  }

  return [...selectedMCQs, ...selectedFills];
}

export type SkillProficiencyBand =
  | "Critical Gap"
  | "Needs Improvement"
  | "Developing"
  | "Strong"
  | "Advanced";

export interface SkillScoreEvaluation {
  skill: string;
  totalQuestions: number;
  correctCount: number;
  score: number;
  band: SkillProficiencyBand;
}

export interface DynamicAssessmentResult {
  score: number;
  totalQuestions: number;
  completedAt: string;
  roleId: string;
  roleTitle: string;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  skillBreakdown: {
    skill: string;
    score: number;
    status: "Strong" | "Moderate" | "Needs Improvement";
    band: SkillProficiencyBand;
  }[];
  strongAreas: string[];
  needsImprovement: string[];
  recommendations: string[];
  questionResults: {
    questionId: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
    skill: string;
  }[];
}

/**
 * Calculates complete assessment score, percentage, counts, skill breakdown, and recommendations
 * according to the Skill Gap specification:
 * 0-39: Critical Gap
 * 40-59: Needs Improvement
 * 60-74: Developing
 * 75-89: Strong
 * 90-100: Advanced
 */
export function calculateDynamicAssessmentResult(
  questions: TechnicalQuestion[],
  answers: Record<string, string>,
  roleId: string,
  roleTitle: string
): DynamicAssessmentResult {
  const totalQuestions = questions.length;
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  const skillBuckets: Record<
    string,
    { total: number; correct: number; questions: TechnicalQuestion[] }
  > = {};

  const questionResults = questions.map((q) => {
    const rawAnswer = answers[q.id];
    const isAnswered = rawAnswer !== undefined && rawAnswer !== null && rawAnswer.trim() !== "";
    const isCorrect = isAnswered ? evaluateQuestionAnswer(q, rawAnswer) : false;

    if (!isAnswered) {
      skippedCount++;
    } else if (isCorrect) {
      correctCount++;
    } else {
      wrongCount++;
    }

    if (!skillBuckets[q.skill]) {
      skillBuckets[q.skill] = { total: 0, correct: 0, questions: [] };
    }
    skillBuckets[q.skill].total++;
    if (isCorrect) skillBuckets[q.skill].correct++;
    skillBuckets[q.skill].questions.push(q);

    // Format human-readable correct answer
    let displayCorrect = q.correctAnswer;
    if (q.type === "mcq" && q.options) {
      const match = q.options.find((o) => o.label === q.correctAnswer);
      if (match) {
        displayCorrect = `${q.correctAnswer}: ${match.text}`;
      }
    }

    return {
      questionId: q.id,
      question: q.question,
      userAnswer: rawAnswer || "(Unanswered)",
      correctAnswer: displayCorrect,
      isCorrect,
      explanation: q.explanation,
      skill: q.skill,
    };
  });

  const percentageScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Generate skill breakdown with bands
  const skillBreakdown = Object.entries(skillBuckets).map(([skill, data]) => {
    const score = Math.round((data.correct / data.total) * 100);
    let band: SkillProficiencyBand;
    let status: "Strong" | "Moderate" | "Needs Improvement";

    if (score >= 90) {
      band = "Advanced";
      status = "Strong";
    } else if (score >= 75) {
      band = "Strong";
      status = "Strong";
    } else if (score >= 60) {
      band = "Developing";
      status = "Moderate";
    } else if (score >= 40) {
      band = "Needs Improvement";
      status = "Needs Improvement";
    } else {
      band = "Critical Gap";
      status = "Needs Improvement";
    }

    return { skill, score, status, band };
  });

  skillBreakdown.sort((a, b) => b.score - a.score);

  // Strong areas: skills >= 75% or top 2
  const strongSkills = skillBreakdown.filter((s) => s.score >= 75);
  const strongAreas: string[] =
    strongSkills.length > 0
      ? strongSkills.map((s) => `${s.skill} (${s.score}% - ${s.band})`)
      : skillBreakdown.slice(0, 2).map((s) => `${s.skill} (${s.score}% - ${s.band})`);

  // Areas needing improvement: skills < 60% or bottom 2
  const weakSkills = skillBreakdown.filter((s) => s.score < 60);
  const needsImprovement: string[] =
    weakSkills.length > 0
      ? weakSkills.map((s) => `${s.skill} (${s.score}% - ${s.band})`)
      : skillBreakdown
          .filter((s) => s.score < 75)
          .slice(0, 2)
          .map((s) => `${s.skill} (${s.score}% - ${s.band})`);

  if (needsImprovement.length === 0 && skillBreakdown.length > 0) {
    needsImprovement.push(`Advanced High-Scale Architecture & Performance for ${roleTitle}`);
  }

  // Actionable recommendations
  const recommendations: string[] = [];
  if (weakSkills.length > 0) {
    recommendations.push(
      `Complete the curated Learning Modules for ${weakSkills.map((w) => w.skill).slice(0, 2).join(" and ")} to close identified competency gaps.`
    );
  } else {
    recommendations.push(
      `Solidify high baseline by building complex real-world production projects for ${roleTitle}.`
    );
  }

  recommendations.push(
    `Solve targeted practice problems focused on ${roleTitle} technical competencies.`
  );

  recommendations.push(
    `Schedule a role-specific AI Mock Technical Interview to validate verbal communication of complex concepts.`
  );

  return {
    score: percentageScore,
    totalQuestions,
    completedAt: new Date().toISOString().split("T")[0],
    roleId,
    roleTitle,
    correctCount,
    wrongCount,
    skippedCount,
    skillBreakdown,
    strongAreas,
    needsImprovement,
    recommendations,
    questionResults,
  };
}
