import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Landmark,
  MapPin,
  Quote,
  RotateCcw,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import {
  ALL_DIRECTORY_ENTREPRENEURS,
  ASSOCIATIONS_15,
  BANKS_120,
  COIMBATORE_HUB_NOTE,
  CORPORATE_500_DIRECTORY,
  ENTREPRENEUR_CATEGORIES,
  ENTREPRENEUR_REGIONS,
  FEATURED_25_BRANDS,
  FINANCIAL_BRANDS_50,
  FINANCIAL_BRAND_CATEGORY_NOTES,
  WOMEN_ENTREPRENEURS,
} from '../data/directories';
import { MEDIA_ASSETS, VIDEO_ASSETS } from '../data/homeAndPrograms';
import { FEATURED_SHOWCASE_BANKS } from '../data/logos';
import { ORGANISER_CONTACT } from '../data/siteNavigation';
import {
  PARTICIPANT_HIGHLIGHTS,
  resolvePortraitUrl,
  type ParticipantProfileHighlight,
} from '../data/portraits';
import { filterDirectoryItems, getInitials, type InvestmentTrack, type RegistrationRecord } from '../lib/domain';
import { PageHero } from '../components/PageHero';
import { CtaBanner } from '../components/CtaBanner';
import { AvatarPortrait } from '../components/AvatarPortrait';
import { CinematicShowcaseVideo } from '../components/CinematicVideo';
import { InstitutionLogoMark } from '../components/BrandMark';
import {
  LeaderReferenceModal,
  ParticipantDossierModal,
  type DirectoryLeaderSummary,
} from '../components/ProfileModal';
import { ExpandablePanel, InteractiveCard, ScrollReveal } from '../components/MotionPrimitives';
import { Link } from '../lib/router';

function getSectorAccent(category: string): { bar: string; text: string; bgTint: string } {
  const lower = category.toLowerCase();
  if (lower.includes('tech') || lower.includes('ai') || lower.includes('fintech')) {
    return { bar: 'from-[#6d28d9] to-[#4338ca]', text: 'text-[#6d28d9]', bgTint: 'bg-[#f5f3ff]' };
  }
  if (lower.includes('health') || lower.includes('bio') || lower.includes('pharma')) {
    return { bar: 'from-[#0d9488] to-[#059669]', text: 'text-[#0f766e]', bgTint: 'bg-[#f0fdfa]' };
  }
  if (lower.includes('women') || lower.includes('beauty') || lower.includes('brand')) {
    return { bar: 'from-[#9333ea] to-[#6d28d9]', text: 'text-[#7e22ce]', bgTint: 'bg-[#faf5ff]' };
  }
  if (lower.includes('energy') || lower.includes('infra') || lower.includes('agro') || lower.includes('agri')) {
    return { bar: 'from-[#0284c7] to-[#0d9488]', text: 'text-[#0369a1]', bgTint: 'bg-[#f0f9ff]' };
  }
  if (lower.includes('retail') || lower.includes('fmcg') || lower.includes('consumer')) {
    return { bar: 'from-[#c49a45] to-[#b45309]', text: 'text-[#92400e]', bgTint: 'bg-[#fffbeb]' };
  }
  return { bar: 'from-[#1d4ed8] to-[#091326]', text: 'text-[#1d4ed8]', bgTint: 'bg-[#eff6ff]' };
}

function highlightToDossier(p: ParticipantProfileHighlight): RegistrationRecord {
  const numMatch = p.mandate.match(/[\d.]+/);
  const n = numMatch ? parseFloat(numMatch[0]) : 250;
  const lakhs = /cr/i.test(p.mandate) ? Math.round(n * 100) : Math.round(n);
  return {
    id: p.id,
    full_name: p.fullName,
    company: p.company,
    email: ORGANISER_CONTACT.email,
    phone: ORGANISER_CONTACT.phone,
    industry: p.roleTitle,
    track: p.track as InvestmentTrack,
    participantType: p.category === 'Founder' ? 'Entrepreneur' : p.category,
    funding_lakhs: Math.max(50, lakhs),
    business_summary: p.quote,
    location: p.location,
    stage: p.stage,
    validationStatus: p.stage.includes('Approved') ? 'Approved' : 'Under review',
    paymentStatus: p.stage.includes('Approved') ? 'Confirmed' : 'Pending',
    assignedReviewer: 'Dr. Meenakshi Sundaram',
    pitchHall: p.stage.includes('Hall 3')
      ? 'Hall 3 · Industry'
      : p.stage.includes('Hall 2')
      ? 'Hall 2 · Expansion'
      : 'Hall 1 · Plenary',
    createdAt: '2026-11-12T09:00:00.000Z',
    updatedAt: '2026-11-14T11:30:00.000Z',
  };
}

