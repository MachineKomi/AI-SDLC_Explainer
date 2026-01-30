'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GATEKEEPER_SCENARIOS } from '@/content/gates';
import { useProgress } from '@/context/ProgressContext';

type Decision = 'approve' | 'reject' | null;

interface ScenarioResult {
  scenarioId: string;
  userDecision: Decision;
  correct: boolean;
}

export default function GatekeeperPage() {
  const router = useRouter();
  const { addXp, saveGatekeeperResult } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [decision, setDecision] = useState<Decision>(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<ScenarioResult[]>([]);
  const [completed, setCompleted] = useState(false);

  const currentScenario = GATEKEEPER_SCENARIOS[currentIndex];
  const isCorrect = decision === currentScenario?.decisions.correct_action;

  const handleDecision = (choice: Decision) => {
    if (showResult || !choice) return;
    setDecision(choice);
    setShowResult(true);
    
    const result: ScenarioResult = {
      scenarioId: currentScenario.id,
      userDecision: choice,
      correct: choice === currentScenario.decisions.correct_action,
    };
    setResults(prev => [...prev, result]);
    
    if (result.correct) {
      addXp('gate_correct');
    }
  };

  const handleNext = () => {
    if (currentIndex < GATEKEEPER_SCENARIOS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setDecision(null);
      setShowResult(false);
    } else {
      const score = results.filter(r => r.correct).length + (isCorrect ? 1 : 0);
      saveGatekeeperResult(score, GATEKEEPER_SCENARIOS.length);
      setCompleted(true);
    }
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (completed) {
      if (e.key === 'Escape' || e.key === 'Enter') {
        router.push('/practice');
      }
      return;
    }

    if (e.key === 'Escape') {
      router.push('/practice');
    } else if (!showResult) {
      if (e.key === '1' || e.key === 'a') {
        handleDecision('approve');
      } else if (e.key === '2' || e.key === 'r') {
        handleDecision('reject');
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      handleNext();
    }
  }, [router, showResult, completed, currentIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const finalScore = results.filter(r => r.correct).length;

  if (completed) {
    const percentage = Math.round((finalScore / GATEKEEPER_SCENARIOS.length) * 100);
    return (
      <main className="min-h-screen p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="card text-center">
            <h1 className="text-2xl font-bold mb-4">🚪 Gatekeeper Complete!</h1>
            
            <div className="text-6xl font-bold mb-2">
              {finalScore}/{GATEKEEPER_SCENARIOS.length}
            </div>
            <p className="text-slate-400 mb-6">{percentage}% correct</p>
            
            <div className="w-full bg-slate-700 rounded-full h-4 mb-6">
              <div 
                className={`h-4 rounded-full transition-all ${
                  percentage >= 80 ? 'bg-accent-success' : percentage >= 50 ? 'bg-accent-warning' : 'bg-accent-error'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            
            {percentage >= 80 && (
              <p className="text-accent-success mb-4">🏆 Excellent! You&apos;ve mastered the gatekeeper role!</p>
            )}
            
            <div className="space-y-2 text-left mb-6">
              <h3 className="font-semibold text-slate-300">Results:</h3>
              {results.map((result, idx) => {
                const scenario = GATEKEEPER_SCENARIOS.find(s => s.id === result.scenarioId);
                return (
                  <div key={result.scenarioId} className="flex items-center gap-2 text-sm">
                    <span>{result.correct ? '✅' : '❌'}</span>
                    <span className="text-slate-400">Scenario {idx + 1}:</span>
                    <span className={result.correct ? 'text-accent-success' : 'text-accent-error'}>
                      {scenario?.stage}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex gap-4 justify-center">
              <Link href="/practice" className="btn-secondary">
                Back to Practice
              </Link>
              <button 
                onClick={() => {
                  setCurrentIndex(0);
                  setDecision(null);
                  setShowResult(false);
                  setResults([]);
                  setCompleted(false);
                }}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        
        <footer className="mt-8 text-center text-sm text-slate-500">
          <kbd className="kbd">Enter</kbd> or <kbd className="kbd">Esc</kbd> to continue
        </footer>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <header className="mb-6">
        <Link href="/practice" className="text-slate-400 hover:text-slate-200 text-sm mb-2 inline-block">
          ← Back to Practice
        </Link>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold">🚪 Gatekeeper Challenge</h1>
          <span className="text-slate-400">
            Scenario {currentIndex + 1}/{GATEKEEPER_SCENARIOS.length}
          </span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Phase & Stage */}
        <div className="flex gap-4 text-sm">
          <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full">
            {currentScenario.phase}
          </span>
          <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full">
            {currentScenario.stage}
          </span>
        </div>

        {/* Context */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-400 mb-2">📋 Context</h3>
          <p className="text-slate-200">{currentScenario.context}</p>
        </div>

        {/* AI Plan */}
        <div className="card border-l-4 border-accent-primary">
          <h3 className="text-sm font-semibold text-slate-400 mb-2">🤖 AI&apos;s Plan</h3>
          <p className="text-slate-200 whitespace-pre-wrap">{currentScenario.ai_plan}</p>
        </div>

        {/* Decision Buttons */}
        {!showResult && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleDecision('approve')}
              className="card hover:border-accent-success transition-colors text-center py-6"
            >
              <span className="text-3xl mb-2 block">✅</span>
              <span className="font-semibold">Approve</span>
              <span className="text-sm text-slate-400 block mt-1">Press 1 or A</span>
            </button>
            <button
              onClick={() => handleDecision('reject')}
              className="card hover:border-accent-error transition-colors text-center py-6"
            >
              <span className="text-3xl mb-2 block">❌</span>
              <span className="font-semibold">Reject</span>
              <span className="text-sm text-slate-400 block mt-1">Press 2 or R</span>
            </button>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className={`card border-l-4 ${isCorrect ? 'border-accent-success' : 'border-accent-error'}`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
              <span className={`font-bold ${isCorrect ? 'text-accent-success' : 'text-accent-error'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
              <span className="text-slate-400">
                The correct action was to <strong>{currentScenario.decisions.correct_action}</strong>
              </span>
            </div>

            {/* Flaws */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-slate-400 mb-2">🔍 Flaws in the AI&apos;s Plan:</h4>
              <ul className="space-y-1">
                {currentScenario.flaws.map((flaw, idx) => (
                  <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-accent-warning">•</span>
                    {flaw}
                  </li>
                ))}
              </ul>
            </div>

            {/* Evidence Checklist */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-slate-400 mb-2">📝 Evidence Checklist:</h4>
              <ul className="space-y-1">
                {currentScenario.evidence_checklist.map((item, idx) => (
                  <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-accent-primary">☐</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Valid/Invalid Reasons */}
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-accent-success mb-1">Valid Reasons:</h4>
                <ul className="space-y-1">
                  {currentScenario.decisions.valid_reasons.map((reason, idx) => (
                    <li key={idx} className="text-slate-400">• {reason}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-accent-error mb-1">Invalid Reasons:</h4>
                <ul className="space-y-1">
                  {currentScenario.decisions.invalid_reasons.map((reason, idx) => (
                    <li key={idx} className="text-slate-400">• {reason}</li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="btn-primary w-full mt-4"
            >
              {currentIndex < GATEKEEPER_SCENARIOS.length - 1 ? 'Next Scenario →' : 'See Results'}
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-slate-700 text-sm text-slate-500">
        <div className="flex justify-center gap-4">
          {!showResult ? (
            <>
              <span><kbd className="kbd">1</kbd>/<kbd className="kbd">A</kbd> Approve</span>
              <span><kbd className="kbd">2</kbd>/<kbd className="kbd">R</kbd> Reject</span>
            </>
          ) : (
            <span><kbd className="kbd">Enter</kbd> Continue</span>
          )}
          <span><kbd className="kbd">Esc</kbd> Exit</span>
        </div>
      </footer>
    </main>
  );
}
