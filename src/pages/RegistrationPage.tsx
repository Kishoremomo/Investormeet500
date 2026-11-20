import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Download, RotateCcw } from 'lucide-react';
import {
  formatLakhsToDisplay,
  validateCategoryRegistrationInput,
  type CategoryRegistrationInput,
  type RegistrationRecord,
} from '../lib/domain';
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
  };

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="CATEGORY REGISTRATION"
        title="Registration & Participation"
        subtitle="Choose the participant category that matches your goals. Prepare relevant details before the verification process."
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="rounded-xl border border-[#e4dfd5] bg-white p-5 space-y-1.5 text-xs sm:text-sm text-[#334155]">
          <p>
            <strong className="text-[#0f172a]">Registration intake active.</strong> Submissions are
            recorded directly in the event database with an immediate reference ID, and you may
            also download your local draft as JSON.
          </p>
          <p className="text-xs text-[#526075]">
            Organiser notification inbox: <strong>sevenidatamanager@gmail.com</strong> · Cutoff:{' '}
            <strong>1 February 2027</strong>
          </p>
        </div>

        {/* Initial Reference Figures (Single Elevation Split) */}
        <div className="rounded-2xl bg-[#0c121d] text-[#f8f7f3] p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e6c67e]">
                REFERENCE FIGURES · NOT LIVE DATA
              </span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-white">
                Initial Reference Figures
              </h2>
            </div>
            {liveCount !== null && (
              <div className="px-4 py-2 rounded-lg border border-white/15 bg-[#131c2b] text-xs text-[#cbd5e1]">
                Live database submissions:{' '}
                <strong className="text-[#e6c67e] font-mono tabular-nums">{liveCount}</strong>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/12 border border-white/12 rounded-xl bg-[#131c2b]">
            <div className="p-5 text-center">
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#e6c67e] tabular-nums">
                100
              </div>
              <div className="mt-1 text-xs text-[#cbd5e1]">Completed (reference)</div>
            </div>
            <div className="p-5 text-center">
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#e6c67e] tabular-nums">
                400
              </div>
              <div className="mt-1 text-xs text-[#cbd5e1]">Pending (reference)</div>
            </div>
            <div className="p-5 text-center">
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#e6c67e] tabular-nums">
                500
              </div>
              <div className="mt-1 text-xs text-[#cbd5e1]">Target participants</div>
            </div>
          </div>

          <p className="text-xs text-[#94a3b8]">
            These baseline figures were supplied as a starting reference. Live records are tracked
            in the{' '}
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
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeSlug === tab.slug
                  ? 'bg-[#0c121d] text-[#e6c67e]'
                  : 'bg-white border border-[#e4dfd5] text-[#334155] hover:border-[#0c121d]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {submittedRecord ? (
          <div role="status" className="rounded-2xl border border-emerald-700/25 bg-white p-8 space-y-5">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-700 shrink-0" />
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">
                  Registration Recorded · {submittedRecord.id}
                </p>
                <h2 className="mt-1 font-display text-3xl font-semibold text-[#0f172a]">
                  {submittedRecord.company}
                </h2>
                <p className="mt-2 text-sm text-[#334155]">
                  Submitted under <strong>{submittedRecord.track}</strong> ({submittedRecord.participantType})
                  for {formatLakhsToDisplay(submittedRecord.funding_lakhs)}.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  downloadDraft(submittedRecord, `${submittedRecord.id.toLowerCase()}.json`)
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#cfc8b8] text-xs font-semibold text-[#0f172a] cursor-pointer"
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
            className="rounded-2xl border border-[#e4dfd5] bg-white p-6 sm:p-8 space-y-6"
          >
            <div>
              <h2 className="font-display text-3xl font-semibold text-[#0f172a]">{activeTab.heading}</h2>
              <p className="mt-1 text-sm text-[#526075]">{activeTab.lead}</p>
              <p className="mt-1 text-xs text-[#8a5d14]">Fields marked * are required.</p>
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] text-sm bg-[#fafaf8]"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm tabular-nums"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm"
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
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm"
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cfc8b8] bg-[#fafaf8] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="inline-flex items-start gap-2.5 cursor-pointer text-xs text-[#334155]">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => handleField('consent', e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#0c121d]"
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
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#cfc8b8] text-xs font-semibold text-[#0f172a] cursor-pointer"
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

        <div className="rounded-2xl border border-[#e4dfd5] bg-white p-6 sm:p-8 space-y-2">
          <h2 className="font-display text-2xl font-semibold text-[#0f172a]">
            Verification before meetings
          </h2>
          <p className="text-sm text-[#334155] leading-relaxed">
            Every submitted profile goes through the Validation Team &amp; Committee review covering
            company background, project readiness, previous projects, success stories, and risk
            level before hall and pitch-slot allocation.
          </p>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
