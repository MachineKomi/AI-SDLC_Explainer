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

type Tab = 'timeline' | 'metrics' | 'simulator';

export default function ComparisonPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('timeline');
  const [selectedScenario, setSelectedScenario] = useState<ProjectScenario>(PROJECT_SCENARIOS[0]);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    if (activeTab === 'timeline') {
      setAnimationProgress(0);
      const timer = setInterval(() => {
        setAnimationProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [activeTab]);

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
    { id: 'timeline', label: 'Timeline', icon: '📊' },
    { id: 'metrics', label: 'Metrics', icon: '📈' },
    { id: 'simulator', label: 'Simulator', icon: '🔬' },
  ];

  return (
    <main className="min-h-screen p-4 md:p-8">
      <header className="mb-6">
        <Link href="/" className="text-slate-400 hover:text-slate-200 text-sm mb-2 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">⚖️ Methodology Comparison</h1>
        <p className="text-slate-400">Compare Waterfall, Agile, and AI-DLC</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              activeTab === tab.id 
                ? 'bg-accent-primary text-white' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <kbd className="kbd text-xs">{idx + 1}</kbd>
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Timeline Tab */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          {METHODOLOGIES.map(methodology => {
            const totalDuration = methodology.phases.reduce((sum, p) => sum + p.durationUnits, 0);
            
            return (
              <div key={methodology.id} className="card">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-bold text-lg">{methodology.name}</h3>
                  <span className="text-sm text-slate-500">
                    Cycle time: {methodology.cycleTimeFactor}x | Cost: {methodology.costFactor}x
                  </span>
                </div>
                
                <div className="flex gap-1 mb-4 h-12">
                  {methodology.phases.map((phase, idx) => {
                    const width = (phase.durationUnits / totalDuration) * 100;
                    const animatedWidth = Math.min(width, (animationProgress / 100) * width);
                    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500', 'bg-slate-500'];
                    
                    return (
                      <div
                        key={phase.id}
                        className={`${colors[idx % colors.length]} rounded flex items-center justify-center text-xs font-medium transition-all duration-300`}
                        style={{ width: `${animatedWidth}%` }}
                        title={`${phase.name}: ${phase.description}`}
                      >
                        {animatedWidth > 10 && phase.name}
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Feedback Loop:</span>
                    <p className="font-medium">{methodology.feedbackLoopTime}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Key Traits:</span>
                    <p className="font-medium">{methodology.keyCharacteristics[0]}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-accent-success">Strength:</span>
                    <p className="font-medium text-accent-success">{methodology.strengths[0]}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-accent-error">Weakness:</span>
                    <p className="font-medium text-accent-error">{methodology.weaknesses[0]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Metrics Tab */}
      {activeTab === 'metrics' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-3 text-slate-400">Metric</th>
                <th className="text-center p-3 text-slate-400">Waterfall</th>
                <th className="text-center p-3 text-slate-400">Agile</th>
                <th className="text-center p-3 text-slate-400">AI-DLC</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_METRICS.map(metric => (
                <tr key={metric.name} className="border-b border-slate-800 hover:bg-slate-800/50">
                  <td className="p-3">
                    <div className="font-medium">{metric.name}</div>
                    <div className="text-sm text-slate-500">{metric.description}</div>
                  </td>
                  <td className={`p-3 text-center ${metric.winner === 'waterfall' ? 'text-accent-success font-bold' : 'text-slate-400'}`}>
                    {metric.waterfall}
                    {metric.winner === 'waterfall' && ' 🏆'}
                  </td>
                  <td className={`p-3 text-center ${metric.winner === 'agile' ? 'text-accent-success font-bold' : 'text-slate-400'}`}>
                    {metric.agile}
                    {metric.winner === 'agile' && ' 🏆'}
                  </td>
                  <td className={`p-3 text-center ${metric.winner === 'aidlc' ? 'text-accent-success font-bold' : 'text-slate-400'}`}>
                    {metric.aidlc}
                    {metric.winner === 'aidlc' && ' 🏆'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Simulator Tab */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          {/* Scenario Selection */}
          <div className="card">
            <h3 className="font-semibold mb-3">Select Project Scenario</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {PROJECT_SCENARIOS.map(scenario => (
                <button
                  key={scenario.id}
                  onClick={() => setSelectedScenario(scenario)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    selectedScenario.id === scenario.id 
                      ? 'border-accent-primary bg-accent-primary/10' 
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="font-medium">{scenario.name}</div>
                  <div className="text-sm text-slate-400">{scenario.description}</div>
                  <div className="flex gap-2 mt-2 text-xs">
                    <span className="px-2 py-0.5 bg-slate-700 rounded">
                      {scenario.complexity} complexity
                    </span>
                    <span className="px-2 py-0.5 bg-slate-700 rounded">
                      {scenario.requirementsStability} requirements
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-3 gap-4">
            {simulationResults.map(result => {
              const methodology = METHODOLOGIES.find(m => m.id === result.methodologyId);
              if (!methodology) return null;
              
              const isBest = result.totalWeeks === Math.min(...simulationResults.map(r => r.totalWeeks));
              
              return (
                <div 
                  key={result.methodologyId} 
                  className={`card ${isBest ? 'border-accent-success' : ''}`}
                >
                  <h4 className="font-bold text-lg mb-3">
                    {methodology.name}
                    {isBest && <span className="ml-2 text-accent-success">🏆</span>}
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="font-medium">{result.totalWeeks} weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cost:</span>
                      <span className="font-medium">{result.totalCostUnits} units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Feedback Points:</span>
                      <span className="font-medium">{result.feedbackPoints}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Handoffs:</span>
                      <span className="font-medium">{result.handoffs}</span>
                    </div>
                    
                    {result.riskEvents.length > 0 && (
                      <div className="pt-2 border-t border-slate-700">
                        <span className="text-sm text-accent-warning">⚠️ Risk Events:</span>
                        <ul className="text-sm text-slate-400 mt-1">
                          {result.riskEvents.map((event, idx) => (
                            <li key={idx}>• {event}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comparison Chart */}
          <div className="card">
            <h3 className="font-semibold mb-4">Duration Comparison</h3>
            <div className="space-y-3">
              {simulationResults.map(result => {
                const methodology = METHODOLOGIES.find(m => m.id === result.methodologyId);
                const maxWeeks = Math.max(...simulationResults.map(r => r.totalWeeks));
                const width = (result.totalWeeks / maxWeeks) * 100;
                
                return (
                  <div key={result.methodologyId} className="flex items-center gap-3">
                    <span className="w-24 text-sm">{methodology?.name}</span>
                    <div className="flex-1 bg-slate-700 rounded-full h-6">
                      <div 
                        className={`h-6 rounded-full flex items-center justify-end pr-2 text-xs font-medium ${
                          result.methodologyId === 'aidlc' ? 'bg-accent-success' :
                          result.methodologyId === 'agile' ? 'bg-accent-primary' : 'bg-slate-500'
                        }`}
                        style={{ width: `${width}%` }}
                      >
                        {result.totalWeeks}w
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <footer className="mt-8 pt-4 border-t border-slate-700 text-sm text-slate-500">
        <div className="flex justify-center gap-4">
          <span><kbd className="kbd">1</kbd> Timeline</span>
          <span><kbd className="kbd">2</kbd> Metrics</span>
          <span><kbd className="kbd">3</kbd> Simulator</span>
          <span><kbd className="kbd">Esc</kbd> Home</span>
        </div>
      </footer>
    </main>
  );
}
