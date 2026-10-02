/**
 * Learn-2-Hire Canonical Route Registry
 * 
 * Provides type-safe canonical paths for every route in the product.
 * Eliminates ad-hoc string literals and prevents 404 errors.
 */

export const ROUTES = {
  // Public Marketing & Informational Routes
  home: "/",
  howItWorks: "/how-it-works",
  careers: "/careers",
  resources: "/resources",
  about: "/about",

  // Authentication Routes
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    callback: "/auth/callback",
    error: "/auth/error",
  },

  // Onboarding (First-time user setup)
  onboarding: "/onboarding",

  // Core Protected Application (/app/*)
  app: {
    // Dashboard
    dashboard: "/app/dashboard",

    // Career Tracking & Discovery
    career: {
      discover: "/app/career/discover",
      goals: "/app/career/goals",
      detail: (slug: string) => `/app/career/${slug}`,
    },

    // Diagnostic Assessments
    assessments: {
      root: "/app/assessments",
      baseline: "/app/assessments/baseline",
      detail: (assessmentId: string) => `/app/assessments/${assessmentId}`,
      results: (assessmentId: string) => `/app/assessments/${assessmentId}/results`,
    },

    // Central Skill Intelligence
    skillAnalysis: "/app/skill-analysis",

    // Personalized Learning Ecosystem
    learning: {
      root: "/app/learning",
      roadmap: "/app/learning/roadmap",
      courses: "/app/learning/courses",
      lessons: "/app/learning/lessons",
      resources: "/app/learning/resources",
      practice: "/app/learning/practice",
      progress: "/app/learning/progress",
      bookmarks: "/app/learning/bookmarks",
      weakTopics: "/app/learning/weak-topics",
    },

    // Hands-On Practice
    practice: {
      root: "/app/practice",
      coding: "/app/practice/coding",
      dsa: "/app/practice/dsa",
      sql: "/app/practice/sql",
      debugging: "/app/practice/debugging",
      aptitude: "/app/practice/aptitude",
      logical: "/app/practice/logical",
      verbal: "/app/practice/verbal",
      role: "/app/practice/role",
      company: "/app/practice/company",
      history: "/app/practice/history",
    },

    // Continuous Improvement & Retraining
    improve: {
      root: "/app/improve",
      skillGaps: "/app/improve/skill-gaps",
      retraining: "/app/improve/retraining",
      reassessment: "/app/improve/reassessment",
    },

    // Production Capstone Projects
    projects: {
      root: "/app/projects",
      recommended: "/app/projects/recommended",
      myProjects: "/app/projects/my-projects",
      detail: (id: string) => `/app/projects/${id}`,
      workspace: (id: string) => `/app/projects/${id}/workspace`,
      submit: (id: string) => `/app/projects/${id}/submit`,
    },

    // Verifiable Skill Proof & Evidence
    skillProof: {
      root: "/app/skill-proof",
      skills: "/app/skill-proof/skills",
      evidence: "/app/skill-proof/evidence",
      projects: "/app/skill-proof/projects",
      certificates: "/app/skill-proof/certificates",
      achievements: "/app/skill-proof/achievements",
    },

    // AI Voice & Technical Interview Simulation
    interview: {
      root: "/app/interview",
      technical: "/app/interview/technical",
      hr: "/app/interview/hr",
      behavioral: "/app/interview/behavioral",
      communication: "/app/interview/communication",
      role: "/app/interview/role",
      company: "/app/interview/company",
      mock: "/app/interview/mock",
      history: "/app/interview/history",
      detail: (id: string) => `/app/interview/${id}`,
    },

    // ATS-Friendly Resume Suite
    resume: {
      root: "/app/resume",
      builder: "/app/resume/builder",
      versions: "/app/resume/versions",
      analyzer: "/app/resume/analyzer",
      jobMatch: "/app/resume/job-match",
      history: "/app/resume/history",
    },

    // Matching Opportunities Engine
    opportunities: {
      root: "/app/opportunities",
      jobs: "/app/opportunities/jobs",
      internships: "/app/opportunities/internships",
      startups: "/app/opportunities/startups",
      remote: "/app/opportunities/remote",
      recommended: "/app/opportunities/recommended",
      saved: "/app/opportunities/saved",
      eligibility: "/app/opportunities/eligibility",
      detail: (id: string) => `/app/opportunities/${id}`,
    },

    // Application Lifecycle Tracking
    applications: {
      root: "/app/applications",
      kanban: "/app/applications/kanban",
      timeline: "/app/applications/timeline",
      detail: (id: string) => `/app/applications/${id}`,
    },

    // System & Candidate Portals
    analytics: "/app/analytics",
    notifications: "/app/notifications",
    profile: "/app/profile",
    settings: "/app/settings",
  },
} as const;

/**
 * Route Aliases mapping legacy and alternate links to canonical routes
 */
export const LEGACY_ROUTE_MAP: Record<string, string> = {
  "/dashboard": ROUTES.app.dashboard,
  "/onboarding": ROUTES.onboarding,
  "/career-discovery": ROUTES.app.career.discover,
  "/assessment": ROUTES.app.assessments.root,
  "/assessment/results": ROUTES.app.assessments.results("baseline"),
  "/learning": ROUTES.app.learning.root,
  "/projects": ROUTES.app.projects.root,
  "/problem-solving": ROUTES.app.practice.root,
  "/interview": ROUTES.app.interview.root,
  "/resume": ROUTES.app.resume.root,
  "/opportunities": ROUTES.app.opportunities.root,
  "/applications": ROUTES.app.applications.root,
  "/feedback": ROUTES.app.improve.root,
  "/profile": ROUTES.app.profile,
  "/settings": ROUTES.app.settings,
  "/login": ROUTES.auth.login,
  "/signup": ROUTES.auth.signup,
};

export function getCanonicalRoute(path: string): string {
  if (LEGACY_ROUTE_MAP[path]) {
    return LEGACY_ROUTE_MAP[path];
  }
  return path;
}
