"use client";

import { motion } from "framer-motion";
import { Hammer, Code, Search, FileCheck } from "lucide-react";
import MethodologyCard from "@/components/MethodologyCard";
import PhaseNavigation from "@/components/PhaseNavigation";

export default function ConstructionPage() {
    return (
        <div className="min-h-screen bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="fixed inset-0 z-0 opacity-10 bg-grid-pattern pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-secondary/10 text-accent-secondary text-sm font-medium mb-6">
                        Phase B
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold mb-6">
                        Construction: <span className="text-gradient">Build with Proof</span>
                    </h1>
                    <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
                        Coding is no longer about typing; it&apos;s about orchestration and verification.
                        We replace &ldquo;trust me&rdquo; with &ldquo;prove it&rdquo;.
                    </p>
                </motion.div>

                {/* The Loop */}
                <div className="mb-24">
                    <h2 className="text-2xl font-bold text-center mb-10">The AI-Construction Loop</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
                        {['Plan', 'Design', 'Implement', 'Verify', 'Report'].map((step, i) => (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 flex flex-col items-center justify-center relative"
                            >
                                {i < 4 && <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 text-foreground-muted">→</div>}
                                <div className="text-4xl font-bold text-accent-secondary/20 mb-2">{i + 1}</div>
                                <div className="font-bold">{step}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                    <MethodologyCard
                        title="Evidence > Prose"
                        description="An agent saying 'I fixed it' means nothing. 'Done' requires a passing test, a lint check, and a screenshot. We automate the collection of this evidence."
                        icon={FileCheck}
                        color="green"
                        delay={0.1}
                    />
                    <MethodologyCard
                        title="Collaborative Build"
                        description="Humans handle the tricky integration points and high-level decisions. AI handles the boilerplate, tests, and standard implementation patterns."
                        icon={Hammer}
                        color="orange"
                        delay={0.2}
                    />
                    <MethodologyCard
                        title="AI Quality Gates"
                        description="Don't waste human time reviewing basic errors. Automated gates check for security risks, complexity bloat, and style violations before a human sees the PR."
                        icon={Search}
                        color="purple"
                        delay={0.3}
                    />
                    <MethodologyCard
                        title="Anti-Drift"
                        description="Prevent 'Prompt-to-Code' drift by constantly validating against the artifacts from the Inception phase. If the code deviates from the spec, the build fails."
                        icon={Code}
                        color="blue"
                        delay={0.4}
                    />
                </div>

                {/* Phase Navigation */}
                <PhaseNavigation currentPhase="construction" />
            </div>
        </div>
    );
}

