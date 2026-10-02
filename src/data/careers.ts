import { CareerRole } from "@/types";

export const CAREER_ROLES: CareerRole[] = [
  // 1. Full-Stack Developer
  {
    id: "full-stack-developer",
    title: "Full-Stack Developer",
    category: "Software Development & Engineering",
    description: "Design, build, test, and deploy end-to-end web applications combining modern frontend frameworks, scalable backend APIs, database architecture, and cloud deployment pipelines.",
    shortDesc: "End-to-end web engineering with React, Node.js, databases & modern cloud tools.",
    averageSalary: "₹9,50,000 / yr",
    growthRate: "+24% YoY",
    openRolesCount: 4280,
    assessmentDuration: "25 mins",
    learningPathLength: "12 weeks",
    primarySkills: ["JavaScript", "TypeScript", "React", "Node.js", "SQL", "REST APIs", "Git", "Docker"],
    expectedSkillAreas: [
      { name: "Frontend Architecture & React", weight: 30, description: "Component composition, state management, hooks, DOM optimization, accessibility." },
      { name: "Backend APIs & Node.js", weight: 25, description: "Express/NestJS, middleware, authentication (JWT/OAuth), error handling, rate limiting." },
      { name: "Database Design & SQL", weight: 20, description: "Schema normalization, indexing, joins, migrations, query optimization with PostgreSQL." },
      { name: "Version Control & DevOps", weight: 15, description: "Git branching strategies, CI/CD GitHub Actions, Docker containerization." },
      { name: "Security & Testing", weight: 10, description: "Unit/Integration tests (Jest/Vitest), OWASP top 10 web security hygiene." },
    ],
    prerequisites: ["Foundations of Computing", "Basic Programming Logic", "Web Basics (HTML/CSS)"],
  },

  // 2. Frontend Developer
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    category: "Software Development & Engineering",
    description: "Create pixel-perfect, accessible, and high-performance user interfaces using React, Next.js, TypeScript, and modern CSS architectures.",
    shortDesc: "Craft high-performance, responsive, accessible web interfaces and stateful apps.",
    averageSalary: "₹8,20,000 / yr",
    growthRate: "+18% YoY",
    openRolesCount: 3150,
    assessmentDuration: "20 mins",
    learningPathLength: "10 weeks",
    primarySkills: ["HTML5", "CSS3 / Tailwind", "JavaScript (ES6+)", "TypeScript", "React", "Next.js", "State Management", "Performance Optimization"],
    expectedSkillAreas: [
      { name: "Modern JavaScript & TypeScript", weight: 30, description: "Closures, async/await, event loop, generics, union types, type guards." },
      { name: "React & Next.js Ecosystem", weight: 35, description: "App router, Server Components, suspense, custom hooks, memory profiling." },
      { name: "UI/UX & CSS Mastery", weight: 20, description: "Responsive layouts, animations, design systems, WCAG 2.1 accessibility." },
      { name: "Testing & Tooling", weight: 15, description: "Playwright, React Testing Library, bundle analyzers, Vite." },
    ],
    prerequisites: ["Basic HTML & CSS", "JavaScript fundamentals"],
  },

  // 3. Backend Developer
  {
    id: "backend-developer",
    title: "Backend Developer",
    category: "Software Development & Engineering",
    description: "Engineer resilient server-side microservices, distributed transaction processing systems, high-throughput message brokers, and robust relational & NoSQL databases.",
    shortDesc: "Build scalable microservices, relational schemas, caching layers, and high-load APIs.",
    averageSalary: "₹10,50,000 / yr",
    growthRate: "+22% YoY",
    openRolesCount: 3820,
    assessmentDuration: "30 mins",
    learningPathLength: "14 weeks",
    primarySkills: ["Node.js / Go / Python", "PostgreSQL", "Redis", "REST & GraphQL", "Kafka / RabbitMQ", "System Design", "Docker"],
    expectedSkillAreas: [
      { name: "Server-side Runtimes & Frameworks", weight: 30, description: "Asynchronous I/O, concurrency models, API lifecycle and telemetry." },
      { name: "Database Engineering & Caching", weight: 25, description: "Query query plans, ACID properties, Redis caching patterns, connection pooling." },
      { name: "Distributed Systems & Queues", weight: 25, description: "Event-driven architecture, idempotency, horizontal partitioning, Kafka." },
      { name: "Security, Auth & Compliance", weight: 20, description: "RBAC, OAuth2/OIDC, encryption in transit & rest, zero-trust backend." },
    ],
    prerequisites: ["Data Structures & Algorithms", "Networking & HTTP Basics", "SQL Basics"],
  },

  // 4. Mobile App Developer
  {
    id: "mobile-app-developer",
    title: "Mobile App Developer",
    category: "Software Development & Engineering",
    description: "Develop fluid, cross-platform and native mobile experiences using React Native, Flutter, Kotlin, and Swift with offline-first persistence.",
    shortDesc: "Cross-platform and native iOS/Android development with offline-first capabilities.",
    averageSalary: "₹8,80,000 / yr",
    growthRate: "+19% YoY",
    openRolesCount: 2100,
    assessmentDuration: "25 mins",
    learningPathLength: "11 weeks",
    primarySkills: ["React Native", "Flutter / Dart", "TypeScript", "Native Modules", "Mobile SQLite", "Push Notifications", "App Store Pipelines"],
    expectedSkillAreas: [
      { name: "Cross-Platform Frameworks", weight: 35, description: "React Native bridge/JSI, Flutter widget tree, lifecycle management." },
      { name: "Device Integration & Storage", weight: 25, description: "Camera, geolocation, biometric auth, SQLite/WatermelonDB." },
      { name: "Performance & Battery Tuning", weight: 20, description: "60 FPS render passes, memory leak diagnosis, background tasks." },
      { name: "Release Engineering", weight: 20, description: "Fastlane, Play Console, TestFlight signing, OTA updates." },
    ],
    prerequisites: ["JavaScript/TypeScript or OOP Fundamentals", "UI Layout Fundamentals"],
  },

  // 5. QA / Test Automation Engineer
  {
    id: "qa-test-automation-engineer",
    title: "QA / Test Automation Engineer",
    category: "Software Development & Engineering",
    description: "Architect end-to-end test automation frameworks, load testing harnesses, contract testing suites, and integrated CI/CD regression gates.",
    shortDesc: "Automate test suites, performance benchmarks, and CI/CD quality gates.",
    averageSalary: "₹9,00,000 / yr",
    growthRate: "+16% YoY",
    openRolesCount: 1840,
    assessmentDuration: "25 mins",
    learningPathLength: "10 weeks",
    primarySkills: ["Playwright", "Cypress", "Selenium", "Postman / Newman", "k6 / JMeter", "TypeScript / Python", "GitHub Actions"],
    expectedSkillAreas: [
      { name: "End-to-End Automation", weight: 35, description: "Page Object Model, flaky test mitigation, parallel execution." },
      { name: "API & Contract Testing", weight: 25, description: "Pact, REST assertion suites, schema validation, mock servers." },
      { name: "Performance & Stress Testing", weight: 20, description: "Load curve modeling, latency SLAs, bottleneck isolation with k6." },
      { name: "CI/CD Pipeline Integration", weight: 20, description: "Ephemeral test environments, artifact reporting, test triage." },
    ],
    prerequisites: ["Basic Programming Logic", "Web / API Fundamentals"],
  },

  // 6. AI / Agentic AI Engineer
  {
    id: "ai-agentic-ai-engineer",
    title: "AI / Agentic AI Engineer",
    category: "Data, AI & Machine Learning",
    description: "Build autonomous multi-agent workflows, tool-calling systems, orchestration architectures, vector memory retrieval pipelines, and stateful agentic networks.",
    shortDesc: "Architect multi-agent autonomous systems, tool-use LLM agents, and semantic graphs.",
    averageSalary: "₹16,50,000 / yr",
    growthRate: "+45% YoY",
    openRolesCount: 2850,
    assessmentDuration: "35 mins",
    learningPathLength: "14 weeks",
    primarySkills: ["Python", "LangChain / LangGraph", "AutoGPT / CrewAI", "LlamaIndex", "Vector DBs", "Prompt Architecture", "Function Calling", "Async Python"],
    expectedSkillAreas: [
      { name: "Agent Architectures & Tool Use", weight: 35, description: "ReAct patterns, planning loops, structured output extraction, dynamic tool execution." },
      { name: "State Graphs & Multi-Agent Coordination", weight: 25, description: "LangGraph, state checkpoints, supervisor patterns, inter-agent messaging." },
      { name: "Advanced RAG & Knowledge Retrieval", weight: 20, description: "Hybrid search, reranking, contextual chunking, GraphRAG, vector indexes." },
      { name: "Evaluation & Guardrails", weight: 20, description: "Hallucination metrics, agent trajectory benchmarking, safety filters." },
    ],
    prerequisites: ["Python proficiency", "REST APIs", "Foundations of AI/LLMs"],
  },

  // 7. Machine Learning Engineer
  {
    id: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    category: "Data, AI & Machine Learning",
    description: "Train, evaluate, fine-tune, and deploy predictive ML models and deep learning architectures into low-latency production inference environments.",
    shortDesc: "Train, evaluate, fine-tune, and deploy ML models and LLM agents to production.",
    averageSalary: "₹14,20,000 / yr",
    growthRate: "+34% YoY",
    openRolesCount: 3900,
    assessmentDuration: "35 mins",
    learningPathLength: "16 weeks",
    primarySkills: ["Python", "PyTorch / TensorFlow", "Scikit-Learn", "Pandas / NumPy", "MLflow", "Vector Databases", "FastAPI / ONNX", "RAG Systems"],
    expectedSkillAreas: [
      { name: "Mathematical Foundations & Statistics", weight: 25, description: "Linear algebra, multivariable calculus, probability distributions, hypothesis testing." },
      { name: "Model Training & Deep Learning", weight: 30, description: "Transformers, CNNs, regularization, gradient descent optimizers, PyTorch." },
      { name: "MLOps & Inference Serving", weight: 25, description: "Model quantization, ONNX, FastAPI microservices, Triton server, Docker." },
      { name: "LLMs & Retrieval Augmented Gen (RAG)", weight: 20, description: "Embeddings, vector indexing (Chroma/Pinecone), LangChain/LlamaIndex, evaluation metrics." },
    ],
    prerequisites: ["Python Programming", "College Mathematics (Linear Algebra & Calculus)", "Data Structures"],
  },

  // 8. LLMOps / AI Safety Specialist
  {
    id: "llmops-ai-safety-specialist",
    title: "LLMOps / AI Safety Specialist",
    category: "Data, AI & Machine Learning",
    description: "Implement continuous LLM evaluation pipelines, fine-tuning infrastructure, prompt regression testing, red-teaming, alignment safeguards, and inference optimization.",
    shortDesc: "Continuous model evaluation, alignment guardrails, prompt security, and low-latency LLM serving.",
    averageSalary: "₹15,80,000 / yr",
    growthRate: "+42% YoY",
    openRolesCount: 1620,
    assessmentDuration: "30 mins",
    learningPathLength: "12 weeks",
    primarySkills: ["vLLM / TensorRT-LLM", "Prompt Injection Defense", "Llama Guard / NeMo", "DeepEval / Ragas", "LoRA / QLoRA", "Docker / K8s", "Python"],
    expectedSkillAreas: [
      { name: "Inference Engine Optimization", weight: 30, description: "PagedAttention, continuous batching, quantization (AWQ/GPTQ), latency budgets." },
      { name: "Red Teaming & Security Guardrails", weight: 30, description: "Jailbreak defense, indirect prompt injection mitigation, PII masking, toxic content classifiers." },
      { name: "Evaluation Pipelines & Tracing", weight: 25, description: "Ragas, DeepEval, OpenTelemetry LLM spans, cost tracking, drift detection." },
      { name: "Fine-Tuning Infrastructure", weight: 15, description: "PEFT, LoRA adapters, dataset curation, synthetic data generation." },
    ],
    prerequisites: ["Python Programming", "Basic ML/LLM concepts", "Linux Command Line"],
  },

  // 9. Data Engineer
  {
    id: "data-engineer",
    title: "Data Engineer",
    category: "Data, AI & Machine Learning",
    description: "Design batch and streaming ETL/ELT pipelines, manage cloud data lakes and warehouses, and build reliable analytics infrastructure.",
    shortDesc: "Architect robust big data pipelines, Snowflake/Databricks warehouses, and real-time streams.",
    averageSalary: "₹11,80,000 / yr",
    growthRate: "+28% YoY",
    openRolesCount: 2950,
    assessmentDuration: "30 mins",
    learningPathLength: "13 weeks",
    primarySkills: ["Python", "SQL (Advanced)", "Apache Spark", "Airflow", "Kafka", "Snowflake / dbt", "AWS S3 / GCP BigQuery"],
    expectedSkillAreas: [
      { name: "Data Modeling & Advanced SQL", weight: 30, description: "Star/Snowflake schemas, window functions, CTEs, query plan tuning." },
      { name: "Distributed Processing (Spark)", weight: 25, description: "PySpark, DataFrame API, partitioning, shuffle operations, memory management." },
      { name: "Orchestration & Transformation (dbt/Airflow)", weight: 25, description: "DAG design, data quality tests (Great Expectations), incremental loading." },
      { name: "Streaming Architecture (Kafka)", weight: 20, description: "Event sourcing, consumer groups, schema registry, sliding windows." },
    ],
    prerequisites: ["Python fundamentals", "Relational Database concepts", "Linux Command Line"],
  },

  // 10. Data Scientist
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Data, AI & Machine Learning",
    description: "Apply advanced statistical modeling, exploratory analytics, hypothesis testing, and algorithmic feature engineering to discover enterprise patterns and predictive signals.",
    shortDesc: "Statistical modeling, predictive algorithms, causal inference, and experimental design.",
    averageSalary: "₹13,50,000 / yr",
    growthRate: "+26% YoY",
    openRolesCount: 3100,
    assessmentDuration: "35 mins",
    learningPathLength: "14 weeks",
    primarySkills: ["Python / R", "Statistical Inference", "Scikit-Learn", "A/B Testing", "Time Series Analysis", "SQL", "Pandas", "Feature Engineering"],
    expectedSkillAreas: [
      { name: "Statistical Inference & Probability", weight: 35, description: "Bayesian methods, regression analysis, significance testing, experimental design." },
      { name: "Predictive Modeling & Feature Engineering", weight: 30, description: "Ensemble trees (XGBoost/LightGBM), clustering, dimensionality reduction (PCA)." },
      { name: "SQL Analytics & Data Wrangling", weight: 20, description: "Cohort analysis, customer lifetime value, churn modeling, complex aggregations." },
      { name: "Communication & Experimentation", weight: 15, description: "A/B test metric definition, sample size calculation, executive presentation." },
    ],
    prerequisites: ["College Mathematics / Statistics", "Python programming"],
  },

  // 11. Data / Business Analyst
  {
    id: "data-business-analyst",
    title: "Data / Business Analyst",
    category: "Data, AI & Machine Learning",
    description: "Transform complex operational datasets into executive dashboards, cohort insights, and predictive business intelligence reports.",
    shortDesc: "Extract insights, construct SQL aggregations, and build Tableau/PowerBI visual storytelling.",
    averageSalary: "₹7,50,000 / yr",
    growthRate: "+15% YoY",
    openRolesCount: 2600,
    assessmentDuration: "20 mins",
    learningPathLength: "8 weeks",
    primarySkills: ["SQL (Complex Joins & Analytics)", "Power BI / Tableau", "Python (Pandas / Seaborn)", "Excel Modeling", "Statistical Testing", "A/B Testing"],
    expectedSkillAreas: [
      { name: "SQL Data Wrangling", weight: 35, description: "Aggregations, conditional formatting, nested queries, cohort calculations." },
      { name: "Dashboard Engineering & BI", weight: 30, description: "DAX calculations, interactive filters, KPI drill-downs, UX for data." },
      { name: "Statistical Inference & Experiments", weight: 20, description: "p-values, confidence intervals, sample size calculations, anomaly detection." },
      { name: "Business Storytelling & Synthesis", weight: 15, description: "Executive summary generation, actionable recommendations." },
    ],
    prerequisites: ["Basic Math & Logic", "Spreadsheet experience"],
  },

  // 12. Cloud Solutions Architect
  {
    id: "cloud-solutions-architect",
    title: "Cloud Solutions Architect",
    category: "Architecture & Leadership",
    description: "Architect secure, cost-optimized, and highly resilient cloud infrastructures bridging business vision with modern microservices topologies.",
    shortDesc: "Design resilient enterprise cloud systems, microservice topologies, and cost models.",
    averageSalary: "₹22,00,000 / yr",
    growthRate: "+21% YoY",
    openRolesCount: 1420,
    assessmentDuration: "35 mins",
    learningPathLength: "16 weeks",
    primarySkills: ["Enterprise Architecture", "AWS / Azure Solutions", "Microservices Design", "Cost Optimization", "Disaster Recovery", "Cloud Governance"],
    expectedSkillAreas: [
      { name: "System Scalability & Resiliency", weight: 35, description: "Multi-region failover, load balancing, CAP theorem tradeoffs, eventual consistency." },
      { name: "Cloud Well-Architected Framework", weight: 25, description: "Security, reliability, performance efficiency, cost optimization, operational excellence." },
      { name: "Enterprise Integration Patterns", weight: 20, description: "API gateways, service mesh, event bridges, legacy migration paths." },
      { name: "Technical Governance & Estimation", weight: 20, description: "TCO modeling, capacity planning, security compliance (SOC2/ISO)." },
    ],
    prerequisites: ["5+ years of software/systems engineering foundation", "Cloud practitioner knowledge"],
  },

  // 13. DevOps / Platform Engineer
  {
    id: "devops-platform-engineer",
    title: "DevOps / Platform Engineer",
    category: "Cloud, Infrastructure & DevOps",
    description: "Automate continuous delivery pipelines, orchestrate Kubernetes clusters, provision Infrastructure as Code via Terraform, and maintain internal developer platforms.",
    shortDesc: "Orchestrate Kubernetes, write Terraform IaC, manage AWS/GCP, and automate CI/CD.",
    averageSalary: "₹12,00,000 / yr",
    growthRate: "+30% YoY",
    openRolesCount: 3600,
    assessmentDuration: "30 mins",
    learningPathLength: "14 weeks",
    primarySkills: ["Linux / Bash", "Docker", "Kubernetes", "Terraform", "AWS / Azure", "GitHub Actions / GitLab CI", "Prometheus & Grafana", "Ansible"],
    expectedSkillAreas: [
      { name: "Containerization & Orchestration", weight: 35, description: "K8s Pods, Deployments, StatefulSets, Ingress, Helm charts, resource limits." },
      { name: "Infrastructure as Code (Terraform)", weight: 25, description: "State locking, reusable modules, provider configuration, drift remediation." },
      { name: "Cloud Architecture (AWS/Azure)", weight: 20, description: "VPC, Subnets, IAM least-privilege, ECS/EKS, S3, RDS multi-AZ." },
      { name: "CI/CD & Observability", weight: 20, description: "Pipeline optimization, OpenTelemetry, Grafana dashboards, alerting thresholds." },
    ],
    prerequisites: ["Linux fundamentals", "Basic networking concepts", "Scripting (Python or Bash)"],
  },

  // 14. Site Reliability Engineer
  {
    id: "site-reliability-engineer",
    title: "Site Reliability Engineer",
    category: "Cloud, Infrastructure & DevOps",
    description: "Guard platform uptime, define SLIs/SLOs/Error Budgets, automate incident remediation, and engineer fault-tolerant self-healing systems.",
    shortDesc: "SLOs, fault tolerance, incident postmortems, chaos engineering, and automated recovery.",
    averageSalary: "₹13,50,000 / yr",
    growthRate: "+26% YoY",
    openRolesCount: 1980,
    assessmentDuration: "30 mins",
    learningPathLength: "14 weeks",
    primarySkills: ["Linux Internals", "Go / Python", "Kubernetes", "Prometheus / Jaeger", "Incident Response", "Chaos Engineering", "Networking Protocols"],
    expectedSkillAreas: [
      { name: "Reliability Engineering & SLOs", weight: 30, description: "Error budget burn rates, alerting policies, high availability topologies." },
      { name: "Observability & Distributed Tracing", weight: 25, description: "Span propagation, metrics aggregations, log parsing, Jaeger." },
      { name: "Systems & Network Internals", weight: 25, description: "TCP/IP, DNS, kernel tuning, eBPF basics, load balancer topologies." },
      { name: "Automation & Chaos Testing", weight: 20, description: "Litmus Chaos, automated rollbacks, self-healing scripts." },
    ],
    prerequisites: ["Strong Linux proficiency", "DevOps basics", "Coding in Go or Python"],
  },

  // 15. Systems / Network Engineer
  {
    id: "systems-network-engineer",
    title: "Systems / Network Engineer",
    category: "Cloud, Infrastructure & DevOps",
    description: "Manage enterprise core switching, BGP routing, VPN topologies, Linux/Windows bare-metal clusters, firewall configurations, and datacenter infrastructure.",
    shortDesc: "Enterprise networking, routing protocols, Linux administration, and infrastructure security.",
    averageSalary: "₹8,50,000 / yr",
    growthRate: "+14% YoY",
    openRolesCount: 2200,
    assessmentDuration: "25 mins",
    learningPathLength: "11 weeks",
    primarySkills: ["TCP/IP & Subnetting", "BGP / OSPF Routing", "Linux Kernel / Sysadmin", "Cisco / Juniper CLI", "Wireshark", "Firewalls / IPsec VPN", "DNS / DHCP"],
    expectedSkillAreas: [
      { name: "Network Routing & Switching", weight: 35, description: "VLANs, trunking, dynamic routing protocols, packet capture dissection." },
      { name: "Systems Administration", weight: 25, description: "Systemd services, storage LVM, RAID arrays, automated patching, SSH hardening." },
      { name: "Perimeter Security & Firewalls", weight: 20, description: "Stateful inspection, NAT rules, ACLs, IPsec tunnels, Zero Trust network access." },
      { name: "Core Network Services", weight: 20, description: "BIND DNS, DHCP failover, NTP sync, directory services (LDAP/Active Directory)." },
    ],
    prerequisites: ["CompTIA Network+ fundamentals", "Linux command line basics"],
  },

  // 16. Cybersecurity Architect
  {
    id: "cybersecurity-architect",
    title: "Cybersecurity Architect",
    category: "Cybersecurity",
    description: "Formulate enterprise-wide security blueprints, Zero Trust frameworks, cryptographic governance, cloud security posture management, and compliance architecture.",
    shortDesc: "Zero Trust architecture, defense-in-depth design, cryptographic controls, and SOC2/ISO compliance.",
    averageSalary: "₹24,00,000 / yr",
    growthRate: "+28% YoY",
    openRolesCount: 1100,
    assessmentDuration: "35 mins",
    learningPathLength: "16 weeks",
    primarySkills: ["Zero Trust Architecture", "Cloud Security (CSPM)", "Applied Cryptography", "Threat Modeling", "SABSA / TOGAF", "Identity Governance", "Compliance (SOC2/PCI)"],
    expectedSkillAreas: [
      { name: "Security Architecture & Modeling", weight: 35, description: "Attack surface reduction, STRIDE threat models, defense-in-depth layers." },
      { name: "Zero Trust & Identity Systems", weight: 25, description: "Continuous verification, micro-segmentation, PKI and certificate lifecycles." },
      { name: "Cloud Security & Posture", weight: 20, description: "IAM boundaries, KMS key policies, guardrails, container runtime security." },
      { name: "Regulatory Compliance & Risk", weight: 20, description: "Audit readiness, ISO 27001 controls, third-party vendor risk assessment." },
    ],
    prerequisites: ["Extensive systems and security background", "Network engineering proficiency"],
  },

  // 17. Penetration Tester
  {
    id: "penetration-tester",
    title: "Penetration Tester",
    category: "Cybersecurity",
    description: "Execute authorized offensive simulations, discover zero-day vulnerabilities in web applications, network perimeters, Active Directory domains, and cloud environments.",
    shortDesc: "Ethical hacking, exploitation chains, web vulnerability research, and executive remediation reports.",
    averageSalary: "₹11,50,000 / yr",
    growthRate: "+25% YoY",
    openRolesCount: 1750,
    assessmentDuration: "30 mins",
    learningPathLength: "12 weeks",
    primarySkills: ["Burp Suite Pro", "Metasploit", "Active Directory Attacks", "Web Application Pentesting", "Python / Bash Scripting", "Privilege Escalation", "Reverse Engineering"],
    expectedSkillAreas: [
      { name: "Web Application Exploitation", weight: 35, description: "SQL injection, SSRF, authentication bypass, prototype pollution, business logic flaws." },
      { name: "Network & Infrastructure Hacking", weight: 25, description: "Port scanning, service enumeration, pivoting, lateral movement, Kerberoasting." },
      { name: "Privilege Escalation & Evasion", weight: 20, description: "Linux SUID binaries, Windows token impersonation, bypass techniques." },
      { name: "Reporting & Remediation", weight: 20, description: "CVSS v3 calculation, proof-of-concept drafting, developer remediation guidance." },
    ],
    prerequisites: ["Networking fundamentals", "Web development basics", "Linux expertise"],
  },

  // 18. Security Analyst / SOC Analyst
  {
    id: "security-analyst-soc-analyst",
    title: "Security Analyst / SOC Analyst",
    category: "Cybersecurity",
    description: "Monitor SIEM telemetries, analyze packet captures, conduct vulnerability assessments, mitigate active intrusions, and enforce security compliance policies.",
    shortDesc: "SIEM log analysis, threat hunting, incident triage, and vulnerability remediation.",
    averageSalary: "₹8,60,000 / yr",
    growthRate: "+27% YoY",
    openRolesCount: 2400,
    assessmentDuration: "25 mins",
    learningPathLength: "12 weeks",
    primarySkills: ["Network Security", "Wireshark", "Splunk / ELK SIEM", "Vulnerability Scanning (Nessus)", "OWASP Top 10", "Linux Security", "Incident Response"],
    expectedSkillAreas: [
      { name: "Threat Detection & SIEM Triage", weight: 35, description: "Correlation rules, log analysis, alert validation, MITRE ATT&CK framework." },
      { name: "Network Forensics & Packet Analysis", weight: 25, description: "TCP handshake analysis, DNS tunneling detection, Wireshark filters." },
      { name: "Vulnerability Management", weight: 20, description: "CVSS scoring, patch prioritization, configuration compliance." },
      { name: "Identity & Access Control", weight: 20, description: "MFA enforcement, Zero Trust architecture, privilege escalation prevention." },
    ],
    prerequisites: ["Computer Networks (TCP/IP)", "Operating System fundamentals"],
  },

  // 19. Technical Product Manager
  {
    id: "technical-product-manager",
    title: "Technical Product Manager",
    category: "Architecture & Leadership",
    description: "Drive technical strategy, translate business vision into PRDs, prioritize architectural roadmaps, collaborate with senior engineering teams, and track product analytics.",
    shortDesc: "Bridge software engineering with business strategy, system specifications, and sprint execution.",
    averageSalary: "₹18,50,000 / yr",
    growthRate: "+23% YoY",
    openRolesCount: 1950,
    assessmentDuration: "30 mins",
    learningPathLength: "12 weeks",
    primarySkills: ["Product Roadmapping", "System Architecture Concepts", "API Design Specs", "SQL & Metrics Analytics", "Agile / Scrum", "User Story Mapping", "Jira / Linear"],
    expectedSkillAreas: [
      { name: "Technical Strategy & PRDs", weight: 35, description: "System design comprehension, non-functional requirements, data schema alignment." },
      { name: "Product Analytics & Metrics", weight: 25, description: "Funnel conversion, retention cohorts, SQL querying, telemetry instrumentation." },
      { name: "Prioritization & Roadmapping", weight: 20, description: "RICE scoring, sprint planning, trade-off analysis between tech debt and features." },
      { name: "User Research & Stakeholder Alignment", weight: 20, description: "Customer discovery interviews, engineering alignment, go-to-market sync." },
    ],
    prerequisites: ["Technical understanding of software architecture", "Communication & leadership"],
  },

  // 20. ICT Business Analyst
  {
    id: "ict-business-analyst",
    title: "ICT Business Analyst",
    category: "Architecture & Leadership",
    description: "Analyze enterprise business processes, document functional system requirements, design data flow diagrams, evaluate software solutions, and oversee user acceptance testing.",
    shortDesc: "Business process modeling, functional specifications, stakeholder consensus, and UAT validation.",
    averageSalary: "₹9,80,000 / yr",
    growthRate: "+17% YoY",
    openRolesCount: 1650,
    assessmentDuration: "25 mins",
    learningPathLength: "10 weeks",
    primarySkills: ["BPMN 2.0 Process Modeling", "Requirement Elicitation (BRD/FRD)", "UML Diagrams", "SQL Queries", "Gap Analysis", "UAT Test Planning", "Jira"],
    expectedSkillAreas: [
      { name: "Requirements Engineering", weight: 35, description: "As-Is vs To-Be workflows, user acceptance criteria, traceability matrices." },
      { name: "Process Modeling & Diagrams", weight: 25, description: "BPMN notation, data flow diagrams, state transition models." },
      { name: "Data & Systems Analysis", weight: 20, description: "Entity relationship mapping, SQL validation, integration mapping." },
      { name: "Stakeholder Management & UAT", weight: 20, description: "Workshop facilitation, test case execution, sign-off management." },
    ],
    prerequisites: ["Business and analytical thinking", "Basic understanding of information systems"],
  },

  // 21. Scrum Master / Agile PM
  {
    id: "scrum-master-agile-pm",
    title: "Scrum Master / Agile PM",
    category: "Architecture & Leadership",
    description: "Facilitate high-velocity agile engineering teams, run sprint ceremonies, remove systemic impediments, track burndown metrics, and foster continuous delivery excellence.",
    shortDesc: "Agile rituals, sprint velocity, impediment removal, team coaching, and delivery tracking.",
    averageSalary: "₹12,00,000 / yr",
    growthRate: "+18% YoY",
    openRolesCount: 1550,
    assessmentDuration: "25 mins",
    learningPathLength: "10 weeks",
    primarySkills: ["Scrum Framework", "Kanban Methodology", "Sprint Planning & Retrospectives", "Burndown / Velocity Metrics", "Jira / Confluence", "Servant Leadership", "Conflict Resolution"],
    expectedSkillAreas: [
      { name: "Agile Ceremonies & Facilitation", weight: 35, description: "Daily standups, backlog refinement, sprint review, blameless retrospectives." },
      { name: "Delivery Metrics & Forecasting", weight: 25, description: "Cycle time, lead time, CFD diagrams, sprint predictability." },
      { name: "Impediment Removal & Coaching", weight: 20, description: "Cross-functional dependency management, psychological safety, team autonomy." },
      { name: "Agile Tooling & Workflow Config", weight: 20, description: "Jira board automation, workflow states, WIP limits enforcement." },
    ],
    prerequisites: ["Software development lifecycle familiarity", "Team facilitation basics"],
  },

  // 22. UI/UX Designer
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    category: "Software Development & Engineering",
    description: "Create user-centered digital experiences, intuitive design systems, high-fidelity prototypes in Figma, and conduct usability testing for web and mobile products.",
    shortDesc: "Design intuitive interfaces, interactive Figma prototypes, accessible design tokens, and user journeys.",
    averageSalary: "₹8,50,000 / yr",
    growthRate: "+20% YoY",
    openRolesCount: 2300,
    assessmentDuration: "25 mins",
    learningPathLength: "10 weeks",
    primarySkills: ["Figma / FigJam", "Design Systems & Tokens", "Wireframing & Prototyping", "User Research & Usability Testing", "WCAG Accessibility", "Information Architecture", "HTML/CSS Basics"],
    expectedSkillAreas: [
      { name: "Interface Design & Design Systems", weight: 35, description: "Auto-layout, typography hierarchies, component variants, color token contrast." },
      { name: "User Experience & Prototyping", weight: 25, description: "Interactive micro-animations, screen flows, mental models, state transitions." },
      { name: "User Research & Testing", weight: 20, description: "Heuristic evaluation, user testing protocols, card sorting, persona synthesis." },
      { name: "Accessibility & Design-to-Code Handoff", weight: 20, description: "WCAG AAA compliance, redlines for frontend engineers, responsive grids." },
    ],
    prerequisites: ["Visual design sensibility", "Basic knowledge of web/mobile apps"],
  },
];

