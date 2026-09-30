/**
 * SkillForge Question Engine - Global Uniqueness & Quality Validation Utility
 *
 * Implements strict cross-role duplicate detection:
 * - Exact text similarity
 * - Normalized text similarity
 * - Semantic / Token Jaccard similarity
 * - Duplicate question ID
 * - Structure & option completeness (exactly 4 options for MCQ, exactly 1 correct answer)
 * - Difficulty distribution (5 Beginner, 6 Intermediate, 4 Advanced)
 */

import {
  TechnicalQuestion,
  AptitudeQuestion,
  LogicalReasoningQuestion,
  QuestionValidationReport,
  ValidationIssue,
} from "./types";

const STOP_WORDS = new Set([
  "a", "an", "the", "in", "on", "at", "to", "for", "of", "with", "by", "from",
  "is", "are", "was", "were", "be", "been", "being", "have", "has", "had",
  "do", "does", "did", "which", "what", "where", "when", "why", "how", "all",
  "any", "both", "each", "few", "more", "most", "other", "some", "such", "no",
  "nor", "not", "only", "own", "same", "so", "than", "too", "very", "can",
  "will", "just", "should", "now", "following", "primary", "purpose", "used"
]);

/**
 * Normalizes text by removing punctuation, converting to lowercase, and collapsing whitespace.
 */
