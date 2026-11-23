'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Play } from 'lucide-react';
import { portfolioCategories, portfolioMedia } from '@/data/siteData';

// The viewer is only downloaded when someone opens a photograph or film.
const MediaLightbox = dynamic(() => import('./MediaLightbox'), { ssr: false });

const filters = [...portfolioCategories, { id: 'film', label: 'Films' }];

export default function PortfolioGallery() {
  const [active, setActive] = useState('all');
  const [openIndex, setOpenIndex] = useState(-1);

  const items = useMemo(() => {
    if (active === 'all') return portfolioMedia;
    if (active === 'film') return portfolioMedia.filter((item) => item.type === 'video');
    return portfolioMedia.filter((item) => item.category === active);
  }, [active]);

  return (
    <section className="bg-cream-50 py-12 lg:py-16">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-[10px] uppercase tracking-label text-ink-muted">
            {items.length} {items.length === 1 ? 'piece' : 'pieces'}
            {' · '}
            {portfolioMedia.filter((item) => item.type === 'video').length} films
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter portfolio">
            {filters.map((category) => (
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
        </div>

        {/* Columns keep every photograph and film at its own full ratio. */}
        <div className="mt-8 columns-2 gap-3 sm:gap-4 md:columns-3 xl:columns-4">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden bg-cream-200 text-left sm:mb-4"
              style={{ aspectRatio: `${item.width} / ${item.height}` }}
              aria-label={
                item.type === 'video' ? `Play film: ${item.alt}` : `Open image: ${item.alt}`
              }
            >
              <Image
                src={item.type === 'video' ? item.poster : item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1280px) 23vw, (min-width: 768px) 31vw, 46vw"
                quality={70}
                loading={index < 4 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : undefined}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />

              {item.type === 'video' ? (
                <>
                  <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cream-50/60 bg-ink/35 text-cream-50 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 sm:h-14 sm:w-14">
                    <Play size={18} strokeWidth={1.5} className="ml-0.5" fill="currentColor" />
                  </span>
                  <span className="absolute right-3 top-3 border border-cream-50/40 bg-ink/40 px-2 py-1 text-[8px] uppercase tracking-label text-cream-50 backdrop-blur-sm">
                    {item.duration || 'Film'}
                  </span>
                </>
              ) : null}

              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-ink/60 to-transparent px-3 pb-3 pt-10 text-[9px] uppercase tracking-label text-cream-50">
                {item.categoryLabel}
                <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.type === 'video' ? 'Play' : 'View'}
                </span>
              </span>
            </button>
          ))}
        </div>

        <p className="mt-6 text-[10px] uppercase tracking-label text-ink-muted">
          Films are loaded only when you press play.
        </p>
      </div>

      {openIndex >= 0 && items[openIndex] && (
        <MediaLightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(-1)}
          onChange={(next) => setOpenIndex(next)}
        />
      )}
    </section>
  );
}
