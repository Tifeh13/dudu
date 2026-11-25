import { Mail, MapPin, MessageCircle, Music2, Phone, Send, Clock } from 'lucide-react';
import { brand, contact } from '@/data/siteData';
import Reveal from './Reveal';

const whatsappUrl = `${contact.whatsappHref}?text=${encodeURIComponent(
  "Hello Duduyemi Makeover! I'd love to make an enquiry about your makeup services."
)}`;

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-ink py-20 text-cream-50 lg:py-24">
      <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Reveal>
          <p className="text-[10px] uppercase tracking-label text-cream-50/55">Contact</p>
          <h2 className="mt-5 font-serif text-3xl font-normal leading-tight text-cream-50 sm:text-4xl">
            Let&rsquo;s talk about <span className="italic">your date</span>.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-50/70">
            Send the date, location and number of people on WhatsApp and Duduyemi will
            confirm availability, timings and the deposit.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-light mt-8"
          >
            <MessageCircle size={14} strokeWidth={1.6} />
            WhatsApp {contact.whatsappDisplay}
          </a>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] uppercase tracking-label text-cream-50/55">
            <span className="flex items-center gap-2">
              <Clock size={12} strokeWidth={1.5} /> {contact.hours}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={12} strokeWidth={1.5} /> {contact.location}
            </span>
          </div>

          <p className="mt-9 max-w-md border-t border-cream-50/15 pt-6 font-serif text-lg font-normal italic leading-relaxed text-cream-50/80">
            “{brand.tagline}”
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="border-t border-cream-50/15">
            <div className="flex items-start gap-4 border-b border-cream-50/15 py-5">
              <MessageCircle size={16} strokeWidth={1.4} className="mt-1 text-cream-50/50" />
              <div>
                <p className="text-[9px] uppercase tracking-label text-cream-50/45">WhatsApp</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block font-serif text-lg hover:text-accent-soft"
                >
                  {contact.whatsappDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 border-b border-cream-50/15 py-5">
              <Phone size={16} strokeWidth={1.4} className="mt-1 text-cream-50/50" />
              <div>
                <p className="text-[9px] uppercase tracking-label text-cream-50/45">Call</p>
                <a
                  href={`tel:${contact.tel}`}
                  className="mt-1 block font-serif text-lg hover:text-accent-soft"
                >
                  {contact.whatsappDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 border-b border-cream-50/15 py-5">
              <Mail size={16} strokeWidth={1.4} className="mt-1 text-cream-50/50" />
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-label text-cream-50/45">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 block break-words font-serif text-lg hover:text-accent-soft"
                >
                  {contact.email}
                </a>
                <a
                  href={`mailto:${contact.emailAlt}`}
                  className="mt-1 block break-words text-xs text-cream-50/55 hover:text-cream-50"
                >
                  {contact.emailAlt}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 border-b border-cream-50/15 py-5">
              <Music2 size={16} strokeWidth={1.4} className="mt-1 text-cream-50/50" />
              <div>
                <p className="text-[9px] uppercase tracking-label text-cream-50/45">TikTok</p>
                <a
                  href={contact.socials.find((social) => social.id === 'tiktok')?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block font-serif text-lg hover:text-accent-soft"
                >
                  {contact.socials.find((social) => social.id === 'tiktok')?.handle}
                </a>
              </div>
            </div>

            {contact.socials
              .filter((social) => social.id === 'snapchat')
              .map((social) => (
                <div
                  key={social.id}
                  className="flex items-start gap-4 border-b border-cream-50/15 py-5"
                >
                  <Send size={16} strokeWidth={1.4} className="mt-1 text-cream-50/50" />
                  <div>
                    <p className="text-[9px] uppercase tracking-label text-cream-50/45">
                      Snapchat
                    </p>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block font-serif text-lg hover:text-accent-soft"
                    >
                      {social.handle}
                    </a>
                  </div>
                </div>
              ))}

            <div className="flex items-start gap-4 py-5">
              <MapPin size={16} strokeWidth={1.4} className="mt-1 text-cream-50/50" />
              <div>
                <p className="text-[9px] uppercase tracking-label text-cream-50/45">
                  Areas covered
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cream-50/70">
                  {contact.areasCovered.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
