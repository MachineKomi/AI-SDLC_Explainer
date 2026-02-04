'use client';

import { CheckCircle, ExternalLink, Play } from 'lucide-react';
import type { Video } from '@/types';

/**
 * Props for the VideoCard component
 */
interface VideoCardProps {
  /** The video data to display */
  video: Video;
  /** Whether the video has been marked as watched */
  isWatched: boolean;
  /** Callback when the watch status is toggled */
  onToggleWatched: (videoId: string) => void;
}

/**
 * VideoCard - Displays a single video lesson with embedded YouTube player,
 * title, summary, and watch tracking functionality.
 * 
 * Features:
 * - Responsive 16:9 YouTube iframe embed
 * - Video title with link to channel
 * - Summary bullet points
 * - Checkbox to mark as watched with visual feedback
 * - Watched state styling (reduced opacity, checkmark badge)
 * 
 * @example
 * ```tsx
 * <VideoCard
 *   video={videoData}
 *   isWatched={false}
 *   onToggleWatched={(id) => markVideoWatched(id)}
 * />
 * ```
 */
export default function VideoCard({ video, isWatched, onToggleWatched }: VideoCardProps) {
  return (
    <div 
      className={`card relative transition-all duration-300 ${
        isWatched ? 'opacity-75' : ''
      }`}
    >
      {/* Watched Badge */}
      {isWatched && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-status-success/20 border border-status-success/30 text-status-success text-xs font-medium">
          <CheckCircle className="w-3 h-3" />
          <span>Watched</span>
        </div>
      )}

      {/* YouTube Embed */}
      <div className="aspect-video rounded-lg overflow-hidden bg-background-tertiary mb-4">
        <iframe
          src={video.embedUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
        {video.title}
      </h3>

      {/* Channel Link */}
      <a
        href={video.channelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-accent-primary transition-colors mb-4"
      >
        <Play className="w-3 h-3" />
        <span>{video.channelName}</span>
        <ExternalLink className="w-3 h-3" />
      </a>

      {/* Summary Bullet Points */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">
          Key Takeaways
        </h4>
        <ul className="space-y-2">
          {video.summary.map((point, index) => (
            <li 
              key={index}
              className="flex items-start gap-2 text-sm text-foreground/80"
            >
              <span className="text-accent-primary mt-1 flex-shrink-0">•</span>
              <span className="line-clamp-3">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Watch Checkbox */}
      <label 
        className={`flex items-center gap-3 p-3 rounded-lg bg-background-tertiary/50 border border-white/[0.05] transition-colors group ${
          isWatched 
            ? 'cursor-default' 
            : 'cursor-pointer hover:bg-background-tertiary/80'
        }`}
      >
        <input
          type="checkbox"
          checked={isWatched}
          disabled={isWatched}
          onChange={() => !isWatched && onToggleWatched(video.id)}
          className={`w-5 h-5 rounded border-2 bg-transparent checked:bg-accent-primary checked:border-accent-primary focus:ring-2 focus:ring-accent-primary/50 focus:ring-offset-0 transition-colors ${
            isWatched 
              ? 'border-status-success cursor-default' 
              : 'border-foreground-muted/50 cursor-pointer'
          }`}
        />
        <div className="flex-1">
          <span className={`font-medium ${isWatched ? 'text-status-success' : 'text-foreground'}`}>
            {isWatched ? '✓ Watched!' : 'Mark as watched'}
          </span>
          {!isWatched && (
            <span className="ml-2 text-xs text-accent-secondary font-mono">
              +40 XP
            </span>
          )}
        </div>
      </label>
    </div>
  );
}
