/**
 * Every page on the site. The prerender writes one HTML file per entry
 * (dist/<path>/index.html) with this title and description in its <head>,
 * so each page can rank on its own. Titles stay under ~60 characters and
 * descriptions under ~160 so Google shows them whole.
 */

export type RouteMeta = {
  path: string;
  label: string;
  title: string;
  description: string;
  /** The page's hero photo: preloaded in its HTML so it paints first (LCP). */
  hero?: string;
  /** 1200×630 share image in public/media, shown when the link is pasted into WhatsApp, Facebook etc. */
  og: string;
};

export const routes: RouteMeta[] = [
  {
    path: '/',
    label: 'Home',
    title: 'Builders on the West Coast, Western Cape | Dercksen',
    description:
      'West Coast builder for new builds, extensions, renovations, roofing and paving in Langebaan, Saldanha Bay, Vredenburg and Paternoster. Free site visit.',
    hero: 'hero-foundation',
    og: 'og-home.jpg',
  },
  {
    path: '/services/',
    label: 'Services',
    title: 'New Builds, Renovations, Roofing & Paving | Dercksen',
    description:
      'New homes, extensions, kitchen and bathroom renovations, roofing, waterproofing, paving and boundary walls on the West Coast. One crew, one fixed quote.',
    hero: 'site-crew',
    og: 'og-services.jpg',
  },
  {
    path: '/projects/',
    label: 'Projects',
    title: 'Building Projects on the West Coast | Dercksen',
    description:
      'Recent work by Dercksen Construction & Projects: double storeys, extensions, kitchen remodels, waterproofing and paving from Yzerfontein to Velddrif.',
    hero: 'extension-scaffolding',
    og: 'og-projects.jpg',
  },
  {
    path: '/about/',
    label: 'About us',
    title: 'About Dercksen Construction & Projects | West Coast',
    description:
      'Dercksen Construction & Projects is a West Coast building company. One point of contact and one crew from the first site visit to the last coat of paint.',
    hero: 'west-coast-cottage',
    og: 'og-about.jpg',
  },
  {
    path: '/how-we-work/',
    label: 'How we work',
    title: 'How We Work: Site Visit to Handover | Dercksen',
    description:
      'Free site visit, a line-by-line written quote, weekly updates and a snag-free handover. How Dercksen runs a build, plus answers to common questions.',
    hero: 'plans-measure',
    og: 'og-how-we-work.jpg',
  },
  {
    path: '/contact/',
    label: 'Get a quote',
    title: 'Free Building Quote on the West Coast | Dercksen',
    description:
      'Request a free quote for a new build, extension, renovation, roofing or paving job on the West Coast. Call or WhatsApp 084 557 7750.',
    hero: 'west-coast-village',
    og: 'og-contact.jpg',
  },
];

export const notFound: RouteMeta = {
  path: '/404/',
  label: 'Page not found',
  title: 'Page not found | Dercksen Construction & Projects',
  description: 'This page does not exist. Find our services, projects and contact details here.',
  og: 'og-home.jpg',
};

export const routeFor = (path: string) => routes.find((r) => r.path === path) ?? notFound;
