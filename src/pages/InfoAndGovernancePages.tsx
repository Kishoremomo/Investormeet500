import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Cpu,
  ExternalLink,
  Globe,
  Info,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Search,
  Users,
} from 'lucide-react';
import {
  CASE_STUDY_REFERENCES,
  CENTRAL_GOVT_RESOURCES,
  CHIEF_GUEST_ROLES,
  COMMITTEES,
  EVENT_SCHEDULE_SLOTS,
  EVENT_TEAMS,
  FIRST_LEVEL_GUIDANCE_STEPS,
  INTERNATIONAL_GROUPS,
  MEDIA_ASSETS,
  NINETY_DAY_POLICY_GROUPS,
  STATE_GOVT_RESOURCES,
  VIDEO_ASSETS,
} from '../data/homeAndPrograms';
import {
  COMMITTEE_REVIEWER_PROFILES,
  PARTICIPANT_HIGHLIGHTS,
  resolvePortraitUrl,
  type CommitteeReviewerProfile,
  type ParticipantProfileHighlight,
} from '../data/portraits';
import { ORGANISER_CONTACT } from '../data/siteNavigation';
import {
  filterDiscoveryOpportunities,
  formatLakhsToDisplay,
  validateContactInput,
  type InvestmentTrack,
  type RegistrationRecord,
} from '../lib/domain';
import { Link, useQueryParam } from '../lib/router';
import { PageHero } from '../components/PageHero';
import { CtaBanner } from '../components/CtaBanner';
import { AvatarPortrait } from '../components/AvatarPortrait';
import { ParticipantDossierModal, ReviewerProfileModal } from '../components/ProfileModal';
import {
  ExpandablePanel,
  InteractiveCard,
  MagneticAction,
  ScrollReveal,
  StaggerCard,
  StaggerGrid,
} from '../components/MotionPrimitives';

function highlightToRegistrationRecord(p: ParticipantProfileHighlight): RegistrationRecord {
  const numericMatch = p.mandate.match(/[\d.]+/);
  const num = numericMatch ? parseFloat(numericMatch[0]) : 100;
  const isCrore = /cr/i.test(p.mandate);
  const funding_lakhs = Math.max(50, Math.round(isCrore ? num * 100 : num));
  return {
    id: p.id,
    full_name: p.fullName,
    company: p.company,
    email: 'desk@investormeet500.in',
    phone: '+91 80560 08962',
    industry: p.track,
    track: p.track as InvestmentTrack,
    participantType:
      p.category === 'Investor'
        ? 'Investor'
        : p.category === 'Exhibitor'
        ? 'Exhibitor'
        : 'Entrepreneur',
    funding_lakhs,
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
    createdAt: '2026-11-10T09:00:00.000Z',
    updatedAt: '2026-11-12T11:30:00.000Z',
  };
}

const ABOUT_OPERATION_STAGES = [
  {
    no: '01',
    title: 'Digital Intake & Screening',
    sla: 'Day 1 – 15',
    desc: 'Capture structured project funding scope (₹50 Lakhs to ₹500 Crore) and category alignment across Startups, Loans, and Expansion.',
    deliverable: 'Application Dossier ID + Sector Classification',
  },
  {
    no: '02',
    title: 'Validation Committee Audit',
    sla: 'Day 16 – 45',
    desc: 'Assess founder background, historical track record, financial readiness, statutory filings, and risk profile before summit approval.',
    deliverable: 'Committee Risk Memo & Readiness Status',
  },
  {
    no: '03',
    title: 'Hall & Investor Matchmaking',
    sla: 'Post 1 Feb 2027',
    desc: 'Pair validated participants with relevant investors, scheduled bank lenders, and dedicated Hall 1–3 pitch windows.',
    deliverable: 'Confirmed Summit Slot + Deal-Room Pass',
  },
  {
    no: '04',
    title: 'Closing Call Reports',
    sla: '20 Feb 2027 · 2–6 PM',
    desc: 'Capture structured follow-up commitments, requested due diligence items, and outcome summaries across the afternoon block.',
    deliverable: 'Signed Guarantee-Level Follow-Up Log',
  },
];

