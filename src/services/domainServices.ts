import {
  LocalUserRepository,
  LocalCareerRepository,
  LocalSkillRepository,
  LocalAssessmentRepository,
  LocalQuestionRepository,
  LocalLearningRepository,
  LocalPracticeRepository,
  LocalProjectRepository,
  LocalEvidenceRepository,
  LocalInterviewRepository,
  LocalResumeRepository,
  LocalOpportunityRepository,
  LocalApplicationRepository,
  LocalNotificationRepository,
  LocalAnalyticsRepository,
} from "@/lib/repositories/localRepositories";
import { CandidateJourneyStage, SkillGapItem } from "@/lib/repositories/types";
import { UserProfile, CareerRole, AssessmentResult, LearningModule, ProjectItem, ProblemItem, InterviewSession, ResumeData, OpportunityItem, ApplicationItem, AtsCompatibilityAnalysis } from "@/types";
import { TechnicalQuestion } from "@/data/questions";
import { ROUTES } from "@/lib/routes";

// Instantiate singletons
export const userRepo = new LocalUserRepository();
export const careerRepo = new LocalCareerRepository();
export const skillRepo = new LocalSkillRepository();
export const assessmentRepo = new LocalAssessmentRepository();
export const questionRepo = new LocalQuestionRepository();
export const learningRepo = new LocalLearningRepository();
export const practiceRepo = new LocalPracticeRepository();
export const projectRepo = new LocalProjectRepository();
export const evidenceRepo = new LocalEvidenceRepository();
export const interviewRepo = new LocalInterviewRepository();
export const resumeRepo = new LocalResumeRepository();
export const opportunityRepo = new LocalOpportunityRepository();
export const applicationRepo = new LocalApplicationRepository();
export const notificationRepo = new LocalNotificationRepository();
export const analyticsRepo = new LocalAnalyticsRepository();

/**
 * 1. AuthService
 * Supports local mock authentication for fast development and Supabase OAuth ready
 */
export class AuthService {
  async getCurrentUser() {
    const profile = await userRepo.getProfile();
    return {
      id: "user-dev-local",
      email: profile.email || "candidate@learn2hire.dev",
      name: profile.name || "Candidate",
    };
  }

  async signInWithGoogle(safeNext: string = ROUTES.app.dashboard) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("l2h_post_login_intro", "pending");
      localStorage.setItem("l2h_auth_mode", "local");
      localStorage.setItem("l2h_is_authenticated", "true");
    }
    await userRepo.updateProfile({
      name: "Alex Morgan",
      email: "alex.morgan@gmail.com",
    });
    return { success: true, redirectUrl: safeNext };
  }

  async signInWithEmail(email: string, fullName?: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("l2h_auth_mode", "local");
      localStorage.setItem("l2h_is_authenticated", "true");
    }
    await userRepo.updateProfile({
      name: fullName || "Candidate",
      email: email,
    });
    return { success: true };
  }

  async signOut() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("l2h_is_authenticated");
      localStorage.removeItem("l2h_auth_mode");
    }
  }

  isAuthenticated(): boolean {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("l2h_is_authenticated") === "true";
  }
}

/**
 * 2. OnboardingService
 */
export class OnboardingService {
  async submitOnboarding(data: {
    fullName: string;
    education: string;
    experienceLevel: string;
    currentSkills: string[];
    careerGoal: string;
    targetRole: string;
    preferredWorkType: string;
  }) {
    await userRepo.updateProfile({
      name: data.fullName,
      targetRole: data.targetRole,
    });
    await userRepo.setTargetRole(data.targetRole);
    await userRepo.setJourneyStage("BASELINE_ASSESSMENT");
    return { nextRoute: ROUTES.app.assessments.baseline };
  }
}

/**
 * 3. CareerService
 */
export class CareerService {
  async getRoles() {
    return careerRepo.getAllRoles();
  }

  async getRole(slugOrId: string) {
    return careerRepo.getRoleBySlug(slugOrId);
  }

  async setTargetRole(roleId: string) {
    await userRepo.setTargetRole(roleId);
    await userRepo.setJourneyStage("BASELINE_ASSESSMENT");
  }
}

/**
 * 4. SkillService
 */
export class SkillService {
  async getSkillsForRole(roleId: string) {
    return skillRepo.getRequiredSkillsForRole(roleId);
  }
}

