'use client';

import { useTheme } from '@/context/ThemeContext';
import type { ColorTheme } from '@/types';
import clsx from 'clsx';

interface ThemeOption {
    id: ColorTheme;
    name: string;
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;
    };
}

const THEMES: ThemeOption[] = [
    {
        id: 'sunset',
        name: 'Sunset Hacker',
        colors: {
            primary: 'bg-pink-500',
            secondary: 'bg-orange-500',
            tertiary: 'bg-amber-500',
        },
    },
    {
        id: 'matrix',
        name: 'Matrix',
        colors: {
            primary: 'bg-green-500',
            secondary: 'bg-lime-500',
            tertiary: 'bg-emerald-500',
        },
    },
    {
        id: 'ocean',
        name: 'Ocean',
        colors: {
            primary: 'bg-cyan-500',
            secondary: 'bg-blue-500',
            tertiary: 'bg-indigo-500',
        },
    },
    {
        id: 'mono',
        name: 'Monochrome',
        colors: {
            primary: 'bg-gray-400',
            secondary: 'bg-gray-500',
            tertiary: 'bg-gray-300',
        },
    },
];

interface ThemePickerProps {
    collapsed?: boolean;
}

export default function ThemePicker({ collapsed = false }: ThemePickerProps) {
    const { colorTheme, setColorTheme } = useTheme();

    if (collapsed) {
        // Compact view for collapsed sidebar - show only current theme color
        const currentTheme = THEMES.find(t => t.id === colorTheme);
        return (
            <div className="relative group">
                <button
                    className="w-full flex items-center justify-center p-2 rounded-lg text-foreground-muted hover:bg-white/5 transition-colors"
                    title={`Theme: ${currentTheme?.name}`}
                >
                    <div className={clsx(
                        'w-4 h-4 rounded-full',
                        currentTheme?.colors.primary
                    )} />
                </button>

                {/* Flyout menu on hover - pl-2 creates bridge for hover state */}
                <div className="absolute left-full pl-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
                    <div className="bg-background-tertiary border border-white/10 rounded-lg p-3 shadow-lg">
                        <div className="text-xs text-foreground-muted mb-2 whitespace-nowrap">Color Theme</div>
                        <div className="flex gap-2">
                            {THEMES.map(theme => (
                                <button
                                    key={theme.id}
                                    onClick={() => setColorTheme(theme.id)}
                                    className={clsx(
                                        'w-6 h-6 rounded-full flex items-center justify-center transition-all',
                                        theme.colors.primary,
                                        colorTheme === theme.id
                                            ? 'ring-2 ring-white ring-offset-2 ring-offset-background-tertiary'
                                            : 'hover:scale-110'
                                    )}
                                    title={theme.name}
                                >
                                    {colorTheme === theme.id && (
                                        <span className="text-white text-xs">✓</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Expanded view
    return (
        <div className="space-y-2">
            <div className="text-xs text-foreground-muted px-1">Color Theme</div>
            <div className="grid grid-cols-4 gap-2">
                {THEMES.map(theme => (
                    <button
                        key={theme.id}
                        onClick={() => setColorTheme(theme.id)}
                        className={clsx(
                            'relative p-1 rounded-lg transition-all',
                            colorTheme === theme.id
                                ? 'bg-white/10 ring-1 ring-accent-primary'
                                : 'hover:bg-white/5'
                        )}
                        title={theme.name}
                    >
                        <div className="flex flex-col items-center gap-1">
                            {/* Color swatch */}
                            <div className="flex gap-0.5">
                                <div className={clsx('w-3 h-3 rounded-sm', theme.colors.primary)} />
                                <div className={clsx('w-3 h-3 rounded-sm', theme.colors.secondary)} />
                                <div className={clsx('w-3 h-3 rounded-sm', theme.colors.tertiary)} />
                            </div>
                            {/* Theme name */}
                            <span className="text-[10px] text-foreground-muted truncate w-full text-center">
                                {theme.name.split(' ')[0]}
                            </span>
                        </div>
                        {/* Active indicator */}
                        {colorTheme === theme.id && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-primary rounded-full flex items-center justify-center">
                                <span className="text-white text-[8px]">✓</span>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
