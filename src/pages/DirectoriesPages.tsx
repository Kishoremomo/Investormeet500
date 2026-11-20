import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Landmark,
  RotateCcw,
  Search,
  Users,
} from 'lucide-react';
import {
  ASSOCIATIONS_15,
  BANKS_120,
  CORPORATE_500_DIRECTORY,
  ENTREPRENEURS_100,
  ENTREPRENEUR_CATEGORIES,
  FEATURED_25_BRANDS,
  FINANCIAL_BRANDS_50,
  WOMEN_ENTREPRENEURS,
} from '../data/directories';
import { MEDIA_ASSETS, VIDEO_ASSETS } from '../data/homeAndPrograms';
import { FEATURED_SHOWCASE_BANKS } from '../data/logos';
import { resolvePortraitUrl } from '../data/portraits';
import { filterDirectoryItems, getInitials } from '../lib/domain';
import { PageHero } from '../components/PageHero';
import { CtaBanner } from '../components/CtaBanner';
import { AvatarPortrait } from '../components/AvatarPortrait';
import { CinematicShowcaseVideo } from '../components/CinematicVideo';
import { InstitutionLogoMark } from '../components/BrandMark';
import { LeaderReferenceModal, type DirectoryLeaderSummary } from '../components/ProfileModal';
import { ExpandablePanel, InteractiveCard, ScrollReveal } from '../components/MotionPrimitives';
import { Link } from '../lib/router';

export function EntrepreneursPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [onlyVerifiedPortraits, setOnlyVerifiedPortraits] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<DirectoryLeaderSummary | null>(null);

  const verifiedPortraitCount = useMemo(
    () => ENTREPRENEURS_100.filter((e) => Boolean(resolvePortraitUrl(e.name))).length,
    []
  );

  const filtered = useMemo(() => {
    const base = filterDirectoryItems(
      ENTREPRENEURS_100,
      query,
      category,
      (e) => `${e.serial} ${e.company}`
    );
    if (!onlyVerifiedPortraits) return base;
    return base.filter((e) => Boolean(resolvePortraitUrl(e.name)));
  }, [query, category, onlyVerifiedPortraits]);

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="ENTREPRENEURS DIRECTORY"
        title="100 Tamil Nadu & Indian Business Leaders."
        subtitle="Reference directory of industrialists, technology founders, healthcare pioneers, and manufacturing leaders compiled for ecosystem orientation. Does not imply confirmed attendance."
        image={MEDIA_ASSETS.trackStartups}
        imageAlt="Indian startup founders collaborating over laptops"
        stats={[
          { value: '100', label: 'Entries' },
          { value: '7', label: 'Sectors' },
          { value: String(verifiedPortraitCount), label: 'Verified Portraits' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="bg-white rounded-2xl border border-[#e4dfd5] p-5 sm:p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 relative">
              <Search
                className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Search entrepreneurs directory"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, company, serial (e.g. NO. 026) or sector..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#8a5d14]"
              />
            </div>

            <div className="md:col-span-6 flex flex-wrap sm:flex-nowrap items-center gap-3">
              <select
                aria-label="Filter by entrepreneur category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="min-w-0 flex-1 px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#8a5d14]"
              >
                {ENTREPRENEUR_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                type="button"
                aria-pressed={onlyVerifiedPortraits}
                onClick={() => setOnlyVerifiedPortraits((v) => !v)}
                className={`px-3.5 py-2.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  onlyVerifiedPortraits
                    ? 'bg-[#0c121d] text-[#e6c67e] border-[#0c121d]'
                    : 'bg-[#fafaf8] text-[#0f172a] border-[#cfc8b8] hover:border-[#8a5d14]'
                }`}
              >
                Verified Photos ({verifiedPortraitCount})
              </button>
              {(query || category !== 'All' || onlyVerifiedPortraits) && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setCategory('All');
                    setOnlyVerifiedPortraits(false);
                  }}
                  className="px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] hover:border-[#8a5d14] text-xs font-medium text-[#0f172a] whitespace-nowrap cursor-pointer shrink-0"
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
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#0c121d] text-[#e6c67e]'
                      : 'bg-[#fafaf8] text-[#334155] border border-[#e4dfd5] hover:border-[#8a5d14]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <p className="text-xs font-medium text-[#526075] tabular-nums">
            Showing <strong className="text-[#0f172a]">{filtered.length}</strong> of{' '}
            {ENTREPRENEURS_100.length} reference entries · Verified public portraits matched
            1-to-1; entries without public photography show monogram initials.
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e4dfd5] p-12 text-center">
            <p className="text-sm text-[#526075]">
              No entries match your search or category filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((item) => {
              const portraitUrl = resolvePortraitUrl(item.name);
              return (
                <InteractiveCard
                  key={item.serial}
                  as="button"
                  onClick={() =>
                    setSelectedLeader({
                      serial: item.serial,
                      name: item.name,
                      company: item.company,
                      sector: item.category,
                      directoryLabel: '100 Tamil Nadu & Indian Business Leaders',
                    })
                  }
                  className="rounded-xl p-5 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3.5">
                      <AvatarPortrait name={item.name} src={portraitUrl} size="md" />
                      <span className="font-mono text-[11px] font-semibold text-[#8a5d14] tabular-nums">
                        {item.serial}
                      </span>
                    </div>
                    <h2 className="font-display text-xl font-semibold text-[#0f172a] leading-snug group-hover:text-[#8a5d14] transition-colors">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-[#334155]">{item.company}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#e4dfd5] flex items-center justify-between gap-2 w-full">
                    <span className="text-[11px] font-medium text-[#526075] truncate">
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#8a5d14] shrink-0">
                      <span>Profile</span>
                      <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                    </span>
                  </div>
                </InteractiveCard>
              );
            })}
          </div>
        )}
      </section>

      <LeaderReferenceModal leader={selectedLeader} onClose={() => setSelectedLeader(null)} />
      <CtaBanner />
    </div>
  );
}

