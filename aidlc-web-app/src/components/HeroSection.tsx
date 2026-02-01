"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal, Code2 } from "lucide-react";
import Link from "next/link";
import TypewriterText from "@/components/animations/TypewriterText";
import GlitchText from "@/components/animations/GlitchText";

export default function HeroSection() {
    return (
        <div className="relative py-16 sm:py-24 overflow-hidden">
            {/* Background Glow Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl z-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-accent-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-secondary/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Terminal-style header */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background-secondary/80 border border-white/10 mb-8 font-mono text-sm">
                        <Terminal className="w-4 h-4 text-accent-primary" />
                        <span className="text-foreground-muted">$</span>
                        <TypewriterText text="learn ai-sdlc --interactive" delay={500} speed={50} />
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
                        <span className="text-foreground">AI-Driven</span>{" "}
                        <GlitchText text="Software Development" as="span" className="text-foreground" />
                        <br />
                        <span className="text-foreground">Lifecycle</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg text-foreground-muted mb-10 leading-relaxed">
                        A structured workflow where AI proposes plans, asks clarifying questions,
                        and implements only after validation. Master the{" "}
                        <span className="text-accent-primary font-mono">Inception</span>
                        <span className="text-foreground-muted"> → </span>
                        <span className="text-accent-secondary font-mono">Construction</span>
                        <span className="text-foreground-muted"> → </span>
                        <span className="text-foreground font-mono">Operations</span>{" "}
                        lifecycle with persisted artifacts and approval gates.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/lessons" className="btn-primary flex items-center gap-2 text-base px-6 py-3">
                            <Code2 className="w-4 h-4" />
                            Start Learning
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/simulator" className="btn-secondary flex items-center gap-2 text-base px-6 py-3">
                            <Terminal className="w-4 h-4" />
                            Try Simulator
                        </Link>
                    </div>
                </motion.div>

                {/* Core principles - compact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
                >
                    {[
                        { title: "Plan-First", desc: "Explicit plans and gates before execution" },
                        { title: "Proof Over Prose", desc: "Tests passing, checks green, behavior validated" },
                        { title: "Human Accountability", desc: "AI proposes, humans own decisions" },
                    ].map((item, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-background-secondary/40 border border-white/5">
                            <h3 className="font-mono text-sm text-accent-primary mb-1">{item.title}</h3>
                            <p className="text-sm text-foreground-muted">{item.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

