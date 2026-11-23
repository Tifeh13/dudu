import Image from 'next/image';
import { brand } from '@/data/siteData';

/**
 * Compact brand lockup: the monogram taken from the logo paired with the
 * wordmark. The full logo is used for social sharing and app icons.
 */
export default function BrandLockup({ size = 'md', tone = 'dark' }) {
  const markSize = size === 'lg' ? 'h-12 w-12' : 'h-9 w-9';
  const wordSize = size === 'lg' ? 'text-base' : 'text-[13px]';
  const textColor = tone === 'light' ? 'text-cream-50' : 'text-ink';
  const rule = tone === 'light' ? 'border-cream-50/25' : 'border-line';
  const micro = tone === 'light' ? 'text-cream-50/55' : 'text-ink-muted';

  return (
    <span className="flex items-center gap-3">
      <Image
        src={brand.logoMark}
        alt=""
        aria-hidden="true"
        width={800}
        height={800}
        className={`${markSize} w-auto shrink-0 ${tone === 'light' ? 'invert' : ''}`}
      />
      <span className={`block border-l pl-3 ${rule}`}>
        <span
          className={`block font-serif uppercase leading-none tracking-[0.3em] ${wordSize} ${textColor}`}
        >
          Duduyemi
        </span>
        <span className={`mt-1.5 block text-[7px] uppercase tracking-[0.42em] ${micro}`}>
          Makeover
        </span>
      </span>
    </span>
  );
}
