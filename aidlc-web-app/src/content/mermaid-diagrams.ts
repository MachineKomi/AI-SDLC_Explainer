/**
 * Mermaid Diagram Definitions for AI-SDLC Explainer
 * 
 * These diagrams are rendered by MermaidRenderer.tsx with theme-aware styling.
 * Each diagram uses neutral colors (will be overridden by theme) with strategic
 * accent color classes for highlighting key elements.
 */

// ============================================
// 1. PHASES FLOW - AI-SDLC Lifecycle Overview
// ============================================
export const PHASES_FLOW = `
flowchart LR
    subgraph INCEPTION["🎯 INCEPTION"]
        direction TB
        I1[Capture Intent]
        I2[Mob Elaboration]
        I3[Define Units]
        I1 --> I2 --> I3
    end

    subgraph CONSTRUCTION["🔨 CONSTRUCTION"]
        direction TB
        C1[Domain Design]
        C2[Logical Design]
        C3[Code + Tests]
        C1 --> C2 --> C3
    end

    subgraph OPERATIONS["🚀 OPERATIONS"]
        direction TB
        O1[Deploy]
        O2[Monitor]
        O3[Adapt]
        O1 --> O2 --> O3
    end

    INCEPTION --> |"Gate 1"| CONSTRUCTION
    CONSTRUCTION --> |"Gate 2"| OPERATIONS
    OPERATIONS -.-> |"Feedback"| INCEPTION

    style INCEPTION stroke:#ec4899,stroke-width:2px
    style CONSTRUCTION stroke:#f97316,stroke-width:2px
    style OPERATIONS stroke:#22c55e,stroke-width:2px
`;

// ============================================
// 2. GATE LOOP - Human-AI Collaboration
// ============================================
export const GATE_LOOP = `
flowchart TB
    subgraph LOOP["The Gate Loop"]
        direction TB
        PLAN["🤖 AI PLANS<br/>Decompose & Propose"]
        GATE["👤 HUMAN GATES<br/>Validate & Approve"]
        EXEC["🤖 AI EXECUTES<br/>Implement & Test"]
        
        PLAN --> GATE
        GATE --> |"Approved"| EXEC
        GATE --> |"Rejected"| PLAN
        EXEC --> |"Next Unit"| PLAN
    end

    style PLAN stroke:#ec4899,stroke-width:2px
    style GATE stroke:#f59e0b,stroke-width:2px
    style EXEC stroke:#22c55e,stroke-width:2px
`;

// ============================================
// 3. ARTIFACT TREE - Directory Structure
// ============================================
export const ARTIFACT_TREE = `
flowchart TB
    ROOT[".aidlc/"]
    
    STATE["aidlc-state.md<br/><i>Current status</i>"]
    PLAN["execution-plan.md<br/><i>Level 1 workflow</i>"]
    AUDIT["audit.md<br/><i>Decision log</i>"]
    
    INC["inception/"]
    CON["construction/"]
    OPS["operations/"]
    
    INTENT["intent.md"]
    REQ["requirements.md"]
    UNITS["units/"]
    
    UNIT01["unit-01/"]
    DOMAIN["domain.md"]
    LOGICAL["logical.md"]
    
    ROOT --> STATE
    ROOT --> PLAN
    ROOT --> AUDIT
    ROOT --> INC
    ROOT --> CON
    ROOT --> OPS
    
    INC --> INTENT
    INC --> REQ
    INC --> UNITS
    
    CON --> UNIT01
    UNIT01 --> DOMAIN
    UNIT01 --> LOGICAL

    style ROOT fill:#ec4899,color:#fff,stroke:#ec4899
    style INC fill:#3b82f6,color:#fff,stroke:#3b82f6
    style CON fill:#f97316,color:#fff,stroke:#f97316
    style OPS fill:#22c55e,color:#fff,stroke:#22c55e
`;

// ============================================
// 4. CONSTRUCTION LOOP - Iterative Build Cycle
// ============================================
export const CONSTRUCTION_LOOP = `
flowchart LR
    subgraph BOLT["Bolt Iteration"]
        direction TB
        P["📋 PLAN<br/><small>AI proposes approach</small>"]
        A["❓ ASK<br/><small>AI seeks clarification</small>"]
        V["✓ VALIDATE<br/><small>Human approves</small>"]
        I["⚡ IMPLEMENT<br/><small>AI executes</small>"]
        
        P --> A
        A --> V
        V --> I
        I --> |"Next task"| P
    end

    D1["Domain<br/>Design"] --> BOLT
    BOLT --> D2["Deployment<br/>Unit"]

    style P stroke:#ec4899
    style A stroke:#f97316
    style V stroke:#f59e0b
    style I stroke:#22c55e
`;

