import { CareerRole, AssessmentResult } from "@/types";
import { COURSE_CATALOG, getCourseForSkill } from "./courseCatalog";
import { evaluatePrerequisites } from "./prerequisites";
import { GapPriority, PersonalizedSkillItem } from "./types";

/**
 * Categorize a percentage score into a standardized skill gap priority
 */
export function getPriorityFromScore(score: number): {
  priority: GapPriority;
  status: "Critical Gap" | "Needs Improvement" | "Developing" | "Strong" | "Advanced";
} {
  if (score < 40) {
    return { priority: "Critical", status: "Critical Gap" };
  }
  if (score < 60) {
    return { priority: "High", status: "Needs Improvement" };
  }
  if (score < 75) {
    return { priority: "Medium", status: "Developing" };
  }
  if (score < 90) {
    return { priority: "Low", status: "Strong" };
  }
  return { priority: "Mastered", status: "Advanced" };
}

/**
 * Generate a complete Personalized Learning Roadmap based on:
 * 1. Selected Career Role
 * 2. User's Real Assessment Scores
 * 3. Prerequisite Graph Dependencies
 * 4. Completed Lessons History
 */
export function generatePersonalizedLearningPath(
  selectedRole: CareerRole,
  assessmentResult: AssessmentResult | null,
  completedLessonsMap: Record<string, boolean> = {}
): PersonalizedSkillItem[] {
  // 1. Gather all required skills for this career role
  const roleSkills = selectedRole.primarySkills || [
    "JavaScript",
    "React",
    "Node.js",
    "SQL",
    "REST APIs",
    "Git",
    "Docker",
  ];

  // 2. Build score lookup from user's assessment result
  const skillScores: Record<string, number> = {};
  if (assessmentResult && assessmentResult.skillBreakdown) {
    for (const item of assessmentResult.skillBreakdown) {
      skillScores[item.skill] = item.score;
      // Also map partial keyword matches (e.g. "PostgreSQL & SQL" -> "SQL", "React & Next.js" -> "React")
      const lower = item.skill.toLowerCase();
      if (lower.includes("sql")) skillScores["SQL"] = item.score;
      if (lower.includes("react")) skillScores["React"] = item.score;
      if (lower.includes("node")) skillScores["Node.js"] = item.score;
      if (lower.includes("javascript")) skillScores["JavaScript"] = item.score;
      if (lower.includes("git")) skillScores["Git"] = item.score;
      if (lower.includes("docker")) skillScores["Docker"] = item.score;
      if (lower.includes("python")) skillScores["Python"] = item.score;
    }
  }

  // Fallback defaults for unassessed skills based on typical profile
  const defaultScores: Record<string, number> = {
    "JavaScript": 78,
    "React": 42,
    "Node.js": 61,
    "SQL": 38,
    "PostgreSQL": 45,
    "REST APIs": 68,
    "Git": 90,
    "Docker": 52,
    "Python": 65,
    "TypeScript": 58,
    "HTML5": 92,
    "CSS3 / Tailwind": 84,
  };

  // 3. Process each skill for the role
  const personalizedItems: PersonalizedSkillItem[] = roleSkills.map((skillName) => {
    // Current score
    const currentScore = skillScores[skillName] ?? defaultScores[skillName] ?? 50;
    const targetScore = 80; // Standard industry readiness benchmark
    const { priority, status } = getPriorityFromScore(currentScore);

    // Find full course
    const primaryCourse = getCourseForSkill(skillName) || COURSE_CATALOG[0];

    // Count lessons and completed status
    let totalLessonsCount = 0;
    let completedLessonsCount = 0;

    for (const mod of primaryCourse.modules) {
      for (const lesson of mod.lessons) {
        totalLessonsCount++;
        const key = `${primaryCourse.id}-${lesson.id}`;
        if (completedLessonsMap[key]) {
          completedLessonsCount++;
        }
      }
    }

    const progressPercentage =
      totalLessonsCount > 0
        ? Math.round((completedLessonsCount / totalLessonsCount) * 100)
        : 0;

    // Prerequisite evaluation
    const { met, unmet } = evaluatePrerequisites(skillName, skillScores);

    // Role importance weight
    const area = selectedRole.expectedSkillAreas?.find((a) =>
      a.name.toLowerCase().includes(skillName.toLowerCase())
    );
    const roleImportance: "Essential" | "High" | "Medium" =
      area && area.weight >= 25 ? "Essential" : area && area.weight >= 15 ? "High" : "Medium";

    return {
      skill: skillName,
      currentScore,
      targetScore,
      priority,
      status,
      primaryCourse,
      alternativeCourses: primaryCourse.alternativeCourses || [],
      prerequisitesMet: met,
      unmetPrerequisites: unmet,
      roleImportance,
      completedLessonsCount,
      totalLessonsCount,
      progressPercentage,
    };
  });

  // 4. Sort learning order:
  // Priority: Critical (0-39) > High (40-59) > Medium (60-74) > Low (75-89) > Mastered
  // If prerequisites are unmet, move prerequisite skill higher
  const priorityWeight: Record<GapPriority, number> = {
    Critical: 5,
    High: 4,
    Medium: 3,
    Low: 2,
    Mastered: 1,
  };

  personalizedItems.sort((a, b) => {
    // If a is prerequisite for b, a must come first
    if (b.unmetPrerequisites.includes(a.skill)) return -1;
    if (a.unmetPrerequisites.includes(b.skill)) return 1;

    // Highest gap priority first
    const pDiff = priorityWeight[b.priority] - priorityWeight[a.priority];
    if (pDiff !== 0) return pDiff;

    // Lower score first within same priority
    return a.currentScore - b.currentScore;
  });

  return personalizedItems;
}
