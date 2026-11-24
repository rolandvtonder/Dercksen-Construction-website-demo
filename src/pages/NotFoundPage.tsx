import {Link} from '../components/Link';
import {nav} from '../content';

/** 404: says what happened and offers every page instead. */
export function NotFoundPage() {
  return (
    <section id="top" aria-labelledby="nf-title" className="flex min-h-svh flex-col justify-center bg-ink px-5 pt-32 pb-20 text-white md:px-14">
      <p className="caps text-oxide">Error 404</p>
      <h1 id="nf-title" className="display mt-4 text-[clamp(52px,8vw,140px)]">
        <span className="block">This page</span>
        <span className="it block">isn't built yet.</span>
      </h1>
      <p className="copy mt-8 max-w-[480px] text-white/75">The link may be old or mistyped. Try one of these instead:</p>
      <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
        {nav.map((n) => (
          <li key={n.href}>
            <Link href={n.href} className="caps text-white underline decoration-oxide decoration-2 underline-offset-[6px] hover:text-oxide">
              {n.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
