import {
  JobListing,
  ParsedResume,
  JobMatchResult,
  EligibilityStatus,
} from "@/types";

/**
 * SkillForge Transparent Resume-to-Job Matching and Eligibility Engine
 *
 * Implements the 100% transparent matching formula:
 * - Verified/Resume Skills: 30%
 * - Required Job Skills: 25%
 * - Role Alignment: 15%
 * - Experience Match: 10%
 * - Education / Certification: 5%
 * - Location / Work Mode: 5%
 * - Projects: 5%
 * - Preferences: 5%
 */
export function evaluateJobMatch(
  job: JobListing,
  resume: ParsedResume,
  targetRoleTitle?: string
): JobMatchResult {
  const resumeSkillsSet = new Set(
    resume.technicalSkills.map((s) => s.toLowerCase().trim())
  );

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  // 1. Skill Analysis
  job.requiredSkills.forEach((req) => {
    const norm = req.toLowerCase().trim();
    if (resumeSkillsSet.has(norm) || resume.rawText.toLowerCase().includes(norm)) {
      matchedSkills.push(req);
    } else {
      missingSkills.push(req);
    }
  });

  const skillCoverageRatio =
    job.requiredSkills.length > 0
      ? matchedSkills.length / job.requiredSkills.length
      : 0.5;

  const resumeSkillsContribution = Math.min(
    30,
    Math.round((Math.min(resume.technicalSkills.length, 12) / 12) * 30)
  );
  const requiredSkillsContribution = Math.round(skillCoverageRatio * 25);

  // 2. Role Alignment (15%)
  let roleAlignment = 5;
  const target = (targetRoleTitle || "").toLowerCase();
  const jobTitleLower = job.title.toLowerCase();
  if (target && jobTitleLower.includes(target)) {
    roleAlignment = 15;
  } else if (
    jobTitleLower.includes("engineer") ||
    jobTitleLower.includes("developer")
  ) {
    roleAlignment = 10;
  }

  // 3. Experience Match (10%)
  let experienceScore = 5;
  let experienceMatch: boolean | "unknown" = "unknown";

  if (job.minExperienceYears !== undefined) {
    if (resume.totalYearsExperience >= job.minExperienceYears) {
      experienceScore = 10;
      experienceMatch = true;
    } else {
      experienceScore = 0;
      experienceMatch = false;
    }
  } else if (job.experienceLevel === "Fresher" || job.opportunityType === "INTERNSHIP") {
    experienceScore = 10;
    experienceMatch = true;
  } else if (job.experienceLevel === "1-2 years") {
    if (resume.totalYearsExperience >= 1) {
      experienceScore = 10;
      experienceMatch = true;
    } else {
      experienceScore = 4;
      experienceMatch = "unknown";
    }
  }

  // 4. Education / Certification (5%)
  let educationScore = 3;
  if (resume.education.length > 0) educationScore += 1;
  if (resume.certifications.length > 0) educationScore += 1;

  // 5. Location / Work Mode (5%)
  let locationScore = 2;
  let locationMatch: boolean | "unknown" = "unknown";
  if (job.remoteType === "Remote") {
    locationScore = 5;
    locationMatch = true;
  } else if (
    job.location.toLowerCase().includes("india") ||
    resume.personalInfo.location.toLowerCase().includes(job.country.toLowerCase())
  ) {
    locationScore = 5;
    locationMatch = true;
  } else {
    locationMatch = "unknown";
  }

  // 6. Projects (5%)
  const projectsScore = resume.projects.length > 0 || resume.rawText.toLowerCase().includes("github") ? 5 : 2;

  // 7. Preferences (5%)
  const preferencesScore = 5;

  const totalMatchScore = Math.min(
    98, // Never claim 100% guaranteed match
    Math.max(
      15,
      resumeSkillsContribution +
        requiredSkillsContribution +
        roleAlignment +
        experienceScore +
        educationScore +
        locationScore +
        projectsScore +
        preferencesScore
    )
  );

  // 8. Eligibility Calculation (Strictly factual, no assumptions)
  let eligibility: EligibilityStatus = "unknown";
  let eligibilityReason = "Eligibility could not be fully determined from available public listing details.";

  if (experienceMatch === false) {
    eligibility = "not_eligible";
    eligibilityReason = `Requires documented experience exceeding the tenure indicated on your resume.`;
  } else if (job.opportunityType === "INTERNSHIP") {
    if (resume.education.length > 0 && matchedSkills.length >= 1) {
      eligibility = "eligible";
      eligibilityReason = "Student / recent graduate background aligns with internship prerequisites.";
    } else {
      eligibility = "possibly_eligible";
      eligibilityReason = "Review specific graduation year and university enrollment requirements on the source listing.";
    }
  } else if (matchedSkills.length >= Math.ceil(job.requiredSkills.length * 0.6)) {
    eligibility = "eligible";
    eligibilityReason = "Core technical competencies and experience profile appear compatible with listing criteria.";
  } else if (matchedSkills.length > 0) {
    eligibility = "possibly_eligible";
    eligibilityReason = `Partially compatible; missing ${missingSkills.length} required skill(s).`;
  } else {
    eligibility = "unknown";
    eligibilityReason = "Key qualifications not sufficiently matched to establish eligibility.";
  }

  // 9. Why You Match Bullet Points
  const whyYouMatch: string[] = [];
  if (matchedSkills.length > 0) {
    whyYouMatch.push(`You have validated skills in ${matchedSkills.slice(0, 3).join(", ")}.`);
  }
  if (job.remoteType === "Remote") {
    whyYouMatch.push("100% Remote flexibility eliminates geographical relocation constraints.");
  }
  if (experienceMatch === true) {
    whyYouMatch.push(`Your experience tenure aligns with the ${job.experienceLevel} requirement.`);
  }
  if (resume.projects.length > 0 || resume.rawText.toLowerCase().includes("github")) {
    whyYouMatch.push("Your portfolio indicates relevant technical project implementation.");
  }

  return {
    job,
    matchScore: totalMatchScore,
    eligibility,
    eligibilityReason,
    matchedSkills,
    missingSkills,
    experienceMatch,
    locationMatch,
    whyYouMatch,
  };
}
