import {useRef, useState, type CSSProperties, type FormEvent} from 'react';
import {contact, quote, towns} from '../content';
import {useReveals} from '../hooks/useReveals';
import {dims, media, srcSet} from '../lib/media';
import {Lines} from './Heading';

type Field = 'name' | 'phone' | 'email' | 'town' | 'service' | 'message';
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const empty: Values = {name: '', phone: '', email: '', town: '', service: '', message: ''};

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Please tell us your name.';
  const digits = v.phone.replace(/\D/g, '');
  if (digits.length < 9 || digits.length > 12) e.phone = 'Enter a phone number we can call, e.g. 082 123 4567.';
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'That email address looks incomplete. Check it or leave it blank.';
  if (!v.service) e.service = 'Choose the kind of work you need.';
  return e;
}

function compose(v: Values) {
  const lines = [`Hi Dercksen, I'd like a quote.`, '', `Name: ${v.name}`, `Phone: ${v.phone}`];
  if (v.email) lines.push(`Email: ${v.email}`);
  if (v.town) lines.push(`Town: ${v.town}`);
  lines.push(`Work: ${v.service}`);
  if (v.message.trim()) lines.push('', v.message.trim());
  return lines.join('\n');
}

/**
 * Request-a-quote. There is no server yet, so a valid form opens WhatsApp
 * (how most West Coast clients already talk to builders) with the details
 * written out; an email link carries the same text as a fallback.
 */
