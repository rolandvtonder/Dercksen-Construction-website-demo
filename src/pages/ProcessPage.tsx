import {useId, useState, type CSSProperties} from 'react';
import {CtaBand} from '../components/CtaBand';
import {PageHero} from '../components/PageHero';
import {Process} from '../components/Process';
import {faqs} from '../content';
import {useReveals} from '../hooks/useReveals';

/** How we work: the four steps, then common questions as an accordion. */
export function ProcessPage() {
  const root = useReveals<HTMLElement>();
  const [open, setOpen] = useState(0);
  const uid = useId();

  return (
    <>
      <PageHero
        crumb="How we work"
        keyword="How our building process works"
        title={[{t: 'From first visit'}, {t: 'to final handover.', i: true}]}
        intro="No guesswork and no surprises: a free site visit, a written quote you can hold us to, weekly updates while we build and a proper walk-through at the end."
        image={{name: 'plans-measure', alt: 'Building plans with a tape measure and pen on a table'}}
      />
      <Process photo={false} />

      <section ref={root} aria-labelledby="faq-title" className="bg-paper text-ink">
        <div className="mx-auto grid max-w-[1680px] gap-12 px-5 py-24 md:px-14 md:py-32 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="caps text-oxide" data-reveal>
              Questions
            </p>
            <h2 id="faq-title" className="display mt-4 text-[clamp(44px,5vw,88px)]" data-reveal style={{'--d': '0.06s'} as CSSProperties}>
              <span className="block">Good to</span>
              <span className="it block">know.</span>
            </h2>
          </div>
          <dl className="lg:col-span-7 lg:col-start-6" data-reveal>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const panel = `${uid}-a${i}`;
              return (
                <div key={f.q} className="border-t border-ink/20 last:border-b">
                  <dt>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panel}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="display text-[clamp(22px,2vw,30px)]">{f.q}</span>
                      <span className={`text-[22px] leading-none text-oxide transition-transform duration-500 ease-silk ${isOpen ? 'rotate-45' : ''}`} aria-hidden>
                        +
                      </span>
                    </button>
                  </dt>
                  <dd id={panel} hidden={!isOpen} className="copy max-w-[640px] pb-7 text-ink/80">
                    {f.a}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
