import {
  ALL_TECHNICAL_QUESTIONS,
  APTITUDE_QUESTION_BANK,
  LOGICAL_QUESTION_BANK,
  validateQuestionUniqueness,
} from "../src/data/questions";

console.log("=================================================");
console.log("SKILLFORGE QUESTION ENGINE - GLOBAL AUDIT RUNNER");
console.log("=================================================\n");

const report = validateQuestionUniqueness(
  ALL_TECHNICAL_QUESTIONS,
  APTITUDE_QUESTION_BANK,
  LOGICAL_QUESTION_BANK
);

console.log(`Total Technical Roles: ${report.totalRoles}`);
console.log(`Total Technical Questions: ${report.totalTechnicalQuestions}`);
console.log(`Total Aptitude Questions: ${report.totalAptitudeQuestions}`);
console.log(`Total Logical Reasoning Questions: ${report.totalLogicalQuestions}`);
console.log("\nQuestions Per Technical Role:");
for (const [role, count] of Object.entries(report.questionsPerRole)) {
  const diff = report.difficultyDistribution[role] || { beginner: 0, intermediate: 0, advanced: 0 };
  console.log(`  - ${role.padEnd(28)}: ${count} questions (B: ${diff.beginner}, I: ${diff.intermediate}, A: ${diff.advanced})`);
}

console.log(`\nDuplicate Detection Results:`);
console.log(`  - Duplicate Count: ${report.duplicateCount}`);
console.log(`  - Invalid Count: ${report.invalidCount}`);
console.log(`  - Is Valid: ${report.isValid ? "YES (PASSED)" : "NO (FAILED)"}`);

if (report.issues.length > 0) {
  console.log("\nIssues Detected:");
  report.issues.forEach((issue, idx) => {
    console.log(`  [${idx + 1}] Question ${issue.questionId} (${issue.roleOrCategory}): ${issue.similarityReason}`);
  });
  process.exit(1);
} else {
  console.log("\n>>> ALL QUESTIONS VERIFIED: 0 DUPLICATES ACROSS ALL ROLES & DOMAINS. <<<");
  process.exit(0);
}
