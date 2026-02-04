# Design Document: Video Lessons Feature

## Overview

This design adds a video lessons section to the AI-SDLC Explainer web app. The feature introduces a 2x2 grid of embedded YouTube videos below the existing lessons list, with watch tracking, XP rewards, and localStorage persistence. The implementation follows existing patterns in the codebase for content files, components, and state management.

## Architecture

The video lessons feature integrates with the existing application architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    Lessons Page                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           Existing Lesson Cards                      │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Video Grid Section                      │    │
│  │  ┌──────────────┐  ┌──────────────┐                 │    │
│  │  │  VideoCard   │  │  VideoCard   │                 │    │
│  │  │  (Video 1)   │  │  (Video 2)   │                 │    │
│  │  └──────────────┘  └──────────────┘                 │    │
│  │  ┌──────────────┐  ┌──────────────┐                 │    │
│  │  │  VideoCard   │  │  VideoCard   │                 │    │
│  │  │  (Video 3)   │  │  (Video 4)   │                 │    │
│  │  └──────────────┘  └──────────────┘                 │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
         │                        │
         ▼                        ▼
┌─────────────────┐    ┌─────────────────────┐
│  videos.ts      │    │  ProgressContext    │
│  (content data) │    │  (state management) │
└─────────────────┘    └─────────────────────┘
                              │
                              ▼
                       ┌─────────────┐
                       │ localStorage │
                       └─────────────┘
```

### Data Flow

1. Video content is loaded from `videos.ts` content file
2. VideoGrid renders VideoCard components for each video
3. Watch state is read from ProgressContext on mount
4. User interactions (checkbox) trigger ProgressContext methods
5. ProgressContext persists state to localStorage and awards XP

## Components and Interfaces

### VideoCard Component

```typescript
// src/components/VideoCard.tsx

interface VideoCardProps {
  video: Video;
  isWatched: boolean;
  onToggleWatched: (videoId: string) => void;
}

function VideoCard({ video, isWatched, onToggleWatched }: VideoCardProps): JSX.Element
```

Responsibilities:
- Render embedded YouTube iframe with responsive aspect ratio
- Display video title and channel attribution
- Render summary bullet points
- Provide checkbox for marking as watched
- Apply visual styling for watched state

### VideoGrid Component

```typescript
// src/components/VideoGrid.tsx

interface VideoGridProps {
  videos: Video[];
  watchedVideos: string[];
  onToggleWatched: (videoId: string) => void;
}

function VideoGrid({ videos, watchedVideos, onToggleWatched }: VideoGridProps): JSX.Element
```

Responsibilities:
- Render section header with icon
- Layout VideoCards in responsive 2x2 grid
- Pass watched state to each VideoCard
- Handle responsive breakpoints (2 columns desktop, 1 column mobile)

### ProgressContext Extensions

```typescript
// Extended ProgressContextValue interface
interface ProgressContextValue {
  // ... existing methods
  markVideoWatched: (videoId: string) => void;
}

// Extended ProgressState interface
interface ProgressState {
  // ... existing fields
  videos: VideoProgress;
}

interface VideoProgress {
  watched: string[];
}
```

## Data Models

### Video Type

```typescript
// src/types/index.ts

interface Video {
  id: string;
  title: string;
  channelName: string;
  channelUrl: string;
  videoUrl: string;
  embedUrl: string;
  summary: string[];
}
```

### Video Content Data

```typescript
// src/content/videos.ts

export const VIDEOS: Video[] = [
  {
    id: 'codebase-entropy',
    title: 'The Ticking Time Bomb in Every Codebase Over 18 Months Old',
    channelName: 'Nate B Jones',
    channelUrl: 'https://www.youtube.com/@NateBJones',
    videoUrl: 'https://youtu.be/NoRePxSrhpw?si=AQmrtF7c9kskGSTD',
    embedUrl: 'https://www.youtube.com/embed/NoRePxSrhpw?si=GAL3JfhEf_ptM-aD',
    summary: [
      'Mature codebases tend to fail through slow entropy, not bad engineers',
      'AI can be structurally better at preventing this rot by consistently checking changes against repo-wide patterns',
      'The biggest benefit for AI-SDLC is just-in-time guidance',
      'AI does not replace architects. Humans still own novel design and business trade-offs'
    ]
  },
  // ... additional videos
];

