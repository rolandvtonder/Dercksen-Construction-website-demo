/**
 * All copy lives here, so the client can change wording without touching layout.
 *
 * ⚠ PLACEHOLDERS — replace before going live:
 *   - contact.email / address / hours (phone + WhatsApp are real)
 *   - site.url (the real domain once it is registered)
 *   - socials (real profile links)
 *   - projects: the photos are licensed stock (see MEDIA-CREDITS.md) and the
 *     captions are examples. Swap in Dercksen's own job photos and real
 *     job names as soon as they exist.
 */

export const site = {
  url: 'https://www.dercksenconstruction.co.za',
};

export const brand = {
  name: 'Dercksen',
  full: 'Dercksen Construction & Projects',
  legal: 'Dercksen Construction & Projects (Pty) Ltd',
  tagline: 'Construction & Projects',
};

export const contact = {
  phone: '084 557 7750',
  phoneHref: '+27845577750',
  whatsapp: '27845577750',
  email: 'info@dercksenconstruction.co.za',
  region: 'West Coast, Western Cape',
  address: 'Vredenburg, West Coast, Western Cape',
  hours: 'Mon – Fri 07:00 – 17:00 · Sat 08:00 – 12:00',
};

/** Headline lines; `i` lines are set in italic. */
export const hero = {
  eyebrow: 'Builders & building contractors · West Coast, Western Cape',
  lines: [
    {t: 'Building the'},
    {t: 'West Coast,', i: true},
    {t: 'one brick'},
    {t: 'at a time.', i: true},
  ],
  body: 'New builds, extensions, renovations and roofing from Yzerfontein to Velddrif. One crew from foundation to final coat, with written fixed quotes and timelines we keep.',
  promises: ['Free site visit', 'Written, fixed quote', 'One crew, start to finish'],
  cta: ['Get a', 'free quote'],
};

/** Menu and footer links: one per page. */
export const nav = [
  {label: 'Home', href: '/'},
  {label: 'Services', href: '/services/'},
  {label: 'Projects', href: '/projects/'},
  {label: 'About us', href: '/about/'},
  {label: 'How we work', href: '/how-we-work/'},
  {label: 'Get a quote', href: '/contact/'},
];

export const socials = [
  {label: 'Facebook', href: '/'},
  {label: 'Instagram', href: '/'},
  {label: 'WhatsApp', href: `https://wa.me/${contact.whatsapp}`},
];

export type Service = {
  id: string;
  name: [string, string];
  blurb: string;
  items: string[];
  tint: string;
  /** Services page: longer write-up and its photo. */
  detail: string[];
  photo: {name: string; w: number; h: number; alt: string};
};

