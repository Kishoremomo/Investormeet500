import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from '../lib/router';
import { MagneticAction } from './MotionPrimitives';

import { AmbientVideoLayer } from './CinematicVideo';

export type PageHeroTheme =
  | 'obsidian'
  | 'white'
  | 'emerald'
  | 'platinum'
  | 'burgundy'
  | 'rose'
  | 'teal'
  | 'indigo';

interface PageHeroProps {
  kicker?: string;
  title: string;
  subtitle: string;
  image?: string;
  imageAlt?: string;
  videoSrc?: string;
  videoPoster?: string;
  ctaLabel?: string;
  ctaHref?: string;
  anchors?: { label: string; href: string }[];
  stats?: { value: string; label: string }[];
  photoCredit?: string;
  theme?: PageHeroTheme;
}

const THEME_CONFIG: Record<
  PageHeroTheme,
  {
    sectionCls: string;
    topBarCls: string;
    overlayCls: string;
    kickerCls: string;
    kickerLineCls: string;
    titleCls: string;
    subtitleCls: string;
    statsBoxCls: string;
    statsBorderCls: string;
    statValCls: [string, string, string];
    statLabelCls: string;
    anchorBorderCls: string;
    anchorLinkCls: string;
    isLight?: boolean;
  }
> = {
  obsidian: {
    sectionCls: 'bg-[#091326] text-[#f8f7f3] border-b border-white/10',
    topBarCls: 'bg-gradient-to-r from-[#1d4ed8] via-[#6d28d9] to-[#c49a45]',
    overlayCls: 'bg-gradient-to-r from-[#091326]/95 via-[#0f1c3a]/84 to-[#172554]/68',
    kickerCls: 'text-[#e6c67e]',
    kickerLineCls: 'bg-gradient-to-r from-[#1d4ed8] to-[#e6c67e]',
    titleCls: 'text-white',
    subtitleCls: 'text-[#cbd5e1]',
    statsBoxCls: 'border border-white/15 bg-[#091326]/90',
    statsBorderCls: 'divide-white/15',
    statValCls: ['text-[#e6c67e]', 'text-[#93c5fd]', 'text-[#5eead4]'],
    statLabelCls: 'text-[#94a3b8]',
    anchorBorderCls: 'border-white/10 text-[#94a3b8]',
    anchorLinkCls: 'text-[#cbd5e1] hover:text-[#e6c67e]',
  },
  white: {
    sectionCls: 'bg-white text-[#0f172a] border-b border-[#e4dfd5]',
    topBarCls: 'bg-gradient-to-r from-[#0f172a] via-[#1d4ed8] to-[#0d9488]',
    overlayCls: 'bg-gradient-to-r from-white/95 via-white/90 to-[#f8fafc]/85',
    kickerCls: 'text-[#1d4ed8]',
    kickerLineCls: 'bg-gradient-to-r from-[#1d4ed8] to-[#0d9488]',
    titleCls: 'text-[#091326]',
    subtitleCls: 'text-[#334155]',
    statsBoxCls: 'border border-[#e4dfd5] bg-[#fafaf8]',
    statsBorderCls: 'divide-[#e4dfd5]',
    statValCls: ['text-[#091326]', 'text-[#1d4ed8]', 'text-[#0d9488]'],
    statLabelCls: 'text-[#526075]',
    anchorBorderCls: 'border-[#e4dfd5] text-[#526075]',
    anchorLinkCls: 'text-[#334155] hover:text-[#1d4ed8]',
    isLight: true,
  },
  emerald: {
    sectionCls: 'bg-[#042f2e] text-[#f0fdfa] border-b border-[#115e59]',
    topBarCls: 'bg-gradient-to-r from-[#10b981] via-[#14b8a6] to-[#e6c67e]',
    overlayCls: 'bg-gradient-to-r from-[#042f2e]/95 via-[#064e3b]/86 to-[#0f766e]/72',
    kickerCls: 'text-[#6ee7b7]',
    kickerLineCls: 'bg-gradient-to-r from-[#10b981] to-[#6ee7b7]',
    titleCls: 'text-white',
    subtitleCls: 'text-[#ccfbf1]',
    statsBoxCls: 'border border-[#2dd4bf]/25 bg-[#022c22]/85',
    statsBorderCls: 'divide-[#2dd4bf]/20',
    statValCls: ['text-[#6ee7b7]', 'text-[#e6c67e]', 'text-white'],
    statLabelCls: 'text-[#99f6e4]',
    anchorBorderCls: 'border-[#115e59] text-[#99f6e4]',
    anchorLinkCls: 'text-[#ccfbf1] hover:text-[#6ee7b7]',
  },
  platinum: {
    sectionCls: 'bg-[#18181b] text-[#fafafa] border-b border-white/10',
    topBarCls: 'bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#a1a1aa]',
    overlayCls: 'bg-gradient-to-r from-[#18181b]/95 via-[#27272a]/86 to-[#3f3f46]/72',
    kickerCls: 'text-[#fbbf24]',
    kickerLineCls: 'bg-gradient-to-r from-[#f59e0b] to-[#e4e4e7]',
    titleCls: 'text-white',
    subtitleCls: 'text-[#d4d4d8]',
    statsBoxCls: 'border border-white/15 bg-[#18181b]/90',
    statsBorderCls: 'divide-white/15',
    statValCls: ['text-[#fbbf24]', 'text-white', 'text-[#a1a1aa]'],
    statLabelCls: 'text-[#a1a1aa]',
    anchorBorderCls: 'border-white/15 text-[#a1a1aa]',
    anchorLinkCls: 'text-[#e4e4e7] hover:text-[#fbbf24]',
  },
  burgundy: {
    sectionCls: 'bg-[#3b0712] text-[#fff1f2] border-b border-[#881337]',
    topBarCls: 'bg-gradient-to-r from-[#c49a45] via-[#be123c] to-[#e6c67e]',
    overlayCls: 'bg-gradient-to-r from-[#3b0712]/95 via-[#4c0519]/88 to-[#881337]/72',
    kickerCls: 'text-[#fde68a]',
    kickerLineCls: 'bg-gradient-to-r from-[#e6c67e] to-[#fb7185]',
    titleCls: 'text-white',
    subtitleCls: 'text-[#ffe4e6]',
    statsBoxCls: 'border border-[#fda4af]/25 bg-[#29050d]/85',
    statsBorderCls: 'divide-[#fda4af]/20',
    statValCls: ['text-[#fde68a]', 'text-[#fda4af]', 'text-white'],
    statLabelCls: 'text-[#fecdd3]',
    anchorBorderCls: 'border-[#881337] text-[#fecdd3]',
    anchorLinkCls: 'text-[#ffe4e6] hover:text-[#fde68a]',
  },
  rose: {
    sectionCls: 'bg-[#4a044e] text-[#fdf4ff] border-b border-[#86198f]',
    topBarCls: 'bg-gradient-to-r from-[#ec4899] via-[#a855f7] to-[#e6c67e]',
    overlayCls: 'bg-gradient-to-r from-[#4a044e]/95 via-[#701a75]/86 to-[#831843]/72',
    kickerCls: 'text-[#f9a8d4]',
    kickerLineCls: 'bg-gradient-to-r from-[#f472b6] to-[#e6c67e]',
    titleCls: 'text-white',
    subtitleCls: 'text-[#fae8ff]',
    statsBoxCls: 'border border-[#f0abfc]/25 bg-[#3b0764]/85',
    statsBorderCls: 'divide-[#f0abfc]/20',
    statValCls: ['text-[#f9a8d4]', 'text-[#fde68a]', 'text-white'],
    statLabelCls: 'text-[#f5d0fe]',
    anchorBorderCls: 'border-[#86198f] text-[#f5d0fe]',
    anchorLinkCls: 'text-[#fae8ff] hover:text-[#f9a8d4]',
  },
  teal: {
    sectionCls: 'bg-[#082f49] text-[#f0f9ff] border-b border-[#0369a1]',
    topBarCls: 'bg-gradient-to-r from-[#06b6d4] via-[#0284c7] to-[#5eead4]',
    overlayCls: 'bg-gradient-to-r from-[#082f49]/95 via-[#0c4a6e]/86 to-[#0e7490]/72',
    kickerCls: 'text-[#67e8f9]',
    kickerLineCls: 'bg-gradient-to-r from-[#22d3ee] to-[#5eead4]',
    titleCls: 'text-white',
    subtitleCls: 'text-[#e0f2fe]',
    statsBoxCls: 'border border-[#38bdf8]/25 bg-[#082f49]/85',
    statsBorderCls: 'divide-[#38bdf8]/20',
    statValCls: ['text-[#67e8f9]', 'text-[#5eead4]', 'text-white'],
    statLabelCls: 'text-[#bae6fd]',
    anchorBorderCls: 'border-[#0369a1] text-[#bae6fd]',
    anchorLinkCls: 'text-[#e0f2fe] hover:text-[#67e8f9]',
  },
  indigo: {
    sectionCls: 'bg-[#1e1b4b] text-[#eef2ff] border-b border-[#3730a3]',
    topBarCls: 'bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#f59e0b]',
    overlayCls: 'bg-gradient-to-r from-[#1e1b4b]/95 via-[#312e81]/86 to-[#4338ca]/70',
    kickerCls: 'text-[#fcd34d]',
    kickerLineCls: 'bg-gradient-to-r from-[#818cf8] to-[#fcd34d]',
    titleCls: 'text-white',
    subtitleCls: 'text-[#e0e7ff]',
    statsBoxCls: 'border border-[#818cf8]/25 bg-[#1e1b4b]/85',
    statsBorderCls: 'divide-[#818cf8]/20',
    statValCls: ['text-[#fcd34d]', 'text-[#a5b4fc]', 'text-white'],
    statLabelCls: 'text-[#c7d2fe]',
    anchorBorderCls: 'border-[#3730a3] text-[#c7d2fe]',
    anchorLinkCls: 'text-[#e0e7ff] hover:text-[#fcd34d]',
  },
};

