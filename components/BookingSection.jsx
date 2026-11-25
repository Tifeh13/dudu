'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  MessageCircle,
} from 'lucide-react';
import {
  areaGroups,
  bookingSteps,
  fees,
  nextSteps,
  peopleOptions,
  pricing,
  serviceById,
  services,
} from '@/data/siteData';
import { calculateTotal, isEarlyMorning, isExpress } from '@/lib/calculateTotal';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  prettyDate,
  prettyTime,
} from '@/lib/buildWhatsAppMessage';
import { formatNaira } from '@/lib/formatNaira';
import { todayISO, validateAll, validateStep } from '@/lib/validation';
import BookingSummary from './BookingSummary';
import Reveal from './Reveal';

const STORAGE_KEY = 'duduyemi-booking-v1';
// Saved after a request has been handed to WhatsApp, so a returning visitor sees
// where their booking stands instead of an empty form.
const RECEIPT_KEY = 'duduyemi-booking-receipt-v1';

const initialValues = {
  serviceId: '',
  areaId: '',
  people: 1,
  geleCount: 0,
  date: '',
  time: '',
  address: '',
  landmark: '',
  name: '',
  phone: '',
  notes: '',
};

const stepCopy = {
  service: {
    title: 'Choose your service',
    hint: 'Each service is tailored to the occasion. Prices are confirmed by location and group size.',
  },
  location: {
    title: 'Where is your appointment?',
    hint: 'Home service across Lagos and Ibadan. Ibadan appointments are quoted individually.',
  },
  people: {
    title: 'How many people?',
    hint: 'Regular makeup takes about one hour per person.',
  },
  gele: {
    title: 'How many need gele?',
    hint: 'Gele styling is added at ₦20,000 per person and is never discounted.',
  },
  date: {
    title: 'Date and start time',
    hint: 'Choose the day of your event and the time you would like makeup to begin.',
  },
  address: {
    title: 'Where should we come to?',
    hint: 'Your full address helps confirm travel and timing for home service.',
  },
  details: {
    title: 'Your details',
    hint: 'Your request opens in WhatsApp so the artist can confirm availability directly.',
  },
};

function readSavedValues() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    const restored = { ...initialValues };
    Object.keys(initialValues).forEach((key) => {
      if (typeof parsed[key] === typeof initialValues[key] || typeof parsed[key] === 'string') {
        restored[key] = parsed[key];
      }
    });
    return restored;
  } catch {
    return null;
  }
}

