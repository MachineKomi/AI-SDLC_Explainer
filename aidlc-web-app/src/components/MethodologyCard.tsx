"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface MethodologyCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    color?: "blue" | "purple" | "green" | "orange";
    delay?: number;
}

export default function MethodologyCard({
    title,
    description,
    icon: Icon,
    color = "blue",
    delay = 0
}: MethodologyCardProps) {

    const colors = {
        blue: "text-accent-primary bg-accent-primary/10 border-accent-primary/20",
        purple: "text-accent-secondary bg-accent-secondary/10 border-accent-secondary/20",
        green: "text-status-success bg-status-success/10 border-status-success/20",
        orange: "text-status-warning bg-status-warning/10 border-status-warning/20",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="glass-card p-6 rounded-xl h-full flex flex-col"
        >
            <div className={clsx("w-12 h-12 rounded-lg flex items-center justify-center mb-4", colors[color])}>
                <Icon className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-foreground-muted leading-relaxed flex-grow">
                {description}
            </p>
        </motion.div>
    );
}
