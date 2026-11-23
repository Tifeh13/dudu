'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import { portfolio, portfolioCategories } from '@/data/siteData';
import Lightbox from './Lightbox';
import Reveal from './Reveal';

export default function Portfolio() {
  const [active, setActive] = useState('all');
  const [openIndex, setOpenIndex] = useState(-1);
  const reduceMotion = useReducedMotion();

  const items =
    active === 'all' ? portfolio : portfolio.filter((item) => item.category === active);

  return (
    <section id="portfolio" className="border-t border-line bg-cream-50 py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <Reveal>
            <p className="eyebrow">Portfolio</p>
            <h2 className="mt-5 font-serif text-3xl font-light sm:text-4xl">
              Selected work.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              A small edit of bridal, traditional and soft glam looks. More work is
              added as each season is photographed.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter portfolio by category"
            >
              {portfolioCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setActive(category.id);
                    setOpenIndex(-1);
                  }}
                  aria-pressed={active === category.id}
                  className={`rounded-full border px-4 py-2 text-[9px] uppercase tracking-label transition-colors duration-300 ${
                    active === category.id
                      ? 'border-ink bg-ink text-cream-50'
                      : 'border-line text-ink-soft hover:border-ink hover:text-ink'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                layout
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setOpenIndex(index)}
                className="group relative aspect-[4/5] overflow-hidden bg-cream-200 text-left"
                aria-label={`Open image: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
                <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 text-[9px] uppercase tracking-label text-cream-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {item.categoryLabel}
                  <Plus size={13} strokeWidth={1.5} />
                </span>
                <span className="absolute inset-x-0 top-0 hidden bg-gradient-to-b from-ink/40 to-transparent p-3 pb-8 text-[9px] uppercase tracking-label text-cream-50 opacity-100 transition-opacity group-hover:opacity-0 md:block">
                  {item.categoryLabel}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-[10px] uppercase tracking-label text-ink-muted">
            {portfolio.length} featured photographs · films in the full portfolio
          </p>
          <Link
            href="/portfolio"
            prefetch
            className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-label text-ink"
          >
            View the full portfolio
            <ArrowRight
              size={13}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      {openIndex >= 0 && items[openIndex] && (
        <Lightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(-1)}
          onChange={(next) => setOpenIndex(next)}
        />
      )}
    </section>
  );
}
