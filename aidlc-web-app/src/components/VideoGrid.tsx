'use client';

import { Video as VideoIcon } from 'lucide-react';
import type { Video } from '@/types';
import VideoCard from './VideoCard';

/**
 * Props for the VideoGrid component
 */
interface VideoGridProps {
  /** Array of video data to display */
  videos: Video[];
  /** Array of video IDs that have been marked as watched */
  watchedVideos: string[];
  /** Callback when a video's watch status is toggled */
  onToggleWatched: (videoId: string) => void;
}

/**
 * VideoGrid - Displays a responsive grid of video lesson cards with a section header.
 * 
 * Features:
 * - Section header with video icon and descriptive title
 * - Responsive 2x2 grid layout (1 column on mobile, 2 columns on md+ screens)
 * - Consistent gap-6 spacing between cards
 * - Passes watched state and toggle handler to each VideoCard
 * 
 * @example
 * ```tsx
 * <VideoGrid
 *   videos={allVideos}
 *   watchedVideos={['video-1', 'video-2']}
 *   onToggleWatched={(id) => markVideoWatched(id)}
 * />
 * ```
 */
export default function VideoGrid({ videos, watchedVideos, onToggleWatched }: VideoGridProps) {
  return (
    <section className="mt-12 pt-8 border-t border-background-tertiary">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <VideoIcon className="w-6 h-6 text-accent-primary" />
          <h2 className="text-xl font-bold">🎬 Video Lessons</h2>
        </div>
        <p className="text-foreground-muted">
          Watch curated videos about AI-SDLC concepts and earn XP
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            isWatched={watchedVideos.includes(video.id)}
            onToggleWatched={onToggleWatched}
          />
        ))}
      </div>
    </section>
  );
}
