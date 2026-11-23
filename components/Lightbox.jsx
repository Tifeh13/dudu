'use client';

import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

export default function Lightbox({ items, index, onClose, onChange }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const touchStart = useRef(null);
  const reduceMotion = useReducedMotion();
  const item = items[index];

  const goPrev = useCallback(() => {
    onChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onChange]);

  const goNext = useCallback(() => {
    onChange((index + 1) % items.length);
  }, [index, items.length, onChange]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button');
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [goNext, goPrev, onClose]);

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 48) {
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStart.current = null;
  };

  if (!item) return null;

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio image viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] bg-ink/95 backdrop-blur-sm"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-4 py-4 sm:px-8">
          <p className="text-[10px] uppercase tracking-label text-cream-50/70">
            {index + 1} / {items.length} · {item.categoryLabel}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center border border-cream-50/30 text-cream-50 transition-colors hover:border-cream-50 hover:bg-cream-50 hover:text-ink"
            aria-label="Close image viewer"
          >
            <X size={17} strokeWidth={1.5} />
          </button>
        </div>

        <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16">
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center border border-cream-50/25 text-cream-50 transition-colors hover:border-cream-50 hover:bg-cream-50 hover:text-ink sm:left-5"
            aria-label="Previous image"
          >
            <ArrowLeft size={17} strokeWidth={1.5} />
          </button>

          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full max-w-4xl"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-contain"
              priority
            />
          </motion.div>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center border border-cream-50/25 text-cream-50 transition-colors hover:border-cream-50 hover:bg-cream-50 hover:text-ink sm:right-5"
            aria-label="Next image"
          >
            <ArrowRight size={17} strokeWidth={1.5} />
          </button>
        </div>

        <p className="px-6 pb-6 text-center text-[10px] uppercase tracking-label text-cream-50/60">
          Use the arrow keys · swipe on mobile · Esc to close
        </p>
      </div>
    </motion.div>
  );
}
