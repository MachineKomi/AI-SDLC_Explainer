"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Dumbbell, Trophy } from "lucide-react";
import clsx from "clsx";

export default function GymPage() {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Draft One-Paragraph Intent", done: false, phase: "Elaboration" },
        { id: 2, text: "Define 3 Non-Negotiable NFRs", done: false, phase: "Elaboration" },
        { id: 3, text: "Breakdown into Units (<4hr each)", done: false, phase: "Elaboration" },
        { id: 4, text: "Approve Execution Plan", done: false, phase: "Elaboration" },
        { id: 5, text: "Generate Unit 1 Plan", done: false, phase: "Construction" },
        { id: 6, text: "Review Unit 1 Implementation", done: false, phase: "Construction" },
        { id: 7, text: "Verify Tests Pass", done: false, phase: "Construction" },
        { id: 8, text: "Generate Validation Report", done: false, phase: "Construction" },
    ]);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const progress = Math.round((tasks.filter(t => t.done).length / tasks.length) * 100);

    return (
        <div className="min-h-screen bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8">
            <div className="fixed inset-0 z-0 opacity-10 bg-grid-pattern pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-secondary/10 text-accent-secondary text-sm font-medium mb-6">
                        Interactive Training
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold mb-4">
                        The AI-SDLC <span className="text-gradient">Gym</span>
                    </h1>
                    <p className="text-xl text-foreground-muted">
                        The only way to learn is by practicing. Complete a full lifecycle "Bolt".
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-12 glass-card p-6 rounded-xl">
                    <div className="flex justify-between items-end mb-2">
                        <span className="font-bold">Session Progress</span>
                        <span className="text-accent-primary font-mono">{progress}%</span>
                    </div>
                    <div className="h-4 bg-background-tertiary rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-accent-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        />
                    </div>
                    {progress === 100 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-status-success/20 text-status-success rounded-lg flex items-center gap-3"
                        >
                            <Trophy className="w-6 h-6" />
                            <strong>Workout Complete! You're ready to ship.</strong>
                        </motion.div>
                    )}
                </div>

                {/* Task List */}
                <div className="space-y-4">
                    {["Elaboration", "Construction"].map((phase) => (
                        <div key={phase} className="mb-8">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Dumbbell className="w-5 h-5 text-accent-secondary" />
                                {phase} Phase
                            </h3>
                            <div className="space-y-3">
                                {tasks.filter(t => t.phase === phase).map((task) => (
                                    <div
                                        key={task.id}
                                        onClick={() => toggleTask(task.id)}
                                        className={clsx(
                                            "glass-card p-4 rounded-lg cursor-pointer flex items-center gap-4 transition-all duration-200 hover:border-accent-primary/50",
                                            task.done && "bg-accent-primary/5 border-accent-primary/30"
                                        )}
                                    >
                                        <div className={clsx(
                                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                                            task.done ? "bg-accent-primary border-accent-primary" : "border-foreground-muted"
                                        )}>
                                            {task.done && <Check className="w-4 h-4 text-background" />}
                                        </div>
                                        <span className={clsx("font-medium", task.done && "text-foreground-muted line-through")}>
                                            {task.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