/** `page`: the Contact page, where this section is the page itself and its title the h1. */
export function Quote({page = false}: {page?: boolean}) {
  const H = page ? 'h1' : 'h2';
  const root = useReveals<HTMLElement>();
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [sent, setSent] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);

  const set = (k: Field) => (e: {target: {value: string}}) => {
    const next = {...v, [k]: e.target.value};
    setV(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: Field) => () => {
    setTouched((t) => ({...t, [k]: true}));
    setErrors(validate(v));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    setTouched({name: true, phone: true, email: true, service: true});
    const bad = Object.keys(errs) as Field[];
    if (bad.length) {
      setSent(false);
      // Focus the first invalid field so keyboard and screen-reader users land on it.
      form.current?.querySelector<HTMLElement>(`[name="${bad[0]}"]`)?.focus();
      return;
    }
    setSent(true);
    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(compose(v))}`, '_blank', 'noopener');
    window.setTimeout(() => summary.current?.focus(), 50);
  };

  const show = (k: Field) => (touched[k] ? errors[k] : undefined);
  const input =
    'mt-2 block w-full border-0 border-b-2 bg-transparent px-0 py-3 text-[17px] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-oxide focus-visible:outline-none';
  const border = (k: Field) => (show(k) ? 'border-oxide' : 'border-ink/25');
  const label = 'caps text-ink/70';

  const fieldProps = (k: Field) => ({
    id: `q-${k}`,
    name: k,
    value: v[k],
    onChange: set(k),
    onBlur: blur(k),
    'aria-invalid': show(k) ? true : undefined,
    'aria-describedby': show(k) ? `q-${k}-err` : undefined,
  });
  const err = (k: Field) =>
    show(k) ? (
      <p id={`q-${k}-err`} className="mt-2 text-[14px] font-medium text-oxide-deep">
        {show(k)}
      </p>
    ) : null;

  return (
    <section ref={root} id="quote" aria-labelledby="quote-title" className="relative overflow-hidden bg-ink text-white">
      <img
        src={media('west-coast-village-1600.webp')}
        srcSet={srcSet('west-coast-village')}
        sizes="100vw"
        width={dims['west-coast-village'][0]}
        height={dims['west-coast-village'][1]}
        loading={page ? 'eager' : 'lazy'}
        decoding="async"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(22_20_18/0.92),rgb(22_20_18/0.7)_50%,rgb(22_20_18/0.45))]" />

      <div className={`relative mx-auto grid max-w-[1680px] gap-14 px-5 md:px-14 lg:grid-cols-12 lg:gap-10 ${page ? 'pt-36 pb-24 md:pt-48 md:pb-36' : 'py-24 md:py-36'}`}>
        <div className="lg:col-span-5">
          <p className="caps text-oxide" data-reveal>
            {quote.kicker}
          </p>
          <H id="quote-title" className="display mt-4 text-[clamp(46px,6vw,104px)]" data-reveal style={{'--d': '0.08s'} as CSSProperties}>
            {page && <span className="caps mb-4 block text-[12px] text-white/70 not-italic">Free building quotes on the West Coast</span>}
            <Lines lines={quote.title} />
          </H>
          <p className="copy mt-8 max-w-[440px] text-white/80" data-reveal style={{'--d': '0.12s'} as CSSProperties}>
            {quote.body}
          </p>

          <dl className="mt-12 grid max-w-[460px] gap-7 sm:grid-cols-2" data-reveal style={{'--d': '0.16s'} as CSSProperties}>
            <div>
              <dt className="caps text-white/55">Call</dt>
              <dd className="mt-1">
                <a href={`tel:${contact.phoneHref}`} className="display text-[26px] hover:text-oxide">
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="caps text-white/55">WhatsApp</dt>
              <dd className="mt-1">
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener" className="display text-[26px] hover:text-oxide">
                  Message us
                </a>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="caps text-white/55">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${contact.email}`} className="text-[18px] underline decoration-white/30 underline-offset-4 hover:text-oxide">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="caps text-white/55">Area</dt>
              <dd className="mt-1 text-[16px] text-white/85">{contact.region}</dd>
            </div>
            <div>
              <dt className="caps text-white/55">Hours</dt>
              <dd className="mt-1 text-[16px] text-white/85">{contact.hours}</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-6 lg:col-start-7" data-reveal style={{'--d': '0.1s'} as CSSProperties}>
          <form ref={form} noValidate onSubmit={submit} className="bg-paper p-7 text-ink md:p-12" aria-describedby="q-note">
            <p className="display text-[30px]">Request a free quote</p>
            <p id="q-note" className="mt-2 text-[15px] text-ink/65">
              Fields marked <span aria-hidden>*</span>
              <span className="sr-only">with an asterisk</span> are required.
            </p>

            <div className="mt-8 grid gap-7 md:grid-cols-2">
              <div>
                <label htmlFor="q-name" className={label}>
                  Your name *
                </label>
                <input {...fieldProps('name')} type="text" autoComplete="name" required className={`${input} ${border('name')}`} />
                {err('name')}
              </div>
              <div>
                <label htmlFor="q-phone" className={label}>
                  Phone *
                </label>
                <input {...fieldProps('phone')} type="tel" inputMode="tel" autoComplete="tel" required placeholder="082 123 4567" className={`${input} ${border('phone')}`} />
                {err('phone')}
              </div>
              <div>
                <label htmlFor="q-email" className={label}>
                  Email
                </label>
                <input {...fieldProps('email')} type="email" autoComplete="email" className={`${input} ${border('email')}`} />
                {err('email')}
              </div>
              <div>
                <label htmlFor="q-town" className={label}>
                  Town
                </label>
                <select {...fieldProps('town')} className={`${input} ${border('town')} cursor-pointer`}>
                  <option value="">Choose a town</option>
                  {towns.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                  <option>Elsewhere in the Western Cape</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="q-service" className={label}>
                  Type of work *
                </label>
                <select {...fieldProps('service')} required className={`${input} ${border('service')} cursor-pointer`}>
                  <option value="">Choose one</option>
                  {quote.serviceOptions.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {err('service')}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="q-message" className={label}>
                  About the job
                </label>
                <textarea {...fieldProps('message')} rows={4} placeholder="Size, timing, budget, anything we should know" className={`${input} ${border('message')} resize-y`} />
                <p className="mt-2 text-[14px] text-ink/55">Photos help: you can send them on WhatsApp once the chat opens.</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <button type="submit" className="caps cursor-pointer bg-oxide px-9 py-4.5 text-white transition-colors duration-300 hover:bg-ink">
                Send via <em className="normal-case">WhatsApp</em>
              </button>
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent('Quote request')}&body=${encodeURIComponent(compose(v))}`}
                className="caps text-ink/75 underline decoration-ink/30 underline-offset-4 hover:text-oxide"
              >
                Or send by email
              </a>
            </div>

            <div ref={summary} tabIndex={-1} role="status" aria-live="polite" className="mt-6 text-[15px] text-ink/80">
              {sent && 'Thanks. WhatsApp should have opened with your details ready to send. If it did not, use the email link above.'}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