/**
 * 5. AssessmentService
 */
export class AssessmentService {
  async generateBaselineAssessment(roleId: string): Promise<TechnicalQuestion[]> {
    const seenIds = await questionRepo.getSeenQuestionIds(roleId);
    return questionRepo.getQuestionsForRole(roleId, {
      excludeIds: seenIds,
      count: 10,
    });
  }

  async submitAssessment(
    roleId: string,
    answers: Record<string, string>,
    questions: TechnicalQuestion[]
  ): Promise<AssessmentResult> {
    let correctCount = 0;
    const skillScoreAccumulator: Record<string, { total: number; correct: number }> = {};

    questions.forEach((q) => {
      const isCorrect = answers[q.id] === q.correctAnswer;
      if (isCorrect) correctCount++;

      const skill = q.skill || "Technical Fundamentals";
      if (!skillScoreAccumulator[skill]) {
        skillScoreAccumulator[skill] = { total: 0, correct: 0 };
      }
      skillScoreAccumulator[skill].total++;
      if (isCorrect) skillScoreAccumulator[skill].correct++;

      questionRepo.recordQuestionAttempt("candidate", q.id, isCorrect, 45);
    });

    const score = Math.round((correctCount / (questions.length || 1)) * 100);

    const skillBreakdown = Object.entries(skillScoreAccumulator).map(([skill, data]) => {
      const skillScore = Math.round((data.correct / data.total) * 100);
      return {
        skill,
        score: skillScore,
        status: (skillScore >= 80 ? "Strong" : skillScore >= 60 ? "Moderate" : "Needs Improvement") as "Strong" | "Moderate" | "Needs Improvement",
      };
    });

    const strongAreas = skillBreakdown.filter((s) => s.score >= 75).map((s) => `${s.skill} (${s.score}%)`);
    const needsImprovement = skillBreakdown.filter((s) => s.score < 75).map((s) => `${s.skill} (${s.score}%)`);

    const result: AssessmentResult = {
      score,
      totalQuestions: questions.length,
      completedAt: new Date().toISOString().split("T")[0],
      roleId,
      roleTitle: (await careerRepo.getRoleById(roleId))?.title || "Full-Stack Developer",
      correctCount,
      wrongCount: questions.length - correctCount,
      skillBreakdown,
      strongAreas,
      needsImprovement,
      recommendations: [
        `Complete targeted modules in ${needsImprovement[0] || "core competencies"}.`,
        "Work on real-world projects to validate your skills.",
      ],
    };

    await assessmentRepo.saveResult(result);
    await userRepo.updateProfile({
      readinessScore: score,
      focusArea: needsImprovement.length > 0 ? needsImprovement[0].split("(")[0].trim() : "",
    });
    await userRepo.setJourneyStage("SKILL_ANALYZED");

    return result;
  }
}

/**
 * 6. QuestionService
 */
export class QuestionService {
  async getQuestions(roleId: string, count: number = 10) {
    return questionRepo.getQuestionsForRole(roleId, { count });
  }
}

/**
 * 7. SkillAnalysisService
 */
export class SkillAnalysisService {
  async getSkillGaps(roleId?: string): Promise<SkillGapItem[]> {
    const target = roleId || (await userRepo.getTargetRole());
    const latestResult = await assessmentRepo.getLatestResult();
    return skillRepo.analyzeSkillGaps(target, latestResult);
  }
}

/**
 * 8. LearningService
 */
export class LearningService {
  async getRoadmap(roleId?: string) {
    const target = roleId || (await userRepo.getTargetRole());
    const gaps = await skillRepo.analyzeSkillGaps(target, await assessmentRepo.getLatestResult());
    return learningRepo.getRoadmap(target, gaps);
  }

  async getFreeResources() {
    return learningRepo.getResources();
  }

  async getModules(roleId?: string) {
    const target = roleId || (await userRepo.getTargetRole());
    return learningRepo.getModules(target);
  }
}

/**
 * 9. PracticeService
 */
export class PracticeService {
  async getProblems(category?: string) {
    return practiceRepo.getProblems(category);
  }

  async solveProblem(problemId: string) {
    await practiceRepo.markSolved(problemId);
  }
}

/**
 * 10. ProjectService
 */
export class ProjectService {
  async getProjects(roleId?: string) {
    return projectRepo.getProjects(roleId);
  }

