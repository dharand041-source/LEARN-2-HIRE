"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
  UserProfile,
  CareerRole,
  AssessmentResult,
  LearningModule,
  ProjectItem,
  ProblemItem,
  InterviewSession,
  ResumeData,
  ResumeAnalysisResult,
  OpportunityItem,
  ApplicationItem,
  ApplicationStatus,
  AchievementItem,
  RejectionFeedback,
  ParsedResume,
  AtsCompatibilityAnalysis,
  JobListing,
  JobMatchResult,
  JobSearchQuery,
  ApplicationRecord,
} from "@/types";
import { CAREER_ROLES } from "@/data/careers";
import { INITIAL_ASSESSMENT_QUESTIONS } from "@/data/assessments";
import {
  getQuestionsForRole,
  calculateDynamicAssessmentResult,
  TechnicalQuestion,
} from "@/data/questions";
import { LEARNING_MODULES } from "@/data/learning";
import { REAL_WORLD_PROJECTS } from "@/data/projects";
import { PROBLEM_ITEMS } from "@/data/problems";
import { RECENT_INTERVIEW_RESULT } from "@/data/interviews";
import { INITIAL_RESUME_DATA, MOCK_RESUME_ANALYSIS } from "@/data/resume";
import { TECH_OPPORTUNITIES } from "@/data/opportunities";
import { INITIAL_APPLICATIONS } from "@/data/applications";
import { ACHIEVEMENTS_LIST } from "@/data/achievements";
import { parseResumeText } from "@/services/resumeParser";
import { analyzeResumeATS } from "@/services/atsScorer";
import { evaluateJobMatch } from "@/services/jobMatching";
import { createClient } from "@/lib/supabase/client";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "info" | "success" | "warning" | "achievement";
  link?: string;
}

export function convertResumeDataToText(data: ResumeData): string {
  const parts: string[] = [];
  parts.push(data.personalInfo.fullName || "Candidate");
  parts.push(`${data.personalInfo.title || ""} | ${data.personalInfo.location || "India"}`);
  parts.push(`Email: ${data.personalInfo.email || ""} | Phone: ${data.personalInfo.phone || ""}`);
  if (data.personalInfo.linkedin) parts.push(`LinkedIn: ${data.personalInfo.linkedin}`);
  if (data.personalInfo.github) parts.push(`GitHub: ${data.personalInfo.github}`);
  if (data.personalInfo.portfolio) parts.push(`Portfolio: ${data.personalInfo.portfolio}`);

  if (data.summary) {
    parts.push("\nPROFESSIONAL SUMMARY\n" + data.summary);
  }

  if (data.skills && data.skills.length > 0) {
    parts.push("\nTECHNICAL SKILLS");
    data.skills.forEach((cat) => {
      parts.push(`${cat.category}: ${cat.items.join(", ")}`);
    });
  }

  if (data.experience && data.experience.length > 0) {
    parts.push("\nPROFESSIONAL EXPERIENCE");
    data.experience.forEach((exp) => {
      parts.push(`${exp.role} - ${exp.company} (${exp.period}, ${exp.location})`);
      exp.highlights.forEach((h) => parts.push(`• ${h}`));
    });
  }

  if (data.projects && data.projects.length > 0) {
    parts.push("\nPROJECTS");
    data.projects.forEach((proj) => {
      parts.push(`${proj.name} [${proj.technologies.join(", ")}]`);
      if (proj.link) parts.push(`Link: ${proj.link}`);
      proj.highlights.forEach((h) => parts.push(`• ${h}`));
    });
  }

  if (data.education && data.education.length > 0) {
    parts.push("\nEDUCATION");
    data.education.forEach((edu) => {
      parts.push(`${edu.degree} - ${edu.institution} (${edu.year}) ${edu.score ? `[${edu.score}]` : ""}`);
    });
  }

  if (data.certifications && data.certifications.length > 0) {
    parts.push("\nCERTIFICATIONS");
    data.certifications.forEach((c) => parts.push(`• ${c}`));
  }

  if (data.achievements && data.achievements.length > 0) {
    parts.push("\nACHIEVEMENTS & AWARDS");
    data.achievements.forEach((a) => parts.push(`• ${a}`));
  }

  return parts.join("\n");
}

export function jobMatchToOpportunity(match: JobMatchResult): OpportunityItem {
  const j = match.job;
  return {
    id: j.id,
    company: j.company,
    logoInitial: j.company.slice(0, 2).toUpperCase(),
    role: j.title,
    type: j.opportunityType === "INTERNSHIP" ? "Internship" : j.opportunityType === "STARTUP" ? "Startup" : "Job",
    location: j.location,
    workMode: j.remoteType === "Remote" ? "Remote" : j.remoteType === "Hybrid" ? "Hybrid" : "Onsite",
    experienceLevel: j.experienceLevel || (j.opportunityType === "INTERNSHIP" ? "Student / Fresher" : "Entry Level"),
    salary: j.salaryMin && j.salaryMax
      ? `${j.salaryCurrency || "₹"} ${j.salaryMin.toLocaleString()} - ${j.salaryMax.toLocaleString()} / yr`
      : j.salaryMin
      ? `${j.salaryCurrency || "₹"} ${j.salaryMin.toLocaleString()}+ / yr`
      : "Disclosed on Application",
    deadline: j.expiresAt ? j.expiresAt.split("T")[0] : "Open until filled",
    matchPercentage: match.matchScore,
    matchedSkills: match.matchedSkills,
    skillGaps: match.missingSkills,
    description: j.description,
    responsibilities: [
      `Contribute to engineering deliverables and production services as ${j.title}.`,
      `Collaborate with cross-functional engineering teams in ${j.location}.`,
      `Apply core competencies: ${match.matchedSkills.slice(0, 4).join(", ") || "engineering best practices"}.`,
    ],
    requirements: j.requiredSkills.map((s) => `Proficiency with ${s}`),
    benefits: [
      "Health & Medical Coverage",
      "Remote / Hybrid Flexibility",
      "Competitive Compensation & Benefits",
      "Professional Development Stipend",
    ],
    saved: false,
    externalSource: j.source,
    externalListingUrl: j.listingUrl,
    externalApplicationUrl: j.applicationUrl,
    lastVerifiedAt: j.lastVerifiedAt,
    postedAt: j.postedAt,
    eligibilityStatus: match.eligibility,
    alsoFoundOn: j.alsoFoundOn,
    isDemo: j.isDemo,
  };
}

