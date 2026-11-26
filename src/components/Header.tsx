import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  Building2,
  ChevronDown,
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
  HEADER_DROPDOWNS,
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
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const hoverCloseTimer = useRef<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdownId(null);
  }, [pathname]);

  useEffect(() => {
    const onGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpenDropdownId(null);
        setMenuOpen((v) => !v);
      }
      if (e.key === 'Escape') {
        setOpenDropdownId(null);
      }
    };
    const onDocClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdownId(null);
      }
    };
    window.addEventListener('keydown', onGlobalKey);
    document.addEventListener('mousedown', onDocClick);
    return () => {
      window.removeEventListener('keydown', onGlobalKey);
      document.removeEventListener('mousedown', onDocClick);
    };
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

  const handleOpenDropdown = (id: string) => {
    if (hoverCloseTimer.current) {
      window.clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
    setOpenDropdownId(id);
  };

  const handleScheduleCloseDropdown = () => {
    if (hoverCloseTimer.current) window.clearTimeout(hoverCloseTimer.current);
    hoverCloseTimer.current = window.setTimeout(() => {
      setOpenDropdownId(null);
    }, 150);
  };

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

      {/* Three-Zone Sticky Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0c121d]/95 backdrop-blur-md border-b border-white/10 text-[#f8f7f3]">
        <div className="max-w-[1360px] mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-24 flex items-center justify-between gap-2 sm:gap-4">
          <Link
            href="/"
            aria-label="Investor Meet 500 home"
            className="shrink-0 whitespace-nowrap"
          >
            <BrandMark />
          </Link>

          <nav
            ref={navRef}
            aria-label="Main navigation"
            className="hidden xl:flex items-center gap-3.5 2xl:gap-5"
          >
            <Link
              href="/"
              className={`relative text-[13px] font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                pathname === '/'
                  ? 'text-[#e6c67e] border-[#c49a45]'
                  : 'text-[#cbd5e1] border-transparent hover:text-white hover:border-white/30'
              }`}
            >
              Home
            </Link>

            {HEADER_DROPDOWNS.map((group) => {
              const isOpen = openDropdownId === group.id;
              const hasActiveChild = group.items.some((item) =>
                pathname.startsWith(item.href.split('#')[0])
              );
              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => handleOpenDropdown(group.id)}
                  onMouseLeave={handleScheduleCloseDropdown}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    onClick={() => setOpenDropdownId(isOpen ? null : group.id)}
                    className={`inline-flex items-center gap-1 text-[13px] font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                      hasActiveChild || isOpen
                        ? 'text-[#e6c67e] border-[#c49a45]'
                        : 'text-[#cbd5e1] border-transparent hover:text-white hover:border-white/30'
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-[#e6c67e]' : 'opacity-75'
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div
                      role="menu"
                      aria-label={`${group.label} menu`}
                      onMouseEnter={() => handleOpenDropdown(group.id)}
                      onMouseLeave={handleScheduleCloseDropdown}
                      className="absolute left-0 top-full pt-2.5 w-80 z-50"
                    >
                      <div className="rounded-xl border border-white/15 bg-[#0f172a] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)] p-2 divide-y divide-white/8">
                        {group.items.map((item) => {
                          const itemActive = pathname === item.href;
                          return (
                            <Link
                              key={item.href + item.label}
                              href={item.href}
                              role="menuitem"
                              onClick={() => setOpenDropdownId(null)}
                              className={`block px-3.5 py-2.5 rounded-lg transition-colors ${
                                itemActive
                                  ? 'bg-[#172554]/80 text-[#e6c67e]'
                                  : 'text-[#f8f7f3] hover:bg-white/5 hover:text-[#e6c67e]'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[13px] font-medium leading-tight">
                                  {item.label}
                                </span>
                                <ArrowRight
                                  className="w-3 h-3 opacity-45 shrink-0"
                                  aria-hidden="true"
                                />
                              </div>
                              {item.desc && (
                                <span className="mt-0.5 block text-[11px] text-[#94a3b8]">
                                  {item.desc}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/sponsors"
              className={`relative text-[13px] font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                pathname.startsWith('/sponsors')
                  ? 'text-[#e6c67e] border-[#c49a45]'
                  : 'text-[#cbd5e1] border-transparent hover:text-white hover:border-white/30'
              }`}
            >
              Sponsors
            </Link>

            <Link
              href="/payments"
              className={`relative text-[13px] font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                pathname.startsWith('/payments')
                  ? 'text-[#e6c67e] border-[#c49a45]'
                  : 'text-[#cbd5e1] border-transparent hover:text-white hover:border-white/30'
              }`}
            >
              Payments
            </Link>

            <Link
              href="/contact"
              className={`relative text-[13px] font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                pathname.startsWith('/contact')
                  ? 'text-[#e6c67e] border-[#c49a45]'
                  : 'text-[#cbd5e1] border-transparent hover:text-white hover:border-white/30'
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setOpenDropdownId(null);
                setMenuOpen(true);
              }}
              className="w-9 h-9 sm:w-auto sm:h-auto inline-flex items-center justify-center gap-2 sm:px-3.5 sm:py-2 rounded-lg border border-white/20 bg-[#131c2b] hover:border-[#c49a45] text-xs text-[#e2e8f0] hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Search site, tracks, banks and pages"
            >
              <Search className="w-4 h-4 text-[#e6c67e]" aria-hidden="true" />
              <span className="hidden sm:inline font-medium">Search</span>
              <kbd className="hidden 2xl:inline font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-[#cbd5e1]">
                ⌘K
              </kbd>
            </button>

            <MagneticAction strength={3}>
              <Link
                href="/apply"
                className="btn-gold inline-flex items-center gap-1 px-2.5 sm:px-4 2xl:px-5 py-2 rounded-lg text-[11px] sm:text-[13px] font-semibold whitespace-nowrap shrink-0"
              >
                <span className="sm:hidden">Apply</span>
                <span className="hidden sm:inline">Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </MagneticAction>

            <button
              type="button"
              onClick={() => {
                setOpenDropdownId(null);
                setMenuOpen((v) => !v);
              }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/15 bg-[#131c2b] hover:border-[#c49a45] text-[#e6c67e] inline-flex items-center justify-center transition-colors shrink-0 cursor-pointer"
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
            className="fixed inset-0 top-16 sm:top-24 z-50 bg-[#0c121d]/98 backdrop-blur-xl text-[#f8f7f3] overflow-y-auto border-t border-white/10"
          >
            <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
              {/* Quick Navigation Strip */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pb-5 border-b border-white/10">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#e6c67e]">
                  DIRECT DESKS ·
                </span>
                {QUICK_LINKS.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-xs font-medium px-2.5 py-1 rounded border transition-colors whitespace-nowrap ${
                        active
                          ? 'bg-[#c49a45] text-[#0c121d] border-[#c49a45] font-semibold'
                          : 'border-white/10 bg-[#131c2b] text-[#e2e8f0] hover:border-[#c49a45] hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Search Input */}
              <div className="max-w-2xl">
                <label
                  htmlFor="drawer-site-search"
                  className="block font-mono text-[11px] uppercase tracking-wider text-[#94a3b8] mb-2"
                >
                  Search all website pages, tracks, Chief Guests, Banks (120) &amp; Desks
                </label>
                <div className="relative">
                  <Search
                    className="w-4 h-4 text-[#e6c67e] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    ref={searchInputRef}
                    id="drawer-site-search"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Try Chief Guests, 90 Days Policy, Validation Team, Pitch Area, Banks, Payments..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#131c2b] border border-white/20 text-sm text-white placeholder:text-[#64748b] focus:border-[#c49a45]"
                  />
                </div>
              </div>

              {/* Register As Role Grid */}
              <div className="space-y-3 pb-6 border-b border-white/10">
                <span className="block font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-[#94a3b8]">
                  REGISTER AS CATEGORY · AVAILABLE SLOTS ONLY
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
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
