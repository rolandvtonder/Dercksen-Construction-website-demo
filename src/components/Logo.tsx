import {brand} from '../content';

/**
 * The mark: a "D" whose top-left corner is cut to a 40° roof pitch — the
 * letter of the name and the gable of a house in one shape.
 */
export function Mark({className = ''}: {className?: string}) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden focusable="false">
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M5 36V15.5L16.5 5H21c9.4 0 15 6.1 15 15.5S30.4 36 21 36H5Zm7-6V18.3l7.3-6.3H21c5.5 0 8 3.4 8 8.5S26.5 30 21 30h-9Z"
      />
    </svg>
  );
}

/** Mark + wordmark, used in the fixed header and the footer. */
export function Logo({className = ''}: {className?: string}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Mark className="size-[30px] shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="display text-[22px] tracking-[0.14em]">{brand.name}</span>
        <span className="caps mt-1 text-[8.5px] tracking-[0.26em] opacity-80 max-sm:hidden">{brand.tagline}</span>
      </span>
    </span>
  );
}
