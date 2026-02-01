'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export default function GlobalKeyboardShortcuts() {
    const router = useRouter();
    const { toggleTheme } = useTheme();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if active element is an input or textarea
            if (
                document.activeElement?.tagName === 'INPUT' ||
                document.activeElement?.tagName === 'TEXTAREA' ||
                (document.activeElement as HTMLElement).isContentEditable
            ) {
                return;
            }

            // Global shortcuts
            if (e.key === 't') {
                toggleTheme();
            } else if (e.key === '?') {
                router.push('/reference');
            }
            // Navigation shortcuts (1-9) match the Grid order
            else {
                const num = parseInt(e.key);
                // Only trigger if no modifier keys are pressed (to avoid conflict with browser shortcuts like Ctrl+1)
                if (!e.ctrlKey && !e.altKey && !e.metaKey && !isNaN(num)) {
                    // Mapping based on generic standard defined in NavigationGrid
                    // 1: Lessons, 2: Compare, 3: Transition, 4: Practice, 5: Simulator, 
                    // 6: Artifacts, 7: Glossary, 8: Reference, 9: Sources
                    const paths = [
                        '/lessons',      // 1
                        '/comparison',   // 2
                        '/transition',   // 3
                        '/practice',     // 4
                        '/simulator',    // 5
                        '/artifacts',    // 6 - Note: Sidebar order might differ slightly but Grid is the "Home" map
                        '/glossary',     // 7
                        '/reference',    // 8
                        '/sources'       // 9
                    ];

                    if (num >= 1 && num <= paths.length) {
                        router.push(paths[num - 1]);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router, toggleTheme]);

    return null; // Headless component
}
