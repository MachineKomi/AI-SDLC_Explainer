'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { useProgress } from '@/context/ProgressContext';
import { useTheme } from '@/context/ThemeContext';
import { getProgressToNextLevel, getXpToNextLevel } from '@/lib/xp';
import { getUnlockedAchievements } from '@/lib/achievements';

const MENU_ITEMS = [
  { id: 'lessons', title: 'Lessons', description: 'Learn AI-DLC fundamentals', icon: '📖', href: '/lessons', shortcut: 1 },
  { id: 'comparison', title: 'Compare', description: 'Waterfall vs Agile vs AI-DLC', icon: '⚖️', href: '/comparison', shortcut: 2 },
  { id: 'transition', title: 'Transition', description: 'Agile → AI-DLC mapping', icon: '🔄', href: '/transition', shortcut: 3 },
  { id: 'practice', title: 'Practice', description: 'Quiz & Gatekeeper modes', icon: '🎯', href: '/practice', shortcut: 4 },
  { id: 'simulator', title: 'Simulator', description: 'Interactive workflow sim', icon: '🔬', href: '/simulator', shortcut: 5 },
  { id: 'artifacts', title: 'Artifacts', description: 'Explore aidlc-docs', icon: '📁', href: '/artifacts', shortcut: 6 },
  { id: 'glossary', title: 'Glossary', description: 'AI-DLC terminology', icon: '📚', href: '/glossary', shortcut: 7 },
  { id: 'reference', title: 'Reference', description: 'Quick reference card', icon: '📋', href: '/reference', shortcut: 8 },
  { id: 'sources', title: 'Sources', description: 'Official references', icon: '🔗', href: '/sources', shortcut: 9 },
];

export default function HomePage() {
  const router = useRouter();
  const { state } = useProgress();
  const { theme, toggleTheme } = useTheme();
  
  const progressPercent = getProgressToNextLevel(state.xp);
  const { xpToNext, nextThreshold } = getXpToNextLevel(state.xp);
  const unlockedAchievements = getUnlockedAchievements(state);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const num = parseInt(e.key);
    if (num >= 1 && num <= 9) {
      const item = MENU_ITEMS.find(m => m.shortcut === num);
      if (item) {
        router.push(item.href);
      }
    }
    if (e.key === 't' || e.key === 'T') {
      toggleTheme();
    }
  }, [router, toggleTheme]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-50">AI-DLC Explainer</h1>
          <p className="text-slate-400 text-sm">Learn the AI-Driven Development Lifecycle</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-dark-secondary hover:bg-dark-tertiary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <div className="xp-badge">
            ⭐ {state.xp} XP
          </div>
        </div>
      </header>

      {/* Progress Dashboard */}
      <section className="card mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-semibold">Level {state.level}:</span>
              <span className="text-accent-primary">{state.title}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {xpToNext > 0 ? `${xpToNext} XP to next level` : 'Max level reached!'}
            </p>
          </div>
          
          {unlockedAchievements.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Achievements:</span>
              <div className="flex gap-1">
                {unlockedAchievements.map(a => (
                  <span key={a.id} title={a.name} className="text-xl">
                    {a.icon}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Menu Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.href)}
            className="card text-left group cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-50 group-hover:text-accent-primary transition-colors">
                    {item.title}
                  </h3>
                  <kbd className="kbd">{item.shortcut}</kbd>
                </div>
                <p className="text-sm text-slate-400">{item.description}</p>
              </div>
            </div>
          </button>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-slate-700">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
          <span><kbd className="kbd">1-9</kbd> Navigate</span>
          <span><kbd className="kbd">t</kbd> Toggle theme</span>
          <span><kbd className="kbd">?</kbd> Help</span>
        </div>
      </footer>
    </main>
  );
}
