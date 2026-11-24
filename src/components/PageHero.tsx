import {useCameraPull} from '../hooks/useCameraPull';
import {dims, media, srcSet} from '../lib/media';
import {Lines} from './Heading';
import {Link} from './Link';

type Props = {
  crumb: string;
  /** Small keyword line set inside the h1 (what we do and where), above the display title. */
  keyword: string;
  title: {t: string; i?: boolean}[];
  intro: string;
  /** A photo name from public/media; `wide` photos also have a 2400px export. */
  image: {name: string; alt: string; position?: string; wide?: boolean};
};

/**
 * The top of every inner page: the page's h1 over a photo, with the
 * same camera pull-back as the home hero, and a breadcrumb back home.
 */
export function PageHero({crumb, keyword, title, intro, image}: Props) {
  const {root, stage} = useCameraPull();

  return (
    <section ref={root} id="top" aria-labelledby="page-title" className="relative h-[86svh] min-h-[580px] overflow-hidden bg-ink">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <img
          src={media(`${image.name}-1600.webp`)}
          srcSet={srcSet(image.name, image.wide ? [800, 1600, 2400] : undefined)}
          sizes="100vw"
          width={dims[image.name]?.[0]}
          height={dims[image.name]?.[1]}
          alt={image.alt}
          fetchPriority="high"
          className="h-full w-full object-cover"
          style={{objectPosition: image.position}}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(22_20_18/0.78),rgb(22_20_18/0.35)_60%,rgb(22_20_18/0.15))]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgb(22_20_18/0.75),transparent)]" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1680px] px-5 pb-14 md:px-14 md:pb-20">
          <nav aria-label="Breadcrumb">
            <ol className="caps flex gap-2 text-white/65">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-white/90">
                {crumb}
              </li>
            </ol>
          </nav>
          <h1 id="page-title" className="mt-5 text-white">
            <span className="caps block text-white/75">{keyword}</span>
            <span className="display mt-3 block text-[clamp(52px,7.4vw,136px)] drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
              <Lines lines={title} />
            </span>
          </h1>
          <p className="copy mt-8 max-w-[520px] text-white/85 max-md:text-[16px]">{intro}</p>
        </div>
      </div>
    </section>
  );
}
