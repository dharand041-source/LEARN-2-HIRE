import {
  UserProfile,
  CareerRole,
  AssessmentResult,
  LearningModule,
  ProjectItem,
  ProblemItem,
  InterviewSession,
  ResumeData,
  OpportunityItem,
  ApplicationItem,
  AchievementItem,
  ParsedResume,
  AtsCompatibilityAnalysis,
} from "@/types";
import { TechnicalQuestion } from "@/data/questions";
import { NotificationItem } from "@/context/CareerContext";

export type CandidateJourneyStage =
  | "AUTHENTICATED"
  | "CAREER_SELECTED"
  | "BASELINE_ASSESSMENT"
  | "SKILL_ANALYZED"
  | "ROADMAP_CREATED"
  | "LEARNING_ACTIVE"
  | "PRACTICE_ACTIVE"
  | "REASSESSMENT_READY"
  | "PROJECT_ACTIVE"
  | "PROJECT_COMPLETED"
  | "INTERVIEW_READY"
  | "RESUME_READY"
  | "OPPORTUNITY_READY"
  | "ELIGIBILITY_CHECKED"
  | "MATCHED"
  | "APPLIED"
  | "OUTCOME_RECORDED"
  | "RETRAINING"
  | "REASSESSMENT";

export interface SkillGapItem {
  skill: string;
  category: string;
  requiredLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  currentLevel: "None" | "Beginner" | "Intermediate" | "Advanced" | "Expert";
  gap: "None" | "Small" | "Moderate" | "Large";
  evidence: string;
  confidence: "High" | "Medium" | "Low";
  priority: "High" | "Medium" | "Low";
  recommendedActions: {
    title: string;
    type: "learn" | "practice" | "project" | "reassess";
    route: string;
  }[];
}

export interface SkillProofEvidence {
  id: string;
  skill: string;
  evidenceType: "Project" | "Assessment" | "Code Practice" | "Interview Defense";
  title: string;
  description: string;
  verifiedAt: string;
  score: number;
  url?: string;
  status: "Verified" | "Pending Review";
}

export interface UserRepository {
  getProfile(): Promise<UserProfile>;
  updateProfile(profile: Partial<UserProfile>): Promise<UserProfile>;
  getJourneyStage(): Promise<CandidateJourneyStage>;
  setJourneyStage(stage: CandidateJourneyStage): Promise<void>;
  getTargetRole(): Promise<string>;
  setTargetRole(roleId: string): Promise<void>;
}

export interface CareerRepository {
  getAllRoles(): Promise<CareerRole[]>;
  getRoleBySlug(slug: string): Promise<CareerRole | undefined>;
  getRoleById(id: string): Promise<CareerRole | undefined>;
}

export interface SkillRepository {
  getRequiredSkillsForRole(roleId: string): Promise<string[]>;
  analyzeSkillGaps(roleId: string, assessmentResult: AssessmentResult | null): Promise<SkillGapItem[]>;
}

export interface AssessmentRepository {
  getAssessment(id: string): Promise<any>;
  saveResult(result: AssessmentResult): Promise<void>;
  getLatestResult(roleId?: string): Promise<AssessmentResult | null>;
  getHistory(): Promise<AssessmentResult[]>;
}

export interface QuestionRepository {
  getQuestionsForRole(roleId: string, options?: { excludeIds?: string[]; count?: number }): Promise<TechnicalQuestion[]>;
  recordQuestionAttempt(userId: string, questionId: string, isCorrect: boolean, timeTaken: number): Promise<void>;
  getSeenQuestionIds(roleId: string): Promise<string[]>;
}

export interface LearningRepository {
  getModules(roleId: string): Promise<LearningModule[]>;
  getModuleById(id: string): Promise<LearningModule | undefined>;
  toggleTopicCompletion(moduleId: string, topicId: string): Promise<void>;
  getRoadmap(roleId: string, skillGaps?: SkillGapItem[]): Promise<any[]>;
  getResources(): Promise<any[]>;
}

export interface PracticeRepository {
  getProblems(category?: string): Promise<ProblemItem[]>;
  getProblemById(id: string): Promise<ProblemItem | undefined>;
  markSolved(problemId: string): Promise<void>;
}

export interface ProjectRepository {
  getProjects(roleId?: string): Promise<ProjectItem[]>;
  getProjectById(id: string): Promise<ProjectItem | undefined>;
  saveSubmission(projectId: string, submission: { repoUrl: string; liveUrl?: string; docsUrl?: string; explanation?: string }): Promise<ProjectItem>;
}

export interface EvidenceRepository {
  getAllEvidence(): Promise<SkillProofEvidence[]>;
  addEvidence(item: Omit<SkillProofEvidence, "id" | "verifiedAt">): Promise<SkillProofEvidence>;
}

export interface InterviewRepository {
  getSessions(): Promise<InterviewSession[]>;
  saveSession(session: InterviewSession): Promise<void>;
}

export interface ResumeRepository {
  getResumeData(): Promise<ResumeData>;
  saveResumeData(data: ResumeData): Promise<void>;
  getAnalysis(): Promise<AtsCompatibilityAnalysis | null>;
  saveAnalysis(analysis: AtsCompatibilityAnalysis): Promise<void>;
}

export interface OpportunityRepository {
  getOpportunities(filters?: { type?: string; workMode?: string; search?: string }): Promise<OpportunityItem[]>;
  getOpportunityById(id: string): Promise<OpportunityItem | undefined>;
  toggleSave(id: string): Promise<boolean>;
}

export interface ApplicationRepository {
  getApplications(): Promise<ApplicationItem[]>;
  getApplicationById(id: string): Promise<ApplicationItem | undefined>;
  addApplication(app: Omit<ApplicationItem, "id" | "appliedDate" | "lastUpdated">): Promise<ApplicationItem>;
  updateStatus(id: string, status: any, notes?: string): Promise<void>;
}

export interface NotificationRepository {
  getNotifications(): Promise<NotificationItem[]>;
  markRead(id: string): Promise<void>;
  clearAll(): Promise<void>;
}

export interface AnalyticsRepository {
  getAnalyticsSummary(): Promise<any>;
}