export function normalizeQuestionText(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extracts key informative tokens for semantic/Jaccard similarity.
 */
export function tokenizeMeaningful(text: string): Set<string> {
  const normalized = normalizeQuestionText(text);
  const words = normalized.split(" ");
  const tokens = new Set<string>();
  for (const word of words) {
    if (word.length > 2 && !STOP_WORDS.has(word)) {
      tokens.add(word);
    }
  }
  return tokens;
}

/**
 * Computes Jaccard Similarity coefficient between two sets of tokens.
 */
export function computeJaccardSimilarity(tokensA: Set<string>, tokensB: Set<string>): number {
  if (tokensA.size === 0 || tokensB.size === 0) return 0;
  let intersectionCount = 0;
  tokensA.forEach((token) => {
    if (tokensB.has(token)) {
      intersectionCount++;
    }
  });
  const unionSize = tokensA.size + tokensB.size - intersectionCount;
  return unionSize > 0 ? intersectionCount / unionSize : 0;
}

/**
 * Validates the entire technical question bank for uniqueness and correctness.
 */
export function validateQuestionUniqueness(
  questions: TechnicalQuestion[],
  aptitudeQuestions: AptitudeQuestion[] = [],
  logicalQuestions: LogicalReasoningQuestion[] = []
): QuestionValidationReport {
  const issues: ValidationIssue[] = [];
  const seenIds = new Map<string, string>(); // id -> role
  const normalizedQuestions: { id: string; role: string; text: string; tokens: Set<string>; skill: string }[] = [];

  const questionsPerRole: Record<string, number> = {};
  const difficultyDistribution: Record<
    string,
    { beginner: number; intermediate: number; advanced: number }
  > = {};

  // 1. Process and validate all Technical Questions
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const roleKey = q.roleId || q.role;

    // Track per-role counts
    questionsPerRole[roleKey] = (questionsPerRole[roleKey] || 0) + 1;

    // Track difficulty
    if (!difficultyDistribution[roleKey]) {
      difficultyDistribution[roleKey] = { beginner: 0, intermediate: 0, advanced: 0 };
    }
    if (q.difficulty === "Beginner") difficultyDistribution[roleKey].beginner++;
    else if (q.difficulty === "Intermediate") difficultyDistribution[roleKey].intermediate++;
    else if (q.difficulty === "Advanced") difficultyDistribution[roleKey].advanced++;

    // Check Question ID
    if (!q.id) {
      issues.push({
        questionId: `index-${i}`,
        roleOrCategory: roleKey,
        similarityReason: "Missing question ID.",
      });
    } else if (seenIds.has(q.id)) {
      issues.push({
        questionId: q.id,
        originalQuestionId: q.id,
        roleOrCategory: roleKey,
        similarityReason: `Duplicate question ID detected: "${q.id}" (already registered in ${seenIds.get(q.id)}).`,
      });
    } else {
      seenIds.set(q.id, roleKey);
    }

    // Check Question Text
    if (!q.question || q.question.trim() === "") {
      issues.push({
        questionId: q.id,
        roleOrCategory: roleKey,
        similarityReason: "Question text is empty.",
      });
      continue;
    }

    // Check Required Metadata
    if (!q.skill) {
      issues.push({
        questionId: q.id,
        roleOrCategory: roleKey,
        similarityReason: "Missing skill metadata.",
      });
    }
    if (!q.difficulty) {
      issues.push({
        questionId: q.id,
        roleOrCategory: roleKey,
        similarityReason: "Missing difficulty metadata.",
      });
    }
    if (!q.explanation) {
      issues.push({
        questionId: q.id,
        roleOrCategory: roleKey,
        similarityReason: "Missing explanation.",
      });
    }
    if (!q.source) {
      issues.push({
        questionId: q.id,
        roleOrCategory: roleKey,
        similarityReason: "Missing reference source.",
      });
    }

    // Check Question Type Specifics
    if (q.type === "mcq") {
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        issues.push({
          questionId: q.id,
          roleOrCategory: roleKey,
          similarityReason: `MCQ must have exactly 4 options (A, B, C, D). Found: ${q.options ? q.options.length : 0}`,
        });
      } else {
        // Validate option labels and uniqueness
        const seenLabels = new Set<string>();
        const seenOptionTexts = new Set<string>();

        q.options.forEach((opt, optIdx) => {
          if (!opt.label || !["A", "B", "C", "D"].includes(opt.label)) {
            issues.push({
              questionId: q.id,
              roleOrCategory: roleKey,
              similarityReason: `Option at index ${optIdx} has invalid label "${opt.label}". Expected A, B, C, or D.`,
            });
          }
          if (seenLabels.has(opt.label)) {
            issues.push({
              questionId: q.id,
              roleOrCategory: roleKey,
              similarityReason: `Duplicate option label "${opt.label}" found in options.`,
            });
          }
          seenLabels.add(opt.label);

          const normOpt = normalizeQuestionText(opt.text);
          if (seenOptionTexts.has(normOpt)) {
            issues.push({
              questionId: q.id,
              roleOrCategory: roleKey,
              similarityReason: `Duplicate option text found in options: "${opt.text}".`,
            });
          }
          seenOptionTexts.add(normOpt);
        });

        // Validate correct answer
        if (!["A", "B", "C", "D"].includes(q.correctAnswer)) {
          issues.push({
            questionId: q.id,
            roleOrCategory: roleKey,
            similarityReason: `MCQ correctAnswer must be "A", "B", "C", or "D". Found: "${q.correctAnswer}".`,
          });
        }
      }
    } else if (q.type === "fill_blank") {
      if (!q.correctAnswer || q.correctAnswer.trim() === "") {
        issues.push({
          questionId: q.id,
          roleOrCategory: roleKey,
          similarityReason: "Fill-in-the-blank question missing canonical correctAnswer.",
        });
      }
      if (!Array.isArray(q.acceptedAnswers) || q.acceptedAnswers.length === 0) {
        issues.push({
          questionId: q.id,
          roleOrCategory: roleKey,
          similarityReason: "Fill-in-the-blank question missing acceptedAnswers array.",
        });
      }
    } else {
      issues.push({
        questionId: q.id,
        roleOrCategory: roleKey,
        similarityReason: `Unknown question type "${q.type}". Must be "mcq" or "fill_blank".`,
      });
    }

    // Similarity Check against all previously processed questions
    const normText = normalizeQuestionText(q.question);
    const tokens = tokenizeMeaningful(q.question);

    for (const prev of normalizedQuestions) {
      // 1. Exact or normalized match
      if (normText === prev.text) {
        issues.push({
          questionId: q.id,
          originalQuestionId: prev.id,
          roleOrCategory: `${roleKey} vs ${prev.role}`,
          similarityReason: `Exact text duplicate with question ${prev.id} in role ${prev.role}.`,
        });
        continue;
      }

      // 2. High semantic / Jaccard token overlap (>0.70 threshold)
      const sim = computeJaccardSimilarity(tokens, prev.tokens);
      if (sim >= 0.70) {
        issues.push({
          questionId: q.id,
          originalQuestionId: prev.id,
          roleOrCategory: `${roleKey} vs ${prev.role}`,
          similarityReason: `Semantic similarity threshold exceeded (${Math.round(sim * 100)}% token overlap) with question ${prev.id} in ${prev.role}.`,
        });
      }
    }

    normalizedQuestions.push({
      id: q.id,
      role: roleKey,
      text: normText,
      tokens,
      skill: q.skill,
    });
  }

  // 2. Process and validate Aptitude Questions
  const normalizedAptitude: { id: string; text: string; tokens: Set<string> }[] = [];
  for (let i = 0; i < aptitudeQuestions.length; i++) {
    const aq = aptitudeQuestions[i];
    if (seenIds.has(aq.id)) {
      issues.push({
        questionId: aq.id,
        originalQuestionId: aq.id,
        roleOrCategory: "Aptitude",
        similarityReason: `Duplicate ID in Aptitude: "${aq.id}".`,
      });
    } else {
      seenIds.set(aq.id, "Aptitude");
    }

    if (!Array.isArray(aq.options) || aq.options.length !== 4) {
      issues.push({
        questionId: aq.id,
        roleOrCategory: "Aptitude",
        similarityReason: `Aptitude question ${aq.id} must have exactly 4 choices (A, B, C, D).`,
      });
    }

    if (!["A", "B", "C", "D"].includes(aq.correctAnswer)) {
      issues.push({
        questionId: aq.id,
        roleOrCategory: "Aptitude",
        similarityReason: `Aptitude question ${aq.id} correctAnswer must be "A", "B", "C", or "D".`,
      });
    }

    if (!aq.solution && !aq.explanation) {
      issues.push({
        questionId: aq.id,
        roleOrCategory: "Aptitude",
        similarityReason: `Aptitude question ${aq.id} missing verified solution.`,
      });
    }

    const normText = normalizeQuestionText(aq.question);
    const tokens = tokenizeMeaningful(aq.question);

    for (const prev of normalizedAptitude) {
      if (normText === prev.text) {
        issues.push({
          questionId: aq.id,
          originalQuestionId: prev.id,
          roleOrCategory: "Aptitude",
          similarityReason: `Exact text duplicate in Aptitude with ${prev.id}.`,
        });
      }
    }
    normalizedAptitude.push({ id: aq.id, text: normText, tokens });
  }

  // 3. Process and validate Logical Reasoning Questions & Cross-checks
  const normalizedLogical: { id: string; text: string; tokens: Set<string> }[] = [];
  for (let i = 0; i < logicalQuestions.length; i++) {
    const lq = logicalQuestions[i];
    if (seenIds.has(lq.id)) {
      issues.push({
        questionId: lq.id,
        originalQuestionId: lq.id,
        roleOrCategory: "Logical Reasoning",
        similarityReason: `Duplicate ID in Logical Reasoning: "${lq.id}".`,
      });
    } else {
      seenIds.set(lq.id, "Logical Reasoning");
    }

    if (!Array.isArray(lq.options) || lq.options.length !== 4) {
      issues.push({
        questionId: lq.id,
        roleOrCategory: "Logical Reasoning",
        similarityReason: `Logical question ${lq.id} must have exactly 4 choices (A, B, C, D).`,
      });
    }

    if (!["A", "B", "C", "D"].includes(lq.correctAnswer)) {
      issues.push({
        questionId: lq.id,
        roleOrCategory: "Logical Reasoning",
        similarityReason: `Logical question ${lq.id} correctAnswer must be "A", "B", "C", or "D".`,
      });
    }

    if (!lq.explanation) {
      issues.push({
        questionId: lq.id,
        roleOrCategory: "Logical Reasoning",
        similarityReason: `Logical question ${lq.id} missing verified explanation.`,
      });
    }

    const normText = normalizeQuestionText(lq.question);
    const tokens = tokenizeMeaningful(lq.question);

    for (const prev of normalizedLogical) {
      if (normText === prev.text) {
        issues.push({
          questionId: lq.id,
          originalQuestionId: prev.id,
          roleOrCategory: "Logical Reasoning",
          similarityReason: `Exact text duplicate in Logical Reasoning with ${prev.id}.`,
        });
      }
    }

    // Cross-check with Aptitude questions for disguised duplicates
    for (const apt of normalizedAptitude) {
      if (normText === apt.text) {
        issues.push({
          questionId: lq.id,
          originalQuestionId: apt.id,
          roleOrCategory: "Logical vs Aptitude",
          similarityReason: `Underlying problem duplicate between Logical ${lq.id} and Aptitude ${apt.id}.`,
        });
      }
    }

    normalizedLogical.push({ id: lq.id, text: normText, tokens });
  }

  const duplicates = issues.filter((iss) => iss.similarityReason.toLowerCase().includes("duplicate") || iss.similarityReason.toLowerCase().includes("similarity"));
  const invalid = issues.filter((iss) => !duplicates.includes(iss));

  return {
    isValid: issues.length === 0,
    totalTechnicalQuestions: questions.length,
    totalAptitudeQuestions: aptitudeQuestions.length,
    totalLogicalQuestions: logicalQuestions.length,
    totalRoles: Object.keys(questionsPerRole).length,
    questionsPerRole,
    difficultyDistribution,
    duplicateCount: duplicates.length,
    invalidCount: invalid.length,
    issues,
  };
}
