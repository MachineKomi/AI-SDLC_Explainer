// Quiz Questions Content
// Converted from quiz.json

import { QuizQuestion } from '@/types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'What are the three phases of AI-SDLC?',
    options: [
      'Planning, Development, Testing',
      'Inception, Construction, Operations',
      'Design, Build, Deploy',
      'Analysis, Implementation, Maintenance',
    ],
    correct: 1,
    explanation: 'AI-SDLC has three phases: Inception (what/why), Construction (how), and Operations (run/monitor). Each phase has specific goals and mandatory gates.',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L76'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q2',
    prompt: "What does 'proof over prose' mean in AI-SDLC?",
    options: [
      'Documentation is more important than code',
      'Evidence (tests, checks) is required, not just claims',
      'Written requirements over verbal agreements',
      'Formal mathematical proofs for algorithms',
    ],
    correct: 1,
    explanation: "'Proof over prose' means 'done' requires objective evidence: tests passing, checks green, runtime behavior validated. Claims without evidence are not accepted.",
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L52-54'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q3',
    prompt: "What is the primary purpose of 'gates' in AI-SDLC?",
    options: [
      'To slow down development',
      'To require human approval before proceeding',
      'To automate code reviews',
      'To manage version control',
    ],
    correct: 1,
    explanation: "Gates are mandatory approval checkpoints requiring human validation before proceeding. They ensure human accountability and prevent AI from 'running away' with wrong assumptions.",
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L38-39'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q4',
    prompt: 'Where should AI-SDLC artifacts be stored?',
    options: [
      'In chat history only',
      'In a separate documentation system',
      'In the repository (aidlc-docs/)',
      'In cloud storage',
    ],
    correct: 2,
    explanation: 'AI-SDLC artifacts must be persisted in-repo (typically aidlc-docs/), not in chat history. This provides durable context, reviewability, and an auditable trail.',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L44-46'],
      upstream: ['https://github.com/aws-samples/sample-aidlc-workflows'],
    },
  },
  {
    id: 'q5',
    prompt: 'What happens in the Inception phase?',
    options: [
      'Code is written and tested',
      'Requirements are defined (WHAT + WHY)',
      'System is deployed to production',
      'Performance is optimized',
    ],
    correct: 1,
    explanation: 'Inception determines WHAT to build and WHY. It includes requirements analysis, user stories, unit decomposition, and risk assessment. Code is written in Construction.',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L80-98'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q6',
    prompt: 'What is the core AI-SDLC mental model?',
    options: [
      'AI codes, human tests',
      'AI proposes plan → asks questions → implements after validation',
      'Human designs, AI documents',
      'AI monitors, human fixes',
    ],
    correct: 1,
    explanation: 'The core mental model is: AI creates plan → asks clarifying questions → implements after human validation → proves results. This cycle repeats for every SDLC activity.',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L26'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q7',
    prompt: 'Who owns decisions and outcomes in AI-SDLC?',
    options: [
      'The AI system',
      'The project manager only',
      'Humans (AI proposes, humans decide)',
      'The automation framework',
    ],
    correct: 2,
    explanation: "Human accountability is the 'loss function' in AI-SDLC. Humans own decisions and outcomes; AI proposes and executes within bounds set by humans.",
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L32-35'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q8',
    prompt: "What does 'adaptive depth' mean in AI-SDLC?",
    options: [
      'Always generate maximum documentation',
      'Execute only stages that add value, with exactly enough detail',
      'Adapt the AI model based on feedback',
      'Increase automation over time',
    ],
    correct: 1,
    explanation: 'Adaptive depth means executing only stages that add value for the current request and generating the level of detail needed—not a fixed ceremony.',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L48-50'],
      upstream: ['https://deepwiki.com/awslabs/aidlc-workflows/3.2-adaptive-intelligence'],
    },
  },
  {
    id: 'q9',
    prompt: 'What is the purpose of the audit.md file?',
    options: [
      'Store source code',
      'Append-only log of decisions and evidence',
      'List of bugs to fix',
      'User authentication records',
    ],
    correct: 1,
    explanation: 'audit.md is an append-only log that records decisions, approvals, and evidence. It provides an immutable audit trail for accountability and review.',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L157'],
      upstream: ['https://github.com/aws-samples/sample-aidlc-workflows'],
    },
  },
  {
    id: 'q10',
    prompt: "What is a 'unit' in AI-SDLC terminology?",
    options: [
      'A testing framework',
      'A small, coherent piece of work that can be built and verified independently',
      'A deployment environment',
      "A team member's role",
    ],
    correct: 1,
    explanation: 'Units are small, coherent pieces of work (bounded contexts/components) that can be built and verified independently. This enables incremental delivery with clear gates.',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L40-43'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q11',
    prompt: "What does 'plan-first, stage-by-stage' mean?",
    options: [
      'Write all code before planning',
      'Every meaningful step starts with a plan and approval gate before execution',
      'Plan the entire project upfront with no changes',
      'Let AI decide the order of work',
    ],
    correct: 1,
    explanation: 'Plan-first means every meaningful step starts with an explicit plan (with checkpoints) and an approval gate before execution. This is a core AI-SDLC principle.',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L36-39'],
      upstream: ['https://github.com/aws-samples/sample-aidlc-workflows'],
    },
  },
  {
    id: 'q12',
    prompt: "What criteria must be met at the 'Unit Done' gate?",
    options: [
      'Code is written',
      'Tests green + acceptance criteria met + review complete',
      'Documentation is updated',
      'Manager has approved the timeline',
    ],
    correct: 1,
    explanation: 'A unit is done when tests and checks are green, acceptance criteria are met, and review is complete. This is the proof-over-prose principle in action.',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L122'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q13',
    prompt: "What is 'Mob Elaboration' in AI-SDLC?",
    options: [
      'A code review meeting',
      'A collaborative ritual to convert intent into requirements and units',
      'A deployment ceremony',
      'A bug triage session',
    ],
    correct: 1,
    explanation: 'Mob Elaboration is a 60-minute collaborative ritual where the team works together to convert intent into requirements and units. AI proposes, humans refine.',
    sources: {
      local: ['aidlc-method-definition.md#L97-114'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q14',
    prompt: "What is a 'Bolt' in AI-SDLC?",
    options: [
      'A security vulnerability',
      'The smallest iteration, measured in hours or days',
      'A deployment artifact',
      'A testing framework',
    ],
    correct: 1,
    explanation: "A Bolt is the smallest iteration in AI-SDLC, measured in hours or days (not weeks). It's analogous to a Scrum sprint but faster, enabling rapid feedback.",
    sources: {
      local: ['aidlc-method-definition.md#L77-78'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q15',
    prompt: "What distinguishes a 'brownfield' project from 'greenfield'?",
    options: [
      'Brownfield uses newer technology',
      'Brownfield has existing code that needs modification',
      'Brownfield is smaller in scope',
      'Brownfield has no testing requirements',
    ],
    correct: 1,
    explanation: 'Brownfield projects have existing code that needs modification or extension, requiring mandatory reverse engineering. Greenfield projects start from scratch.',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L218-226'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q16',
    prompt: "What is the purpose of 'Workspace Detection' stage?",
    options: [
      'To set up the IDE',
      'To analyze if project is greenfield or brownfield and identify tech stack',
      'To configure CI/CD pipelines',
      'To allocate cloud resources',
    ],
    correct: 1,
    explanation: "Workspace Detection analyzes the project to determine if it's greenfield or brownfield and identifies the technology stack. This informs which stages will run.",
    sources: {
      local: ['aidlc-workflows/inception/workspace-detection.md'],
      upstream: ['https://github.com/awslabs/aidlc-workflows'],
    },
  },
  {
    id: 'q17',
    prompt: "What does the 'Intent' document capture?",
    options: [
      'Detailed technical specifications',
      'High-level goal, success metrics, and non-goals',
      'Team member assignments',
      'Budget and timeline',
    ],
    correct: 1,
    explanation: "The Intent document captures the high-level goal in one paragraph, plus success metrics and explicit non-goals. It's the starting point for AI-driven decomposition.",
    sources: {
      local: ['aidlc-method-definition.md#L68-69'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q18',
    prompt: "What is 'Mob Construction' in AI-SDLC?",
    options: [
      'Building physical infrastructure',
      'A collaborative session where AI generates code and humans validate',
      'A project kickoff meeting',
      'A retrospective ceremony',
    ],
    correct: 1,
    explanation: 'Mob Construction is a collaborative ritual where teams work together, with AI generating code and humans validating, to complete Bolts (small iterations).',
    sources: {
      local: ['aidlc-method-definition.md#L127-129'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q19',
    prompt: "What is the 'Ralph Loop' pattern?",
    options: [
      'A debugging technique',
      'Looping an AI agent until completion with objective success criteria',
      'A code review process',
      'A deployment strategy',
    ],
    correct: 1,
    explanation: 'The Ralph Loop is a pattern of looping an AI agent until completion with objective success criteria. Used inside Construction: generate → test → fix → repeat until pass.',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L274-298'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q20',
    prompt: 'What does NFR stand for in AI-SDLC?',
    options: [
      'New Feature Request',
      'Non-Functional Requirement',
      'Network Failure Recovery',
      'Node Framework Runtime',
    ],
    correct: 1,
    explanation: 'NFR stands for Non-Functional Requirement - quality attributes like availability, latency, security, compliance, and scalability that must be designed into the system.',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L95-96'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q21',
    prompt: 'What is the validation-report.md artifact for?',
    options: [
      'Listing team members',
      'Documenting test results, fixes applied, and acceptance criteria status',
      'Storing API keys',
      'Recording meeting notes',
    ],
    correct: 1,
    explanation: "The validation-report.md documents what tests/checks ran, their results, fixes applied, and final acceptance criteria status. It's the 'proof' in 'proof over prose'.",
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L119'],
      upstream: ['https://github.com/awslabs/aidlc-workflows'],
    },
  },
  {
    id: 'q22',
    prompt: 'How many core principles does AI-SDLC have?',
    options: ['5', '7', '10', '12'],
    correct: 2,
    explanation: 'AI-SDLC is guided by 10 principles, including "Reimagine don\'t Retrofit", "Reverse Conversation", "Proof over Prose", and "Human Accountability".',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L13-56'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q23',
    prompt: 'What happens in the Construction phase?',
    options: [
      'Requirements are gathered',
      'Units are transformed into tested, operations-ready code',
      'System is monitored in production',
      'Stakeholders are interviewed',
    ],
    correct: 1,
    explanation: 'Construction determines HOW to build. It transforms units into tested, operations-ready deployment units through design, code generation, and validation.',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L101-122'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q24',
    prompt: 'What is the purpose of the Operations phase?',
    options: [
      'To write more code',
      'To productionize with safety and observability',
      'To gather requirements',
      'To design the architecture',
    ],
    correct: 1,
    explanation: 'Operations determines WHERE and WHEN to run. It productionizes the system with safety, observability, deployment plans, runbooks, and cost modeling.',
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L124-138'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q25',
    prompt: "What is the 'Golden Thread' in AI-SDLC?",
    options: [
      'The source code repository',
      'The continuous path of context/intent from goal to deployment',
      'The financial budget for AI tools',
      'The main chat conversation history',
    ],
    correct: 1,
    explanation: "The Golden Thread is the continuous, unbroken path of context and intent from Business Intent → Code → Deployment. It is preserved by artifacts, not ephemeral chat history.",
    sources: {
      local: ['lessons.ts'],
      upstream: ['AI-SDLC definitions'],
    },
  },
  {
    id: 'q26',
    prompt: "What does 'Reverse the Conversation Direction' mean?",
    options: [
      'Humans should listen more',
      'AI initiates plans and proposals; Humans approve',
      'Start with code, then write requirements',
      'Developers talk to users directly',
    ],
    correct: 1,
    explanation: "It shifts the initiation of work to AI. Instead of humans doing the heavy lifting, AI proposes plans/trade-offs, and humans act as critical confirmers/validators.",
    sources: {
      local: ['AI-SDLC_best-practice_method_principles.md#L21'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  // 5 Levels & Operationalization Questions
  {
    id: 'q27',
    prompt: 'In the "5 Levels of AI Coding" framework, what does Level 3 represent?',
    options: [
      'AI autocompletes your code (spicy autocomplete)',
      'AI handles multi-file changes, you read all the code',
      'You direct AI and review at the PR/feature level',
      'You write specs and check outcomes — code is a black box',
    ],
    correct: 2,
    explanation: 'Level 3 is "developer as manager" — you direct AI and review what it produces at the feature/PR level. The model does the implementation and submits PRs for your review. Most developers top out here.',
    sources: {
      local: ['content/videos.ts#5-levels-ai-coding'],
      upstream: ['https://youtu.be/bDcgHzCBgmQ'],
    },
  },
  {
    id: 'q28',
    prompt: 'What is the key difference between "Scenarios" and traditional "Tests" in a dark factory?',
    options: [
      'Scenarios are written in natural language, tests are in code',
      'Scenarios live outside the codebase so the AI agent cannot see them during development',
      'Scenarios are faster to run than tests',
      'Scenarios only test the UI, tests cover the backend',
    ],
    correct: 1,
    explanation: 'Scenarios are behavioral specifications stored externally — a holdout set the agent never sees during development. This prevents the AI from optimizing for test passage rather than building correct software, like preventing "teaching to the test" in education.',
    sources: {
      local: ['content/videos.ts#5-levels-ai-coding'],
      upstream: ['https://youtu.be/bDcgHzCBgmQ'],
    },
  },
  {
    id: 'q29',
    prompt: 'What does the "J-curve" describe in AI tool adoption?',
    options: [
      'Revenue growth from AI products',
      'The initial productivity dip before workflows are redesigned around AI',
      'The learning curve for prompt engineering',
      'The cost curve of AI compute over time',
    ],
    correct: 1,
    explanation: 'The J-curve is the productivity dip that happens when you bolt AI onto existing workflows without redesigning them. METR found experienced developers got 19% slower with AI tools — while believing they were 24% faster. Most organizations are stuck at the bottom.',
    sources: {
      local: ['content/videos.ts#5-levels-ai-coding'],
      upstream: ['https://youtu.be/bDcgHzCBgmQ'],
    },
  },
  {
    id: 'q30',
    prompt: 'In the AI-SDLC RACI matrix, who is NEVER the Accountable party?',
    options: [
      'The Product Owner',
      'The Developer',
      'The AI Agent',
      'The Engineering Manager',
    ],
    correct: 2,
    explanation: 'AI is never the Accountable party — this is the fundamental safety mechanism of AI-SDLC. AI is Responsible (does the work), but humans always hold Accountability (approve and own outcomes).',
    sources: {
      local: ['content/transition.ts'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q31',
    prompt: 'What metric replaces "velocity" (story points) in AI-SDLC?',
    options: [
      'Lines of code per day',
      'Number of AI prompts sent',
      'Business Value Delivered (Intent Completion Rate)',
      'Number of Bolts completed',
    ],
    correct: 2,
    explanation: 'When AI flattens the effort curve between simple and complex tasks, story points lose meaning. AI-SDLC tracks Intent Completion Rate — the percentage of business goals that become shipped software.',
    sources: {
      local: ['content/transition.ts'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q32',
    prompt: 'What is the red flag when Human Override Rate drops below 5%?',
    options: [
      'AI is perfectly calibrated',
      'The team is too slow at reviewing',
      'Developers are likely rubber-stamping AI output without meaningful review',
      'The AI model needs to be upgraded',
    ],
    correct: 2,
    explanation: 'A Human Override Rate below 5% is as concerning as one above 25%. It usually means developers are not scrutinizing AI output — creating "quick-cement" code that is fast to generate but rigid and hard to maintain.',
    sources: {
      local: ['content/glossary.ts#human-override-rate'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
  {
    id: 'q33',
    prompt: 'What is the first step in the brownfield migration path toward autonomous AI development?',
    options: [
      'Deploy a dark factory immediately',
      'Rewrite the entire system from scratch',
      'Use AI at Level 2–3 to accelerate current development work',
      'Fire the QA team and replace with AI agents',
    ],
    correct: 2,
    explanation: 'The brownfield path starts with using AI at L2/L3 to accelerate existing work. Then you reverse-engineer specs from code, build scenario suites, upgrade CI/CD for AI volume, and only then shift new development toward higher autonomy.',
    sources: {
      local: ['content/videos.ts#5-levels-ai-coding'],
      upstream: ['https://youtu.be/bDcgHzCBgmQ'],
    },
  },
  {
    id: 'q34',
    prompt: 'What does "Elevation" mean in brownfield AI-SDLC?',
    options: [
      'Promoting a developer to tech lead',
      'AI reverse-engineers the existing codebase into static and dynamic models before making changes',
      'Moving the application to the cloud',
      'Increasing the AI model\'s context window',
    ],
    correct: 1,
    explanation: 'Elevation is the mandatory brownfield step where AI reverse-engineers the codebase into component models (static) and interaction flows (dynamic). The team validates these models before any construction begins.',
    sources: {
      local: ['content/glossary.ts#elevation'],
      upstream: ['https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/'],
    },
  },
];

export const QUIZ_TITLE = 'AI-SDLC Knowledge Quiz';
export const QUIZ_DESCRIPTION = 'Test your understanding of AI-SDLC concepts';

export function getQuizQuestions(): QuizQuestion[] {
  return QUIZ_QUESTIONS;
}

export function getQuizQuestionById(id: string): QuizQuestion | undefined {
  return QUIZ_QUESTIONS.find(q => q.id === id);
}

export function getTotalQuestions(): number {
  return QUIZ_QUESTIONS.length;
}
