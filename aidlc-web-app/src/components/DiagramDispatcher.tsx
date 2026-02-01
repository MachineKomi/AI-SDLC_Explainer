"use client";

import { useMemo } from "react";
import MermaidRenderer from "@/components/MermaidRenderer";
import {
    LessonCompleteDiagram,
    PrinciplesListDiagram,
    PlanFirstComparisonDiagram,
    AccountabilityTableDiagram
} from "@/components/ComponentDiagrams";
import { getMermaidDiagram, isMermaidDiagram, type AllDiagramType } from "@/content/mermaid-diagrams";

interface DiagramDispatcherProps {
    type: string | undefined;
    className?: string;
}

export default function DiagramDispatcher({ type, className = "" }: DiagramDispatcherProps) {
    // If no type, return null
    if (!type) return null;

    // Check if it's a Mermaid diagram
    if (isMermaidDiagram(type)) {
        const diagramDef = getMermaidDiagram(type);
        return <MermaidRenderer diagram={diagramDef} className={className} />;
    }

    // Handle Component Diagrams
    switch (type) {
        case 'lesson-complete':
            return <div className={className}><LessonCompleteDiagram /></div>;
        case 'principles-list':
            return <div className={className}><PrinciplesListDiagram /></div>;
        case 'plan-first-comparison':
            return <div className={className}><PlanFirstComparisonDiagram /></div>;
        case 'accountability-table':
            return <div className={className}><AccountabilityTableDiagram /></div>;
        default:
            console.warn(`Unknown diagram type: ${type}`);
            return null;
    }
}
