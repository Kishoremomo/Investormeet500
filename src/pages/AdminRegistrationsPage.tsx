import React, { useCallback, useEffect, useState } from 'react';
import {
  Check,
  Download,
  Eye,
  Lock,
  RotateCcw,
  Search,
  ShieldCheck,
  Trash2,
  Unlock,
  X,
} from 'lucide-react';
import {
  ALL_REGISTRATION_CATEGORIES,
  computeCategorySlices,
  computeParticipantTypeComparison,
  computePaymentStatusBreakdown,
  computeRegistrationStats,
  computeRegistrationTrend,
  computeTrackBreakdown,
  computeValidationStatusBreakdown,
  formatLakhsToDisplay,
  registrationsToCsv,
  type PaymentStatus,
  type RegistrationRecord,
  type RegistrationStats,
  type RegistrationTargets,
  type ValidationStatus,
} from '../lib/domain';
import { resolvePortraitUrl } from '../data/portraits';
import { Link } from '../lib/router';
import { AvatarPortrait } from '../components/AvatarPortrait';
import { CtaBanner } from '../components/CtaBanner';
import {
  CategoryDoughnutChart,
  RegistrationTrendLineChart,
  TrackComparisonBarChart,
  ValidationPieChart,
} from '../components/DashboardCharts';
import { AnimatedCounter, InteractiveCard } from '../components/MotionPrimitives';
import { PageHero } from '../components/PageHero';
import { ParticipantDossierModal } from '../components/ProfileModal';

