import React, { useState } from 'react';
import { Download, Layers, Maximize2, X } from 'lucide-react';

export interface FloorPlanZone {
  id: string;
  label: string;
  capacity: string;
  purpose: string;
}

export const HALL_DIAGRAM_IMAGES = {
  layoutA: {
    src: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_5.46.39_PM_30a68f27.jpeg',
    title: 'Layout Map A — More Meeting Rooms & 50% Audience Area',
    subtitle: '22 Private Meeting Rooms (15×15 ft), 20 Exhibition Booths (B1–B20), Main Stage (40×16 ft + Dual LED Screens) & 250-Delegate Seating (60×30 ft).',
    specs: [
      '22 Meeting Rooms (15 ft × 15 ft)',
      '20 Booths (B1–B20)',
      'Main Stage (40 ft × 16 ft) + 2 LED Screens',
      'Audience Seating (250 Delegates · 60 ft × 30 ft)',
      'VIP Lounge & Networking Area (20 ft × 20 ft each)',
      'Business Lounge & Food Court (30 ft × 20 ft each)',
      'Registration Desk (30×10 ft), Help & First Aid (10×10 ft)',
      'Media, Speaker Prep & Organiser Office (15×15 ft each)',
    ],
  },
  layoutB: {
    src: '/assets/aistudio/WhatsApp_Image_2026-11-25_at_5.46.38_PM_d4f2dec7.jpeg',
    title: 'Layout Map B — Expanded 30-Booth Exhibition Floor',
    subtitle: '30 Labelled Exhibition Booths (B1–B30 · 3m × 3m each), 19 Meeting Rooms (15×12 ft), Main Stage (40×16 ft) & 250-Delegate Auditorium (40×25 ft).',
    specs: [
      'Exhibition Area: 30 Booths (B1–B30 · 3m × 3m each)',
      '19 Meeting Rooms (15 ft × 12 ft)',
      'Main Stage (40 ft × 16 ft) + 2 LED Screens',
      'Audience Seating (250 Delegates · 40 ft × 25 ft)',
      'VIP Lounge & Networking Area (20 ft × 15 ft each)',
      'Food Court (30 ft × 20 ft)',
      'Help Desk & First Aid Room (12 ft × 10 ft each)',
      'Media, Speaker Prep & Organiser Office (15×12 ft each)',
    ],
  },
} as const;

const LAYOUT_A_ZONES: FloorPlanZone[] = [
  { id: 'A-STAGE', label: 'Main Stage & 50% Audience Area', capacity: '250 Seated · 60×30 ft', purpose: '40×16 ft Main Stage with dual LED screens for keynotes, AI Experts & CFO plenaries' },
  { id: 'A-VIP', label: 'VIP & Investor Lounge', capacity: '20×20 ft', purpose: 'Private refreshments and curated investor-founder introductions' },
  { id: 'A-BIZ', label: 'Business Lounge & Food Court', capacity: '30×20 ft each', purpose: 'Pre-scheduled validation follow-ups and delegate hospitality dining' },
  { id: 'A-NET', label: 'Networking Atrium', capacity: '20×20 ft', purpose: 'Open founder, scheduled bank & industry association networking' },
  { id: 'A-MEET', label: '22 Private Meeting Rooms (M1–M22)', capacity: '22 Rooms · 15×15 ft', purpose: 'One-to-one confidential investor, corporate & bank loan discussions' },
  { id: 'A-BOOTHS', label: '20 Exhibition Booths (B01–B20)', capacity: '20 Stalls', purpose: 'Sponsor, corporate, financial brand and startup showcase desks' },
];

