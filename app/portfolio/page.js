import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortfolioGallery from '@/components/PortfolioGallery';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import SiteLink from '@/components/SiteLink';
import { portfolioMedia, seo } from '@/data/siteData';

export const metadata = {
  title: 'Portfolio',
  description:
    'Bridal, traditional and soft glam makeup by Duduyemi Makeover — photographs and films from Lagos and Ibadan.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'Portfolio | Duduyemi Makeover',
    description:
      'Bridal, traditional and soft glam makeup by Duduyemi Makeover — photographs and films.',
    url: `${seo.siteUrl}/portfolio`,
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: 'Duduyemi Makeover portfolio' }],
  },
};

export default function PortfolioPage() {
  const films = portfolioMedia.filter((item) => item.type === 'video').length;
  const images = portfolioMedia.length - films;

  return (
    <>
      <Navbar />
      <main className="pt-[72px] lg:pt-[84px]">
        <section className="border-b border-line bg-cream py-14 lg:py-20">
          <div className="shell">
            <p className="eyebrow">Portfolio</p>
            <h1 className="mt-5 max-w-3xl font-serif text-4xl font-light leading-[1.02] sm:text-5xl lg:text-6xl">
              The full portfolio.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-soft">
              Bridal, traditional and event looks from the studio and on location.
              Photographs open full screen; films play only when you tap them.
            </p>
            <p className="mt-6 text-[10px] uppercase tracking-label text-ink-muted">
              {images} photographs · {films} films · Lagos &amp; Ibadan
            </p>
          </div>
        </section>

        <PortfolioGallery />

        <section className="border-t border-line bg-cream-200 py-14 lg:py-20">
          <div className="shell flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">Your turn</p>
              <h2 className="mt-4 max-w-md font-serif text-3xl font-light">
                Ready for your own look?
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <SiteLink href="/#booking" className="btn-solid">
                Book an appointment
              </SiteLink>
              <SiteLink href="/#services" className="btn-ghost">
                View services
              </SiteLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
