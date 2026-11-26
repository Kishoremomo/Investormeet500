import React, { useState } from 'react';
import { INSTITUTION_LOGOS } from '../data/logos';
import { getInitials, resolveInstitutionLogo } from '../lib/domain';

interface BrandMarkProps {
  compact?: boolean;
  size?: 'default' | 'double';
}

export function BrandMark({ compact = false, size = 'double' }: BrandMarkProps) {
  const isDouble = size === 'double' && !compact;
  return (
    <span className="inline-flex items-center gap-2 sm:gap-3 2xl:gap-4 select-none">
      <svg
        width={isDouble ? 88 : 48}
        height={isDouble ? 70 : 38}
        viewBox="0 0 48 38"
        fill="none"
        aria-hidden="true"
        className={`shrink-0 drop-shadow-[0_4px_14px_rgba(196,154,69,0.42)] ${
          isDouble
            ? 'w-10 h-8 sm:w-16 sm:h-[50px] 2xl:w-[88px] 2xl:h-[70px]'
            : 'w-8 h-6 sm:w-[54px] sm:h-[42px]'
        }`}
      >
        <path d="M4 34L17 4L25 22L21 31L17 19L10 34H4Z" fill="#c49a45" />
        <path d="M19 34L29 10L41 34H34.5L29 22L25 31L19 34Z" fill="#e6c67e" />
        <path d="M23 34L27 25H31L27 34H23Z" fill="#8a5d14" />
      </svg>
      <span className="flex flex-col leading-[1.08] text-left">
        <span
          className={`font-sans tracking-[0.08em] sm:tracking-[0.16em] 2xl:tracking-[0.22em] font-extrabold uppercase text-[#f8f7f3] ${
            isDouble ? 'text-[11px] sm:text-[15px] 2xl:text-[19px]' : 'text-[10px] sm:text-[15px]'
          }`}
        >
          INVESTOR MEET
        </span>
        <span
          className={`font-mono tracking-[0.02em] sm:tracking-[0.12em] 2xl:tracking-[0.18em] font-semibold text-[#e6c67e] ${
            isDouble ? 'text-[8.5px] sm:text-[11px] 2xl:text-[13px]' : 'text-[8px] sm:text-xs'
          }`}
        >
          500 · CHENNAI · 20-02-2027
        </span>
      </span>
    </span>
  );
}

interface InstitutionLogoMarkProps {
  name: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'marquee';
  variant?: 'default' | 'bank';
  bankCategory?: string;
  className?: string;
}

const LOGO_CONTAINER_SIZE: Record<NonNullable<InstitutionLogoMarkProps['size']>, string> = {
  xs: 'w-10 h-7 px-1.5 py-0.5 rounded',
  sm: 'w-20 h-12 px-2 py-1 rounded-lg',
  md: 'w-28 h-16 px-2.5 py-1.5 rounded-lg',
  lg: 'w-32 sm:w-36 h-[72px] sm:h-20 px-3 py-2 rounded-xl',
  xl: 'w-44 sm:w-52 h-24 sm:h-28 px-4 py-2.5 rounded-xl',
  marquee: 'w-full h-24 px-4 py-2.5 rounded-xl',
};

function getBankCrestPalette(name: string, bankCategory?: string) {
  const cat = (bankCategory || name).toLowerCase();
  if (cat.includes('regional rural') || cat.includes('gramin') || cat.includes('grama') || cat.includes('rural')) {
    return { primary: '#065f46', accent: '#34d399', ring: '#a7f3d0', tag: 'RBI · RRB' };
  }
  if (cat.includes('foreign')) {
    return { primary: '#1e1b4b', accent: '#fbbf24', ring: '#c7d2fe', tag: 'INTL · RBI' };
  }
  if (cat.includes('small finance')) {
    return { primary: '#0f766e', accent: '#fde68a', ring: '#99f6e4', tag: 'SFB · RBI' };
  }
  if (cat.includes('payments')) {
    return { primary: '#991b1b', accent: '#fde047', ring: '#fecaca', tag: 'PAY · RBI' };
  }
  return { primary: '#1d4ed8', accent: '#e6c67e', ring: '#bfdbfe', tag: 'RBI BANK' };
}

function BankCrestVector({
  name,
  initials,
  bankCategory,
}: {
  name: string;
  initials: string;
  bankCategory?: string;
}) {
  const pal = getBankCrestPalette(name, bankCategory);
  const shortTag = pal.tag;
  return (
    <svg
      viewBox="0 0 220 76"
      className="w-full h-full object-contain"
      role="img"
      aria-label={`${name} RBI scheduled institutional bank crest`}
    >
      <rect width="220" height="76" rx="8" fill="#ffffff" />
      <rect x="0" y="0" width="7" height="76" fill={pal.primary} />
      <g transform="translate(18, 14)">
        <rect width="48" height="48" rx="10" fill={pal.primary} />
        <path d="M24 9l14 7.5H10L24 9z" fill={pal.accent} />
        <rect x="13" y="19" width="4.5" height="15" fill="#ffffff" />
        <rect x="21.75" y="19" width="4.5" height="15" fill="#ffffff" />
        <rect x="30.5" y="19" width="4.5" height="15" fill="#ffffff" />
        <rect x="11" y="35.5" width="26" height="3.5" fill={pal.accent} />
      </g>
      <text
        x="78"
        y="37"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="21"
        fill={pal.primary}
        letterSpacing="1"
      >
        {initials}
      </text>
      <text
        x="78"
        y="54"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontWeight="700"
        fontSize="10"
        fill="#475569"
        letterSpacing="0.9"
      >
        {shortTag}
      </text>
    </svg>
  );
}

export function InstitutionLogoMark({
  name,
  initials,
  size = 'md',
  variant = 'default',
  bankCategory,
  className = '',
}: InstitutionLogoMarkProps) {
  const [failed, setFailed] = useState(false);
  const matched = resolveInstitutionLogo(name, INSTITUTION_LOGOS);
  const boxCls = LOGO_CONTAINER_SIZE[size];

  if (matched && !failed) {
    const surfaceCls = matched.darkSurface
      ? 'bg-[#0c121d] border-2 border-[#c49a45]/45'
      : 'bg-white border-2 border-[#cbd5e1] shadow-xs';

    return (
      <div
        className={`${boxCls} ${surfaceCls} inline-flex items-center justify-center shrink-0 overflow-hidden ${className}`}
      >
        <img
          src={matched.src}
          alt={`${name} official logo`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  const monogram = initials || getInitials(name);

  if (variant === 'bank') {
    return (
      <div
        className={`${boxCls} bg-white border-2 border-[#0d9488]/40 shadow-xs inline-flex items-center justify-center shrink-0 overflow-hidden ${className}`}
      >
        <BankCrestVector name={name} initials={monogram} bankCategory={bankCategory} />
      </div>
    );
  }

  const textCls =
    size === 'xs'
      ? 'text-[10px]'
      : size === 'sm'
      ? 'text-xs'
      : size === 'marquee' || size === 'lg' || size === 'xl'
      ? 'text-lg'
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