export function AboutPage() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const currentStage = ABOUT_OPERATION_STAGES[activeStageIdx];

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="ABOUT INVESTOR MEET 500"
        title="One Platform. Five Capital Pathways."
        subtitle="A structured one-day summit in Chennai on 20 February 2027 uniting 500 validated entrepreneurs, startups, corporate delegations, banks, and investors across three dedicated halls."
        image={MEDIA_ASSETS.aboutReception}
        imageAlt="Indian entrepreneurs and institutional delegates conversing in Chennai atrium"
        ctaLabel="Apply Now"
        ctaHref="/apply"
        stats={[
          { value: '500', label: 'Capacity' },
          { value: '3 Halls', label: 'Chennai Venue' },
          { value: '5', label: 'Tracks' },
        ]}
        anchors={[
          { label: 'Committees', href: '#committees' },
          { label: 'Operations', href: '#operations' },
          { label: 'Women Entrepreneurs', href: '#women-entrepreneurs' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-16">
        {/* 01 & 02 foundational overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InteractiveCard className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-[#8a5d14]">01 · ARCHITECTURE</span>
              <h2 className="mt-2 font-display text-3xl font-medium text-[#0f172a]">
                One platform. Five pathways.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#334155] leading-relaxed">
                Whether raising seed equity as a startup, requesting working capital via a Business
                Loan, scaling industrial capacity under Business Expansion, meeting scheduled lenders
                in Bank Loans, or assembling hybrid Mixed Loans, every participant enters a validated,
                structured pipeline rather than an uncurated trade show.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e4dfd5]">
              <Link
                href="/tracks"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a5d14] hover:text-[#0c121d] transition-colors"
              >
                <span>Explore all 5 tracks</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </InteractiveCard>

          <InteractiveCard className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-bold text-[#8a5d14]">02 · GOVERNANCE</span>
              <h2 className="mt-2 font-display text-3xl font-medium text-[#0f172a]">
                Preparation before participation
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#334155] leading-relaxed">
                The 90-day preparation standard requires applicants to register ahead of the 1
                February 2027 deadline so validation committees can review company background, past
                project execution, financial projections, and risk before assigning Hall 1, Hall 2, or
                Hall 3 meeting windows.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e4dfd5]">
              <Link
                href="/registration-policy"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8a5d14] hover:text-[#0c121d] transition-colors"
              >
                <span>Read 90-Day Policy</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </InteractiveCard>
        </div>

        {/* Committees — photo-free typographic InteractiveCards */}
        <div id="committees" className="scroll-mt-24">
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
            GOVERNANCE &amp; VALIDATION
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#0f172a] mb-6">
            Five Planning Committees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMMITTEES.map((c, idx) => (
              <InteractiveCard key={c.title} className="rounded-xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#e4dfd5]">
                    <span className="font-mono text-xs font-bold text-[#8a5d14]">
                      COMMITTEE 0{idx + 1}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#526075]">
                      Active Desk
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-medium text-[#0f172a]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#334155] leading-relaxed">{c.description}</p>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>

        {/* Interactive 4 Operations Stages Explorer */}
        <div id="operations" className="scroll-mt-24 space-y-6">
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
              EXECUTION ARCHITECTURE
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#0f172a]">
              Four Stages of Event Operations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ABOUT_OPERATION_STAGES.map((op, idx) => {
              const active = idx === activeStageIdx;
              return (
                <button
                  key={op.no}
                  type="button"
                  onClick={() => setActiveStageIdx(idx)}
                  className={`text-left rounded-xl border p-5 transition-all cursor-pointer ${
                    active
                      ? 'bg-[#0c121d] text-white border-[#0c121d] shadow-md'
                      : 'bg-white text-[#0f172a] border-[#e4dfd5] hover:border-[#8a5d14]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-mono text-xs font-bold ${active ? 'text-[#e6c67e]' : 'text-[#8a5d14]'}`}>
                      {op.no}
                    </span>
                    <span className={`font-mono text-[10px] uppercase ${active ? 'text-[#94a3b8]' : 'text-[#526075]'}`}>
                      {op.sla}
                    </span>
                  </div>
                  <h3 className={`mt-2 font-display text-xl font-medium ${active ? 'text-white' : 'text-[#0f172a]'}`}>
                    {op.title}
                  </h3>
                </button>
              );
            })}
          </div>

          <InteractiveCard dark tilt={false} className="rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#e6c67e]">
                  STAGE {currentStage.no} · {currentStage.sla}
                </span>
                <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-medium text-white">
                  {currentStage.title}
                </h3>
                <p className="mt-2 text-sm text-[#cbd5e1] leading-relaxed">{currentStage.desc}</p>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 shrink-0">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#94a3b8]">
                  Stage Output
                </span>
                <span className="mt-1 block text-sm font-semibold text-[#e6c67e]">
                  {currentStage.deliverable}
                </span>
              </div>
            </div>
          </InteractiveCard>
        </div>

        {/* Women Entrepreneurs spotlight */}
        <InteractiveCard
          id="women-entrepreneurs"
          dark
          tilt={false}
          className="scroll-mt-24 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#e6c67e]">
              WOMEN ENTREPRENEURS INITIATIVE
            </p>
            <h2 className="font-display text-3xl font-medium text-white mt-2">
              Dedicated Visibility for Women Business Leaders
            </h2>
            <p className="mt-2 text-sm text-[#cbd5e1] max-w-2xl leading-relaxed">
              Featuring a curated directory of 19 prominent women leaders and founders across
              manufacturing, AI, EV mobility, FMCG and global enterprises alongside six structured
              growth pillars.
            </p>
          </div>
          <MagneticAction strength={3}>
            <Link
              href="/women-entrepreneurs"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0"
            >
              <span>Explore Women Entrepreneurs</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </MagneticAction>
        </InteractiveCard>
      </section>

      <CtaBanner />
    </div>
  );
}

export function EventProgramPage() {
  const milestones = [
    {
      no: '01',
      window: '3+ Months Prior',
      title: 'Early Registration & Baseline Verification',
      detail: 'Open online submissions, verify participant credentials and assign preliminary sector buckets.',
    },
    {
      no: '02',
      window: '60 Days Prior',
      title: 'Validation Committee Reviews',
      detail: 'Evaluate company background, historical projects, financial plans and pitch readiness.',
    },
    {
      no: '03',
      window: '1 February 2027',
      title: 'Final Registration Cutoff',
      detail: 'Lock final 500 participant roster, print directories, badges and floor booth maps.',
    },
    {
      no: '04',
      window: '2 Weeks Prior',
      title: 'Pitch Area & Hall Scheduling',
      detail: 'Allocate Hall 1, Hall 2 and Hall 3 time slots and distribute confirmed meeting dossiers.',
    },
    {
      no: '05',
      window: '20 Feb 2027 · 8 AM – 2 PM',
      title: 'Investor Interactions & Track Pitches',
      detail: 'Execute structured pitch sessions, bank discussions and private one-to-one rooms.',
    },
    {
      no: '06',
      window: '20 Feb 2027 · 2 PM – 6 PM',
      title: 'Guarantee-Level Call Reports & Closing',
      detail: 'Log follow-up actions, record verified outcomes and close summit proceedings.',
    },
  ];

  const operationalBlocks = [
    {
      id: 'validation',
      no: '01',
      title: 'Validation Team & Risk Scrutiny',
      body: 'Every applicant undergoes background checks covering legal standing, founder experience, prior project execution, market demand, and realistic funding structures before being cleared to pitch.',
    },
    {
      id: 'pitch',
      no: '02',
      title: 'Pitch Area & Three-Hall Flow',
      body: 'Hall 1 hosts plenary keynotes and larger institutional rounds; Hall 2 handles Startup & Business Expansion pitches; Hall 3 supports Bank Loans, MSME credit desks and private deal tables.',
    },
    {
      id: 'promotion',
      no: '03',
      title: 'Online Operations & Event Promotion',
      body: 'Social media teams coordinate approved YouTube and Instagram countdowns, association outreach across Tamil Nadu chambers, and transparent digital status updates.',
    },
    {
      id: 'crowd',
      no: '04',
      title: 'Crowd Management & Badge Access',
      body: 'Pre-issued badges enforce zone discipline across exhibition booths, VIP lounges and confidential meeting rooms for smooth 500-person circulation.',
    },
    {
      id: 'calls',
      no: '05',
      title: 'Guarantee Level (Call Reports)',
      body: 'Structured follow-up call reports document introductions made, missing compliance items requested by investors, and post-summit due diligence timelines without guaranteeing funding approval.',
    },
    {
      id: 'three-months',
      no: '06',
      title: '3 Months Before Registration Rule',
      body: 'Registration closes on 1 February 2027 ahead of the 20 February 2027 summit to honour the 90-day preparation standard for thorough matchmaking and venue allocation.',
    },
  ];

  const [selectedMilestoneIdx, setSelectedMilestoneIdx] = useState(2);

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="EVENT PROGRAM & OPERATIONS"
        title="Program Architecture, Validation & Pitch Operations."
        subtitle="Operational blueprint from pre-event online registration and committee validation through pitch area allocation, crowd management, and guarantee-level call reports."
        image={MEDIA_ASSETS.chennaiSummitHall}
        imageAlt="Chennai summit plenary auditorium prepared for pitch sessions"
        ctaLabel="View Venue Floor Plans"
        ctaHref="/venue"
        stats={[
          { value: '6', label: 'Milestones' },
          { value: '10 Hrs', label: 'Summit Flow' },
          { value: '1 Feb', label: 'Cutoff Date' },
        ]}
        anchors={[
          { label: 'Operational Blueprint', href: '#validation' },
          { label: 'Timeline Stepper', href: '#timeline' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-14">
        {/* Interactive Expandable Operational Blocks */}
        <div id="validation" className="scroll-mt-24 space-y-4">
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
              OPERATIONAL PROTOCOL
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#0f172a]">
              Six Execution Desk Workstreams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {operationalBlocks.map((b, i) => (
              <div key={b.id} id={b.id} className="scroll-mt-24">
                <ExpandablePanel
                  kicker={`WORKSTREAM ${b.no}`}
                  title={b.title}
                  defaultOpen={i < 2}
                >
                  {b.body}
                </ExpandablePanel>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive 6-Milestone Stepper */}
        <ScrollReveal id="timeline" className="scroll-mt-24 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
                EVENT PLANNING &amp; TIMELINE
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#0f172a]">
                Six Operational Milestones
              </h2>
            </div>
            <span className="text-xs font-mono text-[#526075]">
              Select any milestone to inspect timeline window
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestones.map((m, idx) => {
              const active = idx === selectedMilestoneIdx;
              return (
                <InteractiveCard
                  key={m.no}
                  as="button"
                  dark={active}
                  onClick={() => setSelectedMilestoneIdx(idx)}
                  className="rounded-xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-mono text-xs font-bold ${
                          active ? 'text-[#e6c67e]' : 'text-[#8a5d14]'
                        }`}
                      >
                        {m.no}
                      </span>
                      <span
                        className={`font-mono text-[11px] font-semibold text-right ${
                          active ? 'text-[#cbd5e1]' : 'text-[#526075]'
                        }`}
                      >
                        {m.window}
                      </span>
                    </div>
                    <h3
                      className={`mt-3 font-display text-xl font-medium ${
                        active ? 'text-white' : 'text-[#0f172a]'
                      }`}
                    >
                      {m.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        active ? 'text-[#cbd5e1]' : 'text-[#334155]'
                      }`}
                    >
                      {m.detail}
                    </p>
                  </div>
                </InteractiveCard>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      <CtaBanner />
    </div>
  );
}

export function SpeakersPage() {
  const [selectedReviewer, setSelectedReviewer] = useState<CommitteeReviewerProfile | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>('All');

  const unconfirmedSlots = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        slot: `GUEST PROFILE ${String(i + 1).padStart(2, '0')}`,
        role: CHIEF_GUEST_ROLES[i % CHIEF_GUEST_ROLES.length].role,
        focus: CHIEF_GUEST_ROLES[i % CHIEF_GUEST_ROLES.length].focus,
        status: 'Awaiting Confirmation',
      })),
    []
  );

  const visibleSlots = useMemo(() => {
    if (roleFilter === 'All') return unconfirmedSlots;
    return unconfirmedSlots.filter((s) => s.role === roleFilter);
  }, [unconfirmedSlots, roleFilter]);

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="CHIEF GUESTS, AI EXPERTS & CFO SESSIONS"
        title="Chief Guests & Advisory Panels."
        subtitle="Up to 30 invited Chief Guest profiles across banking, finance, investment risk, government policy, and AI leadership alongside our active Validation & Financial Advisory Panel."
        image={MEDIA_ASSETS.aiExpertsStage}
        imageAlt="Indian AI keynote executive presenting on the plenary summit stage"
        videoSrc={VIDEO_ASSETS.summitStage.src}
        videoPoster={VIDEO_ASSETS.summitStage.poster}
        stats={[
          { value: 'Up to 30', label: 'Invited Seats' },
          { value: '4', label: 'Active Reviewers' },
          { value: '6', label: 'Advisory Disciplines' },
        ]}
        anchors={[
          { label: 'Validation Panel', href: '#advisory-panel' },
          { label: 'Chief Guest Roles', href: '#roles' },
          { label: 'AI & CFO Briefings', href: '#ai-experts' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-14">
        {/* Validation & Financial Advisory Panel — keeps verified 1-to-1 portraits */}
        <ScrollReveal id="advisory-panel" className="scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
                VALIDATION &amp; FINANCIAL ADVISORY PANEL
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#0f172a]">
                Committee Reviewers Governing Screening &amp; Hall Readiness
              </h2>
            </div>
            <span className="text-xs font-medium text-[#526075]">
              Select any advisor to inspect credentials and scrutiny mandate
            </span>
          </div>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMMITTEE_REVIEWER_PROFILES.map((rev) => (
              <StaggerCard key={rev.name}>
                <InteractiveCard
                  as="button"
                  onClick={() => setSelectedReviewer(rev)}
                  className="w-full h-full rounded-2xl p-6 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <AvatarPortrait name={rev.name} src={rev.portraitUrl} size="lg" />
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8a5d14]">
                        {rev.hallFocus.split('·')[0].trim()}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-medium text-[#0f172a] group-hover:text-[#8a5d14] transition-colors">
                      {rev.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#8a5d14]">{rev.role}</p>
                    <p className="mt-2.5 text-xs text-[#334155] leading-relaxed line-clamp-3">
                      &ldquo;{rev.perspective}&rdquo;
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#e4dfd5] flex items-center justify-between text-xs font-semibold text-[#8a5d14] w-full">
                    <span>{rev.committee}</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </div>
                </InteractiveCard>
              </StaggerCard>
            ))}
          </StaggerGrid>
        </ScrollReveal>

        {/* Chief Guest Roles */}
        <ScrollReveal id="roles" className="scroll-mt-24">
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
            INVITED CATEGORIES (UP TO 30 PROFILES)
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#0f172a] mb-6">
            Six Chief Guest Roles &amp; Focus Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CHIEF_GUEST_ROLES.map((item, idx) => (
              <InteractiveCard key={item.role} className="rounded-xl p-6">
                <span className="font-mono text-xs font-bold text-[#8a5d14]">ROLE 0{idx + 1}</span>
                <h3 className="mt-2 font-display text-2xl font-medium text-[#0f172a]">{item.role}</h3>
                <p className="mt-2 text-sm text-[#334155]">{item.focus}</p>
              </InteractiveCard>
            ))}
          </div>
        </ScrollReveal>

        {/* AI Experts + CFO Points */}
        <div id="ai-experts" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <InteractiveCard dark tilt={false} className="lg:col-span-6 rounded-2xl p-6 sm:p-8 space-y-5 group">
            <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[16/9]">
              <img
                src={MEDIA_ASSETS.aiExpertsStage}
                alt="Indian AI keynote executive addressing business founders in an obsidian summit auditorium"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top hero-image-enhanced interactive-media"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0c121d]/80 via-transparent to-transparent"
              />
            </div>
            <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#e6c67e]">
              <Cpu className="w-4 h-4" aria-hidden="true" />
              <span>AI EXPERTS TRACK</span>
            </div>
            <h2 className="font-display text-3xl font-medium text-white">
              AI Tools, Risk Validation &amp; The Future of Investment
            </h2>
            <p className="text-sm text-[#cbd5e1] leading-relaxed">
              Dedicated advisory sessions examining how artificial intelligence transforms due
              diligence, sector forecasting, capital allocation, and operational efficiency for Indian
              MSMEs and high-growth startups.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#e6c67e] pt-2 border-t border-white/15">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Automated financial &amp; risk modeling</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>AI-sector investment thesis briefing</span>
              </li>
            </ul>
          </InteractiveCard>

          <div id="cfo" className="lg:col-span-6 space-y-3 scroll-mt-24">
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14]">
              CFO POINTS &amp; ADVISORY
            </p>
            <ExpandablePanel
              kicker="SESSION 01"
              title="Working Capital & Cash Controls"
              defaultOpen
            >
              Avoiding over-leverage, mismatched debt tenures, and premature fixed overhead
              expansion across growth phases.
            </ExpandablePanel>
            <ExpandablePanel kicker="SESSION 02" title="Candid Failure Lessons">
              Examining real governance and unit-economics breakdowns so founders safeguard runway
              before raising institutional capital.
            </ExpandablePanel>
            <ExpandablePanel kicker="SESSION 03" title="Five-Year Progress Roadmaps">
              Structuring audit-ready governance for institutional equity or scheduled term-loan
              scale-up.
            </ExpandablePanel>
          </div>
        </div>

        {/* Transparent unconfirmed roster placeholders with interactive role filter */}
        <div className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-medium text-[#0f172a]">
                Speaker Roster Status (Transparent Placeholder Directory)
              </h2>
              <p className="text-xs text-[#526075] mt-1">
                No unconfirmed VIP names are fabricated; confirmed profiles publish upon written acceptance.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setRoleFilter('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  roleFilter === 'All'
                    ? 'bg-[#0c121d] text-[#e6c67e]'
                    : 'bg-white border border-[#e4dfd5] text-[#334155]'
                }`}
              >
                All
              </button>
              {CHIEF_GUEST_ROLES.map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => setRoleFilter(r.role)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    roleFilter === r.role
                      ? 'bg-[#0c121d] text-[#e6c67e]'
                      : 'bg-white border border-[#e4dfd5] text-[#334155]'
                  }`}
                >
                  {r.role}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {visibleSlots.map((s) => (
              <div key={s.slot} className="bg-white rounded-xl border border-[#e4dfd5] p-4">
                <div className="font-mono text-[11px] font-bold text-[#8a5d14]">{s.slot}</div>
                <div className="mt-1 font-display text-lg font-medium text-[#0f172a]">{s.role}</div>
                <p className="mt-1 text-xs text-[#526075]">{s.focus}</p>
                <span className="mt-2 inline-block font-mono text-[11px] font-medium text-[#526075]">
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewerProfileModal reviewer={selectedReviewer} onClose={() => setSelectedReviewer(null)} />
      <CtaBanner />
    </div>
  );
}

const DISCOVERY_TRACK_TABS = [
  'All',
  'Startups',
  'Business Expansion',
  'Bank Loans',
  'Business Loan',
  'Mixed Loans',
  'International Opportunity',
] as const;

const TICKET_FILTERS = [
  { id: 'all', label: 'All Tickets' },
  { id: 'seed', label: 'Under ₹2 Cr' },
  { id: 'growth', label: '₹2 – 10 Cr' },
  { id: 'institutional', label: '₹10 Cr+' },
] as const;

export function InvestorsPage() {
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [loadingPipeline, setLoadingPipeline] = useState(true);
  const [trackFilter, setTrackFilter] = useState<string>('All');
  const [ticketFilter, setTicketFilter] = useState<'all' | 'seed' | 'growth' | 'institutional'>('all');
  const [query, setQuery] = useState('');
  const [activeDossier, setActiveDossier] = useState<RegistrationRecord | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/registrations')
      .then((r) => r.json())
      .then((data) => {
        if (active && Array.isArray(data.registrations)) {
          setRegistrations(data.registrations);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoadingPipeline(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filteredPipeline = useMemo(() => {
    const source =
      registrations.length > 0
        ? registrations
        : PARTICIPANT_HIGHLIGHTS.map(highlightToRegistrationRecord);
    return filterDiscoveryOpportunities(source, {
      trackFilter,
      query,
    }).filter((r) => {
      if (r.validationStatus === 'Rejected') return false;
      if (ticketFilter === 'seed') return r.funding_lakhs < 200;
      if (ticketFilter === 'growth') return r.funding_lakhs >= 200 && r.funding_lakhs <= 1000;
      if (ticketFilter === 'institutional') return r.funding_lakhs > 1000;
      return true;
    });
  }, [registrations, trackFilter, ticketFilter, query]);

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="INVESTORS & FUNDING ECOSYSTEM"
        title="Structured Capital, Matchmaking & Governance."
        subtitle="Connecting Angel Investors, Venture Capital Funds, Family Offices, HNIs, and Scheduled Banks with validated entrepreneurs and project owners."
        image={MEDIA_ASSETS.trackMixedLoans}
        imageAlt="Indian founder and institutional capital partner closing deal alignment"
        ctaLabel="Register as Investor"
        ctaHref="/registration?category=investor"
        stats={[
          { value: '₹50L–₹500Cr', label: 'Ticket Range' },
          { value: '120', label: 'RBI Banks Listed' },
          { value: '3 Halls', label: 'Deal Matching' },
        ]}
        anchors={[
          { label: 'Deal Pipeline', href: '#pipeline' },
          { label: 'Banks & Funding', href: '#banks' },
          { label: 'Terms & Responsibility', href: '#terms' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-14">
        {/* Live Validated Deal Pipeline Discovery */}
        <ScrollReveal id="pipeline" className="scroll-mt-24 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
                CURATED DEAL DISCOVERY
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#0f172a]">
                Live Validated Deal Pipeline Discovery
              </h2>
              <p className="mt-1.5 text-sm text-[#334155] max-w-2xl">
                Filter active founder, expansion, and credit dossiers across tracks and ticket sizes
                before booking Hall 1–3 meeting slots.
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search
                className="w-4 h-4 text-[#526075] absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Search validated deal pipeline"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search company, sector, city..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#d6cfc2] bg-white text-sm text-[#0f172a] focus:outline-none focus:border-[#0c121d]"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Deal pipeline track filter">
              {DISCOVERY_TRACK_TABS.map((t) => {
                const active = trackFilter === t;
                return (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTrackFilter(t)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#0c121d] text-[#e6c67e]'
                        : 'bg-white text-[#334155] border border-[#e4dfd5] hover:border-[#0c121d]'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {TICKET_FILTERS.map((tf) => (
                <button
                  key={tf.id}
                  type="button"
                  onClick={() => setTicketFilter(tf.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    ticketFilter === tf.id
                      ? 'bg-[#8a5d14] text-white'
                      : 'bg-white border border-[#e4dfd5] text-[#526075] hover:text-[#0f172a]'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {loadingPipeline ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[0, 1, 2].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl border border-[#e4dfd5] p-6 animate-pulse space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#e4dfd5]" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-[#e4dfd5] rounded w-2/3" />
                      <div className="h-3 bg-[#f0ede5] rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-12 bg-[#f5f3ee] rounded" />
                </div>
              ))}
            </div>
          ) : filteredPipeline.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#e4dfd5] p-10 text-center space-y-3">
              <p className="text-sm text-[#526075]">
                No screened deal dossiers match the selected track, ticket range, or search filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setTrackFilter('All');
                  setTicketFilter('all');
                  setQuery('');
                }}
                className="text-xs font-semibold text-[#8a5d14] underline cursor-pointer"
              >
                Reset deal filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPipeline.map((rec) => {
                const portrait = resolvePortraitUrl(rec.full_name, rec.id);
                return (
                  <InteractiveCard
                    key={rec.id}
                    as="button"
                    onClick={() => setActiveDossier(rec)}
                    className="rounded-2xl p-6 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2.5 mb-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <AvatarPortrait name={rec.full_name} src={portrait} size="md" />
                          <div className="min-w-0">
                            <h3 className="font-display text-xl font-medium text-[#0f172a] leading-snug truncate group-hover:text-[#8a5d14] transition-colors">
                              {rec.company}
                            </h3>
                            <p className="text-xs font-medium text-[#526075] truncate">
                              {rec.full_name} · {rec.location || 'Tamil Nadu'}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded bg-[#fafaf8] text-[#8a5d14] border border-[#e4dfd5] shrink-0 whitespace-nowrap">
                          {rec.validationStatus}
                        </span>
                      </div>

                      <p className="text-xs text-[#334155] leading-relaxed line-clamp-3">
                        {rec.business_summary}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#e4dfd5] flex items-center justify-between gap-2 w-full">
                      <div>
                        <span className="block font-mono text-xs font-bold text-[#8a5d14] tabular-nums">
                          {formatLakhsToDisplay(rec.funding_lakhs)}
                        </span>
                        <span className="text-[11px] text-[#526075]">
                          {rec.track} · {rec.pitchHall}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0c121d] group-hover:text-[#8a5d14]">
                        <span>Dossier</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </InteractiveCard>
                );
              })}
            </div>
          )}
        </ScrollReveal>

        <div id="banks" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InteractiveCard className="rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <Landmark className="w-6 h-6 text-[#8a5d14] mb-3" aria-hidden="true" />
              <h2 className="font-display text-3xl font-medium text-[#0f172a]">
                Banks &amp; Institutional Lending
              </h2>
              <p className="mt-3 text-sm text-[#334155] leading-relaxed">
                Dedicated banking discussions cover corporate term loans, project finance, MSME
                working capital and hybrid debt-equity syndication across India’s 120 RBI-scheduled
                banks and Tamil Nadu’s top 50 financial institutions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#e4dfd5] flex flex-wrap gap-4">
              <Link
                href="/banks"
                className="text-xs font-semibold text-[#8a5d14] hover:text-[#0c121d] inline-flex items-center gap-1 transition-colors"
              >
                <span>Browse 120 RBI Banks</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/financial-brands"
                className="text-xs font-semibold text-[#8a5d14] hover:text-[#0c121d] inline-flex items-center gap-1 transition-colors"
              >
                <span>Browse Top 50 Financial Brands</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </InteractiveCard>

          <InteractiveCard id="investor-team" dark tilt={false} className="scroll-mt-24 rounded-2xl p-6 sm:p-8">
            <Users className="w-6 h-6 text-[#e6c67e] mb-3" aria-hidden="true" />
            <h2 className="font-display text-3xl font-medium text-white">
              Investor Team Points &amp; Matching
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-[#cbd5e1]">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#e6c67e] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Sector-wise curation aligned to investor ticket size and stage mandate</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#e6c67e] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Pre-screened pitch summaries and financial risk notes ahead of 20 Feb 2027</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#e6c67e] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Confidential one-to-one meeting room scheduling across Halls 1–3</span>
              </li>
            </ul>
          </InteractiveCard>
        </div>

        <div id="terms" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: 'Investor Terms & Conditions',
              desc: 'Organisers facilitate structured introductions only; all term sheets, covenants and valuation agreements are executed solely between investor and investee.',
            },
            {
              title: 'Investor Interaction Protocol',
              desc: 'Pre-booked 20–30 minute deal slots backed by committee validation dossiers.',
            },
            {
              title: 'Investment Opportunities',
              desc: 'Ticket sizes ranging from ₹50 Lakhs seed/working capital up to ₹500 Crore expansion mandates.',
            },
            {
              title: 'Risk & Independent Diligence',
              desc: 'Participating investors conduct independent legal, financial and statutory due diligence prior to deploying capital.',
            },
          ].map((card) => (
            <InteractiveCard key={card.title} className="rounded-xl p-6">
              <h3 className="font-display text-xl font-medium text-[#0f172a]">{card.title}</h3>
              <p className="mt-2 text-sm text-[#334155] leading-relaxed">{card.desc}</p>
            </InteractiveCard>
          ))}
        </div>
      </section>

      <ParticipantDossierModal record={activeDossier} onClose={() => setActiveDossier(null)} />
      <CtaBanner buttonLabel="Register as Investor" href="/registration?category=investor" />
    </div>
  );
}

export function StartupPage() {
  const [selectedStartup, setSelectedStartup] = useState<RegistrationRecord | null>(null);
  const [readyStages, setReadyStages] = useState<Record<string, boolean>>({
    '01': true,
    '04': true,
  });
  const founderSpotlights = PARTICIPANT_HIGHLIGHTS.filter((p) => p.category === 'Founder');

  const stages = [
    { no: '01', title: 'Startup Registration', desc: 'Submit founder details, DPIIT/incorporation details, sector and target raise.' },
    { no: '02', title: 'Startup Validation Team Review', desc: 'Committee verifies team background, IP/traction and historical execution.' },
    { no: '03', title: 'Validation Status Tracking', desc: 'Applications progress transparently from Pending to Under review and Approved.' },
    { no: '04', title: 'Pitch Deck Refinement', desc: 'Ensure problem, TAM, unit economics and 5-year financial plan are concise.' },
    { no: '05', title: 'Validation Status & Shortlist', desc: 'Approved ventures receive confirmed hall and slot assignments prior to summit.' },
    { no: '06', title: 'Pitch Day Presentation', desc: 'Present directly to angel syndicates, VC partners and institutional advisors.' },
    { no: '07', title: 'Startup Funding Requirements', desc: 'Structured mandates spanning ₹50 Lakhs seed rounds through Series growth capital.' },
  ];

  const completedCount = Object.values(readyStages).filter(Boolean).length;
  const pct = Math.round((completedCount / stages.length) * 100);

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="STARTUP ECOSYSTEM TRACK"
        title="Startup Validation & Pitch Pipeline."
        subtitle="Designed for up to 100 validated startups preparing pitch decks, financial projections and direct angel/VC investor sessions on 20 February 2027."
        image={MEDIA_ASSETS.trackStartups}
        imageAlt="Indian startup founders preparing pitch materials on laptops"
        videoSrc={VIDEO_ASSETS.startupEcosystem.src}
        videoPoster={VIDEO_ASSETS.startupEcosystem.poster}
        ctaLabel="Apply for Startups Track"
        ctaHref="/apply?track=Startups"
        stats={[
          { value: '100', label: 'Startup Seats' },
          { value: '7 Stages', label: 'Pipeline' },
          { value: 'Hall 1 & 2', label: 'Pitch Zones' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-14">
        {/* Interactive 7-Stage Readiness Checklist */}
        <ScrollReveal className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#e4dfd5] pb-5">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
                SEVEN-STAGE PATHWAY · SELF-CHECK
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-medium text-[#0f172a]">
                From Registration to Investor Pitch
              </h2>
            </div>
            <div className="w-full sm:w-64 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#526075]">Readiness Check</span>
                <span className="font-semibold text-[#8a5d14] tabular-nums">
                  {completedCount} / {stages.length} prepared
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#e4dfd5] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#0c121d] transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {stages.map((s) => {
              const checked = !!readyStages[s.no];
              return (
                <InteractiveCard
                  key={s.no}
                  as="button"
                  dark={checked}
                  onClick={() =>
                    setReadyStages((prev) => ({ ...prev, [s.no]: !prev[s.no] }))
                  }
                  className="rounded-xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-mono text-xs font-bold ${
                          checked ? 'text-[#e6c67e]' : 'text-[#8a5d14]'
                        }`}
                      >
                        STAGE {s.no}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 font-mono text-[11px] font-semibold ${
                          checked ? 'text-emerald-400' : 'text-[#526075]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{checked ? 'Prepared' : 'Mark Ready'}</span>
                      </span>
                    </div>
                    <h3
                      className={`mt-2.5 font-display text-2xl font-medium ${
                        checked ? 'text-white' : 'text-[#0f172a]'
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        checked ? 'text-[#cbd5e1]' : 'text-[#334155]'
                      }`}
                    >
                      {s.desc}
                    </p>
                  </div>
                </InteractiveCard>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Screened Founder & Startup Spotlights — preserves verified 1-to-1 portraits */}
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
                REPRESENTATIVE VENTURE SPOTLIGHTS
              </p>
              <h2 className="font-display text-3xl font-medium text-[#0f172a]">
                Screened Founders &amp; Enterprise Mandates
              </h2>
            </div>
            <span className="text-xs font-medium text-[#526075]">
              Select any founder card to inspect dossier summary
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {founderSpotlights.map((f) => (
              <InteractiveCard
                key={f.id}
                as="button"
                onClick={() => setSelectedStartup(highlightToRegistrationRecord(f))}
                className="rounded-2xl p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <AvatarPortrait name={f.fullName} src={f.portraitUrl} size="md" />
                    <div className="min-w-0">
                      <h3 className="font-display text-xl font-medium text-[#0f172a] truncate group-hover:text-[#8a5d14] transition-colors">
                        {f.fullName}
                      </h3>
                      <p className="text-xs font-medium text-[#526075] truncate">
                        {f.roleTitle} · {f.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed italic">
                    &ldquo;{f.quote}&rdquo;
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#e4dfd5] flex items-center justify-between text-xs w-full">
                  <span className="font-mono font-semibold text-[#8a5d14]">{f.mandate}</span>
                  <span className="text-[#526075]">{f.location}</span>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <ParticipantDossierModal record={selectedStartup} onClose={() => setSelectedStartup(null)} />
      <CtaBanner buttonLabel="Submit Startup Application" href="/apply?track=Startups" />
    </div>
  );
}

export function GovernmentPage() {
  const [scope, setScope] = useState<'All' | 'Central' | 'State'>('All');
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const central = CENTRAL_GOVT_RESOURCES.filter(
    (r) =>
      (scope === 'All' || scope === 'Central') &&
      (!q || `${r.name} ${r.description}`.toLowerCase().includes(q))
  );
  const state = STATE_GOVT_RESOURCES.filter(
    (r) =>
      (scope === 'All' || scope === 'State') &&
      (!q || `${r.name} ${r.description}`.toLowerCase().includes(q))
  );

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="GOVERNMENT & ECOSYSTEM RESOURCES"
        title="Central & Tamil Nadu Government Portals."
        subtitle="Verified official links to national and Tamil Nadu state investment promotion agencies, startup missions and MSME financing bodies referenced in the event plan."
        stats={[
          { value: '5', label: 'Central Agencies' },
          { value: '5', label: 'TN State Portals' },
          { value: 'Verified', label: 'Official Links' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-10">
        {/* Filter + Search Bar */}
        <div className="bg-white rounded-2xl border border-[#e4dfd5] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: 'All', label: 'All Portals (10)' },
                { id: 'Central', label: 'Central Government (5)' },
                { id: 'State', label: 'Tamil Nadu State (5)' },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setScope(btn.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  scope === btn.id
                    ? 'bg-[#0c121d] text-[#e6c67e]'
                    : 'bg-[#fafaf8] border border-[#e4dfd5] text-[#334155] hover:border-[#0c121d]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#526075] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="search"
              aria-label="Filter government portals"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search agency or scheme..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#d6cfc2] bg-[#fafaf8] text-xs focus:outline-none focus:border-[#0c121d]"
            />
          </div>
        </div>

        {central.length > 0 && (
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
              CENTRAL GOVERNMENT
            </p>
            <h2 className="font-display text-3xl font-medium text-[#0f172a] mb-5">
              National Investment &amp; MSME Agencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {central.map((res) => (
                <a
                  key={res.name}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <InteractiveCard className="h-full rounded-xl p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-medium text-[#0f172a] group-hover:text-[#8a5d14] transition-colors">
                        {res.name}
                      </h3>
                      <p className="mt-2 text-sm text-[#334155] leading-relaxed">{res.description}</p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8a5d14]">
                      <span>Visit Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </InteractiveCard>
                </a>
              ))}
            </div>
          </div>
        )}

        {state.length > 0 && (
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
              TAMIL NADU STATE GOVERNMENT
            </p>
            <h2 className="font-display text-3xl font-medium text-[#0f172a] mb-5">
              Tamil Nadu Industrial &amp; Startup Bodies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {state.map((res) => (
                <a
                  key={res.name}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <InteractiveCard className="h-full rounded-xl p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-medium text-[#0f172a] group-hover:text-[#8a5d14] transition-colors">
                        {res.name}
                      </h3>
                      <p className="mt-2 text-sm text-[#334155] leading-relaxed">{res.description}</p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8a5d14]">
                      <span>Visit Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </InteractiveCard>
                </a>
              ))}
            </div>
          </div>
        )}

        {central.length === 0 && state.length === 0 && (
          <div className="bg-white rounded-2xl border border-[#e4dfd5] p-10 text-center">
            <p className="text-sm text-[#526075]">No government agencies matched &ldquo;{query}&rdquo;.</p>
          </div>
        )}
      </section>

      <CtaBanner />
    </div>
  );
}

const CONTACT_SUBJECT_PRESETS = [
  'Consultation',
  'Track Fit Guidance',
  'Sponsorship Tier',
  'Association Delegation',
  'Speaker / Chief Guest',
];

export function ContactPage() {
  const subjectParam = useQueryParam('subject');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(subjectParam || 'Consultation');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  useEffect(() => {
    if (subjectParam) {
      setSubject(subjectParam);
    }
  }, [subjectParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    const check = validateContactInput({ name, email, subject, message });
    setErrors(check.errors);
    if (!check.valid) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setServerError(data.error || 'Could not submit inquiry.');
        return;
      }
      setSubmittedId(data.inquiry?.id || 'INQ-SUBMITTED');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setServerError('Network error while submitting your enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="CONTACT & CONSULTATION"
        title="Organiser Desk & Business Consultation."
        subtitle="Connect with the Investor Meet 500 organising team in Chennai for participant inquiries, sponsorship decks, association delegations, and first-level consultation."
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <InteractiveCard dark tilt={false} className="rounded-2xl p-6 sm:p-8">
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#e6c67e] mb-4">
                ORGANISER CONTACT DETAILS
              </p>
              <div className="flex items-center gap-4">
                <AvatarPortrait
                  name={ORGANISER_CONTACT.contactPerson}
                  src={null}
                  size="md"
                  theme="dark"
                />
                <div>
                  <h2 className="font-display text-3xl font-medium text-white">
                    {ORGANISER_CONTACT.contactPerson}
                  </h2>
                  <p className="mt-0.5 text-xs text-[#94a3b8]">Event Organiser · Investor Meet 500</p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm text-[#cbd5e1]">
                <a
                  href={ORGANISER_CONTACT.telHref}
                  className="flex items-start gap-3 hover:text-[#e6c67e] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#e6c67e] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{ORGANISER_CONTACT.phone}</span>
                </a>
                <a
                  href={`mailto:${ORGANISER_CONTACT.email}`}
                  className="flex items-start gap-3 hover:text-[#e6c67e] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#e6c67e] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{ORGANISER_CONTACT.email}</span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#e6c67e] mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="leading-relaxed">{ORGANISER_CONTACT.address}</span>
                </div>
              </div>
            </InteractiveCard>

            <div className="bg-white rounded-2xl border border-[#e4dfd5] p-6">
              <h3 className="font-display text-2xl font-medium text-[#0f172a]">
                Consultation Overview
              </h3>
              <p className="mt-2 text-sm text-[#334155] leading-relaxed">
                Founders uncertain about track fit, funding ticket size (₹50 Lakhs – ₹500 Crore), or
                pre-event documentation can submit an enquiry here or inspect the 10-step{' '}
                <Link href="/business-guidance" className="text-[#8a5d14] font-semibold underline">
                  First Level Business Guidance
                </Link>{' '}
                guide.
              </p>
              <div className="mt-4 pt-4 border-t border-[#e4dfd5] flex flex-wrap gap-4 text-xs font-semibold">
                <Link href="/terms" className="text-[#8a5d14] hover:underline">
                  Terms &amp; Conditions
                </Link>
                <Link href="/privacy" className="text-[#8a5d14] hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Working Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e4dfd5] p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-3xl font-medium text-[#0f172a]">
              Send an Enquiry or Consultation Request
            </h2>
            <p className="mt-1 text-sm text-[#526075]">
              All messages are saved to the organiser inbox for follow-up.
            </p>

            {/* Quick-Fill Subject Presets */}
            <div className="mt-4 flex flex-wrap gap-2">
              {CONTACT_SUBJECT_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSubject(preset)}
                  className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                    subject === preset
                      ? 'bg-[#0c121d] text-[#e6c67e]'
                      : 'bg-[#fafaf8] border border-[#e4dfd5] text-[#334155] hover:border-[#0c121d]'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            {submittedId && (
              <div
                role="status"
                className="mt-6 rounded-xl border border-emerald-300 bg-emerald-50 p-4 flex items-start gap-3 text-emerald-900"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <strong className="font-semibold">Enquiry Received ({submittedId})</strong>
                  <p className="mt-0.5 text-emerald-800">
                    Your consultation message has been logged with the Investor Meet 500 organiser
                    desk.
                  </p>
                </div>
              </div>
            )}

            {serverError && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800"
              >
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0f172a] mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#d6cfc2] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#0c121d]"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0f172a] mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#d6cfc2] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#0c121d]"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#0f172a] mb-1.5"
                >
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Consultation, Sponsorship, Association, or Track Enquiry"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#d6cfc2] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#0c121d]"
                />
                {errors.subject && <p className="mt-1 text-xs text-red-700">{errors.subject}</p>}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#0f172a] mb-1.5"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your company background, funding focus or partnership question..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#d6cfc2] bg-[#fafaf8] text-sm text-[#0f172a] focus:outline-none focus:border-[#0c121d]"
                />
                {errors.message && <p className="mt-1 text-xs text-red-700">{errors.message}</p>}
              </div>

              <MagneticAction strength={3}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-gold inline-flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-semibold cursor-pointer disabled:opacity-60"
                >
                  <span>{submitting ? 'Sending...' : 'Submit Enquiry'}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </MagneticAction>
            </form>
          </div>
        </div>

        {/* Case Studies */}
        <div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8a5d14] mb-2">
            ECOSYSTEM BENCHMARKS
          </p>
          <h2 className="font-display text-3xl font-medium text-[#0f172a] mb-5">
            Case Studies &amp; Reference Summits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CASE_STUDY_REFERENCES.map((cs) => (
              <a
                key={cs.name}
                href={cs.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <InteractiveCard className="h-full rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl font-medium text-[#0f172a] group-hover:text-[#8a5d14] transition-colors">
                      {cs.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#526075]">{cs.subtitle}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#8a5d14]">
                    <span>Reference link</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </span>
                </InteractiveCard>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function TeamPage() {
  const [selectedReviewer, setSelectedReviewer] = useState<CommitteeReviewerProfile | null>(null);

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="EVENT TEAMS"
        title="Five Operational Teams Supporting the Summit."
        subtitle="Specialised functional desks governing participant onboarding, committee validation, media messaging, bank loan coordination and on-ground floor operations."
        stats={[
          { value: '5 Desks', label: 'Operations' },
          { value: '25+', label: 'Mandate Controls' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENT_TEAMS.map((team, idx) => {
            const pairedReviewer =
              COMMITTEE_REVIEWER_PROFILES[idx % COMMITTEE_REVIEWER_PROFILES.length];
            return (
              <InteractiveCard
                key={team.no}
                className="rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#8a5d14]">TEAM {team.no}</span>
                  <h2 className="mt-2 font-display text-2xl font-medium text-[#0f172a]">
                    {team.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#526075]">{team.summary}</p>
                  <ul className="mt-4 pt-4 border-t border-[#e4dfd5] space-y-2">
                    {team.responsibilities.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-[#334155]">
                        <Check className="w-4 h-4 text-[#8a5d14] mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {pairedReviewer && (
                  <button
                    type="button"
                    onClick={() => setSelectedReviewer(pairedReviewer)}
                    className="mt-5 pt-3 border-t border-[#e4dfd5] flex items-center justify-between gap-3 w-full text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <AvatarPortrait
                        name={pairedReviewer.name}
                        src={pairedReviewer.portraitUrl}
                        size="xs"
                      />
                      <div className="min-w-0">
                        <span className="block text-xs font-semibold text-[#0f172a] truncate group-hover:text-[#8a5d14]">
                          {pairedReviewer.name}
                        </span>
                        <span className="block text-[11px] text-[#526075] truncate">
                          {pairedReviewer.committee}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-[#8a5d14] shrink-0">Profile</span>
                  </button>
                )}
              </InteractiveCard>
            );
          })}
        </div>
      </section>

      <ReviewerProfileModal reviewer={selectedReviewer} onClose={() => setSelectedReviewer(null)} />
      <CtaBanner />
    </div>
  );
}

export function RegistrationPolicyPage() {
  const [groupFilter, setGroupFilter] = useState<string>('All');
  const [query, setQuery] = useState('');

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NINETY_DAY_POLICY_GROUPS.filter((g) => groupFilter === 'All' || g.group === groupFilter)
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (i) => !q || `${i.no} ${i.title} ${i.desc}`.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [groupFilter, query]);

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="90-DAY REGISTRATION POLICY"
        title="20 Reasons for Advance Registration."
        subtitle="Why Investor Meet 500 emphasises a 90-day preparation window across registration verification, investor matchmaking, venue allocation and due diligence."
        ctaLabel="Apply Before 1 February 2027"
        ctaHref="/apply"
        stats={[
          { value: '20', label: 'Policy Reasons' },
          { value: '90 Days', label: 'Prep Window' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-10">
        <div className="rounded-xl border border-[#c49a45]/40 bg-[#fbf6ea] p-5 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#8a5d14] mt-0.5 shrink-0" aria-hidden="true" />
          <div className="text-sm text-[#3d2e10] leading-relaxed">
            <strong className="font-semibold text-[#0c121d]">Deadline Alignment Note:</strong> The
            event is scheduled for <strong>20 February 2027</strong> with final registration cutoff on{' '}
            <strong>1 February 2027</strong>. Applicants are encouraged to submit at least 90 days
            in advance wherever possible to allow full validation and matchmaking cycles.
          </div>
        </div>

        {/* Filter + Search Bar */}
        <div className="bg-white rounded-2xl border border-[#e4dfd5] p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setGroupFilter('All')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                groupFilter === 'All'
                  ? 'bg-[#0c121d] text-[#e6c67e]'
                  : 'bg-[#fafaf8] border border-[#e4dfd5] text-[#334155]'
              }`}
            >
              All 20 Reasons
            </button>
            {NINETY_DAY_POLICY_GROUPS.map((g) => (
              <button
                key={g.group}
                type="button"
                onClick={() => setGroupFilter(g.group)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  groupFilter === g.group
                    ? 'bg-[#0c121d] text-[#e6c67e]'
                    : 'bg-[#fafaf8] border border-[#e4dfd5] text-[#334155]'
                }`}
              >
                {g.group}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#526075] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="search"
              aria-label="Filter registration policy reasons"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search verification, hall, risk..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#d6cfc2] bg-[#fafaf8] text-xs focus:outline-none focus:border-[#0c121d]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredGroups.map((grp) => (
            <div key={grp.group} className="bg-white rounded-2xl border border-[#e4dfd5] p-6 sm:p-8 space-y-4">
              <div>
                <p className="font-mono text-xs font-bold text-[#8a5d14]">{grp.group}</p>
                <h2 className="mt-1 font-display text-3xl font-medium text-[#0f172a]">
                  {grp.title}
                </h2>
              </div>
              <div className="space-y-2.5">
                {grp.items.map((item) => (
                  <ExpandablePanel
                    key={item.no}
                    kicker={`REASON ${item.no}`}
                    title={item.title}
                    defaultOpen
                  >
                    {item.desc}
                  </ExpandablePanel>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

export function BusinessGuidancePage() {
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({
    '01': true,
    '04': true,
  });

  const completed = Object.values(checkedSteps).filter(Boolean).length;
  const pct = Math.round((completed / FIRST_LEVEL_GUIDANCE_STEPS.length) * 100);

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="FIRST LEVEL BUSINESS GUIDANCE"
        title="Ten-Step Founder & Enterprise Readiness Guide."
        subtitle="Structured orientation for early founders and growing businesses preparing documentation, sector alignment, and capital clarity before meeting investors."
        ctaLabel="Request Consultation"
        ctaHref="/contact?subject=First%20Level%20Business%20Guidance"
        stats={[
          { value: `${completed}/10`, label: 'Steps Ready' },
          { value: `${pct}%`, label: 'Progress' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-8">
        <div className="bg-white rounded-2xl border border-[#e4dfd5] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8a5d14]">
              INTERACTIVE PREPARATION TRACKER
            </span>
            <p className="text-sm text-[#334155] mt-0.5">
              Click any step below to mark it complete before requesting an investor slot.
            </p>
          </div>
          <div className="w-full sm:w-64 space-y-1.5 shrink-0">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#526075]">Checklist</span>
              <span className="font-semibold text-[#8a5d14]">
                {completed} / {FIRST_LEVEL_GUIDANCE_STEPS.length} ({pct}%)
              </span>
            </div>
            <div className="h-2 rounded-full bg-[#e4dfd5] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#0c121d] transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FIRST_LEVEL_GUIDANCE_STEPS.map((step) => {
            const done = !!checkedSteps[step.no];
            return (
              <InteractiveCard
                key={step.no}
                as="button"
                dark={done}
                onClick={() =>
                  setCheckedSteps((prev) => ({ ...prev, [step.no]: !prev[step.no] }))
                }
                className="rounded-xl p-6 flex items-start gap-4"
              >
                <div
                  className={`w-11 h-11 rounded-lg font-mono text-sm font-bold flex items-center justify-center shrink-0 ${
                    done
                      ? 'bg-[#c49a45] text-[#0c121d]'
                      : 'bg-[#0c121d] text-[#e6c67e]'
                  }`}
                >
                  {done ? <Check className="w-5 h-5" aria-hidden="true" /> : step.no}
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-mono text-[10px] font-semibold uppercase tracking-wider ${
                        done ? 'text-[#e6c67e]' : 'text-[#8a5d14]'
                      }`}
                    >
                      STEP {step.no} · {done ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                  <h2
                    className={`mt-1 font-display text-2xl font-medium ${
                      done ? 'text-white' : 'text-[#0f172a]'
                    }`}
                  >
                    {step.title}
                  </h2>
                  <p
                    className={`mt-1.5 text-sm leading-relaxed ${
                      done ? 'text-[#cbd5e1]' : 'text-[#334155]'
                    }`}
                  >
                    {step.desc}
                  </p>
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

export function InternationalPage() {
  const [groupFilter, setGroupFilter] = useState<string>('All');
  const [query, setQuery] = useState('');

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INTERNATIONAL_GROUPS.filter((g) => groupFilter === 'All' || g.group === groupFilter)
      .map((g) => ({
        ...g,
        items: g.items.filter((item) => !q || item.toLowerCase().includes(q)),
      }))
      .filter((g) => g.items.length > 0);
  }, [groupFilter, query]);

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="INTERNATIONAL OPPORTUNITIES"
        title="Cross-Border Capital, FDI & Global Delegations."
        subtitle="Forty structured opportunity verticals spanning foreign direct investment, international joint ventures, domestic industrial growth, and target investor groups."
        image={MEDIA_ASSETS.globalFdiCorridor}
        imageAlt="Indian and international business leaders in Chennai global investment forum"
        ctaLabel="Register as International Delegate"
        ctaHref="/registration?category=international"
        stats={[
          { value: '40', label: 'Verticals' },
          { value: '4 Groups', label: 'Global Scope' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-8">
        <div className="bg-white rounded-2xl border border-[#e4dfd5] p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setGroupFilter('All')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                groupFilter === 'All'
                  ? 'bg-[#0c121d] text-[#e6c67e]'
                  : 'bg-[#fafaf8] border border-[#e4dfd5] text-[#334155]'
              }`}
            >
              All 40 Verticals
            </button>
            {INTERNATIONAL_GROUPS.map((g) => (
              <button
                key={g.group}
                type="button"
                onClick={() => setGroupFilter(g.group)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  groupFilter === g.group
                    ? 'bg-[#0c121d] text-[#e6c67e]'
                    : 'bg-[#fafaf8] border border-[#e4dfd5] text-[#334155]'
                }`}
              >
                {g.title.replace(' Opportunities', '').replace(' Programs', '')}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#526075] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="search"
              aria-label="Search international verticals"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FDI, manufacturing, AI..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#d6cfc2] bg-[#fafaf8] text-xs focus:outline-none focus:border-[#0c121d]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGroups.map((grp) => (
            <InteractiveCard key={grp.group} className="rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8a5d14]">
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span>{grp.group}</span>
              </div>
              <h2 className="mt-2 font-display text-3xl font-medium text-[#0f172a] mb-5">
                {grp.title}
              </h2>
              <ul className="space-y-2.5">
                {grp.items.map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-[#0f172a] py-1.5 border-b border-[#e4dfd5] last:border-b-0"
                  >
                    <span className="font-mono text-xs font-bold text-[#8a5d14]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </InteractiveCard>
          ))}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

const SCHEDULE_HALL_FILTERS = ['All Halls', 'Hall 1', 'Hall 2', 'Hall 3', 'Closing'] as const;

export function SchedulePage() {
  const [hallFilter, setHallFilter] = useState<string>('All Halls');

  const filteredSlots = useMemo(() => {
    if (hallFilter === 'All Halls') return EVENT_SCHEDULE_SLOTS;
    if (hallFilter === 'Closing') {
      return EVENT_SCHEDULE_SLOTS.filter((s) => s.halls.toLowerCase().includes('updated'));
    }
    return EVENT_SCHEDULE_SLOTS.filter((s) => s.halls.includes(hallFilter));
  }, [hallFilter]);

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="EVENT SCHEDULE · 20 FEBRUARY 2027"
        title="Full-Day Summit Timetable (8:00 AM – 6:00 PM)."
        subtitle="Structured hourly cadence across Hall 1, Hall 2, and Hall 3 balancing investor pitches, one-to-one sessions, and closing deal-room updates."
        ctaLabel="View Venue Floor Plans"
        ctaHref="/venue"
        stats={[
          { value: '10 Slots', label: 'Hourly Blocks' },
          { value: '8 AM – 6 PM', label: 'IST Schedule' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-6">
        {/* Interactive Hall Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {SCHEDULE_HALL_FILTERS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHallFilter(h)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  hallFilter === h
                    ? 'bg-[#0c121d] text-[#e6c67e]'
                    : 'bg-white border border-[#e4dfd5] text-[#334155] hover:border-[#0c121d]'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
          <span className="font-mono text-xs text-[#526075]">
            Showing {filteredSlots.length} of {EVENT_SCHEDULE_SLOTS.length} blocks
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-[#e4dfd5] overflow-hidden shadow-sm">
          <div className="px-6 py-5 bg-[#0c121d] text-white flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-5 h-5 text-[#e6c67e]" aria-hidden="true" />
              <h2 className="font-display text-2xl font-medium text-white">
                20 February 2027 · Chennai Summit Timetable
              </h2>
            </div>
            <span className="text-xs font-mono text-[#cbd5e1]">IST · 8:00 AM TO 6:00 PM</span>
          </div>

          <div className="p-4 sm:p-6 space-y-3">
            {filteredSlots.map((slot, idx) => {
              const isClosing = slot.halls.toLowerCase().includes('updated');
              return (
                <ExpandablePanel
                  key={slot.time}
                  kicker={`SLOT ${String(idx + 1).padStart(2, '0')} · ${slot.time}`}
                  title={slot.activity}
                  meta={slot.halls}
                  defaultOpen={idx === 0}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#0f172a]">
                      <Clock className="w-4 h-4 text-[#8a5d14]" aria-hidden="true" />
                      <span>
                        {isClosing
                          ? 'Afternoon Consolidation: Guarantee-level call reports, investor follow-up logging, and final deal-room updates.'
                          : 'Active Deal & Pitch Block: Concurrent 20–30 minute scheduled meetings and track pitches across Hall 1 (Startups & AI), Hall 2 (Bank & Business Loans), and Hall 3 (Expansion & International).'}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#8a5d14] shrink-0">
                      {slot.halls}
                    </span>
                  </div>
                </ExpandablePanel>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

export function PrivacyPage() {
  const [expandAll, setExpandAll] = useState(true);
  const [toggleEpoch, setToggleEpoch] = useState(0);

  const clauses = [
    {
      no: '01',
      title: '1. Information Collected',
      body: 'We collect participant name, company name, contact email, phone number, business category, track selection, funding scope, and business summary details submitted through the application, category registration, and consultation enquiry forms.',
    },
    {
      no: '02',
      title: '2. Purpose of Processing',
      body: 'Submitted details are used exclusively for participant verification, validation committee screening, hall & pitch area slot allocation, and communicating summit updates ahead of 20 February 2027.',
    },
    {
      no: '03',
      title: '3. Confidential Pitch Information',
      body: 'Business summaries and supporting project notes are shared only with designated validation team reviewers and matched event desks on a need-to-know basis.',
    },
    {
      no: '04',
      title: '4. Contact & Corrections',
      body: `Participants may request updates or removal of their draft registration records by contacting ${ORGANISER_CONTACT.contactPerson} at ${ORGANISER_CONTACT.email}.`,
    },
  ];

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="LEGAL & DATA HANDLING"
        title="Privacy Policy."
        subtitle="How participant registration details, business summaries, and consultation inquiries submitted to Investor Meet 500 are collected, reviewed, and protected."
      />

      <section className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setExpandAll((v) => !v);
              setToggleEpoch((n) => n + 1);
            }}
            className="px-4 py-1.5 rounded-lg border border-[#e4dfd5] bg-white hover:border-[#0c121d] text-xs font-semibold text-[#0f172a] cursor-pointer"
          >
            {expandAll ? 'Collapse All Clauses' : 'Expand All Clauses'}
          </button>
        </div>

        {clauses.map((sec) => (
          <ExpandablePanel
            key={`${sec.no}-${toggleEpoch}`}
            kicker={`CLAUSE ${sec.no}`}
            title={sec.title}
            defaultOpen={expandAll}
          >
            {sec.body}
          </ExpandablePanel>
        ))}
      </section>
    </div>
  );
}

export function TermsPage() {
  const [expandAll, setExpandAll] = useState(true);
  const [toggleEpoch, setToggleEpoch] = useState(0);

  const clauses = [
    {
      no: '01',
      title: '1. Application Validation Requirement',
      body: 'Submitting an application or category registration does not guarantee approval or pitch slot assignment. All submissions undergo validation committee review prior to final confirmation.',
    },
    {
      no: '02',
      title: '2. No Guaranteed Funding or Lending',
      body: 'Investor Meet 500 is a structured networking and pitch facilitation platform. Organisers do not guarantee equity investment, bank loan sanction, or commercial partnership outcomes.',
    },
    {
      no: '03',
      title: '3. Registration Fees & Draft Options',
      body: 'Fee tiers shown under Registration Options (₹10,000 – ₹50,000) represent organiser draft structures. No online payment is collected on this website; fee instructions are issued only upon formal verification.',
    },
    {
      no: '04',
      title: '4. Reference Directories Disclaimer',
      body: 'Industry leaders, corporate directories, financial brands, banks and case study links listed across directories are compiled for ecosystem orientation and planned outreach only and do not imply endorsement or confirmed attendance.',
    },
  ];

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="LEGAL & GOVERNANCE"
        title="Terms & Conditions."
        subtitle="Governing rules for submitting draft participant applications, directory references, validation reviews, and event participation at Investor Meet 500."
      />

      <section className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setExpandAll((v) => !v);
              setToggleEpoch((n) => n + 1);
            }}
            className="px-4 py-1.5 rounded-lg border border-[#e4dfd5] bg-white hover:border-[#0c121d] text-xs font-semibold text-[#0f172a] cursor-pointer"
          >
            {expandAll ? 'Collapse All Clauses' : 'Expand All Clauses'}
          </button>
        </div>

        {clauses.map((sec) => (
          <ExpandablePanel
            key={`${sec.no}-${toggleEpoch}`}
            kicker={`CLAUSE ${sec.no}`}
            title={sec.title}
            defaultOpen={expandAll}
          >
            {sec.body}
          </ExpandablePanel>
        ))}
      </section>
    </div>
  );
}