  async submitProject(id: string, submission: { repoUrl: string; liveUrl?: string; docsUrl?: string; explanation?: string }) {
    const project = await projectRepo.saveSubmission(id, submission);
    await evidenceRepo.addEvidence({
      skill: project.skillsTested[0] || "Software Engineering",
      evidenceType: "Project",
      title: project.title,
      description: project.description,
      score: project.evaluation?.overallScore || 90,
      url: submission.repoUrl,
      status: "Verified",
    });
    await userRepo.setJourneyStage("INTERVIEW_READY");
    return project;
  }
}

/**
 * 11. EvidenceService
 */
export class EvidenceService {
  async getAll() {
    return evidenceRepo.getAllEvidence();
  }
}

/**
 * 12. InterviewService
 */
export class InterviewService {
  async getSessions() {
    return interviewRepo.getSessions();
  }

  async saveSession(session: InterviewSession) {
    await interviewRepo.saveSession(session);
    await userRepo.setJourneyStage("RESUME_READY");
  }
}

/**
 * 13. ResumeService
 */
export class ResumeService {
  async getResume() {
    return resumeRepo.getResumeData();
  }

  async saveResume(data: ResumeData) {
    return resumeRepo.saveResumeData(data);
  }

  async analyzeResume(): Promise<AtsCompatibilityAnalysis> {
    const mockAnalysis: AtsCompatibilityAnalysis = {
      atsCompatibilityScore: 84,
      overallScore: 84,
      targetRole: "Full-Stack Developer",
      breakdown: {
        formatAndParsing: 18,
        requiredSections: 14,
        keywordAndSkillAlignment: 22,
        roleAndTitleAlignment: 9,
        experienceRelevance: 8,
        projectRelevance: 4,
        educationAndCertRelevance: 4,
        achievementQuality: 4,
        contactCompleteness: 5,
      },
      scoreBreakdown: {
        parsingAndFormat: { score: 18, max: 20 },
        requiredSections: { score: 14, max: 15 },
        keywordAndSkills: { score: 22, max: 25 },
        roleAlignment: { score: 9, max: 10 },
        experienceRelevance: { score: 8, max: 10 },
        projectRelevance: { score: 4, max: 5 },
        educationCert: { score: 4, max: 5 },
        achievements: { score: 4, max: 5 },
        contactCompleteness: { score: 5, max: 5 },
      },
      formatChecks: [
        { check: "Single column ATS structure", status: "PASS", feedback: "Clean single column layout detected" },
        { check: "Standard heading tags", status: "PASS", feedback: "Recognizable section headers used" },
        { check: "Contact information complete", status: "PASS", feedback: "Email, GitHub, and LinkedIn verified" },
      ],
      matchedSkills: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST APIs", "Git", "Docker", "Tailwind CSS"],
      matchedRoleSkills: ["React", "Node.js", "TypeScript", "SQL"],
      missingSkills: ["AWS", "Microservices"],
      missingRoleSkills: ["AWS"],
      issues: ["Cloud deployment experience could be highlighted more prominently"],
      recommendations: ["Mention cloud hosting experience (AWS / Vercel)", "Highlight testing frameworks used"],
      disclaimer: "Learn-2-Hire compatibility estimate (not an official ATS score).",
      analyzedAt: new Date().toISOString(),
    };
    await resumeRepo.saveAnalysis(mockAnalysis);
    await userRepo.setJourneyStage("OPPORTUNITY_READY");
    return mockAnalysis;
  }
}

/**
 * 14. OpportunityService
 */
export class OpportunityService {
  async getOpportunities(filters?: { type?: string; workMode?: string; search?: string }) {
    return opportunityRepo.getOpportunities(filters);
  }

  async getOpportunity(id: string) {
    return opportunityRepo.getOpportunityById(id);
  }
}

/**
 * 15. EligibilityService
 */
