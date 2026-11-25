import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Download, RotateCcw } from 'lucide-react';
import {
  formatLakhsToDisplay,
  ORGANISER_NOTIFICATION_EMAIL,
  REGISTRATION_CUTOFF_DATE_CODE,
  REGISTRATION_STRATEGY,
  validateCategoryRegistrationInput,
  type CategoryRegistrationInput,
  type NotificationLogEntry,
  type RegistrationRecord,
} from '../lib/domain';
import { MEDIA_ASSETS } from '../data/homeAndPrograms';
import { Link, useQueryParam } from '../lib/router';
import { CtaBanner } from '../components/CtaBanner';
import { PageHero } from '../components/PageHero';

const CATEGORY_TABS = [
  { slug: 'startup', label: 'Startup Registration', entityLabel: 'Startup name *', heading: 'Startup Registration Preparation', lead: 'Prepare your founder profile, startup stage, business model and funding purpose.' },
  { slug: 'business', label: 'Business Registration', entityLabel: 'Business name *', heading: 'Business Registration Preparation', lead: 'Prepare your operating business profile, sector background and expansion goals.' },
  { slug: 'bank-loan', label: 'Bank Loan Registration', entityLabel: 'Enterprise name *', heading: 'Bank Loan Registration Preparation', lead: 'Prepare your project report, turnover overview and banking facility requirement.' },
  { slug: 'business-loan', label: 'Business Loan Registration', entityLabel: 'Company name *', heading: 'Business Loan Registration Preparation', lead: 'Prepare your working capital or equipment loan requirement and financial overview.' },
  { slug: 'investor', label: 'Investor Registration', entityLabel: 'Fund / Family Office / Organisation *', heading: 'Investor Registration Preparation', lead: 'Specify your preferred sectors, ticket size range and investment mandate.' },
  { slug: 'corporate', label: 'Corporate Registration', entityLabel: 'Corporate entity name *', heading: 'Corporate Participation Preparation', lead: 'Indicate sponsorship, exhibition booth or strategic partnership interests.' },
  { slug: 'association', label: 'Association Registration', entityLabel: 'Association name *', heading: 'Association Delegation Preparation', lead: 'Coordinate member outreach and group delegations across Tamil Nadu chambers.' },
  { slug: 'international', label: 'International Registration', entityLabel: 'International company / fund *', heading: 'International Delegate Preparation', lead: 'Share cross-border joint venture, FDI or export expansion goals.' },
];

