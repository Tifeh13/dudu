'use client';

import { formatNaira } from '@/lib/formatNaira';
import { prettyDate, prettyTime } from '@/lib/buildWhatsAppMessage';
import { bookingSteps, fees } from '@/data/siteData';

function Row({ label, value, sub, accent = false }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-2">
      <dt className="text-[10px] uppercase tracking-[0.14em] text-ink-muted">{label}</dt>
      <dd className={`text-right ${accent ? 'text-accent' : 'text-ink'}`}>
        {value}
        {sub && <span className="ml-1 text-[9px] uppercase tracking-label text-accent">{sub}</span>}
      </dd>
    </div>
  );
}

function EditButton({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-2 border-b border-ink/25 pb-px text-[8px] uppercase tracking-label text-ink-muted transition-colors hover:border-ink hover:text-ink"
    >
      Edit<span className="sr-only"> {label}</span>
    </button>
  );
}

export default function BookingSummary({ values, totals, onEdit }) {
  const index = (id) => bookingSteps.findIndex((step) => step.id === id);
  const service = totals.service;
  const area = totals.area;
  const people = Number(values.people) || 0;
  const gele = totals.geleCount;
  const incomplete = !service || !area;

  const quoteReason =
    service?.quoteOnly
      ? `${service.name} is priced personally around your brief.`
      : Number(people) >= 5
        ? 'Groups of five or more are quoted individually.'
        : area?.zone === 'other'
          ? 'This location is outside the published areas.'
          : 'A few more details are needed before an estimate can be shown.';

  return (
    <aside className="border border-line bg-cream" aria-label="Booking summary">
      <div className="flex items-baseline justify-between border-b border-line px-5 py-4">
        <h3 className="font-serif text-lg font-normal">Your booking</h3>
        <span className="text-[8px] uppercase tracking-label text-ink-muted">
          {incomplete ? 'Draft' : totals.quoteRequired ? 'Quote' : 'Estimate'}
        </span>
      </div>

      <dl className="divide-y divide-line/60 px-5 py-2 text-xs">
        <div className="py-2.5">
          <dt className="text-[9px] uppercase tracking-label text-ink-muted">Service</dt>
          <dd className="mt-1 flex items-baseline justify-between gap-2">
            <span>{service ? service.name : 'Not selected'}</span>
            <EditButton onClick={() => onEdit(index('service'))} label="service" />
          </dd>
        </div>
        <div className="py-2.5">
          <dt className="text-[9px] uppercase tracking-label text-ink-muted">Area</dt>
          <dd className="mt-1 flex items-baseline justify-between gap-2">
            <span>{area ? area.name : 'Not selected'}</span>
            <EditButton onClick={() => onEdit(index('location'))} label="area" />
          </dd>
        </div>
        <div className="py-2.5">
          <dt className="text-[9px] uppercase tracking-label text-ink-muted">People</dt>
          <dd className="mt-1 flex items-baseline justify-between gap-2">
            <span>
              {people}
              {people >= 5 ? '+' : ''} {people === 1 ? 'person' : 'people'} · gele {gele}
            </span>
            <EditButton onClick={() => onEdit(index('people'))} label="people" />
          </dd>
        </div>
        <div className="py-2.5">
          <dt className="text-[9px] uppercase tracking-label text-ink-muted">
            Date and time
          </dt>
          <dd className="mt-1 flex items-baseline justify-between gap-2">
            <span className="text-right">
              {values.date ? prettyDate(values.date) : 'Date not set'}
              {values.time ? `, ${prettyTime(values.time)}` : ''}
            </span>
            <EditButton onClick={() => onEdit(index('date'))} label="date and time" />
          </dd>
        </div>
      </dl>

      {incomplete ? (
        <div className="border-t border-line px-5 py-5">
          <p className="font-serif text-xl font-light">Your estimate appears here.</p>
          <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">
            Choose a service and an area to see the makeup total, deposit and timing.
          </p>
          {service && (
            <p className="mt-4 border-t border-line pt-3 text-[10px] uppercase tracking-label text-ink-muted">
              Estimated duration · {totals.durationLabel}
            </p>
          )}
        </div>
      ) : totals.quoteRequired ? (
        <div className="border-t border-line px-5 py-5">
          <p className="font-serif text-xl font-light">
            {service ? 'Price on request.' : 'Your estimate appears here.'}
          </p>
          {service && (
            <p className="mt-1 font-serif text-sm italic text-accent">
              I&rsquo;ll confirm on WhatsApp.
            </p>
          )}
          <p className="mt-3 text-[11px] leading-relaxed text-ink-muted">{quoteReason}</p>
          {gele > 0 && (
            <p className="mt-2 text-[11px] text-ink-soft">
              Gele for {gele}: {formatNaira(totals.geleSubtotal)} — added to your quote.
            </p>
          )}
          <p className="mt-4 border-t border-line pt-3 text-[10px] uppercase tracking-label text-ink-muted">
            {service ? `Estimated duration · ${totals.durationLabel}` : 'No estimate yet'}
          </p>
        </div>
      ) : (
        <div className="border-t border-line px-5 pb-5 pt-4 text-xs">
          <dl>
            <Row label="Makeup" value={formatNaira(totals.makeupSubtotal)} />
            {totals.groupDiscount > 0 && (
              <Row
                label="Group discount"
                value={`−${formatNaira(totals.groupDiscount)}`}
                accent
              />
            )}
            {totals.geleSubtotal > 0 && (
              <Row label={`Gele × ${gele}`} value={formatNaira(totals.geleSubtotal)} />
            )}
            {totals.earlyMorningFee > 0 && (
              <Row
                label="Early morning"
                value={formatNaira(totals.earlyMorningFee)}
                sub={fees.earlyMorning.requiresConfirmation ? 'Confirm' : undefined}
              />
            )}
            {totals.expressFee > 0 && (
              <Row
                label="Express fee"
                value={formatNaira(totals.expressFee)}
                sub={fees.express.requiresConfirmation ? 'Confirm' : undefined}
              />
            )}
          </dl>

          <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-line pt-4">
            <span className="text-[10px] uppercase tracking-label text-ink-soft">
              Estimated total
            </span>
            <span className="font-serif text-2xl font-light">{formatNaira(totals.total)}</span>
          </div>

          <div className="mt-3 flex items-baseline justify-between gap-3">
            <span className="text-[10px] uppercase tracking-label text-ink-muted">
              Deposit ({totals.depositPercentage}%)
            </span>
            <span className="font-serif text-lg">{formatNaira(totals.deposit)}</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between gap-3">
            <span className="text-[10px] uppercase tracking-label text-ink-muted">
              Estimated duration
            </span>
            <span className="text-right text-xs">{totals.durationLabel}</span>
          </div>

          <p className="mt-4 border-t border-line pt-3 text-[10px] leading-relaxed text-ink-muted">
            Estimated total. Final price confirmed by the artist. Gele is never
            discounted.
          </p>
        </div>
      )}

      {!totals.quoteRequired && totals.geleCount === 0 && (
        <p className="border-t border-line px-5 py-3 text-[10px] uppercase tracking-label text-ink-muted">
          Gele can be added in step 4
        </p>
      )}
    </aside>
  );
}
