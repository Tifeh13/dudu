'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { contact, fees, pricing } from '@/data/siteData';
import { formatNaira } from '@/lib/formatNaira';
import Reveal from './Reveal';

const tabs = [
  { id: 'island', label: 'Island', meta: 'Lagos Island · Ikoyi · VI' },
  { id: 'mainland', label: 'Mainland', meta: 'Ikeja · Magodo · Maryland · Ogudu' },
];

export default function PricingTabs() {
  const [active, setActive] = useState('island');
  const reduceMotion = useReducedMotion();
  const table = pricing[active];

  const handleKeyDown = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = active === 'island' ? 'mainland' : 'island';
    setActive(next);
    document.getElementById(`pricing-tab-${next}`)?.focus();
  };

  return (
    <section id="pricing" className="border-t border-line bg-cream-200 py-20 lg:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-5 font-serif text-3xl font-light sm:text-4xl">
              Priced clearly, before you book.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
              Location-based pricing for individual and group appointments. Gele is
              added separately and is never discounted.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-8">
            <div
              role="tablist"
              aria-label="Pricing locations"
              className="grid grid-cols-2 gap-2 rounded-full border border-line bg-cream-50 p-1.5"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  id={`pricing-tab-${tab.id}`}
                  role="tab"
                  type="button"
                  aria-selected={active === tab.id}
                  aria-controls="pricing-panel"
                  tabIndex={active === tab.id ? 0 : -1}
                  onClick={() => setActive(tab.id)}
                  onKeyDown={handleKeyDown}
                  className={`relative rounded-full px-4 py-3 text-[10px] uppercase tracking-label transition-colors duration-300 ${
                    active === tab.id ? 'text-cream-50' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {active === tab.id && (
                    <motion.span
                      layoutId="pricing-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-label text-ink-muted">
              {table.label}
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-8 space-y-5">
            <div className="border-l border-accent/60 pl-4">
              <p className="text-[10px] uppercase tracking-label text-ink">Gele styling</p>
              <p className="mt-1 font-serif text-xl">
                {formatNaira(pricing.gele.pricePerPerson)}{' '}
                <span className="text-sm text-ink-muted">per person</span>
              </p>
              <p className="mt-1 text-xs text-ink-muted">Never discounted, for any group size.</p>
            </div>

            <div className="border-l border-line pl-4">
              <p className="text-[10px] uppercase tracking-label text-ink">
                Five people or more
              </p>
              <p className="mt-1 text-sm text-ink-soft">{pricing.groupFivePlusNote}</p>
              <a
                href={`${contact.whatsappHref}?text=${encodeURIComponent(
                  'Hello Duduyemi Makeover! I would like a custom quotation for a group of five or more.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 border-b border-ink/25 pb-1 text-[10px] uppercase tracking-label hover:border-ink"
              >
                <MessageCircle size={12} strokeWidth={1.5} /> Chat on WhatsApp
              </a>
            </div>

            <div className="border-l border-line pl-4">
              <p className="text-[10px] uppercase tracking-label text-ink">Outside these areas</p>
              <p className="mt-1 text-sm text-ink-soft">{pricing.outsideAreaNote}</p>
            </div>

            <div className="border-l border-line pl-4">
              <p className="text-[10px] uppercase tracking-label text-ink">Additional fees</p>
              <dl className="mt-2 space-y-2 text-sm text-ink-soft">
                <div className="flex items-baseline justify-between gap-3">
                  <dt>
                    Early morning / late evening
                    <span className="ml-1 block text-xs text-ink-muted">
                      ({fees.earlyMorning.windowLabel})
                    </span>
                  </dt>
                  <dd className="shrink-0 font-serif text-base text-ink">
                    {formatNaira(fees.earlyMorning.amount)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt>
                    Express / last-minute
                    <span className="ml-1 text-xs text-ink-muted">
                      (under {fees.express.windowHours} hours)
                    </span>
                  </dt>
                  <dd className="shrink-0 font-serif text-base text-ink">
                    {formatNaira(fees.express.amount)}
                  </dd>
                </div>
              </dl>
              <p className="mt-2 text-xs text-ink-muted">
                Added automatically to your booking estimate when they apply.
              </p>
            </div>

            <div className="border-t border-line pt-4 text-xs leading-relaxed text-ink-muted">
              A {pricing.depositPercentage}% deposit secures your date. Durations are
              estimates and include 30 minutes of gele per person.
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="lg:pt-2">
          <div
            role="tabpanel"
            id="pricing-panel"
            aria-labelledby={`pricing-tab-${active}`}
            className="border border-line bg-cream-50 p-6 sm:p-9"
          >
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-5">
              <div>
                <p className="eyebrow">{table.shortLabel} pricing</p>
                <p className="mt-2 font-serif text-2xl font-light">
                  Makeup, per person
                </p>
              </div>
              <p className="text-[10px] uppercase tracking-label text-accent">
                {active === 'island'
                  ? `${formatNaira(table.discountPerPerson)} off per person`
                  : `${formatNaira(table.discountPerPerson)} off per person`}
              </p>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="hidden grid-cols-[1.1fr_1fr_0.9fr] gap-3 border-b border-line py-3 text-[9px] uppercase tracking-label text-ink-muted sm:grid">
                  <span>People</span>
                  <span className="text-right">Total</span>
                  <span className="text-right">Group saving</span>
                </div>

                {table.tiers.map((tier) => (
                  <div
                    key={tier.people}
                    className="grid grid-cols-[1fr_auto] items-baseline gap-3 border-b border-line/80 py-5 sm:grid-cols-[1.1fr_1fr_0.9fr]"
                  >
                    <div>
                      <p className="font-serif text-lg">
                        {tier.people} {tier.people === 1 ? 'person' : 'people'}
                      </p>
                      <p className="mt-0.5 text-[9px] uppercase tracking-label text-ink-muted">
                        {tier.hours} {tier.hours === 1 ? 'hour' : 'hours'}
                      </p>
                    </div>
                    <p className="text-right font-serif text-[1.4rem] sm:text-2xl">
                      {formatNaira(tier.total)}
                    </p>
                    <p
                      className={`col-span-2 text-right text-[10px] uppercase tracking-label sm:col-span-1 ${
                        tier.discount ? 'text-accent' : 'text-ink-muted/70'
                      }`}
                    >
                      {tier.discount ? `−${formatNaira(tier.discount)}` : 'No discount'}
                    </p>
                  </div>
                ))}

                <div className="mt-6 flex flex-col gap-3 border border-line bg-cream p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-label text-ink">
                      Gele add-on
                    </p>
                    <p className="mt-1 text-xs text-ink-muted">
                      {formatNaira(pricing.gele.pricePerPerson)} per person · added after
                      makeup
                    </p>
                  </div>
                  <p className="font-serif text-xl">
                    +{formatNaira(pricing.gele.pricePerPerson)}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 grid gap-3 text-xs text-ink-soft sm:grid-cols-2">
              <p className="flex gap-2">
                <span className="mt-1.5 h-px w-3 shrink-0 bg-accent" />
                Group discount is applied to makeup only.
              </p>
              <p className="flex gap-2">
                <span className="mt-1.5 h-px w-3 shrink-0 bg-accent" />
                {pricing.depositPercentage}% deposit reserves your date.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
