import type {CSSProperties} from 'react';
import {projects} from '../content';
import {useReveals} from '../hooks/useReveals';
import {media, srcSet} from '../lib/media';
import {Link} from './Link';

/** Column spans for the editorial grid, repeated in pairs: wide/narrow, narrow/wide, half/half. */
const spans = ['lg:col-span-7', 'lg:col-span-5 lg:mt-24', 'lg:col-span-5', 'lg:col-span-7 lg:mt-24', 'lg:col-span-6', 'lg:col-span-6 lg:mt-24'];
const ratio = ['aspect-[16/10]', 'aspect-[4/5]', 'aspect-[4/5]', 'aspect-[16/10]', 'aspect-[4/3]', 'aspect-[4/3]'];

export function Projects({limit, header = true, more = false}: {limit?: number; header?: boolean; more?: boolean}) {
  const root = useReveals<HTMLElement>();
  const list = limit ? projects.slice(0, limit) : projects;

  return (
    <section ref={root} id="projects" aria-labelledby={header ? 'projects-title' : undefined} aria-label={header ? undefined : 'Project gallery'} className="relative bg-ink text-white">
      <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-36">
        {header && (
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="caps text-oxide" data-reveal>
              Recent work
            </p>
            <h2 id="projects-title" className="display mt-4 text-[clamp(46px,6vw,104px)]" data-reveal style={{'--d': '0.08s'} as CSSProperties}>
              <span className="block">Projects</span>
              <span className="it block">on the ground.</span>
            </h2>
          </div>
          <p className="copy max-w-[420px] text-white/70" data-reveal style={{'--d': '0.14s'} as CSSProperties}>
            From a single bathroom to a double-storey family home, every job gets the same crew, the same care and the same clean site.
          </p>
        </div>
        )}

        <ul className={`${header ? 'mt-16' : ''} grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-20`}>
          {list.map((p, i) => (
            <li key={p.img} className={spans[i % spans.length]} data-reveal style={{'--d': `${(i % 2) * 0.1}s`} as CSSProperties}>
              <figure className="group">
                <div className={`overflow-hidden bg-steel ${ratio[i % ratio.length]}`}>
                  <img
                    src={media(`${p.img}-1600.webp`)}
                    srcSet={srcSet(p.img)}
                    sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                    decoding="async"
                    alt={p.alt}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-5 flex items-baseline justify-between gap-4 border-t border-white/15 pt-4">
                  <span>
                    <span className="caps block text-oxide">
                      {p.scope} · {p.place}
                    </span>
                    <span className="display mt-1.5 block text-[clamp(24px,2.1vw,34px)]">{p.title}</span>
                  </span>
                  <span className="caps text-white/40">0{i + 1}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {more && (
          <Link href="/projects/" className="caps mt-16 inline-block text-white underline decoration-oxide decoration-2 underline-offset-[6px] hover:text-oxide">
            See all projects
          </Link>
        )}
      </div>
    </section>
  );
}
