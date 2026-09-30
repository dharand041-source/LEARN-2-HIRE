import { AssessmentQuestion, AssessmentResult } from "@/types";
import { SOFTWARE_DEV_QUESTIONS } from "./questions/softwareDev";
import { DATA_AI_QUESTIONS } from "./questions/dataAI";
import { CLOUD_SECURITY_QUESTIONS } from "./questions/cloudSecurity";
import { SYSTEMS_ARCHITECTURE_QUESTIONS } from "./questions/systemsArchitecture";

export const ALL_QUESTION_BANK: AssessmentQuestion[] = [
  ...SOFTWARE_DEV_QUESTIONS,
  ...DATA_AI_QUESTIONS,
  ...CLOUD_SECURITY_QUESTIONS,
  ...SYSTEMS_ARCHITECTURE_QUESTIONS,
];

// Mapping of role identifiers/aliases to standard roleId
const ROLE_ALIASES: Record<string, string> = {
  // Software Development
  "full-stack-dev": "full-stack-dev",
  "full stack developer": "full-stack-dev",
  "frontend-dev": "frontend-dev",
  "frontend developer": "frontend-dev",
  "backend-dev": "backend-dev",
  "backend developer": "backend-dev",
  "mobile-dev": "mobile-dev",
  "mobile app developer": "mobile-dev",
  "sdet-engineer": "sdet-engineer",
  "sdet": "sdet-engineer",
  "software development engineer in test (sdet)": "sdet-engineer",

  // Data, AI & ML
  "ai-ml-engineer": "ai-ml-engineer",
  "machine learning engineer": "ai-ml-engineer",
  "data-engineer": "data-engineer",
  "data engineer": "data-engineer",
  "data-analyst": "data-analyst",
  "data analyst": "data-analyst",
  "data analyst / bi specialist": "data-analyst",

  // Cloud & DevOps
  "devops-engineer": "devops-engineer",
  "cloud & devops engineer": "devops-engineer",
  "cloud engineer": "devops-engineer",
  "site-reliability-engineer": "site-reliability-engineer",
  "site reliability engineer (sre)": "site-reliability-engineer",
  "sre": "site-reliability-engineer",

  // Cybersecurity
  "security-analyst": "security-analyst",
  "cybersecurity analyst / soc analyst": "security-analyst",
  "soc analyst": "security-analyst",
  "cybersecurity analyst": "security-analyst",
  "app-security-engineer": "app-security-engineer",
  "application security engineer (appsec)": "app-security-engineer",
  "application security engineer": "app-security-engineer",
  "appsec": "app-security-engineer",

  // Architecture & Hardware
  "solutions-architect": "solutions-architect",
  "cloud solutions architect": "solutions-architect",
  "embedded-engineer": "embedded-engineer",
  "embedded systems & iot engineer": "embedded-engineer",
  "embedded engineer": "embedded-engineer",
};

/**
 * Normalizes user input for text/fill-in-the-blank comparisons:
 * - Trims whitespace
 * - Strips enclosing quotes ('..."...`...)
 * - Condenses multiple internal spaces
 * - Lowercases for case-insensitive checks
 */
