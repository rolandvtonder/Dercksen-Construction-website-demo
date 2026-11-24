import {towns} from '../content';
import {Mark} from './Logo';

/** The towns we work in, drifting past like a site hoarding. */
export function Towns() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {towns.map((t) => (
        <li key={t} className="flex items-center">
          <span className="display px-7 text-[clamp(30px,3.4vw,56px)] whitespace-nowrap text-white">{t}</span>
          <Mark className="size-5 text-oxide" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="towns-title" className="overflow-hidden border-y border-white/10 bg-ink py-8">
      <h2 id="towns-title" className="caps mb-5 px-5 text-white/55 md:px-14">
        Building across the West Coast
      </h2>
      <div className="marquee">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
