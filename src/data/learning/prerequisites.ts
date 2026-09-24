import { SkillPrerequisite } from "./types";

export const SKILL_PREREQUISITES: Record<string, string[]> = {
  // Frontend
  "CSS": ["HTML"],
  "JavaScript": ["HTML", "CSS"],
  "TypeScript": ["JavaScript"],
  "React": ["JavaScript", "HTML", "CSS"],
  "Next.js": ["React", "TypeScript"],
  "Vue.js": ["JavaScript", "HTML", "CSS"],
  "React Native": ["React", "JavaScript"],
  "Flutter": ["Object-Oriented Programming"],

  // Backend & APIs
  "Node.js": ["JavaScript"],
  "Express.js": ["Node.js"],
  "REST APIs": ["HTTP Protocols", "JavaScript"],
  "GraphQL": ["REST APIs", "JavaScript"],
  "Go": ["Programming Fundamentals"],
  "Python": ["Programming Fundamentals"],
  "Django": ["Python"],
  "FastAPI": ["Python"],
  "Microservices": ["REST APIs", "Docker", "Databases"],

  // Databases & Storage
  "SQL": [],
  "PostgreSQL": ["SQL"],
  "Database Indexing & Query Tuning": ["SQL"],
  "MongoDB": ["JSON", "JavaScript Basics"],
  "Redis": ["Data Structures", "Backend Basics"],
  "Data Warehousing": ["SQL", "Databases"],

  // DevOps & Cloud
  "Linux Fundamentals": [],
  "Networking & HTTP": [],
  "Git": [],
  "Docker": ["Linux Fundamentals", "Networking & HTTP"],
  "Kubernetes": ["Docker", "Linux Fundamentals"],
  "CI/CD & GitHub Actions": ["Git", "Docker"],
  "AWS Cloud": ["Linux Fundamentals", "Networking & HTTP", "Docker"],
  "Terraform / IaC": ["AWS Cloud", "Linux Fundamentals"],

  // Testing & QA
  "Unit & Integration Testing": ["JavaScript"],
  "Playwright / E2E Automation": ["JavaScript", "HTML"],
  "API Testing & Postman": ["REST APIs"],
  "Load Testing (k6)": ["HTTP Protocols"],

  // Data & AI / ML
  "Data Structures & Algorithms": ["Programming Fundamentals"],
  "Data Analysis with Pandas": ["Python"],
  "Machine Learning": ["Python", "Linear Algebra & Statistics"],
  "Deep Learning & PyTorch": ["Machine Learning", "Python"],
  "Data Engineering Pipelines": ["Python", "SQL", "Docker"],
  "Apache Spark": ["Python", "SQL", "Distributed Systems"],

  // Cybersecurity
  "Network Security": ["Networking & HTTP"],
  "Web Application Security (OWASP)": ["HTML", "JavaScript", "Networking & HTTP"],
  "SOC Analysis & Incident Response": ["Network Security", "Linux Fundamentals"],
  "Cryptography Basics": ["Computer Fundamentals"],
  "Cloud Security": ["AWS Cloud", "Network Security"],

  // Hardware & Embedded
  "C Programming": ["Computer Fundamentals"],
  "Embedded Systems & Microcontrollers": ["C Programming", "Digital Electronics"],
  "RTOS & IoT Protocols": ["Embedded Systems & Microcontrollers", "Networking & HTTP"],
};

/**
 * Check whether a candidate has met the prerequisites for a skill
 * based on their completed or strong skills (score >= 60).
 */
export function evaluatePrerequisites(
  targetSkill: string,
  userSkillScores: Record<string, number>
): { met: boolean; unmet: string[] } {
  const prereqs = SKILL_PREREQUISITES[targetSkill] || [];
  const unmet: string[] = [];

  for (const p of prereqs) {
    const score = userSkillScores[p];
    // If not tested yet or score < 60, mark as unmet
    if (score === undefined || score < 60) {
      unmet.push(p);
    }
  }

  return {
    met: unmet.length === 0,
    unmet,
  };
}