export function WomenEntrepreneursPage() {
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('All');
  const [onlyVerifiedPortraits, setOnlyVerifiedPortraits] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<DirectoryLeaderSummary | null>(null);

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
    return WOMEN_ENTREPRENEURS.filter((w) => {
      if (sector !== 'All' && w.sector !== sector) return false;
      if (onlyVerifiedPortraits && !resolvePortraitUrl(w.name)) return false;
      if (q) {
        const hay = `${w.name} ${w.company} ${w.sector} ${w.serial}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, sector, onlyVerifiedPortraits]);

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
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="WOMEN ENTREPRENEURS"
        title="Women Business Leaders & Founders."
        subtitle="Recognising exemplary women leaders across manufacturing, fintech, AI, FMCG, and sustainable enterprise. Compiled for inspiration and outreach."
        image={MEDIA_ASSETS.womenLeadershipForum}
        imageAlt="Indian women entrepreneurs and industrial leaders at a Chennai high-rise boardroom table"
        videoSrc={VIDEO_ASSETS.womenLeadership.src}
        videoPoster={VIDEO_ASSETS.womenLeadership.poster}
        ctaLabel="Apply as Founder"
        ctaHref="/apply"
        stats={[
          { value: String(WOMEN_ENTREPRENEURS.length), label: 'Featured Leaders' },
          { value: String(verifiedCount), label: 'Verified Portraits' },
          { value: '6', label: 'Growth Pillars' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14">
        {/* Cinematic Forum Preview & Editorial Highlight */}
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
            className="lg:col-span-5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#e6c67e]">
                INDIA WOMEN FOUNDERS MANDATE
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-white leading-tight">
                Industrial Scale, Deep-Tech &amp; Consumer Brands
              </h2>
              <p className="mt-3 text-sm text-[#cbd5e1] leading-relaxed">
                Dedicated visibility for women founders building resilient enterprises across Tamil
                Nadu and India — paired with institutional credit readiness, equity roundtables, and
                export corridor mentorship.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
              <div>
                <div className="font-mono text-2xl font-semibold text-[#e6c67e] tabular-nums">
                  {verifiedCount}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#94a3b8]">
                  Verified 1-to-1 Portraits
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl font-semibold text-[#e6c67e] tabular-nums">
                  {sectors.length - 1}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#94a3b8]">
                  Industry Verticals
                </div>
              </div>
            </div>
          </InteractiveCard>
        </div>

        {/* Filter Bar & Index Summary */}
        <div className="bg-white rounded-2xl border border-[#e4dfd5] p-6 sm:p-7 space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14]">
                AUTHENTICATED LEADERSHIP INDEX
              </p>
              <h2 className="mt-1 font-display text-3xl font-semibold text-[#0f172a]">
                Browse Women Founders &amp; Industrial Pioneers
              </h2>
            </div>
            <p className="text-xs text-[#526075] max-w-md">
              Verified portraits match each individual 1-to-1 with public leadership records; other
              entries display crisp monogram initials rather than stock images.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6 relative">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#8a5d14]"
              />
            </div>

            <div className="md:col-span-6 flex flex-wrap sm:flex-nowrap items-center gap-2.5">
              <select
                aria-label="Filter women entrepreneurs by sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="min-w-0 flex-1 px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#8a5d14]"
              >
                {sectors.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All Sectors' : s}
                  </option>
                ))}
              </select>

              <button
                type="button"
                aria-pressed={onlyVerifiedPortraits}
                onClick={() => setOnlyVerifiedPortraits((v) => !v)}
                className={`px-4 py-2.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  onlyVerifiedPortraits
                    ? 'bg-[#0c121d] text-[#e6c67e] border-[#0c121d]'
                    : 'bg-[#fafaf8] text-[#0f172a] border-[#cfc8b8] hover:border-[#8a5d14]'
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
                  className="px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] hover:border-[#8a5d14] text-xs font-medium text-[#0f172a] cursor-pointer shrink-0"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((w) => {
                const serialText = `NO. ${String(w.serial).padStart(2, '0')}`;
                const portraitUrl = resolvePortraitUrl(w.name);
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
                    className="rounded-xl p-5 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <AvatarPortrait name={w.name} src={portraitUrl} size="lg" />
                        <span className="font-mono text-xs font-semibold text-[#8a5d14] tabular-nums">
                          {serialText}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-[#0f172a] group-hover:text-[#8a5d14] transition-colors leading-snug">
                        {w.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[#334155]">{w.company}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#e4dfd5] flex items-center justify-between gap-2 w-full">
                      <span className="text-[11px] font-medium text-[#526075] truncate">
                        {w.sector}
                      </span>
                      <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-[#8a5d14] shrink-0">
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
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
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14]">
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
      <CtaBanner />
    </div>
  );
}

export function CorporatePage() {
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 30;

  const sectors = useMemo(() => {
    const s = new Set(CORPORATE_500_DIRECTORY.map((c) => c.category));
    return ['All', ...Array.from(s).sort()];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CORPORATE_500_DIRECTORY.filter((c) => {
      if (sector !== 'All' && c.category !== sector) return false;
      if (q) {
        const hay = `${c.name} ${c.symbol} ${c.category} ${c.headquarters}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, sector]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="CORPORATE OUTREACH"
        title="25 Featured Brands & 500+ Corporate Directory."
        subtitle="Corporate ecosystem reference directory spanning NSE/BSE enterprises, industrial manufacturers, and regional champions targeted for partnership and sponsorship outreach."
        image={MEDIA_ASSETS.chennaiSummitHall}
        imageAlt="Chennai summit convention auditorium"
        ctaLabel="Register as Corporate"
        ctaHref="/registration?category=corporate"
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-14">
        {/* Featured 25 Typographic Cards (No Logo Wall) */}
        <div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
            FEATURED OUTREACH LIST
          </p>
          <h2 className="font-display text-3xl font-semibold text-[#0f172a] mb-2">
            25 Featured Corporate &amp; Banking Entities
          </h2>
          <p className="text-xs text-[#526075] mb-5">
            Compiled for planned sponsorship &amp; partnership benchmarking; listing does not imply
            confirmed sponsorship or endorsement.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {FEATURED_25_BRANDS.map((brand, idx) => (
              <InteractiveCard
                key={brand}
                className="rounded-xl px-4 py-3.5 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <span className="font-mono text-[10px] font-semibold text-[#8a5d14] block tabular-nums">
                    NO. {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-semibold text-[#0f172a] leading-snug line-clamp-2 mt-0.5 block">
                    {brand}
                  </span>
                </div>
                <span className="font-mono text-[11px] font-semibold text-[#526075] shrink-0">
                  {getInitials(brand)}
                </span>
              </InteractiveCard>
            ))}
          </div>
        </div>

        {/* 500+ Searchable Directory */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-1">
                CORPORATE 500+ INDEX
              </p>
              <h2 className="font-display text-3xl font-semibold text-[#0f172a]">
                Searchable Corporate Directory ({CORPORATE_500_DIRECTORY.length} Companies)
              </h2>
            </div>
            <p className="text-xs font-medium text-[#526075] tabular-nums">
              Showing {slice.length} of {filtered.length} matching companies (Page {safePage} of{' '}
              {totalPages})
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#e4dfd5] p-5 mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
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
                placeholder="Search company name, symbol (e.g. TVSMOTOR), city or sector..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#8a5d14]"
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
                className="min-w-0 flex-1 px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#8a5d14]"
              >
                {sectors.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {(query || sector !== 'All') && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setSector('All');
                    setPage(1);
                  }}
                  className="px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] hover:border-[#8a5d14] text-xs font-medium text-[#0f172a] cursor-pointer shrink-0"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#e4dfd5] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0c121d] text-[#e6c67e] font-mono text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-semibold">Rank</th>
                    <th className="py-3.5 px-4 font-semibold">Company</th>
                    <th className="py-3.5 px-4 font-semibold">Symbol</th>
                    <th className="py-3.5 px-4 font-semibold">Sector</th>
                    <th className="py-3.5 px-4 font-semibold">Headquarters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e4dfd5] text-sm">
                  {slice.map((c) => (
                    <tr key={c.rank + c.symbol} className="hover:bg-[#fafaf8] transition-colors">
                      <td className="py-3 px-4 font-mono text-xs text-[#8a5d14] font-semibold tabular-nums">
                        #{String(c.rank).padStart(3, '0')}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#0f172a]">{c.name}</td>
                      <td className="py-3 px-4 font-mono text-xs text-[#526075]">{c.symbol}</td>
                      <td className="py-3 px-4 text-[#334155]">{c.category}</td>
                      <td className="py-3 px-4 text-[#526075]">{c.headquarters}</td>
                    </tr>
                  ))}
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
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg border border-[#cfc8b8] bg-white text-xs font-medium text-[#0f172a] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg border border-[#cfc8b8] bg-white text-xs font-medium text-[#0f172a] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0c121d] text-[#f8f7f3] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#8a5d14]"
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
                      ? 'bg-[#0c121d] text-[#e6c67e]'
                      : 'bg-[#fafaf8] text-[#334155] border border-[#e4dfd5] hover:border-[#8a5d14]'
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
          {filtered.map((a) => (
            <InteractiveCard
              key={a.no}
              className="rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-mono font-semibold text-[#8a5d14] tabular-nums">
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
              <div className="mt-4 pt-3 border-t border-[#e4dfd5] flex items-center justify-between text-xs text-[#526075]">
                <span>{a.category}</span>
                <Users className="w-4 h-4 text-[#8a5d14]" aria-hidden="true" />
              </div>
            </InteractiveCard>
          ))}
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
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="BANKS IN INDIA (RBI DIRECTORY)"
        title="120 RBI-Recognised Banks."
        subtitle="Comprehensive lending ecosystem directory spanning SBI & Nationalised Banks, Domestic Private Sector Banks, Small Finance Banks, Payments Banks, Regional Rural Banks, and Foreign Banks."
        image={MEDIA_ASSETS.trackBankLoans}
        imageAlt="Senior Indian banking director consulting with young Indian entrepreneurs"
        ctaLabel="Apply for Bank Loans Track"
        ctaHref="/apply?track=Bank%20Loans"
        stats={[
          { value: '120', label: 'Banks Listed' },
          { value: '6', label: 'RBI Categories' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 space-y-10">
        {/* Clean Restraint Showcase Strip (12 Featured Institutional Logos) */}
        <div className="bg-white rounded-2xl border border-[#e4dfd5] p-6 sm:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14]">
                SELECTED SCHEDULED BANK EMBLEMS
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#0f172a] mt-1">
                Major Public, Private &amp; Foreign Banks in Directory
              </h2>
            </div>
            <span className="text-xs text-[#526075]">
              Reference institutional marks; listing does not imply lending participation.
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {FEATURED_SHOWCASE_BANKS.map((bankName) => (
              <div
                key={bankName}
                className="rounded-xl border border-[#e4dfd5] bg-[#fafaf8] p-3 flex flex-col items-center justify-between gap-2 text-center"
              >
                <InstitutionLogoMark name={bankName} size="md" className="w-full" />
                <span className="text-[11px] font-medium text-[#0f172a] leading-tight line-clamp-2">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#8a5d14]"
              />
            </div>

            <div className="md:col-span-5 flex items-center gap-3">
              <select
                aria-label="Filter banks by RBI category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="min-w-0 flex-1 px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#8a5d14]"
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
                  className="px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] hover:border-[#8a5d14] text-xs font-medium text-[#0f172a] cursor-pointer shrink-0"
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
                      ? 'bg-[#0c121d] text-[#e6c67e]'
                      : 'bg-[#fafaf8] text-[#334155] border border-[#e4dfd5] hover:border-[#8a5d14]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <p className="text-xs font-medium text-[#526075] tabular-nums">
            Showing <strong className="text-[#0f172a]">{filtered.length}</strong> of{' '}
            {BANKS_120.length} RBI-listed banks
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((bank, idx) => (
            <InteractiveCard
              key={bank.category + bank.serial + idx}
              className="rounded-xl p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="font-mono text-[11px] font-semibold text-[#8a5d14] tabular-nums">
                    {bank.serial}
                  </span>
                  <span className="text-[11px] font-medium text-[#526075] truncate">
                    {bank.category}
                  </span>
                </div>
                <h2 className="font-display text-xl font-semibold text-[#0f172a] leading-snug">
                  {bank.name}
                </h2>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e4dfd5] flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#526075]">
                  <Landmark className="w-3.5 h-3.5 text-[#8a5d14]" aria-hidden="true" />
                  <span>RBI Scheduled Directory</span>
                </span>
                <a
                  href={bank.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#8a5d14] hover:underline"
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
        stats={[
          { value: '50', label: 'Institutions' },
          { value: '5', label: 'Financial Verticals' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="bg-white rounded-2xl border border-[#e4dfd5] p-5 sm:p-6 mb-8 space-y-4">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#8a5d14]"
              />
            </div>

            <div className="md:col-span-5 flex flex-wrap sm:flex-nowrap items-center gap-3">
              <select
                aria-label="Filter financial brands by category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="min-w-0 flex-1 px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#8a5d14]"
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
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] hover:border-[#8a5d14] text-xs font-medium text-[#0f172a] whitespace-nowrap shrink-0 cursor-pointer"
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
                      ? 'bg-[#0c121d] text-[#e6c67e]'
                      : 'bg-[#fafaf8] text-[#334155] border border-[#e4dfd5] hover:border-[#8a5d14]'
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
          {filtered.map((brand) => (
            <InteractiveCard
              key={brand.rank + brand.name}
              className="rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#e4dfd5]">
                  <span className="font-mono text-[11px] font-semibold text-[#8a5d14] tabular-nums">
                    RANK #{brand.rank}
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#0c121d]">
                    {brand.initials || getInitials(brand.name)}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-xl font-semibold text-[#0f172a] leading-snug">
                  {brand.name}
                </h2>
                <p className="mt-1.5 text-sm text-[#334155]">{brand.focus}</p>
              </div>
              <p className="mt-4 pt-2.5 border-t border-[#e4dfd5] text-[11px] font-medium text-[#526075]">
                {brand.category}
              </p>
            </InteractiveCard>
          ))}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
