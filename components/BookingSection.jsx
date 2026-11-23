'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
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
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/lib/buildWhatsAppMessage';
import { formatNaira } from '@/lib/formatNaira';
import { todayISO, validateAll, validateStep } from '@/lib/validation';
import BookingSummary from './BookingSummary';
import Reveal from './Reveal';

const STORAGE_KEY = 'duduyemi-booking-v1';

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
    hint: 'Home service across Lagos and Ibadan. Areas outside the list are quoted individually.',
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
    window.setTimeout(() => setSubmitting(false), 1400);
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
            <label htmlFor="booking-service" className="field-label">
              Service
            </label>
            <select
              id="booking-service"
              className="field"
              value={values.serviceId}
              onChange={(event) => handleService(event.target.value)}
              aria-invalid={Boolean(errors.serviceId)}
              aria-describedby={errors.serviceId ? 'error-serviceId' : undefined}
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} — {service.quoteOnly ? 'price on request' : service.durationLabel}
                </option>
              ))}
            </select>
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
                {group.id === 'other' && values.areaId === 'other' && (
                  <p className="mt-2 text-xs text-ink-muted">
                    Outside-area bookings are quoted individually — send your location
                    on WhatsApp for a price.
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

      case 'date':
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

            <div className="mt-5 space-y-2">
              {isEarlyMorning(values.time) && (
                <div className="flex flex-wrap items-center gap-2 border border-accent/40 bg-cream-50 px-3 py-2.5 text-xs text-ink-soft">
                  <span>
                    Early morning fee {formatNaira(fees.earlyMorning.amount)} applies before{' '}
                    {fees.earlyMorning.before}.
                  </span>
                  <span className="text-[8px] uppercase tracking-label text-accent">
                    Confirm with artist
                  </span>
                </div>
              )}
              {isExpress(values.date, values.time) && (
                <div className="flex flex-wrap items-center gap-2 border border-accent/40 bg-cream-50 px-3 py-2.5 text-xs text-ink-soft">
                  <span>
                    Express booking fee {formatNaira(fees.express.amount)} applies under{' '}
                    {fees.express.windowHours} hours.
                  </span>
                  <span className="text-[8px] uppercase tracking-label text-accent">
                    Confirm with artist
                  </span>
                </div>
              )}
              <p className="text-xs leading-relaxed text-ink-muted">
                Appointments begin at the time you choose. Home-service arrival is
                planned with you beforehand.
              </p>
            </div>
          </div>
        );

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
