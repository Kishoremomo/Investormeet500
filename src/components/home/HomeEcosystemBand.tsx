import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Building2,
  ExternalLink,
  Globe,
  Landmark,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import {
  CENTRAL_GOVT_RESOURCES,
  MEDIA_ASSETS,
  STATE_GOVT_RESOURCES,
} from '../../data/homeAndPrograms';
import {
  BANKS_120,
  CORPORATE_500_DIRECTORY,
  FEATURED_25_BRANDS,
} from '../../data/directories';
import { FEATURED_SHOWCASE_BANKS } from '../../data/logos';
import type { RegistrationRecord } from '../../lib/domain';
import { Link } from '../../lib/router';
import { InstitutionLogoMark } from '../BrandMark';
import {
  AnimatedCounter,
  InteractiveCard,
  ParallaxFrame,
  ScrollReveal,
} from '../MotionPrimitives';

type BankShowcaseTab = 'featured' | 'nationalised' | 'private' | 'foreign';
type CorpShowcaseTab = 'featured25' | 'tamilnadu' | 'national';

const INTERNATIONAL_CORRIDORS = [
  {
    code: 'CORRIDOR 01',
    title: 'Foreign Direct Investment (FDI)',
    summary:
      'Structuring inward institutional capital, greenfield manufacturing partnerships, and industrial corridor incentives across Tamil Nadu.',
    focus: 'Manufacturing · Mobility · Deep-Tech',
  },
  {
    code: 'CORRIDOR 02',
    title: 'International Joint Ventures',
    summary:
      'Pairing Indian precision-engineering and food-processing promoters with overseas technology licensors and market-access partners.',
    focus: 'Co-Manufacturing · IP Transfer · OEM Supply',
  },
  {
    code: 'CORRIDOR 03',
    title: 'Global Venture & Private Equity',
    summary:
      'Cross-border funds and family offices evaluating late-seed to expansion-stage Indian startups with validated unit economics.',
    focus: 'SaaS · Healthcare · Enterprise Capital',
  },
  {
    code: 'CORRIDOR 04',
    title: 'Import & Export Scale-Up',
    summary:
      'Dedicated working-capital credit lines, EXIM structuring, and trade association delegations across ASEAN, Middle East & European routes.',
    focus: 'Textiles · Auto Ancillaries · Agri-Exports',
  },
];

