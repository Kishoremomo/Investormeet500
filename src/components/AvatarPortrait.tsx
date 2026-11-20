import React from 'react';
import { getInitials } from '../lib/domain';

interface AvatarPortraitProps {
  name: string;
  src?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark';
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<AvatarPortraitProps['size']>, string> = {
  xs: 'w-8 h-8 text-[11px]',
  sm: 'w-10 h-10 text-xs',
  md: 'w-14 h-14 text-base',
  lg: 'w-20 h-20 text-xl',
  xl: 'w-24 h-24 text-2xl',
};

export function AvatarPortrait({
  name,
  src,
  size = 'md',
  theme = 'light',
  className = '',
}: AvatarPortraitProps) {
  const sizeCls = SIZE_CLASSES[size];

  if (src) {
    return (
      <div
        className={`${sizeCls} rounded-full overflow-hidden shrink-0 portrait-ring bg-[#071522] ${className}`}
      >
        <img
          src={src}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top interactive-media"
        />
      </div>
    );
  }

  const initials = getInitials(name);
  const bgCls =
    theme === 'dark'
      ? 'bg-[#0f2342] text-[#ebd29a] border border-[#d9b66f]/45'
      : 'bg-[#071522] text-[#ebd29a] border border-[#d9b66f]/40';

  return (
    <div
      aria-hidden="true"
      className={`${sizeCls} ${bgCls} rounded-full shrink-0 flex items-center justify-center font-display font-bold tracking-wider select-none ${className}`}
    >
      {initials}
    </div>
  );
}
