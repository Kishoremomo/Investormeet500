import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  Building2,
  Globe,
  Landmark,
  Menu,
  Rocket,
  Search,
  TrendingUp,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  MAIN_NAV_LINKS,
  MENU_DIRECTORY_COLUMNS,
  QUICK_LINKS,
  REGISTER_AS_CHIPS,
  type RegisterAsChip,
} from '../data/siteNavigation';
import { Link, useRouter } from '../lib/router';
import { BrandMark } from './BrandMark';
import { MagneticAction } from './MotionPrimitives';

function ChipIcon({ icon }: { icon: RegisterAsChip['icon'] }) {
  const cls = 'w-3.5 h-3.5 text-[#c49a45] shrink-0';
  switch (icon) {
    case 'rocket':
      return <Rocket className={cls} />;
    case 'briefcase':
      return <Briefcase className={cls} />;
    case 'landmark':
    case 'bank':
      return <Landmark className={cls} />;
    case 'wallet':
      return <Wallet className={cls} />;
    case 'trending':
      return <TrendingUp className={cls} />;
    case 'building':
      return <Building2 className={cls} />;
    case 'users':
      return <Users className={cls} />;
    case 'globe':
      return <Globe className={cls} />;
  }
}

export function Header() {
  const { pathname } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setMenuOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onGlobalKey);
    return () => window.removeEventListener('keydown', onGlobalKey);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => searchInputRef.current?.focus(), 60);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [menuOpen]);

  const allMenuItems = useMemo(() => MENU_DIRECTORY_COLUMNS.flat(), []);

  const filteredColumns = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return MENU_DIRECTORY_COLUMNS;
    const matches = allMenuItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.href.toLowerCase().includes(q) ||
        (item.keywords && item.keywords.toLowerCase().includes(q))
    );
    const colSize = Math.ceil(matches.length / 3) || 1;
    return [
      matches.slice(0, colSize),
      matches.slice(colSize, colSize * 2),
      matches.slice(colSize * 2),
    ];
  }, [allMenuItems, searchQuery]);

  const totalMatches = filteredColumns.reduce((sum, col) => sum + col.length, 0);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded bg-[#c49a45] text-[#0c121d] font-semibold text-sm"
      >
        Skip to content
      </a>

      {/* Three-Zone Sleek Single-Row Top Bar (64px) */}
      <header className="sticky top-0 z-40 bg-[#0c121d]/95 backdrop-blur-md border-b border-white/10 text-[#f8f7f3]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Investor Meet 500 home"
            className="shrink-0 whitespace-nowrap"
          >
            <BrandMark />
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7">
            {MAIN_NAV_LINKS.map((item) => {
              const isActive =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[13px] font-medium whitespace-nowrap shrink-0 py-1 border-b transition-colors ${
                    isActive
                      ? 'text-[#e6c67e] border-[#c49a45]'
                      : 'text-[#cbd5e1] border-transparent hover:text-white hover:border-white/30'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 bg-[#131c2b] hover:border-white/30 text-xs text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
              aria-label="Open directory and site search"
            >
              <Search className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Directory</span>
              <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-[#cbd5e1]">
                ⌘K
              </kbd>
            </button>

            <MagneticAction strength={3}>
              <Link
                href="/apply"
                className="btn-gold inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-[13px] font-semibold whitespace-nowrap shrink-0"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </MagneticAction>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="w-10 h-10 rounded-lg border border-white/15 bg-[#131c2b] hover:border-[#c49a45] text-[#e6c67e] inline-flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation and search"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-16 z-50 bg-[#0c121d]/98 backdrop-blur-xl text-[#f8f7f3] overflow-y-auto border-t border-white/10"
          >
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
              {/* Quick Navigation Strip */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-5 border-b border-white/10">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#e6c67e]">
                  QUICK ACCESS ·
                </span>
                {QUICK_LINKS.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-xs font-medium transition-colors whitespace-nowrap ${
                        active ? 'text-[#e6c67e] font-semibold' : 'text-[#cbd5e1] hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Search Input */}
              <div className="max-w-xl">
                <label
                  htmlFor="drawer-site-search"
                  className="block font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-2"
                >
                  Search 29 platform pages &amp; directories
                </label>
                <div className="relative">
                  <Search
                    className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    ref={searchInputRef}
                    id="drawer-site-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Try Banks, Payments, Startup, Calendar..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#131c2b] border border-white/15 text-sm text-white placeholder:text-[#64748b] focus:border-[#c49a45]"
                  />
                </div>
              </div>

              {/* Register As Role Grid */}
              <div className="space-y-3 pb-6 border-b border-white/10">
                <span className="block font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-[#94a3b8]">
                  REGISTER AS CATEGORY
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                  {REGISTER_AS_CHIPS.map((chip) => (
                    <Link
                      key={chip.label}
                      href={chip.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-white/12 bg-[#131c2b] hover:border-[#c49a45] text-xs font-medium text-[#f8f7f3] transition-colors"
                    >
                      <ChipIcon icon={chip.icon} />
                      <span className="truncate">{chip.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {totalMatches === 0 ? (
                <div className="py-10 text-center border border-white/10 rounded-xl bg-[#131c2b]">
                  <p className="text-sm text-[#cbd5e1]">
                    No website pages matched &ldquo;{searchQuery}&rdquo;.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-3 text-xs font-medium text-[#e6c67e] underline cursor-pointer"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-2 pb-10">
                  {filteredColumns.map((col, colIdx) => (
                    <ul key={colIdx} className="divide-y divide-white/10">
                      {col.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <li key={item.href + item.label}>
                            <Link
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              className={`flex items-center justify-between py-3 text-sm transition-colors ${
                                active
                                  ? 'text-[#e6c67e] font-semibold'
                                  : 'text-[#f8f7f3] hover:text-[#e6c67e]'
                              }`}
                            >
                              <span>{item.label}</span>
                              <ArrowRight className="w-3.5 h-3.5 opacity-40" aria-hidden="true" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
