import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  Check,
  ChevronRight,
  Copy,
  Cpu,
  DollarSign,
  ExternalLink,
  Globe,
  Handshake,
  Landmark,
  MapPin,
  Network,
  Quote,
  Rocket,
  Share2,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  CENTRAL_GOVT_RESOURCES,
  COMMITTEES,
  FIRST_LEVEL_GUIDANCE_STEPS,
  INVESTMENT_TRACKS,
  MEDIA_ASSETS,
  PARTNERS_MARQUEE,
  STATE_GOVT_RESOURCES,
  TRACKS_TERM_EXPLANATION,
  VIDEO_ASSETS,
} from '../data/homeAndPrograms';
import { ORGANISER_CONTACT } from '../data/siteNavigation';
import {
  COMMITTEE_REVIEWER_PROFILES,
  PARTICIPANT_HIGHLIGHTS,
  type CommitteeReviewerProfile,
  type ParticipantProfileHighlight,
} from '../data/portraits';
import type { RegistrationRecord } from '../lib/domain';
import { Link } from '../lib/router';
import { AvatarPortrait } from '../components/AvatarPortrait';
import { InstitutionLogoMark } from '../components/BrandMark';
import { AmbientVideoLayer, CinematicShowcaseVideo } from '../components/CinematicVideo';
import { CountdownTimer } from '../components/CountdownTimer';
import {
  InteractiveCard,
  MagneticAction,
  ParallaxFrame,
  ScrollReveal,
  StaggerCard,
  StaggerGrid,
} from '../components/MotionPrimitives';
import {
  ParticipantDossierModal,
  ReviewerProfileModal,
} from '../components/ProfileModal';

type SpotlightTab = 'All' | 'Founders' | 'Investors' | 'Reviewers';

const CAPABILITY_POINTS = [
  {
    id: 'connections',
    label: 'Entrepreneur Connections',
    Icon: DollarSign,
    detail:
      'Direct structured access between pre-screened founders and institutional lenders, HNIs, and angel syndicates across Halls 1–3.',
    href: '/entrepreneurs',
    cta: 'Browse Entrepreneurs Directory',
  },
  {
    id: 'funding',
    label: 'Funding Opportunities',
    Icon: Briefcase,
    detail:
      'Five capital tracks covering ₹50 Lakhs seed equity up to ₹500 Crore expansion & syndication mandates under committee scrutiny.',
    href: '/tracks',
    cta: 'Compare Five Tracks',
  },
  {
    id: 'business',
    label: 'Business Connections',
    Icon: Building2,
    detail:
      'Engage Tamil Nadu industrial chambers, OEM supply chains, and corporate venturing desks for B2B contracts and joint ventures.',
    href: '/corporate',
    cta: 'Inspect 500+ Corporate Index',
  },
  {
    id: 'expansion',
    label: 'Business Expansion',
    Icon: TrendingUp,
    detail:
      'Dedicated growth capital, equipment leasing, and multi-city capacity expansion desks for revenue-stage manufacturing & service firms.',
    href: '/tracks',
    cta: 'View Expansion Track',
  },
  {
    id: 'startup',
    label: 'Startup Access',
    Icon: Rocket,
    detail:
      'A dedicated stream for 100 validated startups preparing crisp pitch decks, 5-year financials, and milestone risk disclosures.',
    href: '/startup',
    cta: 'Open Startup Pathway',
  },
  {
    id: 'networking',
    label: 'Networking',
    Icon: Handshake,
    detail:
      'Scheduled 20–30 minute deal-room windows supported by private meeting rooms (M1–M6) rather than ad-hoc trade show queues.',
    href: '/venue',
    cta: 'View Hall Floor Plans',
  },
] as const;

const JOURNEY_STEPS = [
  {
    no: '01',
    title: 'Register',
    desc: 'Submit your interest before 1 Feb 2027.',
    icon: Users,
    protocol:
      'Complete the structured intake with track selection, ticket size in ₹ Lakhs (50 to 50,000), company standing, and business summary. Instant reference ID issued.',
  },
  {
    no: '02',
    title: 'Validate',
    desc: 'Profile and eligibility review.',
    icon: Check,
    protocol:
      'The Validation Committee assesses founder execution history, financial projections, sector readiness, and compliance standing prior to confirming hall eligibility.',
  },
  {
    no: '03',
    title: 'Pitch',
    desc: 'Showcase your vision.',
    icon: Rocket,
    protocol:
      'Approved applicants receive confirmed slot timing inside Hall 1, Hall 2, or Hall 3 alongside paired investor, banking, or corporate buyer desks.',
  },
  {
    no: '04',
    title: 'Close the Deal',
    desc: 'Build lasting capital impact.',
    icon: Handshake,
    protocol:
      'Afternoon wrap-up blocks (2 PM – 6 PM) record guarantee-level call reports covering next-step diligence requests and post-summit coordination.',
  },
];

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

const SOCIAL_CHANNELS = [
  {
    id: 'youtube',
    name: 'YouTube',
    handle: 'Event Reels & Founder Explainers',
    accent: '#ef4444',
    desc: 'Approved plenary previews, 100-startup readiness explainers, and post-summit highlight reels managed by the Social Media Team.',
    href: '/event-program#promotion',
    cta: 'View Video Reel Plan',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: 'Daily Countdowns & Speaker Cards',
    accent: '#db2777',
    desc: 'Structured registration countdown tiles ahead of 1 February 2027, track spotlights, and verified venue updates.',
    href: '/calendar-plan',
    cta: 'Inspect Content Calendar',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Institutional & CFO Outreach',
    accent: '#2563eb',
    desc: 'Formal announcements aimed at CXOs, RBI scheduled bank credit teams, angel syndicates, and industrial chamber delegations.',
    href: '/sponsors',
    cta: 'Explore Partner Recognition',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    handle: 'Live Summit Announcements',
    accent: '#e2e8f0',
    desc: 'Concise schedule updates across Hall 1, Hall 2, and Hall 3 alongside approved committee milestones.',
    href: '/event-program',
    cta: 'Open Summit Schedule',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Desk',
    handle: '9962253522 · Organiser Briefings',
    accent: '#14b8a6',
    desc: 'Direct participant reminders, document checklist links, and hall-access updates for verified applicants via Mr. Rajganesh.',
    href: '/contact',
    cta: 'Message Organiser Desk',
  },
] as const;

function SocialPlatformIcon({ id }: { id: (typeof SOCIAL_CHANNELS)[number]['id'] }) {
  if (id === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      </svg>
    );
  }
  if (id === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (id === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
      </svg>
    );
  }
  if (id === 'x') {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M18.9 2H22l-6.8 7.7L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L.9 2h6.5l4.4 5.8L18.9 2Zm-1.1 18h1.7L6.5 3.9H4.6L17.8 20Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.6-1.3 1.2-1.8 1.2-.5 0-1.1.2-3.8-.9-3.2-1.3-5.2-4.5-5.4-4.7-.1-.2-1.3-1.7-1.3-3.3 0-1.5.8-2.3 1.1-2.6.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.6l.9 2.2c.1.2.1.4 0 .6l-.4.5c-.2.2-.3.4-.2.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.3 2.5 1.5.3.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.4.1.3.1 1-.1 1.5Z" />
    </svg>
  );
}

