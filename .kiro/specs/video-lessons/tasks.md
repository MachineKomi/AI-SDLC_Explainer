# Implementation Plan: Video Lessons Feature

## Overview

This implementation adds a video lessons section to the lessons page with embedded YouTube videos, watch tracking, XP rewards, and localStorage persistence. The implementation follows existing patterns in the codebase and integrates with the existing ProgressContext and XP system.

## Tasks

- [x] 1. Add Video type and data content
  - [x] 1.1 Add Video interface to types/index.ts
    - Add Video interface with id, title, channelName, channelUrl, videoUrl, embedUrl, summary fields
    - Add VideoProgress interface with watched: string[] field
    - _Requirements: 1.1, 1.3, 1.4_
  
  - [x] 1.2 Create videos.ts content file
    - Create src/content/videos.ts with VIDEOS array containing all 4 curated videos
    - Export getVideoById and getAllVideos helper functions
    - Include complete metadata for each video (titles, URLs, summaries)
    - _Requirements: 1.1, 1.2, 1.3_
  
  - [ ]* 1.3 Write property test for video data completeness
    - **Property 1: Video Data Completeness**
    - Verify all videos have required fields with non-empty values
    - **Validates: Requirements 1.1, 1.3**

- [x] 2. Extend storage and XP systems
  - [x] 2.1 Update StoredState and DEFAULT_STATE in storage.ts
    - Add videos: { watched: string[] } to StoredState interface
    - Add videos field to DEFAULT_STATE
    - Update migrateState to handle videos field
    - _Requirements: 4.3_
  
  - [x] 2.2 Add video_watched XP reward to xp.ts
    - Add video_watched: 40 to XP_REWARDS constant
    - _Requirements: 5.1, 5.4_
  
  - [x] 2.3 Update ProgressState and toProgressState in storage.ts
    - Add videos: VideoProgress to ProgressState type
    - Update toProgressState to map videos from StoredState
    - _Requirements: 7.4_

- [x] 3. Extend ProgressContext for video tracking
  - [x] 3.1 Add markVideoWatched method to ProgressContext
    - Add markVideoWatched to ProgressContextValue interface
    - Implement markVideoWatched in ProgressProvider
    - Award XP only if video not already in watched list
    - Persist to localStorage via persistState
    - _Requirements: 7.1, 7.3, 5.2, 5.3_
  
  - [ ]* 3.2 Write property test for XP award idempotence
    - **Property 3: XP Award Idempotence**
    - Verify marking same video watched multiple times awards XP only once
    - **Validates: Requirements 5.2, 5.3**
  
  - [ ]* 3.3 Write property test for watch state persistence round-trip
    - **Property 2: Watch State Persistence Round-Trip**
    - Verify saving watched state to localStorage and loading preserves the state
    - **Validates: Requirements 4.1, 4.2**

- [x] 4. Checkpoint - Verify storage and context integration
  - Ensure all tests pass, ask the user if questions arise.
  - Verify types compile correctly
  - Verify localStorage persistence works

- [x] 5. Create VideoCard component
  - [x] 5.1 Implement VideoCard component
    - Create src/components/VideoCard.tsx
    - Render YouTube iframe with responsive aspect ratio (16:9)
    - Display video title with link to channel
    - Render summary as bullet list
    - Include checkbox for marking as watched
    - Apply visual styling for watched state (opacity, checkmark indicator)
    - Use existing Tailwind classes and design system
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_
  
  - [ ]* 5.2 Write property test for summary rendering
    - **Property 5 (partial): Summary Rendering**
    - Verify all summary items are rendered as list items
    - **Validates: Requirements 2.3**

- [x] 6. Create VideoGrid component
  - [x] 6.1 Implement VideoGrid component
    - Create src/components/VideoGrid.tsx
    - Render section header with video icon and title
    - Layout VideoCards in responsive 2x2 grid (grid-cols-1 md:grid-cols-2)
    - Pass watched state and toggle handler to each VideoCard
    - Apply consistent spacing (gap-6)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [ ]* 6.2 Write property test for grid rendering all videos
    - **Property 5: Grid Renders All Videos**
    - Verify VideoGrid renders exactly one VideoCard per video in array
    - **Validates: Requirements 3.1**

- [x] 7. Integrate VideoGrid into lessons page
  - [x] 7.1 Update lessons page to include VideoGrid
    - Import VideoGrid and VIDEOS in src/app/lessons/page.tsx
    - Add VideoGrid section below existing lesson cards
    - Add visual separator (border-t, margin-top)
    - Connect to ProgressContext for watched state and markVideoWatched
    - _Requirements: 6.1, 6.2_
  
  - [ ]* 7.2 Write integration test for lessons page
    - Verify VideoGrid renders below lessons
    - Verify existing keyboard navigation still works
    - Verify lesson cards remain interactive
    - **Validates: Requirements 6.3, 6.4**

- [x] 8. Final checkpoint - Full integration verification
  - Ensure all tests pass, ask the user if questions arise.
  - Verify complete flow: watch video → XP awarded → state persisted → page reload → state restored
  - Verify responsive layout on different screen sizes

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- The implementation follows existing patterns in the codebase (content files, components, context)
- XP reward of 40 is balanced between simulator_run (20) and simulator_new_type (50)
