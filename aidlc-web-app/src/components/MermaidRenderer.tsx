'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import mermaid from 'mermaid';
import { useTheme } from '@/context/ThemeContext';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface MermaidRendererProps {
    diagram: string;
    className?: string;
}

// Theme-aware color configurations
const getThemeConfig = (isDark: boolean, colorTheme: string) => {
    // Base colors based on dark/light mode
    const baseConfig = isDark
        ? {
            primaryColor: '#2d2d3a',
            primaryTextColor: '#f5f5f5',
            primaryBorderColor: '#4a4a5a',
            lineColor: '#6b6b7b',
            secondaryColor: '#3d3d4a',
            tertiaryColor: '#1a1a24',
            background: '#0c0c10',
            mainBkg: '#14141a',
            textColor: '#f5f5f5',
            nodeTextColor: '#f5f5f5',
            labelTextColor: '#f5f5f5',
            clusterBkg: '#1a1a24',
            clusterBorder: '#3a3a4a',
            edgeLabelBackground: '#14141a',
            fontFamily: 'Inter, JetBrains Mono, monospace',
        }
        : {
            primaryColor: '#e5e4e0',
            primaryTextColor: '#1c1c20',
            primaryBorderColor: '#c7c6c0',
            lineColor: '#6b6b7b',
            secondaryColor: '#d5d4d0',
            tertiaryColor: '#f5f4f0',
            background: '#f5f4f0',
            mainBkg: '#ebeae4',
            textColor: '#1c1c20',
            nodeTextColor: '#1c1c20',
            labelTextColor: '#1c1c20',
            clusterBkg: '#ebeae4',
            clusterBorder: '#c7c6c0',
            edgeLabelBackground: '#f5f4f0',
            fontFamily: 'Inter, JetBrains Mono, monospace',
        };

    // Accent colors based on color theme
    const accentColors = {
        sunset: {
            accent: isDark ? '#ec4899' : '#be185d',
            accentSecondary: isDark ? '#f97316' : '#c2410c',
            accentTertiary: isDark ? '#f59e0b' : '#b45309',
        },
        matrix: {
            accent: isDark ? '#22c55e' : '#16a34a',
            accentSecondary: isDark ? '#84cc16' : '#65a30d',
            accentTertiary: isDark ? '#10b981' : '#0d9468',
        },
        ocean: {
            accent: isDark ? '#06b6d4' : '#0891b2',
            accentSecondary: isDark ? '#3b82f6' : '#2563eb',
            accentTertiary: isDark ? '#6366f1' : '#4f46e5',
        },
        mono: {
            accent: isDark ? '#a3a3a3' : '#525252',
            accentSecondary: isDark ? '#737373' : '#404040',
            accentTertiary: isDark ? '#e5e5e5' : '#262626',
        },
    };

    const accents = accentColors[colorTheme as keyof typeof accentColors] || accentColors.sunset;

    return {
        ...baseConfig,
        ...accents,
    };
};

