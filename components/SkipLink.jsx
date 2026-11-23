'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { focusFirstField } from '@/lib/focusFirstField';

/**
 * Skip link that jumps straight to the booking form on the home page and
 * navigates there from the portfolio page. It uses an instant jump rather than
 * the site's smooth scrolling, which would crawl through the whole page.
 */
export default function SkipLink() {
  const pathname = usePathname();

  const jump = (event) => {
    if (pathname !== '/') {
      // Ask HashScroll to move focus once the home page has rendered.
      window.sessionStorage.setItem('duduyemi:focus-booking', '1');
      return;
    }
    event.preventDefault();
    const booking = document.getElementById('booking');
    if (!booking) return;
    const align = () => booking.scrollIntoView({ behavior: 'instant', block: 'start' });
    // 'instant' overrides the site-wide smooth scrolling so the jump is immediate.
    align();
    window.history.replaceState(null, '', '#booking');
    // Images above can still settle and shift the form; realign, then move focus.
    window.setTimeout(align, 300);
    window.setTimeout(() => {
      focusFirstField(booking);
    }, 340);
  };

  return (
    <Link
      href="/#booking"
      onClick={jump}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ink focus:px-5 focus:py-3 focus:text-[10px] focus:uppercase focus:tracking-label focus:text-cream-50"
    >
      Skip to booking
    </Link>
  );
}
