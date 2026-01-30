'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { REQUEST_TYPES, RequestType } from '@/content/simulator/requestTypes';
import { SIMULATOR_QUESTIONS, SimulatorQuestion } from '@/content/simulator/questions';
import { PHASES, STAGES, Stage } from '@/content/simulator/stages';
import { useProgress } from '@/context/ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, ShieldCheck, Cpu, ChevronRight,
  CheckCircle2, AlertTriangle, ArrowRight, RotateCcw
} from 'lucide-react';

type SimulatorState = 'select-type' | 'questions' | 'results';

interface StageStatus {
  stage: Stage;
  execute: boolean;
  reason: string;
}

export default function SimulatorPage() {
  const router = useRouter();
  const { addXp, recordSimulationRun } = useProgress();
  const [state, setState] = useState<SimulatorState>('select-type');
  const [selectedType, setSelectedType] = useState<RequestType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [stageStatuses, setStageStatuses] = useState<StageStatus[]>([]);

  const currentQuestion = SIMULATOR_QUESTIONS[currentQuestionIndex];

  const calculateStageStatuses = useCallback(() => {
    if (!selectedType) return;

    const statuses: StageStatus[] = STAGES.map(stage => {
      const typeConfig = selectedType.stages[stage.id];
      let execute = typeConfig?.execute === true;
      let reason = typeConfig?.reason || '';

      // Apply question effects
      Object.entries(answers).forEach(([questionId, answerId]) => {
        const question = SIMULATOR_QUESTIONS.find(q => q.id === questionId);
        if (question) {
          const effect = question.effects[answerId];
          if (effect?.addStages?.includes(stage.id)) {
            execute = true;
            reason = effect.explanation;
          }
          if (effect?.removeStages?.includes(stage.id)) {
            execute = false;
            reason = effect.explanation;
          }
        }
      });

      return { stage, execute, reason };
    });

    setStageStatuses(statuses);
  }, [selectedType, answers]);

  const handleSelectType = (type: RequestType) => {
    setSelectedType(type);
    setState('questions');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswer = (answerId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answerId }));

    if (currentQuestionIndex < SIMULATOR_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setState('results');
      if (selectedType) {
        recordSimulationRun(selectedType.id);
        addXp('simulator_run');
      }
    }
  };

  useEffect(() => {
    if (state === 'results') {
      calculateStageStatuses();
    }
  }, [state, calculateStageStatuses]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (state === 'select-type') {
        router.push('/');
      } else {
        setState('select-type');
        setSelectedType(null);
      }
      return;
    }

    if (state === 'select-type') {
      const num = parseInt(e.key);
      if (num >= 1 && num <= REQUEST_TYPES.length) {
        handleSelectType(REQUEST_TYPES[num - 1]);
      }
    } else if (state === 'questions' && currentQuestion) {
      const num = parseInt(e.key);
      if (num >= 1 && num <= currentQuestion.options.length) {
        handleAnswer(currentQuestion.options[num - 1].id);
      }
    }
  }, [router, state, currentQuestion]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Request Type Selection
  if (state === 'select-type') {
    return (
      <main className="min-h-screen p-4 md:p-8 bg-background relative overflow-hidden">
        <div className="fixed inset-0 z-0 opacity-30 bg-grid-pattern pointer-events-none" />
        <div className="fixed inset-0 z-0 scanlines opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <header className="mb-8">
            <Link href="/" className="text-foreground-muted hover:text-accent-primary text-sm mb-4 inline-flex items-center gap-2 transition-colors">
              <span className="font-mono">&lt;</span> Back to Home
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-accent-primary/10 border border-accent-primary/20">
                <Cpu className="w-6 h-6 text-accent-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Interactive <span className="text-gradient">Simulator</span></h1>
            </div>
            <p className="text-foreground-muted text-lg">Select a request type to see how AI-DLC adapts.</p>
          </header>

          <div className="grid md:grid-cols-2 gap-4">
            {REQUEST_TYPES.map((type, idx) => (
              <button
                key={type.id}
                onClick={() => handleSelectType(type)}
                className="group relative overflow-hidden glass-card p-6 rounded-xl border border-white/10 text-left transition-all hover:border-accent-primary/50 hover:bg-background-secondary/80"
              >
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-6xl">{type.icon}</span>
                </div>
                <div className="flex items-start gap-4 reltive z-10">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">{type.icon}</span>
                    <kbd className="kbd">{idx + 1}</kbd>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 group-hover:text-accent-primary transition-colors">{type.name}</h3>
                    <p className="text-sm text-foreground-muted leading-relaxed">{type.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Questions
  if (state === 'questions' && currentQuestion) {
    return (
      <main className="min-h-screen p-4 md:p-8 bg-background relative overflow-hidden flex items-center justify-center">
        <div className="fixed inset-0 z-0 opacity-30 bg-grid-pattern pointer-events-none" />
        <div className="fixed inset-0 z-0 scanlines opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={currentQuestion.id}
            className="glass-card p-8 rounded-2xl border border-white/10 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedType?.icon}</span>
                <span className="font-mono text-sm text-accent-primary">
                  SIMULATION_MODE: {selectedType?.name.toUpperCase()}
                </span>
              </div>
              <span className="font-mono text-xs text-foreground-muted">
                Step {currentQuestionIndex + 1}/{SIMULATOR_QUESTIONS.length}
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-6">{currentQuestion.prompt}</h2>

            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-accent-primary hover:bg-accent-primary/5 transition-all group flex items-center gap-4"
                >
                  <kbd className="kbd group-hover:bg-accent-primary group-hover:text-white transition-colors">{idx + 1}</kbd>
                  <span className="text-lg">{option.label}</span>
                  <ChevronRight className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-accent-primary" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-foreground-muted bg-background-tertiary/50 p-3 rounded-lg border border-white/5">
              <ShieldCheck className="w-4 h-4 text-accent-secondary" />
              <span className="font-mono">Principle: <span className="text-foreground">{currentQuestion.principle}</span></span>
            </div>
          </motion.div>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setState('select-type'); setSelectedType(null); }}
              className="text-foreground-muted hover:text-white text-sm"
            >
              Cancel Simulation (Esc)
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Results - Workflow Diagram (TUI Style)
  return (
    <main className="min-h-screen p-4 md:p-8 bg-background relative overflow-hidden">
      <div className="fixed inset-0 z-0 opacity-30 bg-grid-pattern pointer-events-none" />
      <div className="fixed inset-0 z-0 scanlines opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-accent-primary font-mono text-sm">
              <Terminal className="w-4 h-4" />
              <span>GENERATION_COMPLETE</span>
            </div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              {selectedType?.icon} {selectedType?.name} Workflow
            </h1>
          </div>
          <button
            onClick={() => { setState('select-type'); setSelectedType(null); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" /> New Simulation
          </button>
        </header>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Workflow Column */}
          <div className="lg:col-span-3 space-y-8">
            {PHASES.map((phase, phaseIdx) => {
              const phaseStages = stageStatuses.filter(s => s.stage.phase === phase.id);
              const executeCount = phaseStages.filter(s => s.execute).length;

              return (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: phaseIdx * 0.1 }}
                  key={phase.id}
                  className="glass-card rounded-xl overflow-hidden border border-white/10"
                >
                  <div className="bg-white/5 p-4 flex items-center gap-4 border-b border-white/5">
                    <span className="text-3xl">{phase.icon}</span>
                    <div>
                      <h2 className="font-bold text-lg tracking-tight">{phase.name}</h2>
                      <p className="text-xs font-mono text-foreground-muted uppercase tracking-wider">{phase.goal}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full bg-background-tertiary text-xs font-mono">
                      <span className={executeCount > 0 ? "text-accent-success" : "text-foreground-muted"}>
                        {executeCount} ACTIVE
                      </span>
                      <span className="text-white/20">/</span>
                      <span className="text-foreground-muted">{phaseStages.length} TOTAL</span>
                    </div>
                  </div>

                  <div className="divide-y divide-white/5">
                    {phaseStages.map(({ stage, execute, reason }) => (
                      <div
                        key={stage.id}
                        className={`p-4 transition-colors ${execute ? 'bg-accent-primary/5' : 'bg-transparent opacity-50 grayscale'
                          }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${execute ? 'bg-accent-success/20 text-accent-success' : 'bg-white/10 text-foreground-muted'
                            }`}>
                            {execute ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`font-mono font-bold ${execute ? 'text-foreground' : 'text-foreground-muted'}`}>
                                {stage.name}
                              </span>
                              {stage.condition && !execute && (
                                <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-foreground-muted border border-white/5">
                                  Skipped: {stage.condition}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-foreground-muted mt-1">{stage.description}</p>

                            {reason && execute && (
                              <div className="mt-2 flex items-start gap-2 text-xs text-accent-secondary bg-accent-secondary/5 p-2 rounded border border-accent-secondary/10">
                                <ArrowRight className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                <span>{reason}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Sidebar Info Column */}
          <div className="space-y-6">
            {/* Key Gates */}
            <div className="glass-card p-5 rounded-xl border border-white/10">
              <h3 className="font-mono text-xs text-foreground-muted uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                Required Gates
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedType?.keyGates.map((gate, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-accent-primary/10 border border-accent-primary/20 text-accent-primary rounded-lg text-sm font-medium flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3" /> {gate}
                  </span>
                ))}
              </div>
            </div>

            {/* Principles */}
            <div className="glass-card p-5 rounded-xl border border-white/10">
              <h3 className="font-mono text-xs text-foreground-muted uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                AI-SDLC Alignment
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-foreground-muted">
                  <CheckCircle2 className="w-4 h-4 text-accent-success mt-0.5 flex-shrink-0" />
                  <span>Plan-First Execution verified</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground-muted">
                  <CheckCircle2 className="w-4 h-4 text-accent-success mt-0.5 flex-shrink-0" />
                  <span>Proof over Prose validation</span>
                </li>
              </ul>
            </div>

            {/* Stats */}
            <div className="glass-card p-5 rounded-xl border border-white/10 bg-background-tertiary/30">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-white">{stageStatuses.filter(s => s.execute).length}</div>
                  <div className="text-xs text-foreground-muted uppercase">Steps</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{Object.keys(answers).length}</div>
                  <div className="text-xs text-foreground-muted uppercase">Inputs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
