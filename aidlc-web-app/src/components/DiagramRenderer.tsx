"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

type DiagramType =
    | "phases"
    | "gate-loop"
    | "construction-loop"
    | "artifact-tree";

interface DiagramRendererProps {
    type: DiagramType;
    className?: string;
}

// Phase Flow Diagram (Inception → Construction → Operations)
function PhasesFlowDiagram() {
    const phases = [
        { name: "INCEPTION", subtitle: "What/Why", color: "from-blue-500 to-cyan-500" },
        { name: "CONSTRUCTION", subtitle: "How", color: "from-purple-500 to-pink-500" },
        { name: "OPERATIONS", subtitle: "Run/Monitor", color: "from-green-500 to-emerald-500" },
    ];

    return (
        <div className="flex flex-col items-center gap-6 py-6">
            {/* Main Flow */}
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

            {/* Gates below */}
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

// Gate Loop Diagram (AI Plan → Human Gate → AI Execute)
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

            {/* Loop indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-xs text-foreground-muted"
            >
                <span>↺</span>
                <span>Loop until complete</span>
            </motion.div>
        </div>
    );
}

// Construction Loop (Plan → Ask → Validate → Implement)
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
                <span>↻</span>
                <span>Iterative loop per unit of work</span>
            </motion.div>
        </div>
    );
}

// Artifact Tree Diagram
function ArtifactTreeDiagram() {
    const tree = [
        { name: ".aidlc/", level: 0, isDir: true },
        { name: "aidlc-state.md", level: 1 },
        { name: "execution-plan.md", level: 1 },
        { name: "audit.md", level: 1 },
        { name: "inception/", level: 1, isDir: true },
        { name: "intent.md", level: 2 },
        { name: "requirements.md", level: 2 },
        { name: "nfr.md", level: 2 },
        { name: "construction/", level: 1, isDir: true },
        { name: "unit-01/", level: 2, isDir: true },
        { name: "design.md", level: 3 },
        { name: "tasks-plan.md", level: 3 },
        { name: "operations/", level: 1, isDir: true },
        { name: "deployment-plan.md", level: 2 },
    ];

    return (
        <div className="py-4">
            <div className="font-mono text-sm bg-background-tertiary/50 rounded-lg p-4 inline-block">
                {tree.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-center gap-2"
                    >
                        <span className="text-foreground-muted">
                            {"  ".repeat(item.level)}
                            {item.level > 0 && "├── "}
                        </span>
                        <span className={item.isDir ? "text-accent-primary font-semibold" : "text-foreground"}>
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
        <div className={`diagram-container ${className}`}>
            {type === "phases" && <PhasesFlowDiagram />}
            {type === "gate-loop" && <GateLoopDiagram />}
            {type === "construction-loop" && <ConstructionLoopDiagram />}
            {type === "artifact-tree" && <ArtifactTreeDiagram />}
        </div>
    );
}

// Export types for use in lesson content
export type { DiagramType };
