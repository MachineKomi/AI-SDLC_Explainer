"use client";

import { motion } from "framer-motion";
import { Activity, Gauge, Server, AlertTriangle } from "lucide-react";
import MethodologyCard from "@/components/MethodologyCard";
import PhaseNavigation from "@/components/PhaseNavigation";

export default function OperationsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="fixed inset-0 z-0 opacity-10 bg-grid-pattern pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-status-success/10 text-status-success text-sm font-medium mb-6">
                        Phase C
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold mb-6">
                        Operations: <span className="text-gradient">Run with Confidence</span>
                    </h1>
                    <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
                        Deployment isn&apos;t the finish line; it&apos;s the start of the race.
                        AI-generated systems require rigorous observability and cost discipline.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                    <MethodologyCard
                        title="Observability First"
                        description="AI agents can write code faster than you can read it. You need robust logs, metrics, and tracing to understand what the system is doing in production."
                        icon={Activity}
                        color="blue"
                        delay={0.1}
                    />
                    <MethodologyCard
                        title="Cost Discipline"
                        description="AI models cost money. Track token usage vs. business value. Use 'Model Routing' to send simple tasks to cheaper models and complex reasoning to expensive ones."
                        icon={Gauge}
                        color="green"
                        delay={0.2}
                    />
                    <MethodologyCard
                        title="Infrastructure as Code"
                        description="Never click in the console. Agents are excellent at writing Terraform/CloudFormation. Infrastructure changes should be reviewed just like code."
                        icon={Server}
                        color="purple"
                        delay={0.3}
                    />
                    <MethodologyCard
                        title="Rollbackability"
                        description="Things will break. Ensure every deployment has an automated, tested rollback strategy. Speed is useless if you can't hit the brakes."
                        icon={AlertTriangle}
                        color="orange"
                        delay={0.4}
                    />
                </div>

                {/* Phase Navigation */}
                <PhaseNavigation currentPhase="operations" />
            </div>
        </div>
    );
}

