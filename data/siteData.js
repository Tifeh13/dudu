/**
 * DUDUYEMI MAKEOVER — central site data.
 * ---------------------------------------------------------------------------
 * Everything the website displays or calculates lives here: brand details,
 * contact information, services, pricing, policies, gallery, testimonials,
 * FAQs and SEO metadata.
 *
 * Things marked PLACEHOLDER or CONFIRM still need the artist's confirmation.
 * See the PLACEHOLDERS section at the bottom of this file for the full list.
 */

export const brand = {
  name: 'Duduyemi Makeover',
  shortName: 'Duduyemi',
  initials: 'DM',
  logo: '/images/brand/logo.png',
  // PLACEHOLDER (tagline): three options supplied below — the strongest is in use.
  tagline: 'Beauty, made personal.',
  taglineOptions: [
    'Beauty, made personal.',
    'The art of a flawless finish.',
    'Your face, in its finest light.',
  ],
  descriptor: ['Bridal', 'Soft Glam', 'Traditional', 'Home Service'],
  locationLine: 'Lagos & Ibadan · Home service by appointment',
  // PLACEHOLDER (bio): drafted from the services offered; no qualifications,
  // awards, years of experience or review counts have been invented.
  shortBio:
    'Duduyemi Makeover is a Lagos and Ibadan based makeup artist and bridal specialist, creating soft, luminous looks for brides, traditional ceremonies and celebrations.',
  bio: [
    'Duduyemi Makeover began with a simple belief: makeup should look like the best version of you, never like a mask. Every face is studied before the first product is placed — skin tone and undertone, the shape of the eye, the weight of the fabric, the light in the room.',
    'The result is a finish that reads beautifully in person and photographs just as well: skin that looks like skin, colour that flatters, and details that hold from the first photograph to the last dance. Services are offered from the studio or brought to your home, hotel or venue across Lagos and Ibadan.',
  ],
  approach: [
    'A considered consultation before any makeup is applied.',
    'Long-wearing, photograph-friendly products and finishes.',
    'Looks built around your outfit, your venue and your comfort.',
  ],
  // PLACEHOLDER (founder copy): written from the services offered and the
  // artist's own working approach. No years of experience, awards, client
  // counts or qualifications have been invented — the artist should read it
  // once and personalise any detail she wants to add.
  founder: {
    name: 'Duduyemi',
    role: 'Founder & Creative Director',
    quote: 'The goal is never a different face. It is your face, in its finest light.',
    story: [
      'Duduyemi is the founder and creative director of Duduyemi Makeover, the Lagos and Ibadan studio she built around a single conviction: makeup should look like the best, most rested version of you — never like a mask.',
      'Her work begins before the first product is opened. Skin tone and undertone, the shape of the eye, the weight and colour of the fabric, the light the day will be photographed in — all of it is studied first, and the look is built to belong to that face and that occasion rather than to a trend.',
      'It is the same standard whether she is preparing a bride for the morning of her wedding, tying gele for a traditional ceremony, or finishing a quiet soft glam before a birthday dinner. Brides are offered a trial so nothing is left to chance, and every appointment is paced so the finish still looks fresh in the last photograph of the night.',
      'As creative director she keeps the experience personal from start to finish: the consultation, the colour decisions, the final check in the mirror. That care travels with her — to the studio, and to your home, hotel or venue across Lagos and Ibadan.',
    ],
  },
  // PLACEHOLDER (about copy): no years of experience, awards or client counts
  // are claimed anywhere on the site.
  homeServiceNote: 'Home service across Lagos & Ibadan.',
};