/**
 * Standardizes any role title or slug into a normalized kebab-case identifier
 */
export function slugifyCareer(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Robust role lookup that supports:
 * - exact ID (e.g. "full-stack-developer")
 * - legacy short ID (e.g. "full-stack-dev")
 * - slugified title (e.g. "full-stack-developer" for "Full-Stack Developer")
 */
export function getCareerRoleBySlug(slug: string): CareerRole | undefined {
  if (!slug) return undefined;
  const normalized = slugifyCareer(slug);

  // Direct ID check
  const byId = CAREER_ROLES.find((r) => r.id === slug || r.id === normalized);
  if (byId) return byId;

  // Title slug check
  const byTitle = CAREER_ROLES.find((r) => slugifyCareer(r.title) === normalized);
  if (byTitle) return byTitle;

  // Legacy fallback aliases
  const legacyAliases: Record<string, string> = {
    "full-stack-dev": "full-stack-developer",
    "frontend-dev": "frontend-developer",
    "backend-dev": "backend-developer",
    "mobile-dev": "mobile-app-developer",
    "sdet-engineer": "qa-test-automation-engineer",
    "ai-ml-engineer": "machine-learning-engineer",
    "devops-engineer": "devops-platform-engineer",
    "security-analyst": "security-analyst-soc-analyst",
    "solutions-architect": "cloud-solutions-architect",
    "app-security-engineer": "penetration-tester",
    "data-analyst": "data-business-analyst",
  };

  const targetId = legacyAliases[slug] || legacyAliases[normalized];
  if (targetId) {
    return CAREER_ROLES.find((r) => r.id === targetId);
  }

  return undefined;
}

export function getCareerRoleById(id: string): CareerRole | undefined {
  return getCareerRoleBySlug(id);
}
