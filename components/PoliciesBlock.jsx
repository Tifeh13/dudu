import { contact, hasPaymentDetails, payment, policies, pricing } from '@/data/siteData';
import { formatNaira } from '@/lib/formatNaira';
import Reveal from './Reveal';

export default function PoliciesBlock() {
  return (
    <section className="border-t border-line bg-cream py-20 lg:py-24">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Booking policies</p>
          <h2 className="mt-5 font-serif text-3xl font-normal sm:text-4xl">
            Before you book.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            A few practical details that keep the day calm for everyone. Terms are
            confirmed with you on WhatsApp before a date is secured.
          </p>
          <div className="mt-7 border border-line bg-cream-50 p-5">
            <p className="text-[10px] uppercase tracking-label text-accent">Deposit</p>
            <p className="mt-2 font-serif text-xl font-normal">
              {pricing.depositPercentage}% secures your appointment.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Your date is secured only after the deposit is received and confirmed.
            </p>

            <div className="mt-4 border-t border-line pt-4">
              <p className="text-[10px] uppercase tracking-label text-ink-muted">
                Bank transfer
              </p>
              {hasPaymentDetails ? (
                <dl className="mt-2 space-y-1.5 text-xs text-ink-soft">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt>Bank</dt>
                    <dd className="text-right text-ink">{payment.bankName}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt>Account name</dt>
                    <dd className="text-right text-ink">{payment.accountName}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <dt>Account number</dt>
                    <dd className="text-right font-serif text-base text-ink">
                      {payment.accountNumber}
                    </dd>
                  </div>
                </dl>
              ) : (
                <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                  Transfer details are shared on WhatsApp with your deposit
                  confirmation.
                </p>
              )}
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                {payment.note}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ol className="border-t border-line">
            {policies.map((policy, index) => (
              <li
                key={policy.id}
                className="flex gap-4 border-b border-line py-5 sm:gap-6"
              >
                <span className="w-6 shrink-0 pt-1 text-[9px] uppercase tracking-label text-ink-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-serif text-lg font-normal">{policy.title}</h3>
                    {policy.confirm && (
                      <span className="border border-accent/40 px-2 py-1 text-[8px] uppercase tracking-label text-accent">
                        {policy.confirm}
                      </span>
                    )}
                    {policy.pending && (
                      <span className="border border-ink-muted/30 px-2 py-1 text-[8px] uppercase tracking-label text-ink-muted">
                        Awaiting confirmation
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                    {policy.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-[10px] uppercase tracking-label text-ink-muted">
            Questions about a policy?{' '}
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-ink/30 pb-0.5 text-ink"
            >
              {contact.whatsappDisplay}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