export const contact = {
  whatsappDisplay: '0708 371 6694',
  whatsappInternational: '2347083716694',
  whatsappHref: 'https://wa.me/2347083716694',
  tel: '+2347083716694',
  email: 'duduyemimakeover@yahoo.com',
  // Secondary address supplied by the artist.
  emailAlt: 'kaosaratopeyemi@yahoo.com',
  location: 'Lagos & Ibadan, Nigeria',
  areasCovered: [
    'Lagos Island',
    'Ikoyi',
    'Victoria Island',
    'Ikeja',
    'Magodo',
    'Maryland',
    'Ogudu GRA',
    'Ibadan',
    'Other locations by quotation',
  ],
  // Instagram and email were requested to be removed from the first draft, but
  // an email address was supplied afterwards, so it is included. No Instagram
  // handle was supplied, so none is shown.
  socials: [
    {
      id: 'tiktok',
      label: 'TikTok',
      handle: '@Duduyemi_Makeover',
      url: 'https://www.tiktok.com/@duduyemi_makeover',
    },
    {
      id: 'snapchat',
      label: 'Snapchat',
      handle: 'Baddest makeup artist',
      // CONFIRM: no Snapchat username was supplied. The link is derived from the
      // display name; replace it with the exact profile URL if it differs.
      url: 'https://www.snapchat.com/add/baddestmakeupartist',
    },
  ],
  hours: 'By appointment only',
};

export const whatsappMessages = {
  general:
    "Hello Duduyemi Makeover! I'd love to make an enquiry about your makeup services.",
  quote:
    'Hello Duduyemi Makeover! I would like a custom quotation for my appointment.',
};

/** Navigation — single landing page, anchor links. */
export const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Contact', href: '/#contact' },
];

/** ---------------------------------------------------------------------------
 * SERVICES
 * quoteOnly: true  → price is confirmed personally (bridal, traditional,
 *                    introduction, bridal trials, training).
 * quoteOnly: false → priced from the location tables below.
 * Changing a service from quote-only to priced needs only this file.
 * ------------------------------------------------------------------------- */
export const services = [
  {
    id: 'bridal-makeup',
    name: 'Bridal Makeup',
    description:
      'A considered bridal look built around your dress, your venue and the light — long-wearing, photograph-ready and finished with a soft, luminous touch.',
    durationMinutes: 120,
    durationLabel: '2 hours',
    quoteOnly: true,
    includesGele: false,
    featured: true,
  },
  {
    id: 'traditional-wedding',
    name: 'Traditional Wedding Makeup',
    description:
      'Rich, celebratory glamour for the traditional ceremony — defined eyes, sculpted skin and a finish that holds through every greeting and photograph.',
    durationMinutes: null,
    durationLabel: 'Duration confirmed on enquiry',
    quoteOnly: true,
    includesGele: false,
    featured: true,
  },
  {
    id: 'introduction-makeup',
    name: 'Introduction Makeup',
    description:
      'Understated elegance for your introduction — polished, personal and designed to feel entirely like you.',
    durationMinutes: null,
    durationLabel: 'Duration confirmed on enquiry',
    quoteOnly: true,
    includesGele: false,
  },
  {
    id: 'birthday-makeup',
    name: 'Birthday Makeup',
    description:
      'A birthday look with presence: radiant skin, a defined eye and a finish that carries from dinner to the last photograph.',
    durationMinutes: 60,
    durationLabel: '1 hour',
    quoteOnly: false,
    includesGele: false,
  },
  {
    id: 'party-event',
    name: 'Party & Event Makeup',
    description:
      'Occasion-ready glamour for weddings, dinners and celebrations, tailored to your outfit and the mood of the evening.',
    durationMinutes: 60,
    durationLabel: '1 hour',
    quoteOnly: false,
    includesGele: false,
  },
  {
    id: 'soft-glam',
    name: 'Soft Glam',
    description:
      'Soft, blended and luminous — polished skin, a gentle wash of colour and lashes that open the eye without overwhelming it.',
    durationMinutes: 60,
    durationLabel: '1 hour',
    quoteOnly: false,
    includesGele: false,
    featured: true,
  },
  {
    id: 'makeup-and-gele',
    name: 'Makeup & Gele',
    description:
      'A complete look, from base to beautifully tied gele, styled to sit in proportion with your outfit and headpiece.',
    durationMinutes: 90,
    durationLabel: '1 hour 30 minutes',
    quoteOnly: false,
    includesGele: true,
  },
  {
    id: 'bridal-trial',
    name: 'Bridal Trials',
    description:
      'A private session to shape your bridal look before the day — testing tones, textures and longevity together.',
    durationMinutes: 90,
    durationLabel: '1 hour 30 minutes',
    quoteOnly: true,
    includesGele: false,
  },
  {
    id: 'home-service',
    name: 'Home-Service Makeup',
    description:
      'The full studio experience brought to you, at home or at your venue, across Lagos and Ibadan.',
    durationMinutes: 60,
    durationLabel: '1 hour',
    quoteOnly: false,
    includesGele: false,
  },
  {
    id: 'makeup-training',
    name: 'Makeup Training',
    description:
      'One-to-one or small-group guidance on technique, product and finishing — for artists and enthusiasts alike.',
    durationMinutes: null,
    durationLabel: 'Duration confirmed on enquiry',
    quoteOnly: true,
    includesGele: false,
  },
];

