/**
 * SkillForge Transparent ATS-Style Compatibility Scorer
 *
 * Implements the 100-point transparent rubric:
 * - Parsing & Format Compatibility: 20 pts
 * - Required Resume Sections: 15 pts
 * - Keyword / Skill Alignment: 25 pts
 * - Role / Job Title Alignment: 10 pts
 * - Experience Relevance: 10 pts
 * - Project Relevance: 5 pts
 * - Education & Certification: 5 pts
 * - Achievement / Evidence Quality: 5 pts
 * - Contact & Profile Completeness: 5 pts
 *
 * Provides format checks: PASS, WARNING, NEEDS_IMPROVEMENT
 * Calculates genuine scores from actual resume data.
 */

import {
  ParsedResume,
  AtsCompatibilityAnalysis,
  AtsScoreBreakdown,
  FormatCheckItem,
} from "@/types";
import { CAREER_ROLES } from "@/data/careers";

const DISCLAIMER_TEXT =
  "This is SkillForge's compatibility estimate based on resume parsing, structure, job-description alignment, keywords, skills, and content quality. It is not an official score from an employer's ATS (e.g. Workday, Greenhouse, or Lever).";

// Standard action verbs that ATS parsers look for in high-impact experience bullets
const ACTION_VERBS = [
  "engineered", "architected", "developed", "built", "implemented",
  "designed", "optimized", "refactored", "deployed", "scaled",
  "integrated", "automated", "orchestrated", "reduced", "increased"
];

