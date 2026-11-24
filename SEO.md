# SEO: what the site does, and what to do at launch

## Built into the site

**Every page is its own real HTML file.** `npm run build` writes `dist/index.html`, `dist/services/index.html` and so on. Google reads the full text without running any JavaScript. Each page has:

- **Title and description:** written for search. Titles are under 60 characters and descriptions under 160, so Google shows them whole. They live in `src/routes.ts`.
- **Main heading:** one h1 per page that says what and where, e.g. "Building services on the West Coast", above the display headline.
- **Canonical URL:** each page names its own address, so there are no duplicates.
- **Share preview:** its own 1200×630 image, title and description for WhatsApp, Facebook and X (`public/media/og-*.jpg`).
- **Fast first paint:** a preload for its own hero photo, which helps Largest Contentful Paint, a Core Web Vitals score.
- **Breadcrumbs:** on the page and in the structured data.

**Structured data** (schema.org, in `src/schema.ts`, built from the same content as the page):

- **GeneralContractor:** a local-business type with the phone number, email, base town, the 12 towns served, opening hours and the four services.
- **WebSite:** helps Google show "Dercksen Construction & Projects" as the site name.
- **BreadcrumbList:** on every inner page.
- **FAQPage:** on How we work, matching the six questions shown there.

**Technical:**

- **Sitemap:** `sitemap.xml` is generated at build time with all six pages and the photos on each.
- **`robots.txt`:** allows everything and points to the sitemap.
- **404 page:** `404.html` is marked `noindex`.
- **Images:** WebP at two or three sizes with `srcset`, width and height set (no layout shift), descriptive alt text and file names, and lazy loading below the first screen.
- **Language:** `lang="en-ZA"` and `ZA-WC` geo tags.
- **Mobile:** works on phones, no sideways scroll, zoom allowed, tap targets of 44px or more.
- **Icons:** favicon (SVG plus a 48px PNG for Google results), Apple touch icon and a web manifest.
- **Local words in real copy:** service names and the 12 West Coast towns appear in normal sentences on the pages, not as hidden keyword lists.

## Before launch: placeholders to replace

All of these are in `src/content.ts` unless noted.

| What | Where | Why it matters |
| --- | --- | --- |
| **Domain** `dercksenconstruction.co.za` | `site.url` in `content.ts`, `index.html`, `public/robots.txt` | Canonical URLs, sitemap and share images all use it |
| **Email** | `contact.email` | Shown on the site and in the structured data |
| **Base town and hours** | `contact.address`, `contact.hours`, `schema.ts` | Must match the Google Business Profile exactly |
| **Facebook and Instagram links** | `socials` | Add them to `sameAs` in `schema.ts` too |
| **Project photos and captions** | `projects`, `public/media` | Stock photos with made-up captions. Replace with real jobs before launch, because Google and clients both reward real work |

## At launch (in order of impact for a local builder)

1. **Google Business Profile.** This is the biggest lever for searches like "builder Langebaan". Set it up as a service-area business covering the West Coast towns, with the category "General contractor" (add "Roofing contractor" and "Paving contractor" as secondary categories). Use the same name, phone and hours as the website, and link to the site.
2. **Reviews.** Ask every finished client for a Google review, and reply to each one. Review count and recency drive the map results.
3. **Google Search Console.** Verify the domain, submit `https://<domain>/sitemap.xml`, then check the "Pages" and "Enhancements" (FAQ, breadcrumbs) reports after a week.
4. **Real project photos.** Add a few jobs with honest captions ("Rear extension, Vredenburg, 2026"). Name the files descriptively (`vredenburg-rear-extension.webp`) and write real alt text.
5. **Same details everywhere.** List the business with the same name, phone and town on local directories: Snupit, Yellow Pages SA, Brabys, a Facebook page and local West Coast community pages.
6. **Hosting.** Serve the `dist/` folder over HTTPS. Redirect `http://` and the bare domain to `https://www.`, and set `404.html` as the not-found page. Netlify, Vercel, Cloudflare Pages and most cPanel hosts do all of this.
7. **Later.** Add one page per service or town only once there is real content for it, such as photos and a write-up of an actual job there. Thin copy-paste town pages can hurt rankings.
