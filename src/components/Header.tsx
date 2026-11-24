import {useEffect, useRef} from 'react';
import {brand, hero} from '../content';
import {Link} from './Link';
import {Logo} from './Logo';

/**
 * What stays fixed on every page: the logo (home link), the menu button and
 * the floating "Get a free quote" box. The quote box steps aside on the
 * Contact page and while a quote form, the closing quote band or the footer is on screen — there it
 * would only duplicate the form and cover content.
 */
export function Header({path, menuOpen, onMenu}: {path: string; menuOpen: boolean; onMenu: () => void}) {
  const cta = useRef<HTMLAnchorElement>(null);
  const onContact = path === '/contact/';

  useEffect(() => {
    const el = cta.current;
    if (!el) return;
    const targets = [document.getElementById('quote'), document.getElementById('cta'), document.querySelector('footer')].filter(Boolean) as Element[];
    const seen = new Set<Element>();
    const apply = () => {
      const hide = onContact || seen.size > 0;
      // A data attribute, not a class: React re-rendering className would wipe a class.
      el.toggleAttribute('data-away', hide);
      el.tabIndex = hide ? -1 : 0;
    };
    apply();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
        apply();
      },
      {threshold: 0.15},
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [path, onContact]);

  return (
    <>
      <Link href="/" aria-label={`${brand.full}, home`} className="fixed top-5 left-5 z-[55] text-white mix-blend-difference md:top-7 md:left-14">
        <Logo />
      </Link>

      <button
        type="button"
        onClick={onMenu}
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        className={`caps fixed top-5 right-5 z-[55] flex cursor-pointer items-center gap-3 px-5 py-3 backdrop-blur-md transition-colors duration-500 md:top-7 md:right-8 md:gap-4 md:px-6 md:py-3.5 ${
          menuOpen ? 'bg-white text-ink' : 'border border-white/15 bg-ink/45 text-white hover:bg-ink/70'
        }`}
      >
        {menuOpen ? 'Close' : 'Menu'}
        <span className={`text-[16px] leading-none transition-transform duration-500 ease-silk ${menuOpen ? 'rotate-45' : ''}`} aria-hidden>
          +
        </span>
      </button>

      <Link
        ref={cta}
        href="/contact/"
        className={`caps fixed right-5 bottom-5 z-[55] px-8 py-4 transition-[background-color,color,translate] duration-500 ease-silk md:right-8 md:bottom-7 ${
          menuOpen ? 'bg-oxide text-white' : 'bg-white text-ink hover:bg-oxide hover:text-white'
        } data-[away]:translate-y-[180%]`}
      >
        {hero.cta[0]} <em className="normal-case">{hero.cta[1]}</em>
      </Link>
    </>
  );
}
