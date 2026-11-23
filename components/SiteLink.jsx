'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Internal link that behaves correctly from every page:
 *  - on the home page, "/#section" scrolls to that section in place;
 *  - from any other page it uses client-side navigation, and HashScroll
 *    finishes the jump once the home page has rendered.
 */
export default function SiteLink({ href, children, onClick, ...rest }) {
  const pathname = usePathname();
  const isHomeAnchor = href.startsWith('/#');

  if (isHomeAnchor && pathname === '/') {
    const target = href.slice(2);

    return (
      <a
        href={`#${target}`}
        onClick={(event) => {
          event.preventDefault();
          const element = document.getElementById(target);
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.replaceState(null, '', `#${target}`);
          onClick?.(event);
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
