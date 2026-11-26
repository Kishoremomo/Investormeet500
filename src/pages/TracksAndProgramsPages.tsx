import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Building2,
  Calendar,
  Check,
  Clock,
  ExternalLink,
  Info,
  Landmark,
  MapPin,
  Network,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import {
  INVESTMENT_TRACKS,
  MEDIA_ASSETS,
  PARTNERS_MARQUEE,
  PAYMENT_OPTIONS,
  SPONSORSHIP_TIERS,
  TRACKS_TERM_EXPLANATION,
} from '../data/homeAndPrograms';
import {
  ORGANISER_NOTIFICATION_EMAIL,
  REFERENCE_COMPLETED_COUNT,
  REFERENCE_PENDING_COUNT,
  REGISTRATION_CUTOFF_DATE_CODE,
  REGISTRATION_STRATEGY,
} from '../lib/domain';
import { PageHero } from '../components/PageHero';
import { CtaBanner } from '../components/CtaBanner';
import { ImageCard } from '../components/ImageCard';
import { VenueFloorPlans } from '../components/VenueFloorPlans';
import {
  ExpandablePanel,
  InteractiveCard,
  MagneticAction,
} from '../components/MotionPrimitives';
import { Link, useQueryParam } from '../lib/router';

const TRACK_ACCENT_MAP: Record<string, string> = {
  startups: '#1d4ed8',
  'business-loan': '#0d9488',
  'business-expansion': '#6d28d9',
  'bank-loans': '#0284c7',
  'mixed-loans': '#c49a45',
};

const TIER_ACCENTS = ['#c49a45', '#1d4ed8', '#0d9488', '#6d28d9', '#4338ca', '#0284c7'];