export const services: Service[] = [
  {
    id: 'new-builds',
    name: ['New builds &', 'extensions'],
    blurb: 'Family homes, double storeys, granny flats and add-on rooms, built to plan and to SANS 10400.',
    items: ['New homes', 'Double storeys', 'Granny flats', 'Garages & rooms'],
    tint: '#2e3b44',
    detail: [
      'From an empty plot to a finished home: we set out the foundations, build the shell, put the roof on and finish inside, with plans and council submissions handled alongside your architect or draughtsman.',
      'Extensions are built to match what is already there, from brick and plaster to roof pitch and window lines, so the new rooms look like they were always part of the house.',
    ],
    photo: {name: 'new-build-double-storey', w: 1600, h: 898, alt: 'Newly built white double-storey house with a tiled roof'},
  },
  {
    id: 'renovations',
    name: ['Renovations &', 'alterations'],
    blurb: 'Kitchens, bathrooms and open-plan remodels, plus the plastering, tiling and painting that finish them.',
    items: ['Kitchens & bathrooms', 'Open-plan remodels', 'Plaster & screed', 'Tiling & painting'],
    tint: '#8a3a2b',
    detail: [
      'Kitchens, bathrooms and open-plan living areas, including taking out walls, moving plumbing and putting in new lintels and beams where the structure needs them.',
      'We do the finishing trades ourselves: plaster and screed, tiling, ceilings, skimming and painting, so there is no gap between one contractor leaving and the next arriving.',
    ],
    photo: {name: 'kitchen-finished', w: 1600, h: 1200, alt: 'Finished kitchen with white cabinets, granite counters and a window over the sink'},
  },
  {
    id: 'roofing',
    name: ['Roofing &', 'waterproofing'],
    blurb: 'New roofs, re-roofs and repairs, plus waterproofing that holds up to West Coast wind and winter rain.',
    items: ['New roofs & re-roofs', 'Leak repairs', 'Torch-on waterproofing', 'Gutters & flashings'],
    tint: '#5b5348',
    detail: [
      'New roofs on new builds and extensions, full re-roofs on tired houses, and repairs to leaks, broken tiles, sheeting and ridges.',
      'Flat roofs, parapets and balconies get torch-on waterproofing, sealed flashings and properly falling gutters, detailed for the salt air and the winter north-westers.',
    ],
    photo: {name: 'waterproofing-flat-roof', w: 1600, h: 900, alt: 'Roofer rolling out a torch-on waterproofing membrane on a flat roof'},
  },
  {
    id: 'paving',
    name: ['Paving, walls &', 'commercial'],
    blurb: 'Driveways, boundary walls and steelwork, and project management for shops, offices and small commercial builds.',
    items: ['Paving & driveways', 'Boundary walls', 'Steel & carports', 'Commercial projects'],
    tint: '#1f2326',
    detail: [
      'Driveways, walkways and patios in brick or concrete pavers, laid on a compacted base so they stay level, plus boundary and retaining walls, steel carports and gates.',
      'For shops, offices and small commercial builds we run the whole project: programme, subcontractors, site safety and handover.',
    ],
    photo: {name: 'paving-driveway', w: 1600, h: 1068, alt: 'Modern house with a newly paved driveway in light and dark pavers'},
  },
];

export type Project = {
  img: string;
  w: number;
  h: number;
  title: string;
  place: string;
  scope: string;
  alt: string;
};

/** Example jobs. Photos are licensed stock until Dercksen's own are in. */
export const projects: Project[] = [
  {
    img: 'new-build-double-storey',
    w: 1600,
    h: 898,
    title: 'Double-storey family home',
    place: 'Langebaan',
    scope: 'New build',
    alt: 'Newly built white double-storey house with a tiled roof and fresh landscaping',
  },
  {
    img: 'extension-in-progress',
    w: 1600,
    h: 1200,
    title: 'Open-plan rear extension',
    place: 'Vredenburg',
    scope: 'Extension',
    alt: 'Rear house extension under construction with block walls and a steel lintel',
  },
  {
    img: 'kitchen-renovation',
    w: 1600,
    h: 1067,
    title: 'Kitchen & living remodel',
    place: 'Saldanha Bay',
    scope: 'Renovation',
    alt: 'Kitchen renovation in progress with new cabinetry and a worker fitting the island',
  },
  {
    img: 'new-build-twin-homes',
    w: 1600,
    h: 961,
    title: 'Twin rental homes',
    place: 'Yzerfontein',
    scope: 'New build',
    alt: 'Two newly completed modern homes with double garages side by side',
  },
  {
    img: 'waterproofing-flat-roof',
    w: 1600,
    h: 900,
    title: 'Flat-roof waterproofing',
    place: 'St Helena Bay',
    scope: 'Roofing',
    alt: 'Roofer rolling out a torch-on waterproofing membrane on a flat roof',
  },
  {
    img: 'paving-driveway',
    w: 1600,
    h: 1068,
    title: 'Driveway & entrance paving',
    place: 'Velddrif',
    scope: 'Paving',
    alt: 'Modern house with a newly paved driveway in light and dark pavers',
  },
];

