'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { focusFirstField } from '@/lib/focusFirstField';

/**
 * Next's client-side navigation can drop the hash target while images and
 * fonts are still settling. This repeats the jump a few times after the route
 * renders so "/#about" never lands at the top of the page.
 */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const target = decodeURIComponent(window.location.hash.slice(1));
    if (!target) return undefined;

    let cancelled = false;

    const jump = () => {
      if (cancelled) return;
      const element = document.getElementById(target);
      if (!element) return;
      const header = document.querySelector('header');
      const offset = (header?.offsetHeight || 72) + 8;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      // 'instant' ignores the global smooth-scroll rule so the jump is immediate.
      window.scrollTo({ top, behavior: 'instant' });

      if (window.sessionStorage.getItem('duduyemi:focus-booking') === '1') {
        window.sessionStorage.removeItem('duduyemi:focus-booking');
        focusFirstField(element);
      }
    };

    const timers = [0, 120, 350, 700, 1200].map((delay) => setTimeout(jump, delay));
    window.addEventListener('load', jump);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      window.removeEventListener('load', jump);
    };
  }, [pathname]);

  return null;
}
