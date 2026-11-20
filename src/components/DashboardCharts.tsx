import React, { useState } from 'react';
import {
  type BreakdownSlice,
  type ParticipantTypeComparisonRow,
  type RegistrationTrendPoint,
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

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const nonZero = slices.filter((s) => s.count > 0);
  const activeKey = hoveredKey || (activeCategory && activeCategory !== 'All categories' ? activeCategory : null);
  const focusedSlice = slices.find((s) => s.key === activeKey) || null;

  let cumulativeFraction = 0;

  return (
    <div
      data-testid="category-doughnut-chart"
      className="rounded-2xl border border-[#e4dfd5] bg-white p-5 sm:p-6 flex flex-col justify-between gap-4"
    >
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
            viewBox="0 0 180 180"
            className="w-44 h-44 select-none"
            role="img"
            aria-label={`Category doughnut chart covering ${total} matching registrations`}
          >
            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="#eef2f6"
              strokeWidth="22"
            />
            {total > 0 &&
              nonZero.map((slice) => {
                const fraction = slice.count / total;
                const segLength = fraction * circumference;
                const dashOffset = -cumulativeFraction * circumference;
                cumulativeFraction += fraction;
                const isActive = activeKey === slice.key;
                const dimmed = activeKey !== null && !isActive;

                return (
                  <circle
                    key={slice.key}
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke={slice.color}
                    strokeWidth={isActive ? 26 : 22}
                    strokeDasharray={`${segLength} ${circumference}`}
                    strokeDashoffset={dashOffset}
                    transform="rotate(-90 90 90)"
                    opacity={dimmed ? 0.35 : 1}
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
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center">
            <span className="font-mono text-2xl font-bold text-[#091326] tabular-nums leading-none">
              {focusedSlice ? focusedSlice.count : total}
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#526075] max-w-[92px] truncate">
              {focusedSlice ? `${focusedSlice.percentage}% share` : 'Matching'}
            </span>
            {focusedSlice && (
              <span className="mt-0.5 text-[10px] text-[#1d4ed8] font-medium max-w-[96px] truncate">
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
                className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#eff6ff] border border-[#1d4ed8]/30'
                    : isHovered
                    ? 'bg-[#f8fafc]'
                    : 'hover:bg-[#f8fafc]'
                }`}
              >
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
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-[11px] text-[#526075] border-t border-[#f1efe9] pt-2.5">
        Click any track segment or legend item to filter the live registration ledger.
      </p>
    </div>
  );
}

export function ValidationPieChart({
  validationSlices,
  paymentSlices,
  activeStatus,
  onSelectStatus,
}: {
  validationSlices: BreakdownSlice[];
  paymentSlices: BreakdownSlice[];
  activeStatus?: string;
  onSelectStatus?: (status: string) => void;
}) {
  const [mode, setMode] = useState<'validation' | 'payment'>('validation');
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const slices = mode === 'validation' ? validationSlices : paymentSlices;
  const total = slices.reduce((acc, s) => acc + s.count, 0);
  const nonZero = slices.filter((s) => s.count > 0);
  const activeKey =
    hoveredKey || (mode === 'validation' && activeStatus && activeStatus !== 'All statuses' ? activeStatus : null);
  const focused = slices.find((s) => s.key === activeKey) || null;

  let startAngle = 0;

  return (
    <div
      data-testid="validation-pie-chart"
      className="rounded-2xl border border-[#e4dfd5] bg-white p-5 sm:p-6 flex flex-col justify-between gap-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6d28d9]">
            SCREENING &amp; FEE STATUS
          </span>
          <h3 className="font-display text-xl font-semibold text-[#0f172a] mt-0.5">
            {mode === 'validation' ? 'Validation Pipeline Split' : 'Payment Settlement Split'}
          </h3>
        </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        <div className="sm:col-span-5 flex flex-col items-center justify-center relative">
          <svg
            viewBox="0 0 180 180"
            className="w-44 h-44 select-none"
            role="img"
            aria-label={`${mode} status pie chart for ${total} matching submissions`}
          >
            {total === 0 ? (
              <circle cx="90" cy="90" r="72" fill="#eef2f6" />
            ) : nonZero.length === 1 ? (
              <circle
                cx="90"
                cy="90"
                r="72"
                fill={nonZero[0].color}
                className="cursor-pointer transition-opacity"
                onMouseEnter={() => setHoveredKey(nonZero[0].key)}
                onMouseLeave={() => setHoveredKey(null)}
                onClick={() => {
                  if (mode === 'validation') {
                    onSelectStatus?.(
                      activeStatus === nonZero[0].key ? 'All statuses' : nonZero[0].key
                    );
                  }
                }}
              />
            ) : (
              nonZero.map((slice) => {
                const angle = (slice.count / total) * 360;
                const endAngle = startAngle + angle;
                const path = describePieWedge(90, 90, 72, startAngle, endAngle);
                startAngle = endAngle;
                const isActive = activeKey === slice.key;
                const dimmed = activeKey !== null && !isActive;

                return (
                  <path
                    key={slice.key}
                    d={path}
                    fill={slice.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    opacity={dimmed ? 0.38 : 1}
                    style={{
                      transformOrigin: '90px 90px',
                      transform: isActive ? 'scale(1.04)' : 'scale(1)',
                    }}
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHoveredKey(slice.key)}
                    onMouseLeave={() => setHoveredKey(null)}
                    onClick={() => {
                      if (mode === 'validation') {
                        onSelectStatus?.(
                          activeStatus === slice.key ? 'All statuses' : slice.key
                        );
                      }
                    }}
                  />
                );
              })
            )}
          </svg>

          <div className="mt-1 min-h-[20px] text-center font-mono text-[11px] text-[#334155] tabular-nums">
            {focused ? (
              <span>
                <strong className="text-[#091326]">{focused.label}:</strong> {focused.count} (
                {focused.percentage}%)
              </span>
            ) : (
              <span className="text-[#526075]">{total} active records</span>
            )}
          </div>
        </div>

        <div className="sm:col-span-7 space-y-2">
          {slices.map((slice) => {
            const isSelected = mode === 'validation' && activeStatus === slice.key;
            const isHovered = hoveredKey === slice.key;
            return (
              <button
                key={slice.key}
                type="button"
                onMouseEnter={() => setHoveredKey(slice.key)}
                onMouseLeave={() => setHoveredKey(null)}
                onFocus={() => setHoveredKey(slice.key)}
                onBlur={() => setHoveredKey(null)}
                onClick={() => {
                  if (mode === 'validation') {
                    onSelectStatus?.(isSelected ? 'All statuses' : slice.key);
                  }
                }}
                aria-pressed={isSelected}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-xs transition-colors ${
                  mode === 'validation' ? 'cursor-pointer' : 'cursor-default'
                } ${
                  isSelected
                    ? 'border-[#6d28d9]/45 bg-[#f5f3ff]'
                    : isHovered
                    ? 'border-[#cfc8b8] bg-[#f8fafc]'
                    : 'border-[#ece8df] bg-[#fafaf8]'
                }`}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: slice.color }}
                    aria-hidden="true"
                  />
                  <span className="font-medium text-[#0f172a] truncate">{slice.label}</span>
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
          ? 'Click any validation wedge or status card to filter records by screening state.'
          : 'Live fee confirmation status computed strictly from current filtered submissions.'}
      </p>
    </div>
  );
}

export function TrackComparisonBarChart({
  trackRows,
  participantRows,
  activeCategory,
  onSelectCategory,
}: {
  trackRows: TrackBreakdownRow[];
  participantRows: ParticipantTypeComparisonRow[];
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}) {
  const [view, setView] = useState<'tracks' | 'roles'>('tracks');
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  const trackMax = Math.max(10, ...trackRows.map((r) => Math.max(r.target, r.count)));
  const roleMax = Math.max(10, ...participantRows.map((r) => Math.max(r.target, r.registered)));
  const trackPalette = ['#1d4ed8', '#0d9488', '#c49a45', '#6d28d9', '#0284c7', '#4338ca'];

  return (
    <div
      data-testid="track-comparison-bar-chart"
      className="rounded-2xl border border-[#e4dfd5] bg-white p-5 sm:p-6 flex flex-col justify-between gap-4"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0d9488]">
            CAPACITY VS TARGET ALLOCATION
          </span>
          <h3 className="font-display text-xl font-semibold text-[#0f172a] mt-0.5">
            {view === 'tracks' ? 'Category Intake vs. Target Cap' : 'Participant Roles vs. Target Cap'}
          </h3>
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

      {view === 'tracks' ? (
        <div className="space-y-3">
          {trackRows.map((row, idx) => {
            const barColor = trackPalette[idx % trackPalette.length];
            const isSelected = activeCategory === row.category;
            const isHovered = hoveredName === row.category;
            const targetWidthPct = Math.min(100, (row.target / trackMax) * 100);
            const registeredWidthPct =
              row.count > 0 ? Math.max(4, Math.min(100, (row.count / trackMax) * 100)) : 0;

            return (
              <button
                key={row.category}
                type="button"
                onMouseEnter={() => setHoveredName(row.category)}
                onMouseLeave={() => setHoveredName(null)}
                onFocus={() => setHoveredName(row.category)}
                onBlur={() => setHoveredName(null)}
                onClick={() =>
                  onSelectCategory?.(isSelected ? 'All categories' : row.category)
                }
                className={`w-full text-left rounded-lg px-2.5 py-2 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#eff6ff] ring-1 ring-[#1d4ed8]/35'
                    : isHovered
                    ? 'bg-[#f8fafc]'
                    : 'hover:bg-[#f8fafc]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
                  <span className="font-medium text-[#0f172a] truncate">{row.category}</span>
                  <span className="font-mono text-[11px] tabular-nums shrink-0 text-[#334155]">
                    <strong className="text-[#091326]">{row.count}</strong> / {row.target} target (
                    {row.pctOfTarget}%)
                  </span>
                </div>
                <div className="relative h-4 rounded bg-[#f1f5f9] overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded bg-[#cbd5e1]/55 transition-all duration-300"
                    style={{ width: `${targetWidthPct}%` }}
                    title={`Target: ${row.target}`}
                  />
                  <div
                    className="relative h-full rounded transition-all duration-300"
                    style={{ width: `${registeredWidthPct}%`, backgroundColor: barColor }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4 py-2">
          {participantRows.map((row) => {
            const targetWidthPct = Math.min(100, (row.target / roleMax) * 100);
            const regWidthPct =
              row.registered > 0 ? Math.max(4, Math.min(100, (row.registered / roleMax) * 100)) : 0;
            return (
              <div
                key={row.type}
                onMouseEnter={() => setHoveredName(row.type)}
                onMouseLeave={() => setHoveredName(null)}
                className={`rounded-lg px-2.5 py-2.5 transition-colors ${
                  hoveredName === row.type ? 'bg-[#f8fafc]' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
                  <span className="font-semibold text-[#0f172a]">{row.type}</span>
                  <span className="font-mono text-[11px] text-[#334155] tabular-nums">
                    <strong className="text-[#091326]">{row.registered}</strong> / {row.target} (
                    {row.pctOfTarget}%)
                  </span>
                </div>
                <div className="relative h-5 rounded bg-[#f1f5f9] overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded bg-[#cbd5e1]/55"
                    style={{ width: `${targetWidthPct}%` }}
                  />
                  <div
                    className="relative h-full rounded transition-all duration-300"
                    style={{ width: `${regWidthPct}%`, backgroundColor: row.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#526075] border-t border-[#f1efe9] pt-2.5">
        <span className="inline-flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#1d4ed8]" aria-hidden="true" />
            Registered
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#cbd5e1]" aria-hidden="true" />
            Allocated Target Cap
          </span>
        </span>
        {view === 'tracks' && <span>Click any track bar to filter records</span>}
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
  const height = 220;
  const padL = 42;
  const padR = 20;
  const padT = 20;
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

  const linePath =
    coords.length > 0
      ? coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ')
      : '';
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

  const yTicks = [0, Math.round(yMax / 2), yMax];

  return (
    <div
      data-testid="registration-trend-line-chart"
      className="rounded-2xl border border-[#e4dfd5] bg-white p-5 sm:p-6 flex flex-col justify-between gap-4"
    >
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
        <div className="h-[220px] rounded-xl border border-dashed border-[#d6cfc2] bg-[#fafaf8] flex flex-col items-center justify-center text-center px-4">
          <p className="text-sm font-semibold text-[#0f172a]">No dated submissions match filter</p>
          <p className="text-xs text-[#526075] mt-1">
            Adjust or reset active filters to inspect chronological registration intake.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-[#f8fafc] border border-[#e2e8f0] px-3 py-2 text-xs">
            <span className="text-[#526075]">
              {activeIdx !== null ? 'Selected submission date:' : 'Latest recorded date:'}{' '}
              <strong className="font-mono text-[#091326]">
                {activePoint?.point.label} ({activePoint?.point.date})
              </strong>
            </span>
            <span className="font-mono font-semibold text-[#1d4ed8] tabular-nums">
              +{activePoint?.point.dailyCount} day · {activePoint?.point.cumulativeCount} total
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
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.01" />
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
                stroke="#1d4ed8"
                strokeWidth="2.5"
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
                    r={isHot ? 5.5 : 3.8}
                    fill={isHot ? '#c49a45' : '#1d4ed8'}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r="14"
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
                      fontWeight={isHot ? '600' : '400'}
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
        Plotted strictly from actual record submission timestamps ({points.length} active dates).
      </p>
    </div>
  );
}
