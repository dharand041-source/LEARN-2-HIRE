import { InterviewSession } from "@/types";

export const INTERVIEW_TYPES = [
  {
    id: "tech-deep-dive",
    title: "Technical Architecture & System Design",
    type: "Technical Interview",
    duration: "45 mins",
    difficulty: "Advanced",
    description: "Evaluates your mental models of asynchronous execution, microservice scaling, database isolation, and API idempotency.",
    interviewerName: "Dr. Arvind Ramesh",
    interviewerRole: "Principal Engineer & Staff Architect",
    skillsEvaluated: ["JavaScript Core", "System Design", "Database Indexing", "Concurrency"],
  },
  {
    id: "project-evaluation",
    title: "Production Project Defense & Architecture Breakdown",
    type: "Project Deep-Dive",
    duration: "35 mins",
    difficulty: "Intermediate",
    description: "Defend technical tradeoffs, state machines, SQL query plans, and deployment strategies of your submitted projects.",
    interviewerName: "Priya Sundaram",
    interviewerRole: "Engineering Lead & Product Architect",
    skillsEvaluated: ["Project Architecture", "Tradeoff Defense", "Code Organization", "Troubleshooting"],
  },
  {
    id: "behavioral-hr",
    title: "Behavioral, Ownership & Situational Judgment",
    type: "HR & Culture",
    duration: "30 mins",
    difficulty: "Intermediate",
    description: "Structured around the STAR method (Situation, Task, Action, Result) to assess ownership, team collaboration, and handling ambiguity.",
    interviewerName: "Kavita Nair",
    interviewerRole: "Head of Talent & Engineering Culture",
    skillsEvaluated: ["STAR Method", "Cross-Functional Collaboration", "Conflict Resolution", "Growth Mindset"],
  },
  {
    id: "voice-simulation-mock",
    title: "Live Voice Technical Simulation (AI Evaluated)",
    type: "Voice Mock",
    duration: "20 mins",
    difficulty: "Intermediate",
    description: "Real-time speech-to-text interactive voice simulation evaluating clarity of speech, confidence, pacing, and concise technical explanations.",
    interviewerName: "Learn-2-Hire Voice Assessor",
    interviewerRole: "Automated Speech & Technical Evaluation Engine",
    skillsEvaluated: ["Verbal Clarity", "Pacing & Tone", "Directness", "Technical Terminology"],
  },
];

