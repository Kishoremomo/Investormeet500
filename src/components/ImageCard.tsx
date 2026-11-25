import React, { useState } from 'react';
import { Link } from '../lib/router';
import { InteractiveCard } from './MotionPrimitives';

export interface ImageCardProps {
  image: string;
  imageAlt: string;
  kicker?: string;
  kickerColor?: string;
  meta?: string;
  overlayLabel?: string;
  title: string;
  subtitle?: string;
  description?: string;
  aspectRatio?: '16/9' | '4/3' | '3/2';
  imagePosition?: 'center' | 'top';
  variant?: 'light' | 'dark';
  accentColor?: string;
  footer?: React.ReactNode;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const ASPECT_CLASS_MAP = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
} as const;

export function ImageCard({
  image,
  imageAlt,
  kicker,
  kickerColor,
  meta,
  overlayLabel,
  title,
  subtitle,
  description,
  aspectRatio = '16/9',
  imagePosition = 'center',
  variant = 'light',
  accentColor = '#1d4ed8',
  footer,
  href,
  external = false,
  onClick,
  className = '',
  children,
}: ImageCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const isDark = variant === 'dark';
  const aspectCls = ASPECT_CLASS_MAP[aspectRatio];
  const posCls = imagePosition === 'top' ? 'object-top' : 'object-center';

  const cardInner = (
    <InteractiveCard
      dark={isDark}
      as={onClick && !href ? 'button' : 'div'}
      onClick={!href ? onClick : undefined}
      className={`h-full rounded-2xl overflow-hidden flex flex-col justify-between group text-left ${
        isDark
          ? '!bg-[#0f172a] border-white/12 text-[#f8f7f3]'
          : 'bg-white border-[#e4dfd5] text-[#0f172a]'
      } ${className}`}
    >
      <div className="w-full flex-1 flex flex-col">
        <div
          className="h-1.5 w-full shrink-0"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        />

        <div
          className={`relative w-full ${aspectCls} overflow-hidden shrink-0 ${
            isDark ? 'bg-[#091326]' : 'bg-[#0f172a]'
          }`}
        >
          {!imgFailed && image ? (
            <img
              src={image}
              alt={imageAlt}
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className={`w-full h-full object-cover ${posCls} hero-image-enhanced interactive-media`}
            />
          ) : (
            <div
              aria-hidden="true"
              className="w-full h-full bg-gradient-to-br from-[#091326] via-[#132247] to-[#1e1b4b] architectural-grid flex items-center justify-center"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#e6c67e]/75">
                INVESTOR MEET 500
              </span>
            </div>
          )}

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#091326]/85 via-[#091326]/20 to-transparent pointer-events-none"
          />

          {overlayLabel && (
            <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-2 pointer-events-none">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e6c67e] truncate">
                {overlayLabel}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          {(kicker || meta) && (
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              {kicker && (
                <span
                  className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]"
                  style={{
                    color: kickerColor ?? (isDark ? '#e6c67e' : accentColor),
                  }}
                >
                  {kicker}
                </span>
              )}
              {meta && (
                <span
                  className={`font-mono text-[11px] font-medium ${
                    isDark ? 'text-[#94a3b8]' : 'text-[#526075]'
                  }`}
                >
                  {meta}
                </span>
              )}
            </div>
          )}

          <h3
            className={`font-display text-2xl font-semibold leading-snug transition-colors ${
              isDark
                ? 'text-white group-hover:text-[#e6c67e]'
                : 'text-[#0f172a] group-hover:text-[#1d4ed8]'
            }`}
          >
            {title}
          </h3>

          {subtitle && (
            <p
              className={`mt-1 text-xs font-semibold ${
                isDark ? 'text-[#93c5fd]' : 'text-[#526075]'
              }`}
            >
              {subtitle}
            </p>
          )}

          {description && (
            <p
              className={`mt-2.5 text-sm leading-relaxed ${
                isDark ? 'text-[#cbd5e1]' : 'text-[#334155]'
              }`}
            >
              {description}
            </p>
          )}

          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>

      {footer && (
        <div
          className={`mx-6 mb-5 pt-3.5 border-t flex items-center justify-between gap-3 w-[calc(100%-3rem)] ${
            isDark ? 'border-white/12' : 'border-[#e4dfd5]'
          }`}
        >
          {footer}
        </div>
      )}
    </InteractiveCard>
  );

  if (href) {
    const isExternal = external || /^https?:\/\//i.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full focus:outline-none"
        >
          {cardInner}
        </a>
      );
    }
    return (
      <Link href={href} className="block h-full focus:outline-none">
        {cardInner}
      </Link>
    );
  }

  return cardInner;
}
