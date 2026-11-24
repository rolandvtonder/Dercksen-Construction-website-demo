/** Paths to files in public/media. */
export const media = (f: string) => `${import.meta.env.BASE_URL}media/${f}`;

/** srcset for the WebP widths a photo is exported at (800 and 1600; full-screen photos also 2400). */
export const srcSet = (name: string, widths = [800, 1600]) => widths.map((w) => `${media(`${name}-${w}.webp`)} ${w}w`).join(', ');

/** Pixel size of the 1600px export of each full-bleed photo, for width/height (stops layout shift). */
export const dims: Record<string, [number, number]> = {
  'hero-foundation': [1600, 1205],
  'site-aerial': [1600, 1200],
  'site-crew': [1600, 1066],
  'extension-scaffolding': [1600, 1200],
  'west-coast-cottage': [1600, 1068],
  'plans-measure': [1600, 1068],
  'west-coast-village': [1600, 1067],
};
