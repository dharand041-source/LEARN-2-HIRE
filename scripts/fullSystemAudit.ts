import {
  ALL_TECHNICAL_QUESTIONS,
  APTITUDE_QUESTION_BANK,
  LOGICAL_QUESTION_BANK,
  ROLE_QUESTIONS_MAP,
  getQuestionsForRole,
  validateQuestionUniqueness,
  evaluateQuestionAnswer,
  calculateDynamicAssessmentResult,
  normalizeAnswer,
} from "../src/data/questions";

console.log("===============================================================================");
console.log("SKILLFORGE QUESTION ENGINE - FULL COMPREHENSIVE COMPLIANCE AUDIT");
console.log("===============================================================================\n");

let passedAssertions = 0;
let failedAssertions = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    passedAssertions++;
    console.log(`[PASS] ${message}`);
  } else {
    failedAssertions++;
    console.error(`[FAIL] ${message}`);
  }
}

// TEST 1: Exactly 14 Technical Roles Defined
const roles = Object.keys(ROLE_QUESTIONS_MAP);
assert(roles.length === 14, `Expected 14 technical roles, found ${roles.length}`);

// TEST 2: Every Role has exactly 15 questions (10 MCQ + 5 Fill-in-the-blank)
roles.forEach((roleId) => {
  const qList = ROLE_QUESTIONS_MAP[roleId];
  assert(qList.length === 15, `Role ${roleId} has exactly 15 questions (found: ${qList.length})`);

  const mcqs = qList.filter((q) => q.type === "mcq");
  const fibs = qList.filter((q) => q.type === "fill_blank");
  assert(mcqs.length === 10, `Role ${roleId} has exactly 10 MCQs (found: ${mcqs.length})`);
  assert(fibs.length === 5, `Role ${roleId} has exactly 5 Fill-in-the-blanks (found: ${fibs.length})`);

  // Difficulty Distribution: 5 Beginner, 6 Intermediate, 4 Advanced
  const beg = qList.filter((q) => q.difficulty === "Beginner").length;
  const int = qList.filter((q) => q.difficulty === "Intermediate").length;
  const adv = qList.filter((q) => q.difficulty === "Advanced").length;
  assert(
    beg === 5 && int === 6 && adv === 4,
    `Role ${roleId} difficulty is 5B/6I/4A (found: ${beg}B / ${int}I / ${adv}A)`
  );

  // Every MCQ must have exactly 4 choices (A, B, C, D) and valid correctAnswer
  mcqs.forEach((mcq) => {
    assert(
      Array.isArray(mcq.options) && mcq.options.length === 4,
      `MCQ ${mcq.id} has exactly 4 options`
    );
    assert(
      ["A", "B", "C", "D"].includes(mcq.correctAnswer),
      `MCQ ${mcq.id} correctAnswer "${mcq.correctAnswer}" is one of A, B, C, D`
    );
    assert(!!mcq.explanation, `MCQ ${mcq.id} has non-empty explanation`);
    assert(!!mcq.source && !!mcq.sourceUrl, `MCQ ${mcq.id} has source and sourceUrl`);
  });

  // Every Fill-in-the-blank must have canonical correctAnswer and acceptedAnswers
  fibs.forEach((fib) => {
    assert(
      !!fib.correctAnswer && fib.correctAnswer.trim().length > 0,
      `FIB ${fib.id} has non-empty canonical correctAnswer`
    );
    assert(
      Array.isArray(fib.acceptedAnswers) && fib.acceptedAnswers.length > 0,
      `FIB ${fib.id} has non-empty acceptedAnswers array`
    );
    assert(!!fib.explanation, `FIB ${fib.id} has non-empty explanation`);
  });
});

// TEST 3: Zero Question ID Overlap Across Any Two Technical Roles
for (let i = 0; i < roles.length; i++) {
  for (let j = i + 1; j < roles.length; j++) {
    const roleA = roles[i];
    const roleB = roles[j];
    const idsA = new Set(ROLE_QUESTIONS_MAP[roleA].map((q) => q.id));
    const idsB = new Set(ROLE_QUESTIONS_MAP[roleB].map((q) => q.id));
    let commonCount = 0;
    idsA.forEach((id) => {
      if (idsB.has(id)) commonCount++;
    });
    assert(commonCount === 0, `Zero ID overlap between ${roleA} and ${roleB}`);
  }
}

// TEST 4: Global Uniqueness & Quality Validation
const report = validateQuestionUniqueness(
  ALL_TECHNICAL_QUESTIONS,
  APTITUDE_QUESTION_BANK,
  LOGICAL_QUESTION_BANK
);
assert(report.isValid, "validateQuestionUniqueness() returned isValid: true");
assert(report.duplicateCount === 0, `Global duplicate count is 0 (found: ${report.duplicateCount})`);
assert(report.invalidCount === 0, `Global invalid count is 0 (found: ${report.invalidCount})`);

