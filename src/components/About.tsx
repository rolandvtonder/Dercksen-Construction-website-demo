import type {CSSProperties} from 'react';
import {about} from '../content';
import {useParallax} from '../hooks/useParallax';
import {useReveals} from '../hooks/useReveals';
import {media, srcSet} from '../lib/media';
import {Lines} from './Heading';
import {Link} from './Link';

/**
 * Who we are: the company story on limestone paper, beside two site photos.
 * `teaser` (home page) keeps the first paragraph and links on to the full page.
 */
export function About({teaser = false}: {teaser?: boolean}) {
  const root = useReveals<HTMLElement>();
  const big = useParallax<HTMLImageElement>(36);
  const small = useParallax<HTMLImageElement>(22);

  return (
    <section ref={root} id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-paper text-ink">
      <div className="mx-auto grid max-w-[1680px] gap-14 px-5 py-24 md:px-14 md:py-36 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 xl:col-span-5">
          <p className="caps text-oxide" data-reveal>
            {about.kicker}
          </p>
          <h2 id="about-title" className="display mt-4 text-[clamp(46px,6vw,104px)]" data-reveal style={{'--d': '0.08s'} as CSSProperties}>
            <Lines lines={about.title} />
          </h2>
          <div className="mt-10 max-w-[560px] space-y-5">
            {(teaser ? about.body.slice(0, 1) : about.body).map((p, i) => (
              <p key={i} className="copy text-ink/80" data-reveal style={{'--d': `${0.12 + i * 0.06}s`} as CSSProperties}>
                {p}
              </p>
            ))}
          </div>
          <dl className="mt-12 grid max-w-[560px] grid-cols-3 gap-6 border-t border-ink/15 pt-6" data-reveal>
            {about.facts.map(([k, v]) => (
              <div key={k}>
                <dt className="caps text-ink/55">{k}</dt>
                <dd className="display mt-1.5 text-[clamp(20px,1.8vw,28px)]">{v}</dd>
              </div>
            ))}
          </dl>
          {teaser && (
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4" data-reveal>
              <Link href="/about/" className="caps bg-ink px-8 py-4 text-white transition-colors duration-300 hover:bg-oxide">
                More about us
              </Link>
              <Link href="/how-we-work/" className="caps self-center text-ink underline decoration-oxide decoration-2 underline-offset-[6px] hover:text-oxide">
                How we work
              </Link>
            </div>
          )}
        </div>

        <div className="relative lg:col-span-6 xl:col-span-6 xl:col-start-7">
          <figure className="relative ml-auto aspect-[4/5] w-[86%] overflow-hidden bg-sand max-lg:w-full" data-reveal>
            <img
              ref={big}
              src={media('paternoster-cottage-1600.webp')}
              srcSet={srcSet('paternoster-cottage')}
              sizes="(min-width: 1024px) 44vw, 100vw"
              width={1600}
              height={1406}
              loading="lazy"
              decoding="async"
              alt="Traditional whitewashed West Coast cottage with a thatched roof and blue shutters in Paternoster"
              className="h-full w-full scale-[1.12] object-cover"
            />
          </figure>
          <figure
            className="absolute -bottom-10 left-0 aspect-[4/3] w-[46%] overflow-hidden border-[6px] border-paper bg-sand shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)] max-lg:hidden"
            data-reveal
            style={{'--d': '0.18s'} as CSSProperties}
          >
            <img
              ref={small}
              src={media('plans-measure-800.webp')}
              width={800}
              height={534}
              loading="lazy"
              decoding="async"
              alt="Building plans with a tape measure and pen on a table"
              className="h-full w-full scale-[1.12] object-cover"
            />
          </figure>
          <p className="caps mt-4 ml-auto w-[48%] text-right text-ink/55 max-lg:w-full">West Coast homes are built for salt, sand and wind</p>
        </div>
      </div>
    </section>
  );
}