export const serviceById = (id) => services.find((service) => service.id === id) || null;

/** ---------------------------------------------------------------------------
 * AREAS
 * Island and Mainland use the published location pricing.
 * "Other" and any area outside the lists require a custom quotation.
 * ------------------------------------------------------------------------- */
export const areaGroups = [
  {
    id: 'island',
    label: 'Island',
    note: 'Lagos Island · Ikoyi · Victoria Island',
    areas: [
      { id: 'lagos-island', name: 'Lagos Island', zone: 'island' },
      { id: 'ikoyi', name: 'Ikoyi', zone: 'island' },
      { id: 'victoria-island', name: 'Victoria Island', zone: 'island' },
    ],
  },
  {
    id: 'mainland',
    label: 'Mainland',
    note: 'Ikeja · Magodo · Maryland · Ogudu GRA',
    areas: [
      { id: 'ikeja', name: 'Ikeja', zone: 'mainland' },
      { id: 'magodo', name: 'Magodo', zone: 'mainland' },
      { id: 'maryland', name: 'Maryland', zone: 'mainland' },
      { id: 'ogudu-gra', name: 'Ogudu GRA', zone: 'mainland' },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    note: 'Ibadan and every other location',
    areas: [{ id: 'other', name: 'Any other location', zone: 'other' }],
  },
];

export const areas = areaGroups.flatMap((group) => group.areas);

export const areaById = (id) => areas.find((area) => area.id === id) || null;

/** ---------------------------------------------------------------------------
 * PRICING
 * Totals are exactly as supplied by the artist. Group discounts are separate
 * line items so the booking summary can show the saving clearly.
 *
 * CONFIRM: 4 x 80,000 = 320,000, so this may be 296,000 (Mainland 4 people).
 * The published figure of ₦316,000 has been kept until the artist confirms.
 * ------------------------------------------------------------------------- */
export const pricing = {
  depositPercentage: 70,
  gele: {
    pricePerPerson: 20000,
    label: 'Gele styling',
    note: '₦20,000 per person. Gele is never discounted.',
  },
  discountNote: 'Group discount is applied to makeup only — never to gele.',
  outsideAreaNote:
    'Appointments outside Lagos Island, Ikoyi, Victoria Island, Ikeja, Magodo, Maryland and Ogudu GRA are quoted individually.',
  groupFivePlusNote: 'Custom quote — contact us on WhatsApp.',
  island: {
    id: 'island',
    label: 'Lagos Island / Ikoyi / Victoria Island',
    shortLabel: 'Island',
    individual: 110000,
    discountPerPerson: 8000,
    tiers: [
      { people: 1, makeupSubtotal: 110000, discount: 0, total: 110000, hours: 1 },
      { people: 2, makeupSubtotal: 220000, discount: 16000, total: 204000, hours: 2 },
      { people: 3, makeupSubtotal: 330000, discount: 24000, total: 306000, hours: 3 },
      { people: 4, makeupSubtotal: 440000, discount: 32000, total: 408000, hours: 4 },
    ],
  },
  mainland: {
    id: 'mainland',
    label: 'Mainland — Ikeja / Magodo / Maryland / Ogudu GRA',
    shortLabel: 'Mainland',
    individual: 80000,
    discountPerPerson: 6000,
    tiers: [
      { people: 1, makeupSubtotal: 80000, discount: 0, total: 80000, hours: 1 },
      { people: 2, makeupSubtotal: 160000, discount: 12000, total: 148000, hours: 2 },
      { people: 3, makeupSubtotal: 240000, discount: 18000, total: 222000, hours: 3 },
      // CONFIRM: 4 x 80,000 = 320,000, so this may be 296,000.
      // Published total of ₦316,000 retained pending confirmation.
      { people: 4, makeupSubtotal: 340000, discount: 24000, total: 316000, hours: 4 },
    ],
  },
  durations: {
    regularPerPersonMinutes: 60,
    gelePerPersonMinutes: 30,
  },
};

/** ---------------------------------------------------------------------------
 * FEES — thresholds and amounts are configurable here.
 * ------------------------------------------------------------------------- */
export const fees = {
  // Out-of-hours fee: appointments starting between 7:00 AM and 8:59 AM, or
  // from 9:00 PM onwards. `from`/`before`/`lateFrom` drive the calculation;
  // `windowLabel` is the human-readable version used across the site (keep the
  // two in step when changing the windows).
  earlyMorning: {
    amount: 5000,
    from: '07:00',
    before: '09:00',
    lateFrom: '21:00',
    windowLabel: 'between 7:00 and 8:59 AM, or from 9:00 PM',
    label: 'Early morning / late evening fee',
    description:
      'Appointments starting between 7:00 AM and 8:59 AM, or from 9:00 PM onwards.',
    requiresConfirmation: true, // displays "CONFIRM WITH ARTIST"
  },
  express: {
    amount: 10000,
    windowHours: 24,
    label: 'Express booking fee',
    description: 'Bookings made less than 24 hours before the appointment.',
    requiresConfirmation: true, // displays "CONFIRM WITH ARTIST"
  },
};

/** ---------------------------------------------------------------------------
 * POLICIES
 * Cancellation and lateness wording was not supplied — both are flagged rather
 * than invented.
 * ------------------------------------------------------------------------- */
export const policies = [
  {
    id: 'deposit',
    title: '70% deposit',
    body: 'A 70% deposit is required to secure your booking. Your date is only held once the deposit has been received and confirmed.',
  },
  {
    id: 'early-morning',
    title: 'Early morning appointments',
    body: `Appointments starting ${fees.earlyMorning.windowLabel} attract a ₦${fees.earlyMorning.amount.toLocaleString('en-NG')} early morning / late evening fee.`,
    confirm: 'CONFIRM WITH ARTIST',
  },
  {
    id: 'express',
    title: 'Express bookings',
    body: `Bookings made less than ${fees.express.windowHours} hours before the appointment attract a ₦${fees.express.amount.toLocaleString('en-NG')} express fee.`,
    confirm: 'CONFIRM WITH ARTIST',
  },
  {
    id: 'gele',
    title: 'Gele styling',
    body: `Gele is ₦${pricing.gele.pricePerPerson.toLocaleString('en-NG')} per person and is excluded from all group discounts.`,
  },
  {
    id: 'group-changes',
    title: 'Changes to group size',
    body: 'Changes to the number of people booked must be communicated as early as possible so pricing, products and timing can be adjusted.',
  },
  {
    id: 'outside-area',
    title: 'Outside-area appointments',
    body: 'Appointments outside the listed service areas require a custom quotation. Send your address on WhatsApp for a quote.',
  },
  {
    id: 'cancellation',
    title: 'Cancellations',
    body: 'Awaiting confirmation from the artist.',
    pending: true, // PLACEHOLDER
  },
  {
    id: 'lateness',
    title: 'Lateness',
    body: 'Awaiting confirmation from the artist.',
    pending: true, // PLACEHOLDER
  },
];

/** ---------------------------------------------------------------------------
 * PORTFOLIO — replace these files with the artist's own photographs.
 * Category ids must stay in sync with `portfolioCategories`.
 * ------------------------------------------------------------------------- */
export const portfolioCategories = [
  { id: 'all', label: 'All' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'traditional', label: 'Traditional' },
  { id: 'soft-glam', label: 'Soft Glam' },
  { id: 'party', label: 'Party' },
];

export const portfolio = [
  {
    id: 'bridal-1',
    src: '/images/gallery/bridal-1.jpg',
    alt: 'Bridal glam makeup with sculpted cheekbones, gold-toned eyes and a glossy nude lip.',
    category: 'bridal',
    categoryLabel: 'Bridal',
    width: 900,
    height: 1600,
  },
  {
    id: 'traditional-1',
    src: '/images/gallery/traditional-1.jpg',
    alt: 'Traditional wedding makeup with a soft pink eye, deep liner and a tied headwrap.',
    category: 'traditional',
    categoryLabel: 'Traditional',
    width: 608,
    height: 1080,
  },
  {
    id: 'soft-glam-1',
    src: '/images/gallery/soft-glam-1.jpg',
    alt: 'Soft glam makeup with blended bronze shadow, fluffy lashes and luminous skin.',
    category: 'soft-glam',
    categoryLabel: 'Soft Glam',
    width: 810,
    height: 1080,
  },
  {
    id: 'party-1',
    src: '/images/gallery/party-1.jpg',
    alt: 'Event glam makeup and blue gele at a beauty awards ceremony.',
    category: 'party',
    categoryLabel: 'Party',
    width: 1200,
    height: 1500,
  },
];

/** ---------------------------------------------------------------------------
 * PORTFOLIO FILMS
 * Posters are captured from the supplied clips; each video loads only when a
 * visitor opens it, so the gallery stays light.
 * ------------------------------------------------------------------------- */
export const portfolioVideos = [
  {
    id: 'film-1',
    type: 'video',
    src: '/media/film-1.mp4',
    poster: '/images/portfolio/video/film-1.jpg',
    alt: 'Traditional wedding makeup with a copper and green gele and a soft gold eye.',
    category: 'traditional',
    categoryLabel: 'Traditional',
    duration: '0:13',
    width: 464,
    height: 832,
  },
  {
    id: 'film-2',
    type: 'video',
    src: '/media/film-2.mp4',
    poster: '/images/portfolio/video/film-2.jpg',
    alt: 'Traditional ceremony makeup with a magenta gele and a defined smoky eye.',
    category: 'traditional',
    categoryLabel: 'Traditional',
    duration: '0:47',
    width: 464,
    height: 832,
  },
  {
    id: 'film-3',
    type: 'video',
    src: '/media/film-3.mp4',
    poster: '/images/portfolio/video/film-3.jpg',
    alt: 'Soft glam makeup with a natural brow, warm polished skin and a glossed lip.',
    category: 'soft-glam',
    categoryLabel: 'Soft Glam',
    duration: '0:15',
    width: 576,
    height: 1024,
  },
  {
    id: 'film-4',
    type: 'video',
    src: '/media/film-4.mp4',
    poster: '/images/portfolio/video/film-4.jpg',
    alt: 'Soft glam with a sleek centre part, soft pink eye and a neutral lip.',
    category: 'soft-glam',
    categoryLabel: 'Soft Glam',
    duration: '0:30',
    width: 576,
    height: 1024,
  },
  {
    id: 'film-7',
    type: 'video',
    src: '/media/film-7.mp4',
    poster: '/images/portfolio/video/film-7.jpg',
    alt: 'Soft glam with long braids, soft pink shadow and a glossy lip.',
    category: 'soft-glam',
    categoryLabel: 'Soft Glam',
    duration: '0:10',
    width: 576,
    height: 1024,
  },
  {
    id: 'film-8',
    type: 'video',
    src: '/media/film-8.mp4',
    poster: '/images/portfolio/video/film-8.jpg',
    alt: 'Evening party glam with a smoky eye and a sparkling black dress.',
    category: 'party',
    categoryLabel: 'Party',
    duration: '0:14',
    width: 464,
    height: 832,
  },
  {
    id: 'film-5',
    type: 'video',
    src: '/media/film-5.mp4',
    poster: '/images/portfolio/video/film-5.jpg',
    alt: 'Behind the scenes: a purple gele being tied for a traditional ceremony.',
    category: 'traditional',
    categoryLabel: 'Traditional',
    duration: '0:31',
    width: 576,
    height: 1024,
  },
  {
    id: 'film-6',
    type: 'video',
    src: '/media/film-6.mp4',
    poster: '/images/portfolio/video/film-6.jpg',
    alt: 'Behind the scenes: base makeup being applied in the studio.',
    category: 'soft-glam',
    categoryLabel: 'Soft Glam',
    duration: '1:12',
    width: 464,
    height: 832,
  },
];

/** Everything shown on /portfolio — photographs first, then films. */
export const portfolioMedia = [
  ...portfolio.map((item) => ({ ...item, type: 'image' })),
  ...portfolioVideos,
];

export const aboutImages = {
  portrait: {
    src: '/images/about/about-artist.jpg',
    alt: 'Duduyemi, makeup artist and creative director of Duduyemi Makeover, in the studio.',
    width: 900,
    height: 1600,
  },
  work: [
    {
      src: '/images/gallery/soft-glam-1.jpg',
      alt: 'Close-up of a soft glam makeup look applied in the studio.',
      width: 810,
      height: 1080,
    },
    {
      src: '/images/about/about-award.jpg',
      alt: 'Duduyemi Makeover at a beauty awards ceremony in Lagos.',
      width: 1200,
      height: 801,
    },
    {
      src: '/images/gallery/traditional-1.jpg',
      alt: 'Traditional makeup look with a soft pink eye and tied headwrap.',
      width: 900,
      height: 1200,
    },
  ],
};

/** ---------------------------------------------------------------------------
 * TESTIMONIALS
 * Seven sample reviews with Yoruba client names, as requested. They are not
 * verified reviews — replace the quotes with real ones and remove
 * `placeholder: true` once the artist has approved them.
 * ------------------------------------------------------------------------- */
export const testimonials = [
  {
    id: 'review-1',
    quote:
      'My wedding makeup lasted from the morning until the last dance. My skin still looked like skin and I did not need to touch up once.',
    name: 'Adetola Adeyemi',
    meta: 'Bride · Lagos Island',
    placeholder: true,
  },
  {
    id: 'review-2',
    quote:
      'The gele was the first thing everyone asked about. It held all day and the pink eye photographed beautifully.',
    name: 'Funmilayo Ojo',
    meta: 'Traditional ceremony · Ibadan',
    placeholder: true,
  },
  {
    id: 'review-3',
    quote:
      'I wanted soft glam that did not look heavy. She listened, showed me the colours before she started, and the finish was exactly what I pictured.',
    name: 'Temilade Bakare',
    meta: 'Soft glam · Ikoyi',
    placeholder: true,
  },
  {
    id: 'review-4',
    quote:
      'She arrived early, set up quietly in my living room and I was ready before my guests. The look lasted the whole evening.',
    name: 'Ayomide Alabi',
    meta: 'Birthday · Ikeja',
    placeholder: true,
  },
  {
    id: 'review-5',
    quote:
      'The trial made my wedding morning calm. Nothing was new on the day — we simply repeated the look we had already agreed on.',
    name: 'Oluwaseun Adebayo',
    meta: 'Bridal trial · Lagos Island',
    placeholder: true,
  },
  {
    id: 'review-6',
    quote:
      'Polished, comfortable and still completely me. I have already booked her for my sister’s introduction.',
    name: 'Bolanle Ajayi',
    meta: 'Wedding guest · Magodo',
    placeholder: true,
  },
  {
    id: 'review-7',
    quote:
      'It rained, we were running late, and she still finished on time. The makeup looked fresh in every photograph.',
    name: 'Kehinde Salami',
    meta: 'Introduction · Ibadan',
    placeholder: true,
  },
];

export const reviewsDisclaimer =
  'Sample testimonials shown while verified client reviews are being collected.';

/** ---------------------------------------------------------------------------
 * FAQ — answers follow the published policies. Items that need the artist's
 * confirmation are marked as such rather than guessed.
 * ------------------------------------------------------------------------- */
export const faqs = [
  {
    q: 'How do I secure my booking?',
    a: 'Send your request through the booking form or on WhatsApp. Once availability is confirmed, a 70% deposit secures your date. Your appointment is confirmed only after the deposit has been received.',
  },
  {
    q: 'What areas do you cover?',
    a: 'Lagos Island, Ikoyi, Victoria Island, Ikeja, Magodo, Maryland and Ogudu GRA are covered by the published prices. Ibadan and any other location can be quoted on request.',
  },
  {
    q: 'Do you offer home service?',
    a: 'Yes. Makeup is brought to your home, hotel or venue across Lagos and Ibadan. Share your full address and a nearby landmark when booking.',
  },
  {
    q: 'What should I prepare before my appointment?',
    a: 'Come with clean, moisturised skin and any reference pictures you love. For home service, a table near natural light and a chair are all that is needed. Exact preparation guidance is confirmed with you before the day.',
  },
  {
    q: 'Are there extra fees for early morning or late evening appointments?',
    a: `Yes. Appointments starting ${fees.earlyMorning.windowLabel} attract a ₦${fees.earlyMorning.amount.toLocaleString('en-NG')} early morning / late evening fee. Bookings made less than ${fees.express.windowHours} hours before the appointment add a ₦${fees.express.amount.toLocaleString('en-NG')} express fee. Both are added automatically to your estimate, so you can see them before you send your request.`,
  },
  {
    q: 'How long does makeup take?',
    a: 'Regular makeup takes about 1 hour per person. Bridal makeup is approximately 2 hours, bridal trials and makeup with gele are approximately 1 hour 30 minutes. Gele styling adds 30 minutes per person.',
  },
  {
    q: 'Do you offer bridal trials?',
    a: 'Yes. Bridal trials are available as a private session of approximately 1 hour 30 minutes. Trial pricing is confirmed personally on WhatsApp.',
  },
  {
    q: 'What happens if I am outside your service areas?',
    a: 'Your booking is treated as a custom quotation: send your location and date on WhatsApp and a price will be confirmed before anything is paid.',
  },
  {
    q: 'Is the deposit refundable?',
    a: 'The cancellation and refund terms are awaiting confirmation from the artist and will be published here once confirmed.',
    pending: true, // PLACEHOLDER
  },
];

export const bookingSteps = [
  { id: 'service', label: 'Service' },
  { id: 'location', label: 'Location' },
  { id: 'people', label: 'People' },
  { id: 'gele', label: 'Gele' },
  { id: 'date', label: 'Date & time' },
  { id: 'address', label: 'Address' },
  { id: 'details', label: 'Details' },
];

export const nextSteps = [
  {
    title: 'Send your booking request',
    body: 'Your details open in WhatsApp so the request reaches the artist directly.',
  },
  {
    title: 'Availability is confirmed',
    body: 'Duduyemi confirms the date and time and shares the deposit details.',
  },
  {
    title: 'Your date is secured',
    body: 'The appointment is only secured once the 70% deposit has been received and confirmed.',
  },
];

export const peopleOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5+' },
];

