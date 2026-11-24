import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {contact, nav, socials} from '../content';

/**
 * The menu: three slabs wipe in from the right one after another
 * (ink, brick oxide, limestone); the limestone one stays and holds the items.
 * Hovering an item ripples it like heat haze off a summer slab — an SVG
 * turbulence + displacement filter whose strength and phase move per frame.
 */
export function Menu({open, path, onClose, onNavigate}: {open: boolean; path: string; onClose: () => void; onNavigate: (href: string) => void}) {
  const [hover, setHover] = useState(-1);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  // Animate the ripple only while something is hovered.
  useEffect(() => {
    if (hover < 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let t = 0;
    let amp = 0;
    const loop = () => {
      t += 0.016;
      amp = Math.min(1, amp + 0.08);
      turb.current?.setAttribute('baseFrequency', `${(0.012 + Math.sin(t * 2.1) * 0.004).toFixed(4)} ${(0.06 + Math.cos(t * 1.7) * 0.02).toFixed(4)}`);
      turb.current?.setAttribute('seed', String(Math.floor(t * 12) % 50));
      disp.current?.setAttribute('scale', (amp * 9).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      disp.current?.setAttribute('scale', '0');
    };
  }, [hover]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Put keyboard focus on the first item once the slabs are in.
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => first.current?.focus({preventScroll: true}), 450);
    return () => window.clearTimeout(id);
  }, [open]);

  const slab = (extra: string) =>
    `absolute inset-y-0 right-0 w-[min(34vw,480px)] max-md:w-full transition-transform duration-[800ms] ease-wipe ${extra} ${
      open ? 'translate-x-0' : 'translate-x-[104%]'
    }`;
  // Open: ink → oxide → limestone, staggered. Close: the reverse, faster.
  const delay = (k: number): CSSProperties => ({transitionDelay: `${open ? k * 0.09 : (2 - k) * 0.06}s`});

  return (
    <div id="site-menu" inert={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <svg className="absolute size-0" aria-hidden>
        <filter id="ripple" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Click-away */}
      <button type="button" aria-label="Close menu" tabIndex={-1} onClick={onClose} className="absolute inset-0 cursor-default" />

      <div className={slab('bg-ink')} style={delay(0)} />
      <div className={slab('bg-oxide')} style={delay(1)} />
      <nav className={slab('flex flex-col justify-between overflow-y-auto bg-paper px-8 pt-28 pb-28 text-ink md:px-10 md:pb-28')} style={delay(2)} aria-label="Main menu">
        <ul onMouseLeave={() => setHover(-1)}>
          {nav.map((item, i) => (
            <li
              key={item.label}
              className={`transition-[opacity,transform] duration-700 ease-silk ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{transitionDelay: open ? `${0.42 + i * 0.06}s` : '0s'} as CSSProperties}
            >
              <a
                ref={i === 0 ? first : undefined}
                href={item.href}
                aria-current={item.href === path ? 'page' : undefined}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(-1)}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.href);
                }}
                className={`display relative inline-block py-1 text-[clamp(34px,3.1vw,50px)] transition-opacity duration-300 ${
                  hover >= 0 && hover !== i ? 'opacity-35' : 'opacity-100'
                }`}
                style={{filter: hover === i ? 'url(#ripple)' : 'none'}}
              >
                {item.label}
                {item.href === path && <span className="absolute top-1/2 -left-5 block size-2 -translate-y-1/2 bg-oxide" aria-hidden />}
                <sup className="caps absolute -right-7 top-2 text-[10px] tracking-normal text-ink/45">0{i + 1}</sup>
              </a>
            </li>
          ))}
        </ul>
        <div className={`mt-10 space-y-6 transition-opacity delay-700 duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <p className="caps text-ink/55">Call or WhatsApp</p>
            <a href={`tel:${contact.phoneHref}`} className="display mt-1 block text-[26px] hover:text-oxide">
              {contact.phone}
            </a>
          </div>
          <div>
            <p className="caps text-ink/55">Follow us</p>
            <div className="mt-2 flex gap-5">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="caps text-ink/85 hover:text-oxide" target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
