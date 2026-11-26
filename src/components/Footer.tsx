import React from 'react';
import {
  ArrowUpRight,
  Calendar,
  Mail,
  MapPin,
  Phone,
  Share2,
  ShieldCheck,
} from 'lucide-react';
import { FOOTER_COLUMNS, ORGANISER_CONTACT } from '../data/siteNavigation';
import { resolvePortraitUrl } from '../data/portraits';
import { Link } from '../lib/router';
import { AvatarPortrait } from './AvatarPortrait';
import { BrandMark } from './BrandMark';

const COLUMN_ACCENTS = ['#1d4ed8', '#0d9488', '#c49a45'] as const;

type SocialIconId = 'linkedin' | 'whatsapp' | 'facebook' | 'x' | 'instagram' | 'youtube';

function FooterSocialIcon({ id, className = 'w-4 h-4' }: { id: SocialIconId; className?: string }) {
  switch (id) {
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.6-1.3 1.2-1.8 1.2-.5 0-1.1.2-3.8-.9-3.2-1.3-5.2-4.5-5.4-4.7-.1-.2-1.3-1.7-1.3-3.3 0-1.5.8-2.3 1.1-2.6.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.6l.9 2.2c.1.2.1.4 0 .6l-.4.5c-.2.2-.3.4-.2.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.3 2.5 1.5.3.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.9.9c.3.1.5.2.5.4.1.3.1 1-.1 1.5Z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M18.9 2H22l-6.8 7.7L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L.9 2h6.5l4.4 5.8L18.9 2Zm-1.1 18h1.7L6.5 3.9H4.6L17.8 20Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
        </svg>
      );
  }
}

