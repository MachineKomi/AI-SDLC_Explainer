'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useProgress } from '@/context/ProgressContext';
import { getLessonById } from '@/content/lessons';

interface LessonClientProps {
  lessonId: string;
}

export default function LessonClient({ lessonId }: LessonClientProps) {
  const router = useRouter();
  const { state, updateLessonProgress, markLessonCompleted } = useProgress();
  const [currentSection, setCurrentSection] = useState(0);

  const lesson = getLessonById(lessonId);

  useEffect(() => {
    if (!lesson) {
      router.push('/lessons');
      return;
    }
    // Resume from last position if in progress
    const progress = state.lessons.inProgress[lessonId];
    if (progress) {
      setCurrentSection(progress.lastSection);
    }
  }, [lesson, lessonId, state.lessons.inProgress, router]);

  const goToSection = useCallback((index: number) => {
    if (!lesson) return;
    const newIndex = Math.max(0, Math.min(index, lesson.sections.length - 1));
    setCurrentSection(newIndex);
    updateLessonProgress(lessonId, newIndex);
    
    // Mark complete if on last section
    if (newIndex === lesson.sections.length - 1) {
      markLessonCompleted(lessonId);
    }
  }, [lesson, lessonId, updateLessonProgress, markLessonCompleted]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lesson) return;
    
    if (e.key === 'Escape') {
      router.push('/lessons');
    } else if (e.key === 'ArrowRight' || e.key === 'l') {
      goToSection(currentSection + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'h') {
      goToSection(currentSection - 1);
    }
  }, [lesson, router, currentSection, goToSection]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!lesson) {
    return <div className="p-8">Loading...</div>;
  }

  const section = lesson.sections[currentSection];
  const isFirstSection = currentSection === 0;
  const isLastSection = currentSection === lesson.sections.length - 1;

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
      <header className="mb-6">
        <Link href="/lessons" className="text-slate-400 hover:text-slate-200 text-sm mb-2 inline-block">
          ← Back to Lessons
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">{lesson.title}</h1>
          <span className="text-sm text-slate-400">
            Section {currentSection + 1} of {lesson.sections.length}
          </span>
        </div>
      </header>

      {/* Section Content */}
      <article className="card mb-6">
        <h2 className="text-lg font-semibold text-accent-primary mb-4">{section.title}</h2>
        <div className="prose prose-invert max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-slate-300 leading-relaxed">
            {section.content}
          </pre>
        </div>
        
        {section.diagram && (
          <div className="mt-6">
            <pre className="ascii-diagram text-xs md:text-sm overflow-x-auto">
              {section.diagram}
            </pre>
          </div>
        )}
      </article>

      {/* Navigation */}
      <nav className="flex items-center justify-between">
        <button
          onClick={() => goToSection(currentSection - 1)}
          disabled={isFirstSection}
          className={`btn ${isFirstSection ? 'opacity-50 cursor-not-allowed' : 'btn-secondary'}`}
        >
          ← Previous
        </button>
        
        {/* Progress dots */}
        <div className="flex gap-1">
          {lesson.sections.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSection(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentSection
                  ? 'bg-accent-primary'
                  : i < currentSection
                  ? 'bg-accent-success'
                  : 'bg-slate-600'
              }`}
              aria-label={`Go to section ${i + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={() => goToSection(currentSection + 1)}
          disabled={isLastSection}
          className={`btn ${isLastSection ? 'opacity-50 cursor-not-allowed' : 'btn-primary'}`}
        >
          Next →
        </button>
      </nav>

      <footer className="mt-8 pt-4 border-t border-slate-700">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
          <span><kbd className="kbd">←</kbd> / <kbd className="kbd">h</kbd> Previous</span>
          <span><kbd className="kbd">→</kbd> / <kbd className="kbd">l</kbd> Next</span>
          <span><kbd className="kbd">Esc</kbd> Exit</span>
        </div>
      </footer>
    </main>
  );
}
