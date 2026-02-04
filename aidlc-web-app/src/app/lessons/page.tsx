'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { useProgress } from '@/context/ProgressContext';
import { LESSONS } from '@/content/lessons';
import VideoGrid from '@/components/VideoGrid';
import { VIDEOS } from '@/content/videos';

export default function LessonsPage() {
  const router = useRouter();
  const { state, markVideoWatched } = useProgress();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      router.push('/');
    }
    const num = parseInt(e.key);
    if (num >= 1 && num <= LESSONS.length) {
      router.push(`/lessons/${LESSONS[num - 1].id}`);
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <header className="mb-8">
        <Link href="/" className="text-foreground-muted hover:text-foreground text-sm mb-2 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">📖 Lessons</h1>
        <p className="text-foreground-muted">Learn AI-SDLC fundamentals step by step</p>
      </header>

      <section className="space-y-4">
        {LESSONS.map((lesson, index) => {
          const isCompleted = state.lessons.completed.includes(lesson.id);
          const inProgress = state.lessons.inProgress[lesson.id];

          return (
            <Link
              key={lesson.id}
              href={`/lessons/${lesson.id}`}
              className="card block group"
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-background-tertiary text-lg">
                  {isCompleted ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground group-hover:text-accent-primary transition-colors">
                      {lesson.title}
                    </h3>
                    <kbd className="kbd">{index + 1}</kbd>
                    {isCompleted && (
                      <span className="text-xs text-accent-success">Completed</span>
                    )}
                    {inProgress && !isCompleted && (
                      <span className="text-xs text-accent-warning">In Progress</span>
                    )}
                  </div>
                  <p className="text-sm text-foreground-muted">{lesson.description}</p>
                  <p className="text-xs text-foreground-muted/70 mt-1">
                    {lesson.sections.length} sections
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Video Lessons Section */}
      <VideoGrid
        videos={VIDEOS}
        watchedVideos={state.videos.watched}
        onToggleWatched={markVideoWatched}
      />

      <footer className="mt-8 pt-4 border-t border-background-tertiary">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-foreground-muted">
          <span><kbd className="kbd">1-{LESSONS.length}</kbd> Select lesson</span>
          <span><kbd className="kbd">Esc</kbd> Back to home</span>
        </div>
      </footer>
    </main>
  );
}
