"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "info" | "success" | "warning" | "achievement";
  link?: string;
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
}

const DEFAULT_USER_PROFILE: UserProfile = {
  name: "Hamenath",
  email: "demo@skillforge.local",
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
    } catch {
      // Storage error silent catch
    }
  }, [mounted, userProfile, selectedRoleId, assessmentResult, learningModules, projects, problems, resumeData, applications]);

  const selectedRole = CAREER_ROLES.find((r) => r.id === selectedRoleId) || CAREER_ROLES[0];

  const selectRole = (roleId: string) => {
    setSelectedRoleId(roleId);
    const r = CAREER_ROLES.find((role) => role.id === roleId);
    if (r) {
      setUserProfileState((prev) => ({
        ...prev,
        targetRole: r.title,
        targetCategory: r.category,
      }));
    }
  };

  const setAssessmentAnswer = (questionId: string, optionId: string) => {
    setAssessmentAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const submitAssessment = (
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
  };

  const toggleTopicCompletion = (moduleId: string, topicId: string) => {
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
  };

  const completeModule = (moduleId: string) => {
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
  };

  const setLanguage = (lang: UserProfile["selectedLanguage"]) => {
    setUserProfileState((prev) => ({ ...prev, selectedLanguage: lang }));
  };

  const updateProjectMilestone = (projectId: string, milestoneId: string, completed: boolean) => {
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
  };

  const updateProjectDetails = (projectId: string, details: Partial<ProjectItem>) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, ...details } : p)));
  };

  const submitProjectForEvaluation = (projectId: string) => {
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
  };

  const solveProblem = (problemId: string) => {
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id !== problemId) return p;
        return { ...p, solved: true };
      })
    );
    const prob = problems.find((p) => p.id === problemId);
    const gainedXp = prob ? prob.xp : 50;

    setUserProfileState((prev) => ({
      ...prev,
      xp: prev.xp + gainedXp,
      streakDays: prev.streakDays + 1,
      readinessBreakdown: {
        ...prev.readinessBreakdown,
        problemSolving: Math.min(98, prev.readinessBreakdown.problemSolving + 4),
      },
    }));
  };

  const submitInterviewSession = (session: InterviewSession) => {
    setInterviewSessions((prev) => [session, ...prev]);
    setUserProfileState((prev) => ({
      ...prev,
      xp: prev.xp + 200,
      readinessBreakdown: {
        ...prev.readinessBreakdown,
        interview: Math.round((prev.readinessBreakdown.interview + session.overallScore) / 2),
      },
    }));
  };

  const updateResume = (data: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...data }));
  };

  const reanalyzeResume = () => {
    setResumeAnalysis({
      ...MOCK_RESUME_ANALYSIS,
      overallMatch: 88,
      atsCompatibilityScore: 94,
      skillsFound: [
        ...MOCK_RESUME_ANALYSIS.skillsFound,
        "PostgreSQL Index Optimization",
        "Vitest",
      ],
      recommendations: [
        "Include production links to verified GitHub repositories.",
        "Highlight your 92/100 Warehouse SaaS project in interview discussions.",
      ],
    });
    setUserProfileState((prev) => ({
      ...prev,
      xp: prev.xp + 100,
      readinessBreakdown: {
        ...prev.readinessBreakdown,
        resume: 92,
      },
    }));
  };

  const toggleSaveOpportunity = (oppId: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === oppId ? { ...opp, saved: !opp.saved } : opp))
    );
  };

  const applyToOpportunity = (oppId: string) => {
    const opp = opportunities.find((o) => o.id === oppId);
    if (!opp) return;

    setOpportunities((prev) =>
      prev.map((o) => (o.id === oppId ? { ...o, applicationStatus: "Applied", appliedDate: new Date().toISOString().split("T")[0] } : o))
    );

    const existingApp = applications.find((a) => a.opportunityId === oppId);
    if (!existingApp) {
      const newApp: ApplicationItem = {
        id: `app-${Date.now()}`,
        opportunityId: opp.id,
        company: opp.company,
        role: opp.role,
        type: opp.type,
        location: opp.location,
        status: "Applied",
        appliedDate: new Date().toISOString().split("T")[0],
        lastUpdated: new Date().toISOString().split("T")[0],
        salary: opp.salary,
        matchScore: opp.matchPercentage,
        notes: "Applied directly through SkillForge candidate readiness match.",
      };
      setApplications((prev) => [newApp, ...prev]);
    }

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: "Application Submitted Successfully",
      message: `Your verified profile and projects have been submitted for ${opp.role} at ${opp.company}.`,
      timestamp: "Just now",
      read: false,
      type: "success",
      link: "/applications",
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const updateApplicationStatus = (appId: string, newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: newStatus, lastUpdated: new Date().toISOString().split("T")[0] } : app))
    );
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setUserProfileState((prev) => ({ ...prev, ...data }));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const resetToDefaults = () => {
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
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <CareerContext.Provider
      value={{
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
      }}
    >
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