export function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [allCount, setAllCount] = useState<number>(0);
  const [stats, setStats] = useState<RegistrationStats | null>(null);
  const [targets, setTargets] = useState<RegistrationTargets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');
  const [validationStatus, setValidationStatus] = useState('All statuses');
  const [paymentStatus, setPaymentStatus] = useState('All payments');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Selected record & reviewer controls
  const [selectedId, setSelectedId] = useState<string>('');
  const [dossierRecord, setDossierRecord] = useState<RegistrationRecord | null>(null);
  const [reviewerInput, setReviewerInput] = useState('');
  const [hallInput, setHallInput] = useState('Hall 1');
  const [paymentInput, setPaymentInput] = useState<PaymentStatus>('Pending');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Editable targets state
  const [savingTargets, setSavingTargets] = useState(false);

  // Organiser access lock state (defaults to unlocked demo organiser session for immediate testing, toggleable)
  const [organiserUnlocked, setOrganiserUnlocked] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('query', query.trim());
      if (category !== 'All categories') params.set('category', category);
      if (validationStatus !== 'All statuses') params.set('validationStatus', validationStatus);
      if (paymentStatus !== 'All payments') params.set('paymentStatus', paymentStatus);
      if (dateFrom) params.set('dateFrom', dateFrom);
      if (dateTo) params.set('dateTo', dateTo);

      const res = await fetch(`/api/registrations?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to load registrations');
      const data = await res.json();
      setRegistrations(data.registrations || []);
      setAllCount(typeof data.allCount === 'number' ? data.allCount : (data.registrations || []).length);
      setStats(data.stats || null);
      setTargets(data.targets || null);

      if (data.registrations?.length > 0) {
        setSelectedId((prev) =>
          data.registrations.some((r: RegistrationRecord) => r.id === prev)
            ? prev
            : data.registrations[0].id
        );
      } else {
        setSelectedId('');
      }
    } catch {
      setError('Unable to load live registration records.');
    } finally {
      setLoading(false);
    }
  }, [query, category, validationStatus, paymentStatus, dateFrom, dateTo]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const selectedRecord = registrations.find((r) => r.id === selectedId) || null;

  useEffect(() => {
    if (selectedRecord) {
      setReviewerInput(
        selectedRecord.assignedReviewer === 'Unassigned' ? '' : selectedRecord.assignedReviewer
      );
      setHallInput(
        selectedRecord.pitchHall === 'Unassigned' ? 'Hall 1' : selectedRecord.pitchHall
      );
      setPaymentInput(selectedRecord.paymentStatus);
    }
  }, [selectedRecord]);

  const updateRecord = async (
    id: string,
    patch: Partial<{
      validationStatus: ValidationStatus;
      paymentStatus: PaymentStatus;
      assignedReviewer: string;
      pitchHall: string;
    }>,
    feedbackLabel: string
  ) => {
    if (!organiserUnlocked) return;
    try {
      const res = await fetch(`/api/registrations/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error('Update failed');
      setActionMessage(`${id}: ${feedbackLabel}`);
      await loadData();
    } catch {
      setError('Failed to update registration record.');
    }
  };

  const deleteRecord = async (id: string) => {
    if (!organiserUnlocked) return;
    try {
      const res = await fetch(`/api/registrations/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      setActionMessage(`Removed record ${id}`);
      await loadData();
    } catch {
      setError('Failed to remove record.');
    }
  };

  const saveTargets = async () => {
    if (!targets || !organiserUnlocked) return;
    setSavingTargets(true);
    try {
      const res = await fetch('/api/targets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targets),
      });
      if (!res.ok) throw new Error('Failed to save targets');
      setActionMessage('Participant target allocations updated.');
      await loadData();
    } catch {
      setError('Unable to save target settings.');
    } finally {
      setSavingTargets(false);
    }
  };

  const handleExportCsv = () => {
    const csv = registrationsToCsv(registrations);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `investor-meet-500-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setQuery('');
    setCategory('All categories');
    setValidationStatus('All statuses');
    setPaymentStatus('All payments');
    setDateFrom('');
    setDateTo('');
  };

  const statusBadgeClass = (status: ValidationStatus) => {
    switch (status) {
      case 'Approved':
        return 'bg-teal-50 text-teal-900 border-teal-200';
      case 'Under review':
        return 'bg-blue-50 text-blue-900 border-blue-200';
      case 'Rejected':
        return 'bg-red-50 text-red-900 border-red-200';
      default:
        return 'bg-[#f5f3ee] text-[#334155] border-[#e4dfd5]';
    }
  };

  const hasActiveFilters =
    Boolean(query.trim()) ||
    category !== 'All categories' ||
    validationStatus !== 'All statuses' ||
    paymentStatus !== 'All payments' ||
    Boolean(dateFrom) ||
    Boolean(dateTo);

  const liveFilteredStats =
    targets !== null
      ? computeRegistrationStats(registrations, targets)
      : stats;

  const trackBreakdown =
    liveFilteredStats && targets
      ? computeTrackBreakdown(liveFilteredStats, targets)
      : [];

  const categorySlices = computeCategorySlices(registrations);
  const validationSlices = computeValidationStatusBreakdown(registrations);
  const paymentSlices = computePaymentStatusBreakdown(registrations);
  const participantComparison = targets
    ? computeParticipantTypeComparison(registrations, targets)
    : [];
  const registrationTrend = computeRegistrationTrend(registrations);

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="OPERATIONS CONSOLE"
        title="Registration Dashboard"
        subtitle="Operations console for tracking live applications, interactive track analytics, committee validation statuses, reviewer assignments, and participant targets."
        stats={
          stats && targets
            ? [
                { value: String(stats.total), label: 'Registered' },
                { value: String(targets.totalTarget), label: 'Target Cap' },
                { value: `${stats.completionPct}%`, label: 'Progress' },
              ]
            : undefined
        }
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Operations Nav + Access Control */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-lg border border-[#e4dfd5] bg-white text-xs font-mono uppercase tracking-wider text-[#526075]">
              Operations
            </span>
            <Link
              href="/calendar-plan"
              className="px-4 py-1.5 rounded-lg border border-[#e4dfd5] bg-white hover:border-[#1d4ed8] text-xs font-medium text-[#0f172a] transition-colors"
            >
              Calendar plan
            </Link>
            <span className="px-4 py-1.5 rounded-lg bg-[#091326] text-xs font-semibold text-[#e6c67e]">
              Registration dashboard
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOrganiserUnlocked((u) => !u)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
              organiserUnlocked
                ? 'border-teal-700/30 bg-teal-50 text-teal-900 hover:bg-teal-100/70'
                : 'border-amber-700/30 bg-amber-50 text-amber-900 hover:bg-amber-100/70'
            }`}
          >
            {organiserUnlocked ? (
              <>
                <Unlock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Organiser Controls Active</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Read-Only Preview (Unlock Actions)</span>
              </>
            )}
          </button>
        </div>

        {/* Initial Reference Figures */}
        <InteractiveCard
          dark
          tilt={false}
          className="rounded-2xl p-6 sm:p-8 space-y-5 !bg-gradient-to-br from-[#091326] via-[#0f1c3a] to-[#172554] border-white/15"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e6c67e]">
                REFERENCE FIGURES · NOT LIVE DATA
              </span>
              <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-medium text-white">
                Initial reference figures
              </h2>
            </div>
            <p className="text-xs text-[#cbd5e1] max-w-md">
              Organiser baseline reference figures. Live KPI cards and interactive visualizations below
              update dynamically from submitted records and active filters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/15 border border-white/15 rounded-xl bg-[#091326]/70">
            <div className="p-5 text-center">
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#14b8a6] tabular-nums">
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
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#93c5fd] tabular-nums">
                500
              </div>
              <div className="mt-1 text-xs text-[#cbd5e1]">Target participants</div>
            </div>
          </div>
        </InteractiveCard>

        {/* Live Database Operations KPIs & Interactive Charts */}
        {liveFilteredStats && (
          <div className="space-y-6">
            {/* Primary KPI Telemetry Bar */}
            <div className="bg-white rounded-2xl border border-[#e4dfd5] overflow-hidden">
              <div className="px-5 py-3 border-b border-[#e4dfd5] bg-[#f8fafc] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#1d4ed8]">
                    Live Database Telemetry
                  </span>
                  {hasActiveFilters && (
                    <span className="font-mono text-[11px] font-semibold text-[#6d28d9]">
                      · Filtered view ({registrations.length} of {allCount})
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-[11px] font-semibold text-[#1d4ed8] hover:underline cursor-pointer"
                    >
                      Reset active filters
                    </button>
                  )}
                  <span className="font-mono text-[11px] text-[#526075] tabular-nums">
                    Showing: {liveFilteredStats.total} records
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-[#e4dfd5]">
                {[
                  {
                    label: hasActiveFilters ? 'Matching Records' : 'Total Registrations',
                    value: liveFilteredStats.total,
                    accent: 'text-[#091326]',
                    bar: 'bg-[#1d4ed8]',
                  },
                  {
                    label: 'Approved',
                    value: liveFilteredStats.approved,
                    accent: 'text-[#0f766e]',
                    bar: 'bg-[#0d9488]',
                  },
                  {
                    label: 'Under Review',
                    value: liveFilteredStats.underReviewValidation,
                    accent: 'text-[#1d4ed8]',
                    bar: 'bg-[#2563eb]',
                  },
                  {
                    label: 'Pending Validation',
                    value: liveFilteredStats.pendingValidation,
                    accent: 'text-[#8a5d14]',
                    bar: 'bg-[#c49a45]',
                  },
                  {
                    label: 'Rejected',
                    value: liveFilteredStats.rejected,
                    accent: 'text-red-700',
                    bar: 'bg-red-600',
                  },
                  {
                    label: 'Confirmed Payments',
                    value: liveFilteredStats.confirmedPayments,
                    accent: 'text-[#6d28d9]',
                    bar: 'bg-[#6d28d9]',
                  },
                ].map((kpi) => (
                  <div key={kpi.label} className="p-4 flex flex-col justify-between relative">
                    <span className={`h-1 w-8 rounded-full mb-2 ${kpi.bar}`} aria-hidden="true" />
                    <span className="text-[11px] font-medium text-[#526075]">{kpi.label}</span>
                    <strong className={`mt-1 font-mono text-2xl font-bold tabular-nums ${kpi.accent}`}>
                      <AnimatedCounter value={kpi.value} durationMs={550} />
                    </strong>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Chart Interactive Visualization Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CategoryDoughnutChart
                slices={categorySlices}
                activeCategory={category}
                onSelectCategory={(nextCat) => setCategory(nextCat)}
              />
              <ValidationPieChart
                validationSlices={validationSlices}
                paymentSlices={paymentSlices}
                activeStatus={validationStatus}
                onSelectStatus={(nextStatus) => setValidationStatus(nextStatus)}
              />
              <TrackComparisonBarChart
                trackRows={trackBreakdown}
                participantRows={participantComparison}
                activeCategory={category}
                onSelectCategory={(nextCat) => setCategory(nextCat)}
              />
              <RegistrationTrendLineChart points={registrationTrend} />
            </div>

            {/* Category & Role Sub-Strip */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-8 bg-white rounded-2xl border border-[#e4dfd5] grid grid-cols-2 sm:grid-cols-3 divide-y sm:divide-x divide-[#e4dfd5] overflow-hidden">
                {[
                  { label: 'Startup Registrations', value: liveFilteredStats.byCategory['Startups'] ?? 0 },
                  { label: 'Bank Loan Registrations', value: liveFilteredStats.byCategory['Bank Loan'] ?? 0 },
                  { label: 'Business Loan Registrations', value: liveFilteredStats.byCategory['Business Loan'] ?? 0 },
                  { label: 'Business Expansion Registrations', value: liveFilteredStats.byCategory['Business Expansion'] ?? 0 },
                  { label: 'International Opportunity', value: liveFilteredStats.byCategory['International Opportunity'] ?? 0 },
                  { label: 'Other Investment Tracks', value: liveFilteredStats.byCategory['Other Investment Tracks'] ?? 0 },
                ].map((kpi) => (
                  <div key={kpi.label} className="p-4 flex flex-col justify-between">
                    <span className="text-[11px] font-medium text-[#526075]">{kpi.label}</span>
                    <strong className="mt-1 font-mono text-xl font-semibold text-[#091326] tabular-nums">
                      <AnimatedCounter value={kpi.value} durationMs={500} />
                    </strong>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-4 bg-white rounded-2xl border border-[#e4dfd5] grid grid-cols-3 divide-x divide-[#e4dfd5] overflow-hidden">
                {[
                  { label: 'Entrepreneurs', value: liveFilteredStats.byParticipantType.Entrepreneur },
                  { label: 'Investors', value: liveFilteredStats.byParticipantType.Investor },
                  { label: 'Exhibitors', value: liveFilteredStats.byParticipantType.Exhibitor },
                ].map((kpi) => (
                  <div key={kpi.label} className="p-4 flex flex-col justify-between">
                    <span className="text-[11px] font-medium text-[#526075] leading-snug">
                      {kpi.label}
                    </span>
                    <strong className="mt-2 font-mono text-xl font-semibold text-[#1d4ed8] tabular-nums">
                      <AnimatedCounter value={kpi.value} durationMs={500} />
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Participant Target & Editable Category Targets */}
        {stats && targets && (
          <div className="rounded-2xl border border-[#e4dfd5] bg-white p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e4dfd5] pb-5">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#0f172a]">
                  Participant target allocations
                </h2>
                <p className="text-xs text-[#526075] mt-1">
                  Organiser capacity configuration vs. overall database intake ({allCount} total
                  submissions).
                </p>
              </div>
              <div className="flex flex-wrap items-center divide-x divide-[#e4dfd5] border border-[#e4dfd5] rounded-xl bg-[#fafaf8] text-sm">
                <div className="px-4 py-2">
                  <span className="block text-[10px] font-mono uppercase text-[#526075]">Target</span>
                  <strong className="font-mono font-semibold text-[#091326] tabular-nums">
                    {targets.totalTarget}
                  </strong>
                </div>
                <div className="px-4 py-2">
                  <span className="block text-[10px] font-mono uppercase text-[#526075]">Total Intake</span>
                  <strong className="font-mono font-semibold text-[#1d4ed8] tabular-nums">
                    {stats.total}
                  </strong>
                </div>
                <div className="px-4 py-2">
                  <span className="block text-[10px] font-mono uppercase text-[#526075]">Remaining</span>
                  <strong className="font-mono font-semibold text-[#0f172a] tabular-nums">
                    {stats.remainingToTarget}
                  </strong>
                </div>
                <div className="px-4 py-2">
                  <span className="block text-[10px] font-mono uppercase text-[#526075]">Completion</span>
                  <strong className="font-mono font-semibold text-[#0d9488] tabular-nums">
                    {stats.completionPct}%
                  </strong>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="font-display text-xl font-semibold text-[#0f172a]">
                  Category targets
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ALL_REGISTRATION_CATEGORIES.map((cat) => (
                    <label key={cat} className="block text-xs text-[#334155]">
                      <span className="font-medium block mb-1">{cat}</span>
                      <input
                        type="number"
                        min={0}
                        disabled={!organiserUnlocked}
                        value={targets.byCategory[cat] ?? 0}
                        onChange={(e) =>
                          setTargets({
                            ...targets,
                            byCategory: {
                              ...targets.byCategory,
                              [cat]: Number(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-[#d6cfc2] bg-[#fafaf8] text-sm font-mono tabular-nums focus:outline-none focus:border-[#0c121d] disabled:opacity-60"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-xl font-semibold text-[#0f172a]">
                  Participant-type targets
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['Exhibitor', 'Investor', 'Entrepreneur'] as const).map((pt) => (
                    <label key={pt} className="block text-xs text-[#334155]">
                      <span className="font-medium block mb-1">{pt}</span>
                      <input
                        type="number"
                        min={0}
                        disabled={!organiserUnlocked}
                        value={targets.byParticipantType[pt] ?? 0}
                        onChange={(e) =>
                          setTargets({
                            ...targets,
                            byParticipantType: {
                              ...targets.byParticipantType,
                              [pt]: Number(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-[#d6cfc2] bg-[#fafaf8] text-sm font-mono tabular-nums focus:outline-none focus:border-[#0c121d] disabled:opacity-60"
                      />
                    </label>
                  ))}
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    disabled={!organiserUnlocked || savingTargets}
                    onClick={saveTargets}
                    className="btn-obsidian px-5 py-2.5 rounded-lg text-xs font-semibold disabled:opacity-50 cursor-pointer"
                  >
                    {savingTargets ? 'Saving…' : 'Save target allocations'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registrations Table & Filters */}
        <div className="rounded-2xl border border-[#e4dfd5] bg-white p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-medium text-[#0f172a]">Registrations</h2>
              <p className="text-xs text-[#526075] mt-0.5">
                Showing {registrations.length} matching records · Click any participant to inspect
                full dossier
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#e4dfd5] hover:border-[#0c121d] text-xs font-medium text-[#334155] cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Clear filters</span>
              </button>
              <button
                type="button"
                onClick={handleExportCsv}
                disabled={registrations.length === 0}
                className="btn-obsidian inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold disabled:opacity-50 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <div className="lg:col-span-2">
              <label htmlFor="admin-search" className="block text-[11px] font-semibold text-[#526075] mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#7c7566] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                <input
                  id="admin-search"
                  type="search"
                  placeholder="Name, company or ID"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-lg border border-[#d6cfc2] bg-[#fafaf8] text-xs focus:outline-none focus:border-[#0c121d]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-cat" className="block text-[11px] font-semibold text-[#526075] mb-1">
                Category
              </label>
              <select
                id="admin-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#d6cfc2] text-xs bg-[#fafaf8] focus:outline-none focus:border-[#0c121d]"
              >
                <option value="All categories">All categories</option>
                {ALL_REGISTRATION_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="admin-val" className="block text-[11px] font-semibold text-[#526075] mb-1">
                Validation
              </label>
              <select
                id="admin-val"
                value={validationStatus}
                onChange={(e) => setValidationStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#d6cfc2] text-xs bg-[#fafaf8] focus:outline-none focus:border-[#0c121d]"
              >
                <option value="All statuses">All statuses</option>
                <option value="Pending">Pending</option>
                <option value="Under review">Under review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label htmlFor="admin-pay" className="block text-[11px] font-semibold text-[#526075] mb-1">
                Payment
              </label>
              <select
                id="admin-pay"
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#d6cfc2] text-xs bg-[#fafaf8] focus:outline-none focus:border-[#0c121d]"
              >
                <option value="All payments">All payments</option>
                <option value="Not requested">Not requested</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="admin-from" className="block text-[11px] font-semibold text-[#526075] mb-1">
                  From
                </label>
                <input
                  id="admin-from"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-2 py-2 rounded-lg border border-[#d6cfc2] bg-[#fafaf8] text-[11px] focus:outline-none focus:border-[#0c121d]"
                />
              </div>
              <div>
                <label htmlFor="admin-to" className="block text-[11px] font-semibold text-[#526075] mb-1">
                  To
                </label>
                <input
                  id="admin-to"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-2 py-2 rounded-lg border border-[#d6cfc2] bg-[#fafaf8] text-[11px] focus:outline-none focus:border-[#0c121d]"
                />
              </div>
            </div>
          </div>

          {error && (
            <div role="alert" className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-xs text-red-900">
              {error}
            </div>
          )}

          {actionMessage && (
            <div role="status" className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-xs text-emerald-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                {actionMessage}
              </span>
              <button type="button" onClick={() => setActionMessage(null)} className="cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto border border-[#e4dfd5] rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f5f3ee] text-[#526075] border-b border-[#e4dfd5]">
                  <th className="py-3 pl-3 pr-2 font-semibold whitespace-nowrap">Ref ID</th>
                  <th className="py-3 px-2 font-semibold">Participant</th>
                  <th className="py-3 px-2 font-semibold">Company</th>
                  <th className="py-3 px-2 font-semibold">Track</th>
                  <th className="py-3 px-2 font-semibold text-right whitespace-nowrap">Requirement</th>
                  <th className="py-3 px-2 font-semibold">Validation</th>
                  <th className="py-3 px-2 font-semibold">Payment</th>
                  <th className="py-3 px-2 font-semibold">Reviewer / Hall</th>
                  <th className="py-3 pl-2 pr-3 font-semibold text-right whitespace-nowrap">Dossier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4dfd5]">
                {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={9} className="py-4 px-4">
                        <div className="h-4 bg-[#f0ede5] rounded w-full" />
                      </td>
                    </tr>
                  ))
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-10 text-center text-[#526075]">
                      No registration records matched the active filters.
                    </td>
                  </tr>
                ) : (
                  registrations.map((rec) => {
                    const isSelected = rec.id === selectedId;
                    const participantAvatar = resolvePortraitUrl(rec.full_name, rec.id);
                    const reviewerAvatar = resolvePortraitUrl(rec.assignedReviewer);
                    return (
                      <tr
                        key={rec.id}
                        onClick={() => setSelectedId(rec.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#fbf6ea]' : 'hover:bg-[#fafaf8]'
                        }`}
                      >
                        <td className="py-3 pl-3 pr-2 font-mono text-[11px] font-semibold text-[#0c121d] whitespace-nowrap">
                          {rec.id}
                        </td>
                        <td className="py-3 px-2 max-w-[160px]">
                          <div className="flex items-center gap-2 min-w-0">
                            <AvatarPortrait
                              name={rec.full_name}
                              src={participantAvatar}
                              size="xs"
                            />
                            <div className="min-w-0">
                              <div className="font-semibold text-[#0f172a] truncate">{rec.full_name}</div>
                              <div className="text-[11px] text-[#526075] truncate">{rec.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2 max-w-[145px]">
                          <div className="font-medium text-[#0f172a] truncate">{rec.company}</div>
                          <div className="text-[11px] text-[#526075] truncate">{rec.industry}</div>
                        </td>
                        <td className="py-3 px-2 whitespace-nowrap text-[11px]">
                          <div className="font-medium text-[#0f172a]">{rec.track}</div>
                          <div className="text-[11px] text-[#526075]">{rec.participantType}</div>
                        </td>
                        <td className="py-3 px-2 text-right font-mono tabular-nums whitespace-nowrap">
                          {formatLakhsToDisplay(rec.funding_lakhs)}
                        </td>
                        <td className="py-3 px-2 whitespace-nowrap">
                          <span
                            className={`inline-block px-2 py-0.5 rounded border text-[11px] font-medium ${statusBadgeClass(
                              rec.validationStatus
                            )}`}
                          >
                            {rec.validationStatus}
                          </span>
                        </td>
                        <td className="py-3 px-2 whitespace-nowrap text-[#334155]">
                          {rec.paymentStatus}
                        </td>
                        <td className="py-3 px-2 whitespace-nowrap">
                          <div className="flex items-center gap-2 min-w-0 max-w-[155px]">
                            {rec.assignedReviewer !== 'Unassigned' && (
                              <AvatarPortrait
                                name={rec.assignedReviewer}
                                src={reviewerAvatar}
                                size="xs"
                                className="w-6 h-6 text-[9px] shrink-0"
                              />
                            )}
                            <div className="min-w-0">
                              <div className="text-[#0f172a] truncate">{rec.assignedReviewer}</div>
                              <div className="text-[11px] text-[#526075] truncate">{rec.pitchHall}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pl-2 pr-3 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedId(rec.id);
                              setDossierRecord(rec);
                            }}
                            aria-label={`Inspect dossier for ${rec.full_name}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#d6cfc2] bg-white hover:border-[#0c121d] text-[11px] font-semibold text-[#0c121d] cursor-pointer"
                          >
                            <Eye className="w-3 h-3" aria-hidden="true" />
                            <span>Dossier</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Action Bar for Selected Record */}
          <div className="rounded-xl border border-[#e4dfd5] bg-[#fafaf8] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {selectedRecord && (
                  <AvatarPortrait
                    name={selectedRecord.full_name}
                    src={resolvePortraitUrl(selectedRecord.full_name, selectedRecord.id)}
                    size="sm"
                  />
                )}
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a5d14]">
                    Record review actions
                  </p>
                  <p className="text-sm font-semibold text-[#0f172a] mt-0.5">
                    {selectedRecord
                      ? `${selectedRecord.id} — ${selectedRecord.full_name} (${selectedRecord.company})`
                      : 'Select a registration row above'}
                  </p>
                </div>
              </div>
              {selectedRecord && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDossierRecord(selectedRecord)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#d6cfc2] bg-white hover:border-[#0c121d] text-xs font-semibold text-[#0f172a] cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Inspect Dossier</span>
                  </button>
                  <button
                    type="button"
                    disabled={!organiserUnlocked}
                    onClick={() =>
                      updateRecord(
                        selectedRecord.id,
                        { validationStatus: 'Approved' },
                        'Approved for pitch allocation'
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold disabled:opacity-40 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Approve</span>
                  </button>
                  <button
                    type="button"
                    disabled={!organiserUnlocked}
                    onClick={() =>
                      updateRecord(
                        selectedRecord.id,
                        { validationStatus: 'Under review' },
                        'Moved to Under review'
                      )
                    }
                    className="px-4 py-2 rounded-lg border border-[#d6cfc2] bg-white hover:border-[#0c121d] text-xs font-semibold text-[#0f172a] disabled:opacity-40 cursor-pointer"
                  >
                    Under review
                  </button>
                  <button
                    type="button"
                    disabled={!organiserUnlocked}
                    onClick={() =>
                      updateRecord(
                        selectedRecord.id,
                        { validationStatus: 'Rejected' },
                        'Marked as Rejected'
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-semibold disabled:opacity-40 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Reject</span>
                  </button>
                  <button
                    type="button"
                    disabled={!organiserUnlocked}
                    onClick={() => deleteRecord(selectedRecord.id)}
                    aria-label={`Delete ${selectedRecord.id}`}
                    className="p-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-40 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>

            {selectedRecord && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-3 border-t border-[#e4dfd5]">
                <div>
                  <label htmlFor="assign-reviewer" className="block text-[11px] font-semibold text-[#526075] mb-1">
                    Assign reviewer
                  </label>
                  <input
                    id="assign-reviewer"
                    type="text"
                    placeholder="Authorised reviewer"
                    value={reviewerInput}
                    onChange={(e) => setReviewerInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#d6cfc2] bg-white text-xs focus:outline-none focus:border-[#0c121d]"
                  />
                </div>
                <div>
                  <label htmlFor="assign-hall" className="block text-[11px] font-semibold text-[#526075] mb-1">
                    Pitch hall
                  </label>
                  <select
                    id="assign-hall"
                    value={hallInput}
                    onChange={(e) => setHallInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#d6cfc2] bg-white text-xs focus:outline-none focus:border-[#0c121d]"
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Hall 1">Hall 1 (Startups &amp; AI)</option>
                    <option value="Hall 2">Hall 2 (Bank &amp; Business Loans)</option>
                    <option value="Hall 3">Hall 3 (Expansion &amp; International)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="assign-payment" className="block text-[11px] font-semibold text-[#526075] mb-1">
                    Payment status
                  </label>
                  <select
                    id="assign-payment"
                    value={paymentInput}
                    onChange={(e) => setPaymentInput(e.target.value as PaymentStatus)}
                    className="w-full px-3 py-2 rounded-lg border border-[#d6cfc2] bg-white text-xs focus:outline-none focus:border-[#0c121d]"
                  >
                    <option value="Not requested">Not requested</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    disabled={!organiserUnlocked}
                    onClick={() =>
                      updateRecord(
                        selectedRecord.id,
                        {
                          assignedReviewer: reviewerInput || 'Unassigned',
                          pitchHall: hallInput,
                          paymentStatus: paymentInput,
                        },
                        'Reviewer, hall and payment updated'
                      )
                    }
                    className="btn-obsidian w-full px-4 py-2 rounded-lg text-xs font-semibold disabled:opacity-40 cursor-pointer"
                  >
                    Assign reviewer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <ParticipantDossierModal
        record={dossierRecord}
        onClose={() => setDossierRecord(null)}
        canReview={organiserUnlocked}
        onQuickReview={updateRecord}
      />

      <CtaBanner />
    </div>
  );
}
