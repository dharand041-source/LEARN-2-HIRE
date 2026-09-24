/**
 * Technical Assessment System Types
 * SkillForge Career-Readiness Platform
 */

export type QuestionType = "mcq" | "fill_blank";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface AssessmentQuestion {
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
  options?: string[]; // Exactly 10 options for MCQ (A-J)
  correctAnswer: string;
  acceptedAnswers?: string[]; // Normalized acceptable answers for fill-in-the-blank
  explanation: string;
  source: string;
  sourceUrl: string;
  assessmentStage: "initial";
  translations?: Record<
    string,
    {
      question?: string;
      options?: string[];
      explanation?: string;
    }
  >;
}

export interface SkillScoreSummary {
  skill: string;
  totalQuestions: number;
  correctQuestions: number;
  score: number;
  status: "Strong" | "Moderate" | "Needs Improvement";
}

export interface AssessmentValidationReport {
  isValid: boolean;
  totalQuestions: number;
  mcqCount: number;
  fillBlankCount: number;
  errors: string[];
}
