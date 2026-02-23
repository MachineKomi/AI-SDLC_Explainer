"use client";

import { motion } from "framer-motion";
import { CheckCircle, Check, X, Terminal, ShieldCheck } from "lucide-react";

// Lesson Complete Card
export function LessonCompleteDiagram() {
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
export function PrinciplesListDiagram() {
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
                    className="flex items-center gap-3 p-3 rounded-lg bg-background-tertiary/30 border border-background-tertiary"
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
export function PlanFirstComparisonDiagram() {
    return (
        <div className="grid md:grid-cols-2 gap-6 py-4">
            <div className="p-4 rounded-xl border border-accent-error/20 bg-accent-error/5">
                <div className="flex items-center gap-2 mb-3 text-accent-error font-bold">
                    <X className="w-5 h-5" /> BAD: Prose Request
                </div>
                <div className="font-mono text-sm text-foreground-muted bg-background-tertiary/60 p-3 rounded">
                    &quot;Build me a login page&quot;
                </div>
                <p className="text-xs text-accent-error/70 mt-2">Vague, assumes AI knows context, no safety checks.</p>
            </div>
            <div className="p-4 rounded-xl border border-accent-success/20 bg-accent-success/5">
                <div className="flex items-center gap-2 mb-3 text-accent-success font-bold">
                    <Check className="w-5 h-5" /> GOOD: Plan Request
                </div>
                <div className="font-mono text-sm text-foreground-muted bg-background-tertiary/60 p-3 rounded">
                    &quot;Create a plan for login page with checkpoints. Stop for approval.&quot;
                </div>
                <p className="text-xs text-accent-success/70 mt-2">Explicit, verifiable, human-in-the-loop.</p>
            </div>
        </div>
    );
}

// Accountability Table
export function AccountabilityTableDiagram() {
    return (
        <div className="overflow-x-auto rounded-xl border border-background-tertiary bg-background-secondary/50 my-4">
            <table className="w-full text-sm min-w-[300px]">
                <thead>
                    <tr className="bg-background-tertiary/50 text-left border-b border-background-tertiary">
                        <th className="p-4 font-bold text-accent-primary">AI OWNS (Execution)</th>
                        <th className="p-4 font-bold text-accent-secondary">HUMAN OWNS (Decisions)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-background-tertiary/50">
                    {[
                        ["Code Generation", "Requirements Scope"],
                        ["Test Execution", "Architecture Choices"],
                        ["Documentation Writing", "Security Controls"],
                        ["Infrastructure Plans", "Go/No-Go Approvals"]
                    ].map(([ai, human], i) => (
                        <tr key={i} className="hover:bg-background-tertiary/30">
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
