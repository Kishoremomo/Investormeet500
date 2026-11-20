import React from 'react';
import { FOOTER_COLUMNS, ORGANISER_CONTACT } from '../data/siteNavigation';
import { Link } from '../lib/router';
import { AvatarPortrait } from './AvatarPortrait';
import { BrandMark } from './BrandMark';

export function Footer() {
  const shareUrl = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.origin : 'https://investor-meet-500.app'
  );
  const shareText = encodeURIComponent(
    'Investor Meet 500 — Capital. Connections. Lasting Impact.'
  );

  return (
    <footer className="bg-[#0c121d] text-[#cbd5e1] border-t border-white/10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" aria-label="Investor Meet 500 home" className="inline-block">
              <BrandMark />
            </Link>
            <p className="text-sm text-[#e6c67e] font-medium">
              Capital · Connections · Lasting Impact
            </p>

            <div className="space-y-2 text-xs leading-relaxed text-[#94a3b8]">
              <p>
                <strong className="text-[#f8f7f3]">{ORGANISER_CONTACT.eventDate}</strong> ·{' '}
                {ORGANISER_CONTACT.city}
              </p>
              <p>Registration deadline: {ORGANISER_CONTACT.deadline}</p>
              <div className="pt-2 flex items-center gap-3">
                <AvatarPortrait name={ORGANISER_CONTACT.contactPerson} size="xs" theme="dark" />
                <div>
                  <p className="text-[#f8f7f3] font-medium">{ORGANISER_CONTACT.contactPerson}</p>
                  <p className="text-[11px] text-[#94a3b8]">Organiser Desk · Chennai</p>
                </div>
              </div>
              <p className="pt-1 font-mono">
                <a
                  href={ORGANISER_CONTACT.telHref}
                  className="text-[#e6c67e] hover:underline"
                >
                  {ORGANISER_CONTACT.phone}
                </a>
              </p>
              <p className="font-mono">
                <a
                  href={`mailto:${ORGANISER_CONTACT.email}`}
                  className="text-[#e6c67e] hover:underline"
                >
                  {ORGANISER_CONTACT.email}
                </a>
              </p>
              <p className="pt-1 max-w-sm">{ORGANISER_CONTACT.address}</p>
            </div>

            <section aria-labelledby="footer-share-heading" className="pt-3 space-y-2.5">
              <h2
                id="footer-share-heading"
                className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#e6c67e]"
              >
                Share this event
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <a
                  href={`https://wa.me/?text=${shareText}%0A${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share Investor Meet 500 on WhatsApp, opens in a new tab"
                  className="text-[#cbd5e1] hover:text-[#e6c67e] underline-offset-4 hover:underline transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share Investor Meet 500 on Facebook, opens in a new tab"
                  className="text-[#cbd5e1] hover:text-[#e6c67e] underline-offset-4 hover:underline transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share Investor Meet 500 on LinkedIn, opens in a new tab"
                  className="text-[#cbd5e1] hover:text-[#e6c67e] underline-offset-4 hover:underline transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share Investor Meet 500 on X, opens in a new tab"
                  className="text-[#cbd5e1] hover:text-[#e6c67e] underline-offset-4 hover:underline transition-colors"
                >
                  X
                </a>
              </div>
              <p className="text-[11px] text-[#64748b]">
                Sharing links only, not official social profiles.
              </p>
            </section>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {FOOTER_COLUMNS.map((col, idx) => (
              <div key={col.title} className="space-y-4">
                <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e6c67e] pb-2 border-b border-white/10">
                  0{idx + 1} · {col.title}
                </h3>
                <ul className="space-y-2.5 text-xs">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-[#cbd5e1] hover:text-[#e6c67e] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748b]">
          <span>© 2026 Investor Meet 500 · Chennai</span>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-[#e6c67e] transition-colors">
              Draft Terms
            </Link>
            <Link href="/privacy" className="hover:text-[#e6c67e] transition-colors">
              Draft Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
