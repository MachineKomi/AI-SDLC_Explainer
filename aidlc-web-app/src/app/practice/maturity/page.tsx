'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useProgress } from '@/context/ProgressContext';

interface MaturityQuestion {
  id: string;
  prompt: string;
  options: { label: string; level: number; detail: string }[];
}

const MATURITY_QUESTIONS: MaturityQuestion[] = [
  {
    id: 'code-authorship',
    prompt: 'Who writes the code on your team?',
    options: [
      { label: 'Humans write all code, maybe with autocomplete', level: 0, detail: 'L0–L1: AI as typing assistant' },
      { label: 'AI writes functions/modules, humans review every line', level: 2, detail: 'L2: AI as junior dev, human bottleneck on review' },
      { label: 'AI implements features, humans review at PR level', level: 3, detail: 'L3: AI as managed contributor' },
      { label: 'AI builds from specs, humans check outcomes only', level: 4, detail: 'L4: Code is a black box, specs are the product' },
      { label: 'AI ships autonomously, humans write specs and judge results', level: 5, detail: 'L5: Dark factory — full autonomy' },
    ],
  },
  {
    id: 'validation-method',
    prompt: 'How do you validate AI-generated output?',
    options: [
      { label: 'Read every line of code the AI produces', level: 2, detail: 'L2: Human reading speed is the bottleneck' },
      { label: 'Review architecture and test coverage at PR level', level: 3, detail: 'L3: Structural review, not line-by-line' },
      { label: 'Check outcomes against specs — tests pass, behavior correct', level: 4, detail: 'L4: Outcome-based validation' },
      { label: 'Automated external scenarios the AI cannot see', level: 5, detail: 'L5: Holdout-set validation prevents gaming' },
    ],
  },
  {
    id: 'workflow-design',
    prompt: 'How has your workflow changed since adopting AI tools?',
    options: [
      { label: 'Same process, just with Copilot/autocomplete added', level: 1, detail: 'L1: AI bolted onto existing workflow' },
      { label: 'Faster coding, but same sprints/standups/reviews', level: 2, detail: 'L2: Speed boost without structural change' },
      { label: 'Shorter iterations, fewer ceremonies, spec-driven', level: 3, detail: 'L3: Workflow adapting to AI capabilities' },
      { label: 'Completely redesigned — bolts not sprints, gates not reviews', level: 4, detail: 'L4: AI-native workflow' },
    ],
  },
  {
    id: 'spec-quality',
    prompt: 'How precise are your specifications before AI starts building?',
    options: [
      { label: 'Verbal descriptions or brief tickets', level: 1, detail: 'L1: Specs are informal, humans fill gaps' },
      { label: 'User stories with acceptance criteria', level: 2, detail: 'L2: Structured but still requires human interpretation' },
      { label: 'Detailed specs with domain models and constraints', level: 3, detail: 'L3: Specs rich enough for AI to decompose' },
      { label: 'Machine-readable specs with scenario suites', level: 4, detail: 'L4: Specs ARE the product — AI builds exactly what\'s described' },
    ],
  },
  {
    id: 'testing-approach',
    prompt: 'Do you have external holdout scenarios (not in-repo tests)?',
    options: [
      { label: 'No — all tests live in the repo', level: 2, detail: 'L0–L2: Traditional testing pyramid' },
      { label: 'Some manual QA checks outside the codebase', level: 3, detail: 'L3: Partial external validation' },
      { label: 'Yes — behavioral scenarios stored separately from code', level: 4, detail: 'L4: External holdouts prevent AI gaming' },
      { label: 'Full scenario suites + digital twin environments', level: 5, detail: 'L5: Complete independent validation layer' },
    ],
  },
  {
    id: 'team-structure',
    prompt: 'How many distinct roles are involved in shipping a feature?',
    options: [
      { label: '5+ (PO, Dev, QA, Scrum Master, Ops, etc.)', level: 1, detail: 'L1: Traditional role separation' },
      { label: '3–4 (PO, Dev, QA — some role overlap)', level: 2, detail: 'L2: Some convergence starting' },
      { label: '3 (Product Owner, Developer, AI Agent)', level: 4, detail: 'L4: AI-SDLC RACI model' },
      { label: '2 (Spec writer + AI — humans judge outcomes)', level: 5, detail: 'L5: Maximum role convergence' },
    ],
  },
  {
    id: 'metrics',
    prompt: 'What do you measure to track team performance?',
    options: [
      { label: 'Velocity (story points per sprint)', level: 1, detail: 'L1: Measuring effort, not value' },
      { label: 'Deployment frequency and lead time', level: 2, detail: 'L2: DORA metrics — good but effort-adjacent' },
      { label: 'Intent completion rate, bolt cycle time, gate pass rate', level: 4, detail: 'L4: Outcome-focused AI-SDLC metrics' },
      { label: 'Human override rate, scenario pass rate, remediation time', level: 5, detail: 'L5: Calibration metrics for autonomous systems' },
    ],
  },
];

