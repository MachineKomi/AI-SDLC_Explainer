'use client';

/**
 * SimulationTrack Component
 * 
 * Enhanced methodology track that displays the race visualization
 * with task execution, timers, wait states, and activity log.
 */

import { motion } from 'framer-motion';
import { User, Bot, CheckCircle2 } from 'lucide-react';
import { MethodologyId, TrackState } from '@/types/simulation';
import { METHODOLOGY_CONFIG } from '@/content/simulation-tasks';
import { useSimulation } from '@/context/SimulationContext';
import LogWindow from './LogWindow';
import TaskTimer from './TaskTimer';
import WaitStateIndicator from './WaitStateIndicator';
import TimeBreakdown from './TimeBreakdown';

interface SimulationTrackProps {
  methodologyId: MethodologyId;
}

/**
 * Get icon component for methodology
 */
function getMethodologyIcon(methodologyId: MethodologyId) {
  return methodologyId === 'aidlc' ? Bot : User;
}

/**
 * SimulationTrack Component
 */
export default function SimulationTrack({ methodologyId }: SimulationTrackProps) {
  const { getTrackState, getTrackProgress, getRemainingTimeForTrack, isPaused } = useSimulation();
  
  const trackState = getTrackState(methodologyId);
  const progress = getTrackProgress(methodologyId);
  const remainingTime = getRemainingTimeForTrack(methodologyId);
  const config = METHODOLOGY_CONFIG[methodologyId];
  const Icon = getMethodologyIcon(methodologyId);
  
  const isAIDLC = methodologyId === 'aidlc';
  const isWaiting = trackState.isWaiting;
  const currentTaskName = trackState.currentTask?.name || '';
  const currentTaskType = trackState.currentTask?.type || 'work';
  
  return (
    <div className="relative">
      {/* Track Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className={`font-bold text-lg ${isAIDLC ? 'text-accent-primary text-glow' : 'text-foreground'}`}>
          {config.name}
        </h3>
        <div className="flex items-center gap-3">
          {/* Wait State Indicator */}
          {isWaiting && (
            <WaitStateIndicator
              isWaiting={isWaiting}
              reason={trackState.waitReason}
              elapsedMs={trackState.waitElapsed}
              methodologyId={methodologyId}
            />
          )}
          
          {/* Completion Badge */}
          {trackState.isComplete && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-accent-success font-bold flex items-center gap-1"
            >
              <CheckCircle2 className="w-4 h-4" /> Delivered
            </motion.span>
          )}
        </div>
      </div>

      {/* Track */}
      <div className="h-16 bg-background-tertiary rounded-lg relative overflow-hidden flex items-center px-4 border border-white/5">
        {/* Grid lines on track */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_100%]" />

        {/* Wait state overlay */}
        {isWaiting && (
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(251,191,36,0.05)_10px,rgba(251,191,36,0.05)_20px)]" />
        )}

        {/* Progress Indicator */}
        <motion.div
          className={`absolute top-0 bottom-0 left-0 ${isAIDLC ? 'bg-accent-primary/10' : 'bg-white/5'} border-r ${isAIDLC ? 'border-accent-primary/30' : 'border-white/10'}`}
          style={{ width: `${progress}%` }}
        />

        {/* Runner Icon */}
        <motion.div
          className="absolute z-10"
          style={{ left: `${progress}%`, x: '-50%' }}
        >
          <div className={`
            p-2 rounded-lg border shadow-lg backdrop-blur-sm transition-opacity
            ${isAIDLC
              ? 'bg-accent-primary text-white border-accent-primary shadow-[0_0_15px_rgba(236,72,153,0.5)]'
              : 'bg-background-secondary text-foreground-muted border-white/10'
            }
            ${isWaiting ? 'opacity-50 animate-pulse' : 'opacity-100'}
          `}>
            <Icon className="w-6 h-6" />
          </div>

          {/* Current Task Label */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap">
            <div className={`
              text-xs font-mono font-bold px-2 py-0.5 rounded border
              ${isWaiting 
                ? 'bg-amber-400/10 border-amber-400/30 text-amber-400' 
                : 'bg-background/80 border-white/10 text-foreground'
              }
            `}>
              {trackState.isComplete ? 'DONE' : currentTaskName.toUpperCase().slice(0, 20)}
            </div>
          </div>
          
          {/* Task Timer - positioned above runner */}
          {!trackState.isComplete && trackState.currentTask && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1">
              <TaskTimer
                remainingMs={remainingTime}
                isPaused={isPaused}
                taskName={currentTaskName}
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Time Breakdown Stats */}
      <div className="mt-2 pl-1">
        <TimeBreakdown
          totalElapsed={trackState.totalElapsed}
          workTime={trackState.workTime}
          waitTime={trackState.waitTime}
          isComplete={trackState.isComplete}
        />
      </div>

      {/* Activity Log */}
      <LogWindow
        entries={trackState.logEntries}
        methodologyId={methodologyId}
        maxVisible={6}
        autoScroll={true}
      />
    </div>
  );
}
