import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Cpu,
  Globe,
  Handshake,
  Landmark,
  LayoutGrid,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react';
import {
  CHIEF_GUEST_ROLES,
  COMMITTEES,
  EVENT_SCHEDULE_SLOTS,
  EVENT_TEAMS,
  FIRST_LEVEL_GUIDANCE_STEPS,
  MEDIA_ASSETS,
  SPONSORSHIP_TIERS,
} from '../../data/homeAndPrograms';
import { WOMEN_ENTREPRENEURS } from '../../data/directories';
import { ORGANISER_CONTACT } from '../../data/siteNavigation';
import {
  COMMITTEE_REVIEWER_PROFILES,
  resolvePortraitUrl,
  type CommitteeReviewerProfile,
} from '../../data/portraits';
import { Link } from '../../lib/router';
import { AvatarPortrait } from '../AvatarPortrait';
import {
  InteractiveCard,
  ParallaxFrame,
  ScrollReveal,
  StaggerCard,
  StaggerGrid,
} from '../MotionPrimitives';

const AI_EXPERT_MODULES = [
  {
    id: 'ai-diligence',
    kicker: 'AI DUE DILIGENCE',
    title: 'AI in Investment Validation & Market Intelligence',
    summary:
      'How institutional committees evaluate unit-economics projections, customer cohort stability, and automation defensibility before capital deployment.',
    bullets: [
      'Financial model sensitivity & cash-runway stress testing',
      'Market sizing validation across manufacturing and SaaS sectors',
      'Governance controls for AI-assisted risk underwriting',
    ],
  },
  {
    id: 'cfo-discipline',
    kicker: 'CFO KEYNOTE SERIES',
    title: 'Financial Management, Failure Lessons & 5-Year Plans',
    summary:
      'Seasoned CFOs unpack working-capital discipline, debt-to-equity balance, and transparent failure case studies for scaling Indian enterprises.',
    bullets: [
      'Structuring ₹50L–₹500Cr debt and equity proposals without dilution shocks',
      'Audit readiness for scheduled commercial bank underwriting desks',
      'Five-year capital allocation milestones prior to interstate expansion',
    ],
  },
  {
    id: 'future-outlook',
    kicker: 'FUTURE OF AI CAPITAL',
    title: 'Next-Decade Capital Corridors & Cross-Border Ventures',
    summary:
      'Forward-looking dialogue linking Tamil Nadu industrial clusters with global AI tooling, EV supply chains, and Singapore-India joint ventures.',
    bullets: [
      'Deep-tech manufacturing and industrial robotics thesis frameworks',
      'Cross-border FDI compliance and technology transfer structures',
      'Capital efficiency benchmarks for 2027 growth cohorts',
    ],
  },
] as const;

const PITCH_HALLS = [
  {
    id: 'hall-1',
    code: 'HALL 01',
    title: 'Main Plenary, Startups & AI Capital',
    capacity: 'Seed to Series A · AI Ventures',
    schedule: '8:00 AM – 2:00 PM Live Pitches · 2:00 PM – 6:00 PM Closing',
    highlights: [
      '100 Validated Startups structured pitch windows (8–10 min + Q&A)',
      'Chief Guest & CFO keynote stage alongside Angel / VC syndicates',
      'Direct coordination with Startup & Validation Committees',
    ],
  },
  {
    id: 'hall-2',
    code: 'HALL 02',
    title: 'Commercial Banking & Business Loans',
    capacity: 'RBI Banks (120) · Working Capital',
    schedule: '8:00 AM – 2:00 PM Credit Reviews · 2:00 PM – 6:00 PM Call Reports',
    highlights: [
      'Dedicated scheduled banking credit officers & MSME loan booths',
      'Private underwriting review rooms (M1–M3) for CMA & project reports',
      'Support across First Level Business Guidance & Loan readiness',
    ],
  },
  {
    id: 'hall-3',
    code: 'HALL 03',
    title: 'Enterprise Expansion, Mixed & FDI',
    capacity: '₹10 Cr – ₹500 Cr · Cross-Border JVs',
    schedule: '8:00 AM – 2:00 PM Mandate Matching · 2:00 PM – 6:00 PM Wrap-up',
    highlights: [
      'International joint venture delegations & State/Central nodal desks',
      'Blended debt + private equity term-sheet structuring lounges (M4–M6)',
      'Corporate 500 procurement & strategic alliance tables',
    ],
  },
] as const;

