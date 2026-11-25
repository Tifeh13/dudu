import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { aboutImages, brand, contact } from '@/data/siteData';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="border-t border-line bg-cream-200 py-20 lg:py-28">
      <div className="shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">About Duduyemi</p>
          <h2 className="mt-5 font-serif text-3xl font-normal tracking-[0.02em] sm:text-4xl">
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
                Duduyemi — Founder &amp; Creative Director
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

        <Reveal delay={0.06} className="mt-16 border-t border-line pt-10">
          <div className="grid gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="eyebrow">The founder</p>
              <h3 className="mt-5 font-serif text-3xl font-normal leading-tight sm:text-[2.1rem]">
                {brand.founder.name}
              </h3>
              <p className="mt-2 text-[9px] uppercase tracking-label text-accent">
                {brand.founder.role}
              </p>
              <blockquote className="mt-7 border-l border-accent/50 pl-4 font-serif text-xl font-normal italic leading-snug text-ink">
                &ldquo;{brand.founder.quote}&rdquo;
              </blockquote>
              <p className="mt-7 font-serif text-2xl font-normal italic text-ink-soft">
                {brand.founder.name}
              </p>
              <p className="mt-1 text-[9px] uppercase tracking-label text-ink-muted">
                Lagos &amp; Ibadan
              </p>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-ink-soft">
              {brand.founder.story.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
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
              <p className="mt-4 font-serif text-2xl font-normal leading-snug">
                {brand.homeServiceNote}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Appointments are held at your home, hotel or venue. Studio bookings
                in {contact.location} are available on request.
              </p>
              <a
                href="#pricing"
                className="mt-6 inline-block border-b border-ink/30 pb-1 text-[10px] uppercase tracking-label transition-colors hover:border-ink"
              >
                See areas &amp; pricing
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
