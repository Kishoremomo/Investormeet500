import React from 'react';
import { getInitials } from '../lib/domain';
import { resolvePortraitObjectPositionClass } from '../data/portraits';

interface AvatarPortraitProps {
  name: string;
  src?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark';
  shape?: 'rounded' | 'circle';
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<AvatarPortraitProps['size']>, string> = {
  xs: 'w-9 h-9 text-xs',
  sm: 'w-11 h-11 text-sm',
  md: 'w-20 h-20 text-xl',
  lg: 'w-24 h-24 text-2xl',
  xl: 'w-28 h-28 text-3xl',
};

export function AvatarPortrait({
  name,
  src,
  size = 'md',
  theme = 'light',
  shape = 'rounded',
  className = '',
}: AvatarPortraitProps) {
  const sizeCls = SIZE_CLASSES[size];
  const radiusCls =
    shape === 'circle'
      ? 'rounded-full'
      : size === 'xs' || size === 'sm'
      ? 'rounded-xl'
      : 'rounded-2xl';

  if (src) {
    const objectPosCls = resolvePortraitObjectPositionClass(src);
    return (
      <div
        className={`${sizeCls} ${radiusCls} overflow-hidden shrink-0 portrait-ring bg-[#091326] shadow-sm ring-1 ring-[#c49a45]/35 ${className}`}
      >
        <img
          src={src}
          alt={name}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover ${objectPosCls} interactive-media`}
        />
      </div>
    );
  }

  const initials = getInitials(name);
  const bgCls =
    theme === 'dark'
      ? 'bg-gradient-to-br from-[#0f2342] via-[#172554] to-[#091326] text-[#e6c67e] border border-[#c49a45]/45'
      : 'bg-gradient-to-br from-[#091326] via-[#172554] to-[#1e3a8a] text-[#e6c67e] border border-[#c49a45]/40';

  return (
    <div
      aria-hidden="true"
      className={`${sizeCls} ${radiusCls} ${bgCls} shrink-0 flex items-center justify-center font-display font-bold tracking-wider select-none shadow-sm ${className}`}
    >
      {initials}
    </div>
  );
}

