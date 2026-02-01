"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Check, Dumbbell, Trophy, RotateCcw, Sparkles } from "lucide-react";
import clsx from "clsx";
import { useProgress } from "@/context/ProgressContext";
import Link from "next/link";
import { toast } from "sonner";

const GYM_TASKS = [
    { id: 1, text: "Draft One-Paragraph Intent", phase: "Elaboration", tip: "State the WHY and WHAT in 5 sentences max." },
    { id: 2, text: "Define 3 Non-Negotiable NFRs", phase: "Elaboration", tip: "Security, Performance, Compliance." },
    { id: 3, text: "Breakdown into Units (<4hr each)", phase: "Elaboration", tip: "If an AI can't finish it in 4 hours, it's too big." },
    { id: 4, text: "Approve Execution Plan", phase: "Elaboration", tip: "STOP. Human approval at the gate." },
    { id: 5, text: "Generate Unit 1 Plan", phase: "Construction", tip: "AI proposes, you validate." },
    { id: 6, text: "Review Unit 1 Implementation", phase: "Construction", tip: "Proof over prose. Look at the tests." },
    { id: 7, text: "Verify Tests Pass (100%)", phase: "Construction", tip: "No failing tests == no deployment." },
    { id: 8, text: "Generate Validation Report", phase: "Construction", tip: "Document evidence, not just claims." },
];

export default function GymPage() {
    const { state, toggleGymTask, resetProgress } = useProgress();
    const [mounted, setMounted] = useState(false);

    // Set mounted state on client-side mount
    useEffect(() => {
        setMounted(true);
    }, []);

    // Check for level up animation
    useEffect(() => {
        if (state.level > 1) {
            // Use confetti or similar if implemented, or just toast
            // For now, rely on ProgressContext's internal handling
        }
    }, [state.level]);

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            resetProgress();
            toast.success('Progress reset to zero');
        }
    };

    // Derived state from context
    const completedTasks = state.gym?.completedTasks || [];

    // Safety check for checking includes on potentially undefined array if context is fresh
    const safeCompletedTasks = completedTasks;

    const progress = Math.round((safeCompletedTasks.length / GYM_TASKS.length) * 100);
    const elaborationComplete = GYM_TASKS.filter(t => t.phase === "Elaboration").every(t => safeCompletedTasks.includes(t.id.toString()));
    const constructionComplete = GYM_TASKS.filter(t => t.phase === "Construction").every(t => safeCompletedTasks.includes(t.id.toString()));

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8">
            <div className="fixed inset-0 z-0 opacity-10 bg-grid-pattern pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-secondary/10 text-accent-secondary text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" /> Interactive Training
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold mb-4">
                        The AI-SDLC <span className="text-gradient">Gym</span>
                    </h1>
                    <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                        The only way to learn is by practicing. Complete a full lifecycle &ldquo;Bolt&rdquo; to earn XP.
                    </p>
                </div>

                {/* XP Display */}
                <div className="mb-6 flex justify-center">
                    <div className="inline-flex items-center gap-3 px-4 py-2 glass-card rounded-full">
                        <span className="text-accent-primary font-bold">{state.xp} XP</span>
                        <span className="text-foreground-muted">|</span>
                        <span className="text-sm">Level {state.level}: {state.title}</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-12 glass-card p-6 rounded-xl">
                    <div className="flex justify-between items-end mb-2">
                        <span className="font-bold">Session Progress</span>
                        <div className="flex items-center gap-4">
                            <span className="text-accent-primary font-mono">{progress}%</span>
                            <button
                                onClick={handleReset}
                                className="text-sm text-foreground-muted hover:text-foreground flex items-center gap-1 transition-colors"
                                title="Reset progress"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="w-full bg-background-tertiary rounded-full h-4 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}% ` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-accent-primary"
                        />
                    </div>
                </div>

                {/* Tasks Area */}
                <div className="space-y-8">
                    {["Elaboration", "Construction"].map((phase) => {
                        const phaseTasks = GYM_TASKS.filter((t) => t.phase === phase);
                        const phaseComplete = phaseTasks.every((t) =>
                            safeCompletedTasks.includes(t.id.toString())
                        );

                        return (
                            <div key={phase} className="mb-8">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                                    <Dumbbell className={clsx("w-5 h-5", phaseComplete ? "text-status-success" : "text-accent-secondary")} />
                                    {phase} Phase
                                    {phaseComplete && <span className="text-sm font-normal text-status-success">✓ Complete</span>}
                                </h3>
                                <div className="space-y-3">
                                    {phaseTasks.map((task) => {
                                        const taskIdStr = task.id.toString();
                                        const isDone = safeCompletedTasks.includes(taskIdStr);

                                        return (
                                            <motion.div
                                                key={task.id}
                                                onClick={() => toggleGymTask(taskIdStr)}
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                                className={clsx(
                                                    "glass-card p-4 rounded-lg cursor-pointer flex items-start gap-4 transition-all duration-200 hover:border-accent-primary/50",
                                                    isDone && "bg-accent-primary/5 border-accent-primary/30"
                                                )}
                                            >
                                                <div className={clsx(
                                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5",
                                                    isDone ? "bg-accent-primary border-accent-primary" : "border-foreground-muted"
                                                )}>
                                                    {isDone && <Check className="w-4 h-4 text-background" />}
                                                </div>
                                                <div className="flex-1">
                                                    <span className={clsx("font-medium", isDone && "text-foreground-muted line-through")}>
                                                        {task.text}
                                                    </span>
                                                    <p className="text-sm text-foreground-muted mt-1">{task.tip}</p>
                                                </div>
                                                {!isDone && (
                                                    <span className="text-xs text-accent-primary font-mono">+15 XP</span>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Navigation to Methodology */}
                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                    <p className="text-foreground-muted mb-4">Want to learn more about each phase?</p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link href="/methodology/inception" className="btn-secondary">
                            📖 Read: Inception
                        </Link>
                        <Link href="/methodology/construction" className="btn-secondary">
                            🔨 Read: Construction
                        </Link>
                        <Link href="/methodology/operations" className="btn-secondary">
                            🚀 Read: Operations
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

}

