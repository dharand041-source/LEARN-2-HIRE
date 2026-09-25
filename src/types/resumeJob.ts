/**
 * SkillForge Real Resume Analysis & Job Opportunity Matching Types
 */

export interface ParsedPersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface ParsedEducation {
  institution: string;
  degree: string;
  field?: string;
  graduationYear?: string;
  scoreOrGpa?: string;
}

export interface ParsedExperience {
  company: string;
  role: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  highlights: string[];
  technologies: string[];
}

export interface ParsedProject {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  highlights: string[];
}

export interface ParsedResume {
  rawText: string;
  personalInfo: ParsedPersonalInfo;
  summary: string;
  education: ParsedEducation[];
  experience: ParsedExperience[];
  internships: ParsedExperience[];
  projects: ParsedProject[];
  technicalSkills: string[];
  softSkills: string[];
  certifications: string[];
  achievements: string[];
  languages: string[];
  jobTitles: string[];
  totalYearsExperience: number;
}

export type FormatCheckStatus = "PASS" | "WARNING" | "NEEDS_IMPROVEMENT";

export interface FormatCheckItem {
  check: string;
  status: FormatCheckStatus;
  feedback: string;
}

export interface AtsScoreBreakdown {
  formatAndParsing: number; // Max 20
  requiredSections: number; // Max 15
  keywordAndSkillAlignment: number; // Max 25
  roleAndTitleAlignment: number; // Max 10
  experienceRelevance: number; // Max 10
  projectRelevance: number; // Max 5
  educationAndCertRelevance: number; // Max 5
  achievementQuality: number; // Max 5
  contactCompleteness: number; // Max 5
}

export interface AtsCompatibilityAnalysis {
  atsCompatibilityScore: number; // 0 - 100
  overallScore: number;
  targetRole: string;
  breakdown: AtsScoreBreakdown;
  scoreBreakdown: {
    parsingAndFormat: { score: number; max: number };
    requiredSections: { score: number; max: number };
    keywordAndSkills: { score: number; max: number };
    roleAlignment: { score: number; max: number };
    experienceRelevance: { score: number; max: number };
    projectRelevance: { score: number; max: number };
    educationCert: { score: number; max: number };
    achievements: { score: number; max: number };
    contactCompleteness: { score: number; max: number };
  };
  formatChecks: FormatCheckItem[];
  matchedSkills: string[];
  matchedRoleSkills: string[];
  missingSkills: string[];
  missingRoleSkills: string[];
  issues: string[];
  recommendations: string[];
  disclaimer: string;
  analyzedAt: string;
}

export type OpportunityType =
  | "JOB"
  | "INTERNSHIP"
  | "STARTUP"
  | "Job"
  | "Internship"
  | "Startup";

export type WorkMode = "Remote" | "Hybrid" | "Onsite";
export type EligibilityStatus = "eligible" | "possibly_eligible" | "not_eligible" | "unknown";

export interface JobListing {
  id: string;
  source: "adzuna" | "jobicy" | "remotive" | "startup_feed" | "internship_feed" | "external" | "verified_external" | string;
  sourceId: string;
  title: string;
  company: string;
  companyLogo?: string;
  description: string;
  location: string;
  country: string;
  remoteType: WorkMode;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship" | "Full-Time" | string;
  opportunityType: OpportunityType;
  experienceLevel: "Fresher" | "Entry Level" | "1-2 years" | "2-5 years" | "5+ years" | string;
  minExperienceYears?: number;
  requiredSkills: string[];
  preferredSkills: string[];
  educationRequirements?: string;
  certifications?: string[];
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  postedAt: string;
  expiresAt?: string;
  lastVerifiedAt: string;
  listingUrl: string;
  applicationUrl?: string;
  sourceUrl: string;
  isActive: boolean;
  attribution: string;
  alsoFoundOn?: string[];
  isDemo?: boolean;
}

export interface JobMatchResult {
  job: JobListing;
  matchScore: number; // 0 - 100
  eligibility: EligibilityStatus;
  eligibilityReason: string;
  matchedSkills: string[];
  missingSkills: string[];
  experienceMatch: boolean | "unknown";
  locationMatch: boolean | "unknown";
  whyYouMatch: string[];
}

export type ApplicationTrackingStatus =
  | "Saved"
  | "Viewed"
  | "Redirected"
  | "redirected"
  | "Applied"
  | "applied"
  | "Rejected"
  | "Interview"
  | "Offer"
  | "Unknown";

export interface ApplicationRecord {
  id: string;
  jobId: string;
  company: string;
  title: string;
  jobTitle?: string;
  opportunityType: OpportunityType;
  source: string;
  externalUrl: string;
  status: ApplicationTrackingStatus;
  appliedDate?: string;
  timestamp?: string;
  lastUpdated: string;
  salary?: string;
  matchScore?: number;
  notes?: string;
}

export interface JobSearchQuery {
  role?: string;
  location?: string;
  workMode?: WorkMode | "all";
  experience?: string;
  type?: OpportunityType | "all";
  skills?: string[];
  page?: number;
  limit?: number;
}
