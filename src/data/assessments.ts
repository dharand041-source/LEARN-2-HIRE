import { Question } from "@/types";

export const INITIAL_ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: "q1",
    roleId: "full-stack-dev",
    category: "JavaScript Core",
    difficulty: "Intermediate",
    skillTested: "JavaScript",
    title: "What is the console output of the following asynchronous JavaScript execution block?",
    codeSnippet: `console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
}).then(() => {
  console.log("D");
});

console.log("E");`,
    options: [
      { id: "opt_a", text: "A, E, C, D, B" },
      { id: "opt_b", text: "A, B, C, D, E" },
      { id: "opt_c", text: "A, E, B, C, D" },
      { id: "opt_d", text: "A, C, D, E, B" },
    ],
    correctOptionId: "opt_a",
    explanation: "Synchronous statements run first ('A', 'E'). Then the microtask queue (Promises: 'C', then chained 'D') is processed before the macrotask queue ('B' from setTimeout).",
  },
  {
    id: "q2",
    roleId: "full-stack-dev",
    category: "React Architecture",
    difficulty: "Intermediate",
    skillTested: "React",
    title: "Which of the following describes the fundamental purpose of `useCallback` in React performance tuning?",
    options: [
      { id: "opt_a", text: "It memoizes the return calculation of an expensive mathematical function across renders." },
      { id: "opt_b", text: "It caches a function definition between renders to prevent unnecessary re-renders of memoized child components receiving it as a prop." },
      { id: "opt_c", text: "It automatically attaches an event listener outside of the synthetic event system." },
      { id: "opt_d", text: "It defers state updates until the browser finishes painting the current frame." },
    ],
    correctOptionId: "opt_b",
    explanation: "`useCallback` caches a function reference across renders. Paired with `React.memo` on the child, it prevents child re-renders caused by new function reference creation.",
  },
  {
    id: "q3",
    roleId: "full-stack-dev",
    category: "Database & SQL",
    difficulty: "Intermediate",
    skillTested: "SQL",
    title: "Given a `users` table with 500,000 rows, which query efficiently retrieves the top 10 users with highest total orders from an `orders` table without causing table-scan bottlenecks?",
    codeSnippet: `SELECT u.id, u.name, COALESCE(SUM(o.amount), 0) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_spent DESC
LIMIT 10;`,
    options: [
      { id: "opt_a", text: "Ensure an index exists on `orders(user_id, amount)` and `users(id)`." },
      { id: "opt_b", text: "Remove the `COALESCE` statement because it forces a full disk sync." },
      { id: "opt_c", text: "Use `RIGHT JOIN` instead of `LEFT JOIN` to bypass the query planner." },
      { id: "opt_d", text: "Replace `SUM(o.amount)` with a recursive common table expression." },
    ],
    correctOptionId: "opt_a",
    explanation: "A composite covering index on `orders(user_id, amount)` enables index-only scans for the join and aggregation, preventing expensive sequential table scans.",
  },
  {
    id: "q4",
    roleId: "full-stack-dev",
    category: "Backend & Node.js",
    difficulty: "Intermediate",
    skillTested: "Node.js",
    title: "In Express.js / Node.js, what is the correct signature and behavior for a centralized error-handling middleware?",
    codeSnippet: `app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});`,
    options: [
      { id: "opt_a", text: "Express identifies error middleware specifically by checking that the function takes exactly 4 parameters (err, req, res, next)." },
      { id: "opt_b", text: "The middleware must be mounted before any route definitions to intercept uncaught errors." },
      { id: "opt_c", text: "Node.js automatically handles uncaught promise rejections without needing this middleware." },
      { id: "opt_d", text: "The first parameter must be named `error` rather than `err` for Node V8 reflection." },
    ],
    correctOptionId: "opt_a",
    explanation: "Express checks `fn.length === 4` to determine if a middleware function is an error handler. It must be declared with 4 arguments and placed after all other routes/middleware.",
  },
  {
    id: "q5",
    roleId: "full-stack-dev",
    category: "Version Control",
    difficulty: "Beginner",
    skillTested: "Git",
    title: "You want to move your local feature branch commits on top of the latest `main` branch while maintaining a clean, linear commit history. Which command is appropriate?",
    options: [
      { id: "opt_a", text: "git rebase main" },
      { id: "opt_b", text: "git merge --squash --no-ff origin" },
      { id: "opt_c", text: "git checkout -b main --force" },
      { id: "opt_d", text: "git reset --hard HEAD~5" },
    ],
    correctOptionId: "opt_a",
    explanation: "`git rebase main` rewinds your branch commits, applies the latest commits from `main`, and reapplies your commits sequentially on top for a linear history.",
  },
  {
    id: "q6",
    roleId: "full-stack-dev",
    category: "REST & API Design",
    difficulty: "Intermediate",
    skillTested: "REST APIs",
    title: "Which HTTP method and status code combination represents an idempotent operation that successfully updates a resource or creates it if it does not exist?",
    options: [
      { id: "opt_a", text: "PUT with 200 OK (for update) or 201 Created (for new creation)" },
      { id: "opt_b", text: "POST with 200 OK" },
      { id: "opt_c", text: "PATCH with 204 No Content" },
      { id: "opt_d", text: "DELETE with 301 Moved Permanently" },
    ],
    correctOptionId: "opt_a",
    explanation: "`PUT` is defined in the HTTP specification as idempotent. Applying the same PUT request multiple times results in the same server state, returning 200 or 201.",
  },
  {
    id: "q7",
    roleId: "full-stack-dev",
    category: "Security Hygiene",
    difficulty: "Intermediate",
    skillTested: "Security",
    title: "How should authentication tokens (e.g., JWT) be stored in a modern web browser to protect against Cross-Site Scripting (XSS) token theft?",
    options: [
      { id: "opt_a", text: "In an `HttpOnly`, `Secure`, `SameSite=Strict` cookie" },
      { id: "opt_b", text: "In `window.localStorage` under an encrypted key" },
      { id: "opt_c", text: "In `window.sessionStorage`" },
      { id: "opt_d", text: "In a global JavaScript variable attached to the `window` object" },
    ],
    correctOptionId: "opt_a",
    explanation: "`HttpOnly` cookies cannot be accessed by client-side JavaScript, which protects the token from being read by malicious scripts during an XSS vulnerability.",
  },
  {
    id: "q8",
    roleId: "full-stack-dev",
    category: "Frontend Performance",
    difficulty: "Intermediate",
    skillTested: "React",
    title: "What triggers a Next.js Server Component to be re-rendered when deployed in production?",
    options: [
      { id: "opt_a", text: "A revalidation trigger (time-based `revalidate` or on-demand `revalidatePath` / `revalidateTag`), or dynamic request context." },
      { id: "opt_b", text: "Every time a user clicks a button on the client side without router navigation." },
      { id: "opt_c", text: "Whenever a browser tab is resized." },
      { id: "opt_d", text: "Server Components re-render on every client DOM tick." },
    ],
    correctOptionId: "opt_a",
    explanation: "Next.js Server Components are statically rendered at build time or dynamically rendered upon request revalidation signals like `revalidatePath` and `revalidateTag`.",
  },
  {
    id: "q9",
    roleId: "full-stack-dev",
    category: "Data Structures & Logic",
    difficulty: "Intermediate",
    skillTested: "Algorithms",
    title: "What is the average time complexity of searching for a key in a balanced Hash Map vs searching in a Binary Search Tree (BST)?",
    options: [
      { id: "opt_a", text: "Hash Map: O(1) average | BST: O(log n) average" },
      { id: "opt_b", text: "Hash Map: O(n) | BST: O(1)" },
      { id: "opt_c", text: "Hash Map: O(log n) | BST: O(log n)" },
      { id: "opt_d", text: "Hash Map: O(1) | BST: O(n^2)" },
    ],
    correctOptionId: "opt_a",
    explanation: "A hash map with a good hash function achieves O(1) average lookup time via direct bucket indexing, whereas a balanced BST requires O(log n) comparisons.",
  },
  {
    id: "q10",
    roleId: "full-stack-dev",
    category: "Cloud & Containerization",
    difficulty: "Beginner",
    skillTested: "Docker",
    title: "In a multi-stage `Dockerfile` for a Node.js / React application, why is multi-stage build considered best practice?",
    options: [
      { id: "opt_a", text: "It separates the build tooling and heavy node_modules from the final slim production runtime image, reducing image size and attack surface." },
      { id: "opt_b", text: "It allows running multiple operating systems inside a single container instance." },
      { id: "opt_c", text: "It bypasses container security scanners." },
      { id: "opt_d", text: "It automatically provisions AWS EC2 instances." },
    ],
    correctOptionId: "opt_a",
    explanation: "Multi-stage builds allow compiling assets with build dependencies in stage 1, and copying only the compiled artifacts into a lightweight alpine base in stage 2.",
  },
];

