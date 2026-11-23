import { seo } from '@/data/siteData';

export default function manifest() {
  return {
    name: 'Duduyemi Makeover',
    short_name: 'Duduyemi',
    description: seo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F4F0E8',
    theme_color: '#F4F0E8',
    lang: 'en-NG',
    categories: ['beauty', 'lifestyle'],
    icons: [
      {
        src: '/images/brand/manifest-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/brand/manifest-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/brand/manifest-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
