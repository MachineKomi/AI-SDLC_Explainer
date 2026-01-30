'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { useProgress } from '@/context/ProgressContext';

export default function PracticePage() {
  const router = useRouter();
  const { state } = useProgress();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      router.push('/');
    } else if (e.key === '1') {
      router.push('/practice/quiz');
    } else if (e.key === '2') {
      router.push('/practice/gatekeeper');
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <header className="mb-8">
        <Link href="/" className="text-slate-400 hover:text-slate-200 text-sm mb-2 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">🎯 Practice Mode</h1>
        <p className="text-slate-400">Test your AI-DLC knowledge</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        {/* Quiz Card */}
        <Link href="/practice/quiz" className="card group">
          <div className="flex items-start gap-4">
            <span className="text-3xl">📝</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-50 group-hover:text-accent-primary transition-colors">
                  Knowledge Quiz
                </h3>
                <kbd className="kbd">1</kbd>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                24 questions covering AI-DLC concepts
              </p>
              {state.quiz.completed && (
                <div className="mt-2 text-xs">
                  <span className="text-accent-success">
                    Best: {state.quiz.bestScore}/24
                  </span>
                  <span className="text-slate-500 ml-2">
                    ({state.quiz.attempts} attempts)
                  </span>
                </div>
              )}
            </div>
          </div>
        </Link>

        {/* Gatekeeper Card */}
        <Link href="/practice/gatekeeper" className="card group">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🚪</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-50 group-hover:text-accent-primary transition-colors">
                  Gatekeeper Practice
                </h3>
                <kbd className="kbd">2</kbd>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                10 scenarios to practice gate approvals
              </p>
              {state.gatekeeper.completed && (
                <div className="mt-2 text-xs">
                  <span className="text-accent-success">
                    Best: {state.gatekeeper.bestScore}/10
                  </span>
                  <span className="text-slate-500 ml-2">
                    ({state.gatekeeper.attempts} attempts)
                  </span>
                </div>
              )}
            </div>
          </div>
        </Link>
      </section>

      <footer className="mt-8 pt-4 border-t border-slate-700">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
          <span><kbd className="kbd">1</kbd> Quiz</span>
          <span><kbd className="kbd">2</kbd> Gatekeeper</span>
          <span><kbd className="kbd">Esc</kbd> Back to home</span>
        </div>
      </footer>
    </main>
  );
}
