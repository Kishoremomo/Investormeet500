import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { useReducedMotion } from 'motion/react';

interface AmbientVideoLayerProps {
  src: string;
  poster: string;
  alt?: string;
  className?: string;
}

export function AmbientVideoLayer({
  src,
  poster,
  alt = '',
  className = 'opacity-55',
}: AmbientVideoLayerProps) {
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);

  if (reduced || failed) {
    return (
      <img
        src={poster}
        alt={alt}
        aria-hidden={alt === ''}
        className={`absolute inset-0 w-full h-full object-cover object-center ${className}`}
      />
    );
  }

  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      onError={() => setFailed(true)}
      className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none ${className}`}
    />
  );
}

interface CinematicShowcaseVideoProps {
  src: string;
  poster: string;
  title: string;
  caption: string;
  kicker?: string;
  className?: string;
  heightClass?: string;
}

export function CinematicShowcaseVideo({
  src,
  poster,
  title,
  caption,
  kicker = 'SUMMIT FILM PREVIEW',
  className = '',
  heightClass = 'h-[300px] sm:h-[360px]',
}: CinematicShowcaseVideoProps) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(!reduced);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduced) return;
    if (isPlaying) {
      el.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      el.pause();
    }
  }, [isPlaying, reduced]);

  const handleRestart = () => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
    setIsPlaying(true);
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-[#e4dfd5] bg-[#0c121d] shadow-sm group ${heightClass} ${className}`}
    >
      {reduced || failed ? (
        <img
          src={poster}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center interactive-media"
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={title}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover object-center"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#0c121d]/95 via-[#0c121d]/35 to-[#0c121d]/25"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e6c67e]">
            {kicker}
          </p>
          <h3 className="mt-1 font-display text-xl sm:text-2xl font-semibold text-white leading-snug">
            {title}
          </h3>
          <p className="mt-1 text-xs text-[#cbd5e1] line-clamp-2 max-w-md">{caption}</p>
        </div>

        {!reduced && !failed && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
              className="w-10 h-10 rounded-full border border-[#c49a45]/60 bg-[#0c121d]/85 hover:bg-[#c49a45] text-[#e6c67e] hover:text-[#0c121d] flex items-center justify-center transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              onClick={handleRestart}
              aria-label={`Restart ${title}`}
              className="w-10 h-10 rounded-full border border-white/25 bg-[#0c121d]/85 hover:border-[#c49a45] text-[#f8f7f3] flex items-center justify-center transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
