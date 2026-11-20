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
} from '../data/homeAndPrograms';
import { PageHero } from '../components/PageHero';
import { CtaBanner } from '../components/CtaBanner';
import { VenueFloorPlans } from '../components/VenueFloorPlans';
import {
  ExpandablePanel,
  InteractiveCard,
  MagneticAction,
} from '../components/MotionPrimitives';
import { Link } from '../lib/router';

export function TracksPage() {
  const [selectedId, setSelectedId] = useState(INVESTMENT_TRACKS[0].id);
  const [ticketLakhs, setTicketLakhs] = useState(250);
  const reduced = useReducedMotion();
  const activeTrack =
    INVESTMENT_TRACKS.find((t) => t.id === selectedId) ?? INVESTMENT_TRACKS[0];

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
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
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

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-12">
        {/* Interactive Ticket Sizing Strip */}
        <div className="bg-white rounded-2xl border border-[#e4dfd5] p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8a5d14]">
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>INTERACTIVE FUNDING MANDATE ESTIMATOR</span>
            </div>
            <p className="text-sm text-[#334155]">
              Preview funding scale alignment before submitting your application:{' '}
              <strong className="font-mono text-[#0f172a]">{displayTicket}</strong> →{' '}
              <span className="font-medium text-[#8a5d14]">{recommendedHall}</span>
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
              className="flex-1 accent-[#0c121d] cursor-pointer"
            />
            <span className="font-mono text-xs text-[#526075]">₹50Cr+</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left selector */}
          <div className="lg:col-span-5 space-y-3" role="tablist" aria-label="Investment tracks">
            {INVESTMENT_TRACKS.map((track) => {
              const active = track.id === activeTrack.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedId(track.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                    active
                      ? 'bg-[#0c121d] border-[#0c121d] text-[#f8f7f3] shadow-sm'
                      : 'bg-white border-[#e4dfd5] hover:border-[#8a5d14]/50 text-[#0f172a]'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-semibold pt-1 shrink-0 ${
                      active ? 'text-[#e6c67e]' : 'text-[#8a5d14]'
                    }`}
                  >
                    {track.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2
                      className={`font-display text-2xl font-semibold leading-tight ${
                        active ? 'text-[#e6c67e]' : 'text-[#0f172a]'
                      }`}
                    >
                      {track.title}
                    </h2>
                    <p
                      className={`mt-1 text-xs font-medium ${
                        active ? 'text-[#cbd5e1]' : 'text-[#526075]'
                      }`}
                    >
                      {track.lead} {track.subline}
                    </p>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 mt-1 shrink-0 ${
                      active ? 'text-[#e6c67e]' : 'text-[#94a3b8]'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          {/* Right active track detail (Architectural Typography — No Stock Photo) */}
          <div
            role="tabpanel"
            className="lg:col-span-7 bg-white rounded-2xl border border-[#e4dfd5] overflow-hidden"
          >
            <motion.div
              key={activeTrack.id}
              initial={reduced ? false : { opacity: 0.94, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="relative h-48 sm:h-56 bg-[#0c121d] text-[#f8f7f3] border-b border-white/10 overflow-hidden group">
                  <img
                    src={activeTrack.image}
                    alt={activeTrack.imageAlt}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-center hero-image-enhanced interactive-media"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0c121d] via-[#0c121d]/75 to-[#0c121d]/25"
                  />
                  <div className="relative h-full flex flex-col justify-end px-6 sm:px-8 py-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#e6c67e]">
                        TRACK {activeTrack.number} · {recommendedHall}
                      </span>
                      <span className="font-mono text-xs text-[#cbd5e1]">Cutoff: 1 Feb 2027</span>
                    </div>
                    <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-white">
                      {activeTrack.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <p className="font-display text-2xl font-semibold text-[#0f172a]">
                      {activeTrack.lead}{' '}
                      <span className="text-[#8a5d14]">{activeTrack.subline}</span>
                    </p>
                    <p className="mt-3 text-sm sm:text-base text-[#334155] leading-relaxed">
                      {activeTrack.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#e4dfd5]">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#8a5d14] mb-3">
                      Eligibility &amp; Validation Readiness
                    </h3>
                    <ul className="space-y-2.5">
                      {activeTrack.eligibility.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-sm text-[#0f172a]"
                        >
                          <Check
                            className="w-4 h-4 text-[#8a5d14] mt-0.5 shrink-0"
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
                        className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold whitespace-nowrap"
                      >
                        <span>Apply for {activeTrack.title}</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </MagneticAction>
                    <Link
                      href="/registration"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#cfc8b8] hover:border-[#0f172a] text-sm font-medium text-[#0f172a] transition-colors whitespace-nowrap"
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
            { icon: Users, value: '500 participants', label: 'Planned event scale across three halls' },
            { icon: Building2, value: '3 halls', label: 'Hall 1, Hall 2 & Hall 3 allocation' },
            { icon: Clock, value: '8 AM – 6 PM', label: 'Full-day curated pitch & deal sessions' },
            { icon: Landmark, value: '₹50 Lakhs – ₹500 Crore', label: 'Target capital funding scope' },
          ].map((stat) => (
            <InteractiveCard
              key={stat.value}
              className="rounded-xl p-5 flex items-start gap-3"
            >
              <stat.icon className="w-5 h-5 text-[#8a5d14] mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <div className="font-display text-xl font-semibold text-[#0f172a]">{stat.value}</div>
                <p className="text-xs text-[#526075] mt-1">{stat.label}</p>
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
  const activeTier =
    SPONSORSHIP_TIERS.find((t) => t.id === selectedTierId) ?? SPONSORSHIP_TIERS[0];

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="SPONSORS & PARTNERS"
        title="Sponsorship Tiers & Institutional Outreach."
        subtitle="Proposed sponsorship tiers and planned brand outreach for Investor Meet 500 on 20 February 2027 in Chennai. All deliverables are subject to written agreement."
        ctaLabel="Inquire about Sponsorship"
        ctaHref="/contact?subject=Sponsorship"
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="mb-8">
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
            PROPOSED SPONSORSHIP TIERS
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0f172a]">
            Select a Sponsorship Tier to Inspect Deliverables
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {SPONSORSHIP_TIERS.map((tier, idx) => {
              const active = tier.id === activeTier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTierId(tier.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    active
                      ? 'bg-[#0c121d] border-[#0c121d] text-[#f8f7f3]'
                      : 'bg-white border-[#e4dfd5] hover:border-[#8a5d14]/50 text-[#0f172a]'
                  }`}
                >
                  <div>
                    <div
                      className={`text-[11px] font-mono uppercase tracking-wider ${
                        active ? 'text-[#e6c67e]' : 'text-[#8a5d14]'
                      }`}
                    >
                      TIER 0{idx + 1}
                    </div>
                    <div className="font-display text-2xl font-semibold mt-0.5">{tier.name}</div>
                  </div>
                  <div
                    className={`font-mono text-xl font-semibold tabular-nums ${
                      active ? 'text-[#e6c67e]' : 'text-[#8a5d14]'
                    }`}
                  >
                    {tier.amount}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e4dfd5] p-6 sm:p-8">
            <motion.div
              key={activeTier.id}
              initial={reduced ? false : { opacity: 0.94, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="flex flex-wrap items-baseline justify-between gap-4 pb-5 border-b border-[#e4dfd5]">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#8a5d14]">
                      PROPOSED DELIVERABLES
                    </p>
                    <h3 className="font-display text-3xl sm:text-4xl font-semibold text-[#0f172a] mt-1">
                      {activeTier.name}
                    </h3>
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-[#0c121d] text-[#e6c67e] font-mono text-xl font-semibold tabular-nums">
                    {activeTier.amount}
                  </div>
                </div>

                <ol className="mt-6 space-y-3">
                  {activeTier.deliverables.map((item, idx) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-[#334155] leading-relaxed"
                    >
                      <span className="font-mono text-xs font-semibold text-[#8a5d14] mt-0.5 shrink-0">
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

      {/* Partners & Planned Outreach (Clean Typographic Directory — Zero Boxed Logo Walls) */}
      <section
        id="partners"
        className="bg-[#0c121d] text-[#f8f7f3] border-y border-white/10 py-14 sm:py-16"
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
            <InteractiveCard dark className="rounded-xl p-6">
              <h3 className="font-display text-2xl font-semibold text-[#e6c67e]">
                Central Government
              </h3>
              <p className="mt-2 text-sm text-[#cbd5e1] leading-relaxed">
                Invest India, ITPO, Startup India, Ministry of Finance, and Ministry of MSME —
                public policy context and official scheme portals.
              </p>
              <Link
                href="/government"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#e6c67e] hover:underline"
              >
                <span>View Government Resources</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </InteractiveCard>

            <InteractiveCard dark className="rounded-xl p-6">
              <h3 className="font-display text-2xl font-semibold text-[#e6c67e]">
                Tamil Nadu Organisations
              </h3>
              <p className="mt-2 text-sm text-[#cbd5e1] leading-relaxed">
                Guidance Tamil Nadu, StartupTN, TIDCO, TIIC, Tamil Nadu MSME, plus TANSTIA,
                CODISSIA, AIEMA, CREDAI, SICCI and TEA.
              </p>
              <Link
                href="/associations"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#e6c67e] hover:underline"
              >
                <span>View 15 Associations</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </InteractiveCard>

            <InteractiveCard dark className="rounded-xl p-6">
              <h3 className="font-display text-2xl font-semibold text-[#e6c67e]">
                Banking Outreach
              </h3>
              <p className="mt-2 text-sm text-[#cbd5e1] leading-relaxed">
                Structured outreach spanning 120 RBI-recognised banks across SBI &amp; Nationalised,
                Domestic Private, Small Finance, Rural and Foreign banks.
              </p>
              <Link
                href="/banks"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#e6c67e] hover:underline"
              >
                <span>View 120 Banks in India</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </InteractiveCard>
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
                  className="px-3.5 py-2.5 rounded-lg border border-white/10 bg-[#0c121d] hover:border-[#c49a45] flex items-center justify-between gap-2 text-xs text-[#f8f7f3] transition-colors"
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
        <div className="bg-white rounded-2xl border border-[#e4dfd5] p-6 sm:p-8">
          <h2 className="font-display text-3xl font-semibold text-[#0f172a]">Sponsorship Terms</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#334155] leading-relaxed">
            <div>
              <h3 className="font-semibold text-[#0f172a] mb-1">1. Written Confirmation</h3>
              <p>
                All sponsorship commitments, hall display dimensions, and pass allocations take
                effect only after signing a formal written sponsorship agreement.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#0f172a] mb-1">2. No Implied Endorsement</h3>
              <p>
                Sponsor presence does not constitute organiser endorsement of any financial
                product, lending terms, or equity offering presented at the venue.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#0f172a] mb-1">3. Creative &amp; Deadline Cutoff</h3>
              <p>
                Logos, print assets, and stage messaging must be submitted in high-resolution vector
                format prior to the 1 February 2027 print lock deadline.
              </p>
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
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="REGISTRATION OPTIONS"
        title="Draft Registration Amount Options."
        subtitle="Nine draft fee options prepared by the organiser for internal structuring and participant selection enquiry. Online payment gateway checkout is not enabled on this preview."
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-8">
        <div className="rounded-xl border border-[#c49a45]/40 bg-white p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#8a5d14] mt-0.5 shrink-0" aria-hidden="true" />
          <div className="text-sm text-[#334155] leading-relaxed">
            <strong className="font-semibold text-[#0f172a]">Important Notice:</strong> Online
            card/UPI payment processing is not active on this website. The amounts below (₹10,000
            to ₹50,000 across 9 options) represent the organiser’s draft registration fee ladder.
            Click any option to inspect comparison details or pre-fill an enquiry.
          </div>
        </div>

        {/* Active Option Summary Strip */}
        <div className="bg-[#0c121d] text-[#f8f7f3] rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#e6c67e]">
              SELECTED DRAFT TIER · OPTION {activePayment.optionNumber} OF 09
            </span>
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-3xl font-semibold text-white">
                {activePayment.formattedAmount}
              </h2>
              <span className="text-xs text-[#cbd5e1]">{activePayment.summary}</span>
            </div>
            <p className="text-xs text-[#94a3b8]">{activePayment.comparison}</p>
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
              className="px-4 py-2.5 rounded-lg border border-white/20 hover:border-[#e6c67e] text-xs font-semibold text-white whitespace-nowrap"
            >
              Apply Now
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PAYMENT_OPTIONS.map((opt) => {
            const isSelected = selectedOption === opt.optionNumber;
            return (
              <InteractiveCard
                key={opt.optionNumber}
                dark={isSelected}
                onClick={() => setSelectedOption(opt.optionNumber)}
                className="rounded-xl p-6 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                        isSelected ? 'text-[#e6c67e]' : 'text-[#8a5d14]'
                      }`}
                    >
                      OPTION {String(opt.optionNumber).padStart(2, '0')} OF 09
                    </span>
                    {isSelected && (
                      <span className="text-xs font-semibold text-[#e6c67e] inline-flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" aria-hidden="true" /> Selected
                      </span>
                    )}
                  </div>

                  <div
                    className={`mt-4 font-mono text-3xl font-semibold tabular-nums ${
                      isSelected ? 'text-white' : 'text-[#0f172a]'
                    }`}
                  >
                    {opt.formattedAmount}
                  </div>

                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      isSelected ? 'text-[#cbd5e1]' : 'text-[#334155]'
                    }`}
                  >
                    {opt.summary}
                  </p>
                  <p
                    className={`mt-2 text-xs leading-relaxed ${
                      isSelected ? 'text-[#94a3b8]' : 'text-[#526075]'
                    }`}
                  >
                    {opt.comparison}
                  </p>
                </div>

                <div
                  className={`mt-6 pt-4 border-t flex items-center justify-between gap-3 ${
                    isSelected ? 'border-white/15' : 'border-[#e4dfd5]'
                  }`}
                >
                  <Link
                    href={`/contact?subject=${encodeURIComponent(`Registration Option ${opt.optionNumber} (${opt.formattedAmount})`)}`}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                      isSelected ? 'text-[#e6c67e]' : 'text-[#8a5d14]'
                    } hover:underline`}
                  >
                    <span>Enquire Option {opt.optionNumber}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/apply"
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg border ${
                      isSelected
                        ? 'border-white/20 text-white hover:border-[#e6c67e]'
                        : 'border-[#e4dfd5] text-[#0f172a] hover:border-[#8a5d14]'
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
    <div className="bg-[#fafaf8] text-[#0f172a]">
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
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
            CHENNAI VENUE PLANNING
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0f172a] mb-6">
            Current Venue &amp; Schedule Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <InteractiveCard className="rounded-xl p-6">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#8a5d14]">
                <Building2 className="w-4 h-4" aria-hidden="true" />
                <span>HOTEL</span>
              </div>
              <div className="mt-2 font-display text-2xl font-semibold text-[#0f172a]">Pending</div>
              <p className="mt-1 text-xs text-[#526075]">
                Five-star Chennai convention hotel contract under final evaluation.
              </p>
            </InteractiveCard>
            <InteractiveCard className="rounded-xl p-6">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#8a5d14]">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>ADDRESS</span>
              </div>
              <div className="mt-2 font-display text-2xl font-semibold text-[#0f172a]">Pending</div>
              <p className="mt-1 text-xs text-[#526075]">
                Confirmed street address and gate entry notes will be published upon venue lock.
              </p>
            </InteractiveCard>
            <InteractiveCard className="rounded-xl p-6">
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
            </InteractiveCard>
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
            INTERACTIVE ARCHITECTURAL DIAGRAMS
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0f172a] mb-6">
            Draft Hall Floor Plans (Layout A &amp; Layout B)
          </h2>
          <VenueFloorPlans />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#e4dfd5] p-6 sm:p-8">
            <h3 className="font-display text-2xl font-semibold text-[#0f172a]">Event Basics</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#334155]">
              <li className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-[#8a5d14] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Planned attendance capped at 500 validated participants across tracks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Network className="w-4 h-4 text-[#8a5d14] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Three functional halls supporting plenaries, track pitches, and private deal rooms.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#8a5d14] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Dedicated validation, badge access, and crowd management support teams.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-[#e4dfd5] p-6 sm:p-8">
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
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a5d14] hover:underline"
              >
                <span>Inspect Full Timetable</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
