export type CareerCategory = 
  | "Software Development & Engineering"
  | "Data, AI & Machine Learning"
  | "Cloud, Infrastructure & DevOps"
  | "Cybersecurity"
  | "Architecture & Leadership"
  | "Hardware & Systems Engineering";

export interface CareerRole {
  id: string;
  title: string;
  category: CareerCategory;
  description: string;
  shortDesc: string;
  averageSalary: string;
  growthRate: string;
  openRolesCount: number;
  assessmentDuration: string;
  learningPathLength: string;
  primarySkills: string[];
  expectedSkillAreas: {
    name: string;
    weight: number;
    description: string;
  }[];
  prerequisites: string[];
}

export interface Question {
  id: string;
  roleId: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  codeSnippet?: string;
  options: {
    id: string;
    text: string;
    code?: string;
  }[];
  correctOptionId: string;
  explanation: string;
  skillTested: string;
}

export * from "./assessment";
export * from "./resumeJob";

export interface AssessmentResult {
  score: number;
  totalQuestions: number;
  completedAt: string;
  roleId: string;
  roleTitle: string;
  correctCount?: number;
  wrongCount?: number;
  skippedCount?: number;
  skillBreakdown: {
    skill: string;
    score: number;
    status: "Strong" | "Moderate" | "Needs Improvement";
  }[];
  strongAreas: string[];
  needsImprovement: string[];
  recommendations: string[];
  questionResults?: any[];
}

export interface LearningResource {
  id: string;
  title: string;
  provider: "NPTEL" | "IIT Madras Online" | "Official Docs" | "Curated Video" | "Interactive Lab";
  url: string;
  duration: string;
  type: "Video" | "Documentation" | "Exercise" | "Deep Dive";
  rating: number;
  language: string;
}

export interface LearningModule {
  id: string;
  roleId: string;
  title: string;
  category: string;
  description: string;
  progress: number; // 0 to 100
  difficulty: "Foundational" | "Intermediate" | "Advanced";
  estimatedTime: string;
  status: "Completed" | "In Progress" | "Locked" | "Recommended";
  skillsCovered: string[];
  resources: LearningResource[];
  topics: {
    id: string;
    title: string;
    completed: boolean;
    duration: string;
    summary: Record<string, string>; // language code -> summary text
  }[];
  practiceExercise: {
    title: string;
    problem: string;
    initialCode: string;
    solutionCode: string;
    hints: string[];
  };
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface ProjectItem {
  id: string;
  roleId: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: "Intermediate" | "Advanced" | "Production-Grade";
  estimatedDuration: string;
  skillsTested: string[];
  technologies: string[];
  status: "Not Started" | "In Progress" | "Under Review" | "Completed";
  progressPercentage: number;
  currentPhase: "Planning" | "Development" | "Testing" | "Deployment" | "Submitted";
  problemStatement: string;
  requirements: string[];
  suggestedStack: {
    frontend: string;
    backend: string;
    database: string;
    devops: string;
  };
  milestones: ProjectMilestone[];
  repoUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  evaluation?: ProjectEvaluation;
}

export interface ProjectEvaluation {
  overallScore: number;
  evaluatedAt: string;
  rubric: {
    criterion: string;
    score: number;
    maxScore: number;
    feedback: string;
  }[];
  strengths: string[];
  areasToImprove: string[];
  recommendedNextSteps: string[];
}

export interface ProblemItem {
  id: string;
  title: string;
  category: "Logical Reasoning" | "Aptitude" | "Programming" | "Debugging" | "SQL" | "Algorithms";
  difficulty: "Easy" | "Medium" | "Hard";
  xp: number;
  solved: boolean;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode?: string;
  solution?: string;
  hints: string[];
  tags: string[];
}

export interface InterviewSession {
  id: string;
  roleId: string;
  type: "Technical Interview" | "Project Deep-Dive" | "HR & Culture" | "Behavioral & Leadership" | "System Design" | "Voice Mock";
  durationMinutes: number;
  conductedAt: string;
  overallScore: number;
  scores: {
    technicalKnowledge: number;
    problemSolving: number;
    communication: number;
    answerStructure: number;
    projectExplanation: number;
  };
  questionsAsked: {
    question: string;
    candidateAnswer: string;
    critique: string;
    idealPoints: string[];
  }[];
  whatWentWell: string[];
  whatToImprove: string[];
  recommendedPractice: string[];
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    portfolio: string;
  };
  summary: string;
  skills: {
    category: string;
    items: string[];
  }[];
  experience: {
    id: string;
    company: string;
    role: string;
    location: string;
    period: string;
    highlights: string[];
  }[];
  projects: {
    id: string;
    name: string;
    technologies: string[];
    link?: string;
    highlights: string[];
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    year: string;
    score: string;
  }[];
  certifications: string[];
  achievements: string[];
}