export const seo = {
  siteUrl: 'https://www.duduyemimakeover.com',
  title: 'Duduyemi Makeover | Makeup Artist in Lagos',
  description:
    'Duduyemi Makeover is a Lagos and Ibadan based makeup artist offering bridal, traditional, soft glam and event makeup with home service. Book your appointment on WhatsApp.',
  keywords: [
    'makeup artist in Lagos',
    'bridal makeup Lagos',
    'traditional wedding makeup',
    'gele styling Lagos',
    'soft glam makeup Lagos',
    'home service makeup Lagos',
    'Ibadan makeup artist',
    'Duduyemi Makeover',
  ],
  ogImage: '/images/og/og-image.jpg',
  areaServed: [
    'Lagos Island',
    'Ikoyi',
    'Victoria Island',
    'Ikeja',
    'Magodo',
    'Maryland',
    'Ogudu',
    'Ibadan',
  ],
};

/**
 * PLACEHOLDERS & CONFIRMATIONS
 * ---------------------------------------------------------------------------
 * 1. brand.tagline       — chosen from three options; swap for the artist's own.
 * 2. brand.shortBio/bio  — drafted copy; artist should review and personalise.
 * 3. contact.socials     — Snapchat supplied as a display name only, no URL.
 * 4. pricing.mainland 4  — CONFIRM ₦316,000 (4 × ₦80,000 − ₦24,000 = ₦296,000).
 * 5. fees.earlyMorning   — CONFIRM WITH ARTIST (₦5,000 between 7:00 and
 *                          8:59 AM, or from 9:00 PM).
 * 6. fees.express        — CONFIRM WITH ARTIST (₦10,000 under 24 hours).
 * 7. policies cancel     — PLACEHOLDER, awaiting artist wording.
 * 8. policies lateness   — PLACEHOLDER, awaiting artist wording.
 * 9. FAQs deposit refund — PLACEHOLDER, awaiting artist wording.
 * 10. testimonials       — PLACEHOLDER sample copy (seven Yoruba-named
 *                          reviews), not verified client reviews.
 * 11. portfolio images   — placeholder-capable paths; artist photos supplied
 *                          for four looks, more to be added.
 * 12. brand.founder      — drafted founder copy; artist should review it.
 * 13. seo.siteUrl        — set the real domain before launch.
 * ------------------------------------------------------------------------- */
