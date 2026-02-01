'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import TypewriterText from '@/components/animations/TypewriterText';
import { useProgress } from '@/context/ProgressContext';
import { getLessonById, getAllLessons } from '@/content/lessons';
import DiagramDispatcher from '@/components/DiagramDispatcher';

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

  // Helper function to render diagrams
  const renderDiagram = (section: any) => {
    if (section.diagramType) {
      return (
        <div className="mt-6 p-4 bg-background-tertiary/30 rounded-xl">
          <DiagramDispatcher type={section.diagramType} />
        </div>
      );
    }
    if (section.diagram) {
      return (
        <div className="mt-6">
          <pre className="ascii-diagram text-xs md:text-sm overflow-x-auto">
            {section.diagram}
          </pre>
        </div>
      );
    }
    return null;
  };

  const isLastSection = currentSection === lesson.sections.length - 1;
  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const isLastLesson = currentIndex === allLessons.length - 1;

  return (
    <div className="flex flex-col h-full max-h-screen">
      {/* Header */}
      <header className="flex-none p-6 border-b border-white/10 bg-background/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/lessons"
            className="p-2 rounded-lg hover:bg-white/5 text-foreground-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              {lesson.title}
              {isCompleted && <CheckCircle className="w-5 h-5 text-accent-success" />}
            </h1>
            <p className="text-sm text-foreground-muted">
              Section {currentSection + 1} of {lesson.sections.length}
            </p>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-accent-primary">
                {lesson.sections[currentSection].title}
              </h2>

              <div className="prose prose-invert max-w-none mb-8">
                <div className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-foreground/90">
                  {lesson.sections[currentSection].content}
                </div>
              </div>

              {/* Diagram Renderer */}
              {renderDiagram(lesson.sections[currentSection])}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="flex-none p-6 border-t border-white/10 bg-background/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={() => goToSection(currentSection - 1)}
            disabled={currentSection === 0}
            className={`btn ${currentSection === 0 ? 'opacity-50 cursor-not-allowed' : 'btn-secondary'}`}
          >
            ← Previous
          </button>

          <div className="flex gap-1">
            {lesson.sections.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 w-8 rounded-full transition-colors ${idx === currentSection
                  ? 'bg-accent-primary'
                  : idx < currentSection
                    ? 'bg-accent-primary/50'
                    : 'bg-white/10'
                  }`}
              />
            ))}
          </div>

          <button
            onClick={() => goToSection(currentSection + 1)}
            className="btn btn-primary"
          >
            {isLastSection ? (isLastLesson ? 'Start Practice →' : 'Next Lesson →') : 'Next →'}
          </button>
        </div>
      </footer>
    </main>
  );
}