const LEVEL_RESULTS: Record<number, { title: string; emoji: string; description: string; nextSteps: string[] }> = {
  0: {
    title: 'Level 0 — Autocomplete',
    emoji: '⌨️',
    description: 'AI is a typing assistant. No workflow change, no real leverage. You\'re leaving 95% of AI capability on the table.',
    nextSteps: [
      'Start using AI for scoped tasks (function generation, error handling)',
      'Experiment with AI-generated tests alongside your code',
      'Read the "5 Levels" lesson to understand the full maturity path',
    ],
  },
  1: {
    title: 'Level 1 — Scoped Tasks',
    emoji: '🔧',
    description: 'AI handles bounded tasks but you review every line. It\'s a faster typist, not a collaborator. The J-curve hasn\'t started yet.',
    nextSteps: [
      'Let AI handle multi-file changes — practice reviewing at module level',
      'Start writing more precise specs before asking AI to build',
      'Track how much time you spend reviewing vs. the time AI saves',
    ],
  },
  2: {
    title: 'Level 2 — Junior Dev',
    emoji: '👀',
    description: 'AI modifies multiple files but you read every change. Human reading speed is the bottleneck. Writing code got cheaper, owning it got more expensive.',
    nextSteps: [
      'Shift from line-by-line review to PR-level review (architecture, behavior, tests)',
      'Invest in better specs — the quality of AI output depends on input quality',
      'Try a Mob Elaboration session: let AI decompose a feature, team challenges it',
      'Start measuring Human Override Rate to calibrate your review process',
    ],
  },
  3: {
    title: 'Level 3 — Manager',
    emoji: '📋',
    description: 'You direct AI at the PR level and review structurally, not line-by-line. The workflow is starting to change. You\'re in the J-curve — it feels uncomfortable.',
    nextSteps: [
      'Formalize your specs: domain models, acceptance criteria, constraints',
      'Introduce gate-based validation instead of traditional code review',
      'Design external scenarios (holdout tests) for critical features',
      'Run a 4-week AI-SDLC adoption pilot using the Leader\'s Cheat Sheet',
    ],
  },
  4: {
    title: 'Level 4 — Product Manager',
    emoji: '🎯',
    description: 'Code is a black box. You write specs and evaluate outcomes. Spec quality is your primary bottleneck. You\'re operating at the AI-SDLC sweet spot.',
    nextSteps: [
      'Build out your external scenario suite — this is your quality moat',
      'Invest in digital twin environments for integration validation',
      'Optimize your RACI: ensure only 3 actors (AI, Dev, PO) are in the loop',
      'Track and optimize: Override Rate, Gate Pass Rate, Bolt Cycle Time',
    ],
  },
  5: {
    title: 'Level 5 — Dark Factory',
    emoji: '🏭',
    description: 'Specs in, software out. Humans write specs and judge outcomes. AI handles everything else. You\'ve crossed the gap.',
    nextSteps: [
      'Continuously improve scenario quality — this is your competitive advantage',
      'Monitor Override Rate for rubber-stamping (< 5% is a red flag)',
      'Share your learnings — most of the industry is at L1–L2',
      'Focus on spec innovation: better specs = better software = better outcomes',
    ],
  },
};