export interface ResumeAnalysisResult {
  overallMatch: number;
  atsCompatibilityScore: number;
  targetRole: string;
  skillsFound: string[];
  skillsMissing: string[];
  experienceRelevance: number;
  projectRelevance: number;
  formattingScore: number;
  strengths: string[];
  criticalGaps: string[];
  recommendations: string[];
}

import { OpportunityType, WorkMode, EligibilityStatus } from "./resumeJob";
export * from "./resumeJob";

export interface OpportunityItem {
  id: string;
  company: string;
  logoInitial: string;
  role: string;
  type: OpportunityType;
  location: string;
  workMode: WorkMode;
  experienceLevel: string;
  salary: string;
  deadline: string;
  matchPercentage: number;
  matchedSkills: string[];
  skillGaps: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  saved: boolean;
  appliedDate?: string;
  applicationStatus?: ApplicationStatus;
  source?: string;
  listingUrl?: string;
  applicationUrl?: string;
  lastVerifiedAt?: string;
  postedAt?: string;
  eligibilityStatus?: EligibilityStatus;
  eligibility?: EligibilityStatus;
  eligibilityReason?: string;
  whyYouMatch?: string[];
  attribution?: string;
  alsoFoundOn?: string[];
  isDemo?: boolean;
  externalSource?: string;
  externalListingUrl?: string;
  externalApplicationUrl?: string;
}

export type ApplicationStatus = 
  | "Saved"
  | "Approved"
  | "Applied"
  | "Assessment"
  | "Interview"
  | "Selected"
  | "Rejected";

export interface ApplicationItem {
  id: string;
  opportunityId: string;
  company: string;
  role: string;
  type: OpportunityType;
  location: string;
  status: ApplicationStatus;
  appliedDate: string;
  lastUpdated: string;
  salary: string;
  matchScore: number;
  notes?: string;
  feedback?: RejectionFeedback;
}

export interface RejectionFeedback {
  applicationId: string;
  company: string;
  role: string;
  outcomeDate: string;
  employerFeedbackProvided: boolean;
  employerFeedbackText?: string;
  systemAnalysis: {
    summary: string;
    potentialSkillGaps: string[];
    interviewPerformanceFactors: string[];
    resumeDeficiencies: string[];
  };
  actionableImprovements: {
    area: string;
    description: string;
    recommendedAction: string;
    routeLink: string;
  }[];
  retrainingPlan: {
    priority: "High" | "Medium" | "Low";
    task: string;
    estimatedDays: number;
    actionLink: string;
    actionLabel: string;
  }[];
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  category: "assessment" | "learning" | "project" | "interview" | "streak";
}

export interface UserProfile {
  name: string;
  email: string;
  targetRole: string;
  targetCategory: CareerCategory;
  readinessScore: number;
  xp: number;
  streakDays: number;
  selectedLanguage: "en" | "ta" | "hi" | "te" | "ml" | "kn";
  readinessBreakdown: {
    technicalSkills: number;
    projects: number;
    problemSolving: number;
    interview: number;
    resume: number;
    careerFit: number;
  };
  focusArea: string;
}