export function getVideoById(id: string): Video | undefined;
export function getAllVideos(): Video[];
```

### Storage Schema Extension

```typescript
// Extended StoredState in src/types/index.ts

interface StoredState {
  // ... existing fields
  videos: {
    watched: string[];
  };
}
```

### XP Reward Addition

```typescript
// src/lib/xp.ts

export const XP_REWARDS: Record<string, number> = {
  // ... existing rewards
  video_watched: 40,  // Comparable to simulator_run (20) + new_type bonus (50) average
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Video Data Completeness

*For any* video in the VIDEOS array, the video object SHALL contain all required fields (id, title, channelName, channelUrl, videoUrl, embedUrl, summary) with non-empty values.

**Validates: Requirements 1.1, 1.2, 1.3**

### Property 2: Watch State Persistence Round-Trip

*For any* video ID that is marked as watched, saving to localStorage and then loading from localStorage SHALL return a state where that video ID is in the watched list.

**Validates: Requirements 4.1, 4.2**

### Property 3: XP Award Idempotence

*For any* video, marking it as watched multiple times (uncheck then recheck) SHALL result in XP being awarded exactly once.

**Validates: Requirements 5.2, 5.3**

### Property 4: Watch State Toggle Consistency

*For any* video ID and initial watched state, toggling the watch state SHALL result in the opposite state being persisted.

**Validates: Requirements 4.1, 4.4**

### Property 5: Grid Renders All Videos

*For any* non-empty array of videos passed to VideoGrid, the rendered output SHALL contain exactly one VideoCard for each video in the array.

**Validates: Requirements 3.1**

## Error Handling

### localStorage Unavailable

If localStorage is unavailable (private browsing, storage quota exceeded):
- The app continues to function with in-memory state
- Watch states are not persisted between sessions
- User is not shown an error (graceful degradation)
- Existing `isLocalStorageAvailable()` utility handles this case

### Invalid Video Data

If video data is malformed:
- TypeScript compilation catches missing required fields
- Runtime validation is not required due to static content
- Empty summary arrays render as empty list (no crash)

### YouTube Embed Failures

If YouTube embed fails to load:
- iframe shows YouTube's default error state
- No custom error handling required
- Video card remains functional (checkbox, title, summary visible)

## Testing Strategy

### Unit Tests

Unit tests verify specific examples and edge cases:

1. **VideoCard rendering**: Verify all elements render correctly
2. **VideoGrid layout**: Verify correct number of cards rendered
3. **Watch toggle**: Verify checkbox state changes correctly
4. **XP calculation**: Verify correct XP amount for video_watched action

### Property-Based Tests

Property tests verify universal properties across generated inputs:

1. **Property 1**: Generate random video objects, verify all required fields present
2. **Property 2**: Generate random video IDs, verify round-trip persistence
3. **Property 3**: Generate sequences of watch/unwatch actions, verify XP awarded once
4. **Property 4**: Generate random initial states and toggle actions, verify state consistency

### Integration Tests

1. **Full flow**: Mark video watched → verify localStorage updated → reload page → verify state restored
2. **XP integration**: Mark video watched → verify XP increased → verify level calculation updated
3. **Achievement integration**: Watch all videos → verify any related achievements triggered

### Test Configuration

- Property-based tests: minimum 100 iterations using fast-check library
- Each property test tagged with: **Feature: video-lessons, Property {N}: {description}**
- Tests located in `__tests__/` directory following existing patterns
