import {Quote} from '../components/Quote';
import {Towns} from '../components/Towns';

/** Contact: the quote form is the page, with the towns we cover beneath it. */
export function ContactPage() {
  return (
    <>
      <Quote page />
      <Towns />
    </>
  );
}
