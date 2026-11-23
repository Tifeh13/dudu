'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { contact, faqs } from '@/data/siteData';
import Reveal from './Reveal';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-line bg-cream py-20 lg:py-24">
      <div className="shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-5 font-serif text-3xl font-light sm:text-4xl">
            Good to know.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            Everything about booking, timing and home service. Anything else, ask
            directly on WhatsApp.
          </p>
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-7"
          >
            Ask a question
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="border-t border-line">
            {faqs.map((faq, index) => {
              const open = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;
              return (
                <div key={faq.q} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? -1 : index)}
                      className="flex w-full items-center justify-between gap-5 py-5 text-left transition-colors hover:text-accent"
                    >
                      <span className="font-serif text-lg font-normal leading-snug">
                        {faq.q}
                      </span>
                      <span className="shrink-0 text-ink-muted">
                        {open ? (
                          <Minus size={15} strokeWidth={1.5} />
                        ) : (
                          <Plus size={15} strokeWidth={1.5} />
                        )}
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-6 pr-8 text-[13px] leading-relaxed text-ink-soft">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
