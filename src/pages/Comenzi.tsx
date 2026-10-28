import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '../components/PageHero';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../data/content';
import { SITE } from '../data/site';

const TABLE_HEADERS = ['Produs', 'Categorie', 'Cantitate uzuală', ''];

export default function Comenzi() {
  const [category, setCategory] = useState('Toate');
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [tierIndex, setTierIndex] = useState(0);
  const [finishIndex, setFinishIndex] = useState(0);
  const [customQty, setCustomQty] = useState('');

  const product = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0];
  const tier = product.tiers[tierIndex];
  const finish = product.finisaje?.[finishIndex];

  const visible = useMemo(
    () => (category === 'Toate' ? PRODUCTS : PRODUCTS.filter((p) => p.categorie === category)),
    [category],
  );

  const typedQty = parseInt(customQty, 10) || 0;
  const quantity = typedQty > 0 ? typedQty : tier.cant;

  const selectProduct = (id: string) => {
    setProductId(id);
    setTierIndex(0);
    setFinishIndex(0);
    setCustomQty('');
  };

  // Handed to the contact form so the visitor does not retype the choices.
  const requestDraft = [
    `Produs: ${product.nume}`,
    `Cantitate: ${quantity.toLocaleString('ro-RO')} ${product.unitMeasure}`,
    finish ? `Finisaj: ${finish}` : null,
    '',
    'Detalii suplimentare (dimensiuni, grafică, termen dorit):',
  ]
    .filter((line) => line !== null)
    .join('\n');

  return (
    <>
      <PageHero
        title="Cere o ofertă"
        breadcrumb="Cere o ofertă"
        subtitle="Alege produsul și cantitatea, iar noi revenim cu un preț. Fiecare comandă se calculează în funcție de dimensiuni, material și tiraj."
      />

      <section className="page-section section--paper" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          <div className="orders-grid">
            {/* ------------------------------------------------ Product list */}
            <div>
              <div className="chip-row" role="group" aria-label="Filtrează după categorie">
                {PRODUCT_CATEGORIES.map((c) => (
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
                      const selected = p.id === productId;
                      return (
                        <tr
                          key={p.id}
                          className={selected ? 'is-selected' : undefined}
                          onClick={() => selectProduct(p.id)}
                          aria-selected={selected}
                        >
                          <td>
                            <span className="cell-name">
                              {selected && <span className="dot" />}
                              {p.nume}
                            </span>
                          </td>
                          <td className="cell-cat">{p.categorie}</td>
                          <td className="cell-qty">
                            de la {p.tiers[0].cant.toLocaleString('ro-RO')} {p.unitMeasure}
                          </td>
                          <td>
                            <button
                              type="button"
                              className={`select-btn${selected ? ' is-selected' : ''}`}
                              aria-pressed={selected}
                              onClick={(e) => {
                                e.stopPropagation();
                                selectProduct(p.id);
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
              <h3>{product.nume}</h3>

              <div className="calc__field">
                <span className="calc__label">Cantitate ({product.unitMeasure})</span>
                <div className="calc__tiers" role="group" aria-label="Cantitate">
                  {product.tiers.map((t, i) => {
                    const on = tierIndex === i && !customQty;
                    return (
                      <button
                        key={t.cant}
                        type="button"
                        className={`tier-btn${on ? ' is-active' : ''}`}
                        aria-pressed={on}
                        onClick={() => {
                          setTierIndex(i);
                          setCustomQty('');
                        }}
                      >
                        {t.cant.toLocaleString('ro-RO')}
                        <span className="sr-only"> {product.unitMeasure}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="calc__field">
                <label className="calc__label" htmlFor="custom-qty">
                  Sau introdu cantitatea
                </label>
                <input
                  id="custom-qty"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={customQty}
                  onChange={(e) => setCustomQty(e.target.value)}
                  placeholder={`ex: ${product.tiers[0].cant}`}
                />
              </div>

              {product.finisaje && (
                <div className="calc__field" style={{ marginBottom: '1.5rem' }}>
                  <label className="calc__label" htmlFor="finish">
                    Finisaj
                  </label>
                  <select
                    id="finish"
                    value={finishIndex}
                    onChange={(e) => setFinishIndex(parseInt(e.target.value, 10))}
                  >
                    {product.finisaje.map((f, i) => (
                      <option key={f} value={i} style={{ background: '#111', color: '#fff' }}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="calc__total">
                <p className="calc__summary-label">Rezumat</p>
                <p className="calc__summary" aria-live="polite">
                  {quantity.toLocaleString('ro-RO')} {product.unitMeasure}
                  {finish ? ` · ${finish}` : ''}
                </p>
                <p className="calc__disclaimer">
                  Prețul depinde de dimensiuni, material și tiraj — îl stabilim după ce vedem
                  cerința.
                </p>
              </div>

              <Link
                to="/contact"
                state={{ produs: product.subject, mesaj: requestDraft }}
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
