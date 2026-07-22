"use client";

import * as React from "react";
import Image from "next/image";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Self-hosted video with a poster facade: the video element only loads its
 * source after the visitor presses play (preload="none"), so the page stays
 * fast while the film remains one tap away.
 */
export function VideoPlayer({
  src,
  poster,
  title,
  caption,
  className,
}: {
  src: string;
  poster: string;
  title: string;
  caption?: string;
  className?: string;
}) {
  const [playing, setPlaying] = React.useState(false);
  const ref = React.useRef<HTMLVideoElement>(null);

  const start = () => {
    setPlaying(true);
    // Wait for the source to mount before requesting playback.
    requestAnimationFrame(() => ref.current?.play());
  };

  return (
    <figure className={cn("group relative", className)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-line-200 bg-ink-900 shadow-floating">
        <video
          ref={ref}
          poster={poster}
          controls={playing}
          preload="none"
          playsInline
          className="absolute inset-0 size-full object-cover"
          aria-label={title}
        >
          {playing && <source src={src} type="video/mp4" />}
        </video>

        {!playing && (
          <button
            type="button"
            onClick={start}
            aria-label={`Play video: ${title}`}
            className="absolute inset-0 flex size-full items-center justify-center"
          >
            <Image
              src={poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
            <span
              className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-ink-900/30"
              aria-hidden="true"
            />
            <span
              className="relative flex size-20 items-center justify-center rounded-full border border-paper-0/30 bg-paper-0/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-accent-500 group-hover:bg-accent-700"
              aria-hidden="true"
            >
              <Play className="ml-1 size-8 fill-paper-0 text-paper-0" />
            </span>
            <span className="absolute inset-x-0 bottom-0 px-6 pb-5 text-left" aria-hidden="true">
              <span className="block text-label uppercase tracking-[0.25em] text-paper-0/70">
                Watch
              </span>
              <span className="mt-1.5 block font-display text-h3 text-paper-0">{title}</span>
            </span>
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="mt-4 text-sm text-ink-500">{caption}</figcaption>
      )}
    </figure>
  );
}
