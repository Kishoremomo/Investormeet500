import React, { useState } from 'react';
import { Download, Layers, Maximize2, X } from 'lucide-react';

export interface FloorPlanZone {
  id: string;
  label: string;
  capacity: string;
  purpose: string;
}

const LAYOUT_A_ZONES: FloorPlanZone[] = [
  { id: 'A-STAGE', label: 'Main Stage & Plenary', capacity: '250 Seated', purpose: 'Opening address, AI Experts & CFO keynote sessions' },
  { id: 'A-VIP', label: 'VIP & Investor Lounge', capacity: '60 Delegates', purpose: 'Private refreshments and curated investor introductions' },
  { id: 'A-BIZ', label: 'Business Lounge', capacity: '80 Delegates', purpose: 'Pre-scheduled validation & follow-up discussions' },
  { id: 'A-NET', label: 'Networking Atrium', capacity: '120 Standing', purpose: 'Open founder, bank & association networking' },
  { id: 'A-MEET', label: 'Private Meeting Rooms (M1–M6)', capacity: '6 Rooms', purpose: 'One-to-one investor & bank loan confidential reviews' },
  { id: 'A-BOOTHS', label: '20 Exhibition Booths (B01–B20)', capacity: '20 Stalls', purpose: 'Sponsor, corporate and startup showcase desks' },
];

const LAYOUT_B_ZONES: FloorPlanZone[] = [
  { id: 'B-STAGE', label: 'Main Presentation Stage', capacity: '250 Seated', purpose: 'Track pitches, panel talks and closing updates' },
  { id: 'B-EXPO', label: '30 Exhibition Booths (E01–E30)', capacity: '30 Stalls', purpose: 'Expanded exhibition floor for corporates, banks & startups' },
  { id: 'B-MEET', label: 'Dedicated Meeting Rooms (R1–R4)', capacity: '4 Rooms', purpose: 'Structured deal-room & term-sheet discussions' },
  { id: 'B-VIP', label: 'VIP Lounge', capacity: '50 Delegates', purpose: 'Chief Guests, committee chairs and institutional leads' },
  { id: 'B-FOOD', label: 'Delegate Dining & Food Court', capacity: '180 Seated', purpose: 'All-day hospitality, lunch & networking coffee service' },
];

