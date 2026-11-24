import type {CSSProperties} from 'react';
import {curtainCovered, usePhase} from '../lib/router';
import {Mark} from './Logo';

/**
 * The page transition: the menu's slabs, full width. Ink then oxide wipe in
 * from the right to cover the old page, the new one is swapped in beneath,
 * and both carry on out to the left.
 */
export function Curtain() {
  const phase = usePhase();
  const pos = phase === 'cover' ? 'translate-x-0' : phase === 'reveal' ? '-translate-x-full' : 'translate-x-full';
  // No transition while idle, so the slabs snap back to the right unseen.
  const motion = phase === 'idle' ? 'duration-0' : 'duration-[620ms] ease-wipe';
  const delay = (k: number): CSSProperties => ({
    transitionDelay: `${phase === 'cover' ? k * 0.08 : phase === 'reveal' ? (1 - k) * 0.08 : 0}s`,
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-[65] overflow-hidden" aria-hidden>
      <div className={`absolute inset-0 bg-ink transition-transform ${motion} ${pos}`} style={delay(0)} />
      <div
        className={`absolute inset-0 flex items-center justify-center bg-oxide transition-transform ${motion} ${pos}`}
        style={delay(1)}
        onTransitionEnd={(e) => {
          if (e.target === e.currentTarget && phase === 'cover') curtainCovered();
        }}
      >
        <Mark className="size-14 text-paper" />
      </div>
    </div>
  );
}
