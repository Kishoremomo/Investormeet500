import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../lib/router';
import { InteractiveCard, MagneticAction } from './MotionPrimitives';

export function CtaBanner({
  buttonLabel = 'Start your application',
  href = '/apply',
}: {
  buttonLabel?: string;
  href?: string;
}) {
  return (
    <section
      aria-label="Application call to action"
      className="bg-[#fafaf8] py-12 sm:py-16 border-t border-[#e4dfd5]"
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveCard
          dark
          tilt={false}
          className="rounded-2xl overflow-hidden !bg-gradient-to-br from-[#091326] via-[#0f1c3a] to-[#172554] px-6 sm:px-10 py-10 sm:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-white/15"
        >
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#e6c67e] mb-2">
              20 FEBRUARY 2027 · CHENNAI · REGISTRATION CUTOFF 1 FEB 2027
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
              Let’s Build the Future Together
            </h2>
          </div>

          <MagneticAction>
            <Link
              href={href}
              className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0"
            >
              <span>{buttonLabel}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </MagneticAction>
        </InteractiveCard>
      </div>
    </section>
  );
}
