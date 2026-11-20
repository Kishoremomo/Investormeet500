import React, { useState } from 'react';
import { INSTITUTION_LOGOS } from '../data/logos';
import { getInitials, resolveInstitutionLogo } from '../lib/domain';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg
        width={compact ? 26 : 32}
        height={compact ? 21 : 26}
        viewBox="0 0 48 38"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M4 34L17 4L25 22L21 31L17 19L10 34H4Z" fill="#c49a45" />
        <path d="M19 34L29 10L41 34H34.5L29 22L25 31L19 34Z" fill="#e6c67e" />
        <path d="M23 34L27 25H31L27 34H23Z" fill="#8a5d14" />
      </svg>
      <span className="flex flex-col leading-[1.08] text-left">
        <span className="font-sans text-[11px] sm:text-xs tracking-[0.2em] font-semibold uppercase text-[#f8f7f3]">
          INVESTOR MEET
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] text-[#e6c67e]">
          500 · CHENNAI
        </span>
      </span>
    </span>
  );
}

interface InstitutionLogoMarkProps {
  name: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'marquee';
  className?: string;
}

const LOGO_CONTAINER_SIZE: Record<NonNullable<InstitutionLogoMarkProps['size']>, string> = {
  xs: 'w-8 h-6 px-1 py-0.5 rounded',
  sm: 'w-12 h-8 px-1.5 py-1 rounded-md',
  md: 'w-14 h-10 px-2 py-1 rounded-lg',
  marquee: 'w-full h-14 px-3 py-2 rounded-lg',
};

export function InstitutionLogoMark({
  name,
  initials,
  size = 'md',
  className = '',
}: InstitutionLogoMarkProps) {
  const [failed, setFailed] = useState(false);
  const matched = resolveInstitutionLogo(name, INSTITUTION_LOGOS);
  const boxCls = LOGO_CONTAINER_SIZE[size];

  if (matched && !failed) {
    const surfaceCls = matched.darkSurface
      ? 'bg-[#0c121d] border border-white/15'
      : 'bg-white border border-[#e4dfd5]';

    return (
      <div
        className={`${boxCls} ${surfaceCls} inline-flex items-center justify-center shrink-0 overflow-hidden ${className}`}
      >
        <img
          src={matched.src}
          alt={`${name} official logo`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="max-w-full max-h-full w-auto h-auto object-contain"
        />
      </div>
    );
  }

  const monogram = initials || getInitials(name);
  const textCls =
    size === 'xs'
      ? 'text-[10px]'
      : size === 'sm'
      ? 'text-[11px]'
      : size === 'marquee'
      ? 'text-base'
      : 'text-sm';

  return (
    <div
      aria-hidden="true"
      className={`${boxCls} bg-[#0c121d] text-[#e6c67e] border border-white/10 inline-flex items-center justify-center font-mono font-semibold tracking-wider shrink-0 select-none ${textCls} ${className}`}
    >
      {monogram}
    </div>
  );
}

export function PartnerWordmark({ name }: { name: string }) {
  return <InstitutionLogoMark name={name} size="marquee" />;
}
