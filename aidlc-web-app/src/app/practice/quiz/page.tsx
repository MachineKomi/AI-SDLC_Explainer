'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProgress } from '@/context/ProgressContext';
import { QUIZ_QUESTIONS } from '@/content/quiz';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface ShuffledQuestion {
  original: typeof QUIZ_QUESTIONS[0];
  shuffledOptions: string[];
  correctIndex: number;
}

export default function QuizPage() {
  const router = useRouter();
  const { saveQuizResult } = useProgress();
  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Shuffle questions and their options
    const shuffled = QUIZ_QUESTIONS.map(q => {
      const indices = q.options.map((_, i) => i);
      const shuffledIndices = shuffleArray(indices);
      return {
        original: q,
        shuffledOptions: shuffledIndices.map(i => q.options[i]),
        correctIndex: shuffledIndices.indexOf(q.correct),
      };
    });
    setQuestions(shuffled);
  }, []);

  const handleAnswer = useCallback((index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    setShowFeedback(true);

    if (index === questions[currentIndex].correctIndex) {
      setScore(s => s + 1);
    }
  }, [showFeedback, questions, currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setCompleted(true);
      saveQuizResult(score + (selectedAnswer === questions[currentIndex].correctIndex ? 1 : 0), questions.length);
    }
  }, [currentIndex, questions, score, selectedAnswer, saveQuizResult]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      router.push('/practice');
    } else if (e.key === 'Enter' && showFeedback) {
      handleNext();
    } else if (!showFeedback) {
      const num = parseInt(e.key);
      if (num >= 1 && num <= 4) {
        handleAnswer(num - 1);
      }
    }
  }, [router, showFeedback, handleNext, handleAnswer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (questions.length === 0) {
    return <div className="p-8">Loading...</div>;
  }

  if (completed) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <main className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto">
        <div className="card text-center">
          <h1 className="text-2xl font-bold mb-4">Quiz Complete! 🎉</h1>
          <div className="text-5xl font-bold text-accent-primary mb-2">
            {finalScore}/{questions.length}
          </div>
          <p className="text-foreground-muted mb-6">{percentage}% correct</p>

          <div className="flex gap-4 justify-center">
            <button onClick={() => window.location.reload()} className="btn btn-primary">
              Try Again
            </button>
            <Link href="/practice" className="btn btn-secondary">
              Back to Practice
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const question = questions[currentIndex];
  const isCorrect = selectedAnswer === question.correctIndex;

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto">
      <header className="mb-6">
        <Link href="/practice" className="text-foreground-muted hover:text-foreground text-sm mb-2 inline-block">
          ← Back to Practice
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">📝 Knowledge Quiz</h1>
          <div className="text-sm">
            <span className="text-accent-success">{score}</span>
            <span className="text-foreground-muted/70"> / {currentIndex + 1}</span>
            <span className="text-foreground-muted/50 ml-2">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>
        </div>
      </header>

      <article className="card mb-6">
        <h2 className="text-lg font-medium mb-6">{question.original.prompt}</h2>

        <div className="space-y-3">
          {question.shuffledOptions.map((option, i) => {
            let className = 'card cursor-pointer transition-all';

            if (showFeedback) {
              if (i === question.correctIndex) {
                className += ' border-accent-success bg-accent-success/10';
              } else if (i === selectedAnswer) {
                className += ' border-accent-error bg-accent-error/10';
              }
            } else if (selectedAnswer === i) {
              className += ' border-accent-primary';
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={showFeedback}
                className={`${className} w-full text-left`}
              >
                <div className="flex items-center gap-3">
                  <kbd className="kbd">{i + 1}</kbd>
                  <span>{option}</span>
                  {showFeedback && i === question.correctIndex && (
                    <span className="ml-auto text-accent-success">✓</span>
                  )}
                  {showFeedback && i === selectedAnswer && i !== question.correctIndex && (
                    <span className="ml-auto text-accent-error">✗</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </article>

      {showFeedback && (
        <div className={`card mb-6 ${isCorrect ? 'border-accent-success' : 'border-accent-error'}`}>
          <p className={`font-medium mb-2 ${isCorrect ? 'text-accent-success' : 'text-accent-error'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          <p className="text-sm text-foreground-muted">{question.original.explanation}</p>
        </div>
      )}

      {showFeedback && (
        <button onClick={handleNext} className="btn btn-primary w-full">
          {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
        </button>
      )}

      <footer className="mt-8 pt-4 border-t border-background-tertiary">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-foreground-muted">
          <span><kbd className="kbd">1-4</kbd> Select answer</span>
          <span><kbd className="kbd">Enter</kbd> Next</span>
          <span><kbd className="kbd">Esc</kbd> Exit</span>
        </div>
      </footer>
    </main>
  );
}
