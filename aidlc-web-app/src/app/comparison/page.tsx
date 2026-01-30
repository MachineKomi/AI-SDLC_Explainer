'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  METHODOLOGIES,
  COMPARISON_METRICS,
  PROJECT_SCENARIOS,
  simulateProject,
  Methodology,
  ProjectScenario,
  SimulationResult
} from '@/content/comparison';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, RotateCcw, User, Bot,
  CheckCircle2, Clock, GitCommit, Search,
  Server, ShieldCheck, Terminal, AlertTriangle
} from 'lucide-react';

type Tab = 'timeline' | 'metrics' | 'simulator';

export default function ComparisonPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('timeline');
  const [selectedScenario, setSelectedScenario] = useState<ProjectScenario>(PROJECT_SCENARIOS[0]);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);

  // Animation State
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto-play on mount
  useEffect(() => {
    setActiveTab('timeline');
    setIsPlaying(true);
  }, []);

  // Timer for race animation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 100;
        }
        return prev + 0.5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const resetAnimation = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  useEffect(() => {
    if (activeTab === 'simulator') {
      const results = METHODOLOGIES.map(m => simulateProject(selectedScenario, m));
      setSimulationResults(results);
    }
  }, [activeTab, selectedScenario]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      router.push('/');
    } else if (e.key === '1') {
      setActiveTab('timeline');
    } else if (e.key === '2') {
      setActiveTab('metrics');
    } else if (e.key === '3') {
      setActiveTab('simulator');
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'timeline', label: 'Race Visualization', icon: '🏎️' },
    { id: 'metrics', label: 'Data Comparison', icon: '📊' },
    { id: 'simulator', label: 'Project Simulator', icon: '🔬' },
  ];

  return (
    <main className="min-h-screen p-4 md:p-8 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 opacity-30 bg-grid-pattern pointer-events-none" />
      <div className="fixed inset-0 z-0 scanlines opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="mb-8">
          <Link href="/" className="text-foreground-muted hover:text-accent-primary text-sm mb-4 inline-flex items-center gap-2 transition-colors">
            <span className="font-mono">&lt;</span> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-accent-primary/10 border border-accent-primary/20">
              <ShieldCheck className="w-6 h-6 text-accent-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Why <span className="text-gradient">AI-DLC</span> Wins
            </h1>
          </div>
          <p className="text-foreground-muted max-w-2xl text-lg">
            See how the AI-Driven Lifecycle accelerates delivery through parallel execution and automated generation.
          </p>
        </header>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg flex items-center gap-3 transition-all font-medium ${activeTab === tab.id
                  ? 'bg-accent-primary text-white shadow-[0_0_20px_rgba(236,72,153,0.3)]'
                  : 'bg-background-secondary border border-white/5 text-foreground-muted hover:text-foreground hover:bg-white/5'
                }`}
            >
              <kbd className="hidden md:inline-flex items-center justify-center h-5 w-5 rounded bg-black/20 text-xs font-mono opacity-50 mr-2">{idx + 1}</kbd>
              <span className="text-xl">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Timeline (Race) Animation */}
        <AnimatePresence mode="wait">
          {activeTab === 'timeline' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="glass-card p-6 rounded-xl border border-white/10">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="p-3 rounded-full bg-accent-primary text-white hover:bg-accent-primary/80 transition-shadow hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                    </button>
                    <button
                      onClick={resetAnimation}
                      className="p-3 rounded-full bg-white/5 text-foreground-muted hover:text-white transition-colors"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <div className="flex flex-col">
                      <span className="text-xs text-foreground-muted font-mono uppercase tracking-wider">Simulation Status</span>
                      <span className="font-mono text-accent-primary">{isPlaying ? 'RUNNING...' : 'PAUSED'}</span>
                    </div>
                  </div>
                  <div className="font-mono text-2xl font-bold tabular-nums text-foreground">
                    Week {Math.floor(progress / 5)}
                  </div>
                </div>

                <div className="space-y-8">
                  {METHODOLOGIES.map((method, idx) => {
                    // Calculate relative speed (AI-DLC is fastest)
                    const speedMultiplier = method.id === 'aidlc' ? 2.5 : method.id === 'agile' ? 1.5 : 1;
                    const displayProgress = Math.min(100, progress * speedMultiplier);
                    const isFinished = displayProgress >= 100;

                    return (
                      <div key={method.id} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-bold text-lg ${method.id === 'aidlc' ? 'text-accent-primary text-glow' : 'text-foreground'}`}>
                            {method.name}
                          </h3>
                          {isFinished && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-accent-success font-bold flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-4 h-4" /> Delivered
                            </motion.span>
                          )}
                        </div>

                        {/* Track */}
                        <div className="h-16 bg-background-tertiary rounded-lg relative overflow-hidden flex items-center px-4 border border-white/5">
                          {/* Grid lines on track */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_100%]" />

                          {/* Progress Indicator */}
                          <motion.div
                            className="absolute top-0 bottom-0 left-0 bg-accent-primary/10 border-r border-accent-primary/30"
                            style={{ width: `${displayProgress}%` }}
                          />

                          {/* Runner Icon */}
                          <motion.div
                            className="absolute z-10"
                            style={{ left: `${displayProgress}%`, x: '-50%' }}
                          >
                            <div className={`
                              p-2 rounded-lg border shadow-lg backdrop-blur-sm
                              ${method.id === 'aidlc'
                                ? 'bg-accent-primary text-white border-accent-primary shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                                : 'bg-background-secondary text-foreground-muted border-white/10'
                              }
                            `}>
                              {method.id === 'aidlc' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                            </div>

                            {/* Action Label */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-xs font-mono font-bold bg-background/80 px-2 py-0.5 rounded border border-white/10">
                              {displayProgress < 30 ? 'PLANNING'
                                : displayProgress < 70 ? (method.id === 'aidlc' ? 'GENERATING' : 'BUILDING')
                                  : displayProgress < 100 ? 'TESTING' : 'DONE'}
                            </div>
                          </motion.div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-6 mt-2 text-sm text-foreground-muted font-mono pl-1">
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Time: {method.cycleTimeFactor}x</span>
                          <span className="flex items-center gap-1.5"><Server className="w-3 h-3" /> Handoffs: {method.id === 'waterfall' ? 'Sequential' : method.id === 'agile' ? 'Sprint-based' : 'Instant'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TUI Info Panel */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Plan-First Execution", desc: "No code is written until the plan is explicit and verified.", icon: Terminal },
                  { title: "Proof Over Prose", desc: "Progress isn't a status update; it's a passing test suite.", icon: CheckCircle2 },
                  { title: "Human Accountability", desc: "AI generates the work; Humans verify and own the risk.", icon: ShieldCheck },
                ].map((item, idx) => (
                  <div key={idx} className="glass-card p-5 rounded-xl border border-white/5 hover:border-accent-primary/30 transition-colors">
                    <item.icon className="w-8 h-8 text-accent-secondary mb-3" />
                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-foreground-muted leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Metrics Tab */}
          {activeTab === 'metrics' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-card rounded-xl overflow-hidden border border-white/10"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-background-tertiary">
                      <th className="text-left p-4 text-foreground font-mono uppercase text-sm tracking-wider">Metric</th>
                      <th className="text-center p-4 text-foreground-muted font-mono uppercase text-sm tracking-wider">Waterfall</th>
                      <th className="text-center p-4 text-foreground-muted font-mono uppercase text-sm tracking-wider">Agile</th>
                      <th className="text-center p-4 text-accent-primary font-bold font-mono uppercase text-sm tracking-wider bg-accent-primary/5">AI-DLC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_METRICS.map((metric, idx) => (
                      <tr key={metric.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-foreground">{metric.name}</div>
                          <div className="text-sm text-foreground-muted mt-1">{metric.description}</div>
                        </td>
                        <td className={`p-4 text-center ${metric.winner === 'waterfall' ? 'text-accent-success font-bold' : 'text-foreground-muted'}`}>
                          {metric.waterfall}
                        </td>
                        <td className={`p-4 text-center ${metric.winner === 'agile' ? 'text-accent-success font-bold' : 'text-foreground-muted'}`}>
                          {metric.agile}
                        </td>
                        <td className={`p-4 text-center bg-accent-primary/5 ${metric.winner === 'aidlc' ? 'text-accent-primary font-bold text-lg' : 'text-foreground-muted'}`}>
                          {metric.aidlc}
                          {metric.winner === 'aidlc' && <span className="ml-2">🏆</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Simulator Tab */}
          {activeTab === 'simulator' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Scenario Selection */}
              <div className="glass-card p-6 rounded-xl border border-white/10">
                <h3 className="font-mono text-sm text-accent-primary mb-4 flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> SELECT_PROJECT_CONTEXT
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {PROJECT_SCENARIOS.map(scenario => (
                    <button
                      key={scenario.id}
                      onClick={() => setSelectedScenario(scenario)}
                      className={`p-4 rounded-lg border text-left transition-all ${selectedScenario.id === scenario.id
                          ? 'border-accent-primary bg-accent-primary/10 shadow-[0_0_15px_rgba(236,72,153,0.1)]'
                          : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                        }`}
                    >
                      <div className="font-bold text-lg mb-1">{scenario.name}</div>
                      <div className="text-sm text-foreground-muted mb-3">{scenario.description}</div>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-background-tertiary rounded text-xs font-mono text-foreground-muted border border-white/5">
                          Complex: {scenario.complexity}
                        </span>
                        <span className="px-2 py-1 bg-background-tertiary rounded text-xs font-mono text-foreground-muted border border-white/5">
                          Reqs: {scenario.requirementsStability}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {simulationResults.map(result => {
                  const methodology = METHODOLOGIES.find(m => m.id === result.methodologyId);
                  if (!methodology) return null;

                  const isBest = result.totalWeeks === Math.min(...simulationResults.map(r => r.totalWeeks));

                  return (
                    <div
                      key={result.methodologyId}
                      className={`glass-card p-6 rounded-xl border transition-all ${isBest
                          ? 'border-accent-success/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]'
                          : 'border-white/10 opacity-80'
                        }`}
                    >
                      <h4 className="font-bold text-xl mb-4 flex items-center justify-between">
                        {methodology.name}
                        {isBest && <CheckCircle2 className="w-5 h-5 text-accent-success" />}
                      </h4>

                      <div className="space-y-4 font-mono text-sm">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-foreground-muted">Duration</span>
                          <span className={isBest ? "text-accent-success font-bold" : "text-foreground"}>
                            {result.totalWeeks} wks
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-foreground-muted">Cost</span>
                          <span className="text-foreground">{result.totalCostUnits} units</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-foreground-muted">Handoffs</span>
                          <span className="text-foreground">{result.handoffs}</span>
                        </div>

                        {result.riskEvents.length > 0 ? (
                          <div className="pt-2">
                            <span className="text-accent-error flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-4 h-4" /> Risks Detected:
                            </span>
                            <ul className="text-xs text-foreground-muted space-y-1 pl-4 list-disc">
                              {result.riskEvents.map((event, idx) => (
                                <li key={idx}>{event}</li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="pt-2 text-accent-success flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" /> Risk Mitigated
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
