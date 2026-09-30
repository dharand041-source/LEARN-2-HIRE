export type ProviderType =
  | "NPTEL"
  | "MIT_OCW"
  | "HARVARD_CS50"
  | "FREECODECAMP"
  | "OFFICIAL"
  | "OTHER";

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export type GapPriority = "Critical" | "High" | "Medium" | "Low" | "Mastered";

export interface LearningLesson {
  id: string;
  title: string;
  order: number;
  type: "video" | "lecture" | "reading" | "lab" | "exercise" | "assignment";
  durationMinutes?: number;
  durationFormatted?: string;
  url: string; // Embeddable URL or official link
  provider: string;
  description?: string;
  skills: string[];
  topics: string[];
  isFree: boolean;
  completed?: boolean;
}

export interface CheckpointQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index 0-3
  explanation: string;
}

export interface LearningCheckpoint {
  id: string;
  title: string;
  description?: string;
  passingScore: number; // e.g. 70%
  questions: CheckpointQuestion[];
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: LearningLesson[];
  checkpoint?: LearningCheckpoint;
}

export interface AlternativeCourseItem {
  title: string;
  provider: string;
  url: string;
  type: ProviderType;
}

export interface LearningCourse {
  id: string;
  title: string;
  provider: string;
  providerType: ProviderType;
  courseUrl: string;
  description: string;
  language: string; // e.g. "English", "Tamil"
  level: SkillLevel;
  estimatedHours: number;
  skills: string[];
  primarySkill: string;
  prerequisites?: string[];
  modules: CourseModule[];
  lastVerifiedAt: string;
  isFree: boolean;
  qualityScore: number; // 0-100 internal score
  rating?: number;
  certificationInfo?: string;
  alternativeCourses?: AlternativeCourseItem[];
  practiceExercise?: {
    title: string;
    problem: string;
    initialCode: string;
    solutionCode: string;
    hints: string[];
  };
  reassessmentQuestions?: CheckpointQuestion[];
}

export interface SkillPrerequisite {
  skill: string;
  prerequisites: string[];
  category: string;
}

export interface PersonalizedSkillItem {
  skill: string;
  currentScore: number;
  targetScore: number;
  priority: GapPriority;
  status: "Critical Gap" | "Needs Improvement" | "Developing" | "Strong" | "Advanced";
  primaryCourse: LearningCourse;
  alternativeCourses?: AlternativeCourseItem[];
  prerequisitesMet: boolean;
  unmetPrerequisites: string[];
  roleImportance: "High" | "Medium" | "Essential";
  completedLessonsCount: number;
  totalLessonsCount: number;
  progressPercentage: number;
}
