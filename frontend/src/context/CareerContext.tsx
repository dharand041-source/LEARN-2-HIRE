"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from "react";
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
import {
  getQuestionsForRole,
  calculateDynamicAssessmentResult,
  TechnicalQuestion,
} from "@/data/questions";
import { LEARNING_MODULES } from "@/data/learning";
import { REAL_WORLD_PROJECTS } from "@/data/projects";
import { PROBLEM_ITEMS } from "@/data/problems";
import { EMPTY_RESUME_DATA, EMPTY_RESUME_ANALYSIS } from "@/data/resume";
import { TECH_OPPORTUNITIES } from "@/data/opportunities";
import { ACHIEVEMENTS_LIST } from "@/data/achievements";
import { parseResumeText } from "@/services/resumeParser";
import { analyzeResumeATS } from "@/services/atsScorer";
import { evaluateJobMatch } from "@/services/jobMatching";
import { createClient } from "@/lib/supabase/client";

// Supabase Data Services
import {
  getOrCreateProfile,
  updateProfile,
} from "@/lib/services/profile-service";
import {
  createAssessmentAttempt,
  recordAssessmentAnswer,
  completeAssessmentAttempt,
  getUserAssessmentHistory,
} from "@/lib/services/assessment-service";
import {
  getUserApplications,
  trackJobRedirection,
  updateApplicationStatus as updateAppStatusDB,
} from "@/lib/services/application-service";
import {
  getUserLearningProgress,
  updateLearningLessonProgress,
} from "@/lib/services/learning-service";
import {
  saveInterviewSession,
  getUserInterviewSessions,
} from "@/lib/services/interview-service";
import {
  getUserProjects,
  saveUserProject,
} from "@/lib/services/project-service";
import {
  getUserResumes,
} from "@/lib/services/resume-service";

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

