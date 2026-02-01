"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
    text: string | string[];
    delay?: number;
    speed?: number;
    className?: string;
    cursor?: boolean;
    onComplete?: () => void;
}

export default function TypewriterText({
    text,
    delay = 0,
    speed = 50,
    className = "",
    cursor = true,
    onComplete
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle array of strings or single string
    const textToType = Array.isArray(text) ? text.join("\n") : text;

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        // Initial delay
        const startTimeout = setTimeout(() => {
            setIsTyping(true);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!isTyping) return;

        if (currentIndex < textToType.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + textToType[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else {
            setIsTyping(false);
            if (onComplete) onComplete();
        }
    }, [isTyping, currentIndex, textToType, speed, onComplete]);

    return (
        <span className={className}>
            {displayedText.split("\n").map((line, i) => (
                <span key={i} className="block">
                    {line}
                </span>
            ))}
            {cursor && isTyping && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-[0.6em] h-[1em] bg-accent-primary ml-1 align-middle"
                />
            )}
            {cursor && !isTyping && (
                <span className="inline-block w-[0.6em] h-[1em] bg-transparent ml-1 align-middle" />
            )}
        </span>
    );
}
