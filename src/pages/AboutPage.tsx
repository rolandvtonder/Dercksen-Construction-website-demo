import type {CSSProperties} from 'react';
import {About} from '../components/About';
import {CtaBand} from '../components/CtaBand';
import {PageHero} from '../components/PageHero';
import {Towns} from '../components/Towns';
import {values} from '../content';
import {useReveals} from '../hooks/useReveals';

/** About: the story, what clients can expect from us, and where we work. */
export function AboutPage() {
  const root = useReveals<HTMLElement>();

  return (
    <>
      <PageHero
        crumb="About us"
        keyword="About Dercksen Construction & Projects"
        title={[{t: 'West Coast'}, {t: 'builders.', i: true}]}
        intro="A local building company that runs every job itself, from the first site visit to the last coat of paint."
        image={{name: 'west-coast-cottage', alt: 'Whitewashed West Coast cottage with green shutters under a blue sky', position: '50% 60%'}}
      />
      <About />

      <section ref={root} aria-labelledby="values-title" className="bg-ink text-white">
        <div className="mx-auto max-w-[1680px] px-5 py-24 md:px-14 md:py-32">
          <p className="caps text-oxide" data-reveal>
            What you can expect
          </p>
          <h2 id="values-title" className="display mt-4 text-[clamp(44px,5.6vw,96px)]" data-reveal style={{'--d': '0.06s'} as CSSProperties}>
            <span className="block">Three things</span>
            <span className="it block">we never skip.</span>
          </h2>
          <ul className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.t} className="border-t-2 border-oxide pt-6" data-reveal style={{'--d': `${i * 0.08}s`} as CSSProperties}>
                <h3 className="display text-[clamp(28px,2.4vw,40px)]">{v.t}</h3>
                <p className="copy mt-4 max-w-[400px] text-white/75">{v.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Towns />
      <CtaBand />
    </>
  );
}