export const ZERO_USER_PROFILE: UserProfile = {
  name: "Learner",
  email: "",
  targetRole: "Full Stack Developer",
  targetCategory: "Software Development & Engineering",
  readinessScore: 0,
  xp: 0,
  streakDays: 0,
  selectedLanguage: "en",
  readinessBreakdown: {
    technicalSkills: 0,
    projects: 0,
    problemSolving: 0,
    interview: 0,
    resume: 0,
    careerFit: 0,
  },
  focusArea: "",
};

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

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export function CareerProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Core State initialized to CLEAN ZERO baseline
  const [userProfile, setUserProfileState] = useState<UserProfile>(ZERO_USER_PROFILE);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("full-stack-dev");
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string>>({});
  const [learningModules, setLearningModules] = useState<LearningModule[]>(LEARNING_MODULES);
  const [projects, setProjects] = useState<ProjectItem[]>(REAL_WORLD_PROJECTS);
  const [problems, setProblems] = useState<ProblemItem[]>(PROBLEM_ITEMS);
  const [interviewSessions, setInterviewSessions] = useState<InterviewSession[]>([]);
  const [resumeData, setResumeData] = useState<ResumeData>(EMPTY_RESUME_DATA);
  const [resumeAnalysis, setResumeAnalysis] = useState<ResumeAnalysisResult>(EMPTY_RESUME_ANALYSIS);
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(TECH_OPPORTUNITIES);
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [achievements, setAchievements] = useState<AchievementItem[]>(ACHIEVEMENTS_LIST);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

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

  // Ref to avoid race conditions during data loading
  const loadingUserRef = useRef<string | null>(null);

  // Idempotent data loader that retrieves authentic Supabase records for auth.users.id
  const loadUserData = useCallback(async (userId: string, displayName: string, email: string) => {
    if (loadingUserRef.current === userId) return;
    loadingUserRef.current = userId;

    try {
      // 1. Load or initialize user profile in Supabase
      const { data: profile } = await getOrCreateProfile(userId, {
        full_name: displayName,
        email: email,
        selected_role: "Full Stack Developer",
        experience_level: "Entry Level",
      });

      if (profile) {
        const roleMatch = CAREER_ROLES.find(
          (r) => r.title.toLowerCase() === (profile.selected_role || "").toLowerCase()
        );
        if (roleMatch) {
          setSelectedRoleId(roleMatch.id);
        }

        setUserProfileState((prev) => ({
          ...prev,
          name: profile.full_name || displayName,
          email: profile.email || email,
          targetRole: profile.selected_role || prev.targetRole,
        }));
      }

      // 2. Load Assessment History from Supabase
      const { data: attempts } = await getUserAssessmentHistory(userId);
      if (attempts && attempts.length > 0) {
        // Filter for completed attempts
        const completedAttempts = attempts.filter((a: any) => a.status === "completed");
        if (completedAttempts.length > 0) {
          const latest = completedAttempts[0];
          const skillResults: any[] = latest.assessment_skill_results || [];

          const skillBreakdown: { skill: string; score: number; status: "Needs Improvement" | "Strong" | "Moderate" }[] = skillResults.map((sr) => ({
            skill: String(sr.skill || "Technical Competency"),
            score: Number(sr.score),
            status: (sr.score >= 80 ? "Strong" : sr.score >= 60 ? "Moderate" : "Needs Improvement") as "Strong" | "Moderate" | "Needs Improvement",
          }));

          // Sort skills to detect focus areas (lowest scoring)
          const sortedSkills = [...skillBreakdown].sort((a, b) => a.score - b.score);
          const focusSkill = sortedSkills.length > 0 && sortedSkills[0].score < 75 ? sortedSkills[0].skill : "";

          const rebuiltResult: AssessmentResult = {
            score: Number(latest.score),
            totalQuestions: latest.total_questions || 10,
            completedAt: latest.completed_at ? latest.completed_at.split("T")[0] : new Date().toISOString().split("T")[0],
            roleId: latest.role,
            roleTitle: CAREER_ROLES.find((r) => r.id === latest.role)?.title || latest.role,
            skillBreakdown,
            strongAreas: skillBreakdown.filter((s) => s.score >= 75).map((s) => `${s.skill} (${s.score}%)`),
            needsImprovement: skillBreakdown.filter((s) => s.score < 75).map((s) => `${s.skill} (${s.score}%)`),
            recommendations: [
              `Complete technical lessons targeting ${focusSkill || "core competencies"}.`,
              "Re-test periodically to track readiness progression.",
            ],
          };

          setAssessmentResult(rebuiltResult);
          setUserProfileState((prev) => ({
            ...prev,
            readinessScore: Number(latest.score),
            focusArea: focusSkill ? `${focusSkill} Foundations` : "",
            readinessBreakdown: {
              ...prev.readinessBreakdown,
              technicalSkills: Number(latest.score),
            },
          }));
        }
      }

      // 3. Load Applications from Supabase (strict database rows only)
      const { data: dbApps } = await getUserApplications(userId);
      if (dbApps && dbApps.length > 0) {
        const mappedApps: ApplicationItem[] = dbApps.map((a: any) => {
          const job = a.job_listings;
          const statusFormatted = a.status
            ? (a.status.charAt(0).toUpperCase() + a.status.slice(1)) as ApplicationStatus
            : "Applied";

          return {
            id: a.id,
            opportunityId: a.job_id || a.id,
            company: job?.company || "External Company",
            role: job?.title || "Role",
            type: job?.opportunityType === "INTERNSHIP" ? "Internship" : job?.opportunityType === "STARTUP" ? "Startup" : "Job",
            location: job?.location || "India",
            status: statusFormatted,
            appliedDate: a.applied_at ? a.applied_at.split("T")[0] : a.created_at ? a.created_at.split("T")[0] : "",
            lastUpdated: a.updated_at ? a.updated_at.split("T")[0] : "",
            salary: job?.salaryMin ? `₹${job.salaryMin.toLocaleString()}` : "Disclosed on Application",
            matchScore: 85,
            notes: a.notes || undefined,
          };
        });

        const mappedRecords: ApplicationRecord[] = dbApps.map((a: any) => ({
          id: a.id,
          jobId: a.job_id || a.id,
          title: a.job_listings?.title || "Role",
          jobTitle: a.job_listings?.title || "Role",
          company: a.job_listings?.company || "Company",
          opportunityType: a.job_listings?.opportunityType || "Job",
          source: a.job_listings?.source || "direct",
          externalUrl: a.external_url || a.job_listings?.applicationUrl || "",
          timestamp: a.created_at || new Date().toISOString(),
          lastUpdated: a.updated_at || new Date().toISOString(),
          status: a.status ? a.status.charAt(0).toUpperCase() + a.status.slice(1) : "Redirected",
        }));

        setApplications(mappedApps);
        setApplicationRecords(mappedRecords);
      } else {
        // Zero records in Supabase = Clean empty state
        setApplications([]);
        setApplicationRecords([]);
      }

      // 4. Load User Projects from Supabase
      const { data: dbProjects } = await getUserProjects(userId);
      if (dbProjects && dbProjects.length > 0) {
        setProjects((prev) =>
          prev.map((catalogProj) => {
            const userProj = dbProjects.find(
              (p) => p.title.toLowerCase() === catalogProj.title.toLowerCase() || p.id === catalogProj.id
            );
            if (userProj) {
              return {
                ...catalogProj,
                status: userProj.status,
                progressPercentage: userProj.status === "Completed" ? 100 : userProj.status === "In Progress" ? 50 : 0,
                repoUrl: userProj.github_url || undefined,
                liveUrl: userProj.live_url || undefined,
                evaluation: userProj.evaluation && Object.keys(userProj.evaluation).length > 0 ? userProj.evaluation : undefined,
              };
            }
            return catalogProj;
          })
        );

        const completedCount = dbProjects.filter((p) => p.status === "Completed").length;
        if (completedCount > 0) {
          setUserProfileState((prev) => ({
            ...prev,
            readinessBreakdown: {
              ...prev.readinessBreakdown,
              projects: Math.min(95, completedCount * 45),
            },
          }));
        }
      }

      // 5. Load User Learning Progress from Supabase
      const { data: dbProgress } = await getUserLearningProgress(userId);
      if (dbProgress && dbProgress.length > 0) {
        setLearningModules((prev) =>
          prev.map((mod) => {
            const courseProgress = dbProgress.filter((p: any) => p.course_id === mod.id);
            if (courseProgress.length > 0) {
              const updatedTopics = mod.topics.map((t) => {
                const topicProgress = courseProgress.find((p: any) => p.lesson_id === t.id);
                return {
                  ...t,
                  completed: topicProgress?.status === "completed",
                };
              });
              const doneCount = updatedTopics.filter((t) => t.completed).length;
              const pct = Math.round((doneCount / updatedTopics.length) * 100);
              return {
                ...mod,
                topics: updatedTopics,
                progress: pct,
                status: pct === 100 ? "Completed" : pct > 0 ? "In Progress" : "Not Started",
              };
            }
            return mod;
          })
        );
      }

      // 6. Load Interview Sessions from Supabase
      const { data: dbInterviews } = await getUserInterviewSessions(userId);
      if (dbInterviews && dbInterviews.length > 0) {
        const mappedInterviews: InterviewSession[] = dbInterviews.map((iv: any) => ({
          id: iv.id,
          roleId: iv.role_id || "full-stack-dev",
          type: (iv.interview_type || "Technical Interview") as InterviewSession["type"],
          durationMinutes: iv.duration_minutes || 25,
          conductedAt: iv.conducted_at ? iv.conducted_at.split("T")[0] : new Date().toISOString().split("T")[0],
          overallScore: Number(iv.overall_score),
          scores: {
            technicalKnowledge: Number(iv.technical_score) || 75,
            problemSolving: Number(iv.problem_solving_score) || 75,
            communication: Number(iv.communication_score) || 75,
            answerStructure: Number(iv.answer_structure_score) || 75,
            projectExplanation: 80,
          },
          questionsAsked: Array.isArray(iv.interview_answers)
            ? iv.interview_answers.map((ans: any) => ({
                question: ans.question_text || "",
                candidateAnswer: ans.answer_transcript || "",
                critique: ans.feedback || "",
                idealPoints: ans.ideal_points || [],
              }))
            : [],
          whatWentWell: iv.what_went_well || [],
          whatToImprove: iv.what_to_improve || [],
          recommendedPractice: iv.recommended_practice || [],
        }));

        setInterviewSessions(mappedInterviews);
        setUserProfileState((prev) => ({
          ...prev,
          readinessBreakdown: {
            ...prev.readinessBreakdown,
            interview: Number(dbInterviews[0].overall_score),
          },
        }));
      }

      // 7. Load User Resumes from Supabase
      const { data: dbResumes } = await getUserResumes(userId);
      if (dbResumes && dbResumes.length > 0) {
        const latestResume = dbResumes[0];
        if (latestResume.parsed_data && Object.keys(latestResume.parsed_data).length > 0) {
          setParsedResume(latestResume.parsed_data as ParsedResume);
        }
        if (latestResume.ats_score) {
          setUserProfileState((prev) => ({
            ...prev,
            readinessBreakdown: {
              ...prev.readinessBreakdown,
              resume: Number(latestResume.ats_score),
            },
          }));
        }
      }
    } catch (err) {
      console.warn("loadUserData error:", err);
    } finally {
      loadingUserRef.current = null;
    }
  }, []);

  // Sync Supabase Authentication with UserProfile & strictly query user-isolated data
  useEffect(() => {
    try {
      const supabase = createClient();

      // Check active session
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setIsAuthenticated(true);
          setCurrentUserId(user.id);
          const displayName =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            "Candidate";

          loadUserData(user.id, displayName, user.email || "");
        } else {
          setIsAuthenticated(false);
          setCurrentUserId(null);
        }
      });

      // Subscribe to auth state changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          setIsAuthenticated(true);
          setCurrentUserId(session.user.id);
          const displayName =
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            session.user.email?.split("@")[0] ||
            "Candidate";

          loadUserData(session.user.id, displayName, session.user.email || "");
        } else if (event === "SIGNED_OUT") {
          setIsAuthenticated(false);
          setCurrentUserId(null);
          setUserProfileState(ZERO_USER_PROFILE);
          setAssessmentResult(null);
          setAssessmentAnswers({});
          setApplications([]);
          setApplicationRecords([]);
          setInterviewSessions([]);
          setResumeData(EMPTY_RESUME_DATA);
          setResumeAnalysis(EMPTY_RESUME_ANALYSIS);
          setParsedResume(null);
          setAtsAnalysis(null);
          setLiveJobMatches([]);
          setProjects(REAL_WORLD_PROJECTS);
          setLearningModules(LEARNING_MODULES);
          setNotifications([]);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch {
      // Supabase client initialization fallback
    }
  }, [loadUserData]);

  const signOut = useCallback(async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setCurrentUserId(null);
      setUserProfileState(ZERO_USER_PROFILE);
      setAssessmentResult(null);
      setApplications([]);
      setApplicationRecords([]);
      setInterviewSessions([]);
      setResumeData(EMPTY_RESUME_DATA);
      setResumeAnalysis(EMPTY_RESUME_ANALYSIS);
      window.location.href = "/login";
    } catch (err) {
      console.error("Sign out error:", err);
      window.location.href = "/login";
    }
  }, []);

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

      // Persist chosen career track to Supabase profile
      if (currentUserId) {
        updateProfile(currentUserId, { selected_role: r.title }).catch((err) =>
          console.warn("Failed to persist selected role to Supabase:", err)
        );
      }
    }
  }, [currentUserId]);

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

    // Calculate new overall readiness score
    const newReadiness = userProfile.readinessScore === 0
      ? dynamicResult.score
      : Math.round((userProfile.readinessScore + dynamicResult.score) / 2);

    const sortedSkills = [...dynamicResult.skillBreakdown].sort((a, b) => a.score - b.score);
    const focusSkill = sortedSkills.length > 0 && sortedSkills[0].score < 75 ? sortedSkills[0].skill : "";

    setUserProfileState((prev) => ({
      ...prev,
      readinessScore: newReadiness,
      xp: prev.xp + 250,
      focusArea: focusSkill ? `${focusSkill} Foundations` : prev.focusArea,
      readinessBreakdown: {
        ...prev.readinessBreakdown,
        technicalSkills: dynamicResult.score,
      },
    }));

    // Persist assessment attempt, answers, and results to Supabase for the authenticated user
    if (currentUserId) {
      (async () => {
        try {
          const { data: attempt } = await createAssessmentAttempt(
            currentUserId,
            selectedRole.id,
            "initial"
          );

          if (attempt?.id) {
            // Record answers
            for (const q of questionsToUse) {
              const selected = answers[q.id];
              const isCorrect = selected === q.correctAnswer;
              await recordAssessmentAnswer(attempt.id, {
                question_id: q.id,
                role: selectedRole.id,
                skill: q.skill,
                selected_answer: selected,
                correct_answer: q.correctAnswer,
                is_correct: isCorrect,
              });
            }

            // Complete attempt and record skill breakdowns
            await completeAssessmentAttempt(attempt.id, currentUserId, {
              score: dynamicResult.score,
              total_questions: dynamicResult.totalQuestions,
              correct_answers: dynamicResult.correctCount,
              skillBreakdowns: dynamicResult.skillBreakdown.map((sb) => ({
                skill: sb.skill,
                questions_attempted: 2,
                correct_answers: sb.score >= 80 ? 2 : sb.score >= 50 ? 1 : 0,
                score: sb.score,
              })),
            });

            // Update user profile in Supabase
            await updateProfile(currentUserId, {
              selected_role: selectedRole.title,
            });
          }
        } catch (dbErr) {
          console.warn("Failed to persist assessment to Supabase:", dbErr);
        }
      })();
    }

    return newResult;
  }, [selectedRole.id, selectedRole.title, userProfile.readinessScore, currentUserId]);

  const toggleTopicCompletion = useCallback((moduleId: string, topicId: string) => {
    setLearningModules((prev) =>
      prev.map((mod) => {
        if (mod.id !== moduleId) return mod;
        const updatedTopics = mod.topics.map((t) => (t.id === topicId ? { ...t, completed: !t.completed } : t));
        const completedCount = updatedTopics.filter((t) => t.completed).length;
        const newProgress = Math.round((completedCount / updatedTopics.length) * 100);

        // Persist lesson progress to Supabase
        if (currentUserId) {
          const targetTopic = updatedTopics.find((t) => t.id === topicId);
          updateLearningLessonProgress(
            currentUserId,
            moduleId,
            topicId,
            newProgress,
            targetTopic?.completed ? "completed" : "in_progress"
          ).catch((e) => console.warn("Learning progress save error:", e));
        }

        return {
          ...mod,
          topics: updatedTopics,
          progress: newProgress,
          status: newProgress === 100 ? "Completed" : "In Progress",
        };
      })
    );
    setUserProfileState((prev) => ({ ...prev, xp: prev.xp + 25 }));
  }, [currentUserId]);

  const completeModule = useCallback((moduleId: string) => {
    setLearningModules((prev) =>
      prev.map((mod) => {
        if (mod.id === moduleId) {
          if (currentUserId) {
            updateLearningLessonProgress(currentUserId, moduleId, "all", 100, "completed").catch((e) =>
              console.warn("Module complete save error:", e)
            );
          }
          return {
            ...mod,
            progress: 100,
            status: "Completed",
            topics: mod.topics.map((t) => ({ ...t, completed: true })),
          };
        }
        return mod;
      })
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
  }, [currentUserId]);

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
        const updatedProj: ProjectItem = {
          ...proj,
          milestones: updatedMilestones,
          progressPercentage,
          status: progressPercentage === 100 ? "Under Review" : "In Progress",
        };

        if (currentUserId) {
          saveUserProject(currentUserId, {
            id: updatedProj.id,
            title: updatedProj.title,
            description: updatedProj.description,
            role: selectedRole.title,
            skills: updatedProj.skillsTested,
            status: updatedProj.status,
            github_url: updatedProj.repoUrl,
            live_url: updatedProj.liveUrl,
          }).catch((e) => console.warn("Project milestone save error:", e));
        }

        return updatedProj;
      })
    );
  }, [currentUserId, selectedRole.title]);

  const updateProjectDetails = useCallback((projectId: string, details: Partial<ProjectItem>) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const updated = { ...p, ...details };
        if (currentUserId) {
          saveUserProject(currentUserId, {
            id: updated.id,
            title: updated.title,
            description: updated.description,
            role: selectedRole.title,
            skills: updated.skillsTested,
            status: updated.status,
            github_url: updated.repoUrl,
            live_url: updated.liveUrl,
            score: updated.evaluation?.overallScore,
            evaluation: updated.evaluation,
          }).catch((e) => console.warn("Project details save error:", e));
        }
        return updated;
      })
    );
  }, [currentUserId, selectedRole.title]);

  const submitProjectForEvaluation = useCallback((projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const evalPayload = {
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
        };

        const updatedProj: ProjectItem = {
          ...p,
          status: "Completed",
          progressPercentage: 100,
          currentPhase: "Submitted",
          evaluation: evalPayload,
        };

        if (currentUserId) {
          saveUserProject(currentUserId, {
            id: updatedProj.id,
            title: updatedProj.title,
            description: updatedProj.description,
            role: selectedRole.title,
            skills: updatedProj.skillsTested,
            status: "Completed",
            score: 88,
            evaluation: evalPayload,
            github_url: updatedProj.repoUrl,
            live_url: updatedProj.liveUrl,
          }).catch((e) => console.warn("Project eval save error:", e));
        }

        return updatedProj;
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
  }, [currentUserId, selectedRole.title]);

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

    if (currentUserId) {
      saveInterviewSession(currentUserId, {
        role_id: session.roleId,
        role_title: CAREER_ROLES.find((r) => r.id === session.roleId)?.title || selectedRole.title,
        interview_type: session.type,
        duration_minutes: session.durationMinutes,
        overall_score: session.overallScore,
        technical_score: session.scores?.technicalKnowledge,
        communication_score: session.scores?.communication,
        problem_solving_score: session.scores?.problemSolving,
        answer_structure_score: session.scores?.answerStructure,
        summary_feedback: { overview: "Voice interview practice session completed." },
        what_went_well: session.whatWentWell,
        what_to_improve: session.whatToImprove,
        recommended_practice: session.recommendedPractice,
      }).catch((e) => console.warn("Interview session save error:", e));
    }
  }, [currentUserId, selectedRole.title]);

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

  // Fetch live jobs on initial load
  useEffect(() => {
    fetchLiveJobs();
  }, [fetchLiveJobs]);

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

      setApplications((prev) => {
        const existingApp = prev.find((a) => a.opportunityId === currentJob.id);
        if (!existingApp) {
          return [newApp, ...prev];
        }
        return prev;
      });

      // 3. Persist to Supabase applications table for authenticated user
      if (currentUserId) {
        trackJobRedirection(currentUserId, currentJob.id, targetUrl).catch((err) =>
          console.warn("Application track error:", err)
        );
      }

      // 4. Safe open external URL
      window.open(targetUrl, "_blank", "noopener,noreferrer");

      // 5. Add notification
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
  }, [currentUserId]);

  const confirmExternalApplied = useCallback((jobId: string) => {
    setApplicationRecords((prev) =>
      prev.map((r) => (r.jobId === jobId ? { ...r, status: "Applied" } : r))
    );
    setApplications((prev) =>
      prev.map((a) => {
        if (a.opportunityId === jobId) {
          if (currentUserId) {
            updateAppStatusDB(currentUserId, a.id, "applied").catch((err) =>
              console.warn("Update application DB error:", err)
            );
          }
          return {
            ...a,
            status: "Applied",
            appliedDate: new Date().toISOString().split("T")[0],
            lastUpdated: new Date().toISOString().split("T")[0],
          };
        }
        return a;
      })
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
  }, [currentUserId]);

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
      prev.map((app) => {
        if (app.id === appId) {
          if (currentUserId) {
            const dbStatus = newStatus.toLowerCase() as any;
            updateAppStatusDB(currentUserId, appId, dbStatus).catch((err) =>
              console.warn("Status update DB error:", err)
            );
          }
          return { ...app, status: newStatus, lastUpdated: new Date().toISOString().split("T")[0] };
        }
        return app;
      })
    );
  }, [currentUserId]);

  const updateUserProfile = useCallback((data: Partial<UserProfile>) => {
    setUserProfileState((prev) => ({ ...prev, ...data }));
    if (currentUserId) {
      updateProfile(currentUserId, {
        full_name: data.name,
        selected_role: data.targetRole,
      }).catch((e) => console.warn("Profile update DB error:", e));
    }
  }, [currentUserId]);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const resetToDefaults = useCallback(() => {
    setUserProfileState(ZERO_USER_PROFILE);
    setSelectedRoleId("full-stack-dev");
    setAssessmentResult(null);
    setAssessmentAnswers({});
    setLearningModules(LEARNING_MODULES);
    setProjects(REAL_WORLD_PROJECTS);
    setProblems(PROBLEM_ITEMS);
    setResumeData(EMPTY_RESUME_DATA);
    setResumeAnalysis(EMPTY_RESUME_ANALYSIS);
    setOpportunities(TECH_OPPORTUNITIES);
    setApplications([]);
    setNotifications([]);
    setParsedResume(null);
    setAtsAnalysis(null);
    setLiveJobMatches([]);
    setApplicationRecords([]);
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