export function normalizeAnswer(value: string | undefined | null): string {
  if (!value) return "";
  let clean = value.trim();
  // Strip outer quotes/backticks if present
  clean = clean.replace(/^["'`]|["'`]$/g, "");
  // Condense spaces
  clean = clean.replace(/\s+/g, " ").trim();
  return clean.toLowerCase();
}

/**
 * Validates whether user answer is correct for either MCQ or Fill-in-the-blank
 */
export function evaluateAnswer(question: AssessmentQuestion, userAnswer: string | undefined | null): boolean {
  if (!userAnswer || typeof userAnswer !== "string" || userAnswer.trim() === "") {
    return false;
  }

  const rawUser = userAnswer.trim();
  const normalizedUser = normalizeAnswer(userAnswer);

  if (question.type === "mcq") {
    // 1. Direct match with correctAnswer
    if (rawUser === question.correctAnswer || normalizedUser === normalizeAnswer(question.correctAnswer)) {
      return true;
    }

    // 2. If user provided option letter A-J (e.g. "A" -> 0, "B" -> 1...)
    if (/^[A-Ja-j]$/.test(rawUser) && question.options) {
      const index = rawUser.toUpperCase().charCodeAt(0) - 65;
      if (index >= 0 && index < question.options.length) {
        return question.options[index] === question.correctAnswer;
      }
    }

    // 3. If user provided formatted letter like "A." or "Option A"
    const letterMatch = rawUser.match(/^(?:Option\s+)?([A-J])(?:\.|\:|\s|$)/i);
    if (letterMatch && question.options) {
      const index = letterMatch[1].toUpperCase().charCodeAt(0) - 65;
      if (index >= 0 && index < question.options.length) {
        return question.options[index] === question.correctAnswer;
      }
    }

    return false;
  }

  if (question.type === "fill_blank") {
    // 1. Direct match with normalized correctAnswer
    if (normalizedUser === normalizeAnswer(question.correctAnswer)) {
      return true;
    }

    // 2. Match with acceptedAnswers array
    if (question.acceptedAnswers && question.acceptedAnswers.length > 0) {
      return question.acceptedAnswers.some((acc: string) => normalizeAnswer(acc) === normalizedUser);
    }

    return false;
  }

  return false;
}

/**
 * Validates that an assessment set satisfies the exact rules:
 * - Exactly 15 questions
 * - Exactly 10 MCQs
 * - Exactly 5 Fill-in-the-blanks
 * - Every MCQ has exactly 10 options A-J
 * - No duplicate question IDs
 * - All questions have valid correct answers and metadata
 */
export function validateAssessmentQuestions(questions: AssessmentQuestion[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!Array.isArray(questions)) {
    return { valid: false, errors: ["Questions must be an array."] };
  }

  if (questions.length !== 15) {
    errors.push(`Expected exactly 15 questions, found ${questions.length}.`);
  }

  const mcqs = questions.filter((q) => q.type === "mcq");
  const fillBlanks = questions.filter((q) => q.type === "fill_blank");

  if (mcqs.length !== 10) {
    errors.push(`Expected exactly 10 MCQs, found ${mcqs.length}.`);
  }

  if (fillBlanks.length !== 5) {
    errors.push(`Expected exactly 5 fill-in-the-blank questions, found ${fillBlanks.length}.`);
  }

  const seenIds = new Set<string>();
  questions.forEach((q, idx) => {
    if (!q.id) {
      errors.push(`Question #${idx + 1} has missing ID.`);
    } else if (seenIds.has(q.id)) {
      errors.push(`Duplicate question ID detected: ${q.id}.`);
    } else {
      seenIds.add(q.id);
    }

    if (!q.question || q.question.trim() === "") {
      errors.push(`Question ${q.id} has empty question text.`);
    }

    if (!q.skill) {
      errors.push(`Question ${q.id} missing skill metadata.`);
    }

    if (!q.difficulty) {
      errors.push(`Question ${q.id} missing difficulty metadata.`);
    }

    if (q.type === "mcq") {
      if (!Array.isArray(q.options) || q.options.length !== 10) {
        errors.push(`MCQ ${q.id} must have exactly 10 options, found ${q.options ? q.options.length : 0}.`);
      } else {
        if (!q.options.includes(q.correctAnswer)) {
          errors.push(`MCQ ${q.id} correctAnswer is not in the options array.`);
        }
        const uniqueOptions = new Set(q.options.map((o: string) => o.trim()));
        if (uniqueOptions.size !== 10) {
          errors.push(`MCQ ${q.id} contains duplicate options.`);
        }
      }
    }

    if (q.type === "fill_blank") {
      if (!q.correctAnswer || q.correctAnswer.trim() === "") {
        errors.push(`Fill-in question ${q.id} has empty correctAnswer.`);
      }
      if (!Array.isArray(q.acceptedAnswers) || q.acceptedAnswers.length === 0) {
        errors.push(`Fill-in question ${q.id} has missing acceptedAnswers.`);
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Simple deterministic pseudo-random generator for consistent shuffles with seed
 */
function pseudoRandom(seed: number) {
  let s = Math.sin(seed) * 10000;
  return s - Math.floor(s);
}

function shuffleArray<T>(arr: T[], seed?: number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const r = seed !== undefined ? pseudoRandom(seed + i * 37) : Math.random();
    const j = Math.floor(r * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Retrieves the 15 assessment questions for a given role (10 MCQs + 5 Fill-in-the-blanks).
 * Enforces role-specific filtering, blueprint assembly, validation, and optional shuffling.
 */
export function getQuestionsForRole(
  roleIdOrTitle: string,
  options?: { shuffle?: boolean; seed?: number }
): AssessmentQuestion[] {
  const key = roleIdOrTitle.toLowerCase().trim();
  const canonicalRoleId = ROLE_ALIASES[key] || key;

  // Filter pool by roleId or role title
  const pool = ALL_QUESTION_BANK.filter(
    (q) =>
      q.roleId === canonicalRoleId ||
      q.role.toLowerCase() === key ||
      q.roleId.toLowerCase() === key
  );

  if (pool.length === 0) {
    console.warn(`No questions found for role "${roleIdOrTitle}". Falling back to Full Stack Developer questions.`);
    return getQuestionsForRole("full-stack-dev", options);
  }

  const mcqs = pool.filter((q) => q.type === "mcq");
  const fillBlanks = pool.filter((q) => q.type === "fill_blank");

  // Select 10 MCQs and 5 Fill-in-the-blanks
  let selectedMCQs = mcqs.slice(0, 10);
  let selectedFills = fillBlanks.slice(0, 5);

  if (options?.shuffle) {
    selectedMCQs = shuffleArray(selectedMCQs, options.seed ? options.seed : undefined);
    selectedFills = shuffleArray(selectedFills, options.seed ? options.seed + 100 : undefined);
  }

  // Combine into a 15-question set
  let assembled = [...selectedMCQs, ...selectedFills];

  // If shuffle was requested, we can also shuffle the combined list or keep MCQs then Fills
  if (options?.shuffle) {
    assembled = shuffleArray(assembled, options.seed ? options.seed + 500 : undefined);
  }

  // Validate the resulting set
  const validation = validateAssessmentQuestions(assembled);
  if (!validation.valid) {
    console.error("Assessment validation failed:", validation.errors);
  }

  return assembled;
}

/**
 * Calculates complete assessment score, percentage, counts, skill breakdown, and recommendations
 */
export function calculateAssessmentResult(
  questions: AssessmentQuestion[],
  answers: Record<string, string>,
  roleId: string,
  roleTitle: string
): AssessmentResult {
  const totalQuestions = questions.length;
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  // Skill-wise performance buckets
  const skillBuckets: Record<
    string,
    { total: number; correct: number; questions: AssessmentQuestion[] }
  > = {};

  const questionResults = questions.map((q) => {
    const rawAnswer = answers[q.id];
    const isAnswered = rawAnswer !== undefined && rawAnswer !== null && rawAnswer.trim() !== "";
    const isCorrect = isAnswered ? evaluateAnswer(q, rawAnswer) : false;

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

    return {
      questionId: q.id,
      question: q.question,
      userAnswer: rawAnswer || "(Unanswered)",
      correctAnswer: q.correctAnswer,
      isCorrect,
      explanation: q.explanation,
      skill: q.skill,
    };
  });

  const percentageScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Generate skill breakdown
  const skillBreakdown = Object.entries(skillBuckets).map(([skill, data]) => {
    const score = Math.round((data.correct / data.total) * 100);
    let status: "Strong" | "Moderate" | "Needs Improvement";
    if (score >= 80) {
      status = "Strong";
    } else if (score >= 60) {
      status = "Moderate";
    } else {
      status = "Needs Improvement";
    }
    return { skill, score, status };
  });

  // Sort breakdown with needs improvement or highest relevance
  skillBreakdown.sort((a, b) => b.score - a.score);

  // Identify strong areas (skills with >= 80% score or highest scoring skills)
  const strongSkills = skillBreakdown.filter((s) => s.score >= 80);
  const strongAreas: string[] =
    strongSkills.length > 0
      ? strongSkills.map((s) => `${s.skill} (${s.score}%)`)
      : skillBreakdown.slice(0, 2).map((s) => `${s.skill} (${s.score}%)`);

  // Identify areas needing improvement (skills with < 60% or lowest scoring skills)
  const weakSkills = skillBreakdown.filter((s) => s.score < 60);
  const needsImprovement: string[] =
    weakSkills.length > 0
      ? weakSkills.map((s) => `${s.skill} (${s.score}%)`)
      : skillBreakdown
          .filter((s) => s.score < 80)
          .slice(0, 2)
          .map((s) => `${s.skill} (${s.score}%)`);

  // If no areas needing improvement, provide advanced mastery focus
  if (needsImprovement.length === 0 && skillBreakdown.length > 0) {
    needsImprovement.push(`Advanced Architecture & System Optimization for ${roleTitle}`);
  }

  // Generate actionable recommendations
  const recommendations: string[] = [];
  if (weakSkills.length > 0) {
    recommendations.push(
      `Prioritize the curated learning modules for ${weakSkills.map((w) => w.skill).slice(0, 2).join(" and ")} to build foundational confidence.`
    );
  } else {
    recommendations.push(
      `Complete advanced production scenarios in the Learning Track to solidify your high baseline.`
    );
  }

  recommendations.push(
    `Solve targeted practice problems related to ${roleTitle} technical competencies.`
  );

  recommendations.push(
    `Schedule a role-specific AI Mock Technical Interview to validate your communication of complex architecture.`
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