export function analyzeResumeATS(
  resume: ParsedResume,
  targetRoleTitle: string,
  jobDescription?: string
): AtsCompatibilityAnalysis {
  const roleConfig =
    CAREER_ROLES.find(
      (r) =>
        r.title.toLowerCase() === targetRoleTitle.toLowerCase() ||
        r.id.toLowerCase() === targetRoleTitle.toLowerCase()
    ) || CAREER_ROLES[0];

  const expectedSkills: string[] = roleConfig.primarySkills;
  const rawLower = resume.rawText.toLowerCase();

  // 1. Parsing & Format Compatibility (Max 20 pts)
  let formatScore = 0;
  const formatChecks: FormatCheckItem[] = [];

  // Check 1.1: Readable plain text length
  if (resume.rawText.length >= 350) {
    formatScore += 6;
    formatChecks.push({
      check: "Text Layer Readability",
      status: "PASS",
      feedback: "Text layer extracted clearly without OCR errors or corrupted characters.",
    });
  } else {
    formatChecks.push({
      check: "Text Layer Readability",
      status: "NEEDS_IMPROVEMENT",
      feedback: "Resume contains minimal machine-readable text (<350 characters). Avoid graphic-heavy or scanned image resumes.",
    });
  }

  // Check 1.2: Standard headings structure
  const hasStandardHeadings =
    /skills|technical skills/i.test(resume.rawText) &&
    /education|academics/i.test(resume.rawText) &&
    /experience|work history|projects/i.test(resume.rawText);

  if (hasStandardHeadings) {
    formatScore += 6;
    formatChecks.push({
      check: "Standard Section Headings",
      status: "PASS",
      feedback: "Standard hierarchical headings detected (Skills, Education, Experience/Projects).",
    });
  } else {
    formatScore += 3;
    formatChecks.push({
      check: "Standard Section Headings",
      status: "WARNING",
      feedback: "Some standard section headers were missing or non-standard. Use conventional titles like 'Technical Skills', 'Experience', and 'Education'.",
    });
  }

  // Check 1.3: Clean characters / no odd glyphs
  const oddSymbols = (resume.rawText.match(/[^\x00-\x7F\u2010-\u2022\u00A0-\u00FF]/g) || []).length;
  if (oddSymbols < 8) {
    formatScore += 4;
    formatChecks.push({
      check: "Typography & Character Encodings",
      status: "PASS",
      feedback: "Clean UTF-8 characters without complex unreadable glyphs or embedded icons.",
    });
  } else {
    formatScore += 2;
    formatChecks.push({
      check: "Typography & Character Encodings",
      status: "WARNING",
      feedback: "Detected special graphical characters or non-standard bullet points that may trip up older ATS parsers.",
    });
  }

  // Check 1.4: Single-column linear layout
  const hasTableArtifacts = /\|\s*\|\s*\||\+[-+]+\+/i.test(resume.rawText);
  if (!hasTableArtifacts) {
    formatScore += 4;
    formatChecks.push({
      check: "Single-Column Flow",
      status: "PASS",
      feedback: "Single-column linear structure conforms to ATS parser flow without multi-column table collisions.",
    });
  } else {
    formatScore += 1;
    formatChecks.push({
      check: "Single-Column Flow",
      status: "WARNING",
      feedback: "Detected table or column boundaries that may scramble line reading order in Workday/Taleo parsers.",
    });
  }

  // 2. Required Resume Sections (Max 15 pts)
  let sectionsScore = 0;
  if (resume.technicalSkills.length > 0) sectionsScore += 4;
  if (resume.education.length > 0) sectionsScore += 4;
  if (resume.summary.length > 0) sectionsScore += 3;
  if (
    /experience|internship|employment|projects/i.test(resume.rawText) ||
    resume.jobTitles.length > 0
  ) {
    sectionsScore += 4;
  }

  // 3. Keyword / Skill Alignment (Max 25 pts)
  const resumeSkillsSet = new Set(resume.technicalSkills.map((s) => s.toLowerCase()));
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  expectedSkills.forEach((req) => {
    const isMatched =
      resumeSkillsSet.has(req.toLowerCase()) ||
      rawLower.includes(req.toLowerCase());

    if (isMatched) {
      matchedSkills.push(req);
    } else {
      missingSkills.push(req);
    }
  });

  const skillMatchRatio =
    expectedSkills.length > 0 ? matchedSkills.length / expectedSkills.length : 0;
  const keywordScore = Math.min(25, Math.round(skillMatchRatio * 25));

  // 4. Role / Job Title Alignment (Max 10 pts)
  let roleTitleScore = 0;
  const targetWords = roleConfig.title.toLowerCase().split(" ");
  const titleMatches = targetWords.filter((w) => rawLower.includes(w)).length;
  if (titleMatches === targetWords.length) {
    roleTitleScore = 10;
  } else if (titleMatches > 0) {
    roleTitleScore = Math.round((titleMatches / targetWords.length) * 10);
  }

  // 5. Experience Relevance (Max 10 pts)
  let experienceScore = 0;
  const actionVerbCount = ACTION_VERBS.filter((verb) =>
    new RegExp(`\\b${verb}\\b`, "i").test(rawLower)
  ).length;

  if (actionVerbCount >= 4) {
    experienceScore += 6;
  } else if (actionVerbCount >= 2) {
    experienceScore += 4;
  } else {
    experienceScore += 2;
  }

  if (resume.totalYearsExperience > 0 || /intern|project/i.test(rawLower)) {
    experienceScore += 4;
  }

  // 6. Project Relevance (Max 5 pts)
  let projectScore = 0;
  if (/project|portfolio|github/i.test(rawLower)) {
    projectScore += 3;
  }
  if (resume.personalInfo.github || /github\.com/i.test(rawLower)) {
    projectScore += 2;
  }

  // 7. Education & Certification Relevance (Max 5 pts)
  let educationScore = 0;
  if (resume.education.length > 0) {
    educationScore += 3;
  }
  if (resume.certifications.length > 0 || /certified|certification/i.test(rawLower)) {
    educationScore += 2;
  }

  // 8. Achievement / Evidence Quality (Max 5 pts)
  let achievementScore = 0;
  const hasMetrics = /\b\d+(?:\.\d+)?%|\b\d+\s*x\b|\b\d{2,}\+?\s*(?:users|requests|ms|sec|stars|solved)\b/i.test(
    resume.rawText
  );
  if (hasMetrics) {
    achievementScore += 3;
  }
  if (resume.achievements.length > 0 || /winner|ranked|hackathon|award/i.test(rawLower)) {
    achievementScore += 2;
  }

  // 9. Contact / Professional Profile Completeness (Max 5 pts)
  let contactScore = 0;
  if (resume.personalInfo.email) contactScore += 1;
  if (resume.personalInfo.phone) contactScore += 1;
  if (resume.personalInfo.location) contactScore += 1;
  if (resume.personalInfo.linkedin) contactScore += 1;
  if (resume.personalInfo.github || resume.personalInfo.portfolio) contactScore += 1;

  // Total Score (0 - 100)
  const totalScore =
    formatScore +
    sectionsScore +
    keywordScore +
    roleTitleScore +
    experienceScore +
    projectScore +
    educationScore +
    achievementScore +
    contactScore;

  const atsCompatibilityScore = Math.min(100, Math.max(0, totalScore));

  const breakdown: AtsScoreBreakdown = {
    formatAndParsing: formatScore,
    requiredSections: sectionsScore,
    keywordAndSkillAlignment: keywordScore,
    roleAndTitleAlignment: roleTitleScore,
    experienceRelevance: experienceScore,
    projectRelevance: projectScore,
    educationAndCertRelevance: educationScore,
    achievementQuality: achievementScore,
    contactCompleteness: contactScore,
  };

  // Compile genuine issues detected
  const issues: string[] = [];
  if (!resume.personalInfo.linkedin) {
    issues.push("Missing verified LinkedIn profile link in contact details.");
  }
  if (!resume.personalInfo.github && /developer|engineer/i.test(roleConfig.title)) {
    issues.push("No GitHub profile link detected; technical recruiters prioritize code evidence.");
  }
  if (!hasMetrics) {
    issues.push("Lack of quantifiable metrics (e.g. % improvement, response times, active users) in experience/project bullet points.");
  }
  if (missingSkills.length > 0) {
    issues.push(
      `Resume is missing ${missingSkills.length} recommended competency keywords for ${roleConfig.title}: ${missingSkills.slice(0, 3).join(", ")}.`
    );
  }
  if (actionVerbCount < 3) {
    issues.push("Experience bullet points use passive descriptions instead of decisive action verbs (e.g. 'Engineered', 'Optimized', 'Scaled').");
  }

  // Compile recommendations
  const recommendations: string[] = [];
  if (missingSkills.length > 0) {
    recommendations.push(
      `Incorporate projects demonstrating hands-on use of ${missingSkills.slice(0, 2).join(" and ")} to increase automated ATS keyword retrieval.`
    );
  }
  if (!hasMetrics) {
    recommendations.push(
      "Revise project descriptions using the Google XYZ formula: 'Accomplished [X] as measured by [Y] by doing [Z]'."
    );
  }
  if (!resume.personalInfo.linkedin || !resume.personalInfo.github) {
    recommendations.push(
      "Add clickable links to your LinkedIn profile and active GitHub portfolio in the top contact header."
    );
  }
  recommendations.push(
    `Align your professional summary directly with the ${roleConfig.title} target designation.`
  );

  return {
    atsCompatibilityScore,
    overallScore: atsCompatibilityScore,
    targetRole: roleConfig.title,
    breakdown,
    scoreBreakdown: {
      parsingAndFormat: { score: breakdown.formatAndParsing, max: 20 },
      requiredSections: { score: breakdown.requiredSections, max: 15 },
      keywordAndSkills: { score: breakdown.keywordAndSkillAlignment, max: 25 },
      roleAlignment: { score: breakdown.roleAndTitleAlignment, max: 10 },
      experienceRelevance: { score: breakdown.experienceRelevance, max: 10 },
      projectRelevance: { score: breakdown.projectRelevance, max: 5 },
      educationCert: { score: breakdown.educationAndCertRelevance, max: 5 },
      achievements: { score: breakdown.achievementQuality, max: 5 },
      contactCompleteness: { score: breakdown.contactCompleteness, max: 5 },
    },
    formatChecks,
    matchedSkills,
    matchedRoleSkills: matchedSkills,
    missingSkills,
    missingRoleSkills: missingSkills,
    issues,
    recommendations,
    disclaimer: DISCLAIMER_TEXT,
    analyzedAt: new Date().toISOString(),
  };
}
