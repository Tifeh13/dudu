import './globals.css';
import localFont from 'next/font/local';
import { seo } from '@/data/siteData';
import HashScroll from '@/components/HashScroll';
import RefreshOnReturn from '@/components/RefreshOnReturn';

// Self-hosted to keep builds independent of the Google Fonts request.
const serif = localFont({
  src: [
    { path: './fonts/cormorant-garamond.woff2', weight: '300 700', style: 'normal' },
    { path: './fonts/cormorant-garamond-italic.woff2', weight: '300 700', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

const sans = localFont({
  src: [{ path: './fonts/dm-sans.woff2', weight: '300 700', style: 'normal' }],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'sans-serif'],
});

export const metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.title,
    template: '%s | Duduyemi Makeover',
  },
  description: seo.description,
  keywords: seo.keywords,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: seo.siteUrl,
    siteName: 'Duduyemi Makeover',
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: 'Duduyemi Makeover — bridal and event makeup in Lagos and Ibadan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Beauty',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F4F0E8',
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-NG" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <HashScroll />
        <RefreshOnReturn />
        {children}
      </body>
    </html>
  );
}