function FloorPlanSvg({
  variant,
  selectedZoneId,
  onSelectZone,
}: {
  variant: 'A' | 'B';
  selectedZoneId: string | null;
  onSelectZone: (zone: FloorPlanZone) => void;
}) {
  const zones = variant === 'A' ? LAYOUT_A_ZONES : LAYOUT_B_ZONES;

  const zoneStyle = (id: string) =>
    selectedZoneId === id
      ? 'fill-[#c49a45]/25 stroke-[#8a5d14] stroke-2 cursor-pointer transition-colors'
      : 'fill-[#fafaf8] hover:fill-[#c49a45]/12 stroke-[#0f172a]/35 stroke-[1.2] cursor-pointer transition-colors';

  if (variant === 'A') {
    const booths = Array.from({ length: 20 }, (_, i) => i + 1);
    return (
      <svg
        id="svg-floorplan-a"
        viewBox="0 0 800 480"
        className="w-full h-auto rounded-xl border border-[#e4dfd5] bg-white"
        role="img"
        aria-label="Layout A meeting-focused hall architectural diagram"
      >
        <rect x="0" y="0" width="800" height="480" fill="#fafaf8" />
        <rect x="20" y="20" width="760" height="440" fill="none" stroke="#0c121d" strokeWidth="1.5" />

        <g onClick={() => onSelectZone(zones[0])}>
          <rect x="40" y="40" width="320" height="190" rx="6" className={zoneStyle('A-STAGE')} />
          <rect x="90" y="54" width="220" height="32" rx="4" fill="#0c121d" />
          <text x="200" y="75" textAnchor="middle" fill="#e6c67e" fontSize="12" fontWeight="600">
            MAIN STAGE · 250 SEATS
          </text>
          <text x="200" y="135" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="500">
            Plenary Audience Seating Grid
          </text>
          <text x="200" y="156" textAnchor="middle" fill="#526075" fontSize="10">
            Click zone to inspect capacity
          </text>
        </g>

        <g onClick={() => onSelectZone(zones[1])}>
          <rect x="380" y="40" width="180" height="90" rx="6" className={zoneStyle('A-VIP')} />
          <text x="470" y="82" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="600">
            VIP Lounge
          </text>
          <text x="470" y="102" textAnchor="middle" fill="#526075" fontSize="10">
            60 Delegates
          </text>
        </g>

        <g onClick={() => onSelectZone(zones[2])}>
          <rect x="580" y="40" width="180" height="90" rx="6" className={zoneStyle('A-BIZ')} />
          <text x="670" y="82" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="600">
            Business Lounge
          </text>
          <text x="670" y="102" textAnchor="middle" fill="#526075" fontSize="10">
            80 Delegates
          </text>
        </g>

        <g onClick={() => onSelectZone(zones[3])}>
          <rect x="380" y="145" width="380" height="85" rx="6" className={zoneStyle('A-NET')} />
          <text x="570" y="185" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="600">
            Central Networking Atrium
          </text>
          <text x="570" y="205" textAnchor="middle" fill="#526075" fontSize="10">
            Founder &amp; Investor Check-in Corridor
          </text>
        </g>

        <g onClick={() => onSelectZone(zones[4])}>
          <rect x="40" y="250" width="320" height="190" rx="6" className={zoneStyle('A-MEET')} />
          <text x="200" y="274" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="600">
            PRIVATE MEETING ROOMS (M1 – M6)
          </text>
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const col = idx % 3;
            const row = Math.floor(idx / 3);
            const rx = 56 + col * 98;
            const ry = 290 + row * 70;
            return (
              <g key={idx}>
                <rect x={rx} y={ry} width="86" height="56" rx="4" fill="#0c121d" fillOpacity="0.05" stroke="#0f172a" strokeOpacity="0.3" />
                <text x={rx + 43} y={ry + 32} textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="600">
                  M{idx + 1}
                </text>
              </g>
            );
          })}
        </g>

        <g onClick={() => onSelectZone(zones[5])}>
          <rect x="380" y="250" width="380" height="190" rx="6" className={zoneStyle('A-BOOTHS')} />
          <text x="570" y="274" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="600">
            EXHIBITION &amp; PARTNER BOOTHS (20 BOOTHS)
          </text>
          {booths.map((num, idx) => {
            const col = idx % 5;
            const row = Math.floor(idx / 5);
            const bx = 398 + col * 70;
            const by = 290 + row * 36;
            return (
              <g key={num}>
                <rect x={bx} y={by} width="60" height="28" rx="3" fill="#c49a45" fillOpacity="0.22" stroke="#8a5d14" strokeWidth="0.8" />
                <text x={bx + 30} y={by + 18} textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600">
                  B{String(num).padStart(2, '0')}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    );
  }

  const boothsB = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <svg
      id="svg-floorplan-b"
      viewBox="0 0 800 480"
      className="w-full h-auto rounded-xl border border-[#e4dfd5] bg-white"
      role="img"
      aria-label="Layout B exhibition-focused hall architectural diagram"
    >
      <rect x="0" y="0" width="800" height="480" fill="#fafaf8" />
      <rect x="20" y="20" width="760" height="440" fill="none" stroke="#0c121d" strokeWidth="1.5" />

      <g onClick={() => onSelectZone(zones[1])}>
        <rect x="40" y="40" width="460" height="260" rx="6" className={zoneStyle('B-EXPO')} />
        <text x="270" y="64" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="600">
          EXHIBITION ZONE — 30 LABELLED BOOTHS (E01 – E30)
        </text>
        {boothsB.map((num, idx) => {
          const col = idx % 6;
          const row = Math.floor(idx / 6);
          const bx = 56 + col * 72;
          const by = 82 + row * 41;
          return (
            <g key={num}>
              <rect x={bx} y={by} width="62" height="31" rx="3" fill="#c49a45" fillOpacity="0.24" stroke="#8a5d14" strokeWidth="0.8" />
              <text x={bx + 31} y={by + 19} textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600">
                E{String(num).padStart(2, '0')}
              </text>
            </g>
          );
        })}
      </g>

      <g onClick={() => onSelectZone(zones[0])}>
        <rect x="520" y="40" width="240" height="170" rx="6" className={zoneStyle('B-STAGE')} />
        <rect x="544" y="54" width="192" height="30" rx="4" fill="#0c121d" />
        <text x="640" y="73" textAnchor="middle" fill="#e6c67e" fontSize="11.5" fontWeight="600">
          MAIN STAGE · 250 SEATS
        </text>
        <text x="640" y="130" textAnchor="middle" fill="#334155" fontSize="11">
          Pitch &amp; Keynote Auditorium
        </text>
      </g>

      <g onClick={() => onSelectZone(zones[3])}>
        <rect x="520" y="224" width="240" height="76" rx="6" className={zoneStyle('B-VIP')} />
        <text x="640" y="260" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="600">
          VIP Lounge
        </text>
        <text x="640" y="278" textAnchor="middle" fill="#526075" fontSize="10">
          50 Delegates
        </text>
      </g>

      <g onClick={() => onSelectZone(zones[2])}>
        <rect x="40" y="316" width="350" height="124" rx="6" className={zoneStyle('B-MEET')} />
        <text x="215" y="340" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="600">
          MEETING ROOMS (R1 – R4)
        </text>
        {[1, 2, 3, 4].map((num, idx) => {
          const rx = 56 + idx * 80;
          return (
            <g key={num}>
              <rect x={rx} y="356" width="70" height="66" rx="4" fill="#0c121d" fillOpacity="0.05" stroke="#0f172a" strokeOpacity="0.3" />
              <text x={rx + 35} y="393" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="600">
                R{num}
              </text>
            </g>
          );
        })}
      </g>

      <g onClick={() => onSelectZone(zones[4])}>
        <rect x="410" y="316" width="350" height="124" rx="6" className={zoneStyle('B-FOOD')} />
        <text x="585" y="372" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="600">
          Food Court &amp; Hospitality Lounge
        </text>
        <text x="585" y="394" textAnchor="middle" fill="#526075" fontSize="10">
          180 Seated · All-Day Catering
        </text>
      </g>
    </svg>
  );
}

