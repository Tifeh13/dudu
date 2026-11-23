import { services } from '@/data/siteData';
import BookServiceButton from './BookServiceButton';
import Reveal from './Reveal';

export default function Services() {
  return (
    <section id="services" className="border-t border-line bg-cream py-20 lg:py-28">
      <div className="shell">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Services</p>
          <h2 className="mt-5 font-serif text-3xl font-light sm:text-4xl">
            Looks designed around you.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            From bridal mornings to last-minute celebrations — every service begins
            with a conversation about your outfit, your venue and the finish you
            want.
          </p>
        </Reveal>

        <div className="mt-14 border-t border-line">
          <div className="grid sm:grid-cols-2">
            {services.map((service, index) => (
              <Reveal
                key={service.id}
                delay={(index % 2) * 0.06}
                className={`flex h-full flex-col border-b border-line px-6 py-9 sm:px-8 lg:px-10 lg:py-11 ${
                  index % 2 === 0 ? 'sm:border-r' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[9px] uppercase tracking-label text-ink-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-label text-accent">
                    {service.quoteOnly ? 'Price on request' : 'Location pricing'}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-xl font-normal uppercase tracking-[0.08em] sm:text-[1.4rem]">
                  {service.name}
                </h3>
                <p className="mt-2 font-serif text-sm italic text-ink-muted">
                  {service.durationLabel}
                </p>
                <p className="mt-4 text-[13px] leading-relaxed text-ink-soft">
                  {service.description}
                </p>

                <div className="mt-auto pt-6">
                  <BookServiceButton serviceId={service.id} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-label text-ink-muted">
          Home service across Lagos &amp; Ibadan · By appointment
        </p>
      </div>
    </section>
  );
}