export default function MaturityAssessmentPage() {
  const { addXp } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswer = useCallback((optionIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
  }, [selectedAnswer]);

  const handleNext = useCallback(() => {
    if (selectedAnswer === null) return;
    const level = MATURITY_QUESTIONS[currentIndex].options[selectedAnswer].level;
    const newAnswers = [...answers, level];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentIndex < MATURITY_QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setCompleted(true);
      addXp('maturity_assessment');
    }
  }, [selectedAnswer, currentIndex, answers, addXp]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (completed) return;
    if (e.key === 'Enter' && selectedAnswer !== null) {
      handleNext();
    } else {
      const num = parseInt(e.key);
      const maxOptions = MATURITY_QUESTIONS[currentIndex].options.length;
      if (num >= 1 && num <= maxOptions) {
        handleAnswer(num - 1);
      }
    }
  }, [completed, selectedAnswer, handleNext, handleAnswer, currentIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Calculate result
  const calculateLevel = (): number => {
    if (answers.length === 0) return 0;
    const avg = answers.reduce((sum, l) => sum + l, 0) / answers.length;
    return Math.round(avg);
  };

  if (completed) {
    const level = calculateLevel();
    const result = LEVEL_RESULTS[level] || LEVEL_RESULTS[2];
    const avgScore = answers.reduce((sum, l) => sum + l, 0) / answers.length;

    return (
      <main className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto">
        <div className="card text-center mb-6">
          <div className="text-6xl mb-4">{result.emoji}</div>
          <h1 className="text-2xl font-bold mb-2">{result.title}</h1>
          <div className="text-sm text-foreground-muted mb-4">
            Average score: {avgScore.toFixed(1)} / 5.0
          </div>
          <p className="text-foreground-muted mb-6">{result.description}</p>
        </div>

        {/* Level visualization */}
        <div className="card mb-6">
          <h2 className="text-sm font-mono text-foreground-muted mb-4">YOUR POSITION ON THE MATURITY SPECTRUM</h2>
          <div className="flex items-center gap-1 mb-2">
            {[0, 1, 2, 3, 4, 5].map(l => (
              <div
                key={l}
                className={`flex-1 h-8 rounded-sm flex items-center justify-center text-xs font-mono transition-all ${
                  l === level
                    ? 'bg-accent-primary text-background-primary scale-110 ring-2 ring-accent-primary/50'
                    : l < level
                    ? 'bg-accent-primary/30 text-foreground-muted'
                    : 'bg-background-tertiary text-foreground-muted/50'
                }`}
              >
                L{l}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-foreground-muted/60 font-mono">
            <span>Autocomplete</span>
            <span>Dark Factory</span>
          </div>
        </div>

        {/* Per-question breakdown */}
        <div className="card mb-6">
          <h2 className="text-sm font-mono text-foreground-muted mb-4">BREAKDOWN BY DIMENSION</h2>
          <div className="space-y-3">
            {MATURITY_QUESTIONS.map((q, i) => (
              <div key={q.id} className="flex items-center gap-3">
                <div className="flex-1 text-sm truncate">{q.prompt.replace('?', '')}</div>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4, 5].map(l => (
                    <div
                      key={l}
                      className={`w-4 h-4 rounded-sm text-[9px] flex items-center justify-center font-mono ${
                        l === answers[i]
                          ? 'bg-accent-primary text-background-primary'
                          : 'bg-background-tertiary text-foreground-muted/30'
                      }`}
                    >
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next steps */}
        <div className="card mb-6">
          <h2 className="text-sm font-mono text-foreground-muted mb-4">WHAT TO DO NEXT</h2>
          <ul className="space-y-2">
            {result.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-accent-primary mt-0.5">→</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <button onClick={() => { setCurrentIndex(0); setAnswers([]); setCompleted(false); setSelectedAnswer(null); }} className="btn btn-primary">
            Retake Assessment
          </button>
          <Link href="/practice" className="btn btn-secondary">
            Back to Practice
          </Link>
        </div>
      </main>
    );
  }

  const question = MATURITY_QUESTIONS[currentIndex];

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto">
      <header className="mb-6">
        <Link href="/practice" className="text-foreground-muted hover:text-foreground text-sm mb-2 inline-block">
          ← Back to Practice
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">🏭 AI Maturity Assessment</h1>
          <span className="text-sm text-foreground-muted">
            {currentIndex + 1} of {MATURITY_QUESTIONS.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1 bg-background-tertiary rounded-full overflow-hidden">
          <div
            className="h-full bg-accent-primary transition-all duration-300"
            style={{ width: `${((currentIndex) / MATURITY_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </header>

      <article className="card mb-6">
        <h2 className="text-lg font-medium mb-6">{question.prompt}</h2>
        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className={`card w-full text-left cursor-pointer transition-all ${
                selectedAnswer === i
                  ? 'border-accent-primary bg-accent-primary/10'
                  : 'hover:border-foreground-muted/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <kbd className="kbd mt-0.5">{i + 1}</kbd>
                <div>
                  <div className="text-sm">{option.label}</div>
                  {selectedAnswer === i && (
                    <div className="text-xs text-foreground-muted mt-1">{option.detail}</div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </article>

      {selectedAnswer !== null && (
        <button onClick={handleNext} className="btn btn-primary w-full">
          {currentIndex < MATURITY_QUESTIONS.length - 1 ? 'Next →' : 'See Results'}
        </button>
      )}

      <footer className="mt-8 pt-4 border-t border-background-tertiary">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-foreground-muted">
          <span><kbd className="kbd">1-{question.options.length}</kbd> Select</span>
          <span><kbd className="kbd">Enter</kbd> Next</span>
          <span><kbd className="kbd">Esc</kbd> Exit</span>
        </div>
      </footer>
    </main>
  );
}