export class EligibilityService {
  checkEligibility(job: OpportunityItem, profile: UserProfile) {
    const matchedCount = job.matchedSkills?.length || 0;
    const requiredCount = (job.matchedSkills?.length || 0) + (job.skillGaps?.length || 0);

    if (matchedCount >= 3 && (job.skillGaps?.length || 0) <= 2) {
      return {
        status: "ELIGIBLE" as const,
        reason: "You satisfy the essential technical requirements and experience benchmark.",
        matchedSkills: job.matchedSkills,
        missingSkills: job.skillGaps,
      };
    }
    if (matchedCount >= 1) {
      return {
        status: "POSSIBLY ELIGIBLE" as const,
        reason: "You meet some required skills, but addressing minor gaps will significantly improve your chances.",
        matchedSkills: job.matchedSkills,
        missingSkills: job.skillGaps,
      };
    }
    return {
      status: "REQUIREMENTS MISSING" as const,
      reason: "Key required competencies have not yet been demonstrated in your assessment or project portfolio.",
      matchedSkills: job.matchedSkills,
      missingSkills: job.skillGaps,
    };
  }
}

/**
 * 16. JobMatchingService
 */
export class JobMatchingService {
  calculateMatch(job: OpportunityItem, profile: UserProfile, analysis: AtsCompatibilityAnalysis | null) {
    const resumeScore = analysis?.overallScore || 75;
    const skillScore = job.matchPercentage || 80;
    const combinedScore = Math.round(resumeScore * 0.4 + skillScore * 0.6);

    return {
      matchScore: combinedScore,
      roleAlignment: combinedScore >= 80 ? "Strong" : "Moderate",
      matchedSkills: job.matchedSkills || ["React", "TypeScript", "Node.js"],
      missingSkills: job.skillGaps || ["Docker", "AWS"],
      explanation: `Matched ${job.matchedSkills?.length || 3} verified skills from your profile with strong role alignment for ${job.role}.`,
    };
  }
}

/**
 * 17. ApplicationService
 */
export class ApplicationService {
  async getApplications() {
    return applicationRepo.getApplications();
  }

  async apply(job: OpportunityItem, notes?: string) {
    const app = await applicationRepo.addApplication({
      opportunityId: job.id,
      company: job.company,
      role: job.role,
      type: job.type,
      location: job.location,
      status: "Applied",
      salary: job.salary,
      matchScore: job.matchPercentage,
      notes: notes || "Direct application submitted via verified employer portal.",
    });
    await userRepo.setJourneyStage("APPLIED");
    return app;
  }

  async updateStatus(id: string, status: any, notes?: string) {
    await applicationRepo.updateStatus(id, status, notes);
    if (status === "Rejected") {
      await userRepo.setJourneyStage("RETRAINING");
    }
  }
}

/**
 * 18. OutcomeService
 */
export class OutcomeService {
  async recordOutcome(applicationId: string, outcome: "Offer" | "Rejected", reason?: string) {
    await applicationRepo.updateStatus(applicationId, outcome, reason ? `Outcome: ${outcome}. Reason: ${reason}` : `Outcome: ${outcome}. Reason not provided.`);
    if (outcome === "Rejected") {
      await userRepo.setJourneyStage("RETRAINING");
    }
  }
}

/**
 * 19. ImprovementService
 */
export class ImprovementService {
  async getRetrainingPlan(rejectedReason?: string) {
    return {
      title: "Targeted Retraining & Recovery Roadmap",
      summary: "Based on recent feedback and identified skill gaps, complete these targeted recovery modules before reassessment.",
      actionItems: [
        { area: "System Architecture & Deep Dive", action: "Review asynchronous microtasks and SQL indexes in Learning track", route: ROUTES.app.learning.roadmap },
        { area: "Live Coding Practice", action: "Solve 5 medium-level problem solving challenges", route: ROUTES.app.practice.dsa },
        { area: "Reassessment Gate", action: "Take targeted adaptive reassessment to update your verified score", route: ROUTES.app.improve.reassessment },
      ],
    };
  }
}

/**
 * 20. RecommendationService
 */
export class RecommendationService {
  async getRecommendations() {
    return [
      { type: "learn", title: "Review Node.js REST API patterns", route: ROUTES.app.learning.root },
      { type: "practice", title: "Practice SQL Index optimization", route: ROUTES.app.practice.sql },
      { type: "project", title: "Build real-time chat capstone", route: ROUTES.app.projects.root },
    ];
  }
}

/**
 * 21. NotificationService
 */
export class NotificationService {
  async getNotifications() {
    return notificationRepo.getNotifications();
  }

  async markRead(id: string) {
    return notificationRepo.markRead(id);
  }
}

/**
 * 22. AnalyticsService
 */
