import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import ProductDialog from '../components/ProductDialog';
import { EASE } from '../components/motion';
import { CATEGORII, GAMA_COMPLETA, PRODUSE, type CatalogProduct } from '../data/produse';

const TOATE = 'Toate';

export default function Servicii() {
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState<CatalogProduct | null>(null);

  // Category lives in the URL so the home cards can deep-link into a filter
  // and a filtered view stays shareable.
  const raw = params.get('categorie');
  const active = CATEGORII.includes(raw as never) ? (raw as string) : TOATE;

  const setActive = (c: string) => {
    if (c === TOATE) params.delete('categorie');
    else params.set('categorie', c);
    setParams(params, { replace: true });
  };

  const visible = useMemo(
    () => (active === TOATE ? PRODUSE : PRODUSE.filter((p) => p.categorie === active)),
    [active],
  );

  return (
    <>
      <PageHero
        title="Produse"
        breadcrumb="Produse"
        subtitle="Ambalaje și cutii din carton, produse în hala noastră din Lugoj. Fiecare model se execută la dimensiunile și tirajul cerute."
      />

      {/* ------------------------------------------------- Range opener */}
      <section className="page-section section--paper" style={{ paddingBottom: '1.5rem' }}>
        <div className="container">
          <motion.div
            className="range-intro"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* The source is square and beautifully composed — shown whole
                rather than cropped into a letterbox band. */}
            <figure className="range-intro__media">
              <img
                src={`/produse/${GAMA_COMPLETA.slug}-1200.jpg`}
                srcSet={`/produse/${GAMA_COMPLETA.slug}-600.jpg 600w, /produse/${GAMA_COMPLETA.slug}-1200.jpg 1200w`}
                sizes="(max-width: 900px) 92vw, 520px"
                alt={GAMA_COMPLETA.alt}
                width={1200}
                height={1200}
                decoding="async"
              />
            </figure>

            <div className="range-intro__text">
              <p className="section-label">Gama completă</p>
              <div className="divider" />
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1.25rem' }}>
                {PRODUSE.length} de modele, toate din carton
              </h2>
              <p className="lead">
                Gama cuprinde cutii individuale, ambalaje alimentare, cutii pentru hrană animale,
                ambalaje de transport și separatoare — produse în hala noastră din Lugoj.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------------- Catalog */}
      <section className="page-section section--paper" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          <div className="catalog-head">
            <div>
              <p className="section-label">Catalog</p>
              <div className="divider" />
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>Ce producem</h2>
            </div>
            <p className="catalog-count" aria-live="polite">
              {visible.length} {visible.length === 1 ? 'produs' : 'produse'}
              {active !== TOATE && ` în ${active}`}
            </p>
          </div>

          <div className="chip-row" role="group" aria-label="Filtrează după categorie">
            {[TOATE, ...CATEGORII].map((c) => (
              <button
                key={c}
                type="button"
                className={`chip${active === c ? ' is-active' : ''}`}
                aria-pressed={active === c}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <ul className="pgrid">
            {visible.map((p, i) => (
              <ProductCard key={p.slug} product={p} onOpen={setOpen} eager={i < 4} />
            ))}
          </ul>

          <p className="catalog-note">
            Nu găsești formatul de care ai nevoie?{' '}
            <Link to="/contact" className="link-accent" style={{ display: 'inline-flex' }}>
              Execuție la comandă
              <ArrowRight size={13} strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ CTA */}
      <section className="section--accent" style={{ padding: '4rem 0' }}>
        <div className="container cta-strip cta-strip--accent">
          <h2>Spune-ne ce ai nevoie</h2>
          <Link to="/contact" className="btn btn--on-accent">
            Cere o ofertă
            <ArrowRight size={15} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <ProductDialog product={open} onClose={() => setOpen(null)} />
    </>
  );
}