// TEST 5: Aptitude Section Verification
assert(APTITUDE_QUESTION_BANK.length === 14, `Aptitude bank has 14 questions (found: ${APTITUDE_QUESTION_BANK.length})`);
APTITUDE_QUESTION_BANK.forEach((aq) => {
  assert(aq.options.length === 4, `Aptitude ${aq.id} has exactly 4 options`);
  assert(["A", "B", "C", "D"].includes(aq.correctAnswer), `Aptitude ${aq.id} correctAnswer is valid`);
  assert(!!aq.solution || !!aq.explanation, `Aptitude ${aq.id} has verified solution/explanation`);
  assert(!!aq.sourceUrl, `Aptitude ${aq.id} has source URL`);
});

// TEST 6: Logical Reasoning Section Verification
assert(LOGICAL_QUESTION_BANK.length === 14, `Logical bank has 14 questions (found: ${LOGICAL_QUESTION_BANK.length})`);
LOGICAL_QUESTION_BANK.forEach((lq) => {
  assert(lq.options.length === 4, `Logical ${lq.id} has exactly 4 options`);
  assert(["A", "B", "C", "D"].includes(lq.correctAnswer), `Logical ${lq.id} correctAnswer is valid`);
  assert(!!lq.explanation, `Logical ${lq.id} has verified explanation`);
  assert(!!lq.sourceUrl, `Logical ${lq.id} has source URL`);
});

// TEST 7: Randomization Preserves Correct Answer Mapping
console.log("\n--- Testing Option Randomization & Answer Preservation ---");
const sampleRole = "full-stack-dev";
const rawQuestions = ROLE_QUESTIONS_MAP[sampleRole];
const rawMCQ = rawQuestions.find((q) => q.type === "mcq")!;
const originalCorrectText = rawMCQ.options!.find((o) => o.label === rawMCQ.correctAnswer)!.text;

for (let trial = 1; trial <= 5; trial++) {
  const randomizedQuestions = getQuestionsForRole(sampleRole, { shuffle: true });
  const randomizedMCQ = randomizedQuestions.find((q) => q.id === rawMCQ.id)!;
  const newCorrectOption = randomizedMCQ.options!.find((o) => o.label === randomizedMCQ.correctAnswer)!;

  assert(
    newCorrectOption.text === originalCorrectText,
    `Trial ${trial}: Correct answer text preserved ("${originalCorrectText.substring(0, 20)}...") despite label being ${randomizedMCQ.correctAnswer}`
  );
}

// TEST 8: Deterministic Fill-in-the-Blank Evaluation
console.log("\n--- Testing Deterministic Normalization & Evaluation ---");
const sampleFIB = rawQuestions.find((q) => q.type === "fill_blank")!;
assert(
  evaluateQuestionAnswer(sampleFIB, sampleFIB.correctAnswer),
  `Exact match evaluates to true for ${sampleFIB.id}`
);
assert(
  evaluateQuestionAnswer(sampleFIB, `   "${sampleFIB.correctAnswer.toUpperCase()}"  `),
  `Padded uppercase quoted string evaluates to true for ${sampleFIB.id}`
);
assert(
  !evaluateQuestionAnswer(sampleFIB, "completely_wrong_answer_xyz"),
  `Invalid string evaluates to false for ${sampleFIB.id}`
);
assert(
  !evaluateQuestionAnswer(sampleFIB, ""),
  `Empty string evaluates to false for ${sampleFIB.id}`
);

// TEST 9: Dynamic Scoring & Skill Gap Classification
console.log("\n--- Testing Dynamic Assessment Scoring & Skill Gap Bands ---");
const testAnswers: Record<string, string> = {};
// Answer first 8 correctly, leave rest wrong
rawQuestions.slice(0, 8).forEach((q) => {
  testAnswers[q.id] = q.correctAnswer;
});

const result = calculateDynamicAssessmentResult(
  rawQuestions,
  testAnswers,
  sampleRole,
  "Full Stack Developer"
);

assert(result.totalQuestions === 15, `Total questions evaluated is 15`);
assert(result.correctCount === 8, `Correct count is exactly 8 (found: ${result.correctCount})`);
assert(result.score === Math.round((8 / 15) * 100), `Overall score is 53% (found: ${result.score}%)`);
assert(result.skillBreakdown.length > 0, `Skill breakdown generated`);

// Verify all skill bands are valid descriptive bands
const validBands = new Set(["Critical Gap", "Needs Improvement", "Developing", "Strong", "Advanced"]);
result.skillBreakdown.forEach((sb) => {
  assert(validBands.has(sb.band), `Skill "${sb.skill}" (${sb.score}%) categorized into valid band: "${sb.band}"`);
});

assert(result.strongAreas.length > 0, `Strong areas identified`);
assert(result.needsImprovement.length > 0, `Skill gaps identified`);
assert(result.recommendations.length > 0, `Personalized action plan generated`);

console.log("\n===============================================================================");
console.log(`AUDIT COMPLETE: ${passedAssertions} assertions passed, ${failedAssertions} assertions failed.`);
console.log("===============================================================================");

if (failedAssertions > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