// ============================================
// 5. INCEPTION FLOW - Phase 1 Detail
// ============================================
export const INCEPTION_FLOW = `
flowchart TB
    START(["💡 Business Intent"])
    
    subgraph MOB["Mob Elaboration Ritual"]
        Q["AI asks clarifying questions"]
        E["AI elaborates into user stories"]
        U["AI groups into Units"]
        R["Team reviews and refines"]
        
        Q --> E --> U --> R
        R --> |"More clarity needed"| Q
    end

    START --> MOB
    
    OUT1["📄 PRFAQ"]
    OUT2["📋 User Stories"]
    OUT3["📦 Units"]
    OUT4["⚠️ Risk Register"]
    OUT5["🔧 Bolt Plan"]
    
    MOB --> OUT1
    MOB --> OUT2
    MOB --> OUT3
    MOB --> OUT4
    MOB --> OUT5

    OUT3 --> GATE{"🚦 Gate 1<br/>Ready for Construction?"}
    
    style START fill:#ec4899,color:#fff,stroke:#ec4899
    style GATE fill:#f59e0b,color:#000,stroke:#f59e0b
    style MOB stroke:#3b82f6,stroke-width:2px
`;

// ============================================
// 6. PHASES SIMPLE - Compact Overview
// ============================================
export const PHASES_SIMPLE = `
flowchart LR
    I["🎯 INCEPTION<br/><small>What & Why</small>"]
    C["🔨 CONSTRUCTION<br/><small>How</small>"]
    O["🚀 OPERATIONS<br/><small>Run & Monitor</small>"]
    
    I --> |"Gate"| C --> |"Gate"| O
    O -.-> |"Feedback"| I

    style I fill:#ec4899,color:#fff,stroke:#ec4899,stroke-width:2px
    style C fill:#f97316,color:#fff,stroke:#f97316,stroke-width:2px
    style O fill:#22c55e,color:#fff,stroke:#22c55e,stroke-width:2px
`;

// ============================================
// 7. SMALL BATCHES - Work Unit Comparison
// ============================================
export const SMALL_BATCHES = `
flowchart TB
    subgraph BAD["❌ Monolithic Approach"]
        M1["Massive 'Do Everything' Task"]
        M2["High Risk"]
        M3["Long Feedback Loop"]
        M1 --- M2 --- M3
    end

    subgraph GOOD["✅ Small Batches"]
        S1["Auth Unit<br/><small>1-2 Days</small>"]
        S2["API Unit<br/><small>1-2 Days</small>"]
        S3["UI Unit<br/><small>1-2 Days</small>"]
    end

    BAD -.-> |"Transform"| GOOD

    style BAD stroke:#ef4444,stroke-width:2px
    style GOOD stroke:#22c55e,stroke-width:2px
    style S1 stroke:#22c55e
    style S2 stroke:#22c55e
    style S3 stroke:#22c55e
`;

// ============================================
// 8. ADAPTIVE DEPTH - Task Complexity Scaling
// ============================================
export const ADAPTIVE_DEPTH = `
flowchart LR
    subgraph COMPLEX["🔬 Complex Task"]
        direction TB
        C1["Detailed Spec"]
        C2["Architecture Review"]
        C3["Formal Verification"]
        C4["Load Testing"]
        C1 --> C2 --> C3 --> C4
    end

    subgraph SIMPLE["📝 Simple Task"]
        direction TB
        S1["Brief Spec"]
        S2["Implementation"]
        S3["Standard Tests"]
    end

    INTENT(["Intent"]) --> |"High Risk"| COMPLEX
    INTENT --> |"Low Risk"| SIMPLE

    style COMPLEX stroke:#6366f1,stroke-width:2px
    style SIMPLE stroke:#3b82f6,stroke-width:2px
    style INTENT fill:#ec4899,color:#fff,stroke:#ec4899
`;

// ============================================
// 9. STRUCTURED QA - Question Format
// ============================================
export const STRUCTURED_QA = `
flowchart TB
    Q["📋 AI asks structured question"]
    
    subgraph OPTIONS["Human selects option"]
        A["A: AWS Lambda"]
        B["B: Kubernetes ✓"]
        C["C: On-premise"]
    end

    Q --> OPTIONS
    
    RATIONALE["💭 Human provides rationale:<br/>'Matches existing cluster'"]
    OPTIONS --> RATIONALE
    
    NEXT["AI proceeds with decision context"]
    RATIONALE --> NEXT

    style Q stroke:#ec4899,stroke-width:2px
    style B stroke:#22c55e,stroke-width:2px
    style RATIONALE stroke:#f59e0b,stroke-width:2px
`;

// ============================================
// 10. PROOF OVER PROSE - Evidence-Based
// ============================================
export const PROOF_OVER_PROSE = `
flowchart LR
    subgraph PROSE["❌ Prose Claims"]
        P1["'It should work'"]
        P2["'I tested it'"]
        P3["'Trust me'"]
    end

    subgraph PROOF["✅ Proof Artifacts"]
        T1["✓ test_login PASSED"]
        T2["✓ test_jwt PASSED"]
        T3["✓ test_rate_limit PASSED"]
        T4["📊 3 passed in 0.45s"]
    end

    PROSE -.-> |"Replace with"| PROOF

    style PROSE stroke:#ef4444,stroke-width:2px
    style PROOF stroke:#22c55e,stroke-width:2px
`;

