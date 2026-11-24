import {useSyncExternalStore} from 'react';
import {jumpTo} from './scroll';

/**
 * A tiny path router — the site has six pages, so it needs no library.
 *
 * Navigating between pages runs in three beats so the swap is never seen:
 * the curtain slabs wipe in ('cover'), the new page is committed underneath
 * and the scroll jumps, then the slabs wipe out ('reveal').
 */

export type Phase = 'idle' | 'cover' | 'reveal';

/**
 * The folder the site is served from: '' at a domain root, or e.g.
 * '/Dercksen-Construction-website-demo' on GitHub Pages (set by BASE_PATH
 * at build time). Paths inside the app never include it; it is added when a
 * path becomes a real URL and stripped when a URL is read back.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const withBase = (href: string) => (href.startsWith('/') && !href.startsWith('//') ? BASE + href : href);
const stripBase = (p: string) => (BASE && p.startsWith(BASE) ? p.slice(BASE.length) || '/' : p);

let path = '/';
let phase: Phase = 'idle';
let busy = false;
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());
const subscribe = (f: () => void) => {
  subs.add(f);
  return () => {
    subs.delete(f);
  };
};

/** `/services` and `/services/` are the same page. */
export function normalise(p: string) {
  let s = p.split('#')[0].split('?')[0] || '/';
  if (!s.endsWith('/')) s += '/';
  return s;
}

/** Sets the path before the first render (server: the page being prerendered; client: the URL). */
export function setPath(p: string) {
  path = normalise(stripBase(p));
}

export const usePath = () =>
  useSyncExternalStore(
    subscribe,
    () => path,
    () => path,
  );

export const usePhase = () =>
  useSyncExternalStore(
    subscribe,
    () => phase,
    () => 'idle' as Phase,
  );

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** After the new page has rendered: land on its hash target, or the top, and move focus there. */
function settle(hash: string) {
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const el = hash ? document.querySelector<HTMLElement>(hash) : null;
      jumpTo(el ?? 0);
      const focus = el ?? document.getElementById('main');
      if (focus) {
        if (!focus.hasAttribute('tabindex')) focus.setAttribute('tabindex', '-1');
        focus.focus({preventScroll: true});
      }
    }),
  );
}

export function navigate(href: string) {
  const url = new URL(href, window.location.origin);
  const next = normalise(url.pathname);
  const hash = url.hash;

  // Same page: just glide to the section (or the top).
  if (next === path) {
    jumpTo(hash ? document.querySelector<HTMLElement>(hash) ?? 0 : 0, false);
    if (hash) history.replaceState(null, '', withBase(next) + hash);
    return;
  }
  if (busy) return;

  const commit = () => {
    history.pushState(null, '', withBase(next) + hash);
    path = next;
    emit();
    settle(hash);
  };

  if (reduced()) {
    commit();
    return;
  }

  busy = true;
  phase = 'cover';
  emit();

  // Swap pages only once the last slab has actually finished covering the
  // screen (the Curtain reports its transitionend); the timer is a fallback
  // in case the event never fires, e.g. in a throttled background tab.
  let done = false;
  const swap = () => {
    if (done) return;
    done = true;
    onCovered = null;
    commit();
    window.setTimeout(() => {
      phase = 'reveal';
      emit();
      window.setTimeout(() => {
        phase = 'idle';
        busy = false;
        emit();
      }, 750);
    }, 120);
  };
  onCovered = swap;
  window.setTimeout(swap, 1400);
}

let onCovered: (() => void) | null = null;

/** Called by the Curtain when its last slab has finished sliding in. */
export function curtainCovered() {
  onCovered?.();
}

/** Back/forward buttons. */
export function listenHistory() {
  const onPop = () => {
    path = normalise(stripBase(window.location.pathname));
    emit();
    settle(window.location.hash);
  };
  window.addEventListener('popstate', onPop);
  return () => window.removeEventListener('popstate', onPop);
}