export class AnalyticsService {
  async getAnalytics() {
    return analyticsRepo.getAnalyticsSummary();
  }
}

/**
 * 23. NextActionService
 * Evaluates candidate state and determines the next recommended high-value action
 */
export class NextActionService {
  async determineNextAction(): Promise<{
    stage: CandidateJourneyStage;
    actionLabel: string;
    actionDescription: string;
    actionRoute: string;
    badgeText: string;
  }> {
    const profile = await userRepo.getProfile();
    const stage = await userRepo.getJourneyStage();
    const latestAssessment = await assessmentRepo.getLatestResult();
    const projects = await projectRepo.getProjects();
    const completedProjects = projects.filter((p) => p.status === "Completed");
    const resumeAnalysis = await resumeRepo.getAnalysis();
    const applications = await applicationRepo.getApplications();
    const hasRejectedApp = applications.some((a) => a.status === "Rejected");

    if (!profile.targetRole) {
      return {
        stage: "AUTHENTICATED",
        actionLabel: "Choose Target Career",
        actionDescription: "Explore 24+ engineering pathways and select your primary career specialization.",
        actionRoute: ROUTES.app.career.discover,
        badgeText: "Step 1 of 8",
      };
    }

    if (!latestAssessment) {
      return {
        stage: "CAREER_SELECTED",
        actionLabel: `Take Baseline Assessment for ${profile.targetRole}`,
        actionDescription: "Complete your 10-question diagnostic evaluation to benchmark your initial skills.",
        actionRoute: ROUTES.app.assessments.baseline,
        badgeText: "Diagnostic Ready",
      };
    }

    if (hasRejectedApp && stage === "RETRAINING") {
      return {
        stage: "RETRAINING",
        actionLabel: "Review Improvement Plan & Reassess",
        actionDescription: "Target identified deficiencies from your application and retake the focused reassessment.",
        actionRoute: ROUTES.app.improve.reassessment,
        badgeText: "Recovery Loop",
      };
    }

    if (completedProjects.length === 0) {
      return {
        stage: "PROJECT_ACTIVE",
        actionLabel: "Build Production Capstone Project",
        actionDescription: "Build and submit a verified full-stack project with GitHub repo and live URL.",
        actionRoute: ROUTES.app.projects.root,
        badgeText: "Verifiable Proof",
      };
    }

    if (!resumeAnalysis || (resumeAnalysis.atsCompatibilityScore ?? 0) < 75) {
      return {
        stage: "RESUME_READY",
        actionLabel: "Complete ATS Resume & Run Scan",
        actionDescription: "Ensure your single-column ATS resume meets the Learn-2-Hire readiness threshold.",
        actionRoute: ROUTES.app.resume.analyzer,
        badgeText: "Readiness Gate",
      };
    }

    if (applications.length === 0) {
      return {
        stage: "OPPORTUNITY_READY",
        actionLabel: "Explore Matching Job Opportunities",
        actionDescription: "Your resume is verified! Browse direct applications matched to your skills.",
        actionRoute: ROUTES.app.opportunities.jobs,
        badgeText: "Ready to Apply",
      };
    }

    return {
      stage: "APPLIED",
      actionLabel: "Track Application Progress",
      actionDescription: "Review your active pipeline on the 7-stage Kanban application board.",
      actionRoute: ROUTES.app.applications.kanban,
      badgeText: "In Pipeline",
    };
  }
}

// Export pre-instantiated service instances
export const authService = new AuthService();
export const onboardingService = new OnboardingService();
export const careerService = new CareerService();
export const skillService = new SkillService();
export const assessmentService = new AssessmentService();
export const questionService = new QuestionService();
export const skillAnalysisService = new SkillAnalysisService();
export const learningService = new LearningService();
export const practiceService = new PracticeService();
export const projectService = new ProjectService();
export const evidenceService = new EvidenceService();
export const interviewService = new InterviewService();
export const resumeService = new ResumeService();
export const opportunityService = new OpportunityService();
export const eligibilityService = new EligibilityService();
export const jobMatchingService = new JobMatchingService();
export const applicationService = new ApplicationService();
export const outcomeService = new OutcomeService();
export const improvementService = new ImprovementService();
export const recommendationService = new RecommendationService();
export const notificationService = new NotificationService();
export const analyticsService = new AnalyticsService();
export const nextActionService = new NextActionService();
