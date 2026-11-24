import {hero} from '../content';
import {useCameraPull} from '../hooks/useCameraPull';
import {dims, media, srcSet} from '../lib/media';

/**
 * The home hero: a builder setting foundation shuttering in red soil, with
 * the headline and paragraph. As you scroll on to the services, the photo
 * blurs, dims and shrinks back as the page transition.
 */
export function Hero() {
  const {root, stage} = useCameraPull();

  return (
    <section ref={root} id="top" aria-labelledby="hero-title" className="relative h-svh min-h-[640px] overflow-hidden bg-ink">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <img
          src={media('hero-foundation-1600.webp')}
          srcSet={srcSet('hero-foundation', [800, 1600, 2400])}
          sizes="100vw"
          width={dims['hero-foundation'][0]}
          height={dims['hero-foundation'][1]}
          alt="A builder in a hard hat setting timber shuttering for a foundation in red soil"
          fetchPriority="high"
          className="h-full w-full object-cover object-[70%_50%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(22_20_18/0.86),rgb(22_20_18/0.62)_38%,rgb(22_20_18/0.18)_70%,transparent_90%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgb(22_20_18/0.6),transparent)]" />
        {/* On phones the text runs over the builder too, so darken the whole frame a little. */}
        <div className="absolute inset-0 bg-ink/40 md:hidden" />

        <div className="absolute inset-0 mx-auto max-w-[1680px] px-5 pt-[clamp(108px,15vh,150px)] md:px-14">
          {/* The small keyword line is part of the h1, so the main heading says what and where. */}
          <h1 id="hero-title" className="text-white">
            <span className="caps block text-white/75">{hero.eyebrow}</span>
            <span className="display mt-5 block text-[clamp(54px,8vw,148px)] drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            {hero.lines.map((l, i) => (
              <span key={l.t} className={`block ${l.i ? 'it' : ''} ${i === 0 ? 'pl-[1.4em] max-sm:pl-[0.6em]' : ''}`}>
                {l.t}
              </span>
            ))}
            </span>
          </h1>
          <p className="copy mt-9 ml-[clamp(0px,19vw,330px)] max-w-[400px] text-white/88 max-md:ml-0 max-md:text-[16px]">{hero.body}</p>
        </div>

        <ul className="caps absolute bottom-7 left-5 hidden gap-8 text-white/80 md:left-14 md:flex" aria-label="Our promise">
          {hero.promises.map((p) => (
            <li key={p} className="flex items-center gap-2.5">
              <span className="block size-1.5 bg-oxide" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
