import Image from 'next/image';
import { brand, contact, navLinks, pricing } from '@/data/siteData';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-cream-50">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.6fr_0.8fr]">
          <div>
            <a href="/#home" aria-label={`${brand.name} — back to top`}>
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={1000}
                height={1032}
                className="h-24 w-auto sm:h-28"
              />
            </a>
            <p className="mt-5 max-w-xs font-serif text-lg font-light italic text-ink-soft">
              {brand.tagline}
            </p>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-ink-muted">
              Bridal, traditional and event makeup — studio or home service across Lagos
              and Ibadan.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="text-[9px] uppercase tracking-label text-ink-muted">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[11px] uppercase tracking-label text-ink-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[9px] uppercase tracking-label text-ink-muted">Connect</p>
            <ul className="mt-4 space-y-2.5 text-[11px] uppercase tracking-label">
              <li>
                <a
                  href={`${contact.whatsappHref}?text=${encodeURIComponent(
                    'Hello Duduyemi Makeover! I would love to make an enquiry about your makeup services.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  WhatsApp · {contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="normal-case tracking-normal text-ink-soft transition-colors hover:text-ink"
                >
                  {contact.email}
                </a>
              </li>
              {contact.socials
                .filter((social) => social.url)
                .map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink-soft transition-colors hover:text-ink"
                    >
                      {social.label} · {social.handle}
                    </a>
                  </li>
                ))}
              <li className="text-ink-muted">{contact.location}</li>
            </ul>
            <p className="mt-5 text-[10px] leading-relaxed text-ink-muted">
              {pricing.depositPercentage}% deposit secures your date. By appointment
              only.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[9px] uppercase tracking-label text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {brand.name}. All rights reserved.</p>
          <p>Lagos &amp; Ibadan, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