export function TracksPage() {
  const trackQuery = useQueryParam('track');
  const initialTrack =
    INVESTMENT_TRACKS.find((t) => t.id === trackQuery)?.id ?? INVESTMENT_TRACKS[0].id;
  const [selectedId, setSelectedId] = useState(initialTrack);
  const [ticketLakhs, setTicketLakhs] = useState(250);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (trackQuery && INVESTMENT_TRACKS.some((t) => t.id === trackQuery)) {
      setSelectedId(trackQuery);
    }
  }, [trackQuery]);

  const activeTrack =
    INVESTMENT_TRACKS.find((t) => t.id === selectedId) ?? INVESTMENT_TRACKS[0];
  const activeAccent = TRACK_ACCENT_MAP[activeTrack.id] ?? '#1d4ed8';

  const displayTicket =
    ticketLakhs >= 100
      ? `₹${(ticketLakhs / 100).toFixed(ticketLakhs % 100 === 0 ? 0 : 1)} Crore`
      : `₹${ticketLakhs} Lakhs`;

  const recommendedHall =
    activeTrack.id === 'startups'
      ? 'Hall 1 · Plenary & Angels'
      : activeTrack.id === 'bank-loans' || activeTrack.id === 'business-loan'
      ? 'Hall 2 · Banking & Credit Desks'
      : 'Hall 3 · Expansion & Syndication';

  return (
    <div className="bg-white text-[#0f172a]">
      <PageHero
        theme="white"
        kicker="INVESTOR MEET 500 · INVESTMENT TRACKS"
        title="Five Investment Pathways."
        subtitle="Select your primary capital or business objective — Startups, Business Loan, Business Expansion, Bank Loans, or Mixed Loans — for committee validation and hall allocation."
        image={MEDIA_ASSETS.startupInnovationAtrium}
        imageAlt="Indian startup innovation atrium at the Chennai investment summit"
        ctaLabel="Start your application"
        ctaHref="/apply"
        stats={[
          { value: '500', label: 'Participants' },
          { value: '3', label: 'Halls' },
          { value: '8 AM – 6 PM', label: 'Event Hours' },
          { value: '₹50L – ₹500Cr', label: 'Funding Scope' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-10 bg-white">
        {/* Crisp White Editorial Explanation Callout */}
        <div className="bg-white rounded-2xl border border-[#e4dfd5] shadow-sm overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#1d4ed8] via-[#4338ca] to-[#0d9488]" aria-hidden="true" />
          <div className="p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-4xl">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#1d4ed8]">
                TERMINOLOGY CLARITY · HOW PATHWAYS WORK
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#091326]">
                {TRACKS_TERM_EXPLANATION.heading}
              </h2>
              <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                {TRACKS_TERM_EXPLANATION.summary}
              </p>
            </div>
            <div className="shrink-0 bg-[#f8fafc] border border-[#e4dfd5] rounded-xl px-5 py-4 space-y-1">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#526075]">
                Summit &amp; Cutoff Dates
              </div>
              <div className="font-mono text-sm font-bold text-[#091326]">
                Summit: 20-02-2027
              </div>
              <div className="font-mono text-xs font-semibold text-[#1d4ed8]">
                Cutoff: {REGISTRATION_CUTOFF_DATE_CODE}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Ticket Sizing Strip */}
        <div className="bg-white rounded-2xl border border-[#e4dfd5] shadow-sm overflow-hidden">
          <div className="h-1 w-full bg-[#0d9488]" aria-hidden="true" />
          <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1d4ed8]">
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>INTERACTIVE FUNDING MANDATE ESTIMATOR</span>
            </div>
            <p className="text-sm text-[#334155]">
              Preview funding scale alignment before submitting your application:{' '}
              <strong className="font-mono text-[#091326]">{displayTicket}</strong> →{' '}
              <span className="font-semibold text-[#0d9488]">{recommendedHall}</span>
            </p>
          </div>
          <div className="flex items-center gap-4 min-w-[260px] lg:w-80">
            <span className="font-mono text-xs text-[#526075]">₹50L</span>
            <input
              type="range"
              aria-label="Target funding scope in Lakhs"
              min={50}
              max={5000}
              step={50}
              value={ticketLakhs}
              onChange={(e) => setTicketLakhs(Number(e.target.value))}
              className="flex-1 accent-[#1d4ed8] cursor-pointer"
            />
            <span className="font-mono text-xs text-[#526075]">₹50Cr+</span>
          </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left selector (White editorial clean cards) */}
          <div className="lg:col-span-5 space-y-3" role="tablist" aria-label="Investment tracks">
            {INVESTMENT_TRACKS.map((track) => {
              const active = track.id === activeTrack.id;
              const accent = TRACK_ACCENT_MAP[track.id] ?? '#1d4ed8';
              return (
                <button
                  key={track.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedId(track.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 relative overflow-hidden ${
                    active
                      ? 'bg-[#f8fafc] border-[#091326] text-[#091326] shadow-md ring-1 ring-[#091326]/15'
                      : 'bg-white border-[#e4dfd5] hover:border-[#1d4ed8]/60 text-[#0f172a]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="w-1.5 absolute inset-y-0 left-0"
                    style={{ backgroundColor: accent }}
                  />
                  <span
                    className="font-mono text-xs font-semibold pt-1 shrink-0 pl-1"
                    style={{ color: accent }}
                  >
                    {track.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-2xl font-semibold leading-tight text-[#091326]">
                      {track.title}
                    </h2>
                    <p className="mt-1 text-xs font-medium text-[#526075]">
                      {track.lead} {track.subline}
                    </p>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 mt-1 shrink-0 ${
                      active ? 'text-[#091326]' : 'text-[#94a3b8]'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          {/* Right active track detail (White template) */}
          <div
            role="tabpanel"
            className="lg:col-span-7 bg-white rounded-2xl border border-[#e4dfd5] shadow-sm overflow-hidden"
          >
            <motion.div
              key={activeTrack.id}
              initial={reduced ? false : { opacity: 0.94, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="h-1.5 w-full" style={{ backgroundColor: activeAccent }} aria-hidden="true" />
              <div className="relative h-48 sm:h-56 bg-[#f8fafc] border-b border-[#e4dfd5] overflow-hidden group">
                <img
                  src={activeTrack.image}
                  alt={activeTrack.imageAlt}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center hero-image-enhanced interactive-media"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent"
                />
                <div className="relative h-full flex flex-col justify-end px-6 sm:px-8 py-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: activeAccent }}>
                      TRACK {activeTrack.number} · {recommendedHall}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#091326]">Cutoff: {REGISTRATION_CUTOFF_DATE_CODE}</span>
                  </div>
                  <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#091326]">
                    {activeTrack.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6 bg-white">
                <div>
                  <p className="font-display text-2xl font-semibold text-[#0f172a]">
                    {activeTrack.lead}{' '}
                    <span style={{ color: activeAccent }}>{activeTrack.subline}</span>
                  </p>

                  {/* Explicit Track Meaning & Ideal For */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-[#e4dfd5] bg-[#fafaf8] p-4">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1d4ed8] block">
                        TRACK MEANING
                      </span>
                      <p className="mt-1 text-xs sm:text-sm text-[#334155] leading-relaxed">
                        {activeTrack.meaning}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d9488] block">
                        IDEAL PARTICIPANTS
                      </span>
                      <p className="mt-1 text-xs sm:text-sm text-[#334155] leading-relaxed">
                        {activeTrack.idealFor}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-[#334155] leading-relaxed">
                    {activeTrack.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#e4dfd5]">
                  <h3
                    className="font-mono text-xs font-semibold uppercase tracking-[0.14em] mb-3"
                    style={{ color: activeAccent }}
                  >
                    Eligibility &amp; Validation Readiness
                  </h3>
                  <ul className="space-y-2.5">
                    {activeTrack.eligibility.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-[#0f172a]"
                      >
                        <Check
                          className="w-4 h-4 mt-0.5 shrink-0 text-[#0d9488]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <ExpandablePanel
                  kicker="VALIDATION PROTOCOL"
                  title="Inspect Document & Committee Checklist"
                >
                  Prepared pitch summaries should outline incorporation standing, historical
                  project metrics, audited or provisional turnover, capital deployment schedule,
                  and key risk mitigants prior to committee hall allocation.
                </ExpandablePanel>

                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <MagneticAction strength={3}>
                    <Link
                      href={`/apply?track=${encodeURIComponent(activeTrack.title)}`}
                      className="btn-obsidian inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold whitespace-nowrap"
                    >
                      <span>Apply for {activeTrack.title}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </MagneticAction>
                  <Link
                    href="/registration"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#cfc8b8] hover:border-[#1d4ed8] text-sm font-medium text-[#0f172a] transition-colors whitespace-nowrap"
                  >
                    <span>Category Registration</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom 4-stat bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, color: '#1d4ed8', value: '500 participants', label: 'Planned event scale across three halls' },
            { icon: Building2, color: '#6d28d9', value: '3 halls', label: 'Hall 1, Hall 2 & Hall 3 allocation' },
            { icon: Clock, color: '#0d9488', value: '8 AM – 6 PM', label: 'Full-day curated pitch & deal sessions' },
            { icon: Landmark, color: '#c49a45', value: '₹50 Lakhs – ₹500 Crore', label: 'Target capital funding scope' },
          ].map((stat) => (
            <InteractiveCard
              key={stat.value}
              className="rounded-xl overflow-hidden flex flex-col justify-between bg-white"
            >
              <div className="h-1 w-full" style={{ backgroundColor: stat.color }} aria-hidden="true" />
              <div className="p-5 flex items-start gap-3">
                <stat.icon
                  className="w-5 h-5 mt-0.5 shrink-0"
                  style={{ color: stat.color }}
                  aria-hidden="true"
                />
                <div>
                  <div className="font-display text-xl font-semibold text-[#0f172a]">{stat.value}</div>
                  <p className="text-xs text-[#526075] mt-1">{stat.label}</p>
                </div>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

export function SponsorsPage() {
  const [selectedTierId, setSelectedTierId] = useState(SPONSORSHIP_TIERS[0].id);
  const reduced = useReducedMotion();
  const activeTierIndex = Math.max(
    0,
    SPONSORSHIP_TIERS.findIndex((t) => t.id === selectedTierId)
  );
  const activeTier = SPONSORSHIP_TIERS[activeTierIndex] ?? SPONSORSHIP_TIERS[0];
  const activeTierAccent = TIER_ACCENTS[activeTierIndex % TIER_ACCENTS.length];

  return (
    <div className="bg-[#f8fafc] text-[#0f172a]">
      <PageHero
        theme="platinum"
        kicker="SPONSORS & PARTNERS · 10 DELIVERABLES PER TIER"
        title="Sponsorship Tiers & Institutional Outreach."
        subtitle="Six structured sponsorship levels (₹20 Lakhs to ₹2 Lakhs), each backed by 10 defined deliverables for Investor Meet 500 on 20-02-2027 in Chennai."
        image={MEDIA_ASSETS.dealLoungeChennai}
        imageAlt="Indian founders and corporate sponsors interacting at Chennai hotel summit lounge"
        ctaLabel="Inquire about Sponsorship"
        ctaHref="/contact?subject=Sponsorship"
        stats={[
          { value: '6 Tiers', label: 'Sponsorship Levels' },
          { value: '10 Points', label: 'Per Tier' },
          { value: '20-02-2027', label: 'Chennai Summit' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#1d4ed8] mb-2">
              PROPOSED SPONSORSHIP TIERS · 10 DELIVERABLES EACH
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0f172a]">
              Select a Sponsorship Tier to Inspect All 10 Deliverables
            </h2>
          </div>
          <span className="font-mono text-xs font-semibold text-[#526075]">
            Creative Lock Cutoff: {REGISTRATION_CUTOFF_DATE_CODE}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {SPONSORSHIP_TIERS.map((tier, idx) => {
              const active = tier.id === activeTier.id;
              const tierColor = TIER_ACCENTS[idx % TIER_ACCENTS.length];
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 relative overflow-hidden ${
                    active
                      ? 'bg-gradient-to-r from-[#091326] to-[#172554] border-[#091326] text-[#f8f7f3] shadow-md'
                      : 'bg-white border-[#e4dfd5] hover:border-[#1d4ed8]/60 text-[#0f172a]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="w-1.5 absolute inset-y-0 left-0"
                    style={{ backgroundColor: tierColor }}
                  />
                  <div className="pl-1">
                    <div
                      className="text-[11px] font-mono uppercase tracking-wider font-semibold"
                      style={{ color: active ? '#e6c67e' : tierColor }}
                    >
                      TIER 0{idx + 1} · {tier.deliverables.length} DELIVERABLES
                    </div>
                    <div className="font-display text-2xl font-semibold mt-0.5">{tier.name}</div>
                  </div>
                  <div
                    className="font-mono text-xl font-semibold tabular-nums"
                    style={{ color: active ? '#e6c67e' : tierColor }}
                  >
                    {tier.amount}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e4dfd5] shadow-sm overflow-hidden">
            <div className="h-1.5 w-full" style={{ backgroundColor: activeTierAccent }} aria-hidden="true" />
            <motion.div
              key={activeTier.id}
              initial={reduced ? false : { opacity: 0.94, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b border-[#e4dfd5]">
                <div>
                  <p
                    className="font-mono text-xs font-semibold uppercase tracking-[0.16em]"
                    style={{ color: activeTierAccent }}
                  >
                    10 PROPOSED DELIVERABLES · {activeTier.name.toUpperCase()}
                  </p>
                  <h3 className="font-display text-3xl sm:text-4xl font-semibold text-[#0f172a] mt-1">
                    {activeTier.name}
                  </h3>
                </div>
                <div className="px-4 py-2 rounded-lg bg-[#091326] text-[#e6c67e] font-mono text-xl font-semibold tabular-nums">
                  {activeTier.amount}
                </div>
              </div>

              <ol className="mt-6 space-y-3">
                {activeTier.deliverables.map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-[#334155] leading-relaxed"
                  >
                    <span
                      className="font-mono text-xs font-semibold mt-0.5 shrink-0"
                      style={{ color: activeTierAccent }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-8 pt-6 border-t border-[#e4dfd5] flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-[#526075] max-w-md">
                  Deliverables listed above are draft proposals and will be formalised in a written
                  sponsorship agreement prior to invoicing.
                </p>
                <Link
                  href={`/contact?subject=${encodeURIComponent(`Sponsorship Inquiry — ${activeTier.name} (${activeTier.amount})`)}`}
                  className="btn-obsidian inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold whitespace-nowrap"
                >
                  <span>Request Sponsor Deck</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners & Planned Outreach */}
      <section
        id="partners"
        className="bg-[#091326] text-[#f8f7f3] border-y border-white/10 py-14 sm:py-16"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#e6c67e] mb-2">
              OUTREACH &amp; REFERENCE ENTITIES
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
              Government, Banking &amp; Corporate Outreach
            </h2>
            <p className="mt-3 text-sm text-[#cbd5e1] leading-relaxed">
              The event plan identifies public policy agencies, RBI-recognised banks, and major
              industrial groups for structured outreach. Listing does not imply endorsement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ImageCard
              variant="dark"
              accentColor="#1d4ed8"
              image={MEDIA_ASSETS.chennaiSummitHall}
              imageAlt="Main plenary convention auditorium for central public policy and institutional dialogues"
              overlayLabel="01 · NATIONAL POLICY DESKS"
              kicker="PUBLIC SECTOR OUTREACH"
              title="Central Government"
              description="Invest India, ITPO, Startup India, Ministry of Finance, and Ministry of MSME — public policy context and official scheme portals."
              href="/government"
              footer={
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e6c67e]">
                  <span>View Government Resources</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              }
            />

            <ImageCard
              variant="dark"
              accentColor="#0d9488"
              image={MEDIA_ASSETS.tnIndustrialPark}
              imageAlt="Modern Tamil Nadu precision engineering and clean-tech manufacturing campus"
              overlayLabel="02 · STATE & INDUSTRIAL CHAMBERS"
              kicker="REGIONAL ECOSYSTEM"
              title="Tamil Nadu Organisations"
              description="Guidance Tamil Nadu, StartupTN, TIDCO, TIIC, Tamil Nadu MSME, plus TANSTIA, CODISSIA, AIEMA, CREDAI, SICCI and TEA."
              href="/associations"
              footer={
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e6c67e]">
                  <span>View 15 Associations</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              }
            />

            <ImageCard
              variant="dark"
              accentColor="#c49a45"
              image={MEDIA_ASSETS.msmeCreditBoardroom}
              imageAlt="Indian banking credit committee boardroom session"
              overlayLabel="03 · SCHEDULED LENDING NETWORK"
              kicker="INSTITUTIONAL CREDIT"
              title="Banking Outreach"
              description="Structured outreach spanning 120 RBI-recognised banks across SBI & Nationalised, Domestic Private, Small Finance, Rural and Foreign banks."
              href="/banks"
              footer={
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e6c67e]">
                  <span>View 120 Banks in India</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              }
            />
          </div>

          <div className="rounded-xl border border-white/12 bg-[#111927] p-6">
            <h3 className="font-display text-xl font-semibold text-white mb-4">
              Named Corporate Groups Referenced in Outreach Plan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {PARTNERS_MARQUEE.map((p, idx) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-lg border border-white/10 bg-[#091326] hover:border-[#1d4ed8] flex items-center justify-between gap-2 text-xs text-[#f8f7f3] transition-colors"
                >
                  <span className="truncate">
                    <span className="font-mono text-[10px] text-[#e6c67e] mr-2">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {p.fullName}
                  </span>
                  <ExternalLink className="w-3 h-3 text-[#94a3b8] shrink-0" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="bg-white rounded-2xl border border-[#e4dfd5] p-6 sm:p-8 shadow-sm">
          <h2 className="font-display text-3xl font-semibold text-[#0f172a]">Sponsorship Terms</h2>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5 text-sm text-[#334155] leading-relaxed">
            <div className="rounded-xl border border-[#e4dfd5] bg-[#fafaf8] overflow-hidden">
              <div className="h-1 w-full bg-[#1d4ed8]" aria-hidden="true" />
              <div className="p-5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1d4ed8]">
                  CLAUSE 01
                </span>
                <h3 className="mt-1 font-semibold text-[#0f172a] mb-1.5">Written Confirmation</h3>
                <p>
                  All sponsorship commitments, hall display dimensions, and pass allocations take
                  effect only after signing a formal written sponsorship agreement.
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-[#e4dfd5] bg-[#fafaf8] overflow-hidden">
              <div className="h-1 w-full bg-[#0d9488]" aria-hidden="true" />
              <div className="p-5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0d9488]">
                  CLAUSE 02
                </span>
                <h3 className="mt-1 font-semibold text-[#0f172a] mb-1.5">No Implied Endorsement</h3>
                <p>
                  Sponsor presence does not constitute organiser endorsement of any financial
                  product, lending terms, or equity offering presented at the venue.
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-[#e4dfd5] bg-[#fafaf8] overflow-hidden">
              <div className="h-1 w-full bg-[#6d28d9]" aria-hidden="true" />
              <div className="p-5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#6d28d9]">
                  CLAUSE 03
                </span>
                <h3 className="mt-1 font-semibold text-[#0f172a] mb-1.5">Creative &amp; Deadline Cutoff</h3>
                <p>
                  Logos, print assets, and stage messaging must be submitted in high-resolution vector
                  format prior to the 1 February 2027 ({REGISTRATION_CUTOFF_DATE_CODE}) print lock deadline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

export function PaymentsPage() {
  const [selectedOption, setSelectedOption] = useState(PAYMENT_OPTIONS[0].optionNumber);
  const activePayment =
    PAYMENT_OPTIONS.find((p) => p.optionNumber === selectedOption) ?? PAYMENT_OPTIONS[0];

  return (
    <div className="bg-[#f4fbf8] text-[#0f172a]">
      <PageHero
        theme="emerald"
        kicker="REGISTRATION OPTIONS · 9 TIERS × 5 POINTS"
        title="Draft Registration Fee Structure."
        subtitle="Nine structured fee options (₹10,000 to ₹50,000) with five explicit scope points per tier. Registrations follow the Available slots only policy ahead of 01-02-2027."
        image={MEDIA_ASSETS.cfoAuditBriefing}
        imageAlt="Senior finance officers inspecting fee schedules and summit readiness checklists"
        stats={[
          { value: '9 Tiers', label: '₹10K – ₹50K' },
          { value: String(REFERENCE_COMPLETED_COUNT), label: 'Completed' },
          { value: String(REFERENCE_PENDING_COUNT), label: 'Pending' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-8">
        <div className="rounded-xl border border-[#0d9488]/30 bg-white p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#0d9488] mt-0.5 shrink-0" aria-hidden="true" />
            <div className="text-sm text-[#334155] leading-relaxed">
              <strong className="font-semibold text-[#0f172a]">
                Registration Strategy: {REGISTRATION_STRATEGY}:
              </strong>{' '}
              Online card/UPI payment gateway checkout is not enabled on this preview. Reference
              allocation tracks <strong>Completed – {REFERENCE_COMPLETED_COUNT}</strong> and{' '}
              <strong>Pending – {REFERENCE_PENDING_COUNT}</strong> seats ahead of the{' '}
              <strong>{REGISTRATION_CUTOFF_DATE_CODE}</strong> cutoff, with enquiry alerts logged to{' '}
              <span className="font-mono text-xs text-[#091326]">{ORGANISER_NOTIFICATION_EMAIL}</span>.
            </div>
          </div>
          <Link
            href="/apply"
            className="btn-obsidian inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0"
          >
            <span>Apply Available Slot</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Active Option Summary Strip */}
        <div className="bg-gradient-to-r from-[#042f2e] via-[#064e3b] to-[#0f766e] text-[#f0fdfa] rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md border border-white/10">
          <div className="space-y-1">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#6ee7b7]">
              SELECTED OPTION {activePayment.optionNumber} OF 09 · {activePayment.tierLabel.toUpperCase()}
            </span>
            <div className="flex flex-wrap items-baseline gap-4">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tabular-nums">
                {activePayment.formattedAmount}
              </h2>
              <span className="text-sm text-[#ccfbf1]">{activePayment.focus}</span>
            </div>
            <p className="text-xs text-[#99f6e4]">{activePayment.comparison}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href={`/contact?subject=${encodeURIComponent(`Registration Option ${activePayment.optionNumber} (${activePayment.formattedAmount})`)}`}
              className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap"
            >
              <span>Enquire Option {activePayment.optionNumber}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/apply"
              className="px-4 py-2.5 rounded-lg border border-white/25 hover:border-[#6ee7b7] text-xs font-semibold text-white whitespace-nowrap transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>

        {/* 9 Payment Options — ALL 5 points visible inside every single card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAYMENT_OPTIONS.map((opt, idx) => {
            const isSelected = selectedOption === opt.optionNumber;
            const accentColor = TIER_ACCENTS[idx % TIER_ACCENTS.length];
            return (
              <InteractiveCard
                key={opt.optionNumber}
                dark={isSelected}
                onClick={() => setSelectedOption(opt.optionNumber)}
                className={`rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isSelected ? '!bg-gradient-to-br from-[#042f2e] to-[#064e3b]' : 'bg-white'
                }`}
              >
                <div className="h-1.5 w-full" style={{ backgroundColor: accentColor }} aria-hidden="true" />
                <div className="p-6 flex-1 space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="font-mono text-xs font-bold uppercase tracking-wider"
                        style={{ color: isSelected ? '#6ee7b7' : accentColor }}
                      >
                        OPTION {opt.optionNumber} OF 09
                      </span>
                      {isSelected ? (
                        <span className="text-xs font-semibold text-[#6ee7b7] inline-flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" aria-hidden="true" /> Selected
                        </span>
                      ) : (
                        <span className="font-mono text-[11px] font-medium text-[#526075]">
                          {opt.tierLabel}
                        </span>
                      )}
                    </div>

                    <div
                      className={`mt-3 font-mono text-3xl font-bold tabular-nums ${
                        isSelected ? 'text-white' : 'text-[#091326]'
                      }`}
                    >
                      {opt.formattedAmount}
                    </div>
                    <p
                      className={`mt-1 text-xs font-semibold ${
                        isSelected ? 'text-[#e6c67e]' : 'text-[#0d9488]'
                      }`}
                    >
                      {opt.tierLabel} · {opt.focus}
                    </p>
                  </div>

                  {/* All 5 points visibly displayed */}
                  <ul
                    className={`pt-4 border-t space-y-2.5 text-xs sm:text-[13px] leading-relaxed ${
                      isSelected ? 'border-white/15 text-[#ccfbf1]' : 'border-[#e4dfd5] text-[#334155]'
                    }`}
                  >
                    {opt.points.map((point, pIdx) => (
                      <li key={point} className="flex items-start gap-2">
                        <span
                          className={`font-mono text-[11px] font-bold shrink-0 mt-0.5 ${
                            isSelected ? 'text-[#6ee7b7]' : 'text-[#0d9488]'
                          }`}
                        >
                          0{pIdx + 1}.
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`mx-6 mb-6 pt-4 border-t flex items-center justify-between gap-3 ${
                    isSelected ? 'border-white/15' : 'border-[#e4dfd5]'
                  }`}
                >
                  <Link
                    href={`/contact?subject=${encodeURIComponent(`Registration Option ${opt.optionNumber} (${opt.formattedAmount})`)}`}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      isSelected ? 'text-[#e6c67e]' : 'text-[#1d4ed8]'
                    } hover:underline`}
                  >
                    <span>Enquire Option {opt.optionNumber}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/apply"
                    className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg border ${
                      isSelected
                        ? 'border-white/25 text-white hover:border-[#6ee7b7]'
                        : 'border-[#e4dfd5] text-[#0f172a] hover:border-[#1d4ed8]'
                    }`}
                  >
                    Apply
                  </Link>
                </div>
              </InteractiveCard>
            );
          })}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

export function VenuePage() {
  return (
    <div className="bg-[#f8fafc] text-[#0f172a]">
      <PageHero
        kicker="VENUE & EVENT MAP"
        title="Chennai Venue Planning & Hall Blueprints."
        subtitle="Three coordinated halls hosting 500 verified participants on 20 February 2027. Inspect interactive architectural layouts A and B and stall capacities."
        image={MEDIA_ASSETS.chennaiSummitHall}
        imageAlt="Chennai summit convention auditorium prepared for 500 participants"
        photoCredit="Final five-star Chennai convention hotel contract pending venue lock."
        ctaLabel="View Event Schedule"
        ctaHref="/schedule"
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-12">
        <div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#1d4ed8] mb-2">
            CHENNAI VENUE PLANNING
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0f172a] mb-6">
            Current Venue &amp; Schedule Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InteractiveCard className="rounded-xl overflow-hidden bg-white">
              <div className="h-1 w-full bg-[#1d4ed8]" aria-hidden="true" />
              <div className="p-6">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#1d4ed8]">
                  <Building2 className="w-4 h-4" aria-hidden="true" />
                  <span>HOTEL</span>
                </div>
                <div className="mt-2 font-display text-2xl font-semibold text-[#0f172a]">Pending</div>
                <p className="mt-1 text-xs text-[#526075]">
                  Five-star Chennai convention hotel contract under final evaluation.
                </p>
              </div>
            </InteractiveCard>
            <InteractiveCard className="rounded-xl overflow-hidden bg-white">
              <div className="h-1 w-full bg-[#0d9488]" aria-hidden="true" />
              <div className="p-6">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#0d9488]">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span>ADDRESS</span>
                </div>
                <div className="mt-2 font-display text-2xl font-semibold text-[#0f172a]">Pending</div>
                <p className="mt-1 text-xs text-[#526075]">
                  Confirmed street address and gate entry notes will be published upon venue lock.
                </p>
              </div>
            </InteractiveCard>
            <InteractiveCard className="rounded-xl overflow-hidden bg-white">
              <div className="h-1 w-full bg-[#c49a45]" aria-hidden="true" />
              <div className="p-6">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#8a5d14]">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>DATE</span>
                </div>
                <div className="mt-2 font-display text-2xl font-semibold text-[#0f172a]">
                  20 February 2027
                </div>
                <p className="mt-1 text-xs text-[#526075]">
                  8:00 AM – 6:00 PM IST · Chennai, Tamil Nadu.
                </p>
              </div>
            </InteractiveCard>
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#6d28d9] mb-2">
            OFFICIAL HALL LAYOUT DIAGRAMS &amp; ARCHITECTURAL SCHEMATICS
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0f172a] mb-6">
            Hall Floor Plans (Layout Map A &amp; Layout Map B)
          </h2>
          <VenueFloorPlans />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#e4dfd5] overflow-hidden shadow-xs">
            <div className="h-1 w-full bg-[#1d4ed8]" aria-hidden="true" />
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-[#0f172a]">Event Basics</h3>
              <ul className="mt-4 space-y-3 text-sm text-[#334155]">
                <li className="flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-[#1d4ed8] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Planned attendance capped at 500 validated participants across tracks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Network className="w-4 h-4 text-[#0d9488] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Three functional halls supporting plenaries, track pitches, and private deal rooms.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#6d28d9] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Dedicated validation, badge access, and crowd management support teams.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#e4dfd5] overflow-hidden shadow-xs">
            <div className="h-1 w-full bg-[#0d9488]" aria-hidden="true" />
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-[#0f172a]">
                Arrival &amp; Hall Allocation
              </h3>
              <p className="mt-3 text-sm text-[#334155] leading-relaxed">
                Approved applicants receive their specific Hall assignment (Hall 1, Hall 2, or Hall 3)
                and pitch slot window prior to event day. Check-in opens ahead of the 8:00 AM
                opening block; unvalidated walk-ins are not permitted in confidential deal rooms.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/schedule"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1d4ed8] hover:underline"
                >
                  <span>Inspect Full Timetable</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

