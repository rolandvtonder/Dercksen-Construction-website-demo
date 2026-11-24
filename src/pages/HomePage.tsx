import {About} from '../components/About';
import {CtaBand} from '../components/CtaBand';
import {Hero} from '../components/Hero';
import {Projects} from '../components/Projects';
import {Services} from '../components/Services';
import {Towns} from '../components/Towns';

/** Home: the film, the four-panel services, the towns, three projects and the story in brief. */
export function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Towns />
      <Projects limit={4} more />
      <About teaser />
      <CtaBand />
    </>
  );
}
