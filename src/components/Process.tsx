import type {CSSProperties} from 'react';
import {process} from '../content';
import {useParallax} from '../hooks/useParallax';
import {useReveals} from '../hooks/useReveals';
import {media, srcSet} from '../lib/media';
import {Lines} from './Heading';

/** How we work: four steps from site visit to handover, under a wide site photo. */
export function Process({photo = true}: {photo?: boolean}) {
  const root = useReveals<HTMLElement>();
  const img = useParallax<HTMLImageElement>(50);

  return (
    <section ref={root} id="process" aria-labelledby={photo ? 'process-title' : undefined} aria-label={photo ? undefined : 'Our four steps'} className="relative bg-sand text-ink">
      {photo && (
      <div className="relative h-[62svh] min-h-[380px] overflow-hidden bg-steel">
        <img
          ref={img}
          src={media('extension-scaffolding-1600.webp')}
          srcSet={srcSet('extension-scaffolding')}
          sizes="100vw"
          width={1600}
          height={1200}
          loading="lazy"
          decoding="async"
          alt="Brick and block house extension going up behind scaffolding, with materials stacked in the garden"
          className="h-full w-full scale-[1.12] object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(22_20_18/0.65),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1680px] px-5 pb-10 md:px-14">
          <p className="caps text-white/80" data-reveal>
            {process.kicker}
          </p>
          <h2 id="process-title" className="display mt-3 text-[clamp(44px,6vw,104px)] text-white" data-reveal style={{'--d': '0.08s'} as CSSProperties}>
            <Lines lines={process.title} />
          </h2>
        </div>
      </div>
      )}

      <ol className="mx-auto grid max-w-[1680px] gap-x-10 gap-y-12 px-5 py-20 md:grid-cols-2 md:px-14 md:py-28 lg:grid-cols-4">
        {process.steps.map((s, i) => (
          <li key={s.n} className="border-t-2 border-ink pt-6" data-reveal style={{'--d': `${i * 0.08}s`} as CSSProperties}>
            <span className="display it block text-[64px] text-oxide" aria-hidden>
              {s.n}
            </span>
            <h3 className="display mt-4 text-[clamp(28px,2.4vw,38px)]">{s.t}</h3>
            <p className="copy mt-3 max-w-[340px] text-ink/75">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
