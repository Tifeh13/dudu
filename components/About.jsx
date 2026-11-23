import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { aboutImages, brand, contact } from '@/data/siteData';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="border-t border-line bg-cream-200 py-20 lg:py-28">
      <div className="shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">About Me</p>
          <h2 className="mt-5 font-serif text-3xl font-light tracking-[0.02em] sm:text-4xl">
            A quiet, considered approach to beauty.
          </h2>
          <p className="mt-4 text-[9px] uppercase tracking-label text-ink-muted">
            Makeup artist · Bridal specialist · Home service
          </p>
          <p className="mt-7 text-sm leading-relaxed text-ink-soft">
            {brand.shortBio}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div className="grid grid-cols-2 items-start gap-3 sm:gap-4 lg:grid-cols-12">
            <figure className="col-span-2 lg:col-span-4 lg:pr-4">
              <div className="relative aspect-[3/4] overflow-hidden bg-cream-300">
                <Image
                  src={aboutImages.portrait.src}
                  alt={aboutImages.portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover object-[center_22%]"
                />
              </div>
              <figcaption className="mt-3 text-[9px] uppercase tracking-label text-ink-muted">
                Duduyemi — founder &amp; lead artist
              </figcaption>
            </figure>

            <figure className="lg:col-span-5 lg:mt-14">
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-300">
                <Image
                  src={aboutImages.work[0].src}
                  alt={aboutImages.work[0].alt}
                  fill
                  sizes="(min-width: 1024px) 36vw, 50vw"
                  className="object-cover"
                />
              </div>
            </figure>

            <figure className="lg:col-span-3 lg:mt-28">
              <div className="relative aspect-[3/4] overflow-hidden bg-cream-300">
                <Image
                  src={aboutImages.work[1].src}
                  alt={aboutImages.work[1].alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[9px] uppercase tracking-label text-ink-muted">
                The Makeup Show, Lagos
              </figcaption>
            </figure>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 border-t border-line pt-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <div className="space-y-4">
              {brand.approach.map((item) => (
                <p
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                >
                  <span className="mt-2 inline-block h-px w-5 shrink-0 bg-accent" />
                  {item}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="border border-line bg-cream-50 p-7 sm:p-9">
              <p className="flex items-center gap-2 text-[10px] uppercase tracking-label text-accent">
                <MapPin size={13} strokeWidth={1.5} /> Home service
              </p>
              <p className="mt-4 font-serif text-2xl font-light leading-snug">
                {brand.homeServiceNote}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Appointments are held at your home, hotel or venue. Studio bookings
                in {contact.location} are available on request.
              </p>
              <a
                href="#contact"
                className="mt-6 inline-block border-b border-ink/30 pb-1 text-[10px] uppercase tracking-label transition-colors hover:border-ink"
              >
                Check your area
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
