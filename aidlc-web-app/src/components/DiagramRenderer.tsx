"use client";

import { motion } from "framer-motion";
import {
    ArrowRight, CheckCircle, ShieldCheck, FileText,
    Terminal, AlertTriangle, GitCommit, Database,
    MessageSquare, Check, X, RotateCcw
} from "lucide-react";

type DiagramType =
    | "phases"
    | "gate-loop"
    | "construction-loop"
    | "artifact-tree"
    | "lesson-complete"
    | "principles-list"
    | "plan-first-comparison"
    | "accountability-table"
    | "small-batches"
    | "adaptive-depth"
    | "structured-qa"
    | "proof-over-prose"
    | "audit-trail"
    | "context-persistence"
    | "fail-fast"
    | "prompts-as-code"
    | "inception-flow";

interface DiagramRendererProps {
    type: DiagramType;
    className?: string;
}

// ... (Previous diagrams: PhasesFlowDiagram, GateLoopDiagram, ConstructionLoopDiagram, ArtifactTreeDiagram - KEEP THESE) ...

// === NEW DIAGRAMS ===

// Lesson Complete Card
function LessonCompleteDiagram() {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-8 rounded-xl border border-accent-success/30 bg-accent-success/5 text-center"
        >
            <div className="w-16 h-16 rounded-full bg-accent-success/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-accent-success" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Lesson Complete!</h3>
            <p className="text-foreground-muted">You&apos;ve mastered this concept. Ready for the next challenge?</p>
        </motion.div>
    );
}

// Principles List
function PrinciplesListDiagram() {
    const principles = [
        "Plan-First", "Human Accountability", "Small Batches", "Adaptive Depth", "Structured Q&A",
        "Proof over Prose", "Auditable Trail", "Context Persistence", "Fail Fast", "Prompts as Code"
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4">
            {principles.map((p, i) => (
                <motion.div
                    key={p}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center text-xs font-bold ring-1 ring-accent-primary/40">
                        {i + 1}
                    </span>
                    <span className="font-medium text-foreground">{p}</span>
                </motion.div>
            ))}
        </div>
    );
}

// Plan First Comparison (Bad vs Good)
function PlanFirstComparisonDiagram() {
    return (
        <div className="grid md:grid-cols-2 gap-6 py-4">
            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                <div className="flex items-center gap-2 mb-3 text-red-400 font-bold">
                    <X className="w-5 h-5" /> BAD: Prose Request
                </div>
                <div className="font-mono text-sm text-foreground-muted bg-black/20 p-3 rounded">
                    &quot;Build me a login page&quot;
                </div>
                <p className="text-xs text-red-300/70 mt-2">Vague, assumes AI knows context, no safety checks.</p>
            </div>
            <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5">
                <div className="flex items-center gap-2 mb-3 text-green-400 font-bold">
                    <Check className="w-5 h-5" /> GOOD: Plan Request
                </div>
                <div className="font-mono text-sm text-foreground-muted bg-black/20 p-3 rounded">
                    &quot;Create a plan for login page with checkpoints. Stop for approval.&quot;
                </div>
                <p className="text-xs text-green-300/70 mt-2">Explicit, verifiable, human-in-the-loop.</p>
            </div>
        </div>
    );
}

