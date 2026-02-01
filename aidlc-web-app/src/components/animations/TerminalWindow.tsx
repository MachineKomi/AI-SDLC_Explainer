"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface TerminalWindowProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export default function TerminalWindow({ title = "bash", children, className = "" }: TerminalWindowProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={clsx(
                "rounded-lg overflow-hidden border border-white/10 bg-[#0c0c10]/90 backdrop-blur shadow-2xl",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center px-4 py-2 bg-white/5 border-b border-white/10">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#fa5b5b]" />
                    <div className="w-3 h-3 rounded-full bg-[#fca240]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c659]" />
                </div>
                <div className="flex-1 text-center text-xs font-mono text-foreground-muted opacity-50">
                    {title}
                </div>
                <div className="w-14" /> {/* Spacer for centering */}
            </div>

            {/* Content */}
            <div className="p-4 font-mono text-sm text-foreground overflow-x-auto">
                {children}
            </div>
        </motion.div>
    );
}
