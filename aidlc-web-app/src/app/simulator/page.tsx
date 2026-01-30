'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { REQUEST_TYPES, RequestType } from '@/content/simulator/requestTypes';
import { SIMULATOR_QUESTIONS, SimulatorQuestion, QuestionEffect } from '@/content/simulator/questions';
import { PHASES, STAGES, Stage } from '@/content/simulator/stages';
import { useProgress } from '@/context/ProgressContext';

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
      <main className="min-h-screen p-4 md:p-8">
        <header className="mb-6">
          <Link href="/" className="text-slate-400 hover:text-slate-200 text-sm mb-2 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">🔬 Interactive Simulator</h1>
          <p className="text-slate-400">Select a request type to see how AI-DLC adapts</p>
        </header>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
          {REQUEST_TYPES.map((type, idx) => (
            <button
              key={type.id}
              onClick={() => handleSelectType(type)}
              className="card text-left hover:border-accent-primary transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{type.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <kbd className="kbd text-xs">{idx + 1}</kbd>
                    <h3 className="font-semibold">{type.name}</h3>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{type.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <footer className="mt-8 pt-4 border-t border-slate-700 text-sm text-slate-500">
          <div className="flex justify-center gap-4">
            <span><kbd className="kbd">1-4</kbd> Select type</span>
            <span><kbd className="kbd">Esc</kbd> Home</span>
          </div>
        </footer>
      </main>
    );
  }

  // Questions
  if (state === 'questions' && currentQuestion) {
    return (
      <main className="min-h-screen p-4 md:p-8">
        <header className="mb-6">
          <button 
            onClick={() => { setState('select-type'); setSelectedType(null); }}
            className="text-slate-400 hover:text-slate-200 text-sm mb-2 inline-block"
          >
            ← Back to Type Selection
          </button>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold">
              {selectedType?.icon} {selectedType?.name}
            </h1>
            <span className="text-slate-400">
              Question {currentQuestionIndex + 1}/{SIMULATOR_QUESTIONS.length}
            </span>
          </div>
        </header>

        <div className="max-w-2xl mx-auto">
          <div className="card mb-6">
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.prompt}</h2>
            <p className="text-sm text-slate-500 italic">
              Principle: {currentQuestion.principle}
            </p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className="card w-full text-left hover:border-accent-primary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <kbd className="kbd">{idx + 1}</kbd>
                  <span>{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <footer className="mt-8 pt-4 border-t border-slate-700 text-sm text-slate-500">
          <div className="flex justify-center gap-4">
            <span><kbd className="kbd">1-{currentQuestion.options.length}</kbd> Select answer</span>
            <span><kbd className="kbd">Esc</kbd> Back</span>
          </div>
        </footer>
      </main>
    );
  }

  // Results - Workflow Diagram
  return (
    <main className="min-h-screen p-4 md:p-8">
      <header className="mb-6">
        <button 
          onClick={() => { setState('select-type'); setSelectedType(null); }}
          className="text-slate-400 hover:text-slate-200 text-sm mb-2 inline-block"
        >
          ← Start New Simulation
        </button>
        <h1 className="text-2xl md:text-3xl font-bold">
          {selectedType?.icon} {selectedType?.name} - Workflow
        </h1>
        <p className="text-slate-400">Based on your answers, here&apos;s the recommended workflow</p>
      </header>

      <div className="space-y-8">
        {PHASES.map(phase => {
          const phaseStages = stageStatuses.filter(s => s.stage.phase === phase.id);
          const executeCount = phaseStages.filter(s => s.execute).length;
          
          return (
            <div key={phase.id} className="card">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{phase.icon}</span>
                <div>
                  <h2 className="font-bold text-lg">{phase.name}</h2>
                  <p className="text-sm text-slate-400">{phase.goal}</p>
                </div>
                <span className="ml-auto text-sm text-slate-500">
                  {executeCount}/{phaseStages.length} stages
                </span>
              </div>

              <div className="space-y-2">
                {phaseStages.map(({ stage, execute, reason }) => (
                  <div 
                    key={stage.id}
                    className={`p-3 rounded-lg border ${
                      execute 
                        ? 'bg-accent-success/10 border-accent-success/30' 
                        : 'bg-slate-800/50 border-slate-700 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={execute ? 'text-accent-success' : 'text-slate-500'}>
                        {execute ? '✓' : '○'}
                      </span>
                      <span className={`font-medium ${execute ? 'text-slate-200' : 'text-slate-500'}`}>
                        {stage.name}
                      </span>
                      {stage.condition && !execute && (
                        <span className="text-xs text-slate-500 ml-auto">
                          ({stage.condition})
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mt-1 ml-6">{stage.description}</p>
                    {reason && (
                      <p className="text-xs text-slate-500 mt-1 ml-6 italic">→ {reason}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Gates */}
      {selectedType && (
        <div className="card mt-8">
          <h3 className="font-semibold mb-3">🚪 Key Gates for {selectedType.name}</h3>
          <div className="flex flex-wrap gap-2">
            {selectedType.keyGates.map((gate, idx) => (
              <span key={idx} className="px-3 py-1 bg-slate-700 rounded-full text-sm">
                {gate}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="card mt-8 bg-accent-primary/10 border-accent-primary/30">
        <h3 className="font-semibold mb-2">📊 Simulation Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-accent-success">
              {stageStatuses.filter(s => s.execute).length}
            </div>
            <div className="text-sm text-slate-400">Stages to Execute</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-400">
              {stageStatuses.filter(s => !s.execute).length}
            </div>
            <div className="text-sm text-slate-400">Stages Skipped</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-primary">
              {Object.keys(answers).length}
            </div>
            <div className="text-sm text-slate-400">Questions Answered</div>
          </div>
        </div>
      </div>

      <footer className="mt-8 pt-4 border-t border-slate-700 text-sm text-slate-500">
        <div className="flex justify-center gap-4">
          <span><kbd className="kbd">Esc</kbd> New Simulation</span>
        </div>
      </footer>
    </main>
  );
}
