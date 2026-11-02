import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import PageHero from '../components/PageHero';
import PickCard from '../components/PickCard';
import { QUANTITY_BANDS, REQUEST_CATEGORIES, REQUEST_ITEMS } from '../data/content';
import { SITE } from '../data/site';
import { asset } from '../lib/asset';

/**
 * Cere ofertă — build a request of several items, then hand it to contact.
 *
 * A real request is rarely one thing: a pizzeria wants boxes by the
 * thousand and flyers by the hundred, in one ask. So the cards are
 * checkboxes, not a single choice, and quantity lives per line — one band
 * for the boxes, another for the flyers.
 *
 * Choosing by photo rather than by name is deliberate: the catalogue is
 * photographed, and a buyer recognises the box long before they recognise
 * "Cutie individuală duplex".
 *
 * Nothing here needs typing. Quantity is a band, and a band describes what
 * the BUYER wants — unlike the preset tiers this replaced, which claimed
 * order sizes no document states. "Altă cantitate…" is the one exception,
 * and the field only exists on the line that asked for it.
 *
 * Exact dimensions, material and artwork are left to the contact form's
 * message field, which this page pre-fills.
 */

const CUSTOM = 'Altă cantitate…';
const UNSET = 'Cantitate';

type Line = { id: string; band: string; custom: string };