interface CareerContextType {
  userProfile: UserProfile;
  selectedRole: CareerRole;
  allRoles: CareerRole[];
  assessmentResult: AssessmentResult | null;
  assessmentAnswers: Record<string, string>;
  learningModules: LearningModule[];
  projects: ProjectItem[];
  problems: ProblemItem[];
  interviewSessions: InterviewSession[];
  resumeData: ResumeData;
  resumeAnalysis: ResumeAnalysisResult;
  opportunities: OpportunityItem[];
  applications: ApplicationItem[];
  achievements: AchievementItem[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;

  // Real Resume & ATS State
  parsedResume: ParsedResume | null;
  atsAnalysis: AtsCompatibilityAnalysis | null;
  liveJobMatches: JobMatchResult[];
  isAnalyzingResume: boolean;
  isJobsLoading: boolean;
  jobsSourceStatus: Record<string, { status: string; count: number; error?: string }>;
  applicationRecords: ApplicationRecord[];
  isApplyApprovalModalOpen: boolean;
  pendingApplyJob: JobListing | null;

  // Actions
  selectRole: (roleId: string) => void;
  setAssessmentAnswer: (questionId: string, optionId: string) => void;
  submitAssessment: (answers: Record<string, string>, activeQuestions?: TechnicalQuestion[]) => AssessmentResult;
  toggleTopicCompletion: (moduleId: string, topicId: string) => void;
  completeModule: (moduleId: string) => void;
  setLanguage: (lang: UserProfile["selectedLanguage"]) => void;
  updateProjectMilestone: (projectId: string, milestoneId: string, completed: boolean) => void;
  updateProjectDetails: (projectId: string, details: Partial<ProjectItem>) => void;
  submitProjectForEvaluation: (projectId: string) => void;
  solveProblem: (problemId: string) => void;
  submitInterviewSession: (session: InterviewSession) => void;
  updateResume: (data: Partial<ResumeData>) => void;
  reanalyzeResume: () => void;
  toggleSaveOpportunity: (oppId: string) => void;
  applyToOpportunity: (oppId: string) => void;
  updateApplicationStatus: (appId: string, newStatus: ApplicationStatus) => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  resetToDefaults: () => void;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;

  // Real Resume & Job Actions
  uploadAndAnalyzeResume: (file: File, jobDescription?: string) => Promise<{ parsed: ParsedResume; analysis: AtsCompatibilityAnalysis }>;
  analyzeResumeFromRawText: (text: string, jobDescription?: string) => Promise<{ parsed: ParsedResume; analysis: AtsCompatibilityAnalysis }>;
  fetchLiveJobs: (customQuery?: Partial<JobSearchQuery>) => Promise<JobMatchResult[]>;
  openExternalApplyModal: (job: JobListing) => void;
  closeExternalApplyModal: () => void;
  confirmExternalApplyRedirect: () => void;
  confirmExternalApplied: (jobId: string) => void;
}

const DEFAULT_USER_PROFILE: UserProfile = {
  name: "Hamenath",
  email: "demo@learn-2-hire.local",
  targetRole: "Full Stack Developer",
  targetCategory: "Software Development & Engineering",
  readinessScore: 76,
  xp: 1450,
  streakDays: 7,
  selectedLanguage: "en",
  readinessBreakdown: {
    technicalSkills: 78,
    projects: 85,
    problemSolving: 72,
    interview: 77,
    resume: 84,
    careerFit: 88,
  },
  focusArea: "SQL & Backend Query Optimization",
};

const DEFAULT_ASSESSMENT_RESULT: AssessmentResult = {
  score: 72,
  totalQuestions: 10,
  completedAt: "2026-09-18",
  roleId: "full-stack-dev",
  roleTitle: "Full Stack Developer",
  skillBreakdown: [
    { skill: "JavaScript", score: 82, status: "Strong" },
    { skill: "React & Next.js", score: 76, status: "Strong" },
    { skill: "Node.js & Express", score: 61, status: "Moderate" },
    { skill: "PostgreSQL & SQL", score: 48, status: "Needs Improvement" },
    { skill: "Git & CI/CD", score: 88, status: "Strong" },
    { skill: "REST & APIs", score: 69, status: "Moderate" },
  ],
  strongAreas: [
    "Git & branching workflows (88%)",
    "JavaScript asynchronous microtask loop (82%)",
    "React state hooks & Server Component separation (76%)",
  ],
  needsImprovement: [
    "SQL composite indexing, execution plans & query tuning (48%)",
    "Node.js streams & memory leak prevention (61%)",
    "REST cursor-based pagination & error envelope contracts (69%)",
  ],
  recommendations: [
    "Complete the 'Relational Databases & PostgreSQL Query Optimization' learning module.",
    "Solve the 3 recommended SQL & Debugging algorithmic problems.",
    "Practice database transaction lock questions in the Voice Interview simulator.",
  ],
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Application Assessment Received",
    message: "Swiggy Core Logistics sent you an online technical assessment link.",
    timestamp: "2 hours ago",
    read: false,
    type: "info",
    link: "/applications",
  },
  {
    id: "notif-2",
    title: "Project Evaluation Completed",
    message: "Warehouse Inventory SaaS scored 92/100! Your readiness increased by +4%.",
    timestamp: "1 day ago",
    read: false,
    type: "success",
    link: "/projects/proj-inventory-saas/evaluation",
  },
  {
    id: "notif-3",
    title: "Rejection Outcome Analysis Ready",
    message: "Actionable retraining plan generated for Karya AI Founding Engineer application.",
    timestamp: "3 days ago",
    read: true,
    type: "warning",
    link: "/feedback",
  },
  {
    id: "notif-4",
    title: "Achievement Unlocked: 7-Day Streak",
    message: "You earned +150 XP for consistent daily practice!",
    timestamp: "Today",
    read: true,
    type: "achievement",
    link: "/profile",
  },
];

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export function CareerProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Core State
  const [userProfile, setUserProfileState] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("full-stack-dev");
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(DEFAULT_ASSESSMENT_RESULT);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string>>({
    q1: "opt_a",
    q2: "opt_b",
    q5: "opt_a",
    q6: "opt_a",
  });
  const [learningModules, setLearningModules] = useState<LearningModule[]>(LEARNING_MODULES);
  const [projects, setProjects] = useState<ProjectItem[]>(REAL_WORLD_PROJECTS);
  const [problems, setProblems] = useState<ProblemItem[]>(PROBLEM_ITEMS);
  const [interviewSessions, setInterviewSessions] = useState<InterviewSession[]>([RECENT_INTERVIEW_RESULT]);
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysisResult>(MOCK_RESUME_ANALYSIS);
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(TECH_OPPORTUNITIES);
  const [applications, setApplications] = useState<ApplicationItem[]>(INITIAL_APPLICATIONS);
  const [achievements, setAchievements] = useState<AchievementItem[]>(ACHIEVEMENTS_LIST);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Real Resume & Job Matching States
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [atsAnalysis, setAtsAnalysis] = useState<AtsCompatibilityAnalysis | null>(null);
  const [liveJobMatches, setLiveJobMatches] = useState<JobMatchResult[]>([]);
  const [isAnalyzingResume, setIsAnalyzingResume] = useState<boolean>(false);
  const [isJobsLoading, setIsJobsLoading] = useState<boolean>(false);
  const [jobsSourceStatus, setJobsSourceStatus] = useState<Record<string, { status: string; count: number; error?: string }>>({});
  const [applicationRecords, setApplicationRecords] = useState<ApplicationRecord[]>([]);
  const [isApplyApprovalModalOpen, setIsApplyApprovalModalOpen] = useState(false);
  const [pendingApplyJob, setPendingApplyJob] = useState<JobListing | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Sync Supabase Authentication with UserProfile
  useEffect(() => {
    try {
      const supabase = createClient();

      // 1. Check current logged-in user
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setIsAuthenticated(true);
          const displayName =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            "User";

          setUserProfileState((prev) => ({
            ...prev,
            name: displayName,
            email: user.email || prev.email,
          }));
        } else {
          setIsAuthenticated(false);
        }
      });

      // 2. Subscribe to auth events (SIGN_IN, SIGN_OUT, USER_UPDATED)
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          setIsAuthenticated(true);
          const user = session.user;
          const displayName =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            "User";

          setUserProfileState((prev) => ({
            ...prev,
            name: displayName,
            email: user.email || prev.email,
          }));
        } else if (event === "SIGNED_OUT") {
          setIsAuthenticated(false);
          setUserProfileState(DEFAULT_USER_PROFILE);
          localStorage.removeItem("sf_userProfile");
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch {
      // Supabase client initialization fallback
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setUserProfileState(DEFAULT_USER_PROFILE);
      localStorage.removeItem("sf_userProfile");
      window.location.href = "/";
    } catch (err) {
      console.error("Sign out error:", err);
    }
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("sf_userProfile");
      if (savedUser) setUserProfileState(JSON.parse(savedUser));

      const savedRole = localStorage.getItem("sf_selectedRoleId");
      if (savedRole) setSelectedRoleId(savedRole);

      const savedAssess = localStorage.getItem("sf_assessmentResult");
      if (savedAssess) setAssessmentResult(JSON.parse(savedAssess));

      const savedModules = localStorage.getItem("sf_learningModules");
      if (savedModules) setLearningModules(JSON.parse(savedModules));

      const savedProjects = localStorage.getItem("sf_projects");
      if (savedProjects) setProjects(JSON.parse(savedProjects));

      const savedProblems = localStorage.getItem("sf_problems");
      if (savedProblems) setProblems(JSON.parse(savedProblems));

      const savedResume = localStorage.getItem("sf_resumeData");
      if (savedResume) setResumeData(JSON.parse(savedResume));

      const savedApps = localStorage.getItem("sf_applications");
      if (savedApps) setApplications(JSON.parse(savedApps));

      const savedParsedResume = localStorage.getItem("sf_parsedResume");
      if (savedParsedResume) setParsedResume(JSON.parse(savedParsedResume));

      const savedAtsAnalysis = localStorage.getItem("sf_atsAnalysis");
      if (savedAtsAnalysis) setAtsAnalysis(JSON.parse(savedAtsAnalysis));

      const savedAppRecords = localStorage.getItem("sf_applicationRecords");
      if (savedAppRecords) setApplicationRecords(JSON.parse(savedAppRecords));
    } catch {
      // LocalStorage fallback
    }
    setMounted(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("sf_userProfile", JSON.stringify(userProfile));
      localStorage.setItem("sf_selectedRoleId", selectedRoleId);
      localStorage.setItem("sf_assessmentResult", JSON.stringify(assessmentResult));
      localStorage.setItem("sf_learningModules", JSON.stringify(learningModules));
      localStorage.setItem("sf_projects", JSON.stringify(projects));
      localStorage.setItem("sf_problems", JSON.stringify(problems));
      localStorage.setItem("sf_resumeData", JSON.stringify(resumeData));
      localStorage.setItem("sf_applications", JSON.stringify(applications));
      if (parsedResume) localStorage.setItem("sf_parsedResume", JSON.stringify(parsedResume));
      if (atsAnalysis) localStorage.setItem("sf_atsAnalysis", JSON.stringify(atsAnalysis));
      if (applicationRecords.length > 0) {
        localStorage.setItem("sf_applicationRecords", JSON.stringify(applicationRecords));
      }
    } catch {
      // Storage error silent catch
    }
  }, [
    mounted,
    userProfile,
    selectedRoleId,
    assessmentResult,
    learningModules,
    projects,
    problems,
    resumeData,
    applications,
    parsedResume,
    atsAnalysis,
    applicationRecords,
  ]);

  const selectedRole = CAREER_ROLES.find((r) => r.id === selectedRoleId) || CAREER_ROLES[0];

  const selectRole = useCallback((roleId: string) => {
    setSelectedRoleId(roleId);
    const r = CAREER_ROLES.find((role) => role.id === roleId);
    if (r) {
      setUserProfileState((prev) => ({
        ...prev,
        targetRole: r.title,
        targetCategory: r.category,
      }));
    }
  }, []);

  const setAssessmentAnswer = useCallback((questionId: string, optionId: string) => {
    setAssessmentAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  }, []);

  const submitAssessment = useCallback((
    answers: Record<string, string>,
    activeQuestions?: TechnicalQuestion[]
  ): AssessmentResult => {
    const questionsToUse =
      activeQuestions && activeQuestions.length > 0
        ? activeQuestions
        : getQuestionsForRole(selectedRole.id);

    const dynamicResult = calculateDynamicAssessmentResult(
      questionsToUse,
      answers,
      selectedRole.id,
      selectedRole.title
    );

    const newResult: AssessmentResult = {
      score: dynamicResult.score,
      totalQuestions: dynamicResult.totalQuestions,
      completedAt: dynamicResult.completedAt,
      roleId: dynamicResult.roleId,
      roleTitle: dynamicResult.roleTitle,
      correctCount: dynamicResult.correctCount,
      wrongCount: dynamicResult.wrongCount,
      skippedCount: dynamicResult.skippedCount,
      skillBreakdown: dynamicResult.skillBreakdown,
      strongAreas: dynamicResult.strongAreas,
      needsImprovement: dynamicResult.needsImprovement,
      recommendations: dynamicResult.recommendations,
      questionResults: dynamicResult.questionResults,
    };

    setAssessmentResult(newResult);
    setUserProfileState((prev) => ({
      ...prev,
      readinessScore: Math.round((prev.readinessScore + dynamicResult.score) / 2),
      xp: prev.xp + 250,
      readinessBreakdown: {
        ...prev.readinessBreakdown,
        technicalSkills: dynamicResult.score,
      },
    }));

    return newResult;
  }, [selectedRole.id, selectedRole.title]);

  const toggleTopicCompletion = useCallback((moduleId: string, topicId: string) => {
    setLearningModules((prev) =>
      prev.map((mod) => {
        if (mod.id !== moduleId) return mod;
        const updatedTopics = mod.topics.map((t) => (t.id === topicId ? { ...t, completed: !t.completed } : t));
        const completedCount = updatedTopics.filter((t) => t.completed).length;
        const newProgress = Math.round((completedCount / updatedTopics.length) * 100);
        return {
          ...mod,
          topics: updatedTopics,
          progress: newProgress,
          status: newProgress === 100 ? "Completed" : "In Progress",
        };
      })
    );
    setUserProfileState((prev) => ({ ...prev, xp: prev.xp + 25 }));
  }, []);

  const completeModule = useCallback((moduleId: string) => {
    setLearningModules((prev) =>
      prev.map((mod) =>
        mod.id === moduleId
          ? {
              ...mod,
              progress: 100,
              status: "Completed",
              topics: mod.topics.map((t) => ({ ...t, completed: true })),
            }
          : mod
      )
    );
    setUserProfileState((prev) => ({
      ...prev,
      xp: prev.xp + 150,
      readinessScore: Math.min(99, prev.readinessScore + 3),
      readinessBreakdown: {
        ...prev.readinessBreakdown,
        technicalSkills: Math.min(98, prev.readinessBreakdown.technicalSkills + 4),
      },
    }));
  }, []);

  const setLanguage = useCallback((lang: UserProfile["selectedLanguage"]) => {
    setUserProfileState((prev) => ({ ...prev, selectedLanguage: lang }));
  }, []);

  const updateProjectMilestone = useCallback((projectId: string, milestoneId: string, completed: boolean) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const updatedMilestones = proj.milestones.map((m) => (m.id === milestoneId ? { ...m, completed } : m));
        const doneCount = updatedMilestones.filter((m) => m.completed).length;
        const progressPercentage = Math.round((doneCount / updatedMilestones.length) * 100);
        return {
          ...proj,
          milestones: updatedMilestones,
          progressPercentage,
          status: progressPercentage === 100 ? "Under Review" : "In Progress",
        };
      })
    );
  }, []);

  const updateProjectDetails = useCallback((projectId: string, details: Partial<ProjectItem>) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, ...details } : p)));
  }, []);

  const submitProjectForEvaluation = useCallback((projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          status: "Completed",
          progressPercentage: 100,
          currentPhase: "Submitted",
          evaluation: {
            overallScore: 88,
            evaluatedAt: new Date().toISOString().split("T")[0],
            rubric: [
              { criterion: "System Functionality & Completeness", score: 18, maxScore: 20, feedback: "All functional requirements fulfilled smoothly." },
              { criterion: "Code Quality & TypeScript Strictness", score: 18, maxScore: 20, feedback: "Strong TypeScript typing and clean modular architecture." },
              { criterion: "UI / UX & Responsive Design", score: 19, maxScore: 20, feedback: "Exceptional visual design, clear contrast, accessible layouts." },
              { criterion: "Database Schema & Query Performance", score: 17, maxScore: 20, feedback: "Proper indexing and transaction isolation verified." },
              { criterion: "Testing & DevOps Pipeline", score: 16, maxScore: 20, feedback: "CI pipeline active with automated Vitest suites." },
            ],
            strengths: [
              "Production-grade error handling and state management.",
              "Clean database migration strategy with relational indexes.",
              "Responsive layout tested across desktop and mobile breakpoints.",
            ],
            areasToImprove: ["Add load testing benchmarks using k6 or Artillery."],
            recommendedNextSteps: [
              "Add project URL to ATS resume.",
              "Apply for verified Full Stack positions with 90%+ match score.",
            ],
          },
        };
      })
    );

    setUserProfileState((prev) => ({
      ...prev,
      readinessScore: Math.min(99, prev.readinessScore + 5),
      xp: prev.xp + 350,
      readinessBreakdown: {
        ...prev.readinessBreakdown,
        projects: Math.min(98, prev.readinessBreakdown.projects + 8),
      },
    }));
  }, []);

  const solveProblem = useCallback((problemId: string) => {
    setProblems((prev) => {
      const prob = prev.find((p) => p.id === problemId);
      const gainedXp = prob ? prob.xp : 50;

      setUserProfileState((u) => ({
        ...u,
        xp: u.xp + gainedXp,
        streakDays: u.streakDays + 1,
        readinessBreakdown: {
          ...u.readinessBreakdown,
          problemSolving: Math.min(98, u.readinessBreakdown.problemSolving + 4),
        },
      }));

      return prev.map((p) => {
        if (p.id !== problemId) return p;
        return { ...p, solved: true };
      });
    });
  }, []);

  const submitInterviewSession = useCallback((session: InterviewSession) => {
    setInterviewSessions((prev) => [session, ...prev]);
    setUserProfileState((prev) => ({
      ...prev,
      xp: prev.xp + 200,
      readinessBreakdown: {
        ...prev.readinessBreakdown,
        interview: Math.round((prev.readinessBreakdown.interview + session.overallScore) / 2),
      },
    }));
  }, []);

  const updateResume = useCallback((data: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...data }));
  }, []);

  const reanalyzeResume = useCallback(() => {
    setResumeData((currentResumeData) => {
      const text = convertResumeDataToText(currentResumeData);
      const parsed = parseResumeText(text);
      const analysis = analyzeResumeATS(parsed, selectedRole.title);

      setParsedResume(parsed);
      setAtsAnalysis(analysis);
      setResumeAnalysis({
        overallMatch: analysis.overallScore,
        atsCompatibilityScore: analysis.overallScore,
        targetRole: selectedRole.title,
        experienceRelevance: Math.round(analysis.scoreBreakdown.experienceRelevance.score * 10),
        projectRelevance: Math.round(analysis.scoreBreakdown.projectRelevance.score * 20),
        formattingScore: Math.round(analysis.scoreBreakdown.parsingAndFormat.score * 5),
        skillsFound: analysis.matchedRoleSkills,
        skillsMissing: analysis.missingRoleSkills,
        strengths: analysis.matchedRoleSkills.slice(0, 4).map((s) => `Demonstrated skill: ${s}`),
        criticalGaps: analysis.issues.length > 0 ? analysis.issues : ["Standard single-column syntax verified"],
        recommendations: analysis.recommendations,
      });

      setUserProfileState((prev) => ({
        ...prev,
        xp: prev.xp + 100,
        readinessBreakdown: {
          ...prev.readinessBreakdown,
          resume: analysis.overallScore,
        },
      }));

      return currentResumeData;
    });
  }, [selectedRole.title]);

  const fetchLiveJobs = useCallback(
    async (customQuery?: Partial<JobSearchQuery>): Promise<JobMatchResult[]> => {
      setIsJobsLoading(true);
      try {
        const role = customQuery?.role || selectedRole.title;
        const skills = customQuery?.skills || (parsedResume ? parsedResume.technicalSkills : undefined);
        const params = new URLSearchParams();
        if (role) params.set("role", role);
        if (customQuery?.location) params.set("location", customQuery.location);
        if (customQuery?.workMode) params.set("workMode", customQuery.workMode);
        if (customQuery?.type) params.set("type", customQuery.type);
        if (skills && skills.length > 0) params.set("skills", skills.join(","));

        const res = await fetch(`/api/jobs/search?${params.toString()}`);
        const data = await res.json();

        if (!data.success) {
          console.warn("Failed to fetch jobs from API:", data.error);
          return [];
        }

        const rawJobs: JobListing[] = data.jobs || [];

        // Update sources health
        if (Array.isArray(data.sources)) {
          const statuses: Record<string, { status: string; count: number; error?: string }> = {};
          data.sources.forEach((s: any) => {
            statuses[s.source] = {
              status: s.success ? "healthy" : "failing",
              count: s.jobCount,
              error: s.error,
            };
          });
          setJobsSourceStatus(statuses);
        }

        // Match against candidate profile
        const effectiveResume =
          parsedResume || parseResumeText(convertResumeDataToText(resumeData));
        const matched = rawJobs.map((job) => evaluateJobMatch(job, effectiveResume, role));

        // Sort by match score descending
        matched.sort((a, b) => b.matchScore - a.matchScore);

        setLiveJobMatches(matched);

        // Convert to opportunities format for opportunities hub & cards
        const opps = matched.map(jobMatchToOpportunity);
        setOpportunities(opps);

        return matched;
      } catch (err) {
        console.error("fetchLiveJobs error:", err);
        return [];
      } finally {
        setIsJobsLoading(false);
      }
    },
    [selectedRole.title, parsedResume, resumeData]
  );

  // Fetch live jobs on initial load (only when not in demo mode)
  useEffect(() => {
    if (!mounted) return;
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
    if (!isDemoMode) {
      fetchLiveJobs();
    }
  }, [mounted, fetchLiveJobs]);

  const uploadAndAnalyzeResume = useCallback(async (
    file: File,
    jobDescription?: string
  ): Promise<{ parsed: ParsedResume; analysis: AtsCompatibilityAnalysis }> => {
    setIsAnalyzingResume(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("targetRole", selectedRole.title);
      if (jobDescription) formData.append("jobDescription", jobDescription);

      const res = await fetch("/api/resume/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to analyze resume.");
      }

      const parsed: ParsedResume = data.parsedResume;
      const analysis: AtsCompatibilityAnalysis = data.analysis;

      setParsedResume(parsed);
      setAtsAnalysis(analysis);

      // Keep legacy/existing state in sync
      setResumeAnalysis({
        overallMatch: analysis.overallScore,
        atsCompatibilityScore: analysis.overallScore,
        targetRole: selectedRole.title,
        experienceRelevance: Math.round(analysis.scoreBreakdown.experienceRelevance.score * 10),
        projectRelevance: Math.round(analysis.scoreBreakdown.projectRelevance.score * 20),
        formattingScore: Math.round(analysis.scoreBreakdown.parsingAndFormat.score * 5),
        skillsFound: analysis.matchedRoleSkills,
        skillsMissing: analysis.missingRoleSkills,
        strengths: analysis.matchedRoleSkills.slice(0, 4).map((s) => `Demonstrated skill: ${s}`),
        criticalGaps: analysis.issues.length > 0 ? analysis.issues : ["Standard single-column syntax verified"],
        recommendations: analysis.recommendations,
      });

      setUserProfileState((prev) => ({
        ...prev,
        readinessBreakdown: {
          ...prev.readinessBreakdown,
          resume: analysis.overallScore,
        },
      }));

      // Automatically search live opportunities matching candidate skills
      fetchLiveJobs({
        role: selectedRole.title,
        skills: parsed.technicalSkills,
      }).catch((e) => console.error("Auto live jobs query failed:", e));

      return { parsed, analysis };
    } finally {
      setIsAnalyzingResume(false);
    }
  }, [selectedRole.title, fetchLiveJobs]);

  const analyzeResumeFromRawText = useCallback(async (
    text: string,
    jobDescription?: string
  ): Promise<{ parsed: ParsedResume; analysis: AtsCompatibilityAnalysis }> => {
    setIsAnalyzingResume(true);
    try {
      const res = await fetch("/api/resume/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          targetRole: selectedRole.title,
          jobDescription,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to analyze resume.");
      }

      const parsed: ParsedResume = data.parsedResume;
      const analysis: AtsCompatibilityAnalysis = data.analysis;

      setParsedResume(parsed);
      setAtsAnalysis(analysis);

      setResumeAnalysis({
        overallMatch: analysis.overallScore,
        atsCompatibilityScore: analysis.overallScore,
        targetRole: selectedRole.title,
        experienceRelevance: Math.round(analysis.scoreBreakdown.experienceRelevance.score * 10),
        projectRelevance: Math.round(analysis.scoreBreakdown.projectRelevance.score * 20),
        formattingScore: Math.round(analysis.scoreBreakdown.parsingAndFormat.score * 5),
        skillsFound: analysis.matchedRoleSkills,
        skillsMissing: analysis.missingRoleSkills,
        strengths: analysis.matchedRoleSkills.slice(0, 4).map((s) => `Demonstrated skill: ${s}`),
        criticalGaps: analysis.issues.length > 0 ? analysis.issues : ["Standard single-column syntax verified"],
        recommendations: analysis.recommendations,
      });

      return { parsed, analysis };
    } finally {
      setIsAnalyzingResume(false);
    }
  }, [selectedRole.title]);

  const openExternalApplyModal = useCallback((job: JobListing) => {
    setPendingApplyJob(job);
    setIsApplyApprovalModalOpen(true);
  }, []);

  const closeExternalApplyModal = useCallback(() => {
    setIsApplyApprovalModalOpen(false);
    setPendingApplyJob(null);
  }, []);

  const confirmExternalApplyRedirect = useCallback(() => {
    setPendingApplyJob((currentJob) => {
      if (!currentJob) return null;
      const targetUrl = currentJob.applicationUrl || currentJob.listingUrl;

      if (!targetUrl || !targetUrl.startsWith("https://")) {
        alert("Invalid or insecure application URL. Only HTTPS destinations are permitted.");
        return currentJob;
      }

      // 1. Record application tracking record (status: 'redirected')
      const record: ApplicationRecord = {
        id: `app-rec-${Date.now()}`,
        jobId: currentJob.id,
        title: currentJob.title,
        jobTitle: currentJob.title,
        company: currentJob.company,
        opportunityType: currentJob.opportunityType,
        source: currentJob.source,
        externalUrl: targetUrl,
        timestamp: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        status: "Redirected",
      };
      setApplicationRecords((prev) => [record, ...prev]);

      // 2. Add or update Kanban Application Tracker
      setApplications((prev) => {
        const existingApp = prev.find((a) => a.opportunityId === currentJob.id);
        if (!existingApp) {
          const newApp: ApplicationItem = {
            id: `app-${Date.now()}`,
            opportunityId: currentJob.id,
            company: currentJob.company,
            role: currentJob.title,
            type: currentJob.opportunityType === "INTERNSHIP" ? "Internship" : currentJob.opportunityType === "STARTUP" ? "Startup" : "Job",
            location: currentJob.location,
            status: "Saved",
            appliedDate: new Date().toISOString().split("T")[0],
            lastUpdated: new Date().toISOString().split("T")[0],
            salary: currentJob.salaryMin ? `${currentJob.salaryCurrency || "₹"} ${currentJob.salaryMin.toLocaleString()}` : "Disclosed on Application",
            matchScore: 85,
            notes: `Redirected to ${currentJob.source} official application destination: ${targetUrl}`,
          };
          return [newApp, ...prev];
        }
        return prev;
      });

      // 3. Safe open external URL
      window.open(targetUrl, "_blank", "noopener,noreferrer");

      // 4. Add notification
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: "Redirected to External Application",
        message: `You were redirected to ${currentJob.company}'s official application portal on ${currentJob.source}. Once submitted, mark it as applied in your Tracker.`,
        timestamp: "Just now",
        read: false,
        type: "info",
        link: "/applications",
      };
      setNotifications((prev) => [newNotif, ...prev]);

      return null;
    });

    setIsApplyApprovalModalOpen(false);
  }, []);

  const confirmExternalApplied = useCallback((jobId: string) => {
    setApplicationRecords((prev) =>
      prev.map((r) => (r.jobId === jobId ? { ...r, status: "Applied" } : r))
    );
    setApplications((prev) =>
      prev.map((a) =>
        a.opportunityId === jobId
          ? {
              ...a,
              status: "Applied",
              appliedDate: new Date().toISOString().split("T")[0],
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : a
      )
    );
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: "Application Confirmed",
      message: "Application marked as submitted. Status tracked in your Application Kanban.",
      timestamp: "Just now",
      read: false,
      type: "success",
      link: "/applications",
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  const toggleSaveOpportunity = useCallback((oppId: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === oppId ? { ...opp, saved: !opp.saved } : opp))
    );
  }, []);

  const applyToOpportunity = useCallback((oppId: string) => {
    setOpportunities((prevOpps) => {
      const opp = prevOpps.find((o) => o.id === oppId);
      if (!opp) return prevOpps;

      // Check if live job match exists
      setLiveJobMatches((currentMatches) => {
        const matchedJob = currentMatches.find((m) => m.job.id === oppId)?.job;
        if (matchedJob) {
          openExternalApplyModal(matchedJob);
          return currentMatches;
        }

        // If external URLs exist on opp, open modal
        if (opp.externalApplicationUrl || opp.externalListingUrl) {
          const syntheticJob: JobListing = {
            id: opp.id,
            source: (opp.externalSource as any) || "verified_external",
            sourceId: opp.id,
            title: opp.role,
            company: opp.company,
            description: opp.description,
            location: opp.location,
            country: "India",
            remoteType: opp.workMode === "Remote" ? "Remote" : opp.workMode === "Hybrid" ? "Hybrid" : "Onsite",
            employmentType: "Full-time",
            opportunityType: opp.type === "Internship" ? "INTERNSHIP" : opp.type === "Startup" ? "STARTUP" : "JOB",
            experienceLevel: opp.experienceLevel || "Entry Level",
            requiredSkills: opp.matchedSkills.concat(opp.skillGaps),
            preferredSkills: [],
            listingUrl: opp.externalListingUrl || "https://jobicy.com",
            applicationUrl: opp.externalApplicationUrl || opp.externalListingUrl,
            postedAt: opp.postedAt || new Date().toISOString(),
            lastVerifiedAt: opp.lastVerifiedAt || new Date().toISOString(),
            isActive: true,
            sourceUrl: opp.externalListingUrl || "https://jobicy.com",
            attribution: "Source: Verified Career Page",
          };
          openExternalApplyModal(syntheticJob);
        }
        return currentMatches;
      });

      return prevOpps.map((o) =>
        o.id === oppId
          ? { ...o, applicationStatus: "Applied", appliedDate: new Date().toISOString().split("T")[0] }
          : o
      );
    });
  }, [openExternalApplyModal]);

  const updateApplicationStatus = useCallback((appId: string, newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? { ...app, status: newStatus, lastUpdated: new Date().toISOString().split("T")[0] }
          : app
      )
    );
  }, []);

  const updateUserProfile = useCallback((data: Partial<UserProfile>) => {
    setUserProfileState((prev) => ({ ...prev, ...data }));
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const resetToDefaults = useCallback(() => {
    setUserProfileState(DEFAULT_USER_PROFILE);
    setSelectedRoleId("full-stack-dev");
    setAssessmentResult(DEFAULT_ASSESSMENT_RESULT);
    setLearningModules(LEARNING_MODULES);
    setProjects(REAL_WORLD_PROJECTS);
    setProblems(PROBLEM_ITEMS);
    setResumeData(INITIAL_RESUME_DATA);
    setResumeAnalysis(MOCK_RESUME_ANALYSIS);
    setOpportunities(TECH_OPPORTUNITIES);
    setApplications(INITIAL_APPLICATIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setParsedResume(null);
    setAtsAnalysis(null);
    setLiveJobMatches([]);
    setApplicationRecords([]);
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
  }, []);

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  const contextValue = useMemo(
    () => ({
      userProfile,
      selectedRole,
      allRoles: CAREER_ROLES,
      assessmentResult,
      assessmentAnswers,
      learningModules,
      projects,
      problems,
      interviewSessions,
      resumeData,
      resumeAnalysis,
      opportunities,
      applications,
      achievements,
      notifications,
      unreadNotificationCount,

      // Real Resume & Job Matching States
      parsedResume,
      atsAnalysis,
      liveJobMatches,
      isAnalyzingResume,
      isJobsLoading,
      jobsSourceStatus,
      applicationRecords,
      isApplyApprovalModalOpen,
      pendingApplyJob,

      // Actions
      selectRole,
      setAssessmentAnswer,
      submitAssessment,
      toggleTopicCompletion,
      completeModule,
      setLanguage,
      updateProjectMilestone,
      updateProjectDetails,
      submitProjectForEvaluation,
      solveProblem,
      submitInterviewSession,
      updateResume,
      reanalyzeResume,
      toggleSaveOpportunity,
      applyToOpportunity,
      updateApplicationStatus,
      updateUserProfile,
      markNotificationAsRead,
      clearAllNotifications,
      resetToDefaults,
      isAuthenticated,
      signOut,

      // Real Resume & Job Actions
      uploadAndAnalyzeResume,
      analyzeResumeFromRawText,
      fetchLiveJobs,
      openExternalApplyModal,
      closeExternalApplyModal,
      confirmExternalApplyRedirect,
      confirmExternalApplied,
    }),
    [
      userProfile,
      selectedRole,
      assessmentResult,
      assessmentAnswers,
      learningModules,
      projects,
      problems,
      interviewSessions,
      resumeData,
      resumeAnalysis,
      opportunities,
      applications,
      achievements,
      notifications,
      unreadNotificationCount,
      parsedResume,
      atsAnalysis,
      liveJobMatches,
      isAnalyzingResume,
      isJobsLoading,
      jobsSourceStatus,
      applicationRecords,
      isApplyApprovalModalOpen,
      pendingApplyJob,
      selectRole,
      setAssessmentAnswer,
      submitAssessment,
      toggleTopicCompletion,
      completeModule,
      setLanguage,
      updateProjectMilestone,
      updateProjectDetails,
      submitProjectForEvaluation,
      solveProblem,
      submitInterviewSession,
      updateResume,
      reanalyzeResume,
      toggleSaveOpportunity,
      applyToOpportunity,
      updateApplicationStatus,
      updateUserProfile,
      markNotificationAsRead,
      clearAllNotifications,
      resetToDefaults,
      isAuthenticated,
      signOut,
      uploadAndAnalyzeResume,
      analyzeResumeFromRawText,
      fetchLiveJobs,
      openExternalApplyModal,
      closeExternalApplyModal,
      confirmExternalApplyRedirect,
      confirmExternalApplied,
    ]
  );

  return (
    <CareerContext.Provider value={contextValue}>
      {children}
    </CareerContext.Provider>
  );
}

export function useCareer() {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error("useCareer must be used within a CareerProvider");
  }
  return context;
}
