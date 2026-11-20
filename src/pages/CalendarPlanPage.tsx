import React, { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { CalendarTask } from '../lib/domain';
import { Link } from '../lib/router';
import { CtaBanner } from '../components/CtaBanner';
import { InteractiveCard } from '../components/MotionPrimitives';
import { PageHero } from '../components/PageHero';

const CATEGORIES: CalendarTask['category'][] = [
  'Finance & Revenue',
  'Registrations',
  'Team & Planning',
  'Government & Committees',
  'Programs & Events',
  'Marketing & Media',
];

const STATUS_FILTERS: Array<'All' | CalendarTask['status']> = [
  'All',
  'Completed',
  'In progress',
  'Not started',
];

export function CalendarPlanPage() {
  const [tasks, setTasks] = useState<CalendarTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | CalendarTask['status']>('All');
  const [query, setQuery] = useState('');
  const [startMonth, setStartMonth] = useState('2026-10');
  const [endMonth, setEndMonth] = useState('2027-02');
  const [inspectTask, setInspectTask] = useState<CalendarTask | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/calendar-tasks')
      .then((r) => r.json())
      .then((d) => setTasks(d.tasks || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      if (activeCategory !== 'All' && t.category !== activeCategory) return false;
      if (statusFilter !== 'All' && t.status !== statusFilter) return false;
      const month = t.targetDate.slice(0, 7);
      if (startMonth && month < startMonth) return false;
      if (endMonth && month > endMonth) return false;
      if (q) {
        const hay = `${t.number} ${t.title} ${t.description} ${t.assignedTo}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [tasks, activeCategory, statusFilter, query, startMonth, endMonth]);

  const overallCompletion = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round(tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length);
  }, [tasks]);

  const statusCounts = useMemo(
    () => ({
      Completed: tasks.filter((t) => t.status === 'Completed').length,
      'In progress': tasks.filter((t) => t.status === 'In progress').length,
      'Not started': tasks.filter((t) => t.status === 'Not started').length,
    }),
    [tasks]
  );

  const groupedTasks = useMemo(() => {
    const groups: Record<string, CalendarTask[]> = {};
    for (const cat of CATEGORIES) {
      const items = filteredTasks.filter((t) => t.category === cat);
      if (items.length > 0) groups[cat] = items;
    }
    return groups;
  }, [filteredTasks]);

  const saveTaskUpdate = async () => {
    if (!inspectTask) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/calendar-tasks/${encodeURIComponent(inspectTask.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inspectTask),
      });
      if (res.ok) {
        const data = await res.json();
        setTasks((prev) => prev.map((t) => (t.id === data.task.id ? data.task : t)));
        setInspectTask(null);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#fafaf8] text-[#0f172a]">
      <PageHero
        kicker="SUMMIT EXECUTION ROADMAP"
        title="Calendar Plan"
        subtitle="39 operational planning tasks across six streams leading up to 20 February 2027."
        stats={[
          { value: `${overallCompletion}%`, label: 'Overall Progress' },
          { value: String(tasks.length || 39), label: 'Tasks' },
          { value: '6', label: 'Streams' },
        ]}
      />

      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-lg border border-[#e4dfd5] bg-white text-xs font-mono uppercase tracking-wider text-[#526075]">
            Operations
          </span>
          <span className="px-4 py-1.5 rounded-lg bg-[#0c121d] text-xs font-semibold text-[#e6c67e]">
            Calendar plan
          </span>
          <Link
            href="/admin/registrations"
            className="px-4 py-1.5 rounded-lg border border-[#e4dfd5] bg-white hover:border-[#0c121d] text-xs font-medium text-[#0f172a] transition-colors"
          >
            Registration dashboard
          </Link>
        </div>

        {/* Timeline & Progress Summary */}
        <div className="rounded-2xl border border-[#e4dfd5] bg-white p-6 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-wrap items-end gap-4">
              <label className="text-xs text-[#526075]">
                <span className="block mb-1 font-semibold text-[#0f172a]">Start month</span>
                <input
                  type="month"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-[#d6cfc2] bg-[#fafaf8] text-xs focus:outline-none focus:border-[#0c121d]"
                />
              </label>
              <label className="text-xs text-[#526075]">
                <span className="block mb-1 font-semibold text-[#0f172a]">End month</span>
                <input
                  type="month"
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-[#d6cfc2] bg-[#fafaf8] text-xs focus:outline-none focus:border-[#0c121d]"
                />
              </label>
              <div className="w-full sm:w-64">
                <label htmlFor="calendar-search" className="block text-xs font-semibold text-[#0f172a] mb-1">
                  Search tasks
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#526075] absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                  <input
                    id="calendar-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Title, stream or owner..."
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-[#d6cfc2] bg-[#fafaf8] text-xs focus:outline-none focus:border-[#0c121d]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center divide-x divide-[#e4dfd5] border border-[#e4dfd5] rounded-xl bg-[#fafaf8]">
              <div className="px-4 py-2.5 text-center">
                <div className="font-mono text-2xl font-bold text-[#0c121d] tabular-nums">
                  {overallCompletion}%
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#526075]">
                  Completion
                </div>
              </div>
              <div className="px-4 py-2.5 text-center">
                <div className="font-mono text-lg font-bold text-emerald-700 tabular-nums">
                  {statusCounts.Completed}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#526075]">
                  Done
                </div>
              </div>
              <div className="px-4 py-2.5 text-center">
                <div className="font-mono text-lg font-bold text-[#8a5d14] tabular-nums">
                  {statusCounts['In progress']}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#526075]">
                  Active
                </div>
              </div>
              <div className="px-4 py-2.5 text-center">
                <div className="font-mono text-lg font-bold text-[#526075] tabular-nums">
                  {statusCounts['Not started']}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#526075]">
                  Pending
                </div>
              </div>
            </div>
          </div>

          {/* Status Filter Strip */}
          <div className="pt-4 border-t border-[#e4dfd5] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  activeCategory === 'All'
                    ? 'bg-[#0c121d] text-[#e6c67e]'
                    : 'bg-[#fafaf8] border border-[#e4dfd5] text-[#334155] hover:border-[#0c121d]'
                }`}
              >
                All <span className="ml-1 font-mono">{tasks.length}</span>
              </button>
              {CATEGORIES.map((cat) => {
                const count = tasks.filter((t) => t.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      activeCategory === cat
                        ? 'bg-[#0c121d] text-[#e6c67e]'
                        : 'bg-[#fafaf8] border border-[#e4dfd5] text-[#334155] hover:border-[#0c121d]'
                    }`}
                  >
                    {cat} <span className="ml-1 font-mono">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {STATUS_FILTERS.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-md text-[11px] font-semibold cursor-pointer transition-colors ${
                    statusFilter === st
                      ? 'bg-[#8a5d14] text-white'
                      : 'bg-[#fafaf8] border border-[#e4dfd5] text-[#526075] hover:text-[#0f172a]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs font-mono text-[#526075]">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </p>

        {loading ? (
          <p className="text-sm text-[#526075]">Loading calendar plan…</p>
        ) : filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e4dfd5] p-10 text-center space-y-3">
            <p className="text-sm text-[#526075]">No operational tasks match the active filters.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setStatusFilter('All');
                setQuery('');
              }}
              className="text-xs font-semibold text-[#8a5d14] underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedTasks).map(([cat, items]) => {
              const avg = Math.round(
                items.reduce((sum, item) => sum + item.progress, 0) / items.length
              );
              return (
                <div key={cat} className="space-y-4">
                  <div className="flex items-baseline justify-between gap-4 border-b border-[#e4dfd5] pb-2">
                    <h2 className="font-display text-2xl font-medium text-[#0f172a]">{cat}</h2>
                    <span className="text-xs font-mono text-[#526075]">
                      {items.length} tasks · {avg}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((task) => (
                      <InteractiveCard
                        key={task.id}
                        as="article"
                        className="rounded-xl p-5 flex flex-col justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="font-mono font-semibold text-[#8a5d14]">
                              {task.number}
                            </span>
                            <span
                              className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${
                                task.status === 'Completed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : task.status === 'In progress'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-[#f5f3ee] text-[#334155] border-[#e4dfd5]'
                              }`}
                            >
                              {task.status}
                            </span>
                          </div>
                          <h3 className="mt-2 font-display text-xl font-medium text-[#0f172a]">
                            {task.title}
                          </h3>
                          <p className="mt-1 text-xs text-[#526075] leading-relaxed">
                            {task.description}
                          </p>
                        </div>

                        <div className="space-y-3 pt-2 border-t border-[#e4dfd5] text-[11px]">
                          <div className="h-1.5 rounded-full bg-[#e4dfd5] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#0c121d] transition-all duration-300"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <span className="block text-[#526075] uppercase">Progress</span>
                              <strong className="font-mono text-[#0f172a] tabular-nums">
                                {task.progress}%
                              </strong>
                            </div>
                            <div>
                              <span className="block text-[#526075] uppercase">Target</span>
                              <strong className="font-mono text-[#0f172a] tabular-nums">
                                {task.targetDate}
                              </strong>
                            </div>
                            <div>
                              <span className="block text-[#526075] uppercase">Assigned</span>
                              <strong className="text-[#0f172a] truncate block">
                                {task.assignedTo}
                              </strong>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setInspectTask({ ...task })}
                            className="w-full py-2 rounded-lg border border-[#d6cfc2] hover:border-[#0c121d] hover:bg-[#fafaf8] text-xs font-semibold text-[#0f172a] cursor-pointer transition-colors"
                          >
                            Inspect &amp; Update
                          </button>
                        </div>
                      </InteractiveCard>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {inspectTask && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Inspect ${inspectTask.title}`}
          className="fixed inset-0 z-50 bg-[#0c121d]/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-[#e4dfd5]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a5d14]">
                  {inspectTask.category} · Task {inspectTask.number}
                </p>
                <h3 className="font-display text-2xl font-medium text-[#0f172a] mt-1">
                  {inspectTask.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectTask(null)}
                aria-label="Close task inspector"
                className="w-8 h-8 rounded-lg border border-[#e4dfd5] hover:border-[#0c121d] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-[#334155] leading-relaxed">{inspectTask.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <label className="block">
                <span className="font-semibold text-[#0f172a] block mb-1">Status</span>
                <select
                  value={inspectTask.status}
                  onChange={(e) =>
                    setInspectTask({
                      ...inspectTask,
                      status: e.target.value as CalendarTask['status'],
                      progress: e.target.value === 'Completed' ? 100 : inspectTask.progress,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#d6cfc2] bg-[#fafaf8]"
                >
                  <option value="Not started">Not started</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>

              <label className="block">
                <span className="font-semibold text-[#0f172a] block mb-1">
                  Progress ({inspectTask.progress}%)
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={inspectTask.progress}
                  onChange={(e) =>
                    setInspectTask({ ...inspectTask, progress: Number(e.target.value) })
                  }
                  className="w-full accent-[#0c121d] mt-2"
                />
              </label>

              <label className="block">
                <span className="font-semibold text-[#0f172a] block mb-1">Target date</span>
                <input
                  type="date"
                  value={inspectTask.targetDate}
                  onChange={(e) =>
                    setInspectTask({ ...inspectTask, targetDate: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#d6cfc2] bg-[#fafaf8]"
                />
              </label>

              <label className="block">
                <span className="font-semibold text-[#0f172a] block mb-1">Assigned to</span>
                <input
                  type="text"
                  value={inspectTask.assignedTo}
                  onChange={(e) =>
                    setInspectTask({ ...inspectTask, assignedTo: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#d6cfc2] bg-[#fafaf8]"
                />
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-[#e4dfd5]">
              <button
                type="button"
                onClick={() => setInspectTask(null)}
                className="px-4 py-2 text-xs font-medium text-[#526075] hover:text-[#0f172a] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={saveTaskUpdate}
                className="btn-gold px-6 py-2 rounded-lg text-xs font-semibold cursor-pointer"
              >
                {saving ? 'Saving…' : 'Save updates'}
              </button>
            </div>
          </div>
        </div>
      )}

      <CtaBanner />
    </div>
  );
}
