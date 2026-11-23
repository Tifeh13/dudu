import Image from 'next/image';
import { ArrowDownRight, MapPin } from 'lucide-react';
import { brand, contact } from '@/data/siteData';
import Reveal from './Reveal';

export default function Hero() {
  return (
    <section id="home" className="relative bg-cream pt-[72px] lg:pt-[84px]">
      <div className="grid lg:min-h-[calc(100vh-84px)] lg:grid-cols-[1.02fr_1fr]">
        <div className="relative flex flex-col justify-center px-5 pb-12 pt-14 sm:px-8 lg:px-14 lg:pb-16 lg:pt-20 xl:px-20">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-ink-muted" />
              Lagos &amp; Ibadan · By appointment
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 max-w-[13ch] font-serif text-[clamp(2.6rem,6.4vw,4.6rem)] font-light leading-[0.98] tracking-[-0.01em] text-ink">
              Makeup for the moments you keep.
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 font-serif text-xl font-light italic text-accent sm:text-2xl">
              {brand.tagline}
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft">
              Bridal, traditional and event makeup, brought to your home, hotel or
              venue — soft, luminous finishes designed to hold from the first
              photograph to the last dance.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href="#booking" className="btn-solid">
                Book Now
                <ArrowDownRight size={14} strokeWidth={1.5} />
              </a>
              <a
                href="#portfolio"
                className="border-b border-ink/30 pb-1 text-[10px] uppercase tracking-label text-ink transition-colors hover:border-ink"
              >
                View the portfolio
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.26} className="mt-12">
            <p className="text-[10px] uppercase tracking-label text-ink-soft">
              {brand.descriptor.join('  ·  ')}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line/80 pt-5 text-[10px] uppercase tracking-label text-ink-muted">
              <a href={`tel:${contact.tel}`} className="transition-colors hover:text-ink">
                {contact.whatsappDisplay}
              </a>
              <span>By appointment only</span>
            </div>
          </Reveal>
        </div>

        <div className="relative min-h-[72vh] overflow-hidden bg-cream-300 sm:min-h-[80vh] lg:min-h-full">
          <Image
            src="/images/gallery/traditional-1.jpg"
            alt="Traditional makeup by Duduyemi Makeover: a soft pink eye, deep liner and a patterned headwrap."
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[center_30%]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/45 to-transparent p-5 pt-24 sm:p-7">
            <div className="flex items-end justify-between gap-4 text-cream-50">
              <div>
                <p className="text-[9px] uppercase tracking-label text-cream-50/80">
                  Lagos &amp; Ibadan
                </p>
                <p className="mt-1 font-serif text-lg font-light">
                  Home-service makeup artistry
                </p>
              </div>
              <span className="hidden items-center gap-1.5 text-[9px] uppercase tracking-label text-cream-50/85 sm:flex">
                <MapPin size={12} strokeWidth={1.5} /> At your venue
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