// ============================================
// 11. AUDIT TRAIL - Decision Log
// ============================================
export const AUDIT_TRAIL = `
flowchart TB
    subgraph LOG["📜 Audit Trail"]
        direction TB
        E1["2026-01-28 10:30<br/>DECISION: Unit 01 Approved<br/>@tech-lead"]
        E2["2026-01-28 14:15<br/>CHANGE: Scope +MFA<br/>@product"]
        E3["2026-01-29 09:00<br/>DEPLOY: Staging v0.1.0<br/>@ops"]
        
        E1 --> E2 --> E3
    end

    BENEFIT["Every decision traceable<br/>Full accountability"]
    LOG --> BENEFIT

    style E1 stroke:#22c55e
    style E2 stroke:#f59e0b
    style E3 stroke:#3b82f6
    style BENEFIT fill:#ec4899,color:#fff,stroke:#ec4899
`;

// ============================================
// 12. CONTEXT PERSISTENCE - Durable Memory
// ============================================
export const CONTEXT_PERSISTENCE = `
flowchart LR
    subgraph CHAT["💬 Chat - Ephemeral"]
        C1["'Build login...'"]
        C2["'Here's code...'"]
        C3["❌ Session closed"]
        C1 --> C2 --> C3
    end

    subgraph REPO["📁 Repo - Durable"]
        R1["state.md"]
        R2["audit.md"]
        R3["plan.md"]
        R4["✅ Always available"]
    end

    CHAT -.-> |"Persisted as"| REPO

    style CHAT stroke:#ef4444,stroke-width:2px
    style REPO stroke:#22c55e,stroke-width:2px
    style C3 stroke:#ef4444
    style R4 stroke:#22c55e
`;

// ============================================
// 13. FAIL FAST - Pipeline Interruption
// ============================================
export const FAIL_FAST = `
flowchart LR
    CODE["💻 Code"] --> LINT["🔍 Lint"]
    LINT --> TEST["🧪 Test"]
    TEST --> |"❌ FAIL"| STOP["🛑 STOP!"]
    TEST --> |"✓ Pass"| DEPLOY["🚀 Deploy"]
    
    STOP --> ROLLBACK["↩️ Rollback Ready"]
    
    style TEST stroke:#ef4444,stroke-width:2px
    style STOP fill:#ef4444,color:#fff,stroke:#ef4444,stroke-width:3px
    style ROLLBACK stroke:#22c55e
    style DEPLOY stroke:#22c55e
`;

// ============================================
// 14. PROMPTS AS CODE - Version Control
// ============================================
export const PROMPTS_AS_CODE = `
flowchart TB
    subgraph PROMPT["📄 prompts/unit-01-planner.md"]
        P1["You are an architectural planner."]
        P2["+ Constraints:"]
        P3["+ 1. No direct implementation"]
        P4["+ 2. Use TDD strictly"]
        P1 --> P2 --> P3 --> P4
    end

    GIT["🔀 Git versioned<br/>committed by @lead"]
    PROMPT --> GIT

    BENEFITS["✅ Reproducible<br/>✅ Auditable<br/>✅ Reviewable"]
    GIT --> BENEFITS

    style PROMPT stroke:#a855f7,stroke-width:2px
    style GIT stroke:#3b82f6
    style BENEFITS stroke:#22c55e
`;

// ============================================
// COMPONENT-ONLY DIAGRAMS (Not Mermaid)
// These are better rendered as React components:
// - lesson-complete: Celebratory animation/confetti
// - principles-list: Numbered list with icons
// - plan-first-comparison: Side-by-side comparison
// - accountability-table: HTML table format
// ============================================

// ============================================
// Export all diagrams as a lookup map
// ============================================
export const MERMAID_DIAGRAMS = {
    'phases-flow': PHASES_FLOW,
    'gate-loop': GATE_LOOP,
    'artifact-tree': ARTIFACT_TREE,
    'construction-loop': CONSTRUCTION_LOOP,
    'inception-flow': INCEPTION_FLOW,
    'phases': PHASES_SIMPLE,
    'small-batches': SMALL_BATCHES,
    'adaptive-depth': ADAPTIVE_DEPTH,
    'structured-qa': STRUCTURED_QA,
    'proof-over-prose': PROOF_OVER_PROSE,
    'audit-trail': AUDIT_TRAIL,
    'context-persistence': CONTEXT_PERSISTENCE,
    'fail-fast': FAIL_FAST,
    'prompts-as-code': PROMPTS_AS_CODE,
} as const;

export type MermaidDiagramType = keyof typeof MERMAID_DIAGRAMS;

// Component-only diagram types (rendered by DiagramRenderer, not Mermaid)
export type ComponentDiagramType =
    | 'lesson-complete'
    | 'principles-list'
    | 'plan-first-comparison'
    | 'accountability-table';

// All diagram types
export type AllDiagramType = MermaidDiagramType | ComponentDiagramType;

/**
 * Get a Mermaid diagram definition by type
 */
export function getMermaidDiagram(type: MermaidDiagramType): string {
    return MERMAID_DIAGRAMS[type];
}

/**
 * Check if a diagram type is a Mermaid diagram
 */
export function isMermaidDiagram(type: string): type is MermaidDiagramType {
    return type in MERMAID_DIAGRAMS;
}
