import React, { useEffect } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  MapPin,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  formatLakhsToDisplay,
  type PaymentStatus,
  type RegistrationRecord,
  type ValidationStatus,
} from '../lib/domain';
import {
  resolvePortraitUrl,
  type CommitteeReviewerProfile,
} from '../data/portraits';
import { AvatarPortrait } from './AvatarPortrait';
import { Link } from '../lib/router';

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}

function ModalShell({ open, onClose, ariaLabel, children }: BaseModalProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#090e17]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.97, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-[#0f172a] rounded-2xl border border-[#e4dfd5] max-w-2xl w-full shadow-2xl overflow-hidden my-8"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function ParticipantDossierModal({
  record,
  onClose,
  canReview = false,
  onQuickReview,
}: {
  record: RegistrationRecord | null;
  onClose: () => void;
  canReview?: boolean;
  onQuickReview?: (
    id: string,
    patch: Partial<{ validationStatus: ValidationStatus; paymentStatus: PaymentStatus }>,
    note: string
  ) => Promise<void> | void;
}) {
  if (!record) return null;
  const participantPortrait = resolvePortraitUrl(record.full_name, record.id);
  const reviewerPortrait = resolvePortraitUrl(record.assignedReviewer);

  return (
    <ModalShell
      open={Boolean(record)}
      onClose={onClose}
      ariaLabel={`Participant dossier for ${record.full_name}`}
    >
      <div className="bg-[#0c121d] text-[#f8f7f3] px-6 py-5 flex items-start justify-between gap-4 border-b border-white/10">
        <div className="flex items-center gap-4 min-w-0">
          <AvatarPortrait name={record.full_name} src={participantPortrait} size="lg" theme="dark" />
          <div className="min-w-0">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#e6c67e]">
              {record.id} · {record.participantType}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white truncate">
              {record.full_name}
            </h3>
            <p className="text-xs sm:text-sm text-[#cbd5e1] truncate">
              {record.company} · {record.industry}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close participant dossier"
          className="w-9 h-9 rounded-lg border border-white/15 bg-[#131c2b] hover:border-[#c49a45] flex items-center justify-center text-[#f8f7f3] shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#e4dfd5] border border-[#e4dfd5] rounded-xl bg-[#fafaf8] text-xs overflow-hidden">
          <div className="p-3.5">
            <span className="text-[#526075] block">Track</span>
            <strong className="text-[#0f172a] mt-0.5 block">{record.track}</strong>
          </div>
          <div className="p-3.5">
            <span className="text-[#526075] block">Funding Mandate</span>
            <strong className="font-mono text-[#8a5d14] mt-0.5 block tabular-nums">
              {formatLakhsToDisplay(record.funding_lakhs)}
            </strong>
          </div>
          <div className="p-3.5">
            <span className="text-[#526075] block">Validation</span>
            <strong className="text-[#0f172a] mt-0.5 block">{record.validationStatus}</strong>
          </div>
          <div className="p-3.5">
            <span className="text-[#526075] block">Pitch Hall</span>
            <strong className="text-[#0f172a] mt-0.5 block">{record.pitchHall}</strong>
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a5d14] mb-1.5">
            Project &amp; Capital Summary
          </p>
          <p className="text-sm text-[#334155] leading-relaxed">{record.business_summary}</p>
          {record.supporting_information && (
            <p className="mt-2.5 text-xs text-[#526075] bg-[#fafaf8] rounded-lg px-3.5 py-2.5 border border-[#e4dfd5]">
              <strong className="text-[#0f172a]">Supporting notes:</strong>{' '}
              {record.supporting_information}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-[#e4dfd5] bg-[#fafaf8] p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AvatarPortrait name={record.assignedReviewer} src={reviewerPortrait} size="sm" />
            <div className="text-xs">
              <span className="text-[#526075] block">Assigned Reviewer</span>
              <strong className="text-[#0f172a]">{record.assignedReviewer}</strong>
            </div>
          </div>
          <div className="text-xs text-[#526075] space-y-0.5 text-right">
            {record.location && (
              <div className="inline-flex items-center gap-1 text-[#334155]">
                <MapPin className="w-3.5 h-3.5 text-[#8a5d14]" aria-hidden="true" />
                <span>
                  {record.location}
                  {record.stage ? ` · ${record.stage}` : ''}
                </span>
              </div>
            )}
            <div className="font-mono text-[11px]">{record.email}</div>
          </div>
        </div>

        {record.reviewerNotes && (
          <div className="rounded-lg border border-amber-200 bg-amber-50/70 px-4 py-2.5 text-xs text-amber-950">
            <strong>Committee review note:</strong> {record.reviewerNotes}
          </div>
        )}

        <div className="pt-3 border-t border-[#e4dfd5] flex flex-wrap items-center justify-between gap-3">
          {canReview && onQuickReview ? (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={async () => {
                  await onQuickReview(
                    record.id,
                    { validationStatus: 'Approved' },
                    'Approved via dossier inspector'
                  );
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Approve</span>
              </button>
              <button
                type="button"
                onClick={async () => {
                  await onQuickReview(
                    record.id,
                    { validationStatus: 'Under review' },
                    'Marked Under review'
                  );
                  onClose();
                }}
                className="px-4 py-2 rounded-lg border border-[#cfc8b8] bg-white hover:border-[#0f172a] text-xs font-semibold text-[#0f172a] cursor-pointer"
              >
                Under review
              </button>
              <button
                type="button"
                onClick={async () => {
                  await onQuickReview(
                    record.id,
                    { validationStatus: 'Rejected' },
                    'Marked Rejected'
                  );
                  onClose();
                }}
                className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-semibold cursor-pointer"
              >
                Reject
              </button>
            </div>
          ) : (
            <Link
              href={`/contact?subject=${encodeURIComponent(`Introduction Enquiry — ${record.company}`)}`}
              onClick={onClose}
              className="btn-obsidian inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold"
            >
              <span>Request Committee Introduction</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-[#526075] hover:text-[#0f172a] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

export function ReviewerProfileModal({
  reviewer,
  onClose,
}: {
  reviewer: CommitteeReviewerProfile | null;
  onClose: () => void;
}) {
  if (!reviewer) return null;
  return (
    <ModalShell
      open={Boolean(reviewer)}
      onClose={onClose}
      ariaLabel={`Validation panel profile for ${reviewer.name}`}
    >
      <div className="bg-[#0c121d] text-[#f8f7f3] px-6 py-5 flex items-start justify-between gap-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <AvatarPortrait name={reviewer.name} src={reviewer.portraitUrl} size="lg" theme="dark" />
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#e6c67e]">
              {reviewer.committee}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              {reviewer.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#cbd5e1]">{reviewer.role}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close reviewer profile"
          className="w-9 h-9 rounded-lg border border-white/15 bg-[#131c2b] hover:border-[#c49a45] flex items-center justify-center text-[#f8f7f3] shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 space-y-5">
        <p className="text-sm text-[#334155] leading-relaxed">{reviewer.credentials}</p>

        <blockquote className="rounded-xl border border-[#e4dfd5] bg-[#fafaf8] p-4 italic text-sm text-[#0f172a] leading-relaxed">
          &ldquo;{reviewer.perspective}&rdquo;
        </blockquote>

        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a5d14] mb-2">
            Validation &amp; Scrutiny Focus ({reviewer.hallFocus})
          </p>
          <ul className="space-y-2">
            {reviewer.focusAreas.map((area) => (
              <li key={area} className="flex items-center gap-2 text-sm text-[#0f172a]">
                <ShieldCheck className="w-4 h-4 text-[#8a5d14] shrink-0" aria-hidden="true" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-[#e4dfd5] flex items-center justify-between gap-3">
          <Link
            href="/apply"
            onClick={onClose}
            className="btn-obsidian inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold"
          >
            <span>Submit Application for Review</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#526075] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

export interface DirectoryLeaderSummary {
  serial: string;
  name: string;
  company: string;
  sector: string;
  directoryLabel: string;
}

export function LeaderReferenceModal({
  leader,
  onClose,
}: {
  leader: DirectoryLeaderSummary | null;
  onClose: () => void;
}) {
  if (!leader) return null;
  const portraitUrl = resolvePortraitUrl(leader.name);
  return (
    <ModalShell
      open={Boolean(leader)}
      onClose={onClose}
      ariaLabel={`Directory profile for ${leader.name}`}
    >
      <div className="bg-[#0c121d] text-[#f8f7f3] px-6 py-5 flex items-start justify-between gap-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <AvatarPortrait name={leader.name} src={portraitUrl} size="lg" theme="dark" />
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#e6c67e]">
              {leader.serial} · {leader.directoryLabel}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              {leader.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#cbd5e1] flex items-center gap-1.5 mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-[#c49a45]" aria-hidden="true" />
              <span>{leader.company}</span>
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close directory reference"
          className="w-9 h-9 rounded-lg border border-white/15 bg-[#131c2b] hover:border-[#c49a45] flex items-center justify-center text-[#f8f7f3] shrink-0 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 space-y-5">
        <div className="rounded-xl border border-[#e4dfd5] bg-[#fafaf8] p-4 space-y-2.5 text-xs text-[#334155]">
          <div className="flex items-center justify-between">
            <span className="text-[#526075]">Primary Sector</span>
            <strong className="text-[#0f172a]">{leader.sector}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#526075]">Enterprise</span>
            <strong className="text-[#0f172a]">{leader.company}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#526075]">Directory Status</span>
            <strong className="text-[#8a5d14]">Ecosystem Orientation Reference</strong>
          </div>
        </div>

        <p className="text-xs text-[#526075] leading-relaxed">
          Compiled for ecosystem orientation and sector benchmarking within Investor Meet 500.
          Listing in this reference directory respects public identity and does not imply confirmed
          summit attendance or commercial endorsement.
        </p>

        <div className="pt-2 border-t border-[#e4dfd5] flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/tracks"
            onClick={onClose}
            className="btn-obsidian inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Explore Related Tracks</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#526075] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
