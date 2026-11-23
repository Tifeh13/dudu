# Duduyemi Makeover

A one-page website and WhatsApp booking platform for Duduyemi Makeover, a makeup
artist working across Lagos and Ibadan.

Next.js (App Router) · React (JavaScript) · Tailwind CSS · Framer Motion ·
next/font · next/image · Lucide.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run the production build
```

No environment variables, database, backend or payment provider are required.
The booking flow builds a WhatsApp message and opens it in a new tab.

## Project structure

```
app/            layout, landing page, /portfolio page, global styles, fonts,
                icons, sitemap, robots, manifest
components/     page sections, portfolio gallery and media lightbox
data/siteData.js  all business information, services, pricing, policies, copy
lib/            pricing calculation, validation, WhatsApp message, formatting
public/images/  brand, hero, about, gallery, film posters, social sharing
public/media/   portfolio films (MP4)
```

### Pages

- `/` — the landing page: hero, about, services, pricing, policies, featured
  portfolio, reviews, FAQ, booking and contact.
- `/portfolio` — the full gallery of photographs and films, filterable, with a
  full-screen viewer. Films only download when a visitor presses play.

## Replace the logo

The header and footer both show your supplied logo. Replace this file to rebrand
(the social-sharing image is separate, in `public/images/og/`):

| File | Purpose | Size |
| --- | --- | --- |
| `public/images/brand/logo.png` | Logo in the header and footer | 1000 × 1032, transparent |
| `app/icon.png` | App icon | 512 × 512 |
| `app/apple-icon.png` | iOS icon | 180 × 180 |
| `app/favicon.ico` | Browser favicon (16, 32, 48) | multi-size ICO |
| `public/images/brand/manifest-192.png` | Web manifest icon | 192 × 192 |
| `public/images/brand/manifest-512.png` | Web manifest icon | 512 × 512 |

The icon files are a cream “DM” monogram on ink, drawn from the logo's letters so
the mark stays legible at 16px in a browser tab. Regenerate them together if the
brand letters change — the favicon needs the 16, 32 and 48px frames.

`public/images/og/og-image.jpg` is the 1200 × 630 social preview.

## Replace portfolio photographs

1. Drop new images into `public/images/gallery/` (JPG or WebP recommended).
2. Update the matching entry in the `portfolio` array in `data/siteData.js`:
   `src`, `alt`, `category` (`bridal`, `traditional`, `soft-glam` or `party`),
   `categoryLabel`, `width` and `height`.
3. To add a look, copy an existing entry and change its `id` and `src`.
4. The hero image uses `public/images/gallery/traditional-1.jpg`; the artist and
   award photographs live in `public/images/about/`.

## Add or replace films

1. Put the MP4 in `public/media/` (H.264, ideally 720p or smaller).
2. Export a poster frame to `public/images/portfolio/video/` (JPG, portrait
   aspect matching the clip).
3. Add an entry to `portfolioVideos` in `data/siteData.js`: `src`, `poster`,
   `alt`, `duration`, `category`, `categoryLabel`, `width` and `height`.
4. Films are never downloaded with the page: the gallery shows the poster and
   the video loads only when opened. Keep clips short and compressed.

`portfolioMedia` combines both lists and is what `/portfolio` renders.

## Update prices

Everything lives in `pricing` in `data/siteData.js`:

- `island` and `mainland` hold `individual`, `discountPerPerson` and four `tiers`.
- Each tier stores `makeupSubtotal`, `discount` and `total` exactly as published.
- `gele.pricePerPerson` is added separately and never discounted.
- `depositPercentage` controls the deposit shown in the summary and messages.
- `fees.earlyMorning` and `fees.express` hold the amounts and thresholds.

**CONFIRM:** Mainland 4 people is stored as ₦340,000 − ₦24,000 = ₦316,000 because
that is the published total, but 4 × ₦80,000 − ₦24,000 = ₦296,000. Update the
tier once the artist confirms.

Quote-only services are marked with `quoteOnly: true`. Switch a service to
location pricing by changing that flag only.

## Update contact and social details

Edit `contact` in `data/siteData.js`: WhatsApp display/international numbers,
`whatsappHref`, telephone, email addresses, location, areas and `socials`.
The booking message uses `whatsappHref` from the same file.

No Instagram handle was supplied, so none is displayed. The Snapchat link is
derived from the supplied display name (`baddestmakeupartist`) — replace
`contact.socials` in `data/siteData.js` if the actual username is different.

## Deploy to Vercel

1. Push the project to a Git repository.
2. Import it in Vercel — the Next.js defaults work, no extra configuration.
3. Set the real domain in `seo.siteUrl` (`data/siteData.js`) before going live so
   the canonical URL, sitemap, robots file and Open Graph URL are correct.
4. Optional: add the same domain to the Vercel project settings.

## Placeholders and items to confirm

1. **Tagline** — chosen from three options; replace with the artist's own.
2. **Biography and about copy** — drafted professionally; no years of experience,
   awards or client counts are claimed. Review and personalise.
3. **Snapchat** — display name only; no username or URL was supplied.
4. **Mainland group of 4** — CONFIRM ₦316,000 vs ₦296,000.
5. **Early morning fee** — ₦5,000 before 9:00 AM, labelled CONFIRM WITH ARTIST.
6. **Express fee** — ₦10,000 under 24 hours, labelled CONFIRM WITH ARTIST.
7. **Cancellation policy** — awaiting artist wording (FAQ also flags this).
8. **Lateness policy** — awaiting artist wording.
9. **Deposit refund policy** — awaiting artist wording.
10. **Testimonials** — sample copy only, visibly labelled in the reviews section.
11. **Domain** — `seo.siteUrl` is a placeholder until the real domain is set.
12. **More portfolio photographs** — four looks are included; add the rest as
    described above.