export default function Comenzi() {
  const [category, setCategory] = useState('Toate');
  const [lines, setLines] = useState<Line[]>([]);
  const panelRef = useRef<HTMLElement>(null);

  const visible = useMemo(
    () =>
      category === 'Toate'
        ? REQUEST_ITEMS
        : REQUEST_ITEMS.filter((p) => p.categorie === category),
    [category],
  );

  const chosen = useMemo(() => new Set(lines.map((l) => l.id)), [lines]);

  const toggle = (id: string) =>
    setLines((prev) =>
      prev.some((l) => l.id === id)
        ? prev.filter((l) => l.id !== id)
        : [...prev, { id, band: UNSET, custom: '' }],
    );

  const patch = (id: string, change: Partial<Line>) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...change } : l)));

  /** One place decides how a line is worded, so the panel and the message
   *  handed to contact can never disagree. */
  const describe = (line: Line) => {
    const item = REQUEST_ITEMS.find((p) => p.id === line.id);
    if (!item) return null;
    const unit = item.unitMeasure ? ` ${item.unitMeasure}` : '';
    const typed = parseInt(line.custom, 10) || 0;

    let qty: string | null = null;
    if (line.band === CUSTOM) qty = typed > 0 ? `${typed.toLocaleString('ro-RO')}${unit}` : null;
    else if (line.band === 'Nu știu încă') qty = 'cantitate de stabilit';
    else if (line.band !== UNSET) qty = `${line.band}${unit}`;

    return { item, qty };
  };

  // All one category keeps the contact form's subject meaningful; a mixed
  // request has no single right answer, so it says so rather than picking
  // the first item's and quietly mislabelling the rest.
  const subject = useMemo(() => {
    const subs = new Set(
      lines.map((l) => REQUEST_ITEMS.find((p) => p.id === l.id)?.subject).filter(Boolean),
    );
    return subs.size === 1 ? ([...subs][0] as string) : 'Altele';
  }, [lines]);

  const requestDraft = [
    'Cerere de ofertă:',
    '',
    ...lines.map((l) => {
      const d = describe(l);
      if (!d) return '';
      const dim = d.item.dimensiuni ? ` (${d.item.dimensiuni})` : '';
      return `• ${d.item.nume}${dim} — ${d.qty ?? 'cantitate de stabilit'}`;
    }),
    '',
    'Detalii suplimentare (dimensiuni, material, grafică, termen dorit):',
  ].join('\n');

  const count = lines.length;

  return (
    <>
      <PageHero
        light
        title="Cere o ofertă"
        subtitle="Adaugă în cerere tot ce te interesează și pune o cantitate pentru fiecare. Revenim cu un preț."
        media={
          <figure className="hero-figure">
            <img
              src={asset('banner/cutii-pizza.webp')}
              alt="Cutii de pizza personalizate prin tipar, produse de Almariones"
              width={1254}
              height={1254}
              decoding="async"
            />
          </figure>
        }
      />

      <section className="page-section section--paper" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          <div className="orders-grid">
            {/* ------------------------------------------------ Product list */}
            <div>
              <div className="chip-row" role="group" aria-label="Filtrează după categorie">
                {REQUEST_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`chip${category === c ? ' is-active' : ''}`}
                    aria-pressed={category === c}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <ul className="pgrid pgrid--pick">
                {visible.map((p, i) => (
                  <PickCard
                    key={p.id}
                    item={p}
                    selected={chosen.has(p.id)}
                    onToggle={(x) => toggle(x.id)}
                    eager={i < 4}
                  />
                ))}
              </ul>
            </div>

            {/* --------------------------------------------- Request builder */}
            <aside className="calc" ref={panelRef} id="cererea-ta">
              <p className="calc__eyebrow">
                Cererea ta{count > 0 && ` · ${count} ${count === 1 ? 'poziție' : 'poziții'}`}
              </p>

              {count === 0 ? (
                <p className="calc__empty">
                  Alege din catalog ce te interesează. Poți adăuga mai multe produse în aceeași
                  cerere.
                </p>
              ) : (
                <ul className="rlines">
                  {lines.map((line) => {
                    const d = describe(line);
                    if (!d) return null;
                    const { item } = d;
                    return (
                      <li key={line.id} className="rline">
                        <div className="rline__head">
                          <span className="rline__name">{item.nume}</span>
                          <button
                            type="button"
                            className="rline__remove"
                            onClick={() => toggle(line.id)}
                          >
                            <X size={15} strokeWidth={2.5} aria-hidden="true" />
                            <span className="sr-only">Scoate {item.nume} din cerere</span>
                          </button>
                        </div>
                        {item.dimensiuni && <p className="rline__dim">{item.dimensiuni}</p>}

                        {/* A select, not the band buttons: seven buttons per
                            line would be forty-odd controls in a 340px
                            column, and on a phone this is one native tap. */}
                        <label className="sr-only" htmlFor={`qty-${line.id}`}>
                          Cantitate pentru {item.nume}
                          {item.unitMeasure ? ` (${item.unitMeasure})` : ''}
                        </label>
                        <select
                          id={`qty-${line.id}`}
                          className="rline__qty"
                          value={line.band}
                          onChange={(e) => patch(line.id, { band: e.target.value })}
                        >
                          <option value={UNSET}>
                            {UNSET}
                            {item.unitMeasure ? ` (${item.unitMeasure})` : ''}…
                          </option>
                          {[...QUANTITY_BANDS, CUSTOM].map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>

                        {line.band === CUSTOM && (
                          <input
                            className="rline__custom"
                            type="number"
                            inputMode="numeric"
                            min={1}
                            autoFocus
                            value={line.custom}
                            onChange={(e) => patch(line.id, { custom: e.target.value })}
                            placeholder="ex: 750"
                            aria-label={`Cantitatea dorită pentru ${item.nume}`}
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              <div className="calc__total">
                <p className="calc__disclaimer">
                  Prețul depinde de dimensiuni, material și tiraj — îl stabilim după ce vedem
                  cererea. Detaliile le poți adăuga în pasul următor.
                </p>
              </div>

              {count === 0 ? (
                <span className="btn btn--accent btn--block is-disabled" aria-disabled="true">
                  Continuă cererea
                  <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
                </span>
              ) : (
                <Link
                  to="/contact"
                  state={{ produs: subject, mesaj: requestDraft }}
                  className="btn btn--accent btn--block"
                >
                  Continuă cererea
                  <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
                </Link>
              )}

              <p className="calc__phone">
                sau sună <a href={SITE.phoneHref}>{SITE.phone}</a>
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* Below 900px the panel sits under 28 cards, so adding something
          gives no visible feedback. This is the receipt. */}
      {count > 0 && (
        <a className="rbar" href="#cererea-ta">
          <span className="rbar__count">{count}</span>
          {count === 1 ? 'poziție în cerere' : 'poziții în cerere'}
          <span className="rbar__cue" aria-hidden="true">
            Vezi cererea
            <ArrowRight size={14} strokeWidth={2.5} />
          </span>
        </a>
      )}
    </>
  );
}