export function PageHero({
  kicker = 'INVESTOR MEET 500',
  title,
  subtitle,
  image,
  imageAlt = '',
  videoSrc,
  videoPoster,
  ctaLabel,
  ctaHref,
  anchors,
  stats,
  photoCredit,
  theme = 'obsidian',
}: PageHeroProps) {
  const reduced = useReducedMotion();
  const cfg = THEME_CONFIG[theme];

  return (
    <section className={`relative overflow-hidden ${cfg.sectionCls}`}>
      <div
        aria-hidden="true"
        className={`h-1.5 w-full ${cfg.topBarCls} relative z-10`}
      />
      {videoSrc && (videoPoster || image) ? (
        <AmbientVideoLayer
          src={videoSrc}
          poster={videoPoster || image || ''}
          alt={imageAlt}
          className={`${cfg.isLight ? 'opacity-10' : 'opacity-35'} hero-image-enhanced`}
        />
      ) : image ? (
        <img
          src={image}
          alt={imageAlt}
          aria-hidden={imageAlt === ''}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover object-center ${
            cfg.isLight ? 'opacity-10' : 'opacity-35'
          } hero-image-enhanced pointer-events-none`}
        />
      ) : null}

      <div
        aria-hidden="true"
        className={`architectural-grid absolute inset-0 pointer-events-none ${
          cfg.isLight ? 'opacity-25' : 'opacity-65'
        }`}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${cfg.overlayCls} pointer-events-none`}
      />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-8 h-[2px] rounded-full ${cfg.kickerLineCls}`} aria-hidden="true" />
              <p className={`font-mono text-[11px] font-semibold tracking-[0.16em] uppercase ${cfg.kickerCls}`}>
                {kicker}
              </p>
            </div>

            <h1
              className={`font-display text-3xl sm:text-5xl lg:text-[52px] font-medium leading-[1.08] tracking-tight ${cfg.titleCls}`}
              style={{ textWrap: 'balance' }}
            >
              {title}
            </h1>

            <p className={`mt-4 text-sm sm:text-base max-w-2xl leading-relaxed ${cfg.subtitleCls}`}>
              {subtitle}
            </p>

            {photoCredit && (
              <p className={`mt-3 font-mono text-[11px] ${cfg.statLabelCls}`}>{photoCredit}</p>
            )}
          </div>

          {(ctaLabel && ctaHref) || (stats && stats.length > 0) ? (
            <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end gap-5 shrink-0">
              {stats && stats.length > 0 && (
                <div
                  className={`flex flex-wrap items-center divide-x rounded-xl px-2 py-2.5 shadow-lg ${cfg.statsBoxCls} ${cfg.statsBorderCls}`}
                >
                  {stats.map((st, idx) => (
                    <div key={st.label} className="px-4 py-1">
                      <div
                        className={`font-mono text-lg sm:text-xl font-semibold tabular-nums ${
                          cfg.statValCls[idx % 3]
                        }`}
                      >
                        {st.value}
                      </div>
                      <div className={`text-[11px] uppercase tracking-wider ${cfg.statLabelCls}`}>
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {ctaLabel && ctaHref && (
                <MagneticAction strength={3}>
                  <Link
                    href={ctaHref}
                    className={`${
                      cfg.isLight ? 'btn-obsidian' : 'btn-gold'
                    } inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold whitespace-nowrap`}
                  >
                    <span>{ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </MagneticAction>
              )}
            </div>
          ) : null}
        </div>

        {anchors && anchors.length > 0 && (
          <div className={`mt-8 pt-5 border-t flex flex-wrap items-center gap-x-6 gap-y-2 ${cfg.anchorBorderCls}`}>
            <span className="font-mono text-[10px] uppercase tracking-widest">
              Sections ·
            </span>
            {anchors.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className={`text-xs font-medium transition-colors whitespace-nowrap ${cfg.anchorLinkCls}`}
              >
                {a.label}
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