export function EntrepreneursPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [regionFilter, setRegionFilter] = useState<string>('All Regions');
  const [onlyVerifiedPortraits, setOnlyVerifiedPortraits] = useState(false);
  const [sortPhotosFirst, setSortPhotosFirst] = useState(true);
  const [selectedLeader, setSelectedLeader] = useState<DirectoryLeaderSummary | null>(null);
  const [selectedFounderDossier, setSelectedFounderDossier] = useState<RegistrationRecord | null>(null);

  const cohortFounders = useMemo(
    () => PARTICIPANT_HIGHLIGHTS.filter((p) => p.category === 'Founder'),
    []
  );

  const verifiedPortraitCount = useMemo(
    () => ALL_DIRECTORY_ENTREPRENEURS.filter((e) => Boolean(resolvePortraitUrl(e.name))).length,
    []
  );

  const filtered = useMemo(() => {
    const base = filterDirectoryItems(
      ALL_DIRECTORY_ENTREPRENEURS,
      query,
      category,
      (e) => `${e.serial} ${e.company} ${e.region ?? ''}`
    ).filter((e) => regionFilter === 'All Regions' || e.region === regionFilter);

    const maybeFiltered = onlyVerifiedPortraits
      ? base.filter((e) => Boolean(resolvePortraitUrl(e.name)))
      : base;
    if (!sortPhotosFirst) return maybeFiltered;
    return [...maybeFiltered].sort((a, b) => {
      const aHas = resolvePortraitUrl(a.name) ? 1 : 0;
      const bHas = resolvePortraitUrl(b.name) ? 1 : 0;
      return bHas - aHas;
    });
  }, [query, category, regionFilter, onlyVerifiedPortraits, sortPhotosFirst]);

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="ENTREPRENEURS & BUSINESS LEADERS DIRECTORY"
        title="Summit Cohort & Regional Hub Leaders."
        subtitle="Explore our active 2027 summit founder cohort alongside the deduplicated reference directory spanning Tamil Nadu Groups A–F and National & Global Industrial and Tech Leaders."
        image={MEDIA_ASSETS.trackStartups}
        imageAlt="Indian startup founders collaborating over laptops"
        stats={[
          { value: String(ALL_DIRECTORY_ENTREPRENEURS.length), label: 'Distinct Leaders' },
          { value: String(cohortFounders.length + verifiedPortraitCount), label: 'With Portraits' },
          { value: '6 Hubs', label: 'TN Regions A–F' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 space-y-14">
        {/* Representative Summit Entrepreneur Showcase — Medium Cards + Medium Person Portraits */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#1d4ed8] inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>2027 SUMMIT COHORT SPOTLIGHT</span>
              </p>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-[#0f172a]">
                Featured Summit Entrepreneurs
              </h2>
            </div>
            <Link
              href="/apply"
              className="text-xs font-semibold text-[#1d4ed8] hover:underline inline-flex items-center gap-1"
            >
              <span>Apply to Join Cohort</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cohortFounders.map((founder) => {
              const accent = getSectorAccent(founder.track);
              return (
                <InteractiveCard
                  key={founder.id}
                  as="button"
                  onClick={() => setSelectedFounderDossier(highlightToDossier(founder))}
                  className="rounded-2xl overflow-hidden flex flex-col justify-between group min-h-[248px]"
                >
                  <div>
                    <div className={`h-1.5 w-full bg-gradient-to-r ${accent.bar}`} />
                    <div className="p-6 pb-4">
                      <div className="flex items-start gap-4">
                        <AvatarPortrait name={founder.fullName} src={founder.portraitUrl} size="md" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`font-mono text-[10px] font-bold uppercase tracking-wider ${accent.text}`}>
                              {founder.track}
                            </span>
                            <span className="font-mono text-[10px] text-[#526075]">
                              {founder.id}
                            </span>
                          </div>
                          <h3 className="mt-1 font-display text-2xl font-semibold text-[#0f172a] leading-tight group-hover:text-[#1d4ed8] transition-colors">
                            {founder.fullName}
                          </h3>
                          <p className="mt-0.5 text-xs font-medium text-[#334155]">
                            {founder.roleTitle} · {founder.company}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-mono font-semibold text-[#091326]">
                          {founder.mandate}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#526075]">
                          <MapPin className="w-3.5 h-3.5 text-[#0d9488]" aria-hidden="true" />
                          {founder.location}
                        </span>
                      </div>

                      <p className="mt-3 pt-3 border-t border-[#ece8df] text-xs text-[#334155] leading-relaxed flex items-start gap-2 line-clamp-2">
                        <Quote className="w-3.5 h-3.5 text-[#c49a45] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{founder.quote}</span>
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-3 bg-[#fafaf8] border-t border-[#e4dfd5] flex items-center justify-between text-xs w-full">
                    <span className="text-[#526075]">{founder.stage}</span>
                    <span className={`inline-flex items-center gap-1 font-semibold ${accent.text}`}>
                      <span>Inspect Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </InteractiveCard>
              );
            })}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="space-y-6">
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#6d28d9]">
              ECOSYSTEM REFERENCE DIRECTORY · TN GROUPS A–F &amp; NATIONAL LEADERS
            </p>
            <h2 className="mt-1 font-display text-3xl font-semibold text-[#0f172a]">
              {ALL_DIRECTORY_ENTREPRENEURS.length} Prominent Indian &amp; Tamil Nadu Leaders
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-[#e4dfd5] p-5 sm:p-6 space-y-4 shadow-[0_4px_20px_-14px_rgba(9,19,38,0.12)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-4 relative">
                <Search
                  className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  aria-label="Search entrepreneurs directory"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, company, serial (NO. 026 / EXT. 07) or hub..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#1d4ed8]"
                />
              </div>

              <div className="lg:col-span-8 flex flex-wrap sm:flex-nowrap items-center gap-2.5">
                <select
                  aria-label="Filter by entrepreneur category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="min-w-0 flex-1 px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#1d4ed8]"
                >
                  {ENTREPRENEUR_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter by Tamil Nadu regional hub"
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="min-w-0 flex-1 px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#1d4ed8]"
                >
                  {ENTREPRENEUR_REGIONS.map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  aria-pressed={sortPhotosFirst}
                  onClick={() => setSortPhotosFirst((v) => !v)}
                  className={`px-3.5 py-2.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    sortPhotosFirst
                      ? 'bg-[#1d4ed8] text-white border-[#1d4ed8]'
                      : 'bg-[#fafaf8] text-[#0f172a] border-[#cfc8b8] hover:border-[#1d4ed8]'
                  }`}
                >
                  {sortPhotosFirst ? 'Photos First ✓' : 'Sort: Serial Order'}
                </button>

                <button
                  type="button"
                  aria-pressed={onlyVerifiedPortraits}
                  onClick={() => setOnlyVerifiedPortraits((v) => !v)}
                  className={`px-3.5 py-2.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    onlyVerifiedPortraits
                      ? 'bg-[#091326] text-[#e6c67e] border-[#091326]'
                      : 'bg-[#fafaf8] text-[#0f172a] border-[#cfc8b8] hover:border-[#1d4ed8]'
                  }`}
                >
                  Verified Photos ({verifiedPortraitCount})
                </button>

                {(query || category !== 'All' || regionFilter !== 'All Regions' || onlyVerifiedPortraits) && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setCategory('All');
                      setRegionFilter('All Regions');
                      setOnlyVerifiedPortraits(false);
                    }}
                    className="px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] hover:border-[#1d4ed8] text-xs font-medium text-[#0f172a] whitespace-nowrap cursor-pointer shrink-0"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {ENTREPRENEUR_CATEGORIES.map((cat) => {
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`max-w-full px-3.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer whitespace-normal sm:whitespace-nowrap ${
                      active
                        ? 'bg-[#091326] text-[#e6c67e]'
                        : 'bg-[#fafaf8] text-[#334155] border border-[#e4dfd5] hover:border-[#1d4ed8]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[#ece8df]">
              {ENTREPRENEUR_REGIONS.map((reg) => {
                const active = regionFilter === reg;
                const shortLabel = reg.includes('—') ? reg.split('—')[0].trim() : reg.split('—')[0].trim();
                return (
                  <button
                    key={reg}
                    type="button"
                    onClick={() => setRegionFilter(reg)}
                    title={reg}
                    className={`max-w-full px-3 py-1 rounded-md text-[11px] font-mono font-semibold text-left transition-colors cursor-pointer whitespace-normal sm:whitespace-nowrap ${
                      active
                        ? 'bg-[#6d28d9] text-white'
                        : 'bg-[#f8fafc] text-[#475569] border border-[#e4dfd5] hover:border-[#6d28d9]'
                    }`}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>

            {(regionFilter === 'All Regions' || regionFilter.startsWith('C.')) && (
              <div className="rounded-xl border border-[#e4dfd5] bg-[#f8fafc] px-4 py-3 text-xs text-[#334155] leading-relaxed">
                <strong className="font-semibold text-[#0f172a]">Coimbatore Industrial Cluster Note:</strong>{' '}
                {COIMBATORE_HUB_NOTE.replace('Note on Coimbatore (Group C): ', '')}
              </div>
            )}

            <p className="text-xs font-medium text-[#526075] tabular-nums">
              Showing <strong className="text-[#0f172a]">{filtered.length}</strong> of{' '}
              {ALL_DIRECTORY_ENTREPRENEURS.length} deduplicated leaders · {verifiedPortraitCount} verified real
              photographs displayed alongside clean monogram crests where verified portraits are unavailable.
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#e4dfd5] p-12 text-center">
              <p className="text-sm text-[#526075]">
                No entries match your search, sector, or regional hub filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((item) => {
                const portraitUrl = resolvePortraitUrl(item.name);
                const accent = getSectorAccent(item.category);
                const shortRegion = item.region ? item.region.split('—')[0].trim() : item.category;
                return (
                  <InteractiveCard
                    key={`${item.serial}-${item.name}`}
                    as="button"
                    onClick={() =>
                      setSelectedLeader({
                        serial: item.serial,
                        name: item.name,
                        company: item.company,
                        sector: item.region ? `${item.category} · ${shortRegion}` : item.category,
                        directoryLabel: 'Tamil Nadu & Indian Business Leaders Directory',
                      })
                    }
                    className="rounded-2xl overflow-hidden flex flex-col justify-between group min-h-[214px]"
                  >
                    <div>
                      <div className={`h-1 w-full bg-gradient-to-r ${accent.bar}`} />
                      <div className="p-6 pb-4">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <AvatarPortrait name={item.name} src={portraitUrl} size="md" />
                          <div className="text-right">
                            <span className={`font-mono text-[11px] font-bold block tabular-nums ${accent.text}`}>
                              {item.serial}
                            </span>
                            <span
                              className={`mt-1 inline-block font-mono text-[10px] font-semibold uppercase tracking-wider ${
                                portraitUrl ? 'text-[#0d9488]' : 'text-[#64748b]'
                              }`}
                            >
                              {portraitUrl ? 'Verified Photo' : 'Monogram Crest'}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-display text-2xl font-semibold text-[#0f172a] leading-snug group-hover:text-[#1d4ed8] transition-colors">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-[#334155]">{item.company}</p>
                        {item.region && (
                          <p className="mt-1.5 font-mono text-[10px] text-[#64748b] truncate">
                            {shortRegion}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="px-6 py-3 bg-[#fafaf8] border-t border-[#e4dfd5] flex items-center justify-between gap-2 w-full">
                      <span className="text-xs font-medium text-[#526075] truncate">
                        {item.category}
                      </span>
                      <span className={`inline-flex items-center gap-0.5 text-xs font-semibold shrink-0 ${accent.text}`}>
                        <span>Profile</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </InteractiveCard>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <LeaderReferenceModal leader={selectedLeader} onClose={() => setSelectedLeader(null)} />
      <ParticipantDossierModal
        record={selectedFounderDossier}
        onClose={() => setSelectedFounderDossier(null)}
      />
      <CtaBanner />
    </div>
  );
}

export function WomenEntrepreneursPage() {
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('All');
  const [onlyVerifiedPortraits, setOnlyVerifiedPortraits] = useState(false);
  const [sortPhotosFirst, setSortPhotosFirst] = useState(true);
  const [selectedLeader, setSelectedLeader] = useState<DirectoryLeaderSummary | null>(null);
  const [selectedFounderDossier, setSelectedFounderDossier] = useState<RegistrationRecord | null>(null);

  const womenCohortSpotlights = useMemo(
    () =>
      PARTICIPANT_HIGHLIGHTS.filter((p) =>
        [
          'Ananya Subramanian',
          'Priyadharshini Natarajan',
          'Kavitha Rajendran',
          'Nandini Venkataraman',
          'Dr. Divya Narayanan',
          'Deepa Soundararajan',
          'Lakshmi Priya Raman',
          'Kavya Subramani',
        ].includes(p.fullName)
      ),
    []
  );

  const sectors = useMemo(
    () => ['All', ...Array.from(new Set(WOMEN_ENTREPRENEURS.map((w) => w.sector)))],
    []
  );

  const verifiedCount = useMemo(
    () => WOMEN_ENTREPRENEURS.filter((w) => Boolean(resolvePortraitUrl(w.name))).length,
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = WOMEN_ENTREPRENEURS.filter((w) => {
      if (sector !== 'All' && w.sector !== sector) return false;
      if (onlyVerifiedPortraits && !resolvePortraitUrl(w.name)) return false;
      if (q) {
        const hay = `${w.name} ${w.company} ${w.sector} ${w.serial}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (!sortPhotosFirst) return list;
    return [...list].sort((a, b) => {
      const aHas = resolvePortraitUrl(a.name) ? 1 : 0;
      const bHas = resolvePortraitUrl(b.name) ? 1 : 0;
      return bHas - aHas;
    });
  }, [query, sector, onlyVerifiedPortraits, sortPhotosFirst]);

  const pillars = [
    {
      no: '01',
      title: 'Capital Access & Credit Readiness',
      desc: 'Preparing audited statements, working capital ratios, and equity growth decks.',
    },
    {
      no: '02',
      title: 'Industrial & Manufacturing Scale',
      desc: 'Transitioning regional enterprises into national and export supply chains.',
    },
    {
      no: '03',
      title: 'Deep-Tech & AI Venture Building',
      desc: 'Connecting female tech founders with institutional seed and Series-A capital.',
    },
    {
      no: '04',
      title: 'Governance & Board Advisory',
      desc: 'Strengthening financial controls, compliance, and multi-year strategic planning.',
    },
    {
      no: '05',
      title: 'Distribution & Brand Networks',
      desc: 'Leveraging retail, FMCG, and D2C partnerships across southern India.',
    },
    {
      no: '06',
      title: 'Cross-Border Expansion',
      desc: 'Exploring joint ventures and international buyer delegations.',
    },
  ];

  return (
    <div className="bg-[#fdf8fc] text-[#0f172a]">
      <PageHero
        theme="rose"
        kicker="WOMEN ENTREPRENEURS · EDITORIAL SHOWCASE"
        title="Women Business Leaders & Founders."
        subtitle="A dedicated rose-plum executive showcase honouring women industrialists, deep-tech builders, EV pioneers, and consumer brand founders across India."
        image={MEDIA_ASSETS.womenLeadershipForum}
        imageAlt="Indian women entrepreneurs and industrial leaders at a Chennai high-rise boardroom table"
        videoSrc={VIDEO_ASSETS.womenLeadership.src}
        videoPoster={VIDEO_ASSETS.womenLeadership.poster}
        ctaLabel="Apply as Founder"
        ctaHref="/apply"
        stats={[
          { value: String(WOMEN_ENTREPRENEURS.length), label: 'Profiled Leaders' },
          { value: String(verifiedCount + womenCohortSpotlights.length), label: 'With Portraits' },
          { value: '6', label: 'Growth Pillars' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14">
        {/* Cinematic Forum Preview & Rose-Plum Editorial Mandate */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7">
            <CinematicShowcaseVideo
              src={VIDEO_ASSETS.womenLeadership.src}
              poster={VIDEO_ASSETS.womenLeadership.poster}
              kicker="LEADERSHIP FORUM SHOWCASE"
              title={VIDEO_ASSETS.womenLeadership.title}
              caption={VIDEO_ASSETS.womenLeadership.caption}
              heightClass="h-[260px] sm:h-[320px] lg:h-full lg:min-h-[300px]"
            />
          </div>
          <InteractiveCard
            dark
            tilt={false}
            className="lg:col-span-5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between !bg-gradient-to-br from-[#4a044e] via-[#701a75] to-[#831843] border border-[#f0abfc]/20"
          >
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#f9a8d4]">
                INDIA WOMEN FOUNDERS MANDATE
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-white leading-tight">
                Industrial Scale, Deep-Tech &amp; Consumer Brands
              </h2>
              <p className="mt-3 text-sm text-[#fae8ff] leading-relaxed">
                Dedicated executive visibility for women founders building resilient enterprises across
                Tamil Nadu and India — paired with institutional credit readiness, equity roundtables,
                and export corridor mentorship.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/15 grid grid-cols-2 gap-4">
              <div>
                <div className="font-mono text-2xl font-semibold text-[#f9a8d4] tabular-nums">
                  {verifiedCount + womenCohortSpotlights.length}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#f5d0fe]">
                  Portraits Showcased
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl font-semibold text-[#fde68a] tabular-nums">
                  {sectors.length - 1}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#f5d0fe]">
                  Industry Verticals
                </div>
              </div>
            </div>
          </InteractiveCard>
        </div>

        {/* Women Founders Summit Cohort Spotlight (Distinct Horizontal Editorial Cards with Lg Portraits) */}
        <div className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#f0abfc]/35 pb-4">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#86198f]">
                SUMMIT WOMEN COHORT
              </p>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-[#4a044e]">
                Active Women Founders &amp; Venture Leads
              </h2>
            </div>
            <span className="font-mono text-xs font-semibold text-[#86198f]">
              Curated Editorial Profiles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {womenCohortSpotlights.map((person) => {
              return (
                <InteractiveCard
                  key={person.id}
                  as="button"
                  onClick={() => setSelectedFounderDossier(highlightToDossier(person))}
                  className="rounded-2xl overflow-hidden flex flex-col justify-between group bg-white border-[#f3e8ff] hover:border-[#a855f7] min-h-[210px]"
                >
                  <div className="h-1.5 w-full bg-gradient-to-r from-[#db2777] via-[#9333ea] to-[#c49a45]" />
                  <div className="p-6 flex flex-col sm:flex-row items-start gap-5 flex-1">
                    <AvatarPortrait name={person.fullName} src={person.portraitUrl} size="lg" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#86198f]">
                          {person.track} · {person.category}
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-[#be185d]">
                          {person.mandate}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#0f172a] group-hover:text-[#86198f] transition-colors leading-tight">
                        {person.fullName}
                      </h3>
                      <p className="text-xs font-medium text-[#526075]">
                        {person.roleTitle} · {person.company}
                      </p>
                      <p className="pt-2 border-t border-[#fdf4ff] text-xs text-[#334155] leading-relaxed line-clamp-2">
                        &ldquo;{person.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-3 bg-[#fdf8fc] border-t border-[#f3e8ff] flex items-center justify-between text-xs w-full">
                    <span className="text-[#701a75] font-medium">{person.stage}</span>
                    <span className="font-semibold inline-flex items-center gap-1 text-[#86198f]">
                      Inspect Dossier <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </InteractiveCard>
              );
            })}
          </div>
        </div>

        {/* Filter Bar & Index Summary */}
        <div className="bg-white rounded-2xl border border-[#e4dfd5] p-6 sm:p-7 space-y-5 shadow-[0_4px_20px_-14px_rgba(9,19,38,0.12)]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#1d4ed8]">
                AUTHENTICATED LEADERSHIP INDEX
              </p>
              <h2 className="mt-1 font-display text-3xl font-semibold text-[#0f172a]">
                Browse Women Founders &amp; Industrial Pioneers
              </h2>
            </div>
            <p className="text-xs text-[#526075] max-w-md">
              Verified portraits match each individual 1-to-1 with public leadership records in medium
              portrait cards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-5 relative">
              <Search
                className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Search women entrepreneurs directory"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search leader name, company (e.g. TAFE, Naturals, Pricol), or sector..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#6d28d9]"
              />
            </div>

            <div className="lg:col-span-7 flex flex-wrap sm:flex-nowrap items-center gap-2.5">
              <select
                aria-label="Filter women entrepreneurs by sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="min-w-0 flex-1 px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#6d28d9]"
              >
                {sectors.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All Sectors' : s}
                  </option>
                ))}
              </select>

              <button
                type="button"
                aria-pressed={sortPhotosFirst}
                onClick={() => setSortPhotosFirst((v) => !v)}
                className={`px-3.5 py-2.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  sortPhotosFirst
                    ? 'bg-[#6d28d9] text-white border-[#6d28d9]'
                    : 'bg-[#fafaf8] text-[#0f172a] border-[#cfc8b8] hover:border-[#6d28d9]'
                }`}
              >
                {sortPhotosFirst ? 'Photos First ✓' : 'Sort: Serial'}
              </button>

              <button
                type="button"
                aria-pressed={onlyVerifiedPortraits}
                onClick={() => setOnlyVerifiedPortraits((v) => !v)}
                className={`px-4 py-2.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  onlyVerifiedPortraits
                    ? 'bg-[#091326] text-[#e6c67e] border-[#091326]'
                    : 'bg-[#fafaf8] text-[#0f172a] border-[#cfc8b8] hover:border-[#6d28d9]'
                }`}
              >
                Verified Portraits ({verifiedCount})
              </button>

              {(query || sector !== 'All' || onlyVerifiedPortraits) && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setSector('All');
                    setOnlyVerifiedPortraits(false);
                  }}
                  className="px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] hover:border-[#6d28d9] text-xs font-medium text-[#0f172a] cursor-pointer shrink-0"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <p className="text-xs font-medium text-[#526075] tabular-nums">
            Showing <strong className="text-[#0f172a]">{filtered.length}</strong> of{' '}
            {WOMEN_ENTREPRENEURS.length} profiled leaders
          </p>
        </div>

        <ScrollReveal>
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#e4dfd5] p-12 text-center">
              <p className="text-sm text-[#526075]">
                No women entrepreneur profiles match the current search or filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
              {filtered.map((w, idx) => {
                const serialText = `NO. ${String(w.serial).padStart(2, '0')}`;
                const portraitUrl = resolvePortraitUrl(w.name);
                const accent = getSectorAccent(w.sector);
                const cycleIdx = idx % 5;
                const isFeaturedWide = cycleIdx === 0 || cycleIdx === 1;
                const spanClass = isFeaturedWide ? 'lg:col-span-3' : 'lg:col-span-2';
                return (
                  <InteractiveCard
                    key={w.serial + w.name}
                    as="button"
                    onClick={() =>
                      setSelectedLeader({
                        serial: serialText,
                        name: w.name,
                        company: w.company,
                        sector: w.sector,
                        directoryLabel: 'Women Business Leaders Reference',
                      })
                    }
                    className={`${spanClass} rounded-2xl overflow-hidden flex flex-col justify-between group ${
                      isFeaturedWide ? 'min-h-[236px]' : 'min-h-[214px]'
                    }`}
                  >
                    <div>
                      <div className={`h-2 w-full bg-gradient-to-r ${accent.bar}`} />
                      <div className={`${isFeaturedWide ? 'p-6 sm:p-7' : 'p-5'} pb-4 ${accent.bgTint}/65`}>
                        <div className="flex items-start justify-between gap-3 mb-3.5">
                          <AvatarPortrait
                            name={w.name}
                            src={portraitUrl}
                            size={isFeaturedWide ? 'lg' : 'md'}
                          />
                          <div className="text-right">
                            <span
                              className={`font-mono text-xs font-bold block tabular-nums px-2.5 py-0.5 rounded-md bg-white border border-[#e4dfd5] ${accent.text}`}
                            >
                              {serialText}
                            </span>
                            {portraitUrl && (
                              <span className="mt-1.5 inline-block font-mono text-[10px] font-semibold uppercase tracking-wider text-[#0d9488]">
                                Verified Photo
                              </span>
                            )}
                          </div>
                        </div>
                        <h3
                          className={`font-display font-semibold text-[#0f172a] group-hover:text-[#6d28d9] transition-colors leading-snug ${
                            isFeaturedWide ? 'text-2xl sm:text-[26px]' : 'text-xl sm:text-2xl'
                          }`}
                        >
                          {w.name}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-[#334155]">{w.company}</p>
                      </div>
                    </div>
                    <div className="px-6 py-3 bg-white border-t border-[#e4dfd5] flex items-center justify-between gap-2 w-full">
                      <span className={`text-xs font-semibold truncate ${accent.text}`}>
                        {w.sector}
                      </span>
                      <span className={`inline-flex items-center gap-0.5 text-xs font-bold shrink-0 ${accent.text}`}>
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </InteractiveCard>
                );
              })}
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal className="space-y-4">
          <div className="mb-4">
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#1d4ed8]">
              PROGRAM FOCUS
            </p>
            <h2 className="font-display text-3xl font-semibold text-[#0f172a] mt-1">
              Six Leadership Pillars
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {pillars.map((p) => (
              <ExpandablePanel
                key={p.no}
                kicker={`PILLAR ${p.no}`}
                title={p.title}
                defaultOpen={p.no === '01' || p.no === '02'}
              >
                {p.desc}
              </ExpandablePanel>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <LeaderReferenceModal leader={selectedLeader} onClose={() => setSelectedLeader(null)} />
      <ParticipantDossierModal
        record={selectedFounderDossier}
        onClose={() => setSelectedFounderDossier(null)}
      />
      <CtaBanner />
    </div>
  );
}

const TAMIL_NADU_HUBS = new Set([
  'chennai',
  'coimbatore',
  'karur',
  'kumbakonam',
  'thoothukudi',
  'madurai',
  'trichy',
  'salem',
  'tiruppur',
  'vellore',
]);

export function CorporatePage() {
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('All');
  const [hqScope, setHqScope] = useState<'all' | 'tn' | 'india'>('all');
  const [page, setPage] = useState(1);
  const pageSize = 30;

  const sectors = useMemo(() => {
    const s = new Set(CORPORATE_500_DIRECTORY.map((c) => c.category));
    return ['All', ...Array.from(s).sort()];
  }, []);

  const tnCount = useMemo(
    () =>
      CORPORATE_500_DIRECTORY.filter((c) =>
        TAMIL_NADU_HUBS.has(c.headquarters.toLowerCase())
      ).length,
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CORPORATE_500_DIRECTORY.filter((c) => {
      const isTn = TAMIL_NADU_HUBS.has(c.headquarters.toLowerCase());
      if (hqScope === 'tn' && !isTn) return false;
      if (hqScope === 'india' && isTn) return false;
      if (sector !== 'All' && c.category !== sector) return false;
      if (q) {
        const hay = `${c.name} ${c.symbol} ${c.category} ${c.headquarters}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, sector, hqScope]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="bg-[#fafafa] text-[#0f172a]">
      <PageHero
        theme="platinum"
        kicker="CORPORATE OUTREACH · TAMIL NADU & PAN-INDIA"
        title="25 Featured Brands & 500+ Corporate Directory."
        subtitle="Corporate ecosystem reference directory spanning NSE/BSE enterprises, Tamil Nadu headquartered industrial groups, and Pan-India champions targeted for outreach."
        image={MEDIA_ASSETS.chennaiSummitHall}
        imageAlt="Chennai summit convention auditorium"
        ctaLabel="Register as Corporate"
        ctaHref="/registration?category=corporate"
        stats={[
          { value: '25', label: 'Featured Logos' },
          { value: String(tnCount), label: 'Tamil Nadu HQ' },
          { value: String(CORPORATE_500_DIRECTORY.length), label: 'Total Corporates' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-14">
        {/* Featured 25 Brand Cards with Official Logos */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#b45309] mb-1.5">
                FEATURED OUTREACH LIST · VISUAL BRAND SHOWCASE
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#18181b]">
                25 Featured Corporate &amp; Banking Brands
              </h2>
              <p className="text-xs sm:text-sm text-[#526075] mt-1">
                Verified institutional marks rendered from official vector/PNG files for sponsorship &amp; partnership benchmarking. Listing does not imply confirmed sponsorship.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {FEATURED_25_BRANDS.map((brand, idx) => (
              <InteractiveCard
                key={brand}
                dark
                className="rounded-2xl p-4 flex flex-col justify-between gap-3 !bg-gradient-to-br from-[#091326] via-[#0f1c3a] to-[#172554] border border-[#c49a45]/45 hover:border-[#fbbf24] shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold text-[#e6c67e] tabular-nums">
                    NO. {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-[#fcd34d]">
                    Featured Brand
                  </span>
                </div>
                <div className="flex justify-center py-1 bg-white rounded-xl p-2 border border-white/20">
                  <InstitutionLogoMark name={brand} size="marquee" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 text-center">
                  {brand}
                </span>
              </InteractiveCard>
            ))}
          </div>
        </div>

        {/* 500+ Searchable Directory with Tamil Nadu HQ Toggle */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#6d28d9] mb-1">
                CORPORATE 500+ INDEX · TAMIL NADU &amp; NATIONAL
              </p>
              <h2 className="font-display text-3xl font-semibold text-[#18181b]">
                Searchable Corporate Directory ({CORPORATE_500_DIRECTORY.length} Companies)
              </h2>
            </div>
            <p className="text-xs font-medium text-[#526075] tabular-nums">
              Showing {slice.length} of {filtered.length} matching companies (Page {safePage} of{' '}
              {totalPages})
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#e4dfd5] p-5 mb-6 space-y-4">
            {/* Tamil Nadu vs Pan-India HQ Scope Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#e4dfd5]">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: `All Corporates (${CORPORATE_500_DIRECTORY.length})` },
                  { id: 'tn', label: `Tamil Nadu HQ (${tnCount})` },
                  { id: 'india', label: `Pan-India HQ (${CORPORATE_500_DIRECTORY.length - tnCount})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setHqScope(tab.id as 'all' | 'tn' | 'india');
                      setPage(1);
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      hqScope === tab.id
                        ? 'bg-[#18181b] text-[#fbbf24]'
                        : 'bg-[#fafaf8] border border-[#e4dfd5] text-[#334155] hover:border-[#b45309]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <span className="font-mono text-[11px] text-[#526075]">
                Covers Chennai, Coimbatore, Karur, Kumbakonam, Thoothukudi &amp; national hubs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-7 relative">
                <Search
                  className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  aria-label="Search corporate directory"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search company name, symbol (e.g. TVSMOTOR), Chennai/Coimbatore or sector..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#b45309]"
                />
              </div>
              <div className="md:col-span-5 flex items-center gap-3">
                <select
                  aria-label="Filter companies by sector"
                  value={sector}
                  onChange={(e) => {
                    setSector(e.target.value);
                    setPage(1);
                  }}
                  className="min-w-0 flex-1 px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#b45309]"
                >
                  {sectors.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {(query || sector !== 'All' || hqScope !== 'all') && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setSector('All');
                      setHqScope('all');
                      setPage(1);
                    }}
                    className="px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] hover:border-[#b45309] text-xs font-medium text-[#0f172a] cursor-pointer shrink-0"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#e4dfd5] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#18181b] text-[#fbbf24] font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-semibold">Rank</th>
                    <th className="py-3.5 px-4 font-semibold">Company</th>
                    <th className="py-3.5 px-4 font-semibold">Symbol</th>
                    <th className="py-3.5 px-4 font-semibold">Sector</th>
                    <th className="py-3.5 px-4 font-semibold">Headquarters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e4dfd5] text-sm">
                  {slice.map((c) => {
                    const isTn = TAMIL_NADU_HUBS.has(c.headquarters.toLowerCase());
                    return (
                      <tr
                        key={c.rank + c.symbol}
                        className={`transition-colors ${
                          isTn ? 'bg-[#fffbeb]/70 hover:bg-[#fef3c7]/60' : 'hover:bg-[#fef3c7]/35'
                        }`}
                      >
                        <td className="py-3 px-4 font-mono text-xs text-[#b45309] font-semibold tabular-nums">
                          #{String(c.rank).padStart(3, '0')}
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#0f172a]">
                          <div className="flex flex-wrap items-center gap-2">
                            <span>{c.name}</span>
                            {isTn && (
                              <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#091326] text-[#e6c67e]">
                                TN HQ
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-[#526075]">{c.symbol}</td>
                        <td className="py-3 px-4 text-[#334155]">{c.category}</td>
                        <td className="py-3 px-4 font-medium text-[#334155]">{c.headquarters}</td>
                      </tr>
                    );
                  })}
                  {slice.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-sm text-[#526075]">
                        No corporate entries match the current filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-4 bg-[#fafaf8] border-t border-[#e4dfd5] flex items-center justify-between gap-4">
              <span className="text-xs text-[#526075] tabular-nums">
                Page {safePage} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg border border-[#cfc8b8] bg-white hover:border-[#1d4ed8] text-xs font-medium text-[#0f172a] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg border border-[#cfc8b8] bg-white hover:border-[#1d4ed8] text-xs font-medium text-[#0f172a] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#091326] via-[#0f1c3a] to-[#172554] text-[#f8f7f3] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#e6c67e]">
              CORPORATE PARTNERSHIP OPPORTUNITIES
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mt-1">
              Joint Ventures, Vendor Discovery &amp; Corporate Sponsorships
            </h3>
            <p className="mt-2 text-sm text-[#cbd5e1] max-w-2xl">
              Corporates seeking strategic MSME supplier integration, corporate venturing, or hall
              exhibition presence can submit an organisational inquiry or inspect sponsor tiers.
            </p>
          </div>
          <Link
            href="/sponsors"
            className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0"
          >
            <span>Explore Sponsor Tiers</span>
          </Link>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

export function AssociationsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = [
    'All',
    'Mining',
    'Industry & Manufacturing',
    'Construction & Real Estate',
    'Trade & Chambers',
    'Textiles',
  ];

  const filtered = useMemo(
    () =>
      filterDirectoryItems(
        ASSOCIATIONS_15,
        query,
        category,
        (a) => `${a.badge} ${a.focus}`
      ),
    [query, category]
  );

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="TRADE & INDUSTRY ASSOCIATIONS"
        title="15 Associations & Chambers of Commerce."
        subtitle="Planned institutional outreach across Tamil Nadu’s industrial estates, manufacturing guilds, exporters associations, builders councils, and chambers of commerce."
        image={MEDIA_ASSETS.aboutReception}
        imageAlt="Indian business leaders networking inside Chennai convention atrium"
        ctaLabel="Register Association Delegation"
        ctaHref="/registration?category=association"
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="bg-white rounded-2xl border border-[#e4dfd5] p-5 sm:p-6 mb-8 space-y-4">
          <div className="relative max-w-xl">
            <Search
              className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              aria-label="Search associations"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search TANSTIA, CODISSIA, CREDAI, sector..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#1d4ed8]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#091326] text-[#e6c67e]'
                      : 'bg-[#fafaf8] text-[#334155] border border-[#e4dfd5] hover:border-[#1d4ed8]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-[#526075] tabular-nums">
            Showing <strong className="text-[#0f172a]">{filtered.length}</strong> of{' '}
            {ASSOCIATIONS_15.length} associations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a) => {
            const accent = getSectorAccent(a.category);
            return (
              <InteractiveCard
                key={a.no}
                className="rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className={`h-1.5 w-full bg-gradient-to-r ${accent.bar}`} />
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className={`font-mono font-bold tabular-nums ${accent.text}`}>
                        NO. {String(a.no).padStart(2, '0')}
                      </span>
                      <span className="font-mono font-semibold uppercase tracking-wider text-[#0f172a]">
                        {a.badge}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-2xl font-semibold text-[#0f172a] leading-snug">
                      {a.name}
                    </h2>
                    <p className="mt-2 text-sm text-[#334155]">Focus: {a.focus}</p>
                  </div>
                </div>
                <div className="px-6 py-3 bg-[#fafaf8] border-t border-[#e4dfd5] flex items-center justify-between text-xs text-[#526075]">
                  <span>{a.category}</span>
                  <Users className={`w-4 h-4 ${accent.text}`} aria-hidden="true" />
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

export function BanksPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = [
    'All',
    'SBI & Nationalised Banks',
    'Domestic Private Sector Banks',
    'Small Finance Banks',
    'Payments Banks',
    'Regional Rural Banks',
    'Foreign banks in India',
  ];

  const filtered = useMemo(
    () => filterDirectoryItems(BANKS_120, query, category, (b) => b.serial),
    [query, category]
  );

  return (
    <div className="bg-[#f4fbf8] text-[#0f172a]">
      <PageHero
        theme="emerald"
        kicker="BANKS IN INDIA (RBI DIRECTORY) · VISUAL LOGO CARDS"
        title="120 RBI-Recognised Banks."
        subtitle="Comprehensive lending ecosystem directory spanning SBI & Nationalised Banks, Domestic Private Sector Banks, Small Finance Banks, Payments Banks, Regional Rural Banks, and Foreign Banks."
        image={MEDIA_ASSETS.trackBankLoans}
        imageAlt="Senior Indian banking director consulting with young Indian entrepreneurs"
        ctaLabel="Apply for Bank Loans Track"
        ctaHref="/apply?track=Bank%20Loans"
        stats={[
          { value: '120', label: 'Banks Listed' },
          { value: '6', label: 'RBI Categories' },
          { value: 'All Logos', label: 'Official Marks & Crests' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 space-y-10">
        {/* Selected Bank Emblems */}
        <div className="bg-white rounded-2xl border border-[#ccfbf1] p-6 sm:p-7 shadow-xs">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#0f766e]">
                SELECTED SCHEDULED BANK EMBLEMS
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#042f2e] mt-1">
                Major Public, Private &amp; Foreign Banks in Directory
              </h2>
            </div>
            <span className="text-xs text-[#526075]">
              Reference institutional marks; listing does not imply lending participation.
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {FEATURED_SHOWCASE_BANKS.map((bankName) => (
              <div
                key={bankName}
                className="rounded-xl border-2 border-[#ccfbf1] bg-[#f8fafc] hover:border-[#0d9488] p-4 flex flex-col items-center justify-between gap-3 text-center transition-colors shadow-xs"
              >
                <InstitutionLogoMark
                  name={bankName}
                  size="marquee"
                  variant="bank"
                  className="w-full h-24 sm:h-28"
                />
                <span className="text-xs sm:text-sm font-bold text-[#042f2e] leading-snug line-clamp-2">
                  {bankName.replace(' Limited', '')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#e4dfd5] p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7 relative">
              <Search
                className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Search RBI banks"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bank name (e.g. Indian Bank, HDFC, Tamilnad Mercantile)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#0d9488]"
              />
            </div>

            <div className="md:col-span-5 flex items-center gap-3">
              <select
                aria-label="Filter banks by RBI category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="min-w-0 flex-1 px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#0d9488]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {(query || category !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setCategory('All');
                  }}
                  className="px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] hover:border-[#0d9488] text-xs font-medium text-[#0f172a] cursor-pointer shrink-0"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#042f2e] text-[#6ee7b7]'
                      : 'bg-[#fafaf8] text-[#334155] border border-[#e4dfd5] hover:border-[#0d9488]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <p className="text-xs font-medium text-[#526075] tabular-nums">
            Showing <strong className="text-[#0f172a]">{filtered.length}</strong> of{' '}
            {BANKS_120.length} RBI-listed banks · Every bank card displays its official institutional mark or crest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((bank, idx) => (
            <InteractiveCard
              key={bank.category + bank.serial + idx}
              className="rounded-2xl overflow-hidden flex flex-col justify-between bg-white border border-[#99f6e4] hover:border-[#0d9488] shadow-xs"
            >
              <div>
                <div className="h-2 w-full bg-gradient-to-r from-[#0d9488] via-[#10b981] to-[#1d4ed8]" />
                <div className="p-5 sm:p-6 pb-4 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-bold text-[#0f766e] tabular-nums">
                      {bank.serial}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#526075] truncate max-w-[210px] text-right">
                      {bank.category}
                    </span>
                  </div>
                  <InstitutionLogoMark
                    name={bank.name}
                    size="marquee"
                    variant="bank"
                    bankCategory={bank.category}
                    className="w-full h-24 sm:h-28 px-5 py-3"
                  />
                  <div className="rounded-xl border-2 border-[#0d9488]/30 bg-[#f0fdfa] px-4 py-3">
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#042f2e] leading-snug">
                      {bank.name}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3.5 bg-[#f8fafc] border-t border-[#ccfbf1] flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#065f46]">
                  <Landmark className="w-3.5 h-3.5 text-[#0d9488]" aria-hidden="true" />
                  <span>RBI Scheduled Bank</span>
                </span>
                <a
                  href={bank.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0f766e] hover:text-[#1d4ed8] hover:underline"
                >
                  <span>RBI Portal</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

export function FinancialBrandsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = [
    'All',
    'Leading Finance & Investment Companies',
    'Banks & Financial Institutions',
    'Startup Investors & Venture Capital',
    'Wealth Management, Stockbroking & Investment Services',
    'Insurance, Housing & Other Financial Brands',
  ];

  const filtered = useMemo(
    () =>
      filterDirectoryItems(
        FINANCIAL_BRANDS_50,
        query,
        category,
        (f) => `${f.rank} ${f.focus}`
      ),
    [query, category]
  );

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="TOP 50 FINANCIAL BRANDS"
        title="Top 50 Financial Brands in Tamil Nadu."
        subtitle="Curated index of NBFCs, regional banks, angel networks, venture capital funds, wealth managers, and housing finance institutions active across Tamil Nadu."
        image={MEDIA_ASSETS.msmeCreditBoardroom}
        imageAlt="Senior Tamil Nadu financial analysts and institutional credit advisors"
        stats={[
          { value: '50', label: 'Institutions' },
          { value: '5', label: 'Financial Verticals' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 space-y-8">
        {/* Curator Index Notes & Priority Investor Syndicates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 rounded-2xl border border-[#e4dfd5] bg-white p-6 space-y-3">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1d4ed8]">
              ECOSYSTEM RANKING SCOPE &amp; NOTES
            </span>
            <p className="text-sm text-[#334155] leading-relaxed">
              {FINANCIAL_BRAND_CATEGORY_NOTES.indexDisclaimer}
            </p>
            <ul className="pt-2 border-t border-[#ece8df] space-y-1.5 text-xs text-[#526075]">
              {FINANCIAL_BRAND_CATEGORY_NOTES.institutionalNotes.map((note) => (
                <li key={note} className="leading-relaxed">
                  • {note}
                </li>
              ))}
            </ul>
          </div>

          <InteractiveCard
            dark
            tilt={false}
            className="lg:col-span-5 rounded-2xl p-6 !bg-gradient-to-br from-[#091326] to-[#172554] border border-[#c49a45]/35 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#e6c67e]">
                PRIORITY TARGETS · STARTUP &amp; ANGEL NETWORKING
              </span>
              <p className="mt-2.5 text-sm text-[#e2e8f0] leading-relaxed">
                {FINANCIAL_BRAND_CATEGORY_NOTES.priorityStartupNote}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[11px] font-mono text-[#fcd34d]">
              <span className="px-2.5 py-1 rounded bg-white/10">The Chennai Angels (150+ Investors)</span>
              <span className="px-2.5 py-1 rounded bg-white/10">Nativelead (Madurai / Kovai / Trichy / Salem)</span>
            </div>
          </InteractiveCard>
        </div>

        <div className="bg-white rounded-2xl border border-[#e4dfd5] p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7 relative">
              <Search
                className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Search financial brands"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Shriram, Sundaram, Anicut, TiE Chennai, or focus..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#1d4ed8]"
              />
            </div>

            <div className="md:col-span-5 flex flex-wrap sm:flex-nowrap items-center gap-3">
              <select
                aria-label="Filter financial brands by category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="min-w-0 flex-1 px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#1d4ed8]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('All');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] hover:border-[#1d4ed8] text-xs font-medium text-[#0f172a] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset filters</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`max-w-full px-3.5 py-1.5 rounded-lg text-xs font-medium text-left cursor-pointer transition-colors whitespace-normal sm:whitespace-nowrap ${
                    active
                      ? 'bg-[#091326] text-[#e6c67e]'
                      : 'bg-[#fafaf8] text-[#334155] border border-[#e4dfd5] hover:border-[#1d4ed8]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <p className="text-xs font-medium text-[#526075] tabular-nums">
            Showing <strong className="text-[#0f172a]">{filtered.length}</strong> of{' '}
            {FINANCIAL_BRANDS_50.length} financial brands · Ecosystem index only; listing does
            not imply endorsement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((brand) => {
            const accent = getSectorAccent(brand.category);
            return (
              <InteractiveCard
                key={brand.rank + brand.name}
                className="rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className={`h-1.5 w-full bg-gradient-to-r ${accent.bar}`} />
                  <div className="p-5 sm:p-6 pb-4 space-y-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`font-mono text-xs font-bold tabular-nums ${accent.text}`}>
                        RANK #{brand.rank}
                      </span>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#526075]">
                        {brand.initials} · INSTITUTION
                      </span>
                    </div>
                    <InstitutionLogoMark
                      name={brand.name}
                      initials={brand.initials}
                      size="marquee"
                      variant={brand.category === 'Banks & Financial Institutions' ? 'bank' : 'default'}
                      className="w-full h-22 sm:h-24 px-5 py-2.5"
                    />
                    <div>
                      <h2 className="font-display text-xl font-semibold text-[#0f172a] leading-snug">
                        {brand.name}
                      </h2>
                      <p className="mt-1.5 text-sm text-[#334155]">{brand.focus}</p>
                    </div>
                  </div>
                </div>
                <p className="px-6 py-3 bg-[#fafaf8] border-t border-[#e4dfd5] text-[11px] font-medium text-[#526075]">
                  {brand.category}
                </p>
              </InteractiveCard>
            );
          })}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
