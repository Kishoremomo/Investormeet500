import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from '../lib/router';
import { MagneticAction } from './MotionPrimitives';

import { AmbientVideoLayer } from './CinematicVideo';

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
}

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
}: PageHeroProps) {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#0c121d] text-[#f8f7f3] border-b border-white/10">
      {videoSrc && (videoPoster || image) ? (
        <AmbientVideoLayer
          src={videoSrc}
          poster={videoPoster || image || ''}
          alt={imageAlt}
          className="opacity-35 hero-image-enhanced"
        />
      ) : image ? (
        <img
          src={image}
          alt={imageAlt}
          aria-hidden={imageAlt === ''}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35 hero-image-enhanced pointer-events-none"
        />
      ) : null}

      <div
        aria-hidden="true"
        className="architectural-grid absolute inset-0 pointer-events-none opacity-65"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#0c121d]/95 via-[#0c121d]/82 to-[#0c121d]/65 pointer-events-none"
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
              <span className="w-8 h-[1px] bg-[#c49a45]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#e6c67e]">
                {kicker}
              </p>
            </div>

            <h1
              className="font-display text-3xl sm:text-5xl lg:text-[52px] font-medium leading-[1.08] tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              {title}
            </h1>

            <p className="mt-4 text-sm sm:text-base text-[#cbd5e1] max-w-2xl leading-relaxed">
              {subtitle}
            </p>

            {photoCredit && (
              <p className="mt-3 font-mono text-[11px] text-[#94a3b8]">{photoCredit}</p>
            )}
          </div>

          {(ctaLabel && ctaHref) || (stats && stats.length > 0) ? (
            <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end gap-5 shrink-0">
              {stats && stats.length > 0 && (
                <div className="flex flex-wrap items-center divide-x divide-white/15 border border-white/15 rounded-xl bg-[#131c2b]/90 px-2 py-2.5">
                  {stats.map((st) => (
                    <div key={st.label} className="px-4 py-1">
                      <div className="font-mono text-lg sm:text-xl font-semibold text-[#e6c67e] tabular-nums">
                        {st.value}
                      </div>
                      <div className="text-[11px] uppercase tracking-wider text-[#94a3b8]">
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
                    className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold whitespace-nowrap"
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
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#64748b]">
              Sections ·
            </span>
            {anchors.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="text-xs font-medium text-[#cbd5e1] hover:text-[#e6c67e] transition-colors whitespace-nowrap"
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
