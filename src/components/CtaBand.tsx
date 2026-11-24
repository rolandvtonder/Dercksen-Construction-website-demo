import {contact} from '../content';
import {Link} from './Link';

/** Closing call to action at the foot of every page but Contact. */
export function CtaBand() {
  return (
    <section id="cta" aria-labelledby="cta-title" className="bg-oxide text-white">
      <div className="mx-auto flex max-w-[1680px] flex-wrap items-end justify-between gap-10 px-5 py-20 md:px-14 md:py-28">
        <h2 id="cta-title" className="display text-[clamp(44px,6vw,100px)]">
          <span className="block">Ready to</span>
          <span className="it block">start building?</span>
        </h2>
        <div className="flex flex-col items-start gap-5">
          <Link href="/contact/" className="caps bg-white px-9 py-4.5 text-ink transition-colors duration-300 hover:bg-ink hover:text-white">
            Get a <em className="normal-case">free quote</em>
          </Link>
          <a href={`tel:${contact.phoneHref}`} className="caps text-white/90 underline decoration-white/40 underline-offset-4 hover:text-white">
            Or call {contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