export function HomeEcosystemBand({
  liveRegistrations,
}: {
  liveRegistrations: RegistrationRecord[];
}) {
  const [bankTab, setBankTab] = useState<BankShowcaseTab>('featured');
  const [corpTab, setCorpTab] = useState<CorpShowcaseTab>('featured25');

  const liveCount = liveRegistrations.length;
  const approvedCount = liveRegistrations.filter((r) => r.validationStatus === 'Approved').length;
  const completedCount = 100 + liveCount;
  const pendingCount = Math.max(0, 500 - completedCount);
  const fillPercent = Math.min(100, Math.round((completedCount / 500) * 100));

  const displayedBanks = useMemo(() => {
    if (bankTab === 'featured') {
      return FEATURED_SHOWCASE_BANKS.slice(0, 12).map((name, idx) => ({
        serial: `RB-${String(idx + 1).padStart(2, '0')}`,
        name,
        category:
          idx < 8
            ? 'SBI & Nationalised'
            : idx < 17
            ? 'Domestic Private Sector'
            : 'Foreign Bank',
      }));
    }
    if (bankTab === 'nationalised') {
      return BANKS_120.filter((b) => b.category === 'SBI & Nationalised Banks').slice(0, 12);
    }
    if (bankTab === 'private') {
      return BANKS_120.filter((b) => b.category === 'Domestic Private Sector Banks').slice(0, 12);
    }
    return BANKS_120.filter(
      (b) =>
        b.category === 'Foreign banks in India' || b.category === 'Small Finance Banks'
    ).slice(0, 12);
  }, [bankTab]);

  const tnCorporates = useMemo(
    () =>
      CORPORATE_500_DIRECTORY.filter((c) =>
        ['Chennai', 'Coimbatore', 'Karur', 'Kumbakonam', 'Thoothukudi'].includes(c.headquarters)
      ).slice(0, 12),
    []
  );

  const nationalCorporates = useMemo(
    () => CORPORATE_500_DIRECTORY.slice(0, 12),
    []
  );

  return (
    <>
      {/* REGISTRATION TELEMETRY & AVAILABLE SEATS STRIP */}
      <section
        id="section-stats"
        aria-label="Registration statistics and available slots"
        className="bg-[#fafaf8] text-[#0f172a] py-14 sm:py-16 border-b border-[#e4dfd5]"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a5d14] mb-1.5">
                SEAT CAPACITY &amp; LIVE INTAKE TELEMETRY
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#091326]">
                500 Curated Seats · Available Slots Only
              </h2>
              <p className="mt-2 text-sm text-[#334155] leading-relaxed">
                Seat allocation enforces strict cohort sizing: 100 baseline slots completed with 400
                remaining seats screened strictly ahead of the 01-02-2027 deadline.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/admin/registrations"
                className="text-xs font-semibold text-[#1d4ed8] hover:underline whitespace-nowrap"
              >
                Open Admin Dashboard →
              </Link>
              <Link
                href="/apply"
                className="btn-obsidian inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap"
              >
                <span>Reserve Your Slot</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 border border-[#e4dfd5] rounded-2xl bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#e4dfd5] overflow-hidden">
              <div className="p-5 sm:p-6">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#526075] block">
                  TOTAL SUMMIT CAP
                </span>
                <strong className="mt-2 block font-mono text-3xl font-semibold text-[#091326] tabular-nums">
                  <AnimatedCounter value={500} />
                </strong>
                <span className="mt-1 block text-xs text-[#526075]">Halls 1, 2 &amp; 3</span>
              </div>
              <div className="p-5 sm:p-6">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#0f766e] block">
                  COMPLETED BASELINE
                </span>
                <strong className="mt-2 block font-mono text-3xl font-semibold text-[#0f766e] tabular-nums">
                  <AnimatedCounter value={completedCount} />
                </strong>
                <span className="mt-1 block text-xs text-[#526075]">
                  100 baseline + {liveCount} live intake
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#1d4ed8] block">
                  PENDING AVAILABLE
                </span>
                <strong className="mt-2 block font-mono text-3xl font-semibold text-[#1d4ed8] tabular-nums">
                  <AnimatedCounter value={pendingCount} />
                </strong>
                <span className="mt-1 block text-xs text-[#526075]">
                  Target 400 · {approvedCount} validated live
                </span>
              </div>
              <div className="p-5 sm:p-6">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#8a5d14] block">
                  FUNDING TICKETS
                </span>
                <strong className="mt-2 block font-mono text-2xl sm:text-3xl font-semibold text-[#091326] tabular-nums">
                  ₹50L+
                </strong>
                <span className="mt-1 block text-xs text-[#526075]">Up to ₹500 Crore scale</span>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-2xl border border-[#e4dfd5] bg-white p-6 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#091326]">
                  COHORT FILL PROGRESS
                </span>
                <span className="font-mono text-sm font-bold text-[#0f766e] tabular-nums">
                  {completedCount} / 500 ({fillPercent}%)
                </span>
              </div>
              <div
                className="w-full h-3 rounded-full bg-[#f1f5f9] overflow-hidden border border-[#e4dfd5]"
                role="progressbar"
                aria-valuenow={fillPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Summit seat occupancy"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#0f766e] via-[#1d4ed8] to-[#c49a45] transition-all duration-500"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
              <p className="text-xs text-[#334155] leading-relaxed">
                Allocation policy: <strong>Available slots only</strong>. Unvalidated submissions do
                not receive a Pitch Area pass.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BANKS IN INDIA SHOWCASE (RBI SCHEDULED DIRECTORY PREVIEW) */}
      <section
        id="section-banks"
        className="bg-white text-[#0f172a] py-16 sm:py-20 border-b border-[#e4dfd5]"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1d4ed8] mb-2">
                <Landmark className="w-3.5 h-3.5" aria-hidden="true" />
                <span>INSTITUTIONAL BANKING PAVILION · 120 RBI BANKS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#091326]">
                Banks in India &amp; Lending Desks
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#334155] leading-relaxed">
                Reference directory of Nationalised, Private Sector, Small Finance, Payments,
                Regional Rural, and Foreign Banks integrated across our Bank Loans and Mixed Loans
                tracks.
              </p>
            </div>

            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter showcased banks">
              {(
                [
                  { id: 'featured', label: 'Featured 12' },
                  { id: 'nationalised', label: 'Nationalised' },
                  { id: 'private', label: 'Private Sector' },
                  { id: 'foreign', label: 'Foreign & SFBs' },
                ] as const
              ).map((tab) => {
                const active = bankTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setBankTab(tab.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#091326] text-[#e6c67e]'
                        : 'bg-[#fafaf8] text-[#334155] border border-[#e4dfd5] hover:border-[#1d4ed8]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedBanks.map((bank) => (
              <InteractiveCard
                key={bank.name}
                className="rounded-xl p-4 flex flex-col justify-between gap-3 bg-[#fafaf8]"
              >
                <InstitutionLogoMark name={bank.name} size="md" />
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#e4dfd5] text-[11px]">
                  <span className="font-mono font-semibold text-[#1d4ed8]">{bank.serial}</span>
                  <span className="text-[#526075] truncate">{bank.category}</span>
                </div>
              </InteractiveCard>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#e4dfd5]">
            <p className="text-xs text-[#526075]">
              All 120 RBI-listed scheduled, rural, small finance, and foreign bank desks indexed for
              structured Bank Loan underwriting readiness.
            </p>
            <Link
              href="/banks"
              className="btn-obsidian inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap"
            >
              <span>Inspect All 120 Banks in India</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* TOP CORPORATE BRANDS & CORPORATE 500 PARTICIPATION */}
      <section
        id="section-corporate"
        className="bg-[#fafaf8] text-[#0f172a] py-16 sm:py-20 border-b border-[#e4dfd5]"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6d28d9] mb-2">
                <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>CORPORATE OUTREACH · 500+ ENTERPRISE DIRECTORY</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#091326]">
                Top Corporate Brands &amp; Industrial Buyers
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#334155] leading-relaxed">
                Bridging Tamil Nadu industrial conglomerates and listed NSE/BSE enterprises with
                B2B startups, supply-chain partners, and corporate venturing teams.
              </p>
            </div>

            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter corporate directory view">
              {(
                [
                  { id: 'featured25', label: 'Featured 25 Brands' },
                  { id: 'tamilnadu', label: 'Tamil Nadu HQ' },
                  { id: 'national', label: 'National Leaders' },
                ] as const
              ).map((tab) => {
                const active = corpTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCorpTab(tab.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#6d28d9] text-white'
                        : 'bg-white text-[#334155] border border-[#e4dfd5] hover:border-[#6d28d9]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {corpTab === 'featured25' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
              {FEATURED_25_BRANDS.slice(0, 15).map((brand, idx) => (
                <InteractiveCard
                  key={brand}
                  className="rounded-xl p-3.5 bg-white flex flex-col justify-between gap-2.5"
                >
                  <InstitutionLogoMark name={brand} size="sm" />
                  <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-[#e4dfd5]">
                    <span className="font-mono text-[10px] text-[#6d28d9] font-semibold">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] font-medium text-[#334155] truncate">{brand}</span>
                  </div>
                </InteractiveCard>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(corpTab === 'tamilnadu' ? tnCorporates : nationalCorporates).map((corp) => (
                <InteractiveCard
                  key={corp.rank + corp.symbol}
                  className="rounded-xl p-4 bg-white flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#6d28d9]">
                      #{String(corp.rank).padStart(3, '0')} · {corp.symbol}
                    </span>
                    <span className="text-[11px] text-[#526075]">{corp.headquarters}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#091326] leading-snug">
                    {corp.name}
                  </h3>
                  <p className="text-xs text-[#526075] pt-2 border-t border-[#e4dfd5]">
                    {corp.category}
                  </p>
                </InteractiveCard>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#e4dfd5]">
            <span className="text-xs text-[#526075]">
              Listed presence indicates outreach index scope, not implied event sponsorship.
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/financial-brands"
                className="text-xs font-semibold text-[#6d28d9] hover:underline"
              >
                Top 50 Financial Brands →
              </Link>
              <Link
                href="/corporate"
                className="btn-obsidian inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold"
              >
                <span>Explore 500+ Corporate Directory</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEPARATE CENTRAL GOVERNMENT SECTION */}
      <section
        id="section-central-govt"
        className="bg-[#091326] text-[#f8f7f3] py-16 sm:py-20 border-b border-white/10"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#93c5fd] mb-2">
                <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                <span>CENTRAL GOVERNMENT · UNION OF INDIA PORTALS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
                Central Government Investment Initiatives
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#cbd5e1] leading-relaxed">
                National investment facilitation agencies, Startup India registration portals, trade
                promotion authorities, and Central MSME policy schemes referenced across our decks.
              </p>
            </div>
            <Link
              href="/government#central"
              className="btn-gold inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap"
            >
              <span>Central Portals &amp; Guides</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CENTRAL_GOVT_RESOURCES.map((agency, idx) => (
              <a
                key={agency.name}
                href={agency.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full"
              >
                <InteractiveCard
                  dark
                  className="rounded-xl p-5 h-full flex flex-col justify-between gap-4 !bg-[#111927]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[10px] font-semibold text-[#93c5fd]">
                        GOI · 0{idx + 1}
                      </span>
                      <ExternalLink
                        className="w-3.5 h-3.5 text-[#93c5fd] opacity-75 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white group-hover:text-[#e6c67e] transition-colors">
                      {agency.name}
                    </h3>
                    <p className="mt-2 text-xs text-[#cbd5e1] leading-relaxed">
                      {agency.description}
                    </p>
                  </div>
                  <span className="pt-3 border-t border-white/10 font-mono text-[11px] text-[#e6c67e] flex items-center justify-between">
                    <span>Official Portal</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </InteractiveCard>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SEPARATE STATE GOVERNMENT (TAMIL NADU) SECTION */}
      <section
        id="section-state-govt"
        className="bg-[#f0fdfa] text-[#0f172a] py-16 sm:py-20 border-b border-[#ccfbf1]"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0f766e] mb-2">
                <Landmark className="w-3.5 h-3.5" aria-hidden="true" />
                <span>STATE GOVERNMENT · TAMIL NADU AGENCIES</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#091326]">
                Tamil Nadu State Government Initiatives
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#334155] leading-relaxed">
                Dedicated State industrial corporations, single-window clearances, StartupTN
                district hubs, and MSME term credit corporations supporting Chennai delegates.
              </p>
            </div>
            <Link
              href="/government#state"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#0f766e] hover:bg-[#0d9488] text-white text-xs font-semibold whitespace-nowrap transition-colors"
            >
              <span>State Government Directory</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {STATE_GOVT_RESOURCES.map((agency, idx) => (
              <a
                key={agency.name}
                href={agency.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full"
              >
                <InteractiveCard className="rounded-xl p-5 h-full flex flex-col justify-between gap-4 bg-white border-[#99f6e4] hover:border-[#0f766e]">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[10px] font-semibold text-[#0f766e]">
                        TN · 0{idx + 1}
                      </span>
                      <ExternalLink
                        className="w-3.5 h-3.5 text-[#0f766e] opacity-75 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#091326] group-hover:text-[#0f766e] transition-colors">
                      {agency.name}
                    </h3>
                    <p className="mt-2 text-xs text-[#334155] leading-relaxed">
                      {agency.description}
                    </p>
                  </div>
                  <span className="pt-3 border-t border-[#e4dfd5] font-mono text-[11px] text-[#0f766e] font-semibold flex items-center justify-between">
                    <span>Visit Nodal Desk</span>
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </InteractiveCard>
              </a>
            ))}
          </div>

          {/* Government Investment Guidance Summary Strip */}
          <div
            id="section-gov-guidance"
            className="rounded-2xl border border-[#99f6e4] bg-white p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-10 h-10 rounded-xl bg-[#0f766e] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                  GOVERNMENT INVESTMENT GUIDANCE BRIEFING
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#091326] mt-0.5">
                  Synchronise Subsidy, Single-Window &amp; Credit Schemes Before Pitching
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#334155] leading-relaxed">
                  Align central Udyam/DPIIT registrations and Tamil Nadu capital-subsidy schemes
                  ahead of your 90-day committee validation dossier.
                </p>
              </div>
            </div>
            <Link
              href="/government"
              className="btn-obsidian inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0"
            >
              <span>Open Full Govt Guidance</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* INTERNATIONAL INVESTMENT OPPORTUNITIES & CROSS-BORDER CORRIDORS */}
      <section
        id="section-international"
        className="bg-white text-[#0f172a] py-16 sm:py-20 border-b border-[#e4dfd5]"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1d4ed8]">
              <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
              <span>CROSS-BORDER CAPITAL · HALL 3 FDI DESKS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#091326]">
              International Investment &amp; Joint Venture Corridors
            </h2>
            <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
              Dedicated cross-border channels connecting overseas institutional investors, family
              offices, and global industrial groups with high-growth Indian ventures across four
              structured deal pathways.
            </p>

            <div className="rounded-2xl overflow-hidden border border-[#e4dfd5]">
              <ParallaxFrame offset={14} className="aspect-[16/10] bg-[#091326] relative">
                <img
                  src={MEDIA_ASSETS.globalFdiCorridor}
                  alt="International investment forum and cross-border joint venture delegates in Chennai"
                  className="w-full h-[112%] -mt-[6%] object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#091326]/80 via-transparent to-transparent"
                />
                <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#e6c67e]">
                  <span>4 INTERNATIONAL &amp; NATIONAL MANDATES</span>
                  <span>HALL 3 PAVILION</span>
                </div>
              </ParallaxFrame>
            </div>

            <Link
              href="/international"
              className="btn-obsidian inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold"
            >
              <span>Explore 40 International Programmes</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INTERNATIONAL_CORRIDORS.map((item) => (
              <InteractiveCard
                key={item.code}
                className="rounded-2xl p-6 bg-[#fafaf8] flex flex-col justify-between gap-4"
              >
                <div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1d4ed8] block mb-2">
                    {item.code}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[#091326] leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#334155] leading-relaxed">
                    {item.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#e4dfd5] flex items-center justify-between gap-2 text-[11px] font-mono text-[#526075]">
                  <span>{item.focus}</span>
                  <Link href="/international" className="text-[#1d4ed8] font-semibold hover:underline">
                    Details →
                  </Link>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
