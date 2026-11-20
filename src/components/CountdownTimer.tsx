import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';
import { computeCountdown, EVENT_DATE_ISO, REGISTRATION_DEADLINE_TEXT } from '../lib/domain';
import { ScrollReveal } from './MotionPrimitives';

export function CountdownTimer() {
  const [countdown, setCountdown] = useState(() => computeCountdown(EVENT_DATE_ISO));

  useEffect(() => {
    const id = window.setInterval(() => {
      setCountdown(computeCountdown(EVENT_DATE_ISO));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const cells = [
    { value: String(countdown.days).padStart(2, '0'), label: 'Days' },
    { value: String(countdown.hours).padStart(2, '0'), label: 'Hours' },
    { value: String(countdown.minutes).padStart(2, '0'), label: 'Minutes' },
    { value: String(countdown.seconds).padStart(2, '0'), label: 'Seconds' },
  ];

  return (
    <section
      aria-label="Save the date countdown"
      className="relative overflow-hidden bg-[#091326] text-[#f8f7f3] border-y border-white/10"
    >
      <div className="architectural-grid absolute inset-0 pointer-events-none opacity-60" aria-hidden="true" />
      <ScrollReveal className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e6c67e]">
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Save the date · Chennai</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
            20 February 2027
          </h2>
          <p className="text-sm text-[#cbd5e1]">
            Final registration closes{' '}
            <strong className="text-[#e6c67e] font-semibold">
              {REGISTRATION_DEADLINE_TEXT}
            </strong>
            . 90-day preparation window active for track screening.
          </p>
        </div>

        <div className="space-y-2 w-full lg:w-auto">
          <div
            role="timer"
            aria-label="Countdown to the event date"
            className="grid grid-cols-4 border border-white/15 rounded-xl bg-[#131c2b] divide-x divide-white/10 overflow-hidden"
          >
            {cells.map((c) => (
              <div
                key={c.label}
                aria-hidden="true"
                className="min-w-[70px] sm:min-w-[92px] px-3 py-4 text-center"
              >
                <strong className="block font-mono text-2xl sm:text-3xl font-semibold text-[#e6c67e] tabular-nums leading-none">
                  {c.value}
                </strong>
                <span className="mt-1.5 block text-[10px] font-medium uppercase tracking-[0.14em] text-[#94a3b8]">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
          <p role="status" className="font-mono text-[11px] text-[#94a3b8] lg:text-right">
            {countdown.summaryText}
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