// Accountability Table
function AccountabilityTableDiagram() {
    return (
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 my-4">
            <table className="w-full text-sm min-w-[300px]">
                <thead>
                    <tr className="bg-white/5 text-left border-b border-white/10">
                        <th className="p-4 font-bold text-accent-primary">AI OWNS (Execution)</th>
                        <th className="p-4 font-bold text-accent-secondary">HUMAN OWNS (Decisions)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {[
                        ["Code Generation", "Requirements Scope"],
                        ["Test Execution", "Architecture Choices"],
                        ["Documentation Writing", "Security Controls"],
                        ["Infrastructure Plans", "Go/No-Go Approvals"]
                    ].map(([ai, human], i) => (
                        <tr key={i} className="hover:bg-white/5">
                            <td className="p-4 flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-accent-primary opacity-70" /> {ai}
                            </td>
                            <td className="p-4">
                                <span className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-accent-secondary opacity-70" /> {human}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Small Batches
function SmallBatchesDiagram() {
    return (
        <div className="flex flex-col gap-6 py-4">
            <div className="flex items-center gap-4 opacity-50 grayscale">
                <div className="text-xs font-mono uppercase w-16 text-right">Monolithic</div>
                <div className="h-16 flex-1 bg-red-500/20 border border-red-500/40 rounded-lg flex items-center justify-center text-red-300">
                    Massive &quot;Do Everything&quot; Task (High Risk)
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-xs font-mono uppercase w-16 text-right text-accent-success font-bold">Small Batches</div>
                <div className="flex-1 flex gap-2">
                    {["Auth Unit", "API Unit", "UI Unit"].map((unit, i) => (
                        <motion.div
                            key={unit}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="h-16 flex-1 bg-accent-success/10 border border-accent-success/30 rounded-lg flex flex-col items-center justify-center text-accent-success hover:bg-accent-success/20 transition-colors"
                        >
                            <span className="font-bold text-sm">{unit}</span>
                            <span className="text-[10px] opacity-70">1-2 Days</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Adaptive Depth
function AdaptiveDepthDiagram() {
    return (
        <div className="grid md:grid-cols-2 gap-4 py-4">
            <div className="glass-card p-4 rounded-xl bg-background-tertiary/20">
                <h4 className="font-bold text-accent-primary mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4" /> Complex Task
                </h4>
                <div className="space-y-2">
                    {["Detailed Spec", "Architecture Review", "Formal Verification", "Load Testing"].map(item => (
                        <div key={item} className="px-3 py-1.5 rounded bg-accent-primary/10 border-l-2 border-accent-primary text-xs">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <div className="glass-card p-4 rounded-xl bg-background-tertiary/20">
                <h4 className="font-bold text-accent-secondary mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Simple Task
                </h4>
                <div className="space-y-2">
                    {["Brief Spec", "Implementation", "Standard Tests"].map(item => (
                        <div key={item} className="px-3 py-1.5 rounded bg-accent-secondary/10 border-l-2 border-accent-secondary text-xs">
                            {item}
                        </div>
                    ))}
                    <div className="px-3 py-1.5 rounded bg-white/5 border-l-2 border-white/10 text-xs text-foreground-muted italic">
                        No unnecessary ceremony
                    </div>
                </div>
            </div>
        </div>
    );
}

// Structured Q&A
function StructuredQADiagram() {
    return (
        <div className="rounded-lg overflow-hidden border border-white/10 bg-black/40 font-mono text-sm my-4">
            <div className="bg-white/5 px-4 py-2 text-xs text-foreground-muted border-b border-white/10 flex items-center gap-2">
                <FileText className="w-3 h-3" /> requirements-questions.md
            </div>
            <div className="p-4 space-y-4">
                <div className="text-foreground">
                    <span className="text-accent-primary">Q:</span> Primary deployment target?
                    <ul className="ml-4 mt-1 text-foreground-muted space-y-1">
                        <li>[ ] A) AWS Lambda</li>
                        <li>[x] B) Kubernetes</li>
                        <li>[ ] C) On-premise</li>
                    </ul>
                </div>
                <div className="pl-4 border-l-2 border-accent-success/50">
                    <span className="text-accent-success font-bold">Answer:</span> B
                    <br />
                    <span className="text-foreground-muted italic">Rationale: Matches existing cluster infrastructure.</span>
                </div>
            </div>
        </div>
    );
}

// Proof over Prose
function ProofOverProseDiagram() {
    return (
        <div className="rounded-lg overflow-hidden border border-white/10 bg-black/60 font-mono text-xs my-4 shadow-xl">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-2">
                <Terminal className="w-3 h-3 text-accent-success" /> Test Output
            </div>
            <div className="p-4 space-y-1">
                <div className="text-foreground-muted">$ pytest tests/auth/ -v</div>
                <div className="text-accent-success">test_login_success ............ PASSED</div>
                <div className="text-accent-success">test_jwt_validation ........... PASSED</div>
                <div className="text-accent-success">test_rate_limiting ............ PASSED</div>
                <div className="mt-2 pt-2 border-t border-white/10 text-foreground font-bold">
                    Currently: <span className="text-accent-success">3 passed</span> in 0.45s
                </div>
            </div>
        </div>
    );
}

// Audit Trail
function AuditTrailDiagram() {
    return (
        <div className="space-y-2 font-mono text-xs my-4">
            {[
                { date: "2026-01-28 10:30", type: "DECISION", text: "Unit 01 Approved", user: "@tech-lead", color: "text-accent-success" },
                { date: "2026-01-28 14:15", type: "CHANGE", text: "Scope increased: Add MFA", user: "@product", color: "text-accent-warning" },
                { date: "2026-01-29 09:00", type: "DEPLOY", text: "Staging Release v0.1.0", user: "@ops", color: "text-accent-primary" },
            ].map((entry, i) => (
                <div key={i} className="flex gap-3 p-2 rounded bg-white/5 border-l-2 border-white/20">
                    <span className="text-foreground-muted">{entry.date}</span>
                    <span className={`font-bold w-20 ${entry.color}`}>{entry.type}</span>
                    <span className="flex-1 text-foreground">{entry.text}</span>
                    <span className="opacity-50">{entry.user}</span>
                </div>
            ))}
        </div>
    );
}

// Context Persistence
function ContextPersistenceDiagram() {
    return (
        <div className="grid grid-cols-2 gap-4 my-4">
            <div className="p-3 border border-red-500/20 bg-red-500/5 rounded-lg opacity-70">
                <div className="flex items-center gap-2 mb-2 text-red-400 font-bold text-xs uppercase">
                    <MessageSquare className="w-3 h-3" /> Chat (Ephemeral)
                </div>
                <div className="space-y-2 text-xs">
                    <div className="bg-black/20 p-2 rounded">&quot;Build login...&quot;</div>
                    <div className="bg-black/20 p-2 rounded">&quot;Here&apos;s code...&quot;</div>
                    <div className="text-red-400 italic text-[10px] text-center mt-2">-- Session Closed / Context Lost --</div>
                </div>
            </div>
            <div className="p-3 border border-green-500/20 bg-green-500/5 rounded-lg">
                <div className="flex items-center gap-2 mb-2 text-green-400 font-bold text-xs uppercase">
                    <Database className="w-3 h-3" /> Repo (Durable)
                </div>
                <div className="space-y-1 text-xs font-mono">
                    <div className="p-1 px-2 bg-black/20 rounded flex items-center gap-2"><FileText className="w-3 h-3 text-blue-400" /> state.md</div>
                    <div className="p-1 px-2 bg-black/20 rounded flex items-center gap-2"><FileText className="w-3 h-3 text-amber-400" /> audit.md</div>
                    <div className="p-1 px-2 bg-black/20 rounded flex items-center gap-2"><FileText className="w-3 h-3 text-purple-400" /> plan.md</div>
                    <div className="text-green-400 italic text-[10px] text-center mt-2">-- Always Available --</div>
                </div>
            </div>
        </div>
    );
}

// Fail Fast
function FailFastDiagram() {
    return (
        <div className="flex items-center gap-2 overflow-x-auto py-4">
            {["Code", "Lint", "Test", "Deploy"].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                    <div className={`
                        px-4 py-3 rounded-lg border flex flex-col items-center min-w-[80px]
                        ${i === 2 ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-white/5 border-white/10'}
                    `}>
                        <span className="font-bold text-sm">{step}</span>
                        {i === 2 && <span className="text-[10px] font-bold mt-1">STOP!</span>}
                    </div>
                    {i < 3 && <ArrowRight className={`w-4 h-4 ${i === 2 ? 'text-red-500' : 'text-foreground-muted'}`} />}
                </div>
            ))}
            <div className="ml-4 px-3 py-1 rounded bg-accent-success/20 border border-accent-success/40 text-accent-success text-xs">
                Rollback Ready
            </div>
        </div>
    );
}

// Prompts as Code
function PromptsAsCodeDiagram() {
    return (
        <div className="rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-xs my-4">
            <div className="text-purple-400 mb-2"># prompts/unit-01-planner.md</div>
            <div className="text-foreground-muted pl-4 border-l border-white/10">
                <div>You are an architectural planner.</div>
                <div className="text-accent-success">+ Constraints:</div>
                <div className="text-accent-success">+ 1. No direct implementation</div>
                <div className="text-accent-success">+ 2. Use TDD strictly</div>
                <div className="mt-2 text-foreground-muted w-full border-t border-white/5 pt-2 flex items-center gap-2">
                    <GitCommit className="w-3 h-3 text-blue-400" />
                    <span>committed by @lead</span>
                </div>
            </div>
        </div>
    );
}

// Inception Flow
function InceptionFlowDiagram() {
    const steps = ["Workspace Detection", "Analysis", "Workflow Planning", "Units Generation"];
    return (
        <div className="flex flex-col gap-4 items-center py-4">
            {steps.map((step, i) => (
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full max-w-xs p-3 text-center rounded-lg border border-accent-primary/20 bg-accent-primary/5 flex items-center justify-center relative"
                >
                    {step}
                    {i < steps.length - 1 && (
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-foreground-muted">↓</div>
                    )}
                </motion.div>
            ))}
        </div>
    );
}

// === MAIN RENDERER ===
function PhasesFlowDiagram() {
    const phases = [
        { name: "INCEPTION", subtitle: "What/Why", color: "from-blue-500 to-cyan-500" },
        { name: "CONSTRUCTION", subtitle: "How", color: "from-purple-500 to-pink-500" },
        { name: "OPERATIONS", subtitle: "Run/Monitor", color: "from-green-500 to-emerald-500" },
    ];

    return (
        <div className="flex flex-col items-center gap-6 py-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
                {phases.map((phase, i) => (
                    <div key={phase.name} className="flex items-center gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`px-6 py-4 rounded-xl bg-gradient-to-br ${phase.color} text-white text-center shadow-lg`}
                        >
                            <div className="font-bold text-sm">{phase.name}</div>
                            <div className="text-xs opacity-80">({phase.subtitle})</div>
                        </motion.div>
                        {i < phases.length - 1 && (
                            <ArrowRight className="w-6 h-6 text-foreground-muted" />
                        )}
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-12 mt-4">
                {phases.map((phase, i) => (
                    <motion.div
                        key={`gate-${i}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-px h-8 bg-foreground-muted/30"></div>
                        <div className="px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-medium">
                            GATE
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function GateLoopDiagram() {
    const steps = [
        { name: "PLAN", actor: "AI", icon: "🤖" },
        { name: "GATE", actor: "Human", icon: "👤" },
        { name: "EXECUTE", actor: "AI", icon: "🤖" },
    ];

    return (
        <div className="flex flex-col items-center gap-6 py-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
                {steps.map((step, i) => (
                    <div key={step.name} className="flex items-center gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`px-5 py-4 rounded-xl text-center shadow-lg ${step.actor === "Human"
                                ? "bg-amber-500/20 border-2 border-amber-500/50"
                                : "bg-accent-primary/20 border-2 border-accent-primary/50"
                                }`}
                        >
                            <div className="text-2xl mb-1">{step.icon}</div>
                            <div className="font-bold text-sm">{step.name}</div>
                            <div className="text-xs text-foreground-muted">({step.actor})</div>
                        </motion.div>
                        {i < steps.length - 1 && (
                            <ArrowRight className="w-5 h-5 text-foreground-muted" />
                        )}
                    </div>
                ))}
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-xs text-foreground-muted"
            >
                <RotateCcw className="w-3 h-3" />
                <span>Loop until complete</span>
            </motion.div>
        </div>
    );
}

function ConstructionLoopDiagram() {
    const steps = [
        { name: "PLAN", actor: "AI" },
        { name: "ASK", actor: "AI" },
        { name: "VALIDATE", actor: "Human" },
        { name: "IMPLEMENT", actor: "AI" },
    ];

    return (
        <div className="flex flex-col items-center gap-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`px-4 py-3 rounded-lg text-center ${step.actor === "Human"
                            ? "bg-amber-500/20 border border-amber-500/40"
                            : "bg-accent-primary/20 border border-accent-primary/40"
                            }`}
                    >
                        <div className="font-bold text-sm">{step.name}</div>
                        <div className="text-xs text-foreground-muted">({step.actor})</div>
                    </motion.div>
                ))}
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-foreground-muted flex items-center gap-2"
            >
                <RotateCcw className="w-3 h-3" />
                <span>Iterative loop per unit of work</span>
            </motion.div>
        </div>
    );
}

function ArtifactTreeDiagram() {
    const tree = [
        { name: ".aidlc/", level: 0, isDir: true },
        { name: "aidlc-state.md", level: 1 },
        { name: "execution-plan.md", level: 1 },
        { name: "audit.md", level: 1 },
        { name: "inception/", level: 1, isDir: true },
        { name: "intent.md", level: 2 },
        { name: "requirements.md", level: 2 },
        { name: "construction/", level: 1, isDir: true },
        { name: "unit-01/", level: 2, isDir: true },
        { name: "operations/", level: 1, isDir: true },
    ];

    return (
        <div className="py-4">
            <div className="font-mono text-sm bg-background-tertiary/50 rounded-lg p-6 inline-block w-full">
                {tree.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-center gap-2 mb-1"
                    >
                        <span className="text-foreground-muted whitespace-pre">
                            {"  ".repeat(item.level)}
                            {item.level > 0 && "├── "}
                        </span>
                        <span className={item.isDir ? "text-accent-primary font-bold" : "text-foreground"}>
                            {item.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default function DiagramRenderer({ type, className = "" }: DiagramRendererProps) {
    return (
        <div className={`diagram-container w-full ${className}`}>
            {type === "phases" && <PhasesFlowDiagram />}
            {type === "gate-loop" && <GateLoopDiagram />}
            {type === "construction-loop" && <ConstructionLoopDiagram />}
            {type === "artifact-tree" && <ArtifactTreeDiagram />}
            {type === "lesson-complete" && <LessonCompleteDiagram />}
            {type === "principles-list" && <PrinciplesListDiagram />}
            {type === "plan-first-comparison" && <PlanFirstComparisonDiagram />}
            {type === "accountability-table" && <AccountabilityTableDiagram />}
            {type === "small-batches" && <SmallBatchesDiagram />}
            {type === "adaptive-depth" && <AdaptiveDepthDiagram />}
            {type === "structured-qa" && <StructuredQADiagram />}
            {type === "proof-over-prose" && <ProofOverProseDiagram />}
            {type === "audit-trail" && <AuditTrailDiagram />}
            {type === "context-persistence" && <ContextPersistenceDiagram />}
            {type === "fail-fast" && <FailFastDiagram />}
            {type === "prompts-as-code" && <PromptsAsCodeDiagram />}
            {type === "inception-flow" && <InceptionFlowDiagram />}
        </div>
    );
}

export type { DiagramType };
