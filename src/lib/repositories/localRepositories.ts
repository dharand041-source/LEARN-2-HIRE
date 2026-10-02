import {
  UserRepository,
  CareerRepository,
  SkillRepository,
  AssessmentRepository,
  QuestionRepository,
  LearningRepository,
  PracticeRepository,
  ProjectRepository,
  EvidenceRepository,
  InterviewRepository,
  ResumeRepository,
  OpportunityRepository,
  ApplicationRepository,
  NotificationRepository,
  AnalyticsRepository,
  CandidateJourneyStage,
  SkillGapItem,
  SkillProofEvidence,
} from "./types";
import { UserProfile, CareerRole, AssessmentResult, LearningModule, ProjectItem, ProblemItem, InterviewSession, ResumeData, OpportunityItem, ApplicationItem, AtsCompatibilityAnalysis } from "@/types";
import { CAREER_ROLES, getCareerRoleBySlug, getCareerRoleById } from "@/data/careers";
import { getQuestionsForRole, TechnicalQuestion } from "@/data/questions";
import { LEARNING_MODULES } from "@/data/learning";
import { REAL_WORLD_PROJECTS } from "@/data/projects";
import { PROBLEM_ITEMS } from "@/data/problems";
import { EMPTY_RESUME_DATA } from "@/data/resume";
import { TECH_OPPORTUNITIES } from "@/data/opportunities";
import { NotificationItem, ZERO_USER_PROFILE } from "@/context/CareerContext";

function safeGetStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(`l2h_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function safeSetStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`l2h_${key}`, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors
  }
}

export class LocalUserRepository implements UserRepository {
  async getProfile(): Promise<UserProfile> {
    return safeGetStorage<UserProfile>("user_profile", {
      ...ZERO_USER_PROFILE,
      targetRole: "Full-Stack Developer",
    });
  }

  async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    const current = await this.getProfile();
    const updated = { ...current, ...profile };
    safeSetStorage("user_profile", updated);
    return updated;
  }

  async getJourneyStage(): Promise<CandidateJourneyStage> {
    return safeGetStorage<CandidateJourneyStage>("journey_stage", "CAREER_SELECTED");
  }

  async setJourneyStage(stage: CandidateJourneyStage): Promise<void> {
    safeSetStorage("journey_stage", stage);
  }

  async getTargetRole(): Promise<string> {
    const profile = await this.getProfile();
    return profile.targetRole || "Full-Stack Developer";
  }

  async setTargetRole(roleId: string): Promise<void> {
    const role = getCareerRoleById(roleId);
    await this.updateProfile({
      targetRole: role ? role.title : roleId,
      targetCategory: role ? role.category : "Software Development & Engineering",
    });
  }
}

export class LocalCareerRepository implements CareerRepository {
  async getAllRoles(): Promise<CareerRole[]> {
    return CAREER_ROLES;
  }

  async getRoleBySlug(slug: string): Promise<CareerRole | undefined> {
    return getCareerRoleBySlug(slug);
  }

  async getRoleById(id: string): Promise<CareerRole | undefined> {
    return getCareerRoleById(id);
  }
}

export class LocalSkillRepository implements SkillRepository {
  async getRequiredSkillsForRole(roleId: string): Promise<string[]> {
    const role = getCareerRoleById(roleId);
    return role ? role.primarySkills : ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git", "REST APIs", "Docker"];
  }

  async analyzeSkillGaps(roleId: string, assessmentResult: AssessmentResult | null): Promise<SkillGapItem[]> {
    const role = getCareerRoleById(roleId);
    const skills = role ? role.primarySkills : ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "REST APIs", "Git", "Docker"];

    const breakdownMap = new Map<string, number>();
    if (assessmentResult?.skillBreakdown) {
      assessmentResult.skillBreakdown.forEach((s) => breakdownMap.set(s.skill.toLowerCase(), s.score));
    }

    return skills.map((skillName) => {
      const matchScore = breakdownMap.get(skillName.toLowerCase());
      let currentLevel: "None" | "Beginner" | "Intermediate" | "Advanced" | "Expert" = "None";
      let gap: "None" | "Small" | "Moderate" | "Large" = "Large";
      let confidence: "High" | "Medium" | "Low" = "Low";
      let priority: "High" | "Medium" | "Low" = "High";
      let evidence = "No assessment evidence recorded yet.";

      if (matchScore !== undefined) {
        confidence = "High";
        evidence = `Assessment diagnostic score: ${matchScore}%`;
        if (matchScore >= 80) {
          currentLevel = "Advanced";
          gap = "None";
          priority = "Low";
        } else if (matchScore >= 60) {
          currentLevel = "Intermediate";
          gap = "Small";
          priority = "Medium";
        } else if (matchScore >= 35) {
          currentLevel = "Beginner";
          gap = "Moderate";
          priority = "High";
        } else {
          currentLevel = "Beginner";
          gap = "Large";
          priority = "High";
        }
      } else {
        // Defaults based on role core skills
        if (skillName.includes("Git") || skillName.includes("HTML")) {
          currentLevel = "Intermediate";
          gap = "Small";
          priority = "Low";
        } else if (skillName.includes("React") || skillName.includes("JavaScript")) {
          currentLevel = "Beginner";
          gap = "Moderate";
          priority = "High";
        } else {
          currentLevel = "None";
          gap = "Large";
          priority = "High";
        }
      }

      return {
        skill: skillName,
        category: role?.category || "Software Development & Engineering",
        requiredLevel: "Advanced",
        currentLevel,
        gap,
        evidence,
        confidence,
        priority,
        recommendedActions: [
          { title: `Learn ${skillName} Curriculum`, type: "learn", route: `/app/learning?skill=${encodeURIComponent(skillName)}` },
          { title: `Practice ${skillName} Exercises`, type: "practice", route: `/app/practice?skill=${encodeURIComponent(skillName)}` },
          { title: `Build ${skillName} Project`, type: "project", route: `/app/projects` },
          { title: `Reassess ${skillName}`, type: "reassess", route: `/app/improve/reassessment` },
        ],
      };
    });
  }
}

export class LocalAssessmentRepository implements AssessmentRepository {
  async getAssessment(id: string): Promise<any> {
    return { id, title: "Diagnostic Assessment" };
  }

  async saveResult(result: AssessmentResult): Promise<void> {
    safeSetStorage("latest_assessment_result", result);
    const history = safeGetStorage<AssessmentResult[]>("assessment_history", []);
    safeSetStorage("assessment_history", [result, ...history]);
  }

  async getLatestResult(roleId?: string): Promise<AssessmentResult | null> {
    const latest = safeGetStorage<AssessmentResult | null>("latest_assessment_result", null);
    if (!latest) return null;
    if (roleId && latest.roleId !== roleId) return latest; // Return latest attempt
    return latest;
  }

  async getHistory(): Promise<AssessmentResult[]> {
    return safeGetStorage<AssessmentResult[]>("assessment_history", []);
  }
}

export class LocalQuestionRepository implements QuestionRepository {
  async getQuestionsForRole(roleId: string, options?: { excludeIds?: string[]; count?: number }): Promise<TechnicalQuestion[]> {
    const questions = getQuestionsForRole(roleId, {
      excludeIds: options?.excludeIds,
      shuffle: true,
    });
    return questions.slice(0, options?.count || 10);
  }

  async recordQuestionAttempt(userId: string, questionId: string, isCorrect: boolean, timeTaken: number): Promise<void> {
    const attempts = safeGetStorage<any[]>("question_attempts", []);
    attempts.push({
      userId,
      questionId,
      isCorrect,
      timeTaken,
      attemptedAt: new Date().toISOString(),
    });
    safeSetStorage("question_attempts", attempts);
  }

  async getSeenQuestionIds(roleId: string): Promise<string[]> {
    const attempts = safeGetStorage<any[]>("question_attempts", []);
    return attempts.map((a) => a.questionId);
  }
}

export class LocalLearningRepository implements LearningRepository {
  async getModules(roleId: string): Promise<LearningModule[]> {
    return safeGetStorage<LearningModule[]>("learning_modules", LEARNING_MODULES);
  }

  async getModuleById(id: string): Promise<LearningModule | undefined> {
    const modules = await this.getModules("");
    return modules.find((m) => m.id === id);
  }

  async toggleTopicCompletion(moduleId: string, topicId: string): Promise<void> {
    const modules = await this.getModules("");
    const updated = modules.map((mod) => {
      if (mod.id !== moduleId) return mod;
      const updatedTopics = mod.topics.map((t) => (t.id === topicId ? { ...t, completed: !t.completed } : t));
      const completedCount = updatedTopics.filter((t) => t.completed).length;
      const progress = Math.round((completedCount / (updatedTopics.length || 1)) * 100);
      return {
        ...mod,
        topics: updatedTopics,
        progress,
        status: progress === 100 ? ("Completed" as const) : progress > 0 ? ("In Progress" as const) : mod.status,
      };
    });
    safeSetStorage("learning_modules", updated);
  }

  async getRoadmap(roleId: string, skillGaps?: SkillGapItem[]): Promise<any[]> {
    // Generate ordered steps based on gaps: highest gap first
    const role = getCareerRoleById(roleId);
    const skills = role?.primarySkills || ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "Git", "REST APIs", "Docker"];

    return skills.map((skill, index) => ({
      step: index + 1,
      title: `${skill} Mastery & Real-World Application`,
      skill,
      priority: index < 3 ? "High" : index < 6 ? "Medium" : "Normal",
      estimatedWeeks: "1-2 weeks",
      freeResources: [
        { title: `${skill} Full Handbook`, provider: "MDN Web Docs", url: "https://developer.mozilla.org" },
        { title: `${skill} Certification Track`, provider: "freeCodeCamp", url: "https://www.freecodecamp.org" },
      ],
      completed: false,
    }));
  }

  async getResources(): Promise<any[]> {
    return [
      { title: "CS50: Introduction to Computer Science", provider: "Harvard University", url: "https://cs50.harvard.edu", skill: "Computer Science", free: true },
      { title: "MDN Web Docs & JavaScript Guide", provider: "MDN Web Docs", url: "https://developer.mozilla.org", skill: "Web Fundamentals", free: true },
      { title: "Full Stack Open", provider: "University of Helsinki", url: "https://fullstackopen.com", skill: "Full-Stack Development", free: true },
      { title: "NPTEL Database Management Systems", provider: "IIT Madras / NPTEL", url: "https://nptel.ac.in", skill: "SQL & Databases", free: true },
      { title: "SQLBolt Interactive Lessons", provider: "SQLBolt", url: "https://sqlbolt.com", skill: "SQL", free: true },
      { title: "Missing Semester of CS Education", provider: "MIT OpenCourseWare", url: "https://missing.csail.mit.edu", skill: "Git, Bash & Tooling", free: true },
      { title: "AWS Skill Builder Digital Training", provider: "Amazon Web Services", url: "https://explore.skillbuilder.aws", skill: "Cloud Architecture", free: true },
      { title: "Microsoft Learn Developer Paths", provider: "Microsoft Learn", url: "https://learn.microsoft.com", skill: "TypeScript & Cloud", free: true },
    ];
  }
}

export class LocalPracticeRepository implements PracticeRepository {
  async getProblems(category?: string): Promise<ProblemItem[]> {
    if (!category) return PROBLEM_ITEMS;
    return PROBLEM_ITEMS.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()));
  }

  async getProblemById(id: string): Promise<ProblemItem | undefined> {
    return PROBLEM_ITEMS.find((p) => p.id === id);
  }

  async markSolved(problemId: string): Promise<void> {
    const solved = safeGetStorage<string[]>("solved_problems", []);
    if (!solved.includes(problemId)) {
      safeSetStorage("solved_problems", [...solved, problemId]);
    }
  }
}

export class LocalProjectRepository implements ProjectRepository {
  async getProjects(roleId?: string): Promise<ProjectItem[]> {
    const stored = safeGetStorage<ProjectItem[]>("user_projects", REAL_WORLD_PROJECTS);
    if (!roleId) return stored;
    return stored.filter((p) => p.roleId === roleId || p.roleId === "full-stack-dev" || p.roleId === "full-stack-developer");
  }

  async getProjectById(id: string): Promise<ProjectItem | undefined> {
    const projects = await this.getProjects();
    return projects.find((p) => p.id === id);
  }

  async saveSubmission(projectId: string, submission: { repoUrl: string; liveUrl?: string; docsUrl?: string; explanation?: string }): Promise<ProjectItem> {
    const projects = await this.getProjects();
    const updated = projects.map((p) => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        status: "Completed" as const,
        progressPercentage: 100,
        repoUrl: submission.repoUrl,
        liveUrl: submission.liveUrl,
        docsUrl: submission.docsUrl,
        evaluation: {
          overallScore: 92,
          evaluatedAt: new Date().toISOString(),
          rubric: [
            { criterion: "Architecture & Code Modularity", score: 28, maxScore: 30, feedback: "Clean component structure and separation of concerns." },
            { criterion: "API & Data Schema Design", score: 24, maxScore: 25, feedback: "Robust REST endpoints and validated inputs." },
            { criterion: "Security & Testing Coverage", score: 22, maxScore: 25, feedback: "Good unit test suite and environment configuration." },
            { criterion: "Deployment & Documentation", score: 18, maxScore: 20, feedback: "Live deployment verified with active health check." },
          ],
          strengths: ["Comprehensive README", "Clean Git commit history", "Production build passed"],
          areasToImprove: ["Add end-to-end integration tests", "Include rate limiting on auth endpoints"],
          recommendedNextSteps: ["Prepare technical STAR defense for voice mock interview", "Feature this project on your ATS resume"],
        },
      };
    });
    safeSetStorage("user_projects", updated);
    return updated.find((p) => p.id === projectId)!;
  }
}

export class LocalEvidenceRepository implements EvidenceRepository {
  async getAllEvidence(): Promise<SkillProofEvidence[]> {
    return safeGetStorage<SkillProofEvidence[]>("skill_evidence", [
      {
        id: "ev-1",
        skill: "Full-Stack Web Development",
        evidenceType: "Project",
        title: "Production E-Commerce Platform",
        description: "Implemented multi-tenant product store with Stripe webhook handling and PostgreSQL transactions.",
        verifiedAt: new Date().toISOString().split("T")[0],
        score: 92,
        url: "https://github.com/learn2hire/production-store",
        status: "Verified",
      },
      {
        id: "ev-2",
        skill: "JavaScript & TypeScript",
        evidenceType: "Assessment",
        title: "Technical Diagnostic Assessment",
        description: "Achieved verified 85% score on ES6+, async event loop, and TypeScript generics.",
        verifiedAt: new Date().toISOString().split("T")[0],
        score: 85,
        status: "Verified",
      },
    ]);
  }

  async addEvidence(item: Omit<SkillProofEvidence, "id" | "verifiedAt">): Promise<SkillProofEvidence> {
    const list = await this.getAllEvidence();
    const newEvidence: SkillProofEvidence = {
      ...item,
      id: `ev-${Date.now()}`,
      verifiedAt: new Date().toISOString().split("T")[0],
    };
    safeSetStorage("skill_evidence", [newEvidence, ...list]);
    return newEvidence;
  }
}

export class LocalInterviewRepository implements InterviewRepository {
  async getSessions(): Promise<InterviewSession[]> {
    return safeGetStorage<InterviewSession[]>("interview_sessions", []);
  }

  async saveSession(session: InterviewSession): Promise<void> {
    const sessions = await this.getSessions();
    safeSetStorage("interview_sessions", [session, ...sessions]);
  }
}

export class LocalResumeRepository implements ResumeRepository {
  async getResumeData(): Promise<ResumeData> {
    return safeGetStorage<ResumeData>("user_resume_data", EMPTY_RESUME_DATA);
  }

  async saveResumeData(data: ResumeData): Promise<void> {
    safeSetStorage("user_resume_data", data);
  }

  async getAnalysis(): Promise<AtsCompatibilityAnalysis | null> {
    return safeGetStorage<AtsCompatibilityAnalysis | null>("resume_ats_analysis", null);
  }

  async saveAnalysis(analysis: AtsCompatibilityAnalysis): Promise<void> {
    safeSetStorage("resume_ats_analysis", analysis);
  }
}

export class LocalOpportunityRepository implements OpportunityRepository {
  async getOpportunities(filters?: { type?: string; workMode?: string; search?: string }): Promise<OpportunityItem[]> {
    let list = safeGetStorage<OpportunityItem[]>("job_opportunities", TECH_OPPORTUNITIES);
    if (filters?.type && filters.type !== "all") {
      list = list.filter((item) => item.type.toLowerCase() === filters.type!.toLowerCase());
    }
    if (filters?.workMode && filters.workMode !== "all") {
      list = list.filter((item) => item.workMode.toLowerCase() === filters.workMode!.toLowerCase());
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((item) => item.role.toLowerCase().includes(q) || item.company.toLowerCase().includes(q) || item.location.toLowerCase().includes(q));
    }
    return list;
  }

  async getOpportunityById(id: string): Promise<OpportunityItem | undefined> {
    const opps = await this.getOpportunities();
    return opps.find((o) => o.id === id);
  }

  async toggleSave(id: string): Promise<boolean> {
    const opps = await this.getOpportunities();
    let newSavedState = false;
    const updated = opps.map((o) => {
      if (o.id === id) {
        newSavedState = !o.saved;
        return { ...o, saved: newSavedState };
      }
      return o;
    });
    safeSetStorage("job_opportunities", updated);
    return newSavedState;
  }
}

export class LocalApplicationRepository implements ApplicationRepository {
  async getApplications(): Promise<ApplicationItem[]> {
    return safeGetStorage<ApplicationItem[]>("user_applications", []);
  }

  async getApplicationById(id: string): Promise<ApplicationItem | undefined> {
    const apps = await this.getApplications();
    return apps.find((a) => a.id === id);
  }

  async addApplication(app: Omit<ApplicationItem, "id" | "appliedDate" | "lastUpdated">): Promise<ApplicationItem> {
    const apps = await this.getApplications();
    const today = new Date().toISOString().split("T")[0];
    const newApp: ApplicationItem = {
      ...app,
      id: `app-${Date.now()}`,
      appliedDate: today,
      lastUpdated: today,
    };
    safeSetStorage("user_applications", [newApp, ...apps]);
    return newApp;
  }

  async updateStatus(id: string, status: any, notes?: string): Promise<void> {
    const apps = await this.getApplications();
    const today = new Date().toISOString().split("T")[0];
    const updated = apps.map((a) => (a.id === id ? { ...a, status, lastUpdated: today, notes: notes !== undefined ? notes : a.notes } : a));
    safeSetStorage("user_applications", updated);
  }
}

export class LocalNotificationRepository implements NotificationRepository {
  async getNotifications(): Promise<NotificationItem[]> {
    return safeGetStorage<NotificationItem[]>("notifications", [
      {
        id: "notif-1",
        title: "Welcome to Learn-2-Hire",
        message: "Your career readiness journey is ready. Start by taking your diagnostic assessment.",
        timestamp: "Just now",
        read: false,
        type: "info",
        link: "/app/assessments/baseline",
      },
    ]);
  }

  async markRead(id: string): Promise<void> {
    const list = await this.getNotifications();
    const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
    safeSetStorage("notifications", updated);
  }

  async clearAll(): Promise<void> {
    safeSetStorage("notifications", []);
  }
}

export class LocalAnalyticsRepository implements AnalyticsRepository {
  async getAnalyticsSummary(): Promise<any> {
    return {
      overallReadiness: 78,
      percentile: 84,
      assessmentsCount: 3,
      verifiedCapstones: 1,
      mockInterviews: 2,
      atsScanScore: 82,
      applicationsSubmitted: 2,
      interviewOffers: 1,
    };
  }
}
