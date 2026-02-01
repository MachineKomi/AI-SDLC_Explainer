"use client";

import clsx from "clsx";
import styles from "./GlitchText.module.css"; // We'll need a module mainly for the complex clip-paths if we want to avoid global pollution, or we can use global keyframes

// Using inline styles for simplicity with global keyframes from globals.css
interface GlitchTextProps {
    text: string;
    className?: string;
    as?: "span" | "div" | "h1" | "h2" | "h3" | "p";
}

export default function GlitchText({ text, className = "", as: Component = "span" }: GlitchTextProps) {
    return (
        <Component className={clsx("relative inline-block group", className)}>
            <span className="relative z-10">{text}</span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-accent-primary opacity-0 group-hover:opacity-100 animate-glitch-1"
                aria-hidden="true"
            >
                {text}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-accent-secondary opacity-0 group-hover:opacity-100 animate-glitch-2"
                aria-hidden="true"
            >
                {text}
            </span>
        </Component>
    );
}
