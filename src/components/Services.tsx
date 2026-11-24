import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {services} from '../content';
import {dims, media, srcSet} from '../lib/media';
import {Link} from './Link';

/**
 * Services: four tall panels slide in from the right one after another,
 * each a quarter of ONE aerial photo of a building site (so the four panels
 * cost one download). Side by side they read as one continuous picture.
 */
export function Services() {
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  // Bit i set = panel i has slid in. Each panel is watched on its own so that
  // on phones, where they stack, each one slides in as it reaches the screen.
  const [shown, setShown] = useState(0);
  const n = services.length;

  useEffect(() => {
    const cardIo = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = cards.current.indexOf(e.target as HTMLDivElement);
          setShown((m) => m | (1 << i));
          cardIo.unobserve(e.target);
        }),
      {threshold: 0.15},
    );
    cards.current.forEach((c) => c && cardIo.observe(c));
    return () => cardIo.disconnect();
  }, []);

  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-ink">
      <div className="flex items-end justify-between gap-6 px-5 pt-24 pb-8 md:px-14 md:pt-32">
        <div>
          <p className="caps text-oxide">What we build</p>
          <h2 id="services-title" className="display mt-3 text-[clamp(40px,5vw,84px)] text-white">
            Our <span className="it">services</span>
          </h2>
        </div>
        <div className="hidden max-w-[380px] md:block">
          <p className="copy text-white/70">Four trades under one roof. Whatever the job, you deal with one company, one quote and one crew.</p>
          <Link href="/services/" className="caps mt-4 inline-block text-white underline decoration-oxide decoration-2 underline-offset-[6px] hover:text-oxide">
            All services in detail
          </Link>
        </div>
      </div>

      <div className="grid h-svh min-h-[640px] grid-cols-4 gap-[3px] overflow-hidden max-lg:h-auto max-lg:grid-cols-2 max-md:grid-cols-1">
        {services.map((s, i) => {
          const on = (shown & (1 << i)) !== 0;
          return (
          // The cell stays put (so it can be observed); the article inside slides.
          <div
            key={s.id}
            ref={(c) => {
              cards.current[i] = c;
            }}
            className="relative max-lg:h-[78svh] max-lg:min-h-[520px]"
          >
          <article
            className={`absolute inset-0 flex flex-col overflow-hidden transition-transform duration-[1100ms] ease-wipe ${
              on ? 'translate-x-0' : 'in-[.js]:translate-x-[calc(100%_+_100vw)]'
            }`}
            style={{transitionDelay: `${0.12 + i * 0.14}s`, background: s.tint} as CSSProperties}
          >
            {/* One slice of the shared photo: the image is n panels wide, shifted per panel. */}
            <img
              src={media('site-aerial-1600.webp')}
              srcSet={srcSet('site-aerial', [800, 1600, 2400])}
              sizes="(min-width: 1024px) 100vw, 200vw"
              alt=""
              width={dims['site-aerial'][0]}
              height={dims['site-aerial'][1]}
              loading="lazy"
              decoding="async"
              className="absolute top-0 h-full max-w-none object-cover max-lg:!left-0 max-lg:!w-full"
              style={{width: `${n * 100}%`, left: `${-100 * i}%`, objectPosition: `${(i / (n - 1)) * 100}% 50%`}}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(22_20_18/0.72),rgb(22_20_18/0.2)_45%,rgb(22_20_18/0.85))]" />
            <div className="relative flex h-full flex-col justify-between px-7 pt-24 pb-24 md:px-9 md:pt-28">
              <div>
                <p className="caps text-white/60">0{i + 1}</p>
                <h3 className="display mt-3 text-[clamp(34px,2.9vw,52px)] text-white">
                  <span className="block">{s.name[0]}</span>
                  <span className="it block">{s.name[1]}</span>
                </h3>
              </div>
              <div className={`transition-opacity delay-[1400ms] duration-700 ${on ? 'opacity-100' : 'in-[.js]:opacity-0'}`}>
                <p className="text-[15px] leading-relaxed text-white/85">{s.blurb}</p>
                <ul className="mt-5 space-y-2 border-t border-white/20 pt-5">
                  {s.items.map((it) => (
                    <li key={it} className="caps flex items-center gap-2.5 text-white">
                      <span className="block size-1.5 shrink-0 bg-oxide" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
          </div>
          );
        })}
      </div>
    </section>
  );
}
