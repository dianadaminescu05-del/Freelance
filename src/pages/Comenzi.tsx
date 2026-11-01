import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '../components/PageHero';
import { REQUEST_CATEGORIES, REQUEST_ITEMS } from '../data/content';
import { SITE } from '../data/site';

const TABLE_HEADERS = ['Produs', 'Categorie', 'Dimensiuni', ''];

export default function Comenzi() {
  const [category, setCategory] = useState('Toate');
  const [itemId, setItemId] = useState(REQUEST_ITEMS[0].id);
  const [qty, setQty] = useState('');
  const [detalii, setDetalii] = useState('');

  const item = REQUEST_ITEMS.find((p) => p.id === itemId) ?? REQUEST_ITEMS[0];

  const visible = useMemo(
    () =>
      category === 'Toate'
        ? REQUEST_ITEMS
        : REQUEST_ITEMS.filter((p) => p.categorie === category),
    [category],
  );

  const selectItem = (id: string) => {
    setItemId(id);
    setQty('');
    setDetalii('');
  };

  const quantity = parseInt(qty, 10) || 0;
  const unit = item.unitMeasure ? ` ${item.unitMeasure}` : '';

  // Handed to the contact form so the visitor does not retype the choices.
  const requestDraft = [
    `Produs: ${item.nume}`,
    item.dimensiuni ? `Dimensiuni: ${item.dimensiuni}` : null,
    quantity > 0 ? `Cantitate: ${quantity.toLocaleString('ro-RO')}${unit}` : null,
    detalii.trim() ? `\n${detalii.trim()}` : null,
    detalii.trim() ? null : '\nDetalii suplimentare (dimensiuni, grafică, termen dorit):',
  ]
    .filter((line) => line !== null)
    .join('\n');

  return (
    <>
      <PageHero
        title="Cere o ofertă"
        breadcrumb="Cere o ofertă"
        subtitle="Alege produsul și spune-ne cantitatea, iar noi revenim cu un preț. Fiecare comandă se calculează în funcție de dimensiuni, material și tiraj."
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

              <div className="table-wrap">
                <table className="price-table">
                  <thead>
                    <tr>
                      {TABLE_HEADERS.map((h, i) => (
                        <th key={h || `col-${i}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((p) => {
                      const selected = p.id === itemId;
                      return (
                        <tr
                          key={p.id}
                          className={selected ? 'is-selected' : undefined}
                          onClick={() => selectItem(p.id)}
                          aria-selected={selected}
                        >
                          <td>
                            <span className="cell-name">
                              {selected && <span className="dot" />}
                              {p.nume}
                            </span>
                          </td>
                          <td className="cell-cat">{p.categorie}</td>
                          {/* Dimensions appear only where the client stated
                              them — three of the twenty-one. */}
                          <td className="cell-qty">{p.dimensiuni ?? '—'}</td>
                          <td>
                            <button
                              type="button"
                              className={`select-btn${selected ? ' is-selected' : ''}`}
                              aria-pressed={selected}
                              onClick={(e) => {
                                e.stopPropagation();
                                selectItem(p.id);
                              }}
                            >
                              {selected && <Check size={13} strokeWidth={3} aria-hidden="true" />}
                              {selected ? 'Selectat' : 'Selectează'}
                              <span className="sr-only"> {p.nume}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* --------------------------------------------- Request builder */}
            <aside className="calc">
              <p className="calc__eyebrow">Cererea ta</p>
              <h3>{item.nume}</h3>
              {item.dimensiuni && <p className="calc__meta">{item.dimensiuni}</p>}

              {/* A free field, not preset tiers. The tiers this replaced were
                  invented — no document states the company's order sizes. */}
              <div className="calc__field">
                <label className="calc__label" htmlFor="qty">
                  Cantitate{item.unitMeasure ? ` (${item.unitMeasure})` : ''}
                </label>
                <input
                  id="qty"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  placeholder="ex: 500"
                />
              </div>

              <div className="calc__field" style={{ marginBottom: '1.5rem' }}>
                <label className="calc__label" htmlFor="detalii">
                  Dimensiuni, material, finisaj
                </label>
                <textarea
                  id="detalii"
                  rows={3}
                  value={detalii}
                  onChange={(e) => setDetalii(e.target.value)}
                  placeholder="ex: 300 × 200 × 100 mm, carton ondulat, tipar 2 culori"
                />
              </div>

              <div className="calc__total">
                <p className="calc__summary-label">Rezumat</p>
                <p className="calc__summary" aria-live="polite">
                  {quantity > 0
                    ? `${quantity.toLocaleString('ro-RO')}${unit}`
                    : 'Cantitate nespecificată'}
                </p>
                <p className="calc__disclaimer">
                  Prețul depinde de dimensiuni, material și tiraj — îl stabilim după ce vedem
                  cerința.
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
