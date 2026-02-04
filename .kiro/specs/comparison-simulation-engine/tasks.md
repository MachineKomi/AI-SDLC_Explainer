# Implementation Plan: Comparison Simulation Engine

## Overview

This plan implements a detailed simulation engine for the comparison page race visualization. The implementation follows a bottom-up approach: first creating the data models and simulation logic, then building the UI components, and finally integrating everything into the existing comparison page.

## Tasks

- [x] 1. Create simulation data models and task sequences
  - [x] 1.1 Create simulation types and interfaces
    - Create `aidlc-web-app/src/types/simulation.ts` with SimulationTask, LogEntry, TrackState, and related interfaces
    - Define MethodologyId type and task type unions
    - _Requirements: 1.1, 2.1, 2.2, 2.3_
  
  - [x] 1.2 Create methodology task sequences
    - Create `aidlc-web-app/src/content/simulation-tasks.ts`
    - Define WATERFALL_TASKS with sequential phases, handoffs, and wait times
    - Define AGILE_TASKS with sprint cycles and ceremonies
    - Define AIDLC_TASKS with AI generation and validation gates
    - _Requirements: 2.1, 2.2, 2.3, 2.5_
  
  - [ ]* 1.3 Write property test for methodology task characteristics
    - **Property 5: Methodology Task Characteristics**
    - Verify each methodology has required task types
    - **Validates: Requirements 2.1, 2.2, 2.3**

- [x] 2. Implement simulation engine core logic
  - [x] 2.1 Create simulation state management
    - Create `aidlc-web-app/src/lib/simulation-engine.ts`
    - Implement SimulationState type and reducer
    - Implement state transitions (play, pause, reset)
    - _Requirements: 1.3, 1.4_
  
  - [x] 2.2 Implement track state update logic
    - Create updateTrackState function for tick-based updates
    - Implement task progression and transition logic
    - Implement work time vs wait time tracking
    - _Requirements: 2.4, 6.1, 6.2_
  
  - [x] 2.3 Implement time compression calculations
    - Create calculateTaskDurations function to scale tasks to target duration
    - Implement progress calculation for track position
    - Target 45 seconds total simulation time
    - _Requirements: 1.5, 2.5_
  
  - [ ]* 2.4 Write property tests for simulation engine
    - **Property 1: Task Sequence Execution Order**
    - **Property 9: Time Tracking Invariant**
    - **Validates: Requirements 1.2, 2.4, 6.1, 6.2**

- [ ] 3. Checkpoint - Ensure simulation logic tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Create log entry system
  - [x] 4.1 Implement log entry creation
    - Create `aidlc-web-app/src/lib/simulation-log.ts`
    - Implement createLogEntry function for different entry types
    - Implement formatTimestamp for MM:SS format
    - Implement getEntryPrefix for visual indicators
    - _Requirements: 3.1, 3.2, 3.3, 3.5_
  
  - [ ]* 4.2 Write property tests for log entries
    - **Property 7: Log Entry Generation**
    - **Property 8: Timestamp Monotonicity**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.5**

- [x] 5. Create simulation React context
  - [x] 5.1 Create SimulationProvider context
    - Create `aidlc-web-app/src/context/SimulationContext.tsx`
    - Implement useSimulation hook
    - Manage global simulation state (playing, paused, elapsed)
    - Implement tick-based animation loop using requestAnimationFrame
    - _Requirements: 1.2, 1.3, 1.4_
  
  - [ ]* 5.2 Write property test for control synchronization
    - **Property 2: Control Synchronization**
    - **Validates: Requirements 1.3**

- [x] 6. Create UI components
  - [x] 6.1 Create LogWindow component
    - Create `aidlc-web-app/src/components/simulation/LogWindow.tsx`
    - Implement scrolling log display with auto-scroll
    - Style different entry types (task-start, task-complete, wait, handoff)
    - Limit visible entries for performance
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.6_
  
  - [x] 6.2 Create TaskTimer component
    - Create `aidlc-web-app/src/components/simulation/TaskTimer.tsx`
    - Display countdown for active task
    - Format remaining time in human-readable format
    - Handle pause state
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [x] 6.3 Create WaitStateIndicator component
    - Create `aidlc-web-app/src/components/simulation/WaitStateIndicator.tsx`
    - Display wait reason badge
    - Show accumulating wait duration
    - Apply methodology-specific styling
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [x] 6.4 Create TimeBreakdown component
    - Create `aidlc-web-app/src/components/simulation/TimeBreakdown.tsx`
    - Display total elapsed, work time, wait time
    - Show completion indicator when track finishes
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [ ]* 6.5 Write property test for timer calculation
    - **Property 10: Timer Calculation Correctness**
    - **Validates: Requirements 5.1, 5.5**

- [ ] 7. Checkpoint - Ensure component tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Create enhanced MethodologyTrack component
  - [x] 8.1 Create SimulationTrack component
    - Create `aidlc-web-app/src/components/simulation/SimulationTrack.tsx`
    - Integrate TaskRunner with current task display
    - Add TaskTimer near runner icon
    - Add WaitStateIndicator with pulsing animation
    - Add TimeBreakdown display
    - _Requirements: 7.2, 7.3, 4.5_
  
  - [x] 8.2 Add wait state visual effects
    - Implement runner opacity change during wait
    - Add pulsing animation for wait states
    - Add striped overlay on track during wait
    - _Requirements: 4.1, 4.2, 4.3, 7.3_

- [x] 9. Integrate into comparison page
  - [x] 9.1 Update comparison page with simulation engine
    - Modify `aidlc-web-app/src/app/comparison/page.tsx`
    - Wrap timeline tab with SimulationProvider
    - Replace simple progress animation with SimulationTrack components
    - Add LogWindow below each track
    - _Requirements: 7.1, 7.4_
  
  - [x] 9.2 Update simulation controls
    - Connect play/pause/reset to SimulationProvider
    - Update status display to show simulation phase
    - Update week counter to show simulation time
    - _Requirements: 1.3_
  
  - [x] 9.3 Add responsive styling
    - Ensure log windows collapse appropriately on mobile
    - Adjust timer and indicator sizes for smaller screens
    - Maintain glass card styling consistency
    - _Requirements: 7.4, 7.5_

- [x] 10. Implement completion and efficiency visualization
  - [x] 10.1 Add completion indicators
    - Show checkmark and final time when track completes
    - Highlight winning methodology
    - Display time difference between methodologies
    - _Requirements: 6.3, 6.4_
  
  - [x] 10.2 Add efficiency comparison visuals
    - Highlight AI-SDLC's minimal wait time
    - Show Waterfall's accumulated wait time
    - Display Agile's ceremony overhead
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [ ]* 10.3 Write property test for methodology ordering
    - **Property 6: Methodology Completion Ordering**
    - **Validates: Requirements 2.5, 8.1, 8.2, 8.3**

- [ ] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
  - Verify simulation runs in 30-60 seconds
  - Verify all three methodologies complete with correct ordering
  - Verify log windows display correctly

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- The simulation uses framer-motion for animations (already in project)
- fast-check library should be added for property-based testing