export function Footer() {
  const shareUrl = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.origin : 'https://investor-meet-500.app'
  );
  const shareText = encodeURIComponent(
    'Investor Meet 500 — Capital. Connections. Lasting Impact.'
  );
  const organiserPortrait = resolvePortraitUrl(ORGANISER_CONTACT.contactPerson);

  const socialChannels: {
    id: SocialIconId;
    label: string;
    href: string;
    external: boolean;
    iconColor: string;
    iconBg: string;
    ariaLabel: string;
  }[] = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      external: true,
      iconColor: 'text-[#60a5fa]',
      iconBg: 'bg-[#0a66c2]/20 border-[#0a66c2]/40',
      ariaLabel: 'Share Investor Meet 500 on LinkedIn, opens in a new tab',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: `https://wa.me/?text=${shareText}%0A${shareUrl}`,
      external: true,
      iconColor: 'text-[#2dd4bf]',
      iconBg: 'bg-[#0d9488]/20 border-[#0d9488]/40',
      ariaLabel: 'Share Investor Meet 500 on WhatsApp, opens in a new tab',
    },
    {
      id: 'facebook',
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      external: true,
      iconColor: 'text-[#93c5fd]',
      iconBg: 'bg-[#1d4ed8]/20 border-[#1d4ed8]/40',
      ariaLabel: 'Share Investor Meet 500 on Facebook, opens in a new tab',
    },
    {
      id: 'x',
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      external: true,
      iconColor: 'text-[#e2e8f0]',
      iconBg: 'bg-white/10 border-white/20',
      ariaLabel: 'Share Investor Meet 500 on X, opens in a new tab',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      href: '/event-program#promotion',
      external: false,
      iconColor: 'text-[#f472b6]',
      iconBg: 'bg-[#db2777]/20 border-[#db2777]/40',
      ariaLabel: 'Inspect Investor Meet 500 Instagram campaign previews',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      href: '/event-program#promotion',
      external: false,
      iconColor: 'text-[#f87171]',
      iconBg: 'bg-[#dc2626]/20 border-[#dc2626]/40',
      ariaLabel: 'Inspect Investor Meet 500 YouTube explainer reels',
    },
  ];

  return (
    <footer className="bg-[#0c121d] text-[#cbd5e1] border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        {/* Top Row: Organiser & Brand, Summit Schedule, and Share Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Card 01: Brand & Organiser Desk Card */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#11192a] overflow-hidden shadow-[0_12px_32px_-18px_rgba(0,0,0,0.65)] flex flex-col">
            <div
              className="h-1 w-full bg-gradient-to-r from-[#1d4ed8] via-[#0d9488] to-[#c49a45]"
              aria-hidden="true"
            />
            <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Link href="/" aria-label="Investor Meet 500 home" className="inline-block">
                    <BrandMark compact />
                  </Link>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#e6c67e]">
                    20-02-2027 · CHENNAI
                  </span>
                </div>

                <div className="pt-2.5 border-t border-white/10 flex items-center gap-3">
                  <AvatarPortrait
                    name={ORGANISER_CONTACT.contactPerson}
                    src={organiserPortrait}
                    size="sm"
                    theme="dark"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-base font-medium text-[#f8f7f3] leading-tight">
                      {ORGANISER_CONTACT.contactPerson}
                    </p>
                    <p className="text-xs text-[#94a3b8]">
                      Event Organiser · Chennai Coordination Desk
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <a
                    href={ORGANISER_CONTACT.telHref}
                    className="rounded-lg border border-white/10 bg-[#091326] px-3 py-2 flex items-center gap-2 text-[#e6c67e] hover:border-[#c49a45] transition-colors font-mono"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{ORGANISER_CONTACT.phone}</span>
                  </a>
                  <a
                    href={`mailto:${ORGANISER_CONTACT.email}`}
                    className="rounded-lg border border-white/10 bg-[#091326] px-3 py-2 flex items-center gap-2 text-[#e6c67e] hover:border-[#c49a45] transition-colors font-mono min-w-0"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{ORGANISER_CONTACT.email}</span>
                  </a>
                </div>

                <div className="flex items-start gap-2 text-[11px] text-[#94a3b8] leading-snug">
                  <MapPin className="w-3.5 h-3.5 text-[#c49a45] mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{ORGANISER_CONTACT.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 02: Registration Cutoff & Alerts Desk Card */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#11192a] p-5 flex flex-col justify-between gap-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5eead4]">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>SUMMIT SCHEDULE</span>
                </span>
                <span className="font-mono text-[10px] text-[#94a3b8]">90-Day Standard</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 text-xs">
                <div className="rounded-lg border border-white/10 bg-[#091326] px-3.5 py-2.5">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#94a3b8]">
                    Summit Date
                  </span>
                  <strong className="mt-0.5 block text-[#f8f7f3]">
                    {ORGANISER_CONTACT.eventDate} ({ORGANISER_CONTACT.eventDateCode})
                  </strong>
                </div>
                <div className="rounded-lg border border-white/10 bg-[#091326] px-3.5 py-2.5">
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-[#94a3b8]">
                    Registration Cutoff
                  </span>
                  <strong className="mt-0.5 block text-[#e6c67e]">
                    {ORGANISER_CONTACT.deadline} ({ORGANISER_CONTACT.deadlineCode})
                  </strong>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-1 text-[11px] font-mono text-[#cbd5e1]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#e6c67e] shrink-0" aria-hidden="true" />
                <span>
                  {ORGANISER_CONTACT.strategy} · {ORGANISER_CONTACT.completedBaseline} Completed /{' '}
                  {ORGANISER_CONTACT.pendingBaseline} Pending
                </span>
              </div>
              <div className="text-[#94a3b8] pl-5 break-all">
                Alerts desk:{' '}
                <span className="text-[#f8f7f3]">{ORGANISER_CONTACT.notificationEmail}</span>
              </div>
            </div>
          </div>

          {/* Card 03: Social & Event Share Channels Card */}
          <section
            aria-labelledby="footer-share-heading"
            className="lg:col-span-3 rounded-2xl border border-white/10 bg-[#11192a] p-5 flex flex-col justify-between gap-3"
          >
            <div className="space-y-3">
              <h2
                id="footer-share-heading"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e6c67e]"
              >
                <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Share Channels</span>
              </h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {socialChannels.map((item) => {
                  const content = (
                    <>
                      <span
                        className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 ${item.iconBg} ${item.iconColor}`}
                      >
                        <FooterSocialIcon id={item.id} className="w-3.5 h-3.5" />
                      </span>
                      <span className="font-medium truncate">{item.label}</span>
                    </>
                  );

                  const cls =
                    'px-2.5 py-2 rounded-lg border border-white/12 bg-[#091326] text-[#e2e8f0] hover:text-[#e6c67e] hover:border-[#c49a45]/70 transition-colors flex items-center gap-2';

                  return item.external ? (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.ariaLabel}
                      className={cls}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link key={item.id} href={item.href} aria-label={item.ariaLabel} className={cls}>
                      {content}
                    </Link>
                  );
                })}
              </div>
            </div>
            <p className="text-[11px] text-[#94a3b8] leading-snug pt-2 border-t border-white/10">
              Official social sharing actions &amp; campaign previews.
            </p>
          </section>
        </div>

        {/* Second Row: 3 Comfortable Medium Directory Cards */}
        <div
          aria-label="Summit navigation directories"
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch"
        >
          {FOOTER_COLUMNS.map((col, idx) => {
            const accent = COLUMN_ACCENTS[idx % COLUMN_ACCENTS.length];
            return (
              <div
                key={col.title}
                data-footer-directory={`0${idx + 1}`}
                className="rounded-2xl border border-white/12 bg-[#11192a] overflow-hidden flex flex-col justify-between lg:min-h-[380px] shadow-[0_12px_30px_-18px_rgba(0,0,0,0.6)] hover:border-white/25 transition-colors"
              >
                <div className="flex-1 flex flex-col">
                  <div
                    className="h-1.5 w-full"
                    style={{ backgroundColor: accent }}
                    aria-hidden="true"
                  />
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-5">
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3.5 mb-4 border-b border-white/10">
                        <div>
                          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#94a3b8] block">
                            DIRECTORY 0{idx + 1}
                          </span>
                          <h3 className="mt-1 font-display text-xl sm:text-[22px] font-medium text-[#e6c67e] leading-snug">
                            {col.title}
                          </h3>
                        </div>
                        <span className="font-mono text-[11px] font-medium text-[#cbd5e1] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 shrink-0">
                          {col.links.length} Routes
                        </span>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-[13px] sm:text-sm">
                        {col.links.map((link) => (
                          <li key={link.href + link.label} className="min-w-0">
                            <Link
                              href={link.href}
                              className="group flex items-start justify-between gap-1.5 text-[#e2e8f0] hover:text-[#e6c67e] transition-colors py-1"
                            >
                              <span className="leading-snug">{link.label}</span>
                              <ArrowUpRight
                                className="w-3.5 h-3.5 mt-0.5 opacity-0 group-hover:opacity-100 text-[#e6c67e] shrink-0 transition-opacity"
                                aria-hidden="true"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#94a3b8]">
                      <span>Quick Access Index</span>
                      <span className="text-[#e6c67e]">Chennai 2027</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Legal, Social Icon Bar & Governance Strip */}
        <div className="rounded-xl border border-white/10 bg-[#11192a]/70 px-5 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#94a3b8]">
          <span>© 2026 Investor Meet 500 · Chennai · Scheduled Summit 20 February 2027</span>

          <div className="flex items-center gap-2" aria-label="Footer social media links">
            {socialChannels.map((item) => {
              const cls = `w-8 h-8 rounded-lg border border-white/12 bg-[#091326] flex items-center justify-center ${item.iconColor} hover:border-[#c49a45] hover:text-[#e6c67e] transition-colors`;
              return item.external ? (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.label}
                  aria-label={item.ariaLabel}
                  className={cls}
                >
                  <FooterSocialIcon id={item.id} className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  key={item.id}
                  href={item.href}
                  title={item.label}
                  aria-label={item.ariaLabel}
                  className={cls}
                >
                  <FooterSocialIcon id={item.id} className="w-4 h-4" />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-[#e6c67e] transition-colors">
              Draft Terms
            </Link>
            <Link href="/privacy" className="hover:text-[#e6c67e] transition-colors">
              Draft Privacy
            </Link>
            <Link href="/contact" className="hover:text-[#e6c67e] transition-colors">
              Organiser Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