export function HomeLeadershipAndOpsBand({
  onSelectReviewer,
}: {
  onSelectReviewer: (rev: CommitteeReviewerProfile) => void;
}) {
  const [activeAiId, setActiveAiId] = useState<string>(AI_EXPERT_MODULES[0].id);
  const [activeHallId, setActiveHallId] = useState<string>(PITCH_HALLS[0].id);
  const [boothLayout, setBoothLayout] = useState<'A' | 'B'>('A');
  const [activeGuidanceNo, setActiveGuidanceNo] = useState<string>(FIRST_LEVEL_GUIDANCE_STEPS[0].no);
  const [activeSponsorId, setActiveSponsorId] = useState<string>(SPONSORSHIP_TIERS[0].id);
  const [expandedCommitteeTitle, setExpandedCommitteeTitle] = useState<string | null>(
    COMMITTEES[0].title
  );
  const [activeTeamNo, setActiveTeamNo] = useState<string>(EVENT_TEAMS[0].no);
  const [scheduleBlock, setScheduleBlock] = useState<'morning' | 'afternoon'>('morning');

  const activeAi = AI_EXPERT_MODULES.find((m) => m.id === activeAiId) ?? AI_EXPERT_MODULES[0];
  const activeHall = PITCH_HALLS.find((h) => h.id === activeHallId) ?? PITCH_HALLS[0];
  const activeGuidance =
    FIRST_LEVEL_GUIDANCE_STEPS.find((g) => g.no === activeGuidanceNo) ??
    FIRST_LEVEL_GUIDANCE_STEPS[0];
  const activeSponsor =
    SPONSORSHIP_TIERS.find((s) => s.id === activeSponsorId) ?? SPONSORSHIP_TIERS[0];
  const activeTeam = EVENT_TEAMS.find((t) => t.no === activeTeamNo) ?? EVENT_TEAMS[0];

  const featuredWomen = WOMEN_ENTREPRENEURS.slice(0, 8);
  const visibleSlots =
    scheduleBlock === 'morning'
      ? EVENT_SCHEDULE_SLOTS.slice(0, 6)
      : EVENT_SCHEDULE_SLOTS.slice(6);

  const committeeIcons = [Rocket, Landmark, Globe, Wallet, Briefcase];

  return (
    <>
      {/* WOMEN ENTREPRENEURS SPOTLIGHT */}
      <section
        id="section-women"
        className="bg-[#fdf8f6] text-[#0f172a] py-16 sm:py-20 border-b border-[#f1e4e0]"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <ScrollReveal className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9d174d]">
                <Award className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WOMEN ENTREPRENEURS · LEADERSHIP COHORT</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#091326]">
                Indian Women Founders &amp; Industrial Leaders
              </h2>
              <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                Dedicated executive representation spotlighting industrialists, EV pioneers, deep-tech
                builders, agritech founders, and women-led consumer brands across India.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/women-entrepreneurs"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#831843] hover:bg-[#9d174d] text-white text-xs font-semibold transition-colors"
                >
                  <span>Browse Full Women Entrepreneurs Directory</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/entrepreneurs"
                  className="text-xs font-semibold text-[#9d174d] hover:underline"
                >
                  100 Entrepreneurs Directory →
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.06} className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#f1e4e0] bg-white shadow-sm">
                <ParallaxFrame offset={12} className="aspect-[16/9] relative bg-[#091326]">
                  <img
                    src={MEDIA_ASSETS.womenLeadershipForum}
                    alt="Indian women founders and business executives collaborating at summit panel"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[112%] -mt-[6%] object-cover object-center"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#091326]/75 via-transparent to-transparent"
                  />
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#fbcfe8]">
                    <span>INDUSTRIAL · AI · EV · CONSUMER · AGRITECH</span>
                    <span>CHENNAI FORUM</span>
                  </div>
                </ParallaxFrame>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredWomen.map((leader) => {
              const portraitUrl = resolvePortraitUrl(leader.name);
              return (
                <InteractiveCard
                  key={leader.serial + leader.name}
                  className="rounded-xl p-4 bg-white border-[#f1e4e0] flex items-center gap-3.5"
                >
                  <AvatarPortrait name={leader.name} src={portraitUrl} size="md" />
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#9d174d] block">
                      {leader.sector}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-[#091326] truncate">
                      {leader.name}
                    </h3>
                    <p className="text-xs text-[#526075] truncate">{leader.company}</p>
                  </div>
                </InteractiveCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CHIEF GUESTS & VIP PERSONALITIES (TOP 30 SEAT MANDATES + SRINIVASAN RAJA A2B) */}
      <section
        id="section-chief-guests"
        className="bg-[#160b18] text-[#f8f7f3] py-16 sm:py-20 border-b border-white/10"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <ScrollReveal className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e6c67e] block">
                  VIP DISTINGUISHED PANEL · TOP 30 INVITED CHIEF GUESTS
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
                  Chief Guests &amp; Institutional Authorities
                </h2>
                <p className="text-sm sm:text-base text-[#e2d5e6] leading-relaxed">
                  Thirty Chief Guest seats uniting Scheduled Bank Leaders, Senior CFOs, Venture &amp;
                  Risk Experts, Government Representatives, AI Strategists, and Industrial Pioneers.
                </p>
              </div>

              {/* Confirmed Named VIP Reference: Mr. Srinivasan Raja — A2B */}
              <div className="rounded-2xl border border-[#c49a45]/45 bg-[#221126] p-5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border border-[#e6c67e]/50 bg-[#0c121d] flex flex-col items-center justify-center shrink-0 text-center">
                  <span className="font-display text-lg font-bold text-[#e6c67e] leading-none">
                    SR
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[#94a3b8] mt-1">
                    A2B VIP
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#e6c67e] block">
                    DISTINGUISHED GUEST SPOTLIGHT · FOOD &amp; HOSPITALITY
                  </span>
                  <h3 className="font-display text-xl font-semibold text-white mt-0.5">
                    Mr. Srinivasan Raja
                  </h3>
                  <p className="text-xs text-[#cbd5e1]">
                    Managing Director, Adyar Ananda Bhavan (A2B) · Verified portrait awaited
                  </p>
                </div>
              </div>

              <div>
                <Link
                  href="/chief-guests"
                  className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold"
                >
                  <span>Inspect All 30 Chief Guest Seats</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CHIEF_GUEST_ROLES.map((item, idx) => (
                <InteractiveCard
                  key={item.role}
                  dark
                  className="rounded-xl p-5 !bg-[#221126] border-white/15 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[10px] font-semibold text-[#e6c67e]">
                        BENCH 0{idx + 1} · 5 SEATS
                      </span>
                      <ShieldCheck className="w-4 h-4 text-[#c49a45]" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white">
                      {item.role}
                    </h3>
                    <p className="mt-2 text-xs text-[#d8c8de] leading-relaxed">{item.focus}</p>
                  </div>
                  <span className="pt-3 border-t border-white/10 font-mono text-[10px] uppercase tracking-wider text-[#94a3b8]">
                    Written confirmation status tracked
                  </span>
                </InteractiveCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI EXPERT, CFO POINTS & INVESTOR TEAM ADVISORY */}
      <section
        id="section-ai-expert"
        data-section-order="8"
        className="bg-[#091326] text-[#f8f7f3] py-16 sm:py-20 border-b border-white/10"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <ScrollReveal className="lg:col-span-6">
              <InteractiveCard dark className="rounded-2xl overflow-hidden group !bg-[#111927]">
                <ParallaxFrame offset={16} className="relative h-64 sm:h-80 w-full bg-[#0c121d]">
                  <img
                    src={MEDIA_ASSETS.aiExpertsStage}
                    alt="AI & venture plenary auditorium dialogue setup in Chennai"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[112%] -mt-[6%] object-cover object-center interactive-media"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#111927] via-[#111927]/35 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e6c67e]">
                      <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>AI EXPERTS &amp; CFO KEYNOTES</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#cbd5e1]">
                      Hall 1 Plenary Desk
                    </span>
                  </div>
                </ParallaxFrame>
                <div className="p-7 pt-5 space-y-4">
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                    AI Investment Tools, CFO Points &amp; Investor Team
                  </h2>
                  <p className="text-sm text-[#cbd5e1] leading-relaxed">
                    Plenary guidance uniting AI due-diligence tools, CFO 5-year financial models,
                    failure case reviews, and structured Investor Team budget-band matching.
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                      <Link href="/ai-experts" className="text-[#e6c67e] hover:underline">
                        AI Experts →
                      </Link>
                      <Link href="/cfo-points" className="text-[#5eead4] hover:underline">
                        CFO Points →
                      </Link>
                      <Link href="/investor-team" className="text-[#93c5fd] hover:underline">
                        Investor Team →
                      </Link>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelectReviewer(COMMITTEE_REVIEWER_PROFILES[0])}
                      className="text-xs font-semibold text-[#e6c67e] hover:text-white cursor-pointer"
                    >
                      Inspect Reviewer Profile →
                    </button>
                  </div>
                </div>
              </InteractiveCard>
            </ScrollReveal>

            <ScrollReveal delay={0.06} className="lg:col-span-6 space-y-5">
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="AI Expert plenary topics">
                {AI_EXPERT_MODULES.map((mod) => {
                  const active = mod.id === activeAiId;
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveAiId(mod.id)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#6d28d9] text-white border border-[#8b5cf6]'
                          : 'bg-[#111927] text-[#cbd5e1] border border-white/15 hover:border-[#c49a45]/60'
                      }`}
                    >
                      {mod.kicker}
                    </button>
                  );
                })}
              </div>

              <InteractiveCard dark className="rounded-2xl p-6 sm:p-7 space-y-5 !bg-[#111927]">
                <div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#14b8a6]">
                    PLENARY TRACK FOCUS · {activeAi.kicker}
                  </span>
                  <h3 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-white">
                    {activeAi.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#cbd5e1] leading-relaxed">{activeAi.summary}</p>
                </div>

                <ul className="space-y-2.5 pt-2 border-t border-white/10">
                  {activeAi.bullets.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#e2e8f0]">
                      <Check className="w-4 h-4 text-[#14b8a6] mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-[#94a3b8]">
                    Synced with Validation Team &amp; Investor Team Points.
                  </span>
                  <Link
                    href="/validation-team"
                    className="btn-gold inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold"
                  >
                    <span>Validation Standards</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </InteractiveCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PITCH AREA & THREE-HALL ARCHITECTURAL LAYOUT */}
      <section
        id="section-pitch-area"
        className="bg-white text-[#0f172a] py-16 sm:py-20 border-b border-[#e4dfd5]"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1d4ed8] mb-1.5">
                <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                <span>VENUE FLOOR · PITCH AREA &amp; DEAL ROOMS M1–M6</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#091326]">
                Three-Hall Pitch Area &amp; Exhibition Layouts
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#334155] leading-relaxed">
                Pre-validated startups and enterprises present inside scheduled Hall 1–3 time
                blocks supported by 6 private negotiation rooms (M1–M6) and modular booth layouts.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/pitch-area"
                className="text-xs font-semibold text-[#1d4ed8] hover:underline"
              >
                Pitch Area Protocol →
              </Link>
              <Link
                href="/venue"
                className="btn-obsidian inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap"
              >
                <span>Open Interactive Venue Maps</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 flex flex-col gap-3" role="tablist" aria-label="Select Pitch Hall">
              {PITCH_HALLS.map((hall) => {
                const active = hall.id === activeHallId;
                return (
                  <button
                    key={hall.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveHallId(hall.id)}
                    className={`rounded-xl border p-5 text-left transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#091326] text-white border-[#091326] shadow-md'
                        : 'bg-[#fafaf8] text-[#0f172a] border-[#e4dfd5] hover:border-[#1d4ed8]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                          active ? 'text-[#e6c67e]' : 'text-[#1d4ed8]'
                        }`}
                      >
                        {hall.code} · {hall.capacity}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 ${active ? 'text-[#e6c67e]' : 'text-[#526075]'}`}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-1 font-display text-xl font-semibold">{hall.title}</h3>
                    <p className={`mt-1 text-xs ${active ? 'text-[#cbd5e1]' : 'text-[#526075]'}`}>
                      {hall.schedule}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 rounded-2xl border border-[#e4dfd5] bg-[#fafaf8] p-6 sm:p-7 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#e4dfd5]">
                  <div>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1d4ed8] block">
                      {activeHall.code} FLOOR ASSIGNMENT
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-[#091326] mt-0.5">
                      {activeHall.title}
                    </h3>
                  </div>
                  <div className="inline-flex rounded-lg border border-[#e4dfd5] bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setBoothLayout('A')}
                      className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                        boothLayout === 'A'
                          ? 'bg-[#091326] text-[#e6c67e]'
                          : 'text-[#526075] hover:text-[#091326]'
                      }`}
                    >
                      Layout A (20 Booths)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBoothLayout('B')}
                      className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                        boothLayout === 'B'
                          ? 'bg-[#091326] text-[#e6c67e]'
                          : 'text-[#526075] hover:text-[#091326]'
                      }`}
                    >
                      Layout B (30 Booths)
                    </button>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {activeHall.highlights.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-[#334155]">
                      <Check className="w-4 h-4 text-[#0d9488] mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#e4dfd5]">
                <div className="rounded-lg bg-white border border-[#e4dfd5] p-3">
                  <span className="font-mono text-[10px] text-[#526075] block">ACTIVE CONFIG</span>
                  <strong className="font-mono text-sm font-bold text-[#091326]">
                    {boothLayout === 'A' ? '20 Sponsor / Expo Booths' : '30 High-Density Booths'}
                  </strong>
                </div>
                <div className="rounded-lg bg-white border border-[#e4dfd5] p-3">
                  <span className="font-mono text-[10px] text-[#526075] block">PRIVATE ROOMS</span>
                  <strong className="font-mono text-sm font-bold text-[#1d4ed8]">
                    Rooms M1 to M6
                  </strong>
                </div>
                <div className="rounded-lg bg-white border border-[#e4dfd5] p-3 col-span-2 sm:col-span-1">
                  <span className="font-mono text-[10px] text-[#526075] block">SUMMIT HOURS</span>
                  <strong className="font-mono text-sm font-bold text-[#0f766e]">
                    8:00 AM – 6:00 PM
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FIRST LEVEL BUSINESS GUIDANCE & CONSULTATION DESK */}
      <section
        id="section-guidance"
        className="bg-[#fafaf8] text-[#0f172a] py-16 sm:py-20 border-b border-[#e4dfd5]"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <ScrollReveal className="lg:col-span-7 space-y-5">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4338ca] mb-1.5">
                FIRST LEVEL BUSINESS GUIDANCE · 10-STEP CLINIC
              </p>
              <h2 className="font-display text-3xl font-semibold text-[#091326]">
                First Level Business Guidance
              </h2>
              <p className="mt-2 text-sm text-[#334155] leading-relaxed">
                Structured preparation steps for founders, MSMEs, and new business applicants prior
                to locking track selection or fee tiers.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {FIRST_LEVEL_GUIDANCE_STEPS.map((g) => {
                const active = g.no === activeGuidanceNo;
                return (
                  <button
                    key={g.no}
                    type="button"
                    onClick={() => setActiveGuidanceNo(g.no)}
                    className={`px-3 py-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#312e81] text-[#fde68a] border-[#312e81]'
                        : 'bg-white text-[#334155] border-[#e4dfd5] hover:border-[#4338ca]/60'
                    }`}
                  >
                    <span className="font-mono text-[10px] font-semibold block opacity-85">
                      STEP {g.no}
                    </span>
                    <span className="text-xs font-semibold line-clamp-1 mt-0.5">{g.title}</span>
                  </button>
                );
              })}
            </div>

            <InteractiveCard className="rounded-2xl p-6 bg-white space-y-4">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#e4dfd5]">
                <div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#4338ca]">
                    READINESS MODULE {activeGuidance.no} OF 10
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-[#091326] mt-0.5">
                    {activeGuidance.title}
                  </h3>
                </div>
                <Handshake className="w-5 h-5 text-[#c49a45] shrink-0" aria-hidden="true" />
              </div>

              <p className="text-sm text-[#334155] leading-relaxed">{activeGuidance.desc}</p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href="/business-guidance"
                  className="btn-obsidian inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold"
                >
                  <span>Explore All 10 Guidance Steps</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact?subject=Consultation"
                  className="text-xs font-semibold text-[#4338ca] hover:underline inline-flex items-center gap-1"
                >
                  <span>Request Guidance Slot</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </InteractiveCard>
          </ScrollReveal>

          {/* Dedicated Consultation Card */}
          <ScrollReveal delay={0.06} className="lg:col-span-5">
            <div
              id="section-consultation"
              className="rounded-2xl bg-gradient-to-br from-[#091326] via-[#131f3b] to-[#1e1b4b] text-[#f8f7f3] p-6 sm:p-7 space-y-5 border border-[#c49a45]/35 shadow-lg"
            >
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e6c67e] block">
                    DEDICATED CONSULTATION DESK
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mt-0.5">
                    One-to-One Pre-Summit Consultation
                  </h3>
                </div>
                <Briefcase className="w-6 h-6 text-[#e6c67e] shrink-0" aria-hidden="true" />
              </div>

              <p className="text-sm text-[#cbd5e1] leading-relaxed">
                Verify track fit across Startups, Business Loans, Expansion, or Mixed Capital with
                Mr. Rajganesh’s Organiser Desk prior to 01-02-2027.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-[#e2e8f0]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Track suitability check across ₹50 Lakhs – ₹500 Crore raises</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Pitch deck &amp; Project Financial Plan readiness assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Fee ladder alignment (₹10,000–₹50,000 · Available slots only)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>Automated alerts routed to {ORGANISER_CONTACT.notificationEmail}</span>
                </li>
              </ul>

              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs font-mono text-[#cbd5e1]">
                  <span className="block text-[#e6c67e] font-semibold">
                    {ORGANISER_CONTACT.contactPerson} · {ORGANISER_CONTACT.phone}
                  </span>
                  <span>{ORGANISER_CONTACT.email}</span>
                </div>
                <a
                  href="#section-contact"
                  className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap"
                >
                  <span>Enquire Below</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SPONSORS & PARTNERSHIP DELIVERABLES MATRIX */}
      <section
        id="section-sponsors"
        className="bg-white text-[#0f172a] py-16 sm:py-20 border-b border-[#e4dfd5]"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a5d14] mb-1.5">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>CORPORATE PARTNERSHIPS · SIX STRUCTURED TIERS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#091326]">
                Sponsors &amp; Partnership Opportunities
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#334155] leading-relaxed">
                Transparent corporate partnership tiers ranging from Title Sponsor (₹20 Lakhs) to
                Tag Line Partner (₹2 Lakhs), governed by written deliverables.
              </p>
            </div>
            <Link
              href="/sponsors"
              className="btn-obsidian inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap"
            >
              <span>Inspect Full Sponsorship Terms</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5" role="tablist" aria-label="Sponsorship tiers">
            {SPONSORSHIP_TIERS.map((tier) => {
              const active = tier.id === activeSponsorId;
              return (
                <button
                  key={tier.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveSponsorId(tier.id)}
                  className={`rounded-xl border p-4 text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-[#091326] text-white border-[#c49a45] shadow-md'
                      : 'bg-[#fafaf8] text-[#0f172a] border-[#e4dfd5] hover:border-[#c49a45]'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] font-semibold uppercase block ${
                      active ? 'text-[#e6c67e]' : 'text-[#8a5d14]'
                    }`}
                  >
                    {tier.amount}
                  </span>
                  <strong className="mt-1 block font-display text-lg font-semibold leading-snug">
                    {tier.name}
                  </strong>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-[#e4dfd5] bg-[#fafaf8] p-6 sm:p-7 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#e4dfd5]">
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#8a5d14] block">
                  WRITTEN SPONSOR DELIVERABLES (10 POINTS)
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#091326]">
                  {activeSponsor.name} — {activeSponsor.amount}
                </h3>
              </div>
              <Link
                href="/contact?subject=Sponsorship"
                className="btn-gold inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap"
              >
                <span>Request Sponsorship Deck</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
              {activeSponsor.deliverables.map((item, idx) => (
                <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155]">
                  <span className="font-mono text-[11px] font-bold text-[#8a5d14] mt-0.5 shrink-0">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FIVE COMMITTEES & FIVE ORGANIZING TEAMS (5 × 5) */}
      <section
        id="section-committees"
        data-section-order="9"
        className="bg-[#fafaf8] text-[#0f172a] py-16 sm:py-20 border-b border-[#e4dfd5]"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-8">
            <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1d4ed8] mb-2">
                  GOVERNANCE STRUCTURE · 5 COMMITTEES
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0f172a]">
                  Planning Committees &amp; Review Governance
                </h2>
                <p className="mt-2 text-sm text-[#334155] leading-relaxed">
                  Click any committee card below to inspect review scope. Confirmed chair appointees
                  are published strictly upon written acceptance.
                </p>
              </div>
              <Link
                href="/team"
                className="btn-obsidian inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap"
              >
                <span>Open Full Committees &amp; 5 × 5 Team</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </ScrollReveal>

            <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {COMMITTEES.map((committee, idx) => {
                const Icon = committeeIcons[idx % committeeIcons.length];
                const isExpanded = expandedCommitteeTitle === committee.title;
                const spanClass = idx < 2 ? 'lg:col-span-3 h-full' : 'lg:col-span-2 h-full';
                return (
                  <StaggerCard key={committee.title} className={spanClass}>
                    <InteractiveCard
                      as="button"
                      ariaExpanded={isExpanded}
                      onClick={() =>
                        setExpandedCommitteeTitle(isExpanded ? null : committee.title)
                      }
                      className={`rounded-2xl overflow-hidden flex flex-col justify-between h-full transition-colors ${
                        isExpanded ? 'ring-2 ring-[#1d4ed8] border-[#1d4ed8] bg-[#f8fafc]' : ''
                      }`}
                    >
                      <div className="w-full">
                        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#091326]">
                          <img
                            src={committee.image}
                            alt={committee.imageAlt}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover object-center hero-image-enhanced interactive-media"
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-[#091326]/80 via-[#091326]/15 to-transparent"
                          />
                          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#e6c67e]">
                              COMMITTEE 0{idx + 1}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm text-white flex items-center justify-center">
                              <Icon className="w-4 h-4" aria-hidden="true" />
                            </div>
                          </div>
                        </div>

                        <div className="p-6 pb-4">
                          <h3 className="font-display text-2xl font-semibold text-[#0f172a] leading-snug">
                            {committee.title}
                          </h3>
                          <p className="mt-2 text-sm text-[#334155] leading-relaxed">
                            {committee.description}
                          </p>
                          {isExpanded && (
                            <p className="mt-3 pt-3 border-t border-[#e4dfd5] text-xs text-[#1d4ed8] font-medium">
                              Governs 90 Days Policy pre-summit eligibility verification and hall
                              slot alignment.
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="px-6 pb-5 pt-3 border-t border-[#e4dfd5] font-mono text-[11px] uppercase tracking-wider text-[#526075] w-full flex items-center justify-between">
                        <span>Awaiting confirmation</span>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            isExpanded ? 'rotate-90 text-[#1d4ed8]' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </p>
                    </InteractiveCard>
                  </StaggerCard>
                );
              })}
            </StaggerGrid>
          </div>

          {/* 5 Operational Organizing Teams Preview */}
          <div className="rounded-2xl border border-[#e4dfd5] bg-white p-6 sm:p-7 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e4dfd5]">
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#1d4ed8] block">
                  FIVE ORGANIZING TEAMS · FIVE MEMBERS EACH (25 SEATS)
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#091326] mt-0.5">
                  Organizing Operations Directory
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Organizing teams selector">
                {EVENT_TEAMS.map((team) => {
                  const active = team.no === activeTeamNo;
                  return (
                    <button
                      key={team.no}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTeamNo(team.no)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                        active
                          ? 'bg-[#091326] text-[#e6c67e]'
                          : 'bg-[#fafaf8] text-[#334155] border border-[#e4dfd5] hover:border-[#1d4ed8]'
                      }`}
                    >
                      {team.title}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-3">
                <p className="text-sm font-medium text-[#091326]">{activeTeam.summary}</p>
                <ul className="space-y-2 text-xs text-[#334155]">
                  {activeTeam.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0d9488] mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeTeam.members.map((m) => (
                  <div
                    key={m.slot}
                    className="rounded-xl border border-[#e4dfd5] bg-[#fafaf8] px-3.5 py-3 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] text-[#526075] block">
                        SLOT {m.slot} · {m.status}
                      </span>
                      <p className="text-xs font-semibold text-[#091326] truncate">{m.name}</p>
                      <p className="text-[11px] text-[#526075] truncate">{m.role}</p>
                    </div>
                    <Users className="w-3.5 h-3.5 text-[#1d4ed8] shrink-0" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT SCHEDULE (8 AM – 6 PM) & IMPORTANT DATES */}
      <section
        id="section-schedule"
        className="bg-white text-[#0f172a] py-16 sm:py-20 border-b border-[#e4dfd5]"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0f766e] mb-1.5">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>20-02-2027 SUMMIT AGENDA · 8:00 AM – 6:00 PM</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#091326]">
                Full-Day Event Schedule &amp; Key Dates
              </h2>
            </div>

            <div className="inline-flex rounded-lg border border-[#e4dfd5] bg-[#fafaf8] p-1">
              <button
                type="button"
                onClick={() => setScheduleBlock('morning')}
                className={`px-4 py-2 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                  scheduleBlock === 'morning'
                    ? 'bg-[#091326] text-[#e6c67e]'
                    : 'text-[#526075] hover:text-[#091326]'
                }`}
              >
                Morning Block (8 AM – 2 PM)
              </button>
              <button
                type="button"
                onClick={() => setScheduleBlock('afternoon')}
                className={`px-4 py-2 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                  scheduleBlock === 'afternoon'
                    ? 'bg-[#091326] text-[#e6c67e]'
                    : 'text-[#526075] hover:text-[#091326]'
                }`}
              >
                Afternoon Block (2 PM – 6 PM)
              </button>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 rounded-2xl border border-[#e4dfd5] bg-[#fafaf8] divide-y divide-[#e4dfd5] overflow-hidden">
              {visibleSlots.map((slot) => (
                <div
                  key={slot.time}
                  className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#1d4ed8] tabular-nums w-36 shrink-0">
                      {slot.time}
                    </span>
                    <span className="text-sm font-medium text-[#091326]">{slot.activity}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#526075]">{slot.halls}</span>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 rounded-2xl border border-[#e4dfd5] bg-[#091326] text-white p-6 space-y-5">
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e6c67e]">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                <span>MANDATORY TIMELINE MILESTONES</span>
              </div>

              <div className="space-y-4 divide-y divide-white/10">
                <div className="pt-1">
                  <span className="font-mono text-xs text-[#5eead4] block">90 DAYS POLICY WINDOW</span>
                  <strong className="font-display text-lg text-white">Pre-Summit Validation</strong>
                  <p className="text-xs text-[#cbd5e1] mt-0.5">
                    3-month mandatory screening window across all 5 committees.
                  </p>
                </div>
                <div className="pt-3">
                  <span className="font-mono text-xs text-[#e6c67e] block">FINAL CUTOFF · 01-02-2027</span>
                  <strong className="font-display text-lg text-white">1 February 2027</strong>
                  <p className="text-xs text-[#cbd5e1] mt-0.5">
                    Registration closes for pitch deck &amp; bank underwriting scrutiny.
                  </p>
                </div>
                <div className="pt-3">
                  <span className="font-mono text-xs text-[#93c5fd] block">SUMMIT DAY · 20-02-2027</span>
                  <strong className="font-display text-lg text-white">20 February 2027 · Chennai</strong>
                  <p className="text-xs text-[#cbd5e1] mt-0.5">
                    Full-day deal flow across Halls 1, 2 &amp; 3 from 8:00 AM to 6:00 PM.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/schedule"
                  className="text-xs font-semibold text-[#e6c67e] hover:underline"
                >
                  Full Timetable →
                </Link>
                <Link
                  href="/registration-policy"
                  className="text-xs font-semibold text-[#5eead4] hover:underline"
                >
                  90 Days Policy (20 Reasons) →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