export const MOCK_INTERVIEW_QUESTIONS = [
  {
    id: "q-int-1",
    type: "Technical Interview",
    question: "Walk me through how the JavaScript V8 engine handles asynchronous promises versus `setTimeout` with 0 milliseconds. How does the microtask queue differ from the macrotask queue?",
    idealPoints: [
      "Mentions call stack execution of synchronous code first.",
      "Explains that Promises and queueMicrotask enqueue callbacks in the Microtask Queue.",
      "Points out that the entire microtask queue is drained to empty before any macrotask callback is dequeued.",
      "Explains setTimeout(fn, 0) schedules a timer in the host environment and pushes to the macrotask/task queue.",
    ],
    sampleGoodAnswer: "In the V8 engine, synchronous code runs on the Call Stack. When a Promise resolves, its .then callback is enqueued into the Microtask Queue. In contrast, setTimeout with 0ms registers a timer with the browser/host API, which places its callback into the Macrotask (Task) queue upon expiration. Crucially, the Event Loop prioritizes the Microtask queue: after the current synchronous frame finishes, it drains every pending microtask before processing a single macrotask. Thus, Promise callbacks always execute before setTimeout(0).",
  },
  {
    id: "q-int-2",
    type: "Technical Interview",
    question: "Suppose your PostgreSQL database experiences high CPU spikes during a flash sale. How would you diagnose the bottlenecks, and what architectural improvements would you apply?",
    idealPoints: [
      "Mentions running EXPLAIN ANALYZE on top queries via pg_stat_statements.",
      "Checks for missing indexes, sequential disk scans, or locking contentions.",
      "Suggests Redis caching for read-heavy hotspots and connection pooling via PgBouncer.",
      "Considers database read replicas and asynchronous queueing for heavy writes.",
    ],
    sampleGoodAnswer: "I would start by inspecting `pg_stat_statements` to identify the top queries by total execution time and mean latency. Then, I would run `EXPLAIN (ANALYZE, BUFFERS)` to see whether queries are doing sequential table scans instead of index scans. For high read spikes, I'd introduce a Redis cache with a short TTL and cache-aside pattern to protect the database. To prevent connection exhaustion, I'd place PgBouncer in front of Postgres. For write spikes, I'd buffer requests into a Kafka or Redis queue for steady background persistence.",
  },
  {
    id: "q-int-3",
    type: "Project Deep-Dive",
    question: "In your Freelancer Marketplace project, how did you ensure that releasing an escrow payment is atomic and cannot result in double payouts under race conditions?",
    idealPoints: [
      "Mentions database transactions (ACID `BEGIN` and `COMMIT`).",
      "Uses `SELECT ... FOR UPDATE` or optimistic locking with version columns.",
      "Explains idempotency keys on payment gateway webhooks.",
    ],
    sampleGoodAnswer: "I utilized database-level ACID transactions in PostgreSQL. When a client triggers a release, the query locks the escrow record using `SELECT * FROM escrow_ledgers WHERE milestone_id = $1 FOR UPDATE`. This prevents concurrent duplicate release requests. The state machine verifies the status is strictly 'FUNDED' before transitioning to 'RELEASED' and crediting the freelancer ledger in the same atomic transaction. Additionally, I implemented idempotency keys on Stripe webhooks so duplicate event deliveries are safely ignored.",
  },
  {
    id: "q-int-4",
    type: "HR & Culture",
    question: "Tell me about a time you faced a major technical disagreement with a team member. How did you resolve it and what was the outcome?",
    idealPoints: [
      "Follows STAR structure: Situation, Task, Action, Result.",
      "Shows focus on data, benchmarks, and prototype evidence rather than ego.",
      "Demonstrates empathy, open listening, and constructive consensus.",
    ],
    sampleGoodAnswer: "In our capstone project, our team was divided between using a monolithic Express REST server versus multiple microservices. I recognized that microservices would introduce substantial operational overhead for our team size. Instead of debating theoretically, I built a quick prototype comparing latency, deployment complexity, and debugging workflows. I presented the benchmark data to the team, and we agreed to start with a modular monolith while keeping clear domain boundaries. This saved us weeks of setup time and allowed us to ship two weeks ahead of schedule.",
  },
];

export const RECENT_INTERVIEW_RESULT: InterviewSession = {
  id: "session-last-01",
  roleId: "full-stack-dev",
  type: "Technical Interview",
  durationMinutes: 38,
  conductedAt: "2026-09-22",
  overallScore: 77,
  scores: {
    technicalKnowledge: 78,
    problemSolving: 84,
    communication: 72,
    answerStructure: 69,
    projectExplanation: 81,
  },
  questionsAsked: [
    {
      question: "Walk me through the JavaScript event loop and microtasks vs macrotasks.",
      candidateAnswer: "Synchronous code runs first, then Promises, then setTimeout. Microtasks drain before macrotasks.",
      critique: "Accurate mental model, but could explicitly mention `queueMicrotask`, call stack frames, and V8 event loop phases for senior depth.",
      idealPoints: ["Call stack execution", "Microtask queue draining", "Macrotask queue processing", "Starvation risks"],
    },
    {
      question: "How do you diagnose and resolve slow queries in PostgreSQL?",
      candidateAnswer: "I look at indexes, use EXPLAIN ANALYZE, and put Redis in front of the database.",
      critique: "Good practical instinct. Highlighted EXPLAIN ANALYZE and caching well. Mentioning `pg_stat_statements` and connection pooling would have pushed score to 90+.",
      idealPoints: ["pg_stat_statements", "EXPLAIN ANALYZE buffer scans", "Covering indexes", "PgBouncer connection pooling"],
    },
  ],
  whatWentWell: [
    "Demonstrated crisp understanding of asynchronous concurrency and event-driven architecture.",
    "Strong technical intuition for database indexing tradeoffs and cache layers.",
    "Clear and confident articulation of personal project architecture.",
  ],
  whatToImprove: [
    "Structure answers more systematically using the 'Problem -> Tradeoffs -> Solution -> Verification' framework.",
    "Be more detailed on edge cases (e.g. race conditions and network partition failures).",
    "Avoid jumping directly into solutions before clarifying constraints or scale requirements.",
  ],
  recommendedPractice: [
    "Practice STAR structure for system tradeoff questions in Voice Mock.",
    "Review Module: 'Relational Databases & PostgreSQL Query Optimization'.",
    "Complete Problem: 'SQL: Consecutive Active Days Calculation'.",
  ],
};
