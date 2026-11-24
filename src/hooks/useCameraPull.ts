import {useEffect, useRef} from 'react';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';

/**
 * The hero transition, shared by the home hero and every page hero: as the
 * section scrolls away its stage blurs, dims and shrinks back — a camera
 * pulling out rather than a fade. Off under reduced motion.
 */
export function useCameraPull() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    return onFrame(() => {
      const el = root.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const h = window.innerHeight;
      const p = clamp(-r.top / Math.max(1, Math.min(h, r.height)));
      if (stage.current) {
        stage.current.style.transform = `translate3d(0, ${(p * r.height * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        stage.current.style.filter = p > 0.01 ? `blur(${(p * 18).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }
    });
  }, []);

  return {root, stage};
}
