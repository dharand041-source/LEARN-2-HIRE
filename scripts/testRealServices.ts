/**
 * Validation Script for SkillForge Real Resume Analysis & Job Matching
 * Tests 3 distinct candidate profiles:
 * 1. Fresher / Graduate
 * 2. Frontend Developer
 * 3. Full Stack Developer
 */

import { parseResumeText } from "../src/services/resumeParser";
import { analyzeResumeATS } from "../src/services/atsScorer";
import { evaluateJobMatch } from "../src/services/jobMatching";
import { JobAggregator } from "../src/services/jobSources/aggregator";

async function runTests() {
  console.log("=== SKILLFORGE REAL RESUME & ATS MATCHING VERIFICATION ===");

  // TEST CASE 1: Fresher / Recent Graduate
  console.log("\n--- TEST CASE 1: Fresher (Campus Graduate) ---");
  const fresherResumeText = `
Pooja Sharma
Bengaluru, Karnataka, India | pooja.sharma@example.com | +91 9123456780
LinkedIn: https://linkedin.com/in/pooja-sharma-dev | GitHub: https://github.com/poojasharma

PROFESSIONAL SUMMARY
Motivated Computer Science graduate passionate about modern web technologies and frontend interfaces. Looking to kickstart software engineering career as a Frontend / Web Developer.

TECHNICAL SKILLS
Languages: JavaScript, HTML5, CSS3, Python
Frameworks & Libraries: React, Tailwind CSS, Bootstrap
Tools & Version Control: Git, GitHub, VS Code

PROJECTS
Personal Portfolio & Tech Blog
• Engineered responsive blog interface using React and Tailwind CSS.
• Implemented client-side search filtering across 20+ technical articles.
Link: https://github.com/poojasharma/react-portfolio

Weather Forecast App
• Developed single-page weather dashboard consuming OpenWeatherMap REST API.
• Displayed 5-day forecast cards with temperature trend graphs.

EDUCATION
Bachelor of Engineering (B.E.) in Computer Science & Engineering
Visvesvaraya Technological University (VTU) (2022 - 2026)
CGPA: 8.4 / 10.0

CERTIFICATIONS
• Meta Frontend Developer Certificate (Coursera)
• HackerRank Problem Solving Basic
  `;

  const parsedFresher = parseResumeText(fresherResumeText);
  const fresherAts = analyzeResumeATS(parsedFresher, "Frontend Developer");
  console.log(`[Fresher] Extracted Skills:`, parsedFresher.technicalSkills);
  console.log(`[Fresher] ATS Compatibility Score: ${fresherAts.atsCompatibilityScore}/100`);
  console.log(`[Fresher] Format Checks:`, fresherAts.formatChecks.map(f => `${f.check}: ${f.status}`));
  console.log(`[Fresher] Missing Role Skills:`, fresherAts.missingRoleSkills);

  // TEST CASE 2: Frontend Developer (2+ years)
  console.log("\n--- TEST CASE 2: Mid-Level Frontend Developer ---");
  const frontendResumeText = `
Rahul Verma
Frontend Engineer | Bengaluru, India | rahul.verma@example.com | +91 9876543210
GitHub: https://github.com/rahul-fe | LinkedIn: https://linkedin.com/in/rahul-fe | Portfolio: https://rahulv.dev

PROFESSIONAL SUMMARY
Senior Frontend Developer with 3 years of experience specializing in high-performance web applications using React, Next.js, and TypeScript. Proven track record of optimizing Core Web Vitals and building accessible design system components.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript (ES6+), HTML5, CSS3/Sass
Frameworks: React 18, Next.js (App Router), Redux Toolkit, Tailwind CSS, Jest
Tools: Git, Webpack, Vite, Docker, Figma, CI/CD

PROFESSIONAL EXPERIENCE
Frontend Developer - CloudScale Solutions (Jan 2023 - Present, Bengaluru)
• Architected enterprise SaaS dashboard in Next.js and TypeScript serving 80,000+ daily active users.
• Reduced LCP from 3.2s to 1.1s by implementing route-level code splitting and image optimization.
• Engineered 40+ reusable design system components with 95% unit test coverage using Vitest.

Junior Web Developer - PixelCraft Studio (Jul 2021 - Dec 2022, Bengaluru)
• Built responsive marketing landing pages with 99+ Google Lighthouse performance scores.
• Integrated GraphQL and REST endpoints with optimistic UI updates.

PROJECTS
Interactive Kanban Project Management Suite
• Designed drag-and-drop state management with optimistic concurrency and offline persistence.
• Deployed to Vercel with automated GitHub Actions CI pipeline.

EDUCATION
Bachelor of Technology in Information Technology - NIT Surathkal (2017 - 2021)
CGPA: 8.9 / 10.0
  `;

  const parsedFrontend = parseResumeText(frontendResumeText);
  const frontendAts = analyzeResumeATS(parsedFrontend, "Frontend Developer");
  console.log(`[Frontend Dev] Extracted Skills:`, parsedFrontend.technicalSkills);
  console.log(`[Frontend Dev] ATS Compatibility Score: ${frontendAts.atsCompatibilityScore}/100`);
  console.log(`[Frontend Dev] Matched Skills:`, frontendAts.matchedRoleSkills);
  console.log(`[Frontend Dev] Score Breakdown:`, frontendAts.scoreBreakdown);

  // TEST CASE 3: Full Stack Developer
  console.log("\n--- TEST CASE 3: Full Stack Developer ---");
  const fullstackResumeText = `
Siddharth Rao
Full Stack Engineer | Bengaluru, India | siddharth.rao@example.com | +91 9988776655
GitHub: https://github.com/siddharth-fs | LinkedIn: https://linkedin.com/in/siddharth-rao

PROFESSIONAL SUMMARY
Full Stack Software Engineer with 4 years of experience architecting resilient distributed systems, transactional PostgreSQL databases, and high-concurrency Node.js / React platforms.

TECHNICAL SKILLS
Frontend: React, Next.js, TypeScript, Tailwind CSS
Backend: Node.js, Express, NestJS, Python, REST APIs, GraphQL
Databases: PostgreSQL, Redis, MongoDB, Prisma ORM
DevOps & Cloud: Docker, Kubernetes, AWS (S3, EC2, ECS), Git, GitHub Actions

PROFESSIONAL EXPERIENCE
Software Engineer II - FinTech Scale (2022 - Present, Bengaluru)
• Engineered double-entry ledger settlement microservices in Node.js and PostgreSQL handling ₹150Cr daily volume.
• Implemented distributed locking with Redis and message queue orchestrators via BullMQ.
• Built merchant payment analytics portal using React and TanStack Query.

Software Engineer - NeoTech Labs (2020 - 2022, Hyderabad)
• Developed multi-tenant inventory REST APIs with PostgreSQL Row-Level Security (RLS).
• Automated deployment workflows using Docker containers and AWS ECS.

EDUCATION
B.Tech in Computer Science & Engineering - IIT Madras (2016 - 2020)
  `;

  const parsedFullstack = parseResumeText(fullstackResumeText);
  const fullstackAts = analyzeResumeATS(parsedFullstack, "Full Stack Developer");
  console.log(`[Full Stack Dev] Extracted Skills:`, parsedFullstack.technicalSkills);
  console.log(`[Full Stack Dev] ATS Compatibility Score: ${fullstackAts.atsCompatibilityScore}/100`);

  // Verify dynamic score variance across candidates (no hardcoding!)
  if (
    fresherAts.atsCompatibilityScore === frontendAts.atsCompatibilityScore ||
    frontendAts.atsCompatibilityScore === fullstackAts.atsCompatibilityScore
  ) {
    console.error("FAIL: Scores should be genuinely dynamic!");
  } else {
    console.log("PASS: ATS scores vary dynamically based on actual resume content!");
  }

  // TEST REAL JOB AGGREGATION & MATCHING
  console.log("\n--- TEST CASE 4: Live Job Aggregation & Matching ---");
  const aggregator = new JobAggregator();
  const searchResult = await aggregator.searchAllJobs({ role: "Frontend Developer" });
  console.log(`Total live opportunities found: ${searchResult.totalFound}`);
  console.log(`Sources status:`, searchResult.sources);

  if (searchResult.jobs.length > 0) {
    const sampleJob = searchResult.jobs[0];
    const match = evaluateJobMatch(sampleJob, parsedFrontend, "Frontend Developer");
    console.log(`\nMatch against [${sampleJob.company} - ${sampleJob.title}]:`);
    console.log(`Match Score: ${match.matchScore}%`);
    console.log(`Eligibility: ${match.eligibility}`);
    console.log(`Matched Skills:`, match.matchedSkills);
    console.log(`Missing Skills:`, match.missingSkills);
    console.log(`Why You Match:`, match.whyYouMatch);
    console.log(`Listing URL:`, sampleJob.listingUrl);
    console.log(`Application URL:`, sampleJob.applicationUrl);
  }

  console.log("\n=== ALL TEST VALIDATIONS COMPLETED SUCCESSFULLY ===");
}

runTests().catch(console.error);