const LAYOUT_B_ZONES: FloorPlanZone[] = [
  { id: 'B-STAGE', label: 'Main Stage & 250-Seat Plenary', capacity: '250 Seated · 40×25 ft', purpose: '40×16 ft stage with dual LED screens for pitches, panels and closing updates' },
  { id: 'B-EXPO', label: '30 Exhibition Booths (B1–B30)', capacity: '30 Stalls · 3m × 3m', purpose: 'Expanded exhibition grid across B1–B30 for corporates, banks & startups' },
  { id: 'B-MEET', label: '19 Meeting Rooms (R1–R19)', capacity: '19 Rooms · 15×12 ft', purpose: 'Structured deal-room perimeter encircling the main exhibition floor' },
  { id: 'B-VIP', label: 'VIP Lounge & Networking Area', capacity: '20×15 ft each', purpose: 'Chief Guests, institutional leads and executive networking corridor' },
  { id: 'B-FOOD', label: 'Food Court & Organiser Support Wing', capacity: '30×20 ft Food Court', purpose: 'All-day catering plus Media, Speaker Prep, Organiser Office, Help & First Aid' },
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
        aria-label="Layout A interactive zone schematic"
      >
        <rect x="0" y="0" width="800" height="480" fill="#fafaf8" />
        <rect x="20" y="20" width="760" height="440" fill="none" stroke="#0c121d" strokeWidth="1.5" />

        <g onClick={() => onSelectZone(zones[0])}>
          <rect x="40" y="40" width="320" height="190" rx="6" className={zoneStyle('A-STAGE')} />
          <rect x="90" y="54" width="220" height="32" rx="4" fill="#0c121d" />
          <text x="200" y="75" textAnchor="middle" fill="#e6c67e" fontSize="12" fontWeight="600">
            MAIN STAGE (40×16) · 250 SEATS
          </text>
          <text x="200" y="135" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="500">
            Plenary Audience Seating Grid (60×30 ft)
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
            20 ft × 20 ft
          </text>
        </g>

        <g onClick={() => onSelectZone(zones[2])}>
          <rect x="580" y="40" width="180" height="90" rx="6" className={zoneStyle('A-BIZ')} />
          <text x="670" y="82" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="600">
            Business &amp; Food
          </text>
          <text x="670" y="102" textAnchor="middle" fill="#526075" fontSize="10">
            30 ft × 20 ft Zones
          </text>
        </g>

        <g onClick={() => onSelectZone(zones[3])}>
          <rect x="380" y="145" width="380" height="85" rx="6" className={zoneStyle('A-NET')} />
          <text x="570" y="185" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="600">
            Networking Atrium &amp; Registration Wing
          </text>
          <text x="570" y="205" textAnchor="middle" fill="#526075" fontSize="10">
            Networking 20×20 ft · Registration 30×10 ft · Help &amp; First Aid
          </text>
        </g>

        <g onClick={() => onSelectZone(zones[4])}>
          <rect x="40" y="250" width="320" height="190" rx="6" className={zoneStyle('A-MEET')} />
          <text x="200" y="274" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="600">
            22 PRIVATE MEETING ROOMS (15×15 ft)
          </text>
          {[0, 1, 2, 3, 4, 5].map((idx) => {
            const col = idx % 3;
            const row = Math.floor(idx / 3);
            const rx = 56 + col * 98;
            const ry = 290 + row * 70;
            const labels = ['M1–M4', 'M5–M8', 'M9–M12', 'M13–M16', 'M17–M19', 'M20–M22'];
            return (
              <g key={idx}>
                <rect x={rx} y={ry} width="86" height="56" rx="4" fill="#0c121d" fillOpacity="0.05" stroke="#0f172a" strokeOpacity="0.3" />
                <text x={rx + 43} y={ry + 32} textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="600">
                  {labels[idx]}
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
      aria-label="Layout B interactive zone schematic"
    >
      <rect x="0" y="0" width="800" height="480" fill="#fafaf8" />
      <rect x="20" y="20" width="760" height="440" fill="none" stroke="#0c121d" strokeWidth="1.5" />

      <g onClick={() => onSelectZone(zones[1])}>
        <rect x="40" y="40" width="460" height="260" rx="6" className={zoneStyle('B-EXPO')} />
        <text x="270" y="64" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="600">
          EXHIBITION ZONE — 30 LABELLED BOOTHS (B1 – B30 · 3m×3m)
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
                B{num}
              </text>
            </g>
          );
        })}
      </g>

      <g onClick={() => onSelectZone(zones[0])}>
        <rect x="520" y="40" width="240" height="170" rx="6" className={zoneStyle('B-STAGE')} />
        <rect x="544" y="54" width="192" height="30" rx="4" fill="#0c121d" />
        <text x="640" y="73" textAnchor="middle" fill="#e6c67e" fontSize="11.5" fontWeight="600">
          MAIN STAGE (40×16) · 250 SEATS
        </text>
        <text x="640" y="130" textAnchor="middle" fill="#334155" fontSize="11">
          Audience Seating (40×25 ft)
        </text>
      </g>

      <g onClick={() => onSelectZone(zones[3])}>
        <rect x="520" y="224" width="240" height="76" rx="6" className={zoneStyle('B-VIP')} />
        <text x="640" y="260" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="600">
          VIP &amp; Networking Lounges
        </text>
        <text x="640" y="278" textAnchor="middle" fill="#526075" fontSize="10">
          20 ft × 15 ft Each
        </text>
      </g>

      <g onClick={() => onSelectZone(zones[2])}>
        <rect x="40" y="316" width="350" height="124" rx="6" className={zoneStyle('B-MEET')} />
        <text x="215" y="340" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="600">
          19 MEETING ROOMS (15 ft × 12 ft)
        </text>
        {['M1–M5', 'M6–M10', 'M11–M15', 'M16–M19'].map((lbl, idx) => {
          const rx = 56 + idx * 80;
          return (
            <g key={lbl}>
              <rect x={rx} y="356" width="70" height="66" rx="4" fill="#0c121d" fillOpacity="0.05" stroke="#0f172a" strokeOpacity="0.3" />
              <text x={rx + 35} y="393" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="600">
                {lbl}
              </text>
            </g>
          );
        })}
      </g>

      <g onClick={() => onSelectZone(zones[4])}>
        <rect x="410" y="316" width="350" height="124" rx="6" className={zoneStyle('B-FOOD')} />
        <text x="585" y="372" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="600">
          Food Court (30×20 ft) &amp; Wing Desks
        </text>
        <text x="585" y="394" textAnchor="middle" fill="#526075" fontSize="10">
          Media, Speaker Prep, Organiser Office, Help &amp; First Aid
        </text>
      </g>
    </svg>
  );
}

