import {brand, contact, footer, nav, services, socials, towns} from '../content';
import {useFitText} from '../hooks/useFitText';
import {Link} from './Link';
import {Logo} from './Logo';

/** Footer: links, contact and areas, under a wordmark that spans the page edge to edge. */
export function Footer() {
  const word = useFitText<HTMLSpanElement>();
  const year = new Date().getFullYear();

  const link = (href: string, label: string) => (
    <Link href={href} className="hover:text-oxide">
      {label}
    </Link>
  );

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1680px] gap-12 px-5 pt-24 pb-12 md:grid-cols-2 md:px-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" aria-label={`${brand.full}, home`} className="inline-block">
            <Logo />
          </Link>
          <p className="copy mt-6 max-w-[340px] text-white/65">{footer.line}</p>
        </div>
        <nav className="lg:col-span-2" aria-label="Footer">
          <p className="caps text-white/45">Explore</p>
          <ul className="mt-4 space-y-2 text-[16px] text-white/85">
            {nav.map((n) => (
              <li key={n.href}>{link(n.href, n.label)}</li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-3">
          <p className="caps text-white/45">Services</p>
          <ul className="mt-4 space-y-2 text-[16px] text-white/85">
            {services.map((s) => (
              <li key={s.id}>{link(`/services/#${s.id}`, `${s.name[0]} ${s.name[1]}`)}</li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <p className="caps text-white/45">Contact</p>
          <address className="mt-4 space-y-2 text-[16px] text-white/85 not-italic">
            <a href={`tel:${contact.phoneHref}`} className="block hover:text-oxide">
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="block break-all hover:text-oxide">
              {contact.email}
            </a>
            <span className="block text-white/65">{contact.address}</span>
          </address>
          <div className="mt-5 flex gap-5">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="caps text-white/75 hover:text-oxide" target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="mx-auto max-w-[1680px] px-5 text-[14px] leading-relaxed text-white/45 md:px-14">
        Serving {towns.join(', ')} and the wider West Coast.
      </p>

      <div className="mx-auto max-w-[1680px] overflow-hidden px-5 pt-10 md:px-14" aria-hidden>
        <span ref={word} className="display inline-block whitespace-nowrap leading-[0.78] text-oxide">
          {brand.name}
        </span>
      </div>

      <div className="mx-auto flex max-w-[1680px] flex-wrap justify-between gap-3 border-t border-white/10 px-5 py-6 md:px-14">
        <p className="caps text-white/45">
          © {year} {brand.legal}
        </p>
        <p className="caps text-white/45">{contact.region}</p>
      </div>
    </footer>
  );
}
