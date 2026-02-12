'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@/context/ProgressContext';
import { getLessonById, getAllLessons } from '@/content/lessons';
import DiagramDispatcher from '@/components/DiagramDispatcher';
import { SectionQuestion } from '@/types';

interface LessonClientProps {
  lessonId: string;
}

export default function LessonClient({ lessonId }: LessonClientProps) {
  const router = useRouter();
  const { state, updateLessonProgress, markLessonCompleted, addXp } = useProgress();
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [answeredSections, setAnsweredSections] = useState<Set<string>>(new Set());

  const isCompleted = state.lessons.completed.includes(lessonId);
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

  // Reset question state when section changes
  useEffect(() => {
    setSelectedAnswer(null);
    setHasAnswered(false);
  }, [currentSection]);

  const currentSectionData = lesson?.sections[currentSection];
  const hasQuestion = currentSectionData?.question !== undefined;
  const sectionKey = `${lessonId}-${currentSectionData?.id}`;
  const alreadyAnsweredThisSection = answeredSections.has(sectionKey);
  const canProceed = !hasQuestion || hasAnswered || alreadyAnsweredThisSection;

  const goToSection = useCallback((index: number) => {
    if (!lesson) return;
    if (!canProceed && index > currentSection) return; // Block forward if question not answered
    
    const newIndex = Math.max(0, Math.min(index, lesson.sections.length - 1));
    setCurrentSection(newIndex);
    updateLessonProgress(lessonId, newIndex);

    // Mark complete if on last section
    if (newIndex === lesson.sections.length - 1) {
      markLessonCompleted(lessonId);
    }
  }, [lesson, lessonId, updateLessonProgress, markLessonCompleted, canProceed, currentSection]);

  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (hasAnswered || alreadyAnsweredThisSection) return;
    setSelectedAnswer(answerIndex);
  }, [hasAnswered, alreadyAnsweredThisSection]);

  const handleSubmitAnswer = useCallback(() => {
    if (selectedAnswer === null || hasAnswered || alreadyAnsweredThisSection) return;
    setHasAnswered(true);
    setAnsweredSections(prev => new Set(prev).add(sectionKey));
    // Award XP for answering (regardless of correct/incorrect)
    addXp('lesson_question');
  }, [selectedAnswer, hasAnswered, alreadyAnsweredThisSection, sectionKey, addXp]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lesson) return;

    if (e.key === 'Escape') {
      router.push('/lessons');
    } else if (e.key === 'ArrowRight' || e.key === 'l') {
      if (canProceed) {
        goToSection(currentSection + 1);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'h') {
      goToSection(currentSection - 1);
    } else if (e.key >= '1' && e.key <= '4' && hasQuestion && !hasAnswered && !alreadyAnsweredThisSection) {
      const num = parseInt(e.key) - 1;
      if (currentSectionData?.question && num < currentSectionData.question.options.length) {
        handleAnswerSelect(num);
      }
    } else if (e.key === 'Enter' && selectedAnswer !== null && !hasAnswered) {
      handleSubmitAnswer();
    }
  }, [lesson, router, currentSection, goToSection, canProceed, hasQuestion, hasAnswered, alreadyAnsweredThisSection, currentSectionData, handleAnswerSelect, selectedAnswer, handleSubmitAnswer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!lesson) {
    return <div className="p-8">Loading...</div>;
  }

  const renderDiagram = (section: typeof currentSectionData) => {
    if (!section) return null;
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

  const renderQuestion = (question: SectionQuestion) => {
    const isCorrect = selectedAnswer === question.correct;
    const showResult = hasAnswered || alreadyAnsweredThisSection;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 p-6 bg-background-secondary/50 rounded-xl border border-white/10"
      >
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-accent-primary" />
          <h3 className="text-lg font-semibold">Quick Check</h3>
        </div>
        
        <p className="text-foreground/90 mb-4">{question.prompt}</p>
        
        <div className="space-y-2">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrectAnswer = idx === question.correct;
            let bgClass = 'bg-background-tertiary/30 hover:bg-background-tertiary/50';
            let borderClass = 'border-white/10';
            
            if (showResult) {
              if (isCorrectAnswer) {
                bgClass = 'bg-accent-success/20';
                borderClass = 'border-accent-success';
              } else if (isSelected && !isCorrectAnswer) {
                bgClass = 'bg-accent-error/20';
                borderClass = 'border-accent-error';
              }
            } else if (isSelected) {
              bgClass = 'bg-accent-primary/20';
              borderClass = 'border-accent-primary';
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                disabled={showResult}
                className={`w-full p-3 rounded-lg border ${borderClass} ${bgClass} text-left transition-all ${
                  showResult ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm font-mono">
                    {idx + 1}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && isCorrectAnswer && (
                    <CheckCircle className="w-5 h-5 text-accent-success" />
                  )}
                  {showResult && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-accent-error" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {!showResult && selectedAnswer !== null && (
          <button
            onClick={handleSubmitAnswer}
            className="mt-4 btn btn-primary w-full"
          >
            Submit Answer
          </button>
        )}

        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 p-4 rounded-lg ${
              isCorrect || alreadyAnsweredThisSection ? 'bg-accent-success/10 border border-accent-success/30' : 'bg-accent-warning/10 border border-accent-warning/30'
            }`}
          >
            <p className="text-sm">
              {isCorrect ? '✓ Correct! ' : alreadyAnsweredThisSection ? '' : '✗ Not quite. '}
              {question.explanation}
            </p>
            <p className="text-xs text-foreground-muted mt-2">+20 XP earned</p>
          </motion.div>
        )}
      </motion.div>
    );
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
                {currentSectionData?.title}
              </h2>

              <div className="prose prose-invert max-w-none mb-8">
                <div className="whitespace-pre-wrap font-sans text-lg leading-relaxed text-foreground/90">
                  {currentSectionData?.content}
                </div>
              </div>

              {/* Diagram Renderer */}
              {renderDiagram(currentSectionData)}

              {/* Question Section */}
              {currentSectionData?.question && renderQuestion(currentSectionData.question)}

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

          {isLastSection ? (
            isLastLesson ? (
              <button
                onClick={() => router.push('/practice')}
                disabled={!canProceed}
                className={`btn ${canProceed ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
              >
                Start Practice →
              </button>
            ) : (
              <button
                onClick={() => {
                  const nextLesson = allLessons[currentIndex + 1];
                  if (nextLesson) {
                    router.push(`/lessons/${nextLesson.id}`);
                  }
                }}
                disabled={!canProceed}
                className={`btn ${canProceed ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
              >
                Next Lesson →
              </button>
            )
          ) : (
            <button
              onClick={() => goToSection(currentSection + 1)}
              disabled={!canProceed}
              className={`btn ${canProceed ? 'btn-primary' : 'btn-secondary opacity-50 cursor-not-allowed'}`}
              title={!canProceed ? 'Answer the question to continue' : ''}
            >
              Next →
            </button>
          )}
        </div>
        
        {hasQuestion && !canProceed && (
          <p className="text-center text-sm text-foreground-muted mt-2">
            Answer the question above to continue
          </p>
        )}
      </footer>
    </div>
  );
}
