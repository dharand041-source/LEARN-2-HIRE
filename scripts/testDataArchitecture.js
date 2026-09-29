const fs = require("fs");
const path = require("path");

function runArchitectureTests() {
  console.log("==================================================");
  console.log("LEARN-2-HIRE DATA ARCHITECTURE AUDIT & VERIFICATION");
  console.log("==================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = "") {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} - ${details}`);
      failed++;
    }
  }

  const root = path.resolve(__dirname, "..");

  // Test 1: Verify CareerContext has no localStorage simulation for user database entities
  const careerContextContent = fs.readFileSync(
    path.join(root, "src/context/CareerContext.tsx"),
    "utf8"
  );
  assert(
    !careerContextContent.includes('localStorage.setItem("sf_userProfile"') &&
      !careerContextContent.includes('localStorage.getItem("sf_userProfile"') &&
      !careerContextContent.includes('localStorage.setItem("sf_applications"'),
    "CareerContext: Zero localStorage database simulation",
    "Found active localStorage persistence for user models"
  );

  // Test 2: Verify zero fallback demo data in assessment results page
  const assessResultsContent = fs.readFileSync(
    path.join(root, "src/app/assessment/results/page.tsx"),
    "utf8"
  );
  assert(
    !assessResultsContent.includes("score: 72") &&
      assessResultsContent.includes("if (!assessmentResult)"),
    "Assessment Results Page: Clean empty state instead of fallback demo object",
    "Found fallback demo data in assessment results"
  );

  // Test 3: Verify zero fallback in interview results page
  const interviewResultsContent = fs.readFileSync(
    path.join(root, "src/app/interview/results/page.tsx"),
    "utf8"
  );
  assert(
    !interviewResultsContent.includes("interviewSessions[0] || RECENT_INTERVIEW_RESULT") &&
      interviewResultsContent.includes("if (!session)"),
    "Interview Results Page: Clean empty state instead of fallback session",
    "Found fallback to RECENT_INTERVIEW_RESULT"
  );

  // Test 4: Verify Sidebar does not hardcode Gap: SQL
  const sidebarContent = fs.readFileSync(
    path.join(root, "src/components/layout/Sidebar.tsx"),
    "utf8"
  );
  assert(
    !sidebarContent.includes(">Gap: SQL<") &&
      sidebarContent.includes("userProfile.focusArea"),
    "Sidebar: Dynamic focus area / gap instead of hardcoded Gap: SQL",
    "Found hardcoded Gap: SQL in Sidebar"
  );

  // Test 5: Verify Dashboard 6-node pipeline uses dynamic data
  const dashboardContent = fs.readFileSync(
    path.join(root, "src/app/dashboard/page.tsx"),
    "utf8"
  );
  assert(
    dashboardContent.includes("score: assessmentScoreStr") &&
      dashboardContent.includes("score: gapAnalysisStr") &&
      dashboardContent.includes("score: learningProgressStr") &&
      dashboardContent.includes("score: capstoneScoreStr"),
    "Dashboard Page: Dynamic 6-node pipeline states based on authenticated user data",
    "Found hardcoded 6-node pipeline scores in dashboard"
  );

  // Test 6: Verify template catalog projects start unstarted with 0 progress
  const projectsContent = fs.readFileSync(
    path.join(root, "src/data/projects.ts"),
    "utf8"
  );
  assert(
    !projectsContent.includes('status: "In Progress"') &&
      !projectsContent.includes('status: "Completed"') &&
      !projectsContent.includes("hamenath-dev"),
    "Catalog Projects: Unstarted clean templates (status: Not Started, progress: 0)",
    "Found pre-completed or fake user projects in catalog"
  );

  // Test 7: Verify learning modules start at 0% with no pre-completed topics
  const learningContent = fs.readFileSync(
    path.join(root, "src/data/learning.ts"),
    "utf8"
  );
  assert(
    !learningContent.includes("progress: 100") &&
      !learningContent.includes("progress: 82") &&
      !learningContent.includes("completed: true"),
    "Catalog Learning Modules: Unstarted clean courses (progress: 0, completed: false)",
    "Found pre-completed learning progress in catalog"
  );

  // Test 8: Verify achievements start with 0 progress and no pre-unlocked timestamps
  const achievementsContent = fs.readFileSync(
    path.join(root, "src/data/achievements.ts"),
    "utf8"
  );
  assert(
    !achievementsContent.includes("unlockedAt:") &&
      !achievementsContent.includes("progress: 7") &&
      !achievementsContent.includes("progress: 10"),
    "Achievements: Zero unlocked achievements by default for new users",
    "Found pre-unlocked achievements"
  );

  // Test 9: Verify problems are all unsolved by default
  const problemsContent = fs.readFileSync(
    path.join(root, "src/data/problems.ts"),
    "utf8"
  );
  assert(
    !problemsContent.includes("solved: true"),
    "Problems: All problems unsolved (solved: false) by default",
    "Found pre-solved problems in catalog"
  );

  // Test 10: Verify project-service connects to Supabase projects table
  const projectServiceContent = fs.readFileSync(
    path.join(root, "src/lib/services/project-service.ts"),
    "utf8"
  );
  assert(
    projectServiceContent.includes('.from("projects")') &&
      projectServiceContent.includes('.eq("user_id", userId)'),
    "Project Service: Interfacing with Supabase projects table with user_id isolation",
    "Missing project service or user_id filtering"
  );

  // Test 11: Verify CareerContext loads all user entities via Supabase services
  assert(
    careerContextContent.includes("getOrCreateProfile") &&
      careerContextContent.includes("getUserAssessmentHistory") &&
      careerContextContent.includes("getUserApplications") &&
      careerContextContent.includes("getUserProjects") &&
      careerContextContent.includes("getUserLearningProgress") &&
      careerContextContent.includes("getUserInterviewSessions") &&
      careerContextContent.includes("getUserResumes"),
    "CareerContext: Complete user data hydration across 7 Supabase tables",
    "Missing Supabase service calls in CareerContext"
  );

  console.log("\n==================================================");
  console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runArchitectureTests();
