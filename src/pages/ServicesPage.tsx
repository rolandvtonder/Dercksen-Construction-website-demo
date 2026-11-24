import type {CSSProperties} from 'react';
import {CtaBand} from '../components/CtaBand';
import {Link} from '../components/Link';
import {PageHero} from '../components/PageHero';
import {services} from '../content';
import {useReveals} from '../hooks/useReveals';
import {media, srcSet} from '../lib/media';

/** Services: the drone film as the hero, then one block per trade, photo and text alternating sides. */
export function ServicesPage() {
  const root = useReveals<HTMLElement>();

  return (
    <>
      <PageHero
        crumb="Services"
        keyword="Building services on the West Coast"
        title={[{t: 'What we'}, {t: 'build.', i: true}]}
        intro="Four trades under one roof: new builds and extensions, renovations, roofing and waterproofing, and paving, walls and commercial work. One company, one quote and one crew for the whole job."
        image={{name: 'site-crew', wide: true, alt: 'Black and white photo of a building crew pushing wheelbarrows across a concrete slab under a new floor', position: '50% 45%'}}
      />

      <section ref={root} aria-label="Our services" className="bg-paper text-ink">
        <nav aria-label="Jump to a service" className="mx-auto max-w-[1680px] border-b border-ink/15 px-5 py-6 md:px-14">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {services.map((s, i) => (
              <li key={s.id}>
                <Link href={`/services/#${s.id}`} className="caps text-ink/75 hover:text-oxide">
                  0{i + 1} {s.name[0]} {s.name[1]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {services.map((s, i) => (
          <article key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="mx-auto grid max-w-[1680px] scroll-mt-24 items-center gap-12 px-5 py-20 md:px-14 md:py-28 lg:grid-cols-12 lg:gap-10">
            <figure className={`overflow-hidden bg-sand lg:col-span-6 ${i % 2 ? 'lg:order-2 lg:col-start-7' : ''}`} data-reveal>
              <img
                src={media(`${s.photo.name}-1600.webp`)}
                srcSet={srcSet(s.photo.name)}
                sizes="(min-width: 1024px) 50vw, 100vw"
                width={s.photo.w}
                height={s.photo.h}
                loading="lazy"
                decoding="async"
                alt={s.photo.alt}
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
            <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
              <p className="caps text-oxide" data-reveal>
                Service 0{i + 1}
              </p>
              <h2 id={`${s.id}-title`} className="display mt-3 text-[clamp(42px,4.6vw,80px)]" data-reveal style={{'--d': '0.06s'} as CSSProperties}>
                <span className="block">{s.name[0]}</span>
                <span className="it block">{s.name[1]}</span>
              </h2>
              <div className="mt-8 space-y-5">
                {s.detail.map((d, k) => (
                  <p key={k} className="copy text-ink/80" data-reveal style={{'--d': `${0.1 + k * 0.05}s`} as CSSProperties}>
                    {d}
                  </p>
                ))}
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-ink/15 pt-6" data-reveal>
                {s.items.map((it) => (
                  <li key={it} className="caps flex items-center gap-2.5">
                    <span className="block size-1.5 shrink-0 bg-oxide" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
              <Link href="/contact/" className="caps mt-9 inline-block bg-ink px-8 py-4 text-white transition-colors duration-300 hover:bg-oxide" data-reveal>
                Quote for {s.name[1]}
              </Link>
            </div>
          </article>
        ))}
      </section>

      <CtaBand />
    </>
  );
}