export default function MermaidRenderer({ diagram, className = '' }: MermaidRendererProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [isRendering, setIsRendering] = useState(true);
    const { theme, colorTheme } = useTheme();
    const renderIdRef = useRef(0);

    const renderDiagram = useCallback(async () => {
        if (!containerRef.current || !diagram) return;

        setIsRendering(true);
        setError(null);

        // Increment render ID to track stale renders
        renderIdRef.current += 1;
        const currentRenderId = renderIdRef.current;

        const isDark = theme === 'dark';
        const themeConfig = getThemeConfig(isDark, colorTheme);

        // Configure mermaid with theme-aware settings
        mermaid.initialize({
            startOnLoad: false,
            theme: 'base',
            themeVariables: {
                ...themeConfig,
                // Flowchart specific
                nodeBorder: themeConfig.accent,
                // Git graph specific
                git0: themeConfig.accent,
                git1: themeConfig.accentSecondary,
                git2: themeConfig.accentTertiary,
                // Sequence diagram specific
                actorBkg: themeConfig.mainBkg,
                actorBorder: themeConfig.accent,
                actorTextColor: themeConfig.textColor,
                signalColor: themeConfig.textColor,
                // Class diagram specific
                classText: themeConfig.textColor,
            },
            flowchart: {
                htmlLabels: true,
                curve: 'basis',
                padding: 15,
            },
            securityLevel: 'loose',
            fontFamily: themeConfig.fontFamily,
        });

        try {
            // Clear previous content
            containerRef.current.innerHTML = '';

            // Generate unique ID for this render
            const uniqueId = `mermaid-${Date.now()}-${Math.random().toString(36).substring(7)}`;

            // Render the diagram
            const { svg } = await mermaid.render(uniqueId, diagram.trim());

            // Only update if this is still the current render
            if (currentRenderId === renderIdRef.current && containerRef.current) {
                containerRef.current.innerHTML = svg;

                // Apply responsive styling to the SVG
                const svgElement = containerRef.current.querySelector('svg');
                if (svgElement) {
                    svgElement.style.maxWidth = '100%';
                    svgElement.style.height = 'auto';
                    svgElement.style.display = 'block';
                    svgElement.style.margin = '0 auto';

                    // Apply accent colors to specific elements
                    const accentColor = themeConfig.accent;

                    // Style edges with accent color
                    svgElement.querySelectorAll('.edgePath path').forEach((path) => {
                        (path as SVGPathElement).style.stroke = accentColor;
                    });

                    // Style arrowheads
                    svgElement.querySelectorAll('marker path').forEach((path) => {
                        (path as SVGPathElement).style.fill = accentColor;
                        (path as SVGPathElement).style.stroke = accentColor;
                    });
                }
            }
        } catch (err) {
            // Only show error if this is still the current render
            if (currentRenderId === renderIdRef.current) {
                console.error('Mermaid render error:', err);
                setError(err instanceof Error ? err.message : 'Failed to render diagram');
            }
        } finally {
            if (currentRenderId === renderIdRef.current) {
                setIsRendering(false);
            }
        }
    }, [diagram, theme, colorTheme]);

    useEffect(() => {
        renderDiagram();
    }, [renderDiagram]);

    // Retry handler
    const handleRetry = () => {
        renderDiagram();
    };

    // Error state
    if (error) {
        return (
            <div className={`rounded-lg border border-accent-error/30 bg-accent-error/5 p-6 ${className}`}>
                <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-accent-error flex-shrink-0" />
                    <div className="flex-1">
                        <h4 className="font-semibold text-accent-error mb-2">Diagram Render Error</h4>
                        <p className="text-sm text-foreground-muted mb-4">{error}</p>
                        <details className="text-xs">
                            <summary className="cursor-pointer text-foreground-muted hover:text-foreground">
                                Show diagram source
                            </summary>
                            <pre className="mt-2 p-3 bg-background-tertiary rounded text-xs overflow-x-auto">
                                {diagram}
                            </pre>
                        </details>
                        <button
                            onClick={handleRetry}
                            className="mt-4 flex items-center gap-2 px-3 py-1.5 text-sm bg-accent-error/20 hover:bg-accent-error/30 text-accent-error rounded-lg transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`mermaid-container relative ${className}`}>
            {/* Loading overlay */}
            {isRendering && (
                <div className="absolute inset-0 flex items-center justify-center bg-background-secondary/50 backdrop-blur-sm rounded-lg z-10">
                    <div className="flex items-center gap-3 text-foreground-muted">
                        <div className="w-5 h-5 border-2 border-accent-primary/30 border-t-accent-primary rounded-full animate-spin" />
                        <span className="text-sm">Rendering diagram...</span>
                    </div>
                </div>
            )}

            {/* Diagram container */}
            <div
                ref={containerRef}
                className="mermaid-diagram overflow-x-auto p-4 rounded-lg bg-background-secondary/30"
            />
        </div>
    );
}
