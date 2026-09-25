import { ResumeData, ResumeAnalysisResult } from "@/types";

export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: "Hamenath V.",
    title: "Full Stack Software Engineer",
    email: "hamenath.eng@example.com",
    phone: "+91 98765 43210",
    location: "Bengaluru / Chennai, India",
    github: "github.com/hamenath-dev",
    linkedin: "linkedin.com/in/hamenath-dev",
    portfolio: "hamenath.dev",
  },
  summary: "Driven Full Stack Engineer with proven experience designing type-safe Next.js web applications, resilient Node.js microservices, and optimized PostgreSQL databases. Track record of building scalable escrow marketplaces and high-concurrency inventory SaaS architectures with strict CI/CD pipelines.",
  skills: [
    {
      category: "Languages & Core",
      items: ["TypeScript", "JavaScript (ES6+)", "Python", "SQL (PostgreSQL)", "HTML5 / CSS3"],
    },
    {
      category: "Frameworks & Libraries",
      items: ["React 18/19", "Next.js (App Router)", "Node.js", "Express", "Tailwind CSS", "Prisma ORM", "Socket.IO"],
    },
    {
      category: "Databases & DevOps",
      items: ["PostgreSQL", "Redis", "Docker", "Git / GitHub Actions", "Nginx", "Linux / Bash", "Jest / Vitest"],
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Apex Technologies Labs",
      role: "Full Stack Engineering Intern",
      location: "Bengaluru, India",
      period: "Jan 2026 - Present",
      highlights: [
        "Engineered RESTful endpoints and PostgreSQL queries serving 50,000+ daily requests, improving P95 response times by 28%.",
        "Refactored legacy React UI components to Next.js App Router with Server Components, reducing initial JavaScript bundle size by 35%.",
        "Implemented Redis session caching and BullMQ background task workers for automated email digest distribution.",
      ],
    },
    {
      id: "exp-2",
      company: "Cognitive System Solutions",
      role: "Frontend Developer Trainee",
      location: "Chennai, India",
      period: "Jul 2025 - Dec 2025",
      highlights: [
        "Built responsive client portals adhering to WCAG 2.1 AA accessibility standards using React, TypeScript, and Tailwind CSS.",
        "Integrated client-side state caching with TanStack Query and automated end-to-end user journeys using Playwright.",
      ],
    },
  ],
  projects: [
    {
      id: "p1",
      name: "On-Demand Tech Freelancer Marketplace & Escrow",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.IO", "Docker"],
      link: "https://github.com/hamenath-dev/freelance-escrow-engine",
      highlights: [
        "Designed an atomic milestone escrow state machine in PostgreSQL with row-level transaction locks, eliminating payout race conditions.",
        "Built real-time bidirectional client-freelancer messaging via WebSockets with unread badge counters and live typing indicators.",
        "Created an automated GitHub Actions CI pipeline running unit tests, type-checks, and Docker image builds.",
      ],
    },
    {
      id: "p2",
      name: "Multi-Tenant Warehouse & Inventory Intelligence SaaS",
      technologies: ["Next.js", "TypeScript", "PostgreSQL RLS", "Redis", "Tailwind CSS"],
      link: "https://github.com/hamenath-dev/warehouse-inventory-saas",
      highlights: [
        "Architected multi-tenant isolation utilizing PostgreSQL Row Level Security (RLS) policies achieving sub-15ms query execution.",
        "Integrated Web Camera barcode scanning API with virtualized data grid rendering 10,000+ stock ledger entries smoothly.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "National Institute of Technology (NIT)",
      degree: "Bachelor of Technology in Computer Science & Engineering",
      year: "2022 - 2026",
      score: "CGPA: 8.7 / 10.0",
    },
  ],
  certifications: [
    "AWS Certified Cloud Practitioner (Foundations of Cloud Architecture)",
    "Meta Frontend Developer Professional Certificate (Advanced React)",
    "Learn-2-Hire Certified Full Stack Engineer (Score: 88/100)",
  ],
  achievements: [
    "Ranked in top 5% of 14,000 candidates in National Technical Coding Challenge 2026.",
    "Winner of Campus Hackathon 2025 for FinTech Real-Time Settlement Engine.",
    "Solved 250+ algorithmic problems across dynamic programming, graph theory, and database tuning.",
  ],
};

export const MOCK_RESUME_ANALYSIS: ResumeAnalysisResult = {
  overallMatch: 84,
  atsCompatibilityScore: 91,
  targetRole: "Full Stack Developer",
  skillsFound: [
    "TypeScript", "JavaScript", "React", "Next.js", "Node.js", "Express", 
    "PostgreSQL", "Prisma", "Docker", "Git", "REST APIs", "Redis", "Tailwind CSS", "CI/CD"
  ],
  skillsMissing: [
    "Kubernetes / K8s", "GraphQL", "AWS ECS / CloudFormation", "System Design documentation"
  ],
  experienceRelevance: 82,
  projectRelevance: 90,
  formattingScore: 94,
  strengths: [
    "ATS formatting complies strictly with single-column, standard heading hierarchies.",
    "Impactful bullet points utilizing Google's 'Accomplished [X], measured by [Y], by doing [Z]' action verb syntax.",
    "Strong technical breadth covering frontend, backend microservices, relational DBs, and CI/CD.",
  ],
  criticalGaps: [
    "Missing explicit keywords for GraphQL schemas and schema stitching.",
    "Could add metrics on cloud infrastructure deployment costs or AWS service configuration.",
    "Include more explicit mention of database indexing strategies (B-Tree, EXPLAIN ANALYZE) in project bullet points.",
  ],
  recommendations: [
    "Add 'Container orchestration with Docker & basic Kubernetes' in the DevOps skills section.",
    "Highlight query optimization (e.g. 'Optimized PostgreSQL queries via composite B-tree indexes') in your experience section.",
    "Link verified GitHub repositories and live demo URLs directly in the project headers.",
  ],
};