export function RegistrationPage() {
  const catParam = useQueryParam('category');
  const [activeSlug, setActiveSlug] = useState(
    () => CATEGORY_TABS.find((t) => t.slug === catParam)?.slug || 'startup'
  );
  const [liveCount, setLiveCount] = useState<number | null>(null);

  const [form, setForm] = useState<Omit<CategoryRegistrationInput, 'categorySlug'>>({
    full_name: '',
    company: '',
    email: '',
    phone: '',
    sector: '',
    location: '',
    stage: '',
    founder_background: '',
    funding_lakhs: '',
    funding_purpose: '',
    business_summary: '',
    website: '',
    document_checklist: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationRecord | null>(null);
  const [submittedNotification, setSubmittedNotification] = useState<NotificationLogEntry | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (catParam && CATEGORY_TABS.some((t) => t.slug === catParam)) {
      setActiveSlug(catParam);
    }
  }, [catParam]);

  useEffect(() => {
    fetch('/api/registrations')
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.allCount === 'number') setLiveCount(d.allCount);
      })
      .catch(() => {});
  }, [submittedRecord]);

  const activeTab = CATEGORY_TABS.find((t) => t.slug === activeSlug) || CATEGORY_TABS[0];

  const handleField = (key: keyof typeof form, val: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const downloadDraft = (payload: unknown, filename: string) => {
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
    const payload: CategoryRegistrationInput = { categorySlug: activeSlug, ...form };
    const check = validateCategoryRegistrationInput(payload);
    if (!check.valid) {
      setErrors(check.errors);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'category',
          ...payload,
          funding_lakhs: Number(payload.funding_lakhs),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setServerError(data.error || 'Could not submit registration.');
        return;
      }
      setSubmittedRecord(data.registration);
      setSubmittedNotification(data.notification ?? null);
    } catch {
      setServerError('Network error while saving registration.');
    } finally {
      setSubmitting(false);
    }
  };

  const clearForm = () => {
    setForm({
      full_name: '',
      company: '',
      email: '',
      phone: '',
      sector: '',
      location: '',
      stage: '',
      founder_background: '',
      funding_lakhs: '',
      funding_purpose: '',
      business_summary: '',
      website: '',
      document_checklist: '',
      consent: false,
    });
    setErrors({});
    setServerError(null);
    setSubmittedRecord(null);
    setSubmittedNotification(null);
  };

  const requiredCompleted = [
    form.full_name.trim(),
    form.company.trim(),
    form.email.trim(),
    form.phone.trim(),
    form.sector.trim(),
    form.location.trim(),
    form.stage.trim(),
    form.founder_background.trim(),
    Number(form.funding_lakhs) >= 50 ? 'ok' : '',
    form.funding_purpose.trim(),
    form.business_summary.trim(),
    form.consent ? 'ok' : '',
  ].filter(Boolean).length;
  const requiredPct = Math.round((requiredCompleted / 12) * 100);

  return (
    <div className="bg-[#f8fafc] text-[#0f172a]">
      <PageHero
        kicker="CATEGORY REGISTRATION"
        title="Registration & Participation"
        subtitle="Choose the participant category that matches your goals. Prepare relevant details before the verification process."
        image={MEDIA_ASSETS.aboutReception}
        imageAlt="Founders and institutional delegates conversing at Chennai summit reception"
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="rounded-xl border border-[#e4dfd5] bg-white overflow-hidden shadow-sm">
          <div className="h-1 w-full bg-[#1d4ed8]" aria-hidden="true" />
          <div className="p-5 space-y-2 text-xs sm:text-sm text-[#334155]">
            <p>
              <strong className="text-[#091326]">Registration Strategy: {REGISTRATION_STRATEGY}.</strong>{' '}
              Submissions are recorded directly in the event database with an immediate reference ID,
              and routed to our organiser alerts inbox.
            </p>
            <p className="text-xs text-[#526075]">
              Organiser notification inbox: <strong>{ORGANISER_NOTIFICATION_EMAIL}</strong> · Cutoff:{' '}
              <strong>1 February 2027 ({REGISTRATION_CUTOFF_DATE_CODE})</strong>
            </p>
          </div>
        </div>

        {/* Initial Reference Figures */}
        <div className="rounded-2xl bg-gradient-to-br from-[#091326] via-[#0f1e3d] to-[#172554] text-[#f8f7f3] p-6 sm:p-8 space-y-5 shadow-md border border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5eead4]">
                REFERENCE SLOT STATUS · {REGISTRATION_STRATEGY.toUpperCase()}
              </span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-white">
                Completed – 100 / Pending – 400
              </h2>
            </div>
            {liveCount !== null && (
              <div className="px-4 py-2 rounded-lg border border-white/15 bg-white/5 text-xs text-[#cbd5e1]">
                Live database submissions:{' '}
                <strong className="text-[#e6c67e] font-mono tabular-nums">{liveCount}</strong>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/12 border border-white/12 rounded-xl bg-white/5">
            <div className="p-5 text-center">
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#5eead4] tabular-nums">
                100
              </div>
              <div className="mt-1 text-xs text-[#cbd5e1]">Completed (Reference)</div>
            </div>
            <div className="p-5 text-center">
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#93c5fd] tabular-nums">
                400
              </div>
              <div className="mt-1 text-xs text-[#cbd5e1]">Pending (Reference)</div>
            </div>
            <div className="p-5 text-center">
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#e6c67e] tabular-nums">
                500
              </div>
              <div className="mt-1 text-xs text-[#cbd5e1]">Target Participants · {REGISTRATION_STRATEGY}</div>
            </div>
          </div>

          <p className="text-xs text-[#94a3b8]">
            Strategy: <strong>{REGISTRATION_STRATEGY}</strong>. Live records and outbound notifications are tracked in the{' '}
            <Link href="/admin/registrations" className="text-[#e6c67e] underline">
              Registration Dashboard
            </Link>
            .
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.slug}
              type="button"
              onClick={() => {
                setActiveSlug(tab.slug);
                setSubmittedRecord(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeSlug === tab.slug
                  ? 'bg-[#091326] text-[#e6c67e]'
                  : 'bg-white border border-[#e4dfd5] text-[#334155] hover:border-[#1d4ed8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {submittedRecord ? (
          <div role="status" className="rounded-2xl border border-emerald-700/25 bg-white p-8 space-y-5 shadow-sm">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-700 shrink-0" />
              <div className="space-y-2">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">
                  Registration Recorded · {submittedRecord.id}
                </p>
                <h2 className="mt-1 font-display text-3xl font-semibold text-[#0f172a]">
                  {submittedRecord.company}
                </h2>
                <p className="text-sm text-[#334155]">
                  Submitted under <strong>{submittedRecord.track}</strong> ({submittedRecord.participantType})
                  for {formatLakhsToDisplay(submittedRecord.funding_lakhs)}.
                </p>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 px-4 py-2 text-xs text-emerald-950 font-mono">
                  Organiser Alert ({submittedNotification?.id || 'Outbox'}): Routed to{' '}
                  <strong>{ORGANISER_NOTIFICATION_EMAIL}</strong>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  downloadDraft(submittedRecord, `${submittedRecord.id.toLowerCase()}.json`)
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#cfc8b8] hover:border-[#1d4ed8] text-xs font-semibold text-[#0f172a] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download registration receipt</span>
              </button>
              <Link
                href="/admin/registrations"
                className="btn-obsidian inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold"
              >
                <span>Open Registration Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={clearForm}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-[#526075] hover:text-[#0f172a] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Register another</span>
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-[#e4dfd5] bg-white p-6 sm:p-8 space-y-6 shadow-sm"
          >
            <div className="space-y-3 pb-4 border-b border-[#e4dfd5]">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h2 className="font-display text-3xl font-semibold text-[#0f172a]">{activeTab.heading}</h2>
                  <p className="mt-1 text-sm text-[#526075]">{activeTab.lead}</p>
                </div>
                <span className="font-mono text-xs font-semibold text-[#1d4ed8] tabular-nums">
                  {requiredCompleted} / 12 required ({requiredPct}%)
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#e2e8f0] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#1d4ed8] via-[#4338ca] to-[#0d9488] transition-all duration-300"
                  style={{ width: `${requiredPct}%` }}
                />
              </div>
            </div>

            {serverError && (
              <div role="alert" className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900">
                {serverError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="reg-fullname" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Full name / authorised representative *
                </label>
                <input
                  id="reg-fullname"
                  type="text"
                  value={form.full_name}
                  onChange={(e) => handleField('full_name', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8]"
                />
                {errors.full_name && <p className="mt-1 text-xs text-red-700">{errors.full_name}</p>}
              </div>

              <div>
                <label htmlFor="reg-company" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  {activeTab.entityLabel}
                </label>
                <input
                  id="reg-company"
                  type="text"
                  value={form.company}
                  onChange={(e) => handleField('company', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8]"
                />
                {errors.company && <p className="mt-1 text-xs text-red-700">{errors.company}</p>}
              </div>

              <div>
                <label htmlFor="reg-email" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Email *
                </label>
                <input
                  id="reg-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleField('email', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8]"
                />
                {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="reg-phone" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Mobile number *
                </label>
                <input
                  id="reg-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleField('phone', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8]"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-700">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="reg-sector" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Business sector *
                </label>
                <input
                  id="reg-sector"
                  type="text"
                  placeholder="For example: manufacturing, healthcare or technology"
                  value={form.sector}
                  onChange={(e) => handleField('sector', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8]"
                />
                {errors.sector && <p className="mt-1 text-xs text-red-700">{errors.sector}</p>}
              </div>

              <div>
                <label htmlFor="reg-location" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  City / location *
                </label>
                <input
                  id="reg-location"
                  type="text"
                  value={form.location}
                  onChange={(e) => handleField('location', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8]"
                />
                {errors.location && <p className="mt-1 text-xs text-red-700">{errors.location}</p>}
              </div>

              <div>
                <label htmlFor="reg-stage" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Business stage *
                </label>
                <select
                  id="reg-stage"
                  value={form.stage}
                  onChange={(e) => handleField('stage', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] text-sm bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8]"
                >
                  <option value="">Select stage</option>
                  <option value="Idea">Idea</option>
                  <option value="Prototype">Prototype</option>
                  <option value="Early revenue">Early revenue</option>
                  <option value="Growth">Growth</option>
                  <option value="Established">Established</option>
                </select>
                {errors.stage && <p className="mt-1 text-xs text-red-700">{errors.stage}</p>}
              </div>

              <div>
                <label htmlFor="reg-founder" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Founder / team background *
                </label>
                <input
                  id="reg-founder"
                  type="text"
                  value={form.founder_background}
                  onChange={(e) => handleField('founder_background', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8]"
                />
                {errors.founder_background && (
                  <p className="mt-1 text-xs text-red-700">{errors.founder_background}</p>
                )}
              </div>

              <div>
                <label htmlFor="reg-funding" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Funding requirement (₹ Lakhs, 50–50,000) *
                </label>
                <input
                  id="reg-funding"
                  type="number"
                  min={50}
                  max={50000}
                  value={form.funding_lakhs}
                  onChange={(e) => handleField('funding_lakhs', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8]"
                />
                {errors.funding_lakhs && (
                  <p className="mt-1 text-xs text-red-700">{errors.funding_lakhs}</p>
                )}
              </div>

              <div>
                <label htmlFor="reg-purpose" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Funding purpose *
                </label>
                <input
                  id="reg-purpose"
                  type="text"
                  value={form.funding_purpose}
                  onChange={(e) => handleField('funding_purpose', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8]"
                />
                {errors.funding_purpose && (
                  <p className="mt-1 text-xs text-red-700">{errors.funding_purpose}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="reg-summary" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                Business description and participation goals *
              </label>
              <textarea
                id="reg-summary"
                rows={4}
                value={form.business_summary}
                onChange={(e) => handleField('business_summary', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8]"
              />
              {errors.business_summary && (
                <p className="mt-1 text-xs text-red-700">{errors.business_summary}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="reg-website" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Website / business profile URL <span className="font-normal text-[#526075]">optional</span>
                </label>
                <input
                  id="reg-website"
                  type="url"
                  placeholder="https://"
                  value={form.website}
                  onChange={(e) => handleField('website', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8]"
                />
                {errors.website && <p className="mt-1 text-xs text-red-700">{errors.website}</p>}
              </div>

              <div>
                <label htmlFor="reg-checklist" className="block text-xs font-semibold text-[#0f172a] mb-1.5">
                  Proposal / document checklist{' '}
                  <span className="font-normal text-[#526075]">optional; no uploads</span>
                </label>
                <input
                  id="reg-checklist"
                  type="text"
                  placeholder="Pitch deck, financial plan, company profile"
                  value={form.document_checklist}
                  onChange={(e) => handleField('document_checklist', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#f8fafc] text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]/20 focus:border-[#1d4ed8]"
                />
              </div>
            </div>

            <div>
              <label className="inline-flex items-start gap-2.5 cursor-pointer text-xs text-[#334155]">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => handleField('consent', e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#1d4ed8]"
                />
                <span>
                  I have read the draft terms and privacy notice. I understand participation is
                  subject to committee validation and does not guarantee funding. *
                </span>
              </label>
              {errors.consent && <p className="mt-1 text-xs text-red-700">{errors.consent}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="btn-obsidian inline-flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-semibold cursor-pointer"
              >
                <span>{submitting ? 'Submitting…' : 'Submit registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const payload: CategoryRegistrationInput = { categorySlug: activeSlug, ...form };
                  const check = validateCategoryRegistrationInput(payload);
                  if (!check.valid) {
                    setErrors(check.errors);
                    return;
                  }
                  downloadDraft(payload, `investor-meet-500-${activeSlug}-draft.json`);
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#cfc8b8] hover:border-[#1d4ed8] text-xs font-semibold text-[#0f172a] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download registration draft</span>
              </button>

              <button
                type="button"
                onClick={clearForm}
                className="px-4 py-3 text-xs font-medium text-[#526075] hover:text-[#0f172a] cursor-pointer"
              >
                Clear form
              </button>
            </div>
          </form>
        )}

        <div className="rounded-2xl border border-[#e4dfd5] bg-white overflow-hidden shadow-xs">
          <div className="h-1 w-full bg-[#0d9488]" aria-hidden="true" />
          <div className="p-6 sm:p-8 space-y-2">
            <h2 className="font-display text-2xl font-semibold text-[#0f172a]">
              Verification before meetings
            </h2>
            <p className="text-sm text-[#334155] leading-relaxed">
              Every submitted profile goes through the Validation Team &amp; Committee review covering
              company background, project readiness, previous projects, success stories, and risk
              level before hall and pitch-slot allocation.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
