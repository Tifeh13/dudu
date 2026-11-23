'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { reviewsDisclaimer, testimonials } from '@/data/siteData';
import Reveal from './Reveal';

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const review = testimonials[index];

  const move = (step) => {
    setDirection(step);
    setIndex((current) => (current + step + testimonials.length) % testimonials.length);
  };

  return (
    <section id="reviews" className="border-t border-line bg-cream-200 py-20 lg:py-28">
      <div className="shell">
        <Reveal className="text-center">
          <p className="eyebrow">Reviews</p>
          <h2 className="mt-5 font-serif text-3xl font-light sm:text-4xl">
            In their words.
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <div className="mx-auto flex max-w-4xl items-center gap-3 sm:gap-8">
            <button
              type="button"
              onClick={() => move(-1)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink sm:h-12 sm:w-12"
              aria-label="Previous review"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>

            <div className="min-h-[240px] flex-1 text-center sm:min-h-[230px]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.blockquote
                  key={review.id}
                  initial={{ opacity: 0, x: reduceMotion ? 0 : direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduceMotion ? 0 : direction * -24 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-serif text-[1.4rem] font-light italic leading-relaxed text-ink sm:text-3xl">
                    “{review.quote}”
                  </p>
                  <footer className="mt-7">
                    <p className="text-[10px] uppercase tracking-label text-ink">
                      {review.name}
                    </p>
                    <p className="mt-1 text-[9px] uppercase tracking-label text-ink-muted">
                      {review.meta}
                    </p>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>

              <div className="mt-7 flex items-center justify-center gap-2">
                {testimonials.map((item, dotIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setDirection(dotIndex > index ? 1 : -1);
                      setIndex(dotIndex);
                    }}
                    aria-label={`Show review ${dotIndex + 1}`}
                    aria-current={dotIndex === index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      dotIndex === index ? 'w-7 bg-ink' : 'w-1.5 bg-ink/25 hover:bg-ink/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => move(1)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink sm:h-12 sm:w-12"
              aria-label="Next review"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>

          <p className="mx-auto mt-8 max-w-lg text-center text-[10px] uppercase tracking-label text-ink-muted">
            {reviewsDisclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
