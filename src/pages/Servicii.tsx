import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import ProductCard from '../components/ProductCard';
import ProductDialog from '../components/ProductDialog';
import { CATEGORII, PRODUSE, type CatalogProduct } from '../data/produse';
import { asset } from '../lib/asset';

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
        light
        title="Produse"
        kicker={`${PRODUSE.length} de modele, toate din carton`}
        /* The category list that used to run here is the chip row directly
           below, where it filters rather than just enumerates.

           "Fiecare model se execută la dimensiunile și tirajul cerute" is
           gone. No document says anything about made-to-measure sizes, and
           nothing anywhere mentions quantities — the same claim the
           invented order tiers made, surviving in prose because it was not
           a number. The second sentence is the documents' own: "solicitarea
           de noi produse din partea acestora". */
        subtitle="Modele la dimensiuni standard, produse în hala noastră din Lugoj. Dezvoltăm produse noi la solicitarea clienților."
        media={
/* Supplied as a cut-out, so it needs no frame and no blend
             trick — the banner and its hatch show through the alpha. */
          <figure className="hero-figure">
            <img
              src={asset('banner/gama-completa.webp')}
              alt="Gama de ambalaje și cutii din carton produse de Almariones"
              width={1254}
              height={1254}
              decoding="async"
            />
          </figure>
        }
      />

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
