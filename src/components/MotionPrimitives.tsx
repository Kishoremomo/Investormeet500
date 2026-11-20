import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 16,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  id?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.44, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxFrame({
  children,
  className = '',
  offset = 24,
}: {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

export function StaggerGrid({
  children,
  className = '',
  stagger = 0.04,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.36, ease: EASE_OUT_EXPO },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function InteractiveCard({
  children,
  className = '',
  dark = false,
  tilt = true,
  onClick,
  id,
  as = 'div',
  ariaLabel,
  ariaExpanded,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  tilt?: boolean;
  onClick?: () => void;
  id?: string;
  as?: 'div' | 'article' | 'button';
  ariaLabel?: string;
  ariaExpanded?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setFinePointer(window.matchMedia('(pointer: fine)').matches);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduced || !finePointer || !ref.current) return;
      const el = ref.current;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      el.style.setProperty('--spot-opacity', '1');

      if (tilt) {
        const px = (x / rect.width - 0.5) * 2;
        const py = (y / rect.height - 0.5) * 2;
        const rotX = (-py * 2.5).toFixed(2);
        const rotY = (px * 2.5).toFixed(2);
        el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
      } else {
        el.style.transform = 'translateY(-2px)';
      }
    },
    [reduced, finePointer, tilt]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      if (reduced || !ref.current || e.touches.length === 0) return;
      const el = ref.current;
      const rect = el.getBoundingClientRect();
      const touch = e.touches[0];
      el.style.setProperty('--mx', `${touch.clientX - rect.left}px`);
      el.style.setProperty('--my', `${touch.clientY - rect.top}px`);
      el.style.setProperty('--spot-opacity', '0.85');
    },
    [reduced]
  );

  const handleTouchEnd = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.setProperty('--spot-opacity', '0');
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.setProperty('--spot-opacity', '0');
    ref.current.style.transform = '';
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (!onClick || as === 'button') return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    },
    [onClick, as]
  );

  const baseClass = `interactive-card ${
    dark
      ? 'interactive-card-dark bg-[#111927] border border-white/12 hover:border-[#c49a45]/60 text-[#f8f7f3] hover:shadow-[0_14px_30px_-16px_rgba(29,78,216,0.38)]'
      : 'bg-white border border-[#e4dfd5] hover:border-[#1d4ed8]/45 text-[#0f172a] hover:shadow-[0_14px_30px_-16px_rgba(23,37,84,0.16)]'
  } ${onClick && as !== 'button' ? 'cursor-pointer' : ''} ${className}`;

  if (as === 'button') {
    return (
      <button
        id={id}
        type="button"
        ref={(node) => {
          ref.current = node;
        }}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className={`${baseClass} text-left cursor-pointer`}
      >
        {children}
      </button>
    );
  }

  if (as === 'article') {
    return (
      <article
        id={id}
        ref={(node) => {
          ref.current = node;
        }}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        className={baseClass}
      >
        {children}
      </article>
    );
  }

  return (
    <div
      id={id}
      ref={(node) => {
        ref.current = node;
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={baseClass}
    >
      {children}
    </div>
  );
}

export function MagneticAction({
  children,
  className = '',
  strength = 4,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setFinePointer(window.matchMedia('(pointer: fine)').matches);
    }
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !finePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2 * strength;
    const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 2 * strength;
    ref.current.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate3d(0, 0, 0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    >
      {children}
    </div>
  );
}

export function ExpandablePanel({
  title,
  kicker,
  meta,
  defaultOpen = false,
  children,
}: {
  title: string;
  kicker?: string;
  meta?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const reduced = useReducedMotion();

  return (
    <div className="bg-white rounded-xl border border-[#e4dfd5] overflow-hidden transition-colors hover:border-[#cfc8b8]">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#fafaf8] transition-colors"
      >
        <div className="min-w-0">
          {kicker && (
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8a5d14] block">
              {kicker}
            </span>
          )}
          <span className="font-display text-xl font-semibold text-[#0f172a] block leading-snug">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {meta && <span className="hidden sm:inline font-mono text-xs text-[#526075]">{meta}</span>}
          <span
            className={`w-8 h-8 rounded-lg border border-[#e4dfd5] flex items-center justify-center text-[#0f172a] transition-transform duration-200 ${
              open ? 'rotate-180 bg-[#0c121d] text-[#e6c67e] border-[#0c121d]' : ''
            }`}
          >
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
            className="overflow-hidden border-t border-[#e4dfd5]"
          >
            <div className="px-5 sm:px-6 py-4 bg-[#fafaf8] text-sm text-[#334155] leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  durationMs = 850,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState<number>(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reduced || !inView || hasAnimated.current) {
      setDisplay(value);
      return;
    }
    hasAnimated.current = true;
    const startTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, durationMs, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

export function PageTransition({
  routeKey,
  children,
}: {
  routeKey: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
