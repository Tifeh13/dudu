'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { brand, contact, navLinks } from '@/data/siteData';
import BrandLockup from './BrandLockup';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // On the home page anchors scroll in place; elsewhere they return home.
  const resolveHref = (href) =>
    href.startsWith('/#') && pathname === '/' ? href.slice(1) : href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <a
        href="#booking"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ink focus:px-5 focus:py-3 focus:text-[10px] focus:uppercase focus:tracking-label focus:text-cream-50"
      >
        Skip to booking
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? 'border-line/80 bg-cream/90 backdrop-blur-md'
            : 'border-transparent bg-cream/60 backdrop-blur-[2px]'
        }`}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-6 lg:h-[84px]">
          <Link
            href={pathname === '/' ? '#home' : '/#home'}
            className="flex items-center"
            aria-label={`${brand.name} — home`}
            onClick={() => setOpen(false)}
          >
            <BrandLockup />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                aria-current={link.href === '/portfolio' && pathname === '/portfolio' ? 'page' : undefined}
                className="group relative py-2 text-[10px] uppercase tracking-label text-ink-soft transition-colors hover:text-ink aria-[current=page]:text-ink"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={pathname === '/' ? '#booking' : '/#booking'}
              className="inline-flex rounded-full border border-ink bg-ink px-4 py-2.5 text-[10px] uppercase tracking-label text-cream-50 transition-colors duration-300 hover:bg-transparent hover:text-ink sm:px-6"
            >
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book Now</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40 bg-cream lg:hidden"
        >
            <div className="flex h-full flex-col justify-between px-6 pb-10 pt-[100px]">
              <nav aria-label="Mobile" className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={resolveHref(link.href)}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.045, duration: 0.35 }}
                    className="border-b border-line/70 py-4 font-serif text-2xl font-light text-ink"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="space-y-4">
                <a
                  href={pathname === '/' ? '#booking' : '/#booking'}
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-ink px-6 py-4 text-[10px] uppercase tracking-label text-cream-50"
                >
                  Book an appointment
                </a>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-label text-ink-muted">
                  <span>{contact.whatsappDisplay}</span>
                  <span>{contact.location}</span>
                </div>
              </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
