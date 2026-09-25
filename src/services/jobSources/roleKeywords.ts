/**
 * Maps SkillForge target career roles to broad matching search keywords and tokens
 * Implements Prompt Rule #51: Search Query Generation
 */

export function getRoleKeywords(role?: string): string[] {
  if (!role) return [];
  const r = role.toLowerCase().trim();

  if (r.includes("frontend") || r.includes("front end")) {
    return ["frontend", "front end", "front-end", "react", "ui", "web developer", "javascript"];
  }

  if (r.includes("backend") || r.includes("back end")) {
    return ["backend", "back end", "back-end", "node", "python", "golang", "java", "api", "database"];
  }

  if (r.includes("full stack") || r.includes("fullstack")) {
    return ["full stack", "fullstack", "full-stack", "software engineer", "developer", "react", "node"];
  }

  if (r.includes("mobile") || r.includes("ios") || r.includes("android")) {
    return ["mobile", "react native", "flutter", "ios", "android", "swift", "kotlin"];
  }

  if (r.includes("devops") || r.includes("cloud") || r.includes("infrastructure")) {
    return ["devops", "cloud", "aws", "infrastructure", "sre", "kubernetes", "docker"];
  }

  if (r.includes("data") || r.includes("machine learning") || r.includes("ai")) {
    return ["data", "machine learning", "ml", "ai", "python", "analytics", "nlp"];
  }

  if (r.includes("sdet") || r.includes("qa") || r.includes("test")) {
    return ["sdet", "qa", "test", "automation", "quality", "playwright", "cypress", "selenium"];
  }

  // Fallback: tokenize words
  return r.split(/\s+/).filter((w) => w.length > 2);
}

export function matchesRoleQuery(jobTitle: string, jobSkills: string[], roleQuery?: string): boolean {
  if (!roleQuery) return true;
  const keywords = getRoleKeywords(roleQuery);
  const titleLower = jobTitle.toLowerCase();
  const skillsLower = jobSkills.map((s) => s.toLowerCase());

  // Check direct title match or keyword match
  if (titleLower.includes(roleQuery.toLowerCase())) return true;

  return keywords.some(
    (kw) =>
      titleLower.includes(kw) ||
      skillsLower.some((s) => s.includes(kw))
  );
}
