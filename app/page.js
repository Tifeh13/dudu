import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import PricingTabs from '@/components/PricingTabs';
import PoliciesBlock from '@/components/PoliciesBlock';
import Portfolio from '@/components/Portfolio';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import BookingSection from '@/components/BookingSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { contact, faqs, seo, services } from '@/data/siteData';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BeautySalon',
      '@id': `${seo.siteUrl}/#business`,
      name: 'Duduyemi Makeover',
      url: seo.siteUrl,
      image: `${seo.siteUrl}${seo.ogImage}`,
      description: seo.description,
      telephone: contact.tel,
      email: contact.email,
      priceRange: '₦₦',
      areaServed: seo.areaServed.map((name) => ({ '@type': 'City', name })),
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lagos',
        addressRegion: 'Lagos',
        addressCountry: 'NG',
      },
      sameAs: contact.socials.filter((social) => social.url).map((social) => social.url),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Makeup services',
        itemListElement: services.map((service, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description,
          },
        })),
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${seo.siteUrl}/#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <PricingTabs />
        <PoliciesBlock />
        <Portfolio />
        <Reviews />
        <FAQ />
        <BookingSection />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        // Structured data is generated from trusted local site data.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
