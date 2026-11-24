import type {AnchorHTMLAttributes, Ref} from 'react';
import {navigate} from '../lib/router';

/**
 * An ordinary <a> for crawlers and new-tab clicks; a plain left click is
 * routed in-page so the curtain transition plays and nothing reloads.
 */
export function Link({
  href,
  onClick,
  ref,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {href: string; ref?: Ref<HTMLAnchorElement>}) {
  return (
    <a
      ref={ref}
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    />
  );
}
