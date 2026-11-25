import React, { useState } from 'react';
import {
  type BreakdownSlice,
  type ParticipantTypeComparisonRow,
  type RegistrationTrendPoint,
  type StatusStackedRow,
  type TrackBreakdownRow,
} from '../lib/domain';

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describePieWedge(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    'M',
    cx,
    cy,
    'L',
    start.x.toFixed(2),
    start.y.toFixed(2),
    'A',
    r,
    r,
    0,
    largeArc,
    0,
    end.x.toFixed(2),
    end.y.toFixed(2),
    'Z',
  ].join(' ');
}

function buildSmoothSplinePath(pts: Array<{ x: number; y: number }>): string {
  if (pts.length === 0) return '';
  if (pts.length === 1) return `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const dx = (p1.x - p0.x) * 0.36;
    d += ` C ${(p0.x + dx).toFixed(1)} ${p0.y.toFixed(1)}, ${(p1.x - dx).toFixed(1)} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }
  return d;
}

export function CategoryDoughnutChart({
  slices,
  activeCategory,
  onSelectCategory,
}: {
  slices: BreakdownSlice[];
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const total = slices.reduce((acc, s) => acc + s.count, 0);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const nonZero = slices.filter((s) => s.count > 0);
  const gapPx = nonZero.length > 1 ? 2.5 : 0;
  const activeKey =
    hoveredKey || (activeCategory && activeCategory !== 'All categories' ? activeCategory : null);
  const focusedSlice = slices.find((s) => s.key === activeKey) || null;

  let cumulativeFraction = 0;

  return (
    <div
      data-testid="category-doughnut-chart"
      className="rounded-2xl border border-[#e4dfd5] bg-white p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-[0_6px_24px_-16px_rgba(9,19,38,0.12)]"
    >
      <div className="h-1 -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-1 rounded-t-2xl bg-gradient-to-r from-[#1d4ed8] via-[#4338ca] to-[#0d9488]" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1d4ed8]">
            CATEGORY DISTRIBUTION
          </span>
          <h3 className="font-display text-xl font-semibold text-[#0f172a] mt-0.5">
            Applications by Investment Track
          </h3>
        </div>
        {activeCategory && activeCategory !== 'All categories' && onSelectCategory && (
          <button
            type="button"
            onClick={() => onSelectCategory('All categories')}
            className="text-[11px] font-semibold text-[#1d4ed8] hover:underline cursor-pointer shrink-0"
          >
            Reset slice
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        <div className="sm:col-span-5 flex items-center justify-center relative">
          <svg
            viewBox="0 0 200 200"
            className="w-48 h-48 select-none"
            role="img"
            aria-label={`Category doughnut chart covering ${total} matching registrations`}
          >
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#eef2f6"
              strokeWidth="26"
            />
            {total > 0 &&
              nonZero.map((slice) => {
                const fraction = slice.count / total;
                const rawLength = fraction * circumference;
                const segLength = Math.max(2, rawLength - gapPx);
                const dashOffset = -cumulativeFraction * circumference;
                cumulativeFraction += fraction;
                const isActive = activeKey === slice.key;
                const dimmed = activeKey !== null && !isActive;

                return (
                  <circle
                    key={slice.key}
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke={slice.color}
                    strokeWidth={isActive ? 30 : 25}
                    strokeDasharray={`${segLength} ${circumference}`}
                    strokeDashoffset={dashOffset}
                    transform="rotate(-90 100 100)"
                    opacity={dimmed ? 0.32 : 1}
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredKey(slice.key)}
                    onMouseLeave={() => setHoveredKey(null)}
                    onClick={() =>
                      onSelectCategory?.(
                        activeCategory === slice.key ? 'All categories' : slice.key
                      )
                    }
                  />
                );
              })}
            <circle cx="100" cy="100" r="48" fill="#fafaf8" stroke="#e4dfd5" strokeWidth="1" />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center">
            <span className="font-mono text-2xl font-bold text-[#091326] tabular-nums leading-none">
              {focusedSlice ? focusedSlice.count : total}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#526075] max-w-[92px] truncate">
              {focusedSlice ? `${focusedSlice.percentage}% share` : 'Matching'}
            </span>
            {focusedSlice && (
              <span className="mt-0.5 text-[10px] text-[#1d4ed8] font-semibold max-w-[96px] truncate">
                {focusedSlice.label}
              </span>
            )}
          </div>
        </div>

        <div className="sm:col-span-7 space-y-1.5" role="list" aria-label="Track breakdown legend">
          {slices.map((slice) => {
            const isSelected = activeCategory === slice.key;
            const isHovered = hoveredKey === slice.key;
            return (
              <button
                key={slice.key}
                type="button"
                onMouseEnter={() => setHoveredKey(slice.key)}
                onMouseLeave={() => setHoveredKey(null)}
                onFocus={() => setHoveredKey(slice.key)}
                onBlur={() => setHoveredKey(null)}
                onClick={() =>
                  onSelectCategory?.(isSelected ? 'All categories' : slice.key)
                }
                aria-pressed={isSelected}
                className={`w-full rounded-lg px-2.5 py-2 text-left text-xs transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#eff6ff] border-[#1d4ed8]/40 shadow-xs'
                    : isHovered
                    ? 'bg-[#f8fafc] border-[#d6cfc2]'
                    : 'border-transparent hover:bg-[#f8fafc]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-sm shrink-0"
                      style={{ backgroundColor: slice.color }}
                      aria-hidden="true"
                    />
                    <span className="font-medium text-[#0f172a] truncate">{slice.label}</span>
                  </span>
                  <span className="font-mono text-[11px] text-[#334155] tabular-nums shrink-0">
                    <strong className="text-[#091326]">{slice.count}</strong> · {slice.percentage}%
                  </span>
                </div>
                <div className="mt-1.5 h-1 rounded-full bg-[#eef2f6] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.max(slice.count > 0 ? 4 : 0, slice.percentage)}%`,
                      backgroundColor: slice.color,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-[11px] text-[#526075] border-t border-[#f1efe9] pt-2.5">
        Click any track segment or progress row to filter matching registrations.
      </p>
    </div>
  );
}

export function ValidationPieChart({
  validationSlices,
  paymentSlices,
  activeStatus,
  activePaymentStatus,
  onSelectStatus,
  onSelectPaymentStatus,
}: {
  validationSlices: BreakdownSlice[];
  paymentSlices: BreakdownSlice[];
  activeStatus?: string;
  activePaymentStatus?: string;
  onSelectStatus?: (status: string) => void;
  onSelectPaymentStatus?: (paymentStatus: string) => void;
}) {
  const [mode, setMode] = useState<'validation' | 'payment'>('validation');
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const slices = mode === 'validation' ? validationSlices : paymentSlices;
  const total = slices.reduce((acc, s) => acc + s.count, 0);
  const nonZero = slices.filter((s) => s.count > 0);
  const selectedFilterValue =
    mode === 'validation'
      ? activeStatus && activeStatus !== 'All statuses'
        ? activeStatus
        : null
      : activePaymentStatus && activePaymentStatus !== 'All payments'
      ? activePaymentStatus
      : null;

  const activeKey = hoveredKey || selectedFilterValue;
  const focused = slices.find((s) => s.key === activeKey) || null;

  const handleSelectSlice = (key: string) => {
    if (mode === 'validation') {
      onSelectStatus?.(activeStatus === key ? 'All statuses' : key);
    } else {
      onSelectPaymentStatus?.(activePaymentStatus === key ? 'All payments' : key);
    }
  };

  let startAngle = 0;

  return (
    <div
      data-testid="validation-pie-chart"
      className="rounded-2xl border border-[#e4dfd5] bg-white p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-[0_6px_24px_-16px_rgba(109,40,217,0.14)]"
    >
      <div className="h-1 -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-1 rounded-t-2xl bg-gradient-to-r from-[#0d9488] via-[#2563eb] to-[#6d28d9]" />

      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6d28d9]">
            SCREENING &amp; FEE STATUS
          </span>
          <h3 className="font-display text-xl font-semibold text-[#0f172a] mt-0.5">
            {mode === 'validation' ? 'Validation Pipeline Split' : 'Payment Settlement Split'}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {selectedFilterValue && (
            <button
              type="button"
              onClick={() => {
                if (mode === 'validation') onSelectStatus?.('All statuses');
                else onSelectPaymentStatus?.('All payments');
              }}
              className="text-[11px] font-semibold text-[#6d28d9] hover:underline cursor-pointer"
            >
              Reset wedge
            </button>
          )}
          <div className="inline-flex rounded-lg border border-[#e4dfd5] bg-[#f8fafc] p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => {
                setMode('validation');
                setHoveredKey(null);
              }}
              className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                mode === 'validation'
                  ? 'bg-[#091326] text-[#e6c67e]'
                  : 'text-[#526075] hover:text-[#0f172a]'
              }`}
            >
              Validation
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('payment');
                setHoveredKey(null);
              }}
              className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                mode === 'payment'
                  ? 'bg-[#091326] text-[#e6c67e]'
                  : 'text-[#526075] hover:text-[#0f172a]'
              }`}
            >
              Payment
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        <div className="sm:col-span-5 flex flex-col items-center justify-center relative">
          <svg
            viewBox="0 0 220 220"
            className="w-48 h-48 select-none overflow-visible"
            role="img"
            aria-label={`${mode} status pie chart for ${total} matching submissions`}
          >
            {total === 0 ? (
              <g>
                <circle cx="110" cy="110" r="78" fill="#eef2f6" stroke="#e2e8f0" strokeWidth="2" />
                <text
                  x="110"
                  y="114"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#64748b"
                  fontFamily="var(--font-mono)"
                >
                  No records
                </text>
              </g>
            ) : nonZero.length === 1 ? (
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredKey(nonZero[0].key)}
                onMouseLeave={() => setHoveredKey(null)}
                onClick={() => handleSelectSlice(nonZero[0].key)}
              >
                <circle
                  cx="110"
                  cy="110"
                  r={activeKey === nonZero[0].key ? 82 : 78}
                  fill={nonZero[0].color}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className="transition-all duration-200"
                />
                <text
                  x="110"
                  y="106"
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                  fill="#ffffff"
                  fontFamily="var(--font-mono)"
                >
                  100%
                </text>
                <text
                  x="110"
                  y="124"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="#f8fafc"
                  fontFamily="var(--font-mono)"
                >
                  {nonZero[0].label}
                </text>
              </g>
            ) : (
              nonZero.map((slice) => {
                const angle = (slice.count / total) * 360;
                const endAngle = startAngle + angle;
                const midAngle = startAngle + angle / 2;
                const path = describePieWedge(110, 110, 78, startAngle, endAngle);
                const labelPos = polarToCartesian(110, 110, 50, midAngle);
                const midRad = ((midAngle - 90) * Math.PI) / 180;
                startAngle = endAngle;

                const isActive = activeKey === slice.key;
                const dimmed = activeKey !== null && !isActive;
                const offsetX = isActive ? Math.cos(midRad) * 6 : 0;
                const offsetY = isActive ? Math.sin(midRad) * 6 : 0;

                return (
                  <g
                    key={slice.key}
                    style={{
                      transform: `translate(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px)`,
                    }}
                    className="transition-transform duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredKey(slice.key)}
                    onMouseLeave={() => setHoveredKey(null)}
                    onClick={() => handleSelectSlice(slice.key)}
                  >
                    <path
                      d={path}
                      fill={slice.color}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      opacity={dimmed ? 0.36 : 1}
                      className="transition-opacity duration-200"
                    />
                    {slice.percentage >= 10 && (
                      <text
                        x={labelPos.x}
                        y={labelPos.y + 4}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="700"
                        fill="#ffffff"
                        fontFamily="var(--font-mono)"
                        pointerEvents="none"
                      >
                        {Math.round(slice.percentage)}%
                      </text>
                    )}
                  </g>
                );
              })
            )}
          </svg>

          <div className="mt-1 px-3 py-1.5 rounded-lg border border-[#e4dfd5] bg-[#fafaf8] text-center font-mono text-[11px] text-[#334155] tabular-nums w-full">
            {focused ? (
              <span className="inline-flex items-center justify-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: focused.color }}
                  aria-hidden="true"
                />
                <strong className="text-[#091326]">{focused.label}:</strong> {focused.count} (
                {focused.percentage}%)
              </span>
            ) : (
              <span className="text-[#526075]">{total} total filtered records</span>
            )}
          </div>
        </div>

        <div className="sm:col-span-7 space-y-2">
          {slices.map((slice) => {
            const isSelected = selectedFilterValue === slice.key;
            const isHovered = hoveredKey === slice.key;
            return (
              <button
                key={slice.key}
                type="button"
                onMouseEnter={() => setHoveredKey(slice.key)}
                onMouseLeave={() => setHoveredKey(null)}
                onFocus={() => setHoveredKey(slice.key)}
                onBlur={() => setHoveredKey(null)}
                onClick={() => handleSelectSlice(slice.key)}
                aria-pressed={isSelected}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#6d28d9]/50 bg-[#f5f3ff] shadow-xs'
                    : isHovered
                    ? 'border-[#cfc8b8] bg-[#f8fafc]'
                    : 'border-[#ece8df] bg-[#fafaf8]'
                }`}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 ring-2 ring-white shadow-xs"
                    style={{ backgroundColor: slice.color }}
                    aria-hidden="true"
                  />
                  <span className="font-semibold text-[#0f172a] truncate">{slice.label}</span>
                </span>
                <span className="font-mono text-[11px] text-[#334155] tabular-nums shrink-0">
                  <strong className="text-[#091326]">{slice.count}</strong> · {slice.percentage}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-[11px] text-[#526075] border-t border-[#f1efe9] pt-2.5">
        {mode === 'validation'
          ? 'Click any validation pie wedge or card to filter submissions by screening status.'
          : 'Click any payment pie wedge or card to filter submissions by fee settlement status.'}
      </p>
    </div>
  );
}

const STACK_COLORS = {
  approved: '#0d9488',
  underReview: '#2563eb',
  pending: '#c49a45',
  rejected: '#dc2626',
};

export function TrackComparisonBarChart({
  trackRows,
  participantRows,
  stackedTrackRows,
  stackedRoleRows,
  activeCategory,
  onSelectCategory,
}: {
  trackRows: TrackBreakdownRow[];
  participantRows: ParticipantTypeComparisonRow[];
  stackedTrackRows?: StatusStackedRow[];
  stackedRoleRows?: StatusStackedRow[];
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}) {
  const [view, setView] = useState<'tracks' | 'roles'>('tracks');
  const [scaleMode, setScaleMode] = useState<'stacked' | 'target'>('stacked');
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  const activeRows: StatusStackedRow[] =
    view === 'tracks'
      ? stackedTrackRows ||
        trackRows.map((r) => ({
          key: r.category,
          label: r.category,
          count: r.count,
          target: r.target,
          pctOfTarget: r.pctOfTarget,
          approved: r.count,
          underReview: 0,
          pending: 0,
          rejected: 0,
          color: '#1d4ed8',
        }))
      : stackedRoleRows ||
        participantRows.map((r) => ({
          key: r.type,
          label: r.type,
          count: r.registered,
          target: r.target,
          pctOfTarget: r.pctOfTarget,
          approved: r.registered,
          underReview: 0,
          pending: 0,
          rejected: 0,
          color: r.color,
        }));

  const maxStacked = Math.max(1, ...activeRows.map((r) => r.count));
  const maxTarget = Math.max(10, ...activeRows.map((r) => Math.max(r.target, r.count)));

  return (
    <div
      data-testid="track-comparison-bar-chart"
      className="rounded-2xl border border-[#e4dfd5] bg-white p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-[0_6px_24px_-16px_rgba(13,148,136,0.14)]"
    >
      <div className="h-1 -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-1 rounded-t-2xl bg-gradient-to-r from-[#0d9488] via-[#1d4ed8] to-[#c49a45]" />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0d9488]">
            STACKED INTAKE &amp; TARGET ALLOCATION
          </span>
          <h3 className="font-display text-xl font-semibold text-[#0f172a] mt-0.5">
            {view === 'tracks' ? 'Category Screening Mix & Cap' : 'Participant Role Screening Mix'}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <div className="inline-flex rounded-lg border border-[#e4dfd5] bg-[#f8fafc] p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setScaleMode('stacked')}
              className={`px-2 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                scaleMode === 'stacked'
                  ? 'bg-[#1d4ed8] text-white'
                  : 'text-[#526075] hover:text-[#0f172a]'
              }`}
            >
              Intake Scale
            </button>
            <button
              type="button"
              onClick={() => setScaleMode('target')}
              className={`px-2 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                scaleMode === 'target'
                  ? 'bg-[#1d4ed8] text-white'
                  : 'text-[#526075] hover:text-[#0f172a]'
              }`}
            >
              Target Cap
            </button>
          </div>

          <div className="inline-flex rounded-lg border border-[#e4dfd5] bg-[#f8fafc] p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => {
                setView('tracks');
                setHoveredName(null);
              }}
              className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                view === 'tracks'
                  ? 'bg-[#091326] text-[#e6c67e]'
                  : 'text-[#526075] hover:text-[#0f172a]'
              }`}
            >
              By Track
            </button>
            <button
              type="button"
              onClick={() => {
                setView('roles');
                setHoveredName(null);
              }}
              className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
                view === 'roles'
                  ? 'bg-[#091326] text-[#e6c67e]'
                  : 'text-[#526075] hover:text-[#0f172a]'
              }`}
            >
              By Role
            </button>
          </div>
        </div>
      </div>

      <div className={view === 'tracks' ? 'space-y-2.5' : 'space-y-4 py-1'}>
        {activeRows.map((row) => {
          const isTrackView = view === 'tracks';
          const isSelected = isTrackView && activeCategory === row.key;
          const isHovered = hoveredName === row.key;
          const denom = scaleMode === 'stacked' ? maxStacked : maxTarget;
          const targetCapWidth =
            scaleMode === 'target' ? Math.min(100, (row.target / maxTarget) * 100) : 100;

          const segApproved = (row.approved / denom) * 100;
          const segUnderReview = (row.underReview / denom) * 100;
          const segPending = (row.pending / denom) * 100;
          const segRejected = (row.rejected / denom) * 100;

          const rowInner = (
            <>
              <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
                <span className="font-semibold text-[#0f172a] truncate flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: row.color }}
                    aria-hidden="true"
                  />
                  <span>{row.label}</span>
                </span>
                <span className="font-mono text-[11px] tabular-nums shrink-0 text-[#334155]">
                  <strong className="text-[#091326]">{row.count}</strong> / {row.target} target (
                  {row.pctOfTarget}%)
                </span>
              </div>
              <div className="relative h-4 rounded-md bg-[#f1f5f9] overflow-hidden flex items-center">
                {scaleMode === 'target' && (
                  <div
                    className="absolute inset-y-0 left-0 rounded-md bg-[#cbd5e1]/45 transition-all duration-300"
                    style={{ width: `${targetCapWidth}%` }}
                  />
                )}
                <div className="relative h-full w-full flex gap-[1px]">
                  {segApproved > 0 && (
                    <div
                      className="h-full first:rounded-l-md last:rounded-r-md transition-all duration-300"
                      style={{ width: `${segApproved}%`, backgroundColor: STACK_COLORS.approved }}
                      title={`Approved: ${row.approved}`}
                    />
                  )}
                  {segUnderReview > 0 && (
                    <div
                      className="h-full first:rounded-l-md last:rounded-r-md transition-all duration-300"
                      style={{
                        width: `${segUnderReview}%`,
                        backgroundColor: STACK_COLORS.underReview,
                      }}
                      title={`Under review: ${row.underReview}`}
                    />
                  )}
                  {segPending > 0 && (
                    <div
                      className="h-full first:rounded-l-md last:rounded-r-md transition-all duration-300"
                      style={{ width: `${segPending}%`, backgroundColor: STACK_COLORS.pending }}
                      title={`Pending: ${row.pending}`}
                    />
                  )}
                  {segRejected > 0 && (
                    <div
                      className="h-full first:rounded-l-md last:rounded-r-md transition-all duration-300"
                      style={{ width: `${segRejected}%`, backgroundColor: STACK_COLORS.rejected }}
                      title={`Rejected: ${row.rejected}`}
                    />
                  )}
                </div>
              </div>
            </>
          );

          if (isTrackView) {
            return (
              <button
                key={row.key}
                type="button"
                onMouseEnter={() => setHoveredName(row.key)}
                onMouseLeave={() => setHoveredName(null)}
                onFocus={() => setHoveredName(row.key)}
                onBlur={() => setHoveredName(null)}
                onClick={() =>
                  onSelectCategory?.(isSelected ? 'All categories' : row.key)
                }
                className={`w-full text-left rounded-lg px-2.5 py-2 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#eff6ff] ring-1 ring-[#1d4ed8]/35'
                    : isHovered
                    ? 'bg-[#f8fafc]'
                    : 'hover:bg-[#f8fafc]'
                }`}
              >
                {rowInner}
              </button>
            );
          }

          return (
            <div
              key={row.key}
              onMouseEnter={() => setHoveredName(row.key)}
              onMouseLeave={() => setHoveredName(null)}
              className={`rounded-lg px-2.5 py-2 transition-colors ${
                isHovered ? 'bg-[#f8fafc]' : ''
              }`}
            >
              {rowInner}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#526075] border-t border-[#f1efe9] pt-2.5">
        <span className="inline-flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: STACK_COLORS.approved }} />
            Approved
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: STACK_COLORS.underReview }} />
            Under review
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: STACK_COLORS.pending }} />
            Pending
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: STACK_COLORS.rejected }} />
            Rejected
          </span>
        </span>
        {view === 'tracks' && <span>Click any track row to filter records</span>}
      </div>
    </div>
  );
}

export function RegistrationTrendLineChart({
  points,
}: {
  points: RegistrationTrendPoint[];
}) {
  const [series, setSeries] = useState<'cumulative' | 'daily'>('cumulative');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const width = 560;
  const height = 224;
  const padL = 40;
  const padR = 20;
  const padT = 22;
  const padB = 34;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const values = points.map((p) => (series === 'cumulative' ? p.cumulativeCount : p.dailyCount));
  const rawMax = values.length > 0 ? Math.max(...values) : 1;
  const yMax = Math.max(2, Math.ceil(rawMax * 1.15));

  const coords = points.map((p, idx) => {
    const x =
      points.length === 1
        ? padL + plotW / 2
        : padL + (idx / (points.length - 1)) * plotW;
    const val = series === 'cumulative' ? p.cumulativeCount : p.dailyCount;
    const y = padT + plotH - (val / yMax) * plotH;
    return { x, y, point: p, val };
  });

  const linePath = buildSmoothSplinePath(coords);
  const areaPath =
    coords.length > 1
      ? `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${(padT + plotH).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(padT + plotH).toFixed(1)} Z`
      : '';

  const activePoint =
    activeIdx !== null && coords[activeIdx]
      ? coords[activeIdx]
      : coords.length > 0
      ? coords[coords.length - 1]
      : null;

  const midTick = Math.round(yMax / 2);
  const yTicks = Array.from(new Set([0, midTick, yMax])).sort((a, b) => a - b);

  return (
    <div
      data-testid="registration-trend-line-chart"
      className="rounded-2xl border border-[#e4dfd5] bg-white p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-[0_6px_24px_-16px_rgba(67,56,202,0.14)]"
    >
      <div className="h-1 -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-1 rounded-t-2xl bg-gradient-to-r from-[#4338ca] via-[#1d4ed8] to-[#c49a45]" />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4338ca]">
            INTAKE VELOCITY OVER TIME
          </span>
          <h3 className="font-display text-xl font-semibold text-[#0f172a] mt-0.5">
            {series === 'cumulative' ? 'Cumulative Submission Trajectory' : 'Daily Intake Timeline'}
          </h3>
        </div>

        <div className="inline-flex rounded-lg border border-[#e4dfd5] bg-[#f8fafc] p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setSeries('cumulative')}
            className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
              series === 'cumulative'
                ? 'bg-[#091326] text-[#e6c67e]'
                : 'text-[#526075] hover:text-[#0f172a]'
            }`}
          >
            Cumulative
          </button>
          <button
            type="button"
            onClick={() => setSeries('daily')}
            className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-colors ${
              series === 'daily'
                ? 'bg-[#091326] text-[#e6c67e]'
                : 'text-[#526075] hover:text-[#0f172a]'
            }`}
          >
            Daily
          </button>
        </div>
      </div>

      {points.length === 0 ? (
        <div className="h-[224px] rounded-xl border border-dashed border-[#d6cfc2] bg-[#fafaf8] flex flex-col items-center justify-center text-center px-4">
          <p className="text-sm font-semibold text-[#0f172a]">No dated submissions match filter</p>
          <p className="text-xs text-[#526075] mt-1">
            Adjust or reset active filters to inspect chronological registration intake.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] px-3 py-2 text-xs">
            <span className="text-[#526075]">
              {activeIdx !== null ? 'Focused date:' : 'Latest submission:'}{' '}
              <strong className="font-mono text-[#091326]">
                {activePoint?.point.label} ({activePoint?.point.date})
              </strong>
            </span>
            <span className="font-mono font-semibold text-[#1d4ed8] tabular-nums">
              +{activePoint?.point.dailyCount} day · {activePoint?.point.cumulativeCount} cumulative
            </span>
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-52 overflow-visible select-none"
            role="img"
            aria-label={`Registration timeline line chart showing ${points.length} submission dates`}
          >
            <defs>
              <linearGradient id="im500TrendArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4338ca" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="im500TrendStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1d4ed8" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {yTicks.map((tickVal) => {
              const yPos = padT + plotH - (tickVal / yMax) * plotH;
              return (
                <g key={tickVal}>
                  <line
                    x1={padL}
                    y1={yPos}
                    x2={width - padR}
                    y2={yPos}
                    stroke="#e2e8f0"
                    strokeDasharray={tickVal === 0 ? undefined : '3 3'}
                  />
                  <text
                    x={padL - 8}
                    y={yPos + 4}
                    textAnchor="end"
                    fontSize="10"
                    fill="#64748b"
                    fontFamily="var(--font-mono)"
                  >
                    {tickVal}
                  </text>
                </g>
              );
            })}

            {areaPath && <path d={areaPath} fill="url(#im500TrendArea)" />}

            {linePath && (
              <path
                d={linePath}
                fill="none"
                stroke="url(#im500TrendStroke)"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            )}

            {coords.map((c, idx) => {
              const isHot = activeIdx === idx || (activeIdx === null && idx === coords.length - 1);
              const showLabel =
                coords.length <= 8 ||
                idx === 0 ||
                idx === coords.length - 1 ||
                idx % Math.ceil(coords.length / 6) === 0;

              return (
                <g key={c.point.date}>
                  {isHot && (
                    <line
                      x1={c.x}
                      y1={padT}
                      x2={c.x}
                      y2={padT + plotH}
                      stroke="#c49a45"
                      strokeDasharray="3 3"
                    />
                  )}
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={isHot ? 6 : 4}
                    fill={isHot ? '#c49a45' : '#1d4ed8'}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r="15"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveIdx(idx)}
                    onMouseLeave={() => setActiveIdx(null)}
                    onClick={() => setActiveIdx(idx)}
                  />
                  {showLabel && (
                    <text
                      x={c.x}
                      y={height - 10}
                      textAnchor="middle"
                      fontSize="10"
                      fill={isHot ? '#091326' : '#64748b'}
                      fontWeight={isHot ? '700' : '400'}
                      fontFamily="var(--font-mono)"
                    >
                      {c.point.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      )}

      <p className="text-[11px] text-[#526075] border-t border-[#f1efe9] pt-2.5">
        Smooth spline trajectory across {points.length} active submission dates. Hover any marker to inspect daily volume.
      </p>
    </div>
  );
}
