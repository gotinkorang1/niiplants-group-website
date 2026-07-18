"use client";

import * as React from "react";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Performance-friendly YouTube facade: a branded poster renders instantly
 * (zero third-party bytes), and the real iframe only loads on click.
 * `playlistId` embeds a channel's uploads playlist so the newest video
 * always plays without hard-coding an ID.
 */
export function LiteYouTube({
  playlistId,
  title,
  className,
}: {
  playlistId: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = React.useState(false);

  return (
    <div
      className={cn(
        "group relative aspect-video w-full overflow-hidden rounded-lg border border-line-200 bg-ink-900 shadow-floating",
        className,
      )}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}&autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 flex size-full items-center justify-center"
        >
          {/* Branded poster — ink gradient, route line, grain. */}
          <span className="absolute inset-0 bg-gradient-to-br from-ink-900 via-[#101b30] to-ink-700" aria-hidden="true" />
          <svg
            viewBox="0 0 800 450"
            className="absolute inset-0 size-full"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M-20 380 C 200 300, 350 420, 560 330 S 780 220, 830 240"
              stroke="var(--color-accent-500)"
              strokeWidth="2"
              fill="none"
              opacity="0.65"
            />
            <path
              d="M-20 420 C 220 350, 380 460, 600 380 S 790 290, 830 300"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="560" cy="330" r="5" fill="var(--color-accent-500)" />
          </svg>
          <span
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-900/80 to-transparent"
            aria-hidden="true"
          />

          {/* Play control. */}
          <span
            className="relative flex size-20 items-center justify-center rounded-full border border-paper-0/30 bg-paper-0/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-accent-500 group-hover:bg-accent-700"
            aria-hidden="true"
          >
            <Play className="ml-1 size-8 fill-paper-0 text-paper-0" />
          </span>

          <span className="absolute bottom-5 left-6 right-6 text-left" aria-hidden="true">
            <span className="block text-label uppercase tracking-wide text-paper-0/60">
              Watch
            </span>
            <span className="mt-1 block font-display text-h3 text-paper-0">{title}</span>
          </span>
        </button>
      )}
    </div>
  );
}
