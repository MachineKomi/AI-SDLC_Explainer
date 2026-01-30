"use client";

import { motion } from "framer-motion";
import { Lightbulb, Target, FileText, CheckCircle2 } from "lucide-react";
import MethodologyCard from "@/components/MethodologyCard";

export default function InceptionPage() {
    return (
        <div className="min-h-screen bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="fixed inset-0 z-0 opacity-10 bg-grid-pattern pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium mb-6">
                        Phase A
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold mb-6">
                        Inception: <span className="text-gradient">Manifesting Intent</span>
                    </h1>
                    <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
                        The most critical phase of the AI-Driven Lifecycle. Moving from ambiguous ideas to strictly defined, testable units of work.
                        <br className="hidden sm:block" />
                        <span className="text-accent-primary">AI cannot read your mind, only your specs.</span>
                    </p>
                </motion.div>

                {/* Core Concepts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                    <MethodologyCard
                        title="The One-Paragraph Intent"
                        description="Start with a single, clear paragraph describing WHY this work exists and WHAT success looks like. If you can't articulate it in 5 sentences, the AI will hallucinate the rest."
                        icon={Lightbulb}
                        color="orange"
                        delay={0.1}
                    />
                    <MethodologyCard
                        title="Non-Negotiable NFRs"
                        description="Security, Performance, and Compliance aren't afterthoughts. Define constraints upfront (e.g., 'Must handle PII correctly', 'Latency < 200ms') so the agent plans around them."
                        icon={ShieldCheck}
                        color="purple"
                        delay={0.2}
                    />
                    <MethodologyCard
                        title="Units of Work"
                        description="Decompose the project into small, atomic 'Units'. A Unit is the smallest deployable slice of value. If a Unit takes > 4 hours for an agent, it's too big."
                        icon={Target}
                        color="blue"
                        delay={0.3}
                    />
                    <MethodologyCard
                        title="The Planning Gate"
                        description="STOP. Do not write code yet. Review the generated plan, strict requirements, and acceptance criteria. Human approval here saves hours of debugging later."
                        icon={CheckCircle2}
                        color="green"
                        delay={0.4}
                    />
                </div>

                {/* Artifacts Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="glass-card p-8 sm:p-12 rounded-2xl border-l-4 border-l-accent-primary"
                >
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <FileText className="w-6 h-6 text-accent-primary" />
                        Required Artifacts
                    </h2>
                    <div className="space-y-4">
                        <div className="flex gap-4 p-4 rounded-lg bg-background/50 border border-white/5">
                            <span className="font-mono text-accent-primary">intent.md</span>
                            <p className="text-foreground-muted text-sm">The high-level goal and success metrics.</p>
                        </div>
                        <div className="flex gap-4 p-4 rounded-lg bg-background/50 border border-white/5">
                            <span className="font-mono text-accent-primary">requirements.md</span>
                            <p className="text-foreground-muted text-sm">Detailed functional & strictly defined non-functional requirements.</p>
                        </div>
                        <div className="flex gap-4 p-4 rounded-lg bg-background/50 border border-white/5">
                            <span className="font-mono text-accent-primary">units/unit-01.md</span>
                            <p className="text-foreground-muted text-sm">Atomic task breakdown with explicit completion criteria.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}


