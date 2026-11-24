import {brand, contact, faqs, services, site, towns} from './content';
import {routeFor} from './routes';

/**
 * schema.org data for search engines: a GeneralContractor (a LocalBusiness
 * type) with its service area and services. Built from content.ts so the
 * structured data can never drift from what the page says.
 */
export function schema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${site.url}/#business`,
    name: brand.full,
    legalName: brand.legal,
    url: `${site.url}/`,
    logo: `${site.url}/favicon.svg`,
    image: `${site.url}/media/og-home.jpg`,
    description:
      'Building contractor on the West Coast of the Western Cape: new builds, extensions, renovations, roofing, waterproofing, paving and boundary walls.',
    telephone: contact.phoneHref,
    email: contact.email,
    priceRange: 'R',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vredenburg',
      addressRegion: 'Western Cape',
      addressCountry: 'ZA',
    },
    areaServed: towns.map((t) => ({'@type': 'City', name: t})),
    openingHoursSpecification: [
      {'@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '17:00'},
      {'@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '12:00'},
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Building services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${s.name[0]} ${s.name[1]}`,
          description: s.blurb,
          areaServed: contact.region,
        },
      })),
    },
  };
}

/**
 * Everything a page's <head> carries: the business on every page, a
 * breadcrumb trail on inner pages, and the FAQ on How we work (it matches
 * the questions shown on that page, as Google requires).
 */
export function pageSchema(path: string) {
  const out: object[] = [
    schema(),
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      name: brand.full,
      alternateName: 'Dercksen Construction',
      url: `${site.url}/`,
      inLanguage: 'en-ZA',
      publisher: {'@id': `${site.url}/#business`},
    },
  ];
  const r = routeFor(path);
  if (path !== '/' && r.path !== '/404/') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {'@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/`},
        {'@type': 'ListItem', position: 2, name: r.label, item: `${site.url}${r.path}`},
      ],
    });
  }
  if (path === '/how-we-work/') {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({'@type': 'Question', name: f.q, acceptedAnswer: {'@type': 'Answer', text: f.a}})),
    });
  }
  return out;
}
