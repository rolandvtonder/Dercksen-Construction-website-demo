import type {CSSProperties} from 'react';
import {CtaBand} from '../components/CtaBand';
import {Link} from '../components/Link';
import {PageHero} from '../components/PageHero';
import {Projects} from '../components/Projects';
import {Towns} from '../components/Towns';
import {useReveals} from '../hooks/useReveals';

/** The kinds of job the gallery covers, each linked to its service, so the page explains itself to readers and search engines. */
const kinds = [
  {t: 'New homes & double storeys', d: 'Family homes and rental units built from foundation to roof, to plan and to SANS 10400.', href: '/services/#new-builds'},
  {t: 'Extensions & alterations', d: 'Extra bedrooms, open-plan living areas and garages that match the house they join.', href: '/services/#new-builds'},
  {t: 'Kitchen & bathroom renovations', d: 'Full remodels including plumbing, tiling, ceilings, plastering and paint.', href: '/services/#renovations'},
  {t: 'Roofing & waterproofing', d: 'New roofs, re-roofs, leak repairs and torch-on waterproofing for flat roofs and balconies.', href: '/services/#roofing'},
  {t: 'Paving & boundary walls', d: 'Driveways, patios, retaining and boundary walls, carports and gates.', href: '/services/#paving'},
];

/** Projects: the full gallery, the kinds of work it covers, then the towns we work in. */
export function ProjectsPage() {
  const root = useReveals<HTMLElement>();

  return (
    <>
      <PageHero
        crumb="Projects"
        keyword="Building projects on the West Coast"
        title={[{t: 'Projects'}, {t: 'on the ground.', i: true}]}
        intro="From a single bathroom to a double-storey family home, every job gets the same crew, the same care and the same clean site."
        image={{name: 'extension-scaffolding', alt: 'Brick and block house extension going up behind scaffolding', position: '50% 40%'}}
      />
      <Projects header={false} />

      <section ref={root} aria-labelledby="kinds-title" className="bg-paper text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-5 py-24 md:px-14 md:py-32 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="caps text-oxide" data-reveal>
              The work we take on
            </p>
            <h2 id="kinds-title" className="display mt-4 text-[clamp(44px,5vw,88px)]" data-reveal style={{'--d': '0.06s'} as CSSProperties}>
              <span className="block">Big jobs,</span>
              <span className="it block">small jobs.</span>
            </h2>
            <p className="copy mt-8 max-w-[420px] text-ink/80" data-reveal style={{'--d': '0.1s'} as CSSProperties}>
              We build and renovate homes and small commercial properties in every West Coast town, from Yzerfontein and Darling up to Velddrif. If
              your job is not listed here, ask us anyway.
            </p>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {kinds.map((k, i) => (
              <li key={k.t} className="border-t border-ink/20 py-6 last:border-b" data-reveal style={{'--d': `${i * 0.05}s`} as CSSProperties}>
                <h3 className="display text-[clamp(24px,2.2vw,34px)]">
                  <Link href={k.href} className="hover:text-oxide">
                    {k.t}
                  </Link>
                </h3>
                <p className="copy mt-2 max-w-[620px] text-ink/75">{k.d}</p>
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
