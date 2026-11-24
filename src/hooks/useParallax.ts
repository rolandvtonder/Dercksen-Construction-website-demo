import {useEffect, useRef} from 'react';
import {onFrame} from '../lib/scroll';

/**
 * Drifts an element vertically as it crosses the viewport — `amount` px at
 * each end, 0 when centred. Runs on the shared rAF loop and writes the
 * transform directly, so it never re-renders. Off under reduced motion.
 */
export function useParallax<T extends HTMLElement>(amount = 40) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    return onFrame(() => {
      const el = ref.current;
      const box = el?.parentElement;
      if (!el || !box) return;
      const r = box.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -100 || r.top > vh + 100) return;
      const t = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1 … 1
      el.style.transform = `translate3d(0, ${(t * amount).toFixed(1)}px, 0) scale(1.12)`;
    });
  }, [amount]);

  return ref;
}
