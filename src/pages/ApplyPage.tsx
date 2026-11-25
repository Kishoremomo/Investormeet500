import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Download, RotateCcw } from 'lucide-react';
import {
  formatLakhsToDisplay,
  ORGANISER_NOTIFICATION_EMAIL,
  PRIMARY_TRACKS,
  REGISTRATION_CUTOFF_DATE_CODE,
  REGISTRATION_STRATEGY,
  REFERENCE_COMPLETED_COUNT,
  REFERENCE_PENDING_COUNT,
  validateApplicationInput,
  type ApplicationFormInput,
  type NotificationLogEntry,
  type RegistrationRecord,
} from '../lib/domain';
import { MEDIA_ASSETS } from '../data/homeAndPrograms';
import { Link, useQueryParam } from '../lib/router';
import { CtaBanner } from '../components/CtaBanner';
import { PageHero } from '../components/PageHero';

const INITIAL_FORM: ApplicationFormInput = {
  full_name: '',
  company: '',
  email: '',
  phone: '',
  industry: '',
  track: '',
  funding_lakhs: '',
  business_summary: '',
  supporting_information: '',
  terms: false,
};

export function ApplyPage() {
  const trackParam = useQueryParam('track');
  const [form, setForm] = useState<ApplicationFormInput>(() => ({
    ...INITIAL_FORM,
    track: trackParam && PRIMARY_TRACKS.includes(trackParam as never) ? trackParam : '',
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationRecord | null>(null);
  const [submittedNotification, setSubmittedNotification] = useState<NotificationLogEntry | null>(null);

  useEffect(() => {
    if (trackParam && PRIMARY_TRACKS.includes(trackParam as never)) {
      setForm((prev) => ({ ...prev, track: trackParam }));
    }
  }, [trackParam]);

  const handleChange = (
    field: keyof ApplicationFormInput,
    value: string | boolean
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const downloadJson = (payload: unknown, filename: string) => {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const validation = validateApplicationInput(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          funding_lakhs: Number(form.funding_lakhs),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setServerError(data.error || 'Unable to submit application.');
        return;
      }
      setSubmittedRecord(data.registration);
      setSubmittedNotification(data.notification ?? null);
    } catch {
      setServerError('Network error while submitting application. You can still download your JSON copy.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setServerError(null);
    setSubmittedRecord(null);
    setSubmittedNotification(null);
  };

  const fundingPreview =
    form.funding_lakhs && Number(form.funding_lakhs) >= 50
      ? formatLakhsToDisplay(Number(form.funding_lakhs))
      : null;

  const completedRequiredFields = [
    form.full_name.trim(),
    form.company.trim(),
    form.email.trim(),
    form.phone.trim(),
    form.industry.trim(),
    form.track.trim(),
    Number(form.funding_lakhs) >= 50 ? 'ok' : '',
    form.business_summary.trim(),
    form.terms ? 'ok' : '',
  ].filter(Boolean).length;

  const completionPct = Math.round((completedRequiredFields / 9) * 100);

  return (
    <div className="bg-[#f8fafc] text-[#0f172a]">
      <PageHero
        kicker="PARTICIPANT APPLICATION"
        title="Apply to Participate"
        subtitle="Choose a track and prepare your application. Funding range: ₹50 Lakhs to ₹500 Crore."
        image={MEDIA_ASSETS.startupInnovationAtrium}
        imageAlt="Founders preparing investment pitch dossiers inside innovation atrium"
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="rounded-xl border border-[#e4dfd5] bg-white overflow-hidden shadow-sm">
          <div className="h-1 w-full bg-[#1d4ed8]" aria-hidden="true" />
          <div className="px-5 py-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-[#334155]">
              <div className="space-y-1">
                <div>
                  <strong className="text-[#091326]">Registration Strategy: {REGISTRATION_STRATEGY}.</strong>{' '}
                  Completed – <strong>{REFERENCE_COMPLETED_COUNT}</strong> / Pending –{' '}
                  <strong>{REFERENCE_PENDING_COUNT}</strong> · Cutoff:{' '}
                  <strong className="text-[#091326]">1 February 2027 ({REGISTRATION_CUTOFF_DATE_CODE})</strong>.
                </div>
                <p className="text-xs text-[#526075]">
                  All submissions are logged with instant reference IDs and routed to{' '}
                  <strong className="text-[#091326]">{ORGANISER_NOTIFICATION_EMAIL}</strong>.
                </p>
              </div>
              <span className="font-mono text-xs font-semibold text-[#1d4ed8] tabular-nums">
                {completedRequiredFields} / 9 fields complete ({completionPct}%)
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#e2e8f0] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1d4ed8] via-[#4338ca] to-[#0d9488] transition-all duration-300"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>
        </div>

        {submittedRecord ? (
          <div
            role="status"
            className="rounded-2xl border border-emerald-700/25 bg-white p-8 space-y-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-700 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">
                  Application Recorded · {submittedRecord.id}
                </p>
                <h2 className="mt-1 font-display text-3xl font-semibold text-[#0f172a]">
                  Thank you, {submittedRecord.full_name}
                </h2>
                <p className="text-sm text-[#334155]">
                  Your application for <strong>{submittedRecord.company}</strong> under the{' '}
                  <strong>{submittedRecord.track}</strong> track (
                  {formatLakhsToDisplay(submittedRecord.funding_lakhs)}) has been saved with status{' '}
                  <strong>{submittedRecord.validationStatus}</strong>.
                </p>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 px-4 py-2.5 text-xs text-emerald-950 font-mono">
                  Organiser Notification Logged ({submittedNotification?.id || 'Outbox'}):{' '}
                  <strong>{ORGANISER_NOTIFICATION_EMAIL}</strong> ·{' '}
                  {submittedNotification?.status || 'Recorded in notification outbox'}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  downloadJson(submittedRecord, `${submittedRecord.id.toLowerCase()}.json`)
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#cfc8b8] hover:border-[#1d4ed8] text-xs font-semibold text-[#0f172a] cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Download JSON receipt</span>
              </button>
              <Link
                href="/admin/registrations"
                className="btn-obsidian inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold"
              >
                <span>View in Registration Dashboard</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium text-[#526075] hover:text-[#0f172a] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Submit another application</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="lg:col-span-8 rounded-2xl border border-[#e4dfd5] bg-white p-6 sm:p-8 space-y-6 shadow-sm"
            >
              {serverError && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900"
                >
                  {serverError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="apply-full-name" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                    Participant name
                  </label>
                  <input
                    id="apply-full-name"
                    name="full_name"
                    type="text"
                    value={form.full_name}
                    onChange={(e) => handleChange('full_name', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8] transition-colors"
                  />
                  {errors.full_name && (
                    <p className="mt-1 text-xs text-red-700">{errors.full_name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="apply-company" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                    Company name
                  </label>
                  <input
                    id="apply-company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8] transition-colors"
                  />
                  {errors.company && <p className="mt-1 text-xs text-red-700">{errors.company}</p>}
                </div>

                <div>
                  <label htmlFor="apply-email" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                    Email
                  </label>
                  <input
                    id="apply-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8] transition-colors"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="apply-phone" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                    Phone number
                  </label>
                  <input
                    id="apply-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8] transition-colors"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-700">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="apply-industry" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                    Business category
                  </label>
                  <input
                    id="apply-industry"
                    name="industry"
                    type="text"
                    placeholder="e.g. Manufacturing"
                    value={form.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8] transition-colors"
                  />
                  {errors.industry && (
                    <p className="mt-1 text-xs text-red-700">{errors.industry}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="apply-track" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                    Investment track
                  </label>
                  <select
                    id="apply-track"
                    name="track"
                    value={form.track}
                    onChange={(e) => handleChange('track', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8] transition-colors"
                  >
                    <option value="">Select a track</option>
                    {PRIMARY_TRACKS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.track && <p className="mt-1 text-xs text-red-700">{errors.track}</p>}
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <label htmlFor="apply-funding" className="block text-xs font-semibold text-[#0f172a]">
                    Funding requirement{' '}
                    <span className="font-normal text-[#526075]">
                      in Lakhs (50 to 50,000; 100 Lakhs = 1 Crore)
                    </span>
                  </label>
                  {fundingPreview && (
                    <span className="font-mono text-xs font-semibold text-[#0d9488] tabular-nums">
                      {fundingPreview}
                    </span>
                  )}
                </div>
                <input
                  id="apply-funding"
                  name="funding_lakhs"
                  type="number"
                  min={50}
                  max={50000}
                  value={form.funding_lakhs}
                  onChange={(e) => handleChange('funding_lakhs', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm text-[#0f172a] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8] transition-colors"
                />
                {errors.funding_lakhs && (
                  <p className="mt-1 text-xs text-red-700">{errors.funding_lakhs}</p>
                )}
              </div>

              <div>
                <label htmlFor="apply-summary" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Business or project description{' '}
                  <span className="font-normal text-[#526075]">
                    company background, project, previous projects, success stories, risk
                  </span>
                </label>
                <textarea
                  id="apply-summary"
                  name="business_summary"
                  rows={4}
                  value={form.business_summary}
                  onChange={(e) => handleChange('business_summary', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8] transition-colors"
                />
                {errors.business_summary && (
                  <p className="mt-1 text-xs text-red-700">{errors.business_summary}</p>
                )}
              </div>

              <div>
                <label htmlFor="apply-supporting" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Supporting information{' '}
                  <span className="font-normal text-[#526075]">optional</span>
                </label>
                <textarea
                  id="apply-supporting"
                  name="supporting_information"
                  rows={2}
                  value={form.supporting_information}
                  onChange={(e) => handleChange('supporting_information', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8] transition-colors"
                />
              </div>

              <div>
                <label className="inline-flex items-start gap-2.5 cursor-pointer text-xs text-[#334155]">
                  <input
                    name="terms"
                    type="checkbox"
                    checked={form.terms}
                    onChange={(e) => handleChange('terms', e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-[#cfc8b8] accent-[#1d4ed8]"
                  />
                  <span>
                    I accept the{' '}
                    <Link href="/terms" className="underline text-[#1d4ed8]">
                      draft terms
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="underline text-[#1d4ed8]">
                      draft privacy policy
                    </Link>
                    .
                  </span>
                </label>
                {errors.terms && <p className="mt-1 text-xs text-red-700">{errors.terms}</p>}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-obsidian inline-flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-semibold cursor-pointer disabled:opacity-60"
                >
                  <span>{submitting ? 'Submitting…' : 'Submit application'}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const check = validateApplicationInput(form);
                    if (!check.valid) {
                      setErrors(check.errors);
                      return;
                    }
                    downloadJson(form, 'investor-meet-500-application-draft.json');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#cfc8b8] hover:border-[#1d4ed8] text-xs font-semibold text-[#0f172a] cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Validate &amp; download JSON</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-3 rounded-lg text-xs font-medium text-[#526075] hover:text-[#0f172a] cursor-pointer"
                >
                  Clear form
                </button>
              </div>
            </form>

            <aside className="lg:col-span-4 rounded-2xl border border-[#e4dfd5] bg-white overflow-hidden shadow-sm">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#1d4ed8] via-[#6d28d9] to-[#0d9488]" />
              <div className="p-6 sm:p-7 space-y-5">
                <h2 className="font-display text-2xl font-semibold text-[#0f172a]">
                  What happens next
                </h2>
                <ol className="space-y-4 text-sm text-[#334155]">
                  <li className="flex gap-3">
                    <span className="font-mono text-xs font-bold text-[#1d4ed8] pt-0.5">01</span>
                    <span>Registration logged with unique reference ID</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-xs font-bold text-[#6d28d9] pt-0.5">02</span>
                    <span>
                      Validation of company background, project, previous projects, success stories
                      and risk
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-xs font-bold text-[#0d9488] pt-0.5">03</span>
                    <span>Approval or rejection and pitch hall allocation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-xs font-bold text-[#8a5d14] pt-0.5">04</span>
                    <span>Pitch presentation and closing updates</span>
                  </li>
                </ol>
                <p className="pt-3 border-t border-[#e4dfd5] text-xs text-[#526075] leading-relaxed">
                  Applying records interest only; it is not an approval or a funding commitment. Fees
                  and payments are not confirmed online.
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>

      <CtaBanner />
    </div>
  );
}
