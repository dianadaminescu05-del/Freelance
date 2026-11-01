import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import PickCard from '../components/PickCard';
import { QUANTITY_BANDS, REQUEST_CATEGORIES, REQUEST_ITEMS } from '../data/content';
import { SITE } from '../data/site';

/**
 * Cere ofertă — two choices and a button, no typing.
 *
 * This replaced a table of names plus a number field and a free-text box.
 * Picking packaging by name is the wrong way round: the catalogue is
 * photographed and a buyer recognises the box long before they recognise
 * "Cutie individuală duplex". So the picker is the catalogue's own card
 * grid, and quantity is a band rather than an exact figure — enough to
 * price against, and nothing to type.
 *
 * Anything finer — exact dimensions, material, artwork — is left to the
 * contact form's message field, which this page pre-fills. Asking for it
 * twice would be the third input in a row.
 */
export default function Comenzi() {
  const [category, setCategory] = useState('Toate');
  const [itemId, setItemId] = useState(REQUEST_ITEMS[0].id);
  const [band, setBand] = useState<string | null>(null);

  const item = REQUEST_ITEMS.find((p) => p.id === itemId) ?? REQUEST_ITEMS[0];

  const visible = useMemo(
    () =>
      category === 'Toate'
        ? REQUEST_ITEMS
        : REQUEST_ITEMS.filter((p) => p.categorie === category),
    [category],
  );

  const unit = item.unitMeasure ? ` ${item.unitMeasure}` : '';
  const qtyLine =
    band && band !== 'Nu știu încă' ? `Cantitate: ${band}${unit}` : null;

  // Handed to the contact form so the visitor does not retype the choices.
  const requestDraft = [
    `Produs: ${item.nume}`,
    item.dimensiuni ? `Dimensiuni: ${item.dimensiuni}` : null,
    qtyLine,
    band === 'Nu știu încă' ? 'Cantitate: de stabilit' : null,
    '',
    'Detalii suplimentare (dimensiuni, material, grafică, termen dorit):',
  ]
    .filter((line) => line !== null)
    .join('\n');

  return (
    <>
      <PageHero
        title="Cere o ofertă"
        breadcrumb="Cere o ofertă"
        subtitle="Alege produsul și cantitatea, iar noi revenim cu un preț. Fiecare comandă se execută la dimensiunile și tirajul cerute."
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

              <ul className="pgrid pgrid--pick" role="radiogroup" aria-label="Alege produsul">
                {visible.map((p, i) => (
                  <PickCard
                    key={p.id}
                    item={p}
                    selected={p.id === itemId}
                    onSelect={(x) => setItemId(x.id)}
                    eager={i < 4}
                  />
                ))}
              </ul>
            </div>

            {/* --------------------------------------------- Request builder */}
            <aside className="calc">
              <p className="calc__eyebrow">Cererea ta</p>
              <h3>{item.nume}</h3>
              {item.dimensiuni && <p className="calc__meta">{item.dimensiuni}</p>}

              <div className="calc__field">
                <span className="calc__label" id="qty-label">
                  Cantitate{item.unitMeasure ? ` (${item.unitMeasure})` : ''}
                </span>
                <div className="qty-bands" role="radiogroup" aria-labelledby="qty-label">
                  {QUANTITY_BANDS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      className={`qty-btn${band === b ? ' is-active' : ''}`}
                      role="radio"
                      aria-checked={band === b}
                      onClick={() => setBand(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc__total">
                <p className="calc__summary-label">Rezumat</p>
                <p className="calc__summary" aria-live="polite">
                  {band ?? 'Alege cantitatea'}
                </p>
                <p className="calc__disclaimer">
                  Prețul depinde de dimensiuni, material și tiraj — îl stabilim după ce vedem
                  cerința. Detaliile le poți adăuga în pasul următor.
                </p>
              </div>

              <Link
                to="/contact"
                state={{ produs: item.subject, mesaj: requestDraft }}
                className="btn btn--accent btn--block"
              >
                Continuă cererea
                <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
              </Link>
              <p className="calc__phone">
                sau sună <a href={SITE.phoneHref}>{SITE.phone}</a>
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