export function VenueFloorPlans() {
  const [viewMode, setViewMode] = useState<'both' | 'A' | 'B'>('both');
  const [selectedZone, setSelectedZone] = useState<FloorPlanZone | null>(LAYOUT_A_ZONES[0]);
  const [modalVariant, setModalVariant] = useState<'A' | 'B' | null>(null);

  const visibleZones =
    viewMode === 'B'
      ? LAYOUT_B_ZONES
      : viewMode === 'A'
      ? LAYOUT_A_ZONES
      : [...LAYOUT_A_ZONES, ...LAYOUT_B_ZONES];

  const downloadSvg = (variant: 'A' | 'B') => {
    const el = document.getElementById(variant === 'A' ? 'svg-floorplan-a' : 'svg-floorplan-b');
    if (!el) return;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(el);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `investor-meet-500-layout-${variant.toLowerCase()}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-1 p-1 rounded-lg border border-[#e4dfd5] bg-white">
          {[
            { key: 'both', label: 'Compare both' },
            { key: 'A', label: 'Layout A · Meetings' },
            { key: 'B', label: 'Layout B · Expo' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              aria-pressed={viewMode === tab.key}
              onClick={() => {
                const next = tab.key as 'both' | 'A' | 'B';
                setViewMode(next);
                if (next === 'B') setSelectedZone(LAYOUT_B_ZONES[0]);
                else if (next === 'A') setSelectedZone(LAYOUT_A_ZONES[0]);
              }}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                viewMode === tab.key
                  ? 'bg-[#0c121d] text-[#e6c67e]'
                  : 'text-[#334155] hover:text-[#0f172a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {selectedZone && (
          <div className="px-4 py-2 rounded-lg border border-[#e4dfd5] bg-white text-xs text-[#334155] flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#8a5d14] shrink-0" aria-hidden="true" />
            <span>
              <strong className="text-[#0f172a]">{selectedZone.label}</strong> ({selectedZone.capacity}) —{' '}
              {selectedZone.purpose}
            </span>
          </div>
        )}
      </div>

      {/* Quick Zone Index */}
      <div className="flex flex-wrap gap-2">
        {visibleZones.map((zone) => {
          const active = selectedZone?.id === zone.id;
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => setSelectedZone(zone)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                active
                  ? 'bg-[#0c121d] text-[#e6c67e] border-[#0c121d]'
                  : 'bg-white text-[#334155] border-[#e4dfd5] hover:border-[#8a5d14]'
              }`}
            >
              {zone.label}
            </button>
          );
        })}
      </div>

      <div
        className={`grid gap-6 ${
          viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {(viewMode === 'both' || viewMode === 'A') && (
          <article className="rounded-2xl border border-[#e4dfd5] bg-white p-6 space-y-4">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a5d14]">
                Layout A
              </span>
              <h3 className="font-display text-2xl font-semibold text-[#0f172a] mt-1">
                Layout A — Meeting-focused hall
              </h3>
              <p className="text-sm text-[#526075] mt-1">
                Six private meeting rooms (M1–M6), 20 exhibition booths, 250-seat stage, and VIP &amp;
                business lounges.
              </p>
            </div>

            <FloorPlanSvg
              variant="A"
              selectedZoneId={selectedZone?.id ?? null}
              onSelectZone={setSelectedZone}
            />

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setModalVariant('A')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#cfc8b8] hover:border-[#0f172a] text-xs font-semibold text-[#0f172a] cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Inspect Full-Size</span>
              </button>
              <button
                type="button"
                onClick={() => downloadSvg('A')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#cfc8b8] hover:border-[#0f172a] text-xs font-semibold text-[#0f172a] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Download SVG</span>
              </button>
            </div>
          </article>
        )}

        {(viewMode === 'both' || viewMode === 'B') && (
          <article className="rounded-2xl border border-[#e4dfd5] bg-white p-6 space-y-4">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a5d14]">
                Layout B
              </span>
              <h3 className="font-display text-2xl font-semibold text-[#0f172a] mt-1">
                Layout B — Exhibition-focused hall
              </h3>
              <p className="text-sm text-[#526075] mt-1">
                Expanded 30 exhibition booths (E01–E30), 4 deal rooms (R1–R4), main auditorium
                stage, VIP lounge, and delegate dining.
              </p>
            </div>

            <FloorPlanSvg
              variant="B"
              selectedZoneId={selectedZone?.id ?? null}
              onSelectZone={setSelectedZone}
            />

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => setModalVariant('B')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#cfc8b8] hover:border-[#0f172a] text-xs font-semibold text-[#0f172a] cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Inspect Full-Size</span>
              </button>
              <button
                type="button"
                onClick={() => downloadSvg('B')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#cfc8b8] hover:border-[#0f172a] text-xs font-semibold text-[#0f172a] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Download SVG</span>
              </button>
            </div>
          </article>
        )}
      </div>

      {modalVariant && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Full size Layout ${modalVariant} floor plan`}
          className="fixed inset-0 z-50 bg-[#090e17]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div className="bg-white rounded-2xl max-w-5xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-2xl font-semibold text-[#0f172a]">
                {modalVariant === 'A'
                  ? 'Layout A — Meeting-focused hall'
                  : 'Layout B — Exhibition-focused hall'}
              </h3>
              <button
                type="button"
                onClick={() => setModalVariant(null)}
                aria-label="Close floor plan modal"
                className="w-9 h-9 rounded-lg border border-[#e4dfd5] flex items-center justify-center text-[#0f172a] hover:bg-[#fafaf8] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <FloorPlanSvg
              variant={modalVariant}
              selectedZoneId={selectedZone?.id ?? null}
              onSelectZone={setSelectedZone}
            />
            {selectedZone && (
              <p className="text-sm text-[#334155]">
                <strong>{selectedZone.label}:</strong> {selectedZone.purpose} ({selectedZone.capacity})
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
