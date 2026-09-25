/**
 * SkillForge Question Engine - Core Type Definitions
 * Supports Role-Specific Technical Assessments, Aptitude, and Logical Reasoning
 */

export type QuestionType = "mcq" | "fill_blank";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface QuestionOption {
  label: "A" | "B" | "C" | "D";
  text: string;
}

export interface TechnicalQuestion {
  id: string;
  roleId: string;
  role: string;
  skill: string;
  subSkill: string;
  topic: string;
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  codeSnippet?: string;
  options?: QuestionOption[]; // Exactly 4 options for MCQ
  correctAnswer: string; // "A" | "B" | "C" | "D" for MCQ, or canonical text for fill_blank
  acceptedAnswers?: string[]; // Normalized acceptable strings for fill_blank
  explanation: string;
  source: string;
  sourceUrl: string;
  sourceType: "original_based_on_reference" | "educational_reference";
  version: string;
}

export interface AptitudeQuestion {
  id: string;
  category: string;
  difficulty: Difficulty;
  question: string;
  options: QuestionOption[];
  correctAnswer: "A" | "B" | "C" | "D";
  solution: string;
  explanation: string;
  source: string;
  sourceUrl: string;
  sourceType: "original_based_on_reference" | "educational_reference";
  version: string;
}

export interface LogicalReasoningQuestion {
  id: string;
  category: string;
  difficulty: Difficulty;
  question: string;
  options: QuestionOption[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  source: string;
  sourceUrl: string;
  sourceType: "original_based_on_reference" | "educational_reference";
  version: string;
}

export interface ValidationIssue {
  questionId: string;
  originalQuestionId?: string;
  roleOrCategory: string;
  similarityReason: string;
}

export interface QuestionValidationReport {
  isValid: boolean;
  totalTechnicalQuestions: number;
  totalAptitudeQuestions: number;
  totalLogicalQuestions: number;
  totalRoles: number;
  questionsPerRole: Record<string, number>;
  difficultyDistribution: Record<string, { beginner: number; intermediate: number; advanced: number }>;
  duplicateCount: number;
  invalidCount: number;
  issues: ValidationIssue[];
}