export function VenueFloorPlans() {
  const [viewMode, setViewMode] = useState<'both' | 'A' | 'B'>('both');
  const [selectedZone, setSelectedZone] = useState<FloorPlanZone | null>(LAYOUT_A_ZONES[0]);
  const [modalContent, setModalContent] = useState<{ variant: 'A' | 'B'; mode: 'image' | 'svg' } | null>(null);

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
    <div className="space-y-8">
      {/* Switcher + Active Zone Inspector */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-1 p-1 rounded-lg border border-[#e4dfd5] bg-white">
          {[
            { key: 'both', label: 'Compare both' },
            { key: 'A', label: 'Layout A · 22 Meeting Rooms' },
            { key: 'B', label: 'Layout B · 30 Exhibition Booths' },
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

      {/* Official Architectural Hall Layout Diagrams (Provided Blueprint Renders) */}
      <div
        className={`grid gap-6 ${
          viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {(viewMode === 'both' || viewMode === 'A') && (
          <article className="rounded-2xl border border-[#e4dfd5] bg-white overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              <div className="h-1.5 w-full bg-gradient-to-r from-[#1d4ed8] to-[#091326]" />
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1d4ed8]">
                      ARCHITECTURAL HALL DIAGRAM · OPTION A
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-[#0f172a] mt-1">
                      {HALL_DIAGRAM_IMAGES.layoutA.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#526075] mt-1">
                      {HALL_DIAGRAM_IMAGES.layoutA.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalContent({ variant: 'A', mode: 'image' })}
                  className="block w-full rounded-xl overflow-hidden border border-[#e4dfd5] bg-[#fafaf8] group relative cursor-pointer"
                  aria-label="Enlarge Layout Map A architectural diagram"
                >
                  <img
                    src={HALL_DIAGRAM_IMAGES.layoutA.src}
                    alt={HALL_DIAGRAM_IMAGES.layoutA.title}
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0c121d]/90 text-[#e6c67e] text-xs font-semibold shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Zoom Full Diagram</span>
                  </span>
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {HALL_DIAGRAM_IMAGES.layoutA.specs.map((spec) => (
                    <div
                      key={spec}
                      className="rounded-lg border border-[#ece8df] bg-[#fafaf8] px-3 py-2 text-xs font-medium text-[#334155]"
                    >
                      {spec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        )}

        {(viewMode === 'both' || viewMode === 'B') && (
          <article className="rounded-2xl border border-[#e4dfd5] bg-white overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              <div className="h-1.5 w-full bg-gradient-to-r from-[#0d9488] to-[#091326]" />
              <div className="p-6 space-y-4">
                <div>
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0d9488]">
                    ARCHITECTURAL HALL DIAGRAM · OPTION B
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-[#0f172a] mt-1">
                    {HALL_DIAGRAM_IMAGES.layoutB.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#526075] mt-1">
                    {HALL_DIAGRAM_IMAGES.layoutB.subtitle}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setModalContent({ variant: 'B', mode: 'image' })}
                  className="block w-full rounded-xl overflow-hidden border border-[#e4dfd5] bg-[#fafaf8] group relative cursor-pointer"
                  aria-label="Enlarge Layout Map B architectural diagram"
                >
                  <img
                    src={HALL_DIAGRAM_IMAGES.layoutB.src}
                    alt={HALL_DIAGRAM_IMAGES.layoutB.title}
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0c121d]/90 text-[#e6c67e] text-xs font-semibold shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Zoom Full Diagram</span>
                  </span>
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {HALL_DIAGRAM_IMAGES.layoutB.specs.map((spec) => (
                    <div
                      key={spec}
                      className="rounded-lg border border-[#ece8df] bg-[#fafaf8] px-3 py-2 text-xs font-medium text-[#334155]"
                    >
                      {spec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        )}
      </div>

      {/* Quick Interactive Zone Index */}
      <div className="space-y-3">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d28d9] block">
          INTERACTIVE ZONE SCHEMATIC &amp; VECTOR EXPORT
        </span>
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
                Schematic A
              </span>
              <h3 className="font-display text-2xl font-semibold text-[#0f172a] mt-1">
                Layout A — Interactive Zone Schematic
              </h3>
              <p className="text-sm text-[#526075] mt-1">
                22 private meeting rooms (15×15 ft), 20 exhibition booths, 250-seat stage, and VIP &amp;
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
                onClick={() => setModalContent({ variant: 'A', mode: 'svg' })}
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
                Schematic B
              </span>
              <h3 className="font-display text-2xl font-semibold text-[#0f172a] mt-1">
                Layout B — Interactive Zone Schematic
              </h3>
              <p className="text-sm text-[#526075] mt-1">
                Expanded 30 exhibition booths (B1–B30 · 3m×3m), 19 meeting rooms (15×12 ft), main
                stage, VIP lounge, and delegate food court.
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
                onClick={() => setModalContent({ variant: 'B', mode: 'svg' })}
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

      {modalContent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Full size Layout ${modalContent.variant} floor plan`}
          className="fixed inset-0 z-50 bg-[#090e17]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[92vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#0f172a]">
                {modalContent.variant === 'A'
                  ? HALL_DIAGRAM_IMAGES.layoutA.title
                  : HALL_DIAGRAM_IMAGES.layoutB.title}
              </h3>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                aria-label="Close floor plan modal"
                className="w-9 h-9 rounded-lg border border-[#e4dfd5] flex items-center justify-center text-[#0f172a] hover:bg-[#fafaf8] cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {modalContent.mode === 'image' ? (
              <img
                src={
                  modalContent.variant === 'A'
                    ? HALL_DIAGRAM_IMAGES.layoutA.src
                    : HALL_DIAGRAM_IMAGES.layoutB.src
                }
                alt={
                  modalContent.variant === 'A'
                    ? HALL_DIAGRAM_IMAGES.layoutA.title
                    : HALL_DIAGRAM_IMAGES.layoutB.title
                }
                className="w-full h-auto rounded-xl border border-[#e4dfd5]"
              />
            ) : (
              <>
                <FloorPlanSvg
                  variant={modalContent.variant}
                  selectedZoneId={selectedZone?.id ?? null}
                  onSelectZone={setSelectedZone}
                />
                {selectedZone && (
                  <p className="text-sm text-[#334155]">
                    <strong>{selectedZone.label}:</strong> {selectedZone.purpose} ({selectedZone.capacity})
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