function readReceipt() {
  try {
    const raw = window.localStorage.getItem(RECEIPT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    // A receipt without its frozen snapshot is incomplete — ignore it.
    if (!parsed.date || !parsed.message || !parsed.dateLabel) return null;
    const appointment = new Date(`${parsed.date}T${parsed.time || '23:59'}:00`);
    // Past appointments are no longer a useful status card.
    if (Number.isNaN(appointment.getTime())) return null;
    if (appointment.getTime() < Date.now() - 24 * 60 * 60 * 1000) {
      window.localStorage.removeItem(RECEIPT_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeReceipt(record) {
  try {
    window.localStorage.setItem(RECEIPT_KEY, JSON.stringify(record));
  } catch {
    /* Storage may be blocked; the status card is a convenience only. */
  }
}

function removeReceipt() {
  try {
    window.localStorage.removeItem(RECEIPT_KEY);
  } catch {
    /* ignore */
  }
}

function FeeRow({ active, title, condition, amount }) {
  return (
    <li
      className={`flex items-start justify-between gap-3 px-3.5 py-3 transition-colors duration-300 ${
        active ? 'bg-cream-100' : ''
      }`}
    >
      <div className="min-w-0">
        <p className={`text-xs ${active ? 'text-ink' : 'text-ink-soft'}`}>{title}</p>
        <p className="mt-0.5 text-[9px] uppercase tracking-label text-ink-muted">
          {condition}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="font-serif text-sm text-ink">+{formatNaira(amount)}</span>
        <span
          className={`text-[8px] uppercase tracking-label ${
            active ? 'text-accent' : 'text-ink-muted/70'
          }`}
        >
          {active ? 'Added' : 'Not applied'}
        </span>
      </div>
    </li>
  );
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="field-error" role="alert">
      {message}
    </p>
  );
}

export default function BookingSection() {
  const [values, setValues] = useState(initialValues);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [hydrated, setHydrated] = useState(false);
  const [restored, setRestored] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const formRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Restore a previous draft (guarded — localStorage can be unavailable).
  useEffect(() => {
    const saved = readSavedValues();
    const hasContent =
      saved &&
      ['serviceId', 'areaId', 'date', 'time', 'address', 'name', 'phone', 'notes'].some(
        (key) => Boolean(saved[key])
      );
    if (hasContent) {
      setValues(saved);
      setRestored(true);
    }
    setReceipt(readReceipt());
    setHydrated(true);
  }, []);

  // Persist the draft. No payment or sensitive data is stored.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      /* Storage may be blocked; the form still works in-session. */
    }
  }, [values, hydrated]);

  // "Book This" buttons elsewhere on the page select a service.
  useEffect(() => {
    const handler = (event) => {
      const serviceId = event.detail?.serviceId;
      if (!serviceId) return;
      const service = serviceById(serviceId);
      setValues((current) => ({
        ...current,
        serviceId,
        geleCount: service?.includesGele
          ? Math.max(1, Number(current.people) || 1)
          : current.geleCount,
      }));
      setErrors({});
      setStep(0);
      setSent(false);
    };
    window.addEventListener('duduyemi:select-service', handler);
    return () => window.removeEventListener('duduyemi:select-service', handler);
  }, []);

  const totals = useMemo(() => calculateTotal(values), [values]);

  const update = useCallback((field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setSent(false);
  }, []);

  const handleService = (serviceId) => {
    const service = serviceById(serviceId);
    setValues((current) => ({
      ...current,
      serviceId,
      geleCount: service?.includesGele
        ? Math.max(1, Number(current.people) || 1)
        : Math.min(current.geleCount, Number(current.people) || 0),
    }));
    setErrors((current) => {
      const next = { ...current };
      delete next.serviceId;
      return next;
    });
    setSent(false);
  };

  const handlePeople = (value) => {
    setValues((current) => ({
      ...current,
      people: value,
      geleCount: Math.min(current.geleCount, value),
    }));
    setErrors((current) => {
      const next = { ...current };
      delete next.people;
      delete next.geleCount;
      return next;
    });
    setSent(false);
  };

  const goToStep = (target) => {
    if (target === step || target < 0 || target >= bookingSteps.length) return;
    if (target > step) {
      for (let index = step; index < target; index += 1) {
        const stepErrors = validateStep(bookingSteps[index].id, values);
        if (Object.keys(stepErrors).length) {
          setErrors(stepErrors);
          return;
        }
      }
    }
    setErrors({});
    setStep(target);
    setSent(false);
  };

  const goNext = () => {
    const stepErrors = validateStep(bookingSteps[step].id, values);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((current) => Math.min(current + 1, bookingSteps.length - 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submitting) return;

    const allErrors = validateAll(values, bookingSteps.map((item) => item.id));
    if (Object.keys(allErrors).length) {
      setErrors(allErrors);
      const firstStep = bookingSteps.findIndex((item) =>
        Object.keys(allErrors).some((field) => field in (stepFieldsByStep[item.id] || {}))
      );
      setStep(firstStep === -1 ? 0 : firstStep);
      return;
    }

    const finalTotals = calculateTotal(values);
    const message = buildWhatsAppMessage(values, finalTotals);
    setSubmitting(true);

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
    setSent(true);
    // Freeze everything that was sent, so later edits, price changes or
    // re-visits can never rewrite what the artist received on WhatsApp.
    const record = {
      sentAt: new Date().toISOString(),
      date: values.date,
      time: values.time,
      dateLabel: prettyDate(values.date),
      timeLabel: prettyTime(values.time),
      serviceName: finalTotals.service?.name || 'Makeup appointment',
      areaName: finalTotals.area?.name || 'To be confirmed',
      people: values.people,
      geleCount: finalTotals.geleCount,
      total: finalTotals.quoteRequired ? null : finalTotals.total,
      deposit: finalTotals.quoteRequired ? null : finalTotals.deposit,
      depositPercentage: finalTotals.depositPercentage,
      message,
    };
    writeReceipt(record);
    setReceipt(record);
    window.setTimeout(() => setSubmitting(false), 1400);
  };

  const reopenWhatsApp = () => {
    if (!receipt?.message) return;
    // The exact message that was sent, not a fresh calculation.
    window.open(
      buildWhatsAppUrl(receipt.message),
      '_blank',
      'noopener,noreferrer'
    );
  };

  const startNewRequest = () => {
    removeReceipt();
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setReceipt(null);
    setValues(initialValues);
    setStep(0);
    setErrors({});
    setSent(false);
    setRestored(false);
  };

  const maxGele = Math.min(Number(values.people) || 1, 5);
  const progress = ((step + 1) / bookingSteps.length) * 100;
  const activeError = Object.values(errors)[0];
  const quote = totals.quoteRequired;

  const stepBody = () => {
    switch (bookingSteps[step].id) {
      case 'service':
        return (
          <div>
            <fieldset
              id="booking-service"
              aria-invalid={Boolean(errors.serviceId)}
              aria-describedby={errors.serviceId ? 'error-serviceId' : undefined}
              tabIndex={-1}
            >
              <legend className="field-label">Service</legend>
              <div
                className={`divide-y divide-line border bg-cream-50 ${
                  errors.serviceId ? 'border-[#8f3a2f]/60' : 'border-line'
                }`}
              >
                {services.map((service) => {
                  const selected = values.serviceId === service.id;
                  return (
                    <label
                      key={service.id}
                      className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-3.5 transition-colors duration-200 focus-within:border-l-2 focus-within:border-l-ink sm:px-5 ${
                        selected
                          ? 'bg-ink text-cream-50'
                          : 'text-ink-soft hover:bg-cream-100 hover:text-ink'
                      }`}
                    >
                      <input
                        type="radio"
                        name="booking-service"
                        value={service.id}
                        checked={selected}
                        onChange={() => handleService(service.id)}
                        className="sr-only"
                      />
                      <span className="font-serif text-base leading-snug sm:text-lg">
                        {service.name}
                      </span>
                      <span
                        className={`flex shrink-0 items-center gap-2 text-[9px] uppercase tracking-label ${
                          selected ? 'text-cream-50/75' : 'text-ink-muted'
                        }`}
                      >
                        {service.quoteOnly ? 'Price on request' : service.durationLabel}
                        {selected && <Check size={13} strokeWidth={2} />}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <FieldError id="error-serviceId" message={errors.serviceId} />
            {totals.service?.quoteOnly && (
              <p className="mt-3 border-l border-accent/50 pl-3 text-xs leading-relaxed text-ink-muted">
                {totals.service.name} is quoted personally so the price reflects your
                brief, group and location.
              </p>
            )}
            {totals.service?.includesGele && (
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                This service includes gele. You can adjust how many people need it in
                step 4.
              </p>
            )}
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6">
            {areaGroups.map((group) => (
              <fieldset key={group.id}>
                <legend className="text-[10px] uppercase tracking-label text-ink">
                  {group.label}
                  <span className="ml-2 normal-case tracking-normal text-ink-muted">
                    {group.note}
                  </span>
                </legend>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {group.areas.map((area) => {
                    const selected = values.areaId === area.id;
                    return (
                      <button
                        key={area.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => update('areaId', area.id)}
                        className={`flex items-center justify-between gap-2 border px-3.5 py-3 text-left text-xs transition-colors duration-300 ${
                          selected
                            ? 'border-ink bg-ink text-cream-50'
                            : 'border-line bg-cream-50 text-ink-soft hover:border-ink hover:text-ink'
                        }`}
                      >
                        <span>{area.name}</span>
                        {selected && <Check size={13} strokeWidth={1.8} />}
                      </button>
                    );
                  })}
                </div>
                {group.id === 'other' &&
                  (values.areaId === 'ibadan' || values.areaId === 'other') && (
                    <p className="mt-2 text-xs text-ink-muted">
                      Ibadan and other locations are quoted individually — send your
                      address on WhatsApp for a price.
                    </p>
                  )}
              </fieldset>
            ))}
            <FieldError id="error-areaId" message={errors.areaId} />
          </div>
        );

      case 'people':
        return (
          <div>
            <div className="grid grid-cols-5 gap-2">
              {peopleOptions.map((option) => {
                const selected = Number(values.people) === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => handlePeople(option.value)}
                    className={`border py-4 font-serif text-xl transition-colors duration-300 ${
                      selected
                        ? 'border-ink bg-ink text-cream-50'
                        : 'border-line bg-cream-50 text-ink-soft hover:border-ink hover:text-ink'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            <FieldError id="error-people" message={errors.people} />
            <div className="mt-5 space-y-2 text-xs leading-relaxed text-ink-muted">
              <p>Regular makeup takes about 1 hour per person.</p>
              {Number(values.people) >= 5 && (
                <p className="border-l border-accent/50 pl-3 text-ink">
                  Groups of five or more are quoted individually. {pricing.groupFivePlusNote}
                </p>
              )}
              {Number(values.people) > 0 && Number(values.people) < 5 && (
                <p>
                  {values.areaId
                    ? `Makeup for this group: ${formatNaira(
                        totals.makeupSubtotal
                      )}${totals.quoteRequired ? ' (price on request)' : ''}`
                    : 'Choose a location to see the group price.'}
                </p>
              )}
            </div>
          </div>
        );

      case 'gele':
        return (
          <div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: maxGele + 1 }, (_, count) => {
                const selected = Number(values.geleCount) === count;
                return (
                  <button
                    key={count}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => update('geleCount', count)}
                    className={`min-w-[64px] border px-4 py-3.5 text-sm transition-colors duration-300 ${
                      selected
                        ? 'border-ink bg-ink text-cream-50'
                        : 'border-line bg-cream-50 text-ink-soft hover:border-ink hover:text-ink'
                    }`}
                  >
                    {count === 0 ? 'None' : count}
                  </button>
                );
              })}
            </div>
            <FieldError id="error-geleCount" message={errors.geleCount} />
            <div className="mt-5 space-y-2 text-xs leading-relaxed text-ink-muted">
              <p>
                Gele is {formatNaira(pricing.gele.pricePerPerson)} per person and is never
                discounted.
              </p>
              {Number(values.geleCount) > 0 && (
                <p className="text-ink">
                  Gele subtotal: {formatNaira(totals.geleSubtotal)} · adds 30 minutes per
                  person.
                </p>
              )}
            </div>
          </div>
        );

      case 'date': {
        const earlyMorning = isEarlyMorning(values.time);
        const express = isExpress(values.time);
        return (
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="booking-date" className="field-label">
                  Event date
                </label>
                <input
                  id="booking-date"
                  type="date"
                  className="field"
                  min={todayISO()}
                  value={values.date}
                  onChange={(event) => update('date', event.target.value)}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? 'error-date' : undefined}
                />
                <FieldError id="error-date" message={errors.date} />
              </div>
              <div>
                <label htmlFor="booking-time" className="field-label">
                  Preferred start time
                </label>
                <input
                  id="booking-time"
                  type="time"
                  className="field"
                  step="900"
                  value={values.time}
                  onChange={(event) => update('time', event.target.value)}
                  aria-invalid={Boolean(errors.time)}
                  aria-describedby={errors.time ? 'error-time' : undefined}
                />
                <FieldError id="error-time" message={errors.time} />
              </div>
            </div>

            <div className="mt-5 border border-line bg-cream-50">
              <p className="border-b border-line px-3.5 py-2.5 text-[9px] uppercase tracking-label text-ink-muted">
                Fees for the time you choose
              </p>
              <ul className="divide-y divide-line">
                <FeeRow
                  active={earlyMorning}
                  title="Early morning start"
                  condition={fees.earlyMorning.windowLabel}
                  amount={fees.earlyMorning.amount}
                />
                <FeeRow
                  active={express}
                  title="Express booking"
                  condition={fees.express.windowLabel}
                  amount={fees.express.amount}
                />
              </ul>
              <p className="border-t border-line px-3.5 py-2.5 text-xs leading-relaxed text-ink-soft">
                {earlyMorning || express ? (
                  <>
                    <span className="text-ink">
                      {formatNaira(
                        (earlyMorning ? fees.earlyMorning.amount : 0) +
                          (express ? fees.express.amount : 0)
                      )}{' '}
                      added
                    </span>{' '}
                    to your total because of the time you chose. It appears in your
                    estimate and the WhatsApp request.
                  </>
                ) : (
                  'No time-based fee applies to the time you have chosen.'
                )}
              </p>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
              Appointments begin at the time you choose. Home-service arrival is
              planned with you beforehand.
            </p>
          </div>
        );
      }

      case 'address':
        return (
          <div>
            <label htmlFor="booking-address" className="field-label">
              Full address
            </label>
            <textarea
              id="booking-address"
              rows={3}
              className="field resize-none"
              placeholder="House number, street, area, city"
              value={values.address}
              onChange={(event) => update('address', event.target.value)}
              aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? 'error-address' : undefined}
            />
            <FieldError id="error-address" message={errors.address} />

            <div className="mt-4">
              <label htmlFor="booking-landmark" className="field-label">
                Nearby landmark <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <input
                id="booking-landmark"
                type="text"
                className="field"
                placeholder="A landmark that will help find you"
                value={values.landmark}
                onChange={(event) => update('landmark', event.target.value)}
              />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
              Home service is available across Lagos and Ibadan. Outside-area
              appointments are quoted before confirmation.
            </p>
          </div>
        );

      case 'details':
      default:
        return (
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="booking-name" className="field-label">
                  Full name
                </label>
                <input
                  id="booking-name"
                  type="text"
                  className="field"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => update('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'error-name' : undefined}
                />
                <FieldError id="error-name" message={errors.name} />
              </div>
              <div>
                <label htmlFor="booking-phone" className="field-label">
                  Phone number
                </label>
                <input
                  id="booking-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="0708 371 6694"
                  className="field"
                  value={values.phone}
                  onChange={(event) => update('phone', event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'error-phone' : undefined}
                />
                <FieldError id="error-phone" message={errors.phone} />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="booking-notes" className="field-label">
                Additional notes <span className="normal-case tracking-normal">(optional)</span>
              </label>
              <textarea
                id="booking-notes"
                rows={4}
                className="field resize-none"
                placeholder="Inspiration, skin concerns, timings, or anything the artist should know."
                value={values.notes}
                onChange={(event) => update('notes', event.target.value)}
                aria-invalid={Boolean(errors.notes)}
                aria-describedby={errors.notes ? 'error-notes' : undefined}
              />
              <FieldError id="error-notes" message={errors.notes} />
            </div>

            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              No payment is taken on this website. Sending this request does not
              confirm your appointment.
            </p>
          </div>
        );
    }
  };

  return (
    <section id="booking" className="border-t border-line bg-cream-50 py-20 lg:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Booking</p>
          <h2 className="mt-5 font-serif text-3xl font-light sm:text-4xl">
            Request your appointment.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Seven short steps, then your request opens in WhatsApp with every detail
            ready to send. Duduyemi confirms availability and shares deposit details
            personally.
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.4fr_0.85fr] lg:gap-10">
          <Reveal className="min-w-0">
            {receipt && (
              <div className="mb-4 bg-ink text-cream-50">
                <div className="px-5 py-5 sm:px-8">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="flex items-center gap-2 text-[9px] uppercase tracking-label text-cream-50/70">
                      <CheckCircle2 size={13} strokeWidth={1.6} /> Request sent
                    </p>
                    <span className="border border-cream-50/30 px-2 py-1 text-[8px] uppercase tracking-label text-cream-50/80">
                      Awaiting confirmation
                    </span>
                  </div>
                  <p className="mt-3 font-serif text-2xl font-light">
                    Your request is with Duduyemi.
                  </p>
                  <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
                    <div>
                      <dt className="text-[8px] uppercase tracking-label text-cream-50/60">
                        Service
                      </dt>
                      <dd className="mt-1">
                        {receipt.serviceName} · {receipt.areaName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[8px] uppercase tracking-label text-cream-50/60">
                        Appointment
                      </dt>
                      <dd className="mt-1">
                        {receipt.dateLabel}
                        {receipt.timeLabel ? `, ${receipt.timeLabel}` : ''}
                      </dd>
                    </div>
                    {receipt.total !== null && (
                      <div>
                        <dt className="text-[8px] uppercase tracking-label text-cream-50/60">
                          Estimate at the time
                        </dt>
                        <dd className="mt-1">
                          {formatNaira(receipt.total)} · deposit{' '}
                          {formatNaira(receipt.deposit)}
                        </dd>
                      </div>
                    )}
                  </dl>
                  <p className="mt-4 text-xs leading-relaxed text-cream-50/75">
                    Sent {prettyDate(receipt.sentAt.slice(0, 10))} from this device.
                    These details are fixed at the moment you sent them. Duduyemi
                    replies on WhatsApp, and your date is secured once the{' '}
                    {receipt.depositPercentage}% deposit has been received — so keep
                    the message thread open until she confirms.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={reopenWhatsApp}
                      className="inline-flex items-center gap-2 border border-cream-50/40 px-4 py-2.5 text-[9px] uppercase tracking-label transition-colors hover:bg-cream-50 hover:text-ink"
                    >
                      <MessageCircle size={13} strokeWidth={1.6} /> Reopen WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={startNewRequest}
                      className="text-[9px] uppercase tracking-label text-cream-50/70 underline-offset-4 transition-colors hover:text-cream-50 hover:underline"
                    >
                      Start a new request
                    </button>
                  </div>
                </div>
              </div>
            )}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="border border-line bg-cream"
            >
              <div className="flex items-center justify-between px-5 py-4 sm:px-8">
                <p className="text-[10px] uppercase tracking-label text-ink-muted">
                  Step {step + 1} of {bookingSteps.length}
                </p>
                <p className="text-[10px] uppercase tracking-label text-accent">
                  {bookingSteps[step].label}
                </p>
              </div>
              <div className="h-px w-full bg-line">
                <motion.div
                  className="h-px bg-ink"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              <ol className="hidden gap-1 overflow-x-auto border-b border-line px-5 py-3 sm:flex sm:px-8">
                {bookingSteps.map((item, index) => {
                  const active = index === step;
                  const complete = index < step;
                  return (
                    <li key={item.id} className="flex-1">
                      <button
                        type="button"
                        onClick={() => goToStep(index)}
                        aria-current={active ? 'step' : undefined}
                        className={`flex w-full items-center gap-1.5 py-1 text-left text-[8px] uppercase tracking-[0.14em] transition-colors ${
                          active ? 'text-ink' : complete ? 'text-ink-soft' : 'text-ink-muted/60'
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[8px] ${
                            active
                              ? 'border-ink bg-ink text-cream-50'
                              : complete
                                ? 'border-ink/40 text-ink'
                                : 'border-line text-ink-muted'
                          }`}
                        >
                          {complete ? <Check size={9} strokeWidth={2} /> : index + 1}
                        </span>
                        <span className="hidden truncate lg:inline">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="px-5 py-7 sm:px-8 sm:py-9">
                {activeError && (
                  <p className="mb-5 flex items-start gap-2 border border-[#8f3a2f]/30 bg-[#8f3a2f]/5 px-3 py-2.5 text-xs text-[#8f3a2f]">
                    <AlertCircle size={14} strokeWidth={1.6} className="mt-0.5 shrink-0" />
                    Please check the highlighted fields below.
                  </p>
                )}

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={bookingSteps[step].id}
                    initial={{ opacity: 0, x: reduceMotion ? 0 : 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reduceMotion ? 0 : -14 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="font-serif text-2xl font-light">
                      {stepCopy[bookingSteps[step].id].title}
                    </h3>
                    <p className="mb-6 mt-2 max-w-lg text-xs leading-relaxed text-ink-muted">
                      {stepCopy[bookingSteps[step].id].hint}
                    </p>
                    {stepBody()}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-5 sm:px-8">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={step === 0}
                  className="btn-ghost disabled:border-line disabled:text-ink-muted"
                >
                  <ArrowLeft size={13} strokeWidth={1.6} /> Back
                </button>

                {step < bookingSteps.length - 1 ? (
                  <button type="button" onClick={goNext} className="btn-solid">
                    Continue <ArrowRight size={13} strokeWidth={1.6} />
                  </button>
                ) : (
                  <button type="submit" className="btn-solid" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Opening WhatsApp
                      </>
                    ) : (
                      <>
                        <MessageCircle size={14} strokeWidth={1.6} /> Send booking request
                      </>
                    )}
                  </button>
                )}
              </div>

              {sent && (
                <div className="border-t border-line bg-cream-100 px-5 py-4 text-xs leading-relaxed text-ink-soft sm:px-8">
                  Your request has been prepared in WhatsApp. Send the message there to
                  reach the artist — your appointment is confirmed only after Duduyemi
                  replies and the {pricing.depositPercentage}% deposit is received.
                </div>
              )}
            </form>

            {restored && (
              <p className="mt-3 text-[10px] uppercase tracking-label text-ink-muted">
                Your previous selections were restored on this device.
              </p>
            )}
          </Reveal>

          <Reveal delay={0.08} className="lg:sticky lg:top-28">
            <BookingSummary values={values} totals={totals} onEdit={goToStep} />
            <div className="mt-4 border border-line bg-cream px-5 py-4 text-[11px] leading-relaxed text-ink-muted">
              Sending a WhatsApp request does not secure your date. Payment is arranged
              directly with the artist — never on this website.
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16 border-t border-line pt-10">
          <p className="eyebrow">What happens next</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {nextSteps.map((item, index) => (
              <div key={item.title} className="border-l border-line pl-5">
                <p className="font-serif text-lg text-accent">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 font-serif text-lg font-normal">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const stepFieldsByStep = {
  service: { serviceId: true },
  location: { areaId: true },
  people: { people: true },
  gele: { geleCount: true },
  date: { date: true, time: true },
  address: { address: true },
  details: { name: true, phone: true, notes: true },
};
