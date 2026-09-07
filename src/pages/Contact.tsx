import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, Check, Mail, MapPin, MessageCircle, MessagesSquare, Phone } from 'lucide-react';
import PageHero from '../components/PageHero';
import { CONTACT_SUBJECTS } from '../data/content';
import { SITE } from '../data/site';

type FormState = {
  nume: string;
  email: string;
  telefon: string;
  firma: string;
  mesaj: string;
  produs: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = { nume: '', email: '', telefon: '', firma: '', mesaj: '', produs: '' };

const METHODS = [
  { label: 'Telefon', value: SITE.phone, href: SITE.phoneHref, Icon: Phone },
  { label: 'Email', value: SITE.email, href: SITE.emailHref, Icon: Mail },
  {
    label: 'Adresă',
    value: `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.zip}`,
    href: SITE.maps,
    Icon: MapPin,
  },
  { label: 'Messenger', value: SITE.name, href: SITE.messenger, Icon: MessagesSquare },
];

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.nume.trim()) errors.nume = 'Te rugăm să introduci numele.';
  if (!form.email.trim()) errors.email = 'Te rugăm să introduci adresa de email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
    errors.email = 'Adresa de email nu pare validă.';
  if (!form.mesaj.trim()) errors.mesaj = 'Spune-ne pe scurt ce ai nevoie.';
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  const update = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    setForm(next);
    // Re-validate only after a failed submit, so we never scold someone
    // mid-keystroke on their first pass through the form.
    if (submitted) setErrors(validate(next));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Send focus to the first field that needs attention.
      const first = Object.keys(found)[0];
      document.getElementById(first)?.focus();
      return;
    }

    // TODO: POST to the real endpoint here.
    setSent(true);
    window.setTimeout(() => successRef.current?.focus(), 50);
  };

  const reset = () => {
    setSent(false);
    setSubmitted(false);
    setErrors({});
    setForm(EMPTY);
  };

  /** Wires a field to its error message for both sighted and AT users. */
  const fieldProps = (name: keyof FormState) => ({
    id: name,
    name,
    value: form[name],
    onChange: update,
    'aria-invalid': errors[name] ? (true as const) : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  const FieldError = ({ name }: { name: keyof FormState }) =>
    errors[name] ? (
      <p className="field-error" id={`${name}-error`}>
        <AlertCircle size={14} strokeWidth={2.5} aria-hidden="true" />
        {errors[name]}
      </p>
    ) : null;

  return (
    <>
      <PageHero title="Contact" breadcrumb="Contact" />

      <section className="page-section section--paper">
        <div className="container">
          <div className="two-col contact-cols">
            {/* --------------------------------------------- Contact details */}
            <div>
              <p className="lead" style={{ marginBottom: '2.5rem' }}>
                Suntem disponibili luni–vineri, 08:00–17:00. Răspundem la cereri de ofertă în maximum
                24 de ore lucrătoare.
              </p>

              <div className="contact-methods">
                {METHODS.map(({ label, value, href, Icon }) => (
                  <div key={label} className="contact-method">
                    <span className="contact-method__icon" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <div>
                      <span className="field-label">{label}</span>
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                      >
                        {value}
                        {href.startsWith('http') && (
                          <span className="sr-only"> (se deschide într-o filă nouă)</span>
                        )}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <a
                className="whatsapp-btn"
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
                Scrie pe WhatsApp
                <span className="sr-only"> (se deschide într-o filă nouă)</span>
              </a>

              <div className="callout">
                <p>
                  <strong style={{ color: 'var(--ink)' }}>Program:</strong> Luni–Vineri, 08:00–17:00
                  <br />
                  Sâmbătă–Duminică: închis
                </p>
              </div>
            </div>

            {/* ------------------------------------------------------- Form */}
            <div className="form-card">
              {sent ? (
                <div className="form-success" ref={successRef} tabIndex={-1} role="status">
                  <div className="form-success__icon" aria-hidden="true">
                    <Check size={22} strokeWidth={2.5} aria-hidden="true" />
                  </div>
                  <h3>Mesaj trimis!</h3>
                  <p>Îți mulțumim. Vom reveni cu o ofertă în 24 de ore lucrătoare.</p>
                  <button type="button" onClick={reset}>
                    Trimite altă cerere
                  </button>
                </div>
              ) : (
                <form className="form-stack" onSubmit={handleSubmit} noValidate>
                  <h3>Cerere de ofertă</h3>

                  <div className="form-row">
                    <div>
                      <label className="field-label" htmlFor="nume">
                        Nume <span aria-hidden="true">*</span>
                        <span className="sr-only">(obligatoriu)</span>
                      </label>
                      <input {...fieldProps('nume')} autoComplete="name" placeholder="Ion Popescu" />
                      <FieldError name="nume" />
                    </div>
                    <div>
                      <label className="field-label" htmlFor="firma">
                        Firmă
                      </label>
                      <input
                        {...fieldProps('firma')}
                        autoComplete="organization"
                        placeholder="SC Exemplu SRL"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="field-label" htmlFor="email">
                      Email <span aria-hidden="true">*</span>
                      <span className="sr-only">(obligatoriu)</span>
                    </label>
                    <input
                      {...fieldProps('email')}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="ion@firma.ro"
                    />
                    <FieldError name="email" />
                  </div>

                  <div>
                    <label className="field-label" htmlFor="telefon">
                      Telefon
                    </label>
                    <input
                      {...fieldProps('telefon')}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="07xx xxx xxx"
                    />
                  </div>

                  <div>
                    <label className="field-label" htmlFor="produs">
                      Produs / Serviciu
                    </label>
                    <select {...fieldProps('produs')}>
                      <option value="">Selectează...</option>
                      {CONTACT_SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="field-label" htmlFor="mesaj">
                      Mesaj <span aria-hidden="true">*</span>
                      <span className="sr-only">(obligatoriu)</span>
                    </label>
                    <textarea
                      {...fieldProps('mesaj')}
                      rows={4}
                      placeholder="Cantitate, format, termen dorit..."
                    />
                    <FieldError name="mesaj" />
                  </div>

                  {/* The button stays enabled: a disabled control gives no
                      reason for being disabled. Submitting surfaces the
                      specific problems instead. */}
                  <button type="submit" className="btn btn--primary btn--block">
                    Trimite cererea
                  </button>
                  <p className="form-hint">* câmpuri obligatorii</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
