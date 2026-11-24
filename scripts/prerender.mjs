// Bakes every page into its own HTML file — dist/index.html,
// dist/services/index.html and so on, plus dist/404.html — each with its own
// title, description, canonical URL, share image and tags, schema.org data
// and a preload for its own hero photo, so search engines and link previews
// see full content without running JS and the hero paints first.
// Also writes sitemap.xml (with each page's images) from the same route list.
import {mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

const dist = resolve('dist');
const ssr = resolve('dist-ssr/entry-server.js');
const {render, routes, notFound, pageSchema, site} = await import(pathToFileURL(ssr).href);

// The folder the site is served from ('/' or '/Dercksen-Construction-website-demo/'),
// and whether this is the public demo copy, which search engines should skip
// so it never competes with the real site later.
const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
const demo = Boolean(process.env.DEMO);

const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
  // Root-relative links to files in public/ must sit inside the base folder too.
  .replace(/(href|imagesrcset)="\/(?!\/)(?=favicon|apple-touch-icon|site\.webmanifest|media\/)/g, `$1="${base}`);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const today = new Date().toISOString().slice(0, 10);

// Photos with a 2400px export (full-screen heroes); the rest stop at 1600.
const WIDE = new Set(['hero-foundation', 'site-crew', 'site-aerial']);
const preload = (name) => {
  if (!name) return '';
  const widths = WIDE.has(name) ? [800, 1600, 2400] : [800, 1600];
  const set = widths.map((w) => `${base}media/${name}-${w}.webp ${w}w`).join(', ');
  return `<link rel="preload" as="image" href="${base}media/${name}-1600.webp" imagesrcset="${set}" imagesizes="100vw" fetchpriority="high" />`;
};

const images = {};

function page(route, path) {
  const url = `${site.url}${route.path === notFound.path ? '/' : route.path}`;
  const og = `${site.url}/media/${route.og}`;
  const json = pageSchema(path)
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ');
  const body = render(path);

  // Every distinct photo on the page (largest export), for the image sitemap.
  images[route.path] = [...new Set([...body.matchAll(/src="[^"]*?\/media\/([^"]+?)-(?:800|1600)\.webp"/g)].map((m) => m[1]))].map(
    (name) => `${site.url}/media/${name}-1600.webp`,
  );

  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(route.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(route.description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(route.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(route.description)}`)
    .replace(/(<meta property="og:image" content=")[^"]*/, `$1${og}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(route.title)}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(route.description)}`)
    .replace(/(<meta name="twitter:image" content=")[^"]*/, `$1${og}`)
    .replace(/<link rel="preload" as="image"[^>]*>/, preload(route.hero))
    .replace('<!--schema-->', json)
    .replace('<!--app-->', body);
  if (demo) html = html.replace('content="index, follow, max-image-preview:large"', 'content="noindex, nofollow"');
  else if (route === notFound) html = html.replace('content="index, follow, max-image-preview:large"', 'content="noindex, follow"');
  return html;
}

for (const r of routes) {
  const out = resolve(dist, `.${r.path}index.html`);
  mkdirSync(dirname(out), {recursive: true});
  writeFileSync(out, page(r, r.path));
  console.log('prerendered', r.path, `(${images[r.path].length} images)`);
}
writeFileSync(resolve(dist, '404.html'), page(notFound, '/404/'));
console.log('prerendered 404.html');

const urls = routes
  .map((r) => {
    const imgs = images[r.path].map((src) => `\n    <image:image><image:loc>${src}</image:loc></image:image>`).join('');
    const priority = r.path === '/' ? '1.0' : r.path === '/contact/' || r.path === '/services/' ? '0.9' : '0.8';
    return `  <url>\n    <loc>${site.url}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>${imgs}\n  </url>`;
  })
  .join('\n');
writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`,
);
console.log('wrote sitemap.xml');

rmSync(resolve('dist-ssr'), {recursive: true, force: true});