export const ADVANCED_ASSESSMENT_MODULES = [
  {
    id: "adv_mod_1",
    title: "System Architecture & High Availability",
    category: "Architecture",
    questionsCount: 15,
    duration: "45 mins",
    difficulty: "Advanced",
    minPassingScore: 75,
    skills: ["Microservices", "CAP Theorem", "Caching Strategies", "DB Partitioning"],
    scenario: "Design an idempotency-safe distributed payment settlement gateway handling 10,000 transactions per second with 99.99% availability.",
    unlocked: true,
  },
  {
    id: "adv_mod_2",
    title: "Live Production Debugging & Incident Triage",
    category: "Debugging",
    questionsCount: 10,
    duration: "40 mins",
    difficulty: "Advanced",
    minPassingScore: 80,
    skills: ["Memory Leak Profiling", "SQL Query Plan Analysis", "Event Loop Lag", "TLS Handshakes"],
    scenario: "Analyze simulated live server flamegraphs, isolate a V8 heap exhaustion bug, and fix asynchronous connection pool starvation.",
    unlocked: true,
  },
  {
    id: "adv_mod_3",
    title: "Practical Algorithmic Problem Solving",
    category: "Algorithms",
    questionsCount: 8,
    duration: "50 mins",
    difficulty: "Advanced",
    minPassingScore: 80,
    skills: ["Dynamic Programming", "Graph Traversal", "Concurrency & Locks", "Sliding Window"],
    scenario: "Implement a low-latency rate limiter using token-bucket and sliding-window counter algorithms with Redis atomic primitives.",
    unlocked: false,
    prerequisiteText: "Complete all Intermediate modules in Learning track to unlock.",
  },
  {
    id: "adv_mod_4",
    title: "Security Hardening & Penetration Defense",
    category: "Security",
    questionsCount: 12,
    duration: "35 mins",
    difficulty: "Advanced",
    minPassingScore: 85,
    skills: ["CORS & CSP Policies", "OAuth 2.0 PKCE", "SQL Injection via ORM", "ReDoS Mitigation"],
    scenario: "Audit a real vulnerable full-stack codebase, identify 4 critical CVE vulnerabilities, and implement validated patches.",
    unlocked: false,
    prerequisiteText: "Achieve 80%+ in Initial Assessment to unlock.",
  },
];