export const towns = [
  'Langebaan',
  'Saldanha Bay',
  'Vredenburg',
  'Paternoster',
  'St Helena Bay',
  'Velddrif',
  'Yzerfontein',
  'Darling',
  'Hopefield',
  'Malmesbury',
  'Jacobsbaai',
  'Laaiplek',
];

export const about = {
  kicker: 'About us',
  title: [{t: 'Small enough'}, {t: 'to care.', i: true}, {t: 'Big enough'}, {t: 'to deliver.', i: true}],
  body: [
    'Dercksen Construction & Projects is a West Coast building company. We build, extend and repair homes and small commercial properties, and we run the whole job ourselves: one point of contact and one crew from the first site visit to the last coat of paint.',
    'We grew up with this coastline. Salt air, sandy soils and the north-westers in winter all decide how a house should be built here, so we price for them from day one.',
  ],
  facts: [
    ['Based in', 'West Coast, WC'],
    ['We build', 'Homes & commercial'],
    ['Quotes', 'Written & fixed'],
  ] as [string, string][],
};

export const process = {
  kicker: 'How we work',
  title: [{t: 'From first visit'}, {t: 'to final handover.', i: true}],
  steps: [
    {n: '01', t: 'Site visit', d: 'We come to you, measure up, look at the ground and listen to what you need. Free, no obligation.'},
    {n: '02', t: 'Written quote', d: 'A line-by-line quote with materials, labour and a realistic timeline, so you know the cost before we start.'},
    {n: '03', t: 'The build', d: 'One crew on site, with weekly progress updates and photos on WhatsApp. Decisions are made with you, never for you.'},
    {n: '04', t: 'Handover', d: 'We walk the job with you, fix every snag on the list, clean the site and hand over the keys.'},
  ],
};

export const quote = {
  kicker: 'Get a quote',
  title: [{t: 'Tell us about'}, {t: 'your project.', i: true}],
  body: 'Send us a few details and we will get back to you within one working day to book a free site visit.',
  serviceOptions: ['New build', 'Extension', 'Renovation', 'Roofing', 'Waterproofing', 'Paving or walls', 'Commercial', 'Something else'],
};

export const values = [
  {t: 'Honest pricing', d: 'A written, line-by-line quote before we start, and no surprise extras. If something changes on site, you see the cost before we do the work.'},
  {t: 'Tidy, safe sites', d: 'Materials stacked, rubble cleared and the site left safe every evening. You still have to live next to the job, after all.'},
  {t: 'Built for the coast', d: 'Corrosion-resistant fixings, proper damp-proofing and waterproofing detailed for wind-driven rain. West Coast houses take a beating.'},
];

export const faqs = [
  {q: 'Is the site visit really free?', a: 'Yes. We come out, measure up and talk through the job at no cost and with no obligation, anywhere on the West Coast.'},
  {q: 'How long does a quote take?', a: 'Usually within a week of the site visit. Bigger jobs with plans can take a little longer while we price every line properly.'},
  {q: 'Do you help with plans and council approval?', a: 'We work alongside your architect or draughtsman and can recommend one. Building plans must be approved by the municipality before structural work starts, and we make sure that happens.'},
  {q: 'Can we live in the house during a renovation?', a: 'Most of the time, yes. We plan the work in stages so you keep a working kitchen or bathroom for as long as possible, and we close off the work area every evening.'},
  {q: 'How do payments work?', a: 'A deposit to order materials, then payments at agreed stages of the build, never ahead of the work done. Every stage is set out in the quote.'},
  {q: 'Which areas do you cover?', a: 'The whole West Coast, from Yzerfontein and Darling up to Velddrif and Laaiplek, including Langebaan, Saldanha Bay, Vredenburg, Paternoster and St Helena Bay.'},
];

export const footer = {
  line: 'Builders on the West Coast of the Western Cape.',
};