export function HomePage() {
  const [heroTrackId, setHeroTrackId] = useState(INVESTMENT_TRACKS[0].id);
  const [activeCapId, setActiveCapId] = useState<string>(CAPABILITY_POINTS[0].id);
  const [activeJourneyNo, setActiveJourneyNo] = useState<string>('01');
  const [expandedTrackId, setExpandedTrackId] = useState<string | null>(null);
  const [spotlightTab, setSpotlightTab] = useState<SpotlightTab>('All');
  const [activeGuidanceNo, setActiveGuidanceNo] = useState<string>(FIRST_LEVEL_GUIDANCE_STEPS[0].no);
  const [activeAiId, setActiveAiId] = useState<string>(AI_EXPERT_MODULES[0].id);
  const [expandedCommitteeTitle, setExpandedCommitteeTitle] = useState<string | null>(
    COMMITTEES[0].title
  );
  const [activeSocialId, setActiveSocialId] = useState<string>(SOCIAL_CHANNELS[0].id);
  const [copiedInvite, setCopiedInvite] = useState(false);

  const [liveRegistrations, setLiveRegistrations] = useState<RegistrationRecord[]>([]);
  const [activeDossier, setActiveDossier] = useState<RegistrationRecord | null>(null);
  const [activeReviewer, setActiveReviewer] = useState<CommitteeReviewerProfile | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    fetch('/api/registrations')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.registrations) setLiveRegistrations(d.registrations);
      })
      .catch(() => {});
  }, []);

  const heroTrack =
    INVESTMENT_TRACKS.find((t) => t.id === heroTrackId) ?? INVESTMENT_TRACKS[0];
  const activeCap =
    CAPABILITY_POINTS.find((c) => c.id === activeCapId) ?? CAPABILITY_POINTS[0];
  const activeJourney =
    JOURNEY_STEPS.find((j) => j.no === activeJourneyNo) ?? JOURNEY_STEPS[0];
  const activeGuidance =
    FIRST_LEVEL_GUIDANCE_STEPS.find((g) => g.no === activeGuidanceNo) ??
    FIRST_LEVEL_GUIDANCE_STEPS[0];
  const activeAi =
    AI_EXPERT_MODULES.find((m) => m.id === activeAiId) ?? AI_EXPERT_MODULES[0];
  const activeSocial =
    SOCIAL_CHANNELS.find((s) => s.id === activeSocialId) ?? SOCIAL_CHANNELS[0];

  const openParticipantHighlight = (highlight: ParticipantProfileHighlight) => {
    const liveMatch = liveRegistrations.find((r) => r.id === highlight.id);
    if (liveMatch) {
      setActiveDossier(liveMatch);
      return;
    }
    setActiveDossier({
      id: highlight.id,
      full_name: highlight.fullName,
      company: highlight.company,
      email: ORGANISER_CONTACT.email,
      phone: ORGANISER_CONTACT.phone,
      industry: highlight.roleTitle,
      track: highlight.track as RegistrationRecord['track'],
      participantType: highlight.category === 'Founder' ? 'Entrepreneur' : highlight.category,
      funding_lakhs: 250,
      business_summary: highlight.quote,
      location: highlight.location,
      stage: highlight.stage,
      validationStatus: 'Approved',
      paymentStatus: 'Confirmed',
      assignedReviewer: 'Dr. Meenakshi Sundaram',
      pitchHall: 'Hall 1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const handleCopyInvite = async () => {
    const text =
      'Investor Meet 500 · 20 February 2027 · Chennai. Registration open until 1 February 2027 across 5 investment tracks (₹50 Lakhs to ₹500 Crore). Apply at /apply.';
    try {
      await navigator.clipboard.writeText(text);
      setCopiedInvite(true);
      window.setTimeout(() => setCopiedInvite(false), 2400);
    } catch {
      setCopiedInvite(true);
      window.setTimeout(() => setCopiedInvite(false), 2400);
    }
  };

  const committeeIcons = [Rocket, Landmark, Globe, Wallet, Briefcase];

  const filteredParticipants =
    spotlightTab === 'Founders'
      ? PARTICIPANT_HIGHLIGHTS.filter((p) => p.category === 'Founder' || p.category === 'Exhibitor')
      : spotlightTab === 'Investors'
      ? PARTICIPANT_HIGHLIGHTS.filter((p) => p.category === 'Investor')
      : spotlightTab === 'All'
      ? PARTICIPANT_HIGHLIGHTS.slice(0, 6)
      : [];

  return (
    <div className="bg-[#091326] text-[#f8f7f3]">
      {/* 1. HERO SECTION (RESTORED ORIGINAL SKYLINE EXECUTIVE + AMBIENT MOTION) */}
      <section
        id="section-hero"
        data-section-order="1"
        className="relative overflow-hidden bg-[#07111e] text-[#f8f7f3] border-b border-white/10"
      >
        <AmbientVideoLayer
          src={VIDEO_ASSETS.heroSummit.src}
          poster={MEDIA_ASSETS.heroSkyline}
          alt="Senior executive overlooking metropolitan skyline at twilight"
          className="opacity-90 hero-image-enhanced object-[52%_25%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#091326]/92 via-[#091326]/70 to-[#172554]/35 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0b172c] via-transparent to-[#091326]/45 pointer-events-none"
        />

        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[1px] bg-[#c49a45]" aria-hidden="true" />
                <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#e6c67e]">
                  INVESTOR MEET 500 · 20-02-2027 · CHENNAI · AVAILABLE SLOTS ONLY
                </p>
              </div>

              <h1
                className="font-display text-4xl sm:text-5xl lg:text-[60px] font-medium leading-[1.04] tracking-tight text-white"
                style={{ textWrap: 'balance' }}
              >
                Capital. Connections.{' '}
                <span className="text-[#e6c67e]">Lasting Impact.</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-[#cbd5e1] max-w-xl leading-relaxed">
                A curated institutional capital summit connecting 500 pre-validated entrepreneurs,
                growth enterprises, scheduled banks, and investors across three halls in Chennai.
              </p>

              <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 border border-white/15 rounded-xl bg-[#091326]/85 divide-y sm:divide-y-0 sm:divide-x divide-white/12 overflow-hidden">
                {[
                  { num: '500', label: 'Participants Cap', Icon: Users },
                  { num: '100', label: 'Completed Slots', Icon: ShieldCheck },
                  { num: '400', label: 'Pending Slots', Icon: Calendar },
                  { num: '3', label: 'Pitch Halls', Icon: Network },
                ].map((stat) => (
                  <div key={stat.label} className="px-4 py-3.5 flex items-center gap-3">
                    <stat.Icon className="w-4 h-4 text-[#e6c67e] shrink-0" aria-hidden="true" />
                    <div>
                      <strong className="block font-mono text-xl sm:text-2xl font-semibold text-white leading-none tabular-nums">
                        {stat.num}
                      </strong>
                      <span className="mt-1 block text-[11px] text-[#94a3b8]">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-[#cbd5e1]">
                <span>Cutoff: <strong className="text-[#e6c67e]">01-02-2027</strong></span>
                <span>Strategy: <strong className="text-[#5eead4]">Available slots only</strong></span>
                <span>Funding: <strong className="text-white">₹50L – ₹500Cr</strong></span>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <MagneticAction>
                  <Link
                    href="/apply"
                    className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold whitespace-nowrap"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </MagneticAction>
                <Link
                  href="/tracks"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-white/15 bg-[#131c2b] hover:border-[#c49a45] text-sm font-medium text-[#f8f7f3] transition-colors whitespace-nowrap"
                >
                  <span>Explore Investment Tracks</span>
                  <ArrowRight className="w-4 h-4 text-[#c49a45]" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 lg:col-start-8"
            >
              <InteractiveCard
                dark
                className="rounded-2xl p-6 sm:p-7 space-y-5 !bg-[#091326]/85 backdrop-blur-md border-white/15"
              >
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e6c67e] block">
                      INTERACTIVE TRACK SELECTOR
                    </span>
                    <h2 className="font-display text-2xl font-semibold text-white mt-0.5">
                      {heroTrack.title}
                    </h2>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#e6c67e]">
                    {heroTrack.number} / 05
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Hero track selector">
                  {INVESTMENT_TRACKS.map((t) => {
                    const active = t.id === heroTrack.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setHeroTrackId(t.id)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                          active
                            ? 'bg-[#c49a45] text-[#091326] font-semibold'
                            : 'bg-white/5 text-[#cbd5e1] hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {t.title}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3 pt-1">
                  <p className="text-sm font-medium text-[#e6c67e]">
                    {heroTrack.lead} {heroTrack.subline}
                  </p>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                    {heroTrack.description}
                  </p>
                  <ul className="space-y-1.5 pt-2">
                    {heroTrack.eligibility.slice(0, 2).map((req) => (
                      <li key={req} className="flex items-start gap-2 text-xs text-[#cbd5e1]">
                        <Check className="w-3.5 h-3.5 text-[#14b8a6] mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {PARTICIPANT_HIGHLIGHTS.slice(0, 4).map((p) => (
                        <img
                          key={p.id}
                          src={p.portraitUrl}
                          alt={p.fullName}
                          className="w-8 h-8 rounded-full object-cover object-top ring-2 ring-[#091326]"
                        />
                      ))}
                    </div>
                    <Link
                      href="/investors#pipeline"
                      className="text-xs text-[#cbd5e1] hover:text-[#e6c67e] transition-colors"
                    >
                      Live Deal Pipeline →
                    </Link>
                  </div>

                  <Link
                    href={`/apply?track=${encodeURIComponent(heroTrack.title)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e6c67e] hover:underline"
                  >
                    <span>Apply for {heroTrack.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </InteractiveCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US */}
      <section
        id="section-about"
        data-section-order="2"
        className="relative overflow-hidden bg-gradient-to-b from-[#0b172c] via-[#102140] to-[#14294f] text-[#f8f7f3] border-b border-white/10 py-12 sm:py-16"
      >
        <div className="architectural-grid-blue absolute inset-0 pointer-events-none opacity-60" aria-hidden="true" />
        <div className="ambient-glow-blue absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <ScrollReveal className="lg:col-span-6 space-y-5">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e6c67e] mb-2">
                02 · PLATFORM ARCHITECTURE
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
                About Investor Meet 500
              </h2>
              <p className="mt-3 text-[15px] sm:text-base text-[#cbd5e1] leading-relaxed max-w-xl">
                Investor Meet 500 unites Indian entrepreneurs, expansion-stage businesses, scheduled
                banks, and institutional capital under structured committee validation—replacing noisy
                trade fairs with scheduled deal-room workflows.
              </p>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
              role="tablist"
              aria-label="Platform capabilities"
            >
              {CAPABILITY_POINTS.map((item) => {
                const active = item.id === activeCap.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCapId(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm font-medium transition-all cursor-pointer ${
                      active
                        ? 'bg-[#e6c67e] text-[#091326] border-[#e6c67e] font-semibold shadow-sm'
                        : 'bg-[#15284c]/90 text-[#e2e8f0] border-white/15 hover:border-[#60a5fa]/60 hover:bg-[#19305b]'
                    }`}
                  >
                    <item.Icon
                      className={`w-4 h-4 shrink-0 ${
                        active ? 'text-[#091326]' : 'text-[#e6c67e]'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <InteractiveCard
              dark
              className="!bg-[#132547]/95 rounded-2xl border-white/15 p-6 space-y-4"
            >
              <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#1d4ed8]/30 border border-[#60a5fa]/35 text-[#e6c67e] flex items-center justify-center">
                    <activeCap.Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#93c5fd] block">
                      CAPABILITY DETAIL
                    </span>
                    <h3 className="font-display text-xl font-semibold text-white">
                      {activeCap.label}
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-xs text-[#e6c67e] tabular-nums">₹50L – ₹500Cr</span>
              </div>

              <p className="text-sm text-[#cbd5e1] leading-relaxed">{activeCap.detail}</p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <Link
                  href={activeCap.href}
                  className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold"
                >
                  <span>{activeCap.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/about"
                  className="text-xs font-semibold text-[#93c5fd] hover:text-[#e6c67e] hover:underline inline-flex items-center gap-1"
                >
                  <span>Full Summit Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </InteractiveCard>
          </ScrollReveal>

          <ScrollReveal delay={0.06} className="lg:col-span-6">
            <Link href="/about" className="block group">
              <InteractiveCard
                dark
                className="rounded-2xl overflow-hidden flex flex-col !bg-[#132547]/95 border-white/15"
              >
                <ParallaxFrame offset={18} className="aspect-[16/10] w-full bg-[#091326] relative">
                  <img
                    src={MEDIA_ASSETS.aboutReception}
                    alt="Indian startup founders, women business leaders, and institutional investors conversing inside the Chennai summit atrium"
                    referrerPolicy="no-referrer"
                    className="w-full h-[112%] -mt-[6%] object-cover object-center interactive-media"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0d1a33]/95 via-transparent to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between gap-4">
                    <div>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e6c67e]">
                        CHENNAI ATRIUM · 20 FEB 2027
                      </span>
                      <p className="mt-1 font-display text-xl sm:text-2xl font-medium text-white leading-snug">
                        500 Pre-Validated Founders, Lenders &amp; Capital Partners
                      </p>
                    </div>
                  </div>
                </ParallaxFrame>
                <div className="p-6 flex flex-wrap items-center justify-between gap-4 bg-[#10203d] border-t border-white/10">
                  <p className="text-xs sm:text-sm text-[#cbd5e1] max-w-md leading-relaxed">
                    Structured 20–30 minute scheduled meetings across Halls 1, 2, and 3 backed by
                    90-day committee screening.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e6c67e] shrink-0 group-hover:translate-x-0.5 transition-transform">
                    <span>About Summit</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </InteractiveCard>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. INVESTMENT JOURNEY */}
      <section
        id="section-journey"
        data-section-order="3"
        className="relative overflow-hidden bg-gradient-to-b from-[#14294f] via-[#18315c] to-[#102242] text-[#f8f7f3] py-12 sm:py-16 border-b border-white/10"
      >
        <div className="ambient-glow-teal absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5eead4] mb-2">
                03 · FOUR-STAGE WORKFLOW
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
                Investment Journey
              </h2>
            </div>
            <p className="text-xs text-[#cbd5e1]">
              Select any stage below to inspect committee screening protocol.
            </p>
          </ScrollReveal>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            role="tablist"
            aria-label="Investment journey steps"
          >
            {JOURNEY_STEPS.map((step) => {
              const active = step.no === activeJourneyNo;
              return (
                <InteractiveCard
                  key={step.no}
                  as="button"
                  dark
                  onClick={() => setActiveJourneyNo(step.no)}
                  className={`rounded-xl p-5 flex flex-col justify-between gap-3 ${
                    active
                      ? 'ring-2 ring-[#e6c67e] !border-[#e6c67e] !bg-[#1c386b]'
                      : '!bg-[#12264a]/90 border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-xs font-semibold text-[#93c5fd]">
                      STAGE {step.no}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        active
                          ? 'bg-[#e6c67e] text-[#091326]'
                          : 'bg-white/10 text-[#e6c67e]'
                      }`}
                    >
                      <step.icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#cbd5e1]">{step.desc}</p>
                  </div>
                </InteractiveCard>
              );
            })}
          </div>

          <InteractiveCard
            dark
            className="!bg-[#0e1e3a]/95 rounded-xl border-[#c49a45]/30 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#5eead4]">
                STAGE {activeJourney.no} PROTOCOL · {activeJourney.title}
              </span>
              <p className="text-sm text-[#e2e8f0] leading-relaxed">{activeJourney.protocol}</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/payments"
                className="text-xs font-semibold text-[#93c5fd] hover:text-[#e6c67e] hover:underline whitespace-nowrap"
              >
                Fee Ladder (9 Options)
              </Link>
              <Link
                href="/registration-policy"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e6c67e] hover:underline whitespace-nowrap"
              >
                <span>90 Days Policy</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          </InteractiveCard>
        </div>
      </section>

      {/* 4. SAVE THE DATE */}
      <div id="section-save-the-date" data-section-order="4">
        <CountdownTimer />
      </div>

      {/* 5. INVESTMENT TRACK (COORDINATED SAPPHIRE-SLATE TEMPLATE + MEANING CLARIFICATION #3 & #4) */}
      <section
        id="section-tracks"
        data-section-order="5"
        className="relative overflow-hidden bg-gradient-to-b from-[#0d1c36] via-[#14284b] to-[#1a3461] text-[#f8f7f3] py-12 sm:py-16 border-b border-white/10"
      >
        <div className="architectural-grid-blue absolute inset-0 pointer-events-none opacity-55" aria-hidden="true" />
        <div className="ambient-glow-blue absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e6c67e] mb-2">
                05 · FIVE DEDICATED PATHWAYS · INSTITUTIONAL MANDATES
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
                Explore Our Investment Tracks
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-[#cbd5e1] leading-relaxed">
                Choose the pathway that matches how your company raises capital—equity venture pitches,
                enterprise credit, growth expansion, scheduled banking, or blended capital.
              </p>
            </div>
            <Link
              href="/tracks"
              className="btn-gold inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap"
            >
              <span>Compare All 5 Tracks &amp; Meanings</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </ScrollReveal>

          {/* Plain-English meaning of "Investment Tracks" */}
          <div className="rounded-2xl border border-[#60a5fa]/30 bg-[#102242]/90 p-5 sm:p-6 space-y-1.5">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#93c5fd] block">
              TERMINOLOGY CLARIFICATION
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
              {TRACKS_TERM_EXPLANATION.heading}
            </h3>
            <p className="text-sm text-[#cbd5e1] leading-relaxed max-w-4xl">
              {TRACKS_TERM_EXPLANATION.summary}
            </p>
          </div>

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {INVESTMENT_TRACKS.map((track) => {
              const expanded = expandedTrackId === track.id;
              return (
                <StaggerCard key={track.id} className="h-full">
                  <InteractiveCard
                    as="article"
                    dark
                    className="rounded-xl overflow-hidden flex flex-col justify-between h-full group !bg-[#112445]/95 border-white/15"
                  >
                    <div>
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#091326]">
                        <img
                          src={track.image}
                          alt={track.imageAlt}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center hero-image-enhanced interactive-media"
                        />
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-[#091326]/90 border border-[#e6c67e]/40 text-[#e6c67e] font-mono text-[10px] font-bold tracking-wider shadow-sm">
                          TRACK {track.number}
                        </div>
                      </div>

                      <div className="p-5 pb-3">
                        <h3 className="font-display text-2xl font-semibold text-white">
                          {track.title}
                        </h3>
                        <p className="mt-1.5 text-xs font-semibold text-[#93c5fd]">
                          {track.lead} {track.subline}
                        </p>
                        <p className="mt-2 text-xs text-[#cbd5e1] leading-relaxed">
                          {track.meaning}
                        </p>

                        {expanded && (
                          <ul className="mt-3 pt-3 border-t border-white/10 space-y-1.5 text-[11px] text-[#e2e8f0]">
                            {track.eligibility.map((item) => (
                              <li key={item} className="flex items-start gap-1.5">
                                <Check className="w-3 h-3 text-[#5eead4] mt-0.5 shrink-0" aria-hidden="true" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="p-4 pt-3 border-t border-white/10 bg-[#0d1c36]/90 space-y-2">
                      <button
                        type="button"
                        onClick={() => setExpandedTrackId(expanded ? null : track.id)}
                        aria-expanded={expanded}
                        className="w-full inline-flex items-center justify-between px-3 py-1.5 rounded-lg border border-white/15 bg-[#152b52] hover:border-[#e6c67e]/60 text-[11px] font-semibold text-[#e2e8f0] cursor-pointer transition-colors"
                      >
                        <span>{expanded ? 'Hide Eligibility Specs' : 'Quick Eligibility Specs'}</span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            expanded ? 'rotate-90 text-[#e6c67e]' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      <Link
                        href={`/apply?track=${encodeURIComponent(track.title)}`}
                        aria-label={`Apply for ${track.title}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#1d4ed8] hover:bg-[#2563eb] text-white text-xs font-semibold transition-colors"
                      >
                        <span>Apply for {track.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </InteractiveCard>
                </StaggerCard>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* 6. STARTUP */}
      <section
        id="section-startup"
        data-section-order="6"
        className="relative overflow-hidden bg-gradient-to-b from-[#1a3461] via-[#1c396b] to-[#132648] text-[#f8f7f3] py-12 sm:py-16 border-b border-white/10"
      >
        <div className="ambient-glow-teal absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between gap-6">
              <InteractiveCard
                dark
                className="!bg-[#112344]/95 border-white/15 rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5 h-full"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5eead4]">
                    <Rocket className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>06 · STARTUP STREAM · 100 VALIDATED VENTURES</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
                    Dedicated Pathway for 100 Validated Startups
                  </h2>
                  <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed">
                    Early-stage and growth startups undergo structured scrutiny covering product
                    traction, pitch deck quality, 5-year financial projections, and capital risk
                    prior to receiving confirmed Hall 1 &amp; Hall 2 pitch windows.
                  </p>
                </div>

                <div className="grid grid-cols-3 border border-white/15 rounded-xl bg-[#0c1933]/85 divide-x divide-white/15">
                  <div className="p-3.5">
                    <span className="block font-mono text-lg font-bold text-white tabular-nums">
                      100
                    </span>
                    <span className="text-[11px] text-[#cbd5e1]">Target Startups</span>
                  </div>
                  <div className="p-3.5">
                    <span className="block font-mono text-lg font-bold text-[#e6c67e] tabular-nums">
                      ₹50L+
                    </span>
                    <span className="text-[11px] text-[#cbd5e1]">Minimum Raise</span>
                  </div>
                  <div className="p-3.5">
                    <span className="block font-mono text-lg font-bold text-[#5eead4] tabular-nums">
                      Hall 1–2
                    </span>
                    <span className="text-[11px] text-[#cbd5e1]">Pitch Allocation</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href="/startup"
                    className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold"
                  >
                    <span>Open Startup Stream</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/women-entrepreneurs"
                    className="text-xs font-semibold text-[#93c5fd] hover:text-[#e6c67e] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Women Entrepreneurs Directory</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </InteractiveCard>
            </div>

            <div className="lg:col-span-6">
              <CinematicShowcaseVideo
                src={VIDEO_ASSETS.startupEcosystem.src}
                poster={VIDEO_ASSETS.startupEcosystem.poster}
                title={VIDEO_ASSETS.startupEcosystem.title}
                caption={VIDEO_ASSETS.startupEcosystem.caption}
                kicker="STARTUP VALIDATION FILM · CHENNAI PITCH FLOW"
                heightClass="h-full min-h-[300px]"
                className="!border-white/20"
              />
            </div>
          </div>

          {/* Startup & Investor Spotlight Matrix */}
          <div className="space-y-5 pt-1">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">
                  Validated Cohort &amp; Capital Network Profiles
                </h3>
                <p className="text-xs sm:text-sm text-[#cbd5e1] mt-1">
                  Click any founder, investor, or reviewer card to inspect mandate details and pitch
                  hall allocation.
                </p>
              </div>

              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label="Filter spotlight profiles"
              >
                {(
                  [
                    { id: 'All', label: 'All Profiles' },
                    { id: 'Founders', label: 'Founders & Industry' },
                    { id: 'Investors', label: 'Investors & Funds' },
                    { id: 'Reviewers', label: 'Validation Panel' },
                  ] as const
                ).map((tab) => {
                  const active = spotlightTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSpotlightTab(tab.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'bg-[#e6c67e] text-[#091326]'
                          : 'bg-[#112344]/90 text-[#cbd5e1] border border-white/15 hover:border-[#60a5fa]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {spotlightTab === 'Reviewers' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {COMMITTEE_REVIEWER_PROFILES.map((rev) => (
                  <InteractiveCard
                    key={rev.name}
                    as="button"
                    dark
                    onClick={() => setActiveReviewer(rev)}
                    className="!bg-[#122546]/95 border-white/15 rounded-xl p-6 flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3.5">
                        <AvatarPortrait name={rev.name} src={rev.portraitUrl} size="md" theme="dark" />
                        <div className="min-w-0">
                          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#93c5fd] block">
                            {rev.hallFocus}
                          </span>
                          <h4 className="font-display text-xl font-semibold text-white leading-snug">
                            {rev.name}
                          </h4>
                        </div>
                      </div>
                      <p className="mt-3 text-xs font-semibold text-[#e6c67e]">{rev.role}</p>
                      <p className="mt-2 text-xs text-[#cbd5e1] leading-relaxed line-clamp-3">
                        &ldquo;{rev.perspective}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#93c5fd] w-full">
                      <span>Inspect Reviewer Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                  </InteractiveCard>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredParticipants.slice(0, 9).map((person) => {
                  const accent =
                    person.track === 'Startups'
                      ? '#60a5fa'
                      : person.track === 'Business Expansion'
                      ? '#a78bfa'
                      : person.track === 'Bank Loans' || person.track === 'Business Loan'
                      ? '#2dd4bf'
                      : '#e6c67e';
                  return (
                    <InteractiveCard
                      key={person.id}
                      as="button"
                      dark
                      onClick={() => openParticipantHighlight(person)}
                      className="!bg-[#122546]/95 border-white/15 rounded-xl overflow-hidden flex flex-col justify-between gap-4 text-left"
                    >
                      <div className="h-1.5 w-full" style={{ backgroundColor: accent }} aria-hidden="true" />
                      <div className="px-6 pt-2 flex-1 w-full">
                        <div className="flex items-start gap-4">
                          <AvatarPortrait name={person.fullName} src={person.portraitUrl} size="md" theme="dark" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className="font-mono text-[10px] font-semibold uppercase tracking-wider"
                                style={{ color: accent }}
                              >
                                {person.track}
                              </span>
                              <span className="text-[11px] font-medium text-[#cbd5e1]">
                                {person.category}
                              </span>
                            </div>
                            <h4 className="mt-0.5 font-display text-2xl font-semibold text-white leading-tight">
                              {person.fullName}
                            </h4>
                            <p className="text-xs font-medium text-[#cbd5e1] mt-0.5">
                              {person.roleTitle} · {person.company}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#cbd5e1]">
                          <span className="font-mono font-semibold text-[#e6c67e]">
                            {person.mandate}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#5eead4]" aria-hidden="true" />
                            {person.location}
                          </span>
                        </div>

                        <blockquote className="mt-3 pt-3 border-t border-white/10 text-xs text-[#e2e8f0] leading-relaxed flex items-start gap-2">
                          <Quote className="w-3.5 h-3.5 text-[#e6c67e] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{person.quote}</span>
                        </blockquote>
                      </div>

                      <div className="px-6 pb-5 pt-2 flex items-center justify-between text-xs font-semibold text-[#93c5fd] w-full">
                        <span className="text-[#cbd5e1] font-normal">{person.stage}</span>
                        <span className="inline-flex items-center gap-1">
                          <span>View Dossier</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </InteractiveCard>
                  );
                })}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1 text-xs text-[#cbd5e1]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#5eead4]" aria-hidden="true" />
                Representative seeded profiles &amp; committee reviewers. Unconfirmed Chief Guests
                remain marked as awaiting confirmation.
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/entrepreneurs"
                  className="font-semibold text-[#e6c67e] hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore 100 Entrepreneurs Directory</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/investors#pipeline"
                  className="font-semibold text-[#93c5fd] hover:underline inline-flex items-center gap-1"
                >
                  <span>Browse Live Investor Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GOVERNMENT AND FIRST LEVEL BUSINESS GUIDANCE + CONSULTATION TOPIC (#16, #18, #33, #34) */}
      <section
        id="section-government-guidance"
        data-section-order="7"
        className="relative overflow-hidden bg-gradient-to-b from-[#132648] via-[#152b52] to-[#0d1c36] text-[#f8f7f3] py-12 sm:py-16 border-b border-white/10"
      >
        <div className="architectural-grid-blue absolute inset-0 pointer-events-none opacity-50" aria-hidden="true" />
        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-9">
          {/* Top Block: State vs Central Government Side-by-Side Comparison (#16, #18) */}
          <div className="space-y-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5eead4] mb-1.5">
                  07 · STATE &amp; CENTRAL GOVERNMENT PORTALS (SIDE-BY-SIDE COMPARISON)
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
                  Government &amp; Institutional Guidance
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[#cbd5e1] max-w-3xl leading-relaxed">
                  Compare Tamil Nadu State industrial facilitation agencies directly alongside Central
                  Government investment and MSME portals before preparing your compliance dossier.
                </p>
              </div>
              <Link
                href="/government"
                className="btn-gold inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap"
              >
                <span>Open Full Government Index</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Tamil Nadu State Government */}
              <div className="rounded-2xl border border-[#14b8a6]/35 bg-[#0c2334]/90 p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#14b8a6]/25">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#5eead4]">
                      STATE GOVERNMENT · TAMIL NADU
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-white mt-0.5">
                      Tamil Nadu Nodal Agencies (5)
                    </h3>
                  </div>
                  <Landmark className="w-6 h-6 text-[#5eead4]" aria-hidden="true" />
                </div>

                <div className="space-y-2.5">
                  {STATE_GOVT_RESOURCES.map((agency) => (
                    <a
                      key={agency.name}
                      href={agency.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="rounded-xl border border-white/12 bg-[#0a1a28]/85 hover:border-[#14b8a6] hover:bg-[#0e273a] p-4 flex items-center justify-between gap-4 transition-colors">
                        <div className="min-w-0">
                          <h4 className="font-display text-lg font-semibold text-white group-hover:text-[#5eead4] transition-colors truncate">
                            {agency.name}
                          </h4>
                          <p className="mt-0.5 text-xs text-[#cbd5e1] line-clamp-2">
                            {agency.description}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[#5eead4] shrink-0" aria-hidden="true" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Column: Central Government of India */}
              <div className="rounded-2xl border border-[#60a5fa]/35 bg-[#0f2247]/90 p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#60a5fa]/25">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#93c5fd]">
                      CENTRAL GOVERNMENT · UNION OF INDIA
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-white mt-0.5">
                      National Ministries &amp; Portals (5)
                    </h3>
                  </div>
                  <Globe className="w-6 h-6 text-[#93c5fd]" aria-hidden="true" />
                </div>

                <div className="space-y-2.5">
                  {CENTRAL_GOVT_RESOURCES.map((agency) => (
                    <a
                      key={agency.name}
                      href={agency.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="rounded-xl border border-white/12 bg-[#0b1936]/85 hover:border-[#60a5fa] hover:bg-[#10254f] p-4 flex items-center justify-between gap-4 transition-colors">
                        <div className="min-w-0">
                          <h4 className="font-display text-lg font-semibold text-white group-hover:text-[#93c5fd] transition-colors truncate">
                            {agency.name}
                          </h4>
                          <p className="mt-0.5 text-xs text-[#cbd5e1] line-clamp-2">
                            {agency.description}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-[#93c5fd] shrink-0" aria-hidden="true" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Split: First Level Business Guidance + Highlighted Consultation Topic (#33, #34) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start pt-6 border-t border-white/10">
            <ScrollReveal className="lg:col-span-7 space-y-5">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a5b4fc] mb-1.5">
                  10-STEP READINESS CLINIC
                </p>
                <h2 className="font-display text-3xl font-semibold text-white">
                  First Level Business Guidance
                </h2>
                <p className="mt-2 text-sm text-[#cbd5e1] leading-relaxed">
                  Inspect each step of the 10-point First Level Business Guidance checklist before
                  selecting your track or booking an Organiser Consultation.
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
                          ? 'bg-[#e6c67e] text-[#091326] border-[#e6c67e] font-semibold'
                          : 'bg-[#0f1f3d]/90 text-[#e2e8f0] border-white/15 hover:border-[#93c5fd]/60'
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

              <InteractiveCard
                dark
                className="!bg-[#102242]/95 border-white/15 rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#93c5fd]">
                      FIRST LEVEL GUIDANCE MODULE {activeGuidance.no} OF 10
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-white mt-0.5">
                      {activeGuidance.title}
                    </h3>
                  </div>
                  <Handshake className="w-5 h-5 text-[#e6c67e] shrink-0" aria-hidden="true" />
                </div>

                <p className="text-sm text-[#cbd5e1] leading-relaxed">{activeGuidance.desc}</p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href="/business-guidance"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1d4ed8] hover:bg-[#2563eb] text-white text-xs font-semibold transition-colors"
                  >
                    <span>Explore All 10 Guidance Steps</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/contact?subject=Consultation"
                    className="text-xs font-semibold text-[#e6c67e] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Book First-Level Guidance Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </InteractiveCard>
            </ScrollReveal>

            {/* Standalone Highlighted Consultation Topic Card (#34) */}
            <ScrollReveal delay={0.06} className="lg:col-span-5">
              <div
                id="section-consultation"
                className="rounded-2xl bg-gradient-to-br from-[#0b152a] via-[#132242] to-[#1e1b4b] text-[#f8f7f3] p-6 sm:p-7 space-y-5 border border-[#c49a45]/45 shadow-lg"
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
                  Unsure whether your proposal belongs under Startups, Business Loans, Expansion, or
                  Mixed Capital? Schedule a pre-validation Consultation with Mr. Rajganesh’s Organiser
                  Desk prior to 01-02-2027.
                </p>

                <ul className="space-y-2.5 text-xs sm:text-sm text-[#e2e8f0]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>Investment track &amp; ticket-size suitability check (₹50L–₹500Cr)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>Pitch deck &amp; Project Financial Report document review</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>Payment tier selection guidance (₹10,000–₹50,000, Available slots only)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#5eead4] mt-0.5 shrink-0" aria-hidden="true" />
                    <span>Direct alerts dispatched to {ORGANISER_CONTACT.notificationEmail}</span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-mono text-[#cbd5e1]">
                    <span className="block text-[#e6c67e] font-semibold">
                      {ORGANISER_CONTACT.contactPerson} · {ORGANISER_CONTACT.phone}
                    </span>
                    <span>{ORGANISER_CONTACT.email}</span>
                  </div>
                  <Link
                    href="/contact?subject=Consultation"
                    className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 8. AI EXPERT */}
      <section
        id="section-ai-expert"
        data-section-order="8"
        className="relative overflow-hidden bg-gradient-to-b from-[#0d1c36] via-[#091326] to-[#112242] text-[#f8f7f3] py-12 sm:py-16 border-b border-white/10"
      >
        <div className="ambient-glow-blue absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <ScrollReveal className="lg:col-span-6">
            <InteractiveCard dark className="rounded-2xl overflow-hidden group !bg-[#111e38] border-white/15">
              <ParallaxFrame offset={16} className="relative h-64 sm:h-80 w-full bg-[#0c121d]">
                <img
                  src={MEDIA_ASSETS.aiExpertsStage}
                  alt="Indian AI & venture keynote speaker addressing plenary summit audience in Chennai"
                  referrerPolicy="no-referrer"
                  className="w-full h-[112%] -mt-[6%] object-cover object-center interactive-media"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#111e38] via-[#111e38]/35 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e6c67e]">
                    <Cpu className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>08 · AI EXPERTS &amp; CFO KEYNOTES</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#cbd5e1]">
                    Chief Guests Awaiting Confirmation
                  </span>
                </div>
              </ParallaxFrame>
              <div className="p-7 pt-5 space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                  AI in Investment Markets &amp; CFO Capital Discipline
                </h2>
                <p className="text-sm text-[#cbd5e1] leading-relaxed">
                  Focused plenary dialogues covering AI due-diligence workflows, working-capital risk
                  assessment, founder failure case studies, and 5-year expansion governance.
                </p>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <Link
                    href="/speakers#ai-experts"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e6c67e] hover:underline"
                  >
                    <span>Inspect Chief Guests, AI &amp; CFO Tracks</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActiveReviewer(COMMITTEE_REVIEWER_PROFILES[0])}
                    className="text-xs font-semibold text-[#93c5fd] hover:text-white cursor-pointer"
                  >
                    Meet Lead Validation Reviewer →
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
                        : 'bg-[#111e38] text-[#cbd5e1] border border-white/15 hover:border-[#c49a45]/60'
                    }`}
                  >
                    {mod.kicker}
                  </button>
                );
              })}
            </div>

            <InteractiveCard dark className="rounded-2xl p-6 sm:p-7 space-y-5 !bg-[#111e38] border-white/15">
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
                  Speaker profiles remain TBC until written confirmation.
                </span>
                <Link
                  href="/event-program"
                  className="btn-gold inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold"
                >
                  <span>Full Summit Agenda</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </InteractiveCard>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. COMMITTEES */}
      <section
        id="section-committees"
        data-section-order="9"
        className="relative overflow-hidden bg-gradient-to-b from-[#112242] via-[#172e58] to-[#0e1c36] text-[#f8f7f3] py-12 sm:py-16 border-b border-white/10"
      >
        <div className="architectural-grid-blue absolute inset-0 pointer-events-none opacity-55" aria-hidden="true" />
        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#93c5fd] mb-2">
                09 · GOVERNANCE STRUCTURE
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
                Five Planning Committees
              </h2>
              <p className="mt-2 text-sm text-[#cbd5e1] leading-relaxed">
                Click any committee card below to inspect review scope and governance oversight.
                Confirmed chair names will be published upon written acceptance.
              </p>
            </div>
            <Link
              href="/team"
              className="text-xs font-semibold text-[#e6c67e] hover:underline inline-flex items-center gap-1 whitespace-nowrap"
            >
              <span>Inspect Five Operational Teams</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </ScrollReveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {COMMITTEES.map((committee, idx) => {
              const Icon = committeeIcons[idx % committeeIcons.length];
              const isExpanded = expandedCommitteeTitle === committee.title;
              return (
                <StaggerCard key={committee.title} className="h-full">
                  <InteractiveCard
                    as="button"
                    dark
                    ariaExpanded={isExpanded}
                    onClick={() =>
                      setExpandedCommitteeTitle(isExpanded ? null : committee.title)
                    }
                    className={`rounded-2xl overflow-hidden flex flex-col justify-between h-full transition-colors ${
                      isExpanded
                        ? 'ring-2 ring-[#e6c67e] !border-[#e6c67e] !bg-[#1a3463]'
                        : '!bg-[#112445]/95 border-white/15'
                    }`}
                  >
                    <div className="w-full">
                      {/* Large Individual Committee Scene Photo (#20) */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#091326]">
                        <img
                          src={committee.image}
                          alt={committee.imageAlt}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center hero-image-enhanced interactive-media"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#0d1c36]/90 via-[#0d1c36]/20 to-transparent"
                        />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#e6c67e]">
                            COMMITTEE 0{idx + 1}
                          </span>
                          <div className="w-7 h-7 rounded-md bg-white/15 backdrop-blur-sm text-white flex items-center justify-center">
                            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                          </div>
                        </div>
                      </div>

                      <div className="p-5 pb-3">
                        <h3 className="font-display text-xl font-semibold text-white leading-snug">
                          {committee.title}
                        </h3>
                        <p className="mt-2 text-xs text-[#cbd5e1] leading-relaxed">
                          {committee.description}
                        </p>
                        {isExpanded && (
                          <p className="mt-3 pt-3 border-t border-white/10 text-[11px] text-[#93c5fd] font-medium">
                            Governs 90 Days Policy pre-summit eligibility verification and hall slot alignment.
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="px-5 pb-4 pt-3 border-t border-white/10 font-mono text-[10px] uppercase tracking-wider text-[#94a3b8] w-full flex items-center justify-between">
                      <span>Awaiting confirmation</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isExpanded ? 'rotate-90 text-[#e6c67e]' : ''
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
      </section>

      {/* 10. SOCIAL MEDIA PROMOTION (#24 Instagram / YouTube / LinkedIn Concrete Campaign Cards + #42) */}
      <section
        id="section-social-media"
        data-section-order="10"
        className="relative overflow-hidden bg-gradient-to-b from-[#0e1c36] via-[#091326] to-[#10203e] text-[#f8f7f3] py-12 sm:py-16 border-b border-white/10"
      >
        <div className="ambient-glow-teal absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
          <ScrollReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e6c67e] mb-2">
                10 · INSTAGRAM · YOUTUBE · LINKEDIN CAMPAIGN PREVIEWS
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
                Social Media Promotion
              </h2>
              <p className="mt-2 text-sm text-[#cbd5e1] leading-relaxed">
                Coordinated campaign visuals across Instagram, YouTube, LinkedIn, X, and WhatsApp
                ahead of the 01-02-2027 registration cutoff and 20-02-2027 summit day.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyInvite}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/20 bg-white/5 hover:border-[#e6c67e] text-xs font-semibold text-white cursor-pointer transition-colors"
              >
                {copiedInvite ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#14b8a6]" aria-hidden="true" />
                    <span>Invitation Summary Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#e6c67e]" aria-hidden="true" />
                    <span>Copy Summit Invite</span>
                  </>
                )}
              </button>
              <Link
                href="/event-program#promotion"
                className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold"
              >
                <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Media Kit &amp; Program</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* 3 Featured Post Previews: Instagram, YouTube, LinkedIn */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Instagram Post Preview */}
            <article className="rounded-2xl overflow-hidden border border-[#db2777]/35 bg-[#111e38] flex flex-col justify-between">
              <div>
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#f472b6]">
                    <SocialPlatformIcon id="instagram" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      Instagram Post Preview
                    </span>
                  </div>
                  <span className="text-[11px] text-[#94a3b8]">1:1 Reel / Tile</span>
                </div>
                <div className="relative aspect-[16/10] bg-[#0c121d]">
                  <img
                    src={MEDIA_ASSETS.womenLeadershipForum}
                    alt="Instagram countdown campaign spotlight for Investor Meet 500 Chennai"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091326] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="font-mono text-[10px] font-bold text-[#e6c67e] uppercase">
                      SAVE THE DATE · 20-02-2027
                    </span>
                    <p className="font-display text-lg font-semibold text-white">
                      500 Verified Founders &amp; Investors · Chennai
                    </p>
                  </div>
                </div>
                <div className="p-4 text-xs text-[#cbd5e1] leading-relaxed">
                  <p>
                    &ldquo;Applications close <strong className="text-white">01-02-2027</strong>. Available
                    slots only across Startups, Business Loan, Expansion, Bank Loans &amp; Mixed Capital.&rdquo;
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 text-[11px] font-mono text-[#f472b6]">
                #InvestorMeet500 #ChennaiStartups #MSMEGrowth
              </div>
            </article>

            {/* YouTube Video Post Preview */}
            <article className="rounded-2xl overflow-hidden border border-[#ef4444]/35 bg-[#111e38] flex flex-col justify-between">
              <div>
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#f87171]">
                    <SocialPlatformIcon id="youtube" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      YouTube Explainer Post
                    </span>
                  </div>
                  <span className="text-[11px] text-[#94a3b8]">16:9 Stage Film</span>
                </div>
                <div className="relative aspect-[16/10] bg-[#0c121d]">
                  <img
                    src={MEDIA_ASSETS.aiExpertsStage}
                    alt="YouTube explainer thumbnail featuring Chennai plenary stage and pitch halls"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091326] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="font-mono text-[10px] font-bold text-[#f87171] uppercase">
                      FOUNDER READINESS BRIEFING
                    </span>
                    <p className="font-display text-lg font-semibold text-white">
                      How 90 Days Validation Prepares Your Pitch
                    </p>
                  </div>
                </div>
                <div className="p-4 text-xs text-[#cbd5e1] leading-relaxed">
                  <p>
                    Step-by-step walkthrough of Validation Team checks, Hall 1–3 Pitch Area slots,
                    CFO Points, and First Level Business Guidance.
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 flex items-center justify-between text-[11px] font-mono text-[#f87171]">
                <span>8:00 AM – 6:00 PM Format</span>
                <Link href="/pitch-area" className="underline hover:text-white">
                  View Pitch Area →
                </Link>
              </div>
            </article>

            {/* LinkedIn Executive Post Preview */}
            <article className="rounded-2xl overflow-hidden border border-[#3b82f6]/40 bg-[#111e38] flex flex-col justify-between">
              <div>
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#60a5fa]">
                    <SocialPlatformIcon id="linkedin" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider">
                      LinkedIn Executive Post
                    </span>
                  </div>
                  <span className="text-[11px] text-[#94a3b8]">B2B &amp; Institutional</span>
                </div>
                <div className="relative aspect-[16/10] bg-[#0c121d]">
                  <img
                    src={MEDIA_ASSETS.msmeCreditBoardroom}
                    alt="LinkedIn executive digest preview for banking managers, CFOs and corporate leaders"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091326] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="font-mono text-[10px] font-bold text-[#60a5fa] uppercase">
                      CXO &amp; BANKING DELEGATIONS
                    </span>
                    <p className="font-display text-lg font-semibold text-white">
                      ₹50 Lakhs to ₹500 Crore Capital Mandate
                    </p>
                  </div>
                </div>
                <div className="p-4 text-xs text-[#cbd5e1] leading-relaxed">
                  <p>
                    Inviting Scheduled Bank Managers, CFOs, Angel Networks &amp; Tamil Nadu Association
                    Heads to Chennai on 20 February 2027.
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4 flex items-center justify-between text-[11px] font-mono text-[#60a5fa]">
                <span>Organiser: {ORGANISER_CONTACT.contactPerson}</span>
                <Link href="/speakers" className="underline hover:text-white">
                  Chief Guests →
                </Link>
              </div>
            </article>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SOCIAL_CHANNELS.map((ch) => {
              const active = ch.id === activeSocialId;
              return (
                <InteractiveCard
                  key={ch.id}
                  as="button"
                  dark
                  onClick={() => setActiveSocialId(ch.id)}
                  className={`rounded-xl p-5 flex flex-col justify-between gap-4 !bg-[#111e38] ${
                    active ? 'ring-2 ring-[#e6c67e] border-[#e6c67e]' : 'border-white/15'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div
                        className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center"
                        style={{ color: ch.accent }}
                      >
                        <SocialPlatformIcon id={ch.id} />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#94a3b8]">
                        Campaign Channel
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white">{ch.name}</h3>
                    <p className="mt-1 text-xs text-[#cbd5e1]">{ch.handle}</p>
                  </div>

                  <span className="pt-3 border-t border-white/10 w-full flex items-center justify-between text-xs font-semibold text-[#e6c67e]">
                    <span>{active ? 'Active Channel' : 'Inspect Format'}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </InteractiveCard>
              );
            })}
          </div>

          <InteractiveCard dark tilt={false} className="rounded-2xl p-6 !bg-[#111e38] border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#14b8a6]">
                CHANNEL WORKFLOW · {activeSocial.name}
              </span>
              <p className="text-sm text-[#e2e8f0] leading-relaxed">{activeSocial.desc}</p>
            </div>
            <Link
              href={activeSocial.href}
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#1d4ed8] hover:bg-[#2563eb] text-xs font-semibold text-white whitespace-nowrap transition-colors"
            >
              <span>{activeSocial.cta}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </InteractiveCard>
        </div>
      </section>

      {/* 11. PARTNERS */}
      <section
        id="section-partners"
        data-section-order="11"
        className="relative overflow-hidden bg-gradient-to-b from-[#10203e] via-[#162d54] to-[#0b162b] text-[#f8f7f3] py-12 sm:py-16 border-b border-white/10"
      >
        <div className="architectural-grid-blue absolute inset-0 pointer-events-none opacity-55" aria-hidden="true" />
        <div className="ambient-glow-blue absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#93c5fd] mb-2">
                11 · PARTNERS &amp; ECOSYSTEM OUTREACH
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
                Partners &amp; Institutional Directory
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-[#cbd5e1] max-w-2xl">
                Featured industrial &amp; corporate outreach entities referenced in the summit event
                plan alongside curated directories. Listing reflects outreach scope, not implied
                endorsement.
              </p>
            </div>
            <Link
              href="/sponsors"
              className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap"
            >
              <span>Inspect Sponsorship Tiers</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </ScrollReveal>

          {/* Clickable Partner Logo Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PARTNERS_MARQUEE.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${partner.fullName} external website`}
                className="block group"
              >
                <InteractiveCard
                  dark
                  className="rounded-xl p-4 h-full flex flex-col justify-between gap-3 !bg-[#122546]/95 border-white/15"
                >
                  <InstitutionLogoMark name={partner.fullName} size="marquee" />
                  <div className="flex items-start justify-between gap-2 pt-1">
                    <span className="text-xs font-semibold text-[#f1f5f9] group-hover:text-[#e6c67e] leading-snug">
                      {partner.fullName}
                    </span>
                    <ExternalLink
                      className="w-3.5 h-3.5 text-[#e6c67e] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </InteractiveCard>
              </a>
            ))}
          </div>

          {/* 4 Searchable Institutional Ecosystem Indexes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Corporate Directory', count: '500+', sub: 'NSE/BSE & Regional Leaders', href: '/corporate' },
              { label: 'RBI Scheduled Banks', count: '120', sub: 'Public, Private & Foreign Banks', href: '/banks' },
              { label: 'TN Financial Brands', count: '50', sub: 'NBFCs, VCs & Angel Syndicates', href: '/financial-brands' },
              { label: 'Industry Associations', count: '15', sub: 'Chambers & Trade Guilds', href: '/associations' },
            ].map((dir) => (
              <Link key={dir.href} href={dir.href} className="block group">
                <InteractiveCard
                  dark
                  className="rounded-xl p-5 h-full flex flex-col justify-between !bg-[#0f1f3d]/95 border-white/15 hover:border-[#60a5fa]/60"
                >
                  <div>
                    <span className="font-mono text-2xl sm:text-3xl font-semibold text-[#e6c67e] group-hover:text-[#93c5fd] transition-colors tabular-nums">
                      {dir.count}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">
                      {dir.label}
                    </h3>
                    <p className="mt-1 text-xs text-[#cbd5e1]">{dir.sub}</p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#93c5fd] group-hover:text-[#e6c67e]">
                    <span>Browse Directory</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </InteractiveCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final Editorial CTA */}
      <section className="bg-gradient-to-b from-[#0b162b] to-[#091326] text-[#f8f7f3] py-12 sm:py-14">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e6c67e]">
              FINAL REGISTRATION DEADLINE · 1 FEBRUARY 2027
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-white">
              Ready to present in Chennai?
            </h2>
          </div>
          <MagneticAction>
            <Link
              href="/apply"
              className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold whitespace-nowrap"
            >
              <span>Start Application</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </MagneticAction>
        </div>
      </section>

      <ParticipantDossierModal record={activeDossier} onClose={() => setActiveDossier(null)} />
      <ReviewerProfileModal reviewer={activeReviewer} onClose={() => setActiveReviewer(null)} />
    </div>
  );
}
