"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl z-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-accent-primary/20 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-secondary/20 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-accent-primary" />
                        <span className="text-sm font-medium text-foreground-muted">Vesta AI-SDLC Methodology</span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8">
                        Build Software <span className="text-gradient">With AI</span>,<br />
                        Not Just For AI.
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-foreground-muted mb-10 leading-relaxed">
                        Move from &ldquo;prompt &amp; pray&rdquo; to a structured, audit-ready engineering workflow.
                        Master the <span className="text-foreground font-semibold">Inception → Construction → Operations</span> lifecycle designed for high-scale teams.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/lessons" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                            Start Learning <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/simulator" className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
                            Enter Simulator <Code2 className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>

                {/* Feature Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-24"
                >
                    {[
                        {
                            icon: Code2,
                            title: "AI-Native Construct",
                            desc: "Decompose work into verifiable units that AI agents can reliably execute."
                        },
                        {
                            icon: ShieldCheck,
                            title: "Evidence Gates",
                            desc: "'Done' means proven. Automated validation for every step of the lifecycle."
                        },
                        {
                            icon: Sparkles,
                            title: "Human-In-The-Loop",
                            desc: "AI is the engine, you are the pilot. Maintain accountability while 10x'ing throughput."
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="glass-card p-8 rounded-2xl text-left hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-6">
                                <feature.icon className="w-6 h-6 text-accent-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-foreground-muted">{feature.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
