import {useCallback, useEffect, useState, type ComponentType} from 'react';
import {listenHistory, navigate, usePath} from './lib/router';
import {startScroll} from './lib/scroll';
import {useReducedMotion} from './hooks/useReducedMotion';
import {Header} from './components/Header';
import {Menu} from './components/Menu';
import {Footer} from './components/Footer';
import {Curtain} from './components/Curtain';
import {HomePage} from './pages/HomePage';
import {ServicesPage} from './pages/ServicesPage';
import {ProjectsPage} from './pages/ProjectsPage';
import {AboutPage} from './pages/AboutPage';
import {ProcessPage} from './pages/ProcessPage';
import {ContactPage} from './pages/ContactPage';
import {NotFoundPage} from './pages/NotFoundPage';
import {routeFor} from './routes';
import {site} from './content';

const pages: Record<string, ComponentType> = {
  '/': HomePage,
  '/services/': ServicesPage,
  '/projects/': ProjectsPage,
  '/about/': AboutPage,
  '/how-we-work/': ProcessPage,
  '/contact/': ContactPage,
};

/** Keeps <title>, description, canonical and share tags in step with the page after in-app navigation. */
function useHead(path: string) {
  useEffect(() => {
    const r = routeFor(path);
    document.title = r.title;
    const set = (sel: string, attr: string, value: string) => document.querySelector(sel)?.setAttribute(attr, value);
    const url = `${site.url}${r.path === '/404/' ? '/' : r.path}`;
    set('meta[name="description"]', 'content', r.description);
    set('link[rel="canonical"]', 'href', url);
    set('meta[property="og:url"]', 'content', url);
    set('meta[property="og:title"]', 'content', r.title);
    set('meta[property="og:description"]', 'content', r.description);
  }, [path]);
}

export default function App() {
  const reduced = useReducedMotion();
  const path = usePath();
  const [open, setOpen] = useState(false);
  useEffect(() => startScroll(reduced), [reduced]);
  useEffect(() => listenHistory(), []);
  useHead(path);

  const close = useCallback(() => setOpen(false), []);
  const go = useCallback((href: string) => {
    setOpen(false);
    navigate(href);
  }, []);

  const Page = pages[path] ?? NotFoundPage;

  return (
    <>
      <a href="#main" className="caps sr-only z-[70] bg-white px-5 py-3 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4">
        Skip to content
      </a>
      <Header path={path} menuOpen={open} onMenu={() => setOpen((o) => !o)} />
      <main id="main">
        <Page key={path} />
      </main>
      <Footer />
      <Menu open={open} path={path} onClose={close} onNavigate={go} />
      <Curtain />
      <div className="grain" aria-hidden />
    </>
  );
}
